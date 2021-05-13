<template>
  <div class="wrap bg-f">
    <div class='user-info p15 i-flex i-flex-alc bor-bottom'>
      <img class='avatar' :src='member_info.avatar'/>
      <div class='i-flex-item'>
        <div class='nickname'>{{member_info.username}}</div>
      </div>
    </div>
    <div class='money i-flex i-flex-alc bor-bottom'>
      <div class='i-flex-item'>
        <div class="recharge-money">{{supply_commiss.money}}</div>
        <div class="recharge-tip">{{$t('supply.ketixianjine')}}</div>
      </div>
      <!-- <div class='btn' @click="goLink" data-link='/ulink_comshop/moduleB/supply/excharge'>
        <button type='warn' size='mini'>提现</button>
      </div> -->
    </div>
    <div class='menu'>
      <!-- <div @click="goLink" data-link='/ulink_comshop/distributionCenter/pages/member'>
        <div class="item-main i-flex i-flex-alc bor-bottom">
          <div class="item-title i-flex-item">收支记录</div>
          <div class="tool-right">
            <img class="icon-right " src="@/assets/images/rightArrowImg.png"/>
          </div>
        </div>
      </div> -->
      <div>
        <div class="item-main i-flex i-flex-alc bor-bottom">
          <div class="item-title i-flex-item">{{$t('supply.weijiesuanjine')}}</div>
          <div class="tool-right">
            ${{supply_commiss.dongmoney}}
          </div>
        </div>
      </div>
      <div>
        <div class="item-main i-flex i-flex-alc">
          <div class="item-title i-flex-item">{{$t('supply.yijiesuanjine')}}</div>
          <div class="tool-right">
            ${{supply_commiss.getmoney}}
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
    name:'supply-moneyManage',
    components: {'i-supply-tabbar': Tabbar},
    data() {
      return {
        currentIndex: 4,
        member_info: {},
        supply_commiss: {}
      }
    },
    created: function() {
      wx = this.$wx
      app = this.$app
      var that = this;
      wx.setNavigationBarTitle({
        title: that.$t('supply.zijinguanli'),
        showBack: true
      })
      this.onLoad();
    },
    methods: {
      onLoad: function () {
        this.getData();
      },

      getData: function(){
        let token = wx.getStorageSync('token');
        var that = this;
        app.util.request({
          url: "entry/wxapp/index",
          data: {
            controller: "supplymobile.supply_managemoney_panel",
            token
          },
          dataType: "json",
          method: 'POST',
          success: function(res) {
            if (res.code == 0) {
              let { member_info, supply_commiss } = res.data;
              that.member_info = member_info;
              that.supply_commiss = supply_commiss;
            } else {
              wx.showModal({
                title: that.$t('supply.tishi'),
                content: res.msg,
                showCancel: false
              })
              wx.navigateTo({
                url: "/ulink_comshop/pages/user/me"
              });
            }
          }
        })
      },

      goLink: function (event) {
        let link = event.currentTarget.dataset.link;
        wx.navigateTo({
          url: link
        })
      }
    }
  }
</script>

<style scoped>
.user-info .avatar {
  width: 12vw;
  height: 12vw;
  margin-right: 2vw;
  border-radius: 50%;
}

.nickname {
  font-size: 3.2vw;
  font-weight: bold;
  color: #000;
}

.userid,
.invote {
  font-size: 2.6vw;
  margin-top: 1vw;
}

.money {
  padding: 2vw 3vw;
}

.bor-bottom {
  position: relative;
}

.bor-bottom::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 1px;
  transform: scaleY(.5);
  border-bottom: 0.1vw solid #efefef;
}

.item-main {
  padding: 3.2vw 4vw;
}

.item-title {
  height: 4vw;
  width: 40vw;
  color: #444;
  font-size: 2.8vw;
  display: flex;
  align-items: center;
}

.icon-right {
  width: 1.2vw;
  height: 2.2vw;
}

.recharge-money {
  color: #ce3c39;
  font-size: 5vw;
}

.recharge-tip {
  color: #999;
  font-size: 2.4vw;
}

.bg-f {
  background-color: #fff;
}

.p15 {
  padding: 3vw;
}

.i-flex {
  display: flex;
}

.i-flex-item {
  flex: 1;
}

.i-flex-alc {
  justify-content: center;
  align-items: center;
}
</style>
