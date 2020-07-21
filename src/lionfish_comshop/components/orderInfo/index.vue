<template>
  <i-card showModal="true">
    <div slot="header">
      <div class="header">{{ordername}} {{$t('order.xinxi')}}</div>
    </div>
    <div slot="content">
      <div class="content-wrap">
        <div class="item">
          <div class="title">{{ordername}}  {{$t('order.bianhao')}}</div>
          <div class="detail">{{orderInfo.order_num_alias}}</div>
        </div>
        <div class="item">
          <div class="title"> {{$t('order.xiadanshijian')}}</div>
          <div class="detail">
            <span>{{orderInfo.date_added}}</span>
          </div>
        </div>
        <div class="item" v-if="orderInfo.pay_time>0">
          <div class="title"> {{$t('order.zhifushijian')}}</div>
          <div class="detail">
            <span>{{orderInfo.pay_date}}</span>
          </div>
        </div>
        <div class="item" v-if="orderInfo.express_tuanz_time">
          <div class="title"> {{$t('order.songdashijian')}}</div>
          <div class="detail">
            <span>{{orderInfo.express_tuanz_date}}</span>
          </div>
        </div>
        <div class="item" v-if="orderInfo.receive_time">
          <div class="title"> {{$t('order.shouhuoshijian')}}</div>
          <div class="detail">
            <span>{{orderInfo.receive_date}}</span>
          </div>
        </div>
        <div class="item" v-if="orderInfo.shipping_fare>0">
          <div class="title" v-if="orderInfo.type=='integral'">{{groupInfo.placeorder_trans_name}}</div>
          <div class="title" v-else>diyshipname</div>
          <div class="detail">
            + ${{orderInfo.shipping_fare}}
          </div>
        </div>
        <div v-if="orderInfo.is_free_shipping_fare==1">
          <div class="item">
            <div class="title">{{diyshipname}}</div>
            <div class="detail">
              + ${{orderInfo.fare_shipping_free}}
            </div>
          </div>
          <div class="item">
            <div class="title">{{$('order.manjinemian1')}}{{diyshipname}}{{$t('order.manjinemian2')}}</div>
            <div class="detail">
              - ${{orderInfo.fare_shipping_free}}
            </div>
          </div>
        </div>
        <div class="item" v-if="orderInfo.score_for_money*1>0">
          <div class="title">积分抵扣</div>
          <div class="detail">
            - ${{orderInfo.score_for_money}}
          </div>
        </div>
        <div class="item" v-if="orderInfo.is_vipcard_buy==1&&levelAmount>0">
          <div class="title">会员优惠</div>
          <div class="detail">
            - ${{levelAmount}}
          </div>
        </div>
        <div class="item" v-if="orderInfo.is_level_buy==1&&orderInfo.is_vipcard_buy!=1&&levelAmount>0">
          <div class="title">等级折扣</div>
          <div class="detail">
            - ${{levelAmount}}
          </div>
        </div>
        <div class="item" v-if="disAmount>0">
          <div class="title">总优惠</div>
          <div class="detail">
            - ${{disAmount}}
          </div>
        </div>
        <div class="item">
          <div class="title">{{$t('order.shangpinjine')}}</div>
          <div class="detail">
            +
            <div v-if="orderInfo.type!='integral'">$</div>
            {{goodsTotal}}
            <div v-if="orderInfo.type=='integral'">积分</div>
          </div>
        </div>
      </div>
    </div>
    <div slot="footer">
      <div class="footer" v-if="orderInfo.type=='integral'">
        <div>To Pay：</div>
        <div class="money">
          <div v-if="orderInfo.shipping_fare>0">${{orderInfo.shipping_fare}} +</div>
          {{orderInfo.score}}积分
        </div>
      </div>
      <div class="footer" v-else>
        <div>Total：</div>
        <div class="money">
          ${{orderInfo.total}}
        </div>
      </div>
    </div>
  </i-card>

</template>

<script>
  export default {
    name: 'orderInfo',
    props: {
      orderInfo: {
        type: Object
      },
      order_goods_list: {
        type: Array
      },
      ordername: {
        type: String,
        value: '订单'
      },
      groupInfo: {
        type: Object,
        value: {
          group_name: '社区',
          owner_name: '团长',
          delivery_ziti_name: '到点自提',
          delivery_tuanzshipping_name: '团长配送',
          delivery_express_name: '快递配送'
        }
      }
    },
    watch: {

      order_goods_list:  {
        handler: function(order_goods_list) {
          console.log(order_goods_list,'order_goods_list')
          var o = 0
          order_goods_list && order_goods_list.length && order_goods_list.forEach(function(e) {
            var t = 1 * e.total, a = 1 * e.old_total
            1 != e.is_level_buy && 1 != e.is_vipcard_buy || (o += a - t)
          })

          this.levelAmount = o.toFixed(2)
        },
        immediate: true
      },
      orderInfo:  {
        handler: function(orderInfo) {
          console.log(orderInfo,'orderInfo')
          var t = 1 * orderInfo.real_total, a = parseFloat(t) - parseFloat(orderInfo.shipping_fare),
            o = parseFloat(orderInfo.voucher_credit) + parseFloat(orderInfo.fullreduction_money)
          o = a < o ? a : o
          var r = '', n = this.groupInfo
          r = 'express' == orderInfo.delivery ? n.placeorder_trans_name : n.placeorder_tuan_name

          this.goodsTotal = a.toFixed(2)
          this.disAmount = o.toFixed(2)
          this.diyshipname = r
        },
        immediate: true
      }
    },
    data(){
      return{
        disAmount: 0,
        goodsTotal: 0
      }
    }
  }
</script>

<style scoped>

  .header {
    padding: 10px 15px;
    color: #444;
    font-size: 14px;
    font-weight: 500;
  }

  .content-wrap {
    border-top: 1px solid #efefef;
    padding-bottom: 10px;
  }

  .content-wrap .item {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    padding: 8px 15px;
    padding-bottom: 0;
  }

  .content-wrap .item .title {
    color: #aaa;
  }

  .content-wrap .item .detail {
    color: #444;
  }

  .footer {
    border-top: 0.1px solid #efefef;
    padding: 16px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 14px;
  }

  .footer .money {
    color: #ff5344;
    font-weight: 500;
    font-size: 15px;
  }

</style>
