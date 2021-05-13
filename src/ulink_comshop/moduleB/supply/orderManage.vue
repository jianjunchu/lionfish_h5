<template>
  <div class="wrap pb100">
    <div class="nav">
      <div @click="switchNav" :class="currentTab==item.status?'orderList_item on':'orderList_item'" :data-current="item.status" v-for="(item,index) in navList" :key="item.status">{{item.name}}</div>
    </div>
    <!--搜索框begin-->
    <div class='search-bar'>
      <div class='search-box'>
        <input class='ipt' :placeholder="$t('supply.sousuo')" :confirm-type="$t('supply.sousuo')" type="span" v-model="keyword"/>
        <div class='search-icon'>
          <span class="iconfont icon-sousuo1"></span>
        </div>
      </div>
    </div>
    <div class="list" v-if="list.length>0">
      <div v-for="(item,index) in list" :key="item.id" @click="goLink" :data-link="'/ulink_comshop/moduleB/supply/orderDetails?id='+item.order_id">
        <i-card class="orderItem">
          <div slot="header" class="i-flex i-flex-spb p10 border-bottom">
            <span>{{$t('supply.dingdanbianhao')}}：{{item.order_num_alias}}</span>
            <span :class="item.order_status_id==11?'black red':'red'">{{item.status_name}}</span>
          </div>
          <div slot="content">
            <div class="userinfo i-flex p10" v-if="item.delivery=='express'">
              <div>{{$t('supply.shouhuorenxinxi')}}：{{item.shipping_name}} {{item.shipping_tel}}</div>
              <!-- <div class="call ml5 bg-primary span-white" :data-phone="item.shipping_tel" @click.prevent.stop='callPhone'>{{$t('supply.lianxishouhuoren')}}</div> -->
              <div class="red delivery">{{$t('supply.zhisongdan')}}</div>
            </div>
            <div class="userinfo i-flex p10" v-if="item.delivery=='tuanz_send'||item.delivery=='pickup'">
              <div>{{$t('supply.tuanzhangxinxi')}}：{{item.ziti_name}} {{item.ziti_mobile}}</div>
              <!-- <div class="call ml5 bg-primary span-white" :data-phone="item.ziti_mobile" @click.prevent.stop='callPhone'>{{$t('supply.lianxituanzhang')}}</div> -->
              <div class="red delivery">{{$t('supply.tuandan')}}</div>
            </div>
            <div class="userinfo i-flex p10">
              <div>{{$t('supply.songhuoshijian')}}：{{item.delivery_date}} {{item.delivery_time}}</div>
            </div>
            <div class="goodsBox">
              <div v-for="goods in item.goods_list" v-if="item.goods_list.length" :key="goods.order_goods_id">
                <div class="item p15 bg-f border-bottom i-flex">
                  <i-img defaultImage="@/assets/images/placeholder-refund.png" height="160" iClass="img-class" lazyLoad="true" :loadImage="goods.goods_images" width="160"></i-img>
                  <div class="i-flex-item ml10 i-flex-col jcontent-c">
                    <div class="fsz-28 weight">{{goods.name}}</div>
                    <div class="price mt10 fsz-22 span-gray">${{goods.price}} x<label style="color: #000; font-size: 4vw;">{{goods.quantity}}</label></div>
                    <div class="fsz-24 mt-auto">{{$t('supply.xiaoji')}}：<span class="red">{{goods.total}}</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div slot="footer" class="i-flex footer p10">
            <!-- <div class="btn bg-ccc span-3" data-id="{{item.order_id}}">备注</div> -->
            <!-- <div class="btn bg-warning" data-id="{{item.order_id}}">订单退款</div> -->
            <!-- <div class="btn bg-sucess" v-if="{{item.delivery=='express'}}" data-id="{{item.order_id}}" @click.prevent.stop="getExpList">修改物流</div> -->
            <div v-if="item.order_status_id==4" class="btn bg-blue" :data-id="item.order_id" @click.prevent.stop="opreceive">{{$t('supply.querenshouhuo')}}</div>
            
            <!-- 快递发货 -->
            <div v-if="item.order_status_id==1 && item.delivery=='express'" class="btn bg-blue" @click.prevent.stop="goAddOrderdistributionOrder" data-link="" :data-id="item.order_id">{{$t('supply.xiasonghuodan')}}</div>
            <div v-if="item.order_status_id==1 && item.delivery=='express'" class="btn bg-blue" @click.prevent.stop="getExpList" :data-id="item.order_id">{{$t('supply.querenfahuo')}}</div>
            <!-- 团长配送 -->
            <div v-if="item.order_status_id==1 && item.delivery=='tuanz_send'||item.delivery=='pickup'" class="btn bg-blue" @click.prevent.stop="tuanSend" :data-id="item.order_id">{{$t('supply.querenpeisong')}}</div>
            
            <!-- 快递确认收货 -->
            <div v-if="item.order_status_id==14 && item.delivery=='express'" class="btn bg-blue" :data-id="item.order_id" @click.prevent.stop="opreceive">{{$t('supply.querenshouhuo')}}</div>
            <!-- 团长确认收货 -->
            <div v-if="item.order_status_id==14 && item.delivery=='tuanz_send'||item.delivery=='pickup'" class="btn bg-blue" :data-id="item.order_id" @click.prevent.stop="tuanOver">{{$t('supply.querensongdatuanzhang')}}</div>

            <!-- <div v-if="item.order_status_id==3" class="btn bg-blue" :data-id="item.order_id" @click.prevent.stop="goOrderChangePrice">{{$t('supply.xiugaijiage')}}</div> -->
          </div>
        </i-card>
      </div>
      <i-load-more iClass="loadMore" :loading="loadMore" :tip="loadspan" v-if="!noMore"></i-load-more>
    </div>
    <i-empty v-if="noData">{{$t('supply.zanwudingdan')}}</i-empty>
    <i-supply-tabbar :data="currentIndex"/>
    <!-- 快递信息 -->
    <i-modal scrollUp="false" v-if="showExpModal">
      <div class="exp-modal bg-f rounded">
        <div class="p10 border-bottom bg-lighter span-dark weight fsz-30">{{$t('supply.dingdanfahuo')}}</div>
        <div class="p15 border-bottom fsz-24">
          <div class="mb5">{{$t('supply.lianxiren')}}：{{expInfo.shipping_name}}</div>
          <div class="mb10">{{$t('supply.shouhuodizhi')}}：{{expInfo.shipping_name}}</div>
          <div class="mb10 i-flex i-aic">
            <!-- <picker class="i-flex-item" @change="bindPickerChange" v-model="index" :range="expInfo.express_list" range-key="name">
              <div class="picker">
                {{$t('supply.wuliugongsi')}}：{{expInfo.express_list[index].name}} <span class="iconfont icon-xia fsz-24 span-gray"></span>
              </div>
            </picker> -->
          </div>
          <div class="i-flex i-aic" v-if="showExpModal">
            {{$t('supply.wuliudanhao')}}：
            <input class="ipt i-flex-item" type="span" :placeholder="$t('supply.qingshuruwuliudanhao')" @input="bindKeyInput"/>
          </div>
        </div>
        <div class="i-flex jcontent-sa span-center weight fsz-30">
          <div class="btn p10 i-flex-item span-gray" @click="hideExpModal">{{$t('supply.quxiao')}}</div>
          <div class="btn p10 i-flex-item bule" :data-id="expInfo.order_id" @click="expSend">{{$t('supply.querengfahuo')}}</div>
        </div>
      </div>
    </i-modal>
  </div>
