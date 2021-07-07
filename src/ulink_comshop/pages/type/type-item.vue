<template>
    <label class="spu" for="formId">
      <router-link class="spu-content-type" :to="'/ulink_comshop/pages/goods/goodsDetail?&id='+spuItem.actId">
        <div class="item-left">
          <div class="item-tag" v-if="spuItem.label_info&&spuItem.label_info.type==0">
            <img class="item-tag-bg" mode="widthFix" src="@/assets/images/tag.png"/>
            <div :class="['tag-name',(spuItem.label_info.len==2?'two-word':'')]">{{spuItem.label_info.tagcontent}}</div>
          </div>
          <div class="item-tag" :style="'background:url('+spuItem.label_info.tagcontent+') no-repeat left top;background-size: 100%;'" v-if="spuItem.label_info&&spuItem.label_info.type==1"></div>


          <i-img :defaultImage="placeholdeImg?placeholdeImg:'@/assets/images/placeholder-refund.png'" height="170"
                 iClass="img-class" lazyLoad="true" :loadImage="spuItem.skuImage" width="170"></i-img>
          <div class="tag" v-if="reduction.is_open_fullreduction==1&&spuItem.is_take_fullreduction==1">
            满{{reduction.full_money}}减{{reduction.full_reducemoney}}
          </div>
        </div>
        <div class="item-right">
          <div class="item-right-top">
            <div class="spu-title">
              <span class="span" v-if="$i18n.locale == 'en'">{{spuItem.spuName_en}}</span><span class="span" v-else>{{spuItem.spuName}}</span>
              <div class="supply_type" v-if="spuItem.supply_info && enabledFrontSupply==1" @click.stop.prevent="goSupply" :data-id="spuItem.supply_info.id">
                <div class="supply-logo">
                  <img v-if="spuItem.supply_info && spuItem.supply_info.logo" :src="spuItem.supply_info.logo"/>
                </div>
                <div class="supply-name" v-if="spuItem.supply_info.storename || spuItem.supply_info.shopname">{{spuItem.supply_info.storename || spuItem.supply_info.shopname}}</div>
              </div>
            </div>
            <div class="spu-desc" v-if="spuItem.spuDescribe_en || spuItem.spuDescribe">
              <span class="em" v-if="$i18n.locale == 'en'">{{spuItem.spuDescribe_en}}</span><span class="em" v-else>{{spuItem.spuDescribe}}</span>
            </div>
            <i-vip-price :price="spuItem.card_price"
                         v-if="is_open_vipcard_buy==1&&spuItem.is_take_vipcard==1"></i-vip-price>
          </div>
          <div class="spu-price">
            <span class="sale-price">
              <span class="span">${{spuItem.actPrice[0]}}</span>.{{spuItem.actPrice[1]}}</span>
            <div class="market-price" v-if="spuItem.show_productprice">
              ${{spuItem.marketPrice[0]}}.{{spuItem.marketPrice[1]}}
            </div>
            <div class="spu-counts" v-if="isShowListCount==1">
              <span class="count">{{spuItem.soldNum}} {{$t('detail.yishou')}} / {{spuItem.spuCanBuyNum}} {{$t('detail.shengyu')}}</span>
            </div>
          </div>
        </div>
        <div v-if="!isPast">
          <div v-if="number<=0">

            <i-button iClass="add-cart" v-if="spuItem.spuCanBuyNum<=0||actEnd||spuItem.is_coming">
              <img class="img" src="@/assets/images/icon-add-shopCart-disabled.png"/>
            </i-button>
            <i-button @handleTap="openSku" iClass="add-cart" v-else>
              <i-addcart fontsize="28" iClass="img"></i-addcart>
            </i-button>
          </div>
          <i-input-number addImage="@/assets/images/icon-add-2.png" @change="changeNumber" @outOfMax="outOfMax" iClass="index-input-number" iClassNumberText="input-number-text" iNumberImg="iNumberImg" iNumberView="iNumberView" :max="spuItem.spuCanBuyNum" min="0" reduceImage="@/assets/images/icon-reduce-2.png" :value="number" v-else></i-input-number>
        </div>
        <span class="mask-icon-out" v-if="spuItem.spuCanBuyNum==0"><img src="@/assets/images/sold-out.png"/></span>
        <span class="mask-icon-coming" v-if="spuItem.is_coming"><img src="@/assets/images/coming-soon.png"/></span>
        <span class="act-end" v-else-if="actEnd">团购已结束</span>
      </router-link>
    </label>

