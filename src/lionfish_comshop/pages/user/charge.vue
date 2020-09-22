<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="wrap">

    <i-paynow-modal :visible="showPayNowModal" :skin="skin" :tot_price="money" :payNowInfo="payNowInfo" @close="closePayNowModal" @havePaid="havePaid"></i-paynow-modal>

    <div class="charge-form">
      <div class="tit">
        <div>{{$t('wallet.yue')}}:</div>
        <router-link class="details" hoverClass="none" to="/lionfish_comshop/pages/user/rechargeDetails">Details</router-link>
      </div>
      <div class="charge-yue">{{accountMoney}}</div>
    </div>
    <div class="charge-form">
      <div class="tit">
        <div>{{$t('order.zhifujine')}}:</div>
      </div>
      <div class="list" v-if="chargetype_list.length">
        <div bindtap="selChargeType" :class="['list-item' ,activeTypeId==item.id?'item-hover':'']" :data-idx="index" v-for="(item,index) in chargetype_list" v-key="id">
          <div class="item-tit">{{item.money}}元</div>
          <div class="item-subtit" v-if="item.send_money>0">充{{item.money}}送{{item.send_money}}</div>
        </div>
        <div class="list-item_empty"></div>
        <div class="list-item_empty"></div>
        <div class="list-item_empty"></div>
      </div>
      <div class="flex-ipt">
        <input bindblur="bindIptBlur"  bindfocus="bindIptFocus" v-model="money" v-on:input="getMoney" class="money" maxlength="15" min="0" placeholder="" step="0.01" type="number" ></input>
        <div :class="['bottom-line' ,onFocus?'ipt-focus':'']"></div>
      </div>
    </div>
    <div @click.stop="paynowcharge" :class="['btn', canPay?'':'disable']" :style="{'background': canPay ? skin.color: skin.lighter}">{{$t('order.querenzhifu')}}</div>
    <div class="desc">
      <div class="h2">Explain：</div>
      <div class="wxParse">
        <p :html="member_charge_publish"></p>
      </div>
    </div>
  </div>

</template>

<script>
  import GlobalMixin from '../../mixin/globalMixin.js'
  import util from '../../utils/index.js';
  var app,wx
  export default {
    mixins: [GlobalMixin],
    name: 'charge',
    data() {
      return{
        showPayNowModal: false,
        canPay: !1,
        money: "",
        payNowInfo:{},
        onFocus: !1,
        accountMoney: 0,
        chargetype_list: [],
        activeTypeId: ""
      }
    },

    created:function() {
        app = this.$getApp();
        wx = this.$wx;



        this.onLoad();
        this.getPayInfo();
    },
    mounted: function() {
      this.onShow()
    },
    methods: {
      /**
       * 生命周期函数--监听页面加载
       */
      onLoad: function (options) {
        this.getAccountMoney();

      },
      /**
       * 生命周期函数--监听页面显示
       */
      onShow: function () {
        let that = this;
        util.check_login_new().then(function(e) {
          if(e){
            that.needAuth = !1
          }else{
            wx.redirectTo({
              url: '/lionfish_comshop/pages/user/me',
            })
          }
        })


      },
      getAccountMoney(){
        let token = wx.getStorageSync('token');
        let that = this;
        app.util.request({
          'url': 'entry/wxapp/user',
          'data': {
            controller: 'user.get_account_money',
            token: token
          },
          dataType: 'json',
          success: function (res) {
            if (res.code == 0){
              let rdata= res;
              let member_charge_publish = rdata.member_charge_publish;
              let chargetype_list = rdata.chargetype_list;

              let excharge_nav_name = res.excharge_nav_name || 'Charge';

              wx.setNavigationBarTitle({
                title: excharge_nav_name,
                showLogo: false,
                showMore: false,
                showBack: true
              })

              //that.setData({ accountMoney: rdata.data, chargetype_list, member_charge_publish })
              that.accountMoney = rdata.data;
              that.chargetype_list = chargetype_list;
              that.member_charge_publish = member_charge_publish;

            } else if(res.code == 1) {
              wx.redirectTo({
                url: '/lionfish_comshop/pages/user/me',
              })
            }
          }
        })
      },

      getMoney: function(el){
        var val = el.target.value
        //val ? this.setData({ canPay: true }) : this.setData({ canPay: false });
        val ? this.canPay = true : this.canPay = false;
        this.money =  val
        //this.setData({ money });
        // return money;
      },

      /**
       * 余额充值
       */
      wxcharge: function (sendMoney=0) {
        let oriMoney = 0;
        if (sendMoney>0) {
          oriMoney = sendMoney;
        } else {
          oriMoney = this.money;
          var reg = /^\d+(\.\d+)?$/;
          if(!reg.test(oriMoney)) {
            wx.showToast({
              title: '请输入正确的金额',
              icon: 'none'
            })
            return false;
          }
        }
        let money = parseFloat(oriMoney).toFixed(2) || 0;
        let token = wx.getStorageSync('token');
        let that = this;

        that.data.canPay&&app.util.request({
          url: 'entry/wxapp/user',
          data: {
            controller: 'car.wxcharge',
            token: token,
            money: money,
            rech_id: that.rech_id
          },
          dataType: 'json',
          success: function (res) {
            wx.requestPayment({
              "appId": res.appId,
              "timeStamp": res.timeStamp,
              "nonceStr": res.nonceStr,
              "package": res.package,
              "signType": res.signType,
              "paySign": res.paySign,
              'success': function (wxres) {
                //that.setData({ canPay: false, activeTypeId: 0 })
                that.canPay = false
                that.getAccountMoney();
                that.rech_id = 0;
                wx.showToast({
                  icon: 'none',
                  title: '充值成功',
                })
                setTimeout(() => {
                  wx.reLaunch({
                    url: '/lionfish_comshop/pages/user/me',
                  })
                }, 2000)
              },
              'fail': function (error) {
                if (that.rech_id > 0) that.canPay = false,that.activeTypeId = 0,that.rech_id = 0;//that.setData({ canPay: false, activeTypeId: 0 }), that.rech_id = 0;
                wx.showToast({
                  icon: 'none',
                  title: '充值失败，请重试！',
                })
              }
            })
          }
        })
      },

      /**
       * 获得焦点
       */
      bindIptFocus: function(){
        this.rech_id = 0;
        this.setData({
          onFocus: true,
          activeTypeId: 0,
          money: '',
          canPay: false
        })
      },

      /**
       * 失去焦点
       */
      bindIptBlur: function () {
        this.setData({ onFocus: false })
      },

      goCharge: function(e){
        let that = this;
        let chargetype_list = this.chargetype_list;
        let idx = e.currentTarget.dataset.idx;
        let rech_id = chargetype_list[idx].id;
        let money = chargetype_list[idx].money;
        this.rech_id = rech_id;
        that.canPay = true;
        that.wxcharge(money);
        /*this.setData({
          canPay: true
        },()=>{
          that.wxcharge(money);
        })*/
      },

      selChargeType: function(e){
        let that = this;
        let chargetype_list = this.chargetype_list;
        let idx = e.currentTarget.dataset.idx;
        that.activeTypeId = chargetype_list[idx].id || 0;
        that.money = chargetype_list[idx].money;
        this.rech_id = that.activeTypeId;

        /*that.setData({
          activeTypeId,
          money,
          canPay: true
        })*/
      },
      paynowcharge:function(){
        var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 0, e = 0;
        if (0 < t) e = t; else {
          e = this.money;
          if (!/^\d+(\.\d+)?$/.test(e)) return wx.showToast({
            title: "请输入正确的金额",
            icon: "none"
          }), !1;
        }
        var a = parseFloat(e).toFixed(2) || 0, n = wx.getStorageSync("token"), i = this;
        i.canPay && app.util.request({
          url: "entry/wxapp/user",
          data: {
            controller: "car.paynowcharge",
            token: n,
            money: a,
            rech_id: i.rech_id
          },
          dataType: "json",
          success: function(t) {
            console.log(t)
            i.showPayNowModal = !0
          }
        });
      },
      closePayNowModal:function(){
        this.showPayNowModal = !1

      },
      havePaid:function(){
        this.showPayNowModal = !1;
        wx.redirectTo({
          url: "/lionfish_comshop/pages/user/rechargeDetails"
        })
      },
      getPayInfo :function(){
        let that = this;
        app.util.request({
          url: "entry/wxapp/user",
          data: {
            controller: "user.get_copyright",
          },
          dataType: "json",
          method: "POST",
          success: function(t) {
            that.payNowInfo.payNowQr = t.paynow_qr
            that.payNowInfo.payNowNo = t.paynow_no
            that.payNowInfo.payNowUen = t.paynow_uen
          }
        });
      }

    }

  }
