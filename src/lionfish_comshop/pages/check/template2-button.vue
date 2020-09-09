<template>

  <div class="goods-wrapper">
    <div class="logo">
        <img class="logo-img" src="@/assets/images/logo 1.png"/>
    </div>
    
    <div class="wrapper" style="width: 80vw;height: 60vw;margin: 0 auto;">
      <swiper :options="swiperOption">
        <swiper-slide v-for="(item,index) in goods_image2" :key="index">
          {{item.imgUrl}}
          <div v-if="item.urlType == 1">
            <img bindload="imageLoad" @click="predivImg" style="height: 60vw; width: 80vw; margin: 0 auto;" :data-idx="index" lazyLoad="true" 
                  :src="item.image" v-if="index!=0"/>
            <div class="video-wrap" v-else>
              <div v-if="fmShow">
                <div class="btn_div centerboth" v-if="item.video==''"></div>
                <div @click="btnPlay" class="btn_div centerboth" v-else>
                  <img src="@/assets/images/play.png"/>
                </div>
                <img bindload="imageLoad" @click="predivImg" :data-idx="index" lazyLoad="true" style="height: 60vw; width: 80vw;margin: 0 auto;"
                      :src="item.image"/>
              </div>
              <video bindended="videEnd" class="swiper-video" v-show="fmShow" id="myVideo" objectFit="contain"
                      :src="goods.video"></video>

            </div>
          </div>
          <img style="height: 60vw; width: 80vw; margin: 0 auto;"
                src="http://123.206.27.155:8068/userfiles/1340497/images/product/2020/01/22222_191224170450_200115111647.png" v-else/>
        </swiper-slide>
        <div class="swiper-pagination"  slot="pagination"></div>
      </swiper>
    </div>

    <div :class="[showWord ? 'check-word-block': 'check-word-none']" id="clickDiv1" @click="turnShow">
        <div style="width: 100%;height: 5vw;">
            <img src="@/assets/images/12template right@3X.png" style="vertical-align:middle;height: 3vw;position: relative;top: 0.4rem"/>&nbsp;
            <lable style="font-size: 3.5vw; font-weight: 1000;vertical-align:middle;font-family: PingFangSC-Semibold;position: relative;top: 0.4rem">成功验证 3 次</lable>&nbsp;&nbsp;&nbsp;
            <img id="img1" src="@/assets/images/xiala.png" style="vertical-align:middle;height: 2vw;position: relative;top: 0.4rem"/>
        </div>
        <div style="height: 3vw;width: 100%;position: relative;top: 0.6rem">
            <span style="font-size: 3vw;color: #000000;font-family: PingFangSC-Semibold;">动态验证码 / CD123456789123</span>
        </div>
        <div style="height: 0.3rem;width: 100%;margin-top: 0.02rem;position: relative;top: 0.6rem">
            <!--<span style="font-size: 0.25rem;color: #B8BBBE;letter-spacing: 0;font-family: PingFangSC-Semibold;">查询者所在地${address}</span>-->
        </div>
        <div id="clickDiv2" :class="[showWord ? 'check-content-block': 'check-content-none']">
            <div style="width: 75vw;height: 20vw;margin: 0.35rem auto;padding-top: 0.5rem;">
                    <span style="opacity: 0.99;font-family: PingFangSC-Regular;font-size: 0.3rem;color: #72727F;letter-spacing: 0.0rem;text-align: justify;line-height: 0.4533rem;">
                        以上动态码由NFC标签芯片对内部产生的随机数、计数器值签名运算产生，用于验证标签的真实性。该码每次读取变化，30秒内验证使用有效，超过30秒再次查询会验证失败。请认准NFC315.com域名。
                    </span>
            </div>
        </div>
    </div>

    <div style="margin: 0.64rem auto;height: 15vw;text-align: center;width: 80vw;background: #000000;" >
			<table style="width: 80vw; height: 10vw; font-family: PingFangSC-Semibold;font-size: 3vw;color: #717379;letter-spacing: 0;line-height: 10vw;margin: 0 auto;">
				<tr>
					<td id="oneDiv1"><div id="oneDiv" style="border-bottom: 2px solid #fff;padding-bottom: 0.08rem;width:fit-content;margin: 0 auto;color: #ffffff;" onclick="turnOne()">基础信息</div></td>
					<td id="oneDiv2"><div id="twoDiv" style="padding-bottom: 0.08rem;width:fit-content;margin: 0 auto;" onclick="turnTwo()">溯源信息</div></td>
					<td id="oneDiv3"><div id="threeDiv" style="padding-bottom: 0.08rem;width:fit-content;margin: 0 auto;" onclick="turnThree()">视频监控</div></td>
					<td id="oneDiv4"><div id="fourDiv" style="padding-bottom: 0.08rem;width:fit-content;margin: 0 auto;" onclick="turnFour()">新品推荐</div></td>
				</tr>
			</table>
		</div>

    <div id="oneDivView" style="width: 80vw;height: auto;margin: 0vw auto; font-size: 0.25rem;background-color: black;padding-bottom: 5vw;display: block">
			<div style="width: 100%;height: 10vw;margin-top: 10px;border-bottom: 1px solid white;">
				<div style="height: 100%;width: 40%;float: left;color: #ffffff;font-weight: 600;text-align: left;">
					<span style="line-height: 10vw;font-size: 0.25rem；letter-spacing: 0;">品名</span>
				</div>
				<div style="height: 100%;width: 60%;float: right;color: #ffffff;font-weight: 600;text-align: right;">
					<span style="line-height: 10vw;font-size: 0.25rem；letter-spacing: 0;">Supreme 水润滋养唇膏</span>
				</div>
			</div>
			<div style="width: 100%;height: 10vw;margin-top: 10px;border-bottom: 1px solid white;">
				<div style="height: 100%;width: 40%;float: left;color: #ffffff;font-weight: 600;text-align: left;">
					<span style="line-height: 10vw;font-size: 0.25rem；letter-spacing: 0;">颜色</span>
				</div>
				<div style="height: 100%;width: 60%;float: right;color: #ffffff;font-weight: 600;text-align: right;">
					<span style="line-height: 10vw;font-size: 0.25rem；letter-spacing: 0;">牛血色</span>
				</div>
			</div>
			<div style="width: 100%;height: 10vw;margin-top: 10px;border-bottom: 1px solid white;">
				<div style="height: 100%;width: 40%;float: left;color: #ffffff;font-weight: 600;text-align: left;">
					<span style="line-height: 10vw;font-size: 0.25rem；letter-spacing: 0;">净含量</span>
				</div>
				<div style="height: 100%;width: 60%;float: right;color: #ffffff;font-weight: 600;text-align: right;">
					<span style="line-height: 10vw;font-size: 0.25rem；letter-spacing: 0;">3.5g</span>
				</div>
			</div>
			<div style="width: 100%;height: 10vw;margin-top: 10px;border-bottom: 1px solid white;">
				<div style="height: 100%;width: 40%;float: left;color: #ffffff;font-weight: 600;text-align: left;">
					<span style="line-height: 10vw;font-size: 0.25rem；letter-spacing: 0;">生产日期</span>
				</div>
				<div style="height: 100%;width: 60%;float: right;color: #ffffff;font-weight: 600;text-align: right;">
					<span style="line-height: 10vw;font-size: 0.25rem；letter-spacing: 0;">2018-09-20</span>
				</div>
			</div>
			<div style="width: 100%;height: 10vw;margin-top: 10px;border-bottom: 1px solid white;">
				<div style="height: 100%;width: 40%;float: left;color: #ffffff;font-weight: 600;text-align: left;">
					<span style="line-height: 10vw;font-size: 0.25rem；letter-spacing: 0;">使用方法</span>
				</div>
				<div style="height: 100%;width: 60%;float: right;color: #ffffff;font-weight: 600;text-align: right;">
					<span style="font-size: 0.25rem；letter-spacing: 0;line-height: 0.5rem">确定位置轮廓，将唇膏均匀涂抹，轻抿嘴唇，保持湿润。</span>
				</div>
			</div>
    </div>

    <div id="twoDivView" style="width:80vw;height: 70vw; margin: 0 auto;display: block;background: #fff">
			<img src="" style="width:80vw;height: 70vw;">
		</div>

    <div id="threeDivView" style="width:  80vw;height: auto;display: block; background: #000000; margin: 0 auto;" class="content2" >
			<div style="width: 80vw;height: 4.72rem;background: #F8F9F8 url() no-repeat 2.3rem 1rem;margin: 0.4667rem auto 0rem;background-size: 50% 50%;border-radius: 0.16rem 0.16rem 0 0;"><img src=" " style="width: 0.8133rem;height: 0.8133rem;position: relative;left: 4rem;top: 2rem"></div>
			<div style="width:  80vw;height: 1.0667rem;background: #FFFFFF;border-radius: 0 0 0.16rem 0.16rem;margin: 0 auto 0.4667rem"><span style="font-family: PingFangSC-Semibold;font-size: 0.4rem;color: #252525;letter-spacing: 0;margin-left: 0.6rem;line-height: 1.2rem">产地视频</span></div>

			<div style="width: 80vw;height: 4.72rem;background: #F8F9F8 url() no-repeat 2.3rem 1rem;margin: 0.4667rem auto 0rem;background-size: 50% 50%;border-radius: 0.16rem 0.16rem 0 0;"><img src=" " style="width: 0.8133rem;height: 0.8133rem;position: relative;left: 4rem;top: 2rem"></div>
			<div style="width:  80vw;height: 1.0667rem;background: #FFFFFF;border-radius: 0 0 0.16rem 0.16rem;margin: 0 auto 0.4667rem"><span style="font-family: PingFangSC-Semibold;font-size: 0.4rem;color: #252525;letter-spacing: 0;margin-left: 0.6rem;line-height: 1.2rem">产地视频</span></div>

			<div style="width: 80vw;height: 4.72rem;background: #F8F9F8 url() no-repeat 2.3rem 1rem;margin: 0.4667rem auto 0rem;background-size: 50% 50%;border-radius: 0.16rem 0.16rem 0 0;"><img src=" " style="width: 0.8133rem;height: 0.8133rem;position: relative;left: 4rem;top: 2rem"></div>
			<div style="width:  80vw;height: 1.0667rem;background: #FFFFFF;border-radius: 0 0 0.16rem 0.16rem;margin: 0 auto 0.4667rem"><span style="font-family: PingFangSC-Semibold;font-size: 0.4rem;color: #252525;letter-spacing: 0;margin-left: 0.6rem;line-height: 1.2rem">产地视频</span></div>

		</div>
		<div id="fourDivView" style="width:  80vw;height: auto;display: block; background: #000000;margin: 0 auto;" class="content2" >
			<div style="width: 80vw;height: 4.72rem;background: #F8F9F8 url() no-repeat 0rem 0rem;margin: 0.4667rem auto 0rem;background-size: 100% 100%;border-radius: 0.2rem 0.2rem 0 0;"></div>
			<div style="width: 80vw;height: 1.0667rem;background: #FFFFFF;border-radius: 0 0 0.16rem 0.16rem;margin: 0 auto 0.4667rem"><span style="font-family: PingFangSC-Semibold;font-size: 0.4rem;color: #252525;letter-spacing: 0;margin-left: 0.6rem;line-height: 1.2rem">新品上市，8折速来抢购！</span></div>

			<div style="width: 80vw;height: 4.72rem;background: #F8F9F8 url() no-repeat 0rem 0rem;margin: 0.4667rem auto 0rem;background-size: 100% 100%;border-radius: 0.2rem 0.2rem 0 0;"></div>
			<div style="width: 80vw;height: 1.0667rem;background: #FFFFFF;border-radius: 0 0 0.16rem 0.16rem;margin: 0 auto 0.4667rem"><span style="font-family: PingFangSC-Semibold;font-size: 0.4rem;color: #252525;letter-spacing: 0;margin-left: 0.6rem;line-height: 1.2rem">速来围观，最新Q版包装上市！</span></div>

		</div>
		

  </div>

