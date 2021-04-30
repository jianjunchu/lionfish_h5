<template>
  <div>
    <div class="search">
      <input :placeholder="$t('distributionCenter.nichenghuoshoujihao')" type="text" v-model="searchKey" confirm-type="done"/>
      <div class="search-icon">
        <span class="iconfont icon-sousuo1"></span>
      </div>
      <!-- <span @click="searchByKey">搜索</span>
      <span @click="cancel">取消</span> -->
    </div>
    <div class="list-header">
      <div>{{$t('distributionCenter.fensi')}}</div><div>{{$t('distributionCenter.guanzhushijian')}}</div>
    </div>
    <van-list v-model="isLoadData" :finished="noMore" ref="pullRefresh" @load="getData" class="list-content" :style="'height:'+containerHeight+'px'" v-if="order.length">
      <div class="list">
        <div class="list-item" v-for="(item,index) in order" :key="item.id">
          <div class="item-left">
            <i-img defaultImage="@/assets/images/placeholder-refund.png" height="36" isCircle="true" :loadImage="item.avatar" width="36"></i-img>
            <div class="text-overflow1" style="width:28vw">
              <span>{{item.username}}</span>
              <div class="level">{{levelName[item.child_level]}}</div>
            </div>
          </div>
          <div class="item-right">
            {{item.create_time}}
            <!-- <img class="iconfont icon-right-arrow rightArrowImg" src="@/assets/images/rightArrowImg.png"/> -->
          </div>
        </div>
      </div>
      <i-loadMore :tip="tip" v-if="!isHideLoadMore"></i-loadMore>
    </van-list>
    <div class="none-member" v-else>{{$t('distributionCenter.zanwufensi')}}</div>
  </div>
</template>

<script>
  import GlobalMixin from '../../mixin/globalMixin.js';
  import status from '../../utils/index.js'
  import util from '../../utils/index.js'
  var app,wx
  export default {
    mixins: [GlobalMixin],
    name:'distributionCenter-member',
    data() {
      return {
        queryData: {
          createTime: null,
          communityId: null,
          order: [],
          page: 1,
          pageSize: 20
        },
        searchKey: "",
        containerHeight: 0,
        showLoadMore: false,
        no_order: 0,
        page: 1,
        hide_tip: true,
        order: [],
        tip: this.$t('distributionCenter.jiazaizhong'),
        levelName: ['', this.$t('distributionCenter.yijifensi'), this.$t('distributionCenter.erjifensi'), this.$t('distributionCenter.sanjifensi')],
        isLoadData: true,
        noMore: false
      }
    },
    watch: {
      searchKey: {
        handler: function(newValue,oldValue) {
          this.order = [];
          this.no_order = 0;
          this.page = 1;
          this.queryData.page = 1;
          this.queryData.memberNickName = newValue;
          this.getData();
        }
      }
    }, 
    created: function() {
      wx = this.$wx
      app = this.$app
      var that = this;
      wx.setNavigationBarTitle({
        title: that.$t('distributionCenter.wodefensi'),
        showBack: true
      })
      that.onLoad();
      that.onShow();
    },
    methods: {
      onLoad: function (options) {
        var sysInfo = wx.getSystemInfoSync();
        this.containerHeight = sysInfo.windowHeight - Math.round(sysInfo.windowWidth / 375 * 125);
        this.page = 1;
        this.queryData.page = 1;
        this.queryData.communityId = app.globalData.disUserInfo.communityId;
        this.queryData.createTime = null;
        this.getData();
      },

      /**
       * 生命周期函数--监听页面显示
       */
      onShow: function () {
        var is_show_on = this.is_show_on;
        if (is_show_on > 0) {
          this.page = 1;
          this.queryData.page = 1;
          this.order = [];
          this.getData();
        } else {
          this.is_show_on = this.is_show_on + 1;
        }
      },

      /**
       * 获取数据
       */
      getData: function () {
        var that = this;
        wx.showLoading({
          title: that.$t('distributionCenter.jiazaizhong'),
          mask: true
        });
        that.isHideLoadMore = true;
        that.no_order = 1;
        that.isLoadData = !0;
        var token = wx.getStorageSync('token');
        app.util.request({
          'url': 'entry/wxapp/index',
          'data': {
            controller: 'distribution.get_member_fanslist',
            keyword: that.searchKey,
            token: token,
            page: that.page
          },
          dataType: 'json',
          success: function (res) {
            that.isLoadData = !1;
            if (res.code == 0) {
              let rushList = that.order.concat(res.data);
              that.order = rushList;
              that.hide_tip = true;
              that.no_order = 0;
              wx.hideLoading();
            } else {
              that.isHideLoadMore = true;
              that.noMore = true;
              wx.hideLoading();
              return false;
            }

          }
        })

      },

      /**
       * 取消
       */
      cancel: function () {
        this.page = 1;
        this.queryData.page = 1;
        this.searchKey = "";
        this.order = [];
        this.queryData.memberNickName = null;
        this.getData();
      },

      /**
       * 获取更多
       */
      getMore: function () {
        if (this.no_order == 1) return false;
        this.page += 1;
        this.queryData.page += 1;
        this.getData();
        this.isHideLoadMore = false;
      }
    }
  }
