<template>
  <i-modal :scrollUp="false" v-show="visible&&canChange">
    <div class="community-box">
      <div class="community-content">
        <div class="community-content-title">
          分享{{groupInfo.owner_name}}与当前{{groupInfo.owner_name}}不一致，<div v-if="canChange">请选择</div>
          <div v-else>因为设置无法切换{{groupInfo.owner_name}}，所以仍绑定之前{{groupInfo.owner_name}}。</div>
        </div>
        <div class="community-content-tip">
          <div bindtap="switchCommunity" class="item" data-type="1">
            <div class="item-l">
              <img class="img" :src="changeCommunity.disUserHeadImg"/>
              <div class="type">分享{{groupInfo.owner_name}}</div>
            </div>
            <div class="item-r">
              <div class="name">{{changeCommunity.communityName}}</div>
              <div class="address">{{changeCommunity.fullAddress}}</div>
            </div>
            <div class="item-ft">
              <img class="img" mode="widthFix" src="@/assets/images/community-right-arrow.png"/>
            </div>
          </div>
          <div bindtap="switchCommunity" class="item" data-type="0" v-if="community&&community.communityName">
            <div class="item-l">
              <img class="img" :src="community.disUserHeadImg"/>
              <div class="type green">原{{groupInfo.owner_name}}</div>
            </div>
            <div class="item-r">
              <div class="name">{{community.communityName}}</div>
              <div class="address">{{community.fullAddress}}</div>
            </div>
            <div class="item-ft">
              <img class="img" mode="widthFix" src="@/assets/images/community-right-arrow.png"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </i-modal>

</template>

<script>
  export default {
    name: '',
    props:{
      changeCommunity: {
        type: Object,
        default: {}
      },
      community: {
        type: Object,
        default: {}
      },
      visible: {
        type: Boolean,
        default: !1
      },
      canChange: {
        type: Boolean,
        default: !0
      },
      groupInfo: {
        type: Object,
        default: {
          group_name: "社区",
          owner_name: "团长"
        }
      },
      cancelFn: {
        type: Boolean,
        default: !1
      }
    },
    methods: {
      switchCommunity: function(e) {
        0 != e.currentTarget.dataset.type && this.canChange ? (this.canChange && this.$emit("changeComunity"),
          this.$getApp().globalData.goodsListCarCount = {}) : this.closeModal();
      },
      closeModal: function() {
        this.cancelFn && this.$emit("noChange"), this.setData({
          visible: !1
        });
      }
    }
  }
</script>

<style scoped>
  .community-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .community-content {
    width: 620rpx;
    background: #fff;
    border-radius: 10rpx;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    margin: 30px auto;
    overflow: hidden;
    z-index: 1001;
  }

  .community-content-title {
    position: relative;
    font-size: 30rpx;
    width: 100%;
    box-sizing: border-box;
    text-align: center;
    padding: 20rpx;
  }

  .community-content-change {
    color: #44abf7;
    margin-left: 15rpx;
  }

  .community-content-tip {
    color: #666;
    font-size: 32rpx;
    line-height: 1.6;
    padding: 20rpx;
  }

  .community-content-tip .item {
    border: 1rpx solid #ccc;
    padding: 10rpx;
    margin-bottom: 20rpx;
    border-radius: 10rpx;
  }

  .community-content-tip .item-l {
    min-width: 110rpx;
    max-width: 150rpx;
    text-align: center;
  }

  .community-content-tip .item-l .type {
    font-size: 24rpx;
    background-color: #f75451;
    color: #fff;
    border-radius: 3px;
    padding: 3rpx 5rpx;
  }

  .community-content-tip .item-l .type.green {
    background-color: green;
  }

  .community-content-tip .item-r {
    flex: 1;
    margin-left: 5px;
  }

  .community-content-tip .item-ft {
    width: 20rpx;
  }

  .community-content-tip .item-ft .img {
    width: 20rpx;
  }

  .community-content-tip .item {
    display: flex;
    align-items: center;
  }

  .community-content-tip .img {
    width: 80rpx;
    height: 80rpx;
    border-radius: 50%;
  }

  .community-content-tip .name {
    font-weight: bold;
    color: #333;
  }

  .community-content-tip .address {
    color: #999;
    font-size: 28rpx;
  }

  .community-box .closeBtn {
    width: 80rpx;
    height: 80rpx;
    margin: 0 auto;
  }
</style>
