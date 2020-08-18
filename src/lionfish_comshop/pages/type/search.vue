<template>
  <div class="search-wrap">
      <div class="search-bar">
          <div class="search-box">
              <input autoFocus v-on:click="goResult" class="ipt" confirmType="搜索" placeholder="搜索商品" type="text">
              <div class="search-icon">
                  <span class="iconfont icon-sousuo1"></span>
              </div>
          </div>
      </div>
      <div class="tag-wrap" v-if="wxSearchData.length>0">
          <div class="tag-title">
              <span>搜索历史</span>
              <span @click="clearHis" class="iconfont icon-shanchu1 icon-del"></span>
          </div>
          <div class="tag-list">
              <div @click="goResultName(item.name)" class="item" v-for="(item,index) in wxSearchData" :key="index">{{item.name}}</div>
          </div>
      </div>
  </div>
</template>

<script>
  import GlobalMixin from '../../mixin/globalMixin.js'

  var util = require("../../utils"),
    status = require("../../utils"),
    wcache = require("../../utils/wcache.js")

   export default {
      data() {
        return{
          is_login: !0,
          wxSearchData: [],
          keyword: ''
        }
      },
      created: function() {
          this.getHisKeys();
          this.$wx.setNavigationBarTitle({
            title: "商品列表",
            showLogo:false,
            showMore:false,
            showBack:false
          })
      },
      mounted:function()  {
          this.$wx.hideLoading();
      },
      methods: {
          goResult: function(e) {
          var t = e.detail.value.replace(/\s+/g, "");
          t ? (this.wxSearchAddHisKey(t), this.$wx.navigateTo({
              url: "/lionfish_comshop/pages/type/result?keyword=" + t
          })) : this.$wx.showToast({
              title: "请输入关键词",
              icon: "none"
          });
        },
        goResultName: function(e) {
            console.log(e);
            var t = e.currentTarget.dataset.name;
            t ? (this.wxSearchAddHisKey(t), this.$wx.navigateTo({
                url: "/lionfish_comshop/pages/type/result?keyword=" + t
            })) : this.$wx.showToast({
                title: "请输入关键词",
                icon: "none"
            });
        },
        getHisKeys: function() {
            this.keyword = this.$route.query.keyword;
            console.log(this.keyword);
            this.$http({
              controller : 'index.load_condition_goodslist',
              i: 3,
              pageNum: 1,
              per_page: 30,
              keyword: this.keyword
            }).then(response => {
              console.log(response,"123456")
              //this.$set(this.$data,"title",response.title);
              var a = response.list;
              this.wxSearchData = a;
            })
        },
        clearHis: function() {
            var t = this;
            this.$wx.removeStorage({
                key: "wxSearchHisKeys",
                success: function(e) {
                    t.setData({
                        wxSearchData: []
                    });
                }
            });
        },
        wxSearchAddHisKey: function(e) {
            var t = {}, a = this;
            if (t.name = e, void 0 !== t && 0 != t.length) {
                var s = this.$wx.getStorageSync("wxSearchHisKeys");
                s ? JSON.stringify(s).indexOf(JSON.stringify(t)) < 0 && (4 < s.length && s.pop(),
                s.unshift(t)) : (s = []).push(t), this.$wx.setStorage({
                    key: "wxSearchHisKeys",
                    data: s,
                    success: function() {
                        a.getHisKeys();
                    }
                });
            }
        },
        onHide: function() {},
        onUnload: function() {}
      }
    }
</script>

<style scoped>
  .search-bar {
    padding: 12rpx 25rpx;
    background-color: #fff;
}

.search-box {
    background-color: #f0f0f0;
    height: 56rpx;
    line-height: 56rpx;
    border-radius: 28rpx;
    color: #acacac;
    display: flex;
    align-content: center;
}

.search-box .ipt {
    padding: 0 30rpx 0 60rpx;
    line-height: 56rpx;
    height: 56rpx;
    width: 100%;
    box-sizing: border-box;
}

.search-icon {
    position: absolute;
    left: 20rpx;
    margin-left: 25rpx;
    margin-right: 12rpx;
}

.search-icon .iconfont {
    font-size: 34rpx;
    padding-top: 10rpx;
}

.tag-wrap {
    margin-top: 16rpx;
    padding: 0 30rpx;
}

.tag-title {
    color: #a8a8a8;
    font-size: 26rpx;
    margin-bottom: 36rpx;
    display: flex;
    justify-content: space-between;
}

.icon-del {
    font-size: 30rpx;
    color: #666;
}

.tag-list {
    display: flex;
    flex-wrap: wrap;
    color: #666666;
}

.tag-list .item {
    padding: 10rpx 30rpx;
    border-radius: 50rpx;
    border: 2rpx solid #efefef;
    margin-right: 20rpx;
}
</style>
