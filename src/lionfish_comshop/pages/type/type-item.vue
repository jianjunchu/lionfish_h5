<template>
<div>
  <form bindsubmit="submit2" reportSubmit="true">
    <button hidden formType="submit" id="formId"></button>
  </form>
  <label class="spu" for="formId">
      <i-router-link class="spu-content" >
          <div class="item-left" @click="gotoDetail">
              <!-- <i-img :defaultImage="spuItem.skuImage" height="170" iClass="img-class" lazyLoad="true" :loadImage="spuItem.skuImage" width="170"></i-img> -->
              <img class="img-class" :src="spuItem.skuImage"/>
              <!-- <div class="tag" v-if="reduction.is_open_fullreduction==1&&spuItem.is_take_fullreduction==1">满{{reduction.full_money}}减{{reduction.full_reducemoney}}</div> -->
          </div>
          <div class="item-right" @click="gotoDetail">
              <div class="item-right-top">
                  <div class="spu-title">
                      <span class="span">{{spuItem.spuName}}</span>
                  </div>
                  <div class="spu-desc" v-if="spuItem.spuDescribe">
                      <span class="em">{{spuItem.spuDescribe}}</span>
                  </div>
                  <!-- <i-vip-price price="{{spuItem.card_price}}" v-if="is_open_vipcard_buy==1&&spuItem.is_take_vipcard==1"></i-vip-price> -->
              </div>
              <div class="spu-price">
                  <div class="sale-price">
                      <span class="span">${{spuItem.actPrice[0]}}</span>.{{spuItem.actPrice[1]}}
                  </div>
                  <div class="market-price" v-if="spuItem.show_productprice">${{spuItem.marketPrice[0]}}.{{spuItem.marketPrice[1]}}</div>
              </div>
          </div>
          <div v-if="!isPast">
              <div v-show="!showAdd">
                  <div class="add-cart" v-if="spuItem.spuCanBuyNum <= 0">
                      <img class="img" src="@/assets/images/icon-add-shopCart-disabled.png" >
                  </div>
                  <div @click="openSku" class="add-cart" v-else>
                      <i-addcart fontsize="28" class="img"></i-addcart>
                  </div>
              </div>
              <i-input-number v-show="showAdd" addImage="@/assets/images/icon-add-2.png" @change="changeNumber" @outOfMax="outOfMax" class="index-input-number input-number-span iNumberImg iNumberdiv" :max="spuItem.spuCanBuyNum" min="0" reduceImage="@/assets/images/icon-reduce-2.png" :value="number"></i-input-number>
          </div>
          <!-- <div class="mask" v-if="isPast||disabled||spuItem.spuCanBuyNum==0?'disabled':''"></div>
          <div class="act-end act-out" v-if="spuItem.spuCanBuyNum==0">已抢光</div>
          <div class="act-end" v-else-if="actEnd">团购已结束</div> -->
      </i-router-link>
  </label>
</div>
</template>

<script>
import GlobalMixin from '../../mixin/globalMixin.js'

  import util from '../../utils';
  import status from '../../utils/index.js'
  import wcache from '../../utils/wcache.js';
  import auth from '../../utils/auth';
  import wx from '../../utils/wx';
  import request from '../../utils/request';
  export default {
    name: 'i-type-item',
    components: {
      'i-type-item' : require('./type-item.vue').default,
      'i-img': require('../../components/img/index.vue').default,
      'i-router-link': require('../../components/router-link/index.vue').default,
       'i-input-number': require('../../components/input-number/index.vue').default,
    },
    props: {
      spuItem: {
            type: Object,
            value: {
                spuId: "",
                skuId: "",
                skuImage: "",
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
            value: false
        },
        actEnd: {
            type: Boolean,
            value: !1
        },
        reduction: {
            type: Object,
            value: {
                full_money: "",
                full_reducemoney: "",
                is_open_fullreduction: 0
            }
        },
        changeCarCount: {
            type: Boolean,
            value: !1,
            observer: function(t) {
                t && this.setData({
                    number: this.spuItem.car_count
                });
            }
        },
        needAuth: {
            type: Boolean,
            value: !1
        },
        is_open_vipcard_buy: {
            type: Number,
            value: 0
        },
        canLevelBuy: {
            type: Boolean,
            value: !1
        }
    },
    data() {
      return{
        disabled: !1,
        placeholdeImg: "",
        number: 0,
        showAdd: false
      }
    },
    methods: {
        openSku: function() {
            console.log(this.$wx.getStorageSync("token"));
            var token = this.$wx.getStorageSync("token");
            if(JSON.stringify(token) === '{}'){
                this.$wx.showToast({
                    title: "请登录",
                    icon: 'none'
                })
            }else{
                this.showAdd = true;
                console.log(this.spuItem.spuCanBuyNum);
                var t = {
                    idx: 0,
                    type: "plus",
                    value: 1
                }
                this.changeNumber(t);
            }
        },
        gotoDetail: function(){
            this.$wx.redirectTo({
            url: '/lionfish_comshop/pages/goods/goodsDetail?id='+this.spuItem.actId
          })
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
            var a = this.$wx.getStorageSync("token"), e = this.$wx.getStorageSync("community"), i =this.spuItem.actId, s = e.communityId, u = this;
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
                if (3 == t.code) 0 < (t.max_quantity || "") && (
                    u.number = u.number
                ), this.$wx.showToast({
                    title: t.msg,
                    icon: "none",
                    duration: 2e3
                }); else if (4 == t.code) (
                    u.needAuth = !0
                ), u.$emit("authModal", !0); else if (6 == t.code || 7 == t.code) {
                    0 < (t.max_quantity || "") && (u.number = u.data.number);
                    var e = t.msg;
                    this.$wx.showToast({
                    title: e,
                    icon: "none",
                    duration: 2e3
                    });
                } else u.$emit("changeCartNum", t.total), (
                    u.number = t.cur_count
                ), u.$wx.showToast({
                    title: "已加入购物车",
                    image: "../../images/addShopCart.png"
                }), status.indexListCarCount(i, t.cur_count);
                }
            });
            } else {
            this.$http({
                controller: "car.reduce_car_goods",
                token: a,
                goods_id: i,
                community_id: s,
                quantity: 1,
                sku_str: "",
                buy_type: "dan",
                pin_id: 0,
                is_just_addcar: 1
            }).then(t =>{

                if (3 == t.code) this.$wx.showToast({
                title: t.msg,
                icon: "none",
                duration: 2e3
                }); else if (4 == t.code) {
                if (u.needAuth) return u.setData({
                    needAuth: !0
                }), void u.$emit("authModal", !0);
                } else{
                u.$emit("changeCartNum", t.total);
                u.number = t.cur_count
                status.indexListCarCount(i, t.cur_count);
                }
            })

        }
      }
    }
    
  }
