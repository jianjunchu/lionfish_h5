<template>
  <div>
    <div class="groupList">
      <div class="fixed-top">
        <div class="nav-bar">
          <div class="nav-bar-inner">
            <!--<div @click="switchNav" :class="['nav-bar-item', (currentTab==idx?'current':'')]" :data-id="item.id" v-for="(item,idx) in navList" :key="item.id">{{item.name}}</div>-->
            <div @click="switchNav" :class="['nav-bar-item', (currentTab==idx?'current':'')]" :data-id="item.id" v-for="(item,idx) in navList" :key="item.id">{{item.name}}</div>
          </div>
        </div>
        <div class="search-box i-flex">
          <div class="filed">
            <!--<picker bindchange="bindFiledChange" :range="searchfield" rangeKey="'name'" :value="fieldIdx">-->
              <!--<div class="picker">{{searchfield[fieldIdx].name}} <span class="iconfont icon-xiatiao"></span>-->
              <!--</div>-->
            <!--</picker>-->
            <select @change='bindFiledChange' v-model="fieldIdx">
              <option v-for="x in searchfield" :value="x.field">{{x.name}}</option>
            </select>
          </div>
          <div class="search">
            <sapn class="iconfont icon-sousuo1 icon-search" size="14" type="search"></sapn>
            <!--<input bindconfirm="searchByKey" confirmType="done" placeholder="请输入关键词" type="span" :value="keyword"></input>-->
            <input @keyup.enter="searchByKey"  placeholder="Input Keywords"  v-model="keyword"></input>
          </div>
        </div>
      </div>
      <!--<div class="content-list">-->
      <van-list  @load="onReachBottom" class="content-list">
        <div class="noRecordCon" v-if="order.length<=0">
          <img class="noRecordImg" src="@/assets/images/noRecord.png"></img>
          <div class="noRecord">No Orders～</div>
          <a hoverClass="none" openType="switchTab" href="#/lionfish_comshop/pages/index/index">
            <div class="goIndex">To Buy</div>
          </a>
        </div>
        <div v-else>
          <div class="item" v-for="(item,idx) in order" :key="item.order_id">
            <div class=""  v-for="(goods,idx) in item.goods_list" :key="goods.order_goods_id">
              <div class="orderNum">
                <span>Member Order Date：{{item.createTime}}</span>
                <span :class="[(item.order_status_id==11?'black':''), 'statusName']">{{item.status_name}}</span>
              </div>
              <div class="spu">
                <img class="i-class goodsImg" mode="widthFix" :src="goods.goods_images"/>
                <div class="detail">
                  <div class="spuName">
                    <span>{{goods.name}}</span>
                  </div>
                  <div class="tips">
                    <span>Quantity：{{goods.quantity}}</span>
                    <span class="last" v-if="goods.option_str!=''">Specification：{{goods.option_str}}</span>
                  </div>
                  <div class="tips">
                    <span>Amount：${{goods.total}}</span>
                  </div>
                  <div class="tips i-flex i-flex-spb">
                    <div>Valid Amount: <span class="red">${{goods.order_jishu}}</span>
                    </div>
                    <div v-if="goods.fen_type==1">Fixed Commission: <span class="red">{{goods.fen_gumoney}}</span>
                    </div>
                    <div v-if="goods.fen_type==0">Commssion Rate: <span class="red">{{goods.fen_bili}}%</span>
                    </div>
                  </div>
                  <div class="tips i-flex i-flex-spb">
                    <div>Host Freight: <span class="red">${{goods.head_shipping_fare||0}}</span>
                    </div>
                    <div @click="handleTipDialog" :data-type="goods.fen_type==1">
                      Real Commission: <span class="red">${{goods.commision}}</span>
                      <span class="iconfont icon-shuoming text-dark fsz-28" style="margin-left:5px;"></span>
                    </div>
                  </div>

                  <div class="tips i-flex i-flex-spb" v-if=" goods.is_show_presell">
                    <div>
                      {{item.delivery=='pickup'?'Delivery Date:':'Delivery Date:'}}[Pre-Order] {{goods.begin_time_str}} [{{item.delivery_time}}]
                    </div>
                  </div>
                  <div class="tips i-flex i-flex-spb" v-else>
                    {{item.delivery=='pickup'?'Delivery Date:':'Delivery Date:'}} {{item.delivery_date}} [{{item.delivery_time}}]
                  </div>

                </div>
              </div>
            </div>
            <div class="song_button">
              <div @click="callPhone" class="goods-sign-btn" :data-phone="item.shipping_tel" >
                <img src="@/assets/images/phone.png" /> <span >{{item.shipping_name}}</span>
              </div>
              <div class="song_button_item">
                <div @click="sign_one" class="goods-sign-btn" :data-order_id="item.order_id" v-if="currentTab==2">
                  <span >Confirm Received</span>
                </div>
                <div @click="goOrderDetail" class="goods-sign-btn gray" :data-order_id="item.order_id">
                  <span >Detail</span>
                </div>
              </div>
            </div>
          </div>
          <i-loadMore :tip="tip" v-if="!isHideLoadMore"></i-loadMore>
        </div>
      <!--</div>-->
      </van-list>
    </div>
    <i-modal scrollUp="false" :visible="showTipDialog">
      <div class="rule-modal bg-f w90p rounded">
        <div class="fsz-30 weight border-bottom text-center py10">佣金计算规则</div>
        <div class="p15 border-bottom fsz-24 line-height">
          <div class="mb5 i-flex">
            <div class="text-gray">佣金结算前：</div>有效金额=商品金额-退款金额</div>
          <div class="mb5 i-flex">
            <div class="text-gray">佣金结算后：</div>有效金额=商品金额</div>
          <div class="mb5 i-flex">
            <div class="text-gray">佣金固定金额：</div>
            <div class="i-flex-item">实际佣金（有效金额-退款金额）/有效金额*佣金固定金额</div>
          </div>
          <div class="mb5 i-flex" v-if="fen_type==0">
            <div class="text-gray">商品配送费：</div>
            <div class="i-flex-item">商品配送费收入=有效金额/订单总金额*总配送费</div>
          </div>
          <div v-else>
            <div class="mb5 i-flex">
              <div class="text-gray">商品配送费：</div>
              <div class="i-flex-item">
                <div>1. 商品配送费收入=有效金额/订单总金额*总配送费</div>
                <div>2. 退商品配送费=退款金额/有效金额*配送费</div>
              </div>
            </div>
            <div class="mb5 i-flex">
              <div class="text-gray">配送费结算时间：</div>
              <div class="i-flex-item">从确认收货或核销后开始，直到售后期<div v-if="open_aftersale">{{open_aftersale_time||0}}天</div>结束，系统自动结算</div>
            </div>
          </div>
          <div class="mb5 i-flex">
            <div class="text-gray">佣金结算时间：</div>
            <div class="i-flex-item">从确认收货或核销后开始，直到售后期<div v-if="open_aftersale">{{open_aftersale_time||0}}天</div>结束，系统自动结算</div>
          </div>
          <div class="mb5 red">最终可得佣金以实际计算结果为准</div>
        </div>
        <div @click="handleTipDialog" class="fsz-30 bule text-center py10">知道了</div>
      </div>
    </i-modal>
  </div>


