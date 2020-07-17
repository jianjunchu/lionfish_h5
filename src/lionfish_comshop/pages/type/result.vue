<template>
  <div>
    <div class="box">
      <div class="list">
        <i-type-item :actEnd="item.actEnd" @authModal="authModal" @changeCartNum="changeCartNum"
                     @openSku="openSku" @vipModal="vipModal" :needAuth="needAuth" :reduction="reduction"
                     :spuItem="item" :stopClick="stopClick" v-for="(item , index ) in rushList" :key="item.actId"></i-type-item>
        <i-load-more iClass="loadMore" :loading="loadMore" :tip="loadText"
                     v-if="showLoadMore&&!showEmpty"></i-load-more>
      </div>
      <div class="none-rush-list" v-if="showEmpty">
        <img class="img-block" src="@/assets/images/icon-index-empty.png"></img>
        <div class="h1">Please try again</div>
        <!-- <div class="h2">我们正在为您准备更优惠的团购</div> -->
      </div>
      <i-cart-btn :cartNum="cartNum "></i-cart-btn>
    </div>
    <i-new-auth @authSuccess="authSuccess" @cancel="authModal" :needAuth="needAuth&&showAuthModal"
                needPosition="true"></i-new-auth>
    <div class="mask" v-show="visible"></div>
    <div cancel="close" class="sku-content" v-show="visible" :scrollUp="true">
      <div class="sku-card">
        <div @click.stop="closeSku" class="close">
          <img src="@/assets/images/icon-sku-close.png"/>
        </div>
        <div class="sku-header">
          <i-img defaultImage="@/assets/images/placeholder-refund.png" height="80" iClass="sku-img"
                 :loadImage="cur_sku_arr.skuImage" width="80"></i-img>
          <div class="sku-desc">
            <div class="sku-title">
              <span>{{cur_sku_arr.spuName}}</span>
            </div>
            <div class="sku-price">
              <div class="sale-price" v-if="cur_sku_arr && cur_sku_arr.actPrice">
                $
                <span>{{cur_sku_arr.actPrice[0]}}</span>.{{cur_sku_arr.actPrice[1]}}
              </div>
              <div class="market-price" v-if="cur_sku_arr&&cur_sku_arr.marketPrice">${{cur_sku_arr.marketPrice[0]}}.{{cur_sku_arr.marketPrice[1]}}</div>
            </div>
            <div class="sku-switch-on">已选择：{{cur_sku_arr.spec}}</div>
          </div>
        </div>
        <div class="sku-spec" v-for="(item ,index ) in skuList.list" :key="item.id">
          <div class="title">{{item.name}}</div>
          <div class="spec-list">
            <span @click.stop="selectSku" :class="idx==sku[index].idx?'on':''"
                  :data-disabled="item.canBuyNum-value<0" :data-idx="idx"
                  :data-type="index+'_'+idx+'_'+value.option_value_id+'_'+value.name" v-for="(value,idx) in item.option_value"
                   :key="value.idx">{{value.name}}</span>
          </div>
        </div>
        <div class="sku-num-content">
          <div class="title">数量</div>
          <div :class="['i-class', 'i-input-number', 'i-input-number-size-'+size]">
            <div @click.stop="setNum" :class="['i-input-number-minus', value<=min?'i-input-number-disabled':'']"
                  data-type="decrease">
              <img src="@/assets/images/icon-input-reduce.png"/>
            </div>
            <input bindblur="handleBlur" bindfocus="handleFocus"
                   :class="['i-input-number-tex', min>=max?'i-input-number-disabled':'']" disabled="true" type="number"
                   :value="sku_val"/>
            <div @click.stop="setNum" :class="['i-input-number-plus', value>=max?'i-input-number-disabled':'']"
                  data-type="add">
              <img src="@/assets/images/icon-input-add.png"/>
            </div>
          </div>
          <!--<div class="msg" v-if="skuList[current].isLimit">
            <span v-if="skuList[current].limitMemberNum>-1">每人限{{skuList[current].limitMemberNum}}单</span>
            <span v-if="skuList[current].limitOrderNum>-1">每单限{{skuList[current].limitOrderNum}}份</span>
            <span></span>
          </div>
          <div class="even-num"
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

  import util from '../../utils'
  import status from '../../utils'
  import typeItem from './type-item'
  import cartBtn from '../../components/cartBtn'

  var app, wx
  export default {
    components:{[typeItem.name]:typeItem,[cartBtn.name]:cartBtn},
    data() {
      return {
        cartNum: 0,
        showEmpty: !1,
        showLoadMore: !0,
        rushList: [],
        needAuth: !1,
        pageNum: 1,
        keyword: '',
        type: 0,
        good_ids: '',
        gid: 0,
        visible:false,
        showAuthModal:false,
        showVipModal:false,
        cur_sku_arr:[],
        skuList:[]
      }
    },
    created: function() {
      app = this.$getApp()
      wx = this.$wx
      wx.setNavigationBarTitle({
        title: "Goods List",
        showLogo:false,
        showMore:false,
        showBack:true
      })

      const t = this.$route.query
      this.onLoad(t)
    },
    mounted: function() {
      this.onShow()
    },
    methods: {
      onLoad: function(t) {
        wx.showLoading(), this.keyword = t.keyword || '', this.type = t.type || 0, this.good_ids = t.good_ids || '',
          this.gid = t.gid || 0, this.getData()
      },
      onShow: function() {
        var e = this
        util.check_login_new().then(function(t) {
          var a = !t
          e.needAuth = a
          status.cartNum().then(function(t) {
            e.cartNum = t.data
          })
        })
      },
      vipModal: function(t) {
        this.setData(t.detail)
      },
      getData: function() {
        if (!this.hasRefeshin) {
          this.hasRefeshin = !0
          var o = this
          o.showLoadMore = !0
          o.loadMore = !0
          o.loadText = '加载中'

          var t = wx.getStorageSync('token'), a = wx.getStorageSync('community'), e = this.keyword, s = this.type,
            i = this.good_ids, d = this.gid
          app.util.request({
            url: 'entry/wxapp/index',
            data: {
              controller: 'index.load_condition_goodslist',
              token: t,
              pageNum: o.pageNum,
              head_id: a.communityId,
              keyword: e,
              type: s,
              good_ids: i,
              gid: d
            },
            dataType: 'json',
            success: function(t) {
              wx.hideLoading()
              if (0 == t.code) {
                var a = o.rushList.concat(t.list), e = Date.parse(new Date()) / 1e3
                for (var s in a) a[s].end_time!=0 && a[s].end_time < e && (a[s].actEnd = !0)
                var i = {
                  full_money: t.full_money,
                  full_reducemoney: t.full_reducemoney,
                  is_open_fullreduction: t.is_open_fullreduction
                }
                o.pageNum += 1, o.hasRefeshin = !1, (
                  o.showLoadMore = !1,
                  o.rushList = a,
                  o.loadMore =  !1,
                  o.cur_time = t.cur_time,
                  o.reduction = i
                ), 0 == o.rushList.length && (
                  o.showEmpty = !0
                )
              } else {
                1 == t.code ? (1 == o.pageNum && 0 == o.rushList.length && (
                  o.showEmpty = !0
                ), (
                  o.showLoadMore = !0,
                  o.loadMore = !1,
                  o.loadText = '没有更多了'
                ), o.hasRefeshin = !0) : 2 == t.code && (
                  o.needAuth = !0
                )
              }
            },
          })
        }
      },
      authSuccess: function() {
        var t = this
        this.pageNum = 1, (
          t.showEmpty = !1,
          t.showLoadMore = !0,
          t.rushList = [],
          t.needAuth = !1
        )
        t.getData()
      },
      authModal: function(t) {
        var i = this;

        util.check_login_new().then(function(e) {
          if(e){
            i.needAuth = !1
          }else{
            wx.navigateTo({
              url: "/login"
            })
          }
        })

        return !i.needAuth

      },
      openSku: function(e) {
        var a = this, s = e.actId, i = e.skuList
        (a.addCar_goodsid = s)
        var o = i.list || [], d = []
        if (0 < o.length) {
          for (var u = 0; u < o.length; u++) {
            var n = o[u].option_value[0], r = {
              name: n.name,
              id: n.option_value_id,
              index: u,
              idx: 0
            }
            d.push(r)
          }
          for (var h = '', c = 0; c < d.length; c++) c == d.length - 1 ? h += d[c].id : h = h + d[c].id + '_'
          var l = i.sku_mu_list[h]
          (
            a.sku = d,
            a.sku_val = 1,
            a.cur_sku_arr = l,
            a.skuList = e.skuList,
            a.visible = !0,
            a.showSku = !0
          )
        } else {
          var _ = e.allData
          (
            a.sku = [],
            a.sku_val = 1,
            a.skuList = [],
            a.cur_sku_arr = _
          )
          var g = {
            detail: {
              formId: ''
            }
          }
          g.detail.formId = 'the formId is a mock one', a.gocarfrom(g)
        }
      },
      gocarfrom: function(t) {
        wx.showLoading(), a.collectFormIds(t.detail.formId), this.goOrder()
      },
      goOrder: function() {
        var i = this
        i.can_car && (i.can_car = !1)
        wx.getStorageSync('token')
        var t = wx.getStorageSync('community'), a = i.addCar_goodsid, e = t.communityId, s = i.sku_val,
          o = i.cur_sku_arr, d = ''
        o && o.option_item_ids && (d = o.option_item_ids)
        var u = {
          goods_id: a,
          community_id: e,
          quantity: s,
          sku_str: d,
          buy_type: 'dan',
          pin_id: 0,
          is_just_addcar: 1
        }
        util.addCart(u).then(function(t) {
          if (1 == t.showVipModal) {
            var a = t.pop_vipmember_buyimage
            wx.hideLoading(), (
              i.pop_vipmember_buyimage = a,
              i.showVipModal = !0,
              i.visible = !1
            )
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
                i.needAuth = !0
              }
            })
          } else if (6 == t.code) {
            var e = t.msg, s = t.max_quantity || ''
            0 < s && (i.sku_val = s), wx.showToast({
              title: e,
              icon: 'none',
              duration: 2e3
            })
          } else {
            i.closeSku()
            cartNum: t.total
            wx.showToast({
              title: this.$t('cart.yijiarugouwuche'),
              image: '@/assets/images/addShopCart.png'
            })
          }
        }).catch(function(t) {
          wx.showToast({
            title: this.$t('common.qingqiushibai'),
            duration: 2e3,
            success: function() {
              i.needAuth = !0
            }
          })
        })
      },
      selectSku: function(t) {
        var a = t.currentTarget.dataset.type.split('_'), e = this.sku, s = {
          name: a[3],
          id: a[2],
          index: a[0],
          idx: a[1]
        }
        e.splice(a[0], 1, s), (this.sku = e)
        for (var i = '', o = 0; o < e.length; o++) o == e.length - 1 ? i += e[o].id : i = i + e[o].id + '_'
        var d = this.skuList.sku_mu_list[i]
        (this.cur_sku_arr = d)
      },
      setNum: function(t) {
        var a = t.currentTarget.dataset.type, e = 1, s = 1 * this.sku_val
        'add' == a ? e = s + 1 : 'decrease' == a && 1 < s && (e = s - 1)
        var i = this.sku, o = this.skuList
        if (0 < i.length) for (var d = '', u = 0; u < i.length; u++) u == i.length - 1 ? d += i[u].id : d = d + i[u].id + '_'
        0 < o.length ? e > o.sku_mu_list[d].canBuyNum && (e -= 1) : e > this.cur_sku_arr.canBuyNum && (e -= 1)
        (this.sku_val = e)
      },
      closeSku: function() {
        this.visible = 0,
          this.stopClick = !1
      },
      changeCartNum: function(t) {
       this.cartNum = t

      },
      onReachBottom: function() {
        console.log('这是我的底线'), this.getData()
      }
    }

  }
</script>

<style>
  .none-rush-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-bottom: 20vw;
    padding-top: 20vw;
  }

  .none-rush-list .img-block {
    width: 40vw;
    height: 40vw;
    margin-bottom: 10vw;
  }

  .none-rush-list .h1 {
    font-size: 3vw;
    line-height: 3vw;
    color: #444;
    margin-bottom: 3vw;
  }

  .none-rush-list .h2 {
    font-size: 2.4vw;
    line-height: 2.4vw;
    color: #aaa;
  }
</style>
