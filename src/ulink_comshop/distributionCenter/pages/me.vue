<template>
  <div class="wrap">
    <div class='user-info i-flex i-flex-alc bor-bottom'>
      <img class='avatar' :src='member_info.avatar'/>
      <div class='i-flex-item'>
        <div class='nickname'>{{member_info.username}}</div>
        <div class='userid'>ID：{{member_info.member_id}}</div>
        <!-- <div class='invote'>邀请人：{{info.share_name||'无'}}</div> -->
        <div class='invote' v-if="parent_info">{{$t('distributionCenter.zhishushangji')}}：{{parent_info.username||$t('distributionCenter.wu')}}</div>
        <div class='invote' v-else>{{$t('distributionCenter.zhishushangji')}}：{{$t('distributionCenter.wu')}}</div>
      </div>
    </div>
    <div class='money i-flex i-flex-alc bor-bottom'>
      <div class='i-flex-item'>
        <div class="recharge-money">{{info.money}}</div>
        <div class="recharge-tip">{{$t('distributionCenter.ketixianjine')}}</div>
      </div>
      <div class='btn' @click="goLink" data-link='/ulink_comshop/distributionCenter/pages/excharge'>
        <button type="button" class="button">{{$t('distributionCenter.tixian')}}</button>
      </div>
    </div>
    <div class='menu'>
      <div @click="goLink" data-link='/ulink_comshop/distributionCenter/pages/member'>
        <div class="item-main i-flex i-flex-alc bor-bottom">
          <div class="item-title i-flex-item">{{$t('distributionCenter.wodefensi')}}</div>
          <div class="tool-right">
            <img class="icon-right " src="@/assets/images/rightArrowImg.png"/>
          </div>
        </div>
      </div>
      <div @click="goLink" data-link='/ulink_comshop/distributionCenter/pages/goodsDetails'>
        <div class="item-main i-flex i-flex-alc bor-bottom">
          <div class="item-title i-flex-item">{{$t('distributionCenter.tuiguangshouyi')}}</div>
          <div class="tool-right">
            <img class="icon-right " src="@/assets/images/rightArrowImg.png"/>
          </div>
        </div>
      </div>
      <!-- <div @click="goLink" data-link='/ulink_comshop/distributionCenter/pages/share'>
        <div class="item-main i-flex i-flex-alc">
          <div class="item-title i-flex-item">{{$t('distributionCenter.wodeerweima')}}</div>
          <div class="tool-right">
            <img class="icon-right " src="@/assets/images/rightArrowImg.png"/>
          </div>
        </div>
      </div> -->
    </div>
    <i-new-auth :needAuth="needAuth&&showAuthModal" @authSuccess="authSuccess" @cancel="authModal"></i-new-auth>
  </div>
</template>

<script>
  import GlobalMixin from '../../mixin/globalMixin.js';
  import status from '../../utils/index.js'
  import util from '../../utils/index.js'
  var app,wx
  export default {
    mixins: [GlobalMixin],
    name:'distributionCenter-me',
    data() {
      return {
        info: [],
        member_info: {
          username: '',
          member_id: 1,
          avatar: "@/assets/images/head-bitmap.png"
        },
        info: {
          total_money: 0,
          share_name: '无'
        },
        needAuth: false,
        showAuthModal: false,
      }
    },
    created: function() {
      wx = this.$wx
      app = this.$app
      var that = this;
      let commiss_diy_name = wx.getStorageSync('commiss_diy_name') || that.$t('distributionCenter.fenxiao');
      wx.setNavigationBarTitle({
        title: commiss_diy_name + that.$t('distributionCenter.zhongxin'),
        showBack: true
      })
      that.onShow();
    },
    methods: {
      onShow: function () {
        let that = this;
        util.check_login_new().then((res) => {
          if (res) {
            that.needAuth = false;
            that.getUser();
            that.getData();
          } else {
            that.needAuth = true;
          }
        })
      },

      /**
       * 授权成功回调
       */
      authSuccess: function () {
        let that = this;
        that.needAuth = false;
        that.getUser();
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
        wx.showLoading();
        var token = wx.getStorageSync('token');
        let that = this;
        app.util.request({
          url: 'entry/wxapp/user',
          data: {
            controller: 'distribution.get_commission_info',
            token: token
          },
          dataType: 'json',
          success: function (res) {
            wx.hideLoading();
            if (res.code == 0) {
              let parent_info = res.parent_info;
              that.info = res.data;
              that.parent_info = parent_info;
            } else {
              wx.showModal({
                title: that.$t('distributionCenter.tishi'),
                content: res.data.msg,
                showCancel: false,
                success(res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                    wx.redirectTo({
                      url: '/ulink_comshop/pages/user/me',
                    })
                  }
                }
              })
            }
          }
        })
      },

      getUser: function(){
        var token = wx.getStorageSync('token');
        let that = this;
        app.util.request({
          url: 'entry/wxapp/user',
          data: {
            controller: 'user.get_user_info',
            token: token
          },
          dataType: 'json',
          success: function (res) {
            wx.hideLoading();
            if (res.code == 0) {
              that.member_info = res.data;
            } else {
              //is_login
              that.needAuth = true;
              wx.setStorage({
                key: "member_id",
                data: null
              })
            }
          }
        })
      },

      goLink: function (event) {
        if (!this.authModal()) return;
        let link = event.currentTarget.dataset.link;
        wx.navigateTo({
          url: link
        })
      },
    }
  }
</script>

<style scoped>
.wrap {
  background-color: #fff;
}

.user-info {
  padding: 3vw;
}

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

.userid,.invote {
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
  border-bottom: 1rpx solid #efefef;
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

.button {
  background-color: #ce3c39;
  color: #ffffff;
  font-size: 2.4vw;
  border-radius: 5px;
  width: 18vw;
  height: 7.5vw;
}
</style>
