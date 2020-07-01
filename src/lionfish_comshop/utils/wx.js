import { Dialog, Toast } from 'vant'
import GetSystemInfoSyncResult from '@/lionfish_comshop/utils/GetSystemInfoSyncResult'
import axios from 'axios'
import store from '../store/'
import router from '../../router/'

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
    router.push(o.url)
  },
  setStorageSync: function(k, v) {
    window.localStorage.setItem(k, JSON.stringify(v))
  },
  removeStorageSync: function(k) {
    this.setStorageSync(k, undefined)
  },
  clearStorageSync: function() {
    store.getters.app.storageSync = {}
  },
  setNavigationBarColor: function(option) {
    console.log(this)
    store.dispatch('app/setNavBgColor', option.backgroundColor)
    store.dispatch('app/setNavFontColor', option.frontColor)
  },
  setNavigationBarTitle: function(option) {
    store.dispatch('app/setToolbarTitle', option.title)
    if (option.showLogo) {
      store.dispatch('app/showToolbarLogo')
      store.dispatch('app/hideToolbarBack')
    } else {
      store.dispatch('app/hideToolbarLogo')
      if (option.showBack) {
        store.dispatch('app/showToolbarBack')
      } else {
        store.dispatch('app/hideToolbarBack')
      }
    }
    option.showMore ? store.dispatch('app/showToolbarMore') : store.dispatch('app/hideToolbarMore')
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
    router.push(option.url)
  },
  switchTab: function(option) {
    router.push(option.url)
  },
  pageScrollTo: function() {

  },
  getScrollHeight: function() {

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
    router.go(-1)
  }

}

