<template>

  <view class="wrap">
    <view class="cate-list" v-if="rushList.length" v-for="(item ,index) in rushList" :key="item.id">
      <img class="topic-img" mode="widthFix" :src="item.cate_info.banner" v-if="index==0&&item.cate_info.banner"/>
      <view class="cate-title">
        <img class="title-img" mode="widthFix" :src="item.cate_info.logo" v-if="item.cate_info.logo"/>
      </view>
      <view class="list">
        <i-rush-spu @authModal="authModal" @changeCartNum="changeCartNum" @openSku="openSku" @vipModal="vipModal" class="item" needAuth="{{needAuth" reduction="{{reduction" spuItem="{{goodsItem" stopClick="{{stopClick" width250="{{true" v-if="item.list.length" wx:for="{{item.list" wx:for-index="idx" wx:for-item="goodsItem" wx:key="idx"></i-rush-spu>
      </view>
      <i-load-more iClass="loadMore" :loading="loadMore" :tip="loadText" v-if="!loadOver&&!showEmpty&&loadMore"></i-load-more>
    </view>
    <view class="none-rush-list" v-if="showEmpty">
      <img class="img-block" src="@/assets/images/icon-index-empty.png"/>
      <view class="h1">暂时没有团购</view>
      <view class="h2">我们正在为您准备更优惠的团购</view>
    </view>
    <i-cart-btn :cartNum="cartNum" iClass="{{is_show_cate_tabbar==1?'cartBtn':''" v-if="is_show_cate_tabbar!=1"></i-cart-btn>
    <i-aside-btn showContact="{{is_show_cate_tabbar==1" showHome="{{is_show_cate_tabbar!=1" showShare="{{true"></i-aside-btn>
    <i-tabbar :cartNum="cartNum" class="tabbar {{isIpx?'pb20':''" currentIdx="-1" v-if="is_show_cate_tabbar==1"></i-tabbar>
  </view>
  <!--<i-new-auth @authSuccess="authSuccess" @cancel="authModal" :needAuth="needAuth&&showAuthModal"></i-new-auth>
  <sku @cancel="closeSku" @changeCartNum="changeCartNum" @vipModal="vipModal" :cur_sku_arr="cur_sku_arr" :goodsid="addCar_goodsid" :sku="sku" :skuList="skuList" :sku_val="sku_val" v-if="visible"></sku>

  <i-vip-modal :imgUrl="pop_vipmember_buyimage" v-if="showVipModal"></i-vip-modal>-->

</template>

<script>
  import status from '../../utils/index.js'
  import util from '../../utils'
  import wcache from '../../utils/wcache.js'
  import compoentCartMixin from '../../mixin/compoentCartMixin'

  var app,wx
  export default {
    name: 'type-details',
    mixins: [compoentCartMixin],
    data(){
      return{
        loadMore: !0,
        loadText: "加载中...",
        rushList: [],
        cartNum: 0,
        showEmpty: !1
      }
    },
    $data: {
      id: 0,
      pageNum: 1
    },
    methods: {
      created:function(){
        app = this.$getApp();
        wx = this.$wx;

        wx.setNavigationBarTitle({
          title: "Order",
          showLogo:false,
          showMore:false,
          showBack:true
        })
        const t = this.$route.query
        this.onLoad(t);
      },

      onLoad: function(t) {
        var a = t.id || "";
        (this.$data.id = a) ? this.getData() : wx.showToast({
          title: "参数错误",
          icon: "none"
        }, function() {
          wx.switchTab({
            url: "/lionfish_comshop/pages/index/index"
          });
        });
      },
      onShow: function() {
        var e = this;
        util.check_login_new().then(function(t) {
          var a = !t;
          e.setData({
            needAuth: a
          }), t && (0, status.cartNum)("", !0).then(function(t) {
            0 == t.code && e.setData({
              cartNum: t.data
            });
          });
        });
      },
      authSuccess: function() {
        var t = this;
        this.$data.pageNum = 1, this.setData({
          loadMore: !0,
          loadText: "加载中...",
          rushList: [],
          showEmpty: !1,
          needAuth: !1
        }, function() {
          t.getData();
        });
      },
      getData: function() {
        var r = this;
        return new Promise(function(d, t) {
          var a = wx.getStorageSync("token"), e = wx.getStorageSync("community"), i = r.$data.id;
          wx.showLoading(), app.util.request({
            url: "entry/wxapp/index",
            data: {
              controller: "index.load_cate_goodslist",
              token: a,
              head_id: e.communityId,
              gid: i
            },
            dataType: "json",
            success: function(t) {
              if (wx.hideLoading(), 0 == t.data.code) {
                var a = t.data, e = a.full_money, i = a.full_reducemoney, n = a.is_open_fullreduction, o = a.list, s = a.is_show_cate_tabbar, u = {
                  full_money: e,
                  full_reducemoney: i,
                  is_open_fullreduction: n
                }, c = {
                  rushList: r.data.rushList.concat(o),
                  pageEmpty: !1,
                  reduction: u,
                  loadOver: !0,
                  is_show_cate_tabbar: s
                };
                0 == o.length && (c.showEmpty = !0), wx.setNavigationBarTitle({
                  title: o.length && o[0].cate_info.name || ""
                }), c.loadText = r.data.loadMore ? "加载中..." : "没有更多商品了~", r.setData(c, function() {
                  r.$data.pageNum += 1;
                });
              } else 1 == t.data.code && wx.showModal({
                title: "提示",
                content: t.data.msg || "无数据",
                showCancel: !1,
                success: function() {
                  wx.navigateBack();
                }
              });
              d(t);
            }
          });
        });
      },
      changeCartNum: function(t) {
        var a = t.detail;
        (0, status.cartNum)(this.setData({
          cartNum: a
        }));
      },
      onReachBottom: function() {
        console.log("这是我的底线");
      },
      onShareAppMessage: function(t) {
        var a = this.data.cate_info, e = a && a.name || "分类列表", i = wx.getStorageSync("member_id");
        return {
          title: e,
          path: "lionfish_comshop/pages/type/details?id=" + this.$data.id + "&share_id=" + i,
          success: function(t) {},
          fail: function(t) {}
        };
      }
    }
  }
</script>

<style scoped>
  page {
    background: #fff;
  }

  .wrap {
    padding-bottom: 14vw;
  }

  .topic-img {
    width: 100%;
  }

  .cate-title {
    text-align: center;
    margin: 2vw 0;
  }

  .title-img {
    max-width: 100%;
  }

  .list {
    display: flex;
    flex-wrap: wrap;
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

  .cartBtn {
    bottom: 18vw!important;
  }
</style>