</script>

<style scoped>

  .i-btn {
    text-align: center;
    vertical-align: middle;
    touch-action: manipulation;
    cursor: pointer;
    background-image: none;
    white-space: nowrap;
    user-select: none;
    font-size: 28px;
    border: 0!important;
    position: relative;
    text-decoration: none;
    height: 88px;
    line-height: 88px;
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
    width: 90px;
    height: 90px;
    border-radius: 0;
}

.spu .spu-content {
    background: #fff;
    overflow: hidden;
    position: relative;
    display: flex;
    padding: 10px 10px 10px;
    box-sizing: border-box;
}

.spu .spu-content::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 18px;
    right: 18px;
    border-bottom: 1px solid #e5e5e5;
}

.spu .spu-content.disabled {
    opacity: 0.6;
}

.spu .spu-content .item-left {
    position: relative;
}

.spu .spu-content .item-right {
    flex: 1;
    box-sizing: border-box;
    margin-left: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.spu .spu-content .item-right .spu-title {
    color: #222;
    font-size: 16px;
    height: 20px;
    /* margin-bottom: 12px; */
    margin-top: 10px;
    font-weight: 500;
    position: relative;
}

.spu .spu-content .item-right .spu-title .span {
    width: 100%;
    height: 30px;
    position: absolute;
    left: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.spu .spu-content .item-right .spu-desc {
    font-size: 14px;
    color: #999;
    position: relative;
    width: 350px;
    height: 26px;
    margin-bottom: 12px;
}

.spu .spu-content .item-right .spu-desc .em {
    width: 100%;
    height: 32px;
    position: absolute;
    left: 0;
    top: -2px;
    /* line-height: 32px; */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.spu .spu-content .add-cart {
    width: 28px;
    height: 28px;
    padding: 0;
    margin: 0;
    position: absolute;
    right: 28px;
    bottom: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.spu .spu-content .add-cart .img {
    width: 28px;
    height: 28px;
    display: block;
}

.spu .spu-content .item-right .spu-price {
    display: flex;
    align-items: flex-end;
    font-size: 13px;
    overflow: hidden;
}

.spu .spu-content .item-right .spu-price .sale-price {
    color: #ff5344;
    margin-right: 6px;
}

.spu .spu-content .item-right .spu-price .sale-price .span {
    font-size: 18px;
    margin: 0;
    font-weight: bold;
}

.spu .spu-content .item-right .spu-price .market-price {
    text-decoration: line-through;
    color: #999;
    margin-right: 30px;
}

.spu .mask {
    background: rgba(255,255,255,0.5);
    width: 170px;
    height: 170px;
    position: absolute;
    left: 24px;
    top: 28px;
}

.spu .act-end {
    position: absolute;
    height: 60px;
    border-radius: 10px;
    background: rgba(0,0,0,0.5);
    color: #fff;
    font-size: 28px;
    text-align: center;
    line-height: 30px;
    left: 110px;
    top: 85px;
    padding: 0 12px;
    transform: translateX(-50%);
}

.spu .tag {
    position: absolute;
    left: 0;
    bottom: 0;
    background: linear-gradient(to right,#ff5041,#ff994b);
    border-radius: 0 14px 14px 0;
    padding: 0 12px;
    height: 30px;
    font-size: 22px;
    line-height: 30px;
    color: #fff;
    display: inline-div;
    align-items: center;
    justify-content: center;
    width: auto;
    max-width: 180px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.spu .index-input-number {
    position: absolute;
    right: 15px;
    bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.spu .index-input-number .iNumberdiv {
    width: 80px;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.spu .index-input-number .iNumberdiv:first-child {
    justify-content: flex-end;
}

.spu .index-input-number .iNumberdiv:last-child {
    justify-content: flex-start;
}

.spu .index-input-number .iNumberImg {
    font-size: 44px;
}

.spu .index-input-number .input-number-span {
    height: 88px;
    line-height: 88px;
    font-size: 24px;
    color: #333;
    width: 58px;
}
</style>
