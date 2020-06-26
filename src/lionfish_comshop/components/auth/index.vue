<template>
  <div class="wrap" v-if="needAuth&&loaded">
    <button bindgetuserinfo="bindGetUserInfoTwo" class="auth_bg" openType="getUserInfo" :style="'background: url('+auth_bg+') no-repeat top center;background-size: cover'" v-if="auth_bg"></button>
    <div v-else>
      <img class="auth-login" mode="widthFix" src="@/assets/images/login.png"/>
      <div class="line1">我们的小程序将获取您的以下权限：</div>
      <div class="line2">·获取您的公开信息（昵称和头像等）</div>
      <div class="line3">（如未授权，可能无法正常使用该小程序）</div>
      <i-button bindgetuserinfo="bindGetUserInfo" iClass="confirm" loading="{{btnLoading}}" openType="getUserInfo" v-if="canIUse">确认授权</i-button>
      <div class="updateWx" v-else>请升级微信版本</div>
    </div>
  </div>
  <div :class="['container',(isIpx?'pb20 mb20':'')]" v-else>
    <slot></slot>
  </div>

</template>

<script>
  var util = require("../../utils/index"), wcache = require("../../utils/wcache.js"), flag = !0;

  export default {
    name: 'i-auth',
    props:{
      needAuth: {
        type: Boolean,
        value: !1
      },
      needPosition: {
        type: Boolean,
        value: !0
      },
      navBackUrl: {
        type: String,
        value: "",
      }
    },
    data(){
      return{
        btnLoading: !1,
        isIpx: !1,
        auth_bg: "",
        loaded: !1
      }
    },
    created:function() {
      this.getBg();
      this.$app.globalData.isIpx && (this.isIpx = !0);
    },
    methods: {
      getBg: function() {
        var a = this, t = wcache.get("auth_bg", !1);
        if(t){
          this.auth_bg = t;
            this.loaded = !0
        }else {
          a.$http({
            controller: "index.get_auth_bg"
          }).then(t=>{
            this.loaded =  !0
            0 == t.code && (wcache.put("auth_bg", t.data, 600)
            t.data.data && (this.auth_bg = t.data)

          })
        }
      },
      bindGetUserInfo: function(t) {
        var a = this;
        if (!this.btnLoading) {
          var e = t;
          this.btnLoading = !0
          "getUserInfo:ok" === e.errMsg ? util.login_prosime(a.needPosition).then(function() {
            console.log("授权成功"), a.setData({
              btnLoading: !1
            }), wx.showToast({
              title: "登录成功",
              icon: "success",
              duration: 2e3
            }), a.triggerEvent("authSuccess");
          }).catch(function() {
            console.log("授权失败");
          }) : (wx.showToast({
            title: "授权失败，为了完整体验，获取更多优惠活动，需要您的授权。",
            icon: "none"
          }), this.setData({
            btnLoading: !1
          }));
        }
      },
      bindGetUserInfoTwo: function(t) {
        var a = this;
        (wx.showLoading({
          title: "授权中"
        }), flag) && (flag = !1, "getUserInfo:ok" === t.detail.errMsg ? util.login_prosime().then(function() {
          console.log("授权成功"), wx.hideLoading(), flag = !0, wx.showToast({
            title: "登录成功",
            icon: "success",
            duration: 2e3
          }), a.triggerEvent("authSuccess");
        }).catch(function() {
          flag = !0, wx.hideLoading(), console.log("授权失败");
        }) : (wx.hideLoading(), wx.showToast({
          title: "授权失败，为了完整体验，获取更多优惠活动，需要您的授权。",
          icon: "none"
        }), flag = !0));
      }
    }

  }
</script>

<style scoped>
  .mb20 {
    margin-bottom: 20px;
  }

  .wrap {
    position: fixed;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .wrap .auth-login {
    margin: 50px 0 10px;
    width: 525px;
  }

  .auth_bg {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }

  .auth_bg::after {
    border: 0;
  }

  .wrap .line1 {
    line-height: 10px;
    color: #333;
    font-size: 15px;
  }

  .wrap .line2 {
    line-height: 10px;
    color: #999;
    font-size: 13px;
  }

  .wrap .line3 {
    line-height: 10px;
    color: #333;
    font-size: 12px;
  }

  .wrap .confirm {
    width:80%;
    height: 40px;
    line-height: 40px;
    margin-top: 20px;
    background: #1aad19;
    color: #fff;
    border-radius: 5px;
    font-size: 17px;
    margin-bottom: 40%;
  }

  .button-hover {
    opacity: 0.8;
  }
</style>
