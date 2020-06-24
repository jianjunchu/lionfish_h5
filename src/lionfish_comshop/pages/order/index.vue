<template>
  <div>
    <div class="mask" catchtouchmove="preventTouchMove" v-if="showTransferModal"></div>
    <div class="paynow" v-if="showTransferModal">
      <div style='width: 100%;height: 10%;'>
        <div style='float:left;width: 40%;font-size: 22px;line-height: 50px;margin-left: 10%;'>
          转账支付
        </div>
        <div style='float:right;width: 50%;text-align: right' @click='closeTransferModal'>
          <image src='@/assets/images/img-close.png' style='width: 30px;height: 30px;margin-top: 10px;margin-right: 10%'></image>
        </div>
      </div>
      <div style='text-align: center'>
        <div style='width: 100%;height: 350px;font-size: 12px;'>

          <div style='margin-left: 5%;margin-top:10px;text-align:left;display: flex;justify-content: center;'>
            <span style='display: flex;justify-content: center;'>帐号：</span>
            <span style='text-align: left;'>{{bankInfo.account_no}}</span>
            <button @click='copyText' size="mini" style="font-size: 8px;" :data-text="bankInfo.account_no">复制</button>
          </div>
          <div style='margin-left: 5%;margin-top:10px;text-align:left;display: flex;justify-content: center;'>
            <span style='display: flex;justify-content: center;'>户名：</span>
            <span style='text-align: left;'>{{bankInfo.account_name}}</span>
            <button @click='copyText' size="mini" style="font-size: 8px;" :data-text="bankInfo.account_name">复制</button>
          </div>
          <div style='margin-left: 5%;margin-top:10px;text-align:left;display: flex;justify-content: center;'>
            <span style='display: flex;justify-content: center;'>银行：</span>
            <span style='text-align: left;'>{{bankInfo.bank_name}}</span>
            <button @click='copyText' size="mini" style="font-size: 8px;" :data-text="bankInfo.bank_name">复制</button>
          </div>

          <div style='wid:200px;height:100px;text-align: center;margin-top: 30px;'>
            <span style='font-size: 18px;'>请在支付时备注您订单内的联系号码 \n</span>
            <span style='font-size: 18px;color: #c0c0c0'>注：转账支付为人工审核</span>
          </div>
        </div>
        <div style='width: 60%;text-align: center;margin-top: 30px;margin-left: 20%;'>
          <button @click="havePaid"  data-type="banktransfer"  class="wux-button wux-button--block" type="default">已支付，查看订单</button>
        </div>
      </div>
    </div>

    <div class="mask" catchtouchmove="preventTouchMove" v-if="showPayNowModal"></div>
    <div class="paynow" v-if="showPayNowModal">
      <div style='width: 100%;height: 10%;'>
        <div style='float:left;width: 40%;font-size: 18px;line-height: 50px;margin-left: 5%;'>
          PayNow支付
        </div>

        <div style='float:right;width: 50%;text-align: right' @click='toClosePayNowModal'>
          <img src=@/assets/images/img-close.png' style='width: 24px;height: 24px;margin-top: 10px;margin-right: 5%'></img>
        </div>
      </div>

      <div style='float:left;width: 100%;margin-left: 5%;'>
        PayNow支付号码：{{payNowNo}}
      </div>
      <div style='float:left;width: 100%;margin-left: 5%;margin-top:5px'>
        支付金额：<span style="color:red">${{tot_price}}</span>
      </div>
      <div style='float:left;width: 100%;margin-left: 5%;margin-top:5px'>
        备注订单号：<span style="color:red">{{order_num_alias}}</span>
      </div>
      <div style='float:left;width: 100%;margin-left: 5%;margin-top:5px'>
        <span style="color:red">请在备注中写入该订单号，很重要！</span>
      </div>

      <div style='text-align: center'>
        <div style='width: 100%;height: 350px;justify-content: center; '>
          <img :src='payNowQr' style='width: 160px;height: 160px;margin-top: 20px;border: 1px solid #000;'></img>
          <div style='wid:200px;height:40px;margin-top:10px;'>

            <span style='text-align: left;'>PayNow扫码支付 \n <!--或 uen: {{payNowUen}}--></span>

          </div>
          <div style='wid:200px;height:80px; '>
            <span style='font-size: 18px;'><!--请在支付时备注您订单内的联系号码 \n--></span>
            <span style='font-size: 18px;color: #c0c0c0'>注：转账支付为人工审核</span>
          </div>
        </div>
        <div style='width: 60%;text-align: center;margin-top: 30px;margin-left: 20%;'>
          <button @click="havePaid" data-type="paynow"   class="wux-button wux-button--block" type="default">已支付，查看订单</button>
        </div>
      </div>
    </div>


    <div class="mask" catchtouchmove="preventTouchMove" v-if="showPaymentModal"></div>
    <div class="modalDlg" v-if="showPaymentModal">
      <div style='width:100%;height:26px;border-bottom:1px solid #ccc;margin:0;padding:0;'>
        <span style='text-align:center;font-size:14px;font-weight:600 ;margin-top=5px' >支付方式</span>
      </div>

      <!-- 总金额 -->
      <div style='height:50px;width:100%'>
        <span style='font-size:30px;color:#f00'>${{tot_price}}</span>
      </div>


      <button @click="orderPayWeixin" class="wux-button wux-button--block" type="warn">
        微信支付</button>

      <!--
      <button class="wux-button wux-button--block" type="warn" style="margin-top=16px">到店付款</button>
      -->
      <button @click="payNow" class="wux-button wux-button--block" data-type="paynow" type="warn">PayNow支付</button>
      <button @click="orderPayTransfer" data-type="banktransfer" class="wux-button wux-button--block" type="warn">公司转账</button>

      <!--
      <button wx:if='{{is_pickup}}' @click="havePaid" data-type="cash" class="wux-button wux-button--block" type="warn">货到付款</button>
      -->

      <button @click="closePaymentModal"  class="wux-button wux-button--block" type="default">取消支付</button>


    </div>
    <div class="nav-bar">
      <div class="nav-bar-inner">
        <div @click="getOrder" :class="['nav-bar-item', (order_status==item.id?'current':'')]" :data-type="item.id" :style="(order_status==item.id?'border-color:'+skin.color:'')"  v-for="(item,idx) in tabs" :key="item.id">
          {{item.name}}
        </div>
      </div>
    </div>
    <div class="nav-bar-content">
      <div v-if="!is_empty">
        <div @click="goOrder" class="card" :data-type="item.order_id"  v-for="(item,idx) in order" :key="item.id">
          <i-card :data-orderId="item.order_id" iClass="my-card" showModal="true">
            <div class="card-header" slot="header">
              <div>下单时间：
                <span>{{item.createTime}}</span>
              </div>

              <div :class="['bold', (item.order_status_id==3?'red':'gray')]" :style="(item.order_status_id==3?'color:'+skin.color:'')">
                {{item.status_name}}
              </div>
            </div>
            <div class="card-content" slot="content">
              <div class="content-wrap" v-if="item.is_pin==1">
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
              <div class="content-wrap" v-else>
                <div class="clearfix">
                  <!--<i-img height="60" iClass="['show-img', (idx<4?'mar-right-10':'')]" lazyLoad="true" :loadImage="img.goods_images" width="60" v-if="idx<4"    v-for="(img,idx) in item.goods_list" :key="img.id"></i-img>-->
                  <div height="60" class="show-img img-content" v-for="(img,idx) in item.goods_list" :key="img.order_goods_id">
                    <img   class="show-img img-def opacity show-img"  :src="img.goods_images"/>
                  </div>
                </div>
                <div class="dot" v-if="item.goods_list.length>=4">
                  <div class="dot-item"></div>
                  <div class="dot-item dot-middle"></div>
                  <div class="dot-item"></div>
                </div>
              </div>
              <div class="content-wrap" style="margin-top:12px" v-if="item.delivery_time && item.delivery_time!='' && item.delivery_date && item.delivery_date!=''">

                {{item.delivery=='pickup'?'提货时间:':'送货时间:'}} {{item.delivery_date}} [{{item.delivery_time}}]
              </div>
            </div>
            <div class="card-footer" slot="footer">
              <div>共
                <span class="i-class">{{item.goods_list.length}}</span> 件商品
                <div class="accual-pay" v-if="item.orderStatus!=3">实付：
                  <div class="money" v-if="item.type=='integral'">
                    <div v-if="item.shipping_fare>0">${{item.shipping_fare}} + </div>{{item.score}}积分
                  </div>
                  <div class="money" v-else>
                    ${{item.total}}
                  </div>
                </div>
              </div>
              <div class="button-group" v-if="item.order_status_id==3">
                <div @click="cancelOrder" class="my-button" data-show="cancelVisible" :data-type="item.order_id">取消订单</div>
                <!--<div  @click="showPaymentModal" class="my-button-pay padding-15" :data-type="item"  :style="{background: linear-gradient(90deg, skin.color 0%, skin.light 100%)}">立即支付</div>-->
                <div  @click="toShowPaymentModal" class="my-button-pay padding-15" :data-type="item"  :style="{color:skin.color,background:skin.light}">立即支付</div>
              </div>
              <div v-if="item.order_status_id==4">
                <div class="get-goods" :data-delivery="item.delivery" :data-type="item.order_id">
                  <div class="sure-get">{{item.delivery=='pickup'?'确认提货':'确认收货'}}</div>
                  <img class="right-arrow" src="@/assets/images/rightArrowImg.png"></img>
                </div>
              </div>
              <div v-if="item.order_status_id==1||item.order_status_id==6||item.order_status_id==11||item.order_status_id==14||item.order_status_id==15||item.order_status_id==16">
                <div class="my-button" :data-type="item.order_id" size="small">查看详情</div>
              </div>
            </div>
          </i-card>
        </div>
      </div>
      <div class="empty-wrap" v-else>
        <img class="empty-img" src="@/assets/images/noData.png"></img>
        <div class="empty-txt">暂无任何订单记录～</div>
      </div>
      <i-loadMore :tip="tip" v-if="!isHideLoadMore"></i-loadMore>
    </div>
  </div>

