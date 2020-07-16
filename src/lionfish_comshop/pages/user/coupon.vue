<template>
  <!--<i-auth @authSuccess="authSuccess" :needAuth="!is_login">-->
    <div class="tabs">
      <div class="tabs-bar">
        <div class="tabs-nav--container">
          <div class="tabs-nav--wrap">
            <div class="tabs-nav tabs-nav--animated">
              <div class="tabs-link-bar tabs-link-bar-animated"></div>
              <div @click="tabchange" :class="['tabs-tab', 'J-tabs-tab-key', (tab_index==1?'tabs-tab-active':'')]" data-index="1" :style="[{borderColor:(tab_index==1 ?skin.color:'')},{color:(tab_index==1 ?skin.color:'')}]">
              <!--<div @click="tabchange" :class="['tabs-tab', 'J-tabs-tab-key', (tab_index==1?'tabs-tab-active':'')]" data-index="1" :style="{borderColor:skin.color,color:skin.color}">-->
                {{$t('coupon.weishiyong')}}
              </div>
              <div @click="tabchange" :class="['tabs-tab', 'J-tabs-tab-key', (tab_index==2?'tabs-tab-active':'')]" data-index="2" :style="[{borderColor:(tab_index==2 ?skin.color:'')},{color:(tab_index==2 ?skin.color:'')}]">
              <!--<div @click="tabchange" :class="['tabs-tab', 'J-tabs-tab-key', (tab_index==2?'tabs-tab-active':'')]" data-index="2" :style="{borderColor:skin.color,color:skin.color}">-->
                {{$t('coupon.yishiyong')}}/{{$t('coupon.yiguoqi')}}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="list">
        <div :class="['coupon', (item.is_over==1?'expired':''), (item.is_use==1?'used':'')]" v-if="quan.length>0" v-for="(item,index) in quan" :key="item.key">
          <div class="header">
            <div class="price">
              <div class="reduce-price">
                {{item.credit}}<span>元</span>
              </div>
              <div class="reduce-desc">{{item.limit_money>0.01?'满'+item.limit_money+'元可用':'不限制'}}</div>
            </div>
            <div class="info">
              <div class="reduce-title">
                <span class="reduce-type" v-if="item.tag">{{item.tag}}</span> {{item.voucher_title}}</div>
              <div class="reduce-area"v-if="item.is_limit_goods_buy==0">{{$t('coupon.shiyongfanwei')}}：{{$t('coupon.suoyoushangpin')}}</div>
              <div class="reduce-area" v-else-if="item.is_limit_goods_buy==1">{{$t('coupon.shiyongfanwei')}}：{{$t('coupon.zhidingshangpin')}}</div>
              <div class="reduce-area" v-else-if="item.is_limit_goods_buy==2">{{$t('coupon.shiyongfanwei')}}：{{$t('coupon.zhidingfenlei')}}</div>
            </div>
            <div class="status">
              <div @click="goUse" class="go-shop" :data-idx="index" v-if="item.is_over==0&&item.is_use==0">{{$t('coupon.qushiyong')}}</div>
              <image src="@/assets/images/expired.png" v-if="item.is_over==1&&item.is_use==0"></image>
              <image src="@/assets/images/used.png" v-if="item.is_use==1"></image>
            </div>
          </div>
          <div class="footer">{{$t('coupon.youxiaoqi')}}：{{item.begin_time}}~{{item.end_time}}</div>
        </div>
        <div class="empty-wrap" v-if="quan.length==0&&isHideLoadMore">
          <image class="empty-img" src="@/assets/images/noData.png"></image>
          <div class="empty-txt">暂无任何记录～</div>
        </div>
        <i-load-more iClass="loadMore" :loading="!isHideLoadMore" :tip="loadText" v-if="!isHideLoadMore"></i-load-more>
      </div>
    </div>
  <!--</i-auth>-->

</template>

<script>
  var app,wx;
  import GlobalMixin from '../../mixin/globalMixin.js';
  import util from '../../utils/index.js';

  export default {
    mixins: [GlobalMixin],
    util: [util],
    name:'user-coupon',
    data() {
      return {
        is_login: !0,
        tab_index: 1,
        isHideLoadMore: !0,
        no_order: 0,
        quan: [],
        loadText: "Loading",
        page: 1,
        tabIdx1:'',
        tabIdx2:''
      }
    },
    created: function() {
      wx = this.$wx;
      app = this.$app;
      this.$wx.setNavigationBarTitle({
        title: '',
        showLogo:false,
        showMore:false,
        showBack:true
      })
      this.onLoad();
    },
    methods: {
      authModal: function() {
        var i = this;
        util.check_login_new().then(function(e) {
          if(e){
            i.is_login = !0
          }else{
            wx.redirectTo({
              url: "/login"
            })
          }
        })
//        return !i.is_login
      },
      onLoad: function(t) {
//        var loginStatus = util.check_login() ;
//        debugger
//        if (loginStatus){
//          this.is_login= !0
//        }else {
//          this.is_login= !1;
//        }
        this.authModal();
        this.getData();
      },
      onShow: function() {},
      authSuccess: function() {
        wx.redirectTo({
          url: "/lionfish_comshop/pages/user/me"
        });
      },
      tabchange: function(t) {
        var i = t.currentTarget.dataset.index;
        this.page = 1;
        this.quan= [];
        this.tab_index= i;
        this.getData();
      },
      getData: function() {
        this.isHideLoadMore= !0;
        wx.showLoading();
        this.no_order = 1;
        var t = this.page;
        var i = this.tab_index;
        var a = wx.getStorageSync("token");
        var e = this;
        this.$http_post({
            controller: "user.myvoucherlist",
            token: a,
            type: i,
            page: t,
            pre_page: 5
          }).then(t=> {

          console.log(t, "myvoucherlist");
          wx.hideLoading();
          if (0 != t.code){
            e.isHideLoadMore= !0;
            return !1;
          }else{
            var i = e.quan;
            var goods = t.list;
            for(var j=0;j<goods.length;j++){
              i.push(goods[j]);
            }
            e.quan= i;
            e.no_order= 0;
          }
        });
      },
      goUse: function(t) {
        var i = t.currentTarget.dataset.idx, a = this.quan || [];
        if (a.length >= i) {
            if (0 == a[i].is_limit_goods_buy) {
                wx.switchTab({
                url: "/lionfish_comshop/pages/index/index"
              });
            } else if (1 == a[i].is_limit_goods_buy) {
              var e = a[i].limit_goods_list, s = "";
              var ids = e.split(",");
              s = 1 < ids.length ? "/lionfish_comshop/pages/type/result?type=2&good_ids=" + e : "/lionfish_comshop/pages/goods/goodsDetail?id=" + e,
                wx.navigateTo({
                  url: s
                });
          } else if (2 == a[i].is_limit_goods_buy) {
            var o = a[i].goodscates || 0;
            wx.navigateTo({
              url: "/lionfish_comshop/pages/type/result?type=1&gid=" + o
            });
          }
        }
      },
      onReachBottom: function() {
        if (1 == this.no_order) return !1;
        this.page += 1;
        this.getData();
        this.isHideLoadMore= !1;
      }
    }
  }
</script>
<style>
  @import "coupon.less";
</style>
