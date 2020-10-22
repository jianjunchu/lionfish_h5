<template>
  <div>
    <div class="cash-list">
      <div class="list-item"  v-for="(item,index) in order" :key="item.id" >
        <div class="title">
          <span>{{$t('wallet.tixiandanhao')}}（{{item.id}}）</span>
        </div>
        <div class="main">
          <div class="left">
            <div class="per">
              <span>{{$t('wallet.tixianzhuangtai')}}：</span>
              <span v-if="item.state==1">{{$t('wallet.chenggong')}}</span>
              <span v-if="item.state==0">{{$t('wallet.shehezhong')}}</span>
              <span v-if="item.state==2">{{$t('wallet.jujue')}}</span>
            </div>
            <div class="per">
              <span>{{$t('wallet.tixianjine')}}：</span>
              <span>￥{{item.money}}</span>
            </div>
            <div class="per">
              <span>{{$t('wallet.shenqingriqi')}}：</span>
              <span>{{item.addtime}}</span>
            </div>
          </div>
        </div>
      </div>
      <i-loadMore :tip="tip" v-if="!isHideLoadMore"></i-loadMore>
    </div>
  </div>


</template>

<script>
  import GlobalMixin from '../../mixin/globalMixin.js';
  import status from '../../utils/index.js'
  import util from '../../utils/index.js'
  export default {
    mixins: [GlobalMixin],
    name:'groupcenter-wallet',
    data() {
      return {
        loadText: "正在加载",
        LoadingComplete: !0,
        no_order: 0,
        page: 1,
        hide_tip: !0,
        order: [],
        tip: "正在加载"
      }
    },
    created: function() {
      this.$wx.setNavigationBarTitle({
        title: '',
        showLogo:false,
        showMore:false,
        showBack:true
      })
      this.onShow();
    },
    methods: {
      onLoad: function(t) {},
      onReady: function() {},
      onShow: function() {
          this.page= 1,
          this.no_order= 0,
          this.order= [];
        this.getData();
      },
      getData: function() {
        this.$wx.showLoading({
          title: "加载中...",
          mask: !0
        });
        this.isHideLoadMore= !0;

        this.no_order = 1;
        var e = this;
        var t = this.$wx.getStorageSync("token");
        this.$http({
            controller: "community.cashlist",
            token: t,
            page: e.page
          }).then(t=> {
              console.log(t,"cashlist");
            if (0 != t.code) {

              e.LoadingComplete= !0,
              e.isHideLoadMore= !0;
              this.$wx.hideLoading();
              return !1;
            }else {
              console.log(e.page);
              var a = e.order.concat(t.data);

              e.order= a,
              e.hide_tip= !0,
              e.no_order= 0;
              this.$wx.hideLoading();
            }
        });
      },
      onHide: function() {},
      onUnload: function() {},
      onPullDownRefresh: function() {},
      onReachBottom: function() {
        if (1 == this.no_order) return !1;
        this.page += 1;
        this.getData();
        this.isHideLoadMore= !1;
      },
      onShareAppMessage: function() {}
    }
  }
</script>
<style>
  @import "cashList.less";
</style>
