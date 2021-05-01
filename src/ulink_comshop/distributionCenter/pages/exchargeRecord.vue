<template>
  <div class='wrap'>
    <div v-if="!noData">
      <div class='title'>
        <div class='time'>申请时间</div>
        <div class='status'>状态</div>
        <div class='money'>金额(元)</div>
      </div>
      <div class='list'>
        <div class='list-item' v-for="(item,index) in list" :key="item.id">
          <div class='time'>{{item.addtime}}</div>
          <div class='status'>{{state[item.state]}}</div>
          <div class='money'>{{item.money}}</div>
        </div>
      </div>
    </div>
    <div class="noDistributionList" v-else>
      <img class="noDistributionListImg" src="@/assets/images/noData.png"/>
      <div class="noDistributionListTit">暂无任何明细记录</div>
    </div> 
    <i-load-more iClass="loadMore" :loading="loadMore" :tip="loadText" v-if="loadMore"></i-load-more>
  </div>
</template>

<script>
  import GlobalMixin from '../../mixin/globalMixin.js';
  import status from '../../utils/index.js'
  import util from '../../utils/index.js'
  var app,wx
  export default {
    mixins: [GlobalMixin],
    name:'distributionCenter-exchargeRecords',
    data() {
      return {
        list: [],
        loadText: this.$t('distributionCenter.jiazaizhong'),
        loadMore: false,
        noData: false,
        state: [this.$t('distributionCenter.tixianzhong'), this.$t('distributionCenter.tixianchenggong'), this.$t('distributionCenter.tixianshibai')],
        page: 1,
        noMore: false,
      }
    },
    created: function() {
      wx = this.$wx
      app = this.$app
      var that = this;
      wx.setNavigationBarTitle({
        title: that.$t('distributionCenter.tixianjilu'),
        showBack: true
      })
      that.onLoad();
    },
    methods: {
      onLoad: function(options) {
        this.getData();
      },
      authSuccess: function() {
        let that = this;
        this.needAuth = false;
        that.getData();
      },

      getData: function() {
        wx.showLoading();
        var token = wx.getStorageSync('token');
        let that = this;
        app.util.request({
          url: 'entry/wxapp/user',
          data: {
            controller: 'distribution.tixian_record',
            token: token,
            page: that.page
          },
          dataType: 'json',
          success: function (res) {
            wx.hideLoading();
            if (res.code == 0) {
              let list = res.data;
              let oldList = that.list;
              list = oldList.concat(list);
              that.page++;
              that.list = list;
            } else {
              // 无数据
              if (that.page == 1) that.noData = true;
              that.noMore = true;
              that.loadMore = false;
            }
          }
        })
      },

      /**
       * 生命周期函数--监听页面显示
       */
      onShow: function() {
        let that = this;
        util.check_login_new().then((res) => {
          if (!res) {
            wx.showModal({
              title: that.$t('distributionCenter.tishi'),
              content: that.$t('distributionCenter.ninhaiweidenglu'),
              showCancel: false,
              success(res) {
                if (res.confirm) {
                  wx.redirectTo({
                    url: '/ulink_comshop/pages/user/me',
                  })
                }
              }
            })
          }
        })
      },
      onReachBottom: function() {
        this.noMore || (this.loadMore = true, this.getData());
      }
    }
  }
</script>

<style scoped>

.title {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  background-color: #fff;
  color: #333;
  line-height: 8vw;
  font-size: 2.8vw;
  text-align: center;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, .3);
  font-weight: bold;
}

.time {
  flex: 3;
}

.status {
  flex: 1;
}

.money {
  flex: 2;
}

.list {
  padding-top: 8vw;
  text-align: center;
  background-color: #fff;
  font-size: 2.4vw;
}

.list-item {
  position: relative;
  display: flex;
  align-items: center;
  line-height: 7.6vw;
  border-bottom: 0.1vw solid #efefef;
}

.noDistributionList {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 20vw;
}

.noDistributionList .noDistributionListImg {
  width: 21.8vw;
  height: 21.8vw;
  margin-bottom: 3.2vw;
}

.noDistributionList .noDistributionListTit {
  font-size: 3vw;
  color: #666;
  line-height: 3vw;
}
</style>
