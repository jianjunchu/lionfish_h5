<template>
<i-card showModal="true">
  <!--<div>-->
    <div slot="header">
        <div class="header">提货信息</div>
    </div>
    <div slot="content">
        <div class="content-wrap">
            <div class="item">
                <div class="title">提货人</div>
                <div class="detail">{{order.order_info.shipping_name}} {{hideInfo?tel:order.order_info.shipping_tel}}</div>
            </div>
            <div class="item" v-if="order.order_info.name&&showNickname">
                <div class="title">昵称</div>
                <div class="detail">{{order.order_info.name}}</div>
            </div>
            <div class="item">
                <div class="title">提货地点</div>
                <div class="detail">{{order.order_info.shipping_address}}</div>
            </div>
            <div class="item" v-if="order.order_info.delivery_time && order.order_info.delivery_time!='' && order.order_info.delivery_date && order.order_info.delivery_date!=''">
                <div class="title">{{order.order_info.delivery=='pickup'?'提货时间:':'送货时间:'}} </div>
                <div class="detail"> {{order.order_info.delivery_date}} [{{order.order_info.delivery_time}}]</div>
            </div>
            <div class="item">
                <div class="title">配送方式</div>
                <div class="detail">{{order.order_info.delivery_name}}</div>
            </div>
            <div class="item" v-if="order.order_info.type=='normal'">
                <div class="title">{{groupInfo.owner_name}}信息</div>
                <div class="detail">
                    <text>{{order.order_info.ziti_name}}</text>
                    <div bindtap="callTelphone" class="phone" :data-phone="order.order_info.ziti_mobile" v-if="hidePhone==0">
                        <image class="icon-phone" src="@/assets/images/phone2.png"></image>
                        <text>联系{{groupInfo.owner_name}}</text>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div slot="footer">
        <div class="footer">
      共{{order.goods_count}}件商品 小计：
      <div class="money">
        <text>$</text>{{order.order_info.total}}
      </div>
        </div>
    </div>
  <!--</div>-->
</i-card>

</template>

<script>
  export default {
    name: 'i-goodsInfo',
    props: {
      order: {
        type: Object
      },
      showNickname: {
        type: Boolean,
        default: !1
      },
      hidePhone: {
        type: Number,
        default: 0
      },
      groupInfo: {
        type: Object,
        default: {
          group_name: "社区",
          owner_name: "团长",
          delivery_ziti_name: "到点自提",
          delivery_tuanzshipping_name: "团长配送",
          delivery_express_name: "快递配送"
        }
      },
      hideInfo: {
        type: Boolean,
        default: !1
      }
    },

    watch:{
      order: {
        handler: function(order) {
          console.log(order,'order');
          debugger
          var t = order && order.order_info && order.order_info.shipping_tel || "";
          if (t) {
            var a = (t = "" + t).replace(/(\d{3})\d*(\d{4})/, "$1****$2");
            this.tel= a;
          }
        },
        immediate: true
      }
    },
    methods:{
      callTelphone: function(e) {
        var t = this;
        this.isCalling || (this.isCalling = !0, wx.makePhoneCall({
          phoneNumber: e.currentTarget.dataset.phone,
          complete: function() {
            t.isCalling = !1;
          }
        }));
      }
    },
    data(){
      return{
        isCalling: !1
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
    border-top: 0.05px solid #efefef;
    padding-bottom: 10px;
  }

  .content-wrap .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    padding: 8px 15px 0;
  }

  .content-wrap .item .title {
    word-break: keep-all;
    color: #aaa;
  }

  .content-wrap .item .detail {
    color: #444;
    text-align: right;
    display: flex;
    align-items: center;
  }

  .content-wrap .item .detail .phone {
    margin-left: 10px;
    padding: 0 10px;
    height: 22px;
    display: flex;
    align-items: center;
    border: 0.05px solid #efefef;
    border-radius: 13px;
  }

  .content-wrap .item .detail .phone .icon-phone {
    width: 10px;
    height: 10px;
    margin-right: 5px;
  }

  .footer {
    border-top: 0.05px solid #efefef;
    padding: 21px 15px 16px 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 15px;
    font-weight: 500;
  }

  .footer .money {
    color: #ff5344;
    font-size: 20px;
  }

</style>
