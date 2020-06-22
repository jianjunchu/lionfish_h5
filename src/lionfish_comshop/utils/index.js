/**
 * Created by PanJiaChen on 16/11/18.
 */

import _this from '../../main.js'

var wcache = require('../utils/wcache')

function getLightColor(e, t) {
  e = e ? e.toUpperCase() : e
  if (!/^\#?[0-9A-F]{6}$/.test(e)) return e
  for (var n = (e = e.replace('#', '')).match(/../g), r = 0; r < 3; r++) {
    var a = parseInt(n[r], 16)
    n[r] = Math.floor((255 - a) * t + a)
  }
  return 'rgb(' + n[0] + ', ' + n[1] + ', ' + n[2] + ')'
}

function addCart(o) {
  const e = _this.$wx.getStorageSync('token')
  _this.http({
    controller: 'car.add',
    token: e
  }).then(e => {
    if (e.code === 7) {
      const t = e
      const n = t.has_image
      const o = t.pop_vipmember_buyimage
      n === 1 && o && (e.showVipModal = 1, e.data.pop_vipmember_buyimage = o)//, i(e);
    } // else i(e);
  })
}

function getConfig() {
  const t = _this.$wx.getStorageSync('token')
  return new Promise((resolve, reject) => {
    _this.$http({
      controller: 'index.get_firstload_msg'
    }).then(t => {
      if (t.code === 0) {
        const e = t
        const o = e.new_head_id
        const n = e.default_head_info
        o > 0 && Object.keys(n).length && _this.$wx.setStorageSync('community', n)
        resolve(t)
      } else {
        reject(t)
      }
    })
  })
}

function changeCommunity(t, a) {
  var e = _this.$wx.getStorageSync('token') || ''
  if (t.communityId && t.communityId !== _this.$app.globalData.community.communityId) {
    _this.$app.globalData.timer.del(), _this.$app.globalData.changedCommunity = !0, _this.$app.globalData.community = t,
      _this.$app.globalData.refresh = !0, _this.$app.globalData.hasDefaultCommunity = !0, _this.$wx.setStorage({
      key: 'community',
      data: t
    }), _this.$app.globalData.city = a, _this.$wx.setStorage({
      key: 'city',
      data: a
    })
    var o = {
      community: t,
      city: a
    }
    var n = _this.$app.globalData.historyCommunity || [];
    (n.length === 0 || n[0] && n[0].communityId !== t.communityId) && (n.length > 1 && n.shift(),
      n.push(o), _this.$app.globalData.historyCommunity = n, _this.$wx.setStorage({
      key: 'historyCommunity',
      data: n
    })), _this.$app.globalData.changedCommunity = !0, _this.$app.globalData.goodsListCarCount = {},
      e ? (console.log('changeCommunity step2'), app.util.request({
        url: 'entry/wxapp/index',
        data: {
          controller: 'index.switch_history_community',
          token: e,
          head_id: t.communityId
        },
        dataType: 'json',
        success: function(a) {
          swithNavBack(t)
        }
      })) : swithNavBack(t)
  } else {
    _this.$app.globalData.community.disUserHeadImg || (_this.$app.globalData.community = t,
      _this.$wx.setStorage({
        key: 'community',
        data: t
      })), _this.$app.globalData.changedCommunity = !0, _this.$app.globalData.goodsListCarCount = {},
      _this.$wx.navigateBack()
  }
}

function swithNavBack(a) {
  _this.$app.globalData.community_id = a.communityId
  var t = _this.$app.globalData.navBackUrl
  _this.$wx.navigateBack()
  /**
   if (t) {
        -1 != [ "/lionfish_comshop/pages/index/index", "/lionfish_comshop/pages/order/shopCart", "/lionfish_comshop/pages/user/me", "/lionfish_comshop/pages/type/index" ].indexOf(t) ? _this.$wx.switchTab({
            url: t,
            success: function() {
                _this.$app.globalData.navBackUrl = "";
            }
        }) : _this.$wx.redirectTo({
            url: t,
            success: function() {
                _this.$app.globalData.navBackUrl = "";
            }
        });
    } else _this.$wx.switchTab({
        url: "/lionfish_comshop/pages/index/index"
    });
   */
}

function isIdCard(a) {
  return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(a)
}

function cartNum() {
  function e(t) {
    var a = _this.$wx.getStorageSync('token') || ''
    _this.$http({
      controller: 'car.count',
      token: a,
      community_id: _this.$app.globalData.community.communityId
    }).then(a => {
      if (a.code === 0) {
        _this.$app.globalData.cartNum = a.data
        _this.$wx.setStorageSync('cartNum', a.data)
      }
    })
  }

  function o(a) {
  }

  const n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ''
  const i = arguments.length > 1 && void 0 !== arguments[1] && arguments[1]
  return new Promise(function(a) {
    if (i) {
      e(a)
    } else {
      const t = new Date().getTime()
      _this.$app.globalData.cartNumStamp < t ? e(a) : (typeof n === 'number' && (_this.$app.globalData.cartNum = n), _this.$app.globalData.cartNum, a(n))
      _this.$app.globalData.cartNumStamp = new Date().getTime() + 6e4
    }
  })
}

function getRect(a, e, o) {
  return new Promise(function(t) {
    _this.$wx.createSelectorQuery().in(a)[o ? 'selectAll' : 'select'](e).boundingClientRect(function(a) {
      o && Array.isArray(a) && a.length && t(a), !o && a && t(a)
    }).exec()
  })
}

function getInNum() {
  return new Promise(function(a, t) {
    const e = Date.parse(new Date())
    const o = parseInt(_this.$wx.getStorageSync('inNum')) || 0
    const n = parseInt(_this.$wx.getStorageSync('inNumExp')) || 0
    var i = new Date(new Date().toLocaleDateString()).getTime()
    e - n > 864e5 || n === 0 ? (console.log('过期了'), o = 1, _this.$wx.setStorage({
      key: 'inNumExp',
      data: i
    })) : o += 1, _this.$wx.setStorage({
      key: 'inNum',
      data: o
    }), a(!(o > 3))
  })
}

function setNavBgColor() {
  const a = wcache.get('navBgColor', 1)
  const t = wcache.get('navFontColor', 1)
  a === 1 || t === 1

    ? _this.$http({
      controller: 'index.get_nav_bg_color'
    }).then(a => {
      if (a.code === 0) {
        const t = a.data || '#F75451'
        const e = a.nav_font_color || '#ffffff'
        _this.$wx.setNavigationBarColor({
          frontColor: e,
          backgroundColor: t
        }), wcache.put('navBgColor', t, 100), wcache.put('navFontColor', e, 100)
      }
    })
    : _this.$wx.setNavigationBarColor({
      frontColor: t,
      backgroundColor: a
    })
}

function setGroupInfo() {
  return new Promise((resolve, reject) => {
    _this.$http({
      controller: 'index.get_group_info'
    }).then(a => {
      if (a.code === 0) {
        var t = a.data
        t.commiss_diy_name = t.commiss_diy_name || '分销'
        t.group_name = t.group_name || '社区'
        t.owner_name = t.owner_name || '团长'
        t.delivery_ziti_name = t.delivery_ziti_name || '到点自提'
        t.delivery_tuanzshipping_name = t.delivery_tuanzshipping_name || '团长配送'
        t.delivery_express_name = t.delivery_express_name || '快递配送'
        wcache.put('groupInfo', t, 600)
        resolve(t)
      } else {
        reject(t)
      }
    })
  })
}

function setIcon() {
  var e = wcache.get('tabList', 1)
  return new Promise(function(o, a) {
    if (e === 1) {
      _this.$http({
        controller: 'index.get_tabbar'
      }).then(a => {
        if (a.code === 0) {
          var t = a.data
          var e = {
            home: '',
            car: '',
            user: ''
          }
          e.home = t.i1 || '/lionfish_comshop/images/icon-tab-index.png'
          e.car = t.i2 || '/lionfish_comshop/images/icon-tab-shop.png'
          e.user = t.i3 || '/lionfish_comshop/images/icon-tab-me.png', o(e)
        }
      })
    } else {
      var t = {
        home: '',
        car: ''
      }
      t.home = e.list[0].iconPath
      t.car = e.list[2].iconPath
      t.user = e.list[3].iconPath
      o(t)
    }
  })
}

function getPx(a) {
  return Math.round(_this.$app.globalData.systemInfo.windowWidth / 375 * a)
}

function drawText(a, t, e, o, n, i) {
  var r = e.split('')
  var c = ''
  var l = []
  a.setFillStyle(t.color)
  a.textAlign = t.textAlign, a.setFontSize(t.size)
  for (var s = 0; s < r.length; s++) {
    a.measureText(c).width < i || (l.push(c), c = '')
    c += r[s]
  }
  l.push(c)
  for (var u = 0; u < l.length; u++) a.fillText(l[u], o, n + 12 * u)
}

function download(a) {
  return new Promise(function(t) {
    _this.$wx.downloadFile({
      url: a,
      success: function(a) {
        a.statusCode === 200 && t(a)
      },
      fail: function(a) {
        console.log(a)
        _this.$wx.hideLoading()
      }
    })
  })
}

function indexListCarCount(a) {
  var t = {
    actId: a,
    num: arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0
  }
  if (a) {
    var e = _this.$app.globalData.goodsListCarCount
    // eslint-disable-next-line eqeqeq
    if (e.length == 0) {
      e.push(t)
    } else {
      var o = e.findIndex(function(a) {
        // eslint-disable-next-line eqeqeq
        return a.actId == t.actId
      })
      // eslint-disable-next-line eqeqeq
      o == -1 ? e.push(t) : e[o].num = t.num
    }
    _this.$app.globalData.goodsListCarCount = e
  }
}

function getCommunityById(n) {
  return new Promise((resolve, reject) => {
    _this.$http({
      controller: 'index.get_community_info',
      community_id: n
    }).then(e => {
      e.code === 0 && resolve(e)
    })
  })
}

function loadStatus() {
  return new Promise(function(e) {

  })
}

function getCommunityInfo() {
  var o = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
  var t = _this.$wx.getStorageSync('token')
  return new Promise((n, e) => {
    _this.$http({
      controller: 'index.load_history_community',
      token: t
    }).then(e => {
      if (e.code === 0) {
        var t = e.list
        // eslint-disable-next-line eqeqeq
        Object.keys(t).length > 0 || t.communityId != 0 ? (_this.$wx.setStorageSync('community', t), _this.$getApp().globalData.community = t, n(t)) : n('')
      } else {
        // eslint-disable-next-line eqeqeq
        e.code == 1 ? (console.log(o), check_login() && void 0 === o.communityId ? (_this.$wx.redirectTo({
          url: '/lionfish_comshop/pages/position/community'
        }), n('')) : n(o)) : n('')
      }
    })
  })
}

function check_login() {
  var e = _this.$wx.getStorageSync('token'); var t = _this.$wx.getStorageSync('member_id')
  return !!(e && t != null && t.length > 0)
}

module.exports = {
  getLightColor: getLightColor,
  addCart: addCart,
  changeCommunity: changeCommunity,
  //  loadStatus: loadStatus,
  isIdCard: isIdCard,
  cartNum: cartNum,
  getRect: getRect,
  getInNum: getInNum,
  setNavBgColor: setNavBgColor,
  setGroupInfo: setGroupInfo,
  setIcon: setIcon,
  getPx: getPx,
  drawText: drawText,
  download: download,
  indexListCarCount: indexListCarCount,
  getConfig: getConfig,
  getCommunityById: getCommunityById,
  loadStatus: loadStatus,
  getCommunityInfo: getCommunityInfo
}

