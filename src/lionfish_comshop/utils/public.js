var flag = !0
import _this from '../../main.js'

function addToCart(o, a) {
  flag && (flag = !1, _this.$wx.hideLoading(), _this.$wx.showToast({
    title: '已加入购物车',
    image: '@/assets/images/addShopCart.png'
  }), flag = !0, _this.$app.globalData.cartNum += o.goodsNum, a && a(), flag = !0, a && a())
}

function skuConfirm(o, a) {
  a && (a(), _this.$wx.navigateTo({
    url: '/lionfish_comshop/pages/order/placeOrder'
  }))
}

function collectFormIds(o) {
  console.log(o)
  var a = _this.$app.globalData.formIds
  a || (a = []); a.push(o); _this.$app.globalData.formIds = a
  var e = _this.$wx.getStorageSync('token')
  _this .$http({
    controller: 'user.get_member_form_id',
    token: e,
    from_id: o
  }).then(o => {

  })
}

function checkMobile(o) {
  return /^1[1-9][0-9]\d{8}$/.test(o)
}

function isIdCard(o) {
  return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(o)
}

const exp = {
  addToCart: addToCart,
  skuConfirm: skuConfirm,
  collectFormIds: collectFormIds,
  checkMobile: checkMobile,
  isIdCard: isIdCard
}

export default exp
