<template>
  <div>
    <form bindsubmit="submit2" reportSubmit="true">
      <button hidden formType="submit" id="formId"></button>
    </form>
    <div class="spu" for="formId">
      <i-router-link :routerClass="width250?'w250':'new-comers-item'"
                     :url="'/lionfish_comshop/pages/goods/goodsDetail?id='+spuItem.actId">
        <div class="item-tag" v-if="spuItem.label_info&&spuItem.label_info.type==0">
          <img class="item-tag-bg" mode="widthFix" src="@/assets/images/tag.png"></img>
          <div :class="['tag-name' ,spuItem.label_info.len==2?'two-word':'']">{{spuItem.label_info.tagcontent}}</div>
        </div>
        <div class="item-tag"
              :style="'background:url('+spuItem.label_info.tagcontent+'), no-repeat left top;background-size: 100%;'"
              v-if="spuItem.label_info&&spuItem.label_info.type==1"></div>
        <i-img defaultImage="@/assets/images/placeholder-refund.png" height="230" iClass="new-img"
               :loadImage="spuItem.skuImage" width="180" v-if="width250"></i-img>
        <i-img defaultImage="@/assets/images/placeholder-refund.png" height="210" iClass="new-img"
               :loadImage="spuItem.skuImage" width="180" v-else></i-img>
        <div class="spu-active" v-if="reduction.is_open_fullreduction==1&&spuItem.is_take_fullreduction==1">
          <span class="tag">满{{reduction.full_money}}减{{reduction.full_reducemoney}}</span>
          <span class="tag tag-green" v-if="spuItem.isLimit">限购</span>
        </div>
        <div class="spu-play" v-if="spuItem.is_video">
          <img class="img" src="@/assets/images/play.png"/>
        </div>
        <div class="act-end" v-if="spuItem.spuCanBuyNum==0">{{$t('home.yiqiangguang')}}</div>
        <div class="title">{{spuItem.spuName}}</div>
        <i-vip-price class="vip" :price="spuItem.card_price"
                     v-if="is_open_vipcard_buy==1&&spuItem.is_take_vipcard==1"></i-vip-price>
        <i-vip-price class="vip" :price="spuItem.levelprice" type="1"
                     v-else-if="canLevelBuy&&spuItem.is_mb_level_buy==1"></i-vip-price>
        <div class="new-bot">
          <div class="price">${{spuItem.actPrice[0]}}.{{spuItem.actPrice[1]}}</div>
          <div v-if="!isPast">
            <div v-if="number<=0||notNum">
              <i-button iClass="add-cart" v-if="disabled||spuItem.spuCanBuyNum==0||actEnd">
                <img class="img" src="@/assets/images/icon-add-shopCart-disabled.png"/>
              </i-button>
              <i-button @handleTap="openSku" iClass="add-cart" v-else>
                <i-addcart iClass="img"></i-addcart>
              </i-button>
            </div>
            <i-input-number addImage="@/assets/images/icon-add-2.png" @change="changeNumber" @outOfMax="outOfMax"
                            class="col-input-number" iClassNumberText="input-number-input" iNumberImg="input-number-img"
                            iNumberdiv="input-number-div" :max="spuItem.spuCanBuyNum" min="0"
                            reduceImage="@/assets/images/icon-reduce-2.png" :value="number" v-else></i-input-number>
          </div>
        </div>
      </i-router-link>
    </div>

  </div>
</template>

