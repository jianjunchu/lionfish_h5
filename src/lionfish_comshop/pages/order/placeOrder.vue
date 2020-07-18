<template>
  <div class="page">
    <i-auth @authSuccess="authSuccess" :needAuth="needAuth">

      <div class="mask" catchtouchmove="preventTouchMove" v-if="show_delivery_time_modal"></div>
      <div class="deliveryTimeDlg" v-if="show_delivery_time_modal">
        <div style='width:100%;height:26px;border-bottom:1px solid #ccc;margin:0;padding:0;'>
          <span style='text-align:center;font-size:14px;font-weight:600 ;margin-top:10vw'>{{$t('order.songhuoriqi')}}</span>
        </div>
        <div style='width:100%;margin-top:48vw'>
          <div class='deliveryTimeItem' @click="deliveryTimeItemClick" data-item="item"
               v-for="(item , index) in deliveryTimes">
            <span :class="item.class" style="width:33%;text-align:left;">{{item.date}}</span>
            <span :class="item.class" style="width:33%">{{item.week}}</span>
            <span style="width:33%; text-align:right;">{{item.text}}</span>
          </div>
        </div>
        <div style='margin-top: 12px;text-align:left;'>
          <div>
            <span>注意：</span>
          </div>
          <div>
            <span>1：若可选日期已有订单，我们将自动合并订单一起配送</span>
          </div>
        </div>
      </div>

      <div class="mask" catchtouchmove="preventTouchMove" v-if="show_transfer_modal"></div>
      <div class="paynow" v-if="show_transfer_modal">
        <div style='width: 100%;height: 10%;'>
          <div style='float:left;width: 40%;font-size: 22px;line-height: 50px;margin-left: 10%;'>
            转账支付
          </div>
          <div style='float:right;width: 50%;text-align: right' @click='closeTransferModal'>
            <img src='@/assets/images/img-close.png'
                 style='width: 30px;height: 30px;margin-top: 10px;margin-right: 10%'/>
          </div>
        </div>
        <div style='text-align: center'>
          <div style='width: 100%;height: 350px;font-size: 12px;'>

            <div style='margin-left: 5%;margin-top:10px;text-align:left;display: flex;justify-content: center;'>
              <span style='display: flex;justify-content: center;'>帐号：</span>
              <span style='text-align: left;'>{{bankInfo.account_no}}</span>
              <button @click='copyText' size="mini" style="font-size: 8px;" :data-text="bankInfo.account_no">复制
              </button>
            </div>
            <div style='margin-left: 5%;margin-top:10px;text-align:left;display: flex;justify-content: center;'>
              <span style='display: flex;justify-content: center;'>户名：</span>
              <span style='text-align: left;'>{{bankInfo.account_name}}</span>
              <button @click='copyText' size="mini" style="font-size: 8px;" :data-text="bankInfo.account_name">复制
              </button>
            </div>
            <div style='margin-left: 5%;margin-top:10px;text-align:left;display: flex;justify-content: center;'>
              <span style='display: flex;justify-content: center;'>银行：</span>
              <span style='text-align: left;'>{{bankInfo.bank_name}}</span>
              <button @click='copyText' size="mini" style="font-size: 8px;" :data-text="bankInfo.bank_name">复制
              </button>
            </div>

            <div style='wid:200px;height:100px;text-align: center;margin-top: 30px;'>
              <span style='font-size: 18px;'>请在支付时备注您订单内的联系号码 \n</span>
              <span style='font-size: 18px;color: #c0c0c0'>注：转账支付为人工审核</span>
            </div>
          </div>
          <div style='width: 60%;text-align: center;margin-top: 30px;margin-left: 20%;'>
            <button @click="havePaid" data-type="banktransfer" class="wux-button wux-button--block" type="default">
              已支付，查看订单
            </button>
          </div>
        </div>
      </div>

      <div class="mask" catchtouchmove="preventTouchMove" v-if="show_paynow_modal"></div>
      <div class="paynow" v-if="show_paynow_modal">
        <div style='width: 100%;height: 10%;'>
          <div style='float:left;width: 40%;font-size: 18px;line-height: 50px;margin-left: 5%;'>
            PayNow
          </div>

          <div style='float:right;width: 50%;text-align: right' @click='closePayNowModal'>
            <img src='@/assets/images/img-close.png'
                 style='width: 24px;height: 24px;margin-top: 10px;margin-right: 5%'/>
          </div>
        </div>
        <div style='float:left;width: 100%;margin-left: 5%;'>
          PayNow No.：{{payNowNo}}
        </div>
        <div style='float:left;width: 100%;margin-left: 5%;margin-top:5px'>
          {{$t('order.zhifujine')}}：
          <span style="color:red">${{tot_price}}</span>
        </div>
        <div style='float:left;width: 100%;margin-left: 5%;margin-top:5px'>
          {{$t('order.beizhudingdanhao')}}：
          <span style="color:red">{{order_num_alias}}</span>
        </div>
        <div style='float:left;width: 100%;margin-left: 5%;margin-top:5px'>
          <span style="color:red">{{$t('order.xierugaidingdanhao')}}</span>
        </div>

        <div style='text-align: center'>
          <div style='width: 100%;height: 350px;justify-content: center; '>
            <img :src='payNowQr'
                 style='width: 160px;height: 160px;margin-top: 20px;border: 1px solid #000;'/>
            <div style='wid:200px;height:40px;margin-top:10px;'>

              <span style='text-align: left'>{{$t('order.saomazhifu')}}  <!--或 uen: {{payNowUen}}--></span>

            </div>
            <div style='wid:200px;height:100px; margin-top:10px;'>
              <span style='font-size: 18px;'><!--请在支付时备注您订单内的联系号码 \n--></span>
              <span style='font-size: 18px;color: #c0c0c0'>注：转账支付为人工审核</span>
            </div>
          </div>
          <div class="receiver">

            <span>{{$t('order.jiaoyiliushui')}}</span>
            <input v-model="transaction_id" class="mobile" placeholder="Paynow transaction No." type="text"></input>

          </div>
          <div style='width: 60%;text-align: center;margin-top: 2vw;margin-left: 20%;'>
            <button @click="havePaid" :style="{background:skin.color,color:' #fff'}" data-type="paynow" class="wux-button wux-button--block" type="default">{{$t('order.yizhifu')}}
            </button>
          </div>
        </div>
      </div>

      <div class="mask" catchtouchmove="preventTouchMove" v-if="show_payment_modal"></div>
      <div class="modalDlg" v-if="show_payment_modal">
        <div style='width:100%;height:40px;border-bottom:1px solid #ccc;margin:0;padding:0;'>
          <span style='text-align:center;font-size:14px;font-weight:600 ;margin-top:10px'>{{$t('cart.zhifufangshi')}}</span>
        </div>

        <!-- 总金额 -->
        <div style='height:50px;width:100%'>
          <span style='font-size:30px;color:#f00'>${{tot_price}}</span>
        </div>

        <!--
                <button @click="preSubscript" data-type="wxpay" class="wux-button wux-button--block" :style="{background:skin.color,color:' #fff'}" type="warn">
                  微信支付
                </button>


                <button @click="preSubscript"  data-type="cashpay" class="wux-button wux-button--block" type="warn" style="margin-top=16px">到店付款</button>
                -->
        <button @click="preSubscript" data-type="paynow" class="wux-button wux-button--block" :style="{background:skin.color,color:' #fff'}" type="warn">PayNow
        </button>
        <!--<button @click="preSubscript" data-type="banktransfer" class="wux-button wux-button&#45;&#45;block" :style="{background:skin.color,color:' #fff'}" type="warn">公司转账
        </button>-->

        <!--
        <button wx:if='{{tabIdx==0}}' @click="preSubscript" data-type="cash" class="wux-button wux-button--block" type="warn">货到付款</button>
        -->

        <button @click="closePaymentModal" class="wux-button wux-button--block" type="default">{{$t('cart.quxiaozhifu')}}</button>

      </div>

      <div class="placeOrderBox">
        <div class="address-content">
          <div :class="['tab-nav',tabLength==1?'tab-nav-one':'']" :style="{'border-color':skin.color}">
            <div @click="tabSwitch" :class="['tab-nav-item',tabIdx==item.id?'active':'']" :data-idx="item.id"
                 :style="tabIdx==item.id?'background:'+skin.color:''" v-if="item.enabled"
                 v-for="(item,index) in tabList" :key="item.id">
              <span>{{item.name}}</span>
            </div>
          </div>
          <div class="receiver">
            <span space="ensp">{{tabIdx==0? $t('order.tihuoren'): $t('order.shouhuoren') }}：</span>
            <input  class="receive-name" placeholder=""
                   type="text" v-model="tabAddress[tabIdx].name"></input>
          </div>


          <div class="receiver">
            <span>{{$t('order.shoujihaoma')}}</span>
            <input   class="mobile" placeholder="" type="text"
                   v-model="tabAddress[tabIdx].mobile"></input>
          </div>


          <div class="address-box" v-if="tabIdx!=0">
            <div class="receiver">
              <span space="ensp">{{$t('order.youbian')}}</span>
              <input @input="inputZipCode" class="receive-name"
                     placeholder="" type="" v-model="tabAddress[tabIdx].zipCode"></input>
            </div>
            <div class="receiver align-start">
              <span space="ensp">{{$t('order.dapaihao')}}</span>
              <input  class="receive-name" placeholder=""
                     type="text" v-model="tabAddress[tabIdx].blk_no"></input>
            </div>
            <div class="receiver">
              <span space="ensp">{{$t('order.daoluming')}}</span>
              <input  class="receive-name" placeholder=""
                     type="" v-model="tabAddress[tabIdx].roadName"></input>
            </div>

            <div class="receiver align-start">
              <span space="ensp">{{$t('order.menpaihao')}}</span>
              <input  class="receive-name" :placeholder="$t('order.liru106')"
                     type="text" v-model="tabAddress[tabIdx].lou_meng_hao" v-if="!showConfirmModal"></input>
            </div>

            <div class="receiver">
              <span space="ensp">{{$t('order.jianzhuming')}}</span>
              <input  class="receive-name" placeholder=""
                     type="" v-model="tabAddress[tabIdx].building "></input>
            </div>


            <!--
            <div v-if="tabIdx==2">

                 <div class="receiver">
                    <span>所在地区： </span>
                     <div @click="choseLocation" class="sel-btn">{{tabAddress[tabIdx].region[0]||'选择地址'}}{{tabAddress[tabIdx].region[1]}}{{tabAddress[tabIdx].region[2]}} </div>
                    <img class="icon-right" src="@/assets/images/rightArrowImg.png"></image>
                 </div>
                 <div class="receiver align-start">
                    <span>详细地址：</span>
                    <spanarea @input="changeReceiverAddress" class="receive-name" focus="{{focus_addr}}" hidden="{{showConfirmModal}}" placeholder="详细地址" type="text" value="{{tabAddress[tabIdx].receiverAddress}}"></textarea>
                 </div>

            </block>
            <div v-else>
                 <div @click="choseLocation" class="receiver align-start">
                    <span>所在位置：</span>
                     <div class="sel-btn tuan-pos">{{tabAddress[tabIdx].receiverAddress}}
                    <img class="icon-right" src="@/assets/images/rightArrowImg.png"></image>
                     </div>
                 </div>
                 <div class="receiver align-start">
                    <span>楼号门牌：</span>
                    <spanarea @input="changeTuanAddress" class="receive-name" focus="{{focus_addr}}" placeholder="例如:A座106室" type="text" value="{{tabAddress[tabIdx].lou_meng_hao}}" v-if="!showConfirmModal}}"></textarea>
                 </div>
                 <div class="receiver align-start">
                    <span>送货时间：</span>
                    <input @input="bindReceiverMobile" focus="{{focus_delivery_time}}" bindfocus="selectdeliveryTime" placeholder="送货时间" type="text" value="{{tabAddress[tabIdx].delivery_time}}"></input>
                 </div>
            </block>
            -->
          </div>

          <div v-if="tabIdx != 2">
            <div class="receiver align-start">
              <span>{{tabIdx ==0 ? $t('cart.zitishijian') : $t('cart.songhuoshijian') }}</span>
              <input @click="showPickupTime"  :placeholder="'Choose'+tabIdx ==0 ? $t('cart.xuanzeshijian') : $t('cart.xuanzeshijian')" type="text"
                     :value="tabAddress[tabIdx].delivery_date_str"></input>
            </div>
          </div>

          <!--
           <div @click="getWxAddress" class="use-wx-address" :style="{color:skin.color}" v-if="tabIdx==2">+使用微信地址 </div>
          -->
          <div v-if="tabIdx!=2&&is_hexiao!=1">
            <p class="address-red">{{$t('order.xinxi')}} {{community.disUserName}} ({{community.communityName}})

              <router-link style="display:inline;right: 10px;" class="to-distribution"
                         hoverClass="none" to="/lionfish_comshop/pages/position/community">
                <span>{{$t('order.qiehuantuanzhang')}} </span>
              </router-link>
            </p>
       <p class="address">{{tabIdx==0?$t('order.tihuodidian'):groupInfo.owner_name+'位置'}}：{{community.fullAddress}}</p>
