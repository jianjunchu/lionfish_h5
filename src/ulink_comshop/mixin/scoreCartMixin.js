import a from '../utils/public'
import status from '../utils/index.js'
import util from '../utils/index.js'
var wx,app
export const scoreCartMixin = {
  data() {
    return {
      visible: false,
      stopClick: false,
      updateCart: 0
    }
  },
  created: function() {
    wx = this.$wx;
    app = this.$app;
  },
  methods: {
    vipModal: function(t) {
      this.t.detail = t.detail;
    },
  
    authModal: function (t = false) {
      if (t.detail) {
        this.needAuth = true;
      }
      if (this.needAuth) {
        this.showAuthModal = !this.showAuthModal;
        return false;
      }
      return true;
    },
  
    openSku: function (t) {
      if (!this.authModal()) return;
      var that = this,
        e = t.detail;
      var goods_id = e.actId;
      var options = e.skuList;
      that.addCar_goodsid = goods_id;
  
      let list = options.list || [];
      let arr = [];
      if (list.length > 0) {
        for (let i = 0; i < list.length; i++) {
          let sku = list[i]['option_value'][0];
          let temp = {
            name: sku['name'],
            id: sku['option_value_id'],
            index: i,
            idx: 0
          };
          arr.push(temp);
        }
        //把单价剔除出来begin
  
        var id = '';
        for (let i = 0; i < arr.length; i++) {
          if (i == arr.length - 1) {
            id = id + arr[i]['id'];
          } else {
            id = id + arr[i]['id'] + "_";
          }
        }
        var cur_sku_arr = options.sku_mu_list[id];
        that.sku = arr;
        that.sku_val = 1;
        that.cur_sku_arr = cur_sku_arr;
        that.skuList = e.skuList;
        that.visible = true;
        that.showSku = true;
  
      } else {
        let goodsInfo = e.skuList;
        that.sku = [];
        that.sku_val = 1;
        that.skuList = [];
        that.cur_sku_arr = goodsInfo;
        let formIds = {
          detail: {
            formId: ""
          }
        };
        formIds.detail.formId = "the formId is a mock one";
        that.gocarfrom(formIds);
      }
    },
  
    /**
     * 确认加入购物车
     */
    gocarfrom: function (e) {
      var that = this;
      var is_just_addcar = 1;
      wx.showLoading();
      a.collectFormIds(e.detail.formId);
      that.goOrder();
    },
  
    goOrder: function () {
      let that = this;
      if (that.can_car) {
        that.can_car = false;
      }
      var token = wx.getStorageSync('token');
      var community = wx.getStorageSync('community');
      var community_id = community.communityId;
  
      var goods_id = that.addCar_goodsid;
      var quantity = that.sku_val;
      var cur_sku_arr = that.cur_sku_arr;
  
      var sku_str = '';
      var is_just_addcar = 1;
  
      if (cur_sku_arr && cur_sku_arr.option_item_ids) {
        sku_str = cur_sku_arr.option_item_ids;
      }
  
      let data = {
        goods_id,
        community_id,
        quantity,
        sku_str,
        buy_type: 'integral',
        pin_id: 0,
        is_just_addcar
      }
      util.addCart(data).then(res=>{
        if(res.showVipModal==1) {
          let { pop_vipmember_buyimage } = res;
        } else {
          if (res.code == 3 || res.code == 7) {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 2000
            })
          } else if (res.code == 4) {
            wx.showToast({
              title: that.$t('score.ninweidenglu'),
              duration: 2000,
              success: () => {
                that.needAuth = true;
              }
            })
          } else if (res.code == 6) {
            var msg = res.data.msg;
            wx.showToast({
              title: msg,
              icon: 'none',
              duration: 2000
            })
          } else {
            if (is_just_addcar == 1) {
              that.closeSku();
              var pages_all = getCurrentPages();
              if (pages_all.length > 3) {
                wx.redirectTo({
                  url: `/ulink_comshop/pages/order/placeOrder?type=integral`,
                })
              } else {
                wx.navigateTo({
                  url: `/ulink_comshop/pages/order/placeOrder?type=integral`,
                })
              }
            }
          }
        }
      })
  
    },
  
    /**
     * 关闭购物车选项卡
     */
    closeSku: function () {
      this.visible = false;
      this.stopClick = false;
    }
  }

}
