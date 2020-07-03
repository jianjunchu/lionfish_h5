<template>
<div>
  <form bindsubmit="submit2" reportSubmit="true">
    <button hidden formType="submit" id="formId"></button>
  </form>
  <label class="spu" for="formId">
      <i-router-link class="spu-content" :url="'/lionfish_comshop/pages/goods/goodsDetail?id='+spuItem.actId">
          <div class="item-left">
              <!-- <i-img :defaultImage="spuItem.skuImage" height="170" iClass="img-class" lazyLoad="true" :loadImage="spuItem.skuImage" width="170"></i-img> -->
              <img class="img-class" :src="spuItem.skuImage"/>
              <!-- <div class="tag" v-if="reduction.is_open_fullreduction==1&&spuItem.is_take_fullreduction==1">满{{reduction.full_money}}减{{reduction.full_reducemoney}}</div> -->
          </div>
          <div class="item-right">
              <div class="item-right-top">
                  <div class="spu-title">
                      <span class="span">{{spuItem.spuName}}</span>
                  </div>
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
                  <div class="add-cart" v-if="disabled||spuItem.spuCanBuyNum==0||actEnd">
                      <img class="img" src="../../../assets/images/icon-add-shopCart-disabled.png" >
                  </div>
                  <!-- <i-button bind:click="openSku" iClass="add-cart" wx:else>
                      <i-addcart fontsize="28" iClass="img"></i-addcart>
                  </i-button> -->
              </div>
              <div class="add-cart">
                <img class="img" src="../../../assets/images/icon-add-shopCart-disabled.png" >
              </div>
              <!-- <i-input-number addImage="../../images/icon-add-2.png" bind:change="changeNumber" bind:outOfMax="outOfMax" iClass="index-input-number" iClassNumberspan="input-number-span" iNumberImg="iNumberImg" iNumberdiv="iNumberdiv" max="{{spuItem.spuCanBuyNum}}" min="0" reduceImage="../../images/icon-reduce-2.png" value="{{number}}" wx:else></i-input-number> -->
          </div>
          <!-- <div class="mask" v-if="isPast||disabled||spuItem.spuCanBuyNum==0?'disabled':''"></div>
          <div class="act-end act-out" v-if="spuItem.spuCanBuyNum==0">已抢光</div>
          <div class="act-end" v-else-if="actEnd">团购已结束</div> -->
      </i-router-link>
  </label>
</div>
</template>

<script>
  export default {
    name: 'i-type-item',
    components: {
      'i-type-item' : require('./type-item.vue').default,
      'i-img': require('../../components/img/index.vue').default,
      'i-router-link': require('../../components/router-link/index.vue').default
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
    font-size: 28px;
    border: 0!important;
    position: relative;
    text-decoration: none;
    height: 88px;
    line-height: 88px;
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
    display: block;
}

.spu .img-class {
    width: 90px;
    height: 90px;
    border-radius: 0;
}

.spu .spu-content {
    background: #fff;
    overflow: hidden;
    position: relative;
    display: flex;
    padding: 10px 10px 10px;
    box-sizing: border-box;
}

.spu .spu-content::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 18px;
    right: 18px;
    border-bottom: 1px solid #e5e5e5;
}

.spu .spu-content.disabled {
    opacity: 0.6;
}

.spu .spu-content .item-left {
    position: relative;
}

.spu .spu-content .item-right {
    flex: 1;
    box-sizing: border-box;
    margin-left: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.spu .spu-content .item-right .spu-title {
    color: #222;
    font-size: 16px;
    height: 20px;
    /* margin-bottom: 12px; */
    margin-top: 10px;
    font-weight: 500;
    position: relative;
}

.spu .spu-content .item-right .spu-title .span {
    width: 100%;
    height: 30px;
    position: absolute;
    left: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.spu .spu-content .item-right .spu-desc {
    font-size: 14px;
    color: #999;
    position: relative;
    width: 350px;
    height: 26px;
    margin-bottom: 12px;
}

.spu .spu-content .item-right .spu-desc .em {
    width: 100%;
    height: 32px;
    position: absolute;
    left: 0;
    top: -2px;
    /* line-height: 32px; */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.spu .spu-content .add-cart {
    width: 32px;
    height: 32px;
    padding: 0;
    margin: 0;
    position: absolute;
    right: 28px;
    bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.spu .spu-content .add-cart .img {
    width: 32px;
    height: 32px;
    display: div;
}

.spu .spu-content .item-right .spu-price {
    display: flex;
    align-items: flex-end;
    font-size: 13px;
    overflow: hidden;
}

.spu .spu-content .item-right .spu-price .sale-price {
    color: #ff5344;
    margin-right: 6px;
}

.spu .spu-content .item-right .spu-price .sale-price .span {
    font-size: 18px;
    margin: 0;
    font-weight: bold;
}

.spu .spu-content .item-right .spu-price .market-price {
    text-decoration: line-through;
    color: #999;
    margin-right: 30px;
}

.spu .mask {
    background: rgba(255,255,255,0.5);
    width: 170px;
    height: 170px;
    position: absolute;
    left: 24px;
    top: 28px;
}

.spu .act-end {
    position: absolute;
    height: 60px;
    border-radius: 10px;
    background: rgba(0,0,0,0.5);
    color: #fff;
    font-size: 28px;
    text-align: center;
    line-height: 30px;
    left: 110px;
    top: 85px;
    padding: 0 12px;
    transform: translateX(-50%);
}

.spu .tag {
    position: absolute;
    left: 0;
    bottom: 0;
    background: linear-gradient(to right,#ff5041,#ff994b);
    border-radius: 0 14px 14px 0;
    padding: 0 12px;
    height: 30px;
    font-size: 22px;
    line-height: 30px;
    color: #fff;
    display: inline-div;
    align-items: center;
    justify-content: center;
    width: auto;
    max-width: 180px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.spu .index-input-number {
    position: absolute;
    right: 0;
    bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.spu .index-input-number .iNumberdiv {
    width: 80px;
    height: 80px;
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
    font-size: 44px;
}

.spu .index-input-number .input-number-span {
    height: 88px;
    line-height: 88px;
    font-size: 24px;
    color: #333;
    width: 58px;
}
</style>
