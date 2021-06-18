<template>
  <div>
    <div class='wrap'>
      <div class="card" v-if="list.length" v-for="(item,idx) in list">
        <div class="supply">
          <div class="supply-left">
            <div class="logo">
              <img v-if="item.image" :src="item.image"/>
            </div>
          </div>
          <div class="supply-center">
            <div class="info">
              <div class="name">{{item.prize_name}}</div>
              
              <div class="product"><span>{{item.addtime}}</span></div>
            </div>
          </div>
          <div class="supply-right">
            <div @click="receive" :data-id="item.id" class="distance" style="color:red" v-if="item.receive == 0">未领取</div>
            <div class="distance" v-if="item.receive == 1">已领取</div>
          </div>
        </div>
        
      </div>
      <i-empty v-if="list.length==0">暂无{{supply_diy_name}}~</i-empty>
    </div>

    <i-new-auth @authSuccess="authSuccess" @cancel="authModal" :needAuth="needAuth&&showAuthModal" needPosition="false"></i-new-auth>
  </div>
</template>

<script>
  import GlobalMixin from '../../mixin/globalMixin.js';
  import status from '../../utils/index.js'
  import util from '../../utils/index.js'
  var app,wx
  export default {
    mixins: [GlobalMixin],
    name:'record-list',
    data() {
      return {
        id:'',
        list: [],
        hint:''
      }
    },
    created: function() {
      wx = this.$wx
      app = this.$app
      const t = this.$route.query
      this.onLoad(t)
      wx.setNavigationBarTitle({
        title: '中奖记录',
        showBack: true
      })
    },
    mounted: function() {
      this.onShow()
    },
    methods: {
       onLoad: function (options) {
        console.log(options);
        let id = options.id || 0;
        this.id = id;
        wx.showLoading({ title: '加载中' });
        this.getData();
      },

      /**
       * 生命周期函数--监听页面初次渲染完成
       */
      onReady: function () {

      },

      getData:function(){
        let that = this;
        let lottery_id = this.id
        let token = wx.getStorageSync('token');
        app.util.request({
          'url': 'entry/wxapp/index',
          'data': {
            controller: 'lottery.get_lottery_record_list',
            lottery_id,
            token
          },
          dataType: 'json',
          success: function (res) {
            wx.hideLoading();
            if (res.code == 0) {
              let hint = res.hint;
              var list = res.data;
              that.list = list;
              that.hint = hint;
            }
          }
        })
      },

      receive:function(e){
        let id = e.currentTarget.dataset.id || 0;
        let hint = this.hint;
        let that = this;
        id && wx.showModal({
          title:'提示',
          content:hint,
          success:function(res){
            console.log(res)
            if(res.confirm){
              that.receive_do(id);


            }else {
              console.log('用户点击了取消')
            }
          }
        })
      },

      receive_do:function(record_id){
        let that = this;
        let token = wx.getStorageSync('token');
        app.util.request({
          'url': 'entry/wxapp/index',
          'data': {
            controller: 'lottery.receive_do',
            record_id,
            token
          },
          dataType: 'json',
          success: function (res) {
            wx.hideLoading();
            if (res.code == 0) {
              that.getData()
            }
          }
        })
      },

      /**
       * 生命周期函数--监听页面显示
       */
      onShow: function () {
        var that = this;
        util.check_login_new().then((res) => {
          if (res) {
            that.needAuth = false;
          } else {
            that.needAuth = true;
          }
        })
      },
      authModal: function () {
        if (this.needAuth) {
          this.showAuthModal = !this.showAuthModal
          return false;
        }
        return true;
      },
    /**
       * 授权成功回调
       */
      authSuccess: function () {
        let that = this;
        this.needAuth = false;
        that.getData();
      },
      /**
       * 生命周期函数--监听页面隐藏
       */
      onHide: function () {

      },

      /**
       * 生命周期函数--监听页面卸载
       */
      onUnload: function () {

      },

      /**
       * 页面相关事件处理函数--监听用户下拉动作
       */
      onPullDownRefresh: function () {

      },

      /**
       * 页面上拉触底事件的处理函数
       */
      onReachBottom: function () {

      },

      /**
       * 用户点击右上角分享
       */
      onShareAppMessage: function () {

      }
    }
  }
</script>
<style>
.card {
  background-color: #fff;
  margin: 20rpx auto;
  width: 95%;
  height: 200rpx;
  border-radius: 20rpx;
  box-shadow: 0 0 40rpx rgba(0, 0, 0, 0.1);
}
.supply {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.supply-left {
  height: 100rpx;
  width: 15%;
  margin-left: 5%;
}

.logo {
  height: 100rpx;
  width: 100rpx;
  margin-top: 10%;
}

.logo image {
  width: 100rpx;
  height: 100rpx;
}

.supply-center {
  height: 180rpx;
  width: 80%;
  margin-left: 5%;
}

.info {
  height: 180rpx;
  width: 90%;
  margin-top: 10%;
}

.name {
  height: 40rpx;
  font-size: 32rpx;
  line-height: 32rpx;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: 10rpx;
}

.stars {
  height: 30rpx;
  margin-top: 10rpx;
}

.star {
  float: left;
}

.star image {
  height: 30rpx;
  width: 30rpx;
}

.score {
  font-size: 22rpx;
  line-height: 30rpx;
  color: #999;
  float: left;
  margin-left: 20rpx;
}

.product {
  height: 90rpx;
  width: 100%;
  position: relative;
  margin-top: 10rpx;
}

.product text {
  position: absolute;
  font-size: 22rpx;
  line-height: 28rpx;
  color: #999;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-all;
}

.supply-right {
  height: 200rpx;
  width: 25%;
}

.distance {
  height: 30rpx;
  font-size: 22rpx;
  line-height: 22rpx;
  color: #999;
  margin-top: 85rpx;
  text-align: center;
}

.goods {
  height: 260rpx;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.good {
  height: 220rpx;
  width: 30%;
  margin: 20rpx 1.5%;
  font-size: 22rpx;
  line-height: 40rpx;
  border: 2rpx solid #ff0000;
  border-radius: 20rpx;
}

.good .skuImage {
  height: 100%;
  width: 100%;
}

.good .skuImage image {
  height: 100%;
  width: 100%;
  margin: 0 auto;
  border-radius: 20rpx;
}

.actPrice {
  display: inline-block;
  width: 50%;
  height: 40rpx;
  position: relative;
  top: -40rpx;
  color: #ffffff;
  border-radius: 0 0 0 20rpx;
  background-color: rgba(0,0,0,0.5);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;
}

.spuName {
  display: inline-block;
  width: 50%;
  height: 40rpx;
  position: relative;
  top: -40rpx;
  color: #ffffff;
  border-radius: 0 0 20rpx 0;
  background-color: #ff0000;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.addSupply {
  position: fixed;
  right: 30rpx;
  top: 150rpx;
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1;
  font-size: 24rpx;
  background: linear-gradient(45deg, #fdd225 0%, #feb600 100%);
  color: #000;
  z-index: 100;
}

.addSupply .img {
  width: 54rpx;
  height: 54rpx;
}

</style>
