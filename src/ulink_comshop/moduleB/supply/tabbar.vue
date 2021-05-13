<template>
  <i-fixed-bottom>
    <div :class="isIpx?'tabbar-box py10 i-flex text-center shadow-top fsz-24 pb20':'tabbar-box py10 i-flex text-center shadow-top fsz-24'">
      <div :class="data==2?'tabbar i-flex-item active':'tabbar i-flex-item'" @click="goLink" data-link="/ulink_comshop/moduleB/supply/index">
        <span class="iconfont icon-shouye"></span>
        <div class="mt5">{{$t('supply.guanlishouye')}}</div>
      </div>
      <div :class="data==0?'tabbar i-flex-item active':'tabbar i-flex-item'" @click="goLink" data-link="/ulink_comshop/moduleB/supply/goodsManage">
        <span class="iconfont icon-goods-manage"></span>
        <div class="mt5">{{$t('supply.shangpinguanli')}}</div>
      </div>
      <div :class="data==1?'tabbar i-flex-item active':'tabbar i-flex-item'" @click="goLink" data-link="/ulink_comshop/moduleB/supply/orderManage">
        <span class="iconfont icon-order-manage"></span>
        <div class="mt5">{{$t('supply.dingdanguanli')}}</div>
      </div>
      <!-- <div class="{{data==3?'tabbar i-flex-item active':''}}" @click="goLink" :data-link="">
        <span class="iconfont icon-refund-manage"></span>
        <div class="mt5">售后管理</div>
      </div> -->
      <div :class="data==4?'tabbar i-flex-item active':'tabbar i-flex-item'" @click="goLink" data-link="/ulink_comshop/moduleB/supply/moneyManage">
        <span class="iconfont icon-money-manage"></span>
        <div class="mt5">{{$t('supply.zijinguanli')}}</div>
      </div>
    </div>
  </i-fixed-bottom>
</template>

<script>
  var app,wx
  export default {
    name: 'supply-tabbar',
    data() {
      return {
      }
    },
    props: {
      isIpx: {
        type: Boolean,
        default: !1
      },
      data: {
        type: Number,
        default: 2
      }
    },
    created: function() {
      wx = this.$wx
      app = this.$app
    },
    methods: {
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
.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-shouye:before {
  content: "\e67a";
}

.icon-goods-manage:before {
  content: "\e618";
}

.icon-order-manage:before {
  content: "\e620";
}

.icon-money-manage:before {
  content: "\e619";
}


.i-flex {
  display: flex;
}

.i-flex-item {
  flex: 1;
}

.py10 {
  padding-top: 2vw!important;
  padding-bottom: 2vw!important;
}

.text-center {
  text-align: center;
}

.shadow-top {
  box-shadow: 0px -3px 5px -2px #ccc;
}

.fsz-24 {
  font-size: 2.4vw;
}

.pb20 {
  padding-bottom: 4vw;
}

.mt5 {
  margin-top: 1vw;
}


.tabbar {
  line-height: 1;
}

.tabbar.active {
  color: #fe8464;
}

.tabbar .iconfont {
  font-size: 4.4vw;
}

.tabbar-home {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.tabbar-home .iconfont {
  display: inline-block;
  position: absolute;
  background: #fe8464;
  border-radius: 50%;
  width: 10vw;
  height: 10vw;
  line-height: 10vw;
  border: 1vw solid #fff;
  top: -5vw;
  left: 50%;
  margin-left: -6vw;
  color: #fff;
}
</style>
