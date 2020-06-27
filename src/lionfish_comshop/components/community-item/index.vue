<template>
  <div @click="chooseCommunity" class="community-item i-class" data-val="item">
    <div class="group-img">
      <img class="group-head" :src="item.headImg||item.disUserHeadImg"
           v-if="item.headImg||item.disUserHeadImg"/>
      <img class="group-head" src='@/assets/images/head-bitmap.png' v-else/>
      <text class="rest" v-if="item.rest==1">休息中</text>
    </div>
    <div class="item-center">
      <div class="community-title">
        <text class="span">{{item.communityName}}</text>
        <text class="em" :style="{'color':skin.color}" v-if="!isOld&&item.distance">距离{{item.distance}}</text>
      </div>
      <div class="group-master">
        {{groupInfo.owner_name}}：{{item.realName||item.disUserName}}
        <img class="right-arrow" src='@/assets/images/community-right-arrow.png'/>
      </div>
      <div class="community-address" v-if="hiddenDetails==0">{{item.fullAddress||item.communityAddress}}</div>

      <div class="community-date" v-for="(item,index) in item.times">
        {{item.date}} :
        <text class="span" v-if="item.times.length>0">
          <text class="span" v-if="item.times[0]"> {{item.times[0]}}</text>
          <text class="span" v-if="item.times[1]"> , {{item.times[1]}}</text>
          <text class="span" v-if="item.times[2]"> , {{item.times[2]}}</text>
        </text>
        <text class="span" v-else>没有可用时间</text>
      </div>

    </div>


  </div>

</template>

<script>
  var utils = require("../../utils/index"), location = require("../../utils/Location");
  export default {
    name: 'i-community-item',
    props:{
      item: {
        type: Object,
        default: {
          rest: 0
        }
      },
      city: Object,
      isOld: {
        type: Boolean,
        default: !1
      },
      groupInfo: {
        type: Object,
        default: {
          group_name: "社区",
          owner_name: "团长"
        }
      },
      hiddenDetails: {
        type: Number,
        default: 0
      },
      skin: {
        type: Object
      }
    },
    methods: {
      chooseCommunity: function(e) {
        var app = this.$getApp();
        var t = this.item;

        if ("火星社区" !== t.communityName || t.communityId) {
          var i = t.disUserHeadImg || t.headImg || "", n = t.disUserName || t.realName || "", a = {
            communityId: t.communityId,
            communityName: t.communityName,
            disUserName: n,
            disUserHeadImg: i,
            communityAddress: t.communityAddress,
            distance: t.distance,
            fullAddress: t.fullAddress || t.communityAddress
          }, m = this.city;
          utils.changeCommunity(a, m);
        } else location.openSetting(app).then(function() {
          location.checkGPS(app, function() {});
        });
      }
    }
  }
</script>

<style scoped>
  .community-item {
    box-sizing: border-box;
    display: flex;
    padding: 30px 15px;
  }

  .community-item .group-head {
    width: 40px;
    height: 40px;
    border-radius: 30px;
  }

  .community-item .community-title {
    font-size: 12px;
    line-height: 12px;
    height: 12px;
    width: 70%;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  .community-item .community-title .span {
    color: #444;
    font-weight: 500;
  }

  .community-item .community-title .em {
    color: #ff5344;
    font-size: 13px;
    line-height: 13px;
    white-space: nowrap;
  }

  .community-item .community-address {
    font-size: 13px;
    line-height: 17px;
    color: #666;
    width: 75%;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: initial;
    white-space: normal;
  }

  .community-item .community-date {
    margin-top: 5px;
    font-size: 12px;
    line-height: 17px;
    color: #aaa;
    width: 70%;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: initial;
    white-space: normal;
  }

  .community-item .group-master {
    width: 100%;
    font-size: 13px;
    line-height: 13px;
    color: #aaa;
    position: relative;
    margin-bottom: 3px;
  }

  .community-item .group-master .right-arrow {
    position: absolute;
    right: 0;
    top: 0;
    width: 7px;
    height: 12px;
  }

  .group-img {
    position: relative;
    width: 40px;
    height: 40px;
    border-radius: 30px;
    margin-right: 10px;
    overflow: hidden;
  }

  .rest {
    position: absolute;
    left: 0;
    bottom: 4px;
    right: 0;
    font-size: 9px;
    background: rgba(255, 83, 68, 0.8);
    text-align: center;
    color: #fff;
    padding: 1px 0 1px;
  }
</style>
