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
            <div class="ipt-class">请输入{{groupInfo.group_name}}名称</div>
          </div>
        </div>
        <div v-if="!community.communityId">
          <div class="location-title">当前地址</div>
          <div class="location-msg">{{city.districtName}}</div>
          <div class="switch-btn">请选择您的{{groupInfo.group_name}}</div>
        </div>
        <div v-else>
          <div class="location-title location-title-pad">当前{{groupInfo.group_name}}</div>
          <navigator class="local-community-card" openType="navigateBack">
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
          </navigator>
        </div>
      </div>
      <div class="community-list history-communities" style="display:none;" v-if="!isNotHistory">
        <div class="title">曾用{{groupInfo.group_name}}</div>
        <i-community-item :city="city" class="item-border" :isOld="true"
                          :item="historyCommunity"></i-community-item>
      </div>
      <div class="community-list around-communities">
        <div class="title" :style="{'border-color':skin.color}">附近{{groupInfo.group_name}}</div>
        <i-community-item :isOld="true" :city="city" class="item-border" :groupInfo="groupInfo"
                          :hiddenDetails="index_hide_headdetail_address" :item="item" :skin="skin"
                          v-if="communities.length" v-for="(item,index) in communities"
                          :key="item.id"></i-community-item>
        <div class="no-community" v-if="isEmpty">
          <div bindtap="openSetting" class="flex-align" v-if="!canGetGPS">
            <img src="@/assets/images/noData.png"/>
            <div>未获得您的位置信息，点击开启</div>
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

  var location = require('../../utils/Location'), QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js'),
    status = require('../../utils/index.js')

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
          group_name: '社区',
          owner_name: '团长'
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
      this.$store.dispatch('app/showToolbarBack')
      this.$store.dispatch('app/hideTabbar')
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
    width: 100%;
    padding-top: 10px;
    box-sizing: border-box;
    position: relative;
  }

  .header-content .header-bg {
    width: 100%;
    height: 150px;
    position: absolute;
    left: 0;
    top: 0;
  }

  .header-content .search-content {
    margin: 0 auto 18px;
    width: 80%;
    height: 30px;
    border-radius: 30px;
    background: #fff;
    position: relative;
    display: flex;
  }

  .header-content .search-content .city-content {
    height: 30px;
    padding: 0 8px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    font-size: 13px;
    color: #444;
    white-space: nowrap;
    font-weight: bold;
  }

  .header-content .search-content .city-content .search-icon {
    width: 12px;
    height: 12px;
    margin-right: 10px;
    margin-top: -1px;
  }

  .header-content .search-content .city-content .bottom-arrow {
    width: 6px;
    height: 1px;
    margin-left: 4px;
  }

  .header-content .search-ipt {
    flex: 1;
  }

  .header-content .ipt-class {
    line-height: 30px;
    height: 30px;
    font-size: 13px;
    color: #999;
  }

  .header-content .location-title {
    color: #fff;
    font-size: 13px;
    text-align: center;
    margin-bottom: 15px;
    position: relative;
  }

  .header-content .location-title.location-title-pad {
    margin-bottom: 30px;
  }

  .header-content .location-msg {
    font-size: 15px;
    width: 530px;
    height: 30px;
    margin: 0 auto 12px;
    line-height: 18px;
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
    width: 90%;
    height: 50px;
    border-radius: 50px;
    text-align: center;
    line-height: 50px;
    background: #fff;
    font-size: 15px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.08);
    position: relative;
    margin: 0 auto;
  }

  .header-content .local-community-card {
    width: 90%;
    height: 330px;
    border-radius: 8px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.08);
    margin: 0 auto;
    position: relative;
  }

  .header-content .local-community-card .local-distance {
    position: absolute;
    top: 40px;
    right: 6px;
    width: 60px;
    height: 20px;
    border-radius: 10px 0 0 10px;
    background: linear-gradient(to right, #ff5041, #ff695c);
    color: #fff;
    font-size: 10px;
    line-height: 20px;
    text-align: center;
  }

  .header-content .local-community-card .card-bg {
    position: absolute;
    width: 90%;
    height: 330px;
    left: 0;
    top: 0;
  }

  .header-content .local-community-card .head-pic {
    position: absolute;
    width: 110px;
    height: 110px;
    left: 120px;
    top: -30px;
    border-radius: 30px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.2) inset;
  }

  .header-content .local-community-card .head-pic .head-pic-content {
    position: relative;
    width: 50px;
    height: 50px;
    border-radius: 20px;
  }

  .header-content .local-community-card .card-msg {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 40px;
  }

  .header-content .local-community-card .card-msg .group-master {
    font-size: 13px;
    line-height: 13px;
    color: #999;
    margin-bottom: 20px;
  }

  .header-content .local-community-card .card-msg .community-name {
    font-size: 20px;
    color: #444;
    line-height: 20px;
    margin-bottom: 15px;
    font-weight: bold;
  }

  .header-content .local-community-card .card-msg .community-address {
    width: 80%;
    font-size: 13px;
    line-height: 18px;
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
    padding-top: 30px;
  }

  .history-communities {
    border-bottom: 10px solid #f6f6f6;
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
    padding: 50px 15px;
  }

  .no-community img {
    width: 100px;
    height: 100px;
    margin-bottom: 15px;
  }

  .link-apply {
    display: inline-block;
    color: #ff5777;
  }
</style>
