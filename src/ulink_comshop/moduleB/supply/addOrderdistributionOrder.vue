<template>
<div>
  <div class="container">
    <div class="header">{{$t('supply.xiasonghuodantishi')}}</div>
    <form>
      <div class="form-group">
        <div class="form-item">
					<label class="form-item-control"><label style="color: red;">*</label>{{$t('supply.fahuodiyoubian')}}</label>
					<input class="form-item-input" :focus="focus_shop_zip_code" :placeholder="$t('supply.fahuodiyoubiantishi')" type="text" v-model="shop_zip_code"/>
				</div>
        <div class="form-item">
					<label class="form-item-control"><label style="color: red;">*</label>{{$t('supply.fanhuodimenpai')}}</label>
					<input class="form-item-input" :focus="focus_shop_lou_meng_hao" :placeholder="$t('supply.fahuodimenpaitishi')" type="text" v-model="shop_lou_meng_hao"/>
				</div>
        <div class="form-item">
					<label class="form-item-control"><label style="color: red;">*</label>{{$t('supply.fahuolianxiren')}}</label>
					<input class="form-item-input" :focus="focus_shop_contact" :placeholder="$t('supply.fahuolianxirentishi')" type="text" v-model="shop_contact"/>
				</div>
        <div class="form-item">
					<label class="form-item-control"><label style="color: red;">*</label>{{$t('supply.fahuorendianhua')}}</label>
					<input class="form-item-input" :focus="focus_shop_mobile" :placeholder="$t('supply.fahuorendianhuatishi')" type="text" v-model="shop_mobile"/>
				</div>
        <div class='form-item form-item2'>
          <label class="form-item-control"><label style="color: red;">*</label>{{$t('supply.fahuodizhi')}}</label>
          <textarea class="form-item-textarea" :focus="focus_shop_address"  maxlength="300" :placeholder="$t('supply.fahuodizhitishi')" placeholder-class='placeholder' v-model="shop_address"></textarea>
        </div>
        <div class="form-item">
					<label class="form-item-control"><label style="color: red;">*</label>{{$t('supply.shouhuodiyoubian')}}</label>
					<input class="form-item-input" :focus="focus_member_zip_code" :placeholder="$t('supply.shouhuodiyoubiantishi')" type="text" v-model="member_zip_code"/>
				</div>
        <div class="form-item">
					<label class="form-item-control"><label style="color: red;">*</label>{{$t('supply.shouhuodimenpai')}}</label>
					<input class="form-item-input" :focus="focus_member_lou_meng_hao" :placeholder="$t('supply.shouhuodimenpaitishi')" type="text" v-model="member_lou_meng_hao"/>
				</div>
        <div class="form-item">
					<label class="form-item-control"><label style="color: red;">*</label>{{$t('supply.shouhuoren')}}</label>
					<input class="form-item-input" :focus="focus_member_contact" :placeholder="$t('supply.shouhuorentishi')" type="text" v-model="member_contact"/>
				</div>
        <div class="form-item">
					<label class="form-item-control"><label style="color: red;">*</label>{{$t('supply.shouhuorendianhua')}}</label>
					<input class="form-item-input" :focus="focus_member_telephone" :placeholder="$t('supply.shouhuorendianhuatishi')" type="text" v-model="member_telephone"/>
				</div>
        <div class='form-item form-item2'>
          <label class="form-item-control"><label style="color: red;">*</label>{{$t('supply.shouhuodizhi')}}</label>
          <textarea  class="form-item-textarea" :focus="focus_member_address"  maxlength="300" :placeholder="$t('supply.shouhuodizhitishi')" placeholder-class='placeholder' v-model="member_address"></textarea>
        </div>
         <div class="form-item">
					<label class="form-item-control"><label style="color: red;">*</label>{{$t('supply.qiwangsongdashijian')}}</label>
          <input class="form-item-input" data-key="3" :placeholder="$t('supply.qiwangsongdashijiantishi')" type="text" v-model="order_delivery_time" readonly/>
        </div>
        <div class="form-item">
          <div class="page-body">
            <!-- <picker-view indicator-style="height: 50px;" style="width: 700rpx; height: 150px;" :value="array_index" @change="changeOrderDeliveryDate">
              <picker-view-column>
                <div v-for="item in order_delivery_date_array" :key="order_delivery_date" :data-value="order_delivery_date" style="line-height: 50px; text-align: center;">{{item}}</div>
              </picker-view-column>
              <picker-view-column>
                <div v-for="item in period_array" :key="period" :data-value="period" style="line-height: 50px; text-align: center;">{{item}}</div>
              </picker-view-column>
            </picker-view> -->
          </div>
        </div>
        <div class="form-item">
					<label class="form-item-control"><label style="color: red;">*</label>{{$t('supply.yunfei')}}</label>
					<input class="form-item-input" :focus="focus_shipping_money" :placeholder="$t('supply.yunfeitishi')" type="text" v-model="shipping_money"/>
        </div>
        <div class="form-item">
					<label class="form-item-control">{{$t('supply.beizhu')}}</label>
					<input class="form-item-input" :focus="focus_supply_memo" :placeholder="$t('supply.beizhutishi')" type="text" v-model="supply_memo"/>
        </div>
        <div class="form-item">
					<label class="form-item-control">{{$t('supply.cankaodingdanhao')}}</label>
					<input class="form-item-input" :focus="focus_order_num" :placeholder="$t('supply.cankaodingdanhaotishi')" type="text" v-model="order_num"/>
				</div>
        <div class="form-item">
          <label class="submit">
            {{$t('supply.tijiaoshenqing')}}
            <button hidden @click="submit"></button>
          </label>
        </div>
      </div>
    </form>
  </div>
  <i-new-auth @authSuccess="authSuccess" @cancel="authModal" :needAuth="needAuth&&showAuthModal" needPosition="false"></i-new-auth>
