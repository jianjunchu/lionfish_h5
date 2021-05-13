<template>
  <div class="wrap pb100">
    <div class="nav">
      <div @click="switchNav" :class="currentTab==item.status?'orderList_item on':'orderList_item'" :data-current="item.status" v-for="(item,index) in navList" :key="item.status">{{item.name}}</div>
    </div>
    <!--搜索框begin-->
    <div class='search-bar'>
      <div class='search-box'>
        <input class='ipt' :placeholder="$t('supply.sousuoshangpin')" type="text" v-model="keywords"/>
        <div class='search-icon'>
          <span class="iconfont icon-sousuo1"></span>
        </div>
      </div>
    </div>
    <div class="list" v-if="list.length>0">
      <div class="item p15 bg-f border-bottom i-flex" v-for="(item,index) in list" :key="item.id">
        <i-img :defaultImage="placeholdeImg?placeholdeImg:'@/assets/images/placeholder-refund.png'" height="160" iClass="img-class" lazyLoad="true" :loadImage="item.big_img" width="160"></i-img>
        <div class="i-flex-item ml10 i-flex-col jcontent-c">
          <div class="fsz-28 weight">{{item.goodsname}}</div>
          <div class="price red mt10">${{item.price}}</div>
          <div class="red fsz-24 mt-auto">{{$t('supply.kucun')}}：{{item.total}}</div>
        </div>
        <span class="iconfont icon-more mt-auto fsz-36" @click="handleActionsheet" :data-id="item.id" :data-index="index"></span>
      </div>
      <i-load-more iClass="loadMore" :loading="loadMore" :tip="loadspan" v-if="!noMore"></i-load-more>
    </div>
    <i-empty v-if="noData">{{$t('supply.zanwushangpin')}}</i-empty>

    <button class="fixed-share" @click='toAddGoods'>
      <div>{{$t('supply.xinzengshangpin')}}</div>
    </button>

    <mp-actionSheet @actiontap="handleBtn" :show="showActionsheet" :actions="groups" :title="$t('supply.xuanzexuyaodecaozuo')" @close="handleActionsheet"></mp-actionSheet>
    <mp-dialog :title="$t('supply.kucun')" :show="editSkuVisible" @buttontap="editSku" :buttons="buttons">
      <div>
        <input type="number" :focus="true" :placeholder="$t('supply.qingshuruxiugaidekucunshuliang')" @input="bindSkuIpt" v-model="editSkuNum"/>
      </div>
    </mp-dialog>
    <i-supply-tabbar :data="currentIndex"/>
  </div>
</template>

