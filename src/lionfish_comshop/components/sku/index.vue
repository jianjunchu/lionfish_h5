<template>
  <i-modal @cancel="close" iClass="sku-content" scrollUp="true" v-show="visible">
    <div class="sku-card">
      <div @click="close" class="close">
        <img class="image" src="@/assets/images/icon-sku-close.png"/>
      </div>
      <div class="sku-header">
        <i-img defaultImage="@/assets/images/placeholder-refund.png" height="80" iClass="sku-img"
               :loadImage="cur_sku_arr.skuImage" width="80"></i-img>
        <div class="sku-desc">
          <div class="sku-title">
            <span class="span">{{cur_sku_arr.spuName}}</span>
          </div>
          <div class="sku-price">
            <div class="sale-price">
              <div v-if="buyType!='integral'">$</div>
              <span class="span">{{cur_sku_arr.actPrice[0]}}</span>>
              .{{cur_sku_arr.actPrice[1]}}
              <div v-if="buyType=='integral'">积分</div>
              <div>
                <div class="market-price">
                  <div v-if="buyType!='integral'">$</div>
                  {{cur_sku_arr.marketPrice[0]}}.{{cur_sku_arr.marketPrice[1]}}
                  <div v-if="buyType=='integral'">积分</div>
                </div>
                <div v-if="buyType!='integral'">
                  <i-vip-price :price="cur_sku_arr.card_price"
                               v-if="vipInfo.is_open_vipcard_buy==1&&vipInfo.is_vip_card_member==1&&cur_sku_arr.is_take_vipcard==1"></i-vip-price>
                  <div v-else-if="vipInfo.is_member_level_buy==1&&cur_sku_arr.is_mb_level_buy==1">
                    <i-vip-price :price="cur_sku_arr.levelprice" type="1"
                                 v-if="vipInfo.is_open_vipcard_buy==1&&vipInfo.is_vip_card_member!=1"></i-vip-price>
                    <i-vip-price :price="cur_sku_arr.levelprice" type="1"
                                 v-if="vipInfo.is_open_vipcard_buy!=1"></i-vip-price>
                  </div>
                </div>
              </div>
              <div class="sku-switch-on">已选择：{{cur_sku_arr.spec}}</div>
            </div>
          </div>
          <div class="sku-spec" v-for="(item,index ) in skuList.list" :key="item.id">
            <div class="title">{{item.name}}</div>
            <div class="spec-list">
          <span @click="selectSku" :class="['span',idx==sku[index]['idx']?'on':'']"
                :data-disabled="item.canBuyNum-value<0" :data-idx="idx"
                :data-type="index+'_'+idx+'_'+value.option_value_id+'_'+value.name"
                v-for="(value,idx) in item.option_value"
                :key="idx">{{value.name}}
          </span>
            </div>
          </div>
          <div class="sku-num-content">
            <div class="title">数量</div>
            <div :class="['i-class', 'i-input-number', 'i-input-number-size-'+size]">
              <div @click="setNum" class="i-input-number-minus num-btn {{value<=min?'i-input-number-disabled':''}}"
                   data-type="decrease">
                <img class="icon-btn" src="@/assets/images/icon-input-reduce.png"/>
              </div>
              <input bindblur="handleBlur" bindfocus="handleFocus" bindinput="changeNumber"
                     :class="['i-input-number-text', min>=max?'i-input-number-disabled':'']" type="number"
                     :value="sku_val"/>
              <div @click="setNum" class="i-input-number-plus num-btn {{value>=max?'i-input-number-disabled':''}}"
                   data-type="add">
                <img class="icon-btn" src="@/assets/images/icon-input-add.png"/>
              </div>
            </div>
            <div class="msg" v-if="skuList[current].isLimit">
              <span v-if="skuList[current].limitMemberNum>-1">每人限{{skuList[current].limitMemberNum}}单</span>
              <span v-if="skuList[current].limitOrderNum>-1">每单限{{skuList[current].limitOrderNum}}份</span>
              <span></span>
            </div>
            <div class="even-num"
                 v-else-if="!skuList[current].isLimit&&skuList[current].canBuyNum-value<=10&&skuList[current].canBuyNum-value>-1">
              还可以购买 {{skuList[current].canBuyNum-value}} 件
            </div>
          </div>
          <form bindsubmit="gocarfrom" reportSubmit="true">
            <button class="sku-confirm" disabled="{{cur_sku_arr.stock==0?true:false}}" formType="submit">
              <div>{{cur_sku_arr.stock==0?'已抢光':'确定'}}</div>
            </button>
          </form>
        </div>
      </div>
    </div>
  </i-modal>

