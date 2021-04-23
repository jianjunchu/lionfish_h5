<template>
  <div>


    <i-bank-modal :visible="showTransferModal" :skin="skin" :tot_price="tot_price"  :bankInfo="bankInfo" @close="toCloseTransferModal" @havePaid="havePaid"></i-bank-modal>

    <i-paynow-modal :visible="showPayNowModal" :skin="skin" :tot_price="tot_price" :payNowInfo="payNowInfo" @close="toClosePayNowModal" @havePaid="havePaid"></i-paynow-modal>


    <div class="mask" catchtouchmove="preventTouchMove" v-if="showPaymentModal"></div>
    <div class="modalDlg" v-if="showPaymentModal">
      <div style='width:100%;height:26px;border-bottom:1px solid #ccc;margin:0;padding:0;'>
        <span style='text-align:center;font-size:14px;font-weight:600 ;margin-top:5px' >{{$t('cart.zhifufangshi')}}</span>
      </div>

      <!-- 总金额 -->
      <div style='height:50px;width:100%'>
        <span style='font-size:30px;color:#f00'>${{tot_price}}</span>
      </div>

<!--
      <button @click.stop="orderPayWeixin" class="wux-button wux-button--block" type="warn">
        微信支付</button>
-->
      <!--
      <button class="wux-button wux-button--block" type="warn" style="margin-top=16px">到店付款</button>
      -->
      <button @click.stop="payNow" class="wux-button wux-button--block" data-type="paynow" :style="{background:skin.color,color:' #fff'}" type="warn">PayNow</button>
      <button @click.stop="payPal" class="wux-button wux-button--block" data-type="paypal" :style="{background:skin.color,color:' #fff'}" type="warn">PayPal</button>
      <button @click.stop="yuepay" v-if="is_open_yue_pay ==1" :style="{background:skin.color,color:' #fff','font-size':'2vw'}" class="wux-button wux-button--block" type="warn"> {{ $t('order.yuezhifu',{p1:accountMoney}) }} </button>

      <!--<button @click.stop="orderPayTransfer" data-type="banktransfer" class="wux-button wux-button&#45;&#45;block" type="warn">公司转账</button>-->

      <!--
      <button wx:if='{{is_pickup}}' @click.stop="havePaid" data-type="cash" class="wux-button wux-button--block" type="warn">货到付款</button>
      -->

      <button @click.stop="toClosePaymentModal"  class="wux-button wux-button--block" type="default">{{$t('cart.quxiaozhifu')}}</button>


    </div>
    <div class="nav-bar">
      <div class="nav-bar-inner">
        <div @click.stop="getOrder" :class="['nav-bar-item', (order_status==item.id?'current':'')]" :data-type="item.id" :style="(order_status==item.id?'border-color:'+skin.color:'')"  v-for="(item,idx) in tabs" :key="item.id">
          {{item.name}}
        </div>
      </div>
    </div>
    <!--<div class="nav-bar-content">-->
    <van-list  @load="onReachBottom" class="nav-bar-content">

      <div v-if="!is_empty">
        <div @click.stop="goOrder" class="card" :data-type="item.order_id"  v-for="(item,idx) in order" :key="item.id">
          <i-card :data-orderId="item.order_id" iClass="my-card" showModal="true">
            <div class="card-header" slot="header">
              <div>{{$t('order.xiadanshijian')}}
                <span>{{item.createTime}}</span>
              </div>

              <div :class="['bold', (item.order_status_id==3?'red':'gray')]" :style="(item.order_status_id==3?'color:'+skin.color:'')">
                <span v-if="item.order_status_id == 10"> {{ $t('order.dengdaituikuan') }}</span>
                <span v-else-if="item.order_status_id == 4 && item.delivery=='pickup' "> {{ $t('order.daiziti') }}</span>
                <span v-else-if="item.order_status_id == 6 && item.delivery=='pickup' "> {{ $t('order.yiziti') }}</span>
                <span v-else> {{ item.status_name }}</span>

              </div>
            </div>
            <div class="card-content" slot="content">
              <div class="order-content-wrap" v-if="item.is_pin==1">
                <i-img height="60" iClass="show-img mar-right-10" lazyLoad="true" loadImage="item.goods_list[0].goods_images" width="60"></i-img>
                <div class="i-flex-item">
                  <div class="name bold">
                    <span class="pintag" :style="{color:skin.color,background:skin.light}">拼团</span>
                    {{item.goods_list[0].name}}
                  </div>
                  <div class="mount">{{item.goods_list[0].option_str}} x {{item.goods_list[0].quantity}}</div>
                  <div class="bottom-info">${{item.goods_list[0].price}} <span>${{item.goods_list[0].orign_price}}</span>
                  </div>
                </div>
              </div>
              <div class="order-content-wrap" v-else>
                <div class="clearfix">
                  <!--<i-img height="60" iClass="['show-img', (idx<4?'mar-right-10':'')]" lazyLoad="true" :loadImage="img.goods_images" width="60" v-if="idx<4"    v-for="(img,idx) in item.goods_list" :key="img.id"></i-img>-->
                  <div height="60" class="show-img img-content" v-for="(img,idx) in item.goods_list" :key="img.order_goods_id">
                    <img   class="show-img img-def opacity show-img"  :src="img.goods_images"/>
                  </div>
                </div>
                <div class="dot" v-if="item.goods_list && item.goods_list.length>=4">
                  <div class="dot-item"></div>
                  <div class="dot-item dot-middle"></div>
                  <div class="dot-item"></div>
                </div>
              </div>
              <div class="order-content-wrap fsz-30" style="margin-top:12px" v-if="item.delivery_time && item.delivery_time!='' && item.delivery_date && item.delivery_date!=''">

                {{item.delivery=='pickup'?$t('order.tihuoshijian'):$t('order.songhuoshijian')}} {{item.delivery_date}} [{{item.delivery_time}}]
              </div>
            </div>
            <div class="card-footer" slot="footer">
              <div>{{$t('common.gong')}}
                <span class="i-class" v-if="item.goods_list">{{item.goods_list.length}}</span>  {{$t('order.jianshangpin')}}
                <div class="accual-pay" v-if="item.orderStatus!=3"> {{$t('order.shifu')}}：
                  <div class="money" v-if="item.type=='integral'">
                    <div v-if="item.shipping_fare>0">${{item.shipping_fare}} + </div>{{item.score}}{{$t('common.jifen')}}
                  </div>
                  <div class="money" v-else>
                    ${{item.total}}
                  </div>
                </div>
              </div>
              <div class="button-group" v-if="item.order_status_id==3">
                <div @click.stop="cancelOrder" class="my-button" data-show="cancelVisible" :data-type="item.order_id"> {{$t('order.quxiaodingdan')}}</div>
                <!--<div  @click.stop="showPaymentModal" class="my-button-pay padding-15" :data-type="item"  :style="{background: linear-gradient(90deg, skin.color 0%, skin.light 100%)}">立即支付</div>-->
                <div  @click.stop="toShowPaymentModal(item)" class="my-button-pay padding-15" :data-type="{item}"  :style="{color:skin.color,background:skin.light}">{{$t('order.lijizhifu')}}</div>
              </div>
              <div v-if="item.order_status_id==4">
                <div class="get-goods" :data-delivery="item.delivery" :data-type="item.order_id">
                  <!--<div class="sure-get" @click.stop="receivOrder" :data-delivery="item.delivery" :data-type="item.order_id">{{item.delivery=='pickup'?'确认提货':'确认收货'}}</div>-->
                  <div class="sure-get" @click.stop="receivOrder" :data-delivery="item.delivery" :data-type="item.order_id">{{item.delivery=='pickup'?$t('order.querentihuo'): $t('order.querenshouhuo')}}</div>
                  <img class="right-arrow" src="@/assets/images/rightArrowImg.png"></img>
                </div>
              </div>
              <div v-if="item.order_status_id==1||item.order_status_id==6||item.order_status_id==11||item.order_status_id==14||item.order_status_id==15||item.order_status_id==16">
                <div class="my-button"  :data-type="item.order_id" size="small">{{$t('order.chakanxiangqing')}}</div>
              </div>
            </div>
          </i-card>
        </div>
      </div>
      <div class="empty-wrap" v-else>
        <img class="empty-img" src="@/assets/images/noData.png"></img>
        <div class="empty-txt">{{$t('order.wurenhedingdan')}}</div>
      </div>
    <!--</div>-->
    </van-list>
  </div>

