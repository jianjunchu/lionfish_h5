<template>
  <div class="page">
    <el-amap style="display: none" vid="amap" :plugin="plugin" class="amap-demo" :center="center">
    </el-amap>
    <div class="swipe_supply_home">
      <swiper :options="sliderSwiperOption" class="swiper-content">
        <swiper-slide class="swiper-slide" v-for="(item,index) in slider_list" :key="index">
          <img :src="item.image" class="show-img-index" width="100%"/>
        </swiper-slide>
        <!-- 分页器 -->
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>

      <img class="logo" width="12vw" height="12vw" :src="info.logo"/>

      <button class="fixed-share_supply_home" @click.stop="share_handler">
        <span class="iconfont icon-fenxiang"></span>
        <div>分享</div>
      </button>

      <div class="supply_name_supply_hmoe" span="24">{{info.shopname}}</div>

      <div class="supply_subtitle">
        <span class="border">{{$t('supply.pingjia')}}{{info.score}}</span>
        <span class="border">{{$t('supply.yuexiao')}}{{info.quantity_count}}</span>
        <span>{{$t('supply.juli')}}：{{distance}}</span>
      </div>

    </div>

    <van-sticky :offset-top="48">

      <van-tabs v-model="tabActive" :border="true">
        <van-tab v-for="item in tabs" :title="item.name ">

        </van-tab>
      </van-tabs>
    </van-sticky>

    <div style="min-height: 87vh;background-color: white" v-show="tabActive==0">
      <div class="page-content" v-if="!noCateList">
        <div class="scrollY page-category" :scrollTop="categoryScrollBarTop">
          <div @click="changeCategory(index)" :data-index="index"
               :class="[rushCategoryData.activeIndex===index?'category-item active':'category-item']"
               v-for="(item,index) in rushCategoryData.tabs" :key="index">
            <div class="item-border"></div>
            <span>{{item.name_en || item.name}}</span>
          </div>
          <div class="category-item"></div>
        </div>
        <div @click="showDrop" class="mask" hidden="!showDrop"></div>

        <div>
          <van-list ref="list" @scroll="scrollGet($event)" v-model="$data.$data.loading"
                    :finished="$data.$data.loadOver" @load="getHotList" class="van-clearfix page-list scrollY">

            <i-type-item @authModal="authModal" @changeCartNum="changeCartNum" @openSku="openSku" @vipModal="vipModal"
                         :canLevelBuy="canLevelBuy" :changeCarCount="changeCarCount"
                         :is_open_vipcard_buy="is_open_vipcard_buy" :needAuth="needAuth" :reduction="reduction"
                         :spuItem="item" :stopClick="stopClick" v-for="(item,index) in rushList" :key="item.actId"
                         :isShowContactBtn="isShowContactBtn"></i-type-item>
          </van-list>
          <div class="none-rush-list" v-show="pageEmpty">
            <img class="img-div" src="@/assets/images/icon-index-empty.png">
            <div class="h1">{{$t('type.zhanshimeiyou')}}</div>
            <div class="h2">{{$t('type.zhengzaizhunbei')}}</div>
          </div>
        </div>

      </div>
      <i-empty v-else>暂无分类~</i-empty>

    </div>

    <div style="min-height: 87vh;background-color: white" v-show="tabActive==1">

      <div class="noComments" v-if="showCommentData===0">
        <div class="noCommentsCon">
          <img class="noCommentsImg" src="@/assets/images/noData.png"/>
          <div class="noCommentsTit">暂无评论</div>
        </div>
      </div>
      <div class="comments" v-if="showCommentData===1">
        <van-list class="commentsDetail" v-model="$data.$comment_data.loading" :finished="$data.$comment_data.loadOver" finished-text="没有更多了" @load="getCommentList">
          <div class="commentsList" v-for="(item,index) in commentList" v-key="id">
            <i-card>
              <div class="commentsListInfo" slot="content">
                <div class='comment-user'>
                  <img :src='item.avatar'/>
                  <span>{{item.user_name}}</span>
                </div>
                <div bindlongpress="copy" @click.native="bindOpen"
                     :class="['commentsCon' ,item.isOpen&&item.showOpen?'doubleHidden':'']" :data-idx="index"
                     :data-val="item.content">{{item.content}}
                </div>
                <div class="commentsOpen" v-if="item.showOpen">
                  <span @click.native="bindOpen" :data-idx="index">{{item.isOpen?'展开':'收起'}}</span>
                  <img :class="['commentsOpenImg', item.isOpen?'down':'']" src="@/assets/images/commentsOpen.png"/>
                </div>
                <div class="commentsImgCon" v-if="item.images.length > 0">
                  <div class="commentsImg" v-for="(imgItem,idex) in item.images" v-key="index">
                    <i-img @click.native="prediv" class="goodsImg" :data-idx="idx" :data-index="index" height="75"
                           iClass="img-class" imgType="5" :loadImage="imgItem" width="75"></i-img>
                  </div>
                </div>
                <div class="commentsTime">{{item.add_time}}</div>
              </div>
            </i-card>
          </div>
          <i-load-more iClass="loadMore" :loading="loadMore" :tip="tip"></i-load-more>
        </van-list>
      </div>

    </div>

    <div style="min-height: 87vh;background-color: white" v-show="tabActive==2">

      <van-cell-group>
        <van-cell title="店铺名称" title-width="120rpx" :value="info.shopname"/>
        <van-cell title="简介" title-width="120rpx" :value="info.product"/>
        <van-cell title="地址" title-width="120rpx" :value="info.address"/>
        <van-cell title="免运费起送金额" :value="info.order_amount_free_delivery"/>
        <van-cell title="运费" :value="info.delivery_fee_per_order"/>
        <van-cell title="联系人" :value="info.name"/>
        <van-cell title="联系电话" :value="info.mobile"/>
      </van-cell-group>

      <div @click="lianxikefu(info.country,info.mobile)" class="lianxikefu" v-if="info.mobile!='' && info.mobile !=null && info.mobile!= 'null'">
          联系客服
      </div>

    </div>

    <div class="model-services show" v-show="is_share_html">
      <div class="model-services-title">{{$t('common.fenxiang')}}</div>
      <div class="model-services-content">
        <div class="service-list">
          <div class="service-item">
            <div class="none_btn" @click="share_whatsapp" openType="share" plain="true">
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="39" height="39" viewBox="0 0 39 39"><path fill="#00E676"
                                                                                                         d="M10.7 32.8l.6.3c2.5 1.5 5.3 2.2 8.1 2.2 8.8 0 16-7.2 16-16 0-4.2-1.7-8.3-4.7-11.3s-7-4.7-11.3-4.7c-8.8 0-16 7.2-15.9 16.1 0 3 .9 5.9 2.4 8.4l.4.6-1.6 5.9 6-1.5z"></path><path
                  fill="#FFF"
                  d="M32.4 6.4C29 2.9 24.3 1 19.5 1 9.3 1 1.1 9.3 1.2 19.4c0 3.2.9 6.3 2.4 9.1L1 38l9.7-2.5c2.7 1.5 5.7 2.2 8.7 2.2 10.1 0 18.3-8.3 18.3-18.4 0-4.9-1.9-9.5-5.3-12.9zM19.5 34.6c-2.7 0-5.4-.7-7.7-2.1l-.6-.3-5.8 1.5L6.9 28l-.4-.6c-4.4-7.1-2.3-16.5 4.9-20.9s16.5-2.3 20.9 4.9 2.3 16.5-4.9 20.9c-2.3 1.5-5.1 2.3-7.9 2.3zm8.8-11.1l-1.1-.5s-1.6-.7-2.6-1.2c-.1 0-.2-.1-.3-.1-.3 0-.5.1-.7.2 0 0-.1.1-1.5 1.7-.1.2-.3.3-.5.3h-.1c-.1 0-.3-.1-.4-.2l-.5-.2c-1.1-.5-2.1-1.1-2.9-1.9-.2-.2-.5-.4-.7-.6-.7-.7-1.4-1.5-1.9-2.4l-.1-.2c-.1-.1-.1-.2-.2-.4 0-.2 0-.4.1-.5 0 0 .4-.5.7-.8.2-.2.3-.5.5-.7.2-.3.3-.7.2-1-.1-.5-1.3-3.2-1.6-3.8-.2-.3-.4-.4-.7-.5h-1.1c-.2 0-.4.1-.6.1l-.1.1c-.2.1-.4.3-.6.4-.2.2-.3.4-.5.6-.7.9-1.1 2-1.1 3.1 0 .8.2 1.6.5 2.3l.1.3c.9 1.9 2.1 3.6 3.7 5.1l.4.4c.3.3.6.5.8.8 2.1 1.8 4.5 3.1 7.2 3.8.3.1.7.1 1 .2h1c.5 0 1.1-.2 1.5-.4.3-.2.5-.2.7-.4l.2-.2c.2-.2.4-.3.6-.5s.4-.4.5-.6c.2-.4.3-.9.4-1.4v-.7s-.1-.1-.3-.2z"></path></svg>

              </span>
              <div class="cube-text">
                <span>{{$t('common.haoyou')}}</span>
              </div>
            </div>
          </div>
          <!--<div @click="goLink" class="service-item" data-link="/ulink_comshop/pages/index/share"
               :data-needauth="true">
            <span class="iconfont icon-pengyouquan service-icon"></span>
            <div class="cube-text">
              <span>海报</span>
            </div>
          </div>-->
        </div>
      </div>
    </div>

    <!--<van-tabs border="true" v-model="tabActive" sticky>
      <van-tab :title="tabs[0].name" :info="">
        <div :style="{'min-height': scrollViewHeight+180+'px'}">
          <div class="page-content" v-if="!noCateList">
            <div class="scrollY page-category" :scrollTop="categoryScrollBarTop">
              <div @click="changeCategory(index)" :data-index="index"
                   :class="[rushCategoryData.activeIndex===index?'category-item active':'category-item']"
                   v-for="(item,index) in rushCategoryData.tabs" :key="index">
                <div class="item-border"></div>
                <span>{{item.name_en || item.name}}</span>
              </div>
              <div class="category-item"></div>
            </div>
            &lt;!&ndash; 子栏目 &ndash;&gt;
            <div class='mask' v-show='!showDrop' @click.stop='showDrop'></div>
            <div class='sub-cate' v-if="rushCategoryData.tabs[rushCategoryData.activeIndex].sub.length">
              <div class="sub-cate-scroll scrollX">
                <div @click.stop="change_sub_cate" class="sub-cate-item" :data-id="rushCategoryData.tabs[rushCategoryData.activeIndex].id" :data-idx="0" :style="active_sub_index==0?'color:'+skin.color:''">All</div>
                <div @click.stop="change_sub_cate" class="sub-cate-item" :data-id="item.id" :data-idx="index+1" :style="active_sub_index==index+1?'color:'+skin.color:''" v-for="(item,index) in rushCategoryData.tabs[rushCategoryData.activeIndex].sub" :key="item.id">{{item.name_en || item.name}}</div>
              </div>
              &lt;!&ndash;<div class='icon-open' @click.stop='showDrop'>
                <image class="openImg {{showDrop?'':'down'" src="@/assets/images/commentsOpen.png"></image>
              </div>&ndash;&gt;
            </div>
            &lt;!&ndash;<div class='sub-cate-hide'
                  v-if="rushCategoryData.tabs[rushCategoryData.activeIndex].sub.length&&showDrop">
              <div class='sub-cate-item'
                    style="(active_sub_index==0&&skin.color)?'color:#fff;background-color:'+skin.color:''"
                    data-idx="0"
                    data-id='{{rushCategoryData.tabs[rushCategoryData.activeIndex].id}}' @click.stop='change_sub_cate'>全部
              </div>
              <div class='sub-cate-item'
                    style="active_sub_index==index+1?'color:#fff;background-color:'+skin.color:''"
                    wx:for="rushCategoryData.tabs[rushCategoryData.activeIndex].sub" wx:key="id"
                    data-idx="index+1"
                    data-id='{{item.id}}' @click.stop='change_sub_cate'>{{item.name}}
              </div>
            </div>&ndash;&gt;
            &lt;!&ndash; 列表 &ndash;&gt;
            <div>
              <van-list ref="list" @scroll="scrollGet($event)"  v-model="$data.$data.loading" :finished="!loadMore" @load="getHotList" class="van-clearfix page-list scrollY">
                <i-type-item @authModal="authModal" @changeCartNum="changeCartNum" @openSku="openSku" @vipModal="vipModal" :canLevelBuy="canLevelBuy" :changeCarCount="changeCarCount" :is_open_vipcard_buy="is_open_vipcard_buy" :needAuth="needAuth" :reduction="reduction" :spuItem="item" :stopClick="stopClick" v-for="(item,index) in rushList" :key="item.actId" :isShowContactBtn="isShowContactBtn"></i-type-item>
              </van-list>
              <div class="none-rush-list" v-if="pageEmpty">
                <img class="img-div" src="@/assets/images/icon-index-empty.png">
                <div class="h1">{{$t('type.zhanshimeiyou')}}</div>
                <div class="h2">{{$t('type.zhengzaizhunbei')}}</div>
              </div>
            </div>
          </div>
          <i-empty wx:else="noCateList">暂无分类~</i-empty>
        </div>

      </van-tab>
      <van-tab :title="tabs[1].name" :info="info.comment_count">

      </van-tab>
      <van-tab :title="tabs[2].name">
        <div style="min-height:110vw">

        </div>
      </van-tab>
    </van-tabs>

    -->

    <i-cart-btn :cartNum="cartNum" :showHome="true">{{cartNum}}</i-cart-btn>

    <!--<i-new-auth @authSuccess="authSuccess" @cancel="authModal" :needAuth="needAuth&&showAuthModal"
                :needPosition="needPosition"></i-new-auth>

    <sku :visible="visible" :skuList="skuList" :cur_sku_arr="cur_sku_arr" @cancel="closeSku"
         :sku_val="sku_val" :sku="sku" :goodsid="addCar_goodsid" @changeCartNum="changeCartNum"
         @vipModal="vipModal"></sku>

    <div class='ui-mask' @click.stop='hide_share_handler' v-show="!is_share_html"></div>
    <div class="model-services show" v-show="!is_share_html">
      <div class="model-services-title">分享</div>
      <div class="model-services-content">
        <div class="service-list">
          <div class="service-item">
            <button open-type="share" class='none_btn' plain="true">
              <span class="iconfont icon-weixin2 service-icon"></span>
              <div class="cube-text">
                <span>好友</span>
              </div>
            </button>
          </div>
          <div class="service-item" @click.stop='get_share_img'>
            <span class="iconfont icon-pengyouquan service-icon"></span>
            <div class="cube-text">
              <span>海报</span>
            </div>
          </div>
        </div>
      </div>
    </div>-->


  </div>
