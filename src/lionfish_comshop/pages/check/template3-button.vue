<template>

  <div class="goods-wrapper">
    <div class="logo">
        <img class="logo-img" src="@/assets/images/logo 1.png"/>
    </div>
    
    <div class="wrapper" style="background: red;width: 80vw;height: 80vw;margin: 0 auto;">
      <swiper :options="swiperOption">
        <swiper-slide v-for="(item,index) in goods_image" :key="item.id">
          <div v-if="goods.video!=''&&goods.video!=null">
            <img bindload="imageLoad" @click="predivImg" style="height: 80vw; width: 80vw; margin: 0 auto;" :data-idx="index" lazyLoad="true" 
                  :src="item.image" v-if="index!=0"/>
            <div class="video-wrap" v-else>
              <div v-if="fmShow">
                <div class="btn_div centerboth" v-if="item.video==''"></div>
                <div @click="btnPlay" class="btn_div centerboth" v-else>
                  <img src="@/assets/images/play.png"/>
                </div>
                <img bindload="imageLoad" @click="predivImg" :data-idx="index" lazyLoad="true" style="height: 80vw; width: 80vw;margin: 0 auto;"
                      :src="item.image"/>
              </div>
              <video bindended="videEnd" class="swiper-video" v-show="fmShow" id="myVideo" objectFit="contain"
                      :src="goods.video"></video>

            </div>
          </div>
          <img bindload="imageLoad" @click="predivImg" width="100%" :data-idx="index" lazyLoad="true" style="height: 80vw; width: 80vw; margin: 0 auto;"
                :src="item.image" v-else/>
        </swiper-slide>
        <div class="swiper-pagination"  slot="pagination" style="padding-bottom: 0px;"></div>
      </swiper>
    </div>

    <div style="width: 80vw;margin: 0 auto;background: red;height: 15vw;text-align:center" id="clickDiv1" onclick="turnShow()">
        <div style="width: 100%;height: 0.64rem;margin-top: 0.3rem;">
            <img src="${pageContext.request.contextPath}/static/images/12template right@3X.png" style="vertical-align:middle;height: 0.377rem;position: relative;top: 0.4rem"/>&nbsp;
            <lable style="font-size: 0.346667rem; font-weight: 800;vertical-align:middle;font-family: PingFangSC-Semibold;position: relative;top: 0.4rem">成功验证 3 次</lable>&nbsp;&nbsp;&nbsp;
            <img id="img1" src="${pageContext.request.contextPath}/static/images/xiala.png" style="vertical-align:middle;height: 0.156rem;position: relative;top: 0.4rem"/>
        </div>
        <div style="height: 0.4rem;width: 100%;position: relative;top: 0.6rem">
            <span style="font-size: 0.3rem;color: #000000;font-family: PingFangSC-Semibold;">动态验证码 / ${chk}</span>
        </div>
        <div style="height: 0.3rem;width: 100%;margin-top: 0.02rem;position: relative;top: 0.6rem">
            <!--<span style="font-size: 0.25rem;color: #B8BBBE;letter-spacing: 0;font-family: PingFangSC-Semibold;">查询者所在地${address}</span>-->
        </div>
        <div id="clickDiv2" style="background-color: #F8F8F9;border-radius: 6px;border-radius: 6px;width: 7.2rem;height: 4.0rem;float: left;margin: 0.8rem 0.3333rem;display: none">
            <div style="width: 5.4667rem;height: 2.8rem;margin: 0.35rem auto;padding-top: 0.5rem;">
                    <span style="opacity: 0.99;font-family: PingFangSC-Regular;font-size: 0.3rem;color: #72727F;letter-spacing: 0.0rem;text-align: justify;line-height: 0.4533rem;">
                        以上动态码由NFC标签芯片对内部产生的随机数、计数器值签名运算产生，用于验证标签的真实性。该码每次读取变化，30秒内验证使用有效，超过30秒再次查询会验证失败。请认准${checkName}域名。
                    </span>
            </div>
        </div>
    </div>
    
  </div>

</template>

