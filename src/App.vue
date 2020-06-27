<template>
  <div id="app" style="overflow-x: hidden;">
    <i-toolbar ref="toolbar"></i-toolbar>
    <router-view style="margin-top:48px"/>
    <i-tabbar v-show="getShowTabbar" ref="tabbar" :currentIdx="getTabbarCurrentIdx" :tabbarRefresh="tabbarRefresh"></i-tabbar>

  </div>
</template>

<style lang="less">
  @import "App.less";

</style>
<script>
  import {getToken} from './lionfish_comshop/utils/auth'

  var util = require('@/lionfish_comshop/utils'), timeQueue = require('@/lionfish_comshop/utils/timeQueue') ,wx = require('@/lionfish_comshop/utils/wx')
  export default {
    name: 'App',
    data() {
      return {
        tabbarRefresh: false,
        currentIdx: 0,
      }
    },
    util: util,
    globalData: {
      systemInfo: {},
      isIpx: !1,
      userInfo: {},
      canGetGPS: !0,
      city: {},
      community: {},
      location: {},
      hasDefaultCommunity: !0,
      historyCommunity: [],
      changedCommunity: !1,
      disUserInfo: {},
      changeCity: '',
      timer: 0,
      formIds: [],
      community_id: '',
      placeholdeImg: '',
      cartNum: 0,
      cartNumStamp: 0,
      common_header_backgroundimage: '',
      appLoadStatus: 1,
      goodsListCarCount: [],
      typeCateId: 0,
      navBackUrl: '',
      isblack: 0,
      skin: {
        color: '#8ED9D1',
        subColor: '#ed7b3a',
        lighter: '#fff9f4'
      }
    },
    created:function(){
      this.$store.getters.app.storageSync['token'] = getToken()
    },
    mounted: function() {
      this.$getApp().globalData.timer = new timeQueue.default();
      var t = this.$store.getters.app.storageSync['userInfo']
      this.$getApp().globalData.userInfo = t;
      var e = this.$store.getters.app.storageSync["community"];
      this.$getApp().globalData.hasDefaultCommunity = !!e;
      this.$getApp().globalData.community = e;
      this.$getApp().globalData.systemInfo = this.$wx.getSystemInfoSync();
      var o = this.$getApp().globalData.systemInfo ? this.globalData.systemInfo.model : "";
      this.$getApp().globalData.isIpx = -1 < o.indexOf("iPhone X") || -1 < o.indexOf("unknown<iPhone");


    },
    computed: {

      getShowTabbar() {
        return this.$store.getters.showTabbar
      },

      getTabbarCurrentIdx() {

        return this.$store.getters.tabbarCurrentIdx
      }

    }
  }
</script>
