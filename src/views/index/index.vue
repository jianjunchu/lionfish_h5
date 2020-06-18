<template>
  <div class="page">
   <block v-if="isblack!=1">

      <div :class="['index-box', 'pb100', (showNewCoupon?'preventTouchMove':'')]">
        <div class="miniAppTip" v-if="isTipShow">
          <div bindtap="handleProxy" class="add-myapp">
            <text>添加到「我的小程序」团购更方便</text>
          </div>
        </div>
        <div bindtap="handleHideProxy" class="guide" v-if="isShowGuide">
          <image mode="widthFix" :src="index_lead_image"></image>
        </div>
        <div class="bg-f">
          <div class="header-content" v-if="hide_top_community==0">
            <image class="header-bg" :src="shop_info.common_header_backgroundimage?shop_info.common_header_backgroundimage:'../../images/TOP_background@2x.png'" v-if="shop_info.index_top_img_bg_open==0"></image>
            <div class="location" :style="{color:shop_info.index_top_font_color}" v-if="shop_info.index_communityinfo_showtype!=1">
              <div class="location-left" v-if="community&&community.communityName">
                <router-link hoverClass="router-hover" to="/lionfish_comshop/pages/position/community" v-if="hide_community_change_btn==0&&open_danhead_model!=1">
                  <div class="community-title">
                                <span>{{community.communityName}}
                <text class="community-change" v-if="hide_community_change_word==0">切换</text>
                                    <text class="iconfont icon-youjiantou"></text>
                                </span>
                  </div>
                </router-link>
                <div v-else>
                  <div class="community-title">
                    <span>{{community.communityName}}</span>
                  </div>
                </div>
                <div bindtap="gotoMap" class="community-address" v-if="index_hide_headdetail_address==0">
                  <text class="iconfont icon-weizhi-tianchong"></text>{{community.address||community.communityAddress||community.fullAddress}}
                </div>
              </div>
              <div class="location-left" v-else>
                <navigator hoverClass="router-hover" url="/lionfish_comshop/pages/position/community">
                  您还没有选择{{groupInfo.owner_name}}，轻触去选择 <text class="iconfont icon-weizhi-tianchong"></text>
                </navigator>
              </div>
              <div class="location-right">
                <image class="img" :src="community.headImg?community.headImg:community.disUserHeadImg"></image>
                <text>{{community.disUserName}}</text>
              </div>
            </div>
            <div class="location-theme2" :style="{color: shop_info.index_top_font_color}" v-else>
              <block v-if="community&&community.communityName">
                <div class="loc-l">
                  <image class="img" :src="community.headImg?community.headImg:community.disUserHeadImg"></image>
                </div>
                <div bindtap="goLink" class="loc-m" data-link="/lionfish_comshop/pages/position/community" v-if="hide_community_change_btn==0&&open_danhead_model!=1">
                  {{community.communityName}} <text style="font-size:12px;" v-if="hide_community_change_word==0">切换</text>
                  <text class="iconfont icon-youjiantou" style="font-size:12px;"></text>
                </div>
                <div class="loc-m" v-else>{{community.communityName}}</div>
              </block>
              <div class="loc-l" v-else>
                <navigator hoverClass="router-hover" url="/lionfish_comshop/pages/position/community">
                  您还没有选择{{groupInfo.owner_name}}，轻触去选择 <text class="iconfont icon-weizhi-tianchong"></text>
                </navigator>
              </div>
              <div bindtap="goLink" class="top-search" data-link="/lionfish_comshop/pages/type/search">
                <text class="iconfont icon-sousuo1"></text>搜索
              </div>
            </div>
          </div>
          <div class="blank10"></div>

          <div class="swipe" v-if="slider_list.length>0" >
            <swiper :options="sliderSwiperOption" class="swiper-content">
              <swiper-slide class="swiper-slide" v-for="(item,index) in slider_list" :key="index" >
                <img :src="item.image" class="show-img" width="100%" height="140px" style="border-radius: 12px" />
                <i-img :img="item.image"></i-img>
              </swiper-slide>
              <!-- 分页器 -->
              <div class="swiper-pagination"  slot="pagination"></div>
            </swiper>
          </div>
          <div class="nav-list" v-if="navigat.length>0">
            <div v-for="(item,id) in navigat" style="width:20%;" class="block">
              <div bindtap="goNavUrl" class="nav-list-item" :data-idx="id" v-if="item.type!=5">
                <img height="36" class="nav-list-img" :src="item.thumb" width="36" ></img>
                <div class="nav-list-text">{{item.navname}}</div>
              </div>
              <button class="nav-list-item nav-contact" openType="contact" v-else>

                <img height="36" iClass="nav-list-img" :src="item.thumb" width="36"></img>
                <div class="nav-list-text">{{item.navname}}</div>
              </button>
            </div>
            <div style="width:20%;" v-if="navigatEmpty.length" v-for="(item,id) in navigatEmpty" ></div>
          </div>
          <div class="promotion" v-if="hasCoupon">
            <div class="slider">
              <div class="slider-wraper">
                <div class="list">
                  <div bindtap="receiveCoupon" class="card-content list-item" :data-quan_id="item.id" v-for="(item,id) in quan"  wx:key="id">
                    <div class="card">
                      <div class="card-price span">
                        <div class="card-price&#45;&#45;unit span">¥</div>
                        <div class="card-price&#45;&#45;num span">{{item.credit}}</div>
                      </div>
                      <div class="card-desc span" v-if="item.limit_money>0">
                        满{{item.limit_money}}元可用</div>
                      <div class="card-desc span" v-else>
                        全场通用</div>
                      <div :class="[card-tag, span, {'card-tag&#45;&#45;get':item.is_get==1}]">
                        <div class="card-tag&#45;&#45;text span">已领取</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div style="padding-bottom:5px;margin-left: 16px;margin-right: 16px" v-if="notice_list.length>0">
            <div class="top-msg" :style="{color:skin.color,background:skin.light}">
              <image :src="notice_setting.horn" v-if="notice_setting.horn"></image>

              <svg-icon icon-class="laba" v-else/>

              <swiper :options="skinSwiperOption" class="notice-swipe">
                <swiper-slide class="notice-swipe-item" v-for="(item,index) in notice_list" :key="index" >
                  {{item.content}}
                </swiper-slide>
              </swiper>
            </div>
          </div>
          <template is="cube" :data="{data:cube}"></template>
        </div>
        <div class="list-content">
          <i-new-comer bind:openSku="openSku" :refresh="newComerRefresh" :skin="skin" v-if="is_show_new_buy==1"></i-new-comer>
          <template is="pin" :data="{pinList:pinList,skin:skin}"></template>
          <i-spike bind:openSku="openSku" :refresh="{newComerRefresh}" :skin="skin" v-if="is_show_spike_buy==1"></i-spike>
          <template is="seckill" :data="{secRushList:secRushList,skin:skin,scekillTimeList:scekillTimeList,secKillActiveIdx:secKillActiveIdx,secKillGoodsIndex:secKillGoodsIndex,needAuth:needAuth}" v-if="seckill_is_open==1&&seckill_is_show_index==1"></template>
          <i-topic bind:openSku="openSku" :refresh="{couponRefresh}"></i-topic>
          <div class="theme3 bg-f" v-if="typeTopicList.length&&(typeItem.banner||typeItem.list.length)" v-for="(item,index) in typeTopicList"  wx:for-item="typeItem" wx:key="id">
            <image bindtap="goLink" class="topic-img" :data-link="'/lionfish_comshop/pages/type/details?id='+typeItem.id" mode="widthFix" :src="typeItem.banner" v-if="typeItem.banner"></image>
            <i-rush-spu bind:authModal="authModal" bind:changeCartNum="changeNotListCartNum" bind:openSku="openSku" :canLevelBuy="{canLevelBuy}" class="item" :is_open_vipcard_buy="{is_open_vipcard_buy}" :needAuth="needAuth" :notNum="true" :reduction="reduction" :spuItem="item" :stopClick="stopClick" v-if="typeItem.list.length" ></i-rush-spu>
            <div bindtap="goLink" class="theme3-more" :data-link="'/lionfish_comshop/pages/type/details?id='+typeItem.id" v-if="typeItem.list.length">
              查看全部 <text class="iconfont icon-youjiantou"></text>
            </div>
          </div>
          <template is="pinrow" :data="{pinList:pinList,skin:skin}"></template>
          <img class="rush-list-title" id="rush-title" :src="index_list_top_image" v-if="index_list_top_image"></img>
          <img class="rush-list-title" id="rush-title" src="@/assets/images/rush-title.png" v-else></img>

          <div class="search-bar" v-if="index_switch_search==1">
            <div class="search-box">
              <input bindconfirm="goResult" class="ipt" confirmType="搜索" placeholder="搜索商品" type="text"></input>
              <div class="search-icon">
                <text class="iconfont icon-sousuo1"></text>
              </div>
            </div>
          </div>
          <i-tabs :activeIndex="classification.activeIndex" bind:activeIndexChange="classificationChange" data-idx="1" fontColor="#000" iClass="category-list" :tabs="classification.tabs"></i-tabs>
          <block v-if="hide_index_type!=1">
            <div class="sticky-cate" v-if="index_change_cate_btn==1">
              <div v-show="!isShowClassification||tabIdx!==0">
                <i-tabs :activeIndex="classification.activeIndex" bind:activeIndexChange="classificationChange" data-idx="1" fontColor="#000" iClass="category-list" :tabs="classification.tabs"></i-tabs>
              </div>
              <div class="tab-nav-query"></div>
            </div>

            <div :class="['sticky-content', {'sticky-top':isSticky, 'tab-nav-sticky':scrollDirect === 'up'&&isSticky }]" v-else>
              <div class="tab-nav tab-nav-query" style="border-color:'#F75451'">
                <div bindtap="tabSwitch" :class="['tab-nav-item', (tabIdx===0?'active':'')]" data-idx="0">
                  <image :src="(qgtab.one_select ? qgtab.one_select : '../../images/index-tab-left-active.png')" v-if="tabIdx===0"></image>
                  <image :src="(qgtab.one_selected?qgtab.one_selected:'../../images/index-tab-left-disabled.png')" v-else></image>
                  <span>{{index_qgtab_text[0]?index_qgtab_text[0]:'正在抢购'}}</span>
                </div>
                <div bindtap="tabSwitch" :class="['tab-nav-item', (tabIdx===1?'active':'')]" data-idx="1">
                  <image :src="(qgtab.two_select?qgtab.two_select:'../../images/index-tab-right-active.png')" v-if="tabIdx===1"></image>
                  <image :src="(qgtab.two_selected?qgtab.two_selected:'../../images/index-tab-right-disabled.png')" v-else></image>
                  <span>{{index_qgtab_text[1]?index_qgtab_text[1]:'即将开抢'}}
            </span>
                </div>
                <div class="count-down-content" v-if="tabIdx===0">
                  <i-count-down :clearTimer="stopNotify" countdownClass="count-down" itemClass="item-time" showDay="true" :target="rushEndTime" v-if="rushEndTime && !stopNotify && index_qgtab_counttime!=1">
                    <span class="count-down-left-text">仅剩</span>
                  </i-count-down>
                </div>
              </div>
              <div v-show="!isShowClassification||tabIdx!==0">
                <i-tabs :activeIndex="classification.activeIndex" bind:activeIndexChange="classificationChange" data-idx="1" fontColor="#000" class="category-list"  :tabs="classification.tabs"></i-tabs>
              </div>
              <div v-show ="!isShowCommingClassification||tabIdx!==1">
                <i-tabs :activeIndex="commingClassification.activeIndex"  data-idx="2" fontColor="#000" iClass="category-list"  :tabs="classification.tabs"></i-tabs>
              </div>
            </div>
          </block>



          <div class="rush-list-box">
            <block v-if="rushList.length>0&&tabIdx==0">

              <div class="active-item" v-if="rushList.length>0&&theme==0" v-for="(item,index) in rushList" :key="id">
                <div class="list-item-tag-content" v-if="isShowListTimer==1">
                  <div class="empty-1"></div>
                  <div class="empty-2" v-if="item.spuDescribe"></div>
                  <div class="empty-3"></div>
                  <div class="list-item-count-down" :data-xx="item.spuCanBuyNum" :style="{color:skin.color}" v-if="item.spuCanBuyNum!=0&&!actEndMap[item.end_time]">
                    仅剩
                    <em v-if="countDownMap[item.end_time].day>0">{{countDownMap[item.end_time].day}}天</em>
                    <span class="item-class">{{countDownMap[item.end_time].hour}}</span>:
                    <span class="item-class">{{countDownMap[item.end_time].minute}}</span>:
                    <span class="item-class">{{countDownMap[item.end_time].second}}</span>
                  </div>
                </div>
                <i-new-rush-spu :actEnd="actEndMap[item.end_time]" :authModal="authModal" :changeCartNum="changeCartNum" :openSku="openSku" :vipModal="vipModal" :canLevelBuy="canLevelBuy" :changeCarCount="{changeCarCount}" :isShowListCount="{isShowListCount}" :isShowListTimer="(isShowListTimer==1)" :is_open_vipcard_buy="{is_open_vipcard_buy}" :needAuth="needAuth" :reduction="reduction" :showPickTime="(ishow_index_pickup_time==1)" :skin="skin" :spuItem="item" :stopClick="stopClick"></i-new-rush-spu>
              </div>
              <div class="active-item-two" v-if="rushList.length>0&&theme==1" v-for="(item,index) in rushList" wx:key="id">
                <div class="list-item-tag-content" v-if="isShowListTimer==1">
                  <div class="list-item-count-down type-two" :style="{color:skin.color}" v-if="item.spuCanBuyNum!=0&&!actEndMap[item.end_time]">
                    仅剩
                    <em v-if="countDownMap[item.end_time].day>0">{{countDownMap[item.end_time].day}}天</em>
                    <span class="item-class">{{countDownMap[item.end_time].hour}}</span>:
                    <span class="item-class">{{countDownMap[item.end_time].minute}}</span>:
                    <span class="item-class">{{countDownMap[item.end_time].second}}</span>
                  </div>
                </div>
                <i-rush-spu-big :actEnd="actEndMap[item.end_time]" :authModal="authModal" :changeCartNum="changeCartNum" :openSku="openSku" :vipModal="vipModal" :canLevelBuy="canLevelBuy" :changeCarCount="changeCarCount" :isShowListCount="isShowListCount" :is_open_vipcard_buy="is_open_vipcard_buy" :needAuth="needAuth" :reduction="reduction" :showPickTime="ishow_index_pickup_time==1" :skin="skin" :spuItem="item" :stopClick="stopClick"></i-rush-spu-big>
              </div>
              <div class="theme3" v-if="rushList.length>0&&theme==2">
                <image bindtap="goLink" class="topic-img" :data-link="'/lionfish_comshop/pages/type/details?id='+classificationId" mode="widthFix" :src="cate_info.banner" v-if="cate_info.banner"></image>
                <i-rush-spu bind:authModal="authModal" bind:changeCartNum="changeCartNum" bind:openSku="openSku" bind:vipModal="vipModal" :canLevelBuy="canLevelBuy" :changeCarCount="changeCarCount" class="item" :is_open_vipcard_buy="is_open_vipcard_buy" :needAuth="needAuth" :reduction="reduction" :spuItem="item" :stopClick="stopClick" v-for="(item,index) in rushList" wx:key="actId"></i-rush-spu>
              </div>
              <i-load-more iClass="loadMore" :loading="loadMore" :tip="loadText" v-if="loadMore"></i-load-more>
            </block>
            <block v-if="tabIdx===1">
              <div class="comming-list" v-if="commingList.length">
                <i-comming-spu :category="commingClassification.tabs[commingClassification.activeIndex].name" class="comming-spu-item" :spuItem="item" v-if="commingList.length" v-for="(item,index) in commingList"></i-comming-spu>
                <i-load-more iClass="loadMore" :loading="commigLoadMore" :tip="commigTip" v-if="commigLoadMore"></i-load-more>
              </div>
              <div class="none-rush-list" v-if="showCommingEmpty">
                <image class="img-block" src="../../images/icon-index-empty.png"></image>
                <div class="h1">暂时没有团购</div>
                <div class="h2">我们正在为您准备更优惠的团购</div>
              </div>
              <div class="slogan" v-if="!commigLoadMore&&commingList.length">
                <image :src="(indexBottomImage?indexBottomImage:'../../images/icon-index-slogan.png')"></image>
              </div>
            </block>
            <block v-if="tabIdx===0">
              <div class="none-rush-list" v-if="showEmpty">
                <image class="img-block" src="../../images/icon-index-empty.png"></image>
                <div class="h1">暂时没有团购</div>
                <div class="h2">我们正在为您准备更优惠的团购</div>
              </div>
              <div class="slogan" v-if="!loadMore&&rushList.length">
                <image :src="(indexBottomImage?indexBottomImage:'../../images/icon-index-slogan.png')"></image>
              </div>
            </block>
          </div>
        </div>
        <div bindtap="showCopyTextHandle" class="copytext-btn" data-status="true" v-if="ishow_index_copy_text==1">
          一键复制拼团信息
        </div>
        <div class="fixed-aside">
          <button bindtap="share_handler" class="fixed-service" v-if="isShowShareBtn==1">
            <text class="iconfont icon-fenxiang"></text>
            <div>分享</div>
          </button>
          <button class="fixed-service" openType="contact" v-if="isShowContactBtn==1">
            <text class="iconfont icon-kefu"></text>
            <div>客服</div>
          </button>
          <button bindtap="backTop" class="fixed-service" v-show="(!isSticky)" v-if="ishow_index_gotop==1">
            <text class="iconfont icon-fanhuidingbu"></text>
            <div>顶部</div>
          </button>
        </div>
        <i-order-notify iClass="order-notify" :stopNotify="stopNotify" v-if="shop_info.order_notify_switch==1"></i-order-notify>
        <i-change-community bind:changeComunity="confrimChangeCommunity" :canChange="hide_community_change_btn==0" :changeCommunity="changeCommunity" :community="community" :groupInfo="groupInfo" :visible="showChangeCommunity"></i-change-community>
        <div class="new-coupou" v-if="showCouponModal&&hasAlertCoupon&&!showChangeCommunity">
          <div class="new-coupou-content">
            <div class="new-coupou-body">
              <div class="new-coupou-body-head">恭喜你获得{{totalAlertMoney}}元红包券</div>
              <div class="new-coupou-body-scroll">
                <scroll-div scrollY style="max-height:580px;">
                  <div class="new-coupou-item" wx:for="(item ,index) in alert_quan_list" wx:key="id">
                    <div class="m-coupon-l">
                      <div class="m-coupou-price">
                        <text>¥</text>{{item.credit}}</div>
                    </div>
                    <div class="m-coupou-m">
                      <div class="m-coupou-name">{{item.voucher_title}}</div>
                      <div class="m-coupou-title" v-if="item.limit_money>0">满{{item.limit_money}}元可用</div>
                      <div class="m-coupou-title" v-else>全场通用</div>
                    </div>
                    <div class="m-coupou-r">
                      <div bindtap="goUse" class="new-coupou-use kong" :data-idx="index">去使用</div>
                    </div>
                  </div>
                </scroll-div>
              </div>
              <div class="new-coupou-body-foot">
                <div bindtap="toggleCoupon" class="new-coupou-body-btn" data-auth="true">立即使用</div>
              </div>
            </div>
            <div class="new-coupou-foot">
              <text bindtap="toggleCoupon" class="iconfont icon-guanbi"></text>
            </div>
          </div>
        </div>
      </div>
    </block>
    <div class="forbid i-flex-col i-flex-alc" v-if="isblack==1">
      <text class="iconfont icon-icon-test1"></text>
      <div class="h1">您已被禁止访问</div>
      <div class="h2">请联系管理员</div>
    </div>
    <div class="mask" v-show="false"></div>
    <div bind:cancel="close" class="sku-content" v-show="false" scrollUp="true">
      <div class="sku-card">
        <div bindtap="closeSku" class="close">
          <image src="../../images/icon-sku-close.png"></image>
        </div>
        <div class="sku-header">
          <i-img defaultImage="../../images/placeholder-refund.png" height="80" iClass="sku-img" :loadImage="cur_sku_arr.skuImage" width="80"></i-img>
          <div class="sku-desc">
            <div class="sku-title">
              <span>{{cur_sku_arr.spuName}}</span>
            </div>
            <div class="sku-price">
              <div class="sale-price">
                ¥ <span>{{cur_sku_arr.actPrice[0]}}</span>.{{cur_sku_arr.actPrice[1]}}
              </div>
              <div class="market-price">¥{{cur_sku_arr.marketPrice[0]}}.{{cur_sku_arr.marketPrice[1]}}</div>
              <i-vip-price :price="cur_sku_arr.card_price" v-if="is_open_vipcard_buy==1&&is_vip_card_member==1&&is_take_vipcard==1"></i-vip-price>
              <block v-elif="is_member_level_buy==1&&is_mb_level_buy==1">
                <i-vip-price :price="cur_sku_arr.levelprice" type="1" v-if="is_open_vipcard_buy==1&&is_vip_card_member!=1"></i-vip-price>
                <i-vip-price :price="cur_sku_arr.levelprice" type="1" v-if="is_open_vipcard_buy!=1"></i-vip-price>
              </block>
            </div>
            <div class="sku-switch-on">已选择：{{cur_sku_arr.spec}}</div>
          </div>
        </div>
        <div class="sku-spec" v-for="item in skuList.list">
          <div class="title">{{item.name}}</div>
          <div class="spec-list">
            <span bindtap="selectSku" :class="(idx==sku[idx]['idx']?'on':'')" :data-disabled="item.canBuyNum-value<0" :data-idx="idx"  v-for="(value,idx) in item.option_value" >{{value.name}}</span>
          </div>
        </div>
        <div class="sku-num-content">
          <div class="title">数量</div>
          <!--<div :class="['i-class', 'i-input-number', 'i-input-number-size-'+size]">
            <div bindtap="setNum" :class="['i-input-number-minus', (value <= min?'i-input-number-disabled':'')]" data-type="decrease">
              <image src="../../images/icon-input-reduce.png"></image>
            </div>
            <input bindblur="handleBlur" bindfocus="handleFocus" bindinput="changeNumber" :class="['i-input-number-text',(min>=max?'i-input-number-disabled':'')]" type="number" :value="sku_val"></input>
            <div bindtap="setNum" :class="['i-input-number-plus', (value>=max?'i-input-number-disabled':'')]" data-type="add">
              <image src="../../images/icon-input-add.png"></image>
            </div>
          </div>-->
          <!--<div class="msg" v-if="skuList[current].isLimit">
            <span v-if="skuList[current].limitMemberNum>-1">每人限{{skuList[current].limitMemberNum}}单</span>
            <span v-if="skuList[current].limitOrderNum>-1">每单限{{skuList[current].limitOrderNum}}份</span>
            <span></span>
          </div>-->
          <!--<div class="even-num" v-elif="!skuList[current].isLimit&&skuList[current].canBuyNum_value<=10&&skuList[current].canBuyNum_value>-1">还可以购买 {{skuList[current].canBuyNum-value}} 件</div>-->
        </div>
        <form bindsubmit="gocarfrom" reportSubmit="true">
          <button class="sku-confirm" :disabled="(cur_sku_arr.stock==0?true:false)" formType="submit">
            <div>{{cur_sku_arr.stock==0?'已抢光':'确定'}}</div>
          </button>
        </form>
      </div>
    </div>
    <div bindtap="hide_share_handler" class="ui-mask" v-show="is_share_html"></div>
    <div class="model-services show" v-show="is_share_html">
      <div class="model-services-title">分享</div>
      <div class="model-services-content">
        <div class="service-list">
          <div class="service-item">
            <button class="none_btn" openType="share" plain="true">
              <text class="iconfont icon-weixin2 service-icon"></text>
              <div class="cube-text">
                <text>好友</text>
              </div>
            </button>
          </div>
          <div bindtap="goLink" class="service-item" data-link="/lionfish_comshop/pages/index/share" :data-needauth="true">
            <text class="iconfont icon-pengyouquan service-icon"></text>
            <div class="cube-text">
              <text>海报</text>
            </div>
          </div>
        </div>
      </div>
    </div>
    <i-modal :scrollUp="false" :visible="showCopyText">
      <div class="copytext">
        <div class="copytext-title">
          - 团长信息 -
          <text bindtap="showCopyTextHandle" class="iconfont icon-guanbi copytext-close" :data-status="false"></text>
        </div>
        <div class="copytext-p">小区：{{community.communityName}}</div>
        <div class="copytext-p">团长：{{community.disUserName}}</div>
        <div class="copytext-p">自提点：{{community.address||community.communityAddress||community.fullAddress}}</div>
        <div class="copytext-h3">今日推荐</div>
        <scroll-div scrollY class="copytext-content">
          <div class="copytext-item" v-if="copy_text_arr.length" v-for="(item,index) in copy_text_arr">
            {{index+1}}. 【{{item.goods_name}}】 <text>团购价{{item.price}}元</text>
          </div>
        </scroll-div>
        <i-button bindtap="copyText" class="community-content-btn" iClass="btn">一键复制</i-button>
      </div>
    </i-modal>
    <i-new-auth bind:authSuccess="authSuccess" bind:cancel="authModal" :needAuth="needAuth&&showAuthModal" :needPosition="needPosition"></i-new-auth>
    <i-vip-modal :imgUrl="pop_vipmember_buyimage" :visible="showVipModal"></i-vip-modal>
    <!--<div class="mp-account" v-if="show_index_wechat_oa==1">
      <official-account binderror="binderror" bindload="bindload"></official-account>
    </div>-->


  </div>
