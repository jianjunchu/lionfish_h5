<template>
  <div class="page-wrap">
      分类页面
  </div>

</template>

<script>

  export default {
    name: 'type',

    data() {
      return{

      }
    },
    methods: {

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

  .category-item view {
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
