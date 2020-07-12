<template>
  <i-card showModal="true">
    <div slot="header">
      <div class="header">收货信息</div>
    </div>
    <div slot="content">
      <div class="content-wrap">
        <div class="item">
          <div class="title">收货人</div>
          <div class="detail">{{order.order_info.shipping_name}} {{hideInfo?tel:order.order_info.shipping_tel}}</div>
        </div>
        <div class="item" v-if="order.order_info.name&&showNickname">
          <div class="title">昵称</div>
          <div class="detail">{{order.order_info.name}}</div>
        </div>
        <div class="item" v-if="order.order_info.delivery=='express'">
          <div class="title">收货地址</div>
          <div class="detail">
            {{order.shipping_province.name}}{{order.shipping_city.name}}{{order.shipping_country.name}}{{order.order_info.shipping_address}}
          </div>
        </div>
        <div class="item" v-else>
          <div class="title">收货地址</div>
          <div class="detail">{{order.order_info.tuan_send_address}}</div>
        </div>
        <div v-if="order.order_info.delivery=='express'">
          <div class="item" v-if="order.order_info.dispatchname">
            <div class="title">配送方式</div>
            <div class="detail">{{groupInfo.delivery_express_name}}({{order.order_info.dispatchname}})
              <div bindtap="goExpress" class="phone">
                <span>查看物流</span>
              </div>
            </div>
          </div>
          <div class="item" v-if="order.order_info.shipping_no!=0">
            <div class="title">快递单号</div>
            <div class="detail">{{order.order_info.shipping_no}}</div>
          </div>
        </div>
        <div class="item" v-else>
          <div class="title">配送方式</div>
          <div class="detail">{{groupInfo.delivery_tuanzshipping_name}}</div>
        </div>

        <div class="item" v-if="order.order_info.type=='normal'">
          <div class="title">{{groupInfo.owner_name}}信息</div>
          <div class="detail">
            <span>{{order.order_info.ziti_name}}</span>
            <div @click="callTelphone" class="phone" :data-phone="order.order_info.ziti_mobile"
                  v-if="hidePhone==0">
              <img class="icon-phone" src="@/assets/images/phone2.png"/>
              <span>联系{{groupInfo.owner_name}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div slot="footer">
      <div class="footer" v-if="order.order_info.type=='integral'">
        <div>共{{order.goods_count}}件商品 实付：</div>
        <div class="money">
          <div v-if="order.order_info.shipping_fare>0">${{order.order_info.shipping_fare}} +</div>
          {{order.order_info.score}}积分
        </div>
      </div>
      <div class="footer" v-else>
        共{{order.goods_count}}件商品 小计：
        <div class="money">
          <span>$</span>
          {{order.order_info.total}}
        </div>
      </div>
    </div>
  </i-card>

</template>

<script>
  export default {
    name: '',
    props:{
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
          diyshipname: "Freight",
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
    watch: {
      order: (e, oldValue) => {
        var i = e && e.order_info.shipping_tel || "";
        if (i || (i = e && e.order_info.ziti_mobile || ""), i) {
          var a = i.replace(/(\d{7})\d*(\d{0})/, "$1****$2");
          this.tel = a;
        }
      },
    },
    data(){
      return{
        isCalling: !1
      }
    },
    callTelphone: function(e) {
      var i = this;
      this.isCalling || (this.isCalling = !0, wx.makePhoneCall({
        phoneNumber: e.currentTarget.dataset.phone,
        complete: function() {
          i.data.isCalling = !1;
        }
      }));
    },
    goExpress: function() {
      var e = this.order.order_info.order_id;

      this.$router.push({path:'/lionfish_comshop/pages/order/goods_express',query:{id:e}});
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
    border-top: 0.1px solid #efefef;
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
    border: 0.1px solid #efefef;
    border-radius: 13px;
  }

  .content-wrap .item .detail .phone .icon-phone {
    width: 10px;
    height: 10px;
    margin-right: 5px;
  }

  .footer {
    border-top: 0.1px solid #efefef;
    padding: 16px;
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
