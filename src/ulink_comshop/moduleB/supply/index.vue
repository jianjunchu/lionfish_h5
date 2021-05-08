<template>
<div>
  <div class="groupCenter pb100">
    <div class="basicInform">
      <div class="user-avatar">
        <img class="userAvatarUrl" :src="supply_info.logo"/>
      </div>
      <div class="userInfo">
        <div class="user-name">
          <span>{{supply_info.shopname}}</span>
          <div @click="goEdit" class="edit-name">
              <span class="iconfont icon-edit"></span>
              <span>{{$t('supply.bianji')}}</span>
            </div>
        </div>
      </div>
    </div>
    <div class="distributionCon">
      <div class="distribution mx10">
        <div class="myDistribution">
          <span>{{$t('supply.xiaoshoushuju')}}</span>
        </div>
        <div class="incomeCon">
          <div class="income">
            <span class="incomeTop">{{today_order_count}}</span>
            <span class="incomeBottom">{{$t('supply.jinridingdan')}}</span>
          </div>
          <div class="income">
            <span class="incomeTop">{{yestday_order_count}}</span>
            <span class="incomeBottom">{{$t('supply.zuoridingdan')}}</span>
          </div>
          <div class="income">
            <span class="incomeTop">{{total_order_count}}</span>
            <span class="incomeBottom">{{$t('supply.zongdingdanshu')}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="effectData">
      <div class="effect">
        <div class="incomeCon">
          <div class="income">
            <span class="incomeTop">{{wait_statement_money}}</span>
            <div class="incomeBottom">
              <span>{{$t('supply.daijiesuan')}}</span>
            </div>
          </div>
          <div class="income">
            <span class="incomeTop">{{has_statement_money}}</span>
            <div class="incomeBottom">
              <span>{{$t('supply.yijiesuan')}}</span>
            </div>
          </div>
          <div class="income">
            <span class="incomeTop">{{has_get_money}}</span>
            <div class="incomeBottom">
              <span>{{$t('supply.yitixian')}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="groupCenterCon mx10">
      <div class="order">
        <div class="myOrders" @click="goLink" data-link="/ulink_comshop/moduleB/supply/orderManage">
          <span>{{$t('supply.wodedingdan')}}</span>
          <div class="allGroupOrder">
            <span>{{$t('supply.chakanquanbu')}}</span>
            <img class="rightArrowImg" src="@/assets/images/rightArrowImg.png"/>
          </div>
        </div>
        <div class="orderTab">
          <div class="order_status" @click="goLink" data-link="/ulink_comshop/moduleB/supply/goodsManage?status=8">
            <span class="num" v-if="false">0</span>
            <img class="distributionIcon" src="@/assets/images/completeIcon-order.png"/>
            <span>{{$t('supply.kucunyujing')}}</span>
          </div>
          <div class="order_status" @click="goLink" data-link="/ulink_comshop/moduleB/supply/orderManage?status=1">
            <span class="num" v-if="wait_send_count!=0">{{wait_send_count}}</span>
            <img class="receiveIcon" src="@/assets/images/distributionIcon-order.png"/>
            <span>{{$t('supply.daifahuo')}}</span>
          </div>
          <div style="width:20%"></div>
          <!-- <div class="order_status">
            <span class="num" v-if="wait_refund_count!=0">{{wait_refund_count}}</span>
            <img class="needPickIcon" src="../../images/needPickIcon-order.png"/>
            <span>售后</span>
          </div> -->
        </div>
      </div>
    </div>

    <div class="groupCenterCon mx10">
      <div class="delivery">
        <div class="myDeliveries" @click="goLink" data-link="/ulink_comshop/moduleB/supply/listOrderdistributionOrder">
          <span>{{$t('supply.wodepeisong')}}</span>
          <div class="allGroupDelivery">
            <span>{{$t('supply.chakanquanbu')}}</span>
            <img class="rightArrowImg" src="@/assets/images/rightArrowImg.png"/>
          </div>
        </div>
        <div class="deliveryTab">
          <div @click="goLink" class="delivery_status" data-link="/ulink_comshop/moduleB/supply/addOrderdistributionOrder">
            <img class="distributionIcon" src="@/assets/images/completeIcon-order.png"/>
            <span>{{$t('supply.xiasonghuodan')}}</span>
          </div>
          <div @click="goLink" class="delivery_status" data-link="/ulink_comshop/moduleB/supply/listOrderdistributionOrder">
            <img class="receiveIcon" src="@/assets/images/distributionIcon-order.png"/>
            <span>{{$t('supply.chakansonghuodan')}}</span>
          </div>
          <div style="width:20%"></div>
          <!-- <div @click="goLink" class="delivery_status" data-link="/ulink_comshop/moduleB/supply/pickupPointList">
            <img class="receiveIcon" src="@/assets/images/location-border.png"/>
            <span>{{$t('supply.zhoubianjiyundian')}}</span>
          </div> -->
          <!-- <div @click="goLink" class="delivery_status" data-link="/ulink_comshop/moduleB/supply/delivery">
            <img class="distributionIcon" src="@/assets/images/icon_distribution.png"/>
            <span>{{$t('supply.tuanzhangpeisongdan')}}</span>
          </div> -->

        </div>
      </div>
    </div>
  </div>
  <i-supply-tabbar :data="currentIndex"/>
</div>
</template>

<script>
  import GlobalMixin from '../../mixin/globalMixin.js';
  import status from '../../utils/index.js'
  import util from '../../utils/index.js'
  import Tabbar from './tabbar'
  var app,wx
  export default {
    mixins: [GlobalMixin],
    name:'supply-index',
    components: {'i-supply-tabbar': Tabbar},
    data() {
      return {
        currentIndex: 2,
        isIpx: '',
        supply_info: {},
        wait_send_count: '',
        wait_refund_count: '',
        today_order_count: '',
        yestday_order_count: '',
        total_order_count: 0,
        wait_statement_money: 0,
        has_statement_money: '',
        has_get_money: ''
      }
    },
    created: function() {
      wx = this.$wx
      app = this.$app
      this.isIpx = app.globalData.isIpx
      this.onLoad()
    },
    methods: {
      onLoad: function(t) {
        this.getData();
        var that = this
        app.util.request({
          url: "entry/wxapp/index",
          data: {
            controller: "supply.get_apply_page"
          },
          dataType: "json",
          success: function(t) {
            var supply_diy_name = t.supply_diy_name || '供应商'
            wx.setNavigationBarTitle({
              title: supply_diy_name + that.$t("supply.guanlizhongxin"),
              showBack: true
            })
          }
        });
      },
      getData: function(){
        let that = this;
        const token = wx.getStorageSync('token');
        wx.showLoading();
        app.util.request({
          url: 'entry/wxapp/user',
          data: {
            controller: 'supplymobile.supplyindex_info',
            token
          },
          dataType: 'json',
          success: function(e) {
            wx.hideLoading();
            console.log(e)
            if (e.code == 0) {
              let {
                supply_info,
                wait_send_count,
                wait_refund_count,
                today_order_count,
                yestday_order_count,
                total_order_count,
                wait_statement_money,
                has_statement_money,
                has_get_money
              } = e.data;

              that.supply_info = supply_info;
              that.wait_send_count = wait_send_count;
              that.wait_refund_count = wait_refund_count;
              that.today_order_count = today_order_count;
              that.yestday_order_count = yestday_order_count;
              that.total_order_count = total_order_count;
              that.wait_statement_money = wait_statement_money;
              that.has_statement_money = has_statement_money;
              that.has_get_money = has_get_money;
            } else {
              wx.showModal({
                title: that.$t('supply.tishi'),
                content: e.msg,
                showCancel: false
              })
              wx.navigateTo({
                url: "/ulink_comshop/pages/user/me"
              });
            }
          }
        })
      },

      /**
       * 跳转编辑
       */
      goEdit: function () {
        wx.navigateTo({
          url: "/ulink_comshop/moduleB/supply/editSupply?id=" + this.supply_info.id
        });
      },

      goLink: function (event) {
        let link = event.currentTarget.dataset.link;
        wx.navigateTo({
          url: link
        })
      },
    }
  }
</script>
<style scoped>
.groupCenter {
  width: 100%;
  position: relative;
  overflow: hidden;
}

.groupCenter .basicInform {
  width: 100%;
  height: 22.6vw;
  background: #fe8464;
  display: flex;
  justify-content: flex-start;
}

.groupCenter .basicInform .user-avatar {
  width: 14.4vw;
  height: 14.4vw;
  margin: 1vw 3vw 0;
}

.groupCenter .basicInform .user-avatar .userAvatarUrl {
  border-radius: 50%;
  width: 14vw;
  height: 14vw;
  border: 0.2vw solid rgba(255, 255, 255, 0.24);
  overflow: hidden;
  display: flex;
}

.groupCenter .basicInform .userInfo {
  display: flex;
  flex-direction: column;
  padding-top: 1vw;
  width: 60vw;
}


.groupCenter .basicInform .userInfo .user-name {
  height: 4vw;
  line-height: 4vw;
  color: #fff;
  font-size: 4vw;
  margin-top: 4.5vw;
}

.groupCenter .basicInform .userInfo .user-name .edit-name {
  float: right;
  position: relative;
  right: -18vw;
  margin-top: 6vw;
  font-size: 2.4vw;
  line-height: 3.4vw;
  padding-right: 2vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.groupCenter .distributionCon {
  width: 100%;
  margin-top: -3vw;
  z-index: 9;
}

.groupCenter .distributionCon .distribution {
  background: #fff;
  border-radius: 1vw;
  padding: 2.4vw 0;
}

.groupCenter .distributionCon .distribution .myDistribution {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3vw;
  color: #333;
  font-weight: 500;
}

.groupCenter .distributionCon .distribution .incomeCon {
  margin-top: 3vw;
  display: flex;
  justify-content: flex-start;
}

.groupCenter .distributionCon .distribution .incomeCon .income {
  width: 33.3%;
  padding: 2vw 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.groupCenter .distributionCon .distribution .incomeCon .income:last-child {
  border: none;
}

.groupCenter .distributionCon .distribution .incomeCon .income .incomeTop {
  font-size: 3.6vw;
  color: #ff673f;
  margin-bottom: 1.6vw;
  font-weight: 500;
}

.groupCenter .distributionCon .distribution .incomeCon .income .incomeBottom {
  font-size: 2.4vw;
  color: #999;
}

.groupCenter .effectData {
  width: 100%;
  margin-top: 3vw;
}

.groupCenter .effectData .effect {
  background: #fff;
  border-radius: 1vw;
  padding: 2.4vw 0;
  margin: 0 2vw;
}

.groupCenter .effectData .effect .incomeCon {
  margin-top: 3vw;
  display: flex;
  justify-content: flex-start;
}

.groupCenter .effectData .effect .incomeCon .income {
  width: 33.3%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.groupCenter .effectData .effect .incomeCon .income:last-child {
  border: none;
}

.groupCenter .effectData .effect .incomeCon .income .incomeTop {
  font-size: 3.6vw;
  color: #333;
  margin-bottom: 1.6vw;
  font-weight: 500;
}

.groupCenter .effectData .effect .incomeCon .income .incomeBottom {
  font-size: 2.4vw;
  color: #999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.groupCenter .effectData .effect .incomeCon .income .incomeBottom .distributionInstrIcon {
  width: 2.8vw;
  height: 2.8vw;
  margin-right: 0.8vw;
}

.groupCenter .groupCenterCon {
  margin-top: 3vw;
}

.groupCenter .groupCenterCon .order .myOrders {
  height: 9vw;
  border-top-right-radius: 1vw;
  border-top-left-radius: 1vw;
  background: #fff;
  border-bottom: 0.01vw solid #e4e4e4;
  padding: 0 3vw;
  font-size: 3vw;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.groupCenter .groupCenterCon .order .myOrders .allGroupOrder {
  font-size: 2.6vw;
  color: #999;
}

.groupCenter .groupCenterCon .order .myOrders .allGroupOrder .rightArrowImg {
  width: 1.2vw;
  height: 2.2vw;
  color: #a7a7a7;
  margin-left: 1.4vw;
  margin-bottom: -0.2vw;
}

.groupCenter .groupCenterCon .order .orderTab {
  padding: 3vw 5.2vw;
  background-color: #fff;
  overflow: hidden;
  border-radius: 1vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.groupCenter .groupCenterCon .order .orderTab .order_status {
  position: relative;
  color: #58595b;
  font-size: 2.6vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.groupCenter .groupCenterCon .order .orderTab .order_status .num {
  width: 3.4vw;
  height: 3.4vw;
  background: #fff;
  font-size: 2.2vw;
  color: #fff;
  background: #ff6557;
  border-radius: 50%;
  position: absolute;
  right: 0;
  top: -1.4vw;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}

.groupCenter .groupCenterCon .order .orderTab .order_status .distributionIcon {
  width: 6vw;
  height: 5vw;
  margin-bottom: 1.6vw;
}

.groupCenter .groupCenterCon .order .orderTab .order_status .receiveIcon {
  margin-bottom: 1.6vw;
  width: 5.4vw;
  height: 5vw;
}

.groupCenter .groupCenterCon .order .orderTab .order_status .completeIcon {
  margin-bottom: 1.6vw;
  width: 5vw;
  height: 5vw;
}

.groupCenter .groupCenterCon .order .orderTab .order_status .needPickIcon {
  margin-bottom: 1.6vw;
  margin-left: 1vw;
  width: 5.8vw;
  height: 5.4vw;
}


.groupCenter .groupCenterCon .delivery .myDeliveries {
  height: 9vw;
  border-top-right-radius: 1vw;
  border-top-left-radius: 1vw;
  background: #fff;
  border-bottom: 0.01vw solid #e4e4e4;
  padding: 0 3vw;
  font-size: 3vw;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.groupCenter .groupCenterCon .delivery .myDeliveries .allGroupDelivery {
  font-size: 2.6vw;
  color: #999;
}

.groupCenter .groupCenterCon .delivery .myDeliveries .allGroupDelivery .rightArrowImg {
  width: 1.2vw;
  height: 2.2vw;
  color: #a7a7a7;
  margin-left: 1.4vw;
  margin-bottom: -0.2vw;
}

.groupCenter .groupCenterCon .delivery .deliveryTab {
  padding: 3vw 5.2vw;
  background-color: #fff;
  overflow: hidden;
  border-radius: 1vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.groupCenter .groupCenterCon .delivery .deliveryTab .delivery_status {
  position: relative;
  color: #58595b;
  font-size: 2.6vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 25%;
  text-align: center;
}

.groupCenter .groupCenterCon .delivery .deliveryTab .delivery_status .distributionIcon {
  width: 6vw;
  height: 5vw;
  margin-bottom: 1.6vw;
}

.groupCenter .groupCenterCon .delivery .deliveryTab .delivery_status .receiveIcon {
  margin-bottom: 1.6vw;
  width: 5.4vw;
  height: 5vw;
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 1.6vw;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon_peisongdandistribution:before {
  content: "\e63b";
}
</style>
