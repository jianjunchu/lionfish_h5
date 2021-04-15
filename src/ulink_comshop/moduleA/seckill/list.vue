<template>
  <div>
    <view class="wrap">
      <view class="fixed-top">
        <scroll-view scrollX class="scroll-wrapper" scrollIntoView="item{{currentTab<4?0:currentTab-3}}" scrollWithAnimation="true" style="background:{{skin.color}}" wx:if="{{scekillTimeList.length}}">
          <view bindtap="handleClick" class="navigate-item {{currentTab===index?'active':''}}" data-index="{{index}}" id="item{{index}}" wx:for="{{scekillTimeList}}" wx:key="index">
            <view class="names">{{item.timeStr}}</view>
            <span class="desc" style="{{currentTab==index?'color:'+skin.color:''}}">{{item.desc}}</span>
          </view>
        </scroll-view>
        <view class="counttime i-flex i-flex-spb">
          <view style="color: {{skin.color?skin.color:'#ea474e;'}}">限时抢购 先到先得</view>
          <view>
            <i-count-down bind:callback="endCurSeckill" clearTimer="{{clearTimer}}" countdownClass="count-down" itemClass="item-time" showDay="true" target="{{endTime}}" wx:if="{{scekillTimeList[currentTab].state>0}}">
              <span class="count-down-left-text">距离本场{{scekillTimeList[currentTab].state==1?'结束':'开始'}}</span>
            </i-count-down>
          </view>
        </view>
      </view>
      <view class="list bg-f">
        <view class="list-item" wx:for="{{list}}" wx:key="id">
          <i-seckill-spu begin="{{scekillTimeList[currentTab].state==2?1:0}}" needAuth="{{needAuth}}" spuItem="{{item}}" theme="{{2}}"></i-seckill-spu>
        </view>
        <i-empty wx:if="{{showEmpty}}">暂时没有商品</i-empty>
      </view>
    </view>
    <i-new-auth bind:authSuccess="authSuccess" bind:cancel="authModal" needAuth="{{needAuth&&showAuthModal}}" needPosition="{{true}}"></i-new-auth>

  </div>
</template>

