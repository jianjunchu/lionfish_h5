<template>
  <div class="new-comers" v-if="list.length">
    <div class="new-comers-title">
      <span class="leftBorder" :style="{'border-color':skin.color}"></span>
      新人专享
    </div>
    <scroll-view scrollX bindscrolltolower="getMore" class="new-comers-scroll">
      <div class="new-comers-wrap">
        <i-router-link routerClass="new-comers-item" :url="'/lionfish_comshop/pages/goods/goodsDetail?id='+item.actId"
                       v-for="(item ,index ) in list" :key="id">
          <i-img defaultImage="@/assets/images/placeholder-refund.png" height="200" iClass="new-img"
                 :loadImage="item.skuImage" width="180"></i-img>
          <div class="item-tag" v-if="item.label_info&&item.label_info.type==0">
            <img class="item-tag-bg" mode="widthFix" src="@/assets/images/tag.png"/>
            <div :class="['tag-name',item.label_info.len==2?'two-word':'']">{{item.label_info.tagcontent}}</div>
          </div>
          <div class="item-tag"
                :style="{'background':'url('+item.label_info.tagcontent+') no-repeat; left top;','background-size': '100%'}"
                v-if="item.label_info&&item.label_info.type==1"></div>
          <div class="act-end" v-if="item.spuCanBuyNum==0">已抢光</div>
          <div class="title">{{item.spuName}}</div>
          <div class="new-bot">
            <div class="price">${{item.actPrice[0]}}.{{item.actPrice[1]}}</div>
            <i-button iClass="add-cart" v-if="disabled||item.spuCanBuyNum==0">
              <img class="img" src="@/assets/images/icon-add-shopCart-disabled.png"/>
            </i-button>
            <i-button :click="openSku" data-idx="index" iClass="add-cart" v-else>
              <i-addcart iClass="img"></i-addcart>
            </i-button>
          </div>
        </i-router-link>
      </div>
    </scroll-view>
  </div>

</template>

<script>
  export default {
    name: '',
    props: {
      refresh: {
        type: Boolean,
        default: !1
      },
      skin: {
        type: Object
      }
    },
    watch: {
      refresh: (newValue, oldValue) => {
        var a = this
        this.pageNum = 1
        this.noMore = !1
        this.list = []
        a.getData()

      }
    },
    data() {
      return {
        disabled: !1,
        list: [],
        pageNum: 1,
        noMore: !1
      }
    },
    methods: {
      getData: function() {
        var t = this.$store.getters.token, e = this, a = this.$store.getters.globalData.community
        this.$http({}).then(t => {
          if (0 == t.code) {
            const a = e.list.concat(t.data.list)
            this.list = a
          } else {
            this.noMore = !0
          }
        })

      },
      getMore: function() {
        if (!this.noMore) {
          var t = this, a = t.data.pageNum + 1
          this.pageNum = a
          t.getData()
        }
      },
      openSku: function(t) {
        var a = t.currentTarget.dataset.idx
        this.disabled = !1
        var e = this.list[a]
        this.$emit('openSku', {
          actId: e.actId,
          skuList: e.skuList,
          promotionDTO: e.promotionDTO || '',
          is_take_vipcard: e.is_take_vipcard,
          is_mb_level_buy: e.is_mb_level_buy,
          allData: {
            spuName: e.spuName,
            skuImage: e.skuImage,
            actPrice: e.actPrice,
            canBuyNum: e.spuCanBuyNum,
            stock: e.spuCanBuyNum,
            marketPrice: e.marketPrice
          }
        })
      }
    }
  }
</script>

<style scoped>
  @import 'index.less';
</style>