</template>

<script>

  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import GlobalMixin from '../../mixin/globalMixin.js'
  // import status from '../../utils/index.js'
  // import util from '../../utils/index.js'
  import util from '../../utils'
  import status from '../../utils'
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
    name: 'template2-button',
    data() {
      return {

        showWord: false,
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
        goods_image2: [],
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

        }
      }
    },
    created: function() {
      this.$wx.setNavigationBarTitle({
        title: 'check',
        showLogo: false,
        showMore: false,
        showBack: false
      })
      this.onLoad();
      this.onShow();
      this.getDate();
    },
    methods: {
      turnShow: function(){
        if(this.showWord){
          this.showWord = false;
        }else{
          this.showWord = true;
        }
      },
      getDate: function(){
        var app = this.$getApp(), wx = this.$wx;
        var that = this;
        wx.request({
          // 请求地址
          url: 'http://123.206.27.155:8068/pmp/api/v2/nfc315/verify/1340497/8B409C99015C00224D08FCEA78829C3548/113.45.91.173',
          // 请求方式
          method: "get",
          dataType: 'json',
          responseType: 'text',
          // 方法
          success: function(data) {
            console.log(data.data.body,"liuwantao");
            that.goods = data.data.body;
            that.goods_image2 =data.data.body.product.productType.productTypeGalleryList;
            console.log(this.goods_image2,"123");
          }
        })
      },
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
    background: #000;
  }

  .logo{
    background: #000;
    width: 100%;
    height: 20vw;
    text-align: center;
  }

  .logo-img{
    height: 8vw;
    margin-top: 5vw;
  }

  swiper {
    height: 300px;
  }

  swiper img {
    width: 100%;
    height: auto;
  }

  .check-word-none{
    width: 80vw;
    margin: 0vw auto 2vw;
    background: #fff;
    height: 14vw;
    text-align:center;
    border-radius: 0 0 3vw 3vw;
  }

  .check-word-block{
    width: 80vw;
    margin: 0vw auto 2vw;
    background: #fff;
    height: 42vw;
    text-align:center;
    border-radius: 0 0 3vw 3vw;
  }

  .check-content-block{
    background-color: #F8F8F9;
    border-radius: 6px;
    border-radius: 6px;
    width: 80vw;
    height: 25vw;
    float: left;
    margin: 5vw auto;
    display: block
  }

  .check-content-none{
    background-color: #F8F8F9;
    border-radius: 6px;
    border-radius: 6px;
    width: 80vw;
    height: 25vw;
    float: left;
    margin: 5vw auto;
    display: none
  }

  

</style>
