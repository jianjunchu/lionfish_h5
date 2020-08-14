<template>
  <div class="page-wrap">
    <div class="search-bar">
      <div class="search-box">
        <input @keypress="goResult" class="ipt" confirmType="搜索" :placeholder="$t('common.sousuoshangpin')"
               type="text" v-model="name"/>
        <div class="search-icon">
          <span class="iconfont icon-sousuo1"></span>
        </div>
      </div>
    </div>
    <div class="page-content" v-if="!noCateList">
      <div class="scrollY page-category" :scrollTop="categoryScrollBarTop">
        <div @click="changeCategory(index)" :data-index="index"
             :class="[rushCategoryData.activeIndex===index?'category-item active':'category-item']"
             v-for="(item,index) in rushCategoryData.tabs" :key="index">
          <div class="item-border"></div>
          <span>{{item.name}}</span>
        </div>
        <div class="category-item"></div>
      </div>
      <div @click="showDrop" class="mask" hidden="!showDrop"></div>
      <div class="sub-cate" v-if="rushCategoryData.tabs[rushCategoryData.activeIndex] && rushCategoryData.tabs[rushCategoryData.activeIndex].sub.length">
        <div class="sub-cate-scroll scrollX">
          <div @click.stop="change_sub_cate" class="sub-cate-item" :data-id="rushCategoryData.tabs[rushCategoryData.activeIndex].id" :data-idx="0" :style="active_sub_index==0?'color:'+skin.color:''">All</div>
          <div @click.stop="change_sub_cate" class="sub-cate-item" :data-id="item.id" :data-idx="index+1" :style="active_sub_index==index+1?'color:'+skin.color:''" v-for="(item,index) in rushCategoryData.tabs[rushCategoryData.activeIndex].sub" :key="item.id">{{item.name}}</div>
        </div>
        <!-- <div @click="showDrop" class="icon-open">
            <img class="openImg " src="@/assets/images/commentsOpen.png">
        </div> -->
      </div>
      <!-- <div class="sub-cate-hide" v-if="rushCategoryData.tabs[rushCategoryData.activeIndex].sub.length&&showDrop">
          <div @click="change_sub_cate(rushCategoryData.tabs[rushCategoryData.activeIndex].id,0)" class="sub-cate-item" style="color:#fff">{{$t('common.quanbu')}}</div>
          <div @click="change_sub_cate(item.id,index+1)" class="sub-cate-item" style="color:#fff" v-for="(item,index) in rushCategoryData.tabs[rushCategoryData.activeIndex].sub" :key="item.id">{{item.name}}</div>
      </div> -->

        <!--<div class="scroll-col-tip-top">
          <span v-if="isFirstCategory">{{$t('type.yijingdingbu')}}</span>
          <span v-else>{{$t('type.xialachakan')}}</span>
        </div>-->
        <div>
            <van-list v-if="!pageEmpty" v-model="$data.$data.loading" :finished="!loadMore" @load="getHotList" class="van-clearfix page-list scrollY">
              <i-type-item @authModal="authModal" @changeCartNum="changeCartNum" @openSku="openSku" @vipModal="vipModal" :canLevelBuy="canLevelBuy" :changeCarCount="changeCarCount" :is_open_vipcard_buy="is_open_vipcard_buy" :needAuth="needAuth" :reduction="reduction" :spuItem="item" :stopClick="stopClick" v-for="(item,index) in rushList" :key="item.actId"></i-type-item>
            </van-list>
          <div class="none-rush-list" v-else-if="pageEmpty">
            <img class="img-div" src="@/assets/images/icon-index-empty.png">
            <div class="h1">{{$t('type.zhanshimeiyou')}}</div>
            <div class="h2">{{$t('type.zhengzaizhunbei')}}</div>
          </div>
          <!--
          <div v-if="loadMore">
          <i-load-more loading="loadMore" tip="oadText"></i-load-more>
          </div>
           <div class="scroll-col-tip-bottom" v-else-if="canNext">
              <span v-if="isLastCategory">{{$t('type.wodedixian')}}</span>
              <span wx:else>{{$t('type.shanglachakan')}}</span>
          </div>
          <div style="height:50px"></div>
          -->

        </div>

    </div>
    <!-- <i-empty wx:else>暂无分类~</i-empty> -->
    <i-tabbar ref="tabbar" @authModal="authModal" :cartNum="cartNum" :class="['tabbar' ,isIpx?'pb20':'']" currentIdx="1"
              :needAuth="needAuth"></i-tabbar>
  </div>
  <!-- <i-new-auth bind:authSuccess="authSuccess" bind:cancel="authModal" navBackUrl="/lionfish_comshop/pages/type/index" needAuth="needAuth&&showAuthModal" needPosition="needPosition"></i-new-auth> -->
  <!-- <i-sku bind:cancel="closeSku" bind:changeCartNum="changeCartNum" bind:vipModal="vipModal" cur_sku_arr="{{cur_sku_arr}}" goodsid="{{addCar_goodsid}}" sku="{{sku}}" skuList="{{skuList}}" sku_val="{{sku_val}}" vipInfo="{{vipInfo}}" visible="{{visible}}"></i-sku> -->
  <!-- <i-change-community bind:changeComunity="confrimChangeCommunity" canChange="{{hide_community_change_btn==0}}" changeCommunity="{{changeCommunity}}" community="{{community}}" groupInfo="{{groupInfo}}" visible="{{showChangeCommunity}}"></i-change-community> -->
  <!-- <i-vip-modal :imgUrl="pop_vipmember_buyimage" :visible="showVipModal"></i-vip-modal> -->