</template>

<script>
  import GlobalMixin from '../../mixin/globalMixin.js';
  //  import util from '../../utils/util.js';
  import status from '../../utils/index.js';
  import wcache from '../../utils/wcache.js';
  import auth from '../../utils/auth';
  import wx from '../../utils/wx';
  import request from '../../utils/request';


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
        showPaymentModal:false,
        showPayNowModal: false,
        showTransferModal:false,
        bankInfo:{},
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
          name: "全部"
        }, {
          id: 3,
          name: "待付款"
        }, {
          id: 1,
          name: "待配送"
        }, {
          id: 14,
          name: "配送中"
        }, {
          id: 4,
          name: "待提货"
        }, {
          id: 6,
          name: "已提货"
        } ],
        loadover:false,

      }
    },
    created: function() {
      this.$store.state.app.toolbarTitle ="我的订单";
      this.onLoad();
    },
    methods: {
      toShowPaymentModal: function(t){
        var b = t.currentTarget.dataset.type;
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
        this.showPayNowModal= true;

      },
      toClosePayNowModal:function(){
        this.showPayNowModal= false;
        this.getData();
      },
      toShowTransferModal:function(){
        this.setData({
          showTransferModal: true
        });
      },
      toCloseTransferModal:function(){
        this.setData({
          showTransferModal: false
        });
        this.getData();
      },

      copyText: function (e) {
        console.log(e)
        wx.setClipboardData({
          data: e.currentTarget.dataset.text,
          success: function (res) {
            wx.getClipboardData({
              success: function (res) {
                wx.showToast({
                  title: '复制成功'
                })
              }
            })
          }
        })
      },
      orderPayTransfer:function(){
        var this_ = this;
        wx.request({
          // 请求地址
          url: 'https://tuantuan.xx315.net/payment/transfer/bank.json',
          // 请求方式
          method: "get",
          dataType: 'json',
          responseType: 'text',
          // 方法
          success: function(data) {
            console.log(data);
            this_.setData({
              bankInfo: data.data.data
            });
          }
        })
        this_.toClosePaymentModal();
        this_.toShowTransferModal();
      },
      payNow :function(){
        var this_ = this;
        wx.request({
          // 请求地址
          url: 'https://tuantuan.xx315.net/payment/paynow/paynow.json',
          // 请求方式
          method: "get",
          dataType: 'json',
          responseType: 'text',
          // 方法
          success: function(data) {
            console.log(data);
            this_.setData({
              payNowQr: data.data.data.qr,
              payNowNo: data.data.data.payNowNo,
              payNowUen:data.data.data.uen
            });
          }
        })
        this.toClosePaymentModal();
        this.toShowPayNowModal();
      },
      havePaid: function(t){
        this.closePaymentModal();
        var this_ = this;
        var s = wx.getStorageSync("token"),a = this.data.currentItem;
        var type = t.currentTarget.dataset.type
        wx.showLoading(), app.util.request({
          url: "entry/wxapp/user",
          data: {
            controller: "order.pay_order",
            token: s,
            order_id: a.order_id,
            payment_code: type,
          },
          dataType: "json",
          method: "POST",
          success: function(t) {
            wx.hideLoading();
            this_.getData();
          }

        });
      },
      onLoad: function(t) {
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
            title: "支付成功"
          })
        }else if (isfail && isfail == 1){
          this.$wx.showToast({
            title: "支付失败",
            icon: "none"
          })
        }
        this.getData();
      },
      getData: function() {
        this.isHideLoadMore = true;
        this.no_order = 1;
        var that = this;
//        var token = wx.getStorageSync("token");
//        var token = "5a4ee9ec0afee923665513b17a928c05";
        var token = "aa8dfe90ff686cb87928e6a5523e44da";
        this.$http({
            controller: "order.orderlist",
//            token: token,
            page: that.page,
            order_status: that.order_status
          }).then(res=> {
              console.log(res);

               if (res.code == 0) {
                 let rushList = that.order.concat(res.data);
                 this.order = rushList;
                 this.hide_tip= true;
                 this.no_order= 0;
               } else {
                 if(that.page == 1 && that.order.length <= 0) this.is_empty = true;
                 that.isHideLoadMore = true;
                 return false;
               }
        });
      },
      goOrder: function(event) {
        let id = event.currentTarget.dataset.type;
        debugger
        this.$wx.redirectTo({
          url: '/lionfish_comshop/pages/order/order?id=' + id
        })
      },
      receivOrder: function(t) {
        let id = event.currentTarget.dataset.type;
        let delivery = event.currentTarget.dataset.delivery;
        var token = wx.getStorageSync('token');
        let content = "确认收到";
        if (delivery == "pickup") content = "确认提货";
        var that = this;

        this.$wx.showModal({
          title: "提示",
          content: "确认收到",
          confirmColor: "#F75451",
          success: function(res) {
            if (res.confirm) {
              this.$http({
                  controller: 'order.receive_order',
                  token: token,
                  order_id: id
                }).then(res=> {
                  if (res.code == 0) {
                    this.$wx.showToast({
                      title: '收货成功',
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
        let id = event.currentTarget.dataset.type;
//        var token = wx.getStorageSync('token');
        var token = "aa8dfe90ff686cb87928e6a5523e44da"
        var that = this;
        this.$wx.showModal({
          title: '取消支付',
          content: '好不容易挑出来，确定要取消吗？',
          confirmColor: '#F75451',
          success(res) {
            if (res.confirm) {
               this.$http({

                   controller: 'order.cancel_order',
                   token: token,
                   order_id: id
                 }).then(res=> {
                   this.$wx.showToast({
                     title: '取消成功',
                     icon: 'success',
                     duration: 1000
                   })
                   that.order_(that.order_status);

               })
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
        this.closePaymentModal();
        var e = wx.getStorageSync("token"), a = this.data.currentItem;

        app.util.request({
          url: "entry/wxapp/index",
          data: {
            controller: "car.wxpay",
            token: e,
            order_id: a.order_id
          },
          dataType: "json",
          method: "POST",
          success: function(t) {
            if (0 == t.data.code) {
              t.data.is_pin;
              wx.requestPayment({
                appId: t.data.appId,
                timeStamp: t.data.timeStamp,
                nonceStr: t.data.nonceStr,
                package: t.data.package,
                signType: t.data.signType,
                paySign: t.data.paySign,
                success: function(t) {
                  wx.redirectTo({
                    url: "/lionfish_comshop/pages/order/order?id=" + a + "&is_show=1"
                  });
                },
                fail: function(t) {
                  console.log(t);
                }
              });
            } else 2 == t.data.code && wx.showToast({
              title: t.data.msg,
              icon: "none"
            });
          }
        });
      },
      onReachBottom: function() {
        if (1 == this.data.no_order) return false;
        this.data.page += 1, this.getData(), this.setData({
          isHideLoadMore: false
        });
      },
      onPullDownRefresh: function() {
        this.setData({
          is_empty: false,
          page: 1,
          order: []
        }), wx.showLoading(), this.getData(), wx.stopPullDownRefresh();
      }
    }
  }
</script>

<style scoped>
  @import "index.less";
</style>
