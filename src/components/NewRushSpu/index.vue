<template>
  <div>


    <form bindsubmit="submit2" reportSubmit="true">
      <button hidden formType="submit" id="formId"></button>
    </form>
    <label class="spu" for="formId">
      <router-link class="spu-content" :url="url">
        <div class="item-left">

          <div class="item-tag" v-if="spuItem.label_info&&spuItem.label_info.type==0">
            <img class="item-tag-bg" mode="widthFix" src="@/assets/images/tag.png"></img>
            <div :class="['tag-name',(spuItem.label_info.len==2?'two-word':'')]">{{spuItem.label_info.tagcontent}}</div>
          </div>
          <div class="item-tag" :style="'background:url('+spuItem.label_info.tagcontent+') no-repeat left top;background-size: 100%;'" v-if="spuItem.label_info&&spuItem.label_info.type==1"></div>
          <el-image
            style="width: 100px; height: 100px"
            :src="spuItem.skuImage">
            <div slot="placeholder" class="image-slot">
              加载中<span class="dot">...</span>
            </div>
          </el-image>

          <div class="spu-active" v-if="reduction.is_open_fullreduction==1&&spuItem.is_take_fullreduction==1">
            <div class="tag">满{{reduction.full_money}}减{{reduction.full_reducemoney}}</div>
            <div class="tag tag-green" v-if="spuItem.isLimit">限购</div>
          </div>
          <div class="spu-play" v-if="spuItem.is_video">
            <img class="img" src="@/assets/images/play.png"></img>
          </div>
        </div>
        <div class="item-right">
          <div class="item-right-top">
            <div class="spu-title">
              <span class="span">{{spuItem.spuName}}</span>
            </div>
            <div class="spu-desc" v-if="spuItem.spuDescribe">
              <span class="em">{{spuItem.spuDescribe}}</span>
            </div>
            <div class="spu-tag" v-if="isShowListTimer"></div>
            <div class="spu-count" v-if="isShowListCount==1">
              <div class="spu-count-border" :style="{'border-color':skin.color}">
                <span class="txt" :style="{color:skin.color}">已售{{spuItem.soldNum}}件</span>
                <span class="txt spu-count-num" :style="{'background-color':skin.color}">仅剩{{spuItem.spuCanBuyNum}}件</span>
              </div>
            </div>
            <i-vip-price :price="spuItem.card_price" v-if="is_open_vipcard_buy==1&&spuItem.is_take_vipcard==1"></i-vip-price>
            <i-vip-price :price="spuItem.levelprice" type="1" v-else-if="canLevelBuy&&spuItem.is_mb_level_buy==1"></i-vip-price>
          </div>
          <div class="spu-price">
            <div class="sale-price">
              <span class="span">${{spuItem.actPrice[0]}}</span>.{{spuItem.actPrice[1]}}
            </div>
            <div class="market-price" v-if="spuItem.show_productprice">${{spuItem.marketPrice[0]}}.{{spuItem.marketPrice[1]}}</div>
          </div>
        </div>
        <block v-if="!isPast">
          <block v-if="number<=0">
            <i-button iClass="add-cart" v-if="disabled||spuItem.spuCanBuyNum==0||actEnd">
              <img class="img" src="@/assets/images/icon-add-shopCart-disabled.png"/>
            </i-button>
            <i-button bind:click="openSku" iClass="add-cart" v-else>
              <div class="btn i-class" >
                <span class="iconfont icon-gouwuche" style="color:#fff;"></span>
              </div>
            </i-button>
          </block>
          <i-input-number addImage="@/assets/images/icon-add-2.png" bind:change="changeNumber" bind:outOfMax="outOfMax" iClass="index-input-number" iClassNumberText="input-number-span" :max="spuItem.spuCanBuyNum" min="0" reduceImage="@/assets/images/icon-reduce-2.png" :value="number" v-else></i-input-number>
        </block>
        <div class="mask" v-if="isPast||disabled||spuItem.spuCanBuyNum==0?'disabled':''"></div>
        <div class="act-end act-out" v-if="spuItem.spuCanBuyNum==0">已抢光</div>
        <div class="act-end" v-else-if="actEnd" v-show="false">团购已结束</div>
      </router-link>
      <div class="picktime" v-if="showPickTime">
        <div>预售时间：{{spuItem.begin_time}}</div>
        <div>提货时间：{{spuItem.pick_up_modify}}</div>
      </div>
    </label>


  </div>
