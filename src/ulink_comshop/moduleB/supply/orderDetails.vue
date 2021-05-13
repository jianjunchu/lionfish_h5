<template>
<div class="wrap">
	<div class="head">
		<div class="back-img-wrap">
			<img class="back-img" src="@/assets/images/TOP_background@2x.png"/>
		</div>
		<div class="to-get-wrap" v-if="order.order_info.order_status_id==1">
			<div class="font-bold-20">{{$t('supply.beihuozhong')}}</div>
			<img class="little-img" src="@/assets/images/img_delivery@2x.png"/>
		</div>
		<div class="to-get-wrap" v-if="order.order_info.order_status_id==2">
			<div class="font-bold-20">{{$t('supply.pintuanzhongyifukuan')}}</div>
			<img class="little-img" src="@/assets/images/img_delivery@2x.png"/>
		</div>
		<div class="to-get-wrap" v-if="order.order_info.order_status_id==14">
			<div class="font-bold-20">{{$t('supply.peisongzhong')}}</div>
			<img class="little-img" src="@/assets/images/img_delivery@2x.png"/>
		</div>
		<div class="to-get-wrap" v-if="order.order_info.order_status_id==4">
			<div class="font-bold-20">{{order.order_status_info.name?order.order_status_info.name:$t('supply.ketihuo')}}</div>
			<img class="little-img" src="@/assets/images/img_ready_to_get@2x.png"/>
		</div>
		<div class="to-get-wrap" v-if="order.order_info.order_status_id==6">
			<div class="font-bold-20">{{$t('supply.yiqianshou')}}</div>
			<img class="little-img" src="@/assets/images/img_trade_succeed@2x.png"/>
		</div>
		<div class="trade-cancel-wrap" v-if="order.order_info.order_status_id==10">
			<div class="font-bold-20 cancel-box">
				<img class="cancel-img" src="@/assets/images/icon_exclamation@2x.png"/>{{$t('supply.dengdaituikuan')}}
			</div>
		</div>
		<div class="to-get-wrap" v-if="order.order_info.order_status_id==11">
			<div class="font-bold-20">{{$t('supply.jiaoyiwancheng')}}</div>
			<img class="little-img" src="@/assets/images/img_trade_succeed@2x.png"/>
		</div>
		<div class="trade-cancel-wrap" v-if="order.order_info.order_status_id==12">
			<div class="font-bold-20 cancel-box">
				<img class="cancel-img" src="@/assets/images/icon_exclamation@2x.png"/>{{$t('supply.shouhouzhong')}}
			</div>
		</div>
		<div class="trade-cancel-wrap" v-if="order.order_info.order_status_id==5 || changeState==1">
			<div class="font-bold-20 cancel-box">
				<img class="cancel-img" src="@/assets/images/icon_exclamation@2x.png"/>{{$t('supply.jiaoyiquxiao')}}
			</div>
		</div>
		<div class="trade-cancel-wrap" v-if="order.order_info.order_status_id==7">
			<div class="font-bold-20 cancel-box">
				<img class="cancel-img" src="@/assets/images/icon_exclamation@2x.png"/>{{$t('supply.yituikuan')}}
			</div>
		</div>
	</div>
	<div class="content">
		<!-- 订单信息 -->
		<div class="mb10">
			<i-card>
				<div class="card-header border-bottom" slot="header">{{$t('supply.dingdanxinxi')}}<span :class="order.order_status_info.order_status_id==11?'black red':'red'">{{order.order_status_info.name}}</span></div>
				<div slot="content">
					<div class="content-wrap">
						<div class="item">
							<div class="title">{{$t('supply.xiadanshijian')}}</div>
							<div class="detail">
								<span>{{order.order_info.date_added}}</span>
							</div>
						</div>
						<div class="item">
							<div class="title">{{$t('supply.dingdanbianhao')}}</div>
							<div class="detail">{{order.order_info.order_num_alias}}</div>
						</div>
						<div class="item">
							<div class="title">{{$t('supply.maijia')}}</div>
							<div class="detail">{{order.order_info.name}}</div>
						</div>
						<div class="item">
							<div class="title">{{$t('supply.zhifufangshi')}}</div>
							<div class="detail">{{order.order_info.transaction_id}}</div>
						</div>
					</div>
				</div>
			</i-card>
		</div>
		<!-- 提货信息 -->
		<div class="mb10" v-if="order.order_info.delivery!='pickup'">
			<i-card>
				<div class="card-header border-bottom" slot="header">{{$t('supply.shouhuoxinxi')}}<span :class="order.order_status_info.order_status_id==11?'black red':'red'">{{order.order_status_info.name}}</span></div>
				<div slot="content">
					<div class="content-wrap">
						<div v-if="order.order_info.delivery=='express'">
							<div class='item' v-if="order.order_info.dispatchname">
								<div class='title'>{{$t('supply.peisongfangshi')}}</div>
								<div class='detail i-flex i-aic'>{{groupInfo.delivery_express_name}}({{order.order_info.dispatchname}})
									<!-- <div @click="goExpress" class="phone">
										<span>查看物流</span>
									</div> -->
								</div>
							</div>
							<div class='item' v-if="order.order_info.shipping_no!=0">
								<div class='title'>{{$t('supply.kuaididanhao')}}</div>
								<div class='detail'>{{order.order_info.shipping_no}}</div>
							</div>
						</div>
						<div class='item' wx:else>
							<div class='title'>{{$t('supply.peisongfangshi')}}</div>
							<div class='detail'>{{groupInfo.delivery_tuanzshipping_name}}</div>
						</div>
						<div class="item">
							<div class="title">{{$t('supply.shouhuoren')}}</div>
							<div class="detail i-flex i-aic">
								{{order.order_info.shipping_name}}
								<!-- <div @click="callTelphone" class="phone" :data-phone="order.order_info.shipping_tel" v-if="is_hidden_orderlist_phone==0">
									<img class="icon-phone" src="@/assets/images/phone2.png"/>
									<span>联系收货人</span>
								</div> -->
							</div>
						</div>
						<!-- <div class="item" v-if="order.order_info.delivery=='express'" @click="copyspan"> -->
            <div class="item" v-if="order.order_info.delivery=='express'">
							<div class="title">{{$t('supply.shouhuodizhi')}}</div>
							<div class="detail"><span v-if="order.shipping_province">{{order.shipping_province.name}}</span><span v-if="order.shipping_city">{{order.shipping_city.name}}</span><span v-if="order.shipping_country">{{order.shipping_country.name}}</span>{{order.order_info.shipping_address}}</div>
						</div>
						<!-- <div class="item" v-else @click="copyspan"> -->
            <div class="item" v-else>
							<div class="title">{{$t('supply.shouhuodizhi')}}</div>
							<div class="detail">{{order.order_info.tuan_send_address}}</div>
						</div>
						<div class="item" v-if="order.order_info.delivery=='express'">
							<div class="title">{{$t('supply.shouhuoshijian')}}</div>
							<div class="detail">{{order.order_info.delivery_date}} {{order.order_info.delivery_time}}</div>
						</div>
					</div>
				</div>
			</i-card>
		</div>
		<div class="mb10" v-else-if="order.order_info.order_status_id!=3&&order.order_info.order_status_id!=5">
			<i-card>
				<div class="card-header border-bottom" slot="header">{{$t('supply.tihuoxinxi')}}</div>
				<div slot="content">
					<div class="content-wrap">
						<div class="item">
							<div class="title">{{$t('supply.peisongfangshi')}}</div>
							<div class="detail">
								<span>{{order.order_info.delivery_name}}</span>
							</div>
						</div>
						<div class="item">
							<div class="title">{{$t('supply.shouhuoren')}}</div>
							<div class="detail i-flex i-aic">
								{{order.order_info.ziti_name}}
								<!-- <div bindtap="callTelphone" class="phone" :data-phone="order.order_info.ziti_mobile" v-if="is_hidden_orderlist_phone==0">
									<img class="icon-phone" src="@/assets/images/phone2.png"/>
									<span>联系{{groupInfo.owner_name}}</span>
								</div> -->
							</div>
						</div>
						<div class="item">
							<div class="title">{{$t('supply.quhuodizhi')}}</div>
							<div class="detail">{{order.order_info.shipping_address}}</div>
						</div>
					</div>
				</div>
			</i-card>
		</div>

		<!-- 商品信息 -->
		<div class="goods-card">
			<i-card>
				<div class="card-header" slot="header">
					<div class="goods-cancel bold-span" v-if="order.order_info.order_status_id==5">{{$t('supply.yiquxiao')}}</div>
					<div class="goods-ready bold-span" v-if="order.order_info.order_status_id==1||order.order_info.order_status_id==14">
						<div v-if="order.order_info.delivery=='pickup'">{{$t('supply.yuji')}}{{order.order_info.pick_up_time}}{{$t('supply.ketihuo')}}</div>
						<div v-else-if="order.order_info.delivery=='tuanz_send'">{{$t('supply.yuji')}}{{order.order_info.pick_up_time}}{{groupInfo.owner_name}}{{$t('supply.peisong')}}</div>
						<div v-else>{{$t('supply.kuaidipeisong')}}</div>
					</div>
					<div class="goods-done bold-span" v-if="order.order_info.order_status_id==6||order.order_info.order_status_id==11">{{showRealPickUpTime}}{{$t('supply.tihuowancheng')}}</div>
					<div class="goods-num">{{order.goods_count}}{{$t('supply.jianshangpin')}}</div>
				</div>
				<div class="middle" slot="content">
					<div v-for="goodsInfo in order.order_goods_list" :key="goodsInfo.id">
						<div class="middle-line"></div>
						<div class='each-item' @click="showRefundInfo" :data-idx="index" :data-hasrefund="goodsInfo.has_refund_quantity">
							<div style="margin-right: 10px">
								<i-img height="60" iClass="show-img" lazyLoad="true" :loadImage="goodsInfo.image" width="60"></i-img>
							</div>
							<div style="flex-grow: 1">
								<div class="name bold-span"><span class="pintag" v-if="order.order_info.is_pin==1">{{$t('supply.pintuan')}}</span> {{goodsInfo.name}}</div>
								<div class="mount">
									<div v-if="goodsInfo.option_str">{{goodsInfo.option_str}} </div>
									<span v-if="order.order_info.type!='integral'">$</span>{{goodsInfo.price}}
									<div v-if="order.order_info.type=='integral'">{{$t('supply.jifen')}}</div> x {{goodsInfo.quantity}}
								</div>
								<div class="bottom-info">
									<div class='bold-span'>
										{{$t('supply.xiaoji')}}：<span v-if="order.order_info.type!='integral'">$</span>{{goodsInfo.real_total}}
										<div v-if="order.order_info.type=='integral'">{{$t('supply.jifen')}}</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div slot="footer">
						<div class="content-wrap border-top">
							<div class="item">
								<div class="title">{{$t('supply.shangpinheji')}}</div>
								<div class="detail">
									<span>${{goodsTotal}}</span>
								</div>
							</div>
							<div class="item" v-if="order.order_info.shipping_fare>0">
								<div class="title" v-if="order.order_info.type=='integral'">{{$t('supply.kuaidifei')}}</div>
								<div class="title" v-else>{{$t('supply.peisongfei')}}</div>
								<div class="detail">
									+ ${{order.order_info.shipping_fare}}
								</div>
							</div>
							<div v-if="order.order_info.is_free_shipping_fare==1">
								<div class="item">
									<div class="title">{{$t('supply.peisongfei')}}</div>
									<div class="detail">
										+ ${{order.order_info.fare_shipping_free}}
									</div>
								</div>
								<div class="item">
									<div class="title">{{$t('supply.manjinemianpeisongfei')}}</div>
									<div class="detail">
										- ${{order.order_info.fare_shipping_free}}
									</div>
								</div>
							</div>
							<div class="item" v-if="(order.order_info.score_for_money*1)>0">
								<div class="title">{{$t('supply.jifendikou')}}</div>
								<div class="detail">
									- ${{order.order_info.score_for_money}}
								</div>
							</div>
							<div class="item" v-if="order.order_info.is_vipcard_buy==1&&levelAmount>0">
								<div class="title">{{$t('supply.huiyuanyouhui')}}</div>
								<div class="detail">
									- ${{levelAmount}}
								</div>
							</div>
							<div class="item" v-if="order.order_info.is_level_buy==1&&order.order_info.is_vipcard_buy!=1&&levelAmount>0">
								<div class="title">{{$t('supply.dengjizhekou')}}</div>
								<div class="detail">
									- ${{levelAmount}}
								</div>
							</div>
							<div class="item" v-if="disAmount>0">
								<div class="title">{{$t('supply.zongyouhui')}}</div>
								<div class="detail">
									- ${{disAmount}}
								</div>
							</div>
							<div class="item">
								<div class="title">{{$t('supply.shifukuan')}}</div>
								<div class="detail">
									<span>${{order.order_info.total}}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</i-card>
		</div>

		<!-- 评论 -->
		<!-- <i-orderComment v-if="order.order_info.comment" :comment="order.order_info.comment" /> -->

		<div class="i-flex footerContorl p10">
			<!-- <div class="btn bg-ccc span-3" data-id="{{order.order_info.order_id}}">备注</div> -->
			<!-- <div class="btn bg-warning" data-id="{{order.order_info.order_id}}">订单退款</div> -->
			<div v-if="order.order_info.order_status_id==4">
				<!-- <div class="btn bg-sucess" v-if="order.order_info.delivery=='express'}}" data-id="{{order.order_info.order_id}}" catchtap="getExpList">修改物流</div> -->
				<div class="btn bg-blue" :data-id="order.order_info.order_id" @click.prevent.stop="opreceive">{{$t('supply.querenshouhuo')}}</div>
			</div>
			<div v-if="order.order_info.order_status_id==1">
				<!-- 快递发货 -->
				<div class="btn bg-blue" v-if="order.order_info.delivery=='express'" @click.prevent.stop="getExpList" :data-id="order.order_info.order_id">{{$t('supply.querenfahuo')}}</div>
				<!-- 团长配送 -->
				<div class="btn bg-blue" v-if="order.order_info.delivery=='tuanz_send'||order.order_info.delivery=='pickup'" @click.prevent.stop="tuanSend" :data-id="order.order_info.order_id">{{$t('supply.querenpeisong')}}</div>
			</div>
			<div v-if="order.order_info.order_status_id==14">
				<!-- 快递确认收货 -->
				<div class="btn bg-blue" v-if="order.order_info.delivery=='express'" :data-id="order.order_info.order_id" @click.prevent.stop="opreceive">{{$t('supply.querenshouhuo')}}</div>
				<!-- 团长确认收货 -->
				<div class="btn bg-blue" v-if="order.order_info.delivery=='tuanz_send'||order.order_info.delivery=='pickup'" :data-id="order.order_info.order_id" @click.prevent.stop="tuanOver">{{$t('supply.querensongdatuanzhang')}}</div>
			</div>
		</div>
	</div>
  <!-- 快递信息 -->
  <i-modal scrollUp="false" v-if="showExpModal">
    <div class="exp-modal bg-f rounded">
      <div class="p10 border-bottom bg-lighter span-dark weight fsz-30">{{$t('supply.dingdanfahuo')}}</div>
      <div class="p15 border-bottom fsz-24">
        <div class="mb5">{{$t('supply.lianxiren')}}：{{expInfo.shipping_name}}</div>
        <div class="mb10">{{$t('supply.shouhuodizhi')}}：{{expInfo.shipping_name}}</div>
        <div class="mb10 i-flex i-aic">
          <!-- <picker class="i-flex-item" @change="bindPickerChange" :value="index" :range="expInfo.express_list" range-key="name">
            <div class="picker">
              物流公司：{{expInfo.express_list[index].name}} <span class="iconfont icon-xia fsz-24 text-gray"></span>
            </div>
          </picker> -->
        </div>
        <div class="i-flex i-aic">
          {{$t('supply.wuliudanhao')}}：
          <input class="ipt i-flex-item" type="span" :placeholder="$t('supply.qingshuruwuliudanhao')" @input="bindKeyInput"/>
        </div>
      </div>
      <div class="i-flex jcontent-sa span-center weight fsz-30">
        <div class="btn p10 i-flex-item span-gray" @click="hideExpModal">{{$t('supply.quxiao')}}</div>
        <div class="btn p10 i-flex-item bule" :data-id="expInfo.order_id" @click="expSend">{{$t('supply.querengfahuo')}}</div>
      </div>
    </div>
  </i-modal>
