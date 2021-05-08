<template>
  <div class="wrap">
    <div class="nav-bar">
      <div class="nav-bar-inner">
        <div @click="changeTabs" v-for="item in tabs" :key="item.id" :class="status==item.id?'nav-bar-item current':'nav-bar-item'" :data-type="item.id">{{item.name}}</div>
      </div>
    </div>
    <div class="nav-bar-content" v-if="list.length>0">
      <div v-for="item in list" :key="item.order_num">
        <!-- 待抢单 -->
        <div class="item bg-f mb10" v-if="status==1">
          <div class="border-bottom span-gray p15 fsz-24">{{$t('supply.dingdanbianhao')}}: {{item.order_num}}</div>
          <div class="px15">
            <div class="i-flex i-aic">
              <span class="iconfont icon-qu fsz-38" style="color:#2082f5;"></span>
              <div class="i-flex-item mx10 fsz-26" style="white-space:pre-wrap">{{item.shop_address}}</div>
            </div>
            <div class="i-flex i-aic">
              <span class="iconfont icon-song fsz-38 span-gray"></span>
              <div class="addr i-flex-item mx10 fsz-26" style="white-space:pre-wrap">{{item.member_address}}</div>
            </div>
          </div>
          <div class="user border-bottom p15 fsz-26">
            <div class="weight">{{$t('supply.shouhuoren')}}：{{item.member_contact}} {{$t('supply.shouhuorendianhua')}}：{{item.member_telephone}}</div>
            <div class="weight">{{$t('supply.qiwangpeisongshijian')}}：{{item.order_delivery_time}}</div>
            <div class="mt5 red">{{$t('supply.peisongjuli')}}{{item.distance}}{{$t('supply.gongli')}} , {{$t('supply.peisongfei')}}{{item.shipping_money}}{{$t('supply.yuan')}}</div>
            <div class="mt5 red" v-if="item.supply_memo != ''">{{$t('supply.beizhu')}}：{{item.supply_memo}}</div>
          </div>
          <div class="footer i-flex jcontent-sa py10">
            <div class="btn" @click="cancel" :data-orderid="item.id">{{$t('supply.quxiaodingdan')}}</div>
          </div>
        </div>
        <!-- 待取货/配送中/待配送 -->
        <div class="item bg-f mb10" v-if="status==2||status==3||status==4">
          <div class="border-bottom span-gray p15 fsz-24">{{$t('supply.dingdanbianhao')}}: {{item.order_num}}</div>
          <div class="px15">
            <div class="i-flex i-aic">
              <span class="iconfont icon-qu fsz-38" style="color:#2082f5;"></span>
              <div class="i-flex-item mx10 fsz-26" style="white-space:pre-wrap">{{item.shop_address}}</div>
            </div>
            <div class="i-flex i-aic">
              <span class="iconfont icon-song fsz-38 span-gray"></span>
              <div class="addr i-flex-item mx10 fsz-26" style="white-space:pre-wrap">{{item.member_address}}</div>
            </div>
          </div>
          <div class="user border-bottom p15 fsz-26">
            <div class="weight">{{$t('supply.shouhuoren')}}：{{item.member_contact}} {{$t('supply.shouhuorendianhua')}}：{{item.member_telephone}}</div>
            <div class="weight">{{$t('supply.qiwangpeisongshijian')}}：{{item.order_delivery_time}}</div>
            <div class="weight">{{$t('supply.peisongyuan')}}：{{item.username}} {{$t('supply.peisongyuandianhua')}}：{{item.mobile}}</div>
            <div class="mt5 red">{{$t('supply.peisongjuli')}}{{item.distance}}{{$t('supply.gongli')}} , {{$t('supply.peisongfei')}}{{item.shipping_money}}{{$t('supply.yuan')}}</div>
            <div class="mt5 red" v-if="item.supply_memo != ''">{{$t('supply.beizhu')}}：{{item.supply_memo}}</div>
          </div>
        </div>
      </div>
      <i-load-more iClass="loadMore" :loading="loadMore" :tip="loadspan" v-if="!noMore"></i-load-more>
    </div>
    <i-empty class="empty" v-if="noData">{{$t('supply.zanwudingdan')}}</i-empty>
  </div>
</template>

