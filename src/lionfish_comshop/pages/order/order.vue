<template>
  <div>
    <!--<i-auth bind:authSuccess="authSuccess" :needAuth="needAuth">-->
    <div class="mask" catchtouchmove="preventTouchMove" v-if="showTransferModal"></div>
    <div class="paynow" v-if="showTransferModal">
      <div style='width: 100%;height: 10%;'>
        <div style='float:left;width: 40%;font-size: 22px;line-height: 50px;margin-left: 10%;'>
          转账支付
        </div>
        <div style='float:right;width: 50%;text-align: right' @click='closeTransferModal'>
          <img src='@/assets/images/img-close.png' style='width: 30px;height: 30px;margin-top: 10px;margin-right: 10%'></img>
        </div>
      </div>
      <div style='text-align: center'>
        <div style='width: 100%;height: 350px;font-size: 12px;'>

          <div style='margin-left: 5%;margin-top:10px;text-align:left;display: flex;justify-content: center;'>
            <span style='display: flex;justify-content: center;'>帐号：</span>
            <span style='text-align: left;'>{{bankInfo.account_no}}</span>
            <button @click='copyText' size="mini" style="font-size: 8px;" :data-text="bankInfo.account_no">复制</button>
          </div>
          <div style='margin-left: 5%;margin-top:10px;text-align:left;display: flex;justify-content: center;'>
            <span style='display: flex;justify-content: center;'>户名：</span>
            <span style='text-align: left;'>{{bankInfo.account_name}}</span>
            <button @click='copyText' size="mini" style="font-size: 8px;" :data-text="bankInfo.account_name">复制</button>
          </div>
          <div style='margin-left: 5%;margin-top:10px;text-align:left;display: flex;justify-content: center;'>
            <span style='display: flex;justify-content: center;'>银行：</span>
            <span style='text-align: left;'>{{bankInfo.bank_name}}</span>
            <button @click='copyText' size="mini" style="font-size: 8px;" :data-text="bankInfo.bank_name">复制</button>
          </div>

          <div style='wid:200px;height:100px;text-align: center;margin-top: 30px;'>
            <span style='font-size: 18px;'>请在支付时备注您订单内的联系号码 \n</span>
            <span style='font-size: 18px;color: #c0c0c0'>注：转账支付为人工审核</span>
          </div>
        </div>
        <div style='width: 60%;text-align: center;margin-top: 30px;margin-left: 20%;'>
          <button @click="havePaid"  data-type="banktransfer"  class="wux-button wux-button--block" type="default">已支付，查看订单</button>
        </div>
      </div>
    </div>

    <div class="mask" catchtouchmove="preventTouchMove" v-if="showPayNowModal"></div>
    <div class="paynow" v-if="showPayNowModal">
      <div style='width: 100%;height: 10%;'>
        <div style='float:left;width: 40%;font-size: 18px;line-height: 50px;margin-left: 5%;'>
          PayNow支付
        </div>
        <div style='float:right;width: 50%;text-align: right' @click='closePayNowModal'>
          <img src='@/assets/images/img-close.png' style='width: 24px;height: 24px;margin-top: 10px;margin-right: 5%'></img>
        </div>
      </div>

      <div style='float:left;width: 100%;margin-left: 5%;'>
        PayNow支付号码：{{payNowNo}}
      </div>
      <div style='float:left;width: 100%;margin-left: 5%;margin-top:5px'>
        支付金额：<span style="color:red">${{order.order_info.real_total}}</span>
      </div>
      <div style='float:left;width: 100%;margin-left: 5%;margin-top:5px'>
        备注订单号：<span style="color:red">{{order_num_alias_sub}}</span>
      </div>
      <div style='float:left;width: 100%;margin-left: 5%;margin-top:5px'>
        <span style="color:red">请在备注中写入该订单号，很重要！</span>
      </div>

      <div style='text-align: center'>
        <div style='width: 100%;height: 350px;justify-content: center; '>
          <img :src='payNowQr' style='width: 160px;height: 160px;margin-top: 20px;border: 1px solid #000;'></img>
          <div style='wid:200px;height:40px;margin-top:10px;'>

            <span style='text-align: left;'>PayNow扫码支付 \n <!--或 uen: {{payNowUen}}--></span>

          </div>
          <div style='wid:200px;height:100px; margin-top:10px;'>
            <span style='font-size: 18px;'><!--请在支付时备注您订单内的联系号码 \n--></span>
            <span style='font-size: 18px;color: #c0c0c0'>注：转账支付为人工审核</span>
          </div>
        </div>
        <div style='width: 60%;text-align: center;margin-top: 30px;margin-left: 20%;'>
          <button @click="havePaid" data-type="paynow"  class="wux-button wux-button--block" type="default">已支付，查看订单</button>
        </div>
      </div>
    </div>

    <div class="mask" catchtouchmove="preventTouchMove" v-if="showPaymentModal"></div>
    <div class="modalDlg" v-if="showPaymentModal">
      <div style='width:100%;height:26px;border-bottom:1px solid #ccc;margin:0;padding:0;'>
        <span style='text-align:center;font-size:14px;font-weight:600 ;margin-top:5px' >支付方式</span>
      </div>

      <!-- 总金额 -->
      <div style='height:50px;width:100%'>
        <span style='font-size:30px;color:#f00'>${{order.order_info.real_total}}</span>
      </div>


      <button @click="payWeixin" :data-type="order.order_info.order_id"  class="wux-button wux-button--block" type="warn">
        微信支付</button>

      <!--
      <button class="wux-button wux-button--block" type="warn" style="margin-top=16px">到店付款</button>
      -->
      <button @click="payNow" class="wux-button wux-button--block" type="warn">PayNow支付</button>
      <button @click="orderPayTransfer" data-type="banktransfer" class="wux-button wux-button--block" type="warn">公司转账</button>
      <button @click="closePaymentModal"  class="wux-button wux-button--block" type="default">取消支付</button>

    </div>
    <div>
      <div class="head">
        <div class="head">
          <div class="back-img-wrap">
            <!--<img class="back-img" :src="common_header_backgroundimage?common_header_backgroundimage:'@/assets/images/TOP_background@2x.png'"></img>-->
            <img class="back-img" src="@/assets/images/TOP_background@2x.png"/>
          </div>
          <div class="to-pay-wrap" v-if="order.order_info.order_status_id==3&&changeState!=1">
            <div class="font-bold-30" v-if="order.order_info.open_auto_delete==1">
              <div class="tradeStatus-index--count-down count-down">
                <span v-if="endtime.days>0">{{endtime.days}}天</span>{{endtime.hours}}:{{endtime.minutes}}:{{endtime.seconds}}</div>
            </div>
            <div class="font-bold-30" v-if="order.order_info.open_auto_delete==0">
              <div class="tradeStatus-index--count-down count-down">待付款</div>
            </div>
            <div class="font-12" v-if="order.order_info.open_auto_delete==1">请尽快付款，超时将被自动取消</div>
            <div class="font-12" v-else>请尽快付款，不然就被抢光了</div>
          </div>
          <div class="to-get-wrap" v-if="order.order_info.order_status_id==1 || order.order_info.order_status_id==15">
            <div class="font-bold-20">备货中</div>
            <img class="little-img" src="@/assets/images/img_delivery@2x.png"></img>
          </div>
          <div class="to-get-wrap" v-if="order.order_info.order_status_id==2">
            <div class="font-bold-20">拼团中，已付款</div>
            <img class="little-img" src="@/assets/images/img_delivery@2x.png"></img>
          </div>
          <div class="to-get-wrap" v-if="order.order_info.order_status_id==14">
            <div class="font-bold-20">配送中</div>
            <img class="little-img" src="@/assets/images/img_delivery@2x.png"></img>
          </div>
          <div class="to-get-wrap" v-if="order.order_info.order_status_id==16">
            <div class="font-bold-20">支付待确认</div>
            <img class="little-img" src="@/assets/images/img_delivery@2x.png"></img>
          </div>
          <div class="to-get-wrap" v-if="order.order_info.order_status_id==4">
            <div class="font-bold-20">{{order.order_status_info.name?order.order_status_info.name:'可提货'}}</div>
            <img class="little-img" src="@/assets/images/img_ready_to_get@2x.png"></img>
          </div>
          <div class="to-get-wrap" v-if="order.order_info.order_status_id==6">
            <div class="font-bold-20">已签收</div>
            <img class="little-img" src="@/assets/images/img_trade_succeed@2x.png"></img>
          </div>
          <div class="trade-cancel-wrap" v-if="order.order_info.order_status_id==10">
            <div class="font-bold-20 cancel-box">
              <img class="cancel-img" src="@/assets/images/icon_exclamation@2x.png"></img>等待退款
            </div>
          </div>
          <div class="to-get-wrap" v-if="order.order_info.order_status_id==11">
            <div class="font-bold-20">交易完成</div>
            <img class="little-img" src="@/assets/images/img_trade_succeed@2x.png"></img>
          </div>
          <div class="trade-cancel-wrap" v-if="order.order_info.order_status_id==12">
            <div class="font-bold-20 cancel-box">
              <img class="cancel-img" src="@/assets/images/icon_exclamation@2x.png"></img>售后中
            </div>
          </div>
          <div class="trade-cancel-wrap" v-if="order.order_info.order_status_id==5||changeState==1">
            <div class="font-bold-20 cancel-box">
              <img class="cancel-img" src="@/assets/images/icon_exclamation@2x.png"></img>交易取消
            </div>
          </div>
          <div class="trade-cancel-wrap" v-if="order.order_info.order_status_id==7">
            <div class="font-bold-20 cancel-box">
              <img class="cancel-img" src="@/assets/images/icon_exclamation@2x.png"></img>已退款
            </div>
          </div>
        </div>
      </div>


      <div class="content">
        <div class="goods-info" v-if="order.order_info.delivery!='pickup'">
          <i-order-info-express :groupInfo="groupInfo" :hidePhone="is_hidden_orderlist_phone" :order="order" v-if="order.order_info"></i-order-info-express>
        </div>
        <div class="goods-info" v-else-if="order.order_info.order_status_id!=3&&order.order_info.order_status_id!=5">
          <i-goods-info :groupInfo="groupInfo" :hidePhone="is_hidden_orderlist_phone" :order="order"></i-goods-info>
        </div>
        <div class="goods-card">
          <div class="i-card">
            <div class="header" slot="header">
              <div class="goods-cancel bold-text" v-if="order.order_info.order_status_id==5">已取消</div>
              <!--<div class="goods-ready bold-text" style="color:{{skin.color}}" v-if="order.order_info.order_status_id==1||order.order_info.order_status_id==14">-->
              <div class="goods-ready bold-text" :style="{color:skin.color}" v-if="order.order_info.order_status_id==1||order.order_info.order_status_id==14">
                <div v-if="order.order_info.delivery=='pickup'">预计{{order.order_info.pick_up_time}}可提货</div>
                <div v-else-if="order.order_info.delivery=='tuanz_send'">预计{{order.order_info.pick_up_time}}{{groupInfo.owner_name}}配送</div>
                <div v-else>快递配送</div>
              </div>
              <div class="goods-done bold-text" v-if="order.order_info.order_status_id==6||order.order_info.order_status_id==11">{{showRealPickUpTime}}提货完成</div>
              <div class="goods-num">{{order.goods_count}}件商品</div>
            </div>
            <div class="middle" slot="content">
              <!--<div wx:for="{{order.order_goods_list}}" wx:for-item="goodsInfo" wx:key="id">-->
              <div v-for="(goodsInfo,index) in order.order_goods_list" :key="goodsInfo.goods_id" >
              <div class="middle-line"></div>
              <div @click="showRefundInfo" class="each-item" :data-hasrefund="goodsInfo.has_refund_quantity" :data-idx="index">
                <div style="margin-right: 10px">
                  <i-img height="60" iClass="show-img" lazyLoad="true" :loadImage="goodsInfo.image" width="60"></i-img>
                </div>
                <div style="flex-grow: 1 ">
                  <div class="name bold-text">
                    <!--<span class="pintag" style="background:{{skin.color}}" v-if="order.order_info.is_pin==1">拼团</span>-->
                    <span class="pintag" :style="{color:skin.color,background:skin.light}" v-if="order.order_info.is_pin==1">拼团</span>
                    {{goodsInfo.name}}
                  </div>
                  <div class="mount">
                    <div v-if="goodsInfo.option_str">{{goodsInfo.option_str}} </div>
                    <div v-if="order.order_info.type!='integral'">${{goodsInfo.price}}</div>
                    <div v-if="order.order_info.type=='integral'">积分</div> x {{goodsInfo.quantity}}
                  </div>
                  <div class="bottom-info">
                    <div class="bold-text">
                      小计：<div v-if="order.order_info.type!='integral'">${{goodsInfo.real_total}}</div>
                      <div v-if="order.order_info.type=='integral'">积分</div>
                    </div>
                    <i-dialog bind:cancel="callDialog" bind:confirm="confirmGoods" :data-cancel="confirmGoodsVisible" text="确认该商品已经提货？" :visible="confirmGoodsVisible"></i-dialog>
                  </div>
                  <div class="card-btn">
                    <div @click="goRefund" class="btn-2 mar-left-8" :data-id="goodsInfo.order_refund_goods.ref_id" v-if="goodsInfo.is_refund_state>0&&goodsInfo.order_refund_goods.ref_id">
                      <div v-if="goodsInfo.is_refund_state==1">
                        {{goodsInfo.order_refund_goods&&goodsInfo.order_refund_goods.state==3?'退款成功':'查看售后'}}
                      </div>
                      <div v-else>退款成功</div>
                    </div>
                    <div @click="goComment" class="btn-1" :data-goods_id="goodsInfo.goods_id" :data-order_goods_id="goodsInfo.order_goods_id" :data-type="order.order_info.order_id" v-if="goodsInfo.is_refund_state==0&&order.order_info.order_status_id==6&&goodsInfo.hascomment==0">去评价</div>
                    <div v-if="order_can_del_cancle==0">
                      <div @click="applyForService" class="btn-1 mar-left-8" :data-order_goods_id="goodsInfo.order_goods_id" :data-type="order.order_info.order_id" v-if="goodsInfo.can_ti_refund!=0&&goodsInfo.is_refund_state==0&&order.order_info.order_status_id==4">申请售后</div>
                    </div>
                    <div v-else>
                      <div @click="applyForService" class="btn-1 mar-left-8" :data-order_goods_id="goodsInfo.order_goods_id" :data-type="order.order_info.order_id" v-if="goodsInfo.can_ti_refund!=0&&goodsInfo.is_refund_state==0&&order.order_info.order_status_id==4">申请售后</div>
                    </div>
                    <div @click="applyForService" class="btn-1 mar-left-8" :data-order_goods_id="goodsInfo.order_goods_id" :data-type="order.order_info.order_id" v-if="goodsInfo.is_statements_state==0&&goodsInfo.is_refund_state==0&&(order.order_info.order_status_id==6||order.order_info.order_status_id==11)">申请售后</div>
                    <!--<button class="btn-1 mar-left-8" openType="contact" :sessionFrom="sobot|userInfo.nickName|userInfo.avatarUrl" v-if="user_service_switch==1">-->
                      <!--<span>联系客服</span>-->
                    <!--</button>-->
                    <div class="btn-2 mar-left-8" v-if="goodsInfo.is_refund_state==0&&(order.order_info.order_status_id==1||order.order_info.order_status_id==14)">备货中</div>
                    <div @click="receivOrder" class="btn-3 mar-left-8" :data-show="confirmGoodsVisible" :data-type="order.order_info.order_id" v-if="goodsInfo.is_refund_state==0&&order.order_info.order_status_id==4">{{order.order_info.delivery=='pickup'?'确认提货':'确认收货'}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="footer">
            <div @click="cancelOrder" class="btn-1 mar-left-8" data-order_goods_id="0" :data-type="order.order_info.order_id" v-if="order.order_info.order_status_id==1&&order_can_del_cancle==1&&order.order_info.is_pin!=1">取消订单</div>
            <div class="btn-1"  @click="goLink2" data-link="/lionfish_comshop/moduleA/pin/share?id=" :data-id="order.order_info.order_id" v-if="order.order_info.is_pin==1&&order.order_info.order_status_id!=3">拼团详情</div>
          </div>
        </div>
        <div class="space-between-card" v-if="index!==orderSkuResps.length-1"></div>
      </div>
      <i-orderComment :comment="order.order_info.comment" v-if="order.order_info.comment"></i-orderComment>
      <div class="order-info">
        <i-order-info :groupInfo="groupInfo" :orderInfo="order.order_info" :order_goods_list="order.order_goods_list"></i-order-info>
      </div>
    </div>

    <div class="foot" v-if="order.order_info.order_status_id==3&&changeState!=1">
      <i-fixedBottom>
        <div class="btn-group" v-if="order.order_info.order_status_id==3">
          <form bindsubmit="cancelSubmit" reportSubmit="true">
            <button hidden formType="submit" id="formId"></button>
          </form>
          <label class="cancelBtn" for="formId">
            <div @click="callDialog" class="cancel-btn" data-show="cancelOrderVisible" :data-type="order.order_info.order_id">取消订单</div>
          </label>
          <form bindsubmit="payNowSubmit" reportSubmit="true">
            <button hidden formType="submit" id="formId2"></button>
          </form>
          <label class="cancelBtn" for="formId2">
            <!--<div @click="showPaymentModal" class="pay-btn" style="background:{{skin.color}}">-->
            <div @click="showPaymentModal" class="pay-btn" :style="{color:skin.color,background:skin.light}">
              立即付款
            </div>
          </label>
        </div>
      </i-fixedBottom>
    </div>
    <!--<i-aside-btn iClass="home-btn" :showContact="user_service_switch==1" showHome="true"></i-aside-btn>-->
    <!--<guess-like bind:openSku="openSku" bind:vipModal="vipModal" likeTitle="猜你喜欢" :updateCart="updateCart" v-if="is_show_guess_like==1"></guess-like>-->
  </div>
  <!--</i-auth>-->
  <i-dialog bind:cancel="callDialog" bind:confirm="cancelOrder" data-cancel="cancelOrderVisible" text="好不容易挑出来，确定要取消吗？" :visible="cancelOrderVisible"></i-dialog>
  <i-modal scrollUp="false" :visible="isShowModal">
    <div class="share-modal">
      <img @click="closeModal" class="close-modal" src="@/assets/images/img-close.png"></img>
      <div class="share-modal-title">@{{order.order_info.ziti_name}}{{groupInfo.owner_name}}，我是{{userInfo.shareNickName}}，刚在你这里下单啦！！！</div>
      <div class="share-modal-img">
        <img mode="widthFix" :src="share_img?share_img:order.order_goods_list[0].goods_share_image"></img>
      </div>
      <div class="share-modal-btn">
        <!--<button class="btn-item share-btn" hoverClass="none" openType="share" style="background:{{skin.color}}">-->
        <button class="btn-item share-btn" hoverClass="none" openType="share" :style="{color:skin.color,background:skin.light}">
          通知{{groupInfo.owner_name}}接单
        </button>
      </div>
    </div>
  </i-modal>
  <!--<sku bind:cancel="closeSku" bind:changeCartNum="changeCartNum" bind:vipModal="vipModal" :cur_sku_arr="cur_sku_arr" :goodsid="addCar_goodsid" :sku="sku" :skuList="skuList" :sku_val="sku_val" :visible="visible"></sku>-->
  <!--<i-vip-modal :imgUrl="pop_vipmember_buyimage" :visible="showVipModal"></i-vip-modal>-->

  <!--<i-modal scrollUp="false" :visible="showRefundModal&&refundGoodsInfo">-->
    <!--<div class="refundModal">-->
      <!--<div class="refundScroll bg-f p15 rounded mb20">-->
        <!--<div class="goodinfo pos-r pb15">-->
          <!--<div class="i-flex">-->
            <!--<div style="margin-right: 10px">-->
              <!--<i-img height="60" iClass="show-img" lazyLoad="true" :loadImage="refundGoodsInfo.image" width="60"></i-img>-->
            <!--</div>-->
            <!--<div class="i-flex-item" style="width:0;">-->
              <!--<div class="weight text-overflow1">-->
                <!--<span class="pintag" v-if="order.order_info.is_pin==1">拼团</span> {{order.order_goods_list[refundIdx].name}}-->
              <!--</div>-->
              <!--<div class="mount">-->
                <!--<div v-if="refundGoodsInfo.option_str">{{refundGoodsInfo.option_str}} </div>-->
                <!--<div v-if="order.order_info.type!='integral'">$</div>{{refundGoodsInfo.price}}-->
                <!--<div v-if="order.order_info.type=='integral'">积分</div> x {{refundGoodsInfo.quantity}}-->
              <!--</div>-->
              <!--<div class="weight mt5">-->
                <!--小计：<div v-if="order.order_info.type!='integral'">$</div>{{refundGoodsInfo.real_total}}-->
                <!--<div v-if="order.order_info.type=='integral'">积分</div>-->
              <!--</div>-->
              <!--<div class="card-btn">-->
                <!--<div @click="goRefund" class="btn-2 mar-left-8" :data-id="refundGoodsInfo.order_refund_goods.ref_id" v-if="refundGoodsInfo.is_refund_state>0&&refundGoodsInfo.order_refund_goods.ref_id">-->
                  <!--<div v-if="refundGoodsInfo.is_refund_state==1">-->
                    <!--{{refundGoodsInfo.order_refund_goods&&refundGoodsInfo.order_refund_goods.state==3?'退款成功':'查看售后'}}-->
                  <!--</div>-->
                  <!--<div v-else>退款成功</div>-->
                <!--</div>-->
                <!--<div v-if="order_can_del_cancle==0">-->
                  <!--<div @click="applyForService" class="btn-1 mar-left-8" :data-order_goods_id="refundGoodsInfo.order_goods_id" :data-type="order.order_info.order_id" v-if="refundGoodsInfo.can_ti_refund!=0&&refundGoodsInfo.is_refund_state==0&&order.order_info.order_status_id==4">申请售后</div>-->
                <!--</div>-->
                <!--<div v-else>-->
                  <!--<div @click="applyForService" class="btn-1 mar-left-8" :data-order_goods_id="refundGoodsInfo.order_goods_id" :data-type="order.order_info.order_id" v-if="refundGoodsInfo.can_ti_refund!=0&&refundGoodsInfo.is_refund_state==0&&order.order_info.order_status_id==4">申请售后</div>-->
                <!--</div>-->
                <!--<div @click="applyForService" class="btn-1 mar-left-8" :data-order_goods_id="refundGoodsInfo.order_goods_id" :data-type="order.order_info.order_id" v-if="refundGoodsInfo.is_statements_state==0&&refundGoodsInfo.is_refund_state==0&&(order.order_info.order_status_id==6||order.order_info.order_status_id==11)">申请售后</div>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="line"></div>-->
        <!--<div class="refundinfo">-->
          <!--<div class="m-head border-bottom i-flex i-flex-spb py10 mb10">-->
            <!--<div class="weight">已退款（{{refundGoodsInfo.has_refund_quantity}}件）</div>-->
            <!--<div class="text-gray fsz-24">{{order.goods_count}}件商品</div>-->
          <!--</div>-->
          <!--<div v-if="refundGoodsInfo.order_goods_refund_list.length">-->
            <!--<div class="fsz-24 text-6" v-for="(item,idx) in refundGoodsInfo.order_goods_refund_list" :key="item.index">-->
              <!--<div class="mb5">退款时间：<span class="text-3">{{item.addtime}}</span>-->
              <!--</div>-->
              <!--<div class="mb5">退款金额：<span class="text-3">${{item.money}}</span>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="close text-white text-center">-->
        <!--<span @click="closeModal" class="iconfont icon-guanbi fsz-60" data-type="1"></span>-->
      <!--</div>-->
    <!--</div>-->
  <!--</i-modal>-->
  </div>
</template>

<script>
  import GlobalMixin from '../../mixin/globalMixin.js';

  function count_down(e, t) {
    var o = Math.floor(t / 1e3), a = o / 3600 / 24, r = Math.floor(a), n = o / 3600 - 24 * r, i = Math.floor(n), s = o / 60 - 1440 * r - 60 * i, d = Math.floor(s), c = o - 86400 * r - 3600 * i - 60 * d;
    e.endtime= {
        days: r,
        hours: fill_zero_prefix(i),
        minutes: fill_zero_prefix(d),
        seconds: fill_zero_prefix(c),
        show_detail: 1
      }, t <= 0 ? (e.changeState= 1,
      e.endtime= {
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00"
      }): setTimeout(function() {
      count_down(e, t -= 1e3);
    }, 1e3);
  }

  function fill_zero_prefix(e) {
    return e < 10 ? "0" + e : e;
  }

  var util = require('../../utils/index.js'),
    status = require('../../utils'),
    a = require('../../utils/public'),
    wcache = require('../../utils/wcache.js'),
    countDownInit = require('../../utils/countDown')

  export default {
    mixins: [GlobalMixin],
    name:'order-order',
    data() {
      return {
        showPaymentModal:false,
        showPayNowModal: false,
        showTransferModal:false,
        bankInfo:{},
        payNowQr:'',
        payNowNo:'',
        order_num_alias_sub:'',
        payNowUen:'',
        endtime: {
          days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00"
        },
        cancelOrderVisible: false,
        orderSkuResps: [],
        tablebar: 4,
        navState: 0,
        theme_type: "",
        loadover: false,
        pingtai_deal: 0,
        is_show: false,
        order: {},
        common_header_backgroundimage: "",
        isShowModal: false,
        userInfo: {},
        groupInfo: {
          group_name: "社区",
          owner_name: "团长",
          delivery_ziti_name: "到点自提",
          delivery_tuanzshipping_name: "团长配送",
          delivery_express_name: "快递配送"
        },
        is_show_guess_like: 1,
        showRefundModal: false,
        is_show_tip: "",
        options: "",
        canCancel: true,
        isFirst: 1,

        order_refund: 0,
        order_can_del_cancle: 0,
        loadover: true,
        is_show: 1,
        hide_lding: true,
        is_hidden_orderlist_phone:  0,
        is_show_guess_like:  0,
        user_service_switch:  1,
        changeState:0,
        showVipModal:0,
        confirmGoodsVisible:true,
        share_img:'',
        pop_vipmember_buyimage:''
      }
    },
    components: {
      'i-goods-info': require('../../components/goodsInfo/index.vue').default
    },
    created: function() {
      this.$store.state.app.toolbarTitle ="我的订单";
      this.onLoad();
    },
    methods: {
      doShowPaymentModal: function(){
        this.showPaymentModal= true;
      },
      doClosePaymentModal: function(){
        this.showPaymentModal= false;
      },

      doShowPayNowModal:function(){
        this.showPayNowModal= true;
      },
      doClosePayNowModal:function(){
        this.showPayNowModal= false;
      },

      doShowTransferModal:function(){
        this.showTransferModal= true;

      },
      doCloseTransferModal:function(){
        this.showTransferModal= false;

      },
      havePaid: function(t){
        var this_ = this;
        var s = this.$wx.getStorageSync("token");
        var type = t.currentTarget.dataset.type
        var id = this.data.order.order_info.order_id;
//        this.$wx.showLoading();
          this.$http({
            controller: "order.pay_order",
            token: s,
            order_id: id,
            payment_code: type,
          }).then(t=> {
            this.$wx.redirectTo({
              url: "/lionfish_comshop/pages/order/order?id=" + id + "&is_show=1"
            })

        });
      },
      onLoad: function() {
        var that = this;
        var options = this.$route.query;

        that.options = options;

        var userInfo = this.$wx.getStorageSync('userInfo');

        if (userInfo && userInfo.nickName){
            if (userInfo.nickName.length() > 3) {
              userInfo.shareNickName = userInfo.nickName.substr(0, 3) + "...";
            }else {
              userInfo.shareNickName = userInfo.nickName;
            }
        }
        status.setGroupInfo().then((groupInfo) => {
          that.groupInfo=groupInfo;
        });

        util.check_login() ? this.needAuth= false: this.needAuth= true;

        that.common_header_backgroundimage= this.$getApp().globalData.common_header_backgroundimage;
          that.userInfo = userInfo;

        var token = this.$wx.getStorageSync("token");
//        this.$wx.hideShareMenu();
//        this.$wx.showLoading();

        var is_show_tip = options && options.is_show || 0;
        let isfail = options && options.isfail || '';
        this.is_show_tip = is_show_tip;
        if (is_show_tip != undefined && is_show_tip == 1) {
          //todo 弹出分享
        } else {
          this.$wx.showLoading();
        }

        if (isfail != undefined && isfail == 1) {
          this.$wx.showToast({
            title: '支付失败',
            icon: 'none'
          })
        }

         this.$http_post({
             controller: 'order.order_info',
             token,
             id: options.id
           }).then(res=> {
              console.log(res);
//             setTimeout(() => {
//               this.$wx.hideLoading();
//             }, 1000);

             if(res.code==0){
               let order_info = res.data.order_info;
               if (is_show_tip != undefined && is_show_tip == 1 && order_info.type == 'integral') {
                 this.$wx.showToast({
                   title: '兑换成功'
                 })
               } else if (is_show_tip != undefined && is_show_tip == 1) {

                 if (res.order_pay_after_share == 1) {
                   let share_img = res.data.share_img;
                   this.share_img = share_img;
                   this.isShowModal = true;
                 } else {
                   this.$wx.showToast({
                     title: '支付成功'
                   })
                 }
               }

               if (order_info.order_status_id == 3) {
                 var seconds = (order_info.over_buy_time - order_info.cur_time) * 1000;
                 if (seconds > 0) {
                   count_down(that, seconds);
                 } else {
                   order_info.open_auto_delete = 1;
                   this.changeState = 1;

                 }
               }
               let {
                 pingtai_deal,
                 order_refund,
                 order_can_del_cancle,
                 is_hidden_orderlist_phone,
                 is_show_guess_like,
                 user_service_switch
               } = res;

               that.order= res.data,
               that.pingtai_deal= pingtai_deal,
               that.order_refund= order_refund,
               that.order_can_del_cancle= order_can_del_cancle,
               that.loadover= true,
               that.is_show= 1,
               that.hide_lding= true,
               that.is_hidden_orderlist_phone= parseInt(is_hidden_orderlist_phone) || 0,
               that.is_show_guess_like= is_show_guess_like || 0,
               that.user_service_switch= user_service_switch || 1;

               that.do_hide_lding();
             } else if(res.code==2){
               that.needAuth= true;
             }
         })
      },
      onShow: function() {
        console.log(this.isFirst, "onShow", this.options.id), 1 < this.isFirst && this.reload_data(),
          this.isFirst++;
      },
      onHide: function() {
        console.log("order Hide");
      },
      doShowPaymentModal: function(){
        this.showPaymentModal= true;
      },
      doClosePaymentModal: function(){
        this.showPaymentModal= false;
      },
      authSuccess: function() {
        this.onLoad(this.options);
      },
      reload_data: function() {
        console.log("reload_data--", this.options.id);
        var a = this, e = this.$wx.getStorageSync("token"), t = this.options.id || "";
        t && this.$http_post({

            controller: "order.order_info",
            token: e,
            id: t
          }).then(e=> {
              console.log(e);
            var t = e.data.order_info;
            if (3 == t.order_status_id) {
              var o = 1e3 * (t.over_buy_time - t.cur_time);
              0 < o ? count_down(a, o) : a.changeState= 1;
            }
            a.order= e.data.data,
            a.pingtai_deal= e.data.pingtai_deal,
            a.order_refund= e.data.order_refund,
            a.loadover= true,
            a.is_show= 1,
            a.hide_lding= true;

        });
      },
      receivOrder: function(e) {
        var t = e.currentTarget.dataset.type || "", o = this.$wx.getStorageSync("token"), a = this;
        this.$wx.showModal({
          title: "提示",
          content: "确认收到",
          confirmColor: "#8ED9D1",
          success: function(e) {
            e.confirm && this.$http({
                controller: "order.receive_order",
                token: o,
                order_id: t
              }).then(e=> {
                0 == e.code && (this.$wx.showToast({
                  title: "收货成功",
                  icon: "success",
                  duration: 1e3
                }), a.reload_data());

            });
          }
        });
      },
      cancelSubmit: function(e) {
        var t = e.detail.formId, o = this.$wx.getStorageSync("token");
        this.$http({
            controller: "user.get_member_form_id",
            token: o,
            from_id: t
          }).then(e=> {
        });
      },
      payNowSubmit: function(e) {
        var t = e.detail.formId, o = this.$wx.getStorageSync("token");
        this.$http({

            controller: "user.get_member_form_id",
            token: o,
            from_id: t
          }).then(e=> {
        });
      },
      callDialog: function(e) {
        var t = e.currentTarget.dataset.type || "", o = this.$wx.getStorageSync("token");
        this.$wx.showModal({
          title: "取消支付",
          content: "好不容易挑出来，确定要取消吗？",
          confirmColor: "#8ED9D1",
          success: function(e) {
            e.confirm && this.$http({
                controller: "order.cancel_order",
                token: o,
                order_id: t
              }).then(e=> {
                this.$wx.showToast({
                  title: "取消成功",
                  icon: "success",
                  complete: function() {
                    this.$wx.redirectTo({
                      url: "/lionfish_comshop/pages/order/index"
                    });
                  }
                });

            });
          }
        });
      },
      applyForService: function(e) {
        var t = e.currentTarget.dataset.type || "", o = e.currentTarget.dataset.order_goods_id;
        t && this.$wx.redirectTo({
          url: "/lionfish_comshop/pages/order/refund?id=" + t + "&order_goods_id=" + o
        });
      },
      payNow :function(){
        var this_ = this;
        this.$wx.request({
          // 请求地址
          url: 'https://tuantuan.xx315.net/payment/paynow/paynow.json',
          // 请求方式
          method: "get",
          dataType: 'json',
          responseType: 'text',
          // 方法
          success: function(data) {
            console.log(data);
            this_.setData({
              payNowQr: data.data.data.qr,
              payNowNo: data.data.data.payNowNo,
              payNowUen:data.data.data.uen
            });
          }
        })

        this.doClosePaymentModal();
        this.doShowPayNowModal();
      },

      orderPayTransfer:function(){
        var this_ = this;
        this.$wx.request({
          // 请求地址
          url: 'https://tuantuan.xx315.net/payment/transfer/bank.json',
          // 请求方式
          method: "get",
          dataType: 'json',
          responseType: 'text',
          // 方法
          success: function(data) {
            console.log(data);
            this_.setData({
              bankInfo: data.data.data
            });
          }
        })
        this_.doClosePaymentModal();
        this_.doShowTransferModal();
      },

      payWeixin: function(e) {

        var t = e.currentTarget.dataset.type || "", o = this.$wx.getStorageSync("token");
        t && app.util.request({
          url: "entry/wxapp/index",
          data: {
            controller: "car.wxpay",
            token: o,
            order_id: t
          },
          dataType: "json",
          method: "POST",
          success: function(e) {
            0 == e.data.code ? this.$wx.requestPayment({
              appId: e.data.appId,
              timeStamp: e.data.timeStamp,
              nonceStr: e.data.nonceStr,
              package: e.data.package,
              signType: e.data.signType,
              paySign: e.data.paySign,
              success: function(e) {
                this.$wx.redirectTo({
                  url: "/lionfish_comshop/pages/order/order?id=" + t + "&is_show=1"
                });
              },
              fail: function(e) {
                console.log(e);
              }
            }) : 2 == e.data.code && this.$wx.showToast({
              title: e.data.msg,
              icon: "none"
            });
          }
        });
      },
      do_hide_lding: function() {
//        this.$wx.hideLoading(),
          this.is_show= true;
      },
      call_mobile: function(e) {
        var t = e.currentTarget.dataset.mobile;
        this.$wx.makePhoneCall({
          phoneNumber: t
        });
      },
      goComment: function(e) {
        var t = e.currentTarget.dataset.type, o = e.currentTarget.dataset.order_goods_id, a = e.currentTarget.dataset.goods_id;
//        3 < getCurrentPages().length ? this.$wx.redirectTo({
//          url: "/lionfish_comshop/pages/order/evaluate?id=" + t + "&goods_id=" + a + "&order_goods_id=" + o
//        }) : this.$wx.navigateTo({
//          url: "/lionfish_comshop/pages/order/evaluate?id=" + t + "&goods_id=" + a + "&order_goods_id=" + o
//        });
        this.$wx.redirectTo({
          url: "/lionfish_comshop/pages/order/evaluate?id=" + t + "&goods_id=" + a + "&order_goods_id=" + o
        })
      },
      gokefu: function(e) {
        var t = e.currentTarget.dataset.s_id;
//        3 < getCurrentPages().length ? this.$wx.redirectTo({
//          url: "/pages/im/index?id=" + t
//        }) : this.$wx.navigateTo({
//          url: "/pages/im/index?id=" + t
//        });
        this.$wx.redirectTo({
          url: "/pages/im/index?id=" + t
        })
      },
      goRefund: function(e) {
        var t = e.currentTarget.dataset.id || 0;
//        t && (3 < getCurrentPages().length ? this.$wx.redirectTo({
//          url: "/lionfish_comshop/pages/order/refunddetail?id=" + t
//        }) : this.$wx.navigateTo({
//          url: "/lionfish_comshop/pages/order/refunddetail?id=" + t
//        }));
        this.$wx.redirectTo({
          url: "/lionfish_comshop/pages/order/refunddetail?id=" + t
        })
      },
      closeModal: function(e) {
        var t = {};
        1 == (e.currentTarget.dataset.type || 0) ? t.showRefundModal = false : t.isShowModal = false,
          this.t=t;
      },
      cancelOrder: function(a) {
        var r = this;
        this.canCancel && this.$wx.showModal({
          title: "取消订单并退款",
          content: "取消订单后，款项将原路退回到您的支付账户；详情请查看退款进度。",
          confirmText: "取消订单",
          confirmColor: "#ff5344",
          cancelText: "再等等",
          cancelColor: "#666666",
          success: function(e) {
            if (e.confirm) {
              r.canCancel = false;
              var t = a.currentTarget.dataset.type, o = this.$wx.getStorageSync("token");
              app.util.request({
                url: "entry/wxapp/index",
                data: {
                  controller: "order.del_cancle_order",
                  token: o,
                  order_id: t
                },
                dataType: "json",
                method: "POST",
                success: function(e) {
                  0 == e.data.code ? this.$wx.showModal({
                    title: "提示",
                    content: "取消订单成功",
                    showCancel: false,
                    confirmColor: "#ff5344",
                    success: function(e) {
                      e.confirm && this.$wx.redirectTo({
                        url: "/lionfish_comshop/pages/order/index"
                      });
                    }
                  }) : (r.canCancel = true, this.$wx.showToast({
                    title: e.data.msg || "取消订单失败",
                    icon: "none"
                  }));
                }
              }), console.log("用户点击确定");
            } else e.cancel && (r.canCancel = true, console.log("用户点击取消"));
          }
        });
      },
      showRefundInfo: function(e) {
        var t = e.currentTarget.dataset.idx;
        if (0 < e.currentTarget.dataset.hasrefund) {
          var o = this.order.order_goods_list[t];
          this.showRefundModal= true,
            this.refundGoodsInfo= o;
        }
      },
      onShareAppMessage: function(e) {
        var t = this.order.order_info.order_id || "", o = this.order.order_goods_list[0].goods_share_image, a = this.share_img;
        if (t && 1 == this.is_show_tip) return {
          title: "@" + this.order.order_info.ziti_name + this.groupInfo.owner_name + "，我是" + this.data.userInfo.shareNickName + "，刚在你这里下单啦！！！",
          path: "lionfish_comshop/pages/order/shareOrderInfo?order_id=" + t,
          imageUrl: a || o
        };
      },
      goLink2: function(event) {
        let link = event.currentTarget.dataset.link;
        let id = event.currentTarget.dataset.id;
        link = link + id
        this.$wx.redirectTo({
          url: link
        })
      },
    }
  }
</script>

<style scoped>
  @import "order.less";
</style>
