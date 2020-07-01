import Cookies from 'js-cookie'

const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false
  },
  device: 'desktop',
  toolbarTitle: '',
  tabbarCurrentIdx: 2,
  storageSync: {},
  showToolbarBack: true,
  showToolbarMore: true,
  showToolbarLogo: false,
  showTabbar: true,
  navBgColor: '#F75451',
  navFontColor: '#ffffff',
  cartNum: 10,
  globalData: {
    systemInfo: {},
    isIpx: !1,
    userInfo: {},
    canGetGPS: !0,
    city: {},
    community: {},
    location: {},
    hasDefaultCommunity: !0,
    historyCommunity: [],
    changedCommunity: !1,
    disUserInfo: {},
    changeCity: '',
    timer: 0,
    formIds: [],
    community_id: '',
    placeholdeImg: '',
    cartNum: 0,
    cartNumStamp: 0,
    common_header_backgroundimage: '',
    appLoadStatus: 1,
    goodsListCarCount: [],
    typeCateId: 0,
    navBackUrl: '',
    isblack: 0,
    skin: {
      color: '#ff5344',
      subColor: '#ed7b3a',
      lighter: '#fff9f4'
    }
  }
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  TOGGLE_TOOLBAR_BACK: (state, show) => {
    state.showToolbarBack = show
  },
  TOGGLE_TOOLBAR_MORE: (state, show) => {
    state.showToolbarMore = show
  },
  TOGGLE_TOOLBAR_LOGO: (state, show) => {
    state.showToolbarLogo = show
  },
  SET_APP_TITLE(state, title) {
    state.toolbarTitle = title
  },
  TOGGLE_TABBAR: (state, show) => {
    state.showTabbar = show
  },
  SET_NAV_BG_COLOR: (state, color) => {
    state.navBgColor = color
  },
  SET_NAV_FONT_COLOR: (state, color) => {
    state.navFontColor = color
  },
  SET_CART_NUM: (state, num) => {
    state.cartNum = num
  },
  SET_TABBAR_CURRENT_IDX: (state, idx) => {
    state.tabbarCurrentIdx = idx
  },
  SET_STORAGE_SYNC: (state, storageSync) => {
    state.storageSync = storageSync
  }
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  showToolbarBack({ commit }) {
    commit('TOGGLE_TOOLBAR_BACK', true)
  },
  hideToolbarBack({ commit }) {
    commit('TOGGLE_TOOLBAR_BACK', false)
  },
  showToolbarMore({ commit }) {
    commit('TOGGLE_TOOLBAR_MORE', true)
  },
  hideToolbarMore({ commit }) {
    commit('TOGGLE_TOOLBAR_MORE', false)
  },
  showToolbarLogo({ commit }) {
    commit('TOGGLE_TOOLBAR_MORE', true)
  },
  hideToolbarLogo({ commit }) {
    commit('TOGGLE_TOOLBAR_MORE', false)
  },
  setToolbarTitle({ commit }, title) {
    commit('SET_APP_TITLE', title)
  },
  showTabbar({ commit }) {
    commit('TOGGLE_TABBAR', true)
  },
  hideTabbar({ commit }) {
    commit('TOGGLE_TABBAR', false)
  },
  setNavBgColor({ commit }, color) {
    commit('SET_NAV_BG_COLOR', color)
  },
  setNavFontColor({ commit }, color) {
    commit('SET_NAV_FONT_COLOR', color)
  },
  setCartNum({ commit }, num) {
    commit('SET_CART_NUM', num)
  },
  setTabbarCurrentIdx({ commit }, idx) {
    commit('SET_TABBAR_CURRENT_IDX', idx)
  },
  setStorageSync({ commit }, storageSync) {
    commit('SET_STORAGE_SYNC', storageSync)
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
