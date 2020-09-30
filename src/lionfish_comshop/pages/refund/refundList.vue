<template>
  <div>
    <div class="refundList">

      <van-tabs v-model="currentTab" @change="bindChange" offset-top="49px" sticky>
        <van-tab  icon="home-o" :title="refund.name" v-for="(refund,index) in navList" :key="refund.id" >
          <div class="noRecordCon" v-if="refundList.length>0 && refundList[index] && refundList[index].length===0">
            <img class="noRefundImg" src="@/assets/images/noData.png"></img>
            <div class="noRecord">暂无任何退款记录</div>
          </div>
          <van-list v-model="LoadingComplete[currentTab]" :finished="no_order == 1" @load="getCurrentList" class="rush-list-box" v-else>


            <div @click.stop="goRefund" class="card" :data-type="item.ref_id" v-for="(item ,index) in order" :key="item.id">
              <div class="i-card my-card" :data-orderId="item.order_id" showModal="true">
                <div class="card-header" slot="header">
                  <div>{{$t('order.xiadanshijian')}}：
                    <span>{{item.createTime}}</span>
                  </div>
                  <div>
                    <span :class="['bold', item.order_status_id==3?'red':'gray']">{{item.status_name}}</span>
                  </div>
                </div>
                <div class="card-content" slot="content">
                  <div class="content-wrap">
                    <div>
                      <div>
                        <img :class="['show-img',i_inx<4?'mar-right-10':'']" height="60" :src="img.goods_images" width="60" v-if="i_inx<4" v-for="(img,i_inx) in item.goods_list" :key="i_inx"></img>
                      </div>
                      <div class="dot" v-if="item.orderSkuResps && item.orderSkuResps.length>=4">
                        <div class="dot-item"></div>
                        <div class="dot-item dot-middle"></div>
                        <div class="dot-item"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="card-footer" slot="footer">
                  <div>{{$t('order.gong')}}
                    <span class="i-class">{{item.goods_list.length}}</span> {{$t('order.jianshangpin')}}
                    <div class="accual-pay" v-if="item.orderStatus!=3">{{$t('order.paid')}}：
                      <div class="money">
                        ${{item.total}}
                      </div>
                    </div>
                  </div>
                  <div class="button-group" v-if="item.order_status_id==3">
                    <div catchtap="cancelOrder" class="my-button" data-show="cancelVisible" :data-type="item.order_id">{{$t('order.quxiaodingdan')}}</div>
                    <div catchtap="orderPay" class="my-button-pay padding-15" :data-type="item.order_id">{{$t('order.lijizhifu')}}</div>
                  </div>
                  <div v-if="item.order_status_id==4">
                    <div @click.stop="receivOrder" class="get-goods" :data-type="item.order_id">
                      <div class="sure-get">确认提货</div>
                      <img class="right-arrow" src="@/assets/images/rightArrowImg.png"></img>
                    </div>
                  </div>
                  <div v-if="item.order_status_id==1||item.order_status_id==6||item.order_status_id==11||item.order_status_id==14">
                    <div @click.stop="goOrder" class="my-button" :data-type="item.order_id" size="small">{{$t('order.chakanxiangqing')}}</div>
                  </div>
                </div>
              </div>
            </div>
            <i-load-more v-if="no_order == 1" :loading="false" :tip="$t('order.meiyougengduodingdan')"></i-load-more>

          </van-list>

        </van-tab>

      </van-tabs>

    </div>
  </div>

</template>

