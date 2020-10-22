<template>
  <div>
    <div class="section">
      <img class="groupDay" src="@/assets/images/groupDay.png"/>
      <div class="picker">
        <!--<picker bindchange="bindDateChange" fields="month" mode="date" :value="date">-->
          <!--<div class="choose-day">-->
            <!--<span>{{chooseDate}}</span>-->
            <!--<span class="iconfont icon-xiatiao"></span>-->
          <!--</div>-->
        <!--</picker>-->

        <div class="picker" @click="showPicker = true">
          {{selxarray}}
        </div>
        <van-popup v-model="showPicker" round position="bottom">
          <van-picker
            show-toolbar
            :columns="xarray"
            @cancel="showPicker = false"
            @confirm="bindPickerChange"
          />
        </van-popup>

      </div>
      <div class="income">
        <span>预计佣金：￥{{permoney}}</span>
      </div>
    </div>
    <div class="distributionList">
      <div class="nav">
        <div @click="switchNav" :class="['orderList_item', (currentTab==item.status?'on':'')]" :data-current="item.status"  v-for="(item,index) in navList" :key="item.id" >{{item.name}}</div>
      </div>
      <swiper bindchange="bindChange" class="swiper-box" :current="currentTab" duration="300" :style="{height:containerHeight + 'px'}">
        <swiper-slide v-for="(navItem,index) in navList"  :key="navItem.id">
          <div scrollY bindscrolltolower="getCurrentList" class="order-scroll-div" :scrollTop="scrollTop" :style="{height: containerHeight + 'px'}">
            <div class="noRecordCon" v-if="order.length==0">
              <img class="noRecordImg" src="@/assets/images/noRecord.png"/>
              <div class="noRecord">还没有记录 快去分享吧～</div>
            </div>
            <div v-else>
              <div class="item" v-for="(item,index) in order" :key="item.id">
                <div class="distributionNum">
                  <span class="distributionTime">{{item.order_num_alias}}</span>
                  <span class="statusName">{{item.status_name}}</span>
                </div>
                <div class="spu" v-for="(goods,index) in item.goods_list"  :key="goods.order_goods_id">
                  <img class="i-class goodsImg" mode="widthFix" :src="goods.goods_images" style="width:60px;height:60px;"/>
                  <div class="detail">
                    <div class="goodsName">{{goods.name}}</div>
                    <div class="commission text-right">团单金额 ￥{{goods.total}} |
                      <span v-if="item.order_status_id!=11&&item.order_status_id!=6">预估</span>佣金 ￥{{goods.commision}}</div>
                    <div class="i-flex i-flex-spb text-right text-gray fsz-26 mt5" v-if="goods.has_refund_quantity>0">
                                        <span @click="handleTipDialog" class="i-flex-item">
                      佣金变化:<span class="red">￥{{goods.del_commision}}</span>
                                            <span class="iconfont icon-shuoming text-dark fsz-26" style="margin-left:10rpx;"></span>
                                        </span>
                    </div>
                  </div>
                </div>
                <div class="distributionCommision" v-if="item.shipping_fare!='免运费'&&item.delivery=='tuanz_send'">
                  <span class="fareCommision">配送收入: ￥{{item.shipping_fare}}</span>
                  <span class="totalCommision">合计佣金: ￥{{item.total_commision}}（含配送）</span>
                </div>
                <div class="distributionCommision" v-else>
                  <span class="totalCommision" v-if="item.order_status_id!=5&&item.order_status_id!=7">合计佣金: ￥{{item.total_commision}}</span>
                </div>
              </div>
              <i-loadMore :tip="tip" v-if="!isHideLoadMore"></i-loadMore>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
    <div @click="refresh" class="refresh">
      <span class="iconfont icon-shuaxin refreshImg"></span>
      <span>刷新</span>
    </div>
    <i-dialog bind:cancel="handleTipDialog" bind:confirm="handleTipDialog" confirmText="知道了" iBtn="dialogBtn" iClass="dialogText" :showCancel="false" text="您的”粉丝“购买的商品进行了申请售后，售后成功部分商品进行退款佣金发生变化。" :visible="showTipDialog"></i-dialog>
  </div>

</template>