</template>



<script>
  import {index_info,get_newauth_bg,get_navigat,load_gps_goodslist} from '@/api/index'
  import IModal from '@/components/modal'
  import IImg from '@/components/img'
  import ITabs from '@/components/tabs'
  import INewRushSpu from '@/components/NewRushSpu'
  import IButton from '@/components/button'


  export default {
    components: {IModal ,IImg,ITabs,INewRushSpu,IButton},
    name: 'Index',
    data() {
      return {
        sliderSwiperOption:{
          //显示分页
          pagination: {
            el: '.swiper-pagination'
          },
          //设置点击箭头
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
          //自动轮播
          autoplay: {
            delay: 2000,
            //当用户滑动图片后继续自动轮播
            disableOnInteraction: false,
          },
          //开启循环模式
          loop: true
        },
        skinSwiperOption: {
          notNextTick: true,
          direction: "vertical",   //控制滚动的方向
          paginationClickable: true,
          autoplay: {
            delay:2000  //这里需要注意，如果想每2秒去自动切换，直接autoplay:2000是失效的，
          },
          loop: true

        },
        skin:{
          color:'#3dc14a',
          background:'rgb(216, 242, 218)'
        },
        needAuth: !1,
        stopClick: !1,
        community: {},
        rushList: [],
        commingList: [],
        countDownMap: [],
        actEndMap: [],
        skuList: [],
        pageNum: 1,
        notice_list: [],
        slider_list: [],
        shop_info: {},
        showEmpty: !1,
        indexBottomImage: "",
        classification: {
          tabs: [],
          activeIndex: -1
        },
        commingClassification: {
          tabs: [],
          activeIndex: -1
        },
        isShowCommingClassification: !0,
        isShowClassification: !0,
        showChangeCommunity: !1,
        isTipShow: !1,
        isShowGuide: !1,
        index_lead_image: "",
        theme: 0,
        cartNum: 0,
        navigat: [],
        tabIdx: 0,
        scrollDirect: "",
        isSticky: !1,
        showCommingEmpty: !1,
        stopNotify: !0,
        reduction: {},
        is_share_html: false,
        commingNum: 0,
        couponRefresh: !1,
        index_change_cate_btn: 0,
        newComerRefresh: !1,
        showCouponModal: !1,
        copy_text_arr: [],
        showCopyText: !0,
        totalAlertMoney: 0,
        groupInfo: {
          group_name: "社区",
          owner_name: "团长"
        },
        needPosition: !0,
        typeTopicList: [],
        pinList: {},
        cube: [],
        secRushList: [],
        secKillGoodsIndex: 1,
        isblack: 0,
        imageSize: {
          imageWidth: "100%",
          imageHeight: 600
        },
        fmShow: !0,
        cur_sku_arr:{
          stock: 0,
          actPrice: [],
          marketPrice: []
        },
        is_open_vipcard_buy:true,
        is_member_level_buy:true,
        is_show_new_buy:true,
        is_show_spike_buy:true,
        current:0,
        size:'',
        sku_val:'',
        showNewCoupon:'',
        hide_top_community:'',
        hasCoupon:'',
        seckill_is_open:true,
        seckill_is_show_index:1,
        index_switch_search:1,
        hide_index_type:0,
        index_qgtab_text:'',
        qgtab:{},
        skin:{},
        rushEndTime:true
      }
    },
    watch: {
      $route: {
        handler: function(route) {
          this.redirect = route.query && route.query.redirect
        },
        immediate: true
      }
    },
    mounted:function(){
      this.tabbarRefresh = true;
      this.getNewauthGg();
      this.getIndexInfo();
      this.getNavigat();
      this.loadGpsGoodsList();

    },
    methods: {
      getIndexInfo(){

        const this_ = this;

        index_info().then(response => {
          console.log(response.title)
          //this.$set(this.$data,"title",response.title);

          var p = response.category_list || [],
            _ = response.index_type_first_name || "全部";
          if(0 < p.length){
            p.unshift({
              name: _,
              id: 0
            })
            this.isShowClassification = true;
            this.classification.tabs = p;
          }else{
            this.isShowClassification = false;
          }





          this.comming_goods_total=response.comming_goods_total;
          this.common_header_backgroundimage=response.common_header_backgroundimage;
          this.cube=response.cube;
          this.diypage=response.diypage;
          this.hide_community_change_btn=response.hide_community_change_btn;
          this.hide_community_change_word=response.hide_community_change_word;
          this.hide_index_type=response.hide_index_type;
          this.hide_top_community=response.hide_top_community;
          this.index_bottom_image=response.index_bottom_image;
          this.index_change_cate_btn=response.index_change_cate_btn;
          this.index_communityinfo_showtype=response.index_communityinfo_showtype;
          this.index_hide_headdetail_address=response.index_hide_headdetail_address;
          this.index_lead_image=response.index_lead_image;
          this.index_list_top_image= response.index_list_top_image ;
          this.index_list_top_image_on=response.index_list_top_image_on;
          this.index_loading_image=response.index_loading_image;
          this.index_qgtab_counttime=response.index_qgtab_counttime;
          this.index_qgtab_text=response.index_qgtab_text;
          this.index_service_switch=response.index_service_switch;
          this.index_share_switch=response.index_share_switch;
          this.index_switch_search=response.index_switch_search;
          this.index_top_font_color=response.index_top_font_color;
          this.index_top_img_bg_open=response.index_top_img_bg_open;
          this.index_type_first_name=response.index_type_first_name;
          this.index_video_arr=response.index_video_arr;
          this.is_community=response.is_community;
          this.is_comunity_rest=response.is_comunity_rest;
          this.is_quan=response.is_quan;
          this.is_show_list_count=response.is_show_list_count;
          this.is_show_list_timer=response.is_show_list_timer;
          this.is_show_new_buy=response.is_show_new_buy;
          this.is_show_spike_buy=response.is_show_spike_buy;
          this.ishow_index_copy_text=response.ishow_index_copy_text;
          this.ishow_index_gotop=response.ishow_index_gotop;
          this.ishow_index_pickup_time=response.ishow_index_pickup_time;
          this.nav_bg_color=response.nav_bg_color;
          this.nav_list=response.nav_list;
          this.notice_list=response.notice_list;
          this.notice_setting=response.notice_setting;
          this.open_diy_index_page=response.open_diy_index_page;
          this.order_notify_switch=response.order_notify_switch;
          this.postion=response.postion;
          this.qgtab=response.qgtab;
          this.rushtime=response.rushtime;
          this.scekill_time_arr=response.scekill_time_arr;
          this.seckill_bg_color=response.seckill_bg_color;
          this.seckill_is_open=response.seckill_is_open;
          this.seckill_is_show_index=response.seckill_is_show_index;
          this.shoname=response.shoname;
          this.shop_index_share_image=response.shop_index_share_image;
          this.show_index_wechat_oa=response.show_index_wechat_oa;
          this.slider_list=response.slider_list;
          this.spike_data=response.spike_data;
          this.theme=response.theme;
          this.title=response.title;
          console.log(this)

        })
      },
      getNewauthGg(){
        get_newauth_bg().then(response => {
            this.newauth_bg_image = response.data.newauth_bg_image
            this.newauth_cancel_image = response.data.newauth_cancel_image
            this.newauth_confirm_image = response.data.newauth_confirm_image

        })
      },
      getNavigat(){
        get_navigat().then(response => {

          var a = response.data || [],
            e = [];
          if (0 < a.length) {
            var o = 5 - a.length % 5 || 0;
            o < 5 && 0 < o && (e = new Array(o));
          }

          this.navigat = a;
          this.navigatEmpty = e;

        })
      },
      loadGpsGoodsList(){
        load_gps_goodslist(0,1).then(response => {

          this.rushList = this.rushList.concat(response.list);
          console.log( this.rushList)

        })
      }



    }
  }

