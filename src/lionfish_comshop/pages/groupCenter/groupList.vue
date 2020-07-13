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
            <!--<icon class="icon-search" size="14" type="search"></icon>-->
            <!--<input bindconfirm="searchByKey" confirmType="done" placeholder="请输入关键词" type="span" :value="keyword"></input>-->
            <input @keyup.enter="searchByKey"  placeholder="请输入关键词"  v-model="keyword"></input>
          </div>
        </div>
      </div>
      <div class="content-list">
        <div class="noRecordCon" v-if="order.length<=0">
          <img class="noRecordImg" src="@/assets/images/noRecord.png"></img>
          <div class="noRecord">您还没有相关的订单～</div>
          <a hoverClass="none" openType="switchTab" href="#/lionfish_comshop/pages/index/index">
            <div class="goIndex">去购物</div>
          </a>
        </div>
        <div v-else>
          <div class="item" v-for="(item,idx) in order" :key="item.order_id">
            <div class=""  v-for="(goods,idx) in item.goods_list" :key="goods.order_goods_id">
              <div class="orderNum">
                <span>团单日期：{{item.createTime}}</span>
                <span :class="[(item.order_status_id==11?'black':''), 'statusName']">{{item.status_name}}</span>
              </div>
              <div class="spu">
                <img class="i-class goodsImg" mode="widthFix" :src="goods.goods_images"/>
                <div class="detail">
                  <div class="spuName">
                    <span>{{goods.name}}</span>
                  </div>
                  <div class="tips">
                    <span>商品数量：{{goods.quantity}}</span>
                    <span class="last" v-if="goods.option_str!=''">规格：{{goods.option_str}}</span>
                  </div>
                  <div class="tips">
                    <span>商品金额：${{goods.total}}</span>
                  </div>
                  <div class="tips i-flex i-flex-spb">
                    <div>有效金额: <span class="red">${{goods.order_jishu}}</span>
                    </div>
                    <div v-if="goods.fen_type==1">佣金固定金额: <span class="red">{{goods.fen_gumoney}}</span>
                    </div>
                    <div v-if="goods.fen_type==0">佣金比例: <span class="red">{{goods.fen_bili}}%</span>
                    </div>
                  </div>
                  <div class="tips i-flex i-flex-spb">
                    <div>团长配送费: <span class="red">${{goods.head_shipping_fare||0}}</span>
                    </div>
                    <div @click="handleTipDialog" :data-type="goods.fen_type==1">
                      实际佣金: <span class="red">${{goods.commision}}</span>
                      <span class="iconfont icon-shuoming text-dark fsz-28" style="margin-left:5px;"></span>
                    </div>
                  </div>

                  <div class="tips i-flex i-flex-spb" v-if="item.delivery_time && item.delivery_time!='' && item.delivery_date && item.delivery_date!=''">
                    <div>
                      {{item.delivery=='pickup'?'提货时间:':'送货时间:'}} {{item.delivery_date}} [{{item.delivery_time}}]
                    </div>

                  </div>

                </div>
              </div>
            </div>
            <div class="song_button">
              <div @click="callPhone" class="goods-sign-btn" :data-phone="item.shipping_tel">
                <img src="@/assets/images/phone.png" /> <span style="font-size:medium">{{item.shipping_name}}</span>
              </div>
              <div class="song_button_item">
                <div @click="sign_one" class="goods-sign-btn" :data-order_id="item.order_id" v-if="currentTab==2">
                  <span style="font-size:medium">确认签收</span>
                </div>
                <div @click="goOrderDetail" class="goods-sign-btn gray" :data-order_id="item.order_id">
                  <span style="font-size:medium">查看详情</span>
                </div>
              </div>
            </div>
          </div>
          <i-loadMore :tip="tip" v-if="!isHideLoadMore"></i-loadMore>
        </div>
      </div>
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
          name: "全部",
          id: "0"
        }, {
          name: "待配送",
          id: "1"
        }, {
          name: "待签收",
          id: "2"
        }, {
          name: "待提货",
          id: "3"
        }, {
          name: "已完成",
          id: "4"
        } ],
        loadText: "",
        disUserId: "",
        no_order: 0,
        page: 1,
        hide_tip: !0,
        order: [],
        tip: "正在加载",
        searchfield: [ {
          field: "ordersn",
          name: "订单号"
        }, {
          field: "member",
          name: "会员昵称"
        }, {
          field: "address",
          name: "配送联系人"
        }, {
          field: "mobile",
          name: "下单手机号"
        }, {
          field: "location",
          name: "配送地址"
        }, {
          field: "goodstitle",
          name: "商品标题"
        } ],
        fieldIdx: 'ordersn',
        value:'',
        groupInfo: {
          group_name: "社区",
          owner_name: "团长"
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
          title: "提示",
          content: "确认提货",
          confirmColor: "#F75451",
          success: function(e) {
            e.confirm && this.$http({

                controller: "order.sign_dan_order",
                token: t,
                order_id: o
              }).then(e=> {
                this.$wx.showToast({
                  title: "签收成功",
                  duration: 1e3
                });
                var t = n.order, a = [];
                for (var r in t) t[r].order_id != o && a.push(t[r]);
                n.order= a;

            });
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
</script>
<style>
  @import "groupList.less";
</style>
