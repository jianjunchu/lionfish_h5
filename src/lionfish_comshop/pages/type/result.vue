<template>
  <div class="box">
    <div class="list">
        <i-type-item v-for="item in rushList" :key="item.actId" :spuItem="item"></i-type-item>
        <!-- <i-load-more iClass="loadMore" loading="{{loadMore}}" tip="{{loadText}}" wx:if="{{showLoadMore&&!showEmpty}}"></i-load-more> -->
    </div>
    <div class="none-rush-list" v-if="showEmpty">
        <image class="img-block" src="../../images/icon-index-empty.png"></image>
        <div class="h1">暂时没有团购</div>
        <div class="h2">我们正在为您准备更优惠的团购</div>
    </div>
    <!-- <i-cart-btn cartNum="{{cartNum}}"></i-cart-btn> -->
    </div>
    <!-- <i-new-auth bind:authSuccess="authSuccess" bind:cancel="authModal" needAuth="{{needAuth&&showAuthModal}}" needPosition="{{true}}"></i-new-auth> -->
    <!-- <div class="mask" v-show="!visible"></div> -->
    <!-- <div @click="close" class="sku-content" v-show="!visible" scrollUp="true">
        <div class="sku-card">
            <div bindtap="closeSku" class="close">
                <image src="../../images/icon-sku-close.png"></image>
            </div>
            <div class="sku-header">
                <i-img defaultImage="../../images/placeholder-refund.png" height="80" iClass="sku-img" loadImage="{{cur_sku_arr.skuImage}}" width="80"></i-img>
                <div class="sku-desc">
                    <div class="sku-title">
                        <span>{{cur_sku_arr.spuName}}</span>
                    </div>
                    <div class="sku-price">
                        <div class="sale-price">
                $
                <span>{{cur_sku_arr.actPrice[0]}}</span>.{{cur_sku_arr.actPrice[1]}}
            </div>
                        <div class="market-price">${{cur_sku_arr.marketPrice[0]}}.{{cur_sku_arr.marketPrice[1]}}</div>
                    </div>
                    <div class="sku-switch-on">已选择：{{cur_sku_arr.spec}}</div>
                </div>
            </div>
            <div class="sku-spec" wx:for="{{skuList.list}}" wx:key="id">
                <div class="title">{{item.name}}</div>
                <div class="spec-list">
                    <span bindtap="selectSku" class="{{idx==sku[index]['idx']?'on':''}}" data-disabled="{{item.canBuyNum-value<0}}" data-idx="{{idx}}" data-type="{{index}}_{{idx}}_{{value.option_value_id}}_{{value.name}}" wx:for="{{item.option_value}}" wx:for-index="idx" wx:for-item="value" wx:key="idx">{{value.name}}</span>
                </div>
            </div>
            <div class="sku-num-content">
                <div class="title">数量</div>
                <div class="i-class i-input-number i-input-number-size-{{size}}">
                    <div bindtap="setNum" class="i-input-number-minus {{value<=min?'i-input-number-disabled':''}}" data-type="decrease">
                        <image src="../../images/icon-input-reduce.png"></image>
                    </div>
                    <input bindblur="handleBlur" bindfocus="handleFocus" class="i-input-number-text {{min>=max?'i-input-number-disabled':''}}" disabled="true" type="number" value="{{sku_val}}"></input>
                    <div bindtap="setNum" class="i-input-number-plus {{value>=max?'i-input-number-disabled':''}}" data-type="add">
                        <image src="../../images/icon-input-add.png"></image>
                    </div>
                </div>
                <div class="msg" wx:if="{{skuList[current].isLimit}}">
                    <span wx:if="{{skuList[current].limitMemberNum>-1}}">每人限{{skuList[current].limitMemberNum}}单</span>
                    <span wx:if="{{skuList[current].limitOrderNum>-1}}">每单限{{skuList[current].limitOrderNum}}份</span>
                    <span></span>
                </div>
                <div class="even-num" wx:elif="{{!skuList[current].isLimit&&skuList[current].canBuyNum-value<=10&&skuList[current].canBuyNum-value>-1}}">还可以购买 {{skuList[current].canBuyNum-value}} 件</div>
            </div>
            <form bindsubmit="gocarfrom" reportSubmit="true">
                <button class="sku-confirm" disabled="{{cur_sku_arr.stock==0?true:false}}" formType="submit">
                    <div>{{cur_sku_arr.stock==0?'已抢光':'确定'}}</div>
                </button>
            </form>
        </div> -->
    </div>
    <!-- <i-vip-modal imgUrl="{{pop_vipmember_buyimage}}" visible="{{showVipModal}}"></i-vip-modal> -->