</div>
</template>

<script>
  import GlobalMixin from '../../mixin/globalMixin.js';
  import orderMixin from './static/orderMixin.js'
  import status from '../../utils/index.js'
  import util from '../../utils/index.js'
  var app,wx
  export default {
    mixins: [orderMixin,GlobalMixin],
    name:'supply-orderDetails',
    data() {
      return {
        id: '',
        lastTapTime: 0,
        order: {}
      }
    },
    created: function() {
      wx = this.$wx
      app = this.$app
      var that = this;
      wx.setNavigationBarTitle({
        title: that.$t('supply.dingdanxiangqing'),
        showBack: true
      })
    },
    mounted: function() {
      const o = this.$route.query || {};
      this.onLoad(o)
    },
    methods: {
      onLoad: function (options) {
        var that = this;
        let id = options.id || '';
        if(!id) {
          wx.showToast({
            title: that.$t('supply.qingqiuchucuo'),
            icon: 'none'
          })
          wx.navigateTo({
            url: '/ulink_comshop/moduleB/supply/orderManage'
          })
          return;
        }
        this.id = id;
        status.setGroupInfo().then((groupInfo) => {
          this.groupInfo = groupInfo;
        });
        this.initFn(id);
      },
      initFn: function(){
        wx.showLoading();
        var that = this;
        let id = this.id;
        let token = wx.getStorageSync('token');
        app.util.request({
          url: 'entry/wxapp/index',
          data: {
            controller: 'order.order_info',
            token,
            id,
            is_supply: 1
          },
          dataType: 'json',
          success: function (res) {
            if (res.code == 0) {
              let order = res.data;
              let { is_hidden_orderlist_phone } = res;

              let { real_total, shipping_fare, voucher_credit, fullreduction_money } = order.order_info;
              var goodsTotal = parseFloat(real_total) - parseFloat(shipping_fare);
              let disAmount = parseFloat(voucher_credit) + parseFloat(fullreduction_money);
              disAmount = (disAmount > goodsTotal) ? goodsTotal : disAmount;

              let levelAmount = 0;
              let order_goods_list = order.order_goods_list;
              if(order_goods_list&&order_goods_list.length) {
                order_goods_list.forEach(function(item){
                  let total = item.total * 1;
                  let old_total = item.old_total * 1;
                  if (item.is_level_buy==1 || item.is_vipcard_buy==1) {
                    levelAmount += old_total - total;
                  }
                })
              }
              that.order = order;
              that.is_hidden_orderlist_phone = is_hidden_orderlist_phone;
              that.goodsTotal = goodsTotal.toFixed(2);
              that.disAmount = disAmount.toFixed(2);
              that.levelAmount = levelAmount.toFixed(2);
            } else {
              wx.showToast({
                title: res.msg || that.$t('supply.qingqiuchucuo'),
                icon: 'none'
              })
              wx.navigateTo({
                url: '/ulink_comshop/pages/user/me'
              })
            }
          }
        })
      },


      goExpress: function(){
        let order_id = this.order.order_info.order_id;
        wx.navigateTo({
          url: '/ulink_comshop/pages/order/goods_express?id=' + order_id,
        })
      },

      hideExpModal: function(){
        this.showExpModal = false;
      },

      copyspan: function (e) {
        let that = this;
        let currentTime = e.timeStamp
        if (currentTime - that.lastTapTime < 500) {
          var order = that.order;
          var data = "";
          if (order.order_info.delivery=='express') {
            if (order.shipping_provice != null) {
              data += order.shipping_province.name;
            }
            if (order.shipping_city != null) {
              data += order.shipping_city.name;
            }
            if (order.shipping_country != null) {
              data += order.shipping_country.name;
            }
            data += order.order_info.shipping_address;
          } else {
            data = order.order_info.tuan_send_address;
          }
        }
        that.lastTapTime = currentTime;
      }
    }
  }
