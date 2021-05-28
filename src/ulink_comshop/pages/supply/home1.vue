<template>
  <div class="container">
    <van-list v-model="isLoadData" :finished="noMore" ref="pullRefresh" @load="getData">
      <div class="special">
        <img class='topic-img' :src="info.banner" v-if="info.banner"/>
        <div class="info">
          <div class="title">{{$t('supply.dianpuxiangqing')}}</div>
          <div>{{$t('supply.dizhi')}}：{{info.address}}</div>
          <div>{{$t('supply.juli')}}：{{distance}}</div>
          <div>{{$t('supply.lianxidianhua')}}：{{info.mobile}}</div>
          <div>{{$t('supply.lianxiren')}}：{{info.name}}</div>
          <div v-if="info.order_amount_free_delivery && info.order_amount_free_delivery != 0">{{$t('supply.mianfeiqisongjine')}}：SGD {{info.order_amount_free_delivery}}</div>
          <div v-if="info.delivery_fee_per_order && info.delivery_fee_per_order != 0">{{$t('supply.buzuqisongjinedesonghuofei')}}：SGD {{info.delivery_fee_per_order}}</div>
        </div>
        <div class='like'>
          <div class='like-list' v-if="list.length">
            <router-link class="new-comers-item" :to="'/ulink_comshop/pages/goods/goodsDetail?id='+item.actId" v-for="(item,index) in list" :key="item.actId">
              <i-img defaultImage="@/assets/images/placeholder-refund.png" height="30vw" width="40vw" iClass="new-img" :loadImage="item.skuImage"/>
              <div class='title'>{{item.spuName_en || item.spuName}}</div>
              <div class='subtitle'>{{item.spuDescribe_en || item.spuDescribe}}</div>
              <div class='new-bot'>
                <div class='price'>${{item.actPrice[0]}}.{{item.actPrice[1]}}</div>
                <div v-if="item.car_count<=0">
                  <i-button iClass="add-cart disabled" v-if="item.spuCanBuyNum==0">{{$t('supply.yiqiangguang')}}</i-button>
                  <div @click.stop.prevent="openSku" :data-idx="index" class="add-cart" :style="'background:'+skin.color" v-else>{{$t('supply.lijiqianggou')}}</div>
                </div>
                <i-input-number v-else addImage="@/assets/images/icon-add-2.png" @change="changeNumber" @outOfMax="outOfMax" iClass="index-input-number" iClassNumberText="input-number-text" :max="item.spuCanBuyNum" min="0" reduceImage="@/assets/images/icon-reduce-2.png" :value="item.car_count" :idx="index"></i-input-number>
              </div>
            </router-link>
          </div>
          <div class="none-rush-list" v-if="noData">
            <img class="img-block" src="@/assets/images/icon-index-empty.png"/>
            <div class="h1">{{$t('supply.zanshimeiyoutuangou')}}</div>
            <div class="h2">{{$t('supply.zanshimeiyoutuangoutishi')}}</div>
          </div>
        </div>
        <div class='copytext-btn' @click="showCopyTextHandle" :data-status="true">
        一键复制拼团信息
        </div>
        <i-cart-btn :cartNum="cartNum" :showHome="true"></i-cart-btn>

        <div class="addSupply" @click="goSupplyRecruit">
          <img class="img" src="@/assets/images/icon-tab-supplier.png"/>
          <span>{{$t('supply.ruzhu')}}</span>
        </div>
      </div>
    </van-list>

    <!-- 文本复制 Begin -->
    <i-modal :scrollUp="false" :visible="showCopyText">
      <div class="copytext">
        <div class="copytext-title">
          - 团长信息 -
          <span @click="showCopyTextHandle" class="iconfont icon-guanbi copytext-close" :data-status="false"></span>
        </div>
        <div class="copytext-p">小区：{{community.communityName}}</div>
        <div class="copytext-p">团长：{{community.disUserName}}</div>
        <div class="copytext-p">自提点：{{community.address||community.communityAddress||community.fullAddress}}</div>
        <div class="copytext-h3">今日推荐</div>
        <div scrollY class="copytext-content">
          <div class="copytext-item" v-if="copy_text_arr && copy_text_arr.length" v-for="(item,index) in copy_text_arr">
            {{index+1}}. 【{{item.goods_name}}】
            <span>团购价{{item.price}}元</span>
          </div>
        </div>
        <i-button @click="copyText" class="community-content-btn" iClass="btn">一键复制</i-button>
      </div>
    </i-modal>
    <!-- 文本复制 End -->
    <i-new-auth @authSuccess="authSuccess" @cancel="authModal" :needAuth="needAuth&&showAuthModal"
                :needPosition="needPosition"></i-new-auth>
    <sku :visible="visible" :skuList="skuList" :cur_sku_arr="cur_sku_arr" @cancel="closeSku" :sku_val="sku_val" :sku="sku" :goodsid="addCar_goodsid" @changeCartNum="changeCartNum" @vipModal="vipModal"></sku>
    <i-vip-modal :imgUrl="pop_vipmember_buyimage" :visible="showVipModal"></i-vip-modal>
  </div>
