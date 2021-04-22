<template>
  <div class="container">
    <van-list v-model="isLoadData" :finished="noMore" ref="pullRefresh" @load="getData">
      <div class='wrap'>
        <div class="supply" @click='goDetails' v-if="supplyList.length" v-for="(supply,index) in supplyList" :key="supply.id" :data-id="supply.id">
          <div class="supply-left">
            <div class="logo">
              <img v-if="supply.logo" :src="supply.logo"/>
            </div>
          </div>
          <div class="supply-center">
            <div class="info">
              <div class="name">{{supply.storename || supply.shopname || '供应商'}}</div>
              <div class="stars">
                <div class="star" v-for="(star,index1) in supply.star" :key="index1"><img :src="star"/></div>
                <div class="score"><span v-if="supply.score" style="color: #f1a700;">{{supply.score}}</span><span v-else>{{$t('supply.zanwupingfen')}}</span></div>
              </div>
              <div class="product" v-if="supply.product"><span>{{supply.product}}</span></div>
            </div>
            <div class="goods">
              <div class="good" v-if="supply.goods_list.length" v-for="(good,index2) in supply.goods_list" :key="good.actId">
                <img src="@/assets/images/onsale.png"/><span class="actPrice"><span class="span">${{good.actPrice[0]}}</span>{{'.'+good.actPrice[1]}}</span><span class="marketPrice">${{good.marketPrice[0]+'.'+good.marketPrice[1]}}</span><span class="spuName">{{good.spuName}}</span>
              </div>
            </div>
          </div>
          <div class="supply-right">
            <div class="distance">{{supply.distance}}KM</div>
          </div>
        </div>
        <div class="none-rush-list" v-if="supplyList.length==0">
          <img class="img-block" src="@/assets/images/icon-index-empty.png"/>
          <div class="h1">{{$t('supply.zanwu')}}{{supply_diy_name}}~</div>
        </div>
      </div>
    </van-list>

    <div class="addSupply" @click="goSupplyRecruit">
      <img class="img" src="@/assets/images/icon-tab-supplier.png"/>
      <span>{{$t('supply.ruzhu')}}</span>
    </div>
    <i-new-auth @authSuccess="authSuccess" @cancel="authModal" :needAuth="needAuth&&showAuthModal"
        :needPosition="needPosition"></i-new-auth>
  </div>
</template>

<script>
  import GlobalMixin from '../../mixin/globalMixin.js';
  import status from '../../utils/index.js'
  import util from '../../utils/index.js'
  import axios from 'axios'
  var app,wx
  export default {
    mixins: [GlobalMixin],
    name:'supply-index',
    data() {
      return {
        page: 1,
        list: [],
        supplyList: [],
        noMore: false,
        supply_diy_name: "供应商",
        needAuth: false,
        isLoadData: true,
        showAuthModal: false,
        needPosition: true,
      }
    },
    watch:{
    },
    created: function() {
        wx = this.$wx
        app = this.$app

        this.onLoad()
        this.onShow()
    },
    methods: {
      /**
       * 生命周期函数--监听页面加载
       */
      onLoad: function (options) {
        this.getData();
      },

      /**
       * 授权成功回调
       */
      authSuccess: function () {
        let that = this;
        that.page = 1;
        that.needAuth = false;
        that.noMore = false;
        that.list = [];
        that.supplyList = [];
        that.getData();
      },

      authModal: function() {
        var that = this;
        if (that.needAuth) {
          wx.navigateTo({
            url: '/login'
          })
          return false;
        } else {
          return !that.needAuth;
        }
      },

      /**
       * 生命周期函数--监听页面显示
       */
      onShow: function () {
        let that = this;
        util.check_login_new().then((res) => {
          if (res) {
            that.needAuth = false;
          } else {
            that.needAuth = true;
            that.navBackUrl = '/ulink_comshop/pages/supply/index1';
          }
        })
      },

      getData: function () {
        var token = wx.getStorageSync('token');
        var that = this;
        that.isLoadData = !0;
        var cur_community = wx.getStorageSync('community');
        var latitude = wx.getStorageSync('latitude');
        var longitude = wx.getStorageSync('longitude');
        if (!latitude || !longitude) {
          latitude =  1.3677037;
          longitude = 103.8542143;
        }
        app.util.request({
          'url': 'entry/wxapp/index',
          'data': {
            controller: 'supply.get_list',
            token: token,
            page: that.page,
            head_id: cur_community.communityId,
            lat: latitude,
            lon: longitude
          },
          dataType: 'json',
          success: function (res) {
            that.isLoadData = !1, setTimeout(function() {
              wx.hideLoading()
            }, 1e3)
            if (that.page==1) {
              let supply_diy_name = res.data.supply_diy_name || '供应商';
              wx.setNavigationBarTitle({
                title: `${supply_diy_name}列表`,
                  showBack: true
              })
              that.supply_diy_name = supply_diy_name;
            }
            if (res.code == 0) {
              var data = res.data;
              for(var i=0;i<data.length;i++){
                // 评分显示
                if (data[i].score) {
                  data[i].star = [];
                  var on = parseInt(data[i].score);
                  for(var j=0;j<on;j++) {
                    data[i].star.push(require('@/assets/images/star-on.png'));
                  }
                  if (on < 5) {
                    var half = data[i].score - on;
                    if (half > 0) {
                      data[i].star.push(require('@/assets/images/star-half.png'));
                    }
                  }
                  if (data[i].star.length < 5) {
                    var length = data[i].star.length;
                    for(var j=0;j<5-length;j++) {
                      data[i].star.push(require('@/assets/images/star-off.png'));
                    }
                  }
                } else {
                  data[i].star = [require('@/assets/images/star-off.png'),require('@/assets/images/star-off.png'),require('@/assets/images/star-off.png'),require('@/assets/images/star-off.png'),require('@/assets/images/star-off.png')];
                }
                // 距离显示
                let distance = data[i].distance;
                if (distance) {
                  data[i].distance = (distance/1000).toFixed(1);
                }
                // 商品显示
                if (data[i].goods_list.length) {
                  if (data[i].goods_list.length > 2) {
                    var goods_list = [data[i].goods_list[0],data[i].goods_list[1]];
                    data[i].goods_list = goods_list;
                  }
                }
              }
              let oldList = that.supplyList;
              let supplyList = oldList.concat(data);
              that.supplyList = supplyList;
              var nextPage = that.page + 1;
              that.page = nextPage;
            } else {
              that.noMore = true;
            }
          }
        })
      },

      goDetails: function(e){
        let id = e.currentTarget.dataset.id || 0;
        id && wx.navigateTo({
          url: `/ulink_comshop/pages/supply/home?id=${id}`,
        })
      },

      /**
       * 页面相关事件处理函数--监听用户下拉动作
       */
      onPullDownRefresh: function () {
        let that = this;
        that.page = 1;
        that.noMore = false;
        that.list = [];
        that.supplyList = [];
        that.getData();
      },

      /**
       * 页面上拉触底事件的处理函数
       */
      onReachBottom: function () {
        this.noMore || (this.page++, this.getData());
      },

      goSupplyRecruit: function() {
        wx.navigateTo({
          url: '/ulink_comshop/pages/supply/recruit'
        })
      }
    }
  }
