<template>
  <div>


    <form bindsubmit="submit2" reportSubmit="true">
      <button hidden formType="submit" id="formId"></button>
    </form>
    <div class="spu" for="formId">
      <i-router-link class="spu-content" :url="url">
        <div class="item-left">

          <div class="item-tag" v-if="spuItem.label_info&&spuItem.label_info.type==0">
            <img class="item-tag-bg" mode="widthFix" src="@/assets/images/tag.png"/>
            <div :class="['tag-name',(spuItem.label_info.len==2?'two-word':'')]">{{spuItem.label_info.tagcontent}}</div>
          </div>
          <div class="item-tag" :style="'background:url('+spuItem.label_info.tagcontent+') no-repeat left top;background-size: 100%;'" v-if="spuItem.label_info&&spuItem.label_info.type==1"></div>


          <van-image style="width: 28vw; height: 28vw" class="sku-img" :src="spuItem.skuImage">
            <template v-slot:loading>
              <van-loading type="spinner" size="20" />
            </template>
          </van-image>

          <div class="spu-active" v-if="reduction.is_open_fullreduction==1&&spuItem.is_take_fullreduction==1">
            <div class="tag">满{{reduction.full_money}}减{{reduction.full_reducemoney}}</div>
            <div class="tag tag-green" v-if="spuItem.isLimit">限购</div>
          </div>
          <div class="spu-play" v-if="spuItem.is_video">
            <img class="img" src="@/assets/images/play.png"/>
          </div>
        </div>
        <div class="item-right">
          <div class="item-right-top">
            <div class="spu-title">
              <span class="span">{{spuItem.spuName}}</span>
            </div>
            <div class="spu-desc" v-if="spuItem.spuDescribe">
              <span class="em">{{spuItem.spuDescribe}}</span>
            </div>
            <div class="spu-tag" v-if="isShowListTimer"></div>
            <div class="spu-count" v-if="isShowListCount==1">
              <div class="spu-count-border" :style="{'border-color':skin.color}">
                <span class="txt" :style="{color:skin.color}">已售{{spuItem.soldNum}}件</span>
                <span class="txt spu-count-num" :style="{'background-color':skin.color}">仅剩{{spuItem.spuCanBuyNum}}件</span>
              </div>
            </div>
            <i-vip-price :price="spuItem.card_price" v-if="is_open_vipcard_buy==1&&spuItem.is_take_vipcard==1"></i-vip-price>
            <i-vip-price :price="spuItem.levelprice" type="1" v-else-if="canLevelBuy&&spuItem.is_mb_level_buy==1"></i-vip-price>
          </div>
          <div class="spu-price">
            <div class="sale-price">
              <span class="span">${{spuItem.actPrice[0]}}</span>.{{spuItem.actPrice[1]}}
            </div>
            <div class="market-price" v-if="spuItem.show_productprice">${{spuItem.marketPrice[0]}}.{{spuItem.marketPrice[1]}}</div>
          </div>
        </div>
        <div v-if="!isPast">
          <div v-if="number<=0">
            <i-button iClass="add-cart" class="add-cart" v-if="disabled||spuItem.spuCanBuyNum==0||actEnd">
              <img class="img" src="@/assets/images/icon-add-shopCart-disabled.png"></img>
            </i-button>
            <i-button @handleTap="openSku" iClass="add-cart" class="add-cart" v-else>
              <i-addcart fontsize="14" iClass="img"></i-addcart>
            </i-button>
          </div>
          <i-input-number addImage="@/assets/images/icon-add-2.png" @change="changeNumber" @outOfMax="outOfMax" iClass="index-input-number" iClassNumberText="input-number-span" :max="spuItem.spuCanBuyNum" min="0" reduceImage="@/assets/images/icon-reduce-2.png" :value="number" v-else></i-input-number>
        </div>
        <div class="mask" v-if="isPast||disabled||spuItem.spuCanBuyNum==0?'disabled':''"></div>
        <div class="act-end act-out" v-if="spuItem.spuCanBuyNum==0">{{$t('home.yiqiangguang')}}</div>
        <div class="act-end" v-else-if="actEnd" v-show="false">{{$t('home.tuangouyijieshu')}}</div>
      </i-router-link>
      <div class="picktime" v-if="showPickTime">
        <div>预售时间：{{spuItem.begin_time}}</div>
        <div>提货时间：{{spuItem.pick_up_modify}}</div>
      </div>
    </div>


  </div>
</template>