<script>
  import GlobalMixin from '../../mixin/globalMixin.js'
  import { Tab, Tabs } from 'vant';

  var app,wx
  export default {
    name: 'refund-list',
    components:{[Tab.name]:Tab,[Tabs.name]:Tabs},
    mixins: [ GlobalMixin ],
    data(){
      return{
        containerHeight: 0,
        scrollTop: 0,
        currentTab: 0,
        navList: [ {
          name: this.$t('common.quanbu'),
          status: "0"
        }, {
          name: this.$t('order.chulizhong'),
          status: "1"
        }, {
          name: this.$t('order.yituikuan'),
          status: "2"
        }, {
          name: this.$t('order.yijujue'),
          status: "3"
        } ],
        refundList: [],
        loading: !0,
        page: 1,
        loadover: !1,
        order_status: 12,
        no_order: 0,
        hide_tip: !0,
        order: [],
        tip: "正在加载",
        pageNum: [ 1, 1, 1, 1 ],
        pageSize: 20,
        loadText: "没有更多订单了~",
        LoadingComplete: [ false, false, false, false ],

      }

    },
    created:function(){
      wx = this.$wx,app = this.$app;

      wx.setNavigationBarTitle({
        title: 'Refund',
        showLogo: false,
        showMore: false,
        showBack: true
      })

      const t = this.$route.query
      this.onLoad(t)
    },
    mounted:function(){
      this.onShow();
    },
    methods:{
      onLoad: function(t) {
        var a = wx.getSystemInfoSync();
        this.currentTab = t.orderStatus || "0"
        this.containerHeight = a.windowHeight - Math.round(a.windowWidth / 375 * 55)
        this.getData();
      },
      getData: function() {
        this.isHideLoadMore = !0
        this.no_order = 1
        var e = this, t = wx.getStorageSync("token");
        app.util.request({
          url: "entry/wxapp/index",
          data: {
            controller: "order.refundorderlist",
            token: t,
            currentTab: e.currentTab,
            page: e.page,
            order_status: e.order_status
          },
          dataType: "json",
          success: function(t) {
            e.isHideLoadMore = !1
            e.LoadingComplete[e.currentTab] = false;

            if (0 != t.code){
              return !1;
            }else{
              var a = e.order.concat(t.data);
              e.order = a
              e.hide_tip = !0
              e.no_order = 0
              console.log(e.order)
            }


          }
        });
      },
      onShow: function() {
        this.pageNum = [ 1, 1, 1, 1, 1 ], this.loading = !0,
        this.getAllList();
      },
      getAllList: function() {
        var a = this;
        Promise.all([ this.getDataList({
          pageNum: 1,
          status: ""
        }), this.getDataList({
          pageNum: 1,
          status: 1
        }), this.getDataList({
          pageNum: 1,
          status: 3
        }), this.getDataList({
          pageNum: 1,
          status: 4
        }) ]).then(function(t) {
          a.loading = !1
        }).catch(function() {});
      },
      switchNav: function(t) {
        this.currentTab !== t.currentTarget.dataset.current && (
          this.currentTab = t.currentTarget.dataset.current
        );
      },
      bindChange: function(t) {
        this.no_order = 0,
          this.page = 1,
          this.order = [],
          this.getData();

      },
      getDataList: function(t) {
        return {
          pageNum: t.pageNum,
          pageSize: this.pageSize,
          status: t.status
        };
      },
      goRefund: function(t) {
        var a = t.currentTarget.dataset.type;
        wx.navigateTo({
          url: "/lionfish_comshop/pages/order/refunddetail?id=" + a
        });
      },
      goOrder: function(t) {
        var a = t.currentTarget.dataset.type;
        wx.navigateTo({
          url: "/lionfish_comshop/pages/order/order?id=" + a
        });
      },
      cancelApplication: function(t) {
        var a = this, r = t.detail;
        wx.showModal({
          title: "撤销申请",
          content: "您确定要撤销本次退款申请吗？",
          success: function(t) {
            t.confirm && (0, e.default)("/shop-return-order/refund/undo", {
              returnOrderNo: r
            }).then(function(t) {
              0 === t.head.error ? wx.showToast({
                title: "撤销成功",
                icon: "none"
              }) : wx.showToast({
                title: "该退款申请已处理",
                icon: "none"
              }), a.getAllList();
            }).catch(function() {});
          }
        });
      },
      onPullDownRefresh: function() {},
      getCurrentList: function() {
        if (1 == this.no_order) return !1;
        this.page += 1, this.getData(), this.isHideLoadMore = !1

      },
      onReachBottom: function() {},
      receivOrder: function(e) {
        var t = e.currentTarget.dataset.type || "", o = wx.getStorageSync("token"), a = this;
        wx.showModal({
          title: "提示",
          content: "确认收到",
          confirmColor: "#F75451",
          success: function(e) {
            e.confirm && app.util.request({
              url: "entry/wxapp/index",
              data: {
                controller: "order.receive_order",
                token: o,
                order_id: t
              },
              dataType: "json",
              success: function(e) {
                0 == e.data.code && (wx.showToast({
                  title: a.$t('order.shouhuochenghong'),
                  icon: "success",
                  duration: 1e3
                }), a.reload_data());
              }
            });
          }
        });
      },
    }
  }
</script>

