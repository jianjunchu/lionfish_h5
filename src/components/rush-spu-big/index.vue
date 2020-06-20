<template>
  <div>
    <form bindsubmit="submit2" reportSubmit="true">
      <button hidden formType="submit" id="formId"></button>
    </form>
    <label class="spu" for="formId">
      <i-router-link routerClass="spu-content" url="{{url}}">
        <view class="item-top">
          <view class="item-tag" wx:if="{{spuItem.label_info&&spuItem.label_info.type==0}}">
            <image class="item-tag-bg" mode="widthFix" src="../../images/tag.png"></image>
            <view class="tag-name {{spuItem.label_info.len==2?'two-word':''}}">{{spuItem.label_info.tagcontent}}</view>
          </view>
          <view class="item-tag" style="background:url({{spuItem.label_info.tagcontent}}) no-repeat left top;background-size: 100%;" wx:if="{{spuItem.label_info&&spuItem.label_info.type==1}}"></view>
          <i-img defaultImage="{{placeholdeImg?placeholdeImg:'../../images/placeholder-refund.png'}}" height="400" iClass="img-class" lazyLoad="true" loadImage="{{spuItem.bigImg?spuItem.bigImg:spuItem.skuImage}}" width="710"></i-img>
          <view class="spu-active" wx:if="{{reduction.is_open_fullreduction==1&&spuItem.is_take_fullreduction==1}}">
            <view class="tag">满{{reduction.full_money}}减{{reduction.full_reducemoney}}</view>
            <view class="tag tag-green" wx:if="{{spuItem.isLimit}}">限购</view>
          </view>
          <view class="spu-play" wx:if="{{spuItem.is_video}}">
            <image class="img" src="../../images/play.png"></image>
          </view>
        </view>
        <view class="item-bottom">
          <view class="item-right-top">
            <view class="spu-title">
              <text class="span">{{spuItem.spuName}}</text>
            </view>
            <view class="spu-desc" wx:if="{{spuItem.spuDescribe}}">
              <text class="em">{{spuItem.spuDescribe}}</text>
            </view>
          </view>
          <i-vip-price price="{{spuItem.card_price}}" wx:if="{{is_open_vipcard_buy==1&&spuItem.is_take_vipcard==1}}"></i-vip-price>
          <i-vip-price price="{{spuItem.levelprice}}" type="1" wx:elif="{{canLevelBuy&&spuItem.is_mb_level_buy==1}}"></i-vip-price>
          <view class="picktime" wx:if="{{showPickTime}}">
            <view>预售时间：{{spuItem.begin_time}}</view>
            <view>提货时间：{{spuItem.pick_up_modify}}</view>
          </view>
          <view class="spu-price">
            <view class="sale-price">
              <text class="span">${{spuItem.actPrice[0]}}</text>.{{spuItem.actPrice[1]}}
            </view>
            <view class="market-price" wx:if="{{spuItem.show_productprice}}"> ${{spuItem.marketPrice[0]}}.{{spuItem.marketPrice[1]}}</view>
          </view>
          <view class="spu-count" wx:if="{{isShowListCount==1}}">已售{{spuItem.soldNum}}件 / 仅剩{{spuItem.spuCanBuyNum}}件</view>
        </view>
        <block wx:if="{{!isPast}}">
          <block wx:if="{{number<=0}}">
            <i-button disabled="{{disabled||spuItem.spuCanBuyNum==0}}" iClass="add-cart-disabled" wx:if="{{disabled||spuItem.spuCanBuyNum==0}}">
              已抢光
            </i-button>
            <i-button disabled="{{disabled||actEnd}}" iClass="add-cart-disabled" wx:elif="{{disabled||actEnd}}">
              已结束
            </i-button>
            <view bind:click="openSku" class="add-cart" style="background: {{skin.color}};" wx:else>
              立即抢购
            </view>
          </block>
          <i-input-number addImage="../../images/icon-add-2.png" bind:change="changeNumber" bind:outOfMax="outOfMax" iClass="index-input-number" iClassNumberText="input-number-text" max="{{spuItem.spuCanBuyNum}}" min="0" reduceImage="../../images/icon-reduce-2.png" value="{{number}}" wx:else></i-input-number>
        </block>
        <view class="mask" wx:if="{{isPast||disabled||spuItem.spuCanBuyNum==0?'disabled':''}}"></view>
        <view class="act-end act-out" wx:if="{{spuItem.spuCanBuyNum==0}}">已抢光</view>
        <view class="act-end" wx:elif="{{actEnd}}">团购已结束</view>
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
