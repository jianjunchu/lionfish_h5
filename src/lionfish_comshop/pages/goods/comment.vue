<template>
  <div>
    <div class="goodsInfo">
      <!--<i-img class="goodsImg" defaultImage="@/assets/images/placeholder-refund.png" height="90" iClass="img-class" :loadImage="goods.one_image" width="90"></i-img>-->
      <i-img class="goodsImg" defaultImage="@/assets/images/placeholder-refund.png" height="90" iClass="img-class" :loadImage="goods.one_image" width="90"></i-img>
      <div class="goodsDetail">
        <div class="detailTop">
          <div class="detailTopInfo">
            <div class="goodsName">{{goods.goodsname}}</div>
            <div class="purchasing" v-if="goods.one_limit_count>0||goods.total_limit_count>0">
              <span v-if="goods.total_limit_count>0">每人限购{{goods.total_limit_count}}份</span>
              <span v-if="goods.one_limit_count>0"> 每单限购{{goods.one_limit_count}}份</span>
            </div>
            <div class="saleNum">已售{{goods.seller_count}}份，剩余{{goods.total}}份</div>
          </div>
          <!--<button class="shareBtn" hoverClass="none" openType="share">-->
            <!--<img class="shareImg" src="@/assets/images/shareImg.png"/>-->
          <!--</button>-->
        </div>
        <div class="detailBottom">
          <div class="price">$
            <span class="salePrice">{{goods.price_front}}</span>.{{goods.price_after}}</div>
          <div class="time">
            <span v-if="goods.over_type==1">距结束</span>
            <span class="endAct" v-if="goods.over_type==0">距开始</span>
            <span class="endAct" v-if="goods.over_type==2">结束时间</span>
            <span class="endAct" v-if="goods.over_type==2">{{goods.end_date}}</span>
            <div class="countdown-class i-count-down">
              <em v-if="endtime.days>0">{{endtime.days}}天</em>
              <span class="item-class">{{endtime.hours}}</span>:
              <span class="item-class">{{endtime.minutes}}</span>:
              <span class="item-class">{{endtime.seconds}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="noComments" :style="{height:containerHeight+'px'}" v-if="showData==0">
      <div class="noCommentsCon">
        <img class="noCommentsImg" src="@/assets/images/noData.png"></img>
        <div class="noCommentsTit">暂无评论</div>
      </div>
    </div>
    <div class="comments" v-if="showData==1">
      <div class="commentsDetail">
        <div class="commentsList"  v-for="(item,index) in list" :key="item.id" >
          <i-card>
            <div class="commentsListInfo" slot="content">
              <div class="comment-user">
                <img :src="item.avatar"></img>
                <span>{{item.user_name}}</span>
              </div>
              <div bindlongpress="copy" @click="bindOpen" :class="['commentsCon', (item.isOpen&&item.showOpen?'doubleHidden':'')]" :data-idx="index" :data-val="item.content">{{item.content}}</div>
              <div class="commentsOpen" v-if="item.showOpen">
                <span @click="bindOpen" :data-idx="index">{{item.isOpen?'展开':'收起'}}</span>
                <img class="['commentsOpenImg', (item.isOpen?'down':'')]" src="@/assets/images/commentsOpen.png"></img>
              </div>
              <div class="commentsImgCon" v-if="item.images.length>0">
                <div class="commentsImg"  v-for="(imgItem,idx) in item.images" :key="item.index" >
                  <!--<i-img @click="preview" class="goodsImg" :data-idx="idx" :data-index="index" height="75" iClass="img-class" imgType="5" :loadImage="imgItem" width="75"></i-img>-->
                  <img class="goodsImg" :src="imgItem" style="width:75px;height:75px;"/>
                </div>
              </div>
              <div class="commentsTime">{{item.add_time}}</div>
            </div>
          </i-card>
        </div>
        <i-load-more iClass="loadMore" :loading="loadMore" :tip="tip"></i-load-more>
      </div>
    </div>
    <div class="i-fixed-bottom">
      <div class="goods-bottom-bar">
        <div class="leftBtn">
          <a hoverClass="none" openType="switchTab" href="#/lionfish_comshop/pages/index/index">
            <div class="bar-item back-to-index">
              <!--<img class="icon" :src="iconArr.home"></img>-->
              <img class="icon" src="@/assets/images/icon-tab-index.png"  height="27px" width="27px"/>
              回首页
            </div>
          </a>
          <a hoverClass="none" openType="switchTab" href="#/lionfish_comshop/pages/order/shopCart">
            <div class="bar-item shop-cart">
              <div class="icon">
                <!--<img :src="iconArr.car"></img>-->
                <img src="@/assets/images/icon-tab-shop.png" height="27px" width="27px"/>
                <div class="cart-num" v-if="cartNum">{{cartNum}}</div>
              </div>
              购物车
            </div>
          </a>
        </div>
        <div class="goodsStatus" v-if="goods.total<=0">已抢光</div>
        <div class="goodsStatus" v-else-if="goods.total>0&&goods.over_type==2">团购已结束</div>
        <div class="goodsStatus" v-else-if="goods.grounding!=1">已下架</div>
        <div class="goodsStatus" v-else-if="goods.over_type==0">即将开抢</div>
        <div class="goodsStatus" v-else-if="is_comunity_rest==1">团长休息中</div>
        <div class="gobuy" v-else>
          <form @click="addToCart" reportSubmit="true">
            <div class="bar-item add-to-cart" :style="{background: goodsdetails_addcart_bg_color}">加入购物车</div>
            <button class="btn" formType="submit"></button>
          </form>
          <form @click="submit" reportSubmit="true">
            <button hidden formType="submit" id="formId"></button>
          </form>
          <label class="balanceBtn" for="formId">
            <div @click="balance" class="bar-item balance" :style="{background: goodsdetails_buy_bg_color}">立即购买</div>
          </label>
        </div>
      </div>
    </div>
    <div @click="closeSku" class="mask" v-show="visible"></div>
    <div @click="closeSku" class="sku-content" v-show="visible" scrollUp="true">
      <div class="sku-card">
        <div @click="closeSku" class="close">
          <img src="@/assets/images/icon-sku-close.png"></img>
        </div>
        <div class="sku-header">
          <img class="sku-img" :src="cur_sku_arr.skuImage" style="width:80px;height:80px;"></img>
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
            <div class="sku-switch-on" v-if="cur_sku_arr.spec">已选择：{{cur_sku_arr.spec}}</div>
          </div>
        </div>
        <div class="sku-spec"  v-for="(item,idx) in skuList.list" :key="item.id" >
          <div class="title">{{item.name}}</div>
          <div class="spec-list">
            <span @click="selectSku" :class="idx==sku[index]['idx']?'on':''" :data-disabled="item.canBuyNum-value<0" :data-idx="idx" :data-type="index_idx_value.option_value_id_value.name"  v-for="(value,idx) in item.option_value" :key="item.id" >{{value.name}}</span>
          </div>
        </div>
        <div class="sku-num-content">
          <div class="title">数量</div>
          <div :class="['i-class i-input-number', 'i-input-number-size-'+size]">
            <div @click="setNum" :class="['i-input-number-minus', (value<=min?'i-input-number-disabled':'')]" data-type="decrease">
              <img src="@/assets/images/icon-input-reduce.png"></img>
            </div>
            <input bindblur="handleBlur" bindfocus="handleFocus" :class="['i-input-number-text', (min>=max?'i-input-number-disabled':'')]" disabled="true" type="number" :value="sku_val"></input>
            <div @click="setNum" :class="['i-input-number-plus', (value>=max?'i-input-number-disabled':'')]" data-type="add">
              <img src="@/assets/images/icon-input-add.png"></img>
            </div>
          </div>
          <!--<div class="msg" v-if="skuList[current].isLimit">-->
            <!--<span v-if="skuList[current].limitMemberNum>-1">每人限{{skuList[current].limitMemberNum}}单</span>-->
            <!--<span v-if="skuList[current].limitOrderNum>-1">每单限{{skuList[current].limitOrderNum}}份</span>-->
            <!--<span></span>-->
          <!--</div>-->
          <!--<div class="even-num" v-else-if="!skuList[current].isLimit&&skuList[current].canBuyNum-value<=10&&skuList[current].canBuyNum-value>-1">还可以购买 {{skuList[current].canBuyNum-value}} 件</div>-->
        </div>
        <form bindsubmit="gocarfrom" reportSubmit="true">
          <button class="sku-confirm" :disabled="cur_sku_arr.stock==0?true:false" formType="submit">
            <div>{{cur_sku_arr.stock==0?'已抢光':'确定'}}</div>
          </button>
        </form>
      </div>
    </div>
  </div>
  <!--<i-new-auth bind:authSuccess="authSuccess" bind:cancel="authModal" needAuth="{{needAuth&&showAuthModal}}" needPosition="{{needPosition}}"></i-new-auth>-->
  <!--<i-vip-modal imgUrl="{{pop_vipmember_buyimage}}" visible="{{showVipModal}}"></i-vip-modal>-->

</template>

<script>
  import GlobalMixin from '../../mixin/globalMixin.js';
  import util from '../../utils/index.js'
  import status from '../../utils/index.js';
  var buyClearTime = null;

  function count_down(t, a) {
    var e = Math.floor(a / 1000), o = e / 3600 / 24, i = Math.floor(o), s = e / 3600 - 24 * i, n = Math.floor(s), d = e / 60 - 1440 * i - 60 * n, r = Math.floor(d), c = e - 86400 * i - 3600 * n - 60 * r;

        t.endtime= {
          days: fill_zero_prefix(i),
          hours: fill_zero_prefix(n),
          minutes: fill_zero_prefix(r),
          seconds: fill_zero_prefix(c),
          show_detail: 1
        }
      if( a <= 0 ){
        clearTimeout(buyClearTime);
        t.endtime= {
          days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00"
        }
        return;
      }

    buyClearTime = setTimeout(function() {
      count_down(t, a -= 1000);
    }, 1000);
  }

  function fill_zero_prefix(t) {
    return t < 10 ? "0" + t : t;
  }

  export default {
    mixins: [GlobalMixin],
    name:'protocol',
    data() {
      return {
        value:0,
        min:0,
        max:0,
        size:1,
        endtime: {
          days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00"
        },
        goods_id:0,
        showData: 1,
        cartNum: 0,
        needAuth: !1,
        iconArr: {
          home: "",
          car: "",
        },
        list: [],
        loadMore: !0,
        tip: "加载中",
        page: 1,
        hasRefeshin: !1,
        goodId: 0,
        community_id: 0,


        order_comment_count: 0,
        order_comment_images: [],
        comment_list: [],
        loadover: true,
        goods: {},
        buy_record_arr: {},
        site_name: '',
        share_title: '',
        options: [],
        goods_image: [],
        goods_image_length: 0,
        service: '',
        favgoods: [],
        cur_time: 0,
        order: {
        goods_id: 0,
          pin_id: 0
      },
      showSkeleton: false,
      is_comunity_rest: 0,
      goodsdetails_addcart_bg_color:  "linear-gradient(270deg, #f9c706 0%, #feb600 100%)",
      goodsdetails_buy_bg_color:  "linear-gradient(90deg, #ff5041 0%, #ff695c 100%)",

        sku: [],
        sku_val: 1,
        cur_sku_arr: {
          skuImage:'',
          spuName:'',
          actPrice:[],
          marketPrice:[],
          card_price:0,
          levelprice:0,
          spec:'',
          stock:0
        },
        skuList: [],
        visible:false,

        hasRefeshin : !1,
        loadMore:false
      }
    },
    created: function() {
      this.$wx.setNavigationBarTitle({
        title: '',
        showLogo:false,
        showMore:false,
        showBack:true
      })
      this.onLoad();
      this.onShow();
    },
    methods: {
      onLoad: function() {

        var o = this.$route.query;
        var i = this;
        var s = this.$wx.getStorageSync("token");
        status.setNavBgColor();
//        status.setIcon().then(function(t) {
//          i.iconArr=t;
//        });
        this.goodId = o.id, this.community_id = o.community_id;
        var t = this.$wx.getStorageSync("community");
        var n = (t && t.communityId) || "";

        if (n) {
            console.log("step3");
          i.paramHandle(o);
            i.get_goods_details();
        } else {
          var a = {};
          if(void 0 !== o.community_id && 0 < o.community_id ){
              a.communityId = o.community_id;
          }
            util.getCommunityInfo(a).then(function(t) {
              console.log("step1");
              i.paramHandle(o);
              i.get_goods_details(t);
            }).catch(function(t) {
              console.log("step4 新人");
              if("" != Object.keys(t)){
                i.addhistory(t, !0);
              }
            });
        }

        if("undefined" != o.share_id && 0 < o.share_id ){
          this.$wx.setStorage({
            key: "share_id",
            data: o.share_id
          });
        }
      },
      paramHandle:function(o) {

        var i=this;
    console.log("step2");
    if("undefined" != o.community_id && 0 < o.community_id ){
      this.$http({

        controller: "index.get_community_info",
        community_id: o.community_id
      }).then(t=> {
        console.log(t,"get_community_info");
        if (0 == t.code) {
          var a = t.data, e = n;
          if(o.community_id != e) {
            this.$wx.showModal({
              title: "温馨提示",
              content: "是否切换为分享人所在小区“" + a.communityName,
              confirmColor: "#F75451",
              success: function (t) {
                if (t.confirm) {
                  this.$app.globalData.community = a;
                  this.$app.globalData.changedCommunity = !0;

                  this.$wx.setStorage({
                    key: "community",
                    data: a
                  });
                  s && i.addhistory(a);
                  i.get_goods_details(a);
                  console.log("用户点击确定")
                } else if (t.cancel) {
                  i.showNoBindCommunity();
                  console.log("用户点击取消");
                }
              }
            });
          }
        }
      })
    }
    i.goods_id= o.id;
    i.load_comment_list();

  },
      get_goods_details:function(t) {
        var o = this.$route.query;
        var i = this;
        var s = this.$wx.getStorageSync("token");

    var n = 0;
    if(t){
      n = t.communityId
    }
    this.$http({
      controller: "goods.get_goods_detail",
      token: s,
      id: o.id,
      community_id: n
    }).then(t=> {
      console.log(t,"get_goods_detail");

      this.$wx.hideLoading();
      var a = t.data && t.data.goods || "";
      if(!a || 0 == a.length || "" == Object.keys(a) ){
        this.$wx.showModal({
          title: "提示",
          content: "该商品不存在，回首页",
          showCancel: !1,
          confirmColor: "#F75451",
          success: function(t) {
            if(t.confirm){
              this.$wx.switchTab({
                url: "/lionfish_comshop/pages/index/index"
              });
            }
          }
        });
      }

      var e = t.comment_list;
//      e.map(function(t) {
//        3 < 14 * t.content.length / app.globalData.systemInfo.windowWidth && (t.showOpen = !0),
//          t.isOpen = !0;
//      });

      i.order_comment_count= t.order_comment_count,
      i.order_comment_images= t.order_comment_images,
      i.comment_list= e,
      i.loadover= !0,
      i.goods= a;
      i.max = a.total;
      i.min = 1;
      i.buy_record_arr= t.data.buy_record_arr,
      i.site_name= t.data.site_name,
      i.share_title= a.share_title,
      i.options= t.data.options,
      i.goods_image= t.data.goods_image,
      i.goods_image_length= t.data.goods_image.length,
      i.service= a.tag,
      i.favgoods= a.favgoods,
      i.cur_time= t.data.cur_time,
      i.order= {
        goods_id: t.data.goods.goods_id,
        pin_id: t.data.pin_id
      },
      i.showSkeleton= !1,
      i.is_comunity_rest= t.is_comunity_rest,
      i.goodsdetails_addcart_bg_color= t.goodsdetails_addcart_bg_color || "linear-gradient(270deg, #f9c706 0%, #feb600 100%)",
      i.goodsdetails_buy_bg_color= t.goodsdetails_buy_bg_color || "linear-gradient(90deg, #ff5041 0%, #ff695c 100%)";
      i.list = i.list || [];
      i.endtime= {
        days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00"
      };
      i.showData= 1;
      i.cartNum= 0;
      i.visible = false;
      i.sku= [],
      i.sku_val= 1,
      i.cur_sku_arr= {
        skuImage: '',
        spuName: '',
        actPrice:[],
        marketPrice:[],
        card_price:0,
        levelprice:0,
        spec:'',
        stock:0
      },
      i.skuList= [];
      i.page=i.page > 1 ? i.page : 1;
      i.hasRefeshin = !1,
      i.loadMore=false;
      i.size=1;
      i.showData = 1;
      console.log(i.page,"i.page in get_goods_detail");
      console.log(i.showData,"i.showData in get_goods_detail");
      if(1 == t.is_comunity_rest){
        this.$wx.showModal({
          title: "温馨提示",
          content: "团长休息中，欢迎下次光临!",
          showCancel: !1,
          confirmColor: "#F75451",
          confirmText: "好的",
          success: function(t) {}
        });
      }

      let over_type = a.over_type;
      var seconds = 0;
      if (over_type == 0) {
        seconds = (a.begin_time - t.data.cur_time) * 1000;
      } else {
        seconds = (a.end_time - t.data.cur_time) * 1000;
      }
      if (seconds > 0) {
        count_down(i, seconds);
      }
      this.$forceUpdate();
    });
  },
      showNoBindCommunity: function() {
        this.$wx.showModal({
          title: "提示",
          content: "您未绑定该小区，请切换后下单！",
          showCancel: !1,
          confirmColor: "#F75451",
          success: function(t) {
            if(t.confirm){
              this.$wx.redirectTo({
                url: "/lionfish_comshop/pages/position/community"
              });
            }
          }
        });
      },
      addhistory: function(t) {
        var a = 1 < arguments.length && void 0 !== arguments[1] && arguments[1];
        var e = t.communityId;
        console.log("addhistory");
        var o = this.$wx.getStorageSync("token");
        this.$http({
            controller: "index.addhistory_community",
            community_id: e,
            token: o
          }).then(t=> {
            if (a) {
              console.log("新人 社区")
              this.$http({
                controller: "index.get_community_info",
                community_id: e
              }).then(t => {
                if (0 == t.code) {
                  var a = t.data;
                  this.$app.globalData.community = a;
                  this.$app.globalData.changedCommunity = !0;
                  this.$wx.setStorage({
                    key: "community",
                    data: a
                  });
                }

              });
            }
           });
      },
      load_comment_list: function() {
        var t = this.goods_id;
        var a = this.$wx.getStorageSync("token");
        var o = this;
        if(!this.hasRefeshin){
          o.hasRefeshin = !0, o.loadMore= !0,
            o.tip= "加载中";
            this.$http({

              controller: "goods.comment_info",
              token: a,
              goods_id: t,
              page: o.page
            }).then(t=> {
                console.log(t,"comment_info");
              if (0 == t.code) {
                var a = t.list;
//                a.map(function(t) {
//                  3 < 14 * t.content.length / this.$app.globalData.systemInfo.windowWidth && (t.showOpen = !0),
//                    t.isOpen = !0;
//                });

                if (!o.list)
                  o.list = [];

                var e = o.list.concat(a);
                o.page++;
                o.hasRefeshin = !1;
                  o.list= e;
                  o.loadMore= !1;
                  o.tip= "";
                  o.showData = 1;
                console.log(o.page,"o.page in comment_info");
                console.log(o.showData,"o.showData in comment_info");
                  o.$forceUpdate();
              } else if(1 == t.code){
                if(1 == o.page) {
                  o.showData= 0;
                  o.loadMore= !1;
                  o.tip= "^_^已经到底了";
                }

              }
            })
        }

      },
      authSuccess: function() {
        var t = this.goodId, a = this.$wx.getStorageSync("community"), e = a && a.communityId || this.community_id || "";
        this.$wx.redirectTo({
          url: "/lionfish_comshop/pages/goods/comment?id=" + t + "&community_id=" + e
        });
      },
      authModal: function() {
        if(this.needAuth) {
          this.showAuthModal = !this.showAuthModal;
        }
        if(this.showAuthModal){
          this.$wx.navigateTo({
            url: "/login"
          })
        }
        return true;
      },
      onShow: function() {
        var a = this;
        util.check_login_new().then(function(t) {
            console.log(t,"check_login_new");

          if(!t){
            a.needAuth= !0;
          } else {
            status.cartNum().then(function(e) {
                console.log(e,"cartNum");

              if(0 == e.code) {
                a.cartNum = e.data
              }
            })
          }
        });
      },
      addToCart: function(t) {
        if (this.authModal()) {
          var a = t.detail.formId, e = this.$wx.getStorageSync("token");
          this.$http({

              controller: "user.get_member_form_id",
              token: e,
              from_id: a
            }).then(t=> {
            });
          this.is_just_addcar= 1;
          this.openSku();
        }
      },
      openSku: function() {

        var t = this.goods_id, a = this.options;
        this.addCar_goodsid= t;
        var e = a.list || [], o = [];
        if (0 < e.length) {
          for (var i = 0; i < e.length; i++) {
            var s = e[i].option_value[0], n = {
              name: s.name,
              id: s.option_value_id,
              index: i,
              idx: 0
            };
            o.push(n);
          }
          for (var d = "", r = 0; r < o.length; r++) r == o.length - 1 ? d += o[r].id : d = d + o[r].id + "_";
          var c = a.sku_mu_list[d];

            this.sku= o,
            this.sku_val= 1,
            this.cur_sku_arr= c,
            this.skuList= a,
            this.visible= !0,
            this.showSku= !0;
        } else {
          var u = this.goods, l = {
            canBuyNum: u.total,
            spuName: u.goodsname,
            actPrice: u.actPrice,
            marketPrice: u.marketPrice,
            stock: u.total,
            skuImage: u.image_thumb
          };
          this.sku= [],
            this.sku_val= 1,
            this.cur_sku_arr= l,
            this.skuList= [];

          var m = {
            detail: {
              formId: ""
            }
          };
          m.detail.formId = "the formId is a mock one";
          this.gocarfrom(m);
        }
      },
      gocarfrom: function(t) {
        this.is_just_addcar;
        this.$wx.showLoading();
        var a = this.$wx.getStorageSync("token");
        this.$http({

            controller: "user.get_member_form_id",
            token: a,
            from_id: t.detail.formId
          }).then(t=> {
        });
        this.goOrder();
      },
      closeSku: function() {
        this.visible= 0,
          this.stopClick= !1;
      },
      goOrder: function() {

        var i = this;
        i.can_car && (i.can_car = !1);
        this.$wx.getStorageSync("token");
        var t = this.$wx.getStorageSync("community"), s = i.goods_id, a = t.communityId, e = i.sku_val, o = i.cur_sku_arr, n = "", d = i.is_just_addcar;
        o && o.option_item_ids && (n = o.option_item_ids);
        var r = {
          goods_id: s,
          community_id: a,
          quantity: e,
          sku_str: n,
          buy_type: "dan",
          pin_id: 0,
          is_just_addcar: d
        };
        util.addCart(r).then(function(t) {
            console.log(t,"addCart");

          if (1 == t.showVipModal) {
            var a = t.data.pop_vipmember_buyimage;
            i.$wx.hideLoading();
            i.pop_vipmember_buyimage= a,
              i.showVipModal= !0,
              i.visible= !1;
          } else if (3 == t.code || 7 == t.code)
              i.$wx.showToast({
            title: t.msg,
            icon: "none",
            duration: 3000
          }); else if (4 == t.code) i.$wx.showToast({
            title: "您未登录",
            duration: 2e3
          }); else if (6 == t.code) {
            var e = t.msg, o = t.max_quantity || "";
            if(0 < o){
              i.sku_val= o;
              i.$wx.showToast({
                title: e,
                icon: "none",
                duration: 2e3
              });
            }
          } else {
            if (1 == d) {
//              i.closeSku(), i.$wx.showToast({
//                title: "已加入购物车",
//                image: "@/assets/images/addShopCart.png"
//              }), this.$app.globalData.cartNum = t.total, i.cartNum = t.total, status.indexListCarCount(s);

              i.closeSku();
              i.$wx.showToast({
                title: this.$t('cart.yijiarugouwuche'),
                image: "@/assets/images/addShopCart.png"
              });
              i.$app.globalData.cartNum = t.total;
              i.cartNum= t.total;
              status.indexListCarCount(s);

            }else {
//              3 < getCurrentPages().length ? this.$wx.redirectTo({
//                url: "/lionfish_comshop/pages/order/placeOrder?type=dan"
//              }) : this.$wx.navigateTo({
//                url: "/lionfish_comshop/pages/order/placeOrder?type=dan"
//              });
              i.$wx.redirectTo({
                url: "/lionfish_comshop/pages/order/placeOrder?type=dan"
              });
            }
          }
        }).catch(function(t) {
//          app.util.message(t || "请求失败", "", "error");
          i.$wx.showToast({
            title: t || "请求失败",
            icon: "none",
            duration: 2000
          })
        });
      },
      selectSku: function(t) {
        var a = t.currentTarget.dataset.type.split("_"), e = this.sku, o = {
          name: a[3],
          id: a[2],
          index: a[0],
          idx: a[1]
        };
        e.splice(a[0], 1, o), this.sku= e;
        for (var i = "", s = 0; s < e.length; s++) s == e.length - 1 ? i += e[s].id : i = i + e[s].id + "_";
        var n = this.skuList.sku_mu_list[i];
        this.cur_sku_arr= n, console.log(i);
      },
      submit: function(t) {
        var a = t.detail.formId, e = this.$wx.getStorageSync("token");
        this.$http({
            controller: "user.get_member_form_id",
            token: e,
            from_id: a
          }).then(t=> {
        });
      },
      balance: function(t) {
        this.authModal() && (this.is_just_addcar= 0, this.openSku());
      },
      setNum: function(t) {
        var a = t.currentTarget.dataset.type, e = 1, o = 1 * this.sku_val;
        "add" == a ? e = o + 1 : "decrease" == a && 1 < o && (e = o - 1);
        for (var i = this.sku, s = this.skuList, n = "", d = 0; d < i.length; d++) d == i.length - 1 ? n += i[d].id : n = n + i[d].id + "_";
        e > s.sku_mu_list[n].canBuyNum && (e -= 1), this.sku_val= e,this.value=e;
      },
      preview: function(t) {
        var a = t.currentTarget.dataset.index, e = t.currentTarget.dataset.idx;
//        this.$wx.previewImage({
//          urls: this.data.list[a].images,
//          current: this.data.list[a].images[e],
//          fail: function(t) {
//            this.$wx.showToast({
//              title: "预览图片失败，请重试",
//              icon: "none"
//            }), console.log(t);
//          }
//        });
      },
      copy: function(t) {
//        this.$wx.setClipboardData({
//          data: t.currentTarget.dataset.val,
//          success: function() {
//            this.$wx.showToast({
//              title: "内容复制成功！",
//              icon: "none"
//            });
//          }
//        });
      },
      bindOpen: function(t) {
        var a = t.currentTarget.dataset.idx;
        if (this.list[a].isOpen) {
          this.list[a].isOpen = !1;
          var e = this.list;
          this.list= e;
        } else {
          this.list[a].isOpen = !0;
          e = this.list;
          this.list= e;
        }
      },
      onReachBottom: function() {
        console.log("我是底线"), this.load_comment_list();
      },
    }
  }
</script>
<style>
  @import "comment.less";
</style>
