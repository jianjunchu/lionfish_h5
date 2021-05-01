<template>
  <div class='wrap'>
    <div class="zr">
      <div class='top_box'>
        <div class="i-flex i-flex-spb top_box_head">
          <div></div>
          <!-- <router-link to='/ulink_comshop/distributionCenter/pages/share' hover-class='none' class='tx-btn'>推荐二维码</router-link> -->
        </div>
        <div class='total'>
          <div class="total-title">{{$t('distributionCenter.ketixian')}}</div>
          <div class='total-money'>{{info.money}}
            <router-link to='/ulink_comshop/distributionCenter/pages/excharge' hover-class='none' class='qrcode'>{{$t('distributionCenter.tixian')}}</router-link>
          </div>
        </div>
        <div class='three'>
          <div class='three-item'>
            <div class='three-title'>{{$t('distributionCenter.dingdanshu')}}</div>
            <div class='three-money'>{{info.order_count}}</div>
          </div>
          <router-link hover-class='none' to='/ulink_comshop/distributionCenter/pages/member' class='three-item'>
            <div class='three-title'>
              {{$t('distributionCenter.fensishuliang')}} <span class="iconfont icon-youjiantou rightArrow"></span>
            </div>
            <div class='three-money'>{{info.member_count}}</div>
          </router-link>
        </div>
      </div>
    </div>
    <div class="distributionList">
      <div class="nav">
        <div @click="switchNav" :class="currentTab==index?'orderList_item on':'orderList_item'" :data-current="index" v-for="(item,index) in navList" :key="item.id">{{item.name}}</div>
      </div>
      <div class="list">
        <div class="noRecordCon" v-if="noData==1">
          <img class="noRecordImg" src="@/assets/images/noRecord.png"/>
          <div class="noRecord">{{$t('distributionCenter.meiyoujilu')}}</div>
        </div>
        <block wx:else>
          <div class='list-item' v-for="(item,index) in list" :key="item.id">
            <div class='item-head'>
              <div class='time'>{{$t('distributionCenter.dingdanbianhao')}}：{{item.order_num_alias}}</div>
              <div class='status'>{{stateArr[item.state]}}</div>
            </div>
            <div class="spu">
              <img :src='item.goods_images' class='i-class goodsImg' mode='widthFix'/>
              <div class="detail">
                <div class="spuName">
                  <span>{{item.name}}</span>
                </div>
                <div class="tips">
                  <span>${{item.price}}</span> x {{item.quantity}} {{item.option_str}}
                </div>
              </div>
            </div>
            <div class="line">
              <div>{{$t('distributionCenter.huiyuanmingcheng')}}</div>
              <div>{{item.uname}}</div>
            </div>
            <div class="line">
              <div>{{$t('distributionCenter.fensidengji')}}</div>
              <div>{{item.level}}</div>
            </div>
            <div class="line">
              <div>{{$t('distributionCenter.xiadanshijian')}}</div>
              <div>{{item.addtime}}</div>
            </div>
            <div class="line">
              <div>{{$t('distributionCenter.dingdanzhuangtai')}}</div>
              <div>{{item.status_name}}</div>
            </div>
            <div class="line" v-if="item.has_refund_quantity>0" @click="handleTipDialog">
              <div>{{$t('distributionCenter.yuguyongjinbianhua')}}<span class="iconfont icon-shuoming text-dark fsz-26 red" style="margin-left:1vw;"></span></div>
              <div>{{item.money}}</div>
            </div>
            <div class="line" v-else>
              <div>{{$t('distributionCenter.yuguyongjin')}}</div>
              <div>{{item.money}}</div>
            </div>
          </div>
        </block>
      </div>
      <i-load-more iClass="loadMore" :loading="loadMore" :tip="loadText" v-if="!noMore"></i-load-more>
    </div>

    <i-dialog :visible="showTipDialog" :text="$t('distributionCenter.shouyitishi')" :confirmText="$t('distributionCenter.zhidaole')" @confirm="handleTipDialog" @cancel="handleTipDialog" :showCancel="false" iClass="dialogText" iBtn="dialogBtn" />
  </div>

</template>
<script>
  import GlobalMixin from '../../mixin/globalMixin.js';
  import status from '../../utils/index.js'
  import util from '../../utils/index.js'
  var app,wx
  export default {
    mixins: [GlobalMixin],
    name:'distributionCenter-goodsDetails',
    data() {
      return {
        currentTab: 0,
        pageSize: 10,
        navList: [{
          name: this.$t('distributionCenter.quanbu'),
          status: "-1"
        }, {
          name: this.$t('distributionCenter.daijiesuan'),
          status: "0"
        }, {
          name: this.$t('distributionCenter.yijiesuan'),
          status: "1"
        }, {
          name: this.$t('distributionCenter.yishixiao'),
          status: "2"
        }],
        list: [],
        loadText: this.$t('distributionCenter.jiazaizhong'),
        info: {},
        noData: 0,
        loadMore: true,
        stateArr: [this.$t('distributionCenter.daijiesuan'), this.$t('distributionCenter.yijiesuan'), this.$t('distributionCenter.yishixiao')],
        page: 1
      }
    },
    created: function() {
      wx = this.$wx
      app = this.$app
      var that = this;
      wx.setNavigationBarTitle({
        title: that.$t('distributionCenter.tuiguangshouyi'),
        showBack: true
      })
      this.onLoad()
    },
    methods: {
      onLoad: function() {
        this.getInfo();
        this.getData();
      },

      getInfo: function () {
          wx.showLoading();
          var token = wx.getStorageSync('token');
          let that = this;
          app.util.request({
            url: 'entry/wxapp/user',
            data: {
              controller: 'distribution.get_commission_info',
              token: token
            },
            dataType: 'json',
            success: function (res) {
              wx.hideLoading();
              if (res.code == 0) {
                // Todo
                that.info = res.data;
              } else {
                wx.showModal({
                  title: that.$t('distributionCenter.tishi'),
                  content: res.msg,
                  showCancel: false,
                  success(res) {
                    if (res.confirm) {
                      console.log('用户点击确定')
                      wx.redirectTo({
                        url: '/ulink_comshop/pages/user/me',
                      })
                    }
                  }
                })
              }
            }
          })
        },

        getData: function(){
          let that = this;
          let token = wx.getStorageSync('token');
          let currentTab = this.currentTab;
          let state = this.navList[currentTab].status;

          wx.showLoading();
          app.util.request({
            'url': 'entry/wxapp/index',
            'data': {
              controller: 'distribution.listorder_list',
              token: token,
              state: state,
              page: that.page
            },
            dataType: 'json',
            success: function (res) {
              if (res.code == 0) {
                let h = {};
                let list = res.data;
                if (list.length < 6) that.noMore = true;
                let oldList = that.list;
                list = oldList.concat(list);
                that.page++;
                that.list = list;
              } else {
                // 无数据
                if (that.page == 1) that.noData = 1;
                that.loadMore = false;
                that.noMore = false;
                that.loadText = that.$t('distributionCenter.meiyougengduojilule');
              }
              wx.hideLoading();
            }
          })
        },

        getCurrentList: function () {
          if (!this.loadMore) return false;
          this.getData();
          this.isHideLoadMore = false;
        },

        onReachBottom: function () {
          this.getCurrentList();
        },

        bindChange: function (t) {
          this.page = 1;
          this.currentTab = t;
          this.list = [];
          this.noData = 0;
          this.loadMore = true;
          this.loadText = that.$t('distributionCenter.jiazaizhong');
          this.getData();
        },

        /**
         * 切换导航
         */
        switchNav: function (e) {
          const that = this;
          if (this.currentTab === 1 * e.target.dataset.current) return false;
          let currentTab = 1 * e.target.dataset.current;
          this.currentTab = currentTab;
          that.bindChange(currentTab)
        },

        handleTipDialog: function(){
          this.showTipDialog = !this.showTipDialog;
        }

    }
      
  }
</script>

<style scoped>
.zr {
  background: #fff;
  width: 100%;
  position: relative;
  overflow: hidden;
  padding-bottom: 3vw;
  margin-bottom: 2vw;
}

.top_box {
  color: #333;
  font-size: 2.4vw;
  line-height: 1;
}

.total {
  text-align: center;
  padding-bottom: 4vw;
}

.total-money {
  font-weight: bold;
  font-size: 5.8vw;
  margin-top: 1.5vw;
  padding-left: 8vw;
}

.three {
  display: flex;
  justify-content: center;
  align-items: center;
}

.three-item {
  position: relative;
  flex: 1;
  text-align: center;
}

.three-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 0.1vw;
  border-left: 0.1vw solid #cfcfcf;
}

.three-item:first-child::before {
  content: none;
}

.three-title {
  color: #999;
  font-size: 2.4vw;
}

.three-money {
  margin-top: 1.5vw;
  font-size: 2.8vw;
  font-weight: bold;
}

.rightArrowImg {
  width: 1.2vw;
  height: 2.2vw;
  margin-left: 0.8vw;
}

.qrcode {
  display: inline-block;
  width: 18vw;
  height: 7.5vw;
  font-size: 2.2vw;
  text-align: center;
  padding: 0.8vw 0;
  border-radius: 0.5vw;
  background: #ff5344;
  color: #fff;
  vertical-align: middle;
}

.nav {
  position: sticky;
  position: -webkit-sticky;
  top: 0;
  transition: top 0.3s;
  z-index: 10;
  background: #fff;
  height: 9.2vw;
  border-bottom: 0.2cw solid #f2f2f2;
  padding: 0 6vw;
  width: unset;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav .orderList_item {
  margin-bottom: 0.4vw;
  font-size: 2.8vw;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: #666;
  position: relative;
  height: 9.6vw;
  line-height: 9.6vw;
}

.nav .on {
  position: relative;
  color: #ff5344;
  border-bottom: 0.4vw solid #ff5344;
}

.nav .on::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  border-bottom: 0.2vw solid #ff5344;
}

.noRecordCon {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.noRecordCon .noRecordImg {
  width: 13.2vw;
  height: 13.8vw;
  margin-top: 30%;
}

.noRecordCon .noRefundImg {
  width: 21.8vw;
  height: 21.8vw;
  margin-top: 50%;
}

.noRecordCon .noRecord {
  padding-top: 3.2vw;
  font-size: 3vw;
  font-family: PingFangSC-Light;
  font-weight: 300;
  color: #666;
  line-height: 3vw;
}

.noRecordCon .goIndex {
  width: 16.4vw;
  height: 6vw;
  background: #ff3432;
  border-radius: 3vw;
  font-size: 2.8vw;
  color: #fff;
  margin-top: 3vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

.list-item {
  padding: 3vw;
  background-color: #fff;
  margin-bottom: 2vw;
  font-size: 2.6vw;
}

.item-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 0.1vw solid #ececec;
  padding-bottom: 2vw;
}

.item-head .status {
  color: #ff5344;
}

.list-item .line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 2;
}

.line-tit {
  color: #999;
}

.top_box_head {
  padding: 3vw;
}

.tx-btn {
  color: #ff5344;
}

.goodsInfo {
  padding: 0 !important;
}

.goodsInfo .identity {
  left: 0 !important;
}

.spu {
  padding: 3vw 3vw 2vw;
  display: flex;
  justify-content: flex-start;
}

.spu .goodsImg {
  width: 14vw;
  height: 14vw;
}

.spu .detail {
  margin-left: 2vw;
  font-size: 2.4vw;
  color: #aaa;
}

.spu .detail .spuName {
  color: #444;
  font-size: 2.8vw;
  font-weight: 500;
  overflow: hidden;
}

.spu .detail .tips {
  line-height: 1;
  width: 53vw;
  margin-top: 1.6vw;
  position: relative;
}

.spu .detail .tips .last {
  float: right;
}

.spu .detail .tips .price {
  color: #ff5344;
  font-size: 3.2vw;
}

.rightArrow {
  font-size: 2.4vw;
}

.dialogText {
  box-sizing: border-box;
  padding: 2vw;
  height: 14vw!important;
  text-align: justify;
}

.dialogBtn {
  font-size: 3vw!important;
  height: 6.8vw!important;
  line-height: 6.8vw!important;
}
</style>
