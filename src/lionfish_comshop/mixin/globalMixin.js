import { http } from '@/lionfish_comshop/api'
import { getLightColor } from '@/lionfish_comshop/utils'

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
    http({
      controller: 'index.get_firstload_msg'
    }).then(response => {
      const o = response.common_header_backgroundimage || ''
      this.$store.getters.globalData.common_header_backgroundimage = o
      const t = {}
      const p = response.data || ''

      t.color = p
      t.light = getLightColor(t.color, 0.4)
      t.lighter = getLightColor(t.color, 0.8)
      this.skin = t
      console.log(t)
      console.log(this.skin)
      this.$store.getters.globalData.skin = t
    })
  }
}
