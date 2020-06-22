module.exports = {
  showToast: function() {

  },
  showLoading: function() {

  },
  getStorageSync: function(k) {
    return this.$store.getters.app.storageSync[k]
  },
  navigateTo: function(o) {
    this.$router.push(o.url)
  },
  setStorageSync: function(k, v) {
    this.$store.getters.app.storageSync[k] = v
  },
  removeStorageSync: function(k) {
    this.setStorageSync(k, undefined)
  },
  clearStorageSync: function() {
    this.$store.getters.app.storageSync = {}
  },
  setNavigationBarColor: function(option) {
    this.$store.dispatch('app/setNavBgColor', option.backgroundColor)
    this.$store.dispatch('app/setNavFontColor', option.frontColor)
  },
  getLogManager: function() {

  },
  request: function() {

  },
  setStorage: function(option) {
    this.setStorageSync(option.key, option.data)
  }

}

