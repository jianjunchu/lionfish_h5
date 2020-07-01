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
        var t = this.$store.getters.token, e = this, a = this.$app.globalData.community
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

<style src="@/lionfish_comshop/components/new-comer/index.css" scoped>

  .new-comers {
    position: relative;
    padding: 10px 0;
    margin: 10px;
    background: #fff;
    border-radius: 5px;
  }

  .new-comers-title {
    position: relative;
    margin-bottom: 10px;
    font-size: 15px;
    font-weight: bold;
    color: #333;
    padding-left: 10px;
  }

  .leftBorder {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    border-left: 4px solid #8ED9D1;
  }

  .new-comers-scroll {
    max-height: 310px;
  }

  .new-comers-wrap {
    position: relative;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
  }

  .new-comers-item {
    width: 120px;
    box-sizing: border-box;
    padding: 10px;
    font-size: 14px;
  }

  .new-comers-item .new-img {
    width: 100px;
    height: 90px;
    margin-bottom: 10px;
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
    margin-top: 5px;
  }

  .new-comers-item .add-cart {
    width: 22px;
    height: 22px;
    padding: 0;
    margin: 0;
  }

  .new-comers-item .add-cart .img {
    width: 22px;
    height: 22px;
    display: block;
  }

  .new-comers-item .price {
    color: #ff5041;
  }

  .new-comers-item {
    position: relative;
  }

  .new-comers-item .act-end {
    position: absolute;
    height: 30px;
    border-radius: 5px;
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    font-size: 14px;
    text-align: center;
    line-height: 30px;
    left: 50%;
    top: 40px;
    padding: 0 6px;
    transform: translateX(-50%);
  }

  .new-comers-item .item-tag {
    position: absolute;
    left: 10px;
    top: 10px;
    width: 27px;
    height: 31px;
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

  .new-comers-item .item-tag .tag-name {
    position: relative;
    padding-top: 3px;
    font-size: 10px;
    line-height: 1;
    font-weight: 600;
    z-index: 1;
  }

  .new-comers-item .item-tag .tag-name.two-word {
    font-size: 12px;
    padding-top: 7px;
  }

</style>
