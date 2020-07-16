<template>
  <div>
    <form bindsubmit="submit2" reportSubmit="true">
      <button hidden formType="submit" id="formId"></button>
    </form>
    <label class="spu" for="formId">
      <i-router-link routerClass="spu-content" :url="'/lionfish_comshop/pages/goods/goodsDetail?&id='+spuItem.actId">
        <div class="item-left">
          <i-img :defaultImage="placeholdeImg?placeholdeImg:'@/assets/images/placeholder-refund.png'" height="170"
                 iClass="img-class" lazyLoad="true" :loadImage="spuItem.skuImage" width="170"></i-img>
          <div class="tag" v-if="reduction.is_open_fullreduction==1&&spuItem.is_take_fullreduction==1">
            满{{reduction.full_money}}减{{reduction.full_reducemoney}}
          </div>
        </div>
        <div class="item-right">
          <div class="item-right-top">
            <div class="spu-title">
              <span class="span">{{spuItem.spuName}} </span>
            </div>
            <div class="spu-desc" v-if="spuItem.spuDescribe">
              <span class="em">{{spuItem.spuDescribe}}</span>
            </div>
            <i-vip-price :price="spuItem.card_price"
                         v-if="s_open_vipcard_buy==1&&spuItem.is_take_vipcard==1"></i-vip-price>
          </div>
          <div class="spu-price">
            <span class="sale-price">
              <span class="span">${{spuItem.actPrice[0]}}</span>.{{spuItem.actPrice[1]}}</span>
            <div class="market-price" v-if="spuItem.show_productprice">
              ${{spuItem.marketPrice[0]}}.{{spuItem.marketPrice[1]}}
            </div>
          </div>
        </div>
        <div v-if="!isPast">
          <div v-if="number<=0">

            <i-button iClass="add-cart" v-if="spuItem.spuCanBuyNum==0||actEnd">
              <img class="img" src="@/assets/images/icon-add-shopCart-disabled.png"/>
            </i-button>
            <i-button @handleTap="openSku" iClass="add-cart" v-else>
              <i-addcart fontsize="28" iClass="img"></i-addcart>
            </i-button>
          </div>
          <i-input-number addImage="@/assets/images/icon-add-2.png" @change="changeNumber" @outOfMax="outOfMax" iClass="index-input-number" iClassNumberText="input-number-text" iNumberImg="iNumberImg" iNumberView="iNumberView" :max="spuItem.spuCanBuyNum" min="0" reduceImage="@/assets/images/icon-reduce-2.png" :value="number" v-else></i-input-number>
        </div>
        <span class="act-end act-out" v-if="spuItem.spuCanBuyNum==0">已抢光</span>
        <span class="act-end" v-else-if="actEnd">团购已结束</span>
      </i-router-link>
    </label>

  </div>
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
          car_count: 0
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
      }
    },
    data() {
      return {
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
          url: '/lionfish_comshop/pages/goods/goodsDetail?id=' + this.spuItem.actId
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
                s.$emit('changeCartNum', t.total), (
                  s.number = t.cur_count
                ), wx.showToast({
                  title: this.$t('cart.yijiarugouwuche'),
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
      }
    }

  }
</script>

<style>

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
    width: 24vw;
    height: 24vw;
  }

  .spu .spu-content {
    background: #fff;
    overflow: hidden;
    position: relative;
    display: flex;
    padding: 1vw 2vw 3vw;
    box-sizing: border-box;
  }

  .spu .spu-content::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 3vw;
    right: 3vw;
    border-bottom: 0.1vw solid #e5e5e5;
  }

  .spu .spu-content.disabled {
    opacity: 0.6;
  }

  .spu .spu-content .item-left {
    width: 24vw;
    height: 24vw;
    position: relative;
  }

  .spu .spu-content .item-right {
    flex: 1;
    box-sizing: border-box;
    margin-left: 4vw;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .spu .spu-content .item-right .spu-title {
    color: #222;
    font-size: 3vw;
    height: 4vw;
    margin-bottom: 1vw;
    margin-top: 2vw;
    font-weight: 500;
    position: relative;
  }

  .spu .spu-content .item-right .spu-title .span {
    width: 100%;
    height: 9vw;
    position: absolute;
    left: 0;
    top: -1vw;
    line-height: 9vw;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 0;
  }

  .spu .spu-content .item-right .spu-desc {
    font-size: 3vw;
    line-height: 3vw;
    color: #999;
    position: relative;
    width: 30vw;
    height: 4vw;
    margin-bottom: 2vw;
  }

  .spu .spu-content .item-right .spu-desc .em {
    width: 100%;
    height: 5vw;
    position: absolute;
    left: 0;
    top: -1vw;
    line-height: 5vw;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .spu .spu-content .add-cart {
    padding: 0;
    margin: 0;
    position: absolute;
    right: 4vw;
    bottom: 3vw;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: none;
    outline: none;
  }

  .spu .spu-content .add-cart .img {
    width: 7vw;
    height: 7vw;
    display: block;
  }

  .spu .spu-content .item-right .spu-price  {
    display: flex;
    align-items: flex-end;
    font-size: 3vw;
    line-height: 4vw;
    overflow: hidden;
  }

  .spu .spu-content .item-right .spu-price .sale-price {
    color: #ff5344;
    margin-right: 1vw;
  }

  .spu .spu-content .item-right .spu-price .sale-price .span {
    font-size: 4.5vw;
    line-height: 4.5vw;
    margin: 0;
    font-weight: bold;
  }

  .spu .spu-content .item-right .spu-price .market-price {
    text-decoration: line-through;
    color: #999;
    margin-right: 5vw;
  }

  .spu .mask {
    background: rgba(255,255,255,0.5);
    width: 24vw;
    height: 24vw;
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
    bottom: 3vw;
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
</style>
