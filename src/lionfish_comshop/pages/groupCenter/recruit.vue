<template>
  <div>
    <div>
      <div class="section">
        <div class="wxParse">
          <!--<parser html="{{article}}"></parser>-->
          <p v-html="article"></p>
        </div>
        <div @click="goLink" class="apply-btn" data-link="/lionfish_comshop/pages/groupCenter/apply" :style="{color:skin.color,background:skin.light}">
          Apply Now
        </div>
      </div>
      <i-aside-btn showHome="true"></i-aside-btn>
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
    name:'groupcenter-recruit',
    data() {
      return {
        needAuth:false,
        article:'',
        showAuthModal:false

      }
    },
    created: function() {
      wx = this.$wx
      app = this.$app

      wx.setNavigationBarTitle({
        title: 'Me',
        showLogo: false,
        showMore: false,
        showBack: true
      })
      this.onLoad();
      this.onShow();
    },
    methods: {
      onLoad: function(t) {
        status.setNavBgColor();
        var e = this;
        app.util.request({
          url: "entry/wxapp/index",
          data: {
            controller: "community.get_apply_page"
          },
          dataType: "json",
          success: function(t) {
            if (0 == t.code) {
              console.log(t);
              var a = t.data || "";
              e.article = a
            }
          }
        });
      },
      onShow: function() {
        var a = this;
        util.check_login_new().then(function(t) {
          a.needAuth = !t
        });
      },
      authModal: function() {
        if (this.needAuth) {
          this.showAuthModal = !this.showAuthModal
//            return false;
        }
        if (this.needAuth) {
          this.$wx.redirectTo({
            url: '/login'
          })
        }
        return true



      },
      authSuccess: function() {
        this.needAuth = !1, this.showAuthModal = !1
      },
      goLink: function(t) {
        if (this.authModal()) {
          var a = t.currentTarget.dataset.link;
          wx.redirectTo({
            url: a
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