</template>

<script>
  import GlobalMixin from '../../mixin/globalMixin.js';
  import status from '../../utils/index.js'

  var _extends = Object.assign || function(e) {
      for (var t = 1; t < arguments.length; t++) {
        var a = arguments[t];
        for (var r in a) Object.prototype.hasOwnProperty.call(a, r) && (e[r] = a[r]);
      }
      return e;
    }, page = 1;
//    var app = this.$getApp();

  export default {
    mixins: [GlobalMixin],
    name:'groupcenter-groupList',
    data() {
      return {
        currentTab: 0,
        pageSize: 10,
        navList: [ {
          name: this.$t('common.quanbu'),
          id: "0"
        }, {
          name: this.$t('common.daipeisong'),
          id: "1"
        }, {
          name: this.$t('common.daiqianshou'),
          id: "2"
        }, {
          name: this.$t('common.daitihuo'),
          id: "3"
        }, {
          name: this.$t('common.yiwancheng'),
          id: "4"
        } ],
        loadText: "",
        disUserId: "",
        no_order: 0,
        page: 1,
        hide_tip: !0,
        order: [],
        tip: "Loading",
        searchfield: [ {
          field: "ordersn",
          name: "Order NO."
        }, {
          field: "member",
          name: "Member"
        }, {
          field: "address",
          name: "Contact"
        }, {
          field: "mobile",
          name: "Mobile"
        }, {
          field: "location",
          name: "Address"
        }, {
          field: "goodstitle",
          name: "Product"
        } ],
        fieldIdx: 'ordersn',
        value:'',
        groupInfo: {
          group_name: "社区",
          owner_name: "Host"
        },
        searchOBj: {},
        open_aftersale: 0,
        open_aftersale_time: 0,
        fen_type:0,
        showTipDialog:'',
        keyword:''
      }
    },
    created: function() {
      this.onLoad();
    },
    methods: {
      onLoad: function(e) {
        var query = this.$route.query;
        var t = this;
        status.setGroupInfo().then(function(e) {
          t.groupInfo= e;
        });
        this.page = 1;
        var a = 0;
        var currentTab = 0;
        if (query != undefined) {
          currentTab = query.tab;
        }
        this.currentTab= currentTab;
        this.getData(currentTab);
      },
      onShow: function() {},
      bindFiledChange: function() {

//        this.fieldIdx= e.detail.value;
      },
      searchByKey: function() {

//        var t = this, a = this.data, r = a.searchfield[a.fieldIdx].field, n = e.detail.value || "";
//        this.searchOBj = {
//          keyword: n,
//          searchfield: r
//        }, this.page= 1,
//          this.order= []
//        ,
//          t.getData();
//        ;
        this.searchOBj = {
          keyword: this.keyword,
          searchfield: this.fieldIdx
        }, this.page= 1,
          this.order= []
        ,
          this.getData();

      },
      callPhone: function(e) {

        var t = e.currentTarget.dataset.phone;
//        t && this.$wx.makePhoneCall({
//          phoneNumber: t
//        });
        var url = "tel:"+t;
        window.location.href = url;
      },
      switchNav: function(e) {
        if (this.currentTab === 1 * e.currentTarget.dataset.id) return !1;
        this.currentTab= 1 * e.currentTarget.dataset.id,
          this.page= 1,
          this.order= []
        , this.getData();
      },
      getData: function() {
        this.$wx.showLoading({
          title: "加载中...",
          mask: true
        });
        this.isHideLoadMore= true;
        this.no_order = 1;
        var that = this;
        var token= this.$wx.getStorageSync("token");

        var  currentTab = this.currentTab;
        var order_status = -1;
        if (currentTab == 1) {
          order_status = 1;
        } else if (currentTab == 2) {
          order_status = 14;
        } else if (currentTab == 3) {
          order_status = 4;
        } else if (currentTab == 4) {
          order_status = 6;
        }


//        var data= _extends({
//          controller: "order.orderlist",
//          is_tuanz: 1,
//          token: e,
//          page: o.page,
//          order_status: a
//        }, this.searchOBj);

          this.$http({
            controller: "order.orderlist",
            is_tuanz: 1,
            token: token,
            page: that.page,
            order_status: order_status,
            keyword: that.keyword,
            searchfield: that.fieldIdx
          }).then(res=> {
              console.log(res,"orderlist");

              var open_aftersale= res.open_aftersale;
              var open_aftersale_time = res.open_aftersale_time;
              let h = { open_aftersale, open_aftersale_time };
               if (res.code == 0) {
                 console.log(that.page);
                 let data = res.data;
                 let rushList = that.order.concat(data);
                 that.order= rushList;
                 that.hide_tip= true;
                 that.no_order= 0;
                 that.open_aftersale=open_aftersale;
                 that.open_aftersale_time=open_aftersale_time;
                 that.$forceUpdate();
                 that.$wx.hideLoading();
               } else {
                 that.isHideLoadMore= true;
                 that.open_aftersale=open_aftersale;
                 that.open_aftersale_time=open_aftersale_time;
                 that.$forceUpdate();
                 that.$wx.hideLoading();
                 return false;
               }

        });
      },
      sign_one: function(e) {
        var n = this, o = e.currentTarget.dataset.order_id, t = this.$wx.getStorageSync("token");
        this.$wx.showModal({
          title: n.$t('cart.tishi'),
          content: n.$t('order.querentihuo'),
          confirmColor: "#F75451",
          success: function(e) {
            if(e.confirm){
              n.$http({
                controller: "order.sign_dan_order",
                token: t,
                order_id: o
              }).then(e=> {
                n.$wx.showToast({
                  title: "Success",
                  duration: 1e3
                });
                var t = n.order, a = [];
                for (var r in t) t[r].order_id != o && a.push(t[r]);
                n.order= a;

              });
            }
          }
        });
      },
      goOrderDetail: function(e) {
        var t = e.currentTarget.dataset.order_id;
        this.$wx.redirectTo({
          url: "/lionfish_comshop/pages/groupCenter/groupDetail?groupOrderId=" + t
        });
      },
      onReachBottom: function() {
        if (1 == this.no_order) return !1;
        this.page += 1, this.getData(), this.isHideLoadMore= !1;
      },
      handleTipDialog: function(e) {
        var t = e.currentTarget.dataset.type || 0;
        this.showTipDialog= !this.data.showTipDialog,
          this.fen_type= t;
      }
    }
  }
