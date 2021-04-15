import Vue from 'vue'
import SvgIcon from '@/ulink_comshop/components/SvgIcon/index'// svg component

// register globally
Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
