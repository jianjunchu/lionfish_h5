<template>
  <i-modal @cancel="close" :scrollUp="false" :is-show="false">
    <div class="auth-content">
      <img class="bg" mode="widthFix" :src="newauth_bg_image?newauth_bg_image:require('@/assets/images/auth-bg.png')"/>
      <div class="btn" v-if="canIUse">
        <div bindtap="close" class="close-img" v-if="newauth_cancel_image">
          <img class="img" mode="widthFix" :src="newauth_cancel_image"></img>
        </div>
        <div @click="close" class="close-btn" :style="{'border-color':skin.color,'color':skin.color}" v-else>暂不登录</div>
        <i-button bindgetuserinfo="bindGetUserInfo" iClass="confirm-img" openType="getUserInfo" v-if="newauth_confirm_image">
          <img class="img" mode="widthFix" :src="newauth_confirm_image"/>
        </i-button>
        <i-button bindgetuserinfo="bindGetUserInfo" iClass="confirm" :loading="btnLoading" openType="getUserInfo" :styleStr="'background:'+skin.color" v-else>
          立即登录
        </i-button>
      </div>
      <div class="updateWx" v-else>请升级微信版本</div>
    </div>
  </i-modal>


</template>

<script>

  import util from '../../utils/index.js'

  export default {
    name: '',
    props:{
      needAuth: {
        default: !1
      },
      needPosition: {
        default: !0
      },
      navBackUrl: {
        default: ''
      }
    },
    data() {
      return {
        btnLoading: !1,
        canIUse: true,
        newauth_bg_image:require('@/assets/images/auth-bg.png'),
        newauth_cancel_image:null,
        newauth_confirm_image:null
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

      },
      checkWxLogin: function() {
        return new Promise(function(a, i) {

        });
      }
    }
  }
</script>

<style>
  .auth-content {
    width: 75vw;
    min-height: 50vw;
    max-height: 66vw;
    background: #fff;
    border-radius: 2.4vw;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
  }

  .auth-content .bg {
    width: 75vw;
  }

  .auth-content .h1 {
    color: #000;
    font-size: 3.2vw;
    margin-bottom: 2vw;
    font-weight: bold;
  }

  .auth-content .h2 {
    font-size: 2.4vw;
    line-height: 3.6vw;
    color: #999;
    width: 40.8vw;
    margin-bottom: 4.4vw;
  }

  .auth-content .btn {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 5vw;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    font-size: 3vw;
  }

  .auth-content .btn .close-btn {
    width: 22vw;
    color: #f45b56;
    border: 0.1vw solid #f45b56;
    border-radius: 3.6vw;
    margin: 0 1.5vw;
    padding: 0 15px;
    height: 8vw;
    line-height: 8vw;
  }

  .auth-content .btn .close-img {
    margin: 0 1.5vw;
  }

  .auth-content .btn .img {
    width: 18vw;
  }

  .auth-content .confirm {
    width: 22vw;
    height: 8vw;
    line-height: 8vw;
    color: #fff;
    background: #f45b56;
    border-radius: 3.6vw;
    margin: 0 1.5vw;
    font-size: 3vw;
  }

  .auth-content .confirm-img {
    width: 18vw;
    height: 8vw;
    line-height: 8vw;
    margin: 0 1.5vw;
    padding: 0;
  }

  .updateWx {
    width: 42.5vw;
    height: 8vw;
    line-height: 8vw;
    color: #fff;
    background: #f45b56;
    border-radius: 3.6vw;
    margin: 0 0 3vw;
    text-align: center;
  }
</style>
