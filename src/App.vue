<template>
  <div id="app" style="overflow-x: hidden;">
    <i-toolbar v-if="loadOver" ref="toolbar"></i-toolbar>
    <router-view style="margin-top: 49px"/>

  </div>
</template>

<style lang="less">
  @import "App.less";

</style>
<script>
  import util from './lionfish_comshop/utils/index'
  import timeQueue from './lionfish_comshop/utils/timeQueue'
  import wx from './lionfish_comshop/utils/wx'
  import siteInfo from './siteinfo'

  export default {
    name: 'App',
    data() {
      return {
        tabbarRefresh: false,
        currentIdx: 0,
        loadOver:false
      }
    },
    util: util,
    siteInfo: siteInfo,
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
    created: function() {
      this.setNavBgColor()
    },
    mounted: function() {
      this.$getApp().globalData.timer = new timeQueue.default()
      var t = wx.getStorageSync('userInfo')
      this.$getApp().globalData.userInfo = t
      var e = wx.getStorageSync('community')
      this.$getApp().globalData.hasDefaultCommunity = !!e
      this.$getApp().globalData.community = e
      this.$getApp().globalData.systemInfo = wx.getSystemInfoSync()
      var o = this.$getApp().globalData.systemInfo ? this.$getApp().globalData.systemInfo.model : ''
      this.$getApp().globalData.isIpx = -1 < o.indexOf('iPhone X') || -1 < o.indexOf('unknown<iPhone')

    },
    methods: {

      setNavBgColor: function() {
        const i = this;
        i.$http({
          controller: 'index.get_nav_bg_color'
        }).then(a => {
          console.log(a)
          if (a.code === 0) {
            const t = a.data || '#8ED9D1'
            const e = a.nav_font_color || '#ffffff'
            i.$wx.setNavigationBarColor({
              frontColor: e,
              backgroundColor: t
            })
            i.loadOver = true
          }
        })
      }
    },
    computed: {

      getShowTabbar() {
        return this.$store.getters.showTabbar
      }
      ,

      getTabbarCurrentIdx() {

        return this.$store.getters.tabbarCurrentIdx
      }

    }
  }
</script>
