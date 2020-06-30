<template>
  <div class="page">
    <div v-if="loadOver && isblack!=1">

      <div :class="['index-box', 'pb100', (showNewCoupon?'preventTouchMove':'')]">
        <div class="miniAppTip" v-if="isTipShow">
          <div @click="handleProxy" class="add-myapp">
            <span>{{$t('index.desktop')}}</span>
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
                <span class="community-change" v-if="hide_community_change_word==0">{{$t('index.change')}}</span>
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
                  {{$t('index.not_choose')}}{{groupInfo.owner_name}}，{{ $t('index.to_choose')}}
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
                <i-router-link hoverClass="router-hover" url="/lionfish_comshop/pages/position/community">
                  您还没有选择{{groupInfo.owner_name}}，轻触去选择
                  <span class="iconfont icon-weizhi-tianchong"></span>
                </i-router-link>
              </div>
              <div @click="goLink" class="top-search" data-link="/lionfish_comshop/pages/type/search">
                <span class="iconfont icon-sousuo1"></span>
                ${{$t('index.search')}}
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

          <!--限时抢购开始-->

          <template is="cube" :data="{data:cube}"></template>

          <div class="cube" v-if="cube.length">
            <block v-for="(item,index) in cube" :key="item.id">
              <div class="cube-item" v-if="item.type==1">
                <img @click="goCube" class="cube-one rounded" data-idx="0" :data-index="index" mode="widthFix" :src="item.thumb.cover[0]"></img>
              </div>
              <div class="cube-item" v-if="item.type==2">
                <i-img @click="goCube" data-idx="0" :data-index="index" height="59vw" iClass="cube-left rounded" :loadImage="item.thumb.cover[0]" width="50vw"></i-img>
                <i-img @click="goCube" data-idx="1" :data-index="index" height="59vw" iClass="cube-two rounded" :loadImage="item.thumb.cover[1]" width="59vw"></i-img>
              </div>
              <div class="cube-item" v-if="item.type==3">
                <i-img @click="goCube" data-idx="0" :data-index="index" height="59vw" iClass="cube-left rounded" :loadImage="item.thumb.cover[0]" width="33vw"></i-img>
                <div class="i-flex-col i-flex-spb">
                  <i-img @click="goCube" data-idx="1" :data-index="index" height="29vw" iClass="cube-three rounded" :loadImage="item.thumb.cover[1]" width="60vw"></i-img>
                  <i-img @click="goCube" data-idx="2" :data-index="index" height="29vw" iClass="cube-three rounded" :loadImage="item.thumb.cover[2]" width="60vw"></i-img>
                </div>
              </div>
              <div class="cube-item" v-if="item.type==4">
                <i-img @click="goCube" data-idx="0" :data-index="index" height="59vw" iClass="cube-left rounded" :loadImage="item.thumb.cover[0]" width="33vw"></i-img>
                <div class="i-flex-col i-flex-spb">
                  <i-img @click="goCube" data-idx="1" :data-index="index" height="29vw" iClass="cube-three rounded" :loadImage="item.thumb.cover[1]" width="60vw"></i-img>
                  <div class="i-flex i-flex-spb w450">
                    <i-img @click="goCube" data-idx="2" :data-index="index" height="29vw" iClass="cube-four rounded" :loadImage="item.thumb.cover[2]" width="29.5vw"></i-img>
                    <i-img @click="goCube" data-idx="3" :data-index="index" height="29vw" iClass="cube-four rounded" :loadImage="item.thumb.cover[3]" width="29.5vw"></i-img>
                  </div>
                </div>
              </div>
              <div class="cube-item" v-if="item.type==5">
                <img @click="goCube" class="cube-w" :data-idx="idx" :data-index="index" mode="widthFix" :src="imgItem" v-for="(imgItem,idx) in item.thumb.cover" :key="idx"></img>
              </div>
              <div class="cube-item" v-if="item.type==6">
                <img @click="goCube" class="cube-w" :data-idx="idx" :data-index="index" mode="widthFix" :src="imgItem" v-for="(imgItem,idx) in item.thumb.cover" :key="idx"></img>
              </div>
              <div class="cube-item" v-if="item.type==7">
                <img @click="goCube" class="cube-w" :data-idx="idx" :data-index="index" mode="widthFix" :src="imgItem" v-for="(imgItem,idx) in item.thumb.cover" :key="idx"></img>
              </div>
              <div class="cube-item two-row" v-if="item.type==8">
                <img @click="goCube" class="cube-w" :data-idx="idx" :data-index="index" mode="widthFix" :src="imgItem" v-for="(imgItem,idx) in item.thumb.cover" :key="idx"></img>
              </div>
            </block>
          </div>

          <!--限时抢购结束-->

        </div>
        <div class="list-content">

          <i-new-comer @openSku="openSku" :refresh="newComerRefresh" :skin="skin" v-if="is_show_new_buy==1"></i-new-comer>

          <!--<template is="pin" :data="{pinList:pinList,skin:skin}"></template>-->



          <i-spike @openSku="openSku" :refresh="newComerRefresh" :skin="skin" v-if="is_show_spike_buy==1"></i-spike>



          <!--<template is="seckill"
                    :data="{secRushList:secRushList,skin:skin,scekillTimeList:scekillTimeList,secKillActiveIdx:secKillActiveIdx,secKillGoodsIndex:secKillGoodsIndex,needAuth:needAuth}"
                    v-if="seckill_is_open==1&&seckill_is_show_index==1"></template>-->

          <!--整点秒杀开始-->
          <div class="seckill" v-if="seckill_is_open==1&&seckill_is_show_index==1">
            <div class="seckill-head i-flex" :style="{background:skin.color}">
              <div class="tit">
                <div>整点</div>
                <div>秒杀</div>
              </div>
              <div class="i-flex-item i-flex">
                <div @click="changeSecKillTime" :class="['seckill-head-item' ,secKillActiveIdx==index?'active':'']" :data-idx="index" :data-time="item.seckillTime" v-for="(item,index) in scekillTimeList" :key="item.id">
                  <div class="time">{{item.timeStr}}</div>
                  <div class="desc" :style="secKillActiveIdx==index?'color:'+skin.color:''">{{item.desc}}</div>
                </div>
              </div>
              <div @click="goLink" class="more" :data-link="'/lionfish_comshop/moduleA/seckill/list?time='+scekillTimeList[secKillActiveIdx].seckillTime">
                更多 <text class="iconfont icon-gengduo"></text>
              </div>
            </div>
            <div class="seckill-list" v-if="secRushList.length">

              <swiper :options="sliderSwiperOption" class="sec-swiper-content">
                <swiper-slide v-for="(item,index) in secRushList" :key="item.id">
                  <i-seckill-spu :begin="scekillTimeList[currentTab].state==2?1:0" :needAuth="needAuth" :skin="skin" :spuItem="item"></i-seckill-spu>
                </swiper-slide>
              </swiper>

              <van-swipe class="my-swipe" :autoplay="3000" :indicator-color="skin.color">
                <van-swipe-item v-for="(item,index) in secRushList" :key="item.id">
                  <i-seckill-spu :begin="scekillTimeList[currentTab].state==2?1:0" :needAuth="needAuth" :skin="skin" :spuItem="item"></i-seckill-spu>
                </van-swipe-item>
              </van-swipe>


              <span class="current" v-if="secRushList.length">{{secKillGoodsIndex}}/{{secRushList.length}}</span>
            </div>
          </div>
          <!--整点秒杀结束-->


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
                <van-sticky :offset-top="50">
                <i-tabs :activeIndex="classification.activeIndex" @activeIndexChange="classificationChange"
                        data-idx="1" fontColor="#000" iClass="category-list" :tabs="classification.tabs"></i-tabs>
                </van-sticky>
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
                  <span>{{index_qgtab_text[0]?index_qgtab_text[0]:$t('index.buying')}}</span>
                </div>
                <div @click="tabSwitch" :class="['tab-nav-index-item', (tabIdx===1?'active':'')]" data-idx="1">
                  <img :src="(qgtab.two_select?qgtab.two_select:require('@/assets/images/index-tab-right-active.png'))"
                       v-if="tabIdx===1"/>
                  <img :src="(qgtab.two_selected?qgtab.two_selected:require('@/assets/images/index-tab-right-disabled.png'))"
                       v-else/>
                  <span>{{index_qgtab_text[1]?index_qgtab_text[1]: $t('index.to_buy')}}
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
                <van-sticky :offset-top="50">
                <i-tabs :activeIndex="classification.activeIndex" @activeIndexChange="classificationChange"
                        data-idx="1" fontColor="#000" class="category-list" :tabs="classification.tabs"></i-tabs>
                </van-sticky>
              </div>
              <div v-show="!isShowCommingClassification||tabIdx!==1">
                <van-sticky :offset-top="50">
                <i-tabs :activeIndex="commingClassification.activeIndex" @activeIndexChange="classificationChange" data-idx="2" fontColor="#000"
                        iClass="category-list" :tabs="classification.tabs"></i-tabs>
                </van-sticky>
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
                            v-for="(item,index) in rushList" :key="item.actId"></i-rush-spu>
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
  import { Sticky } from 'vant';
  import { Swipe, SwipeItem } from 'vant';

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
    components:{[Sticky.name]:Sticky ,[Swipe.name]:Swipe,[SwipeItem.name]:SwipeItem},
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
            i.$wx.showToast({
              title: t.msg,
              icon: 'none',
              duration: 2e3
            })
          } else if (4 == t.code) {
            i.$wx.hideLoading(), (i.needAuth = !0, i.showAuthModal = !0, i.visible = !1)
          } else if (6 == t.code) {
            var e = t.max_quantity || ''
            if (0 < e) {
              i.sku_val = e
            }
            var o = t.msg
            i.$wx.showToast({
              title: o,
              icon: 'none',
              duration: 2e3
            })
          } else {
            i.closeSku()
            i.$wx.showToast({
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
        var i = this;

        var t = i.$wx.getStorageSync('community');
        if(!t && !t.communityId){
          this.$wx.redirectTo({
            url: '/lionfish_comshop/pages/position/community'
          })
        }

        util.check_login_new().then(function(e) {
            if(e){
              i.needAuth = !1
            }else{
              i.$wx.redirectTo({
                url: "/login"
              })
            }
        })



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
              url: '/lionfish_comshop/pages/web-div?url=' + encodeURIComponent(s)
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
            this.$wx.hideLoading()
            if ( 0 == t.code) {
              var a = t.list
              a = e.commingList.concat(a), e.$data.hasCommingGoods = !0, e.tpage += 1
              e.commingList = a
              e.commigLoadMore = !1
              e.commigTip = ''
              e.getScrollHeight()

            } else {
              1 == t.code ? (1 == e.tpage && 0 == e.commingList.length && (
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
        status.cartNum().then(function(e) {
          this.cartNum = e.data
        })
        this.changeRushListNum()
      },
      changeCartNum: function(t) {
        var a = t;
        this.cartNum = a
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
  @import "index.less";
  @import "seckill.less";
  @import "cube.less";
</style>




