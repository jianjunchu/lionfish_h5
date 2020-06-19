<template>
  <div class="page-wrap">
    <div class="search-bar">
        <div class="search-box">
            <input v-on:click="goResult" class="ipt" confirmType="搜索" placeholder="搜索商品" type="text" />
            <div class="search-icon">
                <text class="iconfont icon-sousuo1"></text>
            </div>
        </div>
    </div>
    <div class="page-content" v-if="!noCateList">
        <scroll-div scrollWithAnimation scrollY class="page-category" :scrollTop="categoryScrollBarTop" style="height:150px">
            <div v-on:click="changeCategory(index)" class="category-item"  v-for="(item,index) in rushCategoryData.tabs" :key="index">
                <div class="item-border" style="background: red"></div>
                <div>{{item.name}}</div>
            </div>
            <div class="category-item"></div>
        </scroll-div>
        <div v-on:click="showDrop" class="mask" hidden="!showDrop"></div>
        <div class="sub-cate" v-if="rushCategoryData.tabs[rushCategoryData.activeIndex].sub.length">
            <scroll-div scrollX class="sub-cate-scroll" :scrollLeft="scrollLeft">
                <div v-on:click="change_sub_cate(rushCategoryData.tabs[rushCategoryData.activeIndex].id,0)" class="sub-cate-item" >全部</div>
                <div v-on:click="change_sub_cate(item.id,index+1)" class="sub-cate-item"  v-for="(item,index) in rushCategoryData.tabs[rushCategoryData.activeIndex].sub" :key="item.id">{{item.name}}</div>
            </scroll-div>
            <div v-on:click="showDrop" class="icon-open">
                <image class="openImg " src="../../images/commentsOpen.png"></image>
            </div>
        </div>
        <div class="sub-cate-hide" v-if="rushCategoryData.tabs[rushCategoryData.activeIndex].sub.length&&showDrop">
            <div v-on:click="change_sub_cate(rushCategoryData.tabs[rushCategoryData.activeIndex].id,0)" class="sub-cate-item" style="color:#fff">全部</div>
            <div v-on:click="change_sub_cate(item.id,index+1)" class="sub-cate-item" style="color:#fff" v-for="(item,index) in rushCategoryData.tabs[rushCategoryData.activeIndex].sub" :key="item.id">{{item.name}}</div>
        </div>
        <scroll-div scrollWithAnimation scrollY bindscroll="scroll" bindscrolltolower="scrollBottom" bindtouchend="touchend" bindtouchstart="touchstart" class="page-list " lowerThreshold="200" scrollTop="resetScrollBarTop" style="height:100px" upperThreshold="50">
            <div class="scroll-col-tip-top">
                <span v-if="isFirstCategory">已经拉到最顶部啦～</span>
                <span wx:else>下拉查看上一个分类</span>
            </div>
            <div style="min-height: 100px;">
                <block v-if="!pageEmpty">
                    <!-- <i-type-item bind:authModal="authModal" bind:changeCartNum="changeCartNum" bind:openSku="openSku" bind:vipModal="vipModal" canLevelBuy="{{canLevelBuy}}" changeCarCount="{{changeCarCount}}" is_open_vipcard_buy="{{is_open_vipcard_buy}}" needAuth="{{needAuth}}" reduction="{{reduction}}" spuItem="{{item}}" stopClick="{{stopClick}}" v-for="(item,index) in rushList" :key="itm.actId"></i-type-item> -->
                 </block>
                <div class="none-rush-list" v-else-if="pageEmpty">
                    <image class="img-block" src="../../images/icon-index-empty.png"></image>
                    <div class="h1">暂时没有团购</div>
                    <div class="h2">我们正在为您准备更优惠的团购</div>
                </div>
                <div v-if="loadMore">
                    <i-load-more loading="loadMore" tip="oadText"></i-load-more>
                </div>
                <div class="scroll-col-tip-bottom" v-else-if="canNext">
                    <span v-if="isLastCategory">看到我的底线了吗～</span>
                    <span wx:else>上拉查看下一个分类</span>
                </div>
                <div style="height:100rpx;"></div>
            </div>
        </scroll-div>
    </div>
    <i-empty wx:else>暂无分类~</i-empty>
    <i-tabbar bind:authModal="authModal" cartNum="cartNum" class="tabbar " currentIdx="1" needAuth="needAuth"></i-tabbar>
