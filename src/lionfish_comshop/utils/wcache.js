var dtime = '_deadtime'
import _this from '../../main.js'
export function put(e, t, r) {
  _this.$wx.setStorageSync(e, t)
  var a = parseInt(r)
  if (a > 0) {
    var n = Date.parse(new Date())
    n = n / 1e3 + a
    _this.$wx.setStorageSync(e + dtime, n + '')
  } else {
    _this.$wx.removeStorageSync(e + dtime)
  }
}

export function get(e, t) {
  var r = parseInt(_this.$wx.getStorageSync(e + dtime))
  if (r && parseInt(r) < Date.parse(new Date()) / 1e3) return t || void 0
  var a = _this.$wx.getStorageSync(e)
  return a || t
}

export function remove(e) {
  _this.$wx.removeStorageSync(e)
  _this.$wx.removeStorageSync(e + dtime)
}
export function clear() {
  _this.$wx.clearStorageSync()
}

