<template>
<div style="margin-top: 10px;">
  <form bindsubmit="submit2" reportSubmit="true">
    <button hidden formType="submit" id="formId"></button>
  </form>
  <label class="spu" for="formId">
      <i-router-link class="spu-content" url="">
          <div class="item-left">
              <!-- <i-img :defaultImage="spuItem.skuImage" height="170" iClass="img-class" lazyLoad="true" :loadImage="spuItem.skuImage" width="170"></i-img> -->
              <img class="img-class" :src="spuItem.skuImage" width="150" height="150"/>
              <!-- <div class="tag" v-if="reduction.is_open_fullreduction==1&&spuItem.is_take_fullreduction==1">满{{reduction.full_money}}减{{reduction.full_reducemoney}}</div> -->
          </div>
          <div class="item-right">
              <div class="item-right-top">
                <br>
                  <div class="spu-title">
                      <span class="span">{{spuItem.spuName}}</span>
                  </div><br><br>
                  <div class="spu-desc" v-if="spuItem.spuDescribe">
                      <span class="em">{{spuItem.spuDescribe}}</span>
                  </div>
                  <!-- <i-vip-price price="{{spuItem.card_price}}" v-if="is_open_vipcard_buy==1&&spuItem.is_take_vipcard==1"></i-vip-price> -->
              </div>
              <div class="spu-price">
                  <div class="sale-price">
                      <span class="span">${{spuItem.actPrice[0]}}</span>.{{spuItem.actPrice[1]}}
                  </div>
                  <div class="market-price" v-if="spuItem.show_productprice">${{spuItem.marketPrice[0]}}.{{spuItem.marketPrice[1]}}</div>
              </div>
          </div>
          <div v-if="!isPast">
              <div v-if="number<=0">
                  <!-- <i-button iClass="add-cart" v-if="disabled||spuItem.spuCanBuyNum==0||actEnd">
                      <image class="img" src="../../images/icon-add-shopCart-disabled.png"></image>
                  </i-button> -->
                  <!-- <i-button bind:click="openSku" iClass="add-cart" wx:else>
                      <i-addcart fontsize="28" iClass="img"></i-addcart>
                  </i-button> -->
              </div>
              <!-- <i-input-number addImage="../../images/icon-add-2.png" bind:change="changeNumber" bind:outOfMax="outOfMax" iClass="index-input-number" iClassNumberspan="input-number-span" iNumberImg="iNumberImg" iNumberdiv="iNumberdiv" max="{{spuItem.spuCanBuyNum}}" min="0" reduceImage="../../images/icon-reduce-2.png" value="{{number}}" wx:else></i-input-number> -->
          </div>
          <div class="mask" v-if="isPast||disabled||spuItem.spuCanBuyNum==0?'disabled':''"></div>
          <div class="act-end act-out" v-if="spuItem.spuCanBuyNum==0">已抢光</div>
          <div class="act-end" v-else-if="actEnd">团购已结束</div>
      </i-router-link>
  </label>
</div>
</template>

<script>
  import {http} from '@/api/index'
  export default {
    name: 'i-type-item',
    components: {
      'i-type-item' : require('./type-item.vue').default,
      'i-img': require('../../components/img/index.vue').default,
      'i-router-link': require('../../components/RouterLink/index.vue').default
    },
    props: {
      spuItem: {
            type: Object,
            value: {
                spuId: "",
                skuId: "",
                skuImage: "",
                spuName: "",
                endTime: 0,
                beginTime: "",
                actPrice: [ "", "" ],
                marketPrice: [ "", "" ],
                spuCanBuyNum: "",
                soldNum: "",
                actId: "",
                limitMemberNum: "",
                limitOrderNum: "",
                serverTime: "",
                isLimit: !1,
                skuList: [],
                spuDescribe: "",
                is_take_fullreduction: 0,
                label_info: "",
                car_count: 0
            }
        },
        isPast: {
            type: Boolean,
            value: !1
        },
        actEnd: {
            type: Boolean,
            value: !1
        },
        reduction: {
            type: Object,
            value: {
                full_money: "",
                full_reducemoney: "",
                is_open_fullreduction: 0
            }
        },
        changeCarCount: {
            type: Boolean,
            value: !1,
            observer: function(t) {
                t && this.setData({
                    number: this.spuItem.car_count
                });
            }
        },
        needAuth: {
            type: Boolean,
            value: !1
        },
        is_open_vipcard_buy: {
            type: Number,
            value: 0
        },
        canLevelBuy: {
            type: Boolean,
            value: !1
        }
    },
    data() {
      return{
        disabled: !1,
        placeholdeImg: "",
        number: 0
      }
    }
  }
</script>