</script>

<style scoped>
.head .little-img {
  width: 23vw;
  height: 12vw;
}

.back-img-wrap {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}

.back-img-wrap .back-img {
  width: 100%;
  height: 34vw;
}

.to-pay-wrap {
  text-align: center;
  padding: 4.6vw 0;
  color: white;
}

.to-get-wrap {
  display: flex;
  justify-content: space-between;
  padding: 5vw 5vw 0 5vw;
  color: white;
}

.trade-cancel-wrap {
  padding: 5vw 7.6vw;
  color: white;
  text-align: center;
}

.cancel-box {
  display: flex;
  align-items: center;
  justify-content: center;
}

.cancel-img {
  margin-right: 1vw;
  width: 4vw;
  height: 4vw;
}

.font-bold-20 {
  font-size: 4vw;
  font-weight: 500;
}

.content {
  padding: 0 2vw;
  padding-bottom: 8vw;
}

.card-header {
  display: flex;
  justify-content: space-between;
  padding: 2vw 3vw;
  color: #444;
  font-size: 2.8vw;
  font-weight: 500;
}

.card-header .goods-num {
  color: #aaa;
}

.card-header .goods-done {
  color: #aaa;
}

.card-header .goods-ready {
  color: #ff5344;
}

.card-header .goods-cancel {
  color: #aaa;
}