</template>

<script>
  import GlobalMixin from '../../mixin/globalMixin.js';
  import orderMixin from './static/orderMixin.js'
  import status from '../../utils/index.js'
  import util from '../../utils/index.js'
  import Tabbar from './tabbar'
  var app,wx
  export default {
    mixins: [orderMixin,GlobalMixin],
    name:'supply-orderManage',
    components: {'i-supply-tabbar': Tabbar},
    data() {
      return {
        currentIndex: 1,
        navList: [{
          name: this.$t('supply.quanbu'),
          status: "-1"
        }, {
          name: this.$t('supply.daifahuo'),
          status: "1"
        }, {
          name: this.$t('supply.peisongzhong'),
          status: "14"
        }, {
          name: this.$t('supply.daishouhuo'),
          status: "4"
        }
        ],
        currentTab: -1,
        list: [],
        loadText: this.$t('supply.jiazaizhong'),
        noData: 0,
        loadMore: true,
        page: 1,
        keyword: '',
        showExpModal: false
      }
    },
    watch: {
      keyword: {
        handler: function(newValue,oldValue) {
          let keyword = newValue.replace(/\s+/g, '');
          this.keyword = keyword;
          this.initFn(keyword);
        }
      }
    },
    created: function() {
      wx = this.$wx
      app = this.$app
      var that = this;
      wx.setNavigationBarTitle({
        title: that.$t('supply.dingdanguanli'),
        showBack: true
      })
    },
    mounted: function() {
      const o = this.$route.query || {};
      this.onLoad(o)
      this.onShow()
    },
    methods: {
      onLoad: function (options) {
        let currentTab = options.status || -1;
        this.currentTab = currentTab;
      },
      onShow: function () {
        this.initFn();
      },

      initFn: function(keyword=''){
        this.page = 1;
        this.keyword = keyword;
        this.list = [];
        this.loadText = this.$t('supply.daishouhuo');
        this.noData = 0;
        this.loadMore = true;
        this.getData();
      },

      /**
      * 切换导航
      */
      switchNav: function (e) {
        let that = this;
        if (this.currentTab === 1 * e.target.dataset.current) return false;
        this.currentTab = 1 * e.target.dataset.current;
        that.initFn();
      },

      getData: function () {
        let that = this;
        let token = wx.getStorageSync('token');
        let order_status = this.currentTab;
        let keyword = this.keyword;

        wx.showLoading();
        app.util.request({
          url: 'entry/wxapp/index',
          data: {
            controller: 'order.orderlist',
            token,
            is_supply: 1,
            order_status,
            page: that.page,
            keyword
          },
          dataType: 'json',
          success: function (res) {
            if (res.code == 0) {
              let list = res.data;
              if (list.length < 10) that.noMore = true;
              let oldList = that.list;
              list = oldList.concat(list);
              that.page++;
              that.list = list;
            } else if(res.code==2) {
              wx.showToast({
                title: res.msg || that.$t('supply.qingqiuchucuo'),
                icon: 'none'
              })
              wx.navigateTo({
                url: '/ulink_comshop/pages/user/me',
              })
            } else {
              if(that.page==1) that.noData = 1;
              that.loadMore = false;
              that.noMore = false;
              that.loadText = that.$t('supply.meiyougengduojilule');
            }
            wx.hideLoading();
          }
        })
      },

      callPhone: function(e){
        var phoneNumber = e.currentTarget.dataset.phone;
        if (phoneNumber) {
          
        }
      },

      hideExpModal: function(){
        this.showExpModal = false;      
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
        if (!this.loadMore) return false;
        this.getData();
      },

      
      goAddOrderdistributionOrder: function (event) {
        var id = event.currentTarget.dataset.id;
        wx.navigateTo({
          url: `/ulink_comshop/moduleB/supply/addOrderdistributionOrder?id=${id}`
        })
      },

      goOrderChangePrice: function (event) {
        var id = event.currentTarget.dataset.id;
        wx.navigateTo({
          url: `/ulink_comshop/moduleB/supply/orderChangePrice?id=${id}`
        })
      }
    }
  }
