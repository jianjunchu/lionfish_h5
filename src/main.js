import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import vueSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
Vue.use(vueSwiper)

import ITabbar from '@/components/tabbar'
import IToolbar from '@/components/toolbar'
import IModal from '@/components/modal'
import IImg from '@/components/img'
import ITabs from '@/components/tabs'
import INewRushSpu from '@/components/NewRushSpu'
import IButton from '@/components/button'

Vue.component('ITabbar', ITabbar)
Vue.component('IToolbar', IToolbar)
Vue.component('IModal', IModal)
Vue.component('IImg', IImg)
Vue.component('ITabs', ITabs)
Vue.component('INewRushSpu', INewRushSpu)
Vue.component('IButton', IButton)

import '@/styles/index.scss' // global css
import qs from 'qs'
import App from './App'
import store from './store'
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