<template>
  <div class="article">
    <div class="wxParse">
      <p v-html="article"></p>
    </div>
  </div>
</template>

<script>
    import GlobalMixin from '../../mixin/globalMixin.js';
  import status from '../../utils/index.js'
  import util from '../../utils/index.js'
  var app,wx
  export default {
    mixins: [GlobalMixin],
    name:'supply-recruit',
    data() {
      return {
        needAuth:false,
        article:'',
        showAuthModal:false,
        supply_diy_name: ''
      }
    },
    created: function() {
      wx = this.$wx
      app = this.$app
      var that = this;
      wx.setNavigationBarTitle({
        title: that.$t('me.signin'),
        showBack: true
      })
      this.onLoad()
    },
    methods: {
      onLoad: function (options) {
        var that = this;
        let type = options.type || "";
        if (!type) {
          wx.showModal({
            title: that.$t('me.tishi'),
            content: that.$t('me.canshucuowu'),
            showCancel: false,
            confirmColor: '#F75451',
            success(res) {
              if (res.confirm) {
                wx.navigateBack()
              }
            }
          })
          return false;
        }
        let navTitle = {
          vipcard: that.$t('me.vipcard'),
          pintuan: that.$t('me.pintuan'),
          signin: that.$t('me.signin'),
          solitaire: that.$t('me.solitaire')
        }
        wx.setNavigationBarTitle({
          title: navTitle[type] || that.$t('me.guize')
        })
        wx.showLoading();
        this.getData(type);
      },

      getData: function (type) {
        wx.showLoading();
        let urls = {
          vipcard: 'vipcard.get_vipcard_baseinfo',
          pintuan: 'group.pintuan_slides',
          signin: 'signinreward.get_signinreward_baseinfo',
          solitaire: 'solitaire.get_rule'
        }
        var token = wx.getStorageSync('token');
        let that = this;
        app.util.request({
          url: 'entry/wxapp/user',
          data: {
            controller: urls[type],
            token: token
          },
          dataType: 'json',
          success: function (res) {
            wx.hideLoading();
            if (res.code == 0) {
              let article = '';
              if (type == 'vipcard') {
                let { vipcard_buy_pagenotice } = res.data;
                article = vipcard_buy_pagenotice;
              } else if (type == 'pintuan') {
                let { pintuan_publish } = res.data;
                article = pintuan_publish;
              } else if (type == 'signin') {
                let { signinreward_pagenotice } = res.data;
                article = signinreward_pagenotice;
              } else if (type == 'solitaire') {
                let { solitaire_notice } = res.data;
                article = solitaire_notice;
              }
              that.article = article;
            }
          }
        })
      }
    }
  }
</script>

<style scoped>
.article {
  background: #fff;
  padding: 2vw 3vw;
  font-size: 2.8vw;
}
</style>
