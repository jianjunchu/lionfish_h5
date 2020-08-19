import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import ElementUI from 'element-ui'

import { Image as VanImage } from 'vant'
import { Loading } from 'vant'
import { Uploader } from 'vant'
import { RadioGroup, Radio } from 'vant'
import { DatetimePicker } from 'vant'
import { Popup } from 'vant'
import { Picker } from 'vant'
import { Lazyload } from 'vant'
import { Field } from 'vant'
import { List } from 'vant'
import { Tab, Tabs } from 'vant'
import { ImagePreview } from 'vant'

import 'element-ui/lib/theme-chalk/index.css'
import 'mint-ui/lib/style.css'

import vueSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import Cookies from 'js-cookie'
import less from 'less'

import { i18n, vantLocales } from './lang'
import Tabbar from '@/lionfish_comshop/components/tabbar'
import Toolbar from '@/lionfish_comshop/components/toolbar'
import Modal from '@/lionfish_comshop/components/modal'
import Img from '@/lionfish_comshop/components/img'
import ITabs from '@/lionfish_comshop/components/tabs'
import NewRushSpu from '@/lionfish_comshop/components/new-rush-spu'
import RushSpu from '@/lionfish_comshop/components/rush-spu-col'
import Button from '@/lionfish_comshop/components/button'
import card from '@/lionfish_comshop/components/card'
import InputNumber from '@/lionfish_comshop/components/input-number'
import IndexItem from '@/lionfish_comshop/components/index-item'
import Dialog from '@/lionfish_comshop/components/dialog'
import GoodsInfo from '@/lionfish_comshop/components/goodsInfo'
import NewAuth from '@/lionfish_comshop/components/new-auth'
import NewComer from '@/lionfish_comshop/components/new-comer'
import OrderInfoExpress from '@/lionfish_comshop/components/order/orderInfoExpress'
import OrderNotify from '@/lionfish_comshop/components/order-notify'
import OrderInfo from '@/lionfish_comshop/components/orderInfo'
import OrderStatus from '@/lionfish_comshop/components/orderStatus'
import TradeStatus from '@/lionfish_comshop/components/tradeStatus'
import VipModal from '@/lionfish_comshop/components/vipModal'
import VipPrice from '@/lionfish_comshop/components/vipPrice/vipPrice'
import ChangeCommunity from '@/lionfish_comshop/components/changeCommunity'
import Spike from '@/lionfish_comshop/components/spike'
import AddCartBtn from '@/lionfish_comshop/components/addCartBtn'
import RouterLink from '@/lionfish_comshop/components/router-link'
import CountDown from '@/lionfish_comshop/components/count-down'
import topic from '@/lionfish_comshop/components/topic/topic'
import LoadMore from '@/lionfish_comshop/components/load-more'
import auth from '@/lionfish_comshop/components/auth'
import CommunityItem from '@/lionfish_comshop/components/community-item'
import FixedBottom from '@/lionfish_comshop/components/fixed-bottom'
import RushSpuGig from '@/lionfish_comshop/components/rush-spu-big'

import '@/lionfish_comshop/styles/index.scss' // global css
import qs from 'qs'

import store from './lionfish_comshop/store'
import { http, http_post } from './lionfish_comshop/api/index'
import wx from './lionfish_comshop/utils/wx'
import router from './router'

import App from './App'
import '@/icons' // icon
import '@/permission' // permission control

import VueAMap from 'vue-amap'
Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
  // 高德的key
  key: '0a0885f588aeb852302f18f8633eb61b',
  // 插件集合
  plugin: ['AMap.Geolocation', 'AMap.AMapManager', 'AMap.Geocoder'],
  v: '1.4.4'
})

vantLocales(i18n.locale)

Vue.use(vueSwiper)
Vue.use(VanImage)
Vue.use(Loading)
Vue.use(Uploader)
Vue.use(RadioGroup)
Vue.use(Radio)
Vue.use(DatetimePicker)
Vue.use(Popup)
Vue.use(Picker)
Vue.use(Lazyload)
Vue.use(Field)
Vue.use(List)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(ImagePreview)

Vue.component('i-tabbar', Tabbar)
Vue.component('i-toolbar', Toolbar)
Vue.component('i-modal', Modal)
Vue.component('i-img', Img)
Vue.component('i-tabs', ITabs)
Vue.component('i-new-rush-spu', NewRushSpu)
Vue.component('i-button', Button)
Vue.component('i-card', card)
Vue.component('i-input-number', InputNumber)
Vue.component('i-index-item', IndexItem)
Vue.component('i-dialog', Dialog)
Vue.component('i-goods-info', GoodsInfo)
Vue.component('i-goods-info', GoodsInfo)
Vue.component('i-new-auth', NewAuth)
Vue.component('i-new-comer', NewComer)
Vue.component('i-order-info-express', OrderInfoExpress)
Vue.component('i-order-notify', OrderNotify)
Vue.component('i-order-info', OrderInfo)
Vue.component('i-order-status', OrderStatus)
Vue.component('i-trade-status', TradeStatus)
Vue.component('i-vip-modal', VipModal)
Vue.component('i-vip-price', VipPrice)
Vue.component('i-change-community', ChangeCommunity)
Vue.component('i-spike', Spike)
Vue.component('i-addcart', AddCartBtn)
Vue.component('i-router-link', RouterLink)
Vue.component('i-count-down', CountDown)
Vue.component('i-topic', topic)
Vue.component('i-load-more', LoadMore)
Vue.component('i-auth', auth)
Vue.component('i-community-item', CommunityItem)
Vue.component('i-rush-spu', RushSpu)
Vue.component('i-fixed-bottom', FixedBottom)
Vue.component('i-fixedBottom', FixedBottom)
Vue.component('i-rush-spu-big', RushSpuGig)

Vue.prototype.$getApp = function() {
  return App
}
Vue.prototype.$app = App
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !

 if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}
 */
Vue.use(less)

Vue.prototype.$qs = qs
Vue.prototype.$http = http
Vue.prototype.$http_post = http_post
Vue.prototype.$wx = wx

Vue.use(ElementUI, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

Vue.config.productionTip = false

const vue = new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)

})
export default vue