<script>

  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import GlobalMixin from '../../mixin/globalMixin.js'
  import status from '../../utils/index.js'
  import util from '../../utils/index.js'
  //  require("swiper/dist/css/swiper.css");

  var _extends = Object.assign || function(t) {
    for (var a = 1; a < arguments.length; a++) {
      var e = arguments[a]
      for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o])
    }
    return t
  }
  var detailClearTime = null

  function count_down(t, a) {

    var e = Math.floor(a / 1000), o = e / 3600 / 24, i = Math.floor(o), s = e / 3600 - 24 * i, n = Math.floor(s),
      d = e / 60 - 1440 * i - 60 * n, r = Math.floor(d), c = e - 86400 * i - 3600 * n - 60 * r

    t.endtime = {
      days: fill_zero_prefix(i),
      hours: fill_zero_prefix(n),
      minutes: fill_zero_prefix(r),
      seconds: fill_zero_prefix(c),
      show_detail: 1
    }
    if (a <= 0) {
      clearTimeout(detailClearTime)
      t.endtime = {
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00'
      }
      return
    }
    t.$forceUpdate()
    detailClearTime = setTimeout(function() {
      count_down(t, a -= 1000)
    }, 1000)
  }

  function fill_zero_prefix(t) {
    return t < 10 ? '0' + t : t
  }

  export default {
    mixins: [GlobalMixin],
    swiper: [swiper],
    swiperSlide: [swiperSlide],
    name: 'goods-goodsDetail',
    data() {
      return {
        endtime: {
          days: '00',
          hours: '00',
          minutes: '00',
          seconds: '00'
        },
        swiperOption:{
            //显示分页
            pagination: {
              el: '.swiper-pagination',
              clickable:true
            },
            //设置点击箭头
            // navigation: {
            //   nextEl: '.swiper-button-next',
            //   prevEl: '.swiper-button-prev'
            // },
            //自动轮播
            // autoplay: {
            //   delay: 2000,
            //   //当用户滑动图片后继续自动轮播
            //   disableOnInteraction: false,
            // },
            //开启循环模式
            // loop: true
        },
        goods_id: 0,
        size: 1,
        showHexiaoModal: false,
        indexcomminggoodsbitmap: require('@/assets/images/index-comming-goods-bitmap.png'),
        needAuth: false,
        goodsIndex: 1,
        goods_id: 0,
        endtime: {
          days: '00',
          hours: '00',
          minutes: '00',
          seconds: '00'
        },
        is_share_html: false,
        stickyFlag: false,
        showSkeleton: true,
        imageSize: {
          imageWidth: '100%',
          imageHeight: 300
        },
        cartNum: 0,
        noIns: false,
        index_bottom_image: '',
        hideModal: true,
        shareImgUrl: '',
        goods_details_middle_image: '',
        is_show_buy_record: 0,
        stopNotify: true,
        iconArr: {
          home: '@/assets/images/icon-tab-index.png',
          car: '@/assets/images/icon-tab-shop.png'
        },
        canvasWidth: 375,
        canvasHeight: 300,
        fmShow: true,
        relative_goods_list: [],
        needPosition: false,
        groupInfo: {
          group_name: '社区',
          owner_name: '团长'
        },
        showCoverVideo: false,

        stickyFlag: false,

        imageUrl: '',
        goodsImg: '',
        currentOptions: [],
        focusFlag: false,
        buy_type: '',
        $data: {
          id: '',
          scene: '',
          community_id: 0
        },
        canvasWidth: 500,
        canvasHeight: .8 * 600,
        buy_type: 'dan',
        goods_id: '',
        windowWidth: document.body.clientWidth,     // 屏幕宽
        windowHeight: document.body.clientHeight,    // 屏幕高

        showCoverVideo: false,
        order_comment_count: 0,
        comment_list: [],
        goods: {
          label_info: {}
        },
        options: {},
        order: {
          goods_id: '',
          pin_id: ''
        },
        share_title: '',
        buy_record_arr: [],
        goods_image: [],
        goods_image_length: 0,
        service: '',
        showSkeleton: false,
        is_comunity_rest: 0,
        prevImgArr: [],
        open_man_orderbuy: false,
        man_orderbuy_money: 0,
        goodsdetails_addcart_bg_color: 'linear-gradient(270deg, #f9c706 0%, #feb600 100%)',
        goodsdetails_buy_bg_color: 'linear-gradient(90deg, #ff5041 0%, #ff695c 100%)',
        isopen_community_group_share: 0,
        group_share_info: {},
        relative_goods_list: [],
        is_close_details_time: 0,
        is_open_vipcard_buy: 0,
        modify_vipcard_name: '',
        is_vip_card_member: 0,
        modify_vipcard_logo: '',
        is_commiss_mb: false,
        commiss_mb_money: 0,
        is_goods_head_mb: false,
        goods_head_money: 0,
        is_member_level_buy: false,
        is_need_subscript: false,
        need_subscript_template: false,
        is_can_headsales: false,
        is_only_hexiao: false,
        hexiao_arr: [],
        hx_len: 0,
        is_hide_details_count: 0,

        instructions: '',
        goods_details_middle_image: '',
        order_notify_switch: false,
        is_show_comment_list: 1,
        goods_details_price_bg: '',
        isShowContactBtn: 0,
        goods_industrial_switch: 0,
        goods_industrial: '',
        is_show_ziti_time: 0,
        hide_community_change_btn: 0,
        is_show_goodsdetails_communityinfo: 0,

        sku: [],
        sku_val: 1,
        skuList: {
          list: []
//          isLimit:false,
//          canBuyNum:0,
//          limitMemberNum:0,
//          limitOrderNum:0

        },
        cur_sku_arr: {
          skuImage: '',
          spuName: '',
          actPrice: [],
          marketPrice: [],
          card_price: 0,
          levelprice: 0,
          spec: '',
          stock: 0
        },
        is_just_addcar: 0,
        showVipModal: false,
        showSku: false
      }
    },
    created: function() {
      this.$wx.setNavigationBarTitle({
        title: 'check',
        showLogo: false,
        showMore: false,
        showBack: false
      })
      this.onLoad()
      this.onShow()
    },
    methods: {
      onLoad: function() {
        var e = this.$route.query
        this.$app.globalData.navBackUrl = ''
        var o = this
        status.setNavBgColor()
        status.setGroupInfo().then(function(t) {
          console.log(t, 'setGroupInfo')
          o.groupInfo = t
        })

//        status.setIcon().then(function(t) {
//          console.log(t,"setIcon");
//          o.iconArr= t;
//        });
        var t = decodeURIComponent(e.scene)
        if ('undefined' !== t) {
          var a = t.split('_')
          e.id = a[0], e.share_id = a[1], e.community_id = a[2]
        }
        'undefined' != e.share_id && 0 < e.share_id && this.$wx.setStorage({
          key: 'share_id',
          data: e.share_id
        })
        var s = e.type || ''
        this.buy_type = s, this.$data.id = e.id, this.$data.community_id = e.community_id,
          this.$data.scene = e.scene
        var i = {
          canvasWidth: o.windowWidth,
          canvasHeight: .8 * o.windowWidth,
          buy_type: s,
          goods_id: e.id
        }, n = this.$wx.getStorageSync('community'), d = n && n.communityId || ''
        if (
//            this.$wx.showLoading(),
          'undefined' != e.community_id && 0 < e.community_id && 'integral' != s) {
          if (d) {
            console.log('step3 本地社区存在'),
              this.paramHandle(e, n)
          } else {
            e.community_id, util.getCommunityInfo().then(function(t) {
              console.log('step1 分享来的社区', t), o.paramHandle(e, t)
            }).catch(function(t) {
              console.log('step4 新人'), '' != Object.keys(t) && util.addhistory(t, true)
            })
          }
        } else {
          util.getCommunityById(0).then(function(t) {
            if (console.log('没有分享社区直接访问', t), 1 == t.open_danhead_model) {
              var a = t.default_head_info
              console.log('default_head_info', a), this.$app.globalData.community = a, n && n.communityId != a.communityId && (this.$app.globalData.changedCommunity = true),
                util.addhistory(a), this.$wx.setStorage({
                key: 'community',
                data: a
              }), o.community = a, o.get_goods_details(e.id, a, '')
            } else {
              util.getCommunityInfo().then(function(t) {
                t ? (o.community = t, o.get_goods_details(e.id, '', t.communityId)) : (o.community = n, o.get_goods_details(e.id, '', d))
              })
            }
          })
        }
//        o.setData(i);
        o.canvasWidth = i.canvasWidth,
          o.canvasHeight = i.canvasHeight,
          o.buy_type = i.buy_type
        o.goods_id = i.goods_id
        this.get_instructions()
      },
      paramHandle: function(s) {
        var i = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : ''
        console.log('step2')
        var n = this, d = s.id, r = s.community_id
        n.$http({
          controller: 'index.get_community_info',
          community_id: r
        }).then(t => {
          console.log(t, 'get_community_info')
          if (0 == t.data.code) {
            var a = t.data.data
            console.log(a)
            var e = i.communityId
            if (1 == t.data.open_danhead_model) {
              var o = t.data.default_head_info
              this.$app.globalData.community = o, i && i.communityId != o.communityId && (this.$app.globalData.changedCommunity = true),
                util.addhistory(o), this.$wx.setStorage({
                key: 'community',
                data: o
              }), n.community = o, n.get_goods_details(d, o, '')
            } else {
              if (e == r || '' == a) {
                console.log('step5 分享与本地相同'),
                  this.$wx.setStorageSync('community', a),
                  n.community = a,
                  n.get_goods_details(s.id, '', r)
              } else {
                if (e) {
                  n.showChangeCommunity = true,
                    n.changeCommunity = a,
                    n.community = i, n.get_goods_details(s.id, '', e)
                } else {
                  n.changeCommunity = a, n.confrimChangeCommunity()
                }
              }
            }

          }
        })
      },
      get_goods_details: function(t, a, A) {

        var a = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "", A = arguments[2];
        var L = this
        if (!t) {
          //        this.$wx.hideLoading(),
          this.$wx.showModal({
            title: '提示',
            content: '参数错误',
            showCancel: false,
            confirmColor: '#F75451',
            success: function(ret) {
              ret.confirm && this.$wx.redirectTo({
                url: '/lionfish_comshop/pages/index/index'
              })
            }
          })
          return false
        }

        var e = this.$wx.getStorageSync('token')
        var currentCommunity_id = 0
        if (a) currentCommunity_id = a.communityId
        this.$http({
          controller: 'goods.get_goods_detail',
          token: e,
          id: t,
          community_id: 1022
        }).then(t => {
          console.log(t, 'get_goods_detail')
//            setTimeout(function() {
//              this.$wx.hideLoading();
//            }, 1e3);
          var a = t.data, e = a.goods, o = a.is_can_headsales
          if (e && 0 != e.length && '' != Object.keys(e) || this.$wx.showModal({
            title: '提示',
            content: '该商品不存在，回首页',
            showCancel: false,
            confirmColor: '#F75451',
            success: function(t) {
              t.confirm && this.$wx.switchTab({
                url: '/lionfish_comshop/pages/index/index'
              })
            }
          }), 0 == o && 'integral' != L.buy_type) {
            var s = L.data.groupInfo
            this.$app.util.message('此商品在您所属' + s.group_name + '不可参与', 'switchTo:/lionfish_comshop/pages/index/index', 'error')
          }

          var i = t.comment_list
          i.map(function(t) {
            3 < 14 * t.content.length / L.windowWidth && (t.showOpen = true),
              t.isOpen = true
          })
          var n = t.data.goods_image, d = []
          n.forEach(function(t) {
            d.push(t.image)
          })
          var r = t.isopen_community_group_share || 0, c = t.group_share_info, u = t.data.relative_goods_list || [],
            l = []
          '[object Object]' == Object.prototype.toString.call(u) && 0 < Object.keys(u).length ? Object.keys(u).forEach(function(t) {
            l.push(u[t])
          }) : l = u
          var _ = t.data, m = _.is_need_subscript, g = _.need_subscript_template, h = _.is_open_vipcard_buy,
            f = _.modify_vipcard_name, p = _.is_vip_card_member, y = _.modify_vipcard_logo, v = _.is_member_level_buy,
            x = _.is_only_hexiao, w = _.hexiao_arr, b = _.is_hide_details_count, k = e.price || 0,
            I = e.card_price || 0
          e.feePrice = (k - I).toFixed(2)
          var P = t.data, C = P.is_commiss_mb, D = P.commiss_mb_money, T = P.is_goods_head_mb, S = P.goods_head_money,
            M = w ? Object.keys(w).length : 0
          L.currentOptions = t.data.options
          var N = false

          e.video && 1 == t.is_open_goods_full_video && (N = true)

          L.showCoverVideo = N,
            L.order_comment_count = t.order_comment_count,
            L.comment_list = i,
            L.goods = e,
            L.options = t.data.options

          L.order = {
            goods_id: t.data.goods.goods_id,
            pin_id: t.data.pin_id
          }
          L.share_title = e.share_title,
            L.buy_record_arr = t.data.buy_record_arr,
            L.goods_image = t.data.goods_image,
            L.goods_image_length = t.data.goods_image.length,
            L.service = e.tag,
            L.showSkeleton = false,
            L.is_comunity_rest = t.is_comunity_rest,
            L.prevImgArr = d,
            L.open_man_orderbuy = t.open_man_orderbuy,
            L.man_orderbuy_money = t.man_orderbuy_money,
            L.goodsdetails_addcart_bg_color = t.goodsdetails_addcart_bg_color || 'linear-gradient(270deg, #f9c706 0%, #feb600 100%)',
            L.goodsdetails_buy_bg_color = t.goodsdetails_buy_bg_color || 'linear-gradient(90deg, #ff5041 0%, #ff695c 100%)',
            L.isopen_community_group_share = r,
            L.group_share_info = c,
            L.relative_goods_list = l,
            L.needPosition = !!A,
            L.is_close_details_time = t.is_close_details_time || 0,
            L.is_open_vipcard_buy = h || 0,
            L.modify_vipcard_name = f,
            L.is_vip_card_member = p || 0,
            L.modify_vipcard_logo = y,
            L.is_commiss_mb = C,
            L.commiss_mb_money = D,
            L.is_goods_head_mb = T,
            L.goods_head_money = S,
            L.is_member_level_buy = v,
            L.is_need_subscript = m,
            L.need_subscript_template = g,
            L.is_can_headsales = o,
            L.is_only_hexiao = x,
            L.hexiao_arr = w,
            L.hx_len = M,
            L.is_hide_details_count = b

          L.skuList = {
            list: [
//                  {
//                isLimit:false,
//                canBuyNum:0,
//                limitMemberNum:0,
//                limitOrderNum:0
//              }
            ]
          }
          L.cur_sku_arr = {
            skuImage: '',
            spuName: '',
            actPrice: [],
            marketPrice: [],
            card_price: 0,
            levelprice: 0,
            spec: '',
            stock: 0
          }
          L.visible = false
          //L.noIns = false
          L.cartNum = L.cartNum ? L.cartNum : 0
          L.showVipModal = false
          L.showHexiaoModal = false
          L.sku_val = 1
          L.size = 1

          L.endtime = {
            days: '00',
            hours: '00',
            minutes: '00',
            seconds: '00'
          }

          L.$forceUpdate()
          var goods_share_image = e.goods_share_image
          if (goods_share_image) {
            console.log('draw分享图')
          }//            status.download(goods_share_image + "?imagediv2/1/w/500/h/400").then(function(t) {
//            L.goodsImg = t.tempFilePath, L.drawImgNoPrice();
//          });
          else {
            console.log('draw价格')
            var a = e.image_thumb
//            status.download(a + "?imagediv2/1/w/500/h/400").then(function(t) {
//              L.goodsImg = t.tempFilePath, L.drawImg();
//            });
          }

          1 == t.is_comunity_rest && this.$wx.showModal({
            title: '温馨提示',
            content: L.groupInfo.owner_name + '休息中，欢迎下次光临!',
            showCancel: false,
            confirmColor: '#F75451',
            confirmText: '好的',
            success: function(t) {
            }
          })
//            var j = 0;
//            0 < (j = 0 == e.over_type ? 1000 * (e.begin_time - t.cur_time) : 1000 * (e.end_time - t.cur_time)) && count_down(L, j);

          let over_type = e.over_type
          var seconds = 0
          if (over_type == 0) {
            seconds = (e.begin_time - t.data.cur_time) * 1000
          } else {
            seconds = (e.end_time - t.data.cur_time) * 1000
          }
          if (seconds > 0) {
            count_down(L, seconds)
          }

        })
      },
      confrimChangeCommunity: function() {
        var t = this.changeCommunity, a = this.$wx.getStorageSync('token')
        this.$app.globalData.community = t, this.$app.globalData.changedCommunity = true, this.$wx.setStorage({
          key: 'community',
          data: t
        }), a && util.addhistory(t), this.setData({
          community: t,
          showChangeCommunity: false
        }), this.get_goods_details(this.goods_id, t, t.communityId), console.log('用户点击确定')
      },
      cancelChangeCommunity: function() {
        var t = this.data, a = t.is_can_headsales, e = t.groupInfo
        0 == a && this.$app.util.message('此商品在您所属' + e.group_name + '不可参与', 'switchTo:/lionfish_comshop/pages/index/index', 'error'),
          console.log('取消切换')
      },
      authSuccess: function() {
        var t = this.$data.id, a = this.$data.scene,
          e = '/lionfish_comshop/pages/goods/goodsDetail?id=' + t + '&community_id=' + this.$data.community_id + '&scene=' + a
        this.$app.globalData.navBackUrl = e
        var o = this.$wx.getStorageSync('community'), s = this.needPosition
        this.needAuth = false, o && (s = false), s || this.$wx.redirectTo({
          url: e
        })
      },
      authModal: function() {

        if (this.needAuth) {
          this.showAuthModal = !this.showAuthModal
//          return false;
        }
        if (this.showAuthModal) {
          this.$wx.navigateTo({
            url: '/login'
          })
        }
        return true

      },
      imageLoad: function(t) {
//        var a = util.imageUtil(t);
//        this.imageSize= a;
      },
      get_instructions: function() {
        var e = this, t = this.$data.id
        this.$http({
          controller: 'goods.get_instructions',
          goods_id: t
        }).then(t => {
          console.log(t, 'get_instructions')
          if (0 == t.code) {
            var a = t.data.value

            if ('' == a) {

              e.noIns = true
            }

            e.instructions = a,
              e.index_bottom_image = t.data.index_bottom_image,
              e.goods_details_middle_image = t.data.goods_details_middle_image,
              e.is_show_buy_record = t.data.is_show_buy_record,
              //e.is_show_buy_record= 1,
              e.order_notify_switch = t.data.order_notify_switch,
              e.is_show_comment_list = t.data.is_show_comment_list,
              //e.is_show_comment_list= 1,
              e.goods_details_price_bg = t.data.goods_details_price_bg,
              e.isShowContactBtn = t.data.index_service_switch || 0,
              e.goods_industrial_switch = t.data.goods_industrial_switch || 0,
              e.goods_industrial = t.data.goods_industrial || '',
              e.is_show_ziti_time = parseInt(t.data.is_show_ziti_time) || 0,
              e.hide_community_change_btn = t.data.hide_community_change_btn || 0,
              e.is_show_goodsdetails_communityinfo = t.data.is_show_goodsdetails_communityinfo || 0
          }
        })
      },
      returnTop: function() {
        this.stickyFlag = false, this.setData({
          stickyFlag: false
        }), this.$wx.pageScrollTo({
          scrollTop: 0,
          duration: 500
        })
      },
      addToCart: function(t) {

        if (this.authModal()) {

          var a = t.detail.formId
          var e = this.$wx.getStorageSync('token')
          this.$http({
            controller: 'user.get_member_form_id',
            token: e,
            from_id: a
          }).then(t => {
          })
          this.is_just_addcar = 1
          this.openSku()
        }
      },
      openSku: function() {

        var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : null
        if (this.authModal()) {

          var a = this, e = this.is_just_addcar
          if (t) {
            var o = t.detail, s = o.actId, i = o.skuList
            e = 1
          } else {
            s = this.goods_id, i = this.currentOptions
          }
          a.addCar_goodsid = s
          var n = i.list || [], d = []
          if (0 < n.length) {
            for (var r = 0; r < n.length; r++) {
              var c = n[r].option_value[0], u = {
                name: c.name,
                id: c.option_value_id,
                index: r,
                idx: 0
              }
              d.push(u)
            }
            for (var l = '', _ = 0; _ < d.length; _++) _ == d.length - 1 ? l += d[_].id : l = l + d[_].id + '_'
            var m = i.sku_mu_list[l]

            a.sku = d,
              a.sku_val = 1,
              a.cur_sku_arr = m,
              a.skuList = i,
              a.visible = true,
              a.showSku = true,
              a.is_just_addcar = e

          } else if (t) {
            var g = o.allData

            a.sku = [],
              a.sku_val = 1,
              a.skuList = [],
              a.cur_sku_arr = g,
              a.is_just_addcar = e
            var h = {
              detail: {
                formId: ''
              }
            }
            h.detail.formId = 'the formId is a mock one', a.gocarfrom(h)
          } else {
            var f = this.goods, p = f.card_price || '0.00', y = f.levelprice || '0.00', v = {
              canBuyNum: f.total,
              spuName: f.goodsname,
              actPrice: f.actPrice,
              marketPrice: f.marketPrice,
              stock: f.total,
              skuImage: f.image_thumb,
              card_price: p,
              levelprice: y
            }

            a.sku = [],
              a.sku_val = 1,
              a.cur_sku_arr = v,
              a.skuList = [],
              a.visible = true,
              a.showSku = true
            a.$forceUpdate()
          }
        }
      },
      gocarfrom: function(t) {
//        this.is_just_addcar;
        this.$wx.showLoading()
        var a = this.$wx.getStorageSync('token')
        this.$http({
          controller: 'user.get_member_form_id',
          token: a,
          from_id: t.detail.formId
        }).then(t => {
        })
        this.goOrder()
      },
      closeSku: function() {
        this.visible = false,
          this.stopClick = false
        this.$forceUpdate()
      },
      goOrder: function() {
        var i = this
        if (i.can_car && (i.can_car = false), 1 == this.open_man_orderbuy && 0 == this.is_just_addcar) {
          var t = 1 * this.man_orderbuy_money, a = this.sku_val, e = this.cur_sku_arr,
            o = e.actPrice[0] + '.' + e.actPrice[1]
          if (console.log(1 * o * a), 1 * o * a < t) {
            return this.$wx.showToast({
              title: '满' + t + '元可下单！',
              icon: 'none'
            }), false
          }
        }
        this.$wx.getStorageSync('token')
        var s = this.$wx.getStorageSync('community'), n = i.addCar_goodsid, d = s.communityId, r = i.sku_val,
          c = i.cur_sku_arr, u = '', l = i.is_just_addcar
        c && c.option_item_ids && (u = c.option_item_ids)
        var _ = this.buy_type ? this.buy_type : 'dan', m = {
          goods_id: n,
          community_id: d,
          quantity: r,
          sku_str: u,
          buy_type: _,
          pin_id: 0,
          is_just_addcar: l
        }
        util.addCart(m).then(function(t) {
          console.log(m, 'addCart')

          if (1 == t.showVipModal) {
            var a = t.data.pop_vipmember_buyimage
//            this.$wx.hideLoading(),
            i.pop_vipmember_buyimage = a,
              i.showVipModal = true,
              i.visible = false

          } else if (3 == t.code || 7 == t.code) {
            i.$wx.showToast({
              title: t.msg,
              icon: 'none',
              duration: 2e3
            })
          } else if ('integral' == _) {
            if (6 == t.code) {
              var e = t.msg
              i.$wx.showToast({
                title: e,
                icon: 'none',
                duration: 2e3
              })
            } else {
              i.$wx.navigateTo({
                url: '/lionfish_comshop/pages/order/placeOrder?type=integral'
              })
            }
          } else if (4 == t.code)
//              this.$wx.hideLoading(),
          {
            i.needAuth = true,
              i.showAuthModal = true,
              i.visible = false

          } else if (6 == t.code) {
            e = t.msg
            var o = t.max_quantity || ''
            if (0 < o) {
              i.sku_val = o
              this.$wx.showToast({
                title: e,
                icon: 'none',
                duration: 2e3
              })
            }
          } else if (1 == l) {

            i.closeSku()
            i.$wx.showToast({
              title: 'Added to Cart',
              image: '@/assets/images/addShopCart.png'
            })
            i.$app.globalData.cartNum = t.total
            i.cartNum = t.total
            status.indexListCarCount(n)
          } else {
            var s = t.is_limit_distance_buy
//            3 < getCurrentPages().length ? this.$wx.redirectTo({
//              url: "/lionfish_comshop/pages/order/placeOrder?type=dan&is_limit=" + s
//            }) : this.$wx.navigateTo({
//              url: "/lionfish_comshop/pages/order/placeOrder?type=dan&is_limit=" + s
//            });
            i.$wx.redirectTo({
              url: '/lionfish_comshop/pages/order/placeOrder?type=dan&is_limit=' + s
            })
          }
        }).catch(function(t) {
          this.$wx.showToast({
            title: t || '请求失败',
            icon: 'none',
            duration: 2000
          })
        })
      },
      vipModal: function(t) {
        this.setData(t.detail)
      },
      selectSku: function(t) {
        var a = t.currentTarget.dataset.type.split('_'), e = this, o = e.sku, s = e.skuList, i = e.sku_val, n = {
          name: a[3],
          id: a[2],
          index: a[0],
          idx: a[1]
        }
        o.splice(a[0], 1, n)
        for (var d = '', r = 0; r < o.length; r++) r == o.length - 1 ? d += o[r].id : d = d + o[r].id + '_'
        var c = s.sku_mu_list[d], u = {};
        (i = i || 1) > c.canBuyNum && (u.sku_val = c.canBuyNum, this.$wx.showToast({
          title: '最多只能购买' + c.canBuyNum + '件',
          icon: 'none'
        }))
        var ext = _extends({
          cur_sku_arr: c,
          sku: o
        }, u)
        console.log(d)
      },
      submit: function(t) {
        var a = t.detail.formId, e = this.$wx.getStorageSync('token')
        this.$http({

          controller: 'user.get_member_form_id',
          token: e,
          from_id: a
        }).then(t => {
        })
      },
      balance: function(t) {
        if (this.authModal()) {
          this.is_just_addcar = 0
          this.openSku()
        }
      },
      setNum: function(t) {

        var a = t.currentTarget.dataset.type, e = 1, o = 1 * this.sku_val
        'add' == a ? e = o + 1 : 'decrease' == a && 1 < o && (e = o - 1)
        var s = this.sku, i = this.skuList
        if (0 < s.length) for (var n = '', d = 0; d < s.length; d++) d == s.length - 1 ? n += s[d].id : n = n + s[d].id + '_'
        0 < i.length ? e > i.sku_mu_list[n].canBuyNum && (e -= 1) : e > this.cur_sku_arr.canBuyNum && (e -= 1)
        this.sku_val = e
        this.visible = true
        this.$forceUpdate()
      },
      scrollImagesChange: function(t) {
        this.videoContext.pause(), this.fmShow = true,
          this.goodsIndex = t.detail.current + 1
      },
      share_handler: function() {
        this.is_share_html = true
      },
      share_whatsapp: function() {
        const text = this.goods.goodsname
        const url = 'https://www.mart.com.sg/#/lionfish_comshop/pages/goods/goodsDetail?id=' + this.order.goods_id
        location = 'whatsapp://send?text=' + encodeURIComponent(text) + encodeURIComponent('\n\n' + url) + '&via=lopscoop'
        this.is_share_html = false
      },
      hide_share_handler: function() {
        this.is_share_html = false
      },
      share_quan: function() {
        if (this.authModal()) {
          this.$wx.showLoading({
            title: '获取中'
          })
          var t = this.$wx.getStorageSync('token'), a = this.$wx.getStorageSync('community'), e = this.order.goods_id,
            o = a.communityId, s = this
          this.$http({

            controller: 'goods.get_user_goods_qrcode',
            token: t,
            community_id: o,
            goods_id: e
          }).then(t => {
            console.log(t, 'get_user_goods_qrcode')
            if (0 == t.code) {
//                setTimeout(function() {
//                  this.$wx.hideLoading();
//                }, 2e3);
              var a = t.image_path
              this.$wx.getImageInfo({
                src: a,
                success: function(t) {
                  var a = t.path
//                    this.$wx.saveImageToPhotosAlbum({
//                      filePath: a,
//                      success: function(t) {
//                        this.$wx.showToast({
//                          title: "图片保存成功，可以分享了",
//                          icon: "none",
//                          duration: 2e3
//                        }), s.is_share_html= true;
//                      }
//                    });
                }
              })
            } else {
              s.needAuth = true
            }
          })
        }
      },
      onShow: function() {
//        var a = this;
//        util.check_login_new().then(function(t) {
//            console.log(t,"check_login_new");
//          t ? (0, status.cartNum)("", true).then(function(t) {
//            if (0 == t.code) a.cartNum= t.data;
//          }) : a.needAuth= true;
//        });
        var a = this
        util.check_login_new().then(function(t) {

          if (!t) {
            a.needAuth = !0
          } else {
            status.cartNum().then(function(e) {

              if (0 == e.code) {
                a.cartNum = e.data
                a.$forceUpdate()
              }
            })
          }
        })
        this.stopNotify = false
      },
      onReady: function(t) {
        this.videoContext = this.$wx.createVideoContext('myVideo'), this.coverVideoContext = this.$wx.createVideoContext('coverVideo')
      },
      onHide: function() {
        this.stopNotify = true, console.log('详情页hide', this.stopNotify)
      },
      onUnload: function() {
        console.log('onUnload'), this.stopNotify = true, console.log('详情页unload', this.stopNotify), detailClearTime = null, clearTimeout(detailClearTime)
      },
      get_share_img: function() {
        if (this.authModal()) {
          if (this.$wx.showLoading(), '' != this.shareImgUrl) {
            this.$wx.hideLoading(),
              this.hideModal = false,
              this.is_share_html = true
          } else {
            var t = this.$wx.getStorageSync('token'), a = this.$wx.getStorageSync('community'), e = this.goods_id,
              o = a.communityId, s = this
            this.$http({

              controller: 'goods.get_user_goods_qrcode',
              token: t,
              community_id: o,
              goods_id: e
            }).then(t => {
              if (0 == t.code) {
                this.$wx.hideLoading()
                var a = t.image_path
//                this.$wx.predivImage({
//                  current: a,
//                  urls: [ a ]
//                });
              } else {
                s.needAuth = true
              }
            })
          }
        }
      },
      closeShareModal: function() {
        this.hideModal = true
      },
      bindOpen: function(t) {
        var a = t.currentTarget.dataset.idx
        if (console.log(a), this.comment_list[a].isOpen) {
          this.comment_list[a].isOpen = false
          var e = this.comment_list
          this.comment_list = e
        } else {
          this.comment_list[a].isOpen = true
          e = this.comment_list
          this.comment_list = e
        }
      },
      saveThumb: function(t) {
        this.$wx.showLoading()
        var e = this, a = this.shareImgUrl
//        this.$wx.getImageInfo({
//          src: a,
//          success: function(t) {
//            var a = t.path;
//            a && this.$wx.saveImageToPhotosAlbum({
//              filePath: a,
//              success: function(t) {
//                console.log(t), this.$wx.hideLoading(), this.$wx.showToast({
//                  title: "已保存相册",
//                  icon: "none",
//                  duration: 2e3
//                }), e.hideModal= true;
//              },
//              fail: function(t) {
//                this.$wx.hideLoading(), console.log(t), "saveImageToPhotosAlbum:fail:auth denied" === t.errMsg && this.$wx.openSetting({
//                  success: function(t) {
//                    t.authSetting["scope.writePhotosAlbum"] ? console.log("获取权限成功，再次点击图片保存到相册") : console.log("获取权限失败");
//                  }
//                });
//              }
//            });
//          }
//        });
      },
      drawImgNoPrice: function() {
        var a = this
//        this.$wx.createSelectorQuery().select(".canvas-img").boundingClientRect(function() {
//          var t = this.$wx.createCanvasContext("myCanvas");
//          t.drawImage(a.goodsImg, 0, 0, status.getPx(375), status.getPx(300)), a.data.goods.video && t.drawImage("@/assets/images/play.png", status.getPx(127.5), status.getPx(90), status.getPx(120), status.getPx(120)),
//            t.save(), t.restore(), t.draw(false, a.checkCanvasNoPrice());
//        }).exec();
      },
      checkCanvasNoPrice: function() {
        var a = this
//        setTimeout(function() {
//          this.$wx.canvasToTempFilePath({
//            canvasId: "myCanvas",
//            success: function(t) {
//              t.tempFilePath ? a.imageUrl = t.tempFilePath : a.drawImgNoPrice(), console.log("我画完了");
//            },
//            fail: function(t) {
//              a.drawImgNoPrice();
//            }
//          });
//        }, 500);
      },
      drawImg: function() {
        var t = this.data.endtime, c = (0 < t.days ? t.days + '天' : '') + t.hours + ':' + t.minutes + ':' + t.seconds,
          u = this
        this.$wx.createSelectorQuery().select('.canvas-img').boundingClientRect(function() {
          var t = this.$wx.createCanvasContext('myCanvas')
          t.font = '28px Arial'
          var a = t.measureText('$').width + 2,
            e = t.measureText(u.data.goods.price_front + '.' + u.data.goods.price_after).width
          t.font = '17px Arial'
          var o = t.measureText('$' + u.data.goods.productprice).width + 3,
            s = t.measureText('累计销售 ' + u.data.goods.seller_count).width,
            i = t.measureText('· 剩余' + u.data.goods.total + ' ').width + 10
          t.font = '18px Arial'
          var n = 0 == u.data.goods.over_type ? '距开始' : '距结束', d = t.measureText(n).width,
            r = t.measureText(c).width + 10
          t.drawImage(u.goodsImg, 0, 0, status.getPx(375), status.getPx(300)), t.drawImage('@/assets/images/shareBottomBg.png', status.getPx(0), status.getPx(225), status.getPx(375), status.getPx(75)),
          u.data.goods.video && t.drawImage('@/assets/images/play.png', status.getPx(127.5), status.getPx(70), status.getPx(120), status.getPx(120)),
            t.save(), status.drawText(t, {
            color: '#ffffff',
            size: 28,
            textAlign: 'left'
          }, '$', status.getPx(6), status.getPx(267), status.getPx(a)), status.drawText(t, {
            color: '#ffffff',
            size: 28,
            textAlign: 'left'
          }, u.data.goods.price_front + '.' + u.data.goods.price_after, status.getPx(a), status.getPx(267), status.getPx(e)),
            t.restore(), t.save(), t.restore(), t.save(), (0, status.drawText)(t, {
            color: '#ffffff',
            size: 15,
            textAlign: 'left'
          }, '$' + u.data.goods.productprice, (0, status.getPx)(a + e + 10), (0, status.getPx)(267), (0,
            status.getPx)(o)), t.restore(), t.save(), (0, status.drawText)(t, {
            color: '#ffffff',
            size: 17,
            textAlign: 'left'
          }, '累计销售' + u.data.goods.seller_count, (0, status.getPx)(10), (0, status.getPx)(290), (0,
            status.getPx)(s)), t.restore(), t.save(), (0, status.drawText)(t, {
            color: '#ffffff',
            size: 17,
            textAlign: 'left'
          }, '· 剩余' + u.data.goods.total, (0, status.getPx)(s + 10), (0, status.getPx)(290), (0,
            status.getPx)(i)), t.restore(), t.save(), t.beginPath(), t.setStrokeStyle('white'),
            t.moveTo((0, status.getPx)(a + e + 10), (0, status.getPx)(261)), t.lineTo((0, status.getPx)(a + e + o + 15), (0,
            status.getPx)(261)), t.stroke(), t.restore(), t.save(), (0, status.drawText)(t, {
            color: '#F8E71C',
            size: 18,
            textAlign: 'center'
          }, n, (0, status.getPx)(318), (0, status.getPx)(260), (0, status.getPx)(d)), t.restore(),
            t.save(), (0, status.drawText)(t, {
            color: '#F8E71C',
            size: 18,
            textAlign: 'center'
          }, c, (0, status.getPx)(315), (0, status.getPx)(288), (0, status.getPx)(r)), t.restore(),
            t.draw(false, u.checkCanvas())
        }).exec()
      },
      checkCanvas: function() {
        var a = this
//        setTimeout(function() {
//          this.$wx.canvasToTempFilePath({
//            canvasId: "myCanvas",
//            success: function(t) {
//              t.tempFilePath ? a.imageUrl = t.tempFilePath : a.drawImg(), console.log("我画完了");
//            },
//            fail: function(t) {
//              a.drawImg();
//            }
//          });
//        }, 500);
      },
      predivImg: function(t) {
        var a = t.currentTarget.dataset.idx || 0, e = this.prevImgArr
//        this.$wx.predivImage({
//          current: e[a],
//          urls: e
//        });
      },
      btnPlay: function() {
        this.fmShow = false, this.videoContext.play()
      },
      videEnd: function() {
        this.fmShow = true
      },
      endPlay: function() {
        this.videoContext.pause(), this.fmShow = true
      },
      showGroupCode: function() {
        var t = this.group_share_info.share_wxcode || ''
//        t && this.$wx.predivImage({
//          current: t,
//          urls: [ t ]
//        });
      },
      changeCommunity: function() {
        if (0 == this.hide_community_change_btn) {
          var t = this.$data.id, a = this.$data.scene,
            e = '/lionfish_comshop/pages/goods/goodsDetail?id=' + t + '&community_id=' + this.$data.community_id + '&scene=' + a
//          this.$app.globalData.navBackUrl = e,
          this.$wx.redirectTo({
            url: '/lionfish_comshop/pages/position/community'
          })
        }
      },
      changeCartNum: function(t) {
        var a = t.detail
//        (0, status.cartNum)(this.cartNum= a);

        status.cartNum().then(function(e) {
          if (0 == e.code) {
            this.cartNum = e.data
          }
        })
      },
      goLink: function(t) {
        if (this.authModal()) {
          var a = t.currentTarget.dataset.link
//          3 < getCurrentPages().length ? this.$wx.redirectTo({
//            url: a
//          }) : this.$wx.navigateTo({
//            url: a
//          });

          this.$wx.navigateTo({
            url: a
          })
        }
      },
      handleFocus: function() {
        this.focusFlag = true
      },
      handleBlur: function(t) {
        var a = t.detail, e = parseInt(a.value)
        if ('' == e || isNaN(e)) this.sku_val = 1
      },
      changeNumber: function(t) {
        var a = this, e = a.cur_sku_arr, o = a.sku_val, s = 1 * e.stock, i = t.detail
        if (this.focusFlag = false, i) {
          var n = parseInt(i.value)
          s < (n = n < 1 ? 1 : n) ? (this.$wx.showToast({
            title: '最多只能购买' + s + '件',
            icon: 'none'
          }), o = s) : o = n
        }
        this.sku_val = o
      },
      handleHexiaoModal: function() {
        this.showHexiaoModal = !this.showHexiaoModal
      },
      coverVideoEnd: function() {
        this.showCoverVideo = false
      },
      closeCoverVideo: function() {
        this.coverVideoContext.pause(), this.setData({
          showCoverVideo: false
        })
      },
      onShareAppMessage: function() {
//        var t = this.$wx.getStorageSync("community"), a = (this.goods_id, t.communityId), e = this.share_title, o = this.$wx.getStorageSync("member_id"), s = "lionfish_comshop/pages/goods/goodsDetail?id=" + this.goods_id + "&share_id=" + o + "&community_id=" + a, i = this.data.goods.goods_share_image;
//        console.log("商品分享地址："), console.log(s);
//        return this.is_share_html= true,
//          this.hideModal= true, {
//          title: e,
//          path: s,
//          imageUrl: i || this.imageUrl,
//          success: function(t) {},
//          fail: function(t) {}
//        };
      },
      goLink2: function(event) {
        let link = event.currentTarget.dataset.link
        let id = event.currentTarget.dataset.id
        this.$wx.redirectTo({
          url: link + id
        })
      },
      close: function() {
        this.visible = false
      }
    }
  }
