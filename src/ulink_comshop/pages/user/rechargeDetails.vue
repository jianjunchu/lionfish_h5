<template>
    <div class='charge-box'>
      <div class="noDistributionList" :style="{'height':containerHeight+'px'}" v-if="showData==0">
        <img class="noDistributionListImg" src="@/assets/images/noData.png"/>
        <div class="noDistributionListTit">暂无任何明细记录</div>
      </div>
      <van-list class="list"v-if="showData===1" @load="getData">
        <i-card>
          <div slot="content">
            <div class="listData" v-for="(item,index) in list" :key="key">
              <div class="list-tit">
                <span class="tit">{{remark[item.state]}} {{item.state==3 || item.state==8?'-':'+'}}{{item.money}}<span v-if="item.give_money >0">(送：{{item.give_money}})</span></span>
                <!-- <text class="num {{item.state==3?'num2':''}}">{{item.money}}</text> -->
                <span class="num yue">余额:{{item.current_yuer}}</span>
              </div>
              <div class="list-orderNo"v-if="item.state==3||item.state==4||item.state==6">{{item.trans_id}}</div>
              <div class="list-time">{{item.charge_time}}</div>
            </div>
          </div>
        </i-card>
      </van-list>
    </div>
</template>

<script>
  import util from '../../utils/index.js';
  var app,wx

  export default {
    name: 'rechargeDetails',
    data() {
      return{
        page: 1,
        no_data: 0,
        list: [],
        showData: 1,
        loadText: '加载中',
        remark: [ "", "前台充值", "", "余额支付", "订单退款", "后台充值", "商品退款", "", "后台扣除", "分销提现至余额", "团长提现至余额", "拼团佣金提现至余额","充值待确认" ]
      }
    },
    created:function() {
      app = this.$getApp();
      wx = this.$wx;
      wx.setNavigationBarTitle({
        title: 'Recharge Details',
        showLogo: false,
        showMore: false,
        showBack: true
      })
      this.onLoad();
    },
    mounted: function() {
      //this.onShow()
    },
    methods: {
      /**
       * 生命周期函数--监听页面加载
       */
      onLoad: function (options) {
        let that = this;
        util.check_login_new().then(function(e) {
          if(e){
            that.needAuth = !1
            //that.getData();
          }else{
            wx.redirectTo({
              url: '/ulink_comshop/pages/user/me',
            })
          }
        })

      },

      /**
       * 授权成功回调
       */
      authSuccess: function () {
        wx.reLaunch({
          url: '/ulink_comshop/pages/user/rechargeDetails',
        })
      },

      getData: function(){
        var token = wx.getStorageSync('token');
        let that = this;
        wx.showLoading();
        this.isHideLoadMore = false ;
        app.util.request({
          'url': 'entry/wxapp/index',
          'data': {
            controller: 'user.get_user_charge_flow',
            token: token,
            page: that.page
          },
          dataType: 'json',
          success: function (res) {
            wx.hideLoading();
            if(res.code==0){
              var list = that.list;
              list = list.concat(res.data);
              //that.setData({ list, isHideLoadMore: true })
              that.list = list;
              that.isHideLoadMore = true;
              that.page++;

            } else if (res.code == 1) {
              if (that.list.length == 0 && that.page == 1) that.showData = 0;
              that.no_data = 1;
              //that.setData({ isHideLoadMore: true })
              that.isHideLoadMore = true;
              return false;
            } else if (res.code == 2) {

              that.is_login = false;
              //that.setData({ is_login: false })
            }
          },
          fail: (error)=>{
            console.log(error)
            wx.showLoading();
          }
        })
      },

      /**
       * 页面上拉触底事件的处理函数
       */
      onReachBottom: function () {
        if (this.no_data == 1) return false;
        this.page += 1;
        this.getData();
        /*this.setData({
          isHideLoadMore: false
        })*/

        this.isHideLoadMore = false;
      }
    }
  }
</script>

<style scoped>
  .charge-box {
    padding-top: 6vw;
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

  .searchData {
    padding: 3vw 2vw;
    border-top: 0.1vw solid #efefef;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .searchData .choose-day {
    padding: 0.4vw 2vw 0.4vw 3vw;
    background: #fff;
    border-radius: 2.4vw;
    font-size: 2.8vw;
    color: #444;
    display: flex;
    align-items: center;
  }

  .searchData .choose-day .arrow {
    width: 0vw;
    height: 0vw;
    font-size: 0;
    line-height: 0;
    overflow: hidden;
    margin-left: 1.4vw;
    margin-top: 1vw;
    border-width: 0.8vw;
    border-style: solid dashed dashed dashed;
    border-color: #444 transparent transparent transparent;
  }

  .searchData .getData {
    font-size: 2.8vw;
    color: #aaa;
  }

  .searchData .getData text {
    margin-right: 3vw;
  }

  .list {
    padding: 2vw 2vw;
  }

  .list .listData {
    padding: 3vw;
    border-bottom: 0.1vw solid #eee;
  }

  .list .listData:last-child {
    border: none;
  }

  .list .listData .list-tit {
    line-height: 2.8vw;
    margin-bottom: 2.4vw;
    display: flex;
    justify-content: space-between;
  }

  .list .listData .list-tit .tit {
    font-size: 3vw;
    color: #444;
  }

  .list .listData .list-tit .num {
    font-size: 3.2vw;
    color: #ff5344;
    font-weight: bold;
  }

  .list .listData .list-tit .num.yue {
    color: #666;
    font-weight: normal;
    font-size: 3vw;
  }

  .list .listData .list-tit .num2 {
    color: #999;
  }

  .list .listData .list-orderNo {
    font-size: 2.6vw;
    color: #444;
    margin-bottom: 1.6vw;
  }

  .list .listData .list-time {
    font-size: 2.6vw;
    color: #aaa;
    line-height: 2.2vw;
  }

</style>
