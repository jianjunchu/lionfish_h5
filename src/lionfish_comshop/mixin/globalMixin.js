

var util = require('../utils/index')

export default {
  data() {
    return {
      isIpx: '',
      isblack: '',
      skin: {
        color: '#ff5344',
        subColor: '#ed7b3a',
        lighter: '#fff9f4'
      }
    }
  },
  mounted() {
    util.getConfig().then(response => {
      const o = response.common_header_backgroundimage || ''
      this.$getApp().globalData.common_header_backgroundimage = o
      const t = {}
      const p = response.skin || ''

      t.color = p
      t.light = util.getLightColor(t.color, 0.4)
      t.lighter = util.getLightColor(t.color, 0.8)
      this.skin = t
      console.log(t)
      console.log(this.skin)
      this.$store.getters.globalData.skin = t
    })
  }
}