</template>

<script>
  import GlobalMixin from '../../mixin/globalMixin.js'

  var util = require("../../utils"),
    status = require("../../utils"),
    wcache = require("../../utils/wcache.js")

   export default {
      data() {
        return{
          cartNum: 0,
            showEmpty: !1,
            showLoadMore: !0,
            rushList: [],
            needAuth: !1,
            pageNum: 1,
            keyword: "",
            type: 0,
            good_ids: "",
            gid: 0,
        }
      },
      created: function() {
          this.getHisKeys();
          this.$wx.setNavigationBarTitle({
            title: "商品列表",
            showLogo:false,
            showMore:false,
            showBack:false
          });
      },
      mounted:function()  {
          this.$wx.hideLoading();
      },
      components: {
        'i-type-item' : require('./type-item.vue').default,
      },
      methods: {
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
              this.rushList = a;
            })
        },
        vipModal: function(t) {
        this.setData(t.detail);
        },
        getData: function() {
            if (!this.hasRefeshin) {
                this.hasRefeshin = !0;
                var o = this;
                o.setData({
                    showLoadMore: !0,
                    loadMore: !0,
                    loadText: "加载中"
                });
                var t = wx.getStorageSync("token"), a = wx.getStorageSync("community"), e = this.keyword, s = this.type, i = this.good_ids, d = this.gid;
                app.util.request({
                    url: "entry/wxapp/index",
                    data: {
                        controller: "index.load_condition_goodslist",
                        token: t,
                        pageNum: o.pageNum,
                        head_id: a.communityId,
                        keyword: e,
                        type: s,
                        good_ids: i,
                        gid: d
                    },
                    dataType: "json",
                    success: function(t) {
                        if (0 == t.data.code) {
                            var a = o.data.rushList.concat(t.data.list), e = Date.parse(new Date()) / 1e3;
                            for (var s in a) a[s].end_time < e && (a[s].actEnd = !0);
                            var i = {
                                full_money: t.data.full_money,
                                full_reducemoney: t.data.full_reducemoney,
                                is_open_fullreduction: t.data.is_open_fullreduction
                            };
                            o.pageNum += 1, o.hasRefeshin = !1, o.setData({
                                showLoadMore: !1,
                                rushList: a,
                                loadMore: !1,
                                cur_time: t.data.cur_time,
                                reduction: i
                            }), 0 == o.data.rushList.length && o.setData({
                                showEmpty: !0
                            });
                        } else 1 == t.data.code ? (1 == o.pageNum && 0 == o.data.rushList.length && o.setData({
                            showEmpty: !0
                        }), o.setData({
                            showLoadMore: !0,
                            loadMore: !1,
                            loadText: "没有更多了"
                        }), o.hasRefeshin = !0) : 2 == t.data.code && o.setData({
                            needAuth: !0
                        });
                    },
                    complete: function() {
                        wx.hideLoading();
                    }
                });
            }
        },
        authSuccess: function() {
            var t = this;
            this.pageNum = 1, this.setData({
                showEmpty: !1,
                showLoadMore: !0,
                rushList: [],
                needAuth: !1
            }, function() {
                t.getData();
            });
        },
        authModal: function(t) {
            t.detail && this.setData({
                needAuth: !0
            }), this.data.needAuth && this.setData({
                showAuthModal: !this.data.showAuthModal
            });
        },
        openSku: function(t) {
            var a = this, e = t.detail, s = e.actId, i = e.skuList;
            a.setData({
                addCar_goodsid: s
            });
            var o = i.list || [], d = [];
            if (0 < o.length) {
                for (var u = 0; u < o.length; u++) {
                    var n = o[u].option_value[0], r = {
                        name: n.name,
                        id: n.option_value_id,
                        index: u,
                        idx: 0
                    };
                    d.push(r);
                }
                for (var h = "", c = 0; c < d.length; c++) c == d.length - 1 ? h += d[c].id : h = h + d[c].id + "_";
                var l = i.sku_mu_list[h];
                a.setData({
                    sku: d,
                    sku_val: 1,
                    cur_sku_arr: l,
                    skuList: e.skuList,
                    visible: !0,
                    showSku: !0
                });
            } else {
                var _ = e.allData;
                a.setData({
                    sku: [],
                    sku_val: 1,
                    skuList: [],
                    cur_sku_arr: _
                });
                var g = {
                    detail: {
                        formId: ""
                    }
                };
                g.detail.formId = "the formId is a mock one", a.gocarfrom(g);
            }
        },
        gocarfrom: function(t) {
            wx.showLoading(), a.collectFormIds(t.detail.formId), this.goOrder();
        },
        goOrder: function() {
            var i = this;
            i.data.can_car && (i.data.can_car = !1);
            wx.getStorageSync("token");
            var t = wx.getStorageSync("community"), a = i.data.addCar_goodsid, e = t.communityId, s = i.data.sku_val, o = i.data.cur_sku_arr, d = "";
            o && o.option_item_ids && (d = o.option_item_ids);
            var u = {
                goods_id: a,
                community_id: e,
                quantity: s,
                sku_str: d,
                buy_type: "dan",
                pin_id: 0,
                is_just_addcar: 1
            };
            util.addCart(u).then(function(t) {
                if (1 == t.showVipModal) {
                    var a = t.data.pop_vipmember_buyimage;
                    wx.hideLoading(), i.setData({
                        pop_vipmember_buyimage: a,
                        showVipModal: !0,
                        visible: !1
                    });
                } else if (3 == t.data.code || 7 == t.data.code) wx.showToast({
                    title: t.data.msg,
                    icon: "none",
                    duration: 2e3
                }); else if (4 == t.data.code) wx.showToast({
                    title: "您未登录",
                    duration: 2e3,
                    success: function() {
                        i.setData({
                            needAuth: !0
                        });
                    }
                }); else if (6 == t.data.code) {
                    var e = t.data.msg, s = t.data.max_quantity || "";
                    0 < s && i.setData({
                        sku_val: s
                    }), wx.showToast({
                        title: e,
                        icon: "none",
                        duration: 2e3
                    });
                } else {
                    i.closeSku(), (0, status.cartNum)(t.data.total), i.setData({
                        cartNum: t.data.total
                    }), wx.showToast({
                        title: "已加入购物车",
                        image: "../../images/addShopCart.png"
                    });
                }
            }).catch(function(t) {
                app.util.message(t || "请求失败", "", "error");
            });
        },
        selectSku: function(t) {
            var a = t.currentTarget.dataset.type.split("_"), e = this.data.sku, s = {
                name: a[3],
                id: a[2],
                index: a[0],
                idx: a[1]
            };
            e.splice(a[0], 1, s), this.setData({
                sku: e
            });
            for (var i = "", o = 0; o < e.length; o++) o == e.length - 1 ? i += e[o].id : i = i + e[o].id + "_";
            var d = this.data.skuList.sku_mu_list[i];
            this.setData({
                cur_sku_arr: d
            }), console.log(i);
        },
        setNum: function(t) {
            var a = t.currentTarget.dataset.type, e = 1, s = 1 * this.data.sku_val;
            "add" == a ? e = s + 1 : "decrease" == a && 1 < s && (e = s - 1);
            var i = this.data.sku, o = this.data.skuList;
            if (0 < i.length) for (var d = "", u = 0; u < i.length; u++) u == i.length - 1 ? d += i[u].id : d = d + i[u].id + "_";
            0 < o.length ? e > o.sku_mu_list[d].canBuyNum && (e -= 1) : e > this.data.cur_sku_arr.canBuyNum && (e -= 1);
            this.setData({
                sku_val: e
            });
        },
        closeSku: function() {
            this.setData({
                visible: 0,
                stopClick: !1
            });
        },
        changeCartNum: function(t) {
            var a = t.detail;
            (0, status.cartNum)(this.setData({
                cartNum: a
            }));
        },
        onReachBottom: function() {
            console.log("这是我的底线"), this.getData();
        }
      }
    }
</script>

<style scoped>
 .none-rush-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-bottom: 140rpx;
    padding-top: 140rpx;
}

.none-rush-list .img-block {
    width: 240rpx;
    height: 240rpx;
    margin-bottom: 30rpx;
}

.none-rush-list .h1 {
    font-size: 32rpx;
    line-height: 32rpx;
    color: #444;
    margin-bottom: 20rpx;
}

.none-rush-list .h2 {
    font-size: 24rpx;
    line-height: 24rpx;
    color: #aaa;
}
</style>
