<template>
  <i-modal @click="close" :scrollUp="false" v-show="needAuth">
    <div class="auth-content">
      <img class="bg" mode="widthFix" :src="newauth_bg_image ? newauth_bg_image:'@/assets/images/auth-bg.png'"/>
      <div class="btn">
        <div @click="close" class="close-img" v-if="newauth_cancel_image">
          <img class="img" mode="widthFix" :src="newauth_cancel_image"/>
        </div>
        <div @click="close" class="close-btn" :style="{'border-color':skin.color,'color':skin.color}" v-else>暂不登录
        </div>
        <i-button bindgetuserinfo="bindGetUserInfo" iClass="confirm-img" openType="getUserInfo"
                  v-if="newauth_confirm_image">
          <img class="img" mode="widthFix" :src="newauth_confirm_image"/>
        </i-button>
        <i-button @bindgetuserinfo="bindGetUserInfo" :iClass="confirm" :loading="btnLoading" openType="getUserInfo"
                  :styleStr="'background:'+skin.color" v-else>
          立即登录
        </i-button>
      </div>
    </div>
  </i-modal>

</template>

<script>
  var util = require('../../utils');
  export default {
    name: '',
    data() {
      return {
        btnLoading: !1,
        canIUse: true
      }
    },
    props: {
      needAuth: {
        type: Boolean,
        default: !1
      },
      needPosition: {
        type: Boolean,
        default: !0
      },
      navBackUrl: {
        type: String,
        default: ''

      }
    },
    watch: {
      navBackUrl: (newValue, oldValue) => {
        this.$store.getters.globalData.navBackUrl = newValue
      }
    },
    created: function() {
      this.skin = this.$getApp().globalData.skin

      this.getBg();
    },
    methods: {
      getBg: function() {
        var o = this;
        this.$http({
          controller: "index.get_newauth_bg"
        }).then(t =>{
          this.loaded = !0
          if (0 == t.code) {
            var e = t.data, n = e.newauth_bg_image, a = e.newauth_confirm_image, i = e.newauth_cancel_image;
              o.newauth_bg_image = n
              o.newauth_confirm_image = a
              o.newauth_cancel_image = i
          }

        })
      },
      close: function() {
        this.$emit("cancel");
      },
      bindGetUserInfo: function(t) {
        var e = this;
        if (!this.btnLoading) {
          var n = t.detail;
          this.btnLoading = !0

           "getUserInfo:ok" === n.errMsg ? util.login_prosime(e.data.needPosition).then(function() {
            console.log("授权成功"), e.setData({
              btnLoading: !1
            }), wx.showToast({
              title: "登录成功",
              icon: "success",
              duration: 2e3
            }), e.triggerEvent("authSuccess"), app.globalData.changedCommunity = !0, e.data.needPosition && location.getGps();
          }).catch(function() {
            e.triggerEvent("cancel"), console.log("授权失败");
          }) : (wx.showToast({
            title: "授权失败，为了完整体验，获取更多优惠活动，需要您的授权。",
            icon: "none"
          }), this.triggerEvent("cancel"), this.setData({
            btnLoading: !1
          }));
        }
      },
      checkWxLogin: function() {
        return new Promise(function(a, i) {
          wx.getSetting({
            success: function(n) {
              if (!n.authSetting["scope.userInfo"]) return i({
                authSetting: !1
              });
              wx.getStorage({
                key: "token",
                success: function(e) {
                  util.check_login_new().then(function(t) {
                    return t ? a(!1) : (console.log("过期"), e ? a(e) : i(n));
                  });
                },
                fail: function(t) {
                  return i(t);
                }
              });
            },
            fail: function(t) {
              return i(t);
            }
          });
        });
      }
    }
  }
</script>

<style scoped>

</style>
