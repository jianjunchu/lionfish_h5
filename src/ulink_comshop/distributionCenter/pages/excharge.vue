<template>
  <div class='wrap'>
    <div class='top'>
      <div class='money'>
        <div class='yue'>{{info.money}}</div>
        <div class='tip'>{{$t('distributionCenter.ketixianjine')}}</div>
      </div>
      <router-link class='record' hover-class='none' to='/ulink_comshop/distributionCenter/pages/exchargeRecord'>{{$t('distributionCenter.tixianjilu')}}</router-link>
    </div>
    <form @submit="formSubmit">
      <div class='card'>
        <div class='flex-ipt'>
          <input class='money' min="0" type="digit" :placeholder="$t('distributionCenter.qingsurutixianjine')" maxlength="15" @focus="bindIptFocus" @blur="bindIptBlur" name="money" v-model="tixian_money" :max="info.total_money"/>
          <div class="getall" @click='getAll'>{{$t('distributionCenter.quanbutixian')}}</div>
          <div :class='onFocus?"bottom-line ipt-focus":"bottom-line"'></div>
        </div>
        <div class='tip'>{{$t('distributionCenter.shouxufei')}}：{{info.commiss_tixian_bili}}% <span style="margin-left:1vw;">{{$t('distributionCenter.zuizhongdaozhang')}}：{{final_money}}</span></div>
        <!-- <div class='tip'>已提现(元)：{{info.getmoney}}</div> -->
        <radio-group class="radio-group">
          <label class="radio" v-for="(item,index) in items" :key="item.id" v-if="item.show">
            <input type="radio" name="type" v-model="item.name" :checked="item.checked" /><span>{{item.value}}</span>
          </label>
        </radio-group>
        <div class='form-box' v-if="type==2">
          <div class='form-group'>
            <label>{{$t('distributionCenter.weixinzhenshixingming')}}：<input class='form-ipt' type='text' name="bankusername" v-model='info.last_weixin_realname'/></label>
          </div>
        </div>
        <div class='form-box' v-if="type==3">
          <div class='form-group' v-if="type!=2">
            <label>{{$t('distributionCenter.paynowzhanghu')}}：<input class='form-ipt' type='text' name="bankaccount" v-model='info.last_alipay_account'/></label>
          </div>
          <div class='form-group'>
            <label>{{$t('distributionCenter.paynowzhenshixingming')}}：<input class='form-ipt' type='text' name="bankusername" v-model='info.last_alipay_name'/></label>
          </div>
        </div>
        <div class='form-box' v-if="type==4">
          <div class='form-group'>
            <label>{{$t('distributionCenter.yinhangkamingcheng')}}：<input class='form-ipt' type='text' name="bankname" v-model='info.last_bank_bankname'/></label>
          </div>
          <div class='form-group'>
            <label>{{$t('distributionCenter.chikarenxingming')}}：<input class='form-ipt' type='text' name="bankusername" v-model='info.last_bank_name'/></label>
          </div>
          <div class='form-group' v-if="type!=2">
            <label>{{$t('distributionCenter.yinghangkazhanghu')}}：<input class='form-ipt' type='text' name="bankaccount" v-model='info.last_bank_account'/></label>
          </div>
        </div>
      </div>
      <button class='btn' :disabled='canPay?false:true' form-type="submit">{{$t('distributionCenter.tijiao')}}</button>
    </form>
    <div class='desc'>
      <div class='h2'>{{$t('distributionCenter.tixianguize')}}：</div>
      <div class="wxParse">
        <p v-html="commiss_tixian_publish" />
      </div>
    </div>
    <i-new-auth :needAuth="needAuth&&showAuthModal" @authSuccess="authSuccess" @cancel="authModal"></i-new-auth>
  </div>
</template>

