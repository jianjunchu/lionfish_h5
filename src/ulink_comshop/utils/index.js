/**
 * Created by PanJiaChen on 16/11/18.
 */

import _this from '../../main.js'
import { http } from '@/ulink_comshop/api'
import siteInfo from '../../siteinfo'

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
  return new Promise((resolve, reject) => {
    const e = _this.$wx.getStorageSync('token')
    o.controller = 'car.add'
    o.token = e
    _this.$http(o).then(e => {
      if (e.code === 7) {
        const t = e
        const n = t.has_image
        const o = t.pop_vipmember_buyimage
        n === 1 && o && (e.showVipModal = 1, e.pop_vipmember_buyimage = o)
        resolve(e)
      } else {
        resolve(e)
      }
    })
  })
}

function getConfig() {
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
  const wx = _this.$wx
  const app = _this.$getApp()
  const e = wx.getStorageSync('token') || ''
  wx.setStorage({
    key: 'community',
    data: t
  })
  app.globalData.community = t
  wx.navigateBack()
  /*if (t.communityId && t.communityId !== app.globalData.community.communityId) {
    app.globalData.timer.del(), app.globalData.changedCommunity = !0, app.globalData.community = t, app.globalData.refresh = !0, app.globalData.hasDefaultCommunity = !0, wx.setStorage({
      key: 'community',
      data: t
    }), app.globalData.city = a, wx.setStorage({
      key: 'city',
      data: a
    })
    var o = {
      community: t,
      city: a
    }
    var n = app.globalData.historyCommunity || [];
    (n.length === 0 || n[0] && n[0].communityId !== t.communityId) && (n.length > 1 && n.shift(),
    n.push(o), app.globalData.historyCommunity = n, wx.setStorage({
      key: 'historyCommunity',
      data: n
    })), app.globalData.changedCommunity = !0, app.globalData.goodsListCarCount = {},
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
    app.globalData.community.disUserHeadImg || (app.globalData.community = t,
      wx.setStorage({
        key: 'community',
        data: t
      })), app.globalData.changedCommunity = !0, app.globalData.goodsListCarCount = {},
      wx.navigateBack()
  }*/

}

function swithNavBack(a) {
  _this.$app.globalData.community_id = a.communityId
  var t = _this.$app.globalData.navBackUrl
  _this.$wx.navigateBack()
  /**
   if (t) {
        -1 != [ "/ulink_comshop/pages/index/index", "/ulink_comshop/pages/order/shopCart", "/ulink_comshop/pages/user/me", "/ulink_comshop/pages/type/index" ].indexOf(t) ? _this.$wx.switchTab({
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
        url: "/ulink_comshop/pages/index/index"
    });
   */
}

function isIdCard(a) {
  return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(a)
}

function cartNum() {
  return new Promise((resolve, reject) => {
    const n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ''
    const i = arguments.length > 1 && void 0 !== arguments[1] && arguments[1]

    var token = _this.$wx.getStorageSync('token') || ''
    var communityId = _this.$app.globalData.community ? _this.$app.globalData.community.communityId : ''
    _this.$http({
      controller: 'car.count',
      token: token,
      community_id: communityId
    }).then(a => {
      if (a.code === 0) {
        _this.$app.globalData.cartNum = a.data
        _this.$wx.setStorageSync('cartNum', a.data)
      }
      resolve(a)
    })
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
          e.home = t.i1 || '/ulink_comshop/images/icon-tab-index.png'
          e.car = t.i2 || '/ulink_comshop/images/icon-tab-shop.png'
          e.user = t.i3 || '/ulink_comshop/images/icon-tab-me.png', o(e)
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
  return new Promise((resolve, reject) => {
    check_login_new().then(function(a) {
      if (!a) {
        _this.$app.globalData.appLoadStatus = 0
      }
      resolve()
    })
  })
}

function request(o) {
  http(o.data, o.method).then(r => {
    o.success(r)
  }).catch(e => {
    o.fail(e)
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
          url: '/ulink_comshop/pages/position/community'
        }), n('')) : n(o)) : n('')
      }
    })
  })
}

function check_login() {
  var e = _this.$wx.getStorageSync('token')
  var t = _this.$wx.getStorageSync('member_id')
  return !!(e && t != null && t.length > 0)
}

function checkRedirectTo(e, t) {
  var n = !1
  if (t) {
    ['/ulink_comshop/pages/groupCenter/apply', '/ulink_comshop/pages/supply/apply', '/ulink_comshop/pages/user/charge', '/ulink_comshop/pages/order/index', '/ulink_comshop/moduleA/solitaire/index'].indexOf(e) !== -1 && (n = !0)
  }
  return n
}

function check_login_new() {
  return new Promise((resolve, reject) => {
    var e = _this.$wx.getStorageSync('token')

    _this.$http({
      controller: 'user.get_user_info',
      token: e
    }).then(e => {
      if (e && e.data) {
        resolve(true)
      } else {
        resolve(false)
      }
    })
  })
}

function url(e, t) {
  var n = siteInfo.siteroot + '?i=' + siteInfo.uniacid + '&t=' + siteInfo.multiid + '&v=' + siteInfo.version + '&from=wxapp&c=entry&a=h5&do=index&m=lionfish_comshop&sign=' + getSign()
  const sdata_ = []
  for (const attr in e) {
    sdata_.push(`${attr}=${filter(e[attr])}`)
  }
  n = n + (sdata_.length > 0 ? '&' + sdata_.join('&') : '')
  const sdata = []
  for (const attr in t) {
    sdata.push(`${attr}=${filter(t[attr])}`)
  }
  return n + (sdata.length > 0 ? '&' + sdata.join('&') : '')
}

function filter(str) { // 特殊字符转义
  str += '' // 隐式转换
  str = str.replace(/%/g, '%25')
  str = str.replace(/\+/g, '%2B')
  str = str.replace(/ /g, '%20')
  str = str.replace(/\//g, '%2F')
  str = str.replace(/\?/g, '%3F')
  str = str.replace(/&/g, '%26')
  str = str.replace(/\=/g, '%3D')
  str = str.replace(/#/g, '%23')
  return str
}

function getSign(e, t, n) {
  return 'c1b97ac15caab79ab4d10089cd6b82d0'
}

function getMemberInfo(o) {
  var e = _this.$wx.getStorageSync('token')
  request({
    url: 'entry/wxapp/user',
    data: {
      controller: 'user.get_user_info',
      token: e
    },
    dataType: 'json',
    success: function(e) {
      if (e.code === 0) {
        o.success(e)
      } else {
        o.error(e)
      }
    }
  })
}

// eslint-disable-next-line no-unused-vars
function message() {

}
function getUrlQuery(name, url) {
  // eslint-disable-next-line no-sparse-arrays
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(url) || [, ''])[1].replace(/\+/g, '%20')) || null
}

export default {
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
  check_login: check_login,
  setIcon: setIcon,
  getPx: getPx,
  drawText: drawText,
  download: download,
  indexListCarCount: indexListCarCount,
  getConfig: getConfig,
  getCommunityById: getCommunityById,
  loadStatus: loadStatus,
  getCommunityInfo: getCommunityInfo,
  checkRedirectTo: checkRedirectTo,
  check_login_new: check_login_new,
  request: request,
  url: url,
  getMemberInfo: getMemberInfo,
  getUrlQuery: getUrlQuery

}

