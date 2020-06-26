import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'mint-ui/lib/style.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import vueSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

Vue.use(vueSwiper)

import Tabbar from '@/lionfish_comshop/components/tabbar'
import Toolbar from '@/lionfish_comshop/components/toolbar'
import Modal from '@/lionfish_comshop/components/modal'
import Img from '@/lionfish_comshop/components/img'
import Tabs from '@/lionfish_comshop/components/tabs'
import NewRushSpu from '@/lionfish_comshop/components/new-rush-spu'
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

Vue.component('i-tabbar', Tabbar)
Vue.component('i-toolbar', Toolbar)
Vue.component('i-modal', Modal)
Vue.component('i-img', Img)
Vue.component('i-tabs', Tabs)
Vue.component('i-new-rush-spu', NewRushSpu)
Vue.component('i-button', Button)
Vue.component('i-card', card)
Vue.component('i-input-number', InputNumber)
Vue.component('i-index-item', IndexItem)
Vue.component('i-dialog', Dialog)
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

import '@/lionfish_comshop/styles/index.scss' // global css
import qs from 'qs'

import store from './lionfish_comshop/store'
import { http, http_post } from './lionfish_comshop/api/index'
import wx from './lionfish_comshop/utils/wx'
import router from './lionfish_comshop/router'

import App from './App'
import '@/icons' // icon
import '@/permission' // permission control

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
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.prototype.$qs = qs
Vue.prototype.$http = http
Vue.prototype.$http_post = http_post
Vue.prototype.$wx = wx

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

const vue = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)

})
export default vue
