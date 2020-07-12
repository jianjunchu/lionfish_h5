<template>
  <div>
    <form bindsubmit="submit2" reportSubmit="true">
      <button hidden formType="submit" id="formId"></button>
    </form>
    <label class="spu" for="formId">
      <i-router-link routerClass="spu-content" url="{{url}}">
        <div class="item-top">
          <div class="item-tag" v-if="spuItem.label_info&&spuItem.label_info.type==0">
            <img class="item-tag-bg" mode="widthFix" src="@/assets/images/tag.png"/>
            <div :class="['tag-name',spuItem.label_info.len==2?'two-word':'']">{{spuItem.label_info.tagcontent}}</div>
          </div>
          <div class="item-tag"
               style="background:url({{spuItem.label_info.tagcontent}}) no-repeat left top;background-size: 100%;"
               v-if="spuItem.label_info&&spuItem.label_info.type==1"></div>
          <i-img defaultImage="{{placeholdeImg?placeholdeImg:'@/assets/images/placeholder-refund.png'}}" height="400"
                 iClass="img-class" lazyLoad="true" loadImage="{{spuItem.bigImg?spuItem.bigImg:spuItem.skuImage}}"
                 width="710"></i-img>
          <div class="spu-active" v-if="reduction.is_open_fullreduction==1&&spuItem.is_take_fullreduction==1">
            <div class="tag">满{{reduction.full_money}}减{{reduction.full_reducemoney}}</div>
            <div class="tag tag-green" v-if="spuItem.isLimit">限购</div>
          </div>
          <div class="spu-play" v-if="spuItem.is_video">
            <img class="img" src="@/assets/images/play.png"/>
          </div>
        </div>
        <div class="item-bottom">
          <div class="item-right-top">
            <div class="spu-title">
              <span class="span">{{spuItem.spuName}}</span>
            </div>
            <div class="spu-desc" v-if="spuItem.spuDescribe">
              <span class="em">{{spuItem.spuDescribe}}</span>
            </div>
          </div>
          <i-vip-price price="{{spuItem.card_price}}"
                       v-if="is_open_vipcard_buy==1&&spuItem.is_take_vipcard==1"></i-vip-price>
          <i-vip-price price="{{spuItem.levelprice}}" type="1"
                      v-else-if="canLevelBuy&&spuItem.is_mb_level_buy==1"></i-vip-price>
          <div class="picktime" v-if="showPickTime">
            <div>预售时间：{{spuItem.begin_time}}</div>
            <div>提货时间：{{spuItem.pick_up_modify}}</div>
          </div>
          <div class="spu-price">
            <div class="sale-price">
              <span class="span">${{spuItem.actPrice[0]}}</span>.{{spuItem.actPrice[1]}}
            </div>
            <div class="market-price" v-if="spuItem.show_productprice">
              ${{spuItem.marketPrice[0]}}.{{spuItem.marketPrice[1]}}
            </div>
          </div>
          <div class="spu-count" v-if="isShowListCount==1">Already Sold &nbsp;{{spuItem.soldNum}} / Left &nbsp; {{spuItem.spuCanBuyNum}}</div>
        </div>
        <div v-if="!isPast">
          <div v-if="number<=0">
            <i-button :disabled="disabled||spuItem.spuCanBuyNum==0" iClass="add-cart-disabled"
                      v-if="disabled||spuItem.spuCanBuyNum==0">
              {{$t('home.yiqiangguang')}}
            </i-button>
            <i-button disabled="{{disabled||actEnd}}" iClass="add-cart-disabled" wx:elif="{{disabled||actEnd}}">
              {{$t('home.tuangouyijieshu')}}
            </i-button>
            <div @click="openSku" class="add-cart" :style="{background: skin.color}" v-else>
              立即抢购
            </div>
          </div>
          <i-input-number :addImage="'@/assets/images/icon-add-2.png'" @change="changeNumber" bind:outOfMax="outOfMax"
                          iClass="index-input-number" iClassNumberText="input-number-text" :max="spuItem.spuCanBuyNum"
                          min="0" :reduceImage="'@/assets/images/icon-reduce-2.png'" :value="number"
                          v-else></i-input-number>
        </div>
        <div class="mask" v-if="isPast||disabled||spuItem.spuCanBuyNum==0?'disabled':''"></div>
        <div class="act-end act-out" v-if="spuItem.spuCanBuyNum==0">{{$t('home.yiqiangguang')}}</div>
        <div class="act-end" v-else-if="actEnd">{{$t('home.tuangouyijieshu')}}</div>
      </i-router-link>
    </label>

  </div>
</template>

<script>
  export default {
    name: ''
  }
</script>

<style scoped>

</style>