.bold-text {
  font-weight: 500;
}

.show-img {
  float: left;
  width: 12vw;
  height: 12vw;
}

.name {
  margin-top: -0.8vw;
  width: 51vw;
  font-size: 2.6vw;
  color: #444;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.mount {
  font-size: 2.2vw;
  color: #aaa;
  margin-top: 1vw;
}

.bottom-info {
  justify-content: space-between;
  font-size: 2.8vw;
  color: #444;
  margin-top: 1.8vw;
}

.middle .middle-line {
  height: 0.01vw;
  background: #efefef;
}

.middle .each-item {
  box-sizing: border-box;
  display: flex;
  width: 100%;
  padding: 3.2vw 3vw;
}

.content-wrap {
  padding-bottom: 2vw;
}

.content-wrap .item {
  display: flex;
  justify-content: space-between;
  font-size: 2.6vw;
  padding: 1.6vw 3vw;
  padding-bottom: 0;
}

.content-wrap .item .title {
  color: #aaa;
  min-width: 12vw;
}

.content-wrap .item .detail {
  color: #444;
}

.content-wrap .item .detail .phone {
  margin-left: 2vw;
  padding: 0 2vw;
  height: 4.4vw;
  display: flex;
  align-items: center;
  border: 0.01vw solid #efefef;
  border-radius: 2.6vw;
}

