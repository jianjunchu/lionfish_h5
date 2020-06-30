import _this from '../../main.js'
import { Dialog, Toast } from 'vant'
import GetSystemInfoSyncResult from '@/lionfish_comshop/utils/GetSystemInfoSyncResult'
import axios from 'axios'

export default {
  showToast: function(option) {
    Toast(option.title)
  },
  showLoading: function(option) {
    Toast.loading({
      message: 'Loading...',
      forbidClick: true,
      loadingType: 'spinner'
    })
  },
  hideLoading: function() {

  },
  getStorageSync: function(k) {
    const v = window.localStorage.getItem(k) || '{}'
    return JSON.parse(v)
  },
  navigateTo: function(o) {
    _this.$router.push(o.url)
  },
  setStorageSync: function(k, v) {
    window.localStorage.setItem(k, JSON.stringify(v))
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
  request: function(option) {
    axios({
      method: option.method,
      url: option.url,
      data: option.data,
      responseType: option.responseType
    }).then(function(res) {
      option.success(res)
    }).catch(function(res) {
      option.error(res)
    })
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
    return GetSystemInfoSyncResult
  },
  showModal: function(option) {
    Dialog.confirm({
      title: option.title,
      message: option.content,
      showCancelButton: option.showCancel
    }).then(() => {
      option.success('confirm')
    }).catch(() => {
      option.success('cancel')
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