</script>
<style scoped>
.supply {
  background-color: #fff;
  margin: 2vw auto;
  width: 95%;
  height: 32vw;
  border-radius: 2vw;
  box-shadow: 0 0 4vw rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.supply-left {
  height: 30vw;
  width: 30%;
  margin-left: 5%;
}

.logo {
  height: 20vw;
  width: 20vw;
  margin-top: 10%;
}

.logo img {
  width: 20vw;
  height: 20vw;
  border-radius: 1vw;
}

.supply-center {
  height: 30vw;
  width: 45%;
  margin-left: 5%;
}

.info {
  height: 18vw;
  width: 90%;
  margin-top: 10%;
}

.name {
  height: 4vw;
  font-size: 3.2vw;
  line-height: 3.2vw;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: 1vw;
}

.stars {
  height: 3vw;
}

.star {
  float: left;
  height: 3vw;
}

.star img {
  height: 3vw;
  width: 3vw;
  display: block;
  margin: auto 0;
}

.score {
  font-size: 3vw;
  line-height: 3vw;
  color: #999;
  float: left;
  margin-left: 2vw;
}

.product {
  height: 9vw;
  width: 100%;
  position: relative;
  margin-top: 1vw;
}

.product span {
  position: absolute;
  font-size: 2.2vw;
  line-height: 3.5vw;
  color: #999;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-all;
}

.goods {
  height: 8vw;
  width: 100%;
}

.good {
  margin-bottom: 1vw;
  font-size: 1.8vw;
  line-height: 3vw;
}

.good img {
  height: 2.2vw;
  width: 2.2vw;
  vertical-align: middle;
}

.actPrice {
  color: #ff5344;
}

.marketPrice {
  margin-left: 1.5vw;
  font-size: 1.8vw;
  text-decoration: line-through;
  color: #999;
}

.spuName {
  margin-left: 1.5vw;
  display: inline-block;
  width: 40%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.supply-right {
  height: 30vw;
  width: 15%;
}

.distance {
  height: 3vw;
  font-size: 2.2vw;
  line-height: 2.2vw;
  color: #999;
  margin-top: 8.5vw;
}

.addSupply {
  position: fixed;
  right: 3vW;
  top: 15vw;
  width: 12vw;
  height: 12vw;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1;
  font-size: 2.4vw;
  background: linear-gradient(45deg, #fdd225 0%, #feb600 100%);
  color: #000;
  z-index: 100;
}

.addSupply .img {
  width: 5.4vw;
  height: 5.4vw;
}

.none-rush-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 14vw;
  padding-top: 14vw;
}

.none-rush-list .img-block {
  width: 24vw;
  height: 24vw;
  margin-bottom: 3vw;
}

.none-rush-list .h1 {
  font-size: 3.2vw;
  line-height: 3.2vw;
  color: #444;
  margin-bottom: 2vw;
}
</style>