</script>

<style>
  .page {
    background-color: #f6f6f6;
    font-size: 28px;
    font-weight: 400;
    color: #333;
  }
  .bg-f {
    background-color: #fff;

  }

  ::-webkit-scrollbar {
    width: 0;
    height: 0;
    color: transparent;
  }

  .mt120 {
    margin-top: 120px;
  }

  .swipe {
    height: 140px;
    margin: 10px
  }

  .swiper-content {
    width: 100%;
    border-radius: 12px;
  }

  .swiper-content swiper-item {
    border-radius: 12px;
    margin-right: 20px;
    display: flex;
    justify-content: flex-start;
  }

  .swiper-content swiper-item:last-child {
    margin: 0;
  }

  .swiper-content .banner {
    width: 710px;
    height: 320px;
    margin: 0 20px;
    display: block;
    border-radius: 12px;
    position: relative;
    overflow: hidden;
  }

  .swiper-content .banner .banner-img {
    width: 100%;
    height: 320px;
    border-radius: 12px;
    display: block;
    overflow: hidden;
  }

  .active-item {
    position: relative;
    width: 100%;
    min-height: 100px;
    margin-bottom: 8px;
  }

  .active-item .list-item-tag-content {
    position: absolute;
    left: 20px;
    top: 0;
    z-index: 9;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-top: 5px;
    pointer-events: none;
  }

  .active-item .list-item-tag-content .empty-1 {
    height: 32px;
    width: 400px;
    margin-bottom: 12px;
    margin-top: 10px;
  }

  .active-item .list-item-tag-content .empty-2 {
    width: 400px;
    height: 26px;
    margin-bottom: 12px;
  }

  .active-item .list-item-tag-content .list-item-count-down {
    white-space: nowrap;
    height: 28px;
    border-radius: 28px;
    color: #f78076;
    text-align: center;
    font-size: 24px;
    line-height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 8px;
    font-weight: 500;
  }

  .active-item .list-item-tag-content .list-item-count-down em {
    margin: 0 4px 0 0;
  }

  .active-item .list-item-tag-content .list-item-count-down span {
    margin: 0;
  }

  .active-item .list-item-tag-content .tag {
    width: 52px;
    height: 22px;
    font-size: 20px;
    border: 1px solid #ff5344;
    color: #ff5344;
    margin-right: 8px;
    line-height: 22px;
    border-radius: 22px;
    white-space: nowrap;
    display: flex;
    justify-content: center;
    align-items: center;
    vertical-align: middle;
  }

  .active-item .list-item-tag-content .tag.hidden {
    display: none;
  }

  .active-item .list-item-tag-content .tag-green {
    color: #4ab089;
    border-color: #4ab089;
  }

  .goods-skeleton-content {
    position: relative;
    z-index: 1;
  }

  .goods-skeleton-content .goods-skeleton-slogan-top-msg {
    width: 690px;
    height: 80px;
    border-radius: 80px;
    padding: 0 30px;
    display: flex;
    align-items: center;
    margin: 0 auto 40px;
    background: #fff9f4;
  }

  .goods-skeleton-content .goods-skeleton-slogan-top-msg view {
    width: 300px;
    height: 24px;
    background: #e4e4e4;
  }

  .goods-skeleton-content .goods-skeleton-slogan {
    height: 32px;
    width: 336px;
    margin: 0 auto 50px;
    background: #f7f7f7;
  }

  .goods-skeleton-content .goods-skeleton-swipe-box {
    width: 750px;
    height: 240px;
    margin-bottom: 40px;
  }

  .goods-skeleton-content .goods-skeleton-swipe-item {
    width: 670px;
    height: 240px;
    border-radius: 12px;
    background: #f7f7f7;
    margin: 0 auto;
  }

  .goods-skeleton-content .goods-skeleton {
    width: 100%;
    border-radius: 20px;
    background: #fff;
    box-shadow: 0 10px 60px rgba(0,0,0,0.1);
    margin: 0 auto 40px;
    overflow: hidden;
  }

  .goods-skeleton-content .goods-skeleton .goods-img {
    width: 100%;
    height: 352px;
    display: block;
  }

  .goods-skeleton-content .goods-skeleton .goods-img image {
    width: 100%;
    height: 100%;
  }

  .goods-skeleton-content .goods-skeleton .text-content {
    box-sizing: border-box;
    padding: 24px 30px;
    height: 176px;
  }

  .goods-skeleton-content .goods-skeleton .text-content .title {
    width: 400px;
    height: 32px;
    background: #f7f7f7;
    margin-bottom: 16px;
  }

  .goods-skeleton-content .goods-skeleton .text-content .desc {
    width: 600px;
    height: 24px;
    background: #f7f7f7;
    margin-bottom: 16px;
  }

  .goods-skeleton-content .goods-skeleton .text-content .desc2 {
    width: 560px;
    height: 44px;
    background: #f7f7f7;
  }

  .router-hover {
    opacity: 1;
  }

  .list-content {
    z-index: 1;
    position: relative;
  }

  .list-content .rush-list-title {
    height: 45px;
    display: block;
    margin: 0 auto 20px;
  }

  .rush-list-box {
    position: relative;
    min-height: 1300px;
    padding: 10px;
  }

  .first-screen {
    background: #fff;
    padding-bottom: 48px;
  }

  .header-content {
    width: 750px;
    position: relative;
    margin-bottom: 20px;
  }

  .header-content .header-bg {
    width: 100%;
    height: 340px;
    position: absolute;
    left: 0;
    top: 0;
  }

  .header-content .location {
    display: flex;
    justify-content: space-around;
    padding: 20px 10px 0;
    color: #fff;
    position: relative;
    box-sizing: border-box;
  }

  .header-content .location .community-title {
    width: 560px;
    font-size: 40px;
    line-height: 40px;
    height: 40px;
    padding-top: 6px;
    display: flex;
    align-items: center;
    font-weight: 500;
    position: relative;
  }

  .header-content .location .community-title span {
    line-height: 56px;
    position: absolute;
    max-width: 100%;
    left: 0;
    top: -8px;
    display: flex;
    align-items: baseline;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .header-content .location .community-title image {
    width: 10px;
    height: 18px;
    margin-left: 4px;
  }

  .header-content .location .community-change {
    font-size: 24px;
    margin-left: 30px;
  }

  .header-content .location .iconfont {
    font-size: 22px;
  }

  .header-content .location .community-address {
    font-size: 24px;
    line-height: 30px;
    width: 516px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: initial;
    white-space: normal;
    margin-top: 24px;
  }

  .header-content .location .location-right {
    width: 72px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: -10px;
  }

  .header-content .location .location-right .img {
    width: 70px;
    height: 70px;
    border-radius: 70px;
    margin-bottom: 8px;
  }

  .header-content .location .location-right text {
    font-size: 24px;
    width: 140px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .top-msg {
    width: 100%;
    height: 36px;
    display: flex;
    align-items: center;
    padding: 0 10px;
    box-sizing: border-box;
    color: #3dc14a;;
    font-size: 10px;
    line-height: 36px;
    margin: 0 auto;
    background: rgb(216, 242, 218);
    border-radius: 40px;
  }

  .top-msg image {
    width: 42px;
    height: 26px;
    margin-right: 20px;
    margin-top: -4px;
    line-height: 30px;
  }

  .top-msg .iconfont {
    margin-right: 20px;
    margin-top: 4px;
  }

  .notice-swipe {
    flex: 1;
    height: 30px;
  }

  .notice-swipe-item {
    line-height: 30px;
    font-size: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .list-title {
    display: block;
    margin: 0 auto 12px;
    width: 336px;
    height: 116px;
  }

  .comming-list {
    padding: 20px 24px;
  }

  .comming-list .comming-spu-item {
    width: 340px;
    height: 460px;
    margin-bottom: 20px;
    display: inline-block;
  }

  .comming-list .comming-spu-item:nth-child(odd) {
    margin-right: 20px;
  }

  .sticky-title {
    display: flex;
    justify-content: center;
    background: #fff;
    height: 160px;
    position: relative;
    z-index: 20;
  }

  .sticky-title.sticky {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 80px;
    line-height: 80px;
    border-bottom: 1px solid rgba(0,0,0,0.1);
  }

  .sticky-title.sticky .tab-btn {
    margin-top: 0;
  }

  .sticky-title .tab-btn {
    width: 112px;
    height: 80px;
    line-height: 80px;
    margin: 0 30px;
    color: #666;
    font-size: 28px;
    position: relative;
  }

  .sticky-title .tab-btn-active {
    color: #ff5344;
    line-height: 80px;
  }

  .sticky-title .tab-btn-active:after {
    content: '';
    width: 112px;
    height: 6px;
    border-radius: 6px;
    background: linear-gradient(to right,#fe655c,#fa875b);
    position: absolute;
    bottom: 0;
    left: 0;
    box-shadow: 0 4px 8px rgba(255,89,9,0.25);
  }

  .none-rush-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-bottom: 140px;
    padding-top: 140px;
  }

  .none-rush-list .img-block {
    width: 240px;
    height: 240px;
    margin-bottom: 30px;
  }

  .none-rush-list .h1 {
    font-size: 32px;
    line-height: 32px;
    color: #444;
    margin-bottom: 20px;
  }

  .none-rush-list .h2 {
    font-size: 24px;
    line-height: 24px;
    color: #aaa;
  }

  .slogan {
    height: 120px;
    padding-bottom: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .slogan image {
    width: 250px;
    height: 56px;
  }

  .back-top {
    bottom: 150px;
    right: 30px;
    width: 80px;
    height: 80px;
    position: fixed;
    background: rgba(0,0,0,0.5);
    border-radius: 50%;
    color: #fff;
    text-align: center;
    transform: translate3d(0,100%,0);
    opacity: 0;
    transition: all 0.3s;
  }

  .back-top image {
    margin-top: 22%;
    width: 60%;
    height: 60%;
  }

  .back-top.show-icon {
    transform: translate3d(0,0,0);
    opacity: 1;
  }

  .i-router-hover {
    opacity: 1;
  }



  .img-content {
    position: relative;
  }

  .img-def {
    position: absolute!important;
    transition: opacity 0.6s;
  }

  .opacity {
    opacity: 0;
  }

  .show-img {
    opacity: 1;
  }

  .auth-box {
    position: absolute;
    top: 0;
    left: 0;
  }

  .tabs {
    background-color: #fff;
  }

  .tabs.sticky {
    position: fixed;
    display: flex;
    top: 0;
    left: 0;
    height: 80px;
    line-height: 80px;
    width: 100vw;
    border-bottom: 2px solid rgba(0,0,0,0.1);
    z-index: 99;
  }

  @keyframes opacity {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  .miniAppTip {
    position: relative;
    z-index: 100;
  }

  .add-myapp {
    position: fixed;
    right: 10px;
    top: 10px;
    color: #333;
    font-size: 22px;
    background-color: #fbe94e;
    padding: 15px 20px;
    border-radius: 30px;
    transition: all 400ms ease-in;
  }

  .add-myapp:after {
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid #fbe94e;
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    top: -5px;
    right: 132px;
  }

  .guide {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
    z-index: 1000;
  }

  .guide image {
    width: 100%;
  }

  .active-item-two {
    position: relative;
    width: 100%;
    margin-bottom: 10px;
  }

  .list-item-count-down.type-two {
    position: absolute;
    z-index: 10;
    top: 351px;
    right: 20px;
    color: #fff;
    font-size: 26px;
    background: #ff5344;
    height: 50px;
    line-height: 50px;
    border-radius: 10px 0 0 0;
    padding: 0 20px;
  }

  .nav-list {
    position: relative;
    z-index: 1;
    margin: 0px 0 10px;
    display: flex;
    padding: 0 10px;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .nav-list-item {
    color: #333;
    margin-bottom: 2px;
    font-size: 6px;
    text-align:center
  }

  .nav-list-item .nav-list-img {
    width: 36px;
    height: 36px;
    margin: 0 auto;
  }

  .nav-list-item .nav-list-text {
    text-align: center;
    font-size: 12px;
  }

  .nav-contact {
    font-size: inherit;
    line-height: inherit;
    border-radius: 0;
    background: transparent;
    color: inherit;
    padding: 0;
  }

  .nav-contact::after {
    content: none;
  }

  .nav-list-item.nav-contact .nav-list-img {
    left: 0;
  }

  .sticky-content {
    background: #fff;
    padding-bottom: 14px;
    position: sticky;
    z-index: 99;
    top: -80px;
    transition: top 0.3s;
  }

  .sticky-content.tab-nav-sticky {
    top: 0;
  }

  .sticky-content .tab-nav {
    height: 70px;
    display: flex;
    margin: 0 30px;
    border-bottom: 4px solid #fc4443;
    transition: all 0.3s linear;
  }

  .sticky-content .tab-nav .count-down-content {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    color: #444;
  }

  .sticky-content .tab-nav .count-down-content em {
    font-size: 26px;
  }

  .sticky-content .tab-nav .count-down-content .count-down-left-text {
    font-size: 26px;
  }

  .sticky-content .tab-nav .count-down-content .count-down {
    height: 68px;
    line-height: 68px;
    color: #444;
    font-size: 26px;
    display: flex;
    align-items: center;
    flex: 1;
  }

  .sticky-content .tab-nav .count-down-content .count-down .item-time {
    width: 34px;
    height: 32px;
    line-height: 32px;
    color: #fff;
    text-align: center;
    background: #444;
    border-radius: 4px;
    padding: 0 2px;
  }

  .sticky-content .tab-nav .tab-nav-item {
    color: #6c6c6c;
    font-size: 26px;
    font-weight: bold;
    position: relative;
    z-index: 1;
    width: 190px;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .sticky-content .tab-nav .tab-nav-item image {
    width: 190px;
    height: 70px;
    position: absolute;
    left: 0;
    top: 0;
  }

  .sticky-content .tab-nav .tab-nav-item span {
    position: relative;
  }

  .sticky-content .tab-nav .tab-nav-item.active {
    color: #fff;
    z-index: 2;
  }

  .sticky-content .tab-nav .tab-nav-item:nth-child(1) span {
    margin-left: -10px;
  }

  .sticky-content .tab-nav .tab-nav-item:nth-child(2) {
    margin-left: -20px;
  }

  .sticky-content .tab-nav .tab-nav-item:nth-child(2) span {
    margin-left: 30px;
  }

  .sticky-content .category-list {
    margin-top: 20px;
    background-color: #fff;
  }

  .sticky-cate {
    background: #fff;
    position: sticky;
    top: 0;
    z-index: 99;
  }

  .sticky-cate .category-list {
    background-color: #fff;
  }

  .ui-mask {
    position: fixed;
    display: block;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
    background: rgba(0,0,0,0.6);
  }

  .model-services {
    width: 100%;
    position: fixed;
    background-color: #fff;
    bottom: 0;
    z-index: 1000;
    color: #333;
    transition: all 0.3s;
    transform: translate(0,100%);
  }

  .model-services.show {
    transform: translate(0);
  }

  .model-services .model-services-title {
    font-size: 36px;
    text-align: center;
    height: 80px;
    line-height: 80px;
    border-bottom: 1px solid #f2f5f8;
  }

  .model-services .model-services-content {
    padding: 40px;
  }

  .model-services .model-services-content .service-item {
    margin-bottom: 20px;
    width: 50%;
    float: left;
    text-align: center;
  }

  .model-services .model-services-content .service-icon {
    font-size: 80px;
    color: #50b674;
  }

  .service-name {
    padding-left: 10px;
  }

  .cube-text {
    position: relative;
    width: 100%;
    height: 32px;
    line-height: 32px;
    color: #777;
    margin-top: 5px;
    font-size: 24px;
  }

  .none_btn {
    border: none;
    line-height: 1.1;
    padding: 0px;
  }

  button[plain] {
    border: none;
  }

  .share-modal {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0,0,0,0.6);
    z-index: 101;
    transition: all 400ms ease-in;
  }

  .share-modal-content {
    position: relative;
    width: 70%;
    top: 50%;
    left: 15%;
    transform: translateY(-50%);
    z-index: 110;
  }

  .share-modal-img {
    width: 100%;
    height: 956px;
    background: #f7f7f7;
  }

  .share-modal-img image {
    width: 100%;
  }

  .share-modal-btn-list {
    display: flex;
    margin-top: 30px;
  }

  .share-modal-btn-item {
    text-align: center;
    flex: 1;
  }

  .share-modal .btn-icon {
    width: 70px;
    margin: 0 auto;
  }

  .share-modal .btn-text {
    position: relative;
    width: 100%;
    height: 32px;
    line-height: 32px;
    color: #fff;
    margin-top: 5px;
    font-size: 24px;
  }

  .fixed-aside {
    position: fixed;
    right: 30px;
    top: 65%;
    z-index: 100;
    width: 80px;
  }

  .fixed-service {
    display: inline-block;
    width: 80px;
    height: 80px;
    background: rgba(0,0,0,0.5);
    border-radius: 50%;
    text-align: center;
    color: #fff;
    box-sizing: border-box;
    font-size: 20px;
    padding: 10px;
    line-height: 1.2;
    margin-bottom: 10px;
  }

  .fixed-service::after {
    border: 0;
  }

  .fixed-service .iconfont {
    font-size: 30px;
  }

  .search-bar {
    padding: 6px 10px;
    background-color: #fff;
    width: 100%;
    overflow:scroll;
  }

  .search-box {
    background-color: #f0f0f0;
    height: 26px;
    line-height: 18px;
    border-radius: 20px;
    width: 100%;
    color: #acacac;
    align-content: center;
  }

  .search-icon {
    position: absolute;
    left: 20px;
    margin-left: 10px;
    margin-right: 10px;
  }

  .search-icon .iconfont {
    font-size: 34px;
    padding-top: 10px;
  }

  .search-box .ipt {
    margin-left: 13px;
    margin-right: 13px;
    padding: 0 6px 0 6px;
    line-height: 23px;
    height: 23px;
    width: 90%;
    font-size: 14px;
    box-sizing: border-box;
    background-color: transparent;
    border: 0px;
  }

  .location-left {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .new-coupou {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0,0,0,0.3);
    z-index: 999;
    transition: all 400ms ease-in;
  }

  .new-coupou-content {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 600px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    transform: translate(-50%,-50%);
  }

  .new-coupou-body {
    flex: 1;
    width: 100%;
    background: linear-gradient(to right,#fe655c,#fa875b);
    border-radius: 20px;
    box-sizing: border-box;
    padding: 0 30px;
  }

  .new-coupou-foot {
    padding: 40px 0;
  }

  .new-coupou-foot .iconfont {
    font-size: 60px;
    color: #fff;
  }

  .new-coupou-body-head {
    height: 108px;
    line-height: 108px;
    text-align: center;
    color: #fff;
    font-size: 40px;
    font-weight: bold;
  }

  .new-coupou-body-foot {
    height: 122px;
  }

  .new-coupou-body-btn {
    background: #f9d44f;
    width: 100%;
    text-align: center;
    color: #c34f14;
    font-size: 34px;
    font-weight: bold;
    line-height: 78px;
    border-radius: 39px;
    margin-top: 20px;
  }

  .preventTouchMove {
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: fixed;
    z-index: 0;
  }

  .new-coupou-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 20px;
  }

  .new-coupou-title {
    font-size: 32px;
    color: #000;
  }

  .new-coupou-time {
    font-size: 24px;
    color: #fe655c;
    margin-top: 10px;
  }

  .new-coupou-r {
    text-align: center;
  }

  .new-coupou-price {
    color: #fe655c;
    font-size: 48px;
    font-weight: bold;
  }

  .new-coupou-price text {
    font-size: 24px;
    font-weight: normal;
    display: inline-block;
    vertical-align: middle;
  }

  .new-coupou-use {
    background: #fe655c;
    border-radius: 20px;
    color: #fff;
    font-size: 22px;
    padding: 10px 20px;
    line-height: 1;
  }

  .blank10 {
    margin-bottom: 20px;
  }

  .copytext {
    width: 640px;
    background: #fff;
    border-radius: 24px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    margin: 0 auto;
    overflow: hidden;
    z-index: 1001;
  }

  .copytext-title {
    width: 100%;
    background-color: #f75451;
    text-align: center;
    color: #fff;
    font-weight: bold;
    font-size: 34px;
    line-height: 100px;
    margin-bottom: 30px;
  }

  .copytext-p {
    width: 100%;
    box-sizing: border-box;
    padding: 5px 30px;
    font-size: 30px;
  }

  .copytext-h3 {
    width: 100%;
    box-sizing: border-box;
    padding: 5px 30px;
    font-size: 32px;
    font-weight: bold;
    margin-top: 24px;
  }

  .copytext-content {
    box-sizing: border-box;
    height: 400px;
    padding: 20px 30px 0;
  }

  .copytext-item {
    line-height: 1.8;
  }

  .copytext-item text {
    margin-left: 5px;
  }

  .copytext-close {
    position: absolute;
    font-size: 50px;
    top: 25px;
    right: 30px;
    color: #fff;
    line-height: 1;
  }

  .copytext-btn {
    position: fixed;
    right: 0;
    top: 58%;
    font-size: 20px;
    color: #999;
    z-index: 100;
    width: 80px;
    line-height: 1.2;
    border: 1px solid #999;
    border-right: 0;
    padding: 5px 15px 5px 20px;
    border-radius: 40px 0 0 40px;
  }

  .community-content-btn {
    text-align: center;
    width: 432px;
    height: 72px;
    color: #fff;
    background: #f75451;
    font-size: 30px;
    line-height: 72px;
    border-radius: 12px;
    margin: 40px 0 30px;
  }

  .promotion {
    box-sizing: border-box;
    height: 126px;
    padding: 0 20px 20px;
    background-color: #fff;
  }

  .promotion .head {
    font-size: 24px;
    color: #999;
    margin-bottom: 16px;
  }

  .promotion .slider {
    position: relative;
    overflow: hidden;
  }

  .promotion .slider-wraper {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  .promotion .list {
    display: flex;
    flex-flow: row nowrap;
  }

  .promotion .list-item {
    margin-right: 10px;
  }

  .promotion .list-item:last-child {
    margin-right: 0px;
  }

  .promotion .card-content {
    height: 106px;
    border-radius: 3px;
    position: relative;
    overflow: hidden;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALAAAAB0CAMAAAASEEjOAAAAn1BMVEX/Vnj/TYX/U3z/SYr/UYD/TIb//P3/Ro7/S4j/Un7/////SIz/UIH/VXr/T4P/R43/U33/Son/+Pv/ToL/9Pj/9vr/VHn/8vf/7vX/6vL/7PP33Ofoy9b95e7z1+H84+3u0dziw8/64Or66vH87/T45u395/D24+rt1d7jyNPy3OXu2uLz4Oj87PPo0dr/V5r/iLf/k6f/aYX/ZIL/aYb7eJ6vAAAEY0lEQVR42uzWS27jQAwE0JbjQKN4FMsQoIUvke/9zxayQ7MqKnWyNqAaedYPBTbD8nR9+yyUcVzGyGE8ZKbIMAz2sxyHI/L/ltm++TnSdXN3y6P/o/yLXC4X+z1wTg+nyPl09vTn/jsvr9encv1g7rKU9ILLZMeGGNwkzxYHz0HmMBepXv8gTq55Q5zka3lzJ4vHZVlQMLiHqoX4KA2nGFzSdsR9zH79F9wMFxwdZ17L+w9uiYGQiqvXyUhqj9SwiaNeKdg+bdi5SoYY3qi4rAr2BJornjASEyYCYvJC3DUngsXVzNjwouCexWWdytWCMRMoGGKYKzfFz1pwNIyZkIL10fVkVu/oYt0SlSuPLkIT7OIZXBLrDNsEp5fFDPb83vBCYHB9JNCwrLUVmQvmxSYVbz86kOFtgHmrBVcfHcTYahnn3sjMbQzxbSSIfJIZZvLKa59FyBPAIJsVZNlqUrFsCYAtDM7ollAwtFxxwwsx4o8uZ6Ll5ZH4ZaudjfznlhhlhkFurQmbCRSc4o7FdYC7FOua2K7YshLLkuCOiRuLWGcYBcMc/cqaQAis3mwYe60JDu4iBedIgAyvf+xNMokbBYPcWGvy6ETM1xpzD87liRi2jrUm1z5Ovjj7D1ydCGlYCuY9LEM8TOrFXzrcEvP2Ht5ew5FNcUXrDN/LPRzge7qHHXxf97CB7+se7vd7eL+H93t4v4f3e3i/h/d7+IvdOhAAAAAAAPJ/bYQKP/zDP/zDP/zDP/zDP/zDP/zDP/zDP/zDP/zDP/zD2LeDIgBAEABg5KAEiv27ecbgXIt9xsM8zMM8zMM8zMM8zMM8zMM8zMM8zMM8/JGHe5aHK/YsD6/IM8nDla8J9xQP3+btZadBKIrC8OwMOiQSehWl3CyF93889zpQVtMVw+hs+6PGSd1fVtqh8d+EdyigLMvy/KOo62vT3Yehn6bzz9K3S49r52nqh+HeNde6Lj7y3GABQfoCzgxc1CPENyP3k6Gdm0xr3Bu8Y10YGC4Bv0wMsZHNjL7c6tEALrxPAyuYEy/ipoMZfTqGe9B2zeLlwAQjgmfxaGQzW1V1OtmXR9W9qircbMAdZy/BuxUsE+N9bOTWXliWZfXUKck3s3N2tDUu3r86sIIxcQExyGZu24tVps2cCJfs4DVyayg4sIAXMTfeW8fj4djGLg61MTt5xG3uO3sJ1olNbM1kC+yDQ6CiyI2EXAcmeIlirEyzlVDNG/t1XXoVTDE3RiATnbzlGLR/ehUcN36MHGd2qljHjWAYwFUwks9dBvFq9lEXCFpkWvnECZgbc2SEP+MQ7iDOi30VrOK5nGbKU0QnteAiegkWMcnc2a2IJVe8AqYY4cUoPXw9g5vPXgWrmGQEMn6kbj7EgnoJpljJLBU7Y+Sql2Al0+xfoJZcAauY6BCf1IXHw8QrYCGLPtHDlKtgLbxJEaPgdyVTswEOu/DvaEEpWNH81cv+cnYLrGg8vulZBW8VnJ+NfgGoKlBWnDZmzQAAAABJRU5ErkJggg==) no-repeat;
    background-size: cover;
  }

  .promotion .card {
    position: relative;
    overflow: hidden;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    color: #fff;
    border-radius: 4px;
    height: 88px;
    width: 180px;
    padding: 8px;
  }

  .promotion .card-price {
    flex-flow: row nowrap;
    align-items: flex-start;
  }

  .promotion .card-price--unit,.card-price {
    display: flex;
  }

  .promotion .card-price--unit {
    font-size: 18px;
  }

  .promotion .card-price--num {
    font-size: 48px;
    line-height: 48px;
  }

  .promotion .card-desc,.card-price--num {
    display: flex;
  }

  .promotion .card-desc {
    font-size: 20px;
  }

  .promotion .card-tag {
    display: none;
    justify-content: center;
    align-items: center;
    width: 64px;
    height: 64px;
    position: absolute;
    bottom: -16px;
    right: -10px;
    transform: rotate(-20deg);
    border: 1px solid #666;
    border-radius: 50%;
  }

  .promotion .card-tag--text {
    font-size: 20px;
    color: #666;
    margin-bottom: 10px;
    text-align: center;
  }

  .promotion .card-tag--get {
    display: flex;
  }

  .promotion .card-content.get {
    background-image: none!important;
    background-color: #c7c7c7!important;
  }

  .m-coupou-m {
    flex: 1;
    margin: 0 20px;
    width: 0;
  }

  .m-coupou-price {
    font-size: 48px;
    font-weight: bold;
  }

  .m-coupou-price text {
    font-size: 24px;
    font-weight: normal;
  }

  .m-coupou-name {
    width: 100%;
    font-size: 28px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .m-coupou-title {
    font-size: 22px;
  }

  .m-coupou-r .new-coupou-use.kong {
    background: transparent;
    border: 1px solid #fe655c;
    color: #fe655c;
  }

  .theme3 {
    display: flex;
    flex-wrap: wrap;
    margin: 20px;
    border-radius: 10px;
    overflow: hidden;
    background-color: #fff;
  }

  .theme3 .topic-img {
    width: 100%;
  }

  .theme3-more {
    text-align: center;
    border-top: 0.1px solid #efefef;
    padding: 20px 0;
    width: 100%;
    font-size: 24px;
    margin: 20px 20px 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .theme3-more .iconfont {
    font-size: 20px;
    color: #999;
    margin-top: 1px;
  }

  .location-theme2 {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 20px 0;
  }

  .location-theme2 .loc-m {
    flex: 1;
    margin: 0 20px;
    font-size: 30px;
    font-weight: bold;
  }

  .location-theme2 .loc-m .iconfont {
    font-size: 26px;
  }

  .location-theme2 .loc-l .img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    vertical-align: middle;
  }

  .location-theme2 .top-search {
    background-color: #ebebeb;
    border-radius: 30px;
    padding: 10px 40px;
    color: #666;
  }

  .location-theme2 .top-search .iconfont {
    font-size: 28px;
    margin-right: 20px;
  }

  .forbid {
    position: relative;
    height: 100vh;
    color: #999;
    z-index: 9999;
    background: #fff;
  }

  .forbid .iconfont {
    font-size: 200px;
  }

  .forbid .h1 {
    font-size: 32px;
    margin-top: 30px;
    font-weight: bold;
  }

  .forbid .h2 {
    font-size: 28px;
    margin-top: 10px;
  }

  .mp-account {
    position: fixed;
    left: 20px;
    right: 20px;
    bottom: 97px;
    z-index: 100;
    border: 1px solid #ccc;
    border-radius: 8px;
    overflow: hidden;
  }
</style>