</div>
        </div>
        <div class="address-line">
          <img src="@/assets/images/icon-address-line.png"/>
        </div>
        <div class="card-container" v-for="(value,key) in seller_goodss" :key="key">
          <i-card iClass="card-content">
            <div class="card-header" slot="header" :style="{color:skin.color}">

              <div v-if="tabIdx==0">
<!--
                <div v-if="tabAddress[tabIdx].delivery_date_str && tabAddress[tabIdx].delivery_date_str!=''">
                  <div class="cart-header-left">预计{{tabAddress[tabIdx].delivery_date_str}}可自提</div>
                </div>
                <div v-else>
                  <div class="cart-header-left" v-if="pick_up_type==3">预计{{pick_up_time}}可自提</div>
                  <div class="cart-header-left" v-else>预计{{pick_up_time}}({{pick_up_weekday}})可自提</div>
                </div>
-->
              </div>
              <!--
              <div v-else-if="tabIdx==1">
                   <div class="cart-header-left" v-if="pick_up_type==3">预计{{pick_up_time}}{{groupInfo.owner_name}}配送 </div>
                   <div class="cart-header-left" v-else>预计{{pick_up_time}}({{pick_up_weekday}}){{groupInfo.owner_name}}配送 </div>
              </block>
              -->
              <div class="cart-header-right">{{value.goodsnum}} {{$t('order.jianshangpin')}}</div>
            </div>
            <div class="cart-item" slot="content">
              <div class="sku-item" v-for="(item,index) in value.goods" :key="index">


                <van-image class="sku-img" :src="item.image">
                  <template v-slot:loading>
                    <van-loading type="spinner" size="20" />
                  </template>
                </van-image>

                <div class="sku-msg">
                  <div class="sku-title">
                    {{item.name}}
                  </div>
                  <div class="sku-spec" v-if="item.option.length>0">{{$t('common.guige')}}
                    <span v-for="(option,index) in item.option " :key="option.option_id">{{option.value}}；</span>
                  </div>
                  <div class="original-price">
                    <span v-if="buy_type!='integral'">$</span>
                    {{item.price}} ×{{item.quantity}}
                    <span v-if="buy_type=='integral'">{{$t('common.jifen')}}</span>
                    <i-vip-price :price="item.card_price"
                                 v-if="is_open_vipcard_buy==1&&item.is_take_vipcard==1&&is_vip_card_member==1"></i-vip-price>
                    <i-vip-price :price="item.levelprice" type="1"
                                 v-else-if="canLevelBuy&&item.is_mb_level_buy"></i-vip-price>
                  </div>
                  <div class="sku-price">{{$t('common.xiaoji')}}
                    <span>
                                    <span v-if="buy_type!='integral'">$</span>{{item.total}}
                    <span v-if="buy_type=='integral'">{{$t('common.jifen')}}</span>
                                </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="cart-footer" slot="footer" v-if="is_open_order_message==1">
              <input @input="bindInputMessage" class="order-message" :data-idx="key" placeholder={{$t('common.beizhu')}}
                     type="text"></input>
            </div>
          </i-card>
        </div>
        <div class="act-content">
          <div class="cell" v-if="is_vip_card_member==1&&is_open_vipcard_buy==1&&vipcard_save_money>0">
            <span>会员优惠</span>
            <em>- $ {{vipcard_save_money}}</em>
          </div>
          <div class="cell" v-if="canLevelBuy&&levelAmount>0">
            <span>等级折扣</span>
            <em>- $ {{levelAmount}}</em>
          </div>
          <div class="cell" v-if="tabIdx==1&&delivery_tuanz_money>0">
            <span>{{groupInfo.placeorder_tuan_name}}</span>
            <em>+ $ {{delivery_tuanz_money}}</em>
          </div>
          <div class="cell" v-if="tabIdx==2&&trans_free_toal>0">
            <span>{{groupInfo.placeorder_trans_name}}</span>
            <em>+ $ {{trans_free_toal}}</em>
          </div>
          <div class="cell" v-if="tabIdx!=0">
            <div v-if="tabIdx==1&&is_man_delivery_tuanz_fare>0">
              <span>满{{man_free_tuanzshipping}}免{{groupInfo.placeorder_tuan_name}}</span>
              <em>- $ {{delivery_tuanz_money}}</em>
            </div>
            <div v-if="tabIdx==2&&is_man_shipping_fare>0">
              <span>满{{man_free_shipping}}免{{groupInfo.placeorder_trans_name}}</span>
              <em>- $ {{fare_man_shipping_fare_money}}</em>
            </div>
          </div>
          <div class="cell" v-if="reduce_money&&is_open_fullreduction">
            <span>满减</span>
            <em>- $ {{reduce_money}}</em>
          </div>
          <div @click="showvoucher" class="cell" data-seller_id="0" v-if="seller_goodss[0] && seller_goodss[0].show_voucher==1">
            <div>
              <span>{{$t('common.youhuiquan')}}</span>
              <span class="cell-desc" v-if="sel_chose_vouche.limit_money>0">满{{sel_chose_vouche.limit_money}}元优惠{{sel_chose_vouche.credit}}元</span>
              <span class="cell-desc" v-else>优惠{{sel_chose_vouche.credit}}元</span>
            </div>
            <div>
              <em>- $ {{sel_chose_vouche.credit}}</em>
              <img class="icon-right" src="@/assets/images/rightArrowImg.png"/>
            </div>
          </div>
          <div @click="showvoucher" class="cell" :data-seller_id="seller_goodss[0] && seller_goodss[0].store_info.s_id"
               v-if="ssvoucher_list.length&&seller_goodss[0].show_voucher==0">
            <div>
              <span>{{$t('common.xuanzeyouhuiquan')}}</span>
            </div>
            <div>
              <img class="icon-right" src="@/assets/images/rightArrowImg.png"/>
            </div>
          </div>
          <div class="cell" v-if="open_score_buy_score==1">
                <span>
          当前积分{{score}},本次<div v-if="bue_use_score>0">可用{{bue_use_score}}积分抵扣{{score_for_money}}元</div>
                    <div v-else>不可用积分支付</div>
                </span>
            <div>
              <switch bindchange="scoreChange" :checked="use_score==1" :disabled="bue_use_score<=0"></switch>
            </div>
          </div>
        </div>
        <div v-if="buy_type=='integral'">
          <div class="act-content" v-if="is_yue_open==1&&total_free>0">
            <div avalonctrl="oc_payment" @click="ck_wxpays" class="oc-payment">
              <div :class="['oc-payment-item',ck_yupay==0?'oc-payment-selected':'']"
                   :style="ck_yupay==0?'color:'+skin.color:''">
                <span class="iconfont icon-weixinzhifu oc-payment-icon" style="color:#00c800;"></span>
                <div class="oc-payment-method">PayNow</div>
                <div class="oc-payment-recommend" :style="{color:skin.color,'border-color':skin.color}">推荐</div>
              </div>
            </div>
            <div avalonctrl="oc_payment" @click="ck_yupays" class="oc-payment" v-if="can_yupay">
              <div :class="['oc-payment-item', ck_yupay>0?'oc-payment-selected':'']"
                   :style="ck_yupay>0?'color:'+skin.color:''">
                <span class="iconfont icon-balance oc-payment-icon" style="color:#ff5777;"></span>
                <div class="oc-payment-method">余额支付（余额：{{yu_money}}）</div>
              </div>
            </div>
            <div class="oc-payment" v-else>
              <div class="oc-payment-item">
                <span class="iconfont icon-balance oc-payment-icon text-gray"></span>
                <div class="oc-payment-method">余额支付（余额：{{yu_money}}）</div>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="act-content" v-if="is_yue_open==1">
            <div avalonctrl="oc_payment" @click="ck_wxpays" class="oc-payment">
              <div :class="['oc-payment-item', ck_yupay==0?'oc-payment-selected':'']"
                   :style="ck_yupay==0?'color:'+skin.color:''">
                <span class="iconfont icon-weixinzhifu oc-payment-icon" style="color:#00c800;"></span>
                <div class="oc-payment-method">PayNow支付</div>
                <div class="oc-payment-recommend" :style="{'color':skin.color , 'border-color':skin.color}">推荐</div>
              </div>
            </div>
            <div avalonctrl="oc_payment" @click="ck_yupays" class="oc-payment" v-if="can_yupay">
              <div :class="['oc-payment-item', ck_yupay>0?'oc-payment-selected':'']"
                   :style="ck_yupay>0?'color:'+skin.color:''">
                <span class="iconfont icon-balance oc-payment-icon" style="color:#ff5777;"></span>
                <div class="oc-payment-method">余额支付（余额：{{yu_money}}）</div>
              </div>
            </div>
            <div class="oc-payment" v-else>
              <div class="oc-payment-item">
                <span class="iconfont icon-balance oc-payment-icon text-gray"></span>
                <div class="oc-payment-method">余额支付（余额：{{yu_money}}）</div>
              </div>
            </div>
          </div>
        </div>
        <i-fixed-bottom>
          <div class="fixed-content">
            <div class="fixed-left">
              <div class="h1" v-if="buy_type=='integral'">
                To Pay：
                <span>
                            <div v-if="total_free>0">${{total_free}} + </div>{{total_integral}}积分
            </span>
              </div>
              <div class="h1" v-else>
                Total：<span>${{tot_price}}</span>
              </div>
              <div class="h2" v-if="buy_type!='integral'">
                <em>{{$t('order.zonge')}}${{total_all}}</em>
                <em v-if="disAmount>0">{{$t('order.zongyouhui')}}${{disAmount}}</em>
              </div>
            </div>
            <div class="fixed-bar-btn bgDisabled" v-if="btnDisable">{{btnText?btnText:'立即支付'}}</div>
            <i-button @handleTap="goOrderfrom" iClass="fixed-bar-btn" :loading="btnLoading" v-else>
              <div :style="{background:skin.color}" v-if="buy_type=='integral'">立即兑换</div>
              <div :style="{background:skin.color}" v-else>{{$t('cart.lijizhifu')}}</div>
            </i-button>
          </div>
        </i-fixed-bottom>
      </div>
    </i-auth>
    <i-modal @cancel="closeConfirmModal" iClass="confirm-modal-content" :is-show="showConfirmModal" scrollUp="true">
      <div class="confirm-order-modal">
        <div v-if="tabIdx==0">
          <!-- <div class="title">{{$t('order.cishangpinxuyao')}}{{originTabList[tabIdx].name}} {{$t('order.qingquerentihuo')}}</div> -->
          <div v-if="tabIdx==0" class="title"> This product requires you to pick up from the Collection Point. Please confirm the collection information. </div>
          <div v-if="tabIdx==2" class="title"> This product is Direct Delivery. </div>
	  <div class="sub-title">
            <img src="@/assets/images/icon-give.png"/>

            <div v-if="tabAddress[tabIdx].delivery_date_str && tabAddress[tabIdx].delivery_date_str!=''">
              <!-- <div>预计{{tabAddress[tabIdx].delivery_date_str}}可自提</div>  -->
		<div>Estimated pick-up:{{tabAddress[tabIdx].delivery_date_str}}</div> 
            </div>
            <div v-else>
              <span v-if="pick_up_type==3">{{pick_up_time}}可自提</span>
              <span v-else>{{pick_up_time}}({{pick_up_weekday}})可自提</span>
            </div>


          </div>
        </div>
        <!--
        <div v-else-if="tabIdx==1">
             <div class="title">需要{{groupInfo.owner_name}}配送，请确认收货信息 </div>
             <div class="sub-title">
                <img src="@/assets/images/icon-give.png"></image>
                <span v-if="pick_up_type==3">预计{{pick_up_time}}{{groupInfo.owner_name}}配送</span>
                <span v-else>预计{{pick_up_time}}({{pick_up_weekday}}){{groupInfo.owner_name}}配送</span>
             </div>
        </block>
        -->
        <div class="title" v-else>{{$t('order.querenshouhuoxinxi')}}</div>
        <div class="order-content">
          <div class="msg-group">
            <span>{{$t('order.shangpinzonge')}}</span>
            <em>+${{total_goods_price}}</em>
          </div>
          <div class="msg-group" v-if="tabIdx==1">
            <span>{{groupInfo.placeorder_tuan_name}}：</span>
            <em>+${{delivery_tuanz_money?delivery_tuanz_money:0}}</em>
          </div>
          <div class="msg-group" v-if="tabIdx==2">
            <span>{{groupInfo.placeorder_trans_name}}：</span>
            <em>+${{trans_free_toal?trans_free_toal:0}}</em>
          </div>
          <div class="msg-group" v-if="disAmount>0">
            <span>{{$t('order.youhuijine')}}</span>
            <em>-${{disAmount}}</em>
          </div>
          <div class="msg-group">
            <span>{{groupInfo.owner_name}}：</span>
            <em>{{disUserName}}
              <span class="distance" v-if="current_distance&&tabIdx==1">(距您{{current_distance}}m)</span>
            </em>
          </div>
          <div class="msg-group">
            <span>{{tabIdx==0?$t('order.tihuoren'): $t('order.shouhuoren') }}：</span>
            <em>{{tabAddress[tabIdx].name}} {{tabAddress[tabIdx].mobile}}</em>
          </div>
          <div class="msg-group" v-if="tabIdx==0">
            <div v-if="index_hide_headdetail_address==0">
              <span>{{$t('order.tihuodidian')}}</span>
              <em>{{pickUpAddress}}</em>
            </div>
          </div>

          <div class="msg-group" v-else-if="tabIdx==1">
            <span>{{$t('order.shouhuodizhi')}}</span>
            <em>{{tabAddress[tabIdx].blk_no}} {{tabAddress[tabIdx].roadName}}{{tabAddress[tabIdx].building}}</em>
          </div>
          <div class="msg-group" v-else>
            <span>{{$t('order.shouhuodizhi')}}</span>
            <em space="ensp">{{tabAddress[tabIdx].blk_no}}
              {{tabAddress[tabIdx].roadName}}{{tabAddress[tabIdx].building}}</em>
          </div>
          <div class="total">
            {{$t('order.heji')}}
            <em>${{tot_price}}</em>
          </div>
        </div>
        <div class="button-group">
          <i-button @handleTap="closeConfirmModal" class="btn-content" iClass="btn left-btn">{{$t('common.quxiao')}}</i-button>
          <div class="btn-content btn right-btn bgDisabled" v-if="btnDisable">{{btnText?btnText:$t('order.querenzhifu')}}</div>
          <i-button @handleTap="showPaymentModal" class="btn-content" iClass="btn right-btn" :loading="payBtnLoading"
                    :styleStr="'background:'+skin.color" v-else>
            <div :style="{background:skin.color}">{{$t('order.querenzhifu')}}</div>
          </i-button>
        </div>
      </div>
    </i-modal>
    <!--<i-dialog @cancel="cancel" @confirm="continuePay" confirmText="确认" text="赠品已送完，确认支付？"
              v-show="visible"></i-dialog>-->
    <i-modal @cancel="closeCouponModal" iClass="confirm-modal-content" v-show="!hide_quan">
      <div class="confirm-coupon-modal">
        <div class="title">请选择优惠券</div>
        <div scrollY class="list">
          <div @click="chose_voucher_id" class="item" :data-seller_id="voucher_serller_id" data-voucher_id="0">
            <div>不使用</div>
            <img class="no-tag-img" src="@/assets/images/checkbox-checked.png" v-if="seller_chose_id==0"/>
            <img class="no-tag-img" src="@/assets/images/checkbox-disabled.png" v-else/>
          </div>
          <div @click="chose_voucher_id" class="coupon" :data-seller_id="voucher_serller_id"
               :data-voucher_id="item.id" v-for="(item , index ) in ssvoucher_list" :key="item.id">
            <div class="header">
              <div class="price">
                <div class="reduce-price">
                  {{item.credit}}
                  <span>元</span>
                </div>
                <div class="reduce-desc">{{item.limit_money>0.01?'满'+item.limit_money+'元可用':'不限制'}}</div>
              </div>
              <div class="info">
                <div class="reduce-title">{{item.voucher_title}}
                  <span class="reduce-type" v-if="item.cate_name!=''">{{item.cate_name}}</span>
                </div>
              </div>
              <div class="status">
                <img class="tag-img" src="@/assets/images/checkbox-checked.png"
                     v-if="item.id==seller_chose_id"/>
                <img class="tag-img" src="@/assets/images/checkbox-disabled.png" v-else/>
              </div>
            </div>
            <div class="footer">有效期：{{item.begin_time}}~{{item.end_time}}</div>
          </div>
        </div>
      </div>
    </i-modal>

    <i-modal @cancel="closePickupTimeModal" iClass="confirm-modal-content" :is-show="showPickupTimeModal" scrollUp="true">
      <div class="confirm-order-modal">
        <div class="title">{{tabIdx ==0 ? $t('order.xuanzetihuoshijian') : $t('order.xuanzesonghuoshijian')}}</div>
        <div class="line"></div>
        <div class="order-content" style="padding:0; border-radius:0vw; width: 100vw;margin-bottom: 0">
          <div class="page-content">
            <div scrollWithAnimation scrollY class="page-category" scrollTop="categoryScrollBarTop"
                 style="min-height:50vw">

              <div @click="changePickupDate"
                   :class="['category-item',rickupTimeData.activeDateIndex == index?'active':'']" :data-index="index"
                   v-for="(item , index) in rickupTimeData.list" :key="index">
                {{item.date}}
              </div>


              <div class="category-item"></div>
            </div>

            <div scrollWithAnimation scrollY bindscroll="scroll" bindscrolltolower="scrollBottom"
                 bindtouchend="touchend" bindtouchstart="touchstart" class="page-list pt50"
                 lowerThreshold="200" scrollTop="resetScrollBarTop" style="" upperThreshold="50">

              <div @click="changePickupTime" v-for="(item , index ) in rickupTimeData.currentTimes" :key="index"
                   :data-index="index">
                <el-button style="width: 50vw" :type="rickupTimeData.activeTimeIndex===index?'warn':'primary'"
                        plain="true" size="mini">{{item}}
                </el-button>
              </div>
            </div>
          </div>

        </div>

        <div class="button-group">
          <div @click="closePickupTimeModal" class="btn left-btn btn-content" iClass="btn left-btn">{{$t('common.quxiao')}}</div>
          <div class="btn-content btn right-btn bgDisabled" v-if="btnDisable">{{btnText?btnText:'确认支付'}}</div>
          <div @click="changePickupDateTime" class="btn right-btn btn-content" iClass="btn right-btn"
                    :styleStr="'background:'+skin.color" v-else>
            <div :style="{background:skin.color}">{{$t('common.queding')}}</div>
          </div>
        </div>
      </div>
    </i-modal>


  </div>
