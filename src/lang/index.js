import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { Locale } from 'vant'
import Cookies from 'js-cookie'
import vantEnUS from 'vant/lib/locale/lang/en-US'
import vantZhCN from 'vant/lib/locale/lang/zh-CN'
import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN' // element-ui lang
import enLocale from './en'
import zhLocale from './zh'

Vue.use(VueI18n)

const messages = {
  en: {
    ...enLocale,
    ...vantEnUS,
    ...elementEnLocale
  },
  zh: {
    ...zhLocale,
    ...vantZhCN,
    ...elementZhLocale
  }
}

const i18n = new VueI18n({
  // set locale
  // options: en | zh | es
  locale: Cookies.get('language') || 'zh',
  // set locale messages
  messages,
  silentTranslationWarn: true
})

// 更新vant组件库本身的语言变化，支持国际化
function vantLocales(lang) {
  if (lang === 'en') {
    Locale.use(lang, vantEnUS)
  } else if (lang === 'zh') {
    Locale.use(lang, zhLocale)
  }
}

export { i18n, vantLocales }
