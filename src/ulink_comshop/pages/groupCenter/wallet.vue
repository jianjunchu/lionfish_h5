<template>
  <div>
    <div>
      <div class="basicInForm">
        <div class="today-box">
          <div class="today-income">{{$t('wallet.jinrishouru')}}</div>
          <div class="today-income-money">{{today_all_total_money}}</div>
        </div>
        <div class="flex other-income">
          <div class="flex-item other-item">
            <div class="income-title">{{$t('wallet.benyueshouru')}}</div>
            <div class="income-money">{{month_pre_total_money}}</div>
          </div>
          <div class="flex-item other-item">
            <div class="income-title">{{$t('wallet.leijishouru')}}</div>
            <div class="income-money">{{commission_info.mix_total_money}}</div>
          </div>
        </div>
      </div>
      <div class="income-data">
        <div class="common-title">
          <span class="subtit">{{$t('wallet.daiquerenshouru')}}</span>
          <a class="common-nav" href="#/ulink_comshop/pages/groupCenter/detailsList?type=1">{{$t('wallet.dingdanmingxi')}}</a>
        </div>
        <div class="common-money">{{wait_sub_total_money}}</div>

        <div class="common-title">
          <span class="subtit">{{$t('wallet.ketixianjine')}}</span>
          <a class="common-nav" href="#/ulink_comshop/pages/groupCenter/detailsList?type=2">{{$t('wallet.dingdanmingxi')}}</a>
        </div>
        <div class="common-money">{{commission_info.money}}</div>

        <div class="common-title">
          <span class="subtit">{{$t('wallet.yidakuanjine')}}</span>
          <a class="common-nav" href="#/ulink_comshop/pages/groupCenter/cashList">{{$t('wallet.tixianjilu')}}</a>
        </div>
        <div class="common-money">{{tixian_sucess_money}}</div>
      </div>
      <div @click="cashMoney" class="income-btn">{{$t('wallet.tixian')}}</div>
    </div>
    <i-dialog @cancel="cancel" @confirm="confirm" :text="$t('wallet.querentixian')" :visible="showDialog"></i-dialog>
  </div>

</template>

<script>
  import GlobalMixin from '../../mixin/globalMixin.js';
  import status from '../../utils/index.js'
  import util from '../../utils/index.js'
  export default {
    mixins: [GlobalMixin],
    name:'groupcenter-wallet',
    data() {
      return {
        showDialog: !1,
        member_info: {},
        community_info: {},
        commission_info: {},
        total_order_count: 0,
        total_member_count: 0,
        today_order_count: 0,
        today_effect_order_count: 0,
        today_pay_order_count: 0,
        today_pre_total_money: 0,
        today_all_total_money: 0,
        month_pre_total_money: 0,
        pre_total_money: 0,
        wait_sub_total_money: 0,
        tixian_sucess_money: 0
      }
    },
    created: function() {
      this.$wx.setNavigationBarTitle({
        title: '',
        showLogo:false,
        showMore:false,
        showBack:true
      })
      this.onShow();
    },
    methods: {
      cashMoney: function() {
        var community_info = this.community_info;
//        3 < getCurrentPages().length ? wx.redirectTo({
//          url: "/ulink_comshop/pages/groupCenter/editInfo"
//        }) : wx.navigateTo({
//          url: "/ulink_comshop/pages/groupCenter/editInfo"
//        });
        this.$wx.redirectTo({
          url: "/ulink_comshop/pages/groupCenter/editInfo"
        })
      },
      confirm: function() {
        this.showDialog= !1;
      },
      cancel: function() {
        this.showDialog= !1;
      },
      onReady: function() {},
      onShow: function() {
        var t = this.$wx.getStorageSync("token");
        var o = this;
        this.$http({
            controller: "community.get_community_info",
            token: t
          }).then(t=> {
              console.log(t,"get_community_info");
              if( 0 == t.code) {
                  o.member_info= t.member_info,
                  o.community_info= t.community_info,
                  o.commission_info= t.commission_info,
                  o.total_order_count= t.total_order_count,
                  o.total_member_count= t.total_member_count,
                  o.today_order_count= t.today_order_count,
                  o.today_effect_order_count= t.today_effect_order_count,
                  o.today_pay_order_count= t.today_pay_order_count,
                  o.today_pre_total_money= t.today_pre_total_money,
                  o.today_all_total_money= t.today_all_total_money,
                  o.month_pre_total_money= t.month_pre_total_money,
                  o.pre_total_money= t.pre_total_money,
                  o.wait_sub_total_money= t.wait_sub_total_money,
                  o.tixian_sucess_money= t.tixian_sucess_money;
              }else {
                this.$wx.redirectTo({
                  url: "/ulink_comshop/pages/user/me"
                });
              }
        });
      }
    }
  }
</script>
<style>
  @import "wallet.less";
</style>