</div>
<!-- <i-new-auth bind:authSuccess="authSuccess" bind:cancel="authModal" navBackUrl="/lionfish_comshop/pages/type/index" needAuth="needAuth&&showAuthModal" needPosition="needPosition"></i-new-auth>
<i-sku bind:cancel="closeSku" bind:changeCartNum="changeCartNum" bind:vipModal="vipModal" cur_sku_arr="{{cur_sku_arr}}" goodsid="{{addCar_goodsid}}" sku="{{sku}}" skuList="{{skuList}}" sku_val="{{sku_val}}" vipInfo="{{vipInfo}}" visible="{{visible}}"></i-sku>
<i-change-community bind:changeComunity="confrimChangeCommunity" canChange="{{hide_community_change_btn==0}}" changeCommunity="{{changeCommunity}}" community="{{community}}" groupInfo="{{groupInfo}}" visible="{{showChangeCommunity}}"></i-change-community> -->
<!-- <i-vip-modal :imgUrl="pop_vipmember_buyimage" :visible="showVipModal"></i-vip-modal> -->


</template>

<script>

  export default {
    name: 'type',

    data() {
      return{
        cartNum: 0,
        rushCategoryData: {
            tabs: [],
            activeIndex: 0
        },
        rushList: [],
        categoryScrollBarTop: 0,
        resetScrollBarTop: 50,
        loadMore: !0,
        loadText: "加载中...",
        scrollViewHeight: 0,
        isFirstCategory: !0,
        isLastCategory: !1,
        pageEmpty: !1,
        active_sub_index: 0,
        needPosition: !0,
        groupInfo: {
            group_name: "社区",
            owner_name: "团长"
        },
        noCateList: 0
      }
    },
    methods: {
      goResult: function(t) {
        var a = t.detail.value.replace(/\s+/g, "");
        a ? wx.navigateTo({
            url: "/lionfish_comshop/pages/type/result?keyword=" + a
        }) : wx.showToast({
            title: "请输入关键词",
            icon: "none"
        });
      },
      showDrop: function() {
            this.showDrop = this.data.showDrop
      }
    },

  }
</script>

