<template>
  <i-modal @click="close" :scrollUp="false" v-show="needAuth">
    <div class="auth-content">
      <img class="bg" mode="widthFix" :src="newauth_bg_image ? newauth_bg_image:'@/assets/images/auth-bg.png'"></img>
      <div class="btn">
        <div @click="close" class="close-img" v-if="newauth_cancel_image">
          <img class="img" mode="widthFix" :src="newauth_cancel_image"/>
        </div>
        <div @click="close" class="close-btn" :style="{'border-color':skin.color,'color':skin.color}" v-else>暂不登录
        </div>
        <i-button bindgetuserinfo="bindGetUserInfo" iClass="confirm-img" openType="getUserInfo"
                  wx:if="{{newauth_confirm_image}}">
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
      this.skin = this.$store.getters.globalData.skin
      this.$http({
          controller: 'index.get_newauth_bg'
        }
      ).then(response => {
        this.loaded = !0
        const e = response.data, n = e.newauth_bg_image, a = e.newauth_confirm_image, i = e.newauth_cancel_image
        this.newauth_bg_image = n
        this.newauth_confirm_image = a
        this.newauth_cancel_image = i
      })

    },
    methods: {
      close: function() {
        this.needAuth = false
      },
      bindGetUserInfo: function() {

      }
    }
  }
</script>

<style scoped>

</style>
