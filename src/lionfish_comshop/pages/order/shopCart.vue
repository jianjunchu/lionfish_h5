<template>
  <div class="page" style="margin-bottom: 52px">
    <div class="pb100">
      <div :class="['cart-tabs', is_open_vipcard_buy==1&&is_vip_card_member!=1?'hasVip':'']" v-if="showTab">
        <div @click="changeTabs" :class="['cart-tabs-item' ,tabIdx==index?'active':'']" :data-idx="item.id"
             :style="tabIdx == index ? 'color:'+skin.color+';border-color:'+skin.color:''" v-if="item.enabled"
             v-for="(item,index) in tabList" :key="item.id">
          {{item.name}}
        </div>
      </div>
      <div :class="['fixed-vip',showTab?'hasVip':'']" v-if="is_open_vipcard_buy==1&&is_vip_card_member!=1">
        <div class="vip i-flex i-flex-spb">
          <div class="i-flex vip-name">
            <img class="vip-logo" :src="modify_vipcard_logo" v-if="modify_vipcard_logo"/>
            <span class="iconfont icon-huiyuan" style="font-size:15px;" v-else></span>
            <div v-if="vipFee>0">开通“{{modify_vipcard_name}}”所选商品预计可省{{vipFee}}元</div>
            <div v-else>“{{modify_vipcard_name}}” 尊享特权·会员专享价</div>
          </div>
          <div @click="goLink" data-link="/lionfish_comshop/moduleA/vip/upgrade">立即开通
            <span class="iconfont icon-youjiantou goright"></span>
          </div>
        </div>
      </div>
      <div class="h88" v-if="showTab||is_open_vipcard_buy==1&&is_vip_card_member!=1"></div>
      <div class="h72" v-if="showTab&&is_open_vipcard_buy==1&&is_vip_card_member!=1"></div>
      <div :class="['empty', is_show_guess_like==1?'':'pos-a']" v-if="isEmpty">
        <img src="@/assets/images/icon-index-empty.png"/>
        <div v-if="needAuth">
          <div @click="authModal" class="h1">{{$t('common.dianji')}}
            <span :style="{color:skin.color}">“{{$t('cart.qudenglu')}}”</span>
            {{$t('cart.chakangouwuche')}}
          </div>
          <div @click="authModal" class="btn" :style="{background:skin.color}">{{$t('cart.qudenglu')}}</div>
        </div>
        <div v-else>
          <div class="h1">{{$t('cart.gouwuchekong')}}</div>
          <div @click="goindex" class="btn" :style="{background:skin.color}">{{$t('cart.qugouwu')}}</div>
        </div>
      </div>
      <div class="shop-cart-content" v-else>
        <i-card iClass="card-group" v-for="(item , index ) in carts" :key="index">
          <div class="card-body" slot="content">
            <div>
              <div v-for="(shopcarts,idx) in item.shopcarts" :key="shopcarts.key">
                <div class="reduce-item" v-if="shopcarts.can_man_jian==1">
                  <div class="cart-item" slot="content">
                    <label :class="['cart-item-checkbox', item.isselect?'selected':'']">
                      <checkbox-group bindchange="goodsselect" :data-id="shopcarts.id" :data-index="idx"
                                      :data-parentid="index" :data-value="shopcarts.isselect"
                                      v-if="shopcarts.can_buy==1&&shopcarts.option_can_buy==1">
                        <div class="checkbox">
                          <span class="iconfont icon-selected checkbox-checked" :style="{color:skin.color}"
                                v-if="shopcarts.isselect"></span>
                          <img class="checkbox-disabled" src="@/assets/images/checkbox-disabled.png" v-else/>
                          <checkbox hidden :checked="shopcarts.isselect" :value="shopcarts.isselect"></checkbox>
                        </div>
                      </checkbox-group>
                      <div class="checkbox" v-else>
                        <img class="checkbox-disabled" src="@/assets/images/checkbox-disabled.png"/>
                      </div>
                    </label>
                    <div class="cart-item-img">


                      <van-image  :src="shopcarts.imgurl">
                        <template v-slot:loading>
                          <van-loading type="spinner" size="20" />
                        </template>
                      </van-image>


                      <div class="tip" v-if="shopcarts.can_buy==0||shopcarts.option_can_buy==0">已失效</div>
                      <div class="tag" v-if="shopcarts.can_man_jian&&is_open_fullreduction&&shopcarts.can_buy!=0">
                        满{{full_money}}减{{full_reducemoney}}
                      </div>
                      <div class="tag pos-top" v-if="shopcarts.is_new_buy==1">新人专享</div>
                    </div>
                    <div class="cart-item-content">
                      <div>
                        <div class="title">{{shopcarts.title}}</div>
                        <div class="spec">{{shopcarts.goodstype}}</div>
                      </div>
                      <i-vip-price :price="shopcarts.card_price"
                                   v-if="is_open_vipcard_buy==1&&shopcarts.is_take_vipcard==1&&is_vip_card_member==1"></i-vip-price>
                      <i-vip-price :price="shopcarts.levelprice" type="1"
                                   v-else-if="canLevelBuy&&shopcarts.is_mb_level_buy"></i-vip-price>
                      <div class="cart-item-content-bottom">
                        <div class="sale-price">
                          $<span>{{shopcarts.currntprice}}</span>
                        </div>
                        <div :class="['i-class', 'i-input-number', 'i-input-number-size-'+size]"
                             v-if="shopcarts.can_buy==1&&shopcarts.option_can_buy==1">
                          <div @click.stop="regoodsnum" class="i-input-number-minus " :data-gid="shopcarts.id"
                               :data-index="idx" :data-parentid="index">
                            <img src="@/assets/images/icon-input-reduce.png"/>
                          </div>
                          <input @change="changeNumber" class="i-input-number-text " :data-index="idx"
                                 :data-parentid="index" :max="shopcarts.max_quantity" min="0" type="number"
                                 :value="shopcarts.goodsnum"></input>
                          <div @click.stop="addgoodsnum" class="i-input-number-plus " :data-gid="shopcarts.id"
                               :data-index="idx" :data-parentid="index" :id="'tapTest'+idx">
                            <img src="@/assets/images/icon-input-add.png"/>
                          </div>
                        </div>
                        <div @click="deleteGoods" class="delete-icon" :data-gid="shopcarts.id" :data-index="idx"
                             :data-parentid="index" v-else>
                          <img src="@/assets/images/icon-shop-delete.png"/>删除
                        </div>
                      </div>
                    </div>
                    <div class="piece-reduce" style="display:none;"
                         v-if="shopcarts.can_man_jian&&item.is_open_fullreduction==1">
                      <div class="tag-content">
                        <div class="tag">满减</div>
                      </div>
                      满{{item.full_money}}减{{item.full_reducemoney}}
                    </div>
                  </div>
                  <div class="swiper-out-button-content" slot="button" style="display:none;">
                    <div @click="deleteGoods" class="delete-btn">删除</div>
                  </div>
                </div>
                <div class="normal-item" v-else>
                  <div class="cart-item" slot="content">
                    <label :class="['cart-item-checkbox', item.isselect?'selected':'']">
                      <div @click="goodsselect" :data-id="shopcarts.id" :data-index="idx"
                                      :data-parentid="index" :data-value="shopcarts.isselect"
                                      v-if="shopcarts.can_buy==1&&shopcarts.option_can_buy==1">
                        <div class="checkbox">
                        <span class="iconfont icon-selected checkbox-checked" :style="{color:skin.color}" v-if="shopcarts.isselect"></span>
                          <img class="checkbox-disabled" src="@/assets/images/checkbox-disabled.png" v-else/>
                          <checkbox hidden :checked="shopcarts.isselect" :value="shopcarts.isselect"></checkbox>
                        </div>
                      </div>
                      <div class="checkbox" v-else>
                        <img class="checkbox-disabled" src="@/assets/images/checkbox-disabled.png"/>
                      </div>
                    </label>
                    <div class="cart-item-img">

                      <van-image  :src="shopcarts.imgurl">
                        <template v-slot:loading>
                          <van-loading type="spinner" size="20" />
                        </template>
                      </van-image>

                      <div class="tip" v-if="shopcarts.can_buy==0||shopcarts.option_can_buy==0">已失效</div>
                      <div class="tag pos-top" v-if="shopcarts.is_new_buy==1">新人专享</div>
                    </div>
                    <div class="cart-item-content">
                      <div>
                        <div class="title">{{shopcarts.title}}</div>
                        <div class="spec">{{shopcarts.goodstype}}</div>
                      </div>
                      <i-vip-price :price="shopcarts.card_price"
                                   v-if="is_open_vipcard_buy==1&&shopcarts.is_take_vipcard==1&&is_vip_card_member==1"></i-vip-price>
                      <i-vip-price :price="shopcarts.levelprice" type="1"
                                   v-else-if="canLevelBuy&&shopcarts.is_mb_level_buy"></i-vip-price>
                      <div class="cart-item-content-bottom">
                        <div class="sale-price">
                          $<span>{{shopcarts.currntprice}}</span>
                        </div>
                        <div :class="['i-class', 'i-input-number', 'i-input-number-size-'+size]"
                             v-if="shopcarts.can_buy==1&&shopcarts.option_can_buy==1">
                          <div @click.stop="regoodsnum" class="i-input-number-minus " :data-gid="shopcarts.id"
                               :data-index="idx" :data-parentid="index">
                            <img src="@/assets/images/icon-input-reduce.png"/>
                          </div>
                          <input @change="changeNumber" class="i-input-number-text " :data-index="idx"
                                 :data-parentid="index" :max="shopcarts.max_quantity" min="0" type="number"
                                 :value="shopcarts.goodsnum"></input>
                          <div @click.stop="addgoodsnum" class="i-input-number-plus " :data-gid="shopcarts.id"
                               :data-index="idx" :data-parentid="index" :id="'tapTest'+idx">
                            <img src="@/assets/images/icon-input-add.png"/>
                          </div>
                        </div>
                        <div @click="deleteGoods" class="delete-icon" :data-id="shopcarts.id" :data-index="idx"
                             :data-parentid="index" v-else>
                          <img src="@/assets/images/icon-shop-delete.png"/>删除
                        </div>
                      </div>
                    </div>
                    <div class="piece-reduce" style="display:none;"
                         v-if="shopcarts.can_man_jian&&item.is_open_fullreduction==1">
                      <div class="tag-content">
                        <div class="tag">满减</div>
                      </div>
                      满{{item.full_money}}减{{item.full_reducemoney}}
                    </div>
                  </div>
                  <div class="swiper-out-button-content" slot="button" style="display:none;">
                    <div @click="deleteGoods" class="delete-btn">删除</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </i-card>
        <i-card v-if="hasInvalid>0">
          <div slot="header">
            <div class="i-flex i-flex-spb invalid-head">
              <div></div>
              <div @click="clearlose">清空
                <span class="iconfont icon-shanchu1"></span>
              </div>
            </div>
          </div>
          <div slot="content">
            <i-card iClass="invalid-card-group" v-for="(item,index) in invalidCarts" :key="item.id">
              <div class="card-body" slot="content">
                <div>
                  <div class="normal-item" v-for="(shopcarts,idx) in item.shopcarts">
                    <div class="cart-item" slot="content">
                      <label class="cart-item-checkbox">
                        <span class="invalid-tip" v-if="shopcarts.can_buy==0">售罄</span>
                        <span class="invalid-tip" v-else-if="shopcarts.option_can_buy==0">失效</span>
                        <div class="checkbox" v-else>
                          <img class="checkbox-disabled" src="@/assets/images/checkbox-disabled.png"/>
                        </div>
                      </label>
                      <div class="cart-item-img">



                        <van-image style="width: 90px; height: 90px" :src="shopcarts.imgurl">
                          <template v-slot:loading>
                            <van-loading type="spinner" size="20" />
                          </template>
                        </van-image>

                      </div>
                      <div class="cart-item-content">
                        <div>
                          <div class="title">{{shopcarts.title}}</div>
                          <div class="spec">{{shopcarts.goodstype}}</div>
                        </div>
                        <div class="cart-item-content-bottom">
                          <div v-if="shopcarts.can_buy==0">已售罄</div>
                          <div v-if="shopcarts.option_can_buy==0">规格失效</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </i-card>
          </div>
        </i-card>
      </div>
      <div :class="['fixed-bar',isIpx?'isIpx':'']" v-if="!isEmpty">
        <div class="fullreductionInfo" v-if="man_free_tuanzshipping>0&&delivery_tuanz_money>0&&tabIdx==0">
          <div class="fr-left">
            <div class="active-msg diff-money" v-if="diffDeliveryMoney>0">
              自营满{{man_free_tuanzshipping}}免配送费{{delivery_tuanz_money}}，还差
              <span :style="{color:skin.color}">{{diffDeliveryMoney}}</span>
              元
            </div>
            <div class="active-msg" v-else>自营满${{man_free_tuanzshipping}}免配送费${{delivery_tuanz_money}}</div>
          </div>
          <i-router-link :style="{color:skin.color}" url="/lionfish_comshop/pages/index/index"
                         v-if="diffDeliveryMoney<0&&man_free_tuanzshipping>0&&delivery_tuanz_money>0">
            <div class="i-link">去凑单
              <span class="iconfont icon-youjiantou"></span>
            </div>
          </i-router-link>
        </div>
        <div class="fullreductionInfo" v-if="is_open_fullreduction==1&&reduceNum>0&&!isEmpty">
          <div class="fr-left">
            <div class="tag" :style="{background:skin.color}">满减</div>
            <div class="active-msg">满{{full_money}}减{{full_reducemoney}}</div>
          </div>
          <i-router-link url="/lionfish_comshop/pages/index/index" v-if="disAmount<=0&&is_open_fullreduction==1">
            <div class="i-link" :style="{color:skin.color}">
              <div class="diff-money" v-if="diffMoney&&diffMoney!='0.00'">
                还差
                <span :style="{color:skin.color}">{{diffMoney}}</span>
                元,
              </div>
              去凑单
              <span class="iconfont icon-youjiantou"></span>
            </div>
          </i-router-link>
          <i-router-link type="switch" url="/lionfish_comshop/pages/index/index" v-else>
            <div class="i-link">
              <div class="diff-money" v-if="disAmount&&disAmount>0">已减
                <span>{{disAmount}}</span>
                元,
              </div>
              逛一逛
              <span class="iconfont icon-youjiantou"></span>
            </div>
          </i-router-link>
        </div>
        <div class="cart-bar">
          <label @click="all_select" class="cart-item-checkbox">
              <div class="checkbox">
              <span class="iconfont icon-selected checkbox-checked" :style="{color:skin.color}"
                    v-if="allselect"></span>
                <img class="checkbox-disabled" src="@/assets/images/checkbox-disabled.png" v-else/>
                <checkbox  hidden :checked="allselect" :value="allselect"></checkbox >
              </div>
            {{$t('common.quanxuan')}}
          </label>
          <div class="fixed-bar-center" v-if="disAmount&&disAmount!='0.00'&&is_open_fullreduction==1">
            <div class="total">
              合计：
              <span>${{totalAmount}}</span>
            </div>
            <div class="total-detail">
              <span>总额:${{allcount}}</span>
              <span>优惠:${{disAmount}}</span>
            </div>
          </div>
          <div class="fixed-bar-center" v-else>
            <div class="total">
              合计：<span>${{allcount}}</span>
            </div>
            <div class="total-detail" v-if="vipFee>0">
              <span>总额:${{vipTotal}}</span>
              <span>优惠:${{vipFee}}</span>
            </div>
            <div class="total-detail" v-else-if="levelFee>0">
              <span>总额:${{levelToTal}}</span>
              <span>优惠:${{levelFee}}</span>
            </div>
          </div>
          <button class="fixed-bar-btn" style="background:#dcdcdc;" v-if="is_comunity_rest==1">团长休息中</button>
          <div v-else-if="open_man_orderbuy==1">
            <button @click="toorder" class="fixed-bar-btn" v-if="canbuy_other>=0">{{$t('cart.qujiesuan')}}({{allnum}})</button>
            <button disabled @click="toorder" class="fixed-bar-btn" v-else>
              <span> v-if="totalAmount!=0">差</span>
              <span> v-else>满</span>
              ${{-canbuy_other}}下单
            </button>
          </div>
          <div @click="toorder" class="fixed-bar-btn" :style="{background:skin.color}" v-else>{{$t('cart.qujiesuan')}}({{allnum}})
          </div>
        </div>
      </div>
      <guess-like @changeCartNum="showCartGoods" @openSku="openSku" @vipModal="vipModal" :updateCart="updateCart"
                  v-if="is_show_guess_like==1"></guess-like>
      <i-tabbar @authModal="authModal" :cartNum="cartNum" currentIdx="3" :needAuth="needAuth"
                :tabbarRefresh="tabbarRefresh"></i-tabbar>
    </div>
    <i-new-auth @authSuccess="authSuccess" @cancel="authModal" :needAuth="needAuth&&showAuthModal"></i-new-auth>
    <div class="mask" v-show="visible"></div>
    <div class="sku-content" v-show="visible" scrollUp="true">
      <div class="sku-card">
        <div @click="closeSku" class="close">
          <img src="@/assets/images/icon-sku-close.png"/>
        </div>
        <div class="sku-header">

          <van-image style="width: 80px; height: 80px" :src="cur_sku_arr.skuImage">
            <template v-slot:loading>
              <van-loading type="spinner" size="20" />
            </template>
          </van-image>

          <div class="sku-desc">
            <div class="sku-title">
              <span>{{cur_sku_arr.spuName}}</span>
            </div>
            <div class="sku-price">
              <div class="sale-price" v-if="is_vip_card_member==1&&is_open_vipcard_buy==1">
                $ <span>{{cur_sku_arr.card_price[0]}}</span>.{{cur_sku_arr.card_price[1]}}
              </div>
              <div class="sale-price" v-else>
                $ <span>{{cur_sku_arr.actPrice[0]}}</span>.{{cur_sku_arr.actPrice[1]}}
              </div>
              <div class="market-price">${{cur_sku_arr.marketPrice[0]}}.{{cur_sku_arr.marketPrice[1]}}</div>
            </div>
            <div class="sku-switch-on">已选择：{{cur_sku_arr.spec}}</div>
          </div>
        </div>
        <div class="sku-spec" v-for="(item,index) in skuList.list" :key="item.id">
          <div class="title">{{item.name}}</div>
          <div class="spec-list">
          <span @click="selectSku" :class="[idx==sku[index]['idx']?'on':'']"
                :data-disabled="item.canBuyNum-value<0" :data-idx="idx"
                :data-type="index+'_'+idx+'_'+value.option_value_id+'_'+value.name"
                v-for="(value,idx) in item.option_value"
                :key="idx">{{value.name}}</span>
          </div>
        </div>
        <div class="sku-num-content">
          <div class="title">数量</div>
          <div :class="['i-class', 'i-input-number'/*, 'i-input-number-size-'+size*/]">
            <div @click="setNum" :class="['i-input-number-minus'/*, value<=min?'i-input-number-disabled':''*/]"
                 data-type="decrease">
              <img src="@/assets/images/icon-input-reduce.png"/>
            </div>
            <input bindblur="handleBlur" bindfocus="handleFocus"
                   :class="['i-input-number-text'/*, min>=max?'i-input-number-disabled':''*/]" disabled="true"
                   type="number"
                   :value="sku_val"></input>
            <div @click="setNum" :class="['i-input-number-plus'/*, value>=max?'i-input-number-disabled':''*/]"
                 data-type="add">
              <img src="@/assets/images/icon-input-add.png"/>
            </div>
          </div>
          <!--<div class="msg" v-if="skuList[current].isLimit">
            <span v-if="skuList[current].limitMemberNum>-1">每人限{{skuList[current].limitMemberNum}}单</span>
            <span v-if="skuList[current].limitOrderNum>-1">每单限{{skuList[current].limitOrderNum}}份</span>
            <span></span>
          </div>-->
          <!--<div class="even-num"
               v-else-if="!skuList[current].isLimit&&skuList[current].canBuyNum-value<=10&&skuList[current].canBuyNum-value>-1">
            还可以购买 {{skuList[current].canBuyNum-value}} 件
          </div>-->
        </div>
        <form bindsubmit="gocarfrom" reportSubmit="true">
          <button class="sku-confirm" :disabled="cur_sku_arr.stock==0?true:false" formType="submit">
            <div>{{cur_sku_arr.stock==0?'已抢光':'确定'}}</div>
          </button>
        </form>
      </div>
    </div>
    <i-vip-modal :imgUrl="pop_vipmember_buyimage" :visible="showVipModal"></i-vip-modal>
  </div>
