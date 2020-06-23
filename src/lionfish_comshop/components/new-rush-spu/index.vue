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
          <el-image
            style="width: 100px; height: 100px"
            :src="spuItem.skuImage">
            <div slot="placeholder" class="image-slot">
              加载中<span class="dot">...</span>
            </div>
          </el-image>

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
            <i-button iClass="add-cart" v-if="disabled||spuItem.spuCanBuyNum==0||actEnd">
              <img class="img" src="@/assets/images/icon-add-shopCart-disabled.png"></img>
            </i-button>
            <i-button @click="openSku" iClass="add-cart" class="add-cart" v-else>
              <i-addcart fontsize="14" iClass="img"></i-addcart>
            </i-button>
          </div>
          <i-input-number addImage="@/assets/images/icon-add-2.png" @change="changeNumber" @outOfMax="outOfMax" iClass="index-input-number" iClassNumberText="input-number-span" :max="spuItem.spuCanBuyNum" min="0" reduceImage="@/assets/images/icon-reduce-2.png" :value="number" v-else></i-input-number>
        </div>
        <div class="mask" v-if="isPast||disabled||spuItem.spuCanBuyNum==0?'disabled':''"></div>
        <div class="act-end act-out" v-if="spuItem.spuCanBuyNum==0">已抢光</div>
        <div class="act-end" v-else-if="actEnd" v-show="false">团购已结束</div>
      </i-router-link>
      <div class="picktime" v-if="showPickTime">
        <div>预售时间：{{spuItem.begin_time}}</div>
        <div>提货时间：{{spuItem.pick_up_modify}}</div>
      </div>
    </div>


  </div>
</template>

<script>

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
      this.number =  this.spuItem.car_count || 0
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
      },
      countDownEnd: function() {
        this.actEnd = !0
      },
      submit2: function(a) {
        (0, t.collectFormIds)(a.detail.formId);
      },
      changeNumber: function(t) {
        var a = t.detail;
        a && this.addCart(a);
      },
      outOfMax: function(t) {
        t.detail;
        var a =this.spuItem.spuCanBuyNum;
       this.number >= a && wx.showToast({
          title: "不能购买更多啦",
          icon: "none"
        });
      },
      addCart: function(t) {
        var a = wx.getStorageSync("token"), e = wx.getStorageSync("community"), i =this.spuItem.actId, s = e.communityId, u = this;
        if ("plus" == t.type) {
          var o = {
            goods_id: i,
            community_id: s,
            quantity: 1,
            sku_str: "",
            buy_type: "dan",
            pin_id: 0,
            is_just_addcar: 1
          };
          util.addCart(o).then(function(t) {
            if (1 == t.showVipModal) {
              var a = t.pop_vipmember_buyimage;
              u.$emit("vipModal", {
                pop_vipmember_buyimage: a,
                showVipModal: !0,
                visible: !1
              });
            } else {
              if (3 == t.code) 0 < (t.max_quantity || "") && u.setData({
                number: u.data.number
              }), wx.showToast({
                title: t.msg,
                icon: "none",
                duration: 2e3
              }); else if (4 == t.code) u.setData({
                needAuth: !0
              }), u.$emit("authModal", !0); else if (6 == t.code || 7 == t.code) {
                0 < (t.max_quantity || "") && u.setData({
                  number: u.data.number
                });
                var e = t.msg;
                wx.showToast({
                  title: e,
                  icon: "none",
                  duration: 2e3
                });
              } else u.$emit("changeCartNum", t.total), u.setData({
                number: t.cur_count
              }), wx.showToast({
                title: "已加入购物车",
                image: "../../images/addShopCart.png"
              }), status.indexListCarCount(i, t.cur_count);
            }
          });
        } else app.util.request({
          url: "entry/wxapp/user",
          data: {
            controller: "car.reduce_car_goods",
            token: a,
            goods_id: i,
            community_id: s,
            quantity: 1,
            sku_str: "",
            buy_type: "dan",
            pin_id: 0,
            is_just_addcar: 1
          },
          dataType: "json",
          method: "POST",
          success: function(t) {
            if (3 == t.code) wx.showToast({
              title: t.msg,
              icon: "none",
              duration: 2e3
            }); else if (4 == t.code) {
              if (u.data.needAuth) return u.setData({
                needAuth: !0
              }), void u.$emit("authModal", !0);
            } else u.$emit("changeCartNum", t.total), u.setData({
              number: t.cur_count
            }), status.indexListCarCount(i, t.cur_count);
          }
        });
      }
    }
  }
</script>

<style>
  @import 'index.less';
</style>