</script>

<style scoped>
  .charge-form {
    padding: 3vw;
    background-color: #fff;
  }

  .tit {
    font-size: 3.2vw;
    color: #000;
    margin-bottom: 3vw;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }

  .charge-yue {
    color: #000;
    font-size: 6vw;
  }

  .details {
    margin-left: 2vw;
    font-size: 2.6vw;
    color: rgb(59,140,232);
  }

  .flex-ipt {
    position: relative;
    display: flex;
    font-size: 4vw;
    color: #000;
    justify-content: center;
    align-content: center;
    overflow: hidden;
  }

  .flex-ipt .money {
    font-size: 3vw;
    flex: 1;
    padding: 2vw 0;
    border-bottom: 0.2vw solid #ececec;
    border-left: 0vw;
    border-top: 0vw;
    border-right: 0vw;
  }

  .flex-ipt .bottom-line {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 0.4vw;
    background-color: rgb(59,140,232);
    transition: 200ms all ease-in;
  }

  .flex-ipt .bottom-line.ipt-focus {
    width: 100%;
  }

  .btn {
    margin: 5vw 3vw;
    background-color: #f75451;
    color: #fff;
    text-align: center;
    line-height: 8.8vw;
    font-size: 3vw;
    border-radius: 0.5vw;
  }

  .btn.disable {
    background-color: #f59997;
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

  .list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 3vw 0;
  }

  .list-item {
    width: 30%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 0.1vw solid rgb(59,140,232);
    border-radius: 5px;
    height: 11vw;
    background-color: transparent;
    line-height: initial;
    box-sizing: initial;
    padding: 0;
    margin: 0 0 2.4vw;
  }

  .list-item_empty {
    height: 0;
    width: 30%;
  }

  .item-tit {
    color: #408ce2;
    font-size: 3.2vw;
  }

  .item-subtit {
    color: #7dbdf8;
    font-size: 2.2vw;
  }

  .item-hover {
    background-color: rgb(59,140,232);
  }

  .item-hover .item-tit,.item-hover .item-subtit {
    color: #fff;
  }
</style>
