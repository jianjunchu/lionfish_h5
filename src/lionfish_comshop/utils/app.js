import store from '@/lionfish_comshop/store'

module.exports = {
  getApp: function() {
    return store.getters.app
  }

}