<style scoped>

  .nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
    background: #fff;
    height: 9.2vw;
    border-top: 0.2vw solid #f2f2f2;
    border-bottom: 0.2vw solid #f2f2f2;
    padding: 0 6vw;
    width: unset;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .nav .orderList_item {
    margin-bottom: 0.4vw;
    font-size: 2.8vw;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: #666;
    position: relative;
    height: 9.6vw;
    line-height: 9.6vw;
  }

  .nav .orderList_item .line {
    position: absolute;
    bottom: 0;
    height: 0.6vw;
    width: 100%;
    background: linear-gradient(90deg,#ff4936 0%,#ff6e3c 100%);
    box-shadow: 0 0.4vw 0.8vw 0 rgba(255,89,0,0.25);
    border-radius: 2.4vw;
  }

  .nav .on {
    color: #ff5344;
  }

  .swiper-box {
    width: 100%;
    margin-top: 9vw;
  }

  .swiper-box .order-scroll-div {
    width: 100vw;
    height: 100%;
  }

  .swiper-box .noRecordCon {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .swiper-box .noRecordCon .noRecordImg {
    width: 13.2vw;
    height: 13.8vw;
    margin-top: 50%;
  }

  .swiper-box .noRecordCon .noRefundImg {
    width: 21.8vw;
    height: 21.8vw;
    margin-top: 50%;
  }

  .swiper-box .noRecordCon .noRecord {
    padding-top: 3.2vw;
    font-size: 3vw;
    font-family: PingFangSC-Light;
    font-weight: 300;
    color: #666;
    line-height: 3vw;
  }

  .swiper-box .noRecordCon .goIndex {
    width: 16.4vw;
    height: 6vw;
    background: #ff3432;
    border-radius: 3vw;
    font-size: 2.8vw;
    color: #fff;
    margin-top: 3vw;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .swiper-box .item {
    width: 96vw;
    height: 26.6vw;
    box-shadow: 0 0 4vw 0 rgba(0,0,0,0.05);
    border-radius: 2vw;
    margin: 2vw auto 0;
    background: #fff;
  }

  .swiper-box .item:last-of-type {
    margin: 2vw auto;
  }

  .refresh {
    width: 8vw;
    height: 8vw;
    border-radius: 50%;
    border: 0.1vw solid #999;
    position: fixed;
    right: 5vw;
    bottom: 20vw;
    font-size: 2vw;
    color: #fff;
    background: #000;
    opacity: 0.5;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .refresh img {
    width: 3.2vw;
    height: 3.2vw;
    margin-bottom: 0.4vw;
  }

  .refundList {
    background: #f6f6f6;
  }

  .card {
    margin-top: 2vw;
    margin-left: 2vw;
    color: #444;
  }

  .card .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 3vw;
    font-size: 2.4vw;
  }

  .card .card-content {
    padding: 3vw;
    border-top: 0.1vw solid #efefef;
    border-bottom: 0.1vw solid #efefef;
  }

  .card .card-content .content-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .card .card-content .show-img {
    float: left;
    width: 12vw!important;
    height: 12vw!important;
  }

  .card .card-content .dot {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .card .card-content .dot .dot-item {
    width: 1.2vw;
    height: 1.2vw;
    border-radius: 50%;
    background: #d8d8d8;
  }

  .card .card-content .dot .dot-middle {
    margin: 0 1vw;
  }

  .card .card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 3vw;
    font-size: 2.4vw;
  }

  .card .card-footer .money {
    font-size: 3.2vw;
    font-weight: bold;
    display: inline-block;
  }

  .card .card-footer .accual-pay {
    display: inline-block;
  }

  .empty-wrap {
    padding-top: 30vw;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .empty-wrap .empty-img {
    width: 21.8vw;
    height: 21.8vw;
  }

  .empty-wrap .empty-txt {
    font-size: 3vw;
    font-weight: 400;
    color: #777;
    margin-top: 3.2vw;
  }

  .padding-15 {
    margin-left: 1.6vw;
  }

  .button-group {
    display: flex;
    justify-content: space-between;
  }

  .my-button {
    position: relative;
    color: #666;
    padding: 2vw;
    height: 5.2vw;
    line-height: 2vw;
    font-size: 2.4vw;
    text-align: center;
  }

  .my-button::after {
    box-sizing: border-box;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 200%;
    height: 200%;
    transform: scale(0.5);
    transform-origin: 0 0;
    border: 0.2vw solid #b6b6b6;
    border-radius: 5.2vw;
    pointer-events: none;
  }

  .get-goods {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .get-goods .sure-get {
    color: #aaa;
  }

  .my-button-pay {
    position: relative;
    width: 13.6vw;
    height: 5.2vw;
    line-height: 5.2vw;
    font-size: 2.4vw;
    text-align: center;
    color: white;
    border: none;
    border-radius: 2.6vw;
    background: linear-gradient(90deg,#ff5041 0%,#ff877d 100%);
  }

  .right-arrow {
    width: 1.2vw;
    height: 2.2vw;
    margin-left: 1vw;
  }

  .bold {
    font-weight: 500;
  }

  .red {
    color: #ff5344;
    font-size: 2.4vw;
  }

  .gray {
    color: #aaa;
  }

  .i-card {
    width: 96vw;
    border-radius: 2vw;
    background: #fff;
    box-shadow: 0 0 4vw 0 rgba(0,0,0,0.05);
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
</style>