.content-wrap .item .detail .phone .icon-phone {
  width: 2vw;
  height: 2vw;
  margin-right: 1vw;
}

.footerContorl {
  justify-content: flex-end;
  margin-top: 2vw;
}

.footerContorl .btn {
  padding: 0.6vw 1.5vw;
  margin-left: 2vw;
  border-radius: 1vw;
  color: #fff;
}

.exp-modal {
  width: 80%;
  overflow: hidden;
}

.btn {
  position: relative;
}

.btn:last-child::before {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  top: 0;
  border-left: 1px solid #e5e5e5;
  transform-origin: 0 0;
  transform: scaleX(0.5);
}

.exp-modal .ipt {
  border: 0.1vw solid #e5e5e5;
  padding: 1vw;
}

.red {
  font-weight: 800;
}

.red.black {
  color: #aaa;
}

.mb10 {
  margin-bottom: 2vw;
}

.border-bottom {
  position: relative;
}

.border-bottom::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  border-bottom: 1px solid #e5e5e5;
  transform-origin: 0 0;
  transform: scaleY(0.5);
}

.i-flex {
  display: flex;
}

.i-aic {
  align-items: center!important;
}

.p10 {
  padding: 2vw;
}

.bg-blue {
  background-color: rgb(59,140,232);
}

.bg-f {
  background-color: #fff;
}

.bg-lighter {
  background-color: #f8f8f8;
}

.weight {
  font-weight: bold;
}

.fsz-30 {
  font-size: 3vw;
}

.p15 {
  padding: 3vw;
}

.mb5 {
  margin-bottom: 1vw;
}

.i-flex-item {
  flex: 1;
}

.bule {
  color: rgb(59,140,232);
}
</style>