</div>
</template>

<script>
  var date_array = [];
  for (var i = 0; i < 10; i++) {
    var date = new Date();
    date_array[i] = dateFormat(date.setTime(date.valueOf() + 1000 * 60 * 60 * 24 * i));
  }

  function dateFormat (date) {
    date = new Date(date);
    var year = date.getFullYear();
    var month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
    var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    return year + '-' + month + '-' + day;
  }

  import GlobalMixin from '../../mixin/globalMixin.js';
  import status from '../../utils/index.js'
  import util from '../../utils/index.js'
  var app,wx
  export default {
    mixins: [GlobalMixin],
    name:'supply-addOrderdistributionOrder',
    data() {
      return {
        order_num: '',
        shop_zip_code: '',
        shop_lou_meng_hao: '',
        shop_contact: '',
        shop_mobile: '',
        shop_address: '',
        member_zip_code: '',
        member_lou_meng_hao: '',
        member_contact: '',
        member_telephone: '',
        member_address: '',
        order_delivery_time: '',
        order_delivery_date_array: date_array,
        period_array: [this.$t('supply.shangwu'), this.$t('supply.xiawu'), this.$t('supply.wanshang')],
        array_index: [1, 0],
        supply_memo: '',
        shipping_money: '',
        order_id: 0,
        needAuth: false,
        showAuthModal: false,
      }
    },
    watch:{
      shop_zip_code: {
        handler: function(newValue,oldValue) {
          console.log(newValue)
          this.shop_zip_code = newValue.replace(/^\s*|\s*$/g, "");
          console.log(this.shop_zip_code)
          var tk = wx.getStorageSync("token")
          if ("" != newValue && /^\d{6}$/.test(newValue)) {
            var that = this;
            console.log(this.shop_zip_code)
            app.util.request({
              url: "entry/wxapp/user",
              data: {
                controller: "index.load_address",
                token: tk,
                zipCode: newValue
              },
              dataType: "json",
              method: "GET",
              success: function (e) {
                var data = e;
                if (data.found > 0) {
                  var result = data.results[0];
                  that.shop_address = result.BLK_NO + ' ' + result.ROAD_NAME + ' ' + result.BUILDING + ' \n#' + that.shop_lou_meng_hao + ', S' + that.shop_zip_code;
                }
              }
            });
          }
        }
      },
      shop_lou_meng_hao: {
        handler: function(newValue,oldValue) {
          this.shop_lou_meng_hao = newValue.replace(/^\s*|\s*$/g, "");
          var shop_address_array = this.shop_address.split("#");
          if(shop_address_array.length > 1) {
            var shop_address = shop_address_array[0] + '#' + e.detail.value.replace(/^\s*|\s*$/g, "") + ', S' + shop_address_array[1].split("S")[1];
            this.shop_address = shop_address;
          }
        }
      },
      shop_address: {
        handler: function(newValue,oldValue) {
          this.shop_address = newValue.replace(/^\s*|\s*$/g, "");
          var shop_address_array = this.shop_address.split("#");
          if(shop_address_array.length > 1) {
            this.shop_lou_meng_hao = shop_address_array[1].split(",")[0];
          }
        }
      },
      member_zip_code: {
        handler: function(newValue,oldValue) {
          this.member_zip_code = newValue.replace(/^\s*|\s*$/g, "");
          var tk = wx.getStorageSync("token")
          if ("" != newValue && /^\d{6}$/.test(newValue)) {
            var that = this;
            app.util.request({
              url: "entry/wxapp/user",
              data: {
                controller: "index.load_address",
                token: tk,
                zipCode: newValue
              },
              dataType: "json",
              method: "GET",
              success: function (e) {
                var data = e;
                if (data.found > 0) {
                  var result = data.results[0];
                  that.member_address = result.BLK_NO + ' ' + result.ROAD_NAME + ' ' + result.BUILDING + ' \n#' + that.data.member_lou_meng_hao + ', S' + that.data.member_zip_code;
                }
              }
            });
          }
        }
      },
      member_lou_meng_hao: {
        handler: function(newValue,oldValue) {
          this.member_lou_meng_hao = newValue.replace(/^\s*|\s*$/g, "");
          var member_address_array = this.member_address.split("#");
          if(member_address_array.length > 1) {
            var member_address = member_address_array[0] + '#' + e.detail.value.replace(/^\s*|\s*$/g, "") + ', S' + member_address_array[1].split("S")[1];
            this.member_address = member_address;
          }
        }
      },
      member_address:{
        handler: function(newValue,oldValue) {
          this.member_address = newValue.replace(/^\s*|\s*$/g, "");
          var member_address_array = this.member_address.split("#");
          if(member_address_array.length > 1) {
            this.member_lou_meng_hao = member_address_array[1].split(",")[0];
          }
        }
      }
    },
    created: function() {
      wx = this.$wx
      app = this.$app
      var that = this;
      wx.setNavigationBarTitle({
        title: that.$t('supply.xiasonghuodan'),
        showBack: true
      })
    },
    mounted: function() {
      const o = this.$route.query || {};
      this.onLoad(o)
      this.onShow()
    },
    methods: {
      onLoad: function(options) {
        let id = options.id || '';
        this.order_id = id;
        this.needAuth = false;
        this.order_delivery_time = this.order_delivery_date_array[this.array_index[0]]+this.period_array[this.array_index[1]];
      },
      onShow: function () {
        util.check_login_new().then((res) => {
          if (res) {
            this.needAuth = false;
          } else {
            this.needAuth = true;
          }
        })
        if (this.order_id != '') {
          this.getData();
        }
      },
      authSuccess: function() {
        var that = this;
        that.needAuth = false;
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
        var that = this;
        var token = wx.getStorageSync("token");
        var id = this.order_id;
        app.util.request({
          url: 'entry/wxapp/index',
          data: {
            controller: 'supplymobile.supplyindex_info',
            token,
            id,
            is_supply: 1
          },
          dataType: 'json',
          success: function (res) {
            if (res.code == 0) {
              var result = res.data.supply_info;
              that.shop_zip_code = result.zip_code;
              that.shop_lou_meng_hao = result.lou_meng_hao;
              that.shop_contact = result.shopname;
              that.shop_mobile = result.mobile;
              that.shop_address = result.blk_no + ' ' + result.road_name + ' ' + result.building + ' \n#' + result.lou_meng_hao + ', S' + result.zip_code;
            }
          }
        })
        app.util.request({
          url: 'entry/wxapp/index',
          data: {
            controller: 'order.order_info',
            token,
            id,
            is_supply: 1
          },
          dataType: 'json',
          success: function (res) {
            if (res.code == 0) {
              var result = res.data.order_info;
              that.order_num = result.order_num_alias;
              that.member_zip_code = result.zip_code;
              that.member_lou_meng_hao = result.lou_meng_hao;
              that.member_contact = result.shipping_name;
              that.member_telephone = result.shipping_tel;
              that.member_address = result.blk_no + ' ' + result.road_name + ' ' + result.building + ' \n#' + result.lou_meng_hao + ', S' + result.zip_code;
            }
          }
        })
      },
      changeOrderDeliveryDate: function (e) {
        var o = e.detail.value;
        var order_delivery_date_array = this.order_delivery_date_array;
        var period_array = this.period_array;
        this.array = [o[0], o[1]];
        this.order_delivery_time = order_delivery_date_array[o[0]] + period_array[o[1]];
      },
      submit: function () {
        if (!this.authModal()) return;
        var token = wx.getStorageSync('token');
        var order_num = this.order_num;
        var shop_zip_code = this.shop_zip_code;
        var shop_lou_meng_hao = this.shop_lou_meng_hao;
        var shop_contact = this.shop_contact;
        var shop_mobile = this.shop_mobile;
        var shop_address = this.shop_address.replace("\n","");
        var member_zip_code = this.member_zip_code;
        var member_lou_meng_hao = this.member_lou_meng_hao;
        var member_contact = this.member_contact;
        var member_telephone = this.member_telephone;
        var member_address = this.member_address.replace("\n","");
        var order_delivery_time = this.order_delivery_time;
        var supply_memo = this.supply_memo;
        var shipping_money = this.shipping_money;
        var that = this;

        if (shop_zip_code == '') return this.focus_shop_zip_code = !0, wx.showToast({
          title: that.$t('supply.fahuodiyoubiantishi'),
          icon: "none"
        }), !1;
        if (shop_lou_meng_hao == '') return this.focus_shop_lou_meng_hao = !0, wx.showToast({
          title: that.$t('supply.fahuodimenpaitishi'),
          icon: "none"
        }), !1;
        if (shop_contact == '') return this.focus_shop_contact = !0, wx.showToast({
          title: that.$t('supply.fahuolianxirentishi'),
          icon: "none"
        }), !1;
        //if (mobile == '' || !(/^1(3|4|5|6|7|8|9)\d{9}$/.test(mobile))) {
        if (!/^\d{8}$/.test(shop_mobile) && !(/^1(3|4|5|6|7|8|9)\d{9}$/.test(shop_mobile))) return this.focus_shop_mobile = !0, wx.showToast({
            title: that.$t('supply.quhuolianxidianhuayouwu'),
            icon: 'none',
        }), !1;
        if (shop_address == '') return this.focus_shop_address = !0, wx.showToast({
          title: that.$t('supply.qingshuruquhuodizhi'),
          icon: "none"
        }), !1;
        if (member_zip_code == '') return this.focus_member_zip_code = !0, wx.showToast({
          title: that.$t('supply.shouhuodiyoubiantishi'),
          icon: "none"
        }), !1;
        if (member_lou_meng_hao == '') return this.focus_member_lou_meng_hao = !0, wx.showToast({
          title: that.$t('supply.shouhuodimenpaitishi'),
          icon: "none"
        }), !1;
        if (member_contact == '') return this.focus_member_contact = !0, wx.showToast({
          title: that.$t('supply.shouhuorentishi'),
          icon: "none"
        }), !1;
        //if (mobile == '' || !(/^1(3|4|5|6|7|8|9)\d{9}$/.test(mobile))) {
        if (!/^\d{8}$/.test(member_telephone) && !(/^1(3|4|5|6|7|8|9)\d{9}$/.test(member_telephone))) return this.focus_member_telephone = !0, wx.showToast({
            title: that.$t('supply.songhuolianxidianhuayouwu'),
            icon: 'none',
        }), !1;
        if (member_address == '') return this.focus_member_address = !0, wx.showToast({
          title: that.$t('supply.qingshurusonghuodizhi'),
          icon: "none"
        }), !1;
        if (shipping_money == '' || !(/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/.test(shipping_money))) return this.focus_shipping_money = !0, wx.showToast({
          title: that.$t('supply.yunfeitishi'),
          icon: "none"
        }), !1;
        if (shipping_money < 5) return this.focus_shipping_money = !0, wx.showToast({
          title: that.$t('supply.shuruyunfeiguodi'),
          icon: "none"
        }), !1;

        var s_data = {
          controller: 'supply.sub_localtown_order', 'token': token, 
          order_num, shop_zip_code, shop_contact, shop_mobile, shop_address, 
          member_zip_code, member_contact, member_telephone, member_address, 
          order_delivery_time, supply_memo, shipping_money
        };
        app.util.request({
          'url': 'entry/wxapp/user',
          'data': s_data,
          method: 'post',
          dataType: 'json',
          success: function (res) {
            if (res.code == 0) {
              wx.showToast({
                title: that.$t('supply.nindefahuodingdanyichenggongfabu'),
                icon: 'none',
                duration: 2000,
                success: function(){
                  setTimeout(()=>{
                    wx.redirectTo({
                      url: '/ulink_comshop/moduleB/supply/index',
                    })
                  }, 2000)
                }
              })
            } else {
              wx.showModal({
                title: that.$t('supply.tishi'),
                content: res.msg,
                showCancel: false
              })
            }
          }
        })

      }
    }
  }
