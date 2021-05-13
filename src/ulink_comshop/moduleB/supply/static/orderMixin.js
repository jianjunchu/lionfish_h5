import a from '../../../utils/public'
import status from '../../../utils/index.js'
import util from '../../../utils/index.js'
var wx,app
export default {
  data() {
    return {
      index: 0,
      shipping_no: '',
      expInfo: ''
    }
  },
  created: function() {
    wx = this.$wx;
    app = this.$app;
  },
  methods: {
    actionConfirm: function(content) {
      var that = this;
      return new Promise((resolve, reject)=>{
        wx.showModal({
          title:  that.$t('supply.tishi'),
          content,
          showCancel: true,
          success: (result) => {
            if (result.confirm) {
              resolve();
            } else {
              console.log('用户点击取消')
            }
          }
        })
      })
    },
  
    /**
     * 获取快递列表
     * @param {*} e 
     */
    getExpList: function(e) {
      var that = this;
      this.actionConfirm(that.$t('supply.querencidingdanfahuoma')).then(()=>{
        let token = wx.getStorageSync('token');
        let order_id = e.currentTarget.dataset.id || '';
        wx.showLoading();
        app.util.request({
          url: 'entry/wxapp/index',
          data: {
            controller: 'supplymobile.get_express_list',
            token,
            order_id
          },
          dataType: 'json',
          success: function (res) {
            if (res.code == 0) {
              let expInfo = { order_id, ...res.data };
              that.expInfo = expInfo;
              that.showExpModal = true;
            } else {
              wx.showToast({
                title: res.msg || that.$t('supply.qingqiuchucuo'),
                icon: 'none'
              })
            }
          }
        })
      })
    },
  
    bindPickerChange: function(e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.index = e.detail.value;
    },
  
    bindKeyInput: function (e) {
      this.shipping_no = e.detail.value;
    },
  
    /**
     * 快递确认配送
     * @param {*} order_id 
     */
    expSend: function(e) {
      console.log(e)
      let token = wx.getStorageSync('token');
      let order_id = e.currentTarget.dataset.id || '';
      let expInfo = this.expInfo;
      let index = this.index;
      let shipping_no = this.shipping_no;
      let express_id = expInfo && expInfo.express_list[index].id || '';
      var that = this;
      if(express_id=='') {
        wx.showToast({
          title: that.$t('supply.qingxuanzewuliugongsi'),
          icon: 'none'
        })
        return;
      }
      if(shipping_no=='') {
        wx.showToast({
          title: that.$t('supply.qingshuruwuliudanhao'),
          icon: 'none'
        })
        return;
      }
      wx.showLoading();
      app.util.request({
        url: 'entry/wxapp/index',
        data: {
          controller: 'supplymobile.do_send_order_express',
          token,
          order_id,
          express_id,
          shipping_no
        },
        dataType: 'json',
        success: function (res) {
          if (res.code == 0) {
            wx.showToast({ title: that.$t('supply.querenpeisongchenggong') })
            that.shipping_no = '';
            that.showExpModal = false;
            that.index = 0;
            that.expInfo = '';
            that.initFn();
          } else {
            wx.showToast({
              title: res.msg || that.$t('supply.qingqiuchucuo'),
              icon: 'none'
            })
          }
        }
      })
    },
  
    /**
     * 团长确认配送
     * @param {*} e 
     */
    tuanSend: function(e) {
      var that = this;
      this.actionConfirm(that.$t('supply.querencidingdanfahuoma')).then(()=>{
        let token = wx.getStorageSync('token');
        let order_id = e.currentTarget.dataset.id || '';
        wx.showLoading();
        if(order_id) {
          app.util.request({
            url: 'entry/wxapp/index',
            data: {
              controller: 'supplymobile.supply_do_opsend_tuanz',
              token,
              order_id
            },
            dataType: 'json',
            success: function (res) {
              if (res.code == 0) {
                wx.showToast({ title: that.$t('supply.querenpeisongchenggong') })
                that.initFn();
              } else {
                wx.showToast({
                  title: res.msg || that.$t('supply.qingqiuchucuo'),
                  icon: 'none'
                })
              }
            }
          })
        }
      });
    },
  
    /**
     * 确认送达团长
     * @param {*} e 
     */
    tuanOver: function(e) {
      var that = this;
      this.actionConfirm(that.$t('supply.querensongdatuanzhangma')).then(()=>{
        let token = wx.getStorageSync('token');
        let order_id = e.currentTarget.dataset.id || '';
        wx.showLoading();
        if(order_id) {
          app.util.request({
            url: 'entry/wxapp/index',
            data: {
              controller: 'supplymobile.supply_do_tuanz_over',
              token,
              order_id
            },
            dataType: 'json',
            success: function (res) {
              if (res.code == 0) {
                that.initFn();
              } else {
                wx.showToast({
                  title: res.msg || that.$t('supply.qingqiuchucuo'),
                  icon: 'none'
                })
              }
            }
          })
        }
      });
    },
  
    /**
     * 团长/快递确认收货 最后一步
     * @param {*} e 
     */
    opreceive: function(e) {
      var that = this;
      this.actionConfirm(that.$t('supply.querendingdanshouhuoma')).then(()=>{
        let token = wx.getStorageSync('token');
        let order_id = e.currentTarget.dataset.id || '';
        wx.showLoading();
        if(order_id) {
          app.util.request({
            url: 'entry/wxapp/index',
            data: {
              controller: 'supplymobile.supply_do_opreceive',
              token,
              order_id
            },
            dataType: 'json',
            success: function (res) {
              if (res.code == 0) {
                wx.showToast({ title: that.$t('supply.querenshouhuochenggong') })
                that.initFn();
              } else {
                wx.showToast({
                  title: res.msg || that.$t('supply.qingqiuchucuo'),
                  icon: 'none'
                })
              }
            }
          })
        }
      });
    },
  
    goLink: function (event) {
      let link = event.currentTarget.dataset.link;
      wx.navigateTo({
        url: link
      })
    }
  }
}