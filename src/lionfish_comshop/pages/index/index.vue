<template>
  <div class="page">
    <div v-if="isblack!=1">

      <div :class="['index-box', 'pb100', (showNewCoupon?'preventTouchMove':'')]">
        <div class="miniAppTip" v-if="isTipShow">
          <div @click="handleProxy" class="add-myapp">
            <span>添加到「我的小程序」团购更方便</span>
          </div>
        </div>
        <div @click="handleHideProxy" class="guide" v-if="isShowGuide">
          <img mode="widthFix" :src="index_lead_image"/>
        </div>
        <div class="bg-f">
          <div class="header-content" v-if="hide_top_community==0">
            <img class="header-bg"
                 :src="shop_info.common_header_backgroundimage?shop_info.common_header_backgroundimage:'@/assets/images/TOP_background@2x.png'"
                 v-if="shop_info.index_top_img_bg_open==0"/>
            <div class="location" :style="{color:shop_info.index_top_font_color}"
                 v-if="shop_info.index_communityinfo_showtype!=1">
              <div class="location-left" v-if="community&&community.communityName">
                <router-link hoverClass="router-hover" to="/lionfish_comshop/pages/position/community"
                             v-if="hide_community_change_btn==0&&open_danhead_model!=1">
                  <div class="community-title">
                                <span>{{community.communityName}}
                <span class="community-change" v-if="hide_community_change_word==0">切换</span>
                                    <span class="iconfont icon-youjiantou"></span>
                                </span>
                  </div>
                </router-link>
                <div v-else>
                  <div class="community-title">
                    <span>{{community.communityName}}</span>
                  </div>
                </div>
                <div @click="gotoMap" class="community-address" v-if="index_hide_headdetail_address==0">
                  <span class="iconfont icon-weizhi-tianchong"></span>
                  {{community.address||community.communityAddress||community.fullAddress}}
                </div>
              </div>
              <div class="location-left" v-else>
                <router-link hoverClass="router-hover" to="/lionfish_comshop/pages/position/community">
                  您还没有选择{{groupInfo.owner_name}}，轻触去选择
                  <span class="iconfont icon-weizhi-tianchong"></span>
                </router-link>
              </div>
              <div class="location-right">
                <img class="img" :src="(community && community.headImg)?community.headImg:community.disUserHeadImg"/>
                <span>{{community.disUserName}}</span>
              </div>
            </div>
            <div class="location-theme2" :style="{color: shop_info.index_top_font_color}" v-else>
              <div v-if="community&&community.communityName">
                <div class="loc-l">
                  <img class="img" :src="(community&&community.headImg)?community.headImg:community.disUserHeadImg"/>
                </div>
                <div @click="goLink" class="loc-m" data-link="/lionfish_comshop/pages/position/community"
                     v-if="hide_community_change_btn==0&&open_danhead_model!=1">
                  {{community.communityName}}
                  <span style="font-size:12px;" v-if="hide_community_change_word==0">切换</span>
                  <span class="iconfont icon-youjiantou" style="font-size:12px;"></span>
                </div>
                <div class="loc-m" v-else>{{community.communityName}}</div>
              </div>
              <div class="loc-l" v-else>
                <navigator hoverClass="router-hover" url="/lionfish_comshop/pages/position/community">
                  您还没有选择{{groupInfo.owner_name}}，轻触去选择
                  <span class="iconfont icon-weizhi-tianchong"></span>
                </navigator>
              </div>
              <div @click="goLink" class="top-search" data-link="/lionfish_comshop/pages/type/search">
                <span class="iconfont icon-sousuo1"></span>
                搜索
              </div>
            </div>
          </div>
          <div class="blank10"></div>

          <div class="swipe" v-if="slider_list.length>0">
            <swiper :options="sliderSwiperOption" class="swiper-content">
              <swiper-slide class="swiper-slide" v-for="(item,index) in slider_list" :key="index">
                <img :src="item.image" class="show-img" width="100%" height="140px" style="border-radius: 12px"/>
                <i-img :img="item.image"></i-img>
              </swiper-slide>
              <!-- 分页器 -->
              <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
          </div>
          <div class="nav-list" v-if="navigat.length>0">
            <div v-for="(item,id) in navigat" style="width:20%;" class="block">
              <div @click="goNavUrl" class="nav-list-item" :data-idx="id" v-if="item.type!=5">
                <img height="36" class="nav-list-img" :src="item.thumb" width="36"/>
                <div class="nav-list-text">{{item.navname}}</div>
              </div>
              <button class="nav-list-item nav-contact" openType="contact" v-else>

                <img height="36" iClass="nav-list-img" :src="item.thumb" width="36"/>
                <div class="nav-list-text">{{item.navname}}</div>
              </button>
            </div>
            <div style="width:20%;" v-if="navigatEmpty.length" v-for="(item,id) in navigatEmpty"></div>
          </div>
          <div class="promotion" v-if="hasCoupon">
            <div class="slider">
              <div class="slider-wraper">
                <div class="list">
                  <div @click="receiveCoupon" class="card-content list-item" :data-quan_id="item.id"
                       v-for="(item,id) in quan" this.$wx:key="id">
                    <div class="card">
                      <div class="card-price span">
                        <div class="card-price&#45;&#45;unit span">¥</div>
                        <div class="card-price&#45;&#45;num span">{{item.credit}}</div>
                      </div>
                      <div class="card-desc span" v-if="item.limit_money>0">
                        满{{item.limit_money}}元可用
                      </div>
                      <div class="card-desc span" v-else>
                        全场通用
                      </div>
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
              <img :src="notice_setting.horn" v-if="notice_setting.horn"/>

              <svg-icon icon-class="laba" v-else/>

              <swiper :options="skinSwiperOption" class="notice-swipe">
                <swiper-slide class="notice-swipe-item" v-for="(item,index) in notice_list" :key="index">
                  {{item.content}}
                </swiper-slide>
              </swiper>
            </div>
          </div>
          <template is="cube" :data="{data:cube}"></template>
        </div>
        <div class="list-content">
          <i-new-comer bind:openSku="openSku" :refresh="newComerRefresh" :skin="skin"
                       v-if="is_show_new_buy==1"></i-new-comer>
          <template is="pin" :data="{pinList:pinList,skin:skin}"></template>
          <i-spike bind:openSku="openSku" :refresh="{newComerRefresh}" :skin="skin"
                   v-if="is_show_spike_buy==1"></i-spike>
          <template is="seckill"
                    :data="{secRushList:secRushList,skin:skin,scekillTimeList:scekillTimeList,secKillActiveIdx:secKillActiveIdx,secKillGoodsIndex:secKillGoodsIndex,needAuth:needAuth}"
                    v-if="seckill_is_open==1&&seckill_is_show_index==1"></template>
          <i-topic bind:openSku="openSku" :refresh="{couponRefresh}"></i-topic>
          <div class="theme3 bg-f" v-if="typeTopicList.length&&(typeItem.banner||typeItem.list.length)"
               v-for="(typeItem,index) in typeTopicList" :key="typeItem.id">
            <img @click="goLink" class="topic-img" :data-link="'/lionfish_comshop/pages/type/details?id='+typeItem.id"
                 mode="widthFix" :src="typeItem.banner" v-if="typeItem.banner"/>
            <i-rush-spu bind:authModal="authModal" bind:changeCartNum="changeNotListCartNum" bind:openSku="openSku"
                        :canLevelBuy="{canLevelBuy}" class="item" :is_open_vipcard_buy="{is_open_vipcard_buy}"
                        :needAuth="needAuth" :notNum="true" :reduction="reduction" :spuItem="item"
                        :stopClick="stopClick" v-if="typeItem.list.length"></i-rush-spu>
            <div @click="goLink" class="theme3-more"
                 :data-link="'/lionfish_comshop/pages/type/details?id='+typeItem.id" v-if="typeItem.list.length">
              查看全部
              <span class="iconfont icon-youjiantou"></span>
            </div>
          </div>
          <template is="pinrow" :data="{pinList:pinList,skin:skin}"></template>
          <img class="rush-list-title" id="rush-title" :src="index_list_top_image" v-if="index_list_top_image"/>
          <img class="rush-list-title" id="rush-title" src="@/assets/images/rush-title.png" v-else/>

          <div class="search-bar" v-if="index_switch_search==1">
            <div class="search-box">
              <input bindconfirm="goResult" class="ipt" confirmType="搜索" placeholder="搜索商品" type="text"></input>
              <div class="search-icon">
                <span class="iconfont icon-sousuo1"></span>
              </div>
            </div>
          </div>

          <i-tabs :activeIndex="classification.activeIndex" bind:activeIndexChange="classificationChange" data-idx="1"
                  fontColor="#000" iClass="category-list" :tabs="classification.tabs"></i-tabs>

          <div v-if="hide_index_type!=1">
            <div class="sticky-cate" v-if="index_change_cate_btn==1">
              <div v-show="!isShowClassification||tabIdx!==0">
                <i-tabs :activeIndex="classification.activeIndex" bind:activeIndexChange="classificationChange"
                        data-idx="1" fontColor="#000" iClass="category-list" :tabs="classification.tabs"></i-tabs>
              </div>
              <div class="tab-nav-query"></div>
            </div>

            <div :class="['sticky-content', {'sticky-top':isSticky, 'tab-nav-sticky':scrollDirect === 'up'&&isSticky }]"
                 v-else>
              <div class="tab-nav tab-nav-query" style="border-color:'#F75451'">
                <div @click="tabSwitch" :class="['tab-nav-item', (tabIdx===0?'active':'')]" data-idx="0">
                  <img :src="(qgtab.one_select ? qgtab.one_select : '@/assets/images/index-tab-left-active.png')"
                       v-if="tabIdx===0"/>
                  <img :src="(qgtab.one_selected?qgtab.one_selected:'@/assets/images/index-tab-left-disabled.png')"
                       v-else/>
                  <span>{{index_qgtab_text[0]?index_qgtab_text[0]:'正在抢购'}}</span>
                </div>
                <div @click="tabSwitch" :class="['tab-nav-item', (tabIdx===1?'active':'')]" data-idx="1">
                  <img :src="(qgtab.two_select?qgtab.two_select:'@/assets/images/index-tab-right-active.png')"
                       v-if="tabIdx===1"/>
                  <img :src="(qgtab.two_selected?qgtab.two_selected:'@/assets/images/index-tab-right-disabled.png')"
                       v-else/>
                  <span>{{index_qgtab_text[1]?index_qgtab_text[1]:'即将开抢'}}
            </span>
                </div>
                <div class="count-down-content" v-if="tabIdx===0">
                  <i-count-down :clearTimer="stopNotify" countdownClass="count-down" itemClass="item-time"
                                showDay="true" :target="rushEndTime"
                                v-if="rushEndTime && !stopNotify && index_qgtab_counttime!=1">
                    <span class="count-down-left-text">仅剩</span>
                  </i-count-down>
                </div>
              </div>
              <div v-show="!isShowClassification||tabIdx!==0">
                <i-tabs :activeIndex="classification.activeIndex" bind:activeIndexChange="classificationChange"
                        data-idx="1" fontColor="#000" class="category-list" :tabs="classification.tabs"></i-tabs>
              </div>
              <div v-show="!isShowCommingClassification||tabIdx!==1">
                <i-tabs :activeIndex="commingClassification.activeIndex" data-idx="2" fontColor="#000"
                        iClass="category-list" :tabs="classification.tabs"></i-tabs>
              </div>
            </div>
          </div>


          <div class="rush-list-box">
            <div v-if="rushList.length>0&&tabIdx==0">

              <div class="active-item" v-if="rushList.length>0&&theme==0" v-for="(item,index) in rushList" :key="id">
                <div class="list-item-tag-content" v-if="isShowListTimer==1">
                  <div class="empty-1"></div>
                  <div class="empty-2" v-if="item.spuDescribe"></div>
                  <div class="empty-3"></div>
                  <div class="list-item-count-down" :data-xx="item.spuCanBuyNum" :style="{color:skin.color}"
                       v-if="item.spuCanBuyNum!=0&&!actEndMap[item.end_time]">
                    仅剩
                    <em v-if="countDownMap[item.end_time].day>0">{{countDownMap[item.end_time].day}}天</em>
                    <span class="item-class">{{countDownMap[item.end_time].hour}}</span>:
                    <span class="item-class">{{countDownMap[item.end_time].minute}}</span>:
                    <span class="item-class">{{countDownMap[item.end_time].second}}</span>
                  </div>
                </div>
                <i-new-rush-spu :actEnd="actEndMap[item.end_time]" :authModal="authModal" :changeCartNum="changeCartNum"
                                :openSku="openSku" :vipModal="vipModal" :canLevelBuy="canLevelBuy"
                                :changeCarCount="{changeCarCount}" :isShowListCount="{isShowListCount}"
                                :isShowListTimer="(isShowListTimer==1)" :is_open_vipcard_buy="{is_open_vipcard_buy}"
                                :needAuth="needAuth" :reduction="reduction" :showPickTime="(ishow_index_pickup_time==1)"
                                :skin="skin" :spuItem="item" :stopClick="stopClick"></i-new-rush-spu>
              </div>
              <div class="active-item-two" v-if="rushList.length>0&&theme==1" v-for="(item,index) in rushList"
                   :key="item.id">
                <div class="list-item-tag-content" v-if="isShowListTimer==1">
                  <div class="list-item-count-down type-two" :style="{color:skin.color}"
                       v-if="item.spuCanBuyNum!=0&&!actEndMap[item.end_time]">
                    仅剩
                    <em v-if="countDownMap[item.end_time].day>0">{{countDownMap[item.end_time].day}}天</em>
                    <span class="item-class">{{countDownMap[item.end_time].hour}}</span>:
                    <span class="item-class">{{countDownMap[item.end_time].minute}}</span>:
                    <span class="item-class">{{countDownMap[item.end_time].second}}</span>
                  </div>
                </div>
                <i-rush-spu-big :actEnd="actEndMap[item.end_time]" :authModal="authModal" :changeCartNum="changeCartNum"
                                :openSku="openSku" :vipModal="vipModal" :canLevelBuy="canLevelBuy"
                                :changeCarCount="changeCarCount" :isShowListCount="isShowListCount"
                                :is_open_vipcard_buy="is_open_vipcard_buy" :needAuth="needAuth" :reduction="reduction"
                                :showPickTime="ishow_index_pickup_time==1" :skin="skin" :spuItem="item"
                                :stopClick="stopClick"></i-rush-spu-big>
              </div>
              <div class="theme3" v-if="rushList.length>0&&theme==2">
                <img @click="goLink" class="topic-img"
                     :data-link="'/lionfish_comshop/pages/type/details?id='+classificationId" mode="widthFix"
                     :src="cate_info.banner" v-if="cate_info.banner"/>
                <i-rush-spu bind:authModal="authModal" bind:changeCartNum="changeCartNum" bind:openSku="openSku"
                            bind:vipModal="vipModal" :canLevelBuy="canLevelBuy" :changeCarCount="changeCarCount"
                            class="item" :is_open_vipcard_buy="is_open_vipcard_buy" :needAuth="needAuth"
                            :reduction="reduction" :spuItem="item" :stopClick="stopClick"
                            v-for="(item,index) in rushList" this.$wx:key="actId"></i-rush-spu>
              </div>
              <i-load-more iClass="loadMore" :loading="loadMore" :tip="loadText" v-if="loadMore"></i-load-more>
            </div>
            <div v-if="tabIdx===1">
              <div class="comming-list" v-if="commingList.length">
                <i-comming-spu :category="commingClassification.tabs[commingClassification.activeIndex].name"
                               class="comming-spu-item" :spuItem="item" v-if="commingList.length"
                               v-for="(item,index) in commingList"></i-comming-spu>
                <i-load-more iClass="loadMore" :loading="commigLoadMore" :tip="commigTip"
                             v-if="commigLoadMore"></i-load-more>
              </div>
              <div class="none-rush-list" v-if="showCommingEmpty">
                <img class="img-block" src="@/assets/images/icon-index-empty.png"/>
                <div class="h1">暂时没有团购</div>
                <div class="h2">我们正在为您准备更优惠的团购</div>
              </div>
              <div class="slogan" v-if="!commigLoadMore&&commingList.length">
                <img :src="(indexBottomImage?indexBottomImage:'@/assets/images/icon-index-slogan.png')"/>
              </div>
            </div>
            <div v-if="tabIdx===0">
              <div class="none-rush-list" v-if="showEmpty">
                <img class="img-block" src="@/assets/images/icon-index-empty.png"/>
                <div class="h1">暂时没有团购</div>
                <div class="h2">我们正在为您准备更优惠的团购</div>
              </div>
              <div class="slogan" v-if="!loadMore&&rushList.length">
                <img :src="(indexBottomImage?indexBottomImage:'@/assets/images/icon-index-slogan.png')"/>
              </div>
            </div>
          </div>
        </div>
        <div @click="showCopyTextHandle" class="copytext-btn" data-status="true" v-if="ishow_index_copy_text==1">
          一键复制拼团信息
        </div>
        <div class="fixed-aside">
          <button @click="share_handler" class="fixed-service" v-if="isShowShareBtn==1">
            <span class="iconfont icon-fenxiang"></span>
            <div>分享</div>
          </button>
          <button class="fixed-service" openType="contact" v-if="isShowContactBtn==1">
            <span class="iconfont icon-kefu"></span>
            <div>客服</div>
          </button>
          <button @click="backTop" class="fixed-service" v-show="(!isSticky)" v-if="ishow_index_gotop==1">
            <span class="iconfont icon-fanhuidingbu"></span>
            <div>顶部</div>
          </button>
        </div>
        <i-order-notify iClass="order-notify" :stopNotify="stopNotify"
                        v-if="shop_info.order_notify_switch==1"></i-order-notify>
        <i-change-community bind:changeComunity="confrimChangeCommunity" :canChange="hide_community_change_btn==0"
                            changeCommunity="changeCommunity" :community="community" :groupInfo="groupInfo"
                            :visible="showChangeCommunity"></i-change-community>
        <div class="new-coupou" v-if="showCouponModal&&hasAlertCoupon&&!showChangeCommunity">
          <div class="new-coupou-content">
            <div class="new-coupou-body">
              <div class="new-coupou-body-head">恭喜你获得{{totalAlertMoney}}元红包券</div>
              <div class="new-coupou-body-scroll">
                <scroll-div scrollY style="max-height:580px;">
                  <div class="new-coupou-item" v-for="(item ,index) in alert_quan_list" :key="item.id">
                    <div class="m-coupon-l">
                      <div class="m-coupou-price">
                        <span>¥</span>
                        {{item.credit}}
                      </div>
                    </div>
                    <div class="m-coupou-m">
                      <div class="m-coupou-name">{{item.voucher_title}}</div>
                      <div class="m-coupou-title" v-if="item.limit_money>0">满{{item.limit_money}}元可用</div>
                      <div class="m-coupou-title" v-else>全场通用</div>
                    </div>
                    <div class="m-coupou-r">
                      <div @click="goUse" class="new-coupou-use kong" :data-idx="index">去使用</div>
                    </div>
                  </div>
                </scroll-div>
              </div>
              <div class="new-coupou-body-foot">
                <div @click="toggleCoupon" class="new-coupou-body-btn" data-auth="true">立即使用</div>
              </div>
            </div>
            <div class="new-coupou-foot">
              <span @click="toggleCoupon" class="iconfont icon-guanbi"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="forbid i-flex-col i-flex-alc" v-if="isblack==1">
      <span class="iconfont icon-icon-test1"></span>
      <div class="h1">您已被禁止访问</div>
      <div class="h2">请联系管理员</div>
    </div>
    <div class="mask" v-show="false"></div>
    <div cancel="close" class="sku-content" v-show="false" scrollUp="true">
      <div class="sku-card">
        <div @click="closeSku" class="close">
          <img src="@/assets/images/icon-sku-close.png"/>
        </div>
        <div class="sku-header">
          <i-img defaultImage="@/assets/images/placeholder-refund.png" height="80" iClass="sku-img"
                 :loadImage="cur_sku_arr.skuImage" width="80"></i-img>
          <div class="sku-desc">
            <div class="sku-title">
              <span>{{cur_sku_arr.spuName}}</span>
            </div>
            <div class="sku-price">
              <div class="sale-price">
                ¥ <span>{{cur_sku_arr.actPrice[0]}}</span>.{{cur_sku_arr.actPrice[1]}}
              </div>
              <div class="market-price">¥{{cur_sku_arr.marketPrice[0]}}.{{cur_sku_arr.marketPrice[1]}}</div>
              <i-vip-price :price="cur_sku_arr.card_price"
                           v-if="is_open_vipcard_buy==1&&is_vip_card_member==1&&is_take_vipcard==1"></i-vip-price>
              <div v-else-if="is_member_level_buy==1&&is_mb_level_buy==1">
                <i-vip-price :price="cur_sku_arr.levelprice" type="1"
                             v-if="is_open_vipcard_buy==1&&is_vip_card_member!=1"></i-vip-price>
                <i-vip-price :price="cur_sku_arr.levelprice" type="1" v-if="is_open_vipcard_buy!=1"></i-vip-price>
              </div>
            </div>
            <div class="sku-switch-on">已选择：{{cur_sku_arr.spec}}</div>
          </div>
        </div>
        <div class="sku-spec" v-for="(item) in skuList.list">
          <div class="title">{{item.name}}</div>
          <div class="spec-list">
            <span @click="selectSku" :class="(idx==sku[idx]['idx']?'on':'')" :data-disabled="item.canBuyNum-value<0"
                  :data-idx="idx" v-for="(value,idx) in item.option_value">{{value.name}}</span>
          </div>
        </div>
        <div class="sku-num-content">
          <div class="title">数量</div>
          <!--<div :class="['i-class', 'i-input-number', 'i-input-number-size-'+size]">
            <div @click="setNum" :class="['i-input-number-minus', (value <= min?'i-input-number-disabled':'')]" data-type="decrease">
              <img src="@/assets/images/icon-input-reduce.png"></image>
            </div>
            <input bindblur="handleBlur" bindfocus="handleFocus" bindinput="changeNumber" :class="['i-input-number-text',(min>=max?'i-input-number-disabled':'')]" type="number" :value="sku_val"></input>
            <div @click="setNum" :class="['i-input-number-plus', (value>=max?'i-input-number-disabled':'')]" data-type="add">
              <img src="@/assets/images/icon-input-add.png"></image>
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
    <div @click="hide_share_handler" class="ui-mask" v-show="is_share_html"></div>
    <div class="model-services show" v-show="is_share_html">
      <div class="model-services-title">分享</div>
      <div class="model-services-content">
        <div class="service-list">
          <div class="service-item">
            <button class="none_btn" openType="share" plain="true">
              <span class="iconfont icon-weixin2 service-icon"></span>
              <div class="cube-text">
                <span>好友</span>
              </div>
            </button>
          </div>
          <div @click="goLink" class="service-item" data-link="/lionfish_comshop/pages/index/share"
               :data-needauth="true">
            <span class="iconfont icon-pengyouquan service-icon"></span>
            <div class="cube-text">
              <span>海报</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <i-modal :scrollUp="false" :visible="showCopyText">
      <div class="copytext">
        <div class="copytext-title">
          - 团长信息 -
          <span @click="showCopyTextHandle" class="iconfont icon-guanbi copytext-close" :data-status="false"></span>
        </div>
        <div class="copytext-p">小区：{{community.communityName}}</div>
        <div class="copytext-p">团长：{{community.disUserName}}</div>
        <div class="copytext-p">自提点：{{community.address||community.communityAddress||community.fullAddress}}</div>
        <div class="copytext-h3">今日推荐</div>
        <scroll-div scrollY class="copytext-content">
          <div class="copytext-item" v-if="copy_text_arr.length" v-for="(item,index) in copy_text_arr">
            {{index+1}}. 【{{item.goods_name}}】
            <span>团购价{{item.price}}元</span>
          </div>
        </scroll-div>
        <i-button @click="copyText" class="community-content-btn" iClass="btn">一键复制</i-button>
      </div>
    </i-modal>
    <i-new-auth bind:authSuccess="authSuccess" bind:cancel="authModal" :needAuth="needAuth&&showAuthModal"
                :needPosition="needPosition"></i-new-auth>
    <i-vip-modal :imgUrl="pop_vipmember_buyimage" :visible="showVipModal"></i-vip-modal>
    <!--<div class="mp-account" v-if="show_index_wechat_oa==1">
      <official-account binderror="binderror" bindload="bindload"></official-account>
    </div>-->


  </div>