</template>

<script>
  import GlobalMixin from '../../mixin/globalMixin.js'
  import typeItem from './type-item'
  import a from '../../utils/public'
  import status from '../../utils/index.js'
  import util from '../../utils'
  import wcache from '../../utils/wcache.js'

  var _extends = Object.assign || function(t) {
    for (var a = 1; a < arguments.length; a++) {
      var e = arguments[a]
      for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o])
    }
    return t
  }

  var wx, app

  export default {
    name: 'type',
    mixins: [GlobalMixin],
    components: { [typeItem.name]: typeItem }
    ,
    data() {

      return {
        cartNum: 0,
        rushCategoryData: {
          tabs: [],
          activeIndex: 0
        },
        rushList: [],
        categoryScrollBarTop: 0,
        resetScrollBarTop: 50,
        loadMore: false,
        loadText: '加载中...',
        scrollViewHeight: 0,
        isFirstCategory: !0,
        isLastCategory: !1,
        pageEmpty: false,
        active_sub_index: 0,
        needPosition: !0,
        groupInfo: {
          group_name: '社区',
          owner_name: '团长'
        },
        isFirst: 0,
        noCateList: 0,
        tabs: [],
        name: '',
        needAuth:true,
        changeCarCount:false,
        s_open_vipcard_buy:0,
        $data: {
          options: {},
          rushCategoryId: '',
          pageNum: 1,
          actIds: [],
          loading: false,
          isScrollTop: !0,
          isScrollBottom: !1,
          scrollInfo: null,
          isSetCategoryScrollBarTop: !0,
          touchStartPos: {
            pageX: 0,
            pageY: 0
          },
          rushList: []
        }
      }
    },
    created: function() {
      app = this.$getApp()
      wx = this.$wx

      wx.setNavigationBarTitle({
        title: 'Type',
        showLogo:false,
        showMore:false,
        showBack:false
      })

      const t = this.$route.query
      this.onLoad(t)
    },
    /*mounted:function(){
      this.onShow();
    },*/
    activated:function(){
      var i = this;
      wx.setNavigationBarTitle({
        title: 'Type',
        showLogo:false,
        showMore:false,
        showBack:false
      })
      i.onShow();
      if(i.$refs.tabbar){
        i.$refs.tabbar.switchTab();
      }
    },
    methods: {

      onLoad: function(i) {
        var t = app.globalData.isIpx, s = this

        wx.showLoading(), wx.hideTabBar(), status.setNavBgColor(), status.setGroupInfo().then(function(t) {
          s.groupInfo = t
        })

        if (this.getScrollViewHeight(), (
          s.subCateHeight = this.getPx(44),
            s.isIpx = !!t
        ), console.log('options', i), i && 0 != Object.keys(i).length) {
          var r = wx.getStorageSync('community'), n = r.communityId || ''
          'undefined' != (s.$data.$data.options = i).share_id && 0 < i.share_id && wcache.put('share_id', i.share_id),
          'undefined' != i.community_id && 0 < i.community_id && app.util.request({
            url: 'entry/wxapp/index',
            data: {
              controller: 'index.get_community_info',
              community_id: i.community_id
            },
            dataType: 'json',
            success: function(t) {
              var a = wx.getStorageSync('token')
              if (0 == t.code) {
                var e = t.data, o = t.hide_community_change_btn
                i.community_id != n && ('' == n ? (wcache.put('community', e), (
                  s.needPosition = !1
                )) : (
                  s.showChangeCommunity = !0,
                    s.changeCommunity = e,
                    s.community = r,
                    s.hide_community_change_btn = o
                ))
              }
              a && s.addhistory()
            }
          })
        }
        this.$data.$data.rushCategoryId = app.globalData.typeCateId || 0, app.globalData.typeCateId = 0
      }
      ,
      onShow: function() {
        var s = this
        s.$data.$data.pageNum = 1,
          s.rushCategoryData = {
            tabs: [],
            activeIndex: 0
          },
            s.rushList = [],
            s.categoryScrollBarTop = 0,
            s.resetScrollBarTop = 50,
            s.loadMore = !0,
            s.loadText = '加载中...',
            s.isFirstCategory = !0,
            s.isLastCategory = !1,
            s.pageEmpty = !1,
            s.tabbarRefresh = !0,

            console.log('s.isFirst'+s.isFirst), s.get_cate_list().then(function() {
            if(app.globalData.typeCateId>0){
              s.active_sub_index =0;
            }
            if (1 <= s.isFirst && (s.$data.$data.rushCategoryId = app.globalData.typeCateId || s.$data.$data.rushCategoryId || 0,
              console.log('typeCateId', s.$data.$data.rushCategoryId), app.globalData.typeCateId = 0,
              s.$data.$data.rushCategoryId)) {
              var t = s.rushCategoryData, a = t.tabs, e = s.$data.$data.rushCategoryId
              t.activeIndex = a.findIndex(function(t) {
                if(t.id == e){
                  return true;
                }else{
                  for(let inx in t.sub){
                    if(t.sub[inx].id == e){
                      return true;
                    }
                  }
                }
                return false;
              }) || 0

              s.rushCategoryData = t
              console.log(t )

              s.setCategory(t.activeIndex)

            }
          }), util.check_login_new().then(function(t) {
          if (t) {
            s.needAuth = !1
            if ((0, status.cartNum)('', !0).then(function(t) {
              0 == t.code && (s.cartNum = t.data)
            }), 1 <= s.isFirst) {
              var a = app.globalData.goodsListCarCount, o = s.rushList
              if (0 < a.length && 0 < o.length) {
                var i = !1
                a.forEach(function(a) {
                  var t = o.findIndex(function(t) {
                    return t.actId == a.actId
                  })
                  if (-1 != t && 0 === o[t].skuList.length) {
                    var e = 1 * a.num
                    o[t].car_count = 0 <= e ? e : 0, i = !0
                  }
                }), (s.rushList = o, s.changeCarCount = i)
              }
            }
          } else {
            s.cartNum = 0
            s.needAuth = !0
          }
        }), s.isFirst++
      }
      ,
      authSuccess: function() {

        var t = this

        t.$set(t.$data.$data, 'options', {})
        t.$set(t.$data.$data, 'rushCategoryId', '')
        t.$set(t.$data.$data, 'pageNum', 1)
        t.$set(t.$data.$data, 'actIds', [])
        t.$set(t.$data.$data, 'loading', false)
        t.$set(t.$data.$data, 'isScrollTop', !0)
        t.$set(t.$data.$data, 'isScrollBottom', !1)
        t.$set(t.$data.$data, 'scrollInfo', null)
        t.$set(t.$data.$data, 'isSetCategoryScrollBarTop', !0)
        t.$set(t.$data.$data, 'touchStartPos', { pageX: 0, pageY: 0 })

        (
          t.needAuth = !1,
          t.showAuthModal = !1,
          t.rushList = [],
          t.categoryScrollBarTop = 0,
          t.resetScrollBarTop = 50,
          t.loadMore = !0,
          t.loadText = '加载中...',
          t.isFirstCategory = !0,
          t.isLastCategory = !1,
          t.pageEmpty = !1,
          t.active_sub_index = 0,
          t.get_cate_list().then(function() {
            t.initPageData()
          })
        )
      }
      ,
      authModal: function(t) {
        t && (
          this.needAuth = !0
        ), this.needAuth && (
          this.showAuthModal = !this.showAuthModal
        )
        if(this.needAuth){
          wx.navigateTo({
            url: "/login"
          })
        }
      }
      ,
      vipModal: function(t) {
        this.setData(t.detail)
      }
      ,
      confrimChangeCommunity: function() {
        var t = this, a = this.changeCommunity
        app.globalData.community = a, wcache.put('community', a), (
          this.showChangeCommunity = !1,
            this.needPosition = !1,
            t.addhistory()
        )
      }
      ,
      closeChangeCommunity: function() {
        this.showChangeCommunity = !1
      }
      ,
      goSelectCommunity: function() {
        wx.redirectTo({
          url: '/lionfish_comshop/pages/position/community'
        })
      }
      ,
      addhistory: function() {
        var a = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 0, t = 0
        0 == a ? t = wx.getStorageSync('community').communityId || '' : t = a
        console.log('history community_id=' + t)
        var e = wx.getStorageSync('token'), o = this
        void 0 !== t && app.util.request({
          url: 'entry/wxapp/index',
          data: {
            controller: 'index.addhistory_community',
            community_id: t,
            token: e
          },
          dataType: 'json',
          success: function(t) {
            0 != a && (o.getHistoryCommunity(), console.log('addhistory+id', a))
          }
        })
      }
      ,
      getHistoryCommunity: function() {
        var i = this, t = wx.getStorageSync('token')
        app.util.request({
          url: 'entry/wxapp/index',
          data: {
            controller: 'index.load_history_community',
            token: t
          },
          dataType: 'json',
          success: function(t) {
            if (0 == t.code) {
              console.log('getHistoryCommunity')
              var a = t.list
              0 != Object.keys(a).length && 0 != a.communityId || !0
              var e = a && a.fullAddress && a.fullAddress.split('省')
              a = Object.assign({}, a, {
                address: e[1]
              }), wcache.put('community', a), app.globalData.community = a
            } else {
              var o = i.options
              void 0 !== o && o.community_id && (console.log('新人加入分享进来的社区id:', i.options), i.addhistory(o.community_id))
            }
          }
        })
      }
      ,
      onPullDownRefresh: function() {
        this.initPageData()
      }
      ,
      initPageData: function() {
        this.isFirstCategory = !0,
          this.isLastCategory = !1,
          this.rushList = [],
          this.resetScrollBarTop = 50,
          this.getHotList()
      }
      ,
      scrollBottom: function() {
        var t = this.$data.$data
        t.loading || (t.loading = !0, this.getHotList())
      }
      ,
      touchstart: function(t) {
        if (t.changedTouches && t.changedTouches[0]) {
          var a = t.changedTouches[0], e = a.pageX, o = a.pageY
          this.$data.$data.touchStartPos = {
            pageX: e,
            pageY: o
          }
        }
      }
      ,
      touchend: function(t) {
        var a = this
        if (t.changedTouches && t.changedTouches[0]) {
          var e = t.changedTouches[0], o = e.pageX, i = e.pageY, s = this.$data.$data.touchStartPos, r = s.pageX,
            n = s.pageY,
            d = this.$data, u = d.isScrollTop, c = d.isScrollBottom, l = d.scrollInfo, h = (this.rushCategoryData,
            o - r), g = i - n
          if (Math.abs(g) > Math.abs(h)) {
            if (0 < g) {
              if (!u) return
              if ((
                this.resetScrollBarTop = 50
              ), 50 < g) {
                var p = this.rushCategoryData.activeIndex - 1
                if (p < 0) return
                (this.resetScrollBarTop = 50, a.setCategory(p))
              }
            } else {
              if (!c || !this.canNext) return
              if (g < -50) {
                var m = this.rushCategoryData, y = m.activeIndex + 1
                if (y >= m.tabs.length || !this.$data.$data.scrollInfo) return
                (this.resetScrollBarTop = l.scrollTop, a.setCategory(y))
              }
            }
          } else {
            l && l.scrollTop < 50 && (this.resetScrollBarTop = 50)
          }
        }
      }
      ,
      scroll: function(a) {
        var e = a.scrollTop, o = a.scrollHeight, i = this.data, s = i.scrollViewHeight, r = i.loadMore
        this.$data.$data.scrollInfo = a, this.$data.$data.isScrollTop = e <= 49, this.$data.$data.isScrollBottom = !r && o - e - s <= 10
      }
      ,
      getScrollViewHeight: function() {
        return false
      }
      ,
      changeCategory: function(a) {
        this.active_sub_index = 0;
        console.log(a), a !== this.rushCategoryData.activeIndex && this.setCategory(a)
      }
      ,
      setCategory: function(t) {
        var activeactive_sub_idx = this.active_sub_index;

        var a = this, e = this.rushCategoryData,  i = this.scrollViewHeight

        if(this.active_sub_index > 0){
          var o = e.tabs[t].sub[activeactive_sub_idx-1] || {}
        }else{
          var o = e.tabs[t];
        }

        this.$data.$data.rushCategoryId = o.id || null, this.$data.$data.pageNum = 1, this.$data.$data.isSetCategoryScrollBarTop = !1
        var s = !t, r = (t == (e.tabs.length - 1));

          a.rushCategoryData.activeIndex = t,
          a.resetScrollBarTop = 50,
          a.categoryScrollBarTop = 50 * t - (i - 50) / 2,
          a.rushList = [],
          a.canNext = !1,
          a.isFirstCategory = s,
          a.isLastCategory = r,
          a.showDrop = !1,
          a.getHotList()
      }
      ,
      getHotList: function() {
        var a = this, e = this.$data.$data.rushCategoryId
        this.$data.$data.loading = !0, this.reqPromise().then(function() {
          //wx.stopPullDownRefresh();
          a.$data.$data.loading = !1
        }).catch(function() {
          var t = {};
          e || (t.pageEmpty = !0), a.$data.$data.loading = !1//, a.setData(t), wx.stopPullDownRefresh();
        });
      }
      ,
      reqPromise: function() {
        var y = this

        return new Promise((resolve, reject) => {

          var a = wx.getStorageSync('token'), e = wx.getStorageSync('community'), m = y.$data.$data.rushCategoryId
          app.util.request({
            url: 'entry/wxapp/index',
            data: {
              controller: 'index.load_gps_goodslist',
              token: a,
              pageNum: y.$data.$data.pageNum,
              head_id: e.communityId,
              gid: m,
              per_page: 30
            },
            dataType: 'json',
            success: function(t) {
              console.log(6)

              if (0 == t.code) {
                var a = t.list, e = {}
                if(a.length < 30){
                  e.loadMore = !1, e.canNext = !0,y.loadMore = false;
                }else{
                  y.$data.$data.pageNum++;
                  y.loadMore = true
                }
                var o = y.rushList.concat(a), i = t, s = i.full_money, r = i.full_reducemoney,
                  n = i.is_open_fullreduction, d = i.is_open_vipcard_buy, u = i.is_vip_card_member,
                  c = i.is_member_level_buy, l = {
                    full_money: s,
                    full_reducemoney: r,
                    is_open_fullreduction: n
                  }, h = !1
                1 == d ? 1 != u && 1 == c && (h = !0) : 1 == c && (h = !0), (
                  y.rushList = o,
                    y.pageEmpty = !1,
                    y.cur_time = t.cur_time,
                    y.reduction = l,
                    y.rushCategoryData = y.rushCategoryData,
                    y.is_open_vipcard_buy = d || 0,
                    y.is_vip_card_member = u,
                    y.is_member_level_buy = c,
                    y.canLevelBuy = h
                ),
                  y.vipInfo = {
                    is_open_vipcard_buy: d,
                    is_vip_card_member: u,
                    is_member_level_buy: c
                  }, 1 == y.$data.$data.pageNum && (e.resetScrollBarTop = 51), e.loadText = y.loadMore ? '加载中...' : '没有更多商品了~',
                y.$data.$data.isSetCategoryScrollBarTop && (e.categoryScrollBarTop = 50 * e.rushCategoryData.activeIndex - (y.scrollViewHeight - 50) / 2)
                (

                  !m && e.rushCategoryData.tabs && e.rushCategoryData.tabs[0] && (y.$data.$data.rushCategoryId = e.rushCategoryData.tabs[0].id)
                )
              } else if (1 == t.code) {

                1 == y.$data.$data.pageNum && (console.log('无数据'), y.pageEmpty = !0), (y.loadMore =  !1,
                  y.canNext = !0)
              } else {
                2 == t.code && (
                  y.needAuth = !0
                )
              }
              resolve(t)
            }
          })


        })

      }
      ,
      getPx: function(t) {
        return Math.round(app.globalData.systemInfo.windowWidth / 375 * t)
      }
      ,
      goResult: function(t) {
        if (event.keyCode == 13) { //如果按的是enter键 13是enter
          event.preventDefault(); //禁止默认事件（默认是换行）
          //var a = t.currentTarget.value.replace(/\s+/g, "");
          var a = t.currentTarget.value;
          a ? wx.navigateTo({
            url: "/lionfish_comshop/pages/type/result?keyword=" + a
          }) : wx.showToast({
            title: "请输入关键词",
            icon: "none"
          });
        }
      },
      onHide: function() {
        this.tabbarRefresh = !1, this.changeCarCount = !1
      }
      ,
      showDrop: function() {
        this.showDrop = !this.showDrop
      }
      ,
      get_cate_list: function() {
        var d = this
        return new Promise(function(n, a) {
          app.util.request({
            url: 'entry/wxapp/index',
            data: {
              controller: 'goods.get_category_list',
              is_type_show: 1
            },
            dataType: 'json',
            success: function(t) {

              if (0 == t.code) {
                var a = t.data || []
                if (0 == a.length) {
                  return wx.hideLoading(), (
                    d.noCateList = !0
                  )
                }
                var e = d.$data.$data.rushCategoryId || a && a[0] && a[0].id || 0
                var o = 0
                d.$data.$data.rushCategoryId && (o = a.findIndex(function(t) {
                  return t.id == d.$data.$data.rushCategoryId
                })), d.$data.$data.rushCategoryId = e
                var i = { tabs: a, activeIndex: o }
                var s = !i.activeIndex
                var r = i.activeIndex == (i.tabs.length - 1)

                d.rushCategoryData = i,
                  d.isFirstCategory = s,
                  d.isLastCategory = r,
                  d.noCateList = !1, wx.hideLoading()
              }
              n()
            },
            fail: function(t) {
              a(t)
            }
          })
        })
      }
      ,
      change_sub_cate: function(t) {
        var a = this.rushCategoryData, e = a.tabs, o = a.activeIndex, i = t.currentTarget.dataset.idx, s = e[o].id,
          r = t.currentTarget.dataset.id || s, n = this.getPx(64) * i
        console.log(n)
        var d = this
        d.$data.$data.pageNum = 1, d.$data.$data.rushCategoryId = r, (
          d.showDrop = !1,
            d.active_cate_id = r,
            d.active_sub_index = i,
            d.rushList = [],
            d.scrollLeft = n,
            d.showEmpty = !1,
            d.loadMore = !0,
            d.loadText = '加载中',
            d.resetScrollBarTop = 50, d.getHotList()
        )
      }
      ,
      show_search: function() {
        wx.navigateTo({
          url: '/lionfish_comshop/pages/type/search'
        })
      }
      ,
      openSku: function(a) {
        var e = a.actId, o = a.skuList
        this.addCar_goodsid = e
        var i = o.list || [], s = []
        if (0 < i.length) {
          for (var r = 0; r < i.length; r++) {
            var n = i[r].option_value[0], d = {
              name: n.name,
              id: n.option_value_id,
              index: r,
              idx: 0
            }
            s.push(d)
          }
          for (var u = '', c = 0; c < s.length; c++) c == s.length - 1 ? u += s[c].id : u = u + s[c].id + '_'
          var l = o.sku_mu_list[u] || {}
          l.is_mb_level_buy = a.is_mb_level_buy || 0, l.is_take_vipcard = a.is_take_vipcard || 0,
            (
              this.sku = s,
                this.sku_val = 1,
                this.cur_sku_arr = l,
                this.skuList = a.skuList,
                this.visible = !0,
                this.showSku = !0
            )
        } else {
          var h = a.allData
          (
            this.sku = [],
            this.sku_val = 1,
            this.skuList = [],
            this.cur_sku_arr = h
          )
          var g = {
            detail: {
              formId: ''
            }
          }
          g.detail.formId = 'the formId is a mock one', this.gocarfrom(g)
        }
      }
      ,
      gocarfrom: function(t) {
        wx.showLoading(), a.collectFormIds(t.detail.formId), this.goOrder()
      }
      ,
      goOrder: function() {
        var i = this
        i.can_car && (i.can_car = !1)
        wx.getStorageSync('token')
        var t = wx.getStorageSync('community'), a = i.addCar_goodsid, e = t.communityId, o = i.sku_val,
          s = i.cur_sku_arr, r = ''
        s && s.option_item_ids && (r = s.option_item_ids)
        var n = {
          goods_id: a,
          community_id: e,
          quantity: o,
          sku_str: r,
          buy_type: 'dan',
          pin_id: 0,
          is_just_addcar: 1
        }
        util.addCart(n).then(function(t) {
          if (1 == t.showVipModal) {
            var a = t.pop_vipmember_buyimage
            wx.hideLoading(), i.setData({
              pop_vipmember_buyimage: a,
              showVipModal: !0,
              visible: !1
            })
          } else if (3 == t.code) {
            wx.showToast({
              title: t.msg,
              icon: 'none',
              duration: 2e3
            })
          } else if (4 == t.code) {
            wx.showToast({
              title: '您未登录',
              duration: 2e3,
              success: function() {
                i.needAuth = !0
              }
            })
          } else if (6 == t.code || 7 == t.code) {
            var e = t.msg, o = t.max_quantity || ''
            0 < o && i.setData({
              sku_val: o
            }), wx.showToast({
              title: e,
              icon: 'none',
              duration: 2e3
            })
          } else {
            i.closeSku()
            i.cartNum = t.total
            wx.showToast({
              title: this.$t('cart.yijiarugouwuche'),
              image: '@/assets/images/addShopCart.png'
            })
          }
        })
      }
      ,
      selectSku: function(t) {
        var a = t.currentTarget.dataset.type.split('_'), e = this.sku, o = {
          name: a[3],
          id: a[2],
          index: a[0],
          idx: a[1]
        }
        e.splice(a[0], 1, o), (this.sku = e)
        for (var i = '', s = 0; s < e.length; s++) s == e.length - 1 ? i += e[s].id : i = i + e[s].id + '_'
        var r = this.skuList.sku_mu_list[i]
        this.cur_sku_arr = r
        console.log(i)
      }
      ,
      setNum: function(t) {
        var a = t.currentTarget.dataset.type, e = 1, o = 1 * this.sku_val
        'add' == a ? e = o + 1 : 'decrease' == a && 1 < ku_val && (e = o - 1)
        var i = this.sku, s = this.skuList
        if (0 < i.length) for (var r = '', n = 0; n < i.length; n++) n == i.length - 1 ? r += i[n].id : r = r + i[n].id + '_'
        0 < s.length ? e > s.sku_mu_list[r].canBuyNum && (e -= 1) : e > this.cur_sku_arr.canBuyNum && (e -= 1)
        this.sku_val = e
      }
      ,
      closeSku: function() {
        this.visible = 0
        this.stopClick = !1
      }
      ,
      changeCartNum: function(t) {
        this.cartNum = t
      }
      ,
      onShareAppMessage: function() {
        var t = wx.getStorageSync('community').communityId || '', a = wx.getStorageSync('member_id') || ''
        return console.log('lionfish_comshop/pages/type/index?community_id=' + t + '&share_id=' + a),
          {
            path: 'lionfish_comshop/pages/type/index?community_id=' + t + '&share_id=' + a,
            success: function() {
            },
            fail: function() {
            }
          }
      }
    }

  }