</script>
<style scoped>
  @import "../../../@feiying/8.less";

  page {
    background: #f6f6f6;
  }

  .wrapper >>> .swiper-pagination-bullet-active{
    background: #e95d2e
  }


  .goods-wrapper {
    position: relative;
    background: #fff;
  }

  .logo{
    background: #ffffff;
    width: 100%;
    height: 15vw;
  }

  .logo-img{
    margin-top: 3vw;
    margin-left: 3vw;
    height: 9vw;
  }

  swiper {
    height: 300px;
  }

  swiper img {
    width: 100%;
    height: auto;
  }

  .sticky-title {
    width: 100%;
    display: none;
    justify-content: space-between;
    background: #fff;
    height: 80px;
    position: relative;
    z-index: 3;
  }

  .sticky-title.sticky {
    position: fixed;
    display: flex;
    top: 0;
    left: 0;
    height: 40px;
    line-height: 40px;
    width: 100vw;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    animation: opacity 0.2s ease-in-out;
  }

  .sticky-title.sticky .nav {
    padding-left: 15px;
  }

  .sticky-title.sticky .nav .tab-btn {
    width: 28px;
    height: 40px;
    line-height: 40px;
    margin-right: 18px;
    color: #666;
    font-size: 14px;
    font-weight: bold;
    position: relative;
    display: inline-block;
  }

  .sticky-title.sticky .nav .tab-btn-active {
    color: #ff5344;
    line-height: 40px;
  }

  .sticky-title.sticky .nav .tab-btn-active:after {
    content: '';
    width: 28px;
    height: 3px;
    border-radius: 3px;
    background: linear-gradient(to right, #fe655c, #fa875b);
    position: absolute;
    bottom: 0;
    left: 0;
    box-shadow: 0 2px 4px rgba(255, 89, 9, 0.25);
  }

  .sticky-title.sticky .time {
    width: 145px;
    height: 40px;
    font-size: 13px;
    color: #444;
    display: flex;
    align-items: center;
    padding-right: 15px;
    justify-content: flex-end;
  }

  .sticky-title.sticky .time text {
    white-space: nowrap;
  }

  .sticky-title.sticky .time .countdownTop {
    font-size: 14px;
    white-space: nowrap;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .sticky-title.sticky .time .countdownTop .itemTimeTop {
    width: 19px;
    height: 16px;
    background: #444;
    border-radius: 2px;
    font-size: 13px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .spuInfoImg {
    width: 100%;
    height: 100%;
    background-size: 100% 100%;
    position: relative;
    background-color: red;
  }

  .spuInfoImg .share {
    width: 80px;
    height: 34px;
    background: linear-gradient(90deg, #f75451 0%, #fa6f57 100%);
    border-radius: 24px 0 0 24px;
    position: absolute;
    top: 30px;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .spuInfoImg .share .shareImg {
    width: 16px;
    height: 14px;
    margin-right: 7px;
  }

  .spuInfoImg .share text {
    width: 30px;
    height: 34px;
    line-height: 34px;
    font-size: 13px;
    color: #fff;
  }

  .spuInfoImg .current {
    width: 45px;
    height: 16px;
    line-height: 16px;
    text-align: center;
    border-radius: 12px;
    background-color: rgba(0, 0, 0, 0.5);
    font-size: 13px;
    color: #fff;
    position: absolute;
    left: 50%;
    bottom: 55px;
    margin-left: -22px;
    z-index: 1;
  }

  .spuInfoImg .slide-image {
    width: 100vw;
  }

  .spuInfo {
    width: 100%;
    z-index: 2;
    position: relative;
    margin-top: -50px;
  }

  .spuInfo .spuPrice {
    position: relative;
    width: 95vw;
    height: 50px;
    padding-left: 15px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .spuInfo .spuPrice .spuPriceBg {
    position: absolute;
    top: 0;
    left: 0;
    width: 95vw;
    height: 50px;
    z-index: -1;
  }

  .spuInfo .spuPrice .price {
    font-size: 14px;
    color: #fff;
    margin-top: 5px;
  }

  .spuInfo .spuPrice .price .salePrice {
    font-size: 34px;
    font-weight: bold;
  }

  .spuInfo .spuPrice .price .storePrice {
    text-decoration: line-through;
    margin-left: 5px;
  }

  .spuInfo .spuPrice .time {
    width: 110px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 13px;
    color: #f8e71c;
    white-space: nowrap;
  }

  .spuInfo .spuPrice .time text {
    line-height: 14px;
    margin-top: 5px;
  }

  .spuInfo .spuPrice .time .endAct {
    color: #fff;
  }

  .spuInfo .spuPrice .time .countdown {
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .spuInfo .spuPrice .time .countdown em {
    margin: 0;
  }

  .spuInfo .spuPrice .time .countdown .itemTime {
    width: 16px;
    text-align: center;
  }

  .spuInfo .bgOne {
    background: url("http://shiziyu.liofis.com/attachment/images/3/2019/01/s8DBXZhrLr998t89Tg8BblqnXbNB8r.png");
    background-size: 100% 100%;
  }

  .spuInfo .bgTwo {
    background: url("https://image.songshupinpin.com/goods_1540374630865.png");
    background-size: 100% 100%;
  }

  .spuInfo .spuDetailInfo, .spuInfo .straightInLive, .spuInfo .buyRecords {
    width: 95vw;
    background: #fff;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.05);
    border-radius: 0 0 5px 10px;
    padding: 5px 10px;
    margin: 0 auto;
  }

  .spuInfo .spuDetailInfo .spuName, .spuInfo .straightInLive .spuName, .spuInfo .buyRecords .spuName {
    font-size: 18px;
    color: #444;
    font-weight: bold;
    min-height: 24px;
    line-height: 22px;
    padding: 0 5px;
    white-space: initial;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .spuInfo .spuDetailInfo .remind, .spuInfo .straightInLive .remind, .spuInfo .buyRecords .remind {
    margin-top: 10px;
    display: flex;
    align-items: center;
    padding: 0 5px;
  }

  .spuInfo .spuDetailInfo .remind .remindImg, .spuInfo .straightInLive .remind .remindImg, .spuInfo .buyRecords .remind .remindImg {
    width: 14px;
    height: 14px;
    margin-right: 10px;
  }

  .spuInfo .spuDetailInfo .remind text, .spuInfo .straightInLive .remind text, .spuInfo .buyRecords .remind text {
    font-size: 13px;
    color: #aaa;
  }

  .spuInfo .spuDetailInfo .preferential, .spuInfo .straightInLive .preferential, .spuInfo .buyRecords .preferential {
    padding: 12px 10px;
    background: linear-gradient(223deg, #fff7f0 0%, #fff4ec 100%);
    border-radius: 8px;
    margin-top: 20px;
    margin-bottom: 5px;
    font-size: 12px;
    color: #ca7e57;
    font-weight: bold;
    line-height: 20px;
  }

  .spuInfo .spuDetailInfo .preferential .tit, .spuInfo .straightInLive .preferential .tit, .spuInfo .buyRecords .preferential .tit {
    font-size: 10px;
    color: #ff5344;
    border: 1px solid #ffa49c;
    border-radius: 8px;
    padding: 0 4px;
    margin-right: 5px;
  }

  .spuInfo .spuDetailInfo .preferential .con, .spuInfo .straightInLive .preferential .con, .spuInfo .buyRecords .preferential .con {
    margin-right: 10px;
  }

  .spuInfo .spuDetailInfo .purchasing, .spuInfo .spuDetailInfo .saleNum, .spuInfo .straightInLive .purchasing, .spuInfo .straightInLive .saleNum, .spuInfo .buyRecords .purchasing, .spuInfo .buyRecords .saleNum {
    font-size: 3.2vw;
    color: #666;
    padding: 15px 0 0;
    margin: 0 5px;
    border-bottom: 0.05px solid #efefef;
  }

  .spuInfo .spuDetailInfo .purchasing .purTit, .spuInfo .spuDetailInfo .saleNum .purTit, .spuInfo .straightInLive .purchasing .purTit, .spuInfo .straightInLive .saleNum .purTit, .spuInfo .buyRecords .purchasing .purTit, .spuInfo .buyRecords .saleNum .purTit {
    color: #444;
    font-weight: bold;
    margin-right: 10px;
  }

  .spuInfo .spuDetailInfo .purchasing .remaining, .spuInfo .spuDetailInfo .saleNum .remaining, .spuInfo .straightInLive .purchasing .remaining, .spuInfo .straightInLive .saleNum .remaining, .spuInfo .buyRecords .purchasing .remaining, .spuInfo .buyRecords .saleNum .remaining {
    font-weight: bold;
    margin: 0;
    color: #ff5344;
  }

  .spuInfo .spuDetailInfo .purchasing .stock, .spuInfo .spuDetailInfo .saleNum .stock, .spuInfo .straightInLive .purchasing .stock, .spuInfo .straightInLive .saleNum .stock, .spuInfo .buyRecords .purchasing .stock, .spuInfo .buyRecords .saleNum .stock {
    display: inline-block;
    font-weight: normal;
    margin: 0;
  }

  .spuInfo .spuDetailInfo .saleNum, .spuInfo .straightInLive .saleNum, .spuInfo .buyRecords .saleNum {
    border: none;
  }

  .spuInfo .spuDetailInfo .pre  {
    border: none;
    float:right;
    font-size: 3.2vw;
    color: #444;
    font-weight: bold;
  }

  .spuInfo .straightInLive, .spuInfo .buyRecords {
    width: 95vw;
    padding: 0 15px;
    border-radius: 10px;
    margin: 10px auto 0;
  }

  .spuInfo .straightInLive .title, .spuInfo .buyRecords .title {
    height: 50px;
    font-size: 16px;
    color: #444;
    font-weight: bold;
    border-bottom: 0.05px solid #efefef;
    display: flex;
    align-items: center;
  }

  .spuInfo .straightInLive .title .commentsNum, .spuInfo .buyRecords .title .commentsNum {
    font-size: 13px;
    color: #aaa;
    font-weight: normal;
  }

  .spuInfo .straightInLive .comments, .spuInfo .buyRecords .comments {
    margin-top: 15px;
  }

  .spuInfo .straightInLive .comments .commentsCon, .spuInfo .buyRecords .comments .commentsCon {
    font-size: 14px;
    color: #666;
    line-height: 22px;
    margin-bottom: 5px;
    word-wrap: break-word;
  }

  .spuInfo .straightInLive .comments .doubleHidden, .spuInfo .buyRecords .comments .doubleHidden {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    text-overflow: initial;
    white-space: normal;
  }

  .spuInfo .straightInLive .comments .commentsOpen, .spuInfo .buyRecords .comments .commentsOpen {
    height: 11px;
    font-size: 11px;
    color: #444;
    font-weight: bold;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
  }

  .spuInfo .straightInLive .comments .commentsOpen .commentsOpenImg, .spuInfo .buyRecords .comments .commentsOpen .commentsOpenImg {
    width: 8px;
    height: 4px;
    margin-left: 3px;
  }

  .spuInfo .straightInLive .comments .commentsOpen .down, .spuInfo .buyRecords .comments .commentsOpen .down {
    transform: rotate(180deg);
  }

  .spuInfo .straightInLive .comments .allImg, .spuInfo .buyRecords .comments .allImg {
    width: 95vw;
    height: 75px;
    overflow: hidden;
  }

  .spuInfo .straightInLive .comments .allImg {
    display: flex;
    overflow-x: auto;
  }

  ::-webkit-scrollbar {
    width: 0;
    height: 0;
    color: transparent;
  }

  .spuInfo .straightInLive .comments .allImg .commentsImg, .spuInfo .buyRecords .comments .allImg .commentsImg {
    width: 75px;
    height: 75px;
    margin-right: 8px;
    display: inline-block;
  }

  .spuInfo .straightInLive .comments .allImg .commentsImg .goodsImg, .spuInfo .buyRecords .comments .allImg .commentsImg .goodsImg {
    width: 75px;
  }

  .spuInfo .straightInLive .comments .allImg .commentsImg .goodsImg .img-class, .spuInfo .buyRecords .comments .allImg .commentsImg .goodsImg .img-class {
    width: 75px;
    height: 75px;
    border-radius: 2px;
    position: unset;
  }

  .spuInfo .straightInLive .comments .allImg .commentsImg:last-child, .spuInfo .buyRecords .comments .allImg .commentsImg:last-child {
    margin: 0;
  }

  .spuInfo .straightInLive .comments .checkComments, .spuInfo .buyRecords .comments .checkComments {
    font-size: 13px;
    color: #aaa;
    line-height: 13px;
    padding: 20px 0;
    text-align: center;
  }

  .spuInfo .buyRecords {
    width: 95vw;
  }

  .spuInfo .buyRecords .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .spuInfo .buyRecords .title .buyNum {
    width: 175px;
    font-size: 12px;
    color: #aaa;
    font-weight: normal;
  }

  .spuInfo .buyRecords .title .buyNum span {
    color: #ff5344;
    font-weight: bold;
  }

  .spuInfo .buyRecords .title .buyNum .goBuyRecords {
    width: 6px;
    height: 12px;
    display: inline-block;
    margin-bottom: -2px;
    margin-left: 5px;
  }

  .spuInfo .buyRecords .buyerList {
    padding: 15px 10px 10px;
    display: flex;
    flex-wrap: wrap;
    width: 95vw;
    box-sizing: border-box;
  }

  .spuInfo .buyRecords .buyerList .buyerImg {
    width: 45px;
    height: 45px;
    margin-right: 20px;
    margin-bottom: 12px;
    border-radius: 100%;
    display: block;
  }

  .spuInfo .buyRecords .buyerList .buyerImg .img-class {
    width: 45px;
    height: 45px;
    border-radius: 100%;
  }

  .spuInfo .buyRecords .buyerList .buyerImg:nth-child(5) {
    margin-right: 0;
  }

  .spuInfo .buyRecords .buyerList .moreBuyer {
    display: inline-block;
  }

  .spuInfo .buyRecords .buyerList .moreBuyer .buyerImg {
    margin-right: 0;
  }

  .spuInfo .spuDetail {
    width: 100%;
  }

  .spuInfo .spuDetail .goodsDetailTitleImg {
    width: 33.6vw;
    height: 6vw;
    margin: 6vw auto;
    display: block;
  }

  .spuInfo .spuDetail .warmPrompt {
    width: 100vw;
    overflow-x: hidden;
  }

  .spuInfo .service {
    padding: 4vw 2vw 0;
  }

  .spuInfo .service .detailLogo {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
  }

  .spuInfo .service .detailLogo text {
    width: 65px;
    height: 1px;
    background: #e4e4e4;
  }

  .spuInfo .service .detailLogo .detailLogoImg {
    width: 92px;
    height: 24px;
    margin: 0 20px;
  }

  .spuInfo .service .instructions {
    background: #fff;
    padding: 4vw 3vw;
    border-radius: 2vw;
    overflow: hidden;
  }

  .spuInfo .service .instructions .instructionsTit {
    height: 3.6vw;
    line-height: 3.6vw;
    color: #1c1819;
    font-size: 2.8vw;
    font-weight: bold;
    margin-left: 2.8vw;
    margin-bottom: 3vw;
  }

  .spuInfo .service .instructions .instructionsList {
    line-height: 3.6vw;
    color: #999;
    font-size: 2.4vw;
    margin-bottom: 2vw;
    display: flex;
    justify-content: space-between;
  }

  .spuInfo .service .instructions .instructionsList:last-child {
    margin: 0;
  }

  .spuInfo .service .instructions .instructionsList .instructionsMark {
    width: 0.6vw;
    height: 0.6vw;
    background: #ff5344;
    margin-top: 1.6vw;
  }

  .spuInfo .service .instructions .instructionsList .instructionsText {
    width: 97vw;
  }

  .spuInfo .service .instructions .instructionsList .instructionsText .instructionsTextTit {
    color: #666;
    font-weight: bold;
  }

  .spuInfo .service .instructions .instructionsList .instructionsText .instructionsUnderline {
    color: #666;
    text-decoration: underline;
  }

  .spuInfo .service .instructions .instructionsList .instructionsText .instructionsTime {
    color: #ff6557;
    font-weight: bold;
  }

  .spuInfo .sloganImg {
    width: 125px;
    height: 28px;
    padding: 40px 0 90px;
    margin: 0 auto;
    display: block;
  }

  .goTopImg {
    bottom: 80px;
    right: 15px;
    width: 22.5px;
    height: 22.5px;
    position: fixed;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    color: #fff;
    text-align: center;
    z-index: 3;
    padding: 7.5px;
  }

  @-webkit-keyframes opacity {
    0% {
      opacity: 0;
    }

    25% {
      opacity: 0.3;
    }

    50% {
      opacity: 0.5;
    }

    75% {
      opacity: 0.8;
    }

    100% {
      opacity: 1;
    }
  }

  @keyframes opacity {
    0% {
      opacity: 0;
    }

    25% {
      opacity: 0.3;
    }

    50% {
      opacity: 0.5;
    }

    75% {
      opacity: 0.8;
    }

    100% {
      opacity: 1;
    }
  }

  .canvas-img {
    position: absolute;
    top: -10000px;
  }

  .goodsDetailSkeleton_content {
    position: relative;
  }

  .goodsDetailSkeleton_content .goodsDetailSkeleton_img {
    width: 375px;
    height: 300px;
    background-color: #e4e4e4;
  }

  .goodsDetailSkeleton_content .goodsDetailSkeleton_spu {
    width: 95vw;
    height: 270px;
    position: absolute;
    left: 10px;
    top: 325px;
    background: #fff;
    border-radius: 10px;
  }

  .goodsDetailSkeleton_content .goodsDetailSkeleton_spu .goodsDetailSkeleton_list {
    height: 30px;
    margin: 5px 15px;
    display: flex;
    justify-content: space-between;
  }

  .goodsDetailSkeleton_content .goodsDetailSkeleton_spu .goodsDetailSkeleton_list text {
    width: 100px;
    background: #e4e4e4;
    border-radius: 5px;
  }

  .goodsDetailSkeleton_content .goodsDetailSkeleton_spu .goodsDetailSkeleton_list2 {
    height: 30px;
    margin: 15px;
    background: #e4e4e4;
    border-radius: 5px;
  }

  .goodsDetailSkeleton_content .goodsDetailSkeleton_spu .goodsDetailSkeleton_list3, .goodsDetailSkeleton_content .goodsDetailSkeleton_spu .goodsDetailSkeleton_list5 {
    height: 30px;
    margin: 15px;
    display: flex;
    justify-content: flex-start;
  }

  .goodsDetailSkeleton_content .goodsDetailSkeleton_spu .goodsDetailSkeleton_list3 .spec1, .goodsDetailSkeleton_content .goodsDetailSkeleton_spu .goodsDetailSkeleton_list3 .spec2, .goodsDetailSkeleton_content .goodsDetailSkeleton_spu .goodsDetailSkeleton_list5 .spec1, .goodsDetailSkeleton_content .goodsDetailSkeleton_spu .goodsDetailSkeleton_list5 .spec2 {
    width: 20px;
    background: #e4e4e4;
    border-radius: 5px;
  }

  .goodsDetailSkeleton_content .goodsDetailSkeleton_spu .goodsDetailSkeleton_list3 .spec2, .goodsDetailSkeleton_content .goodsDetailSkeleton_spu .goodsDetailSkeleton_list5 .spec2 {
    width: 200px;
    margin-left: 10px;
  }

  .goodsDetailSkeleton_content .goodsDetailSkeleton_spu .goodsDetailSkeleton_list3 {
    height: 18px;
  }

  .goodsDetailSkeleton_content .goodsDetailSkeleton_spu .goodsDetailSkeleton_list5 {
    height: 22px;
  }

  .goodsDetailSkeleton_content .goodsDetailSkeleton_spu .goodsDetailSkeleton_listAct {
    width: 335px;
    height: 60px;
    margin: 0 auto;
    border-radius: 8px;
    background: linear-gradient(223deg, #fff7f0 0%, #fff4ec 100%);
    overflow: hidden;
  }

  .goodsDetailSkeleton_content .goodsDetailSkeleton_spu .goodsDetailSkeleton_listAct .goodsDetailSkeleton_list4 {
    height: 16px;
    margin: 10px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .goodsDetailSkeleton_content .goodsDetailSkeleton_spu .goodsDetailSkeleton_listAct .goodsDetailSkeleton_list4 .spec1, .goodsDetailSkeleton_content .goodsDetailSkeleton_spu .goodsDetailSkeleton_listAct .goodsDetailSkeleton_list4 .spec2 {
    width: 20px;
    height: 16px;
    background: #e4e4e4;
    border-radius: 4px;
    margin-right: 10px;
  }

  .goodsDetailSkeleton_content .goodsDetailSkeleton_spu .goodsDetailSkeleton_listAct .goodsDetailSkeleton_list4 .spec2 {
    width: 200px;
    height: 20px;
  }

  button::after {
    border: none;
  }

  .goods-bottom-bar {
    height: 48px;
    display: flex;
  }

  .goods-bottom-bar .leftBtn {
    height: 47px;
    display: flex;
    border-top: 1px solid #efefef;
  }

  .goods-bottom-bar .leftBtn .bar-item {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .goods-bottom-bar .leftBtn .back-to-index {
    width: 66px;
    height: 47px;
    font-size: 10px;
    color: #707070;
  }

  .goods-bottom-bar .leftBtn .back-to-index img {
    width: 27px;
    height: 27px;
  }

  .goods-bottom-bar .leftBtn .shop-cart {
    width: 66px;
    height: 48px;
    font-size: 10px;
    color: #707070;
    position: relative;
  }

  .goods-bottom-bar .leftBtn .shop-cart .icon {
    width: 27px;
    height: 27px;
    position: relative;
  }

  .goods-bottom-bar .leftBtn .shop-cart .icon img {
    width: 100%;
    height: 100%;
  }

  .goods-bottom-bar .leftBtn .shop-cart .icon .cart-num {
    position: absolute;
    right: -8px;
    top: -2px;
    width: 18px;
    height: 18px;
    background: #f43530;
    border-radius: 18px;
    color: #fff;
    font-size: 11px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .goods-bottom-bar .goodsStatus {
    width: 100%;
    height: 48px;
    background: #dcdcdc;
    font-size: 15px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .goods-bottom-bar .gobuy {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: bold;
  }

  .goods-bottom-bar .gobuy .add-to-cart {
    width: 120px;
    height: 48px;
    background: linear-gradient(270deg, #f9c706 0%, #feb600 100%);
    color: #fff;
    font-size: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .goods-bottom-bar .gobuy .btn {
    width: 104px;
    height: 48px;
    position: absolute;
    opacity: 0;
    z-index: 9;
    top: 0;
    padding: 0;
    margin: 0;
  }

  .goods-bottom-bar .gobuy .balanceBtn {
    display: flex;
    flex: 1;
  }

  .goods-bottom-bar .gobuy .balanceBtn .balance {
    height: 48px;
    flex: 1;
    background: linear-gradient(90deg, #ff5041 0%, #ff695c 100%);
    color: #fff;
    font-size: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .i-fixed-bottom {
    position: fixed;
    bottom: 0px;
    z-index: 100;
    width: 100%;
    background-color: #fff;
  }

  .ui-mask {
    position: fixed;
    display: block;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
    background: rgba(0, 0, 0, 0.6);
  }

  .model-services {
    width: 100%;
    position: fixed;
    background-color: #fff;
    bottom: 0;
    z-index: 1000;
    color: #333;
    transition: all 0.3s;
    transform: translate(0, 100%);
  }

  .model-services.show {
    transform: translate(0);
  }

  .model-services .model-services-title {
    font-size: 18px;
    text-align: center;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #f2f5f8;
  }

  .model-services .model-services-content {
    padding: 20px;
  }

  .model-services .model-services-content .service-item {
    margin-bottom: 10px;
    width: 50%;
    float: left;
    text-align: center;
  }

  .model-services .model-services-content .service-icon {
    font-size: 40px;
    color: #50b674;
  }

  .service-name {
    padding-left: 5px;
  }

  .cube-text {
    position: relative;
    width: 100%;
    height: 16px;
    line-height: 16px;
    color: #777;
    margin-top: 2.5px;
    font-size: 12px;
  }

  .none_btn {
    border: none;
    line-height: 1.1;
    padding: 0px;
  }

  button[plain] {
    border: none;
  }

  .share-modal {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 101;
    transition: all 400ms ease-in;
  }

  .share-modal-content {
    position: relative;
    width: 70%;
    top: 50%;
    left: 15%;
    transform: translateY(-50%);
    z-index: 110;
  }

  .share-modal-img {
    width: 100%;
    height: 478px;
    background: #f7f7f7;
  }

  .share-modal-img img {
    width: 100%;
  }

  .share-modal-btn-list {
    display: flex;
    margin-top: 15px;
  }

  .share-modal-btn-item {
    text-align: center;
    flex: 1;
  }

  .share-modal .btn-icon {
    font-size: 35px;
    color: #fff;
    margin: 0 auto;
  }

  .share-modal .btn-text {
    position: relative;
    width: 100%;
    height: 16px;
    line-height: 16px;
    color: #fff;
    margin-top: 2.5px;
    font-size: 12px;
  }

  .fixed-share {
    display: inline-block;
    bottom: 22%;
    right: 15px;
    width: 40px;
    height: 40px;
    position: fixed;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    text-align: center;
    color: #fff;
    box-sizing: border-box;
    font-size: 10px;
    padding: 5px;
    line-height: 1.2;
    z-index: 100;
  }

  .fixed-share .iconfont {
    font-size: 15px;
  }

  .spuInfoImg .item-tag {
    position: absolute;
    left: 15px;
    top: 10px;
    width: 40px;
    height: 46px;
    z-index: 500;
    color: #fff;
    text-align: center;
  }

  .spuInfoImg .item-tag  img{
    width: 40px;
  }

  .item-tag-bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 40px;
    height: 46px;
    z-index: 0;
  }

  .spuInfoImg .item-tag .tag-name {
    position: relative;
    padding-top: 6px;
    font-size: 14px;
    line-height: 1;
    font-weight: 600;
    z-index: 1;
  }

  .spuInfoImg .item-tag .tag-name.two-word {
    font-size: 14px;
    padding-top: 12px;
  }

  .comment-user {
    line-height: 30px;
    display: flex;
    margin-bottom: 5px;
  }

  .comment-user img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 7px;
    background-color: #f0f0f0;
  }

  .comment-user text {
    font-size: 13px;
  }

  .fixed-service {
    display: inline-block;
    bottom: 13%;
    right: 15px;
    width: 40px;
    height: 40px;
    position: fixed;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    text-align: center;
    color: #fff;
    box-sizing: border-box;
    font-size: 10px;
    padding: 5px;
    line-height: 1.2;
    z-index: 100;
  }

  .fixed-service::after {
    border: 0;
  }

  .fixed-service .iconfont {
    font-size: 15px;
  }

  .cell {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 15px 10px;
    background-color: #fff;
    padding: 10px 15px;
    border-radius: 10px;
  }

  .cell-left {
    flex: 1;
    line-height: 20px;
  }

  .cell-left text {
    display: inline-block;
    vertical-align: middle;
  }

  .icon-right {
    width: 6px;
    height: 11px;
  }

  .cell-icon {
    width: 20px;
    display: inline-block;
    vertical-align: middle;
    margin-right: 5px;
  }

  .btn_view {
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 100;
    transform: translate(-50%, -50%);
  }

  .btn_view img {
    width: 60px;
    height: 60px;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    animation: playScale 2s ease-in-out infinite;
  }

  .video-wrap, .swiper-video {
    width: 100%;
    height: 100%;
  }

  .end-play {
    position: relative;
    z-index: 1000;
    background: #000;
    text-align: center;
    padding: 10px 0;
  }

  .end-play .btn {
    display: inline-block;
    padding: 2.5px 15px;
    background-color: #f6f6f6;
    border-radius: 10px;
    font-size: 12px;
  }

  @keyframes playScale {
    0% {
      transform: scale(1);
    }

    25% {
      transform: scale(1.1);
    }

    50% {
      transform: scale(1);
    }

    75% {
      transform: scale(1.1);
    }
  }

  .group {
    background-color: #fff;
    width: 325px;
    padding: 10px 15px;
    border-radius: 10px;
    margin: 10px auto 0;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.05);
    display: flex;
    align-items: center;
  }

  .group-avatar img {
    width: 47px;
    height: 47px;
    border-radius: 5px;
  }

  .group-m {
    flex: 1;
    margin: 0 7.5px;
    width: 0;
  }

  .group-btn {
    background: #ff5344;
    color: #fff;
    padding: 5px 15px;
    border-radius: 30px;
  }

  .group-title {
    font-size: 14px;
    color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .group-desc {
    font-size: 12px;
    color: #999;
    margin-top: 3px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  .group-r-icon {
    width: 10px;
    height: 18px;
    vertical-align: middle;
  }

  .guessLike {
    margin-bottom: 0 !important;
    margin-top: 15px !important;
  }

  .comiss {
    display: inline-block;
    padding: 1px 4px;
    background: #fff7f0;
    border-radius: 3px;
    margin-right: 5px;
    font-size: 10px;
    color: #ca7e57;
    font-weight: bold;
    margin-top: 10px;
  }

  .hexiao {
    margin-right: 15px;
  }

  .coverVideo {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1000;
  }

  .coverVideo .main {
    width: 375px;
    height: 100%;
    background: #000;
    overflow: hidden;
    z-index: 99999;
  }

  .coverVideo .main .section video {
    width: 375px;
    height: 100vh;
  }

  .coverVideo .goods {
    width: 200px;
    height: 75px;
    background: #fff;
    border-radius: 5px;
    position: fixed;
    bottom: 80px;
    left: 10px;
    z-index: 9998;
    display: flex;
  }

  .coverVideo .goods .good-img {
    width: 75px;
    height: 75px;
    margin-right: 5px;
    box-sizing: border-box;
    padding: 5px;
  }

  .coverVideo .good-img cover-image {
    width: 75px;
    height: 75px;
    object-fit: cover;
    border-radius: 5px;
    overflow: hidden;
  }

  .coverVideo .good-title {
    display: inline-block;
    font-size: 13px;
    margin-top: 5px;
    height: 30px;
    line-height: 15px;
    white-space: pre-wrap;
  }

  .coverVideo .xqbottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
  }

  .coverVideo .good-price {
    display: inline-block;
    flex: 1;
    font-size: 14px;
    color: red;
  }

</style>
