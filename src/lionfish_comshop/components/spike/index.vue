<template>
  <div class="new-comers" v-if="list && list.length">
    <div class="new-comers-title">
        <span class="leftBorder" :style="{'border-color':skin.color}"></span>
        {{$t('home.xianshimiaosha')}}
      <i-count-down :clearTimer="clearTimer" countdownClass="count-down" itemClass="item-time" showDay="true"
                    :target="rushEndTime" v-if="rushEndTime">
        <span class="count-down-left-text">{{$t('home.jinsheng')}}</span>
      </i-count-down>
    </div>
    <div ref="Box" @scroll="scrollEvent" class="new-comers-scroll">
      <div class="new-comers-wrap">
        <router-link class="new-comers-item" :to="'/lionfish_comshop/pages/goods/goodsDetail?id='+item.actId"
                       v-for="(item , index) in list1" :key="item.id">
          <i-img defaultImage="@/assets/images/placeholder-refund.png" height="200" iClass="new-img"
                 :loadImage="item.skuImage" width="180"></i-img>
          <div class="act-end" v-if="item.spuCanBuyNum==0">{{$t('home.yiqiangguang')}}</div>
          <div class="title">{{item.spuName}}</div>
          <div class="new-bot">
            <div class="price">${{item.actPrice[0]}}.{{item.actPrice[1]}}</div>
            <i-button iClass="add-cart" v-if="disabled||item.spuCanBuyNum==0">
              <img class="img" src="@/assets/images/icon-add-shopCart-disabled.png"></img>
            </i-button>
            <i-button @handleTap="openSku(index)" :data-idx="index" iClass="add-cart" v-else>
              <i-addcart iClass="img"></i-addcart>
            </i-button>
          </div>
        </router-link>
      </div>
      <div class="new-comers-wrap">
        <router-link class="new-comers-item" :to="'/lionfish_comshop/pages/goods/goodsDetail?id='+item.actId"
                       v-for="(item , index) in list2" :key="item.id">
          <i-img defaultImage="@/assets/images/placeholder-refund.png" height="200" iClass="new-img"
                 :loadImage="item.skuImage" width="180"></i-img>
          <div class="act-end" v-if="item.spuCanBuyNum==0">{{$t('home.yiqiangguang')}}</div>
          <div class="title">{{item.spuName}}</div>
          <div class="new-bot">
            <div class="price">${{item.actPrice[0]}}.{{item.actPrice[1]}}</div>
            <i-button iClass="add-cart" v-if="disabled||item.spuCanBuyNum==0">
              <img class="img" src="@/assets/images/icon-add-shopCart-disabled.png"></img>
            </i-button>
            <i-button @handleTap="openSku(index)" :data-idx="index" iClass="add-cart" v-else>
              <i-addcart iClass="img"></i-addcart>
            </i-button>
          </div>
        </router-link>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: '',
    props: {
      refresh: {
        default: !1
      },
      clearTimer: {
        default: !1
      },
      skin: {
        default: Object
      }
    },
    watch: {
      refresh: (t, oldValue) => {
        var e = this
        e.pageNum = 1, e.noMore = !1, e.list = []
        e.getData()
      }
    },
    data(){
      return{
        disabled: !1,
        list: [],
        list1: [],
        list2: [],
        pageNum: 1,
        noMore: !1,
        rushEndTime: 0
      }
    },
    mounted:function(){
      console.log('this')
      console.log(this)
      this.getData();
    },
    methods: {
      getData: function() {
        var t = this.$wx.getStorageSync('token'), i = this, e = this.$wx.getStorageSync('community')
        this.$http({
          controller: 'index.load_spikebuy_goodslist',
          token: t,
          pageNum: i.pageNum,
          head_id: e.communityId
        }).then(t => {
          console.log(t)
          if (0 == t.code) {
            var e = i.list.concat(t.list), a = i.getTime(e)
            this.list = e;
            if(e.length <= 6){
              if(e.length > 3){
                this.list1 = e.slice(0, 3);
                this.list2 = e.slice(3, e.length);
              }else{
                this.list1 = e;
              }
            }else{
              var a = Math.round(e.length/2);
              this.list1 = e.slice(0, a);
              this.list2 = e.slice(a, e.length);
            }
            this.rushEndTime = a;
          } else {
            this.noMore = !0
          }
        })

      },
      getMore: function() {
        if (!this.noMore) {
          var t = this, e = t.pageNum + 1
          console.log(e), this.setData({
            pageNum: e
          }, function() {
            t.getData()
          })
        }
      },
      scrollEvent () {
        let a = this.$refs.Box.scrollLeft
        let b = this.$refs.Box.scrollWidth
        let c = this.$refs.Box.scrollTop
        console.log('滚动条'+a)
        console.log('可视区'+b)
        console.log('距离顶部'+c)

      },
      openSku: function(e) {

        this.disabled = !1

        var a = this.list[e]
        this.$emit('openSku', {
          actId: a.actId,
          skuList: a.skuList,
          promotionDTO: a.promotionDTO || '',
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
        })
      },
      getTime: function(t) {
        var e = 0
        return 0 === (arguments && 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0) && t.map(function(t) {
          t.end_time *= 1e3, e = t.end_time > e ? t.end_time : e
        }), e
      }
    }

  }
</script>

<style scoped>
  .new-comers-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .count-down {
    height: 34px;
    line-height: 34px;
    color: #444;
    font-size: 12px;
    display: flex;
    align-items: center;
    margin-right: 10px;
  }

  .count-down .item-time {
    width: 15px;
    height: 15px;
    line-height: 15px;
    color: #fff;
    text-align: center;
    background: #444;
    border-radius: 2px;
    padding: 0 1px;
    font-weight: normal;
  }

  .count-down-left-text {
    font-size: 12px;
    margin-right: 5px;
    font-weight: normal;
  }
</style>

<style src="@/lionfish_comshop/components/new-comer/index.css">


</style>
