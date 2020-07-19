<template>
  <div>

    <form bindsubmit="submit2" reportSubmit="true">
      <button hidden formType="submit" id="formId"></button>
    </form>
    <label class="spu" for="formId">
      <i-router-link routerClass="spu-content" :url="url">
        <div class="item-top">
          <div class="item-tag" v-if="spuItem.label_info&&spuItem.label_info.type==0">
            <img class="item-tag-bg" mode="widthFix" src="@/assets/images/tag.png"/>
            <div :class="['tag-name',  spuItem.label_info.len==2?'two-word':'']">{{spuItem.label_info.tagcontent}}</div>
          </div>
          <div class="item-tag" :style="{background:'url('+spuItem.label_info.tagcontent+') no-repeat left top','background-size': '100%'}" v-if="spuItem.label_info&&spuItem.label_info.type==1"></div>
          <i-img :defaultimg="placeholdeImg?placeholdeImg:require('@/assets/images/placeholder-refund.png')" height="40vw" iClass="img-class" lazyLoad="true" :loadimg="spuItem.bigImg?spuItem.bigImg:spuItem.skuimg" width="100vw"></i-img>
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
          <i-vip-price :price="spuItem.card_price" v-if="is_open_vipcard_buy==1&&spuItem.is_take_vipcard==1"></i-vip-price>
          <i-vip-price :price="spuItem.levelprice" type="1" v-else-if="canLevelBuy&&spuItem.is_mb_level_buy==1"></i-vip-price>
          <div class="picktime" v-if="showPickTime">
            <div>预售时间：{{spuItem.begin_time}}</div>
            <div>提货时间：{{spuItem.pick_up_modify}}</div>
          </div>
          <div class="spu-price">
            <div class="sale-price">
              <span class="span">${{spuItem.actPrice[0]}}</span>.{{spuItem.actPrice[1]}}
            </div>
            <div class="market-price" v-if="spuItem.show_productprice"> ${{spuItem.marketPrice[0]}}.{{spuItem.marketPrice[1]}}</div>
          </div>
          <div class="spu-count" v-if="isShowListCount==1">已售{{spuItem.soldNum}}件 / 仅剩{{spuItem.spuCanBuyNum}}件</div>
        </div>
        <div v-if="!isPast">
          <div v-if="number<=0">
            <i-button :disabled="disabled||spuItem.spuCanBuyNum==0" iClass="add-cart-disabled" v-if="disabled||spuItem.spuCanBuyNum==0">
              已抢光
            </i-button>
            <i-button :disabled="disabled||actEnd" iClass="add-cart-disabled" v-else-if="disabled||actEnd">
              已结束
            </i-button>
            <div @click.stop="openSku" class="add-cart" :style="{background: skin.color}" v-else>
              立即抢购
            </div>
          </div>
          <i-input-number addimg="@/assets/images/icon-add-2.png" @change="changeNumber" @outOfMax="outOfMax" iClass="index-input-number" iClassNumberspan="input-number-span" :max="spuItem.spuCanBuyNum" min="0" reduceimg="@/assets/images/icon-reduce-2.png" :value="number" v-else></i-input-number>
        </div>
        <div class="mask" v-if="isPast||disabled||spuItem.spuCanBuyNum==0?'disabled':''"></div>
        <div class="act-end act-out" v-if="spuItem.spuCanBuyNum==0">已抢光</div>
        <div class="act-end" v-else-if="actEnd">团购已结束</div>
      </i-router-link>
    </label>


  </div>
</template>