</template>

<script>
  import globalMixin from '../../mixin/globalMixin.js'
  import util from '../../utils/index.js'
  import status from '../../utils/index.js'
  import a from '../../utils/public'
  var addFlag = 1

  export default {
    name: 'shopCart',
    mixins: [globalMixin],
    data() {
      return {
        allselect: !1,
        community_id: 0,
        allnum: 0,
        tablebar: 3,
        allcount: '0.00',
        recount: '0.00',
        carts: [],
        isEmpty: !1,
        needAuth: !1,
        cartNum: 0,
        isIpx: !1,
        disAmount: 0,
        totalAmount: 0,
        reduceNum: 0,
        tabIdx: 0,
        updateCart: 0,
        invalidCarts: {},
        tabList: [],
        visible: false,
        stopClick: !1,
        showTab: !1,
        is_open_vipcard_buy: !1,
        is_open_fullreduction: !1,
        hasInvalid: 0,
        man_free_tuanzshipping: 0,
        vipFee: 0,
        levelFee: 0,
        is_comunity_rest: !1,
        open_man_orderbuy: '',
        is_show_guess_like: !1,
        tabbarRefresh: !1,
        cur_sku_arr: {
          actPrice: [],
          card_price: [],
          marketPrice: []
        },
        skuList: [],
        is_vip_card_member: !1,
        size: 1,
        mult_carts: [],
        showAuthModal: !1,
        sku_val: 0,
        pop_vipmember_buyimage: '',
        showVipModal:false

      }
    },
    created: function() {
      const wx = this.$wx
      status.setNavBgColor()
      this.$wx.setNavigationBarTitle({
        title: "Cart",
        showLogo:false,
        showMore:false,
        showBack:false
      })

    },
    mounted: function() {

      const wx = this.$wx, app = this.$getApp()
      var s = this

      util.check_login_new().then(function(t) {
        console.log(t)
        if (t) {
          var a = wx.getStorageSync('community').communityId || ''

          s.needAuth = !1
          s.isEmpty = !1
          s.tabbarRefresh = !0
          s.community_id = a
          s.isIpx = app.globalData.isIpx
          status.cartNum().then(function(t) {
            s.cartNum = t.data
          })
          s.showCartGoods()
        } else {
          s.needAuth = !0
          s.isEmpty = !0
        }
      })
      wx.hideLoading()
    },
    methods: {
      authSuccess: function() {
        const wx = this.$wx, app = this.$getApp()
        wx.reLaunch({
          url: '/lionfish_comshop/pages/order/shopCart'
        })
      },
      authModal: function() {
        this.needAuth && (this.showAuthModal = !this.showAuthModal)
        if(this.showAuthModal){
          this.$router.replace({path: '/login'});
        }
      },
      showCartGoods: function() {

        const wx = this.$wx, app = this.$getApp()
        var w = this, t = wx.getStorageSync('community').communityId

        console.log('onshow购物车里面的community_id:')
        w.community_id = t
        var a = wx.getStorageSync('token')
        app.util.request({
          url: 'entry/wxapp/index',
          data: {
            controller: 'car.show_cart_goods',
            token: a,
            community_id: t,
            buy_type: 'dan'
          },
          dataType: 'json',
          success: function(t) {

            console.log(t)
            if (setTimeout(function() {
              wx.hideLoading()
            }, 1e3), 0 == t.code) {
              var a = t.mult_carts || [], s = {}, e = w.tabIdx, o = !1, r = [{
                id: 0,
                name: '团长代收',
                enabled: !1
              }, {
                id: 1,
                name: '快递直发',
                enabled: !1
              }, {
                id: 2,
                name: '到店核销',
                enabled: !1
              }], c = Object.keys(a), i = c.length
              1 < i ? (o = !0, c.forEach(function(t) {
                r[t].enabled = !0
              }), s = a[e] || {}) : 1 == i && (s = a[e = c[0]] || {})
              var n = !0
              0 != Object.keys(s).length && (n = !1, s = w.sortCarts(s))
              var d = t, l = d.man_free_tuanzshipping, u = d.delivery_tuanz_money, h = d.is_comunity_rest,
                p = d.open_man_orderbuy, m = d.man_orderbuy_money, _ = d.is_show_guess_like, g = d.is_open_vipcard_buy,
                y = d.is_vip_card_member, f = d.vipcard_save_money, v = d.modify_vipcard_name,
                x = d.is_member_level_buy, k = d.level_save_money, b = !1
              1 == g ? 1 != y && 1 == x && (b = !0) : 1 == x && (b = !0), (
                w.carts = s,
                  w.mult_carts = a,
                  w.showTab = o,
                  w.isEmpty = n,
                  w.is_comunity_rest = h,
                  w.open_man_orderbuy = p,
                  w.man_orderbuy_money = 1 * m,
                  w.is_show_guess_like = _,
                  w.man_free_tuanzshipping = l,
                  w.delivery_tuanz_money = u,
                  w.is_open_vipcard_buy = g,
                  w.is_vip_card_member = y,
                  w.vipcard_save_money = f,
                  w.modify_vipcard_name = v,
                  w.is_member_level_buy = x,
                  w.canLevelBuy = b,
                  w.level_save_money = k,
                  w.tabList = r
              ), w.xuan_func()
            } else {
              w.needAuth = !0, w.isEmpty = !0, wx.hideTabBar()
            }
          }
        })
      },
      onHide: function() {
        this.tabbarRefresh = !1
        console.log('onHide')
      },
      sortCarts: function(a) {
        const wx = this.$wx, app = this.$getApp()

        var o = 0, r = 0, c = 0, i = 0, n = {}, d = 0, t = function(s) {
          r = a[s].is_open_fullreduction, c = a[s].full_reducemoney, i = a[s].full_money,
            n[s] = {
              id: a[s].id,
              shopcarts: []
            }
          var t = a[s].shopcarts, e = []
          t.forEach(function(t, a) {
            0 == t.can_buy || 0 == t.option_can_buy ? (n[s].shopcarts.push(t), d += 1) : (e.push(t),
            1 == t.can_man_jian && o++)
          }), (a[s].shopcarts = e).sort(function(t, a) {
            return t.can_man_jian < a.can_man_jian ? 1 : t.can_man_jian > a.can_man_jian ? -1 : 0
          })
        }
        for (var s in a) t(s)
        return (
          this.reduceNum = o,
            this.is_open_fullreduction = r,
            this.full_reducemoney = c,
            this.full_money = i,
            this.invalidCarts = n,
            this.hasInvalid = d
        ), a
      },
      xuan_func: function() {
        const wx = this.$wx, app = this.$getApp()

        var t = 0, a = 0, s = 1, e = !1, o = 1, r = this
        r.is_open_vipcard_buy, r.is_vip_card_member
        for (var c in this.carts) {
          var i = 0
          this.carts[c].goodstypeselect = 0, this.carts[c].goodstype = this.carts[c].shopcarts.length
          for (var n = 0; n < this.carts[c].shopcarts.length; n++) {
            var d = this.carts[c].shopcarts[n]
            0 == d.isselect && 1 == d.can_buy && 1 == d.can_buy && 1 == d.option_can_buy && (s = 0),
            d.isselect && 1 == d.can_buy && 1 == d.can_buy && 1 == d.option_can_buy && (o = 0,
              i = this.calcVipPrice(i, d), this.carts[c].goodstypeselect++, t = parseInt(t) + parseInt(d.goodsnum)),
            0 == d.can_buy && (d.isselect = !1)
          }
          this.carts[c].count = i.toFixed(2), a += i
        }
        1 == s && 0 == o && (e = !0), (
            r.allselect = e,
            r.allnum = t,
            r.allcount = a.toFixed(2),
            r.carts = this.carts
        ), this.calcAmount()
      },
      edit: function(t) {
        const wx = this.$wx, app = this.$getApp()

        var a = parseInt(t.currentTarget.dataset.index)
        this.carts[a].caredit = 'none', this.carts[a].finish = 'inline'
        for (var s = 0; s < this.carts[a].shopcarts.length; s++) {
          this.carts[a].shopcarts[s].edit = 'none',
            this.carts[a].shopcarts[s].finish = 'inline', this.carts[a].shopcarts[s].description = 'onedit-description',
            this.carts[a].shopcarts[s].cartype = 'div'
        }
        this.carts = this.carts
      },
      finish: function(t) {
        var a = parseInt(t.currentTarget.dataset.index)
        this.carts[a].caredit = 'inline', this.carts[a].finish = 'none'
        for (var s = 0; s < this.carts[a].shopcarts.length; s++) {
          this.carts[a].shopcarts[s].edit = 'inline',
            this.carts[a].shopcarts[s].finish = 'none', this.carts[a].shopcarts[s].description = 'description',
            this.carts[a].shopcarts[s].cartype = 'inline'
        }

        this.carts = this.carts
      },
      goLink: function(t) {
        const wx = this.$wx, app = this.$getApp()
        var a = t.currentTarget.dataset.link
        wx.redirectTo({
          url: a
        })
      },
      goGoods: function(t) {
        const wx = this.$wx, app = this.$getApp()
        var a = t.currentTarget.dataset.type
        3 < getCurrentPages().length ? wx.redirectTo({
          url: '/Snailfish_shop/pages/goods/index?id=' + a
        }) : wx.navigateTo({
          url: '/Snailfish_shop/pages/goods/index?id=' + a
        })
      },
      shopselect: function(t) {
        const wx = this.$wx, app = this.$getApp()

        var a = parseInt(t.currentTarget.dataset.index), s = this.allselect, e = 0, o = 0, r = 0
        if (1 == this.carts[a].isselect) {
          s = this.carts[a].isselect = !1
          for (var c = 0; c < this.carts[a].shopcarts.length; c++) {
            1 == this.carts[a].shopcarts[c].isselect && (this.carts[a].shopcarts[c].isselect = !1,
              e = parseInt(e) + parseInt(this.carts[a].shopcarts[c].goodsnum), this.carts[a].goodstypeselect = this.carts[a].goodstypeselect - 1)
          }
          e = this.allnum - e, o = parseFloat(this.allcount) - parseFloat(this.carts[a].count),
            this.carts[a].count = '0.00', (
            this.carts = this.carts,
              this.allnum = e,
              this.allcount = o.toFixed(2),
              this.allselect = s
          )
        } else {
          var i = 0
          this.carts[a].isselect = !0
          for (c = 0; c < this.carts[a].shopcarts.length; c++) {
            var n = this.carts[a].shopcarts[c]
            0 == n.isselect && (n.isselect = !0, this.carts[a].goodstypeselect = this.carts[a].goodstypeselect + 1,
              e = parseInt(e) + parseInt(n.goodsnum), i = this.calcVipPrice(i, n)), r = this.calcVipPrice(r, n)
          }
          e = this.allnum + e, o = parseFloat(this.allcount) + i, this.carts[a].count = r.toFixed(2)
          var d = 1
          for (var c in this.carts) for (var l = 0; l < this.carts[c].shopcarts.length; l++) 0 == this.carts[c].shopcarts[l].isselect && (d = 0)
          1 == d && (s = !0), (
            this.carts = this.carts,
              this.allnum = e,
              this.allcount = o.toFixed(2),
              this.allselect = s
          )
        }
        this.go_record()
      },
      goodsselect: function(t) {

        const wx = this.$wx, app = this.$getApp()


        var a = parseInt(t.currentTarget.dataset.parentid), s = parseInt(t.currentTarget.dataset.index), e = this.allselect,
          o = this.carts[a].shopcarts[s]
        if (1 == o.isselect) {
          o.isselect = !1, e && (e = !1), this.carts[a].goodstypeselect = parseInt(this.carts[a].goodstypeselect) - 1,
          this.carts[a].goodstypeselect <= 0 && (this.carts[a].isselect = !1)
          var r = parseInt(this.allnum) - parseInt(o.goodsnum), c = this.calcVipPrice(this.allcount, o, '', 'red'),
            i = this.calcVipPrice(this.carts[a].count, o, '', 'red')
          this.carts[a].count = i.toFixed(2), (
            this.carts = this.carts,
              this.allnum = r,
              this.allcount = c.toFixed(2),
              this.allselect = e
          )
        } else {
          o.isselect = !0, this.carts[a].goodstypeselect = parseInt(this.carts[a].goodstypeselect) + 1,
          0 < this.carts[a].goodstypeselect && (this.carts[a].isselect = !0)
          var n = 1
          for (var d in this.carts) {
            console.log('in')
            for (var l = 0; l < this.carts[d].shopcarts.length; l++) 0 == this.carts[d].shopcarts[l].isselect && 1 == this.carts[d].shopcarts[l].can_buy && 1 == this.carts[d].shopcarts[l].option_can_buy && (n = 0)
          }
          1 == n && (e = !0)
          r = parseInt(this.allnum) + parseInt(o.goodsnum), c = this.calcVipPrice(this.allcount, o),
            i = this.calcVipPrice(this.carts[a].count, o)
          this.carts[a].count = i.toFixed(2), (
            this.carts = this.carts,
              this.allnum = r,
              this.allcount = c.toFixed(2),
              this.allselect = e
          )
        }
        this.go_record()
      },
      all_select: function(t) {
        const wx = this.$wx, app = this.$getApp()

        var a = this.allselect
        this.carts
        if (a) {
          a = !1
          var s = 0, e = 0
          for (var o in this.carts) {
            for (var r in this.carts[o].count = '0.00',
              this.carts[o].isselect = !1, this.carts[o].goodstypeselect = 0, this.carts[o].shopcarts) {
              this.carts[o].shopcarts[r].isselect = !1
            }
          }
          this.carts = this.carts,
            this.allnum = s,
            this.allcount = e.toFixed(2),
            this.allselect = a
        } else {
          a = !0
          s = 0, e = 0
          for (var o in this.carts) {
            var c = 0
            this.carts[o].isselect = !0
            var i = this.carts[o].shopcarts
            for (var r in this.carts[o].goodstypeselect = i.length, i) {
              1 == i[r].can_buy && 1 == i[r].option_can_buy && (c = this.calcVipPrice(c, i[r]),
                s = parseInt(s) + parseInt(this.carts[o].shopcarts[r].goodsnum), i[r].isselect = !0)
            }
            this.carts[o].count = c.toFixed(2), e += c
          }
          this.carts = this.carts
          this.allnum = s
          this.allcount = e.toFixed(2)
          this.allselect = a
        }
        this.go_record()
      },
      regoodsnum: function(t) {
        const wx = this.$wx, app = this.$getApp()
        var a = parseInt(t.currentTarget.dataset.parentid), s = parseInt(t.currentTarget.dataset.index),
          e = this.updateCart, o = this.carts[a].shopcarts[s], r = this
        if (1 == o.goodsnum) {
          r.cofirm_del(a, s)
        } else if (1 == o.isselect) {
          var c = parseInt(this.allnum) - 1, i = this.calcVipPrice(r.allcount, o, 1, 'red'),
            n = this.calcVipPrice(this.carts[a].count, o, 1, 'red')
          r.carts[a].count = n.toFixed(2), o.goodsnum = o.goodsnum - 1, (
            r.carts = this.carts,
              r.allnum = c,
              r.allcount = i.toFixed(2)
          )
        } else {
          o.goodsnum = parseInt(o.goodsnum) - 1, (
            r.carts = this.carts
          )
        }
        if ('' == o.goodstype) {
          var d = 1 * o.goodsnum, l = t.currentTarget.dataset.gid
          status.indexListCarCount(l, d), (r.updateCart = e + 1)
        }
        r.go_record()
      },
      cofirm_del: function(l, u) {
        const wx = this.$wx, app = this.$getApp()

        2 < arguments.length && void 0 !== arguments[2] && arguments[2]
        var h = this, p = this.updateCart
        wx.showModal({
          title: '提示',
          content: '确定删除这件商品吗？',
          showCancelButton:true,
          confirmColor: '#FF0000',
          success: function(t) {
            if (t.confirm) {
              var a = h.carts[l].shopcarts[u]
              if ('' == a.goodstype) {
                var s = a.id
                status.indexListCarCount(s, 0), (
                  h.updateCart = p + 1
                )
              }
              var e = a.key, o = h.reduceNum
              if (1 == a.can_man_jian && (o--, h.reduceNum = o), console.log(o), 1 == a.isselect) {
                var r = h.allnum - 1, c = h.calcVipPrice(h.allcount, a, 1, 'red'),
                  i = h.calcVipPrice(h.carts[l].count, a, 1, 'red')
                if (h.carts[l].count = i.toFixed(2), h.carts[l].goodstype = h.carts[l].goodstype - 1,
                  h.carts[l].goodstypeselect = h.carts[l].goodstypeselect - 1, 0 == h.carts[l].goodstype) {
                  var n = h.carts
                  delete n[l], 0 == Object.keys(n).length && (
                    h.isEmpty = !0
                  )
                } else {
                  h.carts[l].shopcarts.splice(u, 1), h.isAllSelect()
                }
                h.carts = h.carts
                h.allnum = r
                h.allcount = c.toFixed(2)
              } else {
                if (h.carts[l].goodstype = h.carts[l].goodstype - 1, 0 == h.carts[l].goodstype) {
                  var d = h.carts
                  delete d[l], 0 == Object.keys(d).length && (h.isEmpty = !0)
                } else {
                  h.carts[l].shopcarts.splice(u, 1)
                }

                h.carts = h.carts
              }
              h.del_car_goods(e), h.calcAmount()
            } else {
              console.log('取消删除')
            }
          }
        })
      },
      isAllSelect: function() {
        const wx = this.$wx, app = this.$getApp()
        var t = 1, a = !1, s = this.carts, e = 0
        for (var o in s) {
          for (var r = 0; r < s[o].shopcarts.length; r++) {
            1 == s[o].shopcarts[r].can_buy && 1 == s[o].shopcarts[r].option_can_buy && (e = 1),
            0 == s[o].shopcarts[r].isselect && 1 == s[o].shopcarts[r].can_buy && 1 == s[o].shopcarts[r].option_can_buy && (t = 0)
          }
        }
        1 == t && 1 == e && (a = !0), (this.allselect = a)
      },
      addgoodsnum: function(r) {
        const wx = this.$wx, app = this.$getApp()
        if (0 != addFlag) {
          addFlag = 0
          var c = parseInt(r.currentTarget.dataset.parentid), t = parseInt(r.currentTarget.dataset.index), i = this,s = r.currentTarget.dataset.gid,
            n = this.carts[c].shopcarts[t], a = parseInt(n.max_quantity)
          if (1 == n.isselect) {
            var d = parseInt(this.allnum) + 1, s = this.calcVipPrice(this.allcount, n, 1),
              e = this.calcVipPrice(this.carts[c].count, n, 1)
            if (i.carts[c].count = e.toFixed(2), !(n.goodsnum < a)) {
              addFlag = 1, n.goodsnum = a, d--
              var o = '最多购买' + a + '个'
              return wx.showToast({
                title: o,
                icon: 'none',
                duration: 2e3
              }), !1
            }
            n.goodsnum = parseInt(n.goodsnum) + 1, (
              this.carts = this.carts,
                this.allnum = d,
                this.allcount = s.toFixed(2)
            )
          } else {
            if (!(parseInt(n.goodsnum) < a)) {
              addFlag = 1
              o = '最多购买' + a + '个'
              return wx.showToast({
                title: o,
                icon: 'none',
                duration: 2e3
              }), !1
            }
            n.goodsnum = parseInt(n.goodsnum) + 1
          }
          var l = wx.getStorageSync('token'), u = [], h = [], p = (d = this.allnum, this.carts)
          for (var m in p) for (var _ in p[m].shopcarts) u.push(p[m].shopcarts[_].key), h.push(p[m].shopcarts[_].key + '_' + p[m].shopcarts[_].goodsnum)
          var g = this.updateCart || 0

          app.util.request({
            url: 'entry/wxapp/index',
            data: {
              controller: 'car.checkout_flushall',
              token: l,
              car_key: u.toString(),
              community_id: i.community_id,
              all_keys_arr: h.toString()
            },
            method: 'POST',
            dataType: 'json',
            success: function(t) {
              if (0 == t.code) {
                if (status.cartNum().then(function(t) {
                  0 == t.code && (i.cartNum = t.data)
                }), '' == n.goodstype) {
                  var a = 1 * n.goodsnum;
                  status.indexListCarCount(s, a), (i.updateCart = g + 1)
                }
              } else {
                if (n.goodsnum = parseInt(n.goodsnum) - 1, 1 == n.isselect) {
                  var e = i.calcVipPrice(i.allcount, n, 1, 'red'),
                    o = i.calcVipPrice(i.carts[c].count, n, 1, 'red')
                  i.carts[c].count = o.toFixed(2), d--, (
                    i.allnum = d,
                      i.allcount = e.toFixed(2)
                  )
                }
                i.carts = i.carts
                wx.showToast({
                  title: t.msg,
                  icon: 'none',
                  duration: 2e3
                })
              }
              addFlag = 1, i.calcAmount()
            }
          })
        }
      },
      changeNumber: function(t) {
        const wx = this.$wx, app = this.$getApp()

        if (!(Object.keys(this.carts).length <= 0)) {
          wx.hideLoading()
          var e = this, o = parseInt(t.currentTarget.dataset.parentid), r = parseInt(t.currentTarget.dataset.index),
            a = t.detail.value, c = e.count_goods(o, r), s = this.carts[o].shopcarts[r], i = s.goodsnum
          console.log(a)
          var n = this.updateCart || 0
          if (0 < a) {
            var d = parseInt(s.max_quantity)
            d < a && (a = d, wx.showToast({
              title: '不能购买更多啦',
              icon: 'none'
            })), s.goodsnum = a, 1 == e.carts[o].shopcarts[r].isselect && (c = e.count_goods(o, r)),
              (this.carts = this.carts, this.allnum = c.allnum, this.allcount = c.allcount)
            var l = wx.getStorageSync('token'), u = [], h = [], p = (this.allnum, this.carts)
            for (var m in p) for (var _ in p[m].shopcarts) u.push(p[m].shopcarts[_].key), h.push(p[m].shopcarts[_].key + '_' + p[m].shopcarts[_].goodsnum)
            app.util.request({
              url: 'entry/wxapp/index',
              data: {
                controller: 'car.checkout_flushall',
                token: l,
                car_key: u.toString(),
                community_id: e.community_id,
                all_keys_arr: h.toString()
              },
              method: 'POST',
              dataType: 'json',
              success: function(t) {
                if (0 == t.code) {
                  if ((e.carts = e.carts), status.cartNum().then(function(t) {
                    0 == t.code && (e.cartNum = t.data)
                  }), '' == e.carts[o].shopcarts[r].goodstype) {
                    var a = 1 * e.carts[o].shopcarts[r].goodsnum, s = e.carts[o].shopcarts[r].id
                    status.indexListCarCount(s, a), (e.updateCart = n + 1)
                  }
                  e.go_record()
                } else {
                  e.carts[o].shopcarts[r].goodsnum = i, 1 == e.carts[o].shopcarts[r].isselect && (c = e.count_goods(o, r)), (
                    e.carts = e.carts,
                      e.allnum = c.allnum,
                      e.allcount = c.allcount
                  ), wx.showToast({
                    title: t.msg,
                    icon: 'none',
                    duration: 2e3
                  })
                }
              }
            })
          } else {
            wx.hideLoading(), (this.carts[o].shopcarts[r].goodsnum = 1) == e.carts[o].shopcarts[r].isselect && (c = e.count_goods(o, r)), (
              this.carts = this.carts,
                this.allnum = c.allnum,
                this.allcount = c.allcount
            )
            l = wx.getStorageSync('token'), u = [], h = [], this.allnum, p = this.carts
            for (var m in p) for (var _ in p[m].shopcarts) u.push(p[m].shopcarts[_].key), h.push(p[m].shopcarts[_].key + '_' + p[m].shopcarts[_].goodsnum)
            app.util.request({
              url: 'entry/wxapp/index',
              data: {
                controller: 'car.checkout_flushall',
                token: l,
                car_key: u.toString(),
                community_id: e.community_id,
                all_keys_arr: h.toString()
              },
              method: 'POST',
              dataType: 'json',
              success: function(t) {
                if (0 == t.code) {
                  if ((e.carts = e.carts), status.cartNum().then(function(t) {
                    0 == t.code && (e.cartNum = t.data)
                  }), '' == e.carts[o].shopcarts[r].goodstype) {
                    var a = 1 * e.carts[o].shopcarts[r].goodsnum, s = e.carts[o].shopcarts[r].id
                    status.indexListCarCount(s, a), (e.updateCart = n + 1)
                  }
                  e.go_record()
                }
              }
            }), e.cofirm_del(o, r)
          }
        }
      },
      count_goods: function(t, a) {
        const wx = this.$wx, app = this.$getApp()

        var s = this, e = this.carts, o = 0, r = 0, c = !0, i = !1, n = void 0
        try {
          for (var d, l = Object.keys(e)[Symbol.iterator](); !(c = (d = l.next()).done); c = !0) {
            e[d.value].shopcarts.forEach(function(t, a) {
              t.isselect && (r = s.calcVipPrice(r, t), o += parseInt(t.goodsnum))
            })
          }
        } catch (t) {
          i = !0, n = t
        } finally {
          try {
            !c && l.return && l.return()
          } finally {
            if (i) throw n
          }
        }
        return {
          allnum: o,
          allcount: r.toFixed(2)
        }
      },
      delgoods: function(t) {
        const wx = this.$wx, app = this.$getApp()

        var d = parseInt(t.currentTarget.dataset.parentid), l = parseInt(t.currentTarget.dataset.index), u = this
        wx.showModal({
          title: '提示',
          content: '确定删除这件商品吗？',
          showCancel:false,
          confirmColor: '#FF0000',
          success: function(t) {
            if (t.confirm) {
              var a = u.carts[d].shopcarts[l], s = a.key
              if (1 == a.isselect) {
                var e = parseInt(u.allnum) - parseInt(a.goodsnum),
                  o = u.calcVipPrice(u.allcount, a, 1, 'red'),
                  r = u.calcVipPrice(u.carts[d].count, a, 1, 'red')
                u.carts[d].count = r.toFixed(2), u.carts[d].goodstype = u.carts[d].goodstype - 1,
                  u.carts[d].goodstypeselect = u.carts[d].goodstypeselect - 1, 0 == u.carts[d].goodstype && console.log(d),
                  u.carts[d].shopcarts.splice(l, 1)
                for (var c = 0, i = 0; i < u.carts.length; i++) for (var n = 0; n < u.carts[i].shopcarts.length; n++) c += u.carts[i].shopcarts[n].goodsnum
                e == c && (u.allselect = !0), (
                  u.carts = u.carts,
                    u.allnum = e,
                    u.allcount = o.toFixed(2),
                    u.allselect = u.allselect
                )
              } else {
                u.carts[d].goodstype = u.carts[d].goodstype - 1, u.carts[d].goodstype,
                  u.carts[d].shopcarts.splice(l, 1)
                for (c = 0, i = 0; i < u.carts.length; i++) for (n = 0; n < u.carts[i].shopcarts.length; n++) c += u.carts[i].shopcarts[n].goodsnum
                u.allnum == c && (u.allselect = !0), (u.carts = u.carts, u.allselect = u.allselect)
              }
              0 == u.carts[d].shopcarts.length && (delete u.carts[d], 0 == Object.keys(u.carts).length && (u.carts = [])), u.del_car_goods(s)
            }
          }
        }), this.go_record()
      },
      del_car_goods: function(t) {
        const wx = this.$wx, app = this.$getApp()

        var a = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0, s = wx.getStorageSync('token'),
          e = this, o = this.updateCart
        console.log('del_car_goods:开始')
        var r = wx.getStorageSync('community').communityId
        console.log('缓存中的：' + r), console.log('使用中的：' + e.community_id), app.util.request({
          url: 'entry/wxapp/index',
          data: {
            controller: 'car.del_car_goods',
            carkey: t,
            community_id: e.community_id,
            token: s
          },
          method: 'POST',
          dataType: 'json',
          success: function(t) {
            0 == t.code && 1 != a && status.cartNum().then(function(t) {
              0 == t.code && (
                e.cartNum = t.data,
                  e.updateCart = o + 1
              )
            })
          }
        })
      },
      deleteGoods: function(t) {
        const wx = this.$wx, app = this.$getApp()

        var i = parseInt(t.currentTarget.dataset.parentid), n = parseInt(t.currentTarget.dataset.index),
          d = t.currentTarget.dataset.islost || 0, l = this
        wx.showModal({
          title: '提示',
          content: '确认删除这件商品吗？',
          confirmColor: '#FF0000',
          success: function(t) {
            if (t.confirm) {
              if (1 == d) {
                var a = l.data, s = a.hasInvalid, e = a.invalidCarts
                console.log(i)
                var o = e[i].shopcarts[n].key
                e[i].shopcarts.splice(n, 1), s -= 1, (l.invalidCarts = e, l.hasInvalid = s), l.del_car_goods(o, 1)
              } else {
                var r = l.carts, c = r[i].shopcarts[n].key
                r[i].shopcarts.splice(n, 1), (l.carts = r), 0 == r[i].shopcarts.length && (delete r[i], 0 == Object.keys(r).length && (
                  l.carts = {}
                )), l.del_car_goods(c)
              }
            }
          }
        })
      },
      clearlose: function() {
        const wx = this.$wx, app = this.$getApp()
        var e = this
        wx.showModal({
          title: '提示',
          content: '确认清空失效商品吗？',
          confirmColor: '#FF0000',
          success: function(t) {
            if (t.confirm) {
              var a = e.invalidCarts
              for (var s in a) {
                a[s].shopcarts.forEach(function(t) {
                  var a = t.key
                  e.del_car_goods(a, 1)
                })
              }
              e.hasInvalid = 0
              e.invalidCarts = {}
            }
          }
        })
      },
      go_record: function() {

        const wx = this.$wx, app = this.$getApp()

        var a = this, t = wx.getStorageSync('token'), s = [], e = [], o = (this.allnum,
          this.carts)
        for (var r in o) {
          for (var c in o[r].shopcarts) {
            o[r].shopcarts[c].isselect && s.push(o[r].shopcarts[c].key),
              e.push(o[r].shopcarts[c].key + '_' + o[r].shopcarts[c].goodsnum)
          }
        }
        app.util.request({
          url: 'entry/wxapp/index',
          data: {
            controller: 'car.checkout_flushall',
            token: t,
            car_key: s.toString(),
            community_id: a.community_id,
            all_keys_arr: e.toString()
          },
          method: 'POST',
          dataType: 'json',
          success: function(t) {
            0 == t.code ? (0, status.cartNum)('', !0).then(function(t) {
              0 == t.code && (a.cartNum = t.data)
            }) : wx.showToast({
              title: t.msg,
              icon: 'none',
              duration: 2e3
            })
          }
        }), a.calcAmount()
      },
      toorder: function() {
        const wx = this.$wx, app = this.$getApp()

        var t = wx.getStorageSync('token'), a = [], s = [], e = this
        if (0 < this.allnum) {
          var o = this.carts
          for (var r in o) {
            for (var c in o[r].shopcarts) {
              o[r].shopcarts[c].isselect && a.push(o[r].shopcarts[c].key),
                s.push(o[r].shopcarts[c].key + '_' + o[r].shopcarts[c].goodsnum)
            }
          }
          app.util.request({
            url: 'entry/wxapp/index',
            data: {
              controller: 'car.checkout_flushall',
              token: t,
              community_id: e.community_id,
              car_key: a.toString(),
              all_keys_arr: s.toString()
            },
            method: 'POST',
            dataType: 'json',
            success: function(t) {
              if (0 == t.code) {
                var a = t.data || 0
                wx.navigateTo({
                  url: '/lionfish_comshop/pages/order/placeOrder?type=dan&is_limit=' + a
                })
              } else {
                e.showCartGoods(), wx.showToast({
                  title: t.msg,
                  icon: 'none',
                  duration: 2e3
                })
              }
            }
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '请选择您要购买的商品',
            confirmColor: '#FF0000',
            success: function(t) {
              t.confirm
            }
          })
        }
      },
      goindex: function() {
        const wx = this.$wx, app = this.$getApp()
        wx.switchTab({
          url: '/lionfish_comshop/pages/index/index'
        })
      },
      calcAmount: function() {
        const wx = this.$wx, app = this.$getApp()
        var t = this, o = t.is_open_vipcard_buy, r = t.is_vip_card_member, c = t.carts, i = t.delivery_tuanz_money,
          n = t.man_free_tuanzshipping, a = t.vipcard_save_money, d = t.canLevelBuy, s = t.level_save_money,
          e = t.allcount, l = 0, u = 0, h = 0, p = Object.getOwnPropertyNames(c), m = [], _ = 0, g = 0, y = 0, f = 0,
          v = 0
        p.forEach(function(t, a) {
          var s = c[t]
          if (0 == (s.is_open_fullreduction || 0)) return !1
          var e = s.shopcarts
          _ = 1 * s.full_money, g = 1 * s.full_reducemoney, e.forEach(function(t) {
            t.isselect && t.can_man_jian && m.push(t), t.isselect && 0 < n && 0 < i && (1 == o && 1 == r && 1 == t.is_take_vipcard ? x += t.card_price * t.goodsnum * 1 : d && 1 == t.is_mb_level_buy ? x += t.levelprice * t.goodsnum * 1 : x += t.currntprice * t.goodsnum * 1),
            1 == o && 1 == r && 1 == t.is_take_vipcard && t.isselect && (f += (t.currntprice - t.card_price) * t.goodsnum * 1),
            1 == d && 1 == t.is_mb_level_buy && t.isselect && (v += (t.currntprice - t.levelprice) * t.goodsnum * 1)
          })
        })
        var x = 0
        m.forEach(function(t) {
          t.isselect && t.can_man_jian && (1 == o && 1 == r && 1 == t.is_take_vipcard ? x += t.card_price * t.goodsnum * 1 : d && 1 == t.is_mb_level_buy ? x += t.levelprice * t.goodsnum * 1 : x += t.currntprice * t.goodsnum * 1)
        }), _ <= x ? u += g : h = _ - x, l = (1 * e - u).toFixed(2), 1 == o && 1 == r ? l = (l - 1 * a).toFixed(2) : d && (l = (l - 1 * s).toFixed(2))
        var k = 1 * (l = l <= 0 ? 0 : l) - this.man_orderbuy_money, b = 1 * e - f, w = 1 * e - v
        console.log('deliveryGoodsTot', y)

        var D = 0;
        (y = l) < 1 * n && (D = 1 * n - y), (
          this.$set(this, 'totalAmount', l),
            this.disAmount = u.toFixed(2),
            this.diffMoney = h.toFixed(2),
            this.canbuy_other = k.toFixed(2),
            this.diffDeliveryMoney = D.toFixed(2),
            this.vipFee = f.toFixed(2),
            this.vipTotal = b.toFixed(2),
            this.levelFee = v.toFixed(2),
            this.levelToTal = w.toFixed(2)
        )
      },
      calcVipPrice: function(t, a) {
        const wx = this.$wx, app = this.$getApp()
        var s = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 0,
          e = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : 'add', o = this,
          r = (o.is_open_vipcard_buy,
            o.is_vip_card_member, o.canLevelBuy, 0 < s ? s : parseFloat(a.goodsnum))
        return 'red' === e && (r *= -1), (t = parseFloat(t)) + parseFloat(a.currntprice) * r
      },
      openSku: function(t) {
        const wx = this.$wx, app = this.$getApp()
        var a = t.detail, s = a.actId, e = a.skuList
        this.addCar_goodsid = s
        var o = e.list || [], r = []
        if (0 < o.length) {
          for (var c = 0; c < o.length; c++) {
            var i = o[c].option_value[0], n = {
              name: i.name,
              id: i.option_value_id,
              index: c,
              idx: 0
            }
            r.push(n)
          }
          for (var d = '', l = 0; l < r.length; l++) l == r.length - 1 ? d += r[l].id : d = d + r[l].id + '_'
          var u = e.sku_mu_list[d]
          this.sku = r, this.sku_val = 1, this.cur_sku_arr = u, this.skuList = a.skuList, this.visible = !0, this.showSku = !0
        } else {
          var h = a.allData
          this.sku = [], this.sku_val = 1, this.skuList = [], this.cur_sku_arr = h
          var p = {
            detail: {
              formId: ''
            }
          }
          p.detail.formId = 'the formId is a mock one', this.gocarfrom(p)
        }
      },
      gocarfrom: function(t) {
        const wx = this.$wx, app = this.$getApp()
        wx.showLoading(), a.collectFormIds(t.detail.formId), this.goOrder()
      },
      goOrder: function() {
        const wx = this.$wx, app = this.$getApp()
        var o = this
        o.can_car && (o.can_car = !1)
        wx.getStorageSync('token')
        var t = wx.getStorageSync('community'), r = o.addCar_goodsid, a = t.communityId, s = o.sku_val,
          e = o.cur_sku_arr, c = '', i = o.updateCart
        e && e.option_item_ids && (c = e.option_item_ids)
        var n = {
          goods_id: r,
          community_id: a,
          quantity: s,
          sku_str: c,
          buy_type: 'dan',
          pin_id: 0,
          is_just_addcar: 1
        }
        util.addCart(n).then(function(t) {
          if (1 == t.showVipModal) {
            var a = t.pop_vipmember_buyimage
            wx.hideLoading(), (o.pop_vipmember_buyimage = a, o.showVipModal = !0, o.visible = !1)
          } else if (3 == t.code || 7 == t.code) {
            wx.showToast({
              title: t.msg,
              icon: 'none',
              duration: 2e3
            })
          } else if (4 == t.code) {
            wx.showToast({
              title: '您未登录',
              duration: 2e3,
              success: function() {
                o.needAuth = !0, o.isEmpty = !0
              }
            })
          } else if (6 == t.code) {
            var s = t.max_quantity || ''
            0 < s && (o.sku_val = s, o.updateCart = i + 1)
            var e = t.msg
            wx.showToast({
              title: e,
              icon: 'none',
              duration: 2e3
            })
          } else {
            o.closeSku(), o.showCartGoods(), status.indexListCarCount(r, t.cur_count),
              (0, status.cartNum)(t.total), (o.cartNum = t.total, o.updateCart = i + 1), wx.showToast({
              title: '已加入购物车',
              image: require('@/assets/images/addShopCart.png')
            })
          }
        }).catch(function(t) {
          app.util.message(t || '请求失败', '', 'error')
        })
      },
      selectSku: function(t) {
        const wx = this.$wx, app = this.$getApp()
        var a = t.currentTarget.dataset.type.split('_'), s = this.sku, e = {
          name: a[3],
          id: a[2],
          index: a[0],
          idx: a[1]
        }
        s.splice(a[0], 1, e), (this.sku = s)
        for (var o = '', r = 0; r < s.length; r++) r == s.length - 1 ? o += s[r].id : o = o + s[r].id + '_'
        var c = this.skuList.sku_mu_list[o]
        this.cur_sku_arr = c
      },
      setNum: function(t) {
        const wx = this.$wx, app = this.$getApp()
        var a = t.currentTarget.dataset.type, s = 1, e = 1 * this.sku_val
        'add' == a ? s = e + 1 : 'decrease' == a && 1 < e && (s = e - 1)
        var o = this.sku, r = this.skuList
        if (0 < o.length) for (var c = '', i = 0; i < o.length; i++) i == o.length - 1 ? c += o[i].id : c = c + o[i].id + '_'
        0 < r.length ? s > r.sku_mu_list[c].canBuyNum && (s -= 1) : s > this.cur_sku_arr.canBuyNum && (s -= 1)
        this.sku_val = s
      },
      skuConfirm: function() {
        const wx = this.$wx, app = this.$getApp()
        this.closeSku(), status.cartNum().then(function(t) {
          0 == t.code && (this.cartNum = t.data)
        })
      },
      closeSku: function() {
        this.visible = 0,
          this.stopClick = !1
      },
      changeTabs: function(t) {
        const wx = this.$wx, app = this.$getApp()
        var a = this, s = t.currentTarget.dataset.idx || 0, e = this, o = e.tabIdx, r = e.carts, c = e.mult_carts
        if (o != s) {
          c[o] = r, r = c[s]
          var i = !0
          0 != Object.keys(r).length && (i = !1), (
            a.tabIdx = s,
              a.mult_carts = c,
              a.isEmpty = i,
              a.carts = r ,
              a.xuan_func()
          )
        }
      },
      vipModal: function(t) {
        this.setData(t.detail)
      }
    }
  }