<script>

  import util from '../../utils/index.js'
  import status from '../../utils/index.js'
  var app,wx
  export default {
    name: '',
    props: {
      spuItem: {
        type: Object,
        default: {
          spuId: "",
          skuId: "",
          spuImage: "",
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
          label_info: "",
          car_count: 0
        }
      },
      isPast: {
        type: Boolean,
        default: !1
      },
      actEnd: {
        type: Boolean,
        default: !1
      },
      reduction: {
        type: Object,
        default: {
          full_money: "",
          full_reducemoney: "",
          is_open_fullreduction: 0
        }
      },
      isShowListCount: {
        default: 0
      },
      changeCarCount: {
        type: Boolean,
        default: !1
      },
      needAuth: {
        type: Boolean,
        default: !1
      },
      is_open_vipcard_buy: {
        type: Number,
        default: 0
      },
      canLevelBuy: {
        type: Boolean,
        default: !1
      },
      isShowListTimer: {
        type: Boolean,
        default: !0
      },
      showPickTime: {
        type: Boolean,
        default: !1
      },
      skin: {
        type: Object
      }
    },
    data() {
      return{
        disabled: !1,
        placeholdeImg: "",
        number: 0,
        url: ""
      }
    },
    created:function() {
      wx = this.$wx;
      app = this.$getApp()
      this.number =  this.spuItem.car_count || 0
      var a = "/lionfish_comshop/pages/goods/goodsDetail?&id=" + this.spuItem.actId;
      this.url = a
    },
    methods: {
      openSku: function() {
        this.needAuth ? this.$emit("authModal", !0) : (console.log("step1"),
          (this.stopClick =  !0, this.disabled = !1), void 0 ===this.spuItem.skuList.length ? this.$emit("openSku", {
          actId: this.spuItem.actId,
          skuList:this.spuItem.skuList,
          promotionDTO:this.spuItem.promotionDTO,
          is_take_vipcard:this.spuItem.is_take_vipcard,
          is_mb_level_buy:this.spuItem.is_mb_level_buy,
          allData: {
            spuName:this.spuItem.spuName,
            skuImage:this.spuItem.skuImage,
            actPrice:this.spuItem.actPrice,
            canBuyNum:this.spuItem.spuCanBuyNum,
            stock:this.spuItem.spuCanBuyNum,
            marketPrice:this.spuItem.marketPrice
          }
        }) : this.addCart({
          value: 1,
          type: "plus"
        }));
        return false;
      },
      countDownEnd: function() {
        this.actEnd = !0
      },
      submit2: function(a) {
        (0, t.collectFormIds)(a.detail.formId);
      },
      changeNumber: function(t) {
        console.log(t)
        var a = t;
        a && this.addCart(a);

      },
      outOfMax: function(t) {
        t.detail;
        var a =this.spuItem.spuCanBuyNum;
       this.number >= a && this.$wx.showToast({
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
            } else {
              status.indexListCarCount(u, t.cur_count)
              s.$emit("changeCartNum", t.total)
              s.number = t.cur_count
              wx.showToast({
                title: "Added to Cart",
                image: "@/assets/images/addShopCart.png"
              });
            }
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


<style  scoped>
  .i-btn {
    text-align: center;
    vertical-align: middle;
    touch-action: manipulation;
    cursor: pointer;
    background-image: none;
    white-space: nowrap;
    user-select: none;
    font-size: 2.8vw;
    border: 0!important;
    position: relative;
    text-decoration: none;
    height: 8.8vw;
    line-height: 8.8vw;
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
    display: block;
    background: #fff;
    width: 96vw;
    border-radius: 2vw;
    overflow: hidden;
    position: relative;
    box-shadow: 0 0 4vw rgba(0,0,0,0.05);
    margin: 0 auto 2vw;
    padding: 2vw;
    box-sizing: border-box;
  }

  .spu .img-class {
    width: 28vw;
    height: 28vw;
    border-radius: 1vw;
  }

  .spu .mask {
    background: rgba(255,255,255,0.5);
    width: 28vw;
    height: 28vw;
    position: absolute;
    left: 0;
    top: 0;
  }

  .spu >>> .act-end {
    position: absolute;
    height: 6vw;
    border-radius: 1vw;
    background: rgba(0,0,0,0.5);
    color: #fff;
    font-size: 2.8vw;
    text-align: center;
    line-height: 6vw;
    left: 14vw;
    top: 10vw;
    padding: 0 1.2vw;
    transform: translateX(-50%);
  }

  .spu >>> .act-end.act-out {
    left: 12vw;
  }

  .spu >>> .spu-content {
    position: relative;
    display: flex;
  }

  .spu .spu-content.disabled {
    opacity: 0.6;
  }

  .spu >>> .spu-content .item-left {
    width: 28vw;
    height: 28vw;
    position: relative;
  }

  .spu >>> .spu-content .item-right {
    box-sizing: border-box;
    margin-left: 6vw;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .spu >>> .spu-content .item-right .spu-title {
    color: #333;
    font-size: 4vw;
    height: 4.2vw;
    width: 60vw;
    margin-bottom: 1.2vw;
    font-weight: bold;
    position: relative;
  }

  .spu >>> .spu-content .item-right .spu-title .span {
    width: 100%;
    height: 4vw;
    position: absolute;
    left: 0;
    top: -0.4vw;
    line-height: 4vw;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 0;
  }

  .spu >>> .spu-content .item-right .spu-tag {
    padding-left: 20vw;
    margin-bottom: 2vw;
    display: flex;
    height: 2.8vw;
  }

  .spu >>> .spu-content .item-right .spu-desc {
    font-size: 3vw;
    line-height: 3vw;
    color: #999;
    position: relative;
    width: 60vw;
    height: 3vw;
    margin-bottom: 1.2vw;
  }

  .spu >>> .spu-content .item-right .spu-desc .em {
    width: 100%;
    height: 3.2vw;
    position: absolute;
    left: 0;
    top: 1vw;
    line-height: 3.2vw;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .spu >>> .spu-content .item-right .spu-price {
    display: flex;
    align-items: flex-end;
    font-size: 3vw;
    line-height: 3.6vw;
    overflow: hidden;
    margin-top: 1vw;
  }

  .spu >>> .spu-content .item-right .spu-price .sale-price {
    color: #ff5344;
    margin-right: 1.2vw;
  }

  .spu >>> .spu-content .item-right .spu-price .sale-price .span {
    font-size: 5vw;
    line-height: 5.2vw;
    margin: 0;
    font-weight: bold;
  }

  .spu >>>.spu-content .item-right .spu-price .market-price {
    text-decoration: line-through;
    color: #999;
    margin-right: 2vw;
  }

  .spu >>>.spu-content .item-right .spu-count {
    font-size: 2.4vw;
    height: 2.4vw;
    color: #999;
    margin-bottom: 2vw;
  }

  .spu >>> .spu-content .item-right .spu-count .spu-count-border {
    display: inline-flex;
    border: 0.1vw solid #f78076;
    border-radius: 2vw;
    overflow: hidden;
    height: 3vw;
    line-height: 3vw;
  }

  .spu >>> .spu-content .item-right .spu-count .spu-count-border .txt {
    padding: 0 1vw;
    color: #f78076;
    height: 3vw;
    line-height: 3vw;
  }

  .spu >>> .spu-content .item-right .spu-count .spu-count-border .spu-count-num {
    background-color: #f78076;
    color: #fff;
  }

  .spu >>> .spu-content .add-cart {
    width: 7vw;
    height: 7vw;
    padding: 0;
    margin: 0;
    position: absolute;
    right: 0;
    bottom: 0.1vw;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    outline: none;

  }

  .spu >>> .spu-content .add-cart .img {
    width: 7vw;
    height: 7vw;
    display: block;
  }

  .spu >>> .spu-content .spu-active {
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 9;
    display: flex;
    flex-direction: column-reverse;
    align-items: flex-start;
  }

  .spu >>> .spu-content .spu-active .tag {
    background: linear-gradient(to right,#ff5041,#ff994b);
    border-radius: 0 1.4vw 1.4vw 0;
    padding: 0 1.2vw;
    height: 3vw;
    font-size: 2.2vw;
    line-height: 3vw;
    color: #fff;
    display: inline-block;
    align-items: center;
    justify-content: center;
    width: auto;
    max-width: 18vw;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .spu >>> .spu-content .spu-active .tag-green {
    background: linear-gradient(to left,#46c8d0,#29ba9a);
  }

  .spu >>> .item-tag {
    position: absolute;
    left: -0.1vw;
    top: 0;
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
    bottom: 1vw;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .spu .index-input-number .i-input-number-view {
    width: 8vw;
    height: 8vw;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .spu .index-input-number .i-input-number-view .img {
    width: 4vw;
    height: 4vw;
  }

  .spu .index-input-number .i-input-number-minus {
    justify-content: flex-end;
  }

  .spu .index-input-number .i-input-number-plus {
    justify-content: flex-start;
  }

  .spu .index-input-number .input-number-text {
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
    width: 10vw;
    height: 10vw;
    margin-top: -5vw;
    margin-left: -5vw;
  }

  .spu-play .img {
    width: 100%;
    height: 100%;
  }

  .picktime {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 2.4vw;
    font-weight: bold;
    margin-top: 2vw;
    color: #ed7b3a;
    border-top: 0.1vw solid #e5e5e5;
    padding-top: 2vw;
  }

</style>
