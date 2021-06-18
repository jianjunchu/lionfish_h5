<template>
  <div class="article">
    <div class="wxParse">
      <p v-html="article"></p>
    </div>
    <i-new-auth @authSuccess="authSuccess" @cancel="authModal" :needAuth="needAuth&&showAuthModal" needPosition="false"></i-new-auth>
  </div>
</template>

<script>
  import GlobalMixin from '../../mixin/globalMixin.js';
  import status from '../../utils/index.js'
  import util from '../../utils/index.js'
  var app,wx
  export default {
    mixins: [GlobalMixin],
    name:'lucky-rule',
    data() {
      return {
        list: '',
        isShowShareBtn: 1,
        is_share_html: true,
        needAuth: false,
        needPosition: false,
        options: {},
        community: {},
        token: '',
        articleId: 0,
        article: ''
      }
    },
    created: function() {
      wx = this.$wx
      app = this.$app
      const t = this.$route.query
      this.onLoad(t)
    },
    methods: {
      onLoad: function (options) {
        let id = options.id || 0;
        wx.showLoading({ title: '加载中' });
        this.get_about_us(id);
      },

      authModal: function (e = {}) {
        let needAuth = (e && e.detail) || this.needAuth;
        if (thisneedAuth || e.detail) {
          this.showAuthModal = !this.showAuthModal;
          this.needAuth = needAuth;
          return false;
        }
        return true;
      },

      /**
       * 授权成功回调
       */
      authSuccess: function () {
        console.log('authSuccess');
        let that = this;
        that.loadPage();
      },

      /**
       * 获取列表
       */
      get_about_us: function (lottery_id) {
        let that = this;
        app.util.request({
          'url': 'entry/wxapp/index',
          'data': {
            controller: 'lottery.get_lottery_info',
            lottery_id,
          },
          dataType: 'json',
          success: function (res) {
            wx.hideLoading();
            if (res.code == 0) {
              var list = res.data;
              that.article = list.content;
              wx.setNavigationBarTitle({
                title: '活动规则',
                showBack: true
              })
            }
          }
        })
      }  
    }
  }
</script>
<style>
.article {
  background: #fff;
  padding: 2vw 3vw;
  font-size: 3vw;
}
</style>
