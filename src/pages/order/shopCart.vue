<template>
  <div>
      <div>购物车</div>
    <div class="pb100">
        <div class="cart-tabs" v-if="showTab">
            <div v-on:click="changeTabs(item.id)" class="cart-tabs-item" v-for="(item,id) in tabList" :key="id">
                <span v-if="item.enabled">{{item.name}}</span>
            </div>
        </div>
        <div class="fixed-vip" v-if="is_open_vipcard_buy==1&&is_vip_card_member!=1">
            <div class="vip i-flex i-flex-spb">
                <div class="i-flex vip-name">
                    <image class="vip-logo" :src="modify_vipcard_logo" v-if="modify_vipcard_logo"></image>
                    <span class="iconfont icon-huiyuan" style="font-size:30rpx;" v-else></span>
                    <div v-if="vipFee>0">开通“{{modify_vipcard_name}}”所选商品预计可省{{vipFee}}元</div>
                    <div v-else>“{{modify_vipcard_name}}” 尊享特权·会员专享价</div>
                </div>
                <div @click="goLink" data-link="/lionfish_comshop/moduleA/vip/upgrade">立即开通
                    <span class="iconfont icon-youjiantou goright"></span>
                </div>
            </div>
        </div>
        <div class="h88" v-if="showTab||is_open_vipcard_buy==1&&is_vip_card_member!=1"></div>
        <div class="h72" v-if="showTab&&is_open_vipcard_buy==1&&is_vip_card_member!=1"></div>
        <div class="empty" v-if="isEmpty">
            <image src="../../images/icon-index-empty.png"></image>
            <div v-if="needAuth">
                <div @click="authModal" class="h1">点击<span style="color: red">“去登录”</span>查看购物车商品</div>
                <div @click="authModal" class="btn" style="background: red">去登录</div>
            </div>
            <div v-else>
                <div class="h1">购物车空空如也，赶紧去逛逛吧~</div>
                <div @click="goindex" class="btn" style="background: red">去购物</div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'order',
    data() {
      return{
        allselect: !1,
        community_id: 0,
        allnum: 0,
        tablebar: 3,
        allcount: "0.00",
        recount: "0.00",
        carts: {},
        isEmpty: !1,
        needAuth: !1,
        cartNum: 0,
        isIpx: !1,
        disAmount: 0,
        totalAmount: 0,
        reduceNum: 0,
        tabIdx: 0,
        updateCart: 0,
        invalidCarts: {},
        tabList: []
      }
    },
  }
</script>

<style scoped>
.tabs {
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
    zoom: 1;
    color: #666;
}

.tabs-bar,.tabs-link-bar {
    box-sizing: border-box;
}

.tabs-bar {
    outline: none;
    width: 100%;
    background-color: #fff;
}

.tabs-nav--container {
    overflow: hidden;
    font-size: 0.75rem;
    line-height: 1.5rem;
    box-sizing: border-box;
    position: relative;
    white-space: nowrap;
    margin-bottom: -1px;
    zoom: 1;
}

.tabs-nav--container:after,.tabs-nav--container:before {
    content: " ";
    display: table;
}

.tabs-nav--container:after {
    clear: both;
    visibility: hidden;
    font-size: 0;
    height: 0;
}

.tabs.tabs-card>.tabs-bar .tabs-nav--wrap {
    margin-bottom: 0;
}

.tabs-nav--wrap {
    overflow: hidden;
    margin-bottom: -.01rem;
}

.tabs-nav {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    box-sizing: border-box;
    padding-left: 0;
    transition: transform 0.5s cubic-bezier(0.645,0.045,0.355,1);
    transition: transform 0.5s cubic-bezier(0.645,0.045,0.355,1),-webkit-transform 0.5s cubic-bezier(0.645,0.045,0.355,1);
    position: relative;
    margin: 0;
    list-style: none;
    justify-content: space-around;
}

.tabs-nav:after,.tabs-nav:before {
    display: table;
    content: " ";
}

.tabs-nav:after {
    clear: both;
}

.tabs-nav .tabs-tab {
    display: block;
    height: 2.2rem;
    line-height: 2.2rem;
    margin: 0 5px;
    box-sizing: border-box;
    position: relative;
    transition: color 0.3s cubic-bezier(0.645,0.045,0.355,1);
    cursor: pointer;
    text-decoration: none;
    text-align: center;
    font-size: 28rpx;
    color: #333;
}

