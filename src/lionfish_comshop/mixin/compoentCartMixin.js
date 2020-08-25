import a from '../utils/public'
import status from '../utils/index.js'
import util from '../utils/index.js'
import _this from '../../main.js'

var wx, app

export default {
  data: {
    visible: !1,
    stopClick: !1,
    updateCart: 0
  },
  created: function() {
    wx = _this.$wx
    app = _this.$getApp()
  },
  authModal: function() {
    return (arguments.length > 0 && void 0 !== arguments[0] && arguments[0]).detail && this.setData({
      needAuth: !0
    }), !this.needAuth || (this.setData({
      showAuthModal: !this.showAuthModal
    }), !1)
  },
  vipModal: function(t) {
    this.setData(t.detail)
  },
  openSku: function(t) {
    if (this.authModal()) {
      var a = this
      var i = t.detail
      var o = i.actId
      var s = i.skuList
      a.setData({
        addCar_goodsid: o
      })
      var e = s.list || []
      var d = []
      if (e.length > 0) {
        for (var u = 0; u < e.length; u++) {
          var n = e[u].option_value[0]
          var r = {
            name: n.name,
            id: n.option_value_id,
            index: u,
            idx: 0
          }
          d.push(r)
        }
        // eslint-disable-next-line eqeqeq
        for (var c = '', l = 0; l < d.length; l++) l == d.length - 1 ? c += d[l].id : c = c + d[l].id + '_'
        var _ = s.sku_mu_list[c]
        a.setData({
          sku: d,
          sku_val: 1,
          cur_sku_arr: _,
          skuList: i.skuList,
          visible: !0,
          showSku: !0
        })
      } else {
        var m = i.skuList
        a.setData({
          sku: [],
          sku_val: 1,
          skuList: [],
          cur_sku_arr: m
        })
        var h = {
          detail: {
            formId: ''
          }
        }
        h.detail.formId = 'the formId is a mock one', a.gocarfrom(h)
      }
    }
  },
  gocarfrom: function(t) {
    wx.showLoading(), a.collectFormIds(t.detail.formId), this.goOrder()
  },
  goOrder: function() {
    var s = this, t = s.data
    t.can_car && (t.can_car = !1)
    var a = wx.getStorageSync('community').communityId, e = t.addCar_goodsid, i = t.sku_val, o = t.cur_sku_arr, d = '',
      u = s.data.updateCart || 0
    o && o.option_item_ids && (d = o.option_item_ids)
    var n = this.soli_info || '', r = n && n.id || '', c = this.buy_type || 'dan', l = {
      goods_id: e,
      community_id: a,
      quantity: i,
      sku_str: d,
      buy_type: c,
      pin_id: 0,
      is_just_addcar: 1,
      soli_id: r
    }
    util.addCart(l).then(function(t) {
      if (1 == t.showVipModal) {
        wx.hideLoading()
        var a = t.pop_vipmember_buyimage
        s.setData({
          pop_vipmember_buyimage: a,
          showVipModal: !0,
          visible: !1
        })
      } else if (3 == t.code) {
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
            s.setData({
              needAuth: !0
            })
          }
        })
      } else if (6 == t.code || 7 == t.code) {
        var i = t.max_quantity || ''
        0 < i && s.setData({
          sku_val: i
        })
        var o = t.msg
        wx.showToast({
          title: o,
          icon: 'none',
          duration: 2e3
        })
      } else {
        s.closeSku(), status.indexListCarCount(e, t.cur_count), s.setData({
          cartNum: t.total || 0,
          updateCart: u + 1
        }), wx.showToast({
          title: '已加入购物车',
          image: '@/assets/images/addShopCart.png'
        })
      }
    })
  },
  changeCartNum: function(t) {
    var a = t || 0
    this.cartNum = a
  },
  closeSku: function() {
    this.visible = !1,
      this.stopClick = !1
  },
  changeNumber: function(t) {
    this.addCart(t)
  },
  outOfMax: function(t) {
    console.log(t)
    t.detail
    var a = this.spuItem.spuCanBuyNum
    this.number >= a && wx.showToast({
      title: '不能购买更多啦',
      icon: 'none'
    })
  },
  addCart: function(t) {
    var d = t.idx
    var u = this.list
    var a = wx.getStorageSync('token')
    var i = wx.getStorageSync('community')
    var n = u[d].actId
    var o = i.communityId
    var s = this.soli_info || ''
    var r = s && s.id || ''
    var e = this.buy_type || 'dan'
    var c = this
    if (t.type == 'plus') {
      var l = {
        goods_id: n,
        community_id: o,
        quantity: 1,
        sku_str: '',
        buy_type: e,
        pin_id: 0,
        is_just_addcar: 1,
        soli_id: r
      }
      util.addCart(l).then(function(t) {
        if (t.showVipModal == 1) {
          var a = t.pop_vipmember_buyimage
          c.triggerEvent('vipModal', {
            pop_vipmember_buyimage: a,
            showVipModal: !0,
            visible: !1
          })
        } else if (t.code == 3) {
          var i = t.max_quantity
          (u[d].car_count = i) > 0 && c.setData({
            list: u
          })
          wx.showToast({
            title: t.msg,
            icon: 'none',
            duration: 2e3
          })
        } else if (6 == t.code || 7 == t.code) {
          var o = t.max_quantity || ''
          0 < (u[d].car_count = o) && c.setData({
            cartNum: t.total || 0,
            list: u
          })
          var s = t.msg
          wx.showToast({
            title: s,
            icon: 'none',
            duration: 2e3
          })
        } else {
          var e = t.total || 0
          0 < r && (e = t.goods_total_count || 0), u[d].car_count = t.cur_count,
            c.setData({
              cartNum: e,
              list: u
            }), wx.showToast({
            title: '已加入购物车',
            image: '@/assets/images/addShopCart.png'
          }), status.indexListCarCount(n, t.cur_count)
        }
      })
    } else {
      app.util.request({
        url: 'entry/wxapp/user',
        data: {
          controller: 'car.reduce_car_goods',
          token: a,
          goods_id: n,
          community_id: o,
          quantity: 1,
          sku_str: '',
          buy_type: e,
          pin_id: 0,
          is_just_addcar: 1,
          soli_id: r
        },
        dataType: 'json',
        method: 'POST',
        success: function(t) {
          if (t.code == 3) {
            wx.showToast({
              title: t.msg,
              icon: 'none',
              duration: 2e3
            })
          } else {
            var a = t.total || 0
            r > 0 && (a = t.goods_total_count || 0), u[d].car_count = t.cur_count, (c.list = u, c. cartNum = a), status.indexListCarCount(n, t.cur_count)
          }
        }
      })
    }
  }
}
