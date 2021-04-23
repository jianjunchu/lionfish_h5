<template>
  <div>
    <div>
      <div class="section">
        <div class="wxParse">
          <p v-html="article"></p>
        </div>
        <div @click="goLink" class="apply-btn" data-link="/ulink_comshop/pages/supply/apply" :style="{background:skin.color}">
          {{$t('supply.shenqingchengwei')}}{{supply_diy_name}}
        </div>
      </div>
    </div>
    <!--<i-new-auth bind:authSuccess="authSuccess" bind:cancel="authModal" :needAuth="needAuth&&showAuthModal" needPosition="false"></i-new-auth>-->
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
      this.onLoad()
      this.onShow()
    },
    methods: {
      onLoad: function(t) {
        status.setNavBgColor()
        var that = this
        app.util.request({
          url: "entry/wxapp/index",
          data: {
            controller: "supply.get_apply_page"
          },
          dataType: "json",
          success: function(t) {
            var supply_diy_name = t.supply_diy_name || '供应商'
            wx.setNavigationBarTitle({
                title: supply_diy_name,
                showBack: true
              })
            if (t.code == 0) {
              that.article = t.data
              that.supply_diy_name = supply_diy_name
            }
          }
        });
      },
      onShow: function() {
        var that = this
        util.check_login_new().then(function(t) {
          that.needAuth = !t
        });
      },
      authModal: function() {
        if (this.needAuth) {
          this.showAuthModal = !this.showAuthModal
          wx.navigateTo({
            url: '/login'
          })
          return false
        }
        return true
      },
      authSuccess: function() {
        this.needAuth = !1, this.showAuthModal = !1
      },
      goLink: function(t) {
        if (this.authModal()) {
          var url = t.currentTarget.dataset.link
          wx.navigateTo({
            url
          })
        }
      },
      onShareAppMessage: function() {}
    }
  }
</script>
<style>
  @import "recruit.less";
</style>
