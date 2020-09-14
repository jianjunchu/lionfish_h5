const getters = {
  app: state => state.app,
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  showToolbarBack: state => state.app.showToolbarBack,
  showToolbarMore: state => state.app.showToolbarMore,
  showToolbarLogo: state => state.app.showToolbarLogo,
  showTitle: state => state.app.showTitle,
  toolbarTitle: state => state.app.toolbarTitle,
  showTabbar: state => state.app.showTabbar,
  navBgColor: state => state.app.navBgColor,
  navFontColor: state => state.app.navFontColor,
  globalData: state => state.app.globalData,
  cartNum: state => state.app.cartNum,
  tabbarCurrentIdx: state => state.app.tabbarCurrentIdx

}
export default getters