<style scoped>
  .page-wrap {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background: #fff;
  }

  .search-bar {
    padding: 6px 13px;
    background-color: #fff;
    width: 100%;
    box-sizing: border-box;
  }

  .search-box {
    background-color: #f0f0f0;
    height: 28px;
    line-height: 28px;
    border-radius: 14px;
    color: #acacac;
    display: flex;
    align-content: center;
  }

  .search-icon {
    position: absolute;
    left: 10px;
    margin-left: 13px;
    margin-right: 6px;
  }

  .search-icon .iconfont {
    font-size: 17px;
    padding-top: 5px;
  }

  .search-box .ipt {
    padding: 0 15px 0 30px;
    line-height: 28px;
    height: 28px;
    width: 100%;
    box-sizing: border-box;
  }

  ::-webkit-scrollbar {
    width: 0;
    height: 0;
    color: transparent;
  }

  .page-content {
    position: relative;
    width: 375px;
    flex-shrink: 0;
    flex-grow: 1;
  }

  .page-category {
    position: absolute;
    top: 0;
    left: 0;
    width: 80px;
    height: 500px;
    background: #f8f8f7;
    padding-bottom: 50px;
  }

  .category-item {
    position: relative;
    width: 80px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #787878;
    line-height: 15px;
  }

  .category-item div {
    max-width: 68px;
    text-align: center;
  }

  .category-item .item-border {
    position: absolute;
    top: 18px;
    left: 0;
    display: none;
    width: 4px;
    height: 14px;
    background: linear-gradient(#ff7955,#ff4242);
  }

  .category-item.active {
    background: #fff;
    font-weight: 500;
    color: #333;
  }

  .category-item.active .item-border {
    display: block;
  }

  .page-list {
    position: absolute;
    top: 0;
    left: 80px;
    width: 295px;
    height: 500px;
    padding-top: 5px;
    box-sizing: border-box;
  }

  .page-list .scroll-col-tip-top,.page-list .scroll-col-tip-bottom {
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #aaa;
    font-size: 12px;
    line-height: 12px;
  }

  .page-list .scroll-col-tip-top img,.page-list .scroll-col-tip-bottom img {
    width: 12px;
    height: 8px;
    margin-right: 4px;
  }

  .mask {
    position: fixed;
    left: 0;
    right: 0;
    top: 42px;
    bottom: 0;
    background: rgba(0,0,0,0.4);
    z-index: 10;
  }

  .tabbar {
    position: relative;
    height: 50px;
    width: 100%;
  }

  .none-rush-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-bottom: 70px;
    padding-top: 70px;
  }

  .none-rush-list .img-block {
    width: 120px;
    height: 120px;
    margin-bottom: 15px;
  }

  .none-rush-list .h1 {
    font-size: 16px;
    line-height: 16px;
    color: #444;
    margin-bottom: 10px;
  }

  .none-rush-list .h2 {
    font-size: 12px;
    line-height: 12px;
    color: #aaa;
  }

  .sub-cate {
    position: relative;
    line-height: 44px;
    overflow: hidden;
    white-space: nowrap;
    width: 295px;
    padding: 0 10px;
    box-sizing: border-box;
    font-size: 13px;
    z-index: 20;
    background-color: #fff;
    display: flex;
    margin-left: 80px;
  }

  .sub-cate-scroll {
    flex: 1;
    width: 0;
  }

  .sub-cate::after {
    content: "";
    position: absolute;
    left: 10px;
    right: 10px;
    bottom: 0;
    border-bottom: 1px solid #e5e5e5;
  }

  .sub-cate-item {
    display: inline-block;
    min-width: 40px;
    text-align: center;
    padding: 0 10px;
  }

  .sub-cate-item.active {
    color: #f75451;
  }

  .icon-open {
    padding: 0 4px 0 10px;
    background-color: rgba(255,255,255,.9);
  }

  .openImg {
    width: 10px;
    height: 6px;
    transition: all 300ms ease-in;
  }

  .openImg.down {
    transform: rotate(180deg);
  }

  .hide-sub-item {
    line-height: 29px;
    text-align: right;
    width: 30%;
  }

  .upImg {
    width: 8px;
    height: 4px;
    vertical-align: middle;
  }

  .sub-cate-hide {
    position: absolute;
    left: 80px;
    right: 0;
    top: 45px;
    z-index: 500;
    background-color: #fff;
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    max-height: 150px;
    overflow-y: auto;
    align-items: center;
  }

  .sub-cate-hide .sub-cate-item {
    border: 1px solid #999999;
    border-radius: 15px;
    color: #999;
    margin: 0 1% 5px;
    width: 22%;
    font-size: 12px;
    padding-top: 5px;
    padding-bottom: 5px;
  }

  .sub-cate-hide .sub-cate-item.active {
    background-color: #f75451;
    color: #fff;
    border: 1px solid #f75451;
  }

  .pt50 {
    padding-top: 50px;
  }

  .mask {
    position: fixed;
    left: 80px;
    right: 0;
    top: 42px;
    bottom: 0;
    background: rgba(0,0,0,.4);
    z-index: 10;
  }
</style>