.tabs-nav .tabs-tab-active {
    color: #f57;
}

.tabs.tabs-card>.tabs-bar .tabs-tab {
    margin: 0;
    border: 1px solid #d9d9d9;
    border-bottom: 0;
    border-radius: 0.06rem 0.06rem 0 0;
    transition: all 0.3s cubic-bezier(0.645,0.045,0.355,1);
    background: #f9f9f9;
    margin-right: 0.02rem;
}

.tabs.tabs-card>.tabs-bar .tabs-tab-active {
    background: #fff;
    color: #f13e3a;
}

.tabs.tabs-card>.tabs-bar .tabs-tab-active {
    color: #ff5777;
}

.tabs.tabs-card>.tabs-bar .tabs-tab.list-line {
    border: 0;
    background: #fff;
}

.tabs:not(.tabs-vertical) .tabs-content-animated {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -moz-box-orient: horizontal;
    -moz-box-direction: normal;
    flex-direction: row;
    will-change: transform;
    transition: transform 0.3s cubic-bezier(0.645,0.045,0.355,1),-webkit-transform 0.3s cubic-bezier(0.645,0.045,0.355,1);
}

.tabs:not(.tabs-vertical) .tabs-tabpane {
    -ms-flex-negative: 0;
    flex-shrink: 0;
    width: 100%;
}

.meili-all-vue-base-goodswall .module-list-wrap {
    display: block!important;
}

.meili-all-vue-base-goodswall .module-list-wrap[data-v-498b2138] {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    overflow: hidden;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -moz-box-orient: horizontal;
    -moz-box-direction: normal;
    flex-flow: row wrap;
}

.meili-all-vue-base-goodswall .show {
    height: auto!important;
}

.meili-all-vue-base-goodswall .module-item-wrap {
    width: 100%;
    margin-bottom: 10rpx;
}

.order {
    width: 100%;
    background: #fff;
}

.order-panel {
    padding: 0 10px;
}

.shop-product,.shop-title {
    padding: 0 10px;
    margin: 0 -10px;
}

.shop-title image {
    width: 40rpx;
    height: 40rpx;
    border-radius: 100%;
    display: inline-block;
    vertical-align: top;
    margin-top: 20rpx;
    margin-right: 10rpx;
}

.no_order {
    margin-top: 30%;
    text-align: center;
}

.shop-title {
    border: 1px solid #e5e5e5;
    border-right: none;
    border-left: none;
    font-size: 28rpx;
    height: 90rpx;
    line-height: 90rpx;
}

.shop:first-child .shop-title {
    border-top: none;
}

.shop-title--name {
    color: #333;
    display: inline-block;
    max-width: 10rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}

.shop-title--status {
    float: right;
    margin-left: 0.2rem;
    color: #ff5777;
    white-space: nowrap;
}

.shop-product,.shop-title {
    padding: 0 10px;
    margin: 0 -10px;
}

.product {
    border-bottom: 1px solid #ddd;
    min-height: 1.8rem;
}

.product-list {
    padding: 10px 0;
}

.product.is-noborder {
    border: none;
}

.product-wrap {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
}

.product-pic {
    width: 150rpx;
    height: 150rpx;
    display: inline-block;
}

.product-pic image {
    width: 150rpx;
    height: 150rpx;
    visibility: inherit;
    display: inherit;
}

.product-des {
    -webkit-box-flex: 1;
    -moz-box-flex: 1;
    flex: 1;
    margin: 0 10px;
    position: relative;
}

.red {
    color: #ff5777;
    padding-right: 5rpx;
}

.product-des--name {
    color: #333;
    font-size: 28rpx;
    height: 46px;
    text-overflow: ellipsis;
    overflow: hidden;
    display: block;
    margin-bottom: 14px;
    font-weight: 400;
}

.product-des--sku {
    margin-bottom: 5px;
    font-size: 24rpx;
    color: #999;
}

.meili-all-order-list-order-shop .product-des--sku div {
    display: inline-block;
    margin-right: 5px;
}

.product-price {
    text-align: right;
    line-height: 1rem;
    font-size: 24rpx;
}

.product-price--origin {
    text-decoration: line-through;
    color: #999;
}

.product-price--number {
    color: #999;
}

