<template>
  <div>
    <div class="section">
      <img class="groupDay" src="@/assets/images/groupDay.png"/>
      <div class="picker">
        <picker bindchange="bindDateChange" fields="month" mode="date" value="{{date">
          <div class="choose-day">
            <text>{{chooseDate}}</text>
            <text class="iconfont icon-xiatiao"></text>
          </div>
        </picker>
      </div>
      <div class="income">
        <text>预计佣金：${{permoney}}</text>
      </div>
    </div>
    <div class="distributionList">
      <div class="nav">
        <div bindtap="switchNav" class="orderList_item {{currentTab==item.status?'on':''}}" data-current="{{item.status}}" wx:for="{{navList}}" wx:key="id">{{item.name}}</div>
      </div>
      <swiper bindchange="bindChange" class="swiper-box" current="{{currentTab}}" duration="300" style="height:{{containerHeight}}px">
        <swiper-item wx:for="{{navList}}" wx:for-item="navItem" wx:key="id">
          <scroll-div scrollY bindscrolltolower="getCurrentList" class="order-scroll-div" scrollTop="{{scrollTop}}" style="height: {{containerHeight}}px">
            <div class="noRecordCon" v-if="order.length===0">
              <img class="noRecordImg" src="@/assets/images/noRecord.png"/>
              <div class="noRecord">还没有记录 快去分享吧～</div>
            </div>
            <block v-else>
              <div class="item" wx:for="{{order}}" wx:key="id">
                <div class="distributionNum">
                  <text class="distributionTime">{{item.order_num_alias}}</text>
                  <text class="statusName">{{item.status_name}}</text>
                </div>
                <div class="spu" wx:for="{{item.goods_list}}" wx:for-item="goods" wx:key="order_goods_id">
                  <img class="i-class goodsImg" mode="widthFix" src="{{goods.goods_images}}" style="width:60px;height:60px;"/>
                  <div class="detail">
                    <div class="goodsName">{{goods.name}}</div>
                    <div class="commission text-right">团单金额 ${{goods.total}} |
                      <text v-if="item.order_status_id!=11&&item.order_status_id!=6">预估</text>佣金 ${{goods.commision}}</div>
                    <div class="i-flex i-flex-spb text-right text-gray fsz-26 mt5" v-if="goods.has_refund_quantity>0">
                                        <span bindtap="handleTipDialog" class="i-flex-item">
                      佣金变化:<text class="red">${{goods.del_commision}}</text>
                                            <text class="iconfont icon-shuoming text-dark fsz-26" style="margin-left:10rpx;"></text>
                                        </span>
                    </div>
                  </div>
                </div>
                <div class="distributionCommision" v-if="item.shipping_fare!='免运费'&&item.delivery=='tuanz_send'">
                  <text class="fareCommision">配送收入: ${{item.shipping_fare}}</text>
                  <text class="totalCommision">合计佣金: ${{item.total_commision}}（含配送）</text>
                </div>
                <div class="distributionCommision" v-else>
                  <text class="totalCommision" v-if="item.order_status_id!=5&&item.order_status_id!=7">合计佣金: ${{item.total_commision}}</text>
                </div>
              </div>
              <i-loadMore tip="{{tip}}" v-if="!isHideLoadMore"></i-loadMore>
            </block>
          </scroll-div>
        </swiper-item>
      </swiper>
    </div>
    <div bindtap="refresh" class="refresh">
      <text class="iconfont icon-shuaxin refreshImg"></text>
      <span>刷新</span>
    </div>
    <i-dialog bind:cancel="handleTipDialog" bind:confirm="handleTipDialog" confirmText="知道了" iBtn="dialogBtn" iClass="dialogText" showCancel="{{false}}" text="您的”粉丝“购买的商品进行了申请售后，售后成功部分商品进行退款佣金发生变化。" visible="{{showTipDialog"></i-dialog>
  </div>

</template>

