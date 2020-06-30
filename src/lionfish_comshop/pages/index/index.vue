<template>
  <div class="page">
    <div v-if="loadOver && isblack!=1">

      <div :class="['index-box', 'pb100', (showNewCoupon?'preventTouchMove':'')]">
        <div class="miniAppTip" v-if="isTipShow">
          <div @click="handleProxy" class="add-myapp">
            <span>$t('index.desktop')</span>
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
                <span class="community-change" v-if="hide_community_change_word==0">$t('index.change')</span>
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
                  $t('index.not_choose'){{groupInfo.owner_name}}， $t('index.to_choose')
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
                $t('index.search')
              </div>
            </div>
          </div>
          <div class="blank10"></div>

          <div class="swipe" v-if="slider_list.length>0">
            <swiper :options="sliderSwiperOption" class="swiper-content">
              <swiper-slide class="swiper-slide" v-for="(item,index) in slider_list" :key="index">
                <img :src="item.image" class="show-img-index" width="100%" height="140px" style="border-radius: 12px"/>
              </swiper-slide>
              <!-- 分页器 -->
              <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
          </div>
          <div class="nav-list" v-if="navigat.length>0">
            <div v-for="(item,idx) in navigat" style="width:20%;" class="block" :key="item.id">
              <div @click="goNavUrl" class="nav-list-item" :data-idx="idx" v-if="item.type!=5">
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
                       v-for="(item,index) in quan" :key="item.id">
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
            <div class="top-msg" :style="{color:skin.color}">
              <img :src="notice_setting.horn" v-if="notice_setting.horn"/>
              <span class="iconfont icon-laba" v-else></span>

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
          <i-new-comer @openSku="openSku" :refresh="newComerRefresh" :skin="skin"
                       v-if="is_show_new_buy==1"></i-new-comer>
          <template is="pin" :data="{pinList:pinList,skin:skin}"></template>
          <i-spike @openSku="openSku" :refresh="newComerRefresh" :skin="skin"
                   v-if="is_show_spike_buy==1"></i-spike>
          <template is="seckill"
                    :data="{secRushList:secRushList,skin:skin,scekillTimeList:scekillTimeList,secKillActiveIdx:secKillActiveIdx,secKillGoodsIndex:secKillGoodsIndex,needAuth:needAuth}"
                    v-if="seckill_is_open==1&&seckill_is_show_index==1"></template>
          <i-topic @openSku="openSku" :refresh="couponRefresh"></i-topic>
          <div class="theme3 bg-f" v-if="typeTopicList.length&&(typeItem.banner||typeItem.list.length)"
               v-for="(typeItem,index) in typeTopicList" :key="typeItem.id">
            <img @click="goLink" class="topic-img" :data-link="'/lionfish_comshop/pages/type/details?id='+typeItem.id"
                 mode="widthFix" :src="typeItem.banner" v-if="typeItem.banner"/>
            <i-rush-spu @authModal="authModal" @changeCartNum="changeNotListCartNum" @openSku="openSku"
                        :canLevelBuy="{canLevelBuy}" class="item" :is_open_vipcard_buy="is_open_vipcard_buy"
                        :needAuth="needAuth" :notNum="true" :reduction="reduction" :spuItem="item"
                        :stopClick="stopClick" v-if="typeItem.list.length"></i-rush-spu>
            <div @click="goLink" class="theme3-more"
                 :data-link="'/lionfish_comshop/pages/type/details?id='+typeItem.id" v-if="typeItem.list.length">
              查看全部
              <span class="iconfont icon-youjiantou"></span>
            </div>
          </div>
          <template is="pinrow" :data="{pinList:pinList,skin:skin}"></template>
          <img class="rush-list-title" id="rush-title" :src="shop_info.index_list_top_image"
               v-if="shop_info.index_list_top_image"/>
          <img class="rush-list-title" id="rush-title" src="@/assets/images/rush-title.png" v-else/>

          <div class="search-bar" v-if="index_switch_search==1">
            <div class="search-box">
              <input bindconfirm="goResult" class="ipt" confirmType="搜索" placeholder="搜索商品" type="text"></input>
              <div class="search-icon">
                <span class="iconfont icon-sousuo1"></span>
              </div>
            </div>
          </div>



          <div v-if="hide_index_type!=1">
            <div class="sticky-cate_index" v-if="index_change_cate_btn==1">
              <div v-show="!isShowClassification||tabIdx!==0">
                <i-tabs :activeIndex="classification.activeIndex" @activeIndexChange="classificationChange"
                        data-idx="1" fontColor="#000" iClass="category-list" :tabs="classification.tabs"></i-tabs>
              </div>
              <div class="tab-nav-index-query"></div>
            </div>

            <div :class="['sticky-content-index', {'sticky-top':isSticky, 'tab-nav-index-sticky':scrollDirect === 'up'&&isSticky }]"
                 v-else>
              <div class="tab-nav-index tab-nav-index-query" :style="{'border-color':skin.color}">
                <div @click="tabSwitch" :class="['tab-nav-index-item', (tabIdx===0?'active':'')]" data-idx="0">
                  <img :src="(qgtab.one_select ? qgtab.one_select : require('@/assets/images/index-tab-left-active.png'))"
                       v-if="tabIdx===0"/>
                  <img :src="(qgtab.one_selected?qgtab.one_selected:require('@/assets/images/index-tab-left-disabled.png'))"
                       v-else/>
                  <span>{{index_qgtab_text[0]?index_qgtab_text[0]:'"$t('index.buying')'}}</span>
                </div>
                <div @click="tabSwitch" :class="['tab-nav-index-item', (tabIdx===1?'active':'')]" data-idx="1">
                  <img :src="(qgtab.two_select?qgtab.two_select:require('@/assets/images/index-tab-right-active.png'))"
                       v-if="tabIdx===1"/>
                  <img :src="(qgtab.two_selected?qgtab.two_selected:require('@/assets/images/index-tab-right-disabled.png'))"
                       v-else/>
                  <span>{{index_qgtab_text[1]?index_qgtab_text[1]:'$t('index.to_buy')'}}
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
                <i-tabs :activeIndex="classification.activeIndex" @activeIndexChange="classificationChange"
                        data-idx="1" fontColor="#000" class="category-list" :tabs="classification.tabs"></i-tabs>
              </div>
              <div v-show="!isShowCommingClassification||tabIdx!==1">
                <i-tabs :activeIndex="commingClassification.activeIndex" @activeIndexChange="classificationChange" data-idx="2" fontColor="#000"
                        iClass="category-list" :tabs="classification.tabs"></i-tabs>
              </div>
            </div>
          </div>


          <div class="rush-list-box">
            <div v-if="rushList.length>0&&tabIdx==0">

              <div class="active-item" v-if="rushList.length>0&&theme==0" v-for="(item,index) in rushList"
                   :key="item.id">
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
                <i-new-rush-spu :actEnd="actEndMap[item.end_time]" @authModal="authModal" :changeCartNum="changeCartNum"
                                @openSku="openSku" @vipModal="vipModal" :canLevelBuy="canLevelBuy"
                                :changeCarCount="changeCarCount" :isShowListCount="isShowListCount"
                                :isShowListTimer="isShowListTimer==1" :is_open_vipcard_buy="is_open_vipcard_buy"
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
                                @openSku="openSku" @vipModal="vipModal" :canLevelBuy="canLevelBuy"
                                :changeCarCount="changeCarCount" :isShowListCount="isShowListCount"
                                :is_open_vipcard_buy="is_open_vipcard_buy" :needAuth="needAuth" :reduction="reduction"
                                :showPickTime="ishow_index_pickup_time==1" :skin="skin" :spuItem="item"
                                :stopClick="stopClick"></i-rush-spu-big>
              </div>
              <div class="theme3" v-if="rushList.length>0&&theme==2">
                <img @click="goLink" class="topic-img"
                     :data-link="'/lionfish_comshop/pages/type/details?id='+classificationId" mode="widthFix"
                     :src="cate_info.banner" v-if="cate_info.banner"/>
                <i-rush-spu @authModal="authModal" @changeCartNum="changeCartNum" @openSku="openSku"
                            @vipModal="vipModal" :canLevelBuy="canLevelBuy" :changeCarCount="changeCarCount"
                            class="item" :is_open_vipcard_buy="is_open_vipcard_buy" :needAuth="needAuth"
                            :reduction="reduction" :spuItem="item" :stopClick="stopClick"
                            v-for="(item,index) in rushList" :key="actId"></i-rush-spu>
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
                <img :src="(indexBottomImage?indexBottomImage:require('@/assets/images/icon-index-slogan.png'))"/>
              </div>
            </div>
            <div v-if="tabIdx===0">
              <div class="none-rush-list" v-if="showEmpty">
                <img class="img-block" src="@/assets/images/icon-index-empty.png"/>
                <div class="h1">暂时没有团购</div>
                <div class="h2">我们正在为您准备更优惠的团购</div>
              </div>
              <div class="slogan" v-if="!loadMore&&rushList.length">
                <img :src="(indexBottomImage?indexBottomImage:require('@/assets/images/icon-index-slogan.png'))"/>
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

        <i-tabbar @authModal="authModal" :cartNum="cartNum" currentIdx="0" :needAuth="needAuth"
                  :tabbarRefresh="tabbarRefresh"></i-tabbar>

        <i-order-notify iClass="order-notify" :stopNotify="stopNotify"
                        v-if="shop_info.order_notify_switch==1"></i-order-notify>
        <i-change-community @changeComunity="confrimChangeCommunity" :canChange="hide_community_change_btn==0"
                            :changeCommunity="changeCommunity" :community="community" :groupInfo="groupInfo"
                            :visible="showChangeCommunity"></i-change-community>
        <div class="new-coupou" v-if="showCouponModal&&hasAlertCoupon&&!showChangeCommunity">
          <div class="new-coupou-content">
            <div class="new-coupou-body">
              <div class="new-coupou-body-head">恭喜你获得{{totalAlertMoney}}元红包券</div>
              <div class="new-coupou-body-scroll">
                <div scrollY style="max-height:580px;">
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
                </div>
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
    <div class="mask" v-if="visible"></div>
    <div cancel="close" class="sku-content" v-if="visible" scrollUp="true">
      <div class="sku-card">
        <div @click="closeSku" class="close">
          <img src="@/assets/images/icon-sku-close.png"/>
        </div>
        <div class="sku-header">

          <van-image class="sku-img" :src="cur_sku_arr.skuImage">
            <template v-slot:loading>
              <van-loading type="spinner" size="20" />
            </template>
          </van-image>


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
        <div class="sku-spec" v-for="(item,index) in skuList.list">
          <div class="title">{{item.name}}</div>
          <div class="spec-list">
            <span @click="selectSku" :data-sku="sku[index].idx" :class="idx==sku[index].idx?'on':''"
                  :data-disabled="(item.canBuyNum-valitem)<0"
                  :data-idx="idx" :data-type="index + '_' + idx + '_' + valitem.option_value_id + '_' + valitem.name"
                  v-for="(valitem, idx) in item.option_value" :key="idx">{{valitem.name}}</span>
          </div>
        </div>
        <div class="sku-num-content">
          <div class="title">数量</div>
          <div :class="['i-class', 'i-input-number', 'i-input-number-size-']">
            <div @click="setNum" :class="['i-input-number-minus']"
                 data-type="decrease">
              <img src="@/assets/images/icon-input-reduce.png"></image>
            </div>
            <input bindblur="handleBlur" bindfocus="handleFocus" bindinput="changeNumber"
                   :class="['i-input-number-text']" type="number"
                   :value="sku_val"/>
            <div @click="setNum" :class="['i-input-number-plus']"
                 data-type="add">
              <img src="@/assets/images/icon-input-add.png"></image>
            </div>
          </div>
          <!--&lt;!&ndash;<div class="msg" v-if="current && skuList[current] && skuList[current].isLimit">
            <span v-if="skuList[current].limitMemberNum>-1">每人限{{skuList[current].limitMemberNum}}单</span>
            <span v-if="skuList[current].limitOrderNum>-1">每单限{{skuList[current].limitOrderNum}}份</span>
            <span></span>
          </div>&ndash;&gt;
          &lt;!&ndash;<div class="even-num" v-elif="!skuList[current].isLimit&&skuList[current].canBuyNum_value<=10&&skuList[current].canBuyNum_value>-1">
            还可以购买 {{skuList[current].canBuyNum-value}} 件
          </div>&ndash;&gt;-->
        </div>
        <button @click="gocarfrom" class="sku-confirm" :disabled="(cur_sku_arr.stock==0?true:false)" formType="submit">
          <div>{{cur_sku_arr.stock==0?'已抢光':'确定'}}</div>
        </button>
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
        <div scrollY class="copytext-content">
          <div class="copytext-item" v-if="copy_text_arr.length" v-for="(item,index) in copy_text_arr">
            {{index+1}}. 【{{item.goods_name}}】
            <span>团购价{{item.price}}元</span>
          </div>
        </div>
        <i-button @click="copyText" class="community-content-btn" iClass="btn">一键复制</i-button>
      </div>
    </i-modal>
    <i-new-auth @authSuccess="authSuccess" @cancel="authModal" :needAuth="needAuth&&showAuthModal"
                :needPosition="needPosition"></i-new-auth>
    <i-vip-modal :imgUrl="pop_vipmember_buyimage" :visible="showVipModal"></i-vip-modal>
    <!--<div class="mp-account" v-if="show_index_wechat_oa==1">
      <official-account binderror="binderror" bindload="bindload"></official-account>
    </div>-->


  </div>