</template>


<script>
  import GlobalMixin from '../../mixin/globalMixin.js'

  var util = require('../../utils'),
    status = require('../../utils'),
    wcache = require('../../utils/wcache.js'),
    countDownInit = require('../../utils/countDown')

  export default {
    mixins: [countDownInit.default, GlobalMixin],
    name: 'Index',
    data() {

      return {
        sliderSwiperOption: {
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
            disableOnInteraction: false
          },
          //开启循环模式
          loop: true
        },
        skinSwiperOption: {
          notNextTick: true,
          direction: 'vertical',   //控制滚动的方向
          paginationClickable: true,
          autoplay: {
            delay: 2000  //这里需要注意，如果想每2秒去自动切换，直接autoplay:2000是失效的，
          },
          loop: true

        },
        loadMore: !0,
        ishow_index_copy_text: 0,
        ishow_index_gotop: 0,
        hide_community_change_btn: 0,
        isShowShareBtn: 0,
        isShowContactBtn: 0,
        needAuth: !1,
        stopClick: !1,
        community: {
          communityAddress: undefined,
          communityId: undefined,
          communityName: undefined,
          disUserHeadImg: undefined,
          disUserName: undefined,
          fullAddress: undefined,
          headImg: undefined,
          head_mobile: undefined,
          lat: undefined,
          lon: undefined
        },
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
        indexBottomImage: '',
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
        index_lead_image: '',
        theme: 0,
        cartNum: 0,
        navigat: [],
        tabIdx: 0,
        scrollDirect: '',
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
          group_name: '社区',
          owner_name: '团长'
        },
        needPosition: !0,
        typeTopicList: [],
        pinList: {},
        cube: [],
        secRushList: [],
        secKillGoodsIndex: 1,
        isblack: 0,
        imageSize: {
          imageWidth: '100%',
          imageHeight: 600
        },
        fmShow: !0,
        cur_sku_arr: {
          stock: 0,
          actPrice: [],
          marketPrice: []
        },
        index_list_top_image: 1,
        is_open_vipcard_buy: true,
        is_member_level_buy: true,
        is_show_new_buy: true,
        is_show_spike_buy: true,
        current: 0,
        size: '',
        sku_val: '',
        showNewCoupon: '',
        hide_top_community: '',
        hasCoupon: '',
        seckill_is_open: true,
        seckill_is_show_index: 1,
        index_switch_search: 1,
        hide_index_type: 0,
        index_qgtab_text: '',
        qgtab: {},
        rushEndTime: true,
        pop_vipmember_buyimage:'',
        showVipModal:false,
        showCopyTextHandle:false,
        hide_share_handler:false,
        is_mb_level_buy:false,
        is_vip_card_member:false,
        is_mb_level_buy:false,
        $data: {
          stickyFlag: !1,
          scrollTop: 0,
          overPageNum: 1,
          loadOver: !1,
          hasOverGoods: !1,
          countDownMap: {},
          actEndMap: {},
          timer: {},
          scrollHeight: 1300,
          stickyTop: 0,
          hasCommingGoods: !0
        }
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
    created: function() {
      this.community = {}
      const i = this
      const s = this.$wx.getStorageSync('token')
      this.$wx.getLogManager(), this.$wx.hideTabBar()
      status.setNavBgColor(), status.setGroupInfo().then(function(t) {
        i.groupInfo = t
      }), console.log('step1')
      const n = this.$wx.getStorageSync('community'),
        d = n && n.communityId ? n.communityId : ''
      if (n && n.fullAddress && n.fullAddress.indexOf('境外') > -1) {
        n.fullAddress = n.fullAddress.replace('境外境外境外地区', '')
      }

      const o = this.$route.query

      if (o && 0 != Object.keys(o).length) {
        console.log('step2')
        var t = decodeURIComponent(o.scene)
        if ('undefined' != t) {
          var a = t.split('_')
          o.community_id = a[0], wcache.put('share_id', a[1])
        }
        'undefined' != (i.options = o).share_id && 0 < o.share_id && wcache.put('share_id', o.share_id),
          'undefined' != o.community_id && 0 < o.community_id ? (console.log('step3'), util.getCommunityById(o.community_id).then(function(t) {
            if (0 == t.code) {
              console.log('step4')
              var a = t.data
              console.log('分享community_id' + o.community_id), console.log('历史community_id' + d)

              1 == t.open_danhead_model ? (console.log('开启单社区' + t.default_head_info), i.community = t.default_head_info,
                i.open_danhead_model = t.open_danhead_model, s && i.addhistory(t.default_head_info.communityId || '')) : a && (o.community_id != d ? d ? (i.showChangeCommunity = !0,
                i.changeCommunity = a, i.community = n) : (i.community = a, i.shareCommunity = a,
                wcache.put('community', a)) : i.community = n), i.hidetip = !1, i.token = s, i.showEmpty = !1,
                i.needPosition = !1, i.setData(e, function() {
                i.loadPage()
              })
            } else {
              console.log('step5')
              i.loadPage()
              this.hidetip = !1
              this.token = s
              this.showEmpty = !1
              this.needPosition = !1
            }
            s && i.addhistory()
          })) : util.getCommunityById(o.community_id).then(function(t) {
            0 == t.code && (1 == t.open_danhead_model && (console.log('开启单社区step6'), i.setData({
              community: t.default_head_info,
              open_danhead_model: t.open_danhead_model
            }), s && i.addhistory(t.default_head_info.communityId || '')), console.log('step6'),
              i.loadPage())
          }).catch(function() {
            i.loadPage()
          })
      } else {
        util.getCommunityById(o.community_id).then(function(t) {
          0 == t.code && (1 == t.open_danhead_model && (console.log('开启单社区step7'), i.setData({
            community: t.default_head_info,
            open_danhead_model: t.open_danhead_model
          }), s && i.addhistory(t.default_head_info.communityId || '')), i.loadPage())
        }).catch(function() {
          i.loadPage()
        })
        this.hidetip = !1,
          this.token = s,
          this.showEmpty = !1,
          this.community = n
      }

    },

    mounted: function() {
      this.$store.dispatch('app/hideToolbarBack')
      this.$store.dispatch('app/hideToolbarMore')
      this.$store.dispatch('app/showTabbar')
      this.skin = this.$getApp().globalData.skin
      this.getBg()

      this.loadGpsGoodsList()

    },
    methods: {
      copyText: function(t) {

      },

      get_index_info() {

        this.$http({
          controller: 'index.index_info',
          communityId: 4559
        }).then(response => {
          //this.$set(this.$data,"title",response.title);

          var p = response.category_list || [],
            _ = response.index_type_first_name || '全部'
          if (0 < p.length) {
            p.unshift({
              name: _,
              id: 0
            })
            this.isShowClassification = true
            this.classification.tabs = p
          } else {
            this.isShowClassification = false
          }

          this.comming_goods_total = response.comming_goods_total
          this.common_header_backgroundimage = response.common_header_backgroundimage
          this.cube = response.cube
          this.diypage = response.diypage
          this.hide_community_change_btn = response.hide_community_change_btn
          this.hide_community_change_word = response.hide_community_change_word
          this.hide_index_type = response.hide_index_type
          this.hide_top_community = response.hide_top_community
          this.index_bottom_image = response.index_bottom_image
          this.index_change_cate_btn = response.index_change_cate_btn
          this.index_communityinfo_showtype = response.index_communityinfo_showtype
          this.index_hide_headdetail_address = response.index_hide_headdetail_address
          this.index_lead_image = response.index_lead_image
          this.index_list_top_image = response.index_list_top_image
          this.index_list_top_image_on = response.index_list_top_image_on
          this.index_loading_image = response.index_loading_image
          this.index_qgtab_counttime = response.index_qgtab_counttime
          this.index_qgtab_text = response.index_qgtab_text
          this.index_service_switch = response.index_service_switch
          this.index_share_switch = response.index_share_switch
          this.index_switch_search = response.index_switch_search
          this.index_top_font_color = response.index_top_font_color
          this.index_top_img_bg_open = response.index_top_img_bg_open
          this.index_type_first_name = response.index_type_first_name
          this.index_video_arr = response.index_video_arr
          this.is_community = response.is_community
          this.is_comunity_rest = response.is_comunity_rest
          this.is_quan = response.is_quan
          this.is_show_list_count = response.is_show_list_count
          this.is_show_list_timer = response.is_show_list_timer
          this.is_show_new_buy = response.is_show_new_buy
          this.is_show_spike_buy = response.is_show_spike_buy
          this.ishow_index_copy_text = response.ishow_index_copy_text
          this.ishow_index_gotop = response.ishow_index_gotop
          this.ishow_index_pickup_time = response.ishow_index_pickup_time
          this.nav_bg_color = response.nav_bg_color
          this.nav_list = response.nav_list
          this.notice_list = response.notice_list
          this.notice_setting = response.notice_setting
          this.open_diy_index_page = response.open_diy_index_page
          this.order_notify_switch = response.order_notify_switch
          this.postion = response.postion
          this.qgtab = response.qgtab
          this.rushtime = response.rushtime
          this.scekill_time_arr = response.scekill_time_arr
          this.seckill_bg_color = response.seckill_bg_color
          this.seckill_is_open = response.seckill_is_open
          this.seckill_is_show_index = response.seckill_is_show_index
          this.shoname = response.shoname
          this.shop_index_share_image = response.shop_index_share_image
          this.show_index_wechat_oa = response.show_index_wechat_oa
          this.slider_list = response.slider_list
          this.spike_data = response.spike_data
          this.theme = response.theme
          this.title = response.title
          this.$store.state.app.toolbarTitle = response.title
        })
      },
      get_type_topic: function() {
        var e = this,
          t = this.$wx.getStorageSync('community')

        e.$http({
          controller: 'goods.get_category_col_list',
          head_id: t.communityId
        }).then(t => {
          if (0 == t.code) {
            var a = t.data || []
            this.typeTopicList = a
          }
        })
      },
      getCoupon: function() {
        var n = this,
          t = this.$wx.getStorageSync('token')
        n.$http({
          controller: 'goods.get_seller_quan',
          token: t
        }).then(t => {

          var a = t.quan_list,
            e = !1,
            o = !1
          '[object Object]' == Object.prototype.toString.call(a) && 0 < Object.keys(a).length && (e = !0),
          '[object Array]' == Object.prototype.toString.call(a) && 0 < a.length && (e = !0)
          var i = t.alert_quan_list || []
          '[object Object]' == Object.prototype.toString.call(i) && 0 < Object.keys(i).length && (o = !0),
          '[object Array]' == Object.prototype.toString.call(i) && 0 < i.length && (o = !0)
          var s = 0
          '[object Object]' == Object.prototype.toString.call(i) && 0 < Object.keys(i).length ? Object.keys(i).forEach(function(t) {
            s += 1 * i[t].credit
          }) : '[object Array]' == Object.prototype.toString.call(i) && 0 < i.length && i.forEach(function(t) {
            s += 1 * t.credit
          })

          n.quan = t.quan_list || []
          n.alert_quan_list = i
          n.hasCoupon = e
          n.hasAlertCoupon = o
          n.showCouponModal = o
          n.totalAlertMoney = s.toFixed(2)
        })

      }, getPinList: function() {
        var d = this,
          t = this.$wx.getStorageSync('community').communityId || ''

        d.$http({
          controller: 'group.get_pintuan_list',
          is_index: 1,
          head_id: t
        }).then(t => {
          if (0 == t.code) {
            var a = {},
              e = t,
              o = e.list,
              i = e.pintuan_index_coming_img,
              s = e.pintuan_index_show,
              n = e.pintuan_index_show_listtop
            a.list = o || [], a.img = i || '', a.show = s || 0, a.showRow = n || 0
            this.pinList = a
          }
        })

      },
      getBg() {

        this.$http({
          controller: 'index.get_newauth_bg',
          communityId: 4559
        }).then(response => {
          this.newauth_bg_image = response.data.newauth_bg_image
          this.newauth_cancel_image = response.data.newauth_cancel_image
          this.newauth_confirm_image = response.data.newauth_confirm_image

        })
      },
      addhistory: function() {
        var a = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 0
        console.log('step13')
        var t = 0
        0 == a ? t = wx.getStorageSync('community').communityId : t = a
        console.log('history community_id=' + t)
        var e = wx.getStorageSync('token'),
          o = this
        void 0 !== t && app.util.request({
          url: 'entry/wxapp/index',
          data: {
            controller: 'index.addhistory_community',
            community_id: t,
            token: e
          },
          dataType: 'json',
          success: function(t) {
            0 != a && (o.getHistoryCommunity(), console.log('addhistory+id', a))
          }
        })
      },
      loadPage() {
        this.$wx.showLoading(), console.log('step8')
        var e = this
        e.get_index_info(), e.get_type_topic(), e.getNavigat(), e.getCoupon(), e.getPinList(),
          status.loadStatus().then(function() {
            var t = this.$getApp().globalData.appLoadStatus
            if (console.log('appLoadStatus', t), 0 == t) {
              setTimeout(function() {
                this.$wx.hideLoading()
              }, 1e3), e.setData({
                needAuth: !0,
                couponRefresh: !1
              }), e.load_goods_data()
            } else if (2 == t) {
              console.log('step9'), e.getHistoryCommunity()
            } else {
              console.log('step12')
              var a = this.$wx.getStorageSync('community')
              a || (a = this.$getApp().globalData.community),
                a ? this.community = e.fliterCommunity(a) : util.getCommunityInfo().then(function(t) {
                  this.community = e.fliterCommunity(t)
                }), console.log('step18'), e.load_goods_data()
            }
          })
      },
      load_goods_data: function() {
        var t = wx.getStorageSync('token'),
          m = this,
          a = wx.getStorageSync('community'),
          e = m.classificationId
        this.$data.isLoadData = !0, console.log('load_goods_begin '), m.hasRefeshin || m.$data.loadOver ? m.load_over_gps_goodslist() : (console.log('load_goods_in '),
          this.hasRefeshin = !0, m.setData({
          loadMore: !0
        }), this.$http({
          controller: 'index.load_gps_goodslist',
          token: t,
          pageNum: m.data.pageNum,
          head_id: a.communityId,
          gid: e,
          per_page: 12
        }).then(t => {
          if (1 == m.pageNum &&
          (this.cate_info = t.cate_info || {})
            , 0 == t.code) {
            var a = ''
            if (1 == t.is_show_list_timer) {
              for (var e in a = m.transTime(t.list),
                m.$data.countDownMap) {
                m.initCountDown(m.$data.countDownMap[e])
              }
            } else {
              var o = m.rushList
              a = o.concat(t.list)
            }
            var i = t,
              s = i.full_money,
              n = i.full_reducemoney,
              d = i.is_open_fullreduction,
              c = i.is_open_vipcard_buy,
              l = i.is_vip_card_member,
              r = i.is_member_level_buy,
              u = {
                full_money: s,
                full_reducemoney: n,
                is_open_fullreduction: d
              },
              h = !1
            1 == c ? 1 != l && 1 == r && (h = !0) : 1 == r && (h = !0), 1 == m.pageNum &&
            (m.copy_text_arr = i.copy_text_arr || []), m.hasRefeshin = !1, (
              m.rushList = a,
                m.pageNum = m.data.pageNum + 1,
                m.loadMore = !1,
                m.reduction = u,
                m.tip = '',
                m.is_open_vipcard_buy = c || 0,
                m.is_vip_card_member = l,
                m.is_member_level_buy = r,
                m.canLevelBuy = h
            ), function() {
              1 == m.isFirst && (m.isFirst++, a.length && !m.$data.stickyTop && (m.$wx.createSelectorQuery().select('.tab-nav-query').boundingClientRect(function(t) {
                if (t && t.top) {
                  wcache.put('tabPos', t), m.$data.stickyTop = t.top + t.height, m.$data.stickyBackTop = t.top
                } else {
                  var a = wcache.get('tabPos', !1)
                  a && (m.$data.stickyTop = a.top + a.height, m.$data.stickyBackTop = a.top)
                }
              }).exec(), m.$data.scrollTop > m.$data.stickyTop && wx.pageScrollTo({
                duration: 0,
                scrollTop: m.$data.stickyTop + 4
              }))), m.getScrollHeight(), 2 == m.data.pageNum && t.data.list.length < 10 && (console.log('load_over_goods_list_begin'),
                m.$data.loadOver = !0, m.hasRefeshin = !0, m.setData({
                loadMore: !0
              }, function() {
                m.load_over_gps_goodslist()
              }))
            }
          } else {
            1 == t.data.code ? (m.$data.loadOver = !0, m.load_over_gps_goodslist()) : 2 == t.data.code && m.setData({
              needAuth: !0,
              couponRefresh: !1
            })
          }
        }))
      },
      load_over_gps_goodslist: function() {
        var t = wx.getStorageSync('token'),
          o = this,
          a = wx.getStorageSync('community'),
          e = o.classificationId
        !o.$data.hasOverGoods && o.$data.loadOver ? (o.$data.hasOverGoods = !0, (o.loadMore = !0),
          o.$http({
            controller: 'index.load_over_gps_goodslist',
            token: t,
            pageNum: o.$data.overPageNum,
            head_id: a.communityId,
            gid: e,
            is_index_show: 1
          }).then(t => {

            if (0 == t.code) {
              var a = o.transTime(t.list)
              for (var e in o.$data.countDownMap) o.initCountDown(o.$data.countDownMap[e])
              o.$data.hasOverGoods = !1, o.$data.overPageNum += 1, o.setData({
                rushList: a,
                loadMore: !1,
                tip: ''
              }, function() {
                1 == o.isFirst && (o.isFirst++, a.length && !o.$data.stickyTop && (o.$wx.createSelectorQuery().select('.tab-nav-query').boundingClientRect(function(t) {
                  if (t && t.top) {
                    wcache.put('tabPos', t), o.$data.stickyTop = t.top + t.height, o.$data.stickyBackTop = t.top
                  } else {
                    var a = wcache.get('tabPos', !1)
                    a && (o.$data.stickyTop = a.top + a.height, o.$data.stickyBackTop = a.top)
                  }
                }).exec(), o.$data.scrollTop > o.$data.stickyTop && o.$wx.pageScrollTo({
                  duration: 0,
                  scrollTop: o.$data.stickyTop + 4
                }))), o.getScrollHeight()
              })
            } else {
              1 == t.code ? (1 == o.$data.overPageNum && 0 == o.data.rushList.length && o.setData({
                showEmpty: !0
              }), o.setData({
                loadMore: !1,
                tip: '^_^已经到底了'
              })) : 2 == t.code && o.setData({
                needAuth: !0,
                couponRefresh: !1
              })
            }
            o.$data.isLoadData = !1

          })) : o.$data.isLoadData = !1
      },
      transTime: function(t) {
        var a = this
        return 0 === (1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0) && t.map(function(t) {
          t.end_time *= 1e3, a.$data.countDownMap[t.end_time] = t.end_time == 0 ? '' : t.end_time, a.$data.actEndMap[t.end_time] = (t.end_time <= new Date().getTime() && t.end_time != 0) || 0 == t.spuCanBuyNum

        }), a.rushList.concat(t)

      }
      ,
      fliterCommunity: function(t) {
        if (t && t.fullAddress && t.fullAddress.indexOf('境外') > -1) {
          t.fullAddress = t.fullAddress.replace('境外境外境外地区', '')
        }
        var a = t && t.fullAddress && t.fullAddress.split('省')
        console.log(a, 'fsdfs')
        return a ? Object.assign({}, t, {
          address: a[1] || a[0]
        }) : t
      }
      ,
      getNavigat() {
        this.$http({
          controller: 'index.get_navigat'
        }).then(response => {

          var a = response.data || [],
            e = []
          if (0 < a.length) {
            var o = 5 - a.length % 5 || 0
            o < 5 && 0 < o && (e = new Array(o))
          }

          this.navigat = a
          this.navigatEmpty = e

        })
      }
      ,
      loadGpsGoodsList() {
        this.$http({
          controller: 'index.load_gps_goodslist',
          gid: 0,
          pageNum: 1,
          head_id: 4559,
          per_page: 12
        }).then(response => {

          this.rushList = this.rushList.concat(response.list)

        })

      }
      ,
      tabSwitch: function(t) {
        var a = this,
          e = 1 * t.currentTarget.dataset.idx
        this.tabIdx = e

        1 == e && (a.$data.stickyFlag && a.$data.scrollTop != a.$data.stickyTop + 5 && this.$wx.pageScrollTo({
          scrollTop: a.$data.stickyTop + 5,
          duration: 0
        }), 1 == a.tpage && a.getCommingList())
      }
      ,
      handleProxy: function() {
        clearTimeout(timerOut), this.setData({
          isTipShow: !1,
          isShowGuide: !0
        }), wcache.put('inNum', 4)
      },
      handleHideProxy: function() {
        this.setData({
          isTipShow: !1,
          isShowGuide: !1
        })
      },
      gotoMap: function() {
        var t = this.community
        console.log(t.communityId)
        this.$http({
          controller: 'index.get_community_position',
          communityId: t.communityId
        }).then(t => {
          var a = t.postion;
          var e = parseFloat(a.lon);
          var o = parseFloat(a.lat);
          var i = t.disUserName;
          var s = t.fullAddress + "(" + t.communityName + ")";
          this.$wx.openLocation({
            latitude: o,
            longitude: e,
            name: i,
            address: s,
            scale: 28
          });

        })
      },
      openSku:function(t) {

      },
      closeSku: function() {
        this.visible = 0
        this.stopClick = !1
      },
      goLink:function() {
        var a = t.currentTarget.dataset.link,
          e = t.currentTarget.dataset.needauth || "";
        console.log(e), e && !this.authModal() || a && this.$wx.navigateTo({
          url: a
        });
      },
      authModal: function() {
        var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {},
          a = t && t.detail || this.data.needAuth;
        return !this.needAuth && !t.detail || (this.setData({
          showAuthModal: !this.showAuthModal,
          needAuth: a
        }), !1);
      },

    }
  }

</script>

<style scoped>
  @import 'index.less';
</style>




