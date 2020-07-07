<template>
  <div @click.stop="goCart" :class="['cart', iClass]">
    <img class="img" src="@/assets/images/icon-tab-shop.png"/>
    <span>购物车</span>
    <span class="num" v-if="cartNum>0">{{cartNum}}</span>
  </div>

</template>

<script>
  export default {
    name: 'i-cart-btn',
    props:{
      iClass:'',
      cartNum: {
        default: 0
      }
    },
    methods: {
      goCart: function() {
        this.$wx.switchTab({
          url: "/lionfish_comshop/pages/order/shopCart"
        });
      }
    }
  }
</script>

<style scoped>
  .cart {
    position: fixed;
    left: 3vw;
    bottom: 8vw;
    width: 12vw;
    height: 12vw;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    line-height: 1;
    font-size: 2.4vw;
    background: linear-gradient(45deg,#fdd225 0%,#feb600 100%);
    color: #000;
  }

  .cart .img {
    width: 5.4vw;
    height: 5.4vw;
  }

  .cart .num {
    color: #fff;
    background-color: #ff5041;
    position: absolute;
    top: -1.5vw;
    right: -1.5vw;
    min-width: 5.4vw;
    height: 5.4vw;
    line-height: 5.4vw;
    border-radius: 5.4vw;
    text-align: center;
    font-size: 2.6vw;
  }
</style>