</template>

<script>
  import GlobalMixin from '../../mixin/globalMixin.js';
  import status from '../../utils/index.js'
  import util from '../../utils/index.js'
  import axios from 'axios'
  import {cartMixin} from '../../mixin/cartMixin.js';
  var app,wx
  export default {
    mixins: [cartMixin,GlobalMixin],
    name:'supply-home1',
    data() {
      return {
        noData: true,
        needAuth: false,
        showAuthModal: false,
        needPosition: true,
        list: [],
        info: [],
        distance: '',
        cartNum: 0,
        latitude: '',
        longitude: '',
        showCopyText: false,
        community: {},
        copy_text_arr: [],
        supplyId: 0,
        page: 1,
        is_only_distribution: 0,
        isLoadData: true,
        noMore: false,
      }
    },
    watch:{
    },
    created: function() {
      wx = this.$wx;
      app = this.$app;
      const o = this.$route.query || {};
      this.onLoad(o);
      this.onShow();
    },
    methods: {
      onLoad: function(options) {
        this.supplyId = options.id || 0;
        this.is_only_distribution = options.is_only_distribution || 0;
        if (options.share_id != 'undefined' && options.share_id > 0) wcache.put('share_id', options.share_id);
        this.needAuth = true;
        this.getData();
      },
      onShow: function() {
        let that = this;
        util.check_login_new().then(function(t) {
          t ? (that.needAuth = !1 , status.cartNum().then(t => {
            that.cartNum = t.data
          })) : (that.needAuth = !0,  that.navBackUrl = '/ulink_comshop/pages/supply/supplyHome?id=${id}')
        })
      },
      authSuccess: function() {
        var that = this;
        that.needAuth = false;
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
      getData: function () {
        var that = this;
        let community = wx.getStorageSync('community');
        that.community = community;
        var latitude = wx.getStorageSync('latitude');
        var longitude = wx.getStorageSync('longitude');
        if (!latitude || !longitude) {
          latitude =  1.3677037;
          longitude = 103.8542143;
        }
        that.latitude = latitude;
        that.longitude = longitude;
        if (that.latitude && that.longitude) {
          that.getSupplyDetails();
        } else {
          that.getDefaultSupplyDetails();
        }
      },

      getDefaultSupplyDetails: function () {
        that.latitude = 1.3677037;
        that.longitude = 103.8542143;

        this.getSupplyDetails();
      },

      getSupplyDetails: function () {
        var that = this;
        that.isLoadData = !0;
        var token = wx.getStorageSync('token');
        var cur_community = wx.getStorageSync('community');
        app.util.request({
          'url': 'entry/wxapp/index',
          'data': {
            controller: 'supply.get_details',
            token: token,
            page: that.page,
            is_random: 1,
            head_id: cur_community.communityId,
            id: that.supplyId,
            is_only_distribution: that.is_only_distribution,
            lat: that.latitude,
            lon: that.longitude
          },
          dataType: 'json',
          success: function (res) {
            that.isLoadData = !1, setTimeout(function() {
              wx.hideLoading()
            }, 1e3)
            if (res.code == 0) {
              let distance = res.distance;
              if (distance) {
                if (distance < 1000) {
                  distance = distance + '米';
                } else {
                  distance = (distance/1000).toFixed(1) + '公里';
                }
              }
              let oldList = that.list;
              let info = res.data || [];
              let list = oldList.concat(res.list);
              let noData = false;
              if(that.page == 1) {
                wx.setNavigationBarTitle({
                  title: info.storename || info.shopname || '供应商',
                    showBack:true
                })
                if (list.length==0) {
                  noData = true;
                } else {
                  var length = list.length > 12 ? 12 : list.length;
                  var copy_text_arr = [];
                  for(var i=0;i<length;i++) {
                    var goods_name = list[i].spuName;
                    var price = list[i].actPrice[0] + '.' + list[i].actPrice[1];
                    var copy_text = {goods_name,price};
                    copy_text_arr.push(copy_text);
                  }
                  that.copy_text_arr = copy_text_arr;
                }
              }
              var nextPage = that.page + 1;
              var noMore = false;
              if (res.list.length == 0) {
                noMore = true;
              }
              that.distance = distance;
              that.list = list;
              that.info = info;
              that.noData = noData;
              that.noMore = noMore;
              that.page = nextPage;
            } else {
              that.noMore = true;
            }
          }
        })
      },

      showCopyTextHandle: function(t) {
        if (this.authModal()) {
          var a = t.currentTarget.dataset.status
          this.showCopyText = a
        }
      },

      /**
       * 一键复制文本
       */
      copyText: function (e) {
        let copy_text_arr = this.copy_text_arr;
        let community = this.community;
        let communityName = community.communityName;
        let disUserName = community.disUserName;
        let communityAddress = community.address || community.communityAddress || community.fullAddress;
        let data = '-团长信息-\r\n小区：' + communityName + '\r\n团长：' + disUserName + '\r\n自提点：' + communityAddress + '\r\n\r\n今日推荐\r\n';
        if (copy_text_arr.length) {
          copy_text_arr.forEach(function(item, index){
            data += (index + 1) + '.【' + item.goods_name + '】  团购价S$' + item.price + '\r\n';
            data += '~~~~~~~~~~~~~~~~~~~~\r\n';
          })
        }
        let that = this;
        console.log(data)
        // wx.setClipboardData({
        //   data: data,
        //   success: function (res) {
        //     wx.getClipboardData({
        //       success: function (res) {
        //         that.showCopyText = false
        //         wx.showToast({
        //           title: '复制成功'
        //         })
        //       }
        //     })
        //   }
        // })
      },

      goSupplyRecruit: function() {
        wx.navigateTo({
          url: '/ulink_comshop/pages/supply/recruit',
        })
      }
    }
  }
</script>

<style scoped>
.special {
  min-height: 100vh;
}

.topic-img {
  width: 95%;
  height: 32vw;
  display: block;
  margin: 0 auto;
}

.like {
  padding-bottom: 10vw;
}

.like-list {
  position: relative;
  padding: 2vw;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  z-index: 0;
}

.new-comers-item {
  background-color: #fff;
  width: 48%;
  box-sizing: border-box;
  padding: 3vw;
  border-radius: 10px;
  font-size: 2.8vw;
  margin-bottom: 2vw;
}

.new-comers-item .new-img {
  width: 28.5vw;
  height: 24vw;
  margin-bottom: 2vw;
}

.new-comers-item .title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: 5vw;
}

