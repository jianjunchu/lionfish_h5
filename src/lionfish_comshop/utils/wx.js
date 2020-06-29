import _this from '../../main.js'
import { Indicator, MessageBox,Toast } from 'mint-ui'

export default {
  showToast: function(option) {
    Toast({
      message: option.title,
      position: 'middle',
      duration: 3000
    });
  },
  showLoading: function(option) {
    Indicator.open(option ? option.title : '')
  },
  hideLoading: function() {
    Indicator.close()
  },
  getStorageSync: function(k) {
    return _this.$store.getters.app.storageSync[k] || {}
  },
  navigateTo: function(o) {
    _this.$router.push(o.url)
  },
  setStorageSync: function(k, v) {
    _this.$store.getters.app.storageSync[k] = v
    _this.$store.dispatch('app/setStorageSync', _this.$store.getters.app.storageSync)
  },
  removeStorageSync: function(k) {
    this.setStorageSync(k, undefined)
  },
  clearStorageSync: function() {
    _this.$store.getters.app.storageSync = {}
  },
  setNavigationBarColor: function(option) {
    _this.$store.dispatch('app/setNavBgColor', option.backgroundColor)
    _this.$store.dispatch('app/setNavFontColor', option.frontColor)
  },
  getLogManager: function() {
    return true
  },
  request: function() {

  },
  setStorage: function(option) {
    this.setStorageSync(option.key, option.data)
  },
  hideTabBar: function() {
    return true
  },
  redirectTo: function(option) {
    _this.$router.push(option.url)
  },
  switchTab: function(option) {
    _this.$router.push(option.url)
  },
  pageScrollTo: function() {

  },
  getScrollHeight: function() {

  },
  setNavigationBarTitle: function(a) {
    _this.$store.state.app.toolbarTitle = a.title
  },
  getSystemInfoSync: function() {

  },
  showModal: function(option) {
    MessageBox({
      title: option.title,
      message: option.content,
      showCancelButton: option.showCancel
    }).then(action => {
      option.success(action)
    })
  },
  getLocation: function(option) {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          const latitude = position.coords.latitude
          const longitude = position.coords.longitude
          const data = {
            latitude: latitude,
            longitude: longitude
          }
          resolve(data)
        }, function() {
          reject(arguments)
        })
      } else {
        reject('你的浏览器不支持当前地理位置信息获取')
      }
    })
  },
  navigateBack: function() {
    _this.$router.go(-1)
  }

}