</template>

<script>
  import util from '@/utils/index'

  export default {
    name: '',
    props: {
      visible: {
        type: Boolean,
        default: !1
      },
      cur_sku_arr: {
        type: Object,
        default: {}
      },
      skuList: {
        type: Object,
        default: {}
      },
      sku_val: {
        type: Number,
        default: 1
      },
      sku: {
        type: Array,
        default: []
      },
      goodsid: {
        type: Number,
        default: 0
      },
      type: {
        type: Number,
        default: 0
      },
      buyType: {
        type: String,
        default: ''
      },
      soliId: {
        type: Number,
        default: 0
      },
      vipInfo: {
        type: Object,
        default: {
          is_open_vipcard_buy: 0,
          is_vip_card_member: 0,
          is_member_level_buy: 0
        }
      }
    },
    watch: {
      visible: (e) => {
        this.value = 1
        this.loading = !1
      }
    },
    data() {
      return {
        value: 1,
        loading: !1,
        focusFlag: !1
      }
    },
    methods: {
      close: function() {
        this.$emit('cancel')
      },
      selectSku: function(t) {
        var a = t.currentTarget.dataset.type.split('_'), e = this, i = e.sku, s = e.cur_sku_arr, o = e.skuList,
          u = e.sku_val, r = {
            name: a[3],
            id: a[2],
            index: a[0],
            idx: a[1]
          }
        i.splice(a[0], 1, r)
        for (var n = '', d = 0; d < i.length; d++) d == i.length - 1 ? n += i[d].id : n = n + i[d].id + '_'
        var l = {}
        u > (s = Object.assign(s, o.sku_mu_list[n])).canBuyNum && (l.sku_val = s.canBuyNum,
          this.$wx.showToast({
            title: '最多只能购买' + s.canBuyNum + '件',
            icon: 'none'
          }))
        this.cur_sku_arr = s
        this.sku = i
      },
      setNum: function(t) {
        var a = t.currentTarget.dataset.type, e = 1, i = 1 * this.sku_val
        'add' == a ? e = i + 1 : 'decrease' == a && 1 < i && (e = i - 1)
        var s = this.sku, o = this.skuList
        if (0 < s.length) for (var u = '', r = 0; r < s.length; r++) r == s.length - 1 ? u += s[r].id : u = u + s[r].id + '_'
        0 < o.length ? e > o.sku_mu_list[u].canBuyNum && (e -= 1) : e > this.cur_sku_arr.canBuyNum && (e -= 1)
        this.setData({
          sku_val: e
        })
      },
      gocarfrom: function(t) {
        this.$wx.showLoading(), a.collectFormIds(t.detail.formId), this.goOrder()
      },
      goOrder: function() {

        var r = this, t = r.data
        t.can_car && (t.can_car = !1)
        var a = this.$wx.getStorageSync('community').communityId, n = t.goodsid, e = t.sku_val, i = t.cur_sku_arr,
          s = ''
        i && i.option_item_ids && (s = i.option_item_ids)
        var d = this.buyType ? this.buyType : 'dan', o = this.soliId || '', u = {
          goods_id: n,
          community_id: a,
          quantity: e,
          sku_str: s,
          buy_type: d,
          pin_id: 0,
          is_just_addcar: 1,
          soli_id: o
        }
        util.addCart(u).then(function(t) {
          if (1 == t.showVipModal) {
            var a = t.data.pop_vipmember_buyimage
            this.$wx.hideLoading(), r.$emit('vipModal', {
              pop_vipmember_buyimage: a,
              showVipModal: !0,
              visible: !1
            })
          } else if (3 == t.data.code || 7 == t.data.code) {
            this.$wx.showToast({
              title: t.data.msg,
              icon: 'none',
              duration: 2e3
            })
          } else if ('integral' == d) {
            if (6 == t.data.code) {
              var e = t.data.msg
              this.$wx.showToast({
                title: e,
                icon: 'none',
                duration: 2e3
              })
            } else {
              this.$wx.navigateTo({
                url: '/lionfish_comshop/pages/order/placeOrder?type=integral'
              })
            }
          } else if (4 == t.data.code) {
            this.$wx.showToast({
              title: '您未登录',
              duration: 2e3,
              success: function() {
                r.setData({
                  needAuth: !0
                })
              }
            })
          } else if (6 == t.data.code) {
            var i = t.data.max_quantity || ''
            0 < i && r.setData({
              sku_val: i
            })
            e = t.data.msg
            this.$wx.showToast({
              title: e,
              icon: 'none',
              duration: 2e3
            })
          } else {
            if (r.close(), this.$wx.hideLoading(), 'soitaire' == d) {
              var s = t.data, o = s.goods_total_count, u = s.total
              r.$emit('changeCartNum', {
                goods_total_count: o,
                total: u,
                goods_id: n
              })
            } else {
              t.data.total && r.$emit('changeCartNum', t.data.total)
            }
            this.$wx.showToast({
              title: '已加入购物车',
              image: '@/assets/images/addShopCart.png'
            })
          }
        })
      },
      handleFocus: function() {
        this.focusFlag = !0
      },
      handleBlur: function(t) {
        var a = t.detail, e = parseInt(a.value);
        ('' == e || isNaN(e)) && this.setData({
          sku_val: 1
        })
      },
      changeNumber: function(t) {
        var a = this, e = a.cur_sku_arr, i = a.sku_val, s = 1 * e.stock, o = t.detail
        if (this.focusFlag = !1, o) {
          var u = parseInt(o.value)
          s < (u = u < 1 ? 1 : u) ? (this.$wx.showToast({
            title: '最多只能购买' + s + '件',
            icon: 'none'
          }), i = s) : i = u
        }
        this.sku_val = i
      }
    }
  }
