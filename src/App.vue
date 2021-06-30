<template>
  <div id="app" style="overflow-x: hidden;">
    <i-toolbar v-if="loadOver" ref="toolbar"></i-toolbar>

    <keep-alive>
      <router-view style="padding-top: 48px" v-if='$route.meta.keepAlive'/>
    </keep-alive>
    <router-view style="padding-top: 48px" v-if='!$route.meta.keepAlive'/>


  </div>
</template>

<style lang="less">
  @import "App.less";

</style>
<script>
  import util from './ulink_comshop/utils/index'
  import timeQueue from './ulink_comshop/utils/timeQueue'
  import wx from './ulink_comshop/utils/wx'
  import siteInfo from './siteinfo'

  export default {
    name: 'App',
    data() {
      return {
        tabbarRefresh: false,
        currentIdx: 0,
        loadOver: false
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
        historys:[],
      isblack: 0,
      skin: {
        color: '#8ED9D1',
        subColor: '#ed7b3a',
        lighter: '#fff9f4'
      }
    },
    created: function() {
      this.setNavBgColor()
      // this.setIconTitle();
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
        const i = this
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
      },
      // setIconTitle: function() {
      //   this.$http({
      //     controller: 'index.index_info'
      //   }).then(t => {
      //     document.title = t.shoname;
      //     document.querySelector("link[rel='icon']").href = t.shoplogo_h5;
      //   });
      // }
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
