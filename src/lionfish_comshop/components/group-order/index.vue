<template>
  <div class="item">
    <div class="orderNum">
      <span>团单日期：{{item.createTime}}</span>
      <span :class="[(item.orderStatusName=='已完成'?'black':''), 'statusName']">{{item.orderStatusName}}</span>
    </div>
    <div class="spu">
      <i-img class="goodsImg" defaultImage="@/assets/images/placeholder-refund.png" height="60" iClass="img-class" :loadImage="item.spuImage" width="60"></i-img>
      <div class="detail">
        <div class="spuName">
          <span>{{item.spuName}}</span>
        </div>
        <div class="tips">
          <span>参团人数：{{item.joinMemberNum}}</span>
          <span class="last">商品数量：{{item.groupOrderNum}}</span>
        </div>
        <div class="tips">
          <span>商品金额：${{item.totalAmount?item.totalAmount/100:0}}</span>
          <span class="last">佣金:
          <span class="price">${{item.commision?item.commision/100:0}}</span>
                </span>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'i-goodsInfo',
    props: {
      item: {
        type: Object
      }
    },

    watch:{
      item: {
        handler: function(item) {
          console.log(item,'item');

          var a = item;
          null === a.createTime ? a.createTime = (0, e.formatYMD)(new Date()) : a.createTime = (0,
            e.formatYMD)(new Date(parseInt(a.createTime))), a.orderStatusName = this.switchState(a.groupOrderStatus),
            this.item= a;
        },
        immediate: true
      }
    },
    methods:{
      switchState: function(e) {
        var t = "";
        switch (String(e)) {
          case "-1":
            break;

          case "0":
            t = "待成团";
            break;

          case "1":
            t = "待配送";
            break;

          case "2":
            t = "待收货";
            break;

          case "3":
            t = "待提货";
            break;

          case "4":
            t = "已完成";
            break;

          case "5":
            t = "交易关闭";
            break;

          case "6":
            t = "待采购";
        }
        return t;
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

  .item {
    background: #fff;
    overflow: hidden;
    box-shadow: 0rpx 0rpx 40rpx 0rpx rgba(0,0,0,0.05);
    border-radius: 20rpx;
    margin: 0rpx 20rpx;
  }

  .orderNum {
    height: 80rpx;
    font-size: 26rpx;
    color: #333;
    padding: 0 30rpx;
    border-bottom: 1rpx solid #efefef;
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
    padding: 30rpx;
    display: flex;
    justify-content: flex-start;
  }

  .spu .goodsImg {
    width: 120rpx;
    margin-right: 20rpx;
  }

  .spu .goodsImg .img-class {
    width: 120rpx;
    height: 120rpx;
  }

  .spu .detail {
    margin-left: 20rpx;
    font-size: 24rpx;
    color: #aaa;
  }

  .spu .detail .spuName {
    color: #444;
    font-size: 28rpx;
    line-height: 28rpx;
    font-weight: 500;
  }

  .spu .detail .tips {
    line-height: 32rpx;
    width: 530rpx;
    margin-top: 16rpx;
    position: relative;
  }

  .spu .detail .tips .last {
    position: absolute;
    left: 240rpx;
  }

  .spu .detail .tips .price {
    color: #ff5344;
    font-size: 32rpx;
  }

</style>