</script>

<style scoped>
  .scrollX {
    overflow-x: scroll;
  }

  .scrollY {
    overflow-y: scroll;
  }

  .page-wrap {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100vw;
    background: #fff;
  }


  .search-bar {
    padding: 6px 13px;
    background-color: #fff;
    width: 100%;
    box-sizing: border-box;
  }

  .search-box {
    background-color: #f0f0f0;
    height: 28px;
    line-height: 28px;
    border-radius: 14px;
    color: #acacac;
    display: flex;
    align-content: center;
    font-size: 3vw;
  }

  .search-icon {
    position: absolute;
    left: 10px;
    margin-left: 13px;
    margin-right: 6px;
  }

  .search-icon .iconfont {
    font-size: 17px;
    padding-top: 5px;
  }

  .search-box .ipt {
    margin-left: 3vw;
    background-color: #f0f0f0;
    padding: 0 15px 0 30px;
    line-height: 28px;
    color: #acacac;
    height: 28px;
    border-radius: 14px;
    width: 100%;
    box-sizing: border-box;
    border: none;
    outline: none;
  }

  ::-webkit-scrollbar {
    width: 0;
    height: 0;
    color: transparent;
  }

  .page-content {
    position: relative;
    width: 100vw;
    flex-shrink: 0;
    flex-grow: 1;
  }

  .page-category {
    position: absolute;
    top: 0;
    left: 0;
    width: 25vw;
    height: 85vh;
    background: #f8f8f7;
  }

  .category-item {
    position: relative;
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    font-size: 12px;
    padding-left: 3vw;
    color: #787878;
    line-height: 15px;
  }

  .category-item div {
    max-width: 68px;
    text-align: center;
  }

  .category-item .item-border {
    position: absolute;
    top: 18px;
    left: 0px;
    display: none;
    width: 4px;
    height: 14px;
    background: linear-gradient(#ff7955, #ff4242);
  }

  .category-item.active {
    background: #fff;
    font-weight: 500;
    color: #333;
  }

  .category-item .active .item-border {
    display: block;
  }

  .page-list {
    position: absolute;
    left: 25vw;
    width: 75vw;
    height: 70vh;
    padding-top: 5px;
    box-sizing: border-box;
  }

  .page-list .scroll-col-tip-top, .page-list .scroll-col-tip-bottom {
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #aaa;
    font-size: 12px;
    line-height: 12px;
  }

  .page-list .scroll-col-tip-top img, .page-list .scroll-col-tip-bottom img {
    width: 12px;
    height: 8px;
    margin-right: 4px;
  }

  .mask {
    position: fixed;
    left: 0;
    right: 0;
    top: 42px;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 10;
  }

  .tabbar {
    height: 50px;
    width: 100%;
  }

  .none-rush-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 70px;
  }

  .none-rush-list .img-div {
    width: 120px;
    height: 120px;
    margin-bottom: 15px;
  }

  .none-rush-list .h1 {
    font-size: 16px;
    line-height: 16px;
    color: #444;
    margin-bottom: 10px;
  }

  .none-rush-list .h2 {
    font-size: 12px;
    line-height: 12px;
    color: #aaa;
  }

  .sub-cate {
    position: relative;
    line-height: 50px;
    overflow: hidden;
    white-space: nowrap;
    width: 75vw;
    padding: 0 10px;
    box-sizing: border-box;
    font-size: 13px;
    z-index: 20;
    background-color: #fff;
    display: flex;
    margin-left: 25vw;
  }

  .sub-cate-scroll {
    flex: 1;
    width: 0;
  }

  .sub-cate::after {
    content: "";
    position: absolute;
    left: 10px;
    right: 10px;
    bottom: 0;
    border-bottom: 1px solid #e5e5e5;
  }

  .sub-cate-item {
    display: inline;
    min-width: 40px;
    text-align: center;
    padding: 0 10px;
  }

  .sub-cate-item.active {
    color: #8ED9D1;
  }

  .icon-open {
    padding: 0 4px 0 10px;
    background-color: rgba(255, 255, 255, .9);
  }

  .openImg {
    width: 10px;
    height: 6px;
    transition: all 300ms ease-in;
  }

  .openImg.down {
    transform: rotate(180deg);
  }

  .hide-sub-item {
    line-height: 29px;
    text-align: right;
    width: 30%;
  }

  .upImg {
    width: 8px;
    height: 4px;
    vertical-align: middle;
  }

  .sub-cate-hide {
    position: absolute;
    left: 80px;
    right: 0;
    top: 45px;
    z-index: 500;
    background-color: #fff;
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    max-height: 150px;
    overflow-y: auto;
    align-items: center;
  }

  .sub-cate-hide .sub-cate-item {
    border: 1px solid #999999;
    border-radius: 15px;
    color: #999;
    margin: 0 1% 5px;
    width: 22%;
    font-size: 12px;
    padding-top: 5px;
    padding-bottom: 5px;
  }

  .sub-cate-hide .sub-cate-item.active {
    background-color: #8ED9D1;
    color: #fff;
    border: 1px solid #8ED9D1;
  }

  .pt50 {
    padding-top: 50px;
  }

  .mask {
    position: fixed;
    left: 80px;
    right: 0;
    top: 42px;
    bottom: 0;
    background: rgba(0, 0, 0, .4);
    z-index: 10;
  }
</style>
