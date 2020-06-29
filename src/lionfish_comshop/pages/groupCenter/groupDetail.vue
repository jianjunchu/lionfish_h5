<template>
  <div>
  <!--<i-auth bind:authSuccess="authSuccess" needAuth="{{needAuth}}">-->
    <div>
      <div class="groupDetail">
        <div class="goodsDetail">
          <div class="goods-info" v-if="order.order_info.delivery!='pickup'">
            <i-order-info-express :groupInfo="groupInfo" :order="order" showNickname="true" v-if="order.order_info"></i-order-info-express>
          </div>
          <div class="goods-info" v-else-if="order.order_info.order_status_id!=3&&order.order_info.order_status_id!=5">
            <i-goods-info :groupInfo="groupInfo" :order="order" showNickname="true"></i-goods-info>
          </div>
        </div>
        <div class="goodsDetail">
          <div class="title">
            <div>商品详情（共计<span class="red">{{order.goods_count?order.goods_count:0}}</span>件商品）</div>
            <span :class="[(order.order_status_info.name=='已完成'?'black':''), 'text-right']">{{order.order_status_info.name}}</span>
          </div>
          <!--<div class="border-bottom" wx:for="{{order.order_goods_list}}" wx:for-item="goodsInfo" wx:key="key">-->
          <div class="border-bottom" v-for="(goodsInfo,idx) in order.order_goods_list" :key="goodsInfo.key">
            <div class="goodsList">
              <i-img class="goodsImg" defaultImage="@/assets/images/placeholder-refund.png" height="60" iClass="img-class" :loadImage="goodsInfo.image" width="60"></i-img>
              <div class="goos-item">
                <div class="goodsTitle">{{goodsInfo.name}}</div>
                <div class="attribute">
                 <span>
                    <div v-if="goodsInfo.option_str">规格：{{goodsInfo.option_str}} </div>数量：{{goodsInfo.quantity}}
								</span>
                </div>
                <div class="attribute">
                  <div class="price-text">${{goodsInfo.price}}</div>
                </div>
              </div>
            </div>
            <div class="px15 pb10 fsz-26 text-gray">
              <div class="tips i-flex i-flex-spb mb5">
                <div>商品金额: <span class="red">${{goodsInfo.price}}</span>
                </div>
                <div>退款金额: <span class="red">${{goodsInfo.has_refund_money}}</span>
                </div>
              </div>
              <div class="tips i-flex i-flex-spb">
                <div>有效金额: <span class="red">${{goodsInfo.order_jishu}}</span>
                </div>
                <div v-if="goodsInfo.fen_type==0">佣金比例: <span class="red">{{goodsInfo.fen_bili}}%</span>
                </div>
                <div v-if="goodsInfo.fen_type==1">佣金固定金额: <span class="red">{{goodsInfo.fen_gumoney}}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="px15 py10 text-right">
            <div class="mb5" v-if="head_shipping_fare">
              团长配送费:<span class="red weight">${{head_shipping_fare}} </span>
              <span class="fsz-24 text-gray">(归团长收入)</span>
            </div>
            <div bindtap="handleTipDialog">
              实际佣金:<span class="red weight">${{commision}} </span>
              <span class="iconfont icon-shuoming text-dark fsz-28"></span>
              <span class="fsz-24 text-gray"> ({{is_statements_state==1?'已结算':'待结算'}}<div v-if="is_statements_state==1&&statements_end_date"> {{statements_end_date}}</div>)</span>
            </div>
          </div>
        </div>
        <div class="orderComment">
          <i-orderComment :comment="order.order_info.comment" v-if="order.order_info.comment"></i-orderComment>
        </div>
        <div class="orderInfor">
          <i-order-info :orderInfo="order.order_info" :order_goods_list="order.order_goods_list" ordername="团单"></i-order-info>
        </div>
      </div>
    </div>
  <!--</i-auth>-->
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
        <div class="mb5 i-flex" v-if="order.order_goods_list[0].fen_type==0">
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
      <div bindtap="handleTipDialog" class="fsz-30 bule text-center py10">知道了</div>
    </div>
  </i-modal>
  </div>

</template>

<script>
  import GlobalMixin from '../../mixin/globalMixin.js';
  var status = require('../../utils/index.js');
  export default {
    mixins: [GlobalMixin],
    name:'groupcenter-groupdetail',
    data() {
      return {
        order: {},
        groupInfo: {
          group_name: "社区",
          owner_name: "团长"
        },
        orderId:'',
        is_share:false,
        needAuth:false,
        commision: 0,
        is_statements_state: 0,
        statements_end_date: '',
        head_shipping_fare: 0,
        open_aftersale: 0,
        open_aftersale_time: 0
      }
    },
    created: function() {
      this.onLoad();
    },
    methods: {
      onLoad: function() {
        var a = this;
        var query = this.$route.query;
        status.setGroupInfo().then(function(t) {
          a.groupInfo=t;
        });
        var e = query.is_share || 0;
        this.orderId= query.groupOrderId, this.is_share= e;
        status.check_login() ? this.needAuth= !1 : this.needAuth= !0;
         this.$wx.showLoading({
          title: "加载中...",
          mask: !0
        }), this.getData();
      },
      authSuccess: function() {
        var t = this;
        this.needAuth= !1;
        t.getData();

      },
      getData: function() {
        var h = this, t = this.$wx.getStorageSync("token");
        this.orderId ? this.$http({
            controller: "order.order_head_info",
            token: t,
            is_share: this.is_share,
            id: this.orderId
          }).then(t=> {
            if (this.$wx.hideLoading(), 0 == t.data.code) {
              var a = t.data, e = 0, s = 0, r = "", i = 0;
              a && a.order_goods_list && a.order_goods_list.forEach(function(t) {
                e += parseFloat(t.commision), i += parseFloat(t.head_shipping_fare), 1 == t.is_statements_state && (s = 1,
                  r = t.statements_end_date);
              });
              var o = t.data, n = o.open_aftersale, d = o.open_aftersale_time;
              h.order= t.data;
              h.commision= e.toFixed(2),
              h.is_statements_state= s,
              h.statements_end_date= r,
              h.head_shipping_fare= i,
              h.open_aftersale= n,
              h.open_aftersale_time= d;
            }

        }) : this.$wx.showModal({
          title: "提示",
          content: "订单不存在",
          showCancel: !1,
          success: function(t) {
            t.confirm && this.$wx.redirectTo({
              url: "/lionfish_comshop/pages/groupCenter/groupList"
            });
          }
        });
      },
      swithState: function(t) {
        switch (t) {
          case "-1":
            break;

          case "0":
            this.orderStatusName= "待成团";
            break;

          case "1":
            this.orderStatusName="待配送";
            break;

          case "2":
            this.orderStatusName= "待收货";
            break;

          case "3":
            this.orderStatusName= "待提货";
            break;

          case "4":
            this.orderStatusName= "已完成";
            break;

          case "6":
            this.orderStatusName= "待采购";
        }
      },
      handleTipDialog: function() {
        this.showTipDialog= !this.data.showTipDialog;
      }
    }
  }
</script>
<style>
  @import "groupDetail.less";
</style>
