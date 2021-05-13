<template>
  <i-router-link routerClass="new-comers-item" :url="'/ulink_comshop/pages/goods/goodsDetail?id='+item.actId+'&type=integral'">
    <i-img defaultImage="@/assets/images/placeholder-refund.png" height="180" width="180" iClass="new-img" :loadImage="item.skuImage"></i-img>
    <div class="act-end" v-if="item.spuCanBuyNum==0">{{$t('score.yiqiangguang')}}</div>
    <div class='title'>{{item.spuName}}</div>
    <div class='new-bot'>
      <div class='price'>{{item.actPrice[0]}}{{$t('score.jifen')}}</div>
      <div class="add-cart disabled" v-if="disabled||item.spuCanBuyNum==0">
        {{$t('score.yiqiangguang')}}
      </div>
      <i-button bind:click="openSku" :data-idx="index" iClass="add-cart" v-else>
        {{$t('score.lijiduihuan')}}
      </i-button>
    </div>
  </i-router-link>
</template>

<script>
  import GlobalMixin from '../../../mixin/globalMixin.js';
  import status from '../../../utils/index.js'
  import util from '../../../utils/index.js'
  var app,wx
  export default {
    name: 'score-guess-like',
    props: {
      item: {
        type: Object,
        value: {}
      }
    },
    data() {
      return {
        disabled: false
      }
    },
    created: function() {
      wx = this.$wx
      app = this.$app
    },
    methods: {
      openSku: function () {
        this.disabled = false;
        let spuItem = this.data.item;
        if (spuItem.skuList.length === void 0) {
          this.$emit("openSku", {
            actId: spuItem.actId,
            skuList: spuItem.skuList,
            promotionDTO: spuItem.promotionDTO || '',
            allData: {
              spuName: spuItem.spuName,
              skuImage: spuItem.skuImage,
              actPrice: spuItem.actPrice,
              canBuyNum: spuItem.spuCanBuyNum,
              stock: spuItem.spuCanBuyNum,
              marketPrice: spuItem.marketPrice
            }
          })
        } else {
          this.addCart({ value: 1, type: "plus" });
        }
      },
      addCart: function (t) {
        wx.showLoading();
        var community = wx.getStorageSync('community');
        let spuItem = this.item;
        var goods_id = spuItem.actId;
        var community_id = community.communityId;
        if (t.type == 'plus') {
          let data = {
            goods_id,
            community_id,
            quantity: 1,
            sku_str: '',
            buy_type: 'dan',
            pin_id: 0,
            is_just_addcar: 1,
            buy_type: 'integral'
          }
          util.addCart(data).then(res=>{
            wx.hideLoading();
            if(res.showVipModal==1) {
              let { pop_vipmember_buyimage } = res;
              that.$emit("vipModal", { pop_vipmember_buyimage, showVipModal: true, visible: false });
            } else {
              if (res.code == 3 || res.code == 7) {
                wx.showToast({
                  title: res.msg,
                  icon: 'none',
                  duration: 2000
                })
              } else if (res.code == 6) {
                // 积分不足
                var msg = res.msg;
                wx.showToast({
                  title: msg,
                  icon: 'none',
                  duration: 2000
                })
              } else {
                //跳转结算页面
                wx.navigateTo({
                  url: `/ulink_comshop/pages/order/placeOrder?type=integral`,
                })
              }
            }
          })
        }
      }
    }
  }
</script>

<style scoped>
.new-comers-item {
  background-color: #fff;
  width: 345rpx;
  box-sizing: border-box;
  padding: 30rpx;
  border-radius: 10px;
  font-size: 28rpx;
  margin-bottom: 20rpx;
}

.new-comers-item .new-img {
  width: 285rpx;
  height: 285rpx;
  margin-bottom: 20rpx;
}

.new-comers-item .title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.new-comers-item .new-bot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10rpx;
}

.new-comers-item .add-cart {
  width: 140rpx;
  height: 44rpx;
  padding: 0;
  margin: 0;
  position: absolute;
  right: 20rpx;
  bottom: 30rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ff5344;
  color: #fff;
  border-radius: 30rpx;
  font-size: 24rpx;
}

.new-comers-item .add-cart.disabled {
  background: #ccc;
}

.new-comers-item .price {
  color: #ff5041;
}

.new-comers-item {
  position: relative;
}

.new-comers-item .act-end {
  position: absolute;
  height: 60rpx;
  border-radius: 10rpx;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 28rpx;
  text-align: center;
  line-height: 60rpx;
  left: 50%;
  top: 120rpx;
  padding: 0 12rpx;
  transform: translateX(-50%);
}
</style>