<script>

  import util from '../../utils/index.js'
  import status from '../../utils/index.js'
  import a from '../../utils/public'
  var app,wx;

  export default {
    name: '',
    props:{
      spuItem: {
        value: {
          spuId: "",
          skuId: "",
          spuimg: "",
          spuName: "",
          endTime: 0,
          beginTime: "",
          actPrice: [ "", "" ],
          marketPrice: [ "", "" ],
          spuCanBuyNum: "",
          soldNum: "",
          actId: "",
          limitMemberNum: "",
          limitOrderNum: "",
          serverTime: "",
          isLimit: !1,
          skuList: [],
          spuDescribe: "",
          is_take_fullreduction: 0,
          bigImg: "",
          car_count: 0
        }
      },
      isPast: {
        value: !1
      },
      actEnd: {
        value: !1
      },
      reduction: {
        value: {
          full_money: "",
          full_reducemoney: "",
          is_open_fullreduction: 0
        }
      },
      isShowListCount: {
        value: 0
      },
      changeCarCount: {
        value: !1,

      },
      needAuth: {
        value: !1
      },
      is_open_vipcard_buy: {
        value: 0
      },
      canLevelBuy: {
        value: !1
      },
      showPickTime: {
        value: !1
      },
      skin: {
        type: Object
      }
    },
    data(){
      return{
        disabled: !1,
        placeholdeImg: "",
        number: 0,
        url: ""
      }
    },
    created:function(){
      app = this.$getApp();
      wx = this.$wx;
      this.number = this.spuItem.car_count || 0
      this.placeholdeImg = app.globalData.placeholdeImg

    },
    mounted:function(){
      var e = "/lionfish_comshop/pages/goods/goodsDetail?&id=" + this.spuItem.actId;
      this.url = e
    },
    methods: {
      openSku: function() {

        if (this.needAuth) {
          this.$emit("authModal")
        }else {
          console.log("step1"), (
            this.stopClick = !0,
            this.disabled = !1
          );
          var t = this.spuItem;
          void 0 === t.skuList.length  ? this.$emit("openSku", {
            actId: t.actId,
            skuList: t.skuList,
            promotionDTO: t.promotionDTO || "",
            is_take_vipcard: t.is_take_vipcard,
            is_mb_level_buy: t.is_mb_level_buy,
            allData: {
              spuName: t.spuName,
              skuimg: t.skuimg,
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
        this.actEnd = !0
      },
      submit2: function(e) {
        (0, t.collectFormIds)(e.detail.formId);
      },
      changeNumber: function(t) {
        var e = t;
        e && this.addCart(e);
      },
      outOfMax: function(t) {
        t.detail;
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

<style scoped>
  .spu {
    width: 100%;
    display: div;
  }

  .spu .img-class {
    width: 96vw;
    height: 45vw;
    border-radius: 0.1vw 0.1vw 0 0;
    image-rendering: crisp-edges;
  }

  .spu .mask {
    background: rgba(255,255,255,0.5);
    width: 96vw;
    height: 45vw;
    position: absolute;
    left: 0;
    top: 0;
  }

  .spu .act-end {
    position: absolute;
    height: 6vw;
    border-radius: 0.1vw;
    background: rgba(0,0,0,0.5);
    color: #fff;
    font-size: 2.8vw;
    span-align: center;
    line-height: 6vw;
    left: 50%;
    top: 18vw;
    padding: 0 1.2vw;
    transform: translateX(-50%);
  }

  .spu .spu-content {
    background: #fff;
    width: 96vw;
    border-radius: 2vw;
    overflow: hidden;
    position: relative;
    box-shadow: 0 0 4vw rgba(0,0,0,0.05);
    margin: 0 auto 2vw;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
  }

  .spu .spu-content.disabled {
    opacity: 0.6;
  }

  .spu .spu-content .item-top {
    width: 100%;
    height: 45vw;
    position: relative;
  }

  .spu .spu-content .item-bottom {
    box-sizing: border-box;
    padding: 2vw;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .spu .spu-content .item-bottom .spu-title {
    color: #222;
    font-size: 3vw;
    height: 3.2vw;
    width: 100%;
    margin-bottom: 1.2vw;
    margin-top: 0.1vw;
    font-weight: 500;
    position: relative;
  }

  .spu .spu-content .item-bottom .spu-title .span {
    width: 100%;
    height: 4vw;
    position: absolute;
    left: 0;
    top: -0.4vw;
    line-height: 4vw;
    overflow: hidden;
    span-overflow: ellipsis;
    white-space: nowrap;
  }

  .spu .spu-content .item-bottom .spu-tag {
    padding-left: 190.6vw;
    margin-bottom: 2vw;
    display: flex;
    height: 2.8vw;
  }

  .spu .spu-content .item-bottom .spu-desc {
    font-size: 2.6vw;
    line-height: 2.6vw;
    color: #999;
    position: relative;
    width: 100%;
    height: 2.6vw;
    margin-bottom: 1.2vw;
  }

  .spu .spu-content .item-bottom .spu-desc .em {
    width: 100%;
    height: 3.2vw;
    position: absolute;
    left: 0;
    top: -0.2vw;
    line-height: 3.2vw;
    overflow: hidden;
    span-overflow: ellipsis;
    white-space: nowrap;
  }

  .spu .spu-content .item-bottom .spu-price {
    display: flex;
    align-items: flex-end;
    font-size: 2.6vw;
    line-height: 2.6vw;
    overflow: hidden;
    margin-bottom: 0.1vw;
    margin-top: 0.1vw;
  }

  .spu .spu-content .item-bottom .spu-price .sale-price {
    color: #ff5344;
    margin-right: 1.2vw;
  }

  .spu .spu-content .item-bottom .spu-price .sale-price .span {
    font-size: 4.6vw;
    line-height: 4.2vw;
    margin: 0;
    font-weight: bold;
  }

  .spu .spu-content .item-bottom .spu-price .market-price {
    span-decoration: line-through;
    color: #999;
    margin-right: 2vw;
  }

  .spu .spu-content .item-bottom .spu-count {
    font-size: 2.2vw;
    line-height: 2.4vw;
    color: #999;
  }

  .spu .spu-content .add-cart,.spu .spu-content .add-cart-disabled {
    width: 16vw;
    height: 6vw;
    padding: 0;
    margin: 0;
    position: absolute;
    right: 2.8vw;
    bottom: 2vw;
    font-size: 2.2vw;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ff5344;
    color: #fff;
    border-radius: 3vw;
  }

  .spu .spu-content .add-cart-disabled {
    background: #ccc;
  }

  .spu .item-top .spu-active {
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 9;
    display: flex;
    flex-direction: column-reverse;
    align-items: flex-start;
  }

  .spu .item-top .spu-active .tag {
    background: linear-gradient(to right,#ff5041,#ff994b);
    border-radius: 0 2.5vw 2.5vw 0;
    padding: 0 1.5vw;
    height: 5vw;
    font-size: 2.6vw;
    line-height: 5vw;
    color: #fff;
    display: inline-block;
    align-items: center;
    justify-content: center;
    width: auto;
    max-width: 22vw;
    overflow: hidden;
    span-overflow: ellipsis;
    white-space: nowrap;
  }

  .spu .item-top .spu-active .tag-green {
    background: linear-gradient(to left,#46c8d0,#29ba9a);
  }

  .spu .spu-content .time-tip {
    position: absolute;
    background: #ff5344;
    left: 0;
    bottom: 0;
    width: 25vw;
    height: 4vw;
    border-radius: 0 0.8vw 0 0;
  }

  .spu .spu-content .time-tip.notip {
    display: none;
  }

  .spu .item-tag {
    position: absolute;
    left: 2.2vw;
    top: 0;
    width: 5.4vw;
    height: 6.2vw;
    z-index: 1;
    color: #fff;
    span-align: center;
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
    font-size: 2vw;
    line-height: 1;
    font-weight: 600;
    z-index: 1;
  }

  .spu .item-tag .tag-name.two-word {
    font-size: 2.2vw;
    padding-top: 1.4vw;
  }

  .spu .index-input-number {
    position: absolute;
    right: 0;
    bottom: 0.1vw;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .spu .index-input-number .i-input-number-div {
    width: 8vw;
    height: 8vw;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .spu .index-input-number .i-input-number-div .img {
    width: 4vw;
    height: 4vw;
  }

  .spu .index-input-number .i-input-number-minus {
    justify-content: flex-end;
  }

  .spu .index-input-number .i-input-number-plus {
    justify-content: flex-start;
  }

  .spu .index-input-number .input-number-span {
    height: 8.8vw;
    line-height: 8.8vw;
    font-size: 2.4vw;
    color: #333;
    width: 5.8vw;
  }

  .spu-play {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 16vw;
    height: 16vw;
    margin-top: -8vw;
    margin-left: -8vw;
  }

  .spu-play .img {
    width: 100%;
    height: 100%;
  }

  .picktime {
    font-size: 2.4vw;
    font-weight: bold;
    margin: 1.5vw 0 0.1vw;
    color: #ed7b3a;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>