</template>

<script>
    import GlobalMixin from '../../mixin/globalMixin.js';
    import {cartMixin} from '../../mixin/cartMixin.js';
    import typeItem from '../type/type-item'
    import {Search, Sticky, Swipe, SwipeItem} from 'vant'
    import status from '../../utils/index.js'
    import util from '../../utils'

    var wcache = require('../../utils/wcache.js'), wx, app
    export default {
        mixins: [cartMixin, GlobalMixin],
        name: 'supply-home',
        components: {
            [typeItem.name]: typeItem,
            [Sticky.name]: Sticky,
            [Swipe.name]: Swipe,
            [SwipeItem.name]: SwipeItem,
            [Search.name]: Search
        },
        data() {
            return {
                active: 2,
                sliderSwiperOption: {
                    //显示分页
                    pagination: {
                        el: '.swiper-pagination'
                    },
                    //设置点击箭头
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    },
                    //自动轮播
                    autoplay: {
                        delay: 2000,
                        //当用户滑动图片后继续自动轮播
                        disableOnInteraction: false
                    },
                    //开启循环模式
                    loop: false
                },
                scrollViewHeight: 0,
                is_share_html: false,
                scrollTop: 0,
                offsetTop: 0,
                needAuth: false,
                changeCarCount: false,
                distance: '',
                loadMore: false,
                pageEmpty: false,
                list: [],
                slider_list: [{
                    image: 'https://fish.xx315.net//Uploads/image/goods/2021-05-09/6097734a3e492.png?imageView2/2/w/0/h/0/ignore-error/1'
                }],
                tabActive: 0,
                activeKey: 0,
                noCateList: true,
                cartNum: 0,
                showCommentData: 0,
                rushCategoryData: {
                    tabs: [],
                    activeIndex: 0
                },
                info: {},
                tabs: [{
                    id: 1,
                    name: this.$t('supply.shangpin')
                },
                    {
                        id: 2,
                        name: this.$t('supply.pingjia'),
                        info: ''
                    },
                    {
                        id: 3,
                        name: this.$t('supply.shangjia')
                    }
                ],
                distance: '',
                latitude: '',
                longitude: '',
                showCopyText: false,
                isShowContactBtn: false,
                community: {},
                copy_text_arr: [],
                commentList: [],
                $comment_data: {
                    pageNum: 1,
                    loading: true,
                    isScrollTop: true,
                    isScrollBottom: false,
                    commentsList: [],
                    loadOver: false,
                    showData: 0
                },
                $data: {
                    options: {},
                    rushCategoryId: "",
                    pageNum: 1,
                    pageOverNum: 1,
                    actIds: [],
                    loading: true,
                    isScrollTop: true,
                    isScrollBottom: false,
                    scrollInfo: null,
                    isSetCategoryScrollBarTop: true,
                    touchStartPos: {
                        pageX: 0,
                        pageY: 0
                    },
                    rushList: [],
                    loadOver: false
                },
                supplyId: 0,
                page: 1,
                center: [121.59996, 31.197646],
                plugin: [{
                    pName: 'Geolocation',
                    events: {
                        init(o) {
                            // o 是高德地图定位插件实例
                            o.getCurrentPosition((status, result) => {
                                console.log(result)
                                if (result && result.position) {

                                    self.$wx.setStorageSync('position', result.position)
                                    self.$wx.setStorage({
                                        key: 'latitude',
                                        data: result.position.lat
                                    })
                                    self.$wx.setStorage({
                                        key: 'longitude',
                                        data: result.position.lng
                                    })
                                    self.$nextTick()
                                }
                            })
                        }
                    }
                }],
            }
        },

        created: function () {
            app = this.$getApp()
            wx = this.$wx


            const t = this.$route.query
            this.onLoad(t)
        },
        mounted() {
            this.onShow();
        },
        methods: {
            /**
             * 生命周期函数--监听页面加载
             */
            onLoad: function (options) {
                this.getScrollViewHeight();
                this.supplyId = options.id || 0;
                this.is_only_distribution = options.is_only_distribution || 0;

                var oid = wcache.get('share_id', null);
                if (oid == null || oid=='' || oid==undefined) {
                    if (options.share_id != 'undefined' && options.share_id > 0) wcache.put('share_id', options.share_id);
                }
                this.needAuth = true;
                this.getData();
            },

            /**
             * 授权成功回调
             */
            authSuccess: function () {
                this.getData();

                this.needAuth = false;
            },



            /**
             * 生命周期函数--监听页面初次渲染完成
             */
            onReady: function () {

            },


            /**
             * 生命周期函数--监听页面显示
             */
            onShow: function () {
                let that = this;
                util.check_login_new().then((res) => {
                    if (res) {
                        that.needAuth = false;
                        status.cartNum().then(function (e) {
                            that.cartNum = e.data
                        })
                    } else {
                        let id = this.specialId;
                        that.needAuth = true;
                        that.navBackUrl = `/ulink_comshop/pages/supply/supplyHome?id=${id}`;
                    }
                })
            },

            /**
             * 生命周期函数--监听页面隐藏
             */
            onHide: function () {

            },

            /**
             * 生命周期函数--监听页面卸载
             */
            onUnload: function () {

            },

            /**
             * 页面相关事件处理函数--监听用户下拉动作
             */
            onPullDownRefresh: function () {

            },

            /**
             * 页面上拉触底事件的处理函数
             */
            onReachBottom: function () {

            },

            /**
             * 用户点击右上角分享
             */
            onShareAppMessage: function () {

            },

            onChange: function (event) {
                console.log(event)
            },

            changeCategory: function (idx) {

                this.$data.$data.loadOver = false;
                idx !== this.rushCategoryData.activeIndex && this.setCategory(idx);
            },

            getData: function () {
                var that = this;
                that.getCommentList();
                let community = wx.getStorageSync('community');
                that.community = community

                var latitude = wx.getStorageSync('latitude');
                var longitude = wx.getStorageSync('longitude');
                that.latitude = latitude;
                that.longitude = longitude;
                if (that.latitude && that.longitude) {
                    that.getSupplyDetails();
                } else {
                    that.getDefaultSupplyDetails();
                }
            },
            getDefaultSupplyDetails: function () {
                this.latitude = 1.3677037;
                this.longitude = 103.8542143;
                this.getSupplyDetails();

            },
            /**
             * 搜索栏高度
             */
            getScrollViewHeight: function () {
                var that = this;

            },
            getLocation: function () {
                var that = this;
                wx.getLocation({
                    type: 'gcj02', //编码方式，
                    success: function (res) {
                        var latitude = res.latitude;
                        var longitude = res.longitude;
                        that.latitude = res.latitude;
                        that.longitude = res.longitude;
                        wx.setStorage({
                            key: "latitude",
                            data: latitude
                        })
                        wx.setStorage({
                            key: "longitude",
                            data: longitude
                        })
                        wx.showLoading();
                    },
                    fail: function (error) {
                        location.checkGPS(app, () => {
                            if (app.globalData.canGetGPS) {
                                let gpos = app.globalData.location;
                                if (gpos && gpos.lat) {
                                    that.latitude = gpos.latitude;
                                    that.longitude = gpos.longitude
                                    wx.setStorage({
                                        key: "latitude",
                                        data: gpos.latitude
                                    })
                                    wx.setStorage({
                                        key: "longitude",
                                        data: gpos.longitude
                                    })
                                    wx.showLoading();
                                }
                            } else {
                                location.openSetting(app).then(function (pos) {
                                    that.latitude = pos.latitude;
                                    that.longitude = pos.longitude;
                                    wx.setStorage({
                                        key: "latitude",
                                        data: pos.latitude
                                    })
                                    wx.setStorage({
                                        key: "longitude",
                                        data: pos.longitude
                                    })
                                    wx.showLoading();
                                });
                            }
                        });
                    }
                });
            },

            getSupplyDetails: function () {
                var that = this;
                var token = wx.getStorageSync('token');
                var cur_community = wx.getStorageSync('community');
                app.util.request({
                    'url': 'entry/wxapp/index',
                    'data': {
                        controller: 'supply.get_details',
                        token: token,
                        page: that.page,
                        is_random: 1,
                        head_id: cur_community.communityId,
                        id: that.supplyId,
                        is_only_distribution: that.is_only_distribution,
                        lat: that.latitude,
                        lon: that.longitude
                    },
                    dataType: 'json',
                    success: function (res) {
                        wx.hideLoading();
                        if (res.code == 0) {
                            let distance = res.distance;
                            if (distance) {
                                if (distance < 1000) {
                                    distance = distance + 'M';
                                } else {
                                    var km = distance / 1000;
                                    if(km > 200) {
                                      distance = 'Unknown';
                                    } else {
                                      distance = (distance/1000).toFixed(1) + 'KM';
                                    }
                                }
                            }
                            let oldList = that.list;
                            let slider_list = that.slider_list;
                            let info = res.data;
                            let list = oldList.concat(res.list);
                            let rushCategoryData = that.rushCategoryData;
                            let noData = false;
                            if (that.page == 1) {

                                wx.setNavigationBarTitle({
                                    title: info.storename,
                                    showLogo: false,
                                    showMore: false,
                                    showBack: true
                                })
                                rushCategoryData.tabs = info.tabs;

                                if (info.tabs && info.tabs.length > 0) {
                                    that.noCateList = false;
                                }

                                slider_list = [{image: info.banner}];

                                if (list.length == 0) {
                                    noData = true;
                                } else {
                                    var length = list.length > 12 ? 12 : list.length;
                                    var copy_text_arr = [];
                                    for (var i = 0; i < length; i++) {
                                        var goods_name = list[i].spuName;
                                        var price = list[i].actPrice[0] + '.' + list[i].actPrice[1];
                                        var copy_text = {goods_name, price};
                                        copy_text_arr.push(copy_text);
                                    }
                                    that.copy_text_arr = copy_text_arr;
                                }
                            }
                            let noMore = false;
                            if (res.list.length == 0) {
                                noMore = true;
                            }

                            that.distance = distance;
                            that.list = list;
                            that.info = info;

                            that.noMore = noMore;
                            that.noData = noData;
                            that.slider_list = slider_list;
                            that.rushCategoryData = rushCategoryData;
                            console.log('setCategory', that.isFirst);
                            that.setCategory(rushCategoryData.activeIndex);
                        } else {
                            that.noMore = true;
                        }
                    }
                })
            },
            setCategory: function (t, active_sub_index = 0) {
                var that = this,
                    rushCategoryData = this.rushCategoryData,
                    tabs = rushCategoryData.tabs[t] || {},
                    scrollViewHeight = this.scrollViewHeight;

                if (active_sub_index > 0) {
                    this.$data.$data.rushCategoryId = tabs.sub[active_sub_index - 1].id;
                } else {
                    this.$data.$data.rushCategoryId = tabs.id;
                }
                this.$data.$data.pageNum = 1;
                this.$data.$data.pageOverNum = 1;
                this.$data.$data.isSetCategoryScrollBarTop = false;
                let isFirstCategory = !t;
                let isLastCategory = (t == rushCategoryData.tabs.length - 1);

                this.rushCategoryData.activeIndex = t;
                this.resetScrollBarTop = 0,
                    this.categoryScrollBarTop = 50 * t - (scrollViewHeight - 50) / 2;
                this.rushList = [];
                this.canNext = false;
                this.isFirstCategory = isFirstCategory;
                this.isLastCategory = isLastCategory;
                this.active_sub_index = active_sub_index;
                this.showDrop = false

                that.getHotList();
            },

            getHotList: function () {
                var a = this, e = this.$data.$data.rushCategoryId
                if (e > -1) {
                    this.$data.$data.loading = !0, this.reqPromise().then(function () {
                        //wx.stopPullDownRefresh();
                        a.$data.$data.loading = !1
                    }).catch(function () {
                        var t = {};
                        e || (t.pageEmpty = !0), a.$data.$data.loading = !1//, a.setData(t), wx.stopPullDownRefresh();
                    });
                }
            },

            reqPromise: function () {
                let that = this;
                return new Promise(function (resolve, reject) {
                    let token = wx.getStorageSync('token');
                    let cur_community = wx.getStorageSync('community');
                    let rushCategoryId = that.$data.$data.rushCategoryId;
                    let supplyId = that.supplyId;
                    app.util.request({
                        url: 'entry/wxapp/index',
                        data: {
                            controller: 'supply.load_gps_goodslist',
                            token,
                            pageNum: that.$data.$data.pageNum,
                            head_id: cur_community.communityId,
                            gid: rushCategoryId,
                            supply_id: supplyId,
                            per_page: 30
                        },
                        dataType: 'json',
                        success: function (res) {
                            if (res.code == 0) {
                                let list = res.list;
                                let h = {};
                                let rushList = that.rushList.concat(list);
                                let {full_money, full_reducemoney, is_open_fullreduction, is_open_vipcard_buy, is_vip_card_member, is_member_level_buy} = res;
                                let reduction = {full_money, full_reducemoney, is_open_fullreduction}

                                // 是否可以会员折扣购买
                                let canLevelBuy = false;
                                if (is_open_vipcard_buy == 1) {
                                    if (is_vip_card_member != 1 && is_member_level_buy == 1) canLevelBuy = true;
                                } else {
                                    (is_member_level_buy == 1) && (canLevelBuy = true);
                                }


                                that.rushList = rushList;
                                that.pageEmpty = false;
                                that.cur_time = res.cur_time;
                                that.reduction = reduction;
                                that.rushCategoryData = that.rushCategoryData;
                                that.is_open_vipcard_buy = is_open_vipcard_buy || 0;
                                that.is_vip_card_member = is_vip_card_member;
                                that.is_member_level_buy = is_member_level_buy;
                                that.canLevelBuy = canLevelBuy;
                                that.vipInfo = {is_open_vipcard_buy, is_vip_card_member, is_member_level_buy};

                                // if (that.$data.$data.pageNum == 1) h.resetScrollBarTop = 51;
                                that.loadText = that.loadMore ? "加载中..." : "没有更多商品了~";
                                that.$data.$data.isSetCategoryScrollBarTop && (h.categoryScrollBarTop = 50 * h.rushCategoryData.activeIndex - (that.scrollViewHeight - 50) / 2);
                                that.$data.$data.loading = false;
                                that.$data.$data.pageNum += 1;
                                //!rushCategoryId && h.rushCategoryData.tabs && h.rushCategoryData.tabs[0] && (that.$data.$data.rushCategoryId = h.rushCategoryData.tabs[0].id); //,that.setData({ resetScrollBarTop: 50 })
                                if (list.length < 30) {
                                    that.$data.$data.loadOver = true;
                                    reject();
                                }
                            } else if (res.code == 1) {
                                that.$data.$data.loadOver = true;
                                reject();
                            } else if (res.code == 2) {
                                //no login
                                that.needAuth = true
                            }
                            resolve(res);
                        }
                    })
                });
            },

            reqOverPromise: function () {
                let that = this;
                return new Promise(function (resolve, reject) {
                    let token = wx.getStorageSync('token');
                    let cur_community = wx.getStorageSync('community');
                    let rushCategoryId = that.$data.$data.rushCategoryId;
                    let supplyId = that.supplyId;
                    app.util.request({
                        url: 'entry/wxapp/index',
                        data: {
                            controller: 'supply.load_over_gps_goodslist',
                            token,
                            pageNum: that.$data.$data.pageOverNum,
                            head_id: cur_community.communityId,
                            gid: rushCategoryId,
                            supply_id: supplyId,
                            per_page: 30
                        },
                        dataType: 'json',
                        success: function (res) {
                            if (res.code == 0) {
                                let list = res.list;
                                let h = {};
                                if (list.length < 30) {
                                    h.loadMore = false;
                                    h.canNext = true;
                                }
                                let rushList = that.rushList.concat(list);
                                let {full_money, full_reducemoney, is_open_fullreduction, is_open_vipcard_buy, is_vip_card_member, is_member_level_buy} = res;
                                let reduction = {full_money, full_reducemoney, is_open_fullreduction}

                                // 是否可以会员折扣购买
                                let canLevelBuy = false;
                                if (is_open_vipcard_buy == 1) {
                                    if (is_vip_card_member != 1 && is_member_level_buy == 1) canLevelBuy = true;
                                } else {
                                    (is_member_level_buy == 1) && (canLevelBuy = true);
                                }

                                that.rushList = rushList;
                                that.pageEmpty = false;
                                that.cur_time = res.cur_time;
                                that.reduction = reduction;
                                that.rushCategoryData = that.rushCategoryData;
                                that.is_open_vipcard_buy = is_open_vipcard_buy || 0;
                                that.is_vip_card_member = is_vip_card_member;
                                that.is_member_level_buy = is_member_level_buy;
                                that.canLevelBuy
                                that.vipInfo = {is_open_vipcard_buy, is_vip_card_member, is_member_level_buy};

                                // if (that.$data.$data.pageNum == 1) h.resetScrollBarTop = 51;
                                h.loadText = that.loadMore ? "加载中..." : "没有更多商品了~";
                                that.$data.$data.isSetCategoryScrollBarTop && (h.categoryScrollBarTop = 50 * h.rushCategoryData.activeIndex - (that.scrollViewHeight - 50) / 2);
                                that.$data.$data.loading = false, that.$data.$data.pageOverNum += 1, !rushCategoryId && h.rushCategoryData.tabs && h.rushCategoryData.tabs[0] && (that.$data.$data.rushCategoryId = h.rushCategoryData.tabs[0].id); //,that.setData({ resetScrollBarTop: 50 })
                            } else if (res.code == 1) {

                                if (that.$data.$data.pageOverNum == 1 && that.rushList.length == 0) {
                                    console.log('无数据');
                                    that.pageEmpty = true;
                                }
                                that.$data.$data.loading = true;
                                that.loadMore = false;
                                that.canNext = true;
                            } else if (res.code == 2) {
                                //no login
                                that.needAuth = true
                            }
                            resolve(res);
                        }
                    })
                });
            },

            getCommentList: function () {
                var that = this;
                let supplyId = that.supplyId;
                let token = wx.getStorageSync('token');
                that.$data.$comment_data.loading = true;
                let pageNum = that.$data.$comment_data.pageNum;
                app.util.request({
                    url: 'entry/wxapp/index',
                    data: {
                        controller: 'supply.comment_list',
                        token: token,
                        pageNum: pageNum,
                        supply_id: supplyId,
                        per_page: 30
                    },
                    dataType: 'json',
                    success: function (res) {
                        console.log(res)
                        that.$data.$comment_data.loading = false;
                        if (res.code == 1) {
                            let list = res.comment_list;
                            let commentList = that.commentList.concat(list);
                            let showCommentData = 0;
                            if (commentList.length > 0) {
                                showCommentData = 1;
                            }
                            that.$data.$comment_data.pageNum++;
                            that.commentList = commentList;
                            that.showCommentData = showCommentData;

                            if (list.length < 30) {
                                that.$data.$comment_data.loadOver = true;
                            }

                        }else{
                            that.$data.$comment_data.loadOver = true;
                        }
                    }
                })
            },
            share_handler: function () {
                this.is_share_html = true
            },

            hide_share_handler: function () {
                this.is_share_html = false
            },
            share_whatsapp: function() {
                var that = this;
                let supplyId = that.supplyId;
                let token = wx.getStorageSync('token');
                let url = encodeURIComponent(window.location.href);


                app.util.request({
                    url: "entry/wxapp/user",
                    data: {
                        controller: "index.get_share_url",
                        url:url,
                        supply_id:supplyId,
                        token: token
                    },
                    dataType: "json",
                    success: function(t) {

                        location  =  'whatsapp://send?text=' + encodeURIComponent(that.info.shopname) + encodeURIComponent('\n\n' +  t.url)

                    }
                });
                this.is_share_html = false

            },
            scroll: function (t) {
                var a = t.detail,
                    e = a.scrollTop,
                    o = a.scrollHeight,
                    i = this,
                    r = i.scrollViewHeight,
                    s = i.loadMore;
                this.$data.$data.scrollInfo = a, this.$data.$data.isScrollTop = e <= 49, this.$data.$data.isScrollBottom = !s && o - e - r <= 10;
            },
            scrollBottom: function () {
                var t = this,
                    e = this.$data.$data,
                    loading = e.loading;
                if (!loading) {
                    e.loading = true;

                    this.getHotList();
                }
            },
            vipModal: function (t) {
                this.setData(t.detail)
            },
            changeCartNum: function(t) {
                this.cartNum = t
            },
            lianxikefu:function (c,t) {
                if (window.navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
                    window.location.href = "https://wa.me/"+c+t;
                    setTimeout(function () {
                        window.location.href = "https://itunes.apple.com/us/app/whatsapp-messenger/id310633997?mt=8";
                        window.location.href = "https://itunes.apple.com/us/app/whatsapp-messenger/id310633997?mt=8";
                    }, 2000);
                } else if (window.navigator.userAgent.match(/android/i)) {
                    window.location.href = "https://wa.me/"+c+t;
                    setTimeout(function () {
                        window.location.href = "https://play.google.com/store/apps/details?id=com.whatsapp";
                    }, 2000)
                }
            }
        }
    }
