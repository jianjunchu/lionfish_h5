<template>
  <div>
    <div class="topic" v-if="list.length" v-for="(voitem,idx) in list" :key="voitem.id">
      <img @click="goSpecial" class="topic-img" :data-id="voitem.id" mode="widthFix" :src="voitem.cover"
           v-if="voitem.cover"/>
      <div class="new-comers" v-if="voitem.list.length">
        <div scrollX class="new-comers-scroll">
           <div class="new-comers-wrap">
            <i-router-link routerClass="new-comers-item"
                           :url="'/lionfish_comshop/pages/goods/goodsDetail?id='+item.actId"
                           v-for="(item,gidx) in voitem.list" :key="item.id">
              <i-img :defaultImage="placeholdeImg?placeholdeImg:require('@/assets/images/placeholder-refund.png')"
                     height="200"
                     iClass="new-img" :loadImage="item.skuImage" width="180"></i-img>
               <div class="act-end" v-if="item.spuCanBuyNum==0">已抢光 </div>
               <div class="title">{{item.spuName}} </div>
               <div class="new-bot">
                 <div class="price">${{item.actPrice[0]}}.{{item.actPrice[1]}} </div>
                <i-button iClass="add-cart" v-if="disabled||item.spuCanBuyNum==0">
                  <img class="img" src="@/assets/images/icon-add-shopCart-disabled.png"/>
                </i-button>
                <i-button bind:click="openSku" :data-gidx="gidx" :data-idx="idx" iClass="add-cart" v-else>
                  <i-addcart iClass="img"></i-addcart>
                </i-button>
               </div>
            </i-router-link>
           </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: '',
    props: {
      refresh: {
        type: Boolean,
        value: !1
      }
    },
    watch: {
      refresh: (t) => {
        this.list = []
        this.getData()
      }
    },
    data() {
      return {
        disabled: !1,
        list: [],
        placeholdeImg: ''
      }
    },
    created() {
      this.placeholdeImg = this.$app.globalData.placeholdeImg
      this.getData()

    }
    , methods: {
      getData: function() {
        var t = this.$wx.getStorageSync('token'), e = this, a = this.$wx.getStorageSync('community')

        this.$http({}).then(t => {
          if (0 == t.code) {
            this.list = t.data
          }
        })
      },
      goSpecial: function(t) {
        var a = t.currentTarget.dataset.id
        a && this.$wx.navigateTo({
          url: '/lionfish_comshop/moduleA/special/index?id=' + a
        })
      },
      openSku: function(t) {
        var a = t.currentTarget.dataset.idx, e = t.currentTarget.dataset.gidx
        this.disabled = !1
        var i = this.list[a].list[e]
        this.$emit('openSku', {
          actId: i.actId,
          skuList: i.skuList,
          promotionDTO: i.promotionDTO || '',
          is_take_vipcard: i.is_take_vipcard,
          is_mb_level_buy: i.is_mb_level_buy,
          allData: {
            spuName: i.spuName,
            skuImage: i.skuImage,
            actPrice: i.actPrice,
            canBuyNum: i.spuCanBuyNum,
            stock: i.spuCanBuyNum,
            marketPrice: i.marketPrice
          }
        })
      }
    }
  }
</script>

<style scoped>
  @import "../new-comer/index.css";

  .topic {
    margin: 10px;
    background: #fff;
    border-radius: 5px;
    overflow: hidden;
  }

  .topic-img {
    width: 100%;
    vertical-align: top;
    border-radius: 5px 5px 0 0;
  }

  .blank10 {
    height: 10px;
    background-color: #f8f8f8;
  }
</style>