</template>

<script>
  import GlobalMixin from '../../mixin/globalMixin.js'
  import ITabs from '@/lionfish_comshop/components/tabs'
  import status from '../../utils/index.js'
  import util from '../../utils/index.js'
  var app, wx
  var _extends = Object.assign || function(e) {
      for (var t = 1; t < arguments.length; t++) {
        var a = arguments[t]
        for (var i in a) Object.prototype.hasOwnProperty.call(a, i) && (e[i] = a[i])
      }
      return e
    }, locat = require('../../utils/Location.js')
    ,wcache = require('../../utils/wcache.js')
  export default {
    name: 'placeOrder',
    mixins: [GlobalMixin],
    components:{ITabs},
    data() {
      return {
        transaction_id:'',
        order_id: '',
        order_num_alias: '',
        show_payment_modal: false,
        show_paynow_modal: false,
        show_transfer_modal: false,
        show_delivery_time_modal: false,
        show_storefront_modal: false,
        deliveryTimes: [{ date: '2020-04-10', week: '星期五', full: true, text: '已满' }],
        bankInfo: {},
        storefronts: [],
        payNowQr: '',
        payNowNo: '',
        payNowUen: '',
        payBtnLoading: !1,
        showConfirmModal: !1,
        showPickupTimeModal: false,
        receiverAddress: '',
        tuan_send_address: '',
        showGetPhone: !1,
        lou_meng_hao: '',
        pickUpAddress: '',
        disUserName: '',
        pickUpCommunityName: '',
        is_limit_distance_buy: 0,
        is_limit: 0,
        zipCode: '', //lilongyun 2020-05-28 邮编
        roadName: '', //lilongyun 2020-05-28 道路名
        building: '', //lilongyun 2020-05-28 建筑名
        blk_no: '', //lilongyun 2020-05-28 大牌号
        rickupTimeData: {
          activeDateIndex: 0,
          activeTimeIndex: 0,
          currentDate: '',
          currentTime: '',
          list: [],
          currentTimes: []
        },
        tabList: [{
          id: 0,
          name: '到点自提',
          dispatching: 'pickup',
          enabled: !1
        }, {
          id: 1,
          name: '团长配送',
          dispatching: 'tuanz_send',
          enabled: !1
        }, {
          id: 2,
          name: '快递配送',
          dispatching: 'express',
          enabled: !1
        }],
        originTabList: [{
          id: 0,
          name: '到点自提',
          dispatching: 'pickup'
        }, {
          id: 1,
          name: '团长配送',
          dispatching: 'tuanz_send'
        }, {
          id: 2,
          name: '快递配送',
          dispatching: 'express'
        }],
        tabIdx: 0,
        region: ['选择地址', '', ''],
        tot_price: 0,
        needAuth: !1,
        reduce_money: 0,
        hide_quan: !0,
        tuan_region: ['选择地址', '', ''],
        groupInfo: {
          group_name: '社区',
          owner_name: '团长',
          placeorder_tuan_name: '配送费',
          placeorder_trans_name: 'Freight'
        },
        comment: '',
        is_yue_open: 0,
        can_yupay: 0,
        ck_yupay: 0,
        use_score: 0,
        commentArr: {},
        community: {},
        canPay: !0,
        canPreSub: !0,
        tabAddress: [{
          name: '',
          mobile: ''
          //delivery_time:e.pick_up_time+'('+e.pick_up_weekday+')'
        }, {
          name: '',
          mobile:  '',
          receiverAddress: '',
          lou_meng_hao: '',
          zipCode: '', //lilongyun 2020-05-28
          roadName: '',//lilongyun 2020-05-28
          building: '',//lilongyun 2020-05-28
          blk_no: '', //lilongyun 2020-05-28 大牌号
          region: []
        }, {
          name: '',
          mobile: '',
          receiverAddress: '',
          lou_meng_hao:  '',
          zipCode: '', //lilongyun 2020-05-28
          roadName:  '',//lilongyun 2020-05-28
          building: '',//lilongyun 2020-05-28
          blk_no: '', //lilongyun 2020-05-28 大牌号
          region: []
        }],
        tabLength: 0,
        seller_goodss: [],
        ssvoucher_list: [],
        btnLoading: !1,
        btnDisable: !1,
        visible: !1,
        voucher_serller_id: 0,
        is_hexiao: !1,
        is_vip_card_member: !1,
        canLevelBuy: !1,
        disAmount: 0 ,
        seller_chose_id: 0,
        index_hide_headdetail_address: 0,
        open_score_buy_score: 0,
        total_all: 0,
        pick_up_type: 0,
        pick_up_time: '',
        pick_up_weekday: '',
        total_goods_price: '',
        current_distance: '',

      }
    },
    created: function() {

      app = this.$getApp()
      wx = this.$wx
      this.$wx.setNavigationBarTitle({
        title: "Place Order",
        showLogo:false,
        showMore:false,
        showBack:true
      })

      this.$store.dispatch('app/showToolbarBack')
      this.onLoad()
      this.onShow()
    },

    methods: {
      onLoad: function() {

        var e = this.$route.query

        var F = this
        status.setGroupInfo().then(function(f) {
          F.groupInfo = f
        })
        var t = wx.getStorageSync('token'), a = wx.getStorageSync('community'), i = a.communityId;
        util.check_login_new().then(function(t){
          F.needAuth = !t
        })

        var o = e.is_limit || 0


        var fullAddress = a.fullAddress || ''
        fullAddress = fullAddress.replace('境外境外境外地区', '')

        F.buy_type = e.type || ''
        F.soli_id = e.soli_id || ''
        F.pickUpAddress = fullAddress || ''
        F.pickUpCommunityName = a.communityName || ''
        F.disUserName = a.disUserName || ''

        wx.showLoading()

        var s = wx.getStorageSync('latitude2'), n = wx.getStorageSync('longitude2')

        function r() {
          app.util.request({
            url: 'entry/wxapp/user',
            data: {
              controller: 'car.checkout',
              token: t,
              community_id: i,
              buy_type: e.type,
              soli_id: e.soli_id
            },
            dataType: 'json',
            method: 'POST',
            success: function(e) {
              setTimeout(function() {
                wx.hideLoading()
              }, 1e3)
              var t = e, a = 0, i = 0, o = F.tabList, s = [], n = e, r = n.delivery_express_name,
                d = n.delivery_tuanzshipping_name, c = n.delivery_ziti_name, _ = n.delivery_diy_sort,
                u = n.delivery_type_express, l = n.delivery_type_tuanz, h = n.delivery_type_ziti,
                p = n.delivery_tuanz_money, m = n.is_vip_card_member, y = n.vipcard_save_money, g = n.level_save_money,
                f = n.is_open_vipcard_buy, v = n.is_member_level_buy, b = n.total_integral, x = n.is_need_subscript,
                w = n.need_subscript_template, S = n.is_hexiao, A = !1
              if (1 == f ? 1 != m && 1 == v && (A = !0) : 1 == v && (A = !0), 1 == u && (o[2].enabled = !0,
                i++), 1 == l && (o[1].enabled = !0, i++), 1 == h && (o[0].enabled = !0, i++), _) {
                var k = _.split(',')
                k[2] && o[k[2]] && o[k[2]].enabled && (a = k[2]), k[1] && o[k[1]] && o[k[1]].enabled && (a = k[1]),
                k[0] && o[k[0]] && o[k[0]].enabled && (a = k[0]), k.forEach(function(e) {
                  s.push(o[e])
                })
              }
              r && (o[2].name = r), d && (o[1].name = d), c && (o[0].name = c)
              1 == a || 2 == a && t.trans_free_toal

              var T = 0, D = 0, P = t.seller_goodss, z = (Object.keys(P).length, {})
              for (var I in P) z[I] = ''
              var L = ''
              for (var O in P) {
                for (var j in 1 == P[O].show_voucher && (P[O].chose_vouche.id && (T = P[O].chose_vouche.id),
                P[O].chose_vouche.store_id && (D = P[O].chose_vouche.store_id), '[object Object]' == Object.prototype.toString.call(P[O].chose_vouche) && (L = P[O].chose_vouche)),
                  P[O].goodsnum = Object.keys(P[O].goods).length, P[O].goods) {
                  0 < P[O].goods[j].header_disc && P[O].goods[j].header_disc < 100 && (P[O].goods[j].header_disc = (P[O].goods[j].header_disc / 10).toFixed(1))
                }
              }
              F.is_hexiao = S
              F.loadover = !0
              F.commentArr = z
              F.sel_chose_vouche = L
              F.tabList = s
              F.is_limit_distance_buy = t.is_limit_distance_buy || 0
              F.tabIdx = a
              F.tabLength = i
              F.tuan_send_address = t.tuan_send_address
              F.is_open_order_message = t.is_open_order_message
              F.is_yue_open = t.is_yue_open
              F.can_yupay = t.can_yupay
              F.show_voucher = t.show_voucher
              F.current_distance = t.current_distance || ''
              F.man_free_tuanzshipping = 1 * t.man_free_tuanzshipping || 0
              F.man_free_shipping = 1 * t.man_free_shipping || 0
              F.index_hide_headdetail_address = t.index_hide_headdetail_address || 0
              F.open_score_buy_score = t.open_score_buy_score || 0
              F.score = t.score || 0
              F.score_for_money = t.score_for_money || 0
              F.bue_use_score = t.bue_use_score || 0
              F.is_man_delivery_tuanz_fare = t.is_man_delivery_tuanz_fare
              F.fare_man_delivery_tuanz_fare_money = t.fare_man_delivery_tuanz_fare_money
              F.is_man_shipping_fare = t.is_man_shipping_fare
              F.fare_man_shipping_fare_money = t.fare_man_shipping_fare_money
              F.is_vip_card_member = m
              F.vipcard_save_money = y
              F.level_save_money = g
              F.is_open_vipcard_buy = f
              F.is_member_level_buy = v
              F.canLevelBuy = A
              F.total_integral = b || ''
              F.is_need_subscript = x
              F.need_subscript_template = w

              var q = t.address, C = t.tuan_send_address_info, M = C.address || '选择位置'
              '' != C.city_name && 3708 != C.city_id && '' != C.country_name && 3708 != C.country_id || (M = '选择位置')

              F.tabAddress = [{
                name: t.ziti_name || '',
                mobile: t.ziti_mobile || ''
                //delivery_time:e.pick_up_time+'('+e.pick_up_weekday+')'
              }, {
                name: C.name || '',
                mobile: C.telephone || '',
                receiverAddress: M,
                lou_meng_hao: C.lou_meng_hao || '',
                zipCode: C.zip_code || '', //lilongyun 2020-05-28
                roadName: C.road_name || '',//lilongyun 2020-05-28
                building: C.building || '',//lilongyun 2020-05-28
                blk_no: C.blk_no || '', //lilongyun 2020-05-28 大牌号
                region: [C.province_name || '', C.city_name || '', C.country_name || '']
              }, {
                name: q.name || '',
                mobile: q.telephone || '',
                receiverAddress: q.address || '',
                lou_meng_hao: C.lou_meng_hao || '',
                zipCode: C.zip_code || '', //lilongyun 2020-05-28
                roadName: C.road_name || '',//lilongyun 2020-05-28
                building: C.building || '',//lilongyun 2020-05-28
                blk_no: C.blk_no || '', //lilongyun 2020-05-28 大牌号
                region: [q.province_name || '选择地址', q.city_name || '', q.country_name || '']
              }]

              F.pick_up_time = e.pick_up_time
              F.pick_up_type = e.pick_up_type
              F.pick_up_weekday = e.pick_up_weekday
              F.addressState = !0
              F.is_integer = e.is_integer
              F.is_ziti = e.is_ziti
              F.pick_up_arr = e.pick_up_arr
              F.seller_goodss = e.seller_goodss
              F.seller_chose_id = T
              F.seller_chose_store_id = D
              F.goods = e.goods
              F.buy_type = e.buy_type
              F.yupay = e.can_yupay
              F.is_yue_open = e.is_yue_open
              F.yu_money = e.yu_money
              F.total_free = e.total_free
              F.trans_free_toal = e.trans_free_toal
              F.delivery_tuanz_money = e.delivery_tuanz_money
              F.reduce_money = e.reduce_money
              F.is_open_fullreduction = e.is_open_fullreduction
              F.cha_reduce_money = e.cha_reduce_money

              F.calcPrice()
            }
          })
        }

        1 == o && s && n && console.log('---------is here ?-----------'), r()
      },
      onShow: function(e) {
        this.getCommunityInfo()
      },
      authSuccess: function() {
        this.onLoad()
      },
      getCommunityInfo: function() {
        var t = this, e = wx.getStorageSync('community')
        e ? e.head_mobile ? (t.community = e) : util.getCommunityById(e.communityId).then(function(e) {
          t.community = e.data
        }) : wx.getStorageSync('token') && util.getCommunityInfo().then(function(e) {
          t.community = e.data
        })
      },
      getReceiveMobile: function(e) {
        var t = e
        this.t_ziti_mobile = t
        this.showGetPhone = !1
      },
      ck_wxpays: function() {
        this.ck_yupay = 0
      },
      selectStorefront: function() {
        var this_ = this
        wx.request({
          // 请求地址
          url: 'https://hz.xx315.net/addons/lionfish_comshop/storefront.json',
          // 请求方式
          method: 'get',
          dataType: 'json',
          responseType: 'text',
          // 方法
          success: function(data) {
            var datas = data.data
            this_storefronts = datas

          }
        })
        this_.showStorefrontModal()
      },

      selectdeliveryTime: function() {
        var this_ = this
        wx.request({
          // 请求地址
          url: 'https://hz.xx315.net/addons/lionfish_comshop/delivery_time.json',
          // 请求方式
          method: 'get',
          dataType: 'json',
          responseType: 'text',
          // 方法
          success: function(data) {
            var datas = data.data
            var list = new Array()
            for (var i = 0; i < datas.length; i++) {
              const item = datas[i]
              var currentDate = new Date()
              currentDate.setDate(currentDate.getDate() + i + 1)
              item.date = (currentDate).Format('yyyy-MM-dd')
              item.week = util.getWeekDay(item.date)
              if (item.ausgebucht == 1) {
                item.full = true
                item.text = '已满'
                item.class = 'deliveryTimeFull'
              } else {
                item.full = false
                item.text = ''
                item.class = ''
              }

              list.push(item)
            }
            this_.deliveryTimes = list

          }
        })
        this.showDeliveryTimeModal()
      },
      deliveryTimeItemClick: function(item) {
        var e = this, s = e.tabAddress, n = e.tabIdx, r = this

        if (item && item.currentTarget && item.currentTarget.dataset && item.currentTarget.dataset.item && !item.currentTarget.dataset.item.full) {
          s[n].delivery_time = item.currentTarget.dataset.item.date

          this.tabAddress = s
          this.closeDeliveryTimeModal()

        }
      },
      copyText: function(e) {
        wx.setClipboardData({
          data: e.currentTarget.dataset.text,
          success: function(res) {
            wx.getClipboardData({
              success: function(res) {
                wx.showToast({
                  title: '复制成功'
                })
              }
            })
          }
        })
      },
      ck_yupays: function() {
        this.ck_yupay = 1
      },
      scoreChange: function(e) {
        console.log('是否使用', e.detail.value)
        var t = this, a = 1 * t.score_for_money, i = 1 * t.tot_price, o = 1 * t.disAmount
        e.detail.value ? (i = (i - a).toFixed(2), o += a) : (i = (i + a).toFixed(2), o -= a)
        t.use_score = e.detail.value ? 1 : 0
        t.tot_price = i
        t.disAmount = o.toFixed(2)
      },

      close: function() {
        this.showGetPhone = !1
      },
      showPaymentModal: function() {
        this.show_payment_modal = !0
      },
      closePaymentModal: function() {
        this.show_payment_modal = !1
      },
      showPayNowModal: function() {
        this.show_paynow_modal = !0
      },
      closePayNowModal: function() {
        this.show_paynow_modal = !1
        wx.redirectTo({
          url: '/lionfish_comshop/pages/order/order?id=' + this.order_id + '&is_show=1'
        })
      },

      showTransferModal: function() {
        this.show_transfer_modal = !0
        wx.redirectTo({
          url: '/lionfish_comshop/pages/order/order?id=' + this.order_id + '&is_show=1'
        })
      },
      closeTransferModal: function() {
        this.show_transfer_modal = !1
      },
      showDeliveryTimeModal: function() {
        this.show_delivery_time_modal = !0
      },

      closeDeliveryTimeModal: function() {
        this.show_delivery_time_modal = !1
      },
      showStorefrontModal: function() {
        this.show_storefront_modal = !0

      },
      closeStorefrontModal: function() {
        this.show_storefront_modal = !1
      },
      goOrderfrom: function() {
        var e = this, t = e.tabAddress, a = e.tabIdx, i = t[a].name, o = t[a].mobile, s = t[a].receiverAddress,
          n = t[a].region, r = t[a].receiverAddress, d = t[a].lou_meng_hao, dt = t[a].delivery_date_str,
          zc = t[a].zipCode, rn = t[a].roadName, bd = t[a].building
        if ('' == i) {
          e.focus_name = !0
          var c = this.$t('order.tianxieshouhuoren')
          return 0 == a && (c = this.$t('order.tianxietihuoren')), wx.showToast({
            title: c,
            icon: 'none'
          }), !1
        }

        if (!/^\d{8}$/.test(o) && !/^1(3|4|5|6|7|8|9)\d{9}$/.test(o)) {
          return wx.showToast({
            title: this.$t('order.shoujihaomayouwu'),
            icon: 'none'
          }), !1
        }

        if (0 != a && ('' == zc || !/^\d{6}$/.test(zc))) {
          return wx.showToast({
            title:  this.$t('order.youbianyouwu'),
            icon: 'none'
          }), !1
        }

        if (0 != a && '' == rn) {
          return wx.showToast({
            title: '请填写道路名',
            icon: 'none'
          }), !1
        }

        if (0 != a && '' == bd) {
          return wx.showToast({
            title: '请填写建筑名',
            icon: 'none'
          }), !1
        }

        if (0 != a && '' == d) {
          return wx.showToast({
            title: this.$t('order.tianxiemenpai'),
            icon: 'none'
          }), !1
        }

        /**
         if (2 == a && "选择地址" == n[0]) return wx.showToast({
            title: "请选择所在地区",
            icon: "none"
        }), !1;
         if (2 == a && "" == s) return this.setData({
            focus_addr: !0
        }), wx.showToast({
            title: "请填写详细地址",
            icon: "none"
        }), !1;
         if (1 == a) {
            if ("选择位置" == r || "" == r) return wx.showToast({
                title: "请选择位置",
                icon: "none"
            }), !1;
            if ("" == d) return wx.showToast({
                title: "输入楼号门牌",
                icon: "none"
            }), !1;
        }
         */
        var ter = a == 0 ? this.$t('order.xuanzezitishijian'): this.$t('order.xuanzepeisongshijian')
        if (2 != a && !dt || '' == dt) {
          return wx.showToast({
            title: ter,
            icon: 'none'
          }), !1
        }
        //原逻辑直接微信支付 改成先选择支付方式
        //2 == a ? this.preSubscript() : this.conformOrder();
        2 == a ? this.showPaymentModal() : this.conformOrder()
      },
      preSubscript: function(t) {
        var type = t.currentTarget.dataset.type
        var e = this
        this.canPreSub && (this.canPreSub = !1, 1 == this.is_need_subscript ? this.subscriptionNotice().then(function() {
          e.prepay(type)
        }).catch(function() {
          e.prepay(type)
        }) : e.prepay(type))

      },
      havePaid: function(t) {

        if ( '' == this.transaction_id) {
          return wx.showToast({
            title: '请输入交易流水id',
            icon: 'none'
          }), !1
        }
        var i= this
        var s = wx.getStorageSync('token')
        var type = t.currentTarget.dataset.type
        wx.showLoading(), app.util.request({
          url: 'entry/wxapp/user',
          data: {
            controller: 'order.pay_order',
            token: s,
            order_id: i.order_id,
            payment_code: type,
            transaction_id:this.transaction_id
          },
          dataType: 'json',
          method: 'POST',
          success: function(t) {

            wx.hideLoading()
            wx.redirectTo({
              url: '/lionfish_comshop/pages/order/order?id=' + i.order_id + '&is_show=1'
            })
          }

        })
      },
      prepay: function(type) {
        this.canPreSub = !0
        var this_ = this
        var e = this, t = e.tabAddress, a = e.tabIdx
        if (1 == e.is_limit_distance_buy && 1 == a) {
          return wx.showModal({
            title: '提示',
            content: '离团长太远了，暂不支持下单',
            showCancel: !1,
            confirmColor: '#F75451'
          }), !1
        }
        if (this.canPay) {
          this.payBtnLoading = !0
          this.canPay = !1
          var o = this, i = this, s = wx.getStorageSync('token'), n = this, r = n.seller_chose_id,
            d = n.seller_chose_store_id, c = n.ck_yupay, _ = n.tabList, u = r, l = ''
          _.forEach(function(e) {
            e.id == a && (l = e.dispatching)
          })
          var h = i.commentArr, p = []
          for (var m in h) p.push(h[m])
          var y = p.join('@EOF@'),
            g = t[a].receiverAddress || '',
            f = t[a].region || [],
            v = t[a].name,
            b = t[a].mobile,
            x = t[a].lou_meng_hao || '',
            w = [],
            dd = t[a].delivery_date || '',
            dt = t[a].delivery_time || '',
            zip_code = t[a].zipCode || '',
            blk_no = t[a].blk_no || '',
            road_name = t[a].roadName || '',
            building = t[a].building || ''

          if (0 < u) {
            var S = d + '_' + u
            w.push(S)
          }
          var A = '', k = '', T = '', D = '', P = '', z = ''
          1 == a ? (A = g, D = (k = f)[0], P = k[1], z = k[2]) : 2 == a && (T = g, D = f[0],
            P = f[1], z = f[2])
          A = zip_code + ' ' + blk_no + ' ' + road_name + ' ' + x + ' ' + building
          var I = wx.getStorageSync('community').communityId, L = wx.getStorageSync('latitude2'),
            O = wx.getStorageSync('longitude2'), j = this, N = j.use_score, q = j.buy_type, C = j.soli_id
          wx.showLoading(), app.util.request({
            url: 'entry/wxapp/user',
            data: {
              controller: 'car.sub_order',
              token: s,
              pay_method: type,
              buy_type: q,
              pick_up_id: I,
              dispatching: l,
              ziti_name: v,
              quan_arr: w,
              comment: y,
              ziti_mobile: b,
              latitude: L,
              longitude: O,
              ck_yupay: c,
              tuan_send_address: A,
              lou_meng_hao: x,
              address_name: T,
              province_name: D,
              city_name: P,
              country_name: z,
              use_score: N,
              soli_id: C,
              delivery_date: dd,
              delivery_time: dt,
              zip_code: zip_code,
              blk_no: blk_no,
              road_name: road_name,
              building: building
            },
            dataType: 'json',
            method: 'POST',
            success: function(t) {
              debugger
              console.log(t)
              wx.hideLoading()

              var e = t.has_yupay || 0, a = t.order_id, i = {}
              var ona = t.order_num_alias
              var id = t.order_id

              this_.order_id = id
              this_.order_num_alias = ona.substring(ona.length - 5)

              if (type == 'cash') {
                wx.redirectTo({
                  url: '/lionfish_comshop/pages/order/order?id=' + a + '&is_show=1'
                })
              } else if (type == 'paynow') {

                app.util.request({
                  url: "entry/wxapp/user",
                  data: {
                    controller: "user.get_copyright",
                  },
                  dataType: "json",
                  method: "POST",
                  success: function(t) {
                    this_.payNowQr = t.paynow_qr
                    this_.payNowNo = t.paynow_no
                    this_.payNowUen = t.paynow_uen
                  }
                });

                this_.closePaymentModal()
                this_.showPayNowModal()
              } else if ('banktransfer' == type) {
                wx.request({
                  // 请求地址
                  url: 'https://hz.xx315.net/payment/transfer/bank.json',
                  // 请求方式
                  method: 'get',
                  dataType: 'json',
                  responseType: 'text',
                  // 方法
                  success: function(data) {
                    console.log(data)
                    this_.bankInfo = data.data
                  }
                })
                this_.closePaymentModal()
                this_.showTransferModal()
              } else {
                console.log('支付日志：', t), 0 == t.code ? (o.changeIndexList(), 1 == e ? (o.canPay = !0,
                  'dan' == q || 'pindan' == q || 'integral' == q || 'soitaire' == q ? t.is_go_orderlist <= 1 ? wx.redirectTo({
                    url: '/lionfish_comshop/pages/order/order?id=' + a + '&is_show=1'
                  }) : wx.redirectTo({
                    url: '/lionfish_comshop/pages/order/index?is_show=1'
                  }) : wx.redirectTo({
                    url: '/lionfish_comshop/moduleA/pin/share?id=' + a
                  })) : wx.requestPayment({
                  appId: t.appId,
                  timeStamp: t.timeStamp,
                  nonceStr: t.nonceStr,
                  package: t.package,
                  signType: t.signType,
                  paySign: t.paySign,
                  success: function(e) {
                    o.canPay = !0, 'dan' == q || 'pindan' == q || 'integral' == q || 'soitaire' == q ? t.is_go_orderlist <= 1 ? wx.redirectTo({
                      url: '/lionfish_comshop/pages/order/order?id=' + a + '&is_show=1'
                    }) : wx.redirectTo({
                      url: '/lionfish_comshop/pages/order/index?is_show=1'
                    }) : wx.redirectTo({
                      url: '/lionfish_comshop/moduleA/pin/share?id=' + a
                    })
                  },
                  fail: function(e) {
                    t.is_go_orderlist <= 1 ? wx.redirectTo({
                      url: '/lionfish_comshop/pages/order/order?id=' + a + '&?isfail=1'
                    }) : wx.redirectTo({
                      url: '/lionfish_comshop/pages/order/index?isfail=1'
                    })
                  }
                })) : 1 == t.code ? (o.canPay = !0, wx.showModal({
                  title: '提示',
                  content: t.RETURN_MSG || '支付失败',
                  showCancel: !1,
                  confirmColor: '#F75451',
                  success: function(e) {
                    e.confirm && (t.is_go_orderlist <= 1 ? wx.redirectTo({
                      url: '/lionfish_comshop/pages/order/order?id=' + a + '&isfail=1'
                    }) : wx.redirectTo({
                      url: '/lionfish_comshop/pages/order/index?is_show=1&?isfail=1'
                    }))
                  }
                })) : 2 == t.code ? (o.canPay = !0, 1 == t.is_forb && (i.btnDisable = !0,
                  i.btnText = '已抢光'), wx.showToast({
                  title: t.msg,
                  icon: 'none'
                })) : console.log(t), (this.btnLoading = !1,
                  this.payBtnLoading = !1)
              }

            }
          })
        }
      },
      changeReceiverName: function(e) {
        var t = this, a = t.tabAddress, i = t.tabIdx, o = e.detail.value.trim()
        if (!(a[i].name = o)) {
          var s = '请填写收货人'
          0 == i && (s = '请填写提货人'), wx.showToast({
            title: s,
            icon: 'none'
          })
        }
        return false;
      },
      bindReceiverMobile: function(e) {
        var t = this, a = t.tabAddress, i = t.tabIdx, o = e.detail.value.trim()
        return a[i].mobile = o, this.setData({
          tabAddress: a
        }), {
          value: o
        }
      },

      bindReceiverZipCode: function(e) {
        var t = this, a = t.tabAddress, i = t.tabIdx, o = e.detail.value.trim()
        return a[i].zipCode = o, this.setData({
          tabAddress: a
        }), {
          value: o
        }
      },
      inputZipCode: function(e) {

        var t = this, a = t.tabAddress, i = t.tabIdx;
        var o = a[i].zipCode;
        console.log(o)
        var tk = wx.getStorageSync('token')
        if ('' != o && /^\d{6}$/.test(o)) {
          app.util.request({
            url: 'entry/wxapp/user',
            data: {
              controller: 'index.load_address',
              token: tk,
              zipCode: o
            },
            dataType: 'json',
            method: 'GET',
            success: function(e) {
              console.log(e)
              var data = e
              console.log(data.results[0])
              if (data.found > 0) {
                var result = data.results[0]
                a[i].blk_no = result.BLK_NO
                a[i].building = result.BUILDING
                a[i].roadName = result.ROAD_NAME
                console.log(a)

              }
            }
          })

        }
      },

      bindReceiverRoadName: function(e) {
        var t = this, a = t.tabAddress, i = t.tabIdx, o = e.detail.value.trim()
        return a[i].roadName = o, this.setData({
          tabAddress: a
        }), {
          value: o
        }
      },

      bindReceiverBuilding: function(e) {
        var t = this, a = t.tabAddress, i = t.tabIdx, o = e.detail.value.trim()
        return a[i].building = o, this.setData({
          tabAddress: a
        }), {
          value: o
        }
      },

      changeTuanBlkNo: function(e) {
        var t = this, a = t.tabAddress, i = t.tabIdx, o = e.detail.value.trim()
        return a[i].blk_no = o, this.setData({
          tabAddress: a
        }), {
          value: o
        }
      },

      changeReceiverAddress: function(e) {
        var t = this, a = t.tabAddress
        return a[t.tabIdx].receiverAddress = e.detail.value.trim(), this.setData({
          tabAddress: a
        }), {
          value: e.detail.value.trim()
        }
      },
      changeTuanAddress: function(e) {
        var t = this, a = t.tabAddress
        return a[t.tabIdx].lou_meng_hao = e.detail.value.trim(), this.setData({
          tabAddress: a
        }), {
          value: e.detail.value.trim()
        }
      },
      conformOrder: function() {
        this.showConfirmModal = !0
      },
      closeConfirmModal: function() {
        this.canPay = !0, this.showConfirmModal = !1
      },

      bindRegionChange: function(e) {
        var t = e.detail.value
        t && this.checkOut(t[1]), this.region =  t

      },
      checkOut: function(e) {
        var r = this, t = wx.getStorageSync('token'), a = wx.getStorageSync('community').communityId,
          i = wx.getStorageSync('latitude2'), o = wx.getStorageSync('longitude2'), s = this.buy_type,
          n = this.soli_id
        app.util.request({
          url: 'entry/wxapp/user',
          data: {
            controller: 'car.checkout',
            token: t,
            community_id: a,
            mb_city_name: e,
            latitude: i,
            longitude: o,
            buy_type: s,
            soli_id: n
          },
          dataType: 'json',
          method: 'POST',
          success: function(e) {
            if (1 == e.code) {
              var t = e, a = t.vipcard_save_money, i = t.shop_buy_distance, o = t.is_limit_distance_buy,
                s = t.current_distance, n = t.level_save_money
              1 == r.tabIdx && 1 == o && i < s && wx.showModal({
                title: '提示',
                content: '超出配送范围，请重新选择',
                showCancel: !1,
                confirmColor: '#F75451'
              }), (
                r.vipcard_save_money = a,
                  r.level_save_money = n,
                  r.is_limit_distance_buy = o || 0,
                  r.current_distance = s || '',
                  r.trans_free_toal = t.trans_free_toal,
                  r.is_man_delivery_tuanz_fare = t.is_man_delivery_tuanz_fare,
                  r.fare_man_delivery_tuanz_fare_money = t.fare_man_delivery_tuanz_fare_money,
                  r.is_man_shipping_fare = t.is_man_shipping_fare,
                  r.fare_man_shipping_fare_money = t.fare_man_shipping_fare_money,
                  r.calcPrice()
              )
            }
          }
        })
      },
      choseLocation: function() {
        var e = this, s = e.tabAddress, n = e.tabIdx, r = this
        wx.chooseLocation({
          success: function(e) {
            console.log(e)
            var t = r.region, a = e.name, i = (e.address, null)

            function o() {
              console.log('setData'), t && '市' != t[1] && r.checkOut(t[1]), s[n].region = t, s[n].receiverAddress = a,
                r.setData({
                  tabAddress: s
                })
            }

            console.log('patt', i), locat.getGpsLocation(e.latitude, e.longitude).then(function(e) {
              console.log('反推了', e), e && (t[0] = e.province, t[1] = e.city, t[2] = e.district,
              a || (a = e.street)), o()
            }), wcache.put('latitude2', e.latitude), wcache.put('longitude2', e.longitude)
          },
          fail: function(e) {
            console.log(e), 'chooseLocation:fail auth deny' == e.errMsg && (console.log('无权限'),
              locat.checkGPS(app, locat.openSetting()))
          }
        })
      },
      getWxAddress: function() {
        var e = this, a = e.tabAddress, i = e.tabIdx, o = a[i].region || [], s = this
        wx.getSetting({
          success: function(e) {
            console.log('vres.authSetting[\'scope.address\']：', e.authSetting['scope.address']),
              e.authSetting['scope.address'] ? wx.chooseAddress({
                success: function(e) {
                  console.log('step1'), o[0] = e.provinceName || '选择地址', o[1] = e.cityName || '',
                    o[2] = e.countyName || ''
                  var t = e.detailInfo
                  a[i].name = e.userName, a[i].mobile = e.telNumber, a[i].region = o, a[i].receiverAddress = t,
                    s.setData({
                      tabAddress: a
                    }), o && '市' != o[1] && s.checkOut(o[1])
                },
                fail: function(e) {
                  console.log('step4'), console.log(e)
                }
              }) : 0 == e.authSetting['scope.address'] ? wx.openSetting({
                success: function(e) {
                  console.log(e.authSetting)
                }
              }) : (console.log('step2'), wx.chooseAddress({
                success: function(e) {
                  console.log('step3'), o[0] = e.provinceName || '选择地址', o[1] = e.cityName || '',
                    o[2] = e.countyName || ''
                  var t = e.detailInfo
                  o && '市' != o[1] && s.checkOut(o[1]), a[i].name = e.userName, a[i].mobile = e.telNumber,
                    a[i].region = o, a[i].receiverAddress = t, s.setData({
                    tabAddress: a
                  })
                }
              }))
          }
        })
      },
      tabSwitch: function(e) {
        var t = 1 * e.currentTarget.dataset.idx
        0 != t && wx.showToast({
          title: 'Freight Changed',
          icon: 'none'
        })
        this.tabIdx =  t;
        this.calcPrice(1);
      },
      showvoucher: function(e) {
        var t = e.currentTarget.dataset.seller_id, a = [], i = this.seller_chose_id,
          o = this.seller_chose_store_id, s = this.seller_goodss
        for (var n in s) {
          s[n].store_info.s_id == t && (a = s[n].voucher_list, 0 == i && (i = s[n].chose_vouche.id || 0,
            o = s[n].chose_vouche.store_id || 0))
        }
        this.ssvoucher_list = a,
          this.voucher_serller_id = t,
          this.seller_chose_id = i,
          this.seller_chose_store_id = o,
          this.hide_quan = !1
      },
      chose_voucher_id: function(e) {
        wx.showLoading()
        var s = e.currentTarget.dataset.voucher_id, n = e.currentTarget.dataset.seller_id, r = this,
          t = wx.getStorageSync('token'), a = n + '_' + s, i = wx.getStorageSync('latitude2'),
          o = wx.getStorageSync('longitude2'), d = r.buy_type, c = this.soli_id,
          _ = wx.getStorageSync('community').communityId || ''
        app.util.request({
          url: 'entry/wxapp/user',
          data: {
            controller: 'car.checkout',
            token: t,
            community_id: _,
            voucher_id: s,
            use_quan_str: a,
            buy_type: d,
            latitude: i,
            longitude: o,
            soli_id: c
          },
          dataType: 'json',
          method: 'POST',
          success: function(e) {
            if (wx.hideLoading(), 1 == e.code) {
              var t = e.seller_goodss, a = ''
              for (var i in t) t[i].goodsnum = Object.keys(t[i].goods).length, '[object Object]' == Object.prototype.toString.call(t[i].chose_vouche) && (a = t[i].chose_vouche)
              var o = e
              r.seller_goodss = t
              r.seller_chose_id = s
              r.seller_chose_store_id = n
              r.hide_quan = !0
              r.goods = o.goods
              r.buy_type = o.buy_type || 'dan'
              r.yupay = o.can_yupay
              r.is_yue_open = o.is_yue_open
              r.total_free = o.total_free
              r.sel_chose_vouche = a
              r.current_distance = o.current_distance || ''
              r.calcPrice()

            }
          }
        })
      },
      closeCouponModal: function() {
        this.hide_quan = !0
      },
      calcPrice: function() {
        var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 0, t = this, a = t.total_free,
          i = t.delivery_tuanz_money, o = t.trans_free_toal, s = t.tabIdx, n = t.goods, r = (t.is_open_vipcard_buy,
            t.is_member_level_buy, t.is_vip_card_member, t.canLevelBuy)
        a *= 1, i *= 1, o *= 1
        var d = 0, c = 0, _ = 0, u = !0, l = !1, h = void 0
        try {
          for (var p, m = Object.keys(n)[Symbol.iterator](); !(u = (p = m.next()).done); u = !0) {
            var y = n[p.value]
            c += y.total, r && y.is_mb_level_buy && (_ += 1 * y.total - 1 * y.level_total)
          }
        } catch (e) {
          l = !0, h = e
        } finally {
          try {
            !u && m.return && m.return()
          } finally {
            if (l) throw h
          }
        }
        console.log(c)
        var g = c
        if (0 == s) {
          d = a
        } else if (1 == s) {
          d = 0 == t.is_man_delivery_tuanz_fare ? i + a : a, g += i
        } else if (2 == s) {
          g += o, d = 0 == t.is_man_shipping_fare ? o + a : a
        }
        var f = t.use_score
        e && f && (d -= 1 * t.score_for_money)
        var v
        v = (g - 1 * d).toFixed(2), (
          this.total_all = g.toFixed(2),
            this.disAmount = v,
            this.tot_price = d.toFixed(2),
            this.total_goods_price = c.toFixed(2),
            this.levelAmount = _.toFixed(2)
        )
      },
      bindInputMessage: function(e) {
        var t = this.commentArr, a = e.currentTarget.dataset.idx, i = e.detail.value
        t[a] = i, this.setData({
          commentArr: t
        })
      },
      changeIndexList: function() {
        var e = this.goods || []
        0 < e.length && e.forEach(function(e) {
          0 == e.option.length && status.indexListCarCount(e.goods_id, 0)
        })
      },
      subscriptionNotice: function() {
        console.log('subscriptionNotice')
        var s = this
        return new Promise(function(e, t) {
          var o = s.need_subscript_template, a = Object.keys(o).map(function(e) {
            return o[e]
          })
          wx.requestSubscribeMessage ? a.length && wx.requestSubscribeMessage({
            tmplIds: a,
            success: function(t) {
              var a = 1, i = []
              Object.keys(o).forEach(function(e) {
                'accept' == t[o[e]] ? i.push(e) : a = 0
              }), i.length && s.addAccept(i), s.setData({
                is_need_subscript: a
              }), e()
            },
            fail: function() {
              t()
            }
          }) : t()
        })
      },
      addAccept: function(e) {
        var t = wx.getStorageSync('token'), a = e.join(',')
        app.util.request({
          url: 'entry/wxapp/user',
          data: {
            controller: 'user.collect_subscriptmsg',
            token: t,
            type: a
          },
          dataType: 'json',
          method: 'POST',
          success: function() {
          }
        })
      },
      showPickupTime: function() {
        var r = this, t = wx.getStorageSync('token')
        var I = wx.getStorageSync('community').communityId
        app.util.request({
          url: 'entry/wxapp/user',
          data: {
            controller: 'car.get_head_date_list',
            token: t,
            head_id: I
          },
          dataType: 'json',
          method: 'POST',
          success: function(e) {
            var list = e.data;
            r.rickupTimeData.list = list
            r.rickupTimeData.currentTimes = list[0].times

          }
        })

        r.showPickupTimeModal = true

      },
      closePickupTimeModal: function() {

        this.showPickupTimeModal =  false

      },
      changePickupDate: function(e) {
        var r = this, i = e.currentTarget.dataset.index
        var d = r.rickupTimeData.list[i]
        console.log(d)
          r.rickupTimeData.activeDateIndex= i,
          r.rickupTimeData.currentTimes = d.times

      },
      changePickupTime: function(e) {
        var r = this, i = e.currentTarget.dataset.index
        var activeDateIndex = r.rickupTimeData.activeDateIndex
        r.rickupTimeData.activeTimeIndex = i
      },
      changePickupDateTime: function() {
        var e = this, s = e.tabAddress, n = e.tabIdx, r = this

        var activeDateIndex = e.rickupTimeData.activeDateIndex
        var activeTimeIndex = e.rickupTimeData.activeTimeIndex
        var d = e.rickupTimeData.list[activeDateIndex]
        var t = d.times[activeTimeIndex]
        if (d && d.date && t) {
          s[n].delivery_date = d.str_date
          s[n].delivery_date_str = d.date + ' ' + t
          s[n].delivery_time = t

          this.closePickupTimeModal()
        } else {
          wx.showToast({
            title: this.$t('order.xuanzezitishijian'),
            icon: 'none'
          })
        }

      }
    }
  }