</template>

<script>
  import util from '../../utils'
  import status from '../../utils/index.js'

  var wx, app

  export default {
    name: 'i-type-item',
    props: {
      spuItem: {
        default: {
          spuId: '',
          skuId: '',
          skuImage: '',
          spuName: '',
          endTime: 0,
          beginTime: '',
          actPrice: ['', ''],
          marketPrice: ['', ''],
          spuCanBuyNum: '',
          soldNum: '',
          actId: '',
          limitMemberNum: '',
          limitOrderNum: '',
          serverTime: '',
          isLimit: !1,
          skuList: [],
          spuDescribe: '',
          is_take_fullreduction: 0,
          label_info: '',
          car_count: 0,
          supply_info: []
        }
      },
      isPast: {
        default: false
      },
      actEnd: {
        default: !1
      },
      reduction: {
        default: {
          full_money: '',
          full_reducemoney: '',
          is_open_fullreduction: 0
        }
      },
      changeCarCount: {
        default: !1

      },
      needAuth: {
        default: !1
      },
      is_open_vipcard_buy: {
        default: 0
      },
      canLevelBuy: {
        default: !1
      },
      enabledFrontSupply: {
        default: 0
      },
      isShowListCount: {
        default: 0
      },
      skin: {
        type: Object
      },
    },
    data() {
      return {
        stopClick:false,
        disabled: !1,
        placeholdeImg: '',
        number: 0,
        showAdd: false
      }
    },
    created: function() {

      wx = this.$wx
      app = this.$getApp()

      this.placeholdeImg = app.globalData.placeholdeImg
    },
    mounted:function(){
      this.number = this.spuItem.car_count || 0
    },
    methods: {
      openSku: function() {
        if (this.needAuth) {
          this.$emit('authModal', !0)
        } else {
          console.log('step1'), (
            this.stopClick = !0,
              this.disabled = !1
          )
          var t = this.spuItem
          void 0 === t.skuList.length ? this.$emit('openSku', {
            actId: t.actId,
            skuList: t.skuList,
            promotionDTO: t.promotionDTO,
            is_mb_level_buy: t.is_mb_level_buy,
            is_take_vipcard: t.is_take_vipcard,
            allData: {
              spuName: t.spuName,
              skuImage: t.skuImage,
              actPrice: t.actPrice,
              canBuyNum: t.spuCanBuyNum,
              stock: t.spuCanBuyNum,
              marketPrice: t.marketPrice
            }
          }) : this.addCart({
            value: 1,
            type: 'plus'
          })
        }
      },
      gotoDetail: function() {
        this.$wx.redirectTo({
          url: '/ulink_comshop/pages/goods/goodsDetail?id=' + this.spuItem.actId
        })
      },
      changeNumber: function(t) {
        console.log(t)
        var a = t
        a && this.addCart(a)
      },
      outOfMax: function(t) {
        t.detail
        var a = this.spuItem.spuCanBuyNum
        this.number >= a && this.$wx.showToast({
          title: '不能购买更多啦',
          icon: 'none'
        })
      },
      addCart: function(t) {

        var e = wx.getStorageSync('token'), a = wx.getStorageSync('community'), u = this.spuItem.actId,
          i = a.communityId, s = this
        if ('plus' == t.type) {
          var o = {
            goods_id: u,
            community_id: i,
            quantity: 1,
            sku_str: '',
            buy_type: 'dan',
            pin_id: 0,
            is_just_addcar: 1
          }
          util.addCart(o).then(function(t) {
            if (1 == t.showVipModal) {
              var e = t.pop_vipmember_buyimage
              s.$emit('vipModal', {
                pop_vipmember_buyimage: e,
                showVipModal: !0,
                visible: !1
              })
            } else if (3 == t.code) {
              wx.showToast({
                title: t.msg,
                icon: 'none',
                duration: 2e3
              })
            } else {
              if (4 == t.code) return void s.$emit('authModal', !0)
              if (6 == t.code || 7 == t.code) {
                var a = t.max_quantity || ''
                0 < a && (
                  s.number = a
                )
                var i = t.msg
                wx.showToast({
                  title: i,
                  icon: 'none',
                  duration: 2e3
                })
              } else {
                  let title = s.$t('cart.yijiarugouwuche');
                s.$emit('changeCartNum', t.total), (
                  s.number = t.cur_count
                ), wx.showToast({
                  title: title,
                  image: '@/assets/images/addShopCart.png'
                }), status.indexListCarCount(u, t.cur_count)
              }
            }
          })
        } else {
          app.util.request({
            url: 'entry/wxapp/user',
            data: {
              controller: 'car.reduce_car_goods',
              token: e,
              goods_id: u,
              community_id: i,
              quantity: 1,
              sku_str: '',
              buy_type: 'dan',
              pin_id: 0,
              is_just_addcar: 1
            },
            dataType: 'json',
            method: 'POST',
            success: function(t) {
              3 == t.code ? wx.showToast({
                title: t.msg,
                icon: 'none',
                duration: 2e3
              }) : (s.$emit('changeCartNum', t.total), (
                s.number = t.cur_count
              ), status.indexListCarCount(u, t.cur_count))
            }
          })
        }
      },
      goSupply: function (event) {
        var id = event.currentTarget.dataset.id;
        wx.navigateTo({
          url: '/ulink_comshop/pages/supply/supplyHome?id=' + id
        })
      }
    }

  }
