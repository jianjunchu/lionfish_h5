<template>
  <i-auth @authSuccess="authSuccess" :needAuth="needAuth">
    <div>
      <div class="header-content">
        <img class="header-bg"
             :src="common_header_backgroundimage?common_header_backgroundimage:require('@/assets/images/TOP_background@2x.png')"/>
        <div class="search-content">
          <i-router-link openType="redirect" url="/lionfish_comshop/pages/position/cities">
            <div class="city-content">
              <img class="search-icon" src="@/assets/images/icon-search.png"/>
              {{city.districtName}}
              <img class="bottom-arrow" src="@/assets/images/icon-bottom-arrow.png"/>
            </div>
          </i-router-link>
          <div bindtap="linkSearch" class="search-ipt">
            <div class="ipt-class">{{$t('host.shurushequmingcheng')}}</div>
          </div>
        </div>
        <div v-if="!community.communityId">
          <div class="location-title">{{$t('host.dangqiandizhi')}}</div>
          <div class="location-msg">{{city.districtName}}</div>
          <div class="switch-btn">{{$t('host.qingxuanze')}}{{groupInfo.group_name}}</div>
        </div>
        <div v-else>
          <div class="location-title location-title-pad">{{$t('host.dangqian')}}{{groupInfo.group_name}}</div>
          <div class="local-community-card" openType="navigateBack">
            <img class="card-bg" src="@/assets/images/community-desc-bg.png"/>
            <div class="head-pic">
              <img class="head-pic-content" :src="community.disUserHeadImg||community.headImg"
                   v-if="community.disUserHeadImg||community.headImg"/>
              <img class="head-pic-content" src="@/assets/images/head-bitmap.png" v-else/>
            </div>
            <div class="card-msg">
              <div class="group-master">{{groupInfo.owner_name}}：{{community.disUserName||community.realName}}</div>
              <div class="community-name">{{community.communityName}}</div>
              <div class="community-address">{{community.communityAddress||community.fullAddress}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="community-list history-communities" style="display:none;" v-if="!isNotHistory">
        <div class="title">曾用{{groupInfo.group_name}}</div>
        <i-community-item :city="city" class="item-border" :isOld="true"
                          :item="historyCommunity"></i-community-item>
      </div>
      <div class="community-list around-communities">
        <div class="title" :style="{'border-color':skin.color}">{{$t('host.fujin')}}{{groupInfo.group_name}}</div>
        <i-community-item :isOld="true" :city="city" class="item-border" :groupInfo="groupInfo"
                          :hiddenDetails="index_hide_headdetail_address" :item="item" :skin="skin"
                          v-if="communities.length" v-for="(item,index) in communities"
                          :key="item.id"></i-community-item>
        <div class="no-community" v-if="isEmpty">
          <div bindtap="openSetting" class="flex-align" v-if="!canGetGPS">
            <img src="@/assets/images/noData.png"/>
            <div>{{$t(host.kaiqiweizhi)}}</div>
          </div>
          <block v-else>
            <img src="@/assets/images/noData.png"/>
            <div>当前城市暂未开通服务，请更换城市或
              <router-link class="link-apply" to="/lionfish_comshop/pages/groupCenter/recruit">申请开通></router-link>
            </div>
          </block>
        </div>
        <i-load-more :loading="loadMore" :tip="tip"></i-load-more>
      </div>
    </div>
  </i-auth>

</template>

<script>
  import GlobalMixin from '../../mixin/globalMixin.js'
  import status from '../../utils/index.js'
  import QQMapWX from '../../utils/qqmap-wx-jssdk.min.js'
  import location from '../../utils/Location'

  export default {
    name: '',
    mixins: [GlobalMixin],
    data() {
      return {
        loadMore: !0,
        canGetGPS: !0,
        tip: '加载中...',
        community: {},
        communities: [],
        historyCommunity: [],
        city: {
          districtName: ''
        },
        latitude: '',
        longitude: '',
        hasRefeshin: !1,
        pageNum: 1,
        isNotHistory: !0,
        city_id: 0,
        needAuth: !1,
        common_header_backgroundimage: '',
        groupInfo: {
          group_name: 'Estate',
          owner_name: 'Host'
        },
        isEmpty: !1
      }
    },
    created: function() {



      var i = this
      this.common_header_backgroundimage = this.$app.globalData.common_header_backgroundimage
      status.setNavBgColor()
      status.setGroupInfo().then(function(t) {

        i.groupInfo = t
      })

      this.loadpage()

    },
    mounted: function() {
      console.log('show')
      if (this.isFirst) {
        this.isFirst = !1
      } else {
        console.log('nofirst')
        var t = this.$wx.getStorageSync('city'), e = this.$wx.getStorageSync('city_id')
        console.log(e)
        if (t) {
          this.city = t,
            this.city_id = e,
            this.pageNum = 1,
            this.hasRefeshin = !1,
            this.communities = []
        }

        this.$wx.showLoading({
          title: '加载中...',
          mask: !0,
          icon: 'none'
        })
        this.load_gps_community_list()
      }

      this.$wx.setNavigationBarTitle({
        title: "Order",
        showLogo:false,
        showMore:false,
        showBack:true
      })
    },
    methods: {
      loadpage: function() {
        var t = this, e = t.$wx.getStorageSync('community')
        if (e && e.fullAddress && e.fullAddress.indexOf('境外') > -1) {
          e.fullAddress = e.fullAddress.replace('境外境外境外地区', '')
        }
        if (e && t.$wx.getStorageSync('tx_map_key')) {
          this.community = e
          var a = t.$wx.getStorageSync('shopname')
          t.$wx.setNavigationBarTitle({
            title: a
          })
          t.load_gps_community()
        } else {
          t.getCommunityConfig()
        }
      },
      authSuccess: function() {
        this.needAuth = !1
        this.loadpage()
      },
      getCommunityConfig: function() {
        var e = this
        e.$app.util.request({
          url: 'entry/wxapp/index',
          data: {
            controller: 'index.get_community_config'
          },
          dataType: 'json',
          success: function(t) {
            if (t.code == 0) {
              e.$wx.setStorage({
                key: 'shopname',
                data: t.shoname
              }), t.shoname && wx.setNavigationBarTitle({
                title: t.shoname
              }), e.$wx.setStorage({
                key: 'tx_map_key',
                data: t.tx_map_key
              })

              e.tx_map_key = t.tx_map_key
              wx.setStorage({
                key: 'shop_index_share_title',
                data: t.shop_index_share_title
              })
              e.load_gps_community()
            }
          }
        })
      },
      load_gps_community: function() {
        const app = this.$getApp()
        var t = this.$wx.getStorageSync('token'), e = this.$wx.getStorageSync('tx_map_key')
        if (null == e || '' == e) {
          if (!this.tx_map_key) return void this.getCommunityConfig()
          e = this.tx_map_key
        }
        var i = this
        t && i.$app.util.request({
          url: 'entry/wxapp/index',
          data: {
            controller: 'index.load_history_community',
            token: t
          },
          dataType: 'json',
          success: function(t) {
            if (0 == t.code) {
              var e = t.list, a = !1
              0 != Object.keys(e).length && 0 != e.communityId || (a = !0), i.data.community && (app.globalData.community = e)
              i.historyCommunity = e
              i.isNotHistory = a

            }
          }
        })
        var o = new QQMapWX({
          key: e || ''
        })
        console.log('腾讯地图api key', e), i.$wx.getLocation({
          type: 'gcj02',
          success: function(t) {
            console.log('getLocation success')
            var e = t.latitude, a = t.longitude
            i.latitude = t.latitude,
              i.longitude = t.longitude

            i.$wx.setStorage({
              key: 'latitude',
              data: e
            })
            i.$wx.setStorage({
              key: 'longitude',
              data: a
            })
            o.reverseGeocoder({
              location: {
                latitude: t.latitude,
                longitude: t.longitude
              },
              success: function(t) {
                var e = t.result.address_component.city
                i.$set(i.city, 'districtName', e)

                i.$wx.showLoading({
                  title: '加载中...',
                  mask: !0,
                  icon: 'none'
                })
                i.load_gps_community_list()
              },
              fail: function(t) {
                console.log('腾讯地图api error', t)
                var e = t.message || ''
                i.$app.util.message(e, '', 'error'), i.$wx.setStorageSync('tx_map_key', '')
              }
            })
          },
          fail: function(t) {
            const app = this.$getApp()
            const wx = this.$wx
            i.isFirst = !0
            location.checkGPS(app, function() {

              console.log('canGetGPS' + app.globalData.canGetGPS)

              if (app.globalData.canGetGPS) {
                console.log('checkGPS sucess')
                var t = app.globalData.location
                t && t.lat && ((
                  i.latitude = t.latitude,
                    i.longitude = t.longitude
                ), wx.setStorage({
                  key: 'latitude',
                  data: t.latitude
                }), wx.setStorage({
                  key: 'longitude',
                  data: t.longitude
                }), o.reverseGeocoder({
                  location: {
                    latitude: t.latitude,
                    longitude: t.longitude
                  },
                  success: function(t) {
                    var e = t.result.address_component.city
                    i.$set(i.city, 'districtName', e)
                    i.load_gps_community_list()
                  }
                }))
              } else {
                location.openSetting(app).then(function(t) {
                  i.latitude = t.latitude
                  i.longitude = t.longitude
                  wx.setStorage({
                    key: 'latitude',
                    data: t.latitude
                  }), wx.setStorage({
                    key: 'longitude',
                    data: t.longitude
                  }), o.reverseGeocoder({
                    location: {
                      latitude: t.latitude,
                      longitude: t.longitude
                    },
                    success: function(t) {
                      var e = t.result.address_component.city
                      i.$set(i.city, 'districtName', e)

                      i.load_gps_community_list()
                    }
                  })
                }).catch(function() {
                  i.isEmpty = !0
                  i.loadMore = !1
                  i.hasRefeshin = !0
                  i.tip = ''
                  i.canGetGPS = !1
                })
              }
            })
          }
        })
      },
      load_gps_community_list: function(t) {
        console.log('load_gps_community_list')
        const wx = this.$wx
        var e = wx.getStorageSync('token'), a = this
        console.log('come gpslist'), a.hasRefeshin || ((
          a.hasRefeshin = !0, a.loadMore = !0
        ), a.$app.util.request({
          url: 'entry/wxapp/index',
          data: {
            controller: 'index.load_gps_community',
            token: e,
            pageNum: a.pageNum,
            longitude: '114.45646',
            latitude: '22.78851',
            city_id:  0
          },
          dataType: 'json',
          success: function(t) {
            if (wx.hideLoading(), 0 == t.code) {
              var e = a.communities.concat(t.list)
              if (1 == a.pageNum && 0 == e.length) {

                a.isEmpty = !0
                a.loadMore = !1
                a.tip = ''
                a.hasRefeshin = !0

                return !1
              }
              for (var i = 0; i < e.length; i++) {
                if (e && e[i] && e[i].fullAddress && e[i].fullAddress.indexOf('境外') > -1) {
                  e[i].fullAddress = e[i].fullAddress.replace('境外境外境外地区', '')
                }
              }

              a.communities = e
              a.pageNum = a.pageNum + 1
              a.loadMore = !1
              a.hasRefeshin = !1
              a.tip = ''
              a.index_hide_headdetail_address = t.index_hide_headdetail_address || 0

            } else {
              console.log(a.needAuth)
              1 == t.code ? ( a.loadMore = !1, a.tip = '^_^已经到底了') : 2 == t.code && (wx.hideLoading(), (a.needAuth = !0, a.hasRefeshin = !1))
            }
          }
        }))
      },
      openSetting: function() {
        var t = this

        t.isEmpty = !1
        t.loadMore = !0
        t.hasRefeshin = !1
        t.tip = '加载中'

        t.load_gps_community()
      }
    }

  }
</script>

<style scoped>
  page {
    background: #fff;
  }

  .mars-mask {
    position: fixed;
    z-index: 9;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  .header-content {
    width: 100vw;
    padding-top: 2vw;
    box-sizing: border-box;
    position: relative;
  }

  .header-content .header-bg {
    width: 100vw;
    height: 45vw;
    position: absolute;
    left: 0;
    top: 0;
  }

  .header-content .search-content {
    margin: 0 auto 5vw;
    width: 80%;
    height: 10vw;
    border-radius: 10vw;
    background: #fff;
    position: relative;
    display: flex;
  }

  .header-content .search-content .city-content {
    height: 10vw;
    padding: 0 3vw;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    font-size: 4vw;
    color: #444;
    white-space: nowrap;
    font-weight: bold;
  }

  .header-content .search-content .city-content .search-icon {
    width: 4vw;
    height: 4vw;
    margin-right: 3vw;
    margin-top: -0.1vw;
  }

  .header-content .search-content .city-content .bottom-arrow {
    width: 2vw;
    height: 0.1vw;
    margin-left: 1vw;
  }

  .header-content .search-ipt {
    flex: 1;
  }

  .header-content .ipt-class {
    line-height: 10vw;
    height: 10vw;
    font-size: 4vw;
    color: #999;
  }

  .header-content .location-title {
    color: #fff;
    font-size: 4vw;
    text-align: center;
    margin-bottom: 5vw;
    position: relative;
  }

  .header-content .location-title.location-title-pad {
    margin-bottom: 10vw;
  }

  .header-content .location-msg {
    font-size: 5vw;
    width: 180vw;
    height: 10vw;
    margin: 0 auto 4vw;
    line-height: 6vw;
    position: relative;
    color: #fff;
    text-align: center;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: initial;
    white-space: normal;
  }

  .header-content .switch-btn {
    width: 90vw;
    height: 18vw;
    border-radius: 18vw;
    text-align: center;
    line-height: 18vw;
    background: #fff;
    font-size: 5vw;
    box-shadow: 0 0 6vw rgba(0, 0, 0, 0.08);
    position: relative;
    margin: 0 auto;
  }

  .header-content .local-community-card {
    width: 90vw;
    height: 36vw;
    border-radius: 0.2vw;
    box-shadow: 0 0 6vw rgba(0, 0, 0, 0.08);
    margin: 0 auto;
    position: relative;
  }

  .header-content .local-community-card .local-distance {
    position: absolute;
    top: 13vw;
    right: 2vw;
    width: 20vw;
    height: 6vw;
    border-radius: 3vw 0 0 3vw;
    background: linear-gradient(to right, #ff5041, #ff695c);
    color: #fff;
    font-size: 3vw;
    line-height: 6vw;
    text-align: center;
  }

  .header-content .local-community-card .card-bg {
    position: absolute;
    width: 90vw;
    height: 36vw;
    left: 0;
    top: 0;
  }

  .header-content .local-community-card .head-pic {
    position: absolute;
    width: 15.3vw;
    height: 15.3vw;
    left: 37vw;
    top: -8vw;
    border-radius: 8vw;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 0.1vw rgba(0, 0, 0, 0.2) inset;
  }

  .header-content .local-community-card .head-pic .head-pic-content {
    position: relative;
    width: 15vw;
    height: 15vw;
    border-radius: 8vw;
  }

  .header-content .local-community-card .card-msg {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 10vw;
  }

  .header-content .local-community-card .card-msg .group-master {
    font-size: 3vw;
    line-height: 4vw;
    color: #999;
    margin-bottom: 1vw;
  }

  .header-content .local-community-card .card-msg .community-name {
    font-size: 4vw;
    color: #444;
    line-height: 6vw;
    margin-bottom: 1vw;
    font-weight: bold;
  }

  .header-content .local-community-card .card-msg .community-address {
    width: 90vw;
    font-size: 3vw;
    line-height: 5vw;
    color: #444;
    text-align: center;
  }

  .title {
    font-size: 20px;
    line-height: 20px;
    color: #444;
    border-left: 5px solid #ff695c;
    text-indent: 10px;
    font-weight: bold;
  }

  .community-list {
    padding-top: 10vw;
  }

  .history-communities {
    border-bottom: 2vw solid #f6f6f6;
  }

  .item-border {
    border-bottom: 1px solid #efefef;
  }

  .item-border:last-child {
    border: none;
  }

  .no-community {
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
  }

  .flex-align {
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    padding: 12vw 5vw;
  }

  .no-community img {
    width: 33vw;
    height: 33vw;
    margin-bottom: 5vw;
  }

  .link-apply {
    display: inline-block;
    color: #ff5777;
  }
</style>