<script>
  import GlobalMixin from '../../mixin/globalMixin.js';
  import status from '../../utils/index.js'
  import util from '../../utils/index.js'
  var app,wx
  export default {
    mixins: [GlobalMixin],
    name:'supply-listOrderdistributionOrder',
    data() {
      return {
        tabs: [
          {
            id: 1,
            name: this.$t('supply.daiqiangdan')
          },
          {
            id: 2,
            name: this.$t('supply.daiquhuo')
          },
          {
            id: 3,
            name: this.$t('supply.peisongzhong')
          },
          {
            id: 4,
            name: this.$t('supply.yisongda')
          }
        ],
        status: 1,
        list: [],
        loadText: this.$t('supply.jiazaizhong'),
        noData: 0,
        loadMore: true,
        page: 1
      }
    },
    created: function() {
      wx = this.$wx
      app = this.$app
      var that = this;
      wx.setNavigationBarTitle({
        title: that.$t('supply.chakansonghuodan'),
        showBack: true
      })
    },
    mounted: function() {
      const o = this.$route.query || {};
      this.onLoad(o)
    },
    methods: {
      onLoad: function (options) {
        let status = options.status || 1;
        this.status = status;
        this.initFn();
      },

      changeTabs: function (e) {
        let that = this;
        let status = e.currentTarget.dataset.type || 0;
        this.page = 1;
        this.status = status;
        this.list = [];
        this.showEmpty = false;
        this.loadMore = true;
        that.initFn();
      },

      initFn: function () {
        this.page = 1;
        this.list = [];
        this.loadText = this.$t('supply.jiazaizhong');
        this.noData = 0;
        this.loadMore = true;
        this.getData();
      },

      getData: function () {
        let that = this;
        let token = wx.getStorageSync('token');
        let type = this.status;

        wx.showLoading();
        app.util.request({
          url: 'entry/wxapp/index',
          data: {
            controller: 'supply.get_localtown_order',
            token,
            type,
            page: that.page,
          },
          dataType: 'json',
          success: function (res) {
            if (res.code == 0) {
              let list = res.data;
              if (list.length == 0) {
                if (that.page == 1) {
                  that.noData = 1;
                } else {
                  that.loadMore = false;
                  that.noMore = false;
                  that.loadText = that.$t('supply.meiyougengduojilule');
                }
              }
              for(var i = 0; i < list.length; i++) {
                var shop_address_array = list[i].shop_address.split("#");
                list[i].shop_address = shop_address_array[0] + "\n#" + shop_address_array[1];
                var member_address_array = list[i].member_address.split("#");
                list[i].member_address = member_address_array[0] + "\n#" + member_address_array[1];
              }
              if (list.length < 10) that.noMore = true;
              let oldList = that.list;
              list = oldList.concat(list);
              that.page++;
              that.list = list;
            } else if (res.code == 2) {
              that.loadMore = false;
              that.noMore = false;
              that.loadText = that.$t('supply.meiyougengduojilule');
              that.noData = 1;
            } else {
              wx.showToast({
                title: res.msg || that.$t('supply.qingqiuchucuo'),
                icon: 'none'
              })
              wx.navigateTo({
                url: '/ulink_comshop/pages/user/me',
              })
            }
            wx.hideLoading();
          }
        })
      },

      cancel: function (e) {
        var that = this;
        wx.showModal({
          title: that.$t('supply.tishi'),
          content: that.$t('supply.quedingyaoquxiaoma'),
          success: function (sm) {
            if (sm.confirm) {
              let id = e.currentTarget.dataset.orderid;
              if (!id) {
                wx.showToast({
                  title: that.$t('supply.dingdanIDcuowu'),
                  icon: 'none'
                })
                return;
              }
              let token = wx.getStorageSync('token');
              app.util.request({
                url: 'entry/wxapp/index',
                data: {
                  controller: 'supply.cancel_localtown_order',
                  token,
                  id
                },
                dataType: 'json',
                method: 'post',
                success: function (res) {
                  if (res.code == 0) {
                    wx.showToast({
                      title: that.$t('supply.quxiaochenggong'),
                      icon: 'none'
                    })
                    wx.navigateTo({
                      url: '/ulink_comshop/moduleB/supply/listOrderdistributionOrder',
                    })
                  } else if (res.code == 2) {
                    wx.showToast({
                      title: that.$t('supply.quxiaoshibai'),
                      icon: 'none'
                    })
                  }
                }
              })
            }
          }
        })
      }

    }
  }
</script>

<style scoped>
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
  box-shadow: 0 0.4vw 0.8vw 0 rgba(255, 255, 255, 0.25);
}

.nav-bar .nav-bar-item {
  position: relative;
  word-break: keep-all;
  font-size: 2.8vw;
  font-weight: 500;
  color: #666;
  padding: 2vw 0;
}

.current {
  border-bottom: 3px solid #FED206;
}

.nav-bar-content {
  margin-top: 49px;
  padding-bottom: 3vw;
}

.footer .btn {
  background: #FED206;
  padding: 1.2vw 0;
  span-align: center;
  border-radius: 1vw;
  color: #000;
  flex: 1;
  margin: 0 3vw;
}

.goods .img {
  width: 12vw;
  height: 12vw;
  margin-right: 1vw;
}

.bg-f {
  background-color: #fff;
}

.mb10 {
  margin-bottom: 2vw;
}

.border-bottom {
  position: relative;
}

.border-bottom::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  border-bottom: 1px solid #e5e5e5;
  transform-origin: 0 0;
  transform: scaleY(0.5);
}

.p15 {
  padding: 3vw;
}

.fsz-24 {
  font-size: 2.4vw;
}

.px15 {
  padding-left: 3vw;
  padding-right: 3vw;
}

.i-flex {
  display: flex;
}

.i-aic {
  align-items: center!important;
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-qu:before {
  content: "\e67d";
}

.icon-song:before {
  content: "\e67e";
}

.fsz-38 {
  font-size: 3.8vw;
}

.i-flex-item {
  flex: 1;
}

.mx10 {
  margin-left: 2vw;
  margin-right: 2vw;
}

.fsz-26 {
  font-size: 2.6vw;
}

.weight {
  font-weight: bold;
}

.mt5 {
  margin-top: 1vw;
}

.red {
  color: #ff5344;
}

.jcontent-sa {
  justify-content: space-around;
}

.py10 {
  padding-top: 2vw!important;
  padding-bottom: 2vw!important;
}

.empty {
  position: absolute;
  top: 24vw;
  left: 4vw;
}
</style>