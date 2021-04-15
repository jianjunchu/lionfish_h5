<template>
  <div class="wrap">
    <div class="details">
      <div class="tit">审核进度：</div>
      <div class="timeline" v-if="order_refund_historylist.length">
        <div class="timeline-item timeline-first-item" v-for="(item , index) in order_refund_historylist" :key="index">
          <div class="timeline-item-divider"></div>
          <div class="timeline-item-content">
            <div>{{item.message}}</div>
            <div class="datetime">{{item.addtime}}</div>
          </div>
        </div>
      </div>
      <div class="noplan" v-else>暂无记录</div>
    </div>
    <div class="details" style="display:none;">
      <div class="tit">审核留言：</div>
      <div class="content">审核成功</div>
    </div>
    <div class="details">
      <div class="tit">审核详情：</div>
      <div class="goods">
        <div class="goods-item">
          <div style="goods-item-l">
            <i-img height="60" iClass="show-img" lazyLoad="true" :loadImage="order_goods.goods_images" width="60"></i-img>
          </div>
          <div class="goods-item-r">
            <div class="name">{{order_goods.name}}</div>
            <div class="mount">
              <block v-if="order_goods.option_str">{{order_goods.option_str}} </block>${{order_goods.price}} x {{order_goods.quantity}}
            </div>
            <div class="price">${{order_goods.total}}</div>
          </div>
        </div>
      </div>
      <div class="ll">实际退款金额：<span>${{order_refund.ref_money}}</span>
      </div>
      <div class="ll">问题类型：<span>{{order_refund.ref_name}}</span>
      </div>
      <div class="ll" v-if="order_refund.complaint_name">联系人： <span>{{order_refund.complaint_name}}</span>
      </div>
      <div class="ll">联系方式： <span>{{order_refund.ref_mobile}}</span>
      </div>
    </div>
    <div class="details" v-if="refund_images.length">
      <div class="tit">商品图片：</div>
      <div class="img-list">
        <i-img height="100" iClass="img" lazyLoad="true" :loadImage="item.thumb_image" width="100" v-for="(item,index) in refund_images" :key="index"></i-img>
      </div>
    </div>
    <div class="details">
      <div class="tit">问题描述：</div>
      <div class="content">{{order_refund.ref_description}}</div>
    </div>
    <div class="btn" v-if="order_refund.state==0">
      <div @click.stop="cancelApply" class="btn-item bule">撤销申请</div>
      <div @click.stop="editApply" class="btn-item red">修改申请</div>
    </div>
  </div>

</template>

<script>
  import util from '../../utils'
  var app,wx
  export default {
    name: 'refunddetail',
    data(){
      return{
        ref_id: 0,
        order_goods: {},
        order_id: 0,
        order_info: {},
        order_refund: {},
        order_refund_historylist: [],
        refund_images: []
      }
    },
    created:function() {
      app = this.$app;
      wx = this.$wx;

      wx.setNavigationBarTitle({
        title: "Refund Detail",
        showLogo:false,
        showMore:false,
        showBack:true
      })

      const t = this.$route.query
      this.onLoad(t)
    },
    methods:{
      onLoad: function(e) {
        var r = e.id, o = this;
        o.ref_id = r
        o.getData()
      },
      onShow: function() {},
      onPullDownRefresh: function() {
        this.getData();
      },
      sub_cancle: function() {
        var r = this.order_id, e = this.ref_id, o = wx.getStorageSync("token");
        app.util.request({
          url: "entry/wxapp/user",
          data: {
            controller: "user.cancel_refund",
            token: o,
            ref_id: e
          },
          dataType: "json",
          success: function(e) {
            3 == e.code || 1 == e.code && wx.showToast({
              title: "撤销成功",
              icon: "success",
              duration: 1e3,
              success: function(e) {
                wx.redirectTo({
                  url: "/ulink_comshop/pages/order/order?id=" + r
                });
              }
            });
          }
        });
      },
      getData: function() {
        var e = this.ref_id, r = wx.getStorageSync("token"), s = this;
        app.util.request({
          url: "entry/wxapp/user",
          data: {
            controller: "afterorder.refunddetail",
            token: r,
            ref_id: e
          },
          dataType: "json",
          success: function(e) {
            if (3 == e.code) ; else if (1 == e.code) {
              var r = e, o = r.order_goods, t = r.order_id, d = r.order_info, i = r.order_refund, n = r.order_refund_historylist, a = r.refund_images;
                s.order_goods = o,
                s.order_id = t,
                s.order_info = d,
                s.order_refund=  i,
                s.order_refund_historylist = n,
                s.refund_images = a;
            }
          }
        });
      },
      cancelApply: function() {
        var r = this;
        wx.showModal({
          title: "撤销申请",
          content: "退款申诉一旦撤销就不可恢复，并且不可以再次申请，确定要撤销本次申诉吗？",
          confirmText: "我要撤销",
          confirmColor: "#ff5344",
          cancelText: "暂不撤销",
          showCancelButton:true,
          cancelColor: "#666666",
          success: function(e) {
            e.confirm && r.sub_cancle();
          }
        });
      },
      editApply: function() {
        var e = this, r = e.order_goods, o = e.order_refund.ref_id || 0, t = r.order_id || 0, d = r.order_goods_id || 0;
        o && t && d && wx.navigateTo({
          url: "/ulink_comshop/pages/order/refund?ref_id=" + o + "&id=" + t + "&order_goods_id=" + d
        });
      }
    }


  }
</script>

<style scoped>
  .wrap {
    padding-bottom: 10vw;
  }

  .details {
    padding: 3vw;
    background-color: #fff;
    margin-bottom: 2vw;
  }

  .tit {
    padding-bottom: 2vw;
  }

  .content {
    color: #666;
  }

  .timeline {
    display: flex;
    flex-direction: column;
    position: relative;
  }

  .timeline-item {
    display: flex;
    flex-direction: row;
    position: relative;
    padding-bottom: 2vw;
    box-sizing: border-box;
    overflow: hidden;
  }

  .timeline-item .timeline-item-keynode {
    width: 16vw;
    flex-shrink: 0;
    box-sizing: border-box;
    padding-right: 2vw;
    text-align: right;
    line-height: 6.5vw;
  }

  .timeline-item .timeline-item-divider {
    flex-shrink: 0;
    position: relative;
    width: 3vw;
    height: 3vw;
    top: 0.6vw;
    border-radius: 50%;
    background-color: #bbb;
  }

  .timeline-item-divider::before,.timeline-item-divider::after {
    position: absolute;
    left: 1.5vw;
    width: 0.1vw;
    height: 100vh;
    content: '';
    background: inherit;
  }

  .timeline-item-divider::before {
    bottom: 100%;
  }

  .timeline-item-divider::after {
    top: 100%;
  }

  .timeline .timeline-item:last-child .timeline-item-divider:after {
    display: none;
  }

  .timeline .timeline-item:first-child .timeline-item-divider:before {
    display: none;
  }

  .timeline-item .timeline-item-content {
    padding-left: 2vw;
  }

  .timeline-last-item .bottom-border::after {
    display: none;
  }

  .timeline-item-content .datetime {
    color: #ccc;
  }

  .goods {
    background-color: #fff;
  }

  .goods-item {
    position: relative;
    display: flex;
    padding: 3vw;
  }

  .goods-item-r {
    flex: 1;
    margin-left: 2vw;
    width: 0;
  }

  .show-img {
    width: 12vw;
    height: 12vw;
  }

  .name {
    font-size: 2.6vw;
    color: #444;
    span-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .mount {
    font-size: 2.2vw;
    color: #aaa;
    margin-top: 0.8vw;
  }

  .goods-item .price {
    display: block;
    font-size: 2.8vw;
    color: #444;
    margin-top: 1.4vw;
  }

  .img-list {
    display: flex;
  }

  .img-list .img {
    width: 20vw;
    height: 20vw;
    margin-right: 3vw;
  }

  .ll {
    color: #666;
    line-height: 2;
  }

  .ll span {
    color: #333;
  }

  .btn {
    display: flex;
    line-height: 9.8vw;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .btn-item {
    flex: 1;
    text-align: center;
    color: #fff;
  }

  .btn-item.red {
    background: linear-gradient(270deg,#f9c706 0%,#feb600 100%);
  }

  .btn-item.bule {
    background: linear-gradient(90deg,#ff5041 0%,#ff695c 100%);
  }
</style>