<script>
  import GlobalMixin from '../../mixin/globalMixin.js';
  import status from '../../utils/index.js'
  import util from '../../utils/index.js'
  var app,wx
  export default {
    mixins: [GlobalMixin],
    name:'distributionCenter-excharge',
    data() {
      return {
        type: 1,
        items: [{
            name: '1',
            value: this.$t('distributionCenter.xitongyue'),
            show: true,
            checked: false
          },
          {
            name: '2',
            value: this.$t('distributionCenter.weixinlingqian'),
            show: true,
            checked: false
          },
          {
            name: '3',
            value: 'Paynow',
            show: true,
            checked: false
          },
          {
            name: '4',
            value: this.$t('distributionCenter.yinhangka'),
            show: true,
            checked: false
          }
        ],
        info: [],
        tixian_money: '',
        final_money: 0,
        canTixian: true,
        needAuth: false,
        showAuthModal: false,
      }
    },
    watch: {
      tixian_money: {
        handler: function (newValue,oldValue) {
          let max_val = this.data.info.money;
          var value = newValue;
          if (!(/^(\d?)+(\.\d{0,2})?$/.test(value))) {
            value = value.substring(0, value.length - 1);
            value = parseFloat(value);
          }
          var that = this;
          if (value > max_val) {
            wx.showToast({
              title: that.$t('distributionCenter.bencizuidaketixian') + max_val + that.$t('distributionCenter.yuan'),
              icon: "none",
            })
          }
          let fee = this.data.info.commiss_tixian_bili;
          let val = parseFloat(value) > 0 ? parseFloat(value) : 0;
          let final_money = (val * (100 - fee) / 100).toFixed(2);

          let canPay = false;
          value ? canPay = true : canPay = false;

          this.tixian_money = value;
          this.final_money = final_money;
          this.canPay = canPay;
        }
      }
    },
    created: function() {
      wx = this.$wx
      app = this.$app
      var that = this;
      wx.setNavigationBarTitle({
        title: that.$t('distributionCenter.tixian'),
        showBack: true
      })
      that.onLoad();
      that.onShow();
    },
    methods: {
      onLoad: function() {
        wx.showLoading();
        this.getData();
      },

      onShow: function() {
        let that = this;
        util.check_login_new().then((res) => {
          if (res) {
            that.needAuth = false;
          } else {
            that.needAuth = true;
          }
        })
      },

      authSuccess: function () {
        let that = this;
        that.needAuth = false;
        that.getData();
      },

      authModal: function() {
        var that = this;
        if (that.needAuth) {
          wx.navigateTo({
            url: '/login'
          })
          return false;
        } else {
          return !that.needAuth;
        }
      },

      getData: function() {
        var token = wx.getStorageSync('token');
        let that = this;
        //Todo
        app.util.request({
          url: 'entry/wxapp/user',
          data: {
            controller: 'distribution.get_commission_info',
            token: token
          },
          dataType: 'json',
          success: function(res) {
            wx.hideLoading();
            if (res.code == 0) {
              let commiss_tixian_publish = res.data.commiss_tixian_publish;
              let items = that.items;
              let rdata = res.data;
              if (rdata.commiss_tixianway_yuer == 0) items[0].show = false;
              if (rdata.commiss_tixianway_weixin == 0) items[1].show = false;
              if (rdata.commiss_tixianway_alipay == 0) items[2].show = false;
              if (rdata.commiss_tixianway_bank == 0) items[3].show = false;

              let type = that.type;
              for (let i = 0; i < items.length; i++) {
                if (items[i].show) {
                  items[i].checked = true;
                  type = items[i].name;
                  break
                }
              }

              let { is_need_subscript, need_subscript_template } = res.data;

                that.info = res.data;
                that.items = items;
                that.type = type;
                that.is_need_subscript = is_need_subscript;
                that.need_subscript_template = need_subscript_template;
                that.commiss_tixian_publish = commiss_tixian_publish;
            } else {
              wx.showModal({
                title: that.$t('distributionCenter.tishi'),
                content: res.msg,
                showCancel: false,
                success(res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                    wx.redirectTo({
                      url: '/ulink_comshop/pages/user/me',
                    })
                  }
                }
              })
            }
          }
        })
      },

      formSubmit: function(e) {
        const params = e.detail.value;
        let isNull = 0;
        let type = this.type;
        var that = this;
        let errortip = [{}, {}, {
          bankusername: that.$t('distributionCenter.weixinzhenshixingming')
        }, {
          bankusername: that.$t('distributionCenter.zhifubaozhenshixingming'),
          bankaccount: that.$t('distributionCenter.zhifubaozhanghu')
        }, {
          bankname: that.$t('distributionCenter.yinhangkamingcheng'),
          bankusername: that.$t('distributionCenter.chikarenxingming'),
          bankaccount: that.$t('distributionCenter.bankaccount')
        }];
        for (let item in params) {
          params[item] = params[item].replace(/(^\s*)|(\s*$)/g, "");
          if (!params[item]) {
            const itemTip = errortip[type][item];
            wx.showToast({
              title: that.$t('distributionCenter.qingshuru') + (itemTip || that.$t('distributionCenter.zhengquedebiaodanneirong')),
              icon: 'none'
            })
            isNull = 1;
            break;
          }
          if (item == 'money' && params[item] * 1 <= 0) {
            wx.showToast({
              title: that.$t('distributionCenter.qingshuruzhengquedejine'),
              icon: 'none'
            })
            return;
          }
        }

        if (isNull == 1) return;
        params.type = type;

        let tixian_money = parseFloat(this.tixian_money);
        let max_tixian_money = this.info.money;
        let community_min_money = parseFloat(this.info.commiss_min_tixian_money);

        if (tixian_money == '' || community_min_money > tixian_money) {
          wx.showToast({
            title: that.$t('distributionCenter.zuixiaotixian') + community_min_money + that.$t('distributionCenter.yuan'),
            icon: "none",
          })
          return false;
        }

        if (tixian_money > max_tixian_money) {
          wx.showToast({
            title: that.$t('distributionCenter.bencizuidaketixian') + max_tixian_money + that.$t('distributionCenter.yuan'),
            icon: "none",
          })
          let fee = this.info.commiss_tixian_bili;
          let final_money = (max_tixian_money * (100 - fee) / 100).toFixed(2);
          this.tixian_money = max_tixian_money;
          this.final_money = final_money;
          return false;
        }

        if (!this.canTixian) return;
        this.canTixian = false;

        wx.showLoading();
        var token = wx.getStorageSync('token');
        app.util.request({
          url: 'entry/wxapp/user',
          data: {
            controller: 'distribution.tixian_sub',
            token: token,
            ...params
          },
          dataType: 'json',
          success: function(res) {
            wx.hideLoading();
            if (res.code == 0) {
              wx.showToast({
                title: that.$t('distributionCenter.yitijiaoshenqing'),
                icon: 'none',
                duration: 2000,
                success: function(){
                  that.canPay = false;
                  that.tixian_money = '';
                  that.final_money = 0;
                  that.getData();
                }
              })
            } else {
              wx.showToast({
                title: res.msg ? res.msg : that.$t('distributionCenter.tijiaoshibai'),
                icon: 'none'
              })
            }
            that.canTixian = true;
          }
        })
      },

      bindIptFocus: function() {
        this.onFocus = true;
      },

      bindIptBlur: function() {
        this.onFocus = false;
      },

      getAll: function() {
        var max_tixian_money = this.info.money * 1;
        let fee = this.info.commiss_tixian_bili;
        let final_money = (max_tixian_money * (100 - fee) / 100).toFixed(2);

        let canPay = false;
        max_tixian_money ? canPay = true : canPay = false;
        this.tixian_money = max_tixian_money;
        this.final_money = final_money;
        this.canPay = canPay;
      }

    }
  }