</script>

<style scoped>
.orderItem {
  margin: 2vw auto;
  font-size: 2.8vw;
}

.red {
  font-weight: 500;
}

.red.black {
  color: #aaa;
}

.call {
  padding: 0.5vw 1.5vw;
  border-radius: 1vw;
  font-size: 2.4vw;
}

.footer {
  justify-content: flex-end;
}

.footer .btn {
  padding: 0.4vw 1.5vw;
  margin-left: 2vw;
  border-radius: 1vw;
  color: #fff;
}

.exp-modal {
  width: 80%;
  overflow: hidden;
}

.btn {
  position: relative;
}

.btn:last-child::before {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  top: 0;
  border-left: 1px solid #e5e5e5;
  transform-origin: 0 0;
  transform: scaleX(0.5);
}

.exp-modal .ipt {
  border: 0.1vw solid #e5e5e5;
  padding: 1vw;
}

.search-bar {
  font-size: 2.8vw;
}

.delivery {
  position: relative;
  left: 70%;
}

.nav {
  position: fixed;
  left: 0;
  right: 0;
  transition: top 0.3s;
  z-index: 10;
  background: #fff;
  height: 9.2vw;
  border-bottom: 0.2vw solid #f2f2f2;
  padding: 0 6vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav .orderList_item {
  font-size: 2.8vw;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: #666;
  position: relative;
  height: 9.4vw;
  line-height: 9.4vw;
}

.nav .on {
  position: relative;
  color: #fe8464;
  border-bottom: 0.4vw solid #fe8464;
}

/* 搜索 */
.search-bar {
  padding: 1.2vw 2.5vw;
  background-color: #fff;
  width: 100%;
  box-sizing: border-box;
  margin-top: 9.4vw;
}

.search-box {
  background-color: #f0f0f0;
  height: 5.6vw;
  line-height: 5.6vw;
  border-radius: 2.8vw;
  color: #acacac;
  display: flex;
  align-content: center;
}

.search-icon {
  position: absolute;
  left: 2vw;
  margin-left: 2.5vw;
  margin-right: 1.2vw;
}

.search-icon .iconfont {
  font-size: 3.4vw;
  padding-top: 1vw;
}

.search-box .ipt {
  padding: 0 3vw 0 6vw;
  line-height: 5.6vw;
  height: 5.6vw;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-radius: 50%;
  background-color: #f0f0f0;
}

.item .img-class {
  width: 16vw;
  height: 16vw;
  overflow: hidden;
}

.search-bar {
  font-size: 2.8vw;
}

.fixed-share {
  display: inline-block;
  bottom: 22%;
  right: 3vw;
  width: 8vw;
  height: 8vw;
  position: fixed;
  background: rgba(235, 30, 30, 0.932);
  border-radius: 50%;
  text-align: center;
  color: #fff;
  box-sizing: border-box;
  font-size: 2.4vw;
  padding: 1vw;
  line-height: 1.3;
  z-index: 100;
}

.pb100 {
  padding-bottom: 10vw;
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-sousuo1:before {
  content: "\e665";
}

.i-flex {
  display: flex;
}

.i-flex-spb {
  justify-content: space-between;
  align-items: center;
}

.p10 {
  padding: 2vw;
}

.border-bottom {
  position: relative;
}

.border-bottom::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  border-bottom: 1px solid #e5e5e5;
  transform-origin: 0 0;
  transform: scaleY(0.5);
}

.red {
  color: #ff5344;
}

.ml5 {
  margin-left: 1vw;
}

.bg-primary {
  background-color: #ff5344;
}

.i-flex-item {
  flex: 1;
}

.i-flex-col {
  display: flex;
  flex-direction: column;
}

.jcontent-c {
  justify-content: center;
}

.fsz-28 {
  font-size: 2.8vw;
}

.weight {
  font-weight: bold;
}

.mt10 {
  margin-top: 2vw;
}

.fsz-22 {
  font-size: 2.2vw;
}

.fsz-24 {
  font-size: 2.4vw;
}

.mt-auto {
  margin-top: auto;
}

.bg-blue {
  background-color: rgb(59,140,232);
}

.fsz-30 {
  font-size: 3vw;
}

.p15 {
  padding: 3vw;
}

.i-aic {
  align-items: center!important;
}

.jcontent-sa {
  justify-content: space-around;
}
</style>