</template>

<script>
  import IRouterLink from '@/components/RouterLink'
  import IButton from '@/components/button'
  export default {
    components: { IRouterLink,IButton},
    name: '',
    props: {
      spuItem: {
        type: Object,
        default: {
          spuId: "",
          skuId: "",
          spuImage: "",
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
        default: !1
      },
      actEnd: {
        type: Boolean,
        default: !1
      },
      reduction: {
        type: Object,
        default: {
          full_money: "",
          full_reducemoney: "",
          is_open_fullreduction: 0
        }
      },
      isShowListCount: {
        type: Number,
        default: 0
      },
      changeCarCount: {
        type: Boolean,
        default: !1
      },
      needAuth: {
        type: Boolean,
        default: !1
      },
      is_open_vipcard_buy: {
        type: Number,
        default: 0
      },
      canLevelBuy: {
        type: Boolean,
        default: !1
      },
      isShowListTimer: {
        type: Boolean,
        default: !0
      },
      showPickTime: {
        type: Boolean,
        default: !1
      },
      skin: {
        type: Object
      }
    },
    data() {
      return{

      }
    },
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
    display: block;
    background: #fff;
    width: 100%;
    border-radius: 10px;
    overflow: hidden;
    position: relative;
    box-shadow: 0 0 40px rgba(0,0,0,0.05);
    padding: 10px;
    box-sizing: border-box;
  }

  .spu .img-class {
    width: 240px;
    height: 240px;
    border-radius: 10px;
  }

  .spu .mask {
    background: rgba(255,255,255,0.5);
    width: 240px;
    height: 240px;
    position: absolute;
    left: 0;
    top: 0;
  }

  .spu .act-end {
    position: absolute;
    height: 20px;
    border-radius: 10px;
    background: rgba(0,0,0,0.5);
    color: #fff;
    font-size: 12px;
    text-align: center;
    line-height: 20px;
    left: 140px;
    top: 100px;
    padding: 0 12px;
    transform: translateX(-50%);
  }

  .spu .act-end.act-out {
    left: 120px;
  }

  .spu .spu-content {
    position: relative;
    display: flex;
  }

  .spu .spu-content.disabled {
    opacity: 0.6;
  }

  .spu .spu-content .item-left {
    width: 100px;
    height: 100px;
    position: relative;
  }

  .spu .spu-content .item-right {
    box-sizing: border-box;
    margin-left: 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .spu .spu-content .item-right .spu-title {
    color: #333;
    font-size: 14px;
    height: 14px;
    width: 200px;
    margin-bottom: 2px;
    font-weight: bold;
    position: relative;
  }

  .spu .spu-content .item-right .spu-title .span {
    width: 100%;
    height: 20px;
    position: absolute;
    left: 0;
    top: -4px;
    line-height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 0;
  }

  .spu .spu-content .item-right .spu-tag {
    padding-left: 196px;
    margin-bottom: 20px;
    display: flex;
    height: 28px;
  }

  .spu .spu-content .item-right .spu-desc {
    font-size: 14px;
    line-height: 26px;
    color: #999;
    position: relative;
    width: 400px;
    height: 26px;
    margin-bottom: 12px;
  }

  .spu .spu-content .item-right .spu-desc .em {
    width: 100%;
    height: 32px;
    position: absolute;
    left: 0;
    top: -2px;
    line-height: 32px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .spu .spu-content .item-right .spu-price {
    display: flex;
    align-items: flex-end;
    font-size: 12px;
    line-height: 26px;
    overflow: hidden;
    margin-top: 10px;
  }

  .spu .spu-content .item-right .spu-price .sale-price {
    color: #ff5344;
    margin-right: 12px;
    font-size: 10px;
  }

  .spu .spu-content .item-right .spu-price .sale-price .span {
    font-size: 18px;
    line-height: 18px;
    margin: 0;
    font-weight: bold;
  }

  .spu .spu-content .item-right .spu-price .market-price {
    text-decoration: line-through;
    color: #999;
    margin-right: 12px;
  }

  .spu .spu-content .item-right .spu-count {
    font-size: 24px;
    height: 24px;
    color: #999;
    margin-bottom: 20px;
  }

  .spu .spu-content .item-right .spu-count .spu-count-border {
    display: inline-flex;
    border: 1px solid #f78076;
    border-radius: 20px;
    overflow: hidden;
    height: 30px;
    line-height: 30px;
  }

  .spu .spu-content .item-right .spu-count .spu-count-border .txt {
    padding: 0 10px;
    color: #f78076;
    height: 30px;
    line-height: 30px;
  }

  .spu .spu-content .item-right .spu-count .spu-count-border .spu-count-num {
    background-color: #f78076;
    color: #fff;
  }

  .spu .spu-content .add-cart {
    width: 68px;
    height: 68px;
    padding: 0;
    margin: 0;
    position: absolute;
    right: 0;
    bottom: -10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .spu .spu-content .add-cart .img {
    width: 54px;
    height: 54px;
    display: block;
  }

  .spu .spu-content .spu-active {
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 9;
    display: flex;
    flex-direction: column-reverse;
    align-items: flex-start;
  }

  .spu .spu-content .spu-active .tag {
    background: linear-gradient(to right,#ff5041,#ff994b);
    border-radius: 0 14px 14px 0;
    padding: 0 12px;
    height: 30px;
    font-size: 22px;
    line-height: 30px;
    color: #fff;
    display: inline-block;
    align-items: center;
    justify-content: center;
    width: auto;
    max-width: 180px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .spu .spu-content .spu-active .tag-green {
    background: linear-gradient(to left,#46c8d0,#29ba9a);
  }

  .spu .item-tag {
    position: absolute;
    left: -1px;
    top: 0;
    width: 54px;
    height: 62px;
    z-index: 1;
    color: #fff;
    text-align: center;
  }

  .item-tag-bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 27px;
    height: 31px;
    z-index: 0;
  }

  .spu .item-tag .tag-name {
    position: relative;
    padding-top: 2px;
    font-size: 10px;
    width: 24px;
    line-height: 1;
    font-weight: 600;
    z-index: 1;
  }

  .spu .item-tag .tag-name.two-word {
    font-size: 22px;
    padding-top: 14px;
  }

  .spu .index-input-number {
    position: absolute;
    right: 0;
    bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .spu .index-input-number .i-input-number-div {
    width: 80px;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .spu .index-input-number .i-input-number-div .img {
    width: 40px;
    height: 40px;
  }

  .spu .index-input-number .i-input-number-minus {
    justify-content: flex-end;
  }

  .spu .index-input-number .i-input-number-plus {
    justify-content: flex-start;
  }

  .spu .index-input-number .input-number-text {
    height: 88px;
    line-height: 88px;
    font-size: 24px;
    color: #333;
    width: 58px;
  }

  .spu-play {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 100px;
    height: 100px;
    margin-top: -50px;
    margin-left: -50px;
  }

  .spu-play .img {
    width: 100%;
    height: 100%;
  }

  .picktime {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 24px;
    font-weight: bold;
    margin-top: 20px;
    color: #ed7b3a;
    border-top: 0.1px solid #e5e5e5;
    padding-top: 20px;
  }
</style>