<script>
  var _data,app,wx;

  function _defineProperty(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
      value: a,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : t[e] = a, t;
  }

  export default {
    name: '',
    data(){
      return{

      }
    },
    created: function() {
      wx = this.$wx;
      app = this.$app;

      this.$wx.setNavigationBarTitle({
        title: '分销记录',
        showLogo:false,
        showMore:false,
        showBack:true
      })
      this.onLoad();
    },
    methods: {
      onLoad: function(t) {
        var e = wx.getSystemInfoSync();
        this.setData({
          containerHeight: e.windowHeight - Math.round(e.windowHeight / 375 * 55)
        });
      },
      onShow: function() {
        var t = new Date(), e = t.getFullYear(), a = t.getMonth() + 1, o = Date.parse(t);
        this.setData({
          page: 1,
          order: [],
          chooseDate: e + "年" + a + "月",
          chooseDateTime: o
        }), this.getData(), this.get_month_money();
      },
      get_month_money: function() {
        var t = this.data.chooseDate, e = this, a = wx.getStorageSync("token");
        app.util.request({
          url: "entry/wxapp/index",
          data: {
            controller: "order.order_commission",
            token: a,
            chooseDate: t
          },
          method: "post",
          dataType: "json",
          success: function(t) {
            0 == t.data.code ? e.setData({
              permoney: t.data.money
            }) : e.setData({
              permoney: 0
            });
          }
        });
      },
      getData: function() {
        wx.showLoading({
          title: "加载中...",
          mask: !0
        }), this.setData({
          isHideLoadMore: !0
        }), this.data.no_order = 1;
        var o = this, t = this.data.chooseDate, e = wx.getStorageSync("token"), a = this.data.currentTab, n = -1;
        0 == a ? n = -1 : 1 == a ? n = 22 : 2 == a ? n = 6 : 3 == a && (n = 357), app.util.request({
          url: "entry/wxapp/index",
          data: {
            controller: "order.orderlist",
            is_tuanz: 1,
            token: e,
            chooseDate: t,
            page: o.data.page,
            order_status: n
          },
          method: "post",
          dataType: "json",
          success: function(t) {
            if (0 != t.data.code) return o.setData({
              isHideLoadMore: !0
            }), wx.hideLoading(), !1;
            console.log(o.data.page);
            var e = t.data.data, a = o.data.order.concat(e);
            o.setData({
              order: a,
              hide_tip: !0,
              no_order: 0
            }), wx.hideLoading();
          }
        });
      },
      refresh: function() {
        var t = this;
        this.setData({
          page: 1,
          order: []
        }, function() {
          t.getData();
        });
      },
      onHide: function() {},
      bindChange: function(t) {
        var e = this;
        this.setData({
          currentTab: 1 * t.detail.current
        }), this.setData({
          order: [],
          page: 1,
          no_order: 0
        }, function() {
          console.log("我变啦"), e.getData();
        });
      },
      switchNav: function(t) {
        if (this.data.currentTab === 1 * t.target.dataset.current) return !1;
        this.setData({
          currentTab: 1 * t.target.dataset.current
        });
      },
      onUnload: function() {},
      onPullDownRefresh: function() {
        this.getData();
      },
      bindDateChange: function(t) {
        console.log("picker发送选择改变，携带值为", t.detail.value), this.setData({
          date: t.detail.value
        });
        var e = this.data.date.split("-"), a = Date.parse(this.data.date);
        this.setData({
          chooseDate: e[0] + "年" + e[1] + "月",
          chooseDateTime: a,
          order: [],
          page: 1,
          no_order: 0
        }), this.getData(), this.get_month_money();
      },
      getCurrentList: function() {
        if (console.log(this.data.no_order), 1 == this.data.no_order) return !1;
        this.data.page += 1, this.getData(), this.setData({
          isHideLoadMore: !1
        });
      },
      onReachBottom: function() {
        if (console.log(this.data.no_order), 1 == this.data.no_order) return !1;
        this.data.page += 1, this.getData(), this.setData({
          isHideLoadMore: !1
        });
      },
      handleTipDialog: function() {
        this.setData({
          showTipDialog: !this.data.showTipDialog
        });
      },
      onShareAppMessage: function() {}
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
    width: 16vw;
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
    box-shadow: 0 0 4vw 0 rgba(0,0,0,0.05);
    border-radius: 2.0vw;
    margin: 2.0vw auto 0;
    background: #fff;
  }

  .swiper-box .item:last-of-type {
    margin: 2.0vw auto;
  }

  .refresh {
    width: 8vw;
    height: 8vw;
    border-radius: 50%;
    border: 0.2vw solid #999;
    box-shadow: 0.2vw 0.2vw 0.4vw #999;
    position: fixed;
    right: 5vw;
    bottom: 20vw;
    font-size: 2.0vw;
    color: #666;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .refresh .refreshImg {
    font-size: 3.2vw;
    color: #000;
    margin-bottom: 0.4vw;
  }

  swiper-item {
    height: auto;
  }

  .section {
    position: fixed;
    width: 80vw;
    top: 0;
    display: flex;
    font-size: 2.8vw;
    color: #666;
    padding: 2.0vw 3vw;
    background-color: #fff;
  }

  .section .groupDay {
    width: 3.6vw;
    height: 3.6vw;
  }

  .section .picker {
    margin-left: 2.0vw;
    display: flex;
    flex: 1;
  }

  .section .picker .choose-day .iconfont {
    font-size: 1.2vw;
    margin-left: 0.6vw;
    vertical-align: middle;
    color: #999;
  }

  .distributionList {
    width: 100%;
  }

  .distributionList .nav {
    top: 8vw;
  }

  .distributionList .on {
    color: #fe8464;
    border-bottom: 0.4vw solid #fe8464;
    margin: 0;
  }

  .distributionList .swiper-box {
    margin-top: 17vw;
  }

  .item {
    background: #fff;
    overflow: hidden;
    border-top-left-radius: 2.0vw;
    border-top-right-radius: 2.0vw;
  }

  .distributionNum {
    height: 8vw;
    font-size: 2.6vw;
    color: #333;
    padding: 0 3vw;
    border-top-left-radius: 2.0vw;
    border-top-right-radius: 2.0vw;
    border-bottom: 0.2vw solid #e4e4e4;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .distributionNum .distributionTime {
    font-size: 2.4vw;
    color: #666;
  }

  .distributionNum .statusName {
    font-size: 2.6vw;
    color: #fe8464;
  }

  .spu {
    padding: 2.0vw 3vw;
    display: flex;
    justify-content: flex-start;
  }

  .spu .goodsImg {
    height: 12vw;
    margin-right: 3vw;
  }

  .spu .detail {
    font-size: 2.8vw;
    color: #333;
  }

  .spu .detail .goodsName {
    color: #333;
    font-size: 2.8vw;
    line-height: 4.0vw;
    height: 8vw;
    width: 54vw;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: initial;
    white-space: normal;
  }

  .spu .detail .commission {
    font-size: 2.4vw;
    color: #999;
    line-height: 4.0vw;
  }

  .distributionCommision {
    border-top: 0.2vw solid #e4e4e4;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 8vw;
    font-size: 2.6vw;
    color: #777;
    padding: 0 3vw;
  }

  .distributionCommision text {
    margin-left: 3vw;
  }

  .dialogText {
    box-sizing: border-box;
    padding: 2.0vw;
    height: 14vw!important;
    text-align: justify;
  }

  .dialogBtn {
    font-size: 3vw!important;
    height: 6.8vw!important;
    line-height: 6.8vw!important;
  }
</style>