<script>
  var _data,app,wx;

  function _defineProperty(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
      value: a,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : t[e] = a, t;
  }

  export default {
    name: '',
    data(){
      return {
        selxarray:'',
        showPicker: false,
        currentTab: 0,
        pageSize: 10,
        navList: [{
          name: "全部",
          status: "0"
        }, {
          name: "待确认",
          status: "1"
        }, {
          name: "已确认",
          status: "2"
        }, {
          name: "无效",
          status: "3"
        }],
        distributionList: [],
        loadText: "没有更多记录了~",
        containerHeight: 0,
        chooseDate: "",
        chooseDateTime: "",
        data: "",
        estimate: "",
        permoney: 0,
        communnityId: "",
        no_order: 0,
        page: 1,
        order: [],
        disUserId: '',
        tip: "正在加载",
        hide_tip: !0,
        years:[],
        months:[],
        xarray: [],
        index: '0,1',
        showTipDialog:false,
        scrollTop: 0,
      }
    },
    created: function() {
      wx = this.$wx;
      app = this.$app;
      this.initYM();
      this.$wx.setNavigationBarTitle({
        title: '结算记录',
        showLogo:false,
        showMore:false,
        showBack:true
      })
      this.onLoad();
      this.onShow();
    },
    methods: {
      initYM:function () {

        var n = 10;
        var m = 10;
        var myDate= new Date();
        var startYear=myDate.getFullYear()-n;//起始年份
        var endYear=myDate.getFullYear()+m;//结束年份
        for (var i=startYear;i<=endYear;i++) {
          var obj = i+"年";
          this.years.push(obj);
        }
        var tMonth = myDate.getMonth();
        var curMonth = tMonth + 1;

        this.months = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
        var defaultMonIdx = 1;
        for(var j = 0,len=this.months.length; j < len; j++) {
          if (this.months[j] == (curMonth+'月')){
            defaultMonIdx = j;
            break;
          }
        }
        this.selxarray = myDate.getFullYear() +"年 "+curMonth+'月';

        this.xarray = [
          // 第一列
          {
            values: this.years,
            defaultIndex: n,
          },
          // 第二列
          {
            values: this.months,
            defaultIndex: defaultMonIdx,
          },
        ];

      },
      onLoad: function() {
        var e = wx.getSystemInfoSync();
        this.containerHeight= e.windowHeight - Math.round(e.windowHeight / 375 * 55);
      },
      onShow: function() {
        var t = new Date(), e = t.getFullYear(), a = t.getMonth() + 1, o = Date.parse(t);

          this.page= 1;
          this.order= [];
          this.chooseDate= e + "年" + a + "月";
          this.chooseDateTime= o;
         this.getData();
         this.get_month_money();
      },
      get_month_money: function() {
        var t = this.chooseDate, e = this, a = wx.getStorageSync("token");
        this.$http_post({
            controller: "order.order_commission",
            token: a,
            chooseDate: t
          }).then(t=> {
              console.log(t,"order_commission");
            if(0 == t.code){
              e.permoney=t.money;
            }else{
              e.permoney= 0;
            }

        });
      },
      getData: function() {
        wx.showLoading({
          title: "加载中...",
          mask: !0
        });
        this.isHideLoadMore= !0;
        this.no_order = 1;
        var o = this, t = this.chooseDate, e = wx.getStorageSync("token"), a = this.currentTab, n = -1;

        var n = -1;
        if (a == 0) {
          n = -1;
        } else if (a == 1) {
          n = 22;
        } else if (a == 2) {
          n = 6;
        } else if (a == 3) {
          n = 357;
        }
        this.$http_post({
            controller: "order.orderlist",
            is_tuanz: 1,
            token: e,
            chooseDate: t,
            page: o.page,
            order_status: n
          }).then(t=> {
              console.log(t,"orderlist");
            if (0 != t.code) {
              o.isHideLoadMore= !0;
              wx.hideLoading()
              return !1;
            }else{
              console.log(o.page);
              var e = t.data;
              var a = o.order.concat(e);
              o.order= a;
              o.hide_tip= !0;
              o.no_order= 0;
              wx.hideLoading();
            }


        });
      },
      refresh: function() {
        var t = this;
        this.page= 1;
        this.order= [];
        t.getData();
      },
      onHide: function() {},
      bindChange: function() {
        var e = this;
//        this.currentTab= 1 * t.detail.current;

        this.order= [];
        this.page= 1;
        this.no_order= 0;
        console.log("我变啦");
        e.getData();
      },
      switchNav: function(t) {

        if (this.currentTab == 1 * t.target.dataset.current) return !1;
        this.currentTab= 1 * t.target.dataset.current;
        this.bindChange();
      },
      onUnload: function() {},
      onPullDownRefresh: function() {
        this.getData();
      },
      bindDateChange: function() {
//        console.log("picker发送选择改变，携带值为", t.detail.value);
//        this.date= t.detail.value;
//        var e = this.date.split("-"), a = Date.parse(this.date);
        var e = this.date;

//        this.chooseDate= e[0] + "年" + e[1] + "月";
//        this.chooseDateTime= a;
        this.order= [];
        this.page= 1;
        this.no_order= 0;
         this.getData();
         this.get_month_money();
      },
      bindPickerChange: function(v,idx) {

        this.index =idx
        this.selxarray = v[0]+" "+v[1];
        this.chooseDate = v[0]+v[1];
        this.showPicker = false;
        this.bindDateChange();
      },
      getCurrentList: function() {
        console.log(this.no_order);
        if ( 1 == this.no_order) return !1;
        this.page += 1;
        this.getData();
        this.isHideLoadMore= !1;
      },
      onReachBottom: function() {
        console.log(this.no_order)
        if ( 1 == this.no_order) return !1;
        this.page += 1;
        this.getData();
        this.isHideLoadMore= !1;
      },
      handleTipDialog: function() {
        this.showTipDialog= !this.showTipDialog;
      },
      onShareAppMessage: function() {},
      formatter(type, val) {
        if (type === 'year') {
          return `${val}年`;
        } else if (type === 'month') {
          return `${val}月`;
        }
        return val;
      },
    }

  }
</script>

<style>
  @import "distributionList.less";
</style>
