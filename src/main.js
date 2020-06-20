import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import vueSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

Vue.use(vueSwiper)

import Tabbar from '@/components/tabbar'
import Toolbar from '@/components/toolbar'
import Modal from '@/components/modal'
import Img from '@/components/img'
import Tabs from '@/components/tabs'
import NewRushSpu from '@/components/NewRushSpu'
import Button from '@/components/button'
import InputNumber from '@/components/input-number'
import IndexItem from '@/components/index-item'
import Dialog from '@/components/dialog'

Vue.component('i-tabbar', Tabbar)
Vue.component('i-toolbar', Toolbar)
Vue.component('i-modal', Modal)
Vue.component('i-img', Img)
Vue.component('i-tabs', Tabs)
Vue.component('i-new-rush-spu', NewRushSpu)
Vue.component('i-button', Button)
Vue.component('i-input-number', InputNumber)
Vue.component('i-index-item', IndexItem)
Vue.component('i-dialog', Dialog)

import '@/styles/index.scss' // global css
import qs from 'qs'
import App from './App'
import store from './store'
import { http } from './api/index'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

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

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