.order-panel--operate {
    border-top: 1px solid #e5e5e5;
    margin: 0 -10px;
    vertical-align: middle;
    text-align: right;
}

.operate-button {
    overflow: hidden;
}

.meili-all-vue-base-button {
    display: inline-block;
    box-sizing: border-box;
    font-size: 0.75rem;
    padding: 5px 10px;
    border-radius: 5px;
    vertical-align: middle;
    margin: 10px 5px;
    cursor: pointer;
    user-select: none;
    min-width: 5rem;
    text-align: center;
}

.primary {
    color: #fff;
    background: #ff5777;
}

.operate-button .meili-all-vue-base-button {
    width: 6rem;
    height: 1.8rem;
    line-height: 1.8rem;
    font-size: 0.75rem;
    padding: 0;
    margin: 10px;
    border-radius: 5px;
}

.operate-button--white.primary {
    color: #666;
    border: 1px solid #999;
    background: #fdfdfd;
}

.buy {
    margin-bottom: 116rpxpx;
}

.order-panel--price {
    margin: 0 -10px;
    padding: 10px;
    border-top: 1px solid #e5e5e5;
    text-align: right;
    color: #999;
}

.pay {
    color: #333;
}

.pay-delivery {
    margin-right: -5px;
    font-size: 0.75rem;
}

.pay-price {
    line-height: 1rem;
    font-size: 0.75rem;
}

.pay-price--content {
    font-size: 0.75rem;
    color: #ff5777;
}

.weui-loading {
    margin: 0 5px;
    width: 20px;
    height: 20px;
    display: inline-block;
    vertical-align: middle;
    animation: weuiLoading 1s steps(12,end) infinite;
    background: transparent url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PHBhdGggZmlsbD0ibm9uZSIgZD0iTTAgMGgxMDB2MTAwSDB6Ii8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTlFOUU5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgLTMwKSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iIzk4OTY5NyIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgzMCAxMDUuOTggNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjOUI5OTlBIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDYwIDc1Ljk4IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0EzQTFBMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSg5MCA2NSA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNBQkE5QUEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoMTIwIDU4LjY2IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0IyQjJCMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgxNTAgNTQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjQkFCOEI5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDE4MCA1MCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDMkMwQzEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTE1MCA0NS45OCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDQkNCQ0IiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTEyMCA0MS4zNCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNEMkQyRDIiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTkwIDM1IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0RBREFEQSIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgtNjAgMjQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTJFMkUyIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKC0zMCAtNS45OCA2NSkiLz48L3N2Zz4=) no-repeat;
    background-size: 100%;
}

.weui-loadmore {
    width: 65%;
    margin: 1.5em auto;
    line-height: 1.6em;
    font-size: 14px;
    text-align: center;
}

.weui-loadmore__tips {
    display: inline-block;
    vertical-align: middle;
}

.orders-lottery-status {
    z-index: 99;
    position: absolute;
    width: 67px;
    height: 67px;
    right: 12px;
    top: 7px;
}

.order-lottery-lucky,.order-lottery-not,.order-lottery-wait {
    background-image: url(https://mall.shiziyu888.com/Common/image/sprites_stamps-02e13e88f3.png);
    background-repeat: no-repeat;
    background-size: 299.83425px 299.83425px;
    background-position: -199.8895px -99.94475px;
}

.order-lottery-lucky {
    background-position: -99.94475px 0;
}

.order-lottery-not {
    background-position: -199.8895px 0;
}

.order-lottery-wait {
    background-position: -199.8895px -99.94475px;
}

.nav-bar {
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 10;
}

.nav-bar .nav-bar-inner {
    display: flex;
    justify-content: space-between;
    padding: 0 40rpx;
    background-color: white;
}

.nav-bar .nav-bar-item {
    position: relative;
    word-break: keep-all;
    font-size: 28rpx;
    font-weight: 500;
    color: #666;
    padding: 20rpx 0;
}

.nav-bar .current.nav-bar-item {
    border-bottom: 3px solid #ff4936;
}

.nav-bar-content {
    margin-top: 49px;
    padding-bottom: 30rpx;
}

.mar-right-10 {
    margin-right: 20rpx;
}

.card {
    margin-bottom: 20rpx;
    margin-left: 20rpx;
    color: #444;
}

.card .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 30rpx;
    font-size: 24rpx;
}