<script>
  import  util from "../../utils"
  import globalMixin from '../../mixin/globalMixin'
  var wx,app;
  export default {
    name: 'seckill',
    mixins:[globalMixin],
    data(){
      return{
        currentTab: 0,
        scekillTimeList: [],
        endTime: 1e4,
        list: [],
        clearTimer: !1,
        secTime: "",
        seckill_share_title: "",
        seckill_share_image: "",
      }
    },
    created:function(){
      wx = this.$wx;
      app = this.$getApp()

      this.onLoad()
    },
    methods:{
      onLoad: function(e) {
        this.secTime = e.time || "";
      },
      onShow: function() {
        var t = this;
        util.check_login_new().then(function(e) {
          t.setData({
            needAuth: !e
          });
        }), this.loadPage();
      },
      onHide: function() {
        this.setData({
          clearTimer: !1
        });
      },
      loadPage: function() {
        this.getInfo();
      },
      authSuccess: function() {
        var e = this;
        this.setData({
          showEmpty: !1,
          needAuth: !1,
          showAuthModal: !1
        }, function() {
          e.loadPage();
        });
      },
      authModal: function() {
        return !this.data.needAuth || (this.setData({
          showAuthModal: !this.data.showAuthModal
        }), !1);
      },
      getInfo: function() {
        var g = this;
        app.util.request({
          url: "entry/wxapp/index",
          data: {
            controller: "scekill.get_scekill_info"
          },
          dataType: "json",
          success: function(e) {
            if (0 == e.data.code) {
              var t = e.data.data, i = (t.seckill_is_open, t.scekill_time_arr), a = t.seckill_page_title, s = t.seckill_bg_color, l = t.seckill_share_title, n = t.seckill_share_image;
              wx.setNavigationBarTitle({
                title: a || "限时秒杀"
              });
              var o = new Date().getHours();
              console.log("当前时间:", o);
              var c = i || [], r = [], u = 0;
              if (c.length) {
                if (c.forEach(function(e, t) {
                  var i = {};
                  e == o ? (i.state = 1, i.desc = "疯抢中", u = t) : e < o ? (i.state = 0, i.desc = "已开抢") : (i.state = 2,
                    i.desc = "即将开抢"), i.timeStr = (e < 10 ? "0" + e : e) + ":00", i.seckillTime = e,
                    r.push(i);
                }), "" != g.secTime) {
                  var d = c.findIndex(function(e) {
                    return e == g.secTime;
                  });
                  0 < d && (u = d);
                }
                g.getSecKillGoods(c[u]);
              }
              var h = 1 * c[u] + 1;
              "" != g.secTime && o != c[u] && (h = 1 * c[u]);
              var m = new Date(new Date().toLocaleDateString()).getTime() + 60 * h * 60 * 1e3;
              g.seckill_share_title = l, g.seckill_share_image = n, g.setData({
                scekillTimeList: r,
                seckill_bg_color: s,
                currentTab: u,
                endTime: m
              });
            }
          }
        });
      },
      handleClick: function(e) {
        var t = this, i = e.currentTarget.dataset.index, a = this.data.scekillTimeList, s = new Date(new Date().toLocaleDateString()).getTime(), l = a[i], n = 0;
        1 == l.state ? n = s + 60 * (1 * l.seckillTime + 1) * 60 * 1e3 : 2 == l.state && (n = s + 1 * l.seckillTime * 60 * 60 * 1e3 + 1),
          this.setData({
            list: [],
            currentTab: i,
            endTime: n,
            clearTimer: !0
          }, function() {
            t.getSecKillGoods(l.seckillTime);
          });
      },
      getSecKillGoods: function(e) {
        wx.showLoading();
        var a = this, t = wx.getStorageSync("community"), i = wx.getStorageSync("token");
        app.util.request({
          url: "entry/wxapp/index",
          data: {
            controller: "index.load_gps_goodslist",
            token: i,
            pageNum: 1,
            head_id: t.communityId,
            seckill_time: e,
            is_seckill: 1,
            per_page: 1e4
          },
          dataType: "json",
          success: function(e) {
            console.log("==========1");
            if (wx.stopPullDownRefresh(), wx.hideLoading(), 0 == e.data.code) {
              var t = e.data.list || [], i = !1;
              0 == (t = a.transTime(t)).length && (i = !0), a.setData({
                list: t,
                clearTimer: !1,
                showEmpty: i
              });
            } else a.setData({
              clearTimer: !1,
              showEmpty: !0
            });
          }
        });
      },
      transTime: function(e) {
        return 0 === (1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0) && e.map(function(e) {
          e.end_time *= 1e3, e.actEnd = e.end_time <= new Date().getTime();
        }), e;
      },
      endCurSeckill: function() {
        this.loadPage();
      },
      onPullDownRefresh: function() {
        this.loadPage();
      },
      onShareAppMessage: function() {
        var e = wx.getStorageSync("member_id");
        return {
          title: this.seckill_share_title,
          path: "lionfish_comshop/moduleA/seckill/list?share_id=" + e,
          imageUrl: this.seckill_share_image,
          success: function() {},
          fail: function() {}
        };
      }
    }
  }
</script>

<style scoped>
  .fixed-top {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
  }

  .scroll-wrapper {
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;
    height: 114rpx;
    box-sizing: border-box;
    background: linear-gradient(90deg,#ea404b 0%,#ed745d 100%);
  }

  ::-webkit-scrollbar {
    width: 0;
    height: 0;
    color: transparent;
  }

  .navigate-item {
    display: inline-block;
    text-align: center;
    height: 99rpx;
    width: 20%;
    color: #fff;
    margin-top: 15rpx;
  }

  .names {
    font-size: 28rpx;
  }

  .desc {
    font-size: 22rpx;
  }

  .navigate-item.active .names {
    color: #fff;
    font-weight: bold;
    font-size: 34rpx;
  }

  .navigate-item.active .desc {
    color: #ea474e;
    padding: 2rpx 10rpx;
    background-color: #fff;
    border-radius: 20rpx;
  }

  .counttime {
    height: 60rpx;
    background: #f0f4f7;
    padding: 0 20rpx;
    font-size: 24rpx;
  }

  .count-down {
    height: 68rpx;
    line-height: 68rpx;
    color: #444;
    font-size: 26rpx;
    display: flex;
    align-items: center;
    flex: 1;
  }

  .count-down .item-time {
    width: 34rpx;
    height: 32rpx;
    line-height: 32rpx;
    color: #fff;
    text-align: center;
    background: #444;
    border-radius: 4rpx;
    padding: 0 2rpx;
  }

  .count-down-left-text {
    font-size: 24rpx;
    margin-right: 10rpx;
  }

  .list {
    padding-top: 174rpx;
  }

  .list-item {
    border-bottom: 0.1rpx solid #f2f5f8;
  }
</style>