<style scoped>
  .i-btn {
    text-align: center;
    vertical-align: middle;
    touch-action: manipulation;
    cursor: pointer;
    background-image: none;
    white-space: nowrap;
    user-select: none;
    font-size: 28rpx;
    border: 0!important;
    position: relative;
    text-decoration: none;
    height: 88rpx;
    line-height: 88rpx;
    background: none;
    color: #495060;
    border-radius: 0;
    margin: 0;
    box-shadow: none;
}

.i-btn::after {
    border: none;
}

.spu {
    width: 100%;
    display: div;
}

.spu .img-class {
    width: 170rpx;
    height: 170rpx;
}

.spu .spu-content {
    background: #fff;
    overflow: hidden;
    position: relative;
    display: flex;
    padding: 28rpx 24rpx 40rpx;
    box-sizing: border-box;
}

.spu .spu-content::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 18rpx;
    right: 18rpx;
    border-bottom: 1rpx solid #e5e5e5;
}

.spu .spu-content.disabled {
    opacity: 0.6;
}

.spu .spu-content .item-left {
    width: 170rpx;
    height: 170rpx;
    position: relative;
}

.spu .spu-content .item-right {
    flex: 1;
    box-sizing: border-box;
    margin-left: 24rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.spu .spu-content .item-right .spu-title {
    color: #222;
    font-size: 30rpx;
    height: 32rpx;
    margin-bottom: 12rpx;
    margin-top: 10rpx;
    font-weight: 500;
    position: relative;
}

.spu .spu-content .item-right .spu-title .span {
    width: 100%;
    height: 40rpx;
    position: absolute;
    left: 0;
    top: -4rpx;
    line-height: 40rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 0;
}

.spu .spu-content .item-right .spu-desc {
    font-size: 26rpx;
    line-height: 26rpx;
    color: #999;
    position: relative;
    width: 350rpx;
    height: 26rpx;
    margin-bottom: 12rpx;
}

.spu .spu-content .item-right .spu-desc .em {
    width: 100%;
    height: 32rpx;
    position: absolute;
    left: 0;
    top: -2rpx;
    line-height: 32rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.spu .spu-content .add-cart {
    width: 68rpx;
    height: 68rpx;
    padding: 0;
    margin: 0;
    position: absolute;
    right: 28rpx;
    bottom: 20rpx;
    display: flex;
    align-items: center;
    justify-content: center;
}

.spu .spu-content .add-cart .img {
    width: 54rpx;
    height: 54rpx;
    display: div;
}

.spu .spu-content .item-right .spu-price {
    display: flex;
    align-items: flex-end;
    font-size: 24rpx;
    line-height: 24rpx;
    overflow: hidden;
}

.spu .spu-content .item-right .spu-price .sale-price {
    color: #ff5344;
    margin-right: 12rpx;
}

.spu .spu-content .item-right .spu-price .sale-price .span {
    font-size: 36rpx;
    line-height: 36rpx;
    margin: 0;
    font-weight: bold;
}

.spu .spu-content .item-right .spu-price .market-price {
    text-decoration: line-through;
    color: #999;
    margin-right: 30rpx;
}

.spu .mask {
    background: rgba(255,255,255,0.5);
    width: 170rpx;
    height: 170rpx;
    position: absolute;
    left: 24rpx;
    top: 28rpx;
}

.spu .act-end {
    position: absolute;
    height: 60rpx;
    border-radius: 10rpx;
    background: rgba(0,0,0,0.5);
    color: #fff;
    font-size: 28rpx;
    text-align: center;
    line-height: 60rpx;
    left: 110rpx;
    top: 85rpx;
    padding: 0 12rpx;
    transform: translateX(-50%);
}

.spu .tag {
    position: absolute;
    left: 0;
    bottom: 0;
    background: linear-gradient(to right,#ff5041,#ff994b);
    border-radius: 0 14rpx 14rpx 0;
    padding: 0 12rpx;
    height: 30rpx;
    font-size: 22rpx;
    line-height: 30rpx;
    color: #fff;
    display: inline-div;
    align-items: center;
    justify-content: center;
    width: auto;
    max-width: 180rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.spu .index-input-number {
    position: absolute;
    right: 0;
    bottom: 10rpx;
    display: flex;
    justify-content: center;
    align-items: center;
}

.spu .index-input-number .iNumberdiv {
    width: 80rpx;
    height: 80rpx;
    display: flex;
    justify-content: center;
    align-items: center;
}

.spu .index-input-number .iNumberdiv:first-child {
    justify-content: flex-end;
}

.spu .index-input-number .iNumberdiv:last-child {
    justify-content: flex-start;
}

.spu .index-input-number .iNumberImg {
    font-size: 44rpx;
}

.spu .index-input-number .input-number-span {
    height: 88rpx;
    line-height: 88rpx;
    font-size: 24rpx;
    color: #333;
    width: 58rpx;
}
</style>