</script>

<style scoped>
.top {
  position: relative;
  padding: 3vw;
  text-align: center;
  background: #fff;
}

.money {
  padding-top: 3vw;
  border: none;
}

.record {
  position: absolute;
  top: 3vw;
  right: 3vw;
  color: #408ce2;
  font-size: 2.8vw;
}

.yue {
  font-size: 5.4vw;
  color: #000;
  font-weight: bold;
}

.card {
  margin-top: 2vw;
  padding: 3vw;
  background-color: #fff;
}

.tip {
  font-size: 2.4vw;
  color: #666;
  margin-top: 1.5vw;
}

.flex-ipt {
  position: relative;
  display: flex;
  font-size: 4vw;
  color: #000;
  justify-content: center;
  align-content: center;
  overflow: hidden;
  border-bottom: 0.2vw solid #ececec;
  align-items: center;
}

.flex-ipt .money {
  font-size: 3vw;
  flex: 1;
  padding: 2vw 0;
}

.flex-ipt .bottom-line {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 0.4vw;
  background-color: #2facff;
  transition: 200ms all ease-in;
}

.flex-ipt .bottom-line.ipt-focus {
  width: 100%;
}

.btn {
  width: 95%;
  margin: 5vw 3vw;
  background-color: #f75451;
  color: #fff;
  text-align: center;
  line-height: 8.8vw;
  font-size: 3vw;
  border-radius: 0.5vw;
}

button.btn::after{
  border: none;
}

.btn.disable {
  background-color: #f59997;
}

button.btn[disabled] {
  color: #fff !important;
  background: #f59997 !important;
  border-color: #f59997 !important;
}

.desc {
  padding: 0 3vw;
  line-height: 1.6;
  font-size: 2.6vw;
  color: #666;
}

.desc .h2 {
  font-size: 3vw;
  margin-bottom: 1vw;
}

.sucess {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 100vh;
  text-align: center;
  background: #fff;
}

.sucess .applyPassImg {
  width: 17.2vw;
  color: #ef994c;
  margin-bottom: 4vw;
}

.sucess .h1 {
  font-size: 3.2vw;
  margin-bottom: 2vw;
  color: #fb5a50;
  font-weight: bold;
}

.sucess .p {
  font-size: 2.8vw;
  color: #999;
}

.sucess .link-btn {
  color: #fb5a50;
  font-size: 2.8vw;
  margin-top: 10vw;
}

.radio-group {
  margin-top: 4vw;
}

.radio {
  position: relative;
  margin-right: 2vw;
  width: 3.8vw;
}

.radio span {
  display: inline-block;
  vertical-align: middle;
  font-size: 2.8vw;
}

input[type="radio"] {
  border-radius: 50%;
  width: 2.8vw;
  height: 2.8vw;
}

input[type="radio"]:checked::before {
  border-radius: 50%;
  width: 4.4vw;
  height: 4.4vw;
  line-height: 4.4vw;
  text-align: center;
  color: #fff;
  background: #2facff;
  border-color: #2facff;
}

.form-box {
  margin-top: 3vw;
}

.form-group {
  margin-bottom: 2vw;
  font-size: 3vw;
}

.form-ipt {
  position: relative;
  border: 0.1vw solid #e5e5e5;
  padding: 0.5vw 1vw;
  line-height: 5.2vw;
}

.getall {
  font-size: 2.8vw;
  color: #408ce2;
}
</style>