</template>

<script>
  import GlobalMixin from '../../mixin/globalMixin.js';
  //  import util from '../../utils/util.js';
  import status from '../../utils/index.js';
  import auth from '../../utils/auth';
  import request from '../../utils/request';
  var wcache = require('../../utils/wcache.js');

  var app
  var wx;
  var _extends = Object.assign || function(t) {
    for (var a = 1; a < arguments.length; a++) {
      var e = arguments[a];
      for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
    }
    return t;
  };

  export default {
    mixins: [GlobalMixin],
//    util:[util],
    status:[status],
    wcache:[wcache],
    auth:[auth],
    name:'order-index',
    components: {
      'i-img': require('../../components/img/index.vue').default
    },
    data() {
      return {
        transaction_id:'',
        showPaymentModal:false,
        showPayNowModal: false,
        showTransferModal:false,
        bankInfo:{},
        payNowInfo: {},
        order_num_alias:'',
        payNowQr:'',
        payNowNo:'',
        payNowUen:'',
        tablebar: 4,
        tot_price:0,
        currentItem: [],
        is_pickup : false,
        page: 1,
        theme_type: "",
        order_status: -1,
        no_order: 0,
        hide_tip: true,
        order: [],
        tip: "正在加载",
        is_empty: false,
        tabs: [ {
          id: -1,
          name: this.$t('common.quanbu')
        }, {
          id: 3,
          name: this.$t('common.daifukuan')
        }, {
          id: 1,
          name: this.$t('common.daipeisong')
        }, {
          id: 14,
          name: this.$t('common.peisongzhong')
        }, {
          id: 4,
          name: this.$t('common.daitihuo')
        }, {
          id: 6,
          name: this.$t('common.yitihuo')
        } ],
        loadover:false,

      }
    },
    created: function() {
      app = this.$getApp()
      wx = this.$wx;
      this.$wx.setNavigationBarTitle({
        title: this.$wx.getStorageSync("shopname"),
        showLogo:false,
        showMore:false,
        showBack:true
      })
      this.getPayInfo();
      this.onLoad();
    },
    methods: {
      toShowPaymentModal: function(t){

//        var b = t.currentTarget.dataset.type;
        var b = t;
        console.log(b);
        var a = b.total;
        var c = b.order_num_alias;
        var d = 'pickup'==b.delivery;

        this.currentItem=b,
        this.is_pickup=d,
        this.tot_price=a,
        this.showPaymentModal= true,
        this.order_num_alias=c.substring(c.length-5);


      },

      toClosePaymentModal: function(){

          this.showPaymentModal = false;

      },
      toShowPayNowModal:function(){
        this.toClosePaymentModal();
        this.showPayNowModal= true;

      },
      toClosePayNowModal:function(){
        this.showPayNowModal= false;
        this.getData();
      },
      toShowTransferModal:function() {
        this.toClosePaymentModal();
        this.showTransferModal = true;
      },

      toCloseTransferModal:function(){
        this.getData();
      },

      copyText: function (e) {
        console.log(e)
        this.$wx.setClipboardData({
          data: e.currentTarget.dataset.text,
          success: function (res) {
            this.$wx.getClipboardData({
              success: function (res) {
                this.$wx.showToast({
                  title: '复制成功'
                })
              }
            })
          }
        })
      },
      orderPayTransfer:function(){
        var this_ = this;
        this.$wx.request({
          // 请求地址
          url: 'https://hz.xx315.net/payment/transfer/bank.json',
          // 请求方式
          method: "get",
          dataType: 'json',
          responseType: 'text',
          // 方法
          success: function(data) {
            console.log(data);
            this_.bankInfo= data.data;
          }
        })
        this_.toClosePaymentModal();
        this_.toShowTransferModal();
      },
      payNow :function(){
        var this_ = this;

        this.toClosePaymentModal();
        this.toShowPayNowModal();
      },
        payPal :function(){
            var t = wx.getStorageSync("token"), c = this;
            var a = c.currentItem,b = c.accountMoney;
            wx.showLoading()
            app.util.request({
                url: "entry/wxapp/user",
                data: {
                    controller: "car.paypal_pay",
                    order_id:a.order_id,
                    token: t
                },
                dataType: "json",
                success: function(t) {
                    if (0 == t.code) {
                        window.location.href = t.approvalUrl;
                    }else{
                        wx.showToast({
                            title: t.msg,
                            icon: "none"
                        });
                    }
                }
            });


        },
      yuepay:function(){
        var t = wx.getStorageSync("token"), c = this;
        var a = c.currentItem,b = c.accountMoney;

        if(parseFloat(a.total) > parseFloat(b)){
          wx.showToast({
            title: c.$t('order.yuebuzhu'),
            icon: "none"
          });
        }else{
          wx.showLoading()
          app.util.request({
            url: "entry/wxapp/user",
            data: {
              controller: "order.yuepay",
              order_id:a.order_id,
              token: t
            },
            dataType: "json",
            success: function(t) {
              wx.hideLoading()
              if (0 == t.data.code) {
               c.getData();
              }else{
                wx.showToast({
                  title: t.data.msg,
                  icon: "none"
                });
              }
            }
          });
        }

      },
      havePaid: function(type){
       /* if ( '' == this.transaction_id) {
          return wx.showToast({
            title: '请输入交易流水id',
            icon: 'none'
          }), !1
        }*/

        this.toClosePaymentModal();
        var this_ = this;
        var s = this.$wx.getStorageSync("token"),a = this.currentItem;
        this.$wx.showLoading();
        this.$http_post({
            controller: "order.pay_order",
            token: s,
            order_id: a.order_id,
            payment_code: type,
            transaction_id:this.transaction_id
          }).then(t=> {
            this_.$wx.hideLoading();
            this_.$router.go(0);
        });
      },
      onLoad: function(t) {
        this.getCopyright();
        this.getAccountMoney();
        var order_status = this.$route.query.order_status;
        var is_show_tip = this.$route.query.is_show;
        var isfail = this.$route.query.isfail;
        this.loadOver = true;
        if (!order_status || order_status == undefined) {
            this.order_status = -1;
        }else {
          this.order_status = order_status;
        }
        if (is_show_tip && is_show_tip == 1) {
          this.$wx.showToast({
            title: this.$t('order.zhifuchenggong')
          })
        }else if (isfail && isfail == 1){
          this.$wx.showToast({
            title: this.$t('order.zhifushibai'),
            icon: "none"
          })
        }
        this.getData();
      },
      getData: function() {
        this.isHideLoadMore = true;
        this.no_order = 1;
        var that = this;
        var token = this.$wx.getStorageSync("token");
        this.$http({
            controller: "order.orderlist",
            token: token,
            page: that.page,
            order_status: that.order_status
          }).then(res=> {
              console.log(res);

               if (res.code == 0) {
                 let rushList = that.order.concat(res.data);
                 this.order = rushList;
                 this.hide_tip= true;
                 this.no_order= 0;
                 this.$forceUpdate();
               } else {
                 if(that.page == 1 && that.order.length <= 0) this.is_empty = true;
                 that.isHideLoadMore = true;
                 return false;
               }
        });
      },
      goOrder: function(event) {
        let id = event.currentTarget.dataset.type;

        this.$wx.navigateTo({
          url: '/ulink_comshop/pages/order/order?id=' + id
        })
      },
      receivOrder: function(t) {

        let id = event.currentTarget.dataset.type;
        let delivery = event.currentTarget.dataset.delivery;
        var token = this.$wx.getStorageSync("token");
        let content = this.$t('order.querenshoudao');
        if (delivery == "pickup") content = content;
        var that = this;

        this.$wx.showModal({
          title: this.$t('cart.tishi'),
          content: content,
          confirmColor: "#8ED9D1",
          success: function(res) {

            if (res.confirm) {
              that.$http({
                  controller: 'order.receive_order',
                  token: token,
                  order_id: id
                }).then(r=> {

                  if (r.code == 0) {
                    that.$wx.showToast({
                      title: 'Success',
                      icon: 'success',
                      duration: 1000
                    })
                    that.order_(that.order_status);
                  }
              })
            }
          }
        });
      },
      cancelOrder: function(t) {
        let id = t.currentTarget.dataset.type;
        var token = this.$wx.getStorageSync("token");
        var that = this;
        const quxiaochenggong  = this.$t('order.quxiaochenggong')
        this.$wx.showModal({
          title: this.$t('order.quxiaodingdan1'),
          content: this.$t('order.haoburongyi'),
          confirmColor: '#8ED9D1',
          showCancelButton:true,
          success(res) {

            console.log(res.confirm)
            if (res.confirm) {
              app.util.request({
                  url: "entry/wxapp/index",
                  data: {
                    controller: "order.cancel_order",
                    token: token,
                    order_id: id
                  },
                  dataType: "json",
                  success: function(e) {

                    that.$wx.showToast({
                      title: quxiaochenggong,
                      icon: "success",
                    });
                    location.reload()
                  }
                });
            }
          }
        })
      },
      getOrder: function(t) {
          this.is_empty = false;
        var e = t.currentTarget.dataset.type;
        this.order_(e);
      },
      order_: function(t) {
        this.order_status= t;
        this.order= [];
        this.no_order= 0;
        this.page= 1;
         this.getData();
      },
      orderPayWeixin: function() {
        this.toClosePaymentModal();
        var e = this.$wx.getStorageSync("token"), a = this.currentItem;

        this.$http_post({
            controller: "car.wxpay",
            token: e,
            order_id: a.order_id
          }).then(t=> {
            if (0 == t.code) {
              t.is_pin;
              wx.requestPayment({
                appId: t.appId,
                timeStamp: t.timeStamp,
                nonceStr: t.nonceStr,
                package: t.package,
                signType: t.signType,
                paySign: t.paySign,
                success: function(t) {
                  this.$wx.redirectTo({
                    url: "/ulink_comshop/pages/order/order?id=" + a + "&is_show=1"
                  });
                },
                fail: function(t) {
                  console.log(t);
                }
              });
            } else if(2 == t.code){
                this.$wx.showToast({
                  title: t.msg,
                  icon: "none"
                });
          }
        });
      },
      onReachBottom: function() {
        if (1 == this.no_order) return false;
        this.page += 1, this.getData(), this.isHideLoadMore= false;
      },
      onPullDownRefresh: function() {
        this.is_empty= false,
        this.page= 1,
        this.order= [];

        this.$wx.showLoading();
        this.getData();
        this.$wx.stopPullDownRefresh();
      },getCopyright: function() {
        var C = this;
        C.$app.util.request({
          url: "entry/wxapp/user",
          data: {
            controller: "user.get_copyright"
          },
          dataType: "json",
          success: function(e) {
            if (0 == e.code) {
              var t = e, o = t.enabled_front_supply, a = t.is_open_yue_pay, s = t.is_show_score, i = t.user_order_menu_icons, n = t.close_community_apply_enter, r = t.user_tool_icons, u = t.ishow_user_loginout_btn, _ = t.commiss_diy_name, c = t.supply_diy_name, m = t.user_service_switch, d = t.fetch_coder_type, l = t.show_user_pin, h = t.common_header_backgroundimage, p = t.is_show_about_us, g = t.show_user_change_comunity, f = t.open_danhead_model, w = t.default_head_info, b = t.is_open_solitaire, y = t.user_top_font_color, v = t.excharge_nav_name, x = {};
              1 == f && (x.community = w), _ = _ || "分销", c = c || "供应商", wcache.put("commiss_diy_name", _),
                wcache.put("supply_diy_name", c),
                C.copyright = t.data || "",
                C.common_header_backgroundimage = h || require('@/assets/images/TOP_background@2x.png'),
                C.is_show_about_us = p || 0,
                C.enabled_front_supply = o,
                C.is_open_yue_pay = a,
                C.is_show_score = s,
                C.user_order_menu_icons = i || {},
                C.commiss_diy_name = _,
                C.close_community_apply_enter = n || 0,
                C.user_tool_icons = r || {},
                C.ishow_user_loginout_btn = u || 0,
                C.supply_diy_name = c,
                C.user_service_switch = m,
                C.fetch_coder_type = d || 0,
                C.show_user_pin = l,
                C.show_user_change_comunity = g,
                C.open_danhead_model = f,
                C.is_open_solitaire = b,
                C.user_top_font_color = y,
                C.excharge_nav_name = v || "查看",
                C.user_service_url = t.user_service_url
            }
          }
        });
      },getAccountMoney: function() {
        var t = wx.getStorageSync("token"), c = this;
        app.util.request({
          url: "entry/wxapp/user",
          data: {
            controller: "user.get_account_money",
            token: t
          },
          dataType: "json",
          success: function(t) {
            if (0 == t.code) {
              var e = t, a = e.member_charge_publish, n = e.chargetype_list;
              c.accountMoney =  e.data,
                c. chargetype_list = n,
                c.member_charge_publish = a
            }
          }
        });
      },
      getPayInfo :function(){
        var this_ = this;
        app.util.request({
          url: "entry/wxapp/user",
          data: {
            controller: "user.get_copyright",
          },
          dataType: "json",
          method: "POST",
          success: function(t) {
            this_.payNowInfo.payNowQr = t.paynow_qr
            this_.payNowInfo.payNowNo = t.paynow_no
            this_.payNowInfo.payNowUen = t.paynow_uen
          }
        });
      },

    }
  }
</script>


<style  src="@/ulink_comshop/pages/order/index.css" scoped>
</style>