</script>

<style scoped>
  .sku-content {
    position: fixed;
    bottom: 0px;
    z-index: 9999;
  }

  .sku-card {
    width: 100%;
    box-sizing: border-box;
    border-radius: 15px 15px 0 0;
    background: #fff;
    overflow: hidden;
    padding: 20px 20px 0 20px;
  }

  .sku-card .close {
    position: absolute;
    right: 14px;
    top: 14px;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .sku-card .close .image {
    width: 10px;
    height: 10px;
  }

  .sku-card .sku-header {
    display: flex;
    align-items: flex-start;
    margin-bottom: 20px;
  }

  .sku-card .sku-header .sku-img {
    width: 80px;
    height: 80px;
    border: 1px solid #e4e4e4;
    margin-right: 15px;
  }

  .sku-card .sku-header .sku-desc {
    display: flex;
    flex-direction: column;
  }

  .sku-card .sku-header .sku-desc .sku-title {
    width: 60%;
    min-height: 30px;
    margin-bottom: 8px;
    color: #444;
    font-weight: bold;
    position: relative;
  }

  .sku-card .sku-header .sku-desc .sku-title .span {
    position: absolute;
    width: 60%;
    height: 30px;
    left: 0;
    top: 0;
    font-size: 10px;
    line-height: 15px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: initial;
    white-space: normal;
  }

  .sku-card .sku-header .sku-price {
    display: flex;
    align-items: flex-end;
    margin-bottom: 6px;
    font-size: 12px;
    line-height: 12px;
  }

  .sku-card .sku-header .sku-price .sale-price {
    color: #ff5344;
    margin-right: 6px;
    margin-bottom: -2px;
  }

  .sku-card .sku-header .sku-price .sale-price .span {
    font-size: 28px;
    line-height: 28px;
    margin-left: 4pc;
    font-weight: bold;
  }

  .sku-card .sku-header .sku-price .market-price {
    text-decoration: line-through;
    color: #999;
    margin-right: 15px;
  }

  .sku-card .sku-header .sku-switch-on {
    font-size: 12px;
    color: #444;
  }

  .sku-card .sku-msg {
    width: 80%;
    margin: 0 auto 30px;
    border-radius: 8px;
    background: linear-gradient(to right, #fff7f0, #fff4ec);
    display: flex;
    align-items: flex-start;
    padding: 10px;
    color: #ca7e57;
    box-sizing: border-box;
  }

  .sku-card .sku-msg .tag {
    border-radius: 8px;
    border: 1px solid #ffa49c;
    font-size: 10px;
    line-height: 14px;
    font-weight: 500;
    padding: 0 4pc;
    margin-right: 4pc;
    color: #ff5344;
    white-space: nowrap;
    vertical-align: middle;
  }

  .sku-card .sku-msg .sku-activity-msg {
    color: #ca7e57;
    font-size: 12px;
    line-height: 16px;
    width: 80%;
    font-weight: 500;
  }

  .sku-card .sku-spec {
    width: 80%;
    margin: 0 auto 20px;
    display: flex;
    align-items: flex-start;
  }

  .sku-card .sku-spec .title {
    font-size: 10px;
    line-height: 25px;
    margin-right: 4pc;
  }

  .sku-card .sku-spec .spec-list {
    width: 70%;
    display: flex;
    flex: 1;
    flex-wrap: wrap;
  }

  .sku-card .sku-spec .spec-list .span {
    position: relative;
    height: 24px;
    background: #f6f6f6;
    border: 1px solid #f6f6f6;
    text-align: center;
    line-height: 24px;
    font-size: 10px;
    margin: 0 4pc 10px 0;
    color: #666;
    border-radius: 24px;
    padding: 0 15px;
    display: block;
    white-space: nowrap;
  }

  .sku-card .sku-spec .spec-list .on {
    border-color: #ffa49c;
    color: #ff5344;
    background: #fff;
  }

  .sku-card .sku-spec .spec-list .disabled {
    color: #ccc;
  }

  .sku-card .sku-num-content {
    width: 80%;
    margin: 0 auto 26px;
    display: flex;
    align-items: center;
  }

  .sku-card .sku-num-content .title {
    width: 40px;
    font-size: 10px;
    line-height: 25px;
  }

  .sku-card .sku-num-content .msg {
    width: 60%;
    color: #aaa;
    font-size: 10px;
    line-height: 25px;
    text-align: right;
  }

  .sku-card .sku-num-content .even-num {
    width: 60%;
    color: #ff5344;
    font-size: 10px;
    line-height: 25px;
    white-space: nowrap;
    text-align: right;
  }

  .sku-card .sku-confirm {
    width: 100%;
    height: 48px;
    background: linear-gradient(to right, #ff5041, #ff695c);
    line-height: 48px;
    text-align: center;
    color: #fff;
    font-size: 15px;
    margin: 0 0 0 -20px;
    padding: 0;
    border-radius: 0;
    font-weight: bold;
  }

  .sku-card .sku-confirm::after {
    border: 0;
  }

  .i-input-number {
    color: #495060;
    display: flex;
    align-items: center;
    position: relative;
  }

  .i-input-number .num-btn {
    width: 24px;
    height: 24px;
    display: inline-block;
    vertical-align: middle;
  }

  .icon-btn {
    width: 24px;
    height: 24px;
  }

  .i-input-number-minus {
    border-right: none;
    border-radius: 2px 0 0 2px;
  }

  .i-input-number-plus {
    border-left: none;
    border-radius: 0 2px 2px 0;
  }

  .i-input-number-text {
    text-align: center;
    height: 24px;
    width: 33px;
    font-size: 12px;
    line-height: 24px;
    color: #495060;
    z-index: 0;
  }
</style>
