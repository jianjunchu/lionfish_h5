<template>
  <view class="new-comers" v-if="list.length">
    <view class="new-comers-title">
      <view>
        <text class="leftBorder" :style="{'border-color':skin.color}"></text>
        限时秒杀
      </view>
      <i-count-down :clearTimer="clearTimer" countdownClass="count-down" itemClass="item-time" showDay="true"
                    :target="rushEndTime" v-if="rushEndTime">
        <span class="count-down-left-text">仅剩</span>
      </i-count-down>
    </view>
    <div  bindscrolltolower="getMore" class="new-comers-scroll">
      <view class="new-comers-wrap">
        <i-router-link routerClass="new-comers-item" :url="'/lionfish_comshop/pages/goods/goodsDetail?id='+item.actId"
                       v-for="(item , index) in list" :key="id">
          <i-img defaultImage="@/assets/images/placeholder-refund.png" height="200" iClass="new-img"
                 :loadImage="tem.skuImage" width="180"></i-img>
          <view class="act-end" v-if="item.spuCanBuyNum==0">已抢光</view>
          <view class="title">{{item.spuName}}</view>
          <view class="new-bot">
            <view class="price">${{item.actPrice[0]}}.{{item.actPrice[1]}}</view>
            <i-button iClass="add-cart" v-if="disabled||item.spuCanBuyNum==0">
              <img class="img" src="@/assets/images/icon-add-shopCart-disabled.png"></img>
            </i-button>
            <i-button @click="openSku" data-idx="index" iClass="add-cart" v-else>
              <i-addcart iClass="img"></i-addcart>
            </i-button>
          </view>
        </i-router-link>
      </view>
    </div>
  </view>

</template>

<script>
  export default {
    name: '',
    props:{
      refresh: {
        type: Boolean,
        default: !1
      },
      clearTimer: {
        type: Boolean,
        default: !1
      },
      skin: {
        default: Object
      }
    },
    watch:{
      refresh: (t, oldValue) => {
        var e = this;
        e.pageNum = 1, e.noMore = !1, e. list = [];
        e.getData();
      },
    },
    date(){
      return{
        disabled: !1,
        list: [],
        pageNum: 1,
        noMore: !1,
        rushEndTime: 0
      }
    },
    methods: {
      getData: function() {
        var t = this.$wx.getStorageSync("token"), i = this, e = this.$.getStorageSync("community");

        this.$http({
          controller: "index.load_spikebuy_goodslist",
          token: t,
          pageNum: i.data.pageNum,
          head_id: e.communityId
        }).then(t =>{
          if (0 == t.code) {
            var e = i.list.concat(t.list), a = i.getTime(e);
            console.log(a);
            this.list = e,
              this.rushEndTime = a
          } else {
            this.noMore = !0
          }
        })

      },
      getMore: function() {
        if (!this.noMore) {
          var t = this, e = t.data.pageNum + 1;
          console.log(e), this.setData({
            pageNum: e
          }, function() {
            t.getData();
          });
        }
      },
      openSku: function(t) {
        var e = t.currentTarget.dataset.idx;
        this.disabled = !1

        var a = this.list[e];
        this.$emit("openSku", {
          actId: a.actId,
          skuList: a.skuList,
          promotionDTO: a.promotionDTO || "",
          is_take_vipcard: a.is_take_vipcard,
          is_mb_level_buy: a.is_mb_level_buy,
          allData: {
            spuName: a.spuName,
            skuImage: a.skuImage,
            actPrice: a.actPrice,
            canBuyNum: a.spuCanBuyNum,
            stock: a.spuCanBuyNum,
            marketPrice: a.marketPrice
          }
        });
      },
      getTime: function(t) {
        var e = 0;
        return 0 === (1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0) && t.map(function(t) {
          t.end_time *= 1e3, e = t.end_time > e ? t.end_time : e;
        }), e;
      }
    }

  }
</script>

<style scoped>
  @import "../new-comer/index.less";

  .new-comers-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .count-down {
    height: 68rpx;
    line-height: 68rpx;
    color: #444;
    font-size: 24rpx;
    display: flex;
    align-items: center;
    flex: 1;
    margin-right: 20rpx;
  }

  .count-down .item-time {
    width: 34rpx;
    height: 32rpx;
    line-height: 32rpx;
    color: #fff;
    text-align: center;
    background: #444;
    border-radius: 4rpx;
    padding: 0 2rpx;
    font-weight: normal;
  }

  .count-down-left-text {
    font-size: 24rpx;
    margin-right: 10rpx;
    font-weight: normal;
  }
</style>
