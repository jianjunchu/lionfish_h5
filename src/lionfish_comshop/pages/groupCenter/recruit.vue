<template>
  <div>
    <div>
      <div class="section">
        <div class="wxParse">
          <!--<parser html="{{article}}"></parser>-->
          <p v-html="article"></p>
        </div>
        <div @click="goLink" class="apply-btn" data-link="/lionfish_comshop/pages/groupCenter/apply" :style="{color:skin.color,background:skin.light}">
          点击申请
        </div>
      </div>
      <i-aside-btn showHome="true"></i-aside-btn>
    </div>
    <!--<i-new-auth bind:authSuccess="authSuccess" bind:cancel="authModal" :needAuth="needAuth&&showAuthModal" needPosition="false"></i-new-auth>-->
  </div>

</template>

<script>
  import GlobalMixin from '../../mixin/globalMixin.js';
  var status = require('../../utils/index.js');
  var util = require('../../utils/index.js');
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
      this.onLoad();
      this.onShow();
    },
    methods: {
      onLoad: function(t) {
        status.setNavBgColor();
        var e = this;
        this.$http({
            controller: "community.get_apply_page"
          }).then(t=> {
              console.log(t);
            if (0 == t.code) {
              var a = t.data || "";
              e.article= a;
            }

        });
      },
      onShow: function() {
        var a = this;
        util.check_login_new().then(function(t) {
          a.needAuth= !t;
        });
      },
      authModal: function() {
        return !this.needAuth || (this.showAuthModal= !this.showAuthModal, !1);
      },
      authSuccess: function() {
        this.needAuth= !1,
          this.showAuthModal= !1;
      },
      goLink: function(t) {
        if (this.authModal()) {
          var a = t.currentTarget.dataset.link;
//          3 < getCurrentPages().length ? this.$wx.redirectTo({
//            url: a
//          }) : this.$wx.navigateTo({
//            url: a
//          });
          this.$wx.navigateTo({
            url: a
          });
        }
      },
      onShareAppMessage: function() {}
    }
  }
</script>
<style>
  @import "recruit.less";
</style>
