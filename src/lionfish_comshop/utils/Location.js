import QQMapWX from './qqmap-wx-jssdk.min.js'

function checkGPS(t) {
  var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null
  this.$wx.authorize({
    scope: 'scope.userLocation',
    success: function() {
      console.log('get GPS success')
      this.$wx.getLocation({
        success: function(t) {
          console.log('get GPS location success')
          this.$app.globalData.location = {
            lat: t.latitude,
            lng: t.longitude
          }
          this.$app.globalData.canGetGPS = !0
          this.$wx.setStorage({
            key: 'latitude',
            data: t.latitude
          })
          this.$wx.setStorage({
            key: 'longitude',
            data: t.longitude
          })
        },
        fail: function() {
          console.log('get GPS location fail')
          this.$app.globalData.canGetGPS = !1
        }
      })
    },
    fail: function() {
      console.log('get GPS fail checkGPS')
      this.$app.globalData.canGetGPS = !1
      console.log(e())
    }
  })
}

function openSetting(t) {
  return new Promise(function(e, o) {
    this.$wx.showModal({
      content: '为了更好的服务您,需要您的地理位置',
      confirmText: '去开启',
      confirmColor: '#FF673F',
      success: function(t) {
        t.confirm ? this.$wx.openSetting({
          success: function(t) {
            console.log(t)
            t.authSetting['scope.userLocation'] ? this.$wx.getLocation({
              success: function(t) {
                console.log('get GPS location success')
                this.$getApp().globalData.location = {
                  lat: t.latitude,
                  lng: t.longitude
                }
                this.$getApp().globalData.canGetGPS = !0
                e(t)
              },
              fail: function(t) {
                console.log('get GPS fail openSetting')
                this.$getApp().globalData.canGetGPS = !1
                o('取消', t)
              }
            }) : o('未开启')
          },
          fail: function(t) {
            o(t)
          }
        }) : t.cancel && (o('用户点击取消'), console.log('用户点击取消'))
      }
    })
  })
}

function getGps() {
  var o = this
  return new Promise(function(e, t) {
    o.$wx.getLocation({
      type: 'gcj02',
      success: function(t) {
        e(t)
        t.latitude
        t.longitude
        o.$wx.setStorage({
          key: 'latitude',
          data: t.latitude
        })
        o.$wx.setStorage({
          key: 'longitude',
          data: t.longitude
        })
      },
      fail: function(t) {
        t.errMsg === 'getLocation:fail auth deny' ? o.openSetting().then(function(t) {
          console.log(t)
        }).catch(function() {
          console.log(t)
        }) : console.log(t)
      }
    })
  })
}

function getGpsLocation(o, n) {
  var i = this;
  var a = this.$wx.getStorageSync('tx_map_key')
  return a ? new Promise(function(e, t) {
    analyzeGps(a, o, n).then(function(t) {
      e(t)
    })
  }) : new Promise(function(e, t) {
    i.$app.util.request({
      url: 'entry/wxapp/index',
      data: {
        controller: 'index.get_community_config'
      },
      dataType: 'json',
      success: function(t) {
        t.code === 0 && (a = t.tx_map_key, this.$wx.setStorage({
          key: 'tx_map_key',
          data: a
        }), analyzeGps(a, o, n).then(function(t) {
          e(t)
        }))
      }
    })
  })
}

function analyzeGps(t, e, n) {
  var a = new QQMapWX({
    key: t
  })
  return new Promise(function(o, t) {
    a.reverseGeocoder({
      location: {
        latitude: e,
        longitude: n
      },
      success: function(t) {
        var e = t.result.address_component
        o(e)
      }
    })
  })
}

let exp = {
  checkGPS: checkGPS,
  openSetting: openSetting,
  getGps: getGps,
  getGpsLocation: getGpsLocation
}

export default exp