</script>

<style>
  @import "../../../@feiying/8.less";
  .empty {
    background: #fff;
    padding: 25px 0 40px;
    margin-bottom: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .empty.pos-a {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    padding: 0;
  }

  .empty img {
    width: 100px;
    height: 100px;
    margin-bottom: 15px;
  }

  .empty .h1 {
    color: #666;
    font-size: 15px;
    line-height: 15px;
    margin-bottom: 30px;
  }

  .empty .btn {
    height: 48px;
    border-radius: 10px;
    background: linear-gradient(to right, #ff5041, #ff695c);
    line-height: 48px;
    text-align: center;
    color: #fff;
    font-size: 15px;
    font-weight: bold;
  }

  .checkbox {
    width: 5vw;
    height: 5vw;
    display: flex;
    justify-content: center;
  }

  .checkbox .checkbox-checked {
    font-size: 5vw;
  }

  .shop-cart-content {
    padding: 15px 10px 60px;
  }

  .pt80 {
    padding-top: 50px;
  }

  .pb100 {
    padding-bottom: 70px;
  }

  .shop-cart-content .card-group {
    margin-bottom: 10px;
  }

  .shop-cart-content .card-group .card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 14px 10px;
    border-bottom: 1px solid #efefef;
  }

  .shop-cart-content .card-group .card-header .cart-header-left {
    display: flex;
    align-items: flex-start;
  }

  .shop-cart-content .card-group .card-header .tag {
    font-size: 10px;
    line-height: 14px;
    padding: 0 4px;
    background: #ff5344;
    color: #fff;
    border-radius: 14px;
    white-space: nowrap;
    margin-right: 5px;
    font-weight: 500;
  }

  .shop-cart-content .card-group .card-header .active-msg {
    font-size: 13px;
    line-height: 15px;
    color: #666;
    margin-top: -1px;
  }

  .shop-cart-content .card-group .card-header .i-link {
    display: flex;
    align-items: center;
    flex: 1;
    font-size: 13px;
    line-height: 13px;
    margin-top: 2px;
    color: #ff5344;
    font-weight: 500;
    white-space: nowrap;
  }

  .shop-cart-content .card-group .card-header .i-link .iconfont {
    font-size: 9px;
    margin-left: 3px;
  }

  .fixed-bar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 40px;
    background: #fff;
    z-index: 100;
  }

  .cart-bar {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 10px;
  }

  .fixed-bar .cart-item-checkbox {
    display: flex;

    font-size: 13px;
    align-items: center;
    color: #444;
    white-space: nowrap;
  }

  .fixed-bar .cart-item-checkbox checkbox-group {
    margin-right: 5px;
  }

  .fixed-bar .fixed-bar-center {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    width: 80%;
    flex: 1;
  }

  .fixed-bar .fixed-bar-center .total {
    display: flex;
    text-align: right;
    color: #444;
    font-size: 14px;
    line-height: 15px;
    white-space: nowrap;
  }

  .fixed-bar .fixed-bar-center .total span {
    font-size: 15px;
    font-weight: bold;
    color: #ff5344;
  }

  .fixed-bar .fixed-bar-center .total span.line-through {
    text-decoration-color: #ff5344;
  }

  .fixed-bar .fixed-bar-center .total-detail {
    margin-top: 6px;
    color: #666;
    font-size: 10px;
    line-height: 10px;
  }

  .fixed-bar .fixed-bar-center .total-detail span:last-child {
    margin-left: 10px;
  }

  .fixed-bar .fixed-bar-btn {
    width: 30vw;
    height: 15vw;

    text-align: center;
    line-height: 13vw;
    color: #fff;
    font-size: 4vw;
    background: #ff5344;
    border-radius: 0;
    padding: 0;
    margin: 0vw 0vw 0vw 2vw;
    font-weight: bold;
  }

  .fixed-bar button.fixed-bar-btn::after {
    border: none;
  }

  .fixed-bar button[disabled].fixed-bar-btn {
    background: #ececec;
    color: #666;
    font-size: 14px;
  }

  .checkbox .checkbox-disabled {
    width: 24px;
    height: 24px;
    margin-top: 1px;
  }

  .swiper-out-button-content {
    height: 100%;
    width: 70px;
    border-bottom: 1px solid #efefef;
  }

  .swiper-out-button-content:last-child {
    border: none;
  }

  .swiper-out-button-content .delete-btn {
    padding: 0;
    margin: 0;
    height: 100%;
    background: #ff5344;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 14px;
  }

  .cart-item {
    width: 90vw;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: 1vw 0;
    border-bottom: 1px solid #efefef;
  }

  .cart-item .cart-item-checkbox {
    width: 45px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .cart-item-img {
    width: 25vw;
    height: 25vw;
    margin-right: 2vw;
    position: relative;
  }

  .cart-item-img .i-class {
    width: 90px;
    height: 90px;
  }

  .cart-item-img .tip {
    width: 90px;
    height: 15px;
    color: #fff;
    font-size: 10px;
    line-height: 15px;
    text-align: center;
    position: absolute;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 100;
  }

  .cart-item-content {
    width: 51vw;
    height: 20vw;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .cart-item-content .title {
    font-size: 13px;
    color: #444;
    line-height: 15px;
    margin-bottom: 5px;
    font-weight: bold;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: initial;
    white-space: normal;
  }

  .cart-item-content .cart-item-content-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
  }

  .cart-item-content .cart-item-content-bottom .input-class {
    position: absolute;
    right: 0;
    bottom: 0;
  }

  .cart-item-content .spec {
    font-size: 10px;
    color: #aaa;
    line-height: 10px;
    margin-bottom: 5px;
  }

  .cart-item-content .sale-price {
    color: #ff5344;
    font-size: 10px;
    line-height: 10px;
  }

  .cart-item-content .sale-price span {
    font-size: 18px;
    line-height: 18px;
    margin-left: 2px;
    font-weight: bold;
  }

  .cart-item-content .delete-icon {
    position: absolute;
    right: 0;
    top: -5px;
    display: flex;
    align-items: center;
    font-size: 12px;
    line-height: 12px;
    color: #ff695c;
    padding: 10px;
  }

  .cart-item-content .delete-icon img {
    width: 9px;
    height: 9px;
    margin-right: 6px;
  }

  .isIpx {
    bottom: 60px;
  }

  .cart-item .piece-reduce {
    width: 300px;
    display: flex;
    align-items: flex-start;
    padding: 10px;
    box-sizing: border-box;
    background: #f9f9f9;
    border-radius: 30px;
    margin: 15px auto 0;
    font-size: 12px;
    line-height: 15px;
    color: #666;
    white-space: normal;
  }

  .cart-item .piece-reduce .tag-content {
    height: 15px;
    display: flex;
    align-items: center;
  }

  .cart-item .piece-reduce .tag {
    border-radius: 13px;
    height: 10px;
    padding: 0 4px;
    border: 1px solid #ffa49c;
    font-size: 10px;
    line-height: 10px;
    color: #ff5344;
    margin-right: 8px;
    white-space: nowrap;
    margin-top: 1px;
    font-weight: bold;
  }

  .diff-money {
    margin-right: 5px;
    color: #666;
  }

  .diff-money text {
    color: #ff5344;
  }

  .reduce-item + .normal-item {
    width: 100%;
    border-top: 15px solid #f6f6f6;
  }

  .fullreductionInfo {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 7px 10px;
    border-bottom: 1px solid #efefef;
    background-color: #fff;
    z-index: 100;
  }

  .fixed-bar .fullreductionInfo:first-child {
    box-shadow: 0 -2px 3px -1px #ccc;
  }

  .fullreductionInfo .fr-left {
    display: flex;
    align-items: flex-start;
  }

  .fullreductionInfo .fr-left .tag {
    font-size: 10px;
    line-height: 14px;
    padding: 0 4px;
    background: #ff5344;
    color: #fff;
    border-radius: 3px;
    white-space: nowrap;
    margin-right: 5px;
    font-weight: 500;
  }

  .fullreductionInfo .fr-left .active-msg {
    font-size: 13px;
    line-height: 15px;
    color: #666;
    margin-top: -1px;
  }

  .fullreductionInfo .i-link {
    display: flex;
    align-items: center;
    flex: 1;
    font-size: 13px;
    line-height: 13px;
    margin-top: 2px;
    color: #ff5344;
    font-weight: 500;
    white-space: nowrap;
  }

  .fullreductionInfo .i-link .iconfont {
    font-size: 9px;
    margin-left: 3px;
  }

  .cart-item-img .tag {
    position: absolute;
    left: 0;
    bottom: 0;
    background: linear-gradient(to right, #ff5041, #ff994b);
    border-radius: 0 7px 7px 0;
    padding: 0 6px;
    height: 15px;
    font-size: 10px;
    line-height: 15px;
    color: #fff;
    display: inline-block;
    align-items: center;
    justify-content: center;
    width: auto;
    max-width: 90px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .cart-item-img .tag.pos-top {
    top: 0;
    bottom: initial;
  }

  .cart-tabs {
    display: flex;
    align-items: center;
    text-align: center;
    height: 40px;
    line-height: 40px;
    background: #fff;
    box-shadow: 0 0 3px 0px #ccc;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
  }

  .cart-tabs.hasVip {
    top: 40px;
  }

  .cart-tabs-item {
    position: relative;
    flex: 1;
  }

  .cart-tabs-item.active {
    color: #ff5041;
    font-weight: bold;
    border-bottom: 2px solid #ff5041;
  }

  .h88 {
    height: 40px;
  }

  .h72 {
    height: 30px;
  }

  .vipprice {
    color: #964c00;
    font-size: 10px;
    padding: 1px 4px;
    border-radius: 3px;
    font-weight: bold;
    margin-left: 5px;
    background: linear-gradient(to right, #ffeea2, #ffe689);
  }

  .fixed-vip {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding: 5px 10px 10px;
    background: #fff;
    z-index: 100;
    box-shadow: 0 0 3px 0px #ccc;
  }

  .fixed-vip.hasVip {
    box-shadow: none;
    padding-bottom: 0;
  }

  .fixed-vip .vip {
    margin-top: 0;
  }

  .invalid-head {
    padding: 0 15px;
    line-height: 45px;
    color: #999;
    border-bottom: 1px solid #efefef;
    font-size: 13px;
  }

  .invalid-card-group {
    box-shadow: none !important;
  }

  .invalid-head .iconfont {
    font-size: 14px;
  }

  .invalid-card-group .cart-item-content .title {
    color: #b0b0b0;
  }

  .invalid-tip {
    background: #c6c6c6;
    font-size: 10px;
    padding: 2px 4px;
    color: #fff;
    line-height: 1;
    border-radius: 3px;
  }


</style>
