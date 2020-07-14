<template>
  <div>
    <div>
      <div class="nav-bar">
        <div class="nav-bar-inner">
          <div @click="switchTab" :class="['nav-bar-item', (currentTab==1?'current':'')]" data-type="1">
            <div class="nav-bar-item-inner">待确认收入</div>
          </div>
          <div @click="switchTab" :class="['nav-bar-item', (currentTab==2?'current':'')]" data-type="2">
            <div class="nav-bar-item-inner">可提现金额</div>
          </div>
        </div>
      </div>
      <div class="cash-list">
        <div class="list-item" v-for="(item,index) in order" :key="item.id" >
          <div class="title">
            <span>订单单号（{{item.order_num_alias}}）</span>
          </div>
          <div class="main">
            <div class="left">
              <div class="per">
                <span>订单标题：</span>
                <span>{{item.name}}</span>
              </div>
              <div class="per">
                <span>订单金额：</span>
                <span>${{item.total}}</span>
              </div>
              <div class="per">
                <span>佣金金额：</span>
                <span>${{item.money}}</span>
              </div>
              <div class="per">
                <span>下单日期：</span>
                <span>{{item.addtime}}</span>
              </div>
            </div>
          </div>
        </div>
        <i-loadMore :tip="tip" v-if="!isHideLoadMore"></i-loadMore>
      </div>
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
        currentTab: 1,
        no_order: 0,
        page: 1,
        hide_tip: !0,
        order: [],
        tip: "正在加载",
        chooseDate:''
      }
    },
    created: function() {
      this.$wx.setNavigationBarTitle({
        title: '',
        showLogo:false,
        showMore:false,
        showBack:true
      })
      this.onLoad();
    },
    methods: {
      onLoad: function() {
        var query = this.$route.query;
        var a = query.type;
        this.currentTab= a;
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
        var t = this.chooseDate;
        var token = this.$wx.getStorageSync("token");
        var a = this.currentTab;
        var o = 1;
        1 == a ? o = 1 : 2 == a && (o = 2);
        if (1==a) {
          o = 1;
        }else if(2==a){
          o = 2;
        }
        this.$http_post({
            controller: "community.headorderlist",
            token: token,
            page: e.page,
            order_status: o
          }).then(t=> {
            console.log(t,"headorderlist");

            if (0 != t.code) {
              e.isHideLoadMore= !0;
              this.$wx.hideLoading();
              return !1;
            }else{
              console.log(e.page);
              var a = e.order.concat(t.data);
              e.order=a,
              e.hide_tip= !0,
              e.no_order= 0;
              this.$wx.hideLoading();
            }
        });
      },
      onReady: function() {},
      onShow: function() {},
      switchTab: function(t) {
        var a = t.currentTarget.dataset.type || 1;
        this.currentTab= a,
        this.page= 1,
        this.order= [];
        this.getData();
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
  @import "detailsList.less";
</style>
