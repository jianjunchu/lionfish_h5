import { Dialog, Toast } from 'vant'
import GetSystemInfoSyncResult from '@/ulink_comshop/utils/GetSystemInfoSyncResult'
import axios from 'axios'

import _this from '../../main.js'

export default {

  showToast: function(option) {
    const t = Toast(option.title)
    if (option.hasOwnProperty('success')) {
      option.success(t)
    }
  },
  showLoading: function(option) {
    Toast.loading({
      message: 'Loading...',
      forbidClick: true,
      loadingType: 'spinner'
    })
  },
  hideLoading: function() {
    Toast.clear()
  },
  getStorageSync: function(k) {
    const v = window.localStorage.getItem(k) || ''
    if (v !== '' && v !== 'undefined') {
      return JSON.parse(v)
    }
    return ''
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
    window.localStorage.clear()
  },
  setNavigationBarColor: function(option) {
    console.log(this)
    _this.$store.dispatch('app/setNavBgColor', option.backgroundColor)
    _this.$store.dispatch('app/setNavFontColor', option.frontColor)
  },
  setNavigationBarTitle: function(option) {
    _this.$store.dispatch('app/setToolbarTitle', option.title)
    if (option.showLogo) {
      _this.$store.dispatch('app/showToolbarLogo')
      _this.$store.dispatch('app/hideToolbarBack')
    } else {
      _this.$store.dispatch('app/hideToolbarLogo')
      if (option.showBack) {
        _this.$store.dispatch('app/showToolbarBack')
      } else {
        _this.$store.dispatch('app/hideToolbarBack')
      }
    }
    option.showMore ? _this.$store.dispatch('app/showToolbarMore') : _this.$store.dispatch('app/hideToolbarMore')
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
      if (option.hasOwnProperty('error')) {
        option.error(res)
      }
    })
  },
  setStorage: function(option) {
    this.setStorageSync(option.key, option.data)
  },
  hideTabBar: function() {
    return true
  },
  redirectTo: function(option) {
    _this.$router.replace(option.url)
  },
  blankTo: function(option) {
    window.open(option.url, '_blank')
  },
  switchTab: function(option) {
    _this.$router.push(option.url)
  },
  pageScrollTo: function() {
    window.scrollTo(0, 130)
  },
  getScrollHeight: function() {

  },

  getSystemInfoSync: function() {
    return GetSystemInfoSyncResult
  },
  showModal: function(option) {
    const options = {
      title: option.title,
      message: option.content,
      closeOnPopstate: true,
      closeOnClickOverlay: true

    }

    if (option.hasOwnProperty('showCancelButton')) {
      options.showCancelButton = option.showCancelButton
    } else {
      options.showCancelButton = true
    }

    if (option.hasOwnProperty('confirmText')) {
      options.confirmButtonText = option.confirmText
    }
    if (option.hasOwnProperty('confirmColor')) {
      options.confirmButtonColor = option.confirmColor
    }
    if (option.hasOwnProperty('cancelText')) {
      options.cancelButtonText = option.cancelText
    }
    if (option.hasOwnProperty('cancelColor')) {
      options.cancelButtonColor = option.cancelColor
    }

    Dialog.confirm(options).then(() => {
      option.success({ confirm: true })
    }).catch(() => {
      option.success({ confirm: false })
    })
  },
  getLocation: function(option) {
    const position = this.getStorageSync('position')

    if (position && position.lng && position.lat) {
      const res = { 'longitude': position.lng, 'latitude': position.lat }
      option.success(res)
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        const res = { 'longitude': position.coords.longitude, 'latitude': position.coords.latitude }
        option.success(res)
      }, function(err) {
        const res = { 'longitude': '103.863', 'latitude': '1.38814' }
        option.success(res)
      })
    } else {
      this.showModal({
        title: '提示',
        content: '请开启地位权限',
        showCancel: !1
      })
    }
  },

  navigateBack: function() {
    _this.$router.go(-1)
  },
  reverseGeocoder: function(option) {

    this.request({
      // 请求地址
      url: 'https://apis.map.qq.com/ws/geocoder/v1/',
      // 请求方式
      method: 'get',
      data: {
        coord_type: 5,
        get_poi: 0,
        output: 'json',
        key: 'FRZBZ-EQZRX-P5T4L-ZUEOH-2ULW2-OABSV',
        location: option.location.latitude + '%2C' + option.location.longitude

      },
      dataType: 'json',
      responseType: 'text',
      // 方法
      success: option.success
    })
  },
  uploadFile: function(option) {
    axios.post(option.url, option.formFile, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(res => {
      option.success(res)
    })
  }

}