.card .card-content {
    padding: 30rpx;
    border-top: 0.1rpx solid #efefef;
    border-bottom: 0.1rpx solid #efefef;
}

.card .card-content .content-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.card .card-content .show-img {
    float: left;
    width: 120rpx!important;
    height: 120rpx!important;
}

.clearfix:after {
    visibility: hidden;
    display: block;
    font-size: 0;
    content: " ";
    clear: both;
    height: 0;
}

.card .card-content .dot {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.card .card-content .dot .dot-item {
    width: 12rpx;
    height: 12rpx;
    border-radius: 50%;
    background: #d8d8d8;
}

.card .card-content .dot .dot-middle {
    margin: 0 10rpx;
}

.card .card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 30rpx;
    font-size: 24rpx;
}

.card .card-footer .money {
    font-size: 32rpx;
    font-weight: bold;
    display: inline-block;
}

.card .card-footer .accual-pay {
    display: inline-block;
}

.empty-wrap {
    padding-top: 300rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.empty-wrap .empty-img {
    width: 218rpx;
    height: 218rpx;
}

.empty-wrap .empty-txt {
    font-size: 30rpx;
    font-weight: 400;
    color: #777;
    margin-top: 32rpx;
}

.padding-15 {
    margin-left: 16rpx;
}

.button-group {
    display: flex;
    justify-content: space-between;
}

.my-button {
    position: relative;
    color: #666;
    width: 136rpx;
    height: 52rpx;
    line-height: 52rpx;
    font-size: 24rpx;
    text-align: center;
}

.my-button::after {
    box-sizing: border-box;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 200%;
    height: 200%;
    transform: scale(0.5);
    transform-origin: 0 0;
    border: 2rpx solid #b6b6b6;
    border-radius: 52rpx;
    pointer-events: none;
}

.get-goods {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.get-goods .sure-get {
    color: #aaa;
}

.my-button-pay {
    position: relative;
    width: 136rpx;
    height: 52rpx;
    line-height: 52rpx;
    font-size: 24rpx;
    text-align: center;
    color: white;
    border: none;
    border-radius: 26rpx;
    background: linear-gradient(90deg,#ff5041 0%,#ff877d 100%);
}

.right-arrow {
    width: 12rpx;
    height: 22rpx;
    margin-left: 10rpx;
}

.bold {
    font-weight: 500;
}

.red {
    color: #ff5344;
    font-size: 24rpx;
}

.gray {
    color: #aaa;
}

.name {
    width: 510rpx;
    font-size: 26rpx;
    color: #444;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}

.pintag {
    background: linear-gradient(to right,#ff5041,#ff695c);
    color: #fff;
    font-size: 20rpx;
    padding: 1rpx 8rpx;
    border-radius: 6rpx;
    font-weight: bold;
    margin-right: 10rpx;
}

.mount {
    font-size: 22rpx;
    color: #aaa;
    margin-top: 10rpx;
}

.bottom-info {
    justify-content: space-between;
    font-size: 28rpx;
    color: #444;
    margin-top: 18rpx;
}

.bottom-info text {
    text-decoration: line-through;
    color: #999;
    font-size: 22rpx;
}

.mask{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: #000;
    z-index: 9000;
    opacity: 0.7;
}
.modalDlg{
    text-align: center;
    position: fixed;
    top: 25%;
    left: 15%;
    width: 65%;
    padding: 16px 8px 16px 8px;
    /* border: 8px solid #e8e9f7; */
    background-color: white;
    z-index: 9999;
    border-radius: 10px;
    overflow: auto;

}
.wux-button {
    display: inline-block;
    box-sizing: border-box;
    margin: 0;
    padding: 0 24rpx;
    min-width: 104rpx;
    min-height: 88rpx;
    border: none;
    border-radius: 8rpx;
    vertical-align: middle;
    text-align: center;
    text-overflow: ellipsis;
    font-size: 32rpx;
    line-height: 84rpx;
    cursor: pointer;

}
.wux-button--block{
    width: 100%;
    margin-top: 20rpx;
}
.paynow{
    position: fixed;
    top: 1%;
    width: 100%;
    height: 99%;
    padding: 8rpx;
    /* border: 8px solid #e8e9f7; */
    background-color: white;
    z-index: 9999;
    overflow: auto;
}
</style>