</script>

<style scoped>
.header {
  background: #FE8464;
  height: 16vw;
  color: #fff;
  font-size: 3vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-group {
  padding: 1.2vw 3vw 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-group .form-item {
  display: flex;
  align-items: center;
  border-bottom: 0.2vw solid #e4e4e4;
  font-size: 3vw;
  transition: all 0.3s;
  width: 100%;
}

.form-group .form-item:last-child {
  border: none;
}

.form-group .form-item.error {
  border-color: #f75451;
}

.form-group .form-item .form-item-control {
  width: 19vw;
  height: 10vw;
  line-height: 10vw;
  margin-right: 1vw;
}

.form-group .form-item .form-item-input {
  flex: 1;
  height: 10vw;
  line-height: 10vw;
  border: none;
  background: none;
}

.weui-cell__hd {
  position: relative;
  font-size: 2.8vw;
  text-align: left;
}

.weui-pos {
  width: 4vw;
  height: 5vw;
  background: url(https://mall.shiziyu888.com/dan/Common/image/order_checkout_icon.png) no-repeat;
  background-position: 0 0;
  background-size: 13.2vw 14.2vw;
}

.form-group .form-item .form-item-input .picker {
  height: 10vw;
  line-height: 10vw;
}

.form-group .form-item .captcha {
  color: #666;
  border-left: 0.4vw solid #ddd;
  padding-left: 2vw;
  width: 16vw;
  height: 100%;
  text-align: center;
}

.form-group .form-item .placeholder {
  color: #ccc;
}

.form-group .form-item .input-placeholder {
  color: #ccc;
}

.form-group .form-item .submit {
  width: 64vw;
  margin: 4.6vw auto 0;
  height: 9.4vw;
  border-radius: 9.4vw;
  font-size: 3.6vw;
  background: #f75451;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-group .form-item .submit.disabled {
  background: #dcdcdc;
}

.apply-pass {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9;
}

.add-img-btn {
  color: #ccc;
}

.form-group .form-item2 {
  border-bottom: 0;
  flex-direction: column;
  align-items: flex-start;
}

.form-item-textarea {
  width: 100%;
  border: 0.2vw solid #e4e4e4;
  border-radius: 5px;
  padding: 5px;
  box-sizing: border-box;
}

.apply-pass {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9;
}

.apply-pass img {
  width: 15.6vw;
  height: 14.4vw;
  padding-top: 15vw;
  margin-bottom: 2.8vw;
}

.apply-pass .applyPassImg {
  width: 18.6vw;
  height: 18.6vw;
  font-size: 23vw;
  color: #ef994c;
  margin-bottom: 4vw;
  margin-top: 10.6vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

.apply-pass .h1 {
  font-size: 3.2vw;
  margin-bottom: 2vw;
  color: #555;
}

.apply-pass .p {
  font-size: 2.8vw;
  color: #999;
  margin-bottom: 3vw;
}

.apply-pass .link-btn {
  width: 31vw;
  height: 9.8vw;
  border-radius: 2vw;
  background: #fb5a50;
  color: #fff;
  font-size: 3.2vw;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
}
</style>
