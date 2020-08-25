<template>
  <router-link class="comming-spu-content" :to="'/lionfish_comshop/pages/goods/goodsDetail?id='+spuItem.actId">
    <i-img class="spu-img-content" defaultImage="../../images/index-comming-goods-bitmap.png" height="120" iClass="spu-img" :loadImage="spuItem.skuImage" width="120"></i-img>
    <div class="spu-name">
      <span class="span">{{spuItem.spuName}}</span>
    </div>
    <div class="spu-desc" v-if="isPast">结束时间 {{endTime}}</div>
    <div class="spu-desc" v-else>{{formatBeginTime}}{{spuItem.limitOrderNum>-1||spuItem.limitMemberNum>-1?' | 限购':''}}</div>
    <div class="spu-price">
      <div class="sale-price">
        <span class="span">${{spuItem.actPrice[0]}}</span>.{{spuItem.actPrice[1]}}
      </div>
      <div class="market-price" v-if="spuItem.show_productprice">${{spuItem.marketPrice[0]}}.{{spuItem.marketPrice[1]}}</div>
    </div>
    <div class="mask" v-if="isPast">
      <div class="toast">团购已结束</div>
    </div>
    <div class="icon-shop" v-if="isPast">
      <img class="img" src="../../images/icon-add-shopCart-disabled.png"></img>
    </div>
  </router-link>


</template>

<script>
  export default {
    name: ''
  }
</script>

<style scoped>

  .icon-shop {
    position: absolute;
    right: 20rpx;
    bottom: 20rpx;
    width: 54rpx;
    height: 54rpx;
  }

  .icon-shop .img {
    width: 54rpx;
    height: 54rpx;
  }

  .mask {
    width: 348rpx;
    height: 240rpx;
    position: absolute;
    left: 0;
    top: 30rpx;
    background: rgba(255,255,255,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .mask .toast {
    width: 196rpx;
    height: 60rpx;
    background: rgba(0,0,0,0.5);
    border-radius: 10rpx;
    text-align: center;
    line-height: 60rpx;
    color: #fff;
    font-weight: bold;
    font-size: 28rpx;
  }

  .spu-img {
    width: 240rpx;
    height: 240rpx;
    border-radius: 10rpx;
  }

  .comming-spu-content {
    width: 348rpx;
    height: 452rpx;
    border-radius: 20rpx;
    background: #fff;
    box-sizing: border-box;
    padding: 30rpx 26rpx 30rpx 26rpx;
    box-shadow: 0 0 40rpx rgba(0,0,0,0.05);
    position: relative;
  }

  .comming-spu-content .spu-img-content {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 296rpx;
    height: 240rpx;
    margin: 0 auto 34rpx;
  }

  .comming-spu-content .spu-name {
    font-size: 28rpx;
    line-height: 28rpx;
    height: 36rpx;
    color: #444;
    margin-bottom: 16rpx;
    font-weight: 500;
    position: relative;
  }

  .comming-spu-content .spu-name .span {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    position: absolute;
    left: 0;
    top: -4rpx;
    line-height: 36rpx;
  }

  .comming-spu-content .spu-desc {
    color: #ffab20;
    font-size: 24rpx;
    line-height: 24rpx;
    margin-bottom: 14rpx;
  }

  .comming-spu-content .spu-price {
    display: flex;
    align-items: flex-end;
    font-size: 20rpx;
  }

  .comming-spu-content .spu-price .sale-price {
    color: #ff5344;
    margin-right: 8rpx;
  }

  .comming-spu-content .spu-price .sale-price .span {
    font-size: 40rpx;
    line-height: 40rpx;
    margin-left: 4rpx;
    font-weight: 500;
  }

  .comming-spu-content .spu-price .market-price {
    text-decoration: line-through;
    color: #999;
  }

</style>
