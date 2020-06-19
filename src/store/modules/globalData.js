const state = {
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

const mutations = {}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
