<template>
  <div>


    <form bindsubmit="submit2" reportSubmit="true">
      <button hidden formType="submit" id="formId"></button>
    </form>
    <div class="spu" for="formId">
      <i-router-link class="spu-content" :url="url">
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
        <div v-if="!isPast">
          <div v-if="number<=0">
            <i-button iClass="add-cart" v-if="disabled||spuItem.spuCanBuyNum==0||actEnd">
              <img class="img" src="@/assets/images/icon-add-shopCart-disabled.png"/>
            </i-button>
            <i-button bind:click="openSku" iClass="add-cart" v-else>
              <div class="btn i-class" >
                <span class="iconfont icon-gouwuche" style="color:#fff;"></span>
              </div>
            </i-button>
          </div>
          <i-input-number addImage="@/assets/images/icon-add-2.png" bind:change="changeNumber" bind:outOfMax="outOfMax" iClass="index-input-number" iClassNumberText="input-number-span" :max="spuItem.spuCanBuyNum" min="0" reduceImage="@/assets/images/icon-reduce-2.png" :value="number" v-else></i-input-number>
        </div>
        <div class="mask" v-if="isPast||disabled||spuItem.spuCanBuyNum==0?'disabled':''"></div>
        <div class="act-end act-out" v-if="spuItem.spuCanBuyNum==0">已抢光</div>
        <div class="act-end" v-else-if="actEnd" v-show="false">团购已结束</div>
      </i-router-link>
      <div class="picktime" v-if="showPickTime">
        <div>预售时间：{{spuItem.begin_time}}</div>
        <div>提货时间：{{spuItem.pick_up_modify}}</div>
      </div>
    </div>


  </div>
</template>

<script>

  export default {
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

<style>
  @import 'index.less';
</style>