</script>

<style>
  .page {
    background: #f6f6f6;
  }

  .address-content {
    padding: 2vw 2vw;
    background: #fff;
  }

  .address-content .receiver {
    display: flex;
    align-items: center;
    position: relative;
    color: #444;
    font-size: 3.5vw;
    margin-bottom: 2vw;
    font-weight: 500;
  }

  .address-content .receiver span {
    width: 20vw;
    color: #666;
  }

  .address-content .receiver input, .sel-btn {
    border-radius: 1vw;
    flex: 1;
    height: 8vw;
    line-height: 8vw;
    padding: 1vw 1vw;
    box-sizing: border-box;
    font-weight: bold;
    background-color: #f7f7f7;
    border: 0.1vw solid #ddd;
    font-size: 3vw;
    outline: none;
  }

  .sel-btn {
    color: #999;
  }

  .address-content .receiver input:nth-child(3) {
    width: 280vw;
  }

  .address-content p {
    color: #999;
    font-size: 3vw;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .address-line {
    margin-bottom: 3vw;
    height: 1vw;
    background: #fff;
  }

  .address-line img {
    width: 100%;
    height: 0.1vw;
    display: block;
  }

  .card-content {
    margin: 0 auto 2vw;
  }

  .card-container {
    width: 95vw;
    margin: 0 auto 2vw;
    border-radius: 2vw;
    background: #fff;
    -webkit-box-shadow: 0 0 4vw 0 rgba(0, 0, 0, 0.05);
    box-shadow: 0 0 4vw 0 rgba(0, 0, 0, 0.05);
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    overflow: hidden;

  }

  .card-header {
    font-size: 3vw;
    color: #aaa;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2vw;
    height: 10vw;
    border-bottom: 0.1vw solid #efefef;
  }

  .cart-item {
    display: flex;
  }

  .sku-item {
    padding: 3vw;
    border-bottom: 0.1vw solid #efefef;
    display: flex;
    align-items: flex-start;
  }

  .sku-item .sku-img {
    width: 20vw;
    height: 20vw;
    margin-right: 2vw;
  }

  .sku-item .sku-msg {
    width: 80vw;
  }

  .sku-item .sku-msg .sku-title {
    font-size: 3.5vw;
    color: #444;
    line-height: 3vw;
    margin-bottom: 1.2vw;
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .sku-item .sku-msg .sku-spec {
    font-size: 2vw;
    line-height: 4vw;
    color: #aaa;
    margin-bottom: 3vw;
  }

  .sku-item .sku-msg .original-price {
    font-size: 3vw;
    line-height: 5vw;
    color: #aaa;
    margin-bottom: 1vw;
  }

  .sku-item .sku-msg .sku-price {
    font-size: 2.3vw;
    line-height: 5vw;
    color: #444;
    margin-top: 1.5vw;
  }

  .sku-item .sku-msg .sku-price span {
    color: #ff5344;
    font-size: 3vw;
    font-weight: 500;
  }

  .sku-item-gift {
    width: 650vw;
    height: 140vw;
    background: #f9f9f9;
    margin: 2vw auto 2vw;
    padding: 2vw;
    box-sizing: border-box;
    display: flex;
    order: 99;
  }

  .sku-item-gift .sku-img {
    width: 10vw;
    height: 10vw;
    margin-right: 2vw;
  }

  .sku-item-gift .sku-msg {
    width: 510vw;
  }

  .sku-item-gift .sku-msg .sku-title {
    font-size: 2vw;
    color: #444;
    line-height: 3vw;
    margin-bottom: 10vw;
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .sku-item-gift .sku-msg .sku-spec {
    font-size: 2vw;
    line-height: 22vw;
    color: #aaa;
    margin-bottom: 14vw;
  }

  .sku-item-gift .sku-msg .tag {
    border: 1vw solid #ff5344;
    padding: 0 12vw;
    font-size: 20vw;
    border-radius: 16vw;
    color: #ff5344;
    height: 24vw;
    line-height: 24vw;
    position: absolute;
  }

  .sku-item-gift .sku-msg .tag.tag-disabled {
    border-color: #a3a3a3;
    color: #a3a3a3;
  }

  .fixed-content {
    display: flex;
    padding-left: 2vw;
    justify-content: space-between;
    align-items: center;
  }

  .fixed-content .fixed-left {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .fixed-content .fixed-left .h1 {
    font-size: 4vw;
    line-height: 5vw;
    color: #444;
    margin-bottom: 0.2vw;
  }

  .fixed-content .fixed-left .h1 span {
    color: #ff5344;
    font-weight: bold;
  }

  .fixed-content .fixed-left .h2 {
    font-size: 3vw;
    line-height: 5vw;
    color: #666;
  }

  .fixed-content .fixed-left .h2 em {
    margin-right: 2vw;
  }

  .fixed-content .fixed-bar-btn {
    width: 30vw;
    height: 12vw;
    text-align: center;
    line-height: 11vw;
    color: #fff;
    font-size: 4vw;
    background: #ff5344;
    border-top: 0.1vw solid #efefef;
    border-radius: 0;
    padding: 0;
    margin: 0;
    font-weight: bold;
  }

  .confirm-order-modal {
    border-radius: 2vw 3vw 0 0;
    background: #fff;
    padding: 1vw 1vw 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

  }

  .confirm-order-modal .title {
    font-size: 3.5vw;
    color: #444;
    line-height: 8.5vw;
    margin-bottom:1vw;
    font-weight: 500;
  }

  .confirm-order-modal .sub-title {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ff5344;
    line-height: 2vw;
    font-size: 3vw;
    margin-bottom: 9vw;
    font-weight: 500;
  }

  .confirm-order-modal .sub-title img {
    width: 5vw;
    height: 5vw;
    margin-right: 3vw;
  }

  .confirm-order-modal .order-content {
    width: 95vw;
    border-radius: 2vw;
    padding-top: 3vw;
    background: #f6f6f6;
    margin-bottom: 15vw;
  }

  .confirm-order-modal .order-content .msg-group {
    width: 100vw;
    padding: 0 4vw;
    margin-bottom: 1vw;
    display: flex;
    font-size: 3vw;
    line-height: 4vw;
    color: #444;
    box-sizing: border-box;
  }

  .confirm-order-modal .order-content .msg-group span {
    font-weight: bold;
    white-space: nowrap;
  }

  .confirm-order-modal .order-content .msg-group em {
    font-weight: 400;
    flex: 1;
    line-height: 1.4;
  }

  .confirm-order-modal .order-content .total {
    line-height: 10vw;
    padding: 0 2vw;
    text-align: right;
    color: #444;
    font-size: 4vw;
    border-top: 0.1vw solid #e2e2e2;
  }

  .confirm-order-modal .order-content .total em {
    color: #ff5344;
  }

  .confirm-order-modal .button-group {
    display: flex;
    width: 100%;
    border-top: 0.1vw solid rgba(0, 0, 0, 0.1);
    position: absolute;
    left: 0;
    bottom: 0;
  }

  .confirm-order-modal .button-group .btn-content {
    flex: 1;
  }

  .confirm-order-modal .button-group .btn {
    flex: 1;
    margin: 0;
    padding: 0;
    font-size: 3.5vw;
    line-height: 10vw;
    text-align: center;
    width: 50vw;
    border-radius: 0;
    font-weight: bold;
  }

  .confirm-order-modal .button-group .left-btn {
    color: #666;
    background: #fff;
  }

  .confirm-order-modal .button-group .right-btn {
    color: #fff;
    background: linear-gradient(to right, #ff5041, #ff695c);
  }

  .tab-nav {
    height: 10vw;
    display: flex;
    border-bottom: 0.2vw solid #ff5041;
    transition: all 0.3s linear;
    margin-bottom: 2vw;
  }

  .tab-nav .tab-nav-item {
    color: #6c6c6c;
    font-size: 3vw;
    font-weight: bold;
    position: relative;
    z-index: 1;
    width: 90vw;
    height: 10vw;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
  }

  .tab-nav-one .tab-nav-item {
    flex: initial;
    width: 30%;
  }

  .tab-nav .tab-nav-item span {
    position: relative;
  }

  .tab-nav .tab-nav-item.active {
    background-color: #ff5041;
    color: #fff;
    z-index: 2;
    border-radius: 3px 3px 0 0;
  }

  .receiver.align-start {
    align-items: flex-start;
  }

  textarea.receive-name {
    border-radius: 4vw;
    flex: 1;
    line-height: 1.6;
    box-sizing: border-box;
    font-weight: bold;
    background-color: #f7f7f7;
    position: relative;
    z-index: 1;
    padding: 10vw;
    height: 124vw;
  }

  picker.receive-name {
    border-radius: 4vw;
    flex: 1;
    line-height: 52vw;
    box-sizing: border-box;
    font-weight: bold;
    background-color: #f7f7f7;
    position: relative;
    z-index: 1;
    height: 52vw;
  }

  .receive-name .picker {
    padding: 5vw 10vw;
    color: #999;
  }

  .receive-icon {
    width: 4vw;
    height: 4vw;
    position: absolute;
    right: 5vw;
    bottom: 6vw;
    z-index: 20;
  }

  .act-content {
    width: 95vw;
    margin: 0 auto 2vw;
    border-radius: 2vw;
    background: #fff;
    box-shadow: 0 0 4vw 0 rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .cell {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1vw solid #efefef;
    line-height: 10vw;
    font-size: 3vw;
    color: #444;
    padding: 0 3vw;
  }

  .icon-right {
    position: absolute;
    right: 3vw;
    top: 50%;
    width: 3vw;
    height: 4vw;
    margin-top: -2vw;
  }

  .cell-desc {
    margin-left: 8vw;
    color: #666;
    font-size: 2vw;
  }

  .confirm-coupon-modal {
    background: #f6f6f6;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    padding-bottom: 3vw;
  }

  .confirm-coupon-modal .title {
    width: 100%;
    border-bottom: 1vw solid #efefef;
    line-height: 2.5;
    font-size: 3vw;
    text-align: center;
    background: #fff;
  }

  .confirm-coupon-modal .list {
    width: 100%;
    max-height: 700vw;
    overflow-y: auto;
    padding: 0 20vw;
    box-sizing: border-box;
  }

  .confirm-coupon-modal .item {
    display: flex;
    box-sizing: border-box;
    padding: 20vw 10vw 20vw 20vw;
    justify-content: space-between;
    align-items: center;
    margin: 20vw 0;
    background: #fff;
    border-radius: 10vw;
    box-shadow: 0 0 6vw #ccc;
  }

  .tag-img {
    position: absolute;
    width: 48vw;
    height: 48vw;
    right: 10vw;
    top: 15vw;
  }

  .no-tag-img {
    width: 48vw;
    height: 48vw;
  }

  .use-wx-address {
    text-align: center;
    margin-top: 20vw;
    margin-bottom: 20vw;
    color: #ff5344;
  }

  .cart-footer {
    padding: 26vw;
  }

  .order-message {
    position: relative;
    background-color: #f7f7f7;
    padding: 5vw 10vw;
    border-radius: 5vw;
    z-index: 0;
  }

  .tuan-pos {
    height: 124vw;
    line-height: 1.6;
  }

  .placeOrderBox {
    padding-bottom: 20vw;
  }

  .oc-payment {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    padding: 0 10px;
    background-color: #fff;
  }

  .oc-payment-item {
    position: relative;
    width: 100%;
    line-height: 70vw;
    font-size: 0;
    display: flex;
    align-items: center;
  }

  .oc-payment-method {
    position: relative;
    display: inline-block;
    margin-left: 10vw;
    font-size: 2px;
    color: #333;
  }

  .oc-payment-recommend {
    position: relative;
    display: inline-block;
    width: 30px;
    height: 17px;
    margin-left: 10px;
    line-height: 17px;
    text-align: center;
    font-size: 2px;
    color: #ee2e3a;
    border-radius: 2px;
    border: 1px solid #ee2e3a;
  }

  .oc-payment-selected:after {
    font-family: iconfont !important;
    font-size: 2vw;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    content: "\e650";
    position: absolute;
    top: 0;
    right: 0;
    line-height: 70vw;
  }

  .oc-payment-icon {
    font-size: 3vw;
  }

  .coupon {
    background-color: #fefefe;
    position: relative;
    padding: 0 20vw;
    border-radius: 6vw;
    margin-top: 24vw;
    box-shadow: 0 0 6vw #ccc;
  }

  .coupon:before, .coupon:after {
    content: '';
    position: absolute;
    width: 20vw;
    height: 40vw;
    background: #f6f6f6;
    top: 70vw;
    z-index: 1;
  }

  .coupon:before {
    border-radius: 0 40vw 40vw 0;
    left: 0;
  }

  .coupon:after {
    border-radius: 40vw 0 0 40vw;
    right: 0;
  }

  .coupon .header {
    display: flex;
    padding: 15vw 0;
    border-bottom: 2vw dashed #dbdbdb;
    height: 140vw;
  }

  .coupon .footer {
    color: #747474;
    font-size: 2vw;
    padding: 22vw 0 20vw 35vw;
  }

  .coupon .price {
    color: #333;
    width: 175vw;
    text-align: center;
    border-right: 2vw dashed #dbdbdb;
  }

  .coupon .price .reduce-price {
    color: #000;
    font-size: 3vw;
    font-weight: bold;
    padding-top: 3vw;
  }

  .coupon .price .reduce-price span {
    font-size: 2vw;
  }

  .coupon .price .reduce-desc {
    font-size: 2vw;
    margin-top: 1vw;
  }

  .coupon .info {
    padding-left: 3vw;
    flex: 1;
  }

  .coupon .info .reduce-title {
    color: #000;
    font-size: 2vw;
    font-weight: bold;
    padding-top: 20vw;
  }

  .coupon .info .reduce-type {
    color: #fff;
    font-weight: normal;
    font-size: 2vw;
    background: #ec6b5a;
    padding: 2vw 8vw;
    border-radius: 4vw;
    margin-left: 10vw;
  }

  .coupon .status {
    width: 130vw;
    text-align: center;
  }

  .coupon .status image {
    width: 48vw;
    height: 48vw;
  }

  .coupon.used, .coupon.expired {
    background: #fafafa;
  }

  .coupon.used .price, .coupon.expired .price {
    color: #949494;
  }

  .coupon.used .reduce-price, .coupon.expired .reduce-price, .coupon.used .reduce-title, .coupon.expired .reduce-title {
    color: #7a7a7a;
  }

  .coupon.used .reduce-type, .coupon.expired .reduce-type {
    background: #eeaea6;
  }

  .coupon.used .footer, .coupon.expired .footer {
    color: #b6b6b6;
  }

  .distance {
    color: #ff5041;
  }

  .wx-switch-input {
    width: 42px !important;
    height: 20px !important;
  }

  .wx-switch-input::before {
    width: 40px !important;
    height: 18px !important;
  }

  .wx-switch-input::after {
    width: 18px !important;
    height: 18px !important;
  }

  .cart-header-right {
    color: #aaa;
  }

  .mask {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: #000;
    z-index: 9000;
    opacity: 0.7;
  }

  .modalDlg {
    text-align: center;
    position: fixed;
    top: 25%;
    left: 15%;
    width: 70%;
    padding: 1px 8px 16px 8px;
    /* border: 8px solid #e8e9f7; */
    background-color: white;
    z-index: 9100;
    border-radius: 10px;
    overflow: auto;

  }

  .deliveryTimeDlg {
    text-align: center;
    position: fixed;
    top: 15%;
    left: 10%;
    width: 75%;
    padding: 16px 8px 16px 8px;
    /* border: 8px solid #e8e9f7; */
    background-color: white;
    z-index: 9100;
    border-radius: 2px;
    overflow: auto;
  }

  .deliveryTimeItem {
    border: 1px solid #ccc;
    height: 30px;
    font-size: 1px;
    margin-bottom: 8px;
    padding-left: 8px;
    padding-right: 8px;
    line-height: 30px;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
  }

  .deliveryTimeFull {
    color: #888585;
  }

  .storefront-item {
    border: 1px solid #ccc;
    height: 50px;
    font-size: 1px;
    margin-bottom: 8px;
    padding: 8px;
    border-radius: 5px;
    flex-direction: column;
  }

  .storefront-item-name {
    text-align: left;
    font-size: 13px;
    font-weight: bold
  }

  .storefront-item-address {
    text-align: left;
    font-size: 1px;
  }

  .wux-button {
    display: inline-block;
    box-sizing: border-box;
    margin: 0;
    padding: 0 2vw;
    min-width: 10vw;
    min-height: 10vw;
    border: none;
    border-radius: 2vw;
    vertical-align: middle;
    text-align: center;
    text-overflow: ellipsis;
    font-size: 4vw;
    line-height: 10vw;
    cursor: pointer;

  }

  .wux-button--block {
    width: 100%;
    margin-top: 4vw;
  }

  .paynow {
    position: fixed;
    top: 1%;
    width: 100%;
    height: 99%;
    padding: 8vw;
    font-size: 3vw;
    /* border: 8px solid #e8e9f7; */
    background-color: white;
    z-index: 9999;
    overflow: auto;
  }
  .paynow input{
    border-radius: 1vw;
    flex: 1;
    height: 8vw;
    line-height: 8vw;
    padding: 1vw 1vw;
    box-sizing: border-box;
    font-weight: bold;
    background-color: #f7f7f7;
    border: 0.1vw solid #ddd;
    font-size: 3vw;
    outline: none;
    width: 60vw;
  }

  .page-category {

    background: #f8f8f7;
  }

  .category-item {
    position: relative;
    width: 26vw;
    height: 12vw;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3vw;
    color: #787878;
    line-height: 20vw;
  }

  .category-item div {
    padding-left: 3vw;
    max-width: 100vw;
    text-align: center;
  }

  .category-item .item-border {
    position: absolute;
    top: 36vw;
    left: 0;
    display: none;
    width: 8vw;
    height: 28vw;
    background: linear-gradient(#ff7955, #ff4242);
  }

  .active {
    background: #fff;
    font-weight: 500;
    color: #333;
  }

  .page-list {
    position: absolute;
    top: 10vw;
    left: 26vw;
    width: 74.3vw;
    height: 86vw;
    background: #fff;
    padding: 3vw;
    box-sizing: border-box;
  }

  .line {
    position: absolute;
    margin-top: 9vw;
    width: 100%;
    height: 0.1vw;
    z-index: 9999;
    background: #efefef;
  }

</style>