</script>

<style scoped>

  .page {
    background-color: #f6f6f6;
    font-weight: 400;
    color: #333;
    height: 100%;
    overflow-y: scroll;
  }

  .swipe_supply_home {
    position: relative;
    height: 60vw;
    margin-bottom: 2vw;
  }


  .logo {
    position: absolute;
    top: 35vw;
    left: 45%;
    width: 12vw;
    height: 12vw;
    z-index: 2;
  }

  .fixed-share_supply_home {
    position: absolute;
    width: 11vw;
    height: 11vw;
    border-radius: 50%;
    top: 37vw;
    left: 80%;
    font-size: 2vw;
    padding: 1vw;
    line-height: 1.2;
    z-index: 100;
  }

  .supply_name_supply_hmoe {
    font-size: 4.5vw;
    text-align: center;
    margin-top: 3vw;
    height: 7vw;
  }

  .supply_subtitle {
    text-align: center;
    width: 100vw;
    padding-left: 2vw;
    font-size: 2vw;
    padding-right: 2vw;
  }

  .supply_subtitle span {
    text-align: center;
    font-size: 3vw;
    padding-left: 2vw;
    padding-right: 2vw;
    color: #646566;
  }

  .supply_subtitle .border {
    border-right: 1px solid #DCDCDC
  }

  .swiper-content {
    width: 100vw;
    height: 46vw;
    border-radius: 1.2vw;
    padding-bottom: 4vw;
  }

  .swiper-content swiper-item {
    border-radius: 1.2vw;
    margin-right: 2vw;
    display: flex;
    justify-content: flex-start;
  }

  .swiper-content swiper-item:last-child {
    margin: 0;
  }

  .swiper-content .banner {
    width: 90vw;
    height: 32vw;
    margin: 0 2vw;
    display: block;
    border-radius: 1.2vw;
    position: relative;
    overflow: hidden;
  }

  .swiper-content .banner .banner-img {
    width: 90vw;
    height: 32vw;
    border-radius: 1.2vw;
    display: block;
    overflow: hidden;
  }

  .sticky-cate {
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    background-color: #fff;
    -webkit-user-select: none;
    user-select: none;
    z-index: 99;
  }

  .nav-bar {
    width: 100%;
    position: fixed;
    left: 0;
    z-index: 10;
  }

  .nav-bar .nav-bar-inner {
    display: flex;
    justify-content: space-between;
    padding: 0 4vw;
    background-color: white;
    box-shadow: 0vw 1vw 1vw 0vw rgba(255, 255, 255, 0.25);
  }

  .nav-bar .nav-bar-item {
    position: relative;
    word-break: keep-all;
    font-size: 2.8vw;
    font-weight: 500;
    color: #666;
    padding: 2vw 0;
  }

  .nav-bar .current.nav-bar-item {
    border-bottom: 3px solid #FED206;
  }

  .nav-bar-content {
    margin-top: 49px;
    padding-bottom: 3vw;
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
    width: 20vw;
    height: 79vh;
    overflow: scroll;
    background: #f8f8f7;
    padding-bottom: 10vw;
  }

  .category-item {
    position: relative;
    width: 20vw;
    height: 10vw;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.8vw;
    color: #787878;
    line-height: 3vw;
  }

  .category-item div {
    max-width: 14vw;
    text-align: center;
  }

  .category-item .item-border {
    position: absolute;
    top: 4vw;
    left: 0;
    display: none;
    width: 1vw;
    height: 2.8vw;
    background: linear-gradient(#ff7955, #ff4242);
  }

  .category-item.active {
    background: #fff;
    font-weight: 500;
    color: #333;
  }

  .category-item.active .item-border {
    display: block;
  }

  .page-list {
    position: absolute;
    top: 0;
    left: 20vw;
    width: 78vw;
    height: 79vh;
    overflow: scroll;
    box-sizing: border-box;
  }

  .page-list .scroll-col-tip-top, .page-list .scroll-col-tip-bottom {
    height: 10vw;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #aaa;
    font-size: 2.4vw;
    line-height: 2.4vw;
  }

  .page-list .scroll-col-tip-top img, .page-list .scroll-col-tip-bottom img {
    width: 2.4vw;
    height: 1.6vw;
    margin-right: 1vw;
  }

  .van-info {
    background-color: var(--info-background-color, #ffff);
  }

  .none-rush-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-bottom: 14vw;
    padding-top: 14vw;
  }

  .none-rush-list .img-block {
    width: 24vw;
    height: 24vw;
    margin-bottom: 3vw;
  }

  .none-rush-list .h1 {
    font-size: 3.2vw;
    line-height: 3.2vw;
    color: #444;
    margin-bottom: 2vw;
  }

  .none-rush-list .h2 {
    font-size: 2.4vw;
    line-height: 2.4vw;
    color: #aaa;
  }

  .noComments {
    height: 100%;
    background: #fff;
  }

  .noComments .noCommentsCon {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding-bottom: 26vw;
  }

  .noComments .noCommentsCon .noCommentsImg {
    width: 22vw;
    height: 22vw;
    margin-top: 26vw;
    margin-bottom: 3vw;
  }

  .noComments .noCommentsCon .noCommentsTit {
    font-size: 3vw;
    color: #666;
  }

  .comments {
    padding-bottom: 4vw;
  }

  .comments .commentsDetail {
    padding: 0 2vw;
    margin-top: 3vw;
    margin-bottom: 12vw;
  }

  .comments .commentsDetail .commentsList {
    margin-bottom: 2vw;
  }

  .comments .commentsDetail .commentsList .commentsListInfo {
    padding: 3vw;
  }

  .comments .commentsDetail .commentsList .commentsListInfo .commentsCon {
    font-size: 2.8vw;
    color: #666;
    line-height: 4.4vw;
    margin-bottom: 1vw;
    word-wrap: break-word;
  }

  .comments .commentsDetail .commentsList .commentsListInfo .doubleHidden {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    text-overflow: initial;
    white-space: normal;
  }

  .comments .commentsDetail .commentsList .commentsListInfo .commentsOpen {
    height: 2.2vw;
    font-size: 2.2vw;
    color: #444;
    font-weight: bold;
    margin-bottom: 2vw;
    display: flex;
    align-items: center;
  }

  .comments .commentsDetail .commentsList .commentsListInfo .commentsOpen .commentsOpenImg {
    width: 1.6vw;
    height: 1vw;
    margin-left: 1vw;
  }

  .comments .commentsDetail .commentsList .commentsListInfo .commentsOpen .down {
    transform: rotate(180deg);
  }

  .comments .commentsDetail .commentsList .commentsListInfo .commentsImgCon {
    display: flex;
    justify-content: flex-start;
    overflow-x: auto;
  }

  ::-webkit-scrollbar {
    width: 0;
    height: 0;
    color: transparent;
  }

  .comments .commentsDetail .commentsList .commentsListInfo .commentsImgCon .commentsImg {
    margin-right: 1.6vw;
    display: flex;
  }

  .comments .commentsDetail .commentsList .commentsListInfo .commentsImgCon .commentsImg .goodsImg {
    width: 15vw;
  }

  .comments .commentsDetail .commentsList .commentsListInfo .commentsImgCon .commentsImg .goodsImg .img-class {
    width: 15vw;
    height: 15vw;
    border-radius: 1vw;
  }

  .comments .commentsDetail .commentsList .commentsListInfo .commentsImgCon .commentsImg:last-child {
    margin: 0;
  }

  .comments .commentsDetail .commentsList .commentsListInfo .commentsTime {
    font-size: 2.2vw;
    color: #aaa;
    line-height: 2.2vw;
    margin-top: 2vw;
    display: flex;
    justify-content: flex-end;
  }

  .comment-user {
    line-height: 6vw;
    display: flex;
    margin-bottom: 1vw
  }

  .comment-user img {
    width: 6vw;
    height: 6vw;
    border-radius: 50%;
    margin-right: 1.5vw;
    background-color: #f0f0f0;
  }

  .comment-user span {
    font-size: 3vw;
  }

  /*分享begin*/

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
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
    -webkit-transform: translate(0, 100%);
    transform: translate(0, 100%);
  }

  .model-services.show {
    -webkit-transform: translate(0);
    transform: translate(0);
  }

  .model-services .model-services-title {
    font-size: 4vw;
    text-align: center;
    height: 8vw;
    line-height: 8vw;
    border-bottom: 1px solid #f2f5f8;
  }

  .model-services .model-services-content {
    padding: 4vw;
  }

  .model-services .model-services-content .service-item {
    margin-bottom: 2vw;
    width: 50%;
    float: left;
    text-align: center;
  }

  .model-services .model-services-content .service-icon {
    font-size: 8vw;
    color: #50b674;
  }

  .service-name {
    padding-left: 1vw;
  }

  .cube-text {
    position: relative;
    width: 100%;
    height: 3.2vw;
    line-height: 3.2vw;
    color: #777;
    margin-top: 1vw;
    font-size: 2.4vw;
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
    height: 10vw;
    background: #f7f7f7;
  }

  .share-modal-img img {
    width: 100%;
  }

  .share-modal-btn-list {
    display: flex;
    margin-top: 3vw;
  }

  .share-modal-btn-item {
    text-align: center;
    flex: 1;
  }

  .share-modal .btn-icon {
    font-size: 7vw;
    color: #fff;
    margin: 0 auto;
  }

  .share-modal .btn-text {
    position: relative;
    width: 100%;
    height: 3.2vw;
    line-height: 3.2vw;
    color: #fff;
    margin-top: 1vw;
    font-size: 2.4vw;
  }

  /*分享end*/

  .img-div {
    width: 24vw;
  }
  .lianxikefu{
    border: 1px solid #ebedf0;
    font-size: 14px;
    color: #323233;
    background-color: #fff;
    width: 96vw;
    position: relative;
    margin: 2vw;
    display: inline-block;
    box-sizing: border-box;
    height: 10vw;
    padding: 0;
    font-size: 16px;
    line-height: 10vw;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;
    -webkit-transition: opacity 0.2s;
    transition: opacity 0.2s;
    -webkit-appearance: none;
  }

</style>