<script>
  var app,wx;
  import util from '../../utils'
  import status from '../../utils'
  export default {
    name: '',
    props: {
      spuItem: {
        default: {
          spuId: '',
          skuId: '',
          spuImage: '',
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
        default: !1
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
      notNum: {
        default: !1
      },
      width250: {
        default: !1
      },
      is_open_vipcard_buy: {
        default: 0
      },
      canLevelBuy: {
        default: !1
      }
    },
    data(){
      return{
        disabled: !1,
        placeholdeImg: "",
        number: 0
      }
    },

    created:function() {
      wx = this.$wx
      app = this.$getApp()
      this.placeholdeImg = app.globalData.placeholdeImg
      this.number = this.spuItem.car_count || 0

    },
    methods: {
      openSku: function() {
        if (this.needAuth) this.$emit("authModal"); else {
            console.log("step1"),
            this.stopClick = !0,
            this.disabled = !1
          var t = this.spuItem;
          void 0 === t.skuList.length ? this.$emit("openSku", {
            actId: t.actId,
            skuList: t.skuList,
            promotionDTO: t.promotionDTO,
            is_take_vipcard: t.is_take_vipcard,
            is_mb_level_buy: t.is_mb_level_buy,
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
            type: "plus"
          });
        }
      },
      countDownEnd: function() {
        this.setData({
          actEnd: !0
        });
      },
      submit2: function(e) {
        (0, t.collectFormIds)(e.detail.formId);
      },
      changeNumber: function(t) {
        var e = t;
        e && this.addCart(e);
      },
      outOfMax: function(t) {

        var e = this.spuItem.spuCanBuyNum;
        this.number >= e && wx.showToast({
          title: "不能购买更多啦",
          icon: "none"
        });
      },
      addCart: function(t) {
        var e = wx.getStorageSync("token"), a = wx.getStorageSync("community"), u = this.spuItem.actId, i = a.communityId, s = this;
        if ("plus" == t.type) {
          var o = {
            goods_id: u,
            community_id: i,
            quantity: 1,
            sku_str: "",
            buy_type: "dan",
            pin_id: 0,
            is_just_addcar: 1
          };
          util.addCart(o).then(function(t) {
            if (1 == t.showVipModal) {
              var e = t.pop_vipmember_buyimage;
              s.$emit("vipModal", {
                pop_vipmember_buyimage: e,
                showVipModal: !0,
                visible: !1
              });
            } else if (3 == t.code) wx.showToast({
              title: t.msg,
              icon: "none",
              duration: 2e3
            }); else if (6 == t.code || 7 == t.code) {
              var a = t.max_quantity || "";
              0 < a && ( s.number = a);
              var i = t.msg;
              wx.showToast({
                title: i,
                icon: "none",
                duration: 2e3
              });
            } else status.indexListCarCount(u, t.cur_count), s.$emit("changeCartNum", t.total),
              s.number = t.cur_count
              wx.showToast({
              title: "Added to Cart",
              image: "../../images/addShopCart.png"
            });
          });
        } else app.util.request({
          url: "entry/wxapp/user",
          data: {
            controller: "car.reduce_car_goods",
            token: e,
            goods_id: u,
            community_id: i,
            quantity: 1,
            sku_str: "",
            buy_type: "dan",
            pin_id: 0,
            is_just_addcar: 1
          },
          dataType: "json",
          method: "POST",
          success: function(t) {
            3 == t.code ? wx.showToast({
              title: t.msg,
              icon: "none",
              duration: 2e3
            }) : (status.indexListCarCount(u, t.cur_count), (
              s.number = t.cur_count
            ), s.$emit("changeCartNum", t.total));
          }
        });
      }
    }
  }
</script>

<style>

  .new-comers-item, .w250 {
    position: relative;
    width: 31vw;
    box-sizing: border-box;
    padding: 1vw 1vw;
    font-size: 2vw;
  }

  .w250 {
    width: 30vw;
  }

  .new-comers-item .new-img {
    width: 29vw;
    height: 30vw;
    margin-bottom: 2vw;
    overflow: hidden;
  }

  .w250 .new-img {
    width: 27vw;
    height: 30vw;
    margin-bottom: 2vw;
    overflow: hidden;
  }

  .new-comers-item .title, .w250 .title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .new-comers-item .new-bot, .w250 .new-bot {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 3vw;
  }

  .new-comers-item .add-cart, .w250 .add-cart {
    width: 6vw;
    height: 6vw;
    padding: 0;
    margin: 0;
    border-radius: 50%;
  }

  .new-comers-item .add-cart .img, .w250 .add-cart .img {
    width: 6vw;
    height: 6vw;
    display: block;
  }

  .new-comers-item .price, .w250 .price {
    color: #ff5041;
  }

  .new-comers-item .act-end, .w250 .act-end {
    position: absolute;
    height: 9vw;
    border-radius: 2vw;
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    font-size: 2vw;
    text-align: center;
    line-height: 9vw;
    left: 50%;
    top: 10vw;
    padding: 0 1vw;
    transform: translateX(-50%);
  }

  .col-input-number .input-number-div {
    width: 5vw !important;
    height: 5vw !important;
  }

  .col-input-number .input-number-img {
    width: 5vw !important;
    height: 5vw !important;
    font-size: 5vw !important;
  }

  .col-input-number .input-number-input {
    height: 5vw !important;
    width: 6vw !important;
    font-size: 2vw;
    line-height: 5vw !important;
  }

  .vip {
    position: absolute;
    left: 2vw;
    top: 2vw;
  }

  .spu .item-tag {
    position: absolute;
    right: 1vw;
    top: 2vw;
    width: 7vw;
    height: 8vw;
    z-index: 1;
    color: #fff;
    text-align: center;
  }

  .item-tag-bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 7vw;
    height: 8vw;
    z-index: 0;
  }

  .spu .item-tag .tag-name {
    position: relative;
    padding-top: 0.5vw;
    font-size: 0.5vw;
    line-height: 1;
    font-weight: 600;
    z-index: 1;
  }

  .spu .item-tag .tag-name.two-word {
    font-size: 2vw;
    padding-top: 1.4vw;
  }

  .spu .spu-active {
    position: absolute;
    left: 2vw;
    top: 30vw;
    z-index: 9;
    display: flex;
    flex-direction: column-reverse;
    align-items: flex-start;
  }

  .spu .spu-active .tag {
    background: linear-gradient(to right, #ff5041, #ff994b);
    border-radius: 0 1.4vw 1.4vw 0;
    padding: 0 1vw;
    height: 2vw;
    font-size: 2vw;
    line-height: 2vw;
    color: #fff;
    display: inline-block;
    align-items: center;
    justify-content: center;
    width: auto;
    max-width: 30vw;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .spu .spu-active .tag-green {
    background: linear-gradient(to left, #46c8d0, #29ba9a);
  }

  .spu-play {
    position: absolute;
    left: 50%;
    top: 20%;
    width: 7vw;
    height: 7vw;
    margin-left: -8vw;
  }

  .spu-play .img {
    width: 100%;
    height: 100%;
  }

</style>