.new-comers-item .subtitle {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: 3.5vw;
  color: #999;
}

.new-comers-item .new-bot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1vw;
}

.new-comers-item .add-cart {
  height: 4.8vw;
  width: 20vw;
  text-align: center;
  line-height: 4.8vw;
  padding: 0 2vw;
  color: #fff;
  border-radius: 2.2vw;
  margin: 0;
  background: linear-gradient(270deg, #ff5041 0%, #ff695c 100%);
  font-size: 2.4vw;
}

.new-comers-item .add-cart.disabled {
  background: #ccc;
}

.new-comers-item .price {
  color: #ff5041;
}

.new-comers-item {
  position: relative;
}

.new-comers-item .act-end {
  position: absolute;
  height: 6vw;
  border-radius: 1vw;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 2.8vw;
  text-align: center;
  line-height: 6vw;
  left: 50%;
  top: 12vw;
  padding: 0 1.2vw;
  transform: translateX(-50%);
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

.none-rush-list .h2 {
  font-size: 2.4vw;
  line-height: 2.4vw;
  color: #aaa;
}

/* 数量加减 */
.like-list .index-input-number {
  position: absolute;
  right: 2vw;
  bottom: 1vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

.like-list .index-input-number .i-input-number-view {
  width: 8vw;
  height: 8vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

.like-list .index-input-number .i-input-number-view .img{
  width: 4vw;
  height: 4vw;
}

.like-list .index-input-number .i-input-number-minus {
  justify-content: flex-end;
}

.like-list .index-input-number .i-input-number-plus {
  justify-content: flex-start;
}

.like-list .index-input-number .input-number-text {
  height: 8.8vw;
  line-height: 8.8vw;
  font-size: 2.4vw;
  color: #333;
  width: 5.8vw;
}

/* 店铺信息 */

.info {
  background-color: #fff;
  box-sizing: border-box;
  width: 95%;
  padding: 3vw;
  border-radius: 1vw;
  font-size: 2.8vw;
  margin: 2vw auto;
}

.info .title {
  font-size: 3.4vw;
  font-weight: bold;
}

/* 一键复制 */
.copytext-btn {
  position: fixed;
  right: 0;
  top: 58%;
  font-size: 2vw;
  color: #999;
  z-index:100;
  width: 8vw;
  line-height: 1.2;
  border: 1px solid #999;
  border-right: 0;
  padding: 0.5vW 1.5vw 0.5vw 2vw;
  border-radius: 4vw 0 0 4vw;
}

/* 复制信息 */
.copytext {
  width: 64vw;
  background: #fff;
  border-radius: 2.4vw;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin: 0 auto;
  overflow: hidden;
  z-index: 1001;
}

.copytext-title {
  width: 100%;
  background-color: #f75451;
  text-align: center;
  color: #fff;
  font-weight: bold;
  font-size: 3.4vw;
  line-height: 10vw;
  margin-bottom: 3vw;
}

.copytext-p {
  width: 100%;
  box-sizing: border-box;
  padding: 0.5vw 3vw;
  font-size: 3vw;
}

.copytext-h3 {
  width: 100%;
  box-sizing: border-box;
  padding: 0.5vw 3vw;
  font-size: 3.2vw;
  font-weight: bold;
  margin-top: 2.4vw;
}

.copytext-content {
  box-sizing: border-box;
  height: 40vw;
  padding: 2vw 3vw 0;
}

.copytext-item {
  line-height: 1.8;
}

.copytext-item text{
  margin-left: 5px;
}

.copytext-close {
  position: absolute;
  font-size: 5vw;
  top: 2.5vw;
  right: 3vw;
  color: #fff;
  line-height: 1;
}

.copytext-btn {
  position: fixed;
  right: 0;
  top: 38%;
  font-size: 2vw;
  color: #999;
  z-index:100;
  width: 8vw;
  line-height: 1.2;
  border: 1px solid #999;
  border-right: 0;
  padding: 0.5vw 1.5vw 0.5vw 2vw;
  border-radius: 4vw 0 0 4vw;
}

.community-content-btn {
  text-align: center;
  width: 43.2vw;
  height: 7.2vw;
  color: #fff;
  background: #f75451;
  font-size: 3vw;
  line-height: 7.2vw;
  border-radius: 1.2vw;
  margin: 4vw 0 3vw;
}

::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent;
}

.addSupply {
  position: fixed;
  right: 3vw;
  bottom: 8vw;
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

</style>
