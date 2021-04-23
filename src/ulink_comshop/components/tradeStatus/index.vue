<template>
  <div class="head">
    <div class="back-img-wrap">
      <img class="back-img" src="@/assets/images/TOP_background@2x.png"/>
    </div>
    <div class="to-pay-wrap" v-if="status==0">
      <div class="font-bold-30">
        <i-payTimeCountDown bind:timeOut="timeOut" countDown="count-down" :createTime="tradeStatusInfo.createTime" :maxPayTime="maxPayTime"></i-payTimeCountDown>
      </div>
      <div class="font-12">待付款，超时订单自动关闭</div>
    </div>
    <div class="to-get-wrap" v-if="status==4">
      <div class="font-bold-20">备货中</div>
      <img class="little-img" src="@/assets/images/img_delivery@2x.png"/>
    </div>
    <div class="to-get-wrap" v-if="status==1">
      <div class="font-bold-20">可提货</div>
      <img class="little-img" src="@/assets/images/img_ready_to_get@2x.png"/>
    </div>
    <div class="to-get-wrap" v-if="status==2">
      <div class="font-bold-20">交易完成</div>
      <img class="little-img" src="@/assets/images/img_trade_succeed@2x.png"/>
    </div>
    <div class="trade-cancel-wrap" v-if="status==3">
      <div class="font-bold-20 cancel-box">
        <img class="cancel-img" src="@/assets/images/icon_exclamation@2x.png"/>交易取消</div>
    </div>
  </div>

</template>

<script>
  export default {
    name: '',
    props:{
      status: {
        type: String
      },
      pickUpTotal: {
        type: Number
      },
      tradeStatusInfo: {
        type: Object
      }
    },
    data(){
      return{
        maxPayTime: 30
      }
    },
    methods: {
      timeOut: function() {
        this.$emit("timeOut");
      }
    }
  }
</script>

<style scoped>
  .font-bold-30 {
    font-size: 30px;
  }

  .font-bold-20 {
    font-size: 20px;
    font-weight: 500;
  }

  .font-12 {
    font-size: 12px;
  }

  .head .little-img {
    width: 120px;
    height: 60px;
  }

  .back-img-wrap {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }

  .back-img-wrap .back-img {
    width: 100%;
    height: 170px;
  }

  .to-pay-wrap {
    text-align: center;
    padding: 23px 0;
    color: white;
  }

  .to-get-wrap {
    display: flex;
    justify-content: space-between;
    padding:25px 25px 0 25px;
    color: white;
  }

  .trade-cancel-wrap {
    padding: 25px 38px;
    color: white;
    text-align: center;
  }

  .cancel-box {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .cancel-img {
    margin-right: 5px;
    width: 20px;
    height: 20px;
  }

  .count-down {
    font-weight: 500;
  }
</style>