</script >
<style   scoped>
  .fixed-top {
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 10;
  }

  .nav-bar .nav-bar-inner {
    display: flex;
    justify-content: space-between;
    padding: 0 30px;
    background-color: #fff;
    margin-top:50px;
  }

  .nav-bar .nav-bar-item {
    position: relative;
    word-break: keep-all;
    font-size: 14px;
    font-weight:bold;
    color: #666;
    padding: 10px 0;
  }

  .nav-bar .current.nav-bar-item::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 3px;
    background: linear-gradient(90deg,#ff4936 0%,#ff6e3c 100%);
    box-shadow: 0px 2px 4px 0px rgba(255,89,0,0.25);
    border-radius: 12px;
  }

  .content-list {
    background-color: #f6f6f6;
    padding-top: 100px;
    height: 100%;
  }

  .order-scroll-view {
    width: 375px;
    height: 100%;
  }

  .noRecordCon {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .noRecordCon .noRecordImg {
    width: 66px;
    height: 69px;
    margin-top: 50%;
  }

  .noRecordCon .noRefundImg {
    width: 109px;
    height: 109px;
    margin-top: 50%;
  }

  .noRecordCon .noRecord {
    padding-top: 16px;
    font-size: 15px;
    font-family: PingFangSC-Light;
    font-weight: 300;
    color: #666;
    line-height: 15px;
  }

  .noRecordCon .goIndex {
    width: 82px;
    height: 30px;
    background: #ff3432;
    border-radius: 15px;
    font-size: 14px;
    color: #fff;
    margin-top: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .refresh {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 0.5px solid #999;
    position: fixed;
    right: 25px;
    bottom: 100px;
    font-size: 10px;
    color: #fff;
    background: #000;
    opacity: 0.5;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .refresh image {
    width: 16px;
    height: 16px;
    margin-bottom: 2px;
  }

  .groupList {
    width: 100%;
  }

  .groupList .nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
    background: #fff;
    height: 45px;
    border-top: 0.5px solid #f2f2f2;
    border-bottom: 0.5px solid #f2f2f2;
    padding: 0 50px;
    width: unset;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .groupList .nav .on {
    color: #be965a;
  }

  .groupList .nav .line {
    background: linear-gradient(90deg,#ffd59a 0%,#e5b983 100%);
    box-shadow: 0px 2px 4px 0px rgba(229,185,131,0.5);
    border-radius: 12px;
  }

  .groupList .noRecordCon {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .groupList .noRecordCon .noRecordImg {
    width: 109px;
    height: 109px;
    margin-top: 100px;
  }

  .groupList .noRecordCon .noRefundImg {
    width: 79px;
    height: 70px;
    margin-top: 100px;
  }

  .groupList .noRecordCon .noRecord {
    padding-top: 9px;
    font-size: 14px;
    color: #999;
  }

  .groupList .noRecordCon .goIndex {
    width: 82px;
    height: 30px;
    background: linear-gradient(90deg,#f0daad 0%,#e7c98f 100%);
    border-radius: 15px;
    font-size: 14px;
    color: #fff;
    margin-top: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .groupList .item {
    margin-bottom: 10px;
    overflow: hidden;
  }

  .song_button {
    position: relative;
    padding: 10px 15px;
    display: flex;
    justify-content: space-between;
    border-top: 0.5px solid #efefef;
  }

  .goods-sign-btn {
    display: inline-block;
    height: 5.4vw;
    padding: 0 2.4vw;
    font-size: 3vw;
    border: 0.2vw solid #f75451;
    border-radius: 5.2vw;
    text-align: center;
    line-height: 5.2vw;
    color: #f75451;

  }

  .goods-sign-btn.gray {
    color: #666;
    border: 1px solid #efefef;
    margin-left: 7px;
  }

  .goods-sign-btn img {
    width: 12px;
    height: 12px;
  }

  swiper-item {
    height: auto;
  }

  .item {
    background: #fff;
    overflow: hidden;
    box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.05);
    border-radius: 10px;
    margin: 0px 10px;
  }

  .orderNum {
    height: 40px;
    font-size: 13px;
    color: #333;
    padding: 0 15px;
    border-bottom: 0.5px solid #efefef;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .orderNum .statusName {
    color: #be965a;
    font-weight: 500;
  }

  .orderNum .black {
    color: #aaa;
  }

  .spu {
    padding: 15px 15px 10px;
    display: flex;
    justify-content: flex-start;
  }

  .spu .goodsImg {
    width: 60px;
    height: 60px;
    margin-right: 10px;
  }

  .spu .goodsImg .img-class {
    width: 60px;
    height: 60px;
  }

  .spu .detail {
    margin-left: 10px;
    font-size: 12px;
    color: #aaa;
  }

  .spu .detail .spuName {
    color: #444;
    font-size: 14px;
    font-weight: 500;
    overflow: hidden;
  }

  .spu .detail .tips {
    line-height: 1;
    width: 265px;
    margin-top: 8px;
    position: relative;
  }

  .spu .detail .tips .last {
    float: right;
  }

  .spu .detail .tips .price {
    color: #ff5344;
    font-size: 16px;
  }

  .gold {
    color: gold;
  }

  .commision-box {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    justify-content: space-between;
    font-size: 13px;
    color: #777;
    margin-bottom: 15px;
    padding-left: 70px;
    padding-right: 15px;
  }

  .search-box {
    background: #fff;
    padding: 10px 15px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
  }

  .filed {
    width: 95px;
    margin-right: 10px;
    border: 0.5px solid #ececec;
    box-sizing: border-box;
    height: 28px;
    line-height: 28px;
    padding: 0 7.5px;
    font-size: 12px;
    border-radius: 3px;
  }

  .filed .picker {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .filed .iconfont {
    font-size: 7px;
    color: #ccc;
  }

  .filed select {
    border: 0px;
  }

  .search {
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex: 1;
  }

  .search .icon-search {
    position: absolute;
    color: #cccccc;
    left: 10px;
  }

  .search input {
    padding-left: 30px;
    width: 100%;
    height: 28px;
    background: #f8f8f8;
    border-radius: 3px;
    color: #999;
    box-sizing: border-box;
    line-height: 20px;
    border: 0px;
  }

  .search text {
    color: #ff673f;
    margin-left: 14px;
  }

  .dialogText {
    box-sizing: border-box;
    padding: 10px;
    height: 70px!important;
    text-align: justify;
  }

  .dialogBtn {
    font-size: 15px!important;
    height: 34px!important;
    line-height: 34px!important;
  }

</style>