</script>

<style >

  .i-btn {
    text-align: center;
    vertical-align: middle;
    touch-action: manipulation;
    cursor: pointer;
    background-image: none;
    white-space: nowrap;
    user-select: none;
    font-size: 3vw;
    border: 0!important;
    position: relative;
    text-decoration: none;
    height: 11vw;
    line-height: 11vw;
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
    width: 26vw;
    height: 26vw;
  }

  .spu .spu-content-type {
    background: #fff;
    overflow: hidden;
    position: relative;
    display: flex;
    padding: 2vw;
    box-sizing: border-box;
    border-bottom: 1px solid #dfe2e8;
  }

  .spu .spu-content-type::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 3vw;
    right: 3vw;
  }

  .spu .spu-content-type.disabled {
    opacity: 0.6;
  }

  .spu .spu-content-type .item-left {
    width: 26vw;
    height: 26vw;
    position: relative;
  }

  .spu .spu-content-type .item-right {
    flex: 1;
    box-sizing: border-box;
    margin-left: 4vw;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .spu .spu-content-type .item-right .spu-title {
    color: #222;
    font-size: 3vw;
    height: 4.2vw;
    margin-bottom: 1vw;
    margin-top: 2vw;
    font-weight: 500;
    position: relative;
  }

  .spu .spu-content-type .item-right .spu-title .span {
    width: 80%;
    position: absolute;
    left: 0;
    top: -1vw;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 0;
  }

  .spu .spu-content-type .item-right .spu-desc {
    font-size: 3vw;
    line-height: 3vw;
    color: #999;
    position: relative;
    width: 30vw;
    height: 4vw;
    margin-bottom: 2vw;
  }

  .spu .spu-content-type .item-right .spu-desc .em {
    width: 100%;
    height: 5vw;
    position: absolute;
    left: 0;
    line-height: 5vw;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .spu .spu-content-type .add-cart {
    padding: 0;
    margin: 0;
    position: absolute;
    right: 1vw;
    bottom: 7vw;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    width: 8vw;
    height: 8vw;
    border: none;
    outline: none;
  }

  .spu .spu-content-type .add-cart .img {
    width: 8vw;
    height: 8vw;
    display: block;
  }

  .spu .spu-content-type .item-right .spu-price  {
    display: flex;
    align-items: flex-end;
    font-size: 3vw;
    line-height: 4vw;
    overflow: hidden;
  }

  .spu .spu-content-type .item-right .spu-price .sale-price {
    color: #ff5344;
    margin-right: 1vw;
    position: absolute;
    bottom: 5vw;
  }

  .spu .spu-content-type .item-right .spu-price .sale-price .span {
    font-size: 4.5vw;
    line-height: 4.5vw;
    margin: 0;
    font-weight: bold;
  }

  .spu .spu-content-type .item-right .spu-price .market-price {
    text-decoration: line-through;
    color: #999;
    margin-right: 5vw;
  }

  .spu .mask {
    background: rgba(255,255,255,0.5);
    width: 26vw;
    height: 26vw;
    position: absolute;
    left: 4vw;
    top: 3vw;
  }

  .spu .act-end {
    position: absolute;
    height: 8vw;
    border-radius: 2vw;
    background: rgba(0,0,0,0.5);
    color: #fff;
    font-size: 3vw;
    text-align: center;
    line-height: 8vw;
    left: 12vw;
    top: 11vw;
    padding: 0 2vw;
    transform: translateX(-50%);
  }

  .spu .tag {
    position: absolute;
    left: 0;
    bottom: 0;
    background: linear-gradient(to right,#ff5041,#ff994b);
    border-radius: 0 2vw 2vw 0;
    padding: 0 2vw;
    height: 5vw;
    font-size: 2.3vw;
    line-height: 5vw;
    color: #fff;
    display: inline-block;
    align-items: center;
    justify-content: center;
    width: auto;
    max-width: 19vw;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .spu .index-input-number {
    position: absolute;
    right: 3vw;
    bottom: 7vw;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .spu .index-input-number .iNumberView {
    width: 9vw;
    height: 9vw;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .spu .index-input-number .iNumberView:first-child {
    justify-content: flex-end;
  }

  .spu .index-input-number .iNumberView:last-child {
    justify-content: flex-start;
  }

  .spu .index-input-number .iNumberImg {
    font-size: 9vw;
  }

  .spu .index-input-number .input-number-text {
    height: 11vw;
    line-height: 11vw;
    font-size: 4vw;
    color: #333;
    width: 8vw;
  }

  .spu .item-tag {
    position: absolute;
    right: 1vw;
    top: 1vw;
    width: 5.4vw;
    height: 6.2vw;
    z-index: 1;
    color: #fff;
    text-align: center;
  }

  .item-tag-bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 5.4vw;
    height: 6.2vw;
    z-index: 0;
  }

  .spu .item-tag .tag-name {
    position: relative;
    padding-top: 0.6vw;
    font-size: 3vw;
    line-height: 1;
    transform: scale(0.6);
    font-weight: 600;
    z-index: 1;
  }

  .spu .item-tag .tag-name.two-word {
    font-size: 2.2vw;
    padding-top: 1.4vw;
  }

  .supply_type {
    position: absolute;
    right: 0;
    padding: 0;
    width: 11vw;
  }

  .supply-logo {
    width: 4vw;
    height: 4vw;
    margin: 0 auto 1.2vw auto;
  }

  .supply-logo img {
    width: 4vw;
    height: 4vw;
    border-radius: 5px;
  }

  .supply-name {
    margin: 0 auto;
    font-weight: normal;
    font-size: 2.6vw;
    line-height: 3vw;
    color: #999;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: center;
  }

  .mask-icon-out {
  height: 8vw;
  width: 9vw;
  position: absolute;
  left: 10vw;
  top: 10vw;
}

.mask-icon-out img {
  height: 8vw;
  width: 9vw;
}

.mask-icon-coming {
  height: 4vw;
  width: 15.2vw;
  position: absolute;
  left: 2.5vw;
  top: 3vw;
}

.mask-icon-coming img {
  height: 4vw;
  width: 15.2vw;
}

.spu-counts {
  position: absolute;
  right: 1vw;
  font-size: 2.6vw;
  color: #999;
}
</style>