</template>


<script>
  import GlobalMixin from '../../mixin/globalMixin.js'

  var _Page, _extends = Object.assign || function(t) {
    for (var a = 1; a < arguments.length; a++) {
      var e = arguments[a]
      for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o])
    }
    return t
  }

  function _defineProperty(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
      value: e,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : t[a] = e, t
  }
  import util from '../../utils/index.js'
  import status from '../../utils/index.js'
  import a from '../../utils/public'

  var
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
        stopClick: !1,
        showAuthModal: !1,
        changeCarCount:!1,
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
        needAuth: !1,
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
        sku: [],
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
        pop_vipmember_buyimage: '',
        showVipModal: false,
        showCopyTextHandle: false,
        hide_share_handler: false,
        is_mb_level_buy: false,
        is_vip_card_member: false,
        is_mb_level_buy: false,
        visible: !1,
        changeCommunity: {},
        loadOver:!1,
        loadText:'Loading...',
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
      var i = this, s = i.$wx.getStorageSync('token')

      i.$wx.getLogManager(), console.log('options', o), i.$wx.hideTabBar()
      status.setNavBgColor(), status.setGroupInfo().then(function(t) {
        i.groupInfo = t
      }), console.log('step1')

      const n = i.$wx.getStorageSync('community'),
        d = n && n.communityId ? n.communityId : ''
      if (n && n.fullAddress && n.fullAddress.indexOf('境外') > -1) {
        n.fullAddress = n.fullAddress.replace('境外境外境外地区', '')
      }

      const o = i.$route.query

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
              console.log('分享community_id', o.community_id), console.log('历史community_id', d)
              var e = {}
              1 == t.open_danhead_model ? (console.log('开启单社区' + t.default_head_info), this.community = t.default_head_info,
                i.open_danhead_model = t.open_danhead_model, s && i.addhistory(t.default_head_info.communityId || '')) : a && (o.community_id != d ? d ? (i.showChangeCommunity = !0,
                i.changeCommunity = a, this.community = n) : (i.community = a, i.shareCommunity = a,
                wcache.put('community', a)) : i.community = n), i.hidetip = !1, i.token = s, i.showEmpty = !1,
                e.needPosition = !1
              i.loadPage()
            } else {
              console.log('step5')
              i.loadPage()
              i.hidetip = !1
              i.token = s
              i.showEmpty = !1
              i.needPosition = !1
              s && i.addhistory()
            }
          })) : util.getCommunityById(o.community_id).then(function(t) {
            0 == t.code && (1 == t.open_danhead_model && (console.log('开启单社区step6'),
              i.community = t.default_head_info, i.open_danhead_model = t.open_danhead_model, s && i.addhistory(t.default_head_info.communityId || '')), console.log('step6'),
              i.loadPage())
          }).catch(function() {
            i.loadPage()
          })
      } else {
        util.getCommunityById(o.community_id).then(function(t) {
          0 == t.code && (1 == t.open_danhead_model && (console.log('开启单社区step7'), i.community = t.default_head_info, i.open_danhead_model = t.open_danhead_model
            , s && i.addhistory(t.default_head_info.communityId || '')), i.loadPage())
        }).catch(function() {
          i.loadPage()
        }), console.log('step7'), i.hidetip = !1, i.token = s, i.showEmpty = !1, i.community = n

      }

    },
    mounted: function() {
      var a = this,
        e = this;
      if ((a.stopNotify = !1, a.tabbarRefresh = !0, a.isblack = a.$app.globalData.isblack || 0), util.check_login_new().then(function(t) {
        t ? ( a.needAuth = !1 , status.cartNum().then(t=>{a.cartNum = t.data})) : (a.needAuth = !0, a.couponRefresh = !1 );
      }), a.$app.globalData.timer.start(), a.$app.globalData.changedCommunity) {

         a.$app.globalData.goodsListCarCount = [];
        var t = a.$app.globalData.community;
          a.community = e.fliterCommunity(t)
          a.newComerRefresh = !1
        a.getCommunityPos(t.communityId)
        a.hasRefeshin = !1
        a.newComerRefresh = !0
          a.rushList = []
          a.pageNum = 1
          a.classificationId = null
        /*this.setData({

          "classification.activeIndex": -1
        }, function() {
          a.setData({
            "classification.activeIndex": 0
          });
        })*/
        this.$data = _extends({}, this.$data, {
          overPageNum: 1,
          loadOver: !1,
          hasOverGoods: !1,
          countDownMap: {},
          actEndMap: {},
          timer: {},
          stickyFlag: !1,
          hasCommingGoods: !0
        });
        a.$app.globalData.changedCommunity = !1
        a.get_index_info()
        a.addhistory()
        a.load_goods_data()
        a.get_type_topic();
      } else {
        console.log("nochange");
        if(1 <= e.isFirst){
          a.loadOver = !0
          this.changeRushListNum()
        }

        0 == e.isFirst ? a.couponRefresh = !0 : (this.getCoupon(), e.isFirst++)
      }

      a.$store.dispatch('app/hideToolbarBack')
      a.$store.dispatch('app/hideToolbarMore')
      a.$store.dispatch('app/showTabbar')


    },
    methods: {
      copyText: function(t) {

      },

      get_index_info() {
        var F = this,
          t = F.$wx.getStorageSync('community'),
          B = t && (t.communityId || ''),
          a = F.$wx.getStorageSync('token')

        F.$http({
          controller: 'index.index_info',
          communityId: B,
          token: a
        }).then(t => {
          var a = t,
            e = F.groupInfo
          if (0 == a.code) {
            if (!t.is_community  && !F.needAuth) {
              var o = F.changeCommunity || {}

              if(o.communityId && o.communityId!=''){
                wcache.put('community', o);
                F.addhistory(o.community_id);
                F.community = o;
                F.showChangeCommunity = !1;
                F.loadPage()
              }else{

                  F.$wx.showModal({
                  title: '提示',
                  content: '请选择' + e.group_name,
                  showCancel: false,
                  confirmColor: '#8ED9D1',
                  success: function(t) {
                    F.$wx.redirectTo({
                      url: "/lionfish_comshop/pages/position/community"
                    });
                  }
                })
              }
            }
            var i = a.notice_list,
              s = a.slider_list,
              n = a.index_lead_image
            n ? status.getInNum().then(function(t) {
              t && (
                F.isTipShow = !0,
                  timerOut = setTimeout(function() {
                    F.isTipShow = !1
                  }, 9e3)
              )
            }) : (F.isTipShow = !1)
            var d = a.common_header_backgroundimage
            F.$getApp().globalData.common_header_backgroundimage = d
            var c = a.order_notify_switch,
              l = a.index_list_top_image_on || 1,
              r = a.index_change_cate_btn || 0,
              u = require('@/assets/images/rush-title.png')
            1 == l && (u = '')
            var h = a.index_list_top_image ? a.index_list_top_image : u,
              m = {
                shoname: a.shoname,
                shop_index_share_image: a.shop_index_share_image,
                index_list_top_image: h,
                title: a.title,
                common_header_backgroundimage: d,
                order_notify_switch: c,
                index_top_img_bg_open: a.index_top_img_bg_open || 0,
                index_top_font_color: a.index_top_font_color || '#fff',
                index_communityinfo_showtype: a.index_communityinfo_showtype || 0
              }
            F.$getApp().globalData.placeholdeImg = a.index_loading_image || ''
            var g = a.index_loading_image || ''
            wcache.put('shopname', a.shoname), F.$wx.setNavigationBarTitle({
              title: a.shoname
            })
            var p = a.category_list || [],
              _ = a.index_type_first_name || '全部'
            0 < p.length ? (p.unshift({
              name: _,
              id: 0
            }), (
              F.isShowClassification = !0,
                F.classification.tabs = p
            )) : (F.isShowClassification = !1)
            var f = a.theme || 0,
              y = 1e3 * a.rushtime || 0,
              w = a.index_share_switch || 0,
              x = a.is_show_list_count || 0,
              v = a.is_show_list_timer || 0,
              D = a.index_service_switch || 0,
              b = a.index_switch_search || 0,
              k = a.ishow_index_gotop || 0
            1 != a.is_comunity_rest || F.needAuth || a.$wx.showModal({
              title: '温馨提示',
              content: e.owner_name + '休息中，欢迎下次光临!',
              showCancel: !1,
              confirmColor: '#8ED9D1',
              confirmText: '好的',
              success: function(t) {
              }
            }), F.postion = a.postion
            var T = a.scekill_time_arr || [],
              C = a.seckill_bg_color,
              S = a.seckill_is_open,
              L = a.seckill_is_show_index,
              I = a.hide_community_change_word,
              $ = a.index_qgtab_counttime,
              N = a.hide_index_type,
              M = new Date().getHours()
            console.log('当前时间:', M)
            var O = 0,
              P = []
            if (3 < T.length) {
              var R = T.length
              O = T.findIndex(function(t) {
                return M <= t
              }), console.log('当前时间索引:', O), P = -1 === O ? T.slice(-3) : 0 === O ? T.slice(0, 3) : O + 1 == R ? T.slice(-3) : T.slice(O - 1, O + 2)
            } else {
              P = T
            }
            var j = [],
              q = 0
            P.length && (P.forEach(function(t, a) {
              var e = {}
              t == M ? (e.state = 1, e.desc = '疯抢中', q = a) : t < M ? (e.state = 0, e.desc = '已开抢') : (e.state = 2,
                e.desc = '即将开抢'), e.timeStr = (t < 10 ? '0' + t : t) + ':00', e.seckillTime = t,
                j.push(e)
            }), F.getSecKillGoods(P[q]))
            var A = a.index_video_arr

            F.notice_list = i
            F.slider_list = s
            F.index_lead_image = n
            F.theme = f
            F.indexBottomImage = a.index_bottom_image || ''
            F.shop_info = m
            F.loadOver = !0
            F.rushEndTime = y
            F.commingNum = a.comming_goods_total
            F.isShowShareBtn = w
            F.isShowListCount = x
            F.isShowListTimer = v
            F.is_comunity_rest = a.is_comunity_rest
            F.index_change_cate_btn = r
            F.isShowContactBtn = D
            F.index_switch_search = b
            F.is_show_new_buy = a.is_show_new_buy || 0
            F.qgtab = t.qgtab || {}
            F.notice_setting = a.notice_setting || {}
            F.index_hide_headdetail_address = a.index_hide_headdetail_address || 0
            F.is_show_spike_buy = a.is_show_spike_buy || 0
            F.hide_community_change_btn = a.hide_community_change_btn || 0
            F.hide_top_community = a.hide_top_community || 0
            F.index_qgtab_text = a.index_qgtab_text
            F.ishow_index_copy_text = a.ishow_index_copy_text || 0
            F.newComerRefresh = !0
            F.cube = a.cube
            F.placeholdeImg = g
            F.seckill_bg_color = C
            F.seckill_is_open = S
            F.seckill_is_show_index = L
            F.scekillTimeList = j
            F.secKillActiveIdx = q
            F.hide_community_change_word = I
            F.ishow_index_gotop = k
            F.ishow_index_pickup_time = a.ishow_index_pickup_time || 0
            F.index_video_arr = A
            F.index_qgtab_counttime = $
            F.hide_index_type = N
            F.show_index_wechat_oa = a.show_index_wechat_oa

          }

        })
      },
      getSecKillGoods: function(t) {
        var e = this,
          a = e.$wx.getStorageSync('community'),
          o = e.$wx.getStorageSync('token')

        e.$http({
          controller: 'index.load_gps_goodslist',
          token: o,
          pageNum: 1,
          head_id: a.communityId,
          seckill_time: t,
          is_seckill: 1,
          per_page: 1e4
        }).then(t => {
          if (0 == t.code) {
            var a = t.list || []
            r.secRushList = a
          }
        })
      },
      get_type_topic: function() {
        var e = this,
          t = this.$wx.getStorageSync('community') || {}

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

      addhistory: function() {
        var a = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 0
        console.log('step13')
        var t = 0
        0 == a ? t = this.$wx.getStorageSync('community').communityId : t = a
        console.log('history community_id=' + t)
        var e = this.$wx.getStorageSync('token'),
          o = this
        void 0 !== t && this.$http({
          controller: 'index.addhistory_community',
          community_id: t,
          token: e
        }).then(a => {
          0 != a && (o.getHistoryCommunity(), console.log('addhistory+id', a))
        })
      },
      loadPage() {

        var e = this
        e.get_index_info(), e.get_type_topic(), e.getNavigat(), e.getCoupon(), e.getPinList(),
          status.loadStatus().then(function() {
            var t = e.$app.globalData.appLoadStatus

            if (console.log('appLoadStatus' + t), 0 == t) {
              setTimeout(function() {
                e.$wx.hideLoading()
              }, 1e3)
              e.needAuth = !0
              e.couponRefresh = !1
              e.load_goods_data()
            } else if (2 == t) {
              console.log('step9'), e.getHistoryCommunity()
            } else {
              console.log('step12')
              var a = e.$wx.getStorageSync('community');
              (a || (a = e.$app.globalData.community), a) ? (e.community = e.fliterCommunity(a)) :
                util.getCommunityInfo().then(function(t) {
                  e.community = e.fliterCommunity(t)
                }), console.log('step18'), e.load_goods_data()
            }
          })
      },
      load_goods_data: function() {

        var t = this.$wx.getStorageSync('token'),
          m = this,
          a = this.$wx.getStorageSync('community'),
          e = m.classificationId
        this.$data.isLoadData = !0
        console.log('load_goods_begin');

        (m.hasRefeshin || m.loadOver) ? m.load_over_gps_goodslist() : (console.log('load_goods_in '));
        this.hasRefeshin = !0
        m.loadMore = !0
        this.$http({
          controller: 'index.load_gps_goodslist',
          token: t,
          pageNum: m.pageNum,
          head_id: a.communityId,
          gid: e,
          per_page: 12
        }).then(t => {
          if (1 == m.pageNum && (this.cate_info = t.cate_info || {}), 0 == t.code) {
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
                m.pageNum = m.pageNum + 1,
                m.loadMore = !1,
                m.reduction = u,
                m.tip = '',
                m.is_open_vipcard_buy = c || 0,
                m.is_vip_card_member = l,
                m.is_member_level_buy = r,
                m.canLevelBuy = h,
                m.load_over_gps_goodslist()
            ),

              function() {
                1 == m.isFirst && (m.isFirst++, a.length && !m.$data.stickyTop && (m.$wx.createSelectorQuery().select('.tab-nav-index-query').boundingClientRect(function(t) {
                  if (t && t.top) {
                    wcache.put('tabPos', t), m.$data.stickyTop = t.top + t.height, m.$data.stickyBackTop = t.top
                  } else {
                    var a = wcache.get('tabPos', !1)
                    a && (m.$data.stickyTop = a.top + a.height, m.$data.stickyBackTop = a.top)
                  }
                }).exec(), m.$data.scrollTop > m.$data.stickyTop && m.$wx.pageScrollTo({
                  duration: 0,
                  scrollTop: m.$data.stickyTop + 4
                }))), m.getScrollHeight(), 2 == m.pageNum && t.list.length < 10 && (console.log('load_over_goods_list_begin'),
                  m.loadOver = !0, m.hasRefeshin = !0, (
                  m.loadMore = !0,
                    m.load_over_gps_goodslist()
                ))

              }
          } else {
            1 == t.code ? (m.loadOver = !0, m.load_over_gps_goodslist()) : 2 == t.code && (
              m.needAuth = !0,
                m.couponRefresh = !1
            )
          }
        })
      },
      load_over_gps_goodslist: function() {

        var t = this.$wx.getStorageSync('token'),
          o = this,
          a = this.$wx.getStorageSync('community'),
          e = o.classificationId
        !o.$data.hasOverGoods && o.loadOver ? (o.$data.hasOverGoods = !0, (o.loadMore = !0),
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
              o.$data.hasOverGoods = !1, o.$data.overPageNum += 1, (
                o.rushList = a,
                  o.loadMore = !1,
                  o.tip = ''
                  , function() {
                  1 == o.isFirst && (o.isFirst++, a.length && !o.$data.stickyTop && (o.$wx.createSelectorQuery().select('.tab-nav-index-query').boundingClientRect(function(t) {
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
              1 == t.code ? (1 == o.$data.overPageNum && 0 == o.rushList.length && (o.showEmpty = !0), (
                o.loadMore = !1,
                  o.tip = '^_^已经到底了'
              )) : 2 == t.code && (
                o.needAuth = !0,
                  o.couponRefresh = !1
              )
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
      },

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
        clearTimeout(timerOut)
        this.isTipShow = !1
        this.isShowGuide = !0
        wcache.put('inNum', 4)
      },
      handleHideProxy: function() {
        this.isTipShow = !1
        this.isShowGuide = !1
      },
      getCommunityPos: function(t) {
        var a = this
        a.$http({
          controller: 'index.get_community_position',
          communityId: t
        }).then(t => {
          0 == t.code && (a.postion = t.postion)
        })
      },
      gotoMap: function() {
        var t = this.community
        console.log(t.communityId)
        this.$http({
          controller: 'index.get_community_position',
          communityId: t.communityId
        }).then(t => {
          var a = t.postion
          var e = parseFloat(a.lon)
          var o = parseFloat(a.lat)
          var i = t.disUserName
          var s = t.fullAddress + '(' + t.communityName + ')'
          this.$wx.openLocation({
            latitude: o,
            longitude: e,
            name: i,
            address: s,
            scale: 28
          })

        })
      },
      goOrder: function() {

        var i = this
        i.can_car && (i.can_car = !1)
        this.$wx.getStorageSync('token')
        var t = this.$wx.getStorageSync('community'),
          a = i.addCar_goodsid,
          e = t.communityId,
          o = i.sku_val,
          s = i.cur_sku_arr,
          n = ''
        s && s.option_item_ids && (n = s.option_item_ids)
        var d = {
          goods_id: a,
          community_id: e,
          quantity: o,
          sku_str: n,
          buy_type: 'dan',
          pin_id: 0,
          is_just_addcar: 1
        }
        util.addCart(d).then(function(t) {
          if (1 == t.showVipModal) {
            var a = t.pop_vipmember_buyimage
            i.$wx.hideLoading(), (i.pop_vipmember_buyimage = a, i.showVipModal = !0, i.visible = !1)
          } else if (3 == t.code || 7 == t.code) {
            this.$wx.showToast({
              title: t.msg,
              icon: 'none',
              duration: 2e3
            })
          } else if (4 == t.data.code) {
            this.$wx.hideLoading(), (i.needAuth = !0, i.showAuthModal = !0, i.visible = !1)
          } else if (6 == t.data.code) {
            var e = t.max_quantity || ''
            if (0 < e) {
              i.sku_val = e
            }
            var o = t.msg
            this.$wx.showToast({
              title: o,
              icon: 'none',
              duration: 2e3
            })
          } else {
            i.closeSku(), (0, status.cartNum)(t.total)
            i.cartNum = t.total

            this.$wx.showToast({
              title: '已加入购物车',
              image: '../../images/addShopCart.png'
            })
          }
        }).catch(function(t) {
          util.message(t || '请求失败', '', 'error')
        })
      },
      vipModal: function(t) {

        this.setData(t)
      },
      gocarfrom: function(t) {
        this.is_take_vipcard = '', this.is_mb_level_buy = ''
        a.collectFormIds(t.formId), this.goOrder()
      },

      openSku: function(t) {

        if (this.authModal()) {
          var a = t,
            e = a.actId,
            o = a.skuList
          this.addCar_goodsid = e

          var i = o.list || [],
            s = []
          if (0 < i.length) {
            for (var n = 0; n < i.length; n++) {
              var d = i[n].option_value[0],
                c = {
                  name: d.name,
                  id: d.option_value_id,
                  index: n,
                  idx: 0
                }
              s.push(c)
            }
            for (var l = '', r = 0; r < s.length; r++) r == s.length - 1 ? l += s[r].id : l = l + s[r].id + '_'
            var u = o.sku_mu_list[l] || {}
            this.sku = s
            this.sku_val = 1
            this.cur_sku_arr = u
            this.skuList = a.skuList
            this.visible = true
            this.$set(this, 'visible', true)
            this.showSku = true
            this.is_take_vipcard = a.is_take_vipcard || ''
            this.is_mb_level_buy = a.is_mb_level_buy || ''
            return true
          } else {
            var h = a.allData

            this.sku = []
            this.sku_val = 1
            this.skuList = []
            this.cur_sku_arr = h

            var m = {
              detail: {
                formId: ''
              }
            }
            m.detail.formId = 'the formId is a mock one', this.gocarfrom(m)
          }
        }
      },
      closeSku: function() {
        this.visible = 0
        this.stopClick = !1
      },
      selectSku: function(t) {
        var a = t.currentTarget.dataset.type.split('_'),
          e = this,
          o = e.sku,
          i = e.skuList,
          s = e.sku_val,
          n = {
            name: a[3],
            id: a[2],
            index: a[0],
            idx: a[1]
          }
        o.splice(a[0], 1, n)
        for (var d = '', c = 0; c < o.length; c++) c == o.length - 1 ? d += o[c].id : d = d + o[c].id + '_'
        var l = i.sku_mu_list[d],
          r = {};
        (s = s || 1) > l.canBuyNum && (e.sku_val = l.canBuyNum, this.$wx.showToast({
          title: '最多只能购买' + l.canBuyNum + '件',
          icon: 'none'
        })), (e.cur_sku_arr = l, e.sku = o), console.log(d)
      },
      setNum: function(t) {
        var a = t.currentTarget.dataset.type,
          e = 1,
          o = 1 * this.sku_val
        'add' == a ? e = o + 1 : 'decrease' == a && 1 < o && (e = o - 1)
        var i = this.sku,
          s = this.skuList
        if (0 < i.length) {
          for (var n = '', d = 0; d < i.length; d++) d == i.length - 1 ? n += i[d].id : n = n + i[d].id + '_'
        }
        0 < s.length ? e > s.sku_mu_list[n].canBuyNum && (e -= 1) : e > this.cur_sku_arr.canBuyNum && (e -= 1)
        this.sku_val = e
      },
      skuConfirm: function() {
        this.closeSku(), (0, status.cartNum)().then(function(t) {
          0 == t.code && (this.cartNum = t.data)
        })
      },
      goLink: function() {
        var a = t.currentTarget.dataset.link,
          e = t.currentTarget.dataset.needauth || ''
        console.log(e), e && !this.authModal() || a && this.$wx.navigateTo({
          url: a
        })
      },
      authSuccess: function() {
        console.log('authSuccess')
        var a = this
        this.tpage = 1, this.hasRefeshin = !1, (
          a.rushList = [],
            a.pageNum = 1,
            a.needAuth = !1,
            a.newComerRefresh = !1,
            a.couponRefresh = !0,
            a.isblack = a.$app.globalData.isblack || 0
        ), this.$data = _extends({}, this.$data, {
          overPageNum: 1,
          loadOver: !1,
          hasOverGoods: !1,
          countDownMap: {},
          actEndMap: {},
          timer: {},
          hasCommingGoods: !0
        }), status.getInNum().then(function(t) {
          t /*&& (a.setData({
            isTipShow: !0
          }), timerOut = setTimeout(function() {
            a.setData({
              isTipShow: !1
            });
          }, 7e3));*/
        }), this.loadPage(), this.data.isTipShow /*&& (timerOut = setTimeout(function() {
          a.setData({
            isTipShow: !1
          });
        }, 7e3));*/
      },
      authModal: function() {
        var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {},
          a = t && t || this.needAuth
         !this.needAuth && !t || ((this.showAuthModal = !this.showAuthModal, this.needAuth = a), !1);
        if(this.showAuthModal){
            this.$wx.redirectTo({
              url: "/login"
            })
        }
      },
      goNavUrl: function(t) {
        var a = t.currentTarget.dataset.idx,
          e = this,
          o = e.navigat,
          i = e.needAuth
        if (0 < o.length) {
          var s = o[a].link,
            n = o[a].type
          if (util.checkRedirectTo(s, i)) return void this.authModal()
          if (0 == n) {
            this.$wx.navigateTo({
              url: '/lionfish_comshop/pages/web-view?url=' + encodeURIComponent(s)
            })
          } else if (1 == n) {
            -1 != s.indexOf('lionfish_comshop/pages/index/index') || -1 != s.indexOf('lionfish_comshop/pages/order/shopCart') || -1 != s.indexOf('lionfish_comshop/pages/user/me') || -1 != s.indexOf('lionfish_comshop/pages/type/index') ? this.$wx.switchTab({
              url: s
            }) : this.$wx.navigateTo({
              url: s
            })
          } else if (2 == n) {
            o[a].appid && this.$wx.navigateToMiniProgram({
              appId: o[a].appid,
              path: s,
              extraData: {},
              envVersion: 'release',
              success: function(t) {
              },
              fail: function(t) {
                console.log(t)
              }
            })
          } else if (3 == n) {
            var d = this.classification,
              c = d && d.tabs,
              l = s,
              r = c.findIndex(function(t) {
                return t.id == l
              })
            if (-1 != r) {
              var u = {
                detail: {
                  e: r,
                  a: l
                }
              }
              this.classificationChange(u)
            }
          } else {
            4 == n && (this.$getApp().globalData.typeCateId = s, this.$wx.switchTab({
              url: '/lionfish_comshop/pages/type/index'
            }))
          }
        }
        this.$store.getters.tabbarCurrentIdx = 2
      },
      classificationChange: function(t) {
        console.log(t)

        var a = this
        this.$data = _extends({}, this.$data, {
          overPageNum: 1,
          loadOver: !1,
          hasOverGoods: !1,
          countDownMap: {},
          actEndMap: {},
          timer: {}
        }), this.hasRefeshin = !1
        this.rushList = []
        this.showEmpty = !1,
          this.pageNum = 1,
          this.classification.activeIndex = t.e
        this.classificationId = t.a
        this.$data.stickyFlag || a.$data.scrollTop == a.$data.stickyTop + 5 || this.$wx.pageScrollTo({
          scrollTop: a.$data.stickyTop - 30,
          duration: 0
        }), a.load_goods_data()
      },
      commingClassificationChange: function(t) {
        var a = this
        a.tpage = 1, this.$data = _extends({}, this.$data, {
          hasCommingGoods: !0
        })
        this.showCommingEmpty = !1
        this.commingList = []
        this.commingClassification.activeIndex = t.e
        this.commingClassificationId = t.a

        this.$data.stickyFlag && a.$data.scrollTop != a.$data.stickyTop + 5 && this.$wx.pageScrollTo({
          scrollTop: a.$data.stickyTop + 5,
          duration: 0
        })
        a.getCommingList()
      },
      getCommingList: function() {
        var t = this.$wx.getStorageSync('token'),
          e = this,
          a = this.$wx.getStorageSync('community'),
          o = this.commingClassificationId || 0
        e.$data.isLoadData = !0, e.$data.hasCommingGoods ? (e.$data.hasCommingGoods = !1,
          this.commigLoadMore = 0,
          this.$http({

            controller: 'index.load_comming_goodslist',
            token: t,
            pageNum: e.tpage,
            head_id: a.communityId,
            gid: o
          }).then(t => {
            if (this.$wx.hideLoading(), 0 == t.code) {
              var a = t.list
              a = e.commingList.concat(a), e.$data.hasCommingGoods = !0, e.tpage += 1
              e.commingList = a
              e.commigLoadMore = !1
              e.commigTip = ''
              e.getScrollHeight()

            } else {
              1 == t.data.code ? (1 == e.tpage && 0 == e.commingList.length && (
                e.showCommingEmpty = !0
              ), (
                e.commigLoadMore = !1,
                  e.commigTip = '^_^已经到底了'
              )) : 2 == t.code && (e.needAuth = !0 , e.couponRefresh = !1)
            }
            e.$data.isLoadData = !1
          })) : (e.$data.isLoadData = !1, !e.commigLoadMore && this.$wx.hideLoading())
      },
      getHistoryCommunity: function() {
        var d = this,
          c = this.$wx.getStorageSync('token')

        this.$http({
          controller: 'index.load_history_community',
          token: c
        }).then(t => {
          if (console.log('step14'), 0 == t.code) {
            console.log('getHistoryCommunity')
            var a = t.list,
              e = !1
            0 != Object.keys(a).length && 0 != a.communityId || (e = !0)
            var o = a && a.fullAddress && a.fullAddress.split('省')
            if (a = Object.assign({}, a, {
              address: o[1]
            }), (
              d.community = a
            ), wcache.put('community', a), d.$getApp().globalData.community = a, c && !e) {
              var i = this.$wx.getStorageSync('lastCommunity'),
                s = i.communityId || ''
              '' != s && s != a.communityId && (
                d.showChangeCommunity = !0,
                  d.changeCommunity = i,
                  this.$wx.removeStorageSync('lastCommunity')
              )
            }
            (d.community = d.$getApp().globalData.community), d.load_goods_data()
          } else {
            var n = d.options
            void 0 !== n && n.community_id ? (console.log('新人加入分享进来的社区id:', d.options), d.addhistory(n.community_id)) : 1 == t.code ? (console.log('获取历史社区'),
              this.$wx.redirectTo({
                url: '/lionfish_comshop/pages/position/community'
              })) : (d.needAuth = !0)
          }
        })
      },
      changeNotListCartNum: function(t) {
        var a = t;
        (0, status.cartNum)(this.cartNum = a), this.changeRushListNum()
      },
      changeCartNum: function(t) {
        var a = t;
        (0, status.cartNum)(
          this.cartNum = a
        )
      },
      changeRushListNum: function() {
        var t = this.$getApp().globalData.goodsListCarCount,
          o = this.rushList,
          i = !1;
        (this.changeCarCount = i), 0 < t.length && 0 < o.length && (t.forEach(function(a) {
          var t = o.findIndex(function(t) {
            return t.actId == a.actId
          })
          if (-1 != t && 0 === o[t].skuList.length) {
            var e = 1 * a.num
            o[t].car_count = 0 <= e ? e : 0, i = !0
          }
        }), (
          this.rushList = o,
            this.changeCarCount = i
        ))
      },
      share_handler: function() {
        this.is_share_html = !1
      },
      confrimChangeCommunity: function() {
        var t = this,
          a = t.changeCommunity
        t.$app.globalData.community = a, wcache.put('community', a), this.$data = _extends({}, this.$data, {
          overPageNum: 1,
          loadOver: !1,
          hasOverGoods: !1,
          countDownMap: {},
          actEndMap: {},
          timer: {},
          stickyFlag: !1
        }), this.hasRefeshin = !1,
          t.showChangeCommunity = !1,
          t.community = a,
          t.rushList = [],
          t.pageNum = 1
        t.loadPage()
        t.addhistory()
      }

    }
  }

</script>

<style scoped>
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
    margin: 10px;
    padding-top: 10px;
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
    width: 100%;
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
    z-index: 2;
    position: relative;
  }

  .list-content .rush-list-title {
    height: 45px;
    display: block;
    margin: 0 auto 20px;
  }

  .rush-list-box {
    z-index: 2;
    background: #f7f7f7;
    position: relative;
    min-height: 400px;
    padding: 10px;
  }

  .first-screen {
    background: #fff;
    padding-bottom: 48px;
  }

  .header-content {
    width: 100%;
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

  .show-img-index {
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
    z-index: 2;
    background: #fff;
    display: flex;
    padding: 10px 10px;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .nav-list-item {
    color: #333;
    margin-bottom: 2px;
    background: #fff;
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

  .sticky-content-index {
    background: #fff;
    padding-bottom: 14px;
    position: sticky;
    z-index: 99;
    top: -80px;
    transition: top 0.3s;
  }

  .sticky-content-index.tab-nav-index-sticky {
    top: 0;
  }

  .sticky-content-index .tab-nav-index {
    height: 41px;
    display: flex;
    margin: 0 10px;
    border-bottom: 2px solid #fc4443;
    transition: all 0.3s linear;
  }

  .sticky-content-index .tab-nav-index .count-down-content {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    color: #444;
  }

  .sticky-content-index .tab-nav-index .count-down-content em {
    font-size: 26px;
  }

  .sticky-content-index .tab-nav-index .count-down-content .count-down-left-text {
    font-size: 26px;
  }

  .sticky-content-index .tab-nav-index .count-down-content .count-down {
    height: 50px;
    line-height: 50px;
    color: #444;
    font-size: 26px;
    display: flex;
    align-items: center;
    flex: 1;
  }

  .sticky-content-index .tab-nav-index .count-down-content .count-down .item-time {
    width: 34px;
    height: 40px;
    line-height: 40px;
    color: #fff;
    text-align: center;
    background: #444;
    border-radius: 4px;
    padding: 0 2px;
  }

  .sticky-content-index .tab-nav-index .tab-nav-index-item {
    color: #6c6c6c;
    font-size: 13px;
    font-weight: bold;
    position: relative;
    z-index: 1;
    width: 100px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .sticky-content-index .tab-nav-index .tab-nav-index-item img {
    width: 100px;
    height: 40px;
    position: absolute;
    left: 0;
    top: 0;
  }

  .sticky-content-index .tab-nav-index .tab-nav-index-item span {
    position: relative;
  }

  .sticky-content-index .tab-nav-index .tab-nav-index-item.active {
    color: #fff;
    z-index: 2;
  }

  .sticky-content-index .tab-nav-index .tab-nav-index-item:nth-child(1) span {
    margin-left: -10px;
  }

  .sticky-content-index .tab-nav-index .tab-nav-index-item:nth-child(2) {
    margin-left: -20px;
  }

  .sticky-content-index .tab-nav-index .tab-nav-index-item:nth-child(2) span {
    margin-left: 30px;
  }

  .sticky-content-index .category-list {
    margin-top: 20px;
    background-color: #fff;
  }

  .sticky-cate_index {
    background: #fff;
    position: sticky;
    top: 0;
    z-index: 99;
  }

  .sticky-cate_index .category-list {
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
    right: -20px;
    top: 70%;
    z-index: 100;
    width: 80px;
  }

  .fixed-service {
    display: inline-block;
    width: 48px;
    height: 48px;
    background: rgba(0,0,0,0.5);
    border-radius: 50%;
    text-align: center;
    color: #fff;
    box-sizing: border-box;
    font-size: 5px;
    padding: 10px;
    line-height: 1.2;
    margin-bottom: 10px;
  }

  .fixed-service::after {
    border: 0;
  }

  .fixed-service .iconfont {
    font-size: 15px;
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
    background-color: #8ED9D1;
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
    background: #8ED9D1;
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