<script>
  import GlobalMixin from '../../mixin/globalMixin.js';
  import status from '../../utils/index.js'
  import util from '../../utils/index.js'
  import Tabbar from './tabbar'
  import ActionSheet from '@/ulink_comshop/components/actionsheet/index'
  import MpDialog from '@/ulink_comshop/components/mp-dialog/dialog'
  var app,wx
  export default {
    mixins: [GlobalMixin],
    name:'supply-goodsManage',
    components: {'i-supply-tabbar': Tabbar,'mp-actionSheet': ActionSheet,'mp-dialog': MpDialog},
    data() {
      return {
        currentIndex: 0,
        placeholdeImg: '',
        navList: [{
            name: this.$t('supply.chushouzhong'),
            status: "1"
          }, {
            name: this.$t('supply.kuncunyujing'),
            status: "8"
          }, {
            name: this.$t('supply.yixiajia'),
            status: "0"
          }, {
            name: this.$t('supply.daishenhe'),
            status: "4"
          }
        ],
        currentTab: 1,
        list: [],
        loadText: this.$t('supply.jiazaizhong'),
        noData: 0,
        loadMore: true,
        showActionsheet: false,
        editSkuVisible: false,
        groups: [
          { text: this.$t('supply.shanchu'), type: 'warn', value: 1 },
          { text: this.$t('supply.xiajia'), value: 2 },
          { text: this.$t('supply.xiugaikucun'), value: 5 },
          { text: this.$t('supply.bianji'), value: 3 }
        ],
        buttons: [{text: this.$t('supply.quxiao')}, {text: this.$t('supply.queding')}],
        editSkuNum: 0,
        page: 1,
        keywords: '',
        goodsId: '',
      }
    },
    watch:{
      keywords: {
        handler: function(newValue, oldValue) {
          var keywords = newValue.replace(/^\s*|\s*$/g, "");
          this.keywords = keywords;
          this.initFn(keywords);
        }
      },
      editSkuNum: {
        handler: function(newValue, oldValue) {
          var editSkuNum = newValue || 0;
          this.editSkuNum = editSkuNum.replace(/^\s*|\s*$/g, "");
        }
      }
    },
    created: function(o) {
      wx = this.$wx
      app = this.$app
      var that = this
      wx.setNavigationBarTitle({
        title: that.$t('supply.shangpinguanli'),
        showBack: true
      })
    },
    mounted: function() {
      const o = this.$route.query || {};
      this.onLoad(o)
    },
    methods: {
      onLoad: function (options) {
        let currentTab = options.status || 1;
        this.currentTab = currentTab;
        this.initFn();
      },
      initFn: function(keywords=''){
        this.page = 1;
        this.list = [];
        this.loadText = this.$t('supply.jiazaizhong');
        this.noData = 0;
        this.loadMore = true;
        this.getData();
      },

      switchNav: function (e) {
        let that = this;
        let curIdx = e.target.dataset.current*1;
        if (that.currentTab === curIdx) return false;
        let groups = [
          { text: this.$t('supply.shanchu'), type: 'warn', value: 1 },
          { text: this.$t('supply.xiajia'), value: 2 },
          { text: this.$t('supply.xiugaikucun'), value: 5 },
          { text: this.$t('supply.bianji'), value: 3 }
        ]
        if(curIdx==0) {
          groups = [
            { text: this.$t('supply.shanchu'), type: 'warn', value: 1 },
            { text: this.$t('supply.shangjia'), value: 4 },
            { text: this.$t('supply.xiugaikucun'), value: 5 },
            { text: this.$t('supply.bianji'), value: 3 }
          ]
        } else if(curIdx==4){
          groups = [
            { text: this.$t('supply.shanchu'), type: 'warn', value: 1 },
            { text: this.$t('supply.xiugaikucun'), value: 5 },
            { text: this.$t('supply.bianji'), value: 3 }
          ]
        } else if(curIdx==8){
          groups = [
            { text: this.$t('supply.shanchu'), type: 'warn', value: 1 },
            { text: this.$t('supply.xiajia'), value: 2 },
            { text: this.$t('supply.xiugaikucun'), value: 5 }
          ]
        }
        that.currentTab = 1 * e.target.dataset.current;
        that.groups = groups;
        that.initFn();
      },

      getData: function () {
        let that = this;
        let token = wx.getStorageSync('token');
        let grounding = this.currentTab;
        let keywords = this.keywords;

        wx.showLoading();
        app.util.request({
          url: 'entry/wxapp/index',
          data: {
            controller: 'supplymobile.get_supply_goodslist',
            token,
            grounding,
            page: this.page,
            keywords
          },
          dataType: 'json',
          success: function (res) {
            if (res.code == 0) {
              let list = res.data;
              if (list.length == 0) {
                if(that.page==1) {
                  that.noData = 1;
                } else {
                  that.loadMore = false;
                  that.noMore = false;
                  that.loadText = that.$t('supply.meiyougengduojilule');
                }
              }
              if (list.length < 10) that.noMore = true;
              let oldList = that.list;
              list = oldList.concat(list);
              that.page++;
              that.list = list;
            } else {
              wx.showToast({
                title: res.msg || that.$t('supply.qingqiuchucuo'),
                icon: 'none'
              })
              wx.navigateTo({
                url: '/ulink_comshop/pages/user/me',
              })
            }
            wx.hideLoading();
          }
        })
      },

      handleActionsheet: function (e) {
        let idx = (e && e.currentTarget.dataset.index) || 0;
        let id = (e && e.currentTarget.dataset.id) || 0;
        let list = this.list;
        let goodsItem = list[idx];
        let h = {};
        if(id) { this.goodsItem = goodsItem }
        this.showActionsheet = !this.showActionsheet;
      },

      handleBtn(e) {
        let goodsItem = this.goodsItem;
        let goodsId = goodsItem.id;
        let hasoption = goodsItem.hasoption;
        let type = parseInt(e.value); // 1删除 2下架 3编辑 4上下架 5修改库存
        this.handleActionsheet();
        switch(type) {
          case 1:
            this.actionConfirm(this.$t('supply.shifouoshanchugaishangpin')).then(()=>{
              this.delGoods(goodsId)
            });
            break;
          case 2:
            this.actionConfirm(this.$t('supply.shifouxiajiagaishangpin')).then(()=>{
              this.undercarriage(goodsId)
            });
            break;
          case 3:
            console.log('3编辑');
            wx.navigateTo({ url: `/ulink_comshop/moduleB/supply/addGoods?id=${goodsId}` })

            break;
          case 4:
            this.actionConfirm(this.$t('supply.shifoushangjiagaishangpin')).then(()=>{
              this.upcarriage(goodsId)
            });
            break;
          case 5:
            // 修改库存
            if(hasoption==1) {
              wx.navigateTo({ url: `/ulink_comshop/moduleB/supply/editSku?id=${goodsId}` })
            } else {
              // 显示弹窗
              this.editSkuVisible = true;
              this.editSkuNum = goodsItem.total || 0;
            }
            break;
          default:
            console.log('默认操作')
        }
      },

      undercarriage: function (goods_id) {
        let that = this;
        let token = wx.getStorageSync('token');
        wx.showLoading();
        app.util.request({
          url: 'entry/wxapp/index',
          data: {
            controller: 'supplymobile.down_supply_goods',
            token,
            goods_id
          },
          dataType: 'json',
          success: function (res) {
            wx.hideLoading();
            if (res.code == 0) {
              let list = that.list || [];
              list = list.filter(item=>item.id!=goods_id);
              if(list.length==0) that.noData = 1;
              that.list = list;
              wx.showToast({
                title: that.$t('supply.xiajiachenggong'),
                icon: 'none'
              })
            } else {
              wx.showToast({
                title: res.msg || that.$t('supply.qingqiuchucuo'),
                icon: 'none'
              })
            }
          }
        })
      },

      upcarriage: function (goods_id) {
        let that = this;
        let token = wx.getStorageSync('token');
        wx.showLoading();
        app.util.request({
          url: 'entry/wxapp/index',
          data: {
            controller: 'supplymobile.up_supply_goods',
            token,
            goods_id
          },
          dataType: 'json',
          success: function (res) {
            wx.hideLoading();
            if (res.code == 0) {
              let list = that.list || [];
              list = list.filter(item=>item.id!=goods_id);
              if(list.length==0) that.noData = 1;
              that.list = list;
              wx.showToast({
                title: that.$t('supply.shangjiachenggong'),
                icon: 'none'
              })
            } else {
              wx.showToast({
                title: res.msg || that.$t('supply.qingqiuchucuo'),
                icon: 'none'
              })
            }
          }
        })
      },

      delGoods: function (goods_id) {
        let that = this;
        let token = wx.getStorageSync('token');
        wx.showLoading();
        app.util.request({
          url: 'entry/wxapp/index',
          data: {
            controller: 'supplymobile.delete_supply_goods',
            token,
            goods_id
          },
          dataType: 'json',
          success: function (res) {
            wx.hideLoading();
            if (res.code == 0) {
              let list = that.list || [];
              list = list.filter(item=>item.id!=goods_id);
              let h = {};
              if(list.length==0) that.noData = 1;
              that.list = list;
              wx.showToast({
                title: that.$t('supply.shanchuchenggong'),
                icon: 'none'
              })
            } else {
              wx.showToast({
                title: res.msg || that.$t('supply.qingqiuchucuo'),
                icon: 'none'
              })
            }
          }
        })
      },

      actionConfirm: function(content) {
        var that = this;
        return new Promise((resolve, reject)=>{
          wx.showModal({
            title: that.$t('supply.tishi'),
            content,
            showCancel: true,
            success: (result) => {
              if (result.confirm) {
                resolve();
              } else if (result.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        })
      },

      editSku: function(e){
        var that = this;
        if(e.index==0) {
          this.editSkuVisible = false;
          console.log(this.editSkuVisible)
        } else {
          let editSkuNum = this.editSkuNum;
          if(editSkuNum==='') {
            return wx.showToast({
              title: that.$t('supply.qingshuruzhengquedeshuliang'),
              icon: 'none'
            })
          }
          this.subSku();
        }
      },

      subSku: function(){
        var that = this;
        let goodsItem = this.goodsItem;
        let goodsId = goodsItem.id;
        console.log(goodsId);
        let editSkuNum = this.editSkuNum;
        let token = wx.getStorageSync('token');

        app.util.request({
          url: 'entry/wxapp/index',
          data: {
            controller: 'supplymobile.modify_supply_goods_quantity',
            token,
            goods_id: goodsId,
            is_has_option: 0,
            quantity: editSkuNum
          },
          dataType: 'json',
          success: function (res) {
            if (res.code == 0) {
              let list = that.list || [];
              list.map(item=>{ if(item.id == goodsId) item.total = editSkuNum; })
              that.list = list;
              that.editSkuVisible = false;
              that.editSkuNum = 0;
              that.goodsItem = '';
              wx.showToast({
                title: that.$t('supply.xiugaichenggong'),
                icon: 'none'
              })
            } else {
              wx.showToast({
                title: res.msg || that.$t('supply.qingqiuchucuo'),
                icon: 'none'
              })
              wx.navigateTo({
                url: '/ulink_comshop/pages/user/me',
              })
            }
          }
        })
      },

      onReachBottom: function () {
        if (!this.loadMore) return false;
        this.getData();
      },

      toAddGoods:function () {
        wx.navigateTo({ url: `/ulink_comshop/moduleB/supply/addGoods` })
      }

    }
  }
</script>

<style scoped>
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
  width: 10vw;
  height: 10vw;
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

.p15 {
  padding: 3vw;
}

.bg-f {
  background-color: #fff;
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

.i-flex {
  display: flex;
}

.i-flex-item {
  flex: 1;
}

.ml10 {
  margin-left: 2vw;
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

.red {
  color: #ff5344;
}

.mt10 {
  margin-top: 2vw;
}

.fsz-24 {
  font-size: 2.4vw;
}

.mt-auto {
  margin-top: auto;
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-more:before {
  content: "\e626";
}

.fsz-36 {
  font-size: 3.6vw;
}
</style>