</script>

<style scoped>
.search {
  background: #fff;
  padding: 2vw 3vw;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  font-size: 2.8vw;
  font-family: PingFangSC-Regular;
  font-weight: 400;
}

.search .icon-search {
  position: absolute;
  left: 5.4vw;
}

.search input {
  flex: 1;
  padding-left: 6.8vw;
  /* width: 52vw; */
  height: 5.6cw;
  background: #f8f8f8;
  border-radius: 2.8vw;
  color: #999;
  box-sizing: border-box;
  line-height: 4vw;
}

.search span {
  color: #ff673f;
  margin-left: 2.8vw;
}

.date {
  padding: 0 3vw;
  background: #fff;
  height: 9vw;
  line-height: 9vw;
  font-size: 2.8vw;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: #9b9b9b;
}

.date .date-value {
  margin-left: 1.2vw;
  color: #ff673f;
}

.date .icon-date {
  height: 3.6vw;
  width: 3.6vw;
  float: right;
  margin: 0.6vw 0 0 0;
}

.date .icon-date img {
  height: 3.6vw;
  width: 3.6vw;
}

.date .icon-clear {
  height: 3.2vw;
  float: right;
  color: #ff673f;
  margin: 0 2.8vw 0 0;
  font-size: 2.4vw;
}

.list-content {
  width: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}

.list-header, .list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 3vw;
}

.list-header {
  height: 8.4vw;
}

.list-item {
  background: #fff;
  height: 11.6vw;
  margin-bottom: 0.2vw;
}

.list-item .item-left {
  display: flex;
  align-items: center;
}

.list-item .item-left span {
  margin-left: 1.2vw;
  font-size: 2.8vw;
  width: 40vw;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.list-item .item-left .phone {
  margin-left: 1.2vw;
  display: flex;
  align-items: center;
}

.list-item .item-left .icon-phone {
  width: 2.8vw;
  height: 3.2vw;
  margin-left: 1vw;
}

.list-item .item-right {
  height: 100%;
  display: flex;
  align-items: center;
  text-align: right;
}

.list-item .item-right .text {
  font-size: 2.6vw;
  margin-right: 1.8vw;
}

.list-item .item-right .rightArrowImg {
  width: 1.2vw;
  height: 2.2vw;
}

.list-item .level {
  margin-left: 5px;
  color: #999;
}

.navigator-hover {
  background-color: rgba(0, 0, 0, 0);
}

.none-member {
  text-align: center;
  background: #fff;
  height: 11.6vw;
  line-height: 11.6vw;
}

.search-icon {
  position: absolute;
  left: 10px;
  margin-right: 6px;
}

.search-icon .iconfont {
  font-size: 17px;
  padding-top: 5px;
}
</style>