<template>
  <div>
    <div class="groupCenter">
      <div class="basicInform">
        <div class="user-avatar">
          <img class="userAvatarUrl" :src="member_info.avatar"/>
        </div>
        <div class="userInfo">
          <div class="user-name">
            <span>{{community_info.head_name}}</span>
            <div @click="goEdit" class="edit-name">
              <span class="iconfont icon-edit"></span>
              <span>{{$t('host.bianji')}}</span>
            </div>
          </div>
          <div class="userId">
            <span>ID：{{community_info.re_id}}</span>
            <div @click="goScan" class="scan-code">
              <span class="iconfont icon-erweima icon-scan"></span>
            </div>
          </div>
          <div @click="changeMycommunion" class="address text-overflow1" style="width:200px;">
            {{$t('host.bangding')}}&nbsp;{{groupInfo.group_name}}：{{community_info.community_name}}<span class="iconfont icon-youjiantou"></span>
          </div>
          <div class="address" v-if="community_info.is_show_head_level==1">
            <span>{{groupInfo.owner_name}}{{$t('host.dengji')}}{{community_info.head_level_info.levelname}}(分佣比例:{{community_info.head_level_info.commission}}%)</span>
          </div>
        </div>
      </div>
      <div class="distributionCon">
        <div class="distribution">
          <div class="myDistribution">
            <span>{{groupInfo.owner_name}}&nbsp;{{$t('host.gaikuang')}}</span>
          </div>
          <div class="incomeCon">
            <div class="income">
              <span class="incomeTop">{{commission_info.mix_total_money}}</span>
              <span class="incomeBottom">{{$t('host.zongshouru')}}</span>
            </div>
            <div class="income">
              <span class="incomeTop">{{total_order_count}}</span>
              <span class="incomeBottom">{{$t('host.zongdingdan')}}</span>
            </div>
            <div @click="goLink" class="income" data-url="/lionfish_comshop/pages/groupCenter/memberList">
              <span class="incomeTop">{{total_member_count}}</span>
              <span class="incomeBottom">{{$t('host.huiyuanshu')}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="effectData">
        <div class="effect">
          <div class="myEffect">
            <span>{{$t('host.jinrixiangqing')}}</span>
          </div>
          <div class="incomeCon">
            <div class="income">
              <span class="incomeTop">{{today_order_count}}</span>
              <div class="incomeBottom" data-type="1">
                <span>{{$t('host.dingdanzongshu')}}</span>
              </div>
            </div>
            <div class="income">
              <span class="incomeTop">{{today_effect_order_count}}</span>
              <div class="incomeBottom" data-type="2">
                <span>{{$t('host.youxiaodingdan')}}</span>
              </div>
            </div>
            <div class="income">
              <span class="incomeTop">{{today_pay_order_count}}</span>
              <div class="incomeBottom" data-type="3">
                <span>{{$t('host.fukuanrenshu')}}</span>
              </div>
            </div>
            <div class="income">
              <span class="incomeTop">{{head_today_pay_money}}</span>
              <div class="incomeBottom" data-type="3">
                <span>{{$t('host.xiaoshoue')}}</span>
              </div>
            </div>
          </div>
          <div class="incomeCon">
            <div class="income">
              <span class="incomeTop">{{today_add_head_member}}</span>
              <div class="incomeBottom" data-type="1">
                <span>{{$t('host.xinzenghuiyuanshu')}}</span>
              </div>
            </div>
            <div class="income">
              <span class="incomeTop">{{today_after_sale_order_count}}</span>
              <div class="incomeBottom" data-type="2">
                <span>{{$t('host.shouhoudingdan')}}</span>
              </div>
            </div>
            <div class="income">
              <span class="incomeTop">{{today_pre_total_money}}</span>
              <div class="incomeBottom" data-type="3">
                <span>{{$t('host.yugushouru')}}</span>
              </div>
            </div>
            <div class="income">
              <span class="incomeTop">{{today_invite_head_member}}</span>
              <div class="incomeBottom" data-type="3">
                <span>{{$t('host.jinrifangke')}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="groupCenterCon">
        <div class="order" v-if="isShow">
          <div class="myOrders">
            <span>{{$t('host.wodetuandan')}}</span>
            <div @click="goOrder" class="allGroupOrder" data-status="0">
              <span>{{$t('host.chakanquanbu')}}</span>
              <img class="rightArrowImg" src="@/assets/images/rightArrowImg.png"/>
            </div>
          </div>
          <div class="orderTab">
            <div @click="goOrder" class="order_status" data-status="1">
              <span class="num" v-if="waitSendNum!=0">{{waitSendNum}}</span>
              <img class="distributionIcon" src="@/assets/images/distributionIcon-order.png"/>
              <span>{{$t('common.daipeisong')}}</span>
            </div>
            <div @click="goOrder" class="order_status" data-status="2">
              <span class="num" v-if="waitSignNum!=0">{{waitSignNum}}</span>
              <img class="receiveIcon" src="@/assets/images/receiveIcon-order.png"/>
              <span>{{$t('common.daiqianshou')}}</span>
            </div>
            <div @click="goOrder" class="order_status" data-status="3">
              <span class="num" v-if="waitPickNum!=0">{{waitPickNum}}</span>
              <img class="needPickIcon" src="@/assets/images/needPickIcon-order.png"/>
              <span>{{$t('common.daitihuo')}}</span>
            </div>
            <div @click="goOrder" class="order_status" data-status="4">
              <span class="num" v-if="completeNum!=0">{{completeNum}}</span>
              <img class="completeIcon" src="@/assets/images/completeIcon-order.png"/>
              <span>{{$t('common.yiwancheng')}}</span>
            </div>
          </div>
        </div>
        <div class="record">

          <router-link hoverClass="none" to="/lionfish_comshop/pages/groupCenter/groupTime" v-if="isShow">
            <div class="recordList">
              <span class="recordListTit">Set Work Time</span>
              <img class="rightArrowImg" src="@/assets/images/rightArrowImg.png"/>
            </div>
          </router-link>

          <!--
          <s hoverClass="none" href="#/lionfish_comshop/pages/groupCenter/communityMembers" v-if="isShow">
            <div class="recordList">
              <span class="recordListTit">{{groupInfo.group_name}}用户</span>
              <div class="rightText">待核销 <img class="rightArrowImg" src="@/assets/images/rightArrowImg.png"/>
              </div>
            </div>
          </s>

          <a hoverClass="none" href="#/lionfish_comshop/moduleA/solitaire/groupIndex" v-if="is_open_solitaire==1">
            <div class="recordList">
              <span class="recordListTit">接龙中心</span>
              <img class="rightArrowImg" src="@/assets/images/rightArrowImg.png"/>
            </div>
          </a>
          <a hoverClass="none" href="#/lionfish_comshop/pages/groupCenter/distributionList">
            <div class="recordList">
              <span class="recordListTit">{{$t('host.jiesuanjilu')}}</span>
              <img class="rightArrowImg" src="@/assets/images/rightArrowImg.png"/>
            </div>
          </a>
          <a hoverClass="none" href="#/lionfish_comshop/pages/groupCenter/wallet">
            <div class="recordList">
              <span class="recordListTit">{{$t('host.wodeqianbao')}}</span>
              <img class="rightArrowImg" src="@/assets/images/rightArrowImg.png"/>
            </div>
          </a>
          <a hoverClass="none" style="display:none;" href="#/lionfish_comshop/pages/groupCenter/settlementList">
            <div class="recordList borNone">
              <span class="recordListTit">{{$t('host.jiesuanjilu')}}</span>
              <img class="rightArrowImg" src="@/assets/images/rightArrowImg.png"/>
            </div>
          </a>
          <a hoverClass="none" href="#/lionfish_comshop/pages/groupCenter/list">
            <div class="recordList">
              <span class="recordListTit">{{$t('host.qingdanliebiao')}}</span>
              <img class="rightArrowImg" src="@/assets/images/rightArrowImg.png"/>
            </div>
          </a>
          <a hoverClass="none" href="#/lionfish_comshop/pages/groupCenter/closure" v-if="open_community_addhexiaomember==1">
            <div class="recordList">
              <span class="recordListTit">核销管理</span>
              <img class="rightArrowImg" src="@/assets/images/rightArrowImg.png"/>
            </div>
          </a>
	  -->

          <a hoverClass="none" href="#/lionfish_comshop/pages/groupCenter/gruopInfo" v-if="open_community_head_leve>0">
            <div class="recordList borNone">
              <span class="recordListTit">{{groupInfo.owner_name}}{{commiss_diy_name}}</span>
              <img class="rightArrowImg" src="@/assets/images/rightArrowImg.png"/>
            </div>
          </a>
        </div>
      </div>
    </div>
    <div @click="confirmMessage" class="hide-dialog" v-if="dialogShow"></div>
    <div class="dialog-tips" v-if="dialogShow">
      <div class="dialog-title">
        <span>{{explainTitle}}</span>
      </div>
      <div class="dialog-content">
        <span>{{explainContent}}</span>
      </div>
      <button @click="confirmMessage" class="dialog-btn">
        <span>我知道了</span>
      </button>
    </div>
  </div>

</template>

<script>
  import GlobalMixin from '../../mixin/globalMixin.js';
  import status from '../../utils/index.js'
  export default {
    mixins: [GlobalMixin],
    name:'groupcenter-index',
    data() {
      return {
        waitSendNum: 0,
        waitSignNum: 0,
        waitPickNum: 0,
        completeNum: 0,
        disUserId: "",
        communityName: "",
        communityId: "",
        distribution: "",
        estimate: "",
        lastMonth: "",
        isShow: !0,
        currentTab: 0,
        show_on_one: 0,
        dialogShow: 0,
        effectValidOrderNum: 0,
        groupInfo: {
          group_name: "社区",
          owner_name: "团长"
        },

        member_info: {},
        community_info: {},
        commission_info: {},
        total_order_count:  0,
        total_member_count:  0,
        today_order_count: 0,
        today_effect_order_count:  0,
        today_pay_order_count:  0,
        today_pre_total_money:  0,
        waitSendNum:  0,
        waitSignNum:  0,
        waitPickNum:  0,
        completeNum:  0,
        open_community_addhexiaomember: 0,
        open_community_head_leve: 0,
        head_today_pay_money: 0,
        today_add_head_member: 0,
        today_after_sale_order_count: 0,
        today_invite_head_member: 0,
        is_open_solitaire: 0,

        effectEstimate: 0,
        effectSettle: 0,
        appLoadStatus:1
      }
    },
    created: function() {
      this.onLoad();
    },
    methods: {
      onLoad: function() {
        var o = this;

        status.setGroupInfo().then(function(t) {
          var e = t && t.owner_name || "团长";
//          o.$store.state.app.toolbarTitle = e + "中心"
          o.$wx.setNavigationBarTitle({
            title: e + " Center",
            showLogo: false,
            showMore: false,
            showBack: true
          })
          , o.groupInfo= t;
        }), this.loadPage();
      },
      loadPage: function() {

        let that = this;
        status.loadStatus().then(function () {

          let appLoadStatus = 1;//this.$getApp().globalData.appLoadStatus;
          if (appLoadStatus == 0) {
            //未登录
            this.$wx.redirectTo({
              url: "/lionfish_comshop/pages/user/me"
            })
          } else if (appLoadStatus == 2) {
            // this.$wx.redirectTo({
            //  url: "/lionfish_comshop/pages/position/community"
            // })
          }

            that.appLoadStatus= appLoadStatus;
//            that.community= this.$getApp().globalData.community;

        });
        this.load_community_data();
      },
      load_community_data: function() {
        var token = this.$wx.getStorageSync("token");
        var c = this;
        this.$http({
            controller: "community.get_community_info",
            token: token
          }).then(t=> {

              console.log(t);
            if (0 == t.code) {
              var e = t, o = e.commission_info;
              o.mix_total_money = o.mix_total_money.toFixed(2);
              var a = t, n = a.head_today_pay_money, i = a.today_add_head_member, r = a.today_after_sale_order_count, s = a.today_invite_head_member, u = a.is_open_solitaire;
              c.member_info= e.member_info,
                c.community_info= e.community_info,
                c.commission_info= o,
                c.total_order_count= e.total_order_count || 0,
                c.total_member_count= e.total_member_count || 0,
                c.today_order_count= e.today_order_count || 0,
                c.today_effect_order_count= e.today_effect_order_count || 0,
                c.today_pay_order_count= e.today_pay_order_count || 0,
                c.today_pre_total_money= e.today_pre_total_money || 0,
                c.waitSendNum= e.wait_send_count || 0,
                c.waitSignNum= e.wait_qianshou_count || 0,
                c.waitPickNum= e.wait_tihuo_count || 0,
                c.completeNum= e.has_success_count || 0,
                c.open_community_addhexiaomember= e.open_community_addhexiaomember,
                c.open_community_head_leve= e.open_community_head_leve,
                c.head_today_pay_money= n,
                c.today_add_head_member= i,
                c.today_after_sale_order_count= r,
                c.today_invite_head_member= s,
                c.is_open_solitaire= u;
            } else this.$wx.redirectTo({
              url: "/lionfish_comshop/pages/user/me"
            });

        });
      },
      goScan: function() {
//        this.$wx.scanCode({
//          success: function(t) {
//            console.log(t), "WX_CODE" == t.scanType && "" != t.path && this.$wx.redirectTo({
//              url: "/" + t.path
//            });
//          }
//        });
      },
      onShow: function() {
        var t = this.show_on_one, e = this.$wx.getStorageSync("commiss_diy_name") || "分销";
        0 < t && this.load_community_data(), this.show_on_one= 1,
          this.commiss_diy_name= e;
      },
      goOrder: function(t) {
        var e = t.currentTarget.dataset.status;
        this.$wx.redirectTo({
          url: "/lionfish_comshop/pages/groupCenter/groupList?tab=" + e
        });
      },
      goEdit: function() {
        this.$wx.redirectTo({
          url: "/lionfish_comshop/pages/groupCenter/setting?id=" + this.data.community_info.id
        });
      },
      switchNav: function(t) {
        if (this.currentTab === 1 * t.target.dataset.current) return !1;
        this.currentTab= 1 * t.target.dataset.current;
      },
      bindChange: function(t) {
        this.currentTab= 1 * t.detail.current;
        for (var e = 0; e < 4; e++)
            if (this.currentTab === e)
              this.effectEstimate= this.effectList[e].estimate,
              this.effectSettle= this.effectList[e].settle,
              this.effectValidOrderNum= this.effectList[e].validOrderNum;

      },
      changeMycommunion: function() {
        var t = this.community_info.id;
        console.log(t);
        var e = this.$wx.getStorageSync("token"), o = this;
        void 0 !== t && this.$http({

            controller: "index.addhistory_community",
            community_id: t,
            token: e
          }).then(t=> {
            console.log("s1"), o.getCommunityInfo().then(function() {
              console.log("s2"), this.$getApp().globalData.changedCommunity = !0, this.$wx.redirectTo({
                url: "/lionfish_comshop/pages/index/index"
              });
            });
        });
      },
      getCommunityInfo: function() {
        return new Promise(function(o, t) {
          var e = this.$wx.getStorageSync("token");
          this.$http({
              controller: "index.load_history_community",
              token: e
            }).then(t=> {
              if (0 == t.code) {
                var e = t.list;
                0 < Object.keys(e).length || 0 != e.communityId ? (this.$wx.setStorageSync("community", e),
                  this.$getApp().globalData.community = e, o(e)) : o("");
              }
          });
        });
      },
      goLink: function(event) {
        let link = event.currentTarget.dataset.link;
        this.$wx.redirectTo({
          url: link
        })
      },
    }
  }
</script>
<style>
  @import "index.less";
</style>
