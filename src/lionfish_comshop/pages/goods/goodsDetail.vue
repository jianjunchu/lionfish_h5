<template>
  <div>

    <div class="goods-wrapper">
      <!--<div @click="hide_share_handler" class="ui-mask" :hidden="is_share_html"></div>-->
      <!--<div class="model-services show" :hidden="is_share_html">-->
        <!--<div class="model-services-title">分享</div>-->
        <!--<div class="model-services-content">-->
          <!--<div class="service-list">-->
            <!--<div class="service-item">-->
              <!--<button class="none_btn" openType="share" plain="true">-->
                <!--<div class="iconfont icon-weixin2 service-icon"></div>-->
                <!--<div class="cube-text">-->
                  <!--<div>好友</div>-->
                <!--</div>-->
              <!--</button>-->
            <!--</div>-->
            <!--<div @click="get_share_img" class="service-item">-->
              <!--<div class="iconfont icon-pengyouquan service-icon"></div>-->
              <!--<div class="cube-text">-->
                <!--<div>海报</div>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->

      <!--<div class="spuInfoImg" :style="height:(imageSize.imageHeight)px;background: url('/lionfish_comshop/images/index-comming-goods-bitmap.png)';background-size: 100% 100%;">-->
      <!--<div class="spuInfoImg" :style="{height:imageSize.imageHeight + 'px', background: 'url(' + indexcomminggoodsbitmap + ')',backgroundSize: '100% 100%'}">-->
      <!--<div class="spuInfoImg" :style="{height:imageSize.imageHeight + 'px', background: 'url(' + indexcomminggoodsbitmap + ')',backgroundSize: '100% 100%'}">-->
      <!--<div class="spuInfoImg" :style="{height: '100%', background: 'url(' + indexcomminggoodsbitmap + ')',backgroundSize: '100% 100%'}">-->
      <div class="spuInfoImg" style="height: '300px'; background: url('@/assets/images/index-comming-goods-bitmap.png');backgroundSize: '100% 100%'">
      <div class="item-tag" v-if="goods.label_info&&goods.label_info.type==0">
        <img class="item-tag-bg" mode="widthFix" src="@/assets/images/tag.png"/>
        <div class="['tag-name', (goods.label_info.len==2?'two-word':'')]">{{goods.label_info.tagcontent}}</div>
      </div>
      <!--<div class="item-tag" :style="background:url(goods.label_info.tagcontent) no-repeat left top;background-size: 100%;" v-if="goods.label_info&&goods.label_info.type==1"></div>-->
      <div class="item-tag" :style="{background:'url('+goods.label_info.tagcontent+ ') no-repeat left top',backgroundSize: '100%;'}" v-if="goods.label_info&&goods.label_info.type==1"></div>
      <!--<div class="current" v-if="fmShow==true">{{goodsIndex}}/{{goods_image_length}}</div>-->
      <!--<div class="current" v-if="fmShow">{{goodsIndex}}/{{goods_image_length}}</div>-->
      <!--<div class="current" >{{goodsIndex}}/{{goods_image_length}}</div>-->
      <!--<swiper circular :autoplay="!goods.video" bindchange="scrollImagesChange" duration="300" interval="5000" :style="height:(imageSize.imageHeight)px">-->
      <!--<swiper circular :autoplay="!goods.video" bindchange="scrollImagesChange" duration="300" interval="5000" :style="{height:imageSize.imageHeight+'px'}">-->
      <!--<swiper circular :autoplay="!goods.video" bindchange="scrollImagesChange" duration="300" interval="5000" style="height:100%">-->
      <swiper style="height:100%">
        <!--<swiper-item v-for="(item,index) in goods_image" :key="item.id">-->
        <swiper-slide v-for="(item,index) in goods_image" :key="item.id">
          <div v-if="goods.video!=''&&goods.video!=null">
            <img bindload="imageLoad" @click="predivImg" width="100%" height="260px" :data-idx="index" lazyLoad="true" mode="widthFix" :src="item.image" v-if="index!=0"/>
            <div class="video-wrap" v-else>
              <div v-if="fmShow">
              <!--<div v-if="false">-->
                <div class="btn_div centerboth" v-if="item.video==''"></div>
                <div @click="btnPlay" class="btn_div centerboth" v-else>
                  <img src="@/assets/images/play.png"/>
                </div>
                <img bindload="imageLoad" @click="predivImg" :data-idx="index" lazyLoad="true" mode="widthFix" :src="item.image"/>
              </div>
              <!--<video bindended="videEnd" class="swiper-video" :hidden="fmShow" id="myVideo" objectFit="contain" :src="goods.video"></video>-->
              <video bindended="videEnd" class="swiper-video" v-show="fmShow" id="myVideo" objectFit="contain" :src="goods.video"></video>

            </div>
          </div>
          <img bindload="imageLoad" @click="predivImg" width="100%" height="260px" :data-idx="index" lazyLoad="true" mode="widthFix" :src="item.image" v-else/>
        </swiper-slide>
        <!--</swiper-item>-->
      </swiper>
    </div>


    <!--<div @click="endPlay" class="end-play" :hidden="fmShow">-->
    <div @click="endPlay" class="end-play" v-show="false">
      <div class="btn">退出播放</div>
    </div>
    <!--<div class="spuInfo" :style="{z-index: fmShow==false?-1:2}">-->
    <!--<div class="spuInfo" :style="!fmShow ? 'z-index:-1':'z-index:2'">-->
    <div class="spuInfo" style="z-index:2">
      <div class="spuPrice">
        <!--<img class="spuPriceBg" :src="goods_details_price_bg?goods_details_price_bg:'@/assets/images/shareBottomBg.png'"/>-->
        <img class="spuPriceBg" src="@/assets/images/shareBottomBg.png"/>
        <div class="price">
          <span v-if="buy_type!='integral'">$</span>
          <span class="salePrice">{{goods.price_front}}</span>.{{goods.price_after}}
          <span v-if="buy_type=='integral'">积分</span>
          <span class="storePrice" v-if="goods.show_productprice">
            <span v-if="buy_type!='integral'">$</span>{{goods.productprice}} <span v-if="buy_type=='integral'">积分</span>
          </span>
        </div>
        <div class="time" v-if="is_close_details_time==0">
          <div v-if="goods.over_type==1">距结束</div>
          <div class="endAct" v-if="goods.over_type==0">距开始</div>
          <div class="endAct" v-if="goods.over_type==2">结束时间</div>
          <div class="endAct" v-if="goods.over_type==2">{{goods.end_date}}</div>
          <div class="countdown-class i-count-down" v-else>

            <span v-if="goods.end_time==0" class="item-class">不限时间</span>

            <em v-if="goods.end_time!=0 && endtime.days>0">{{endtime.days}}天</em>
            <span v-if="goods.end_time!=0" class="item-class">{{endtime.hours}} :</span>
            <span v-if="goods.end_time!=0"class="item-class">{{endtime.minutes}}:</span>
            <span v-if="goods.end_time!=0"class="item-class">{{endtime.seconds}}</span>
          </div>
        </div>
      </div>
      <div class="spuDetailInfo">
        <div class="spuName">
          <div class="red" style="font-size:15px;" v-if="goods.is_seckill==1">[秒杀] </div>{{goods.goodsname}}
        </div>
        <div class="fsz-22 i-flex mt10 i-aic" v-if="is_only_hexiao==1">
          <div class="hexiao text-6">
            <div class="iconfont icon-gou red fsz-22"></div> {{$t('detail.zitishangpin')}}</div>
          <div @click="handleHexiaoModal" class="hexiao text-6">
            <div class="iconfont icon-gou red fsz-22" v-if="hx_len"></div> 支持多点自提
          </div>
        </div>
        <div class="comiss" v-if="is_commiss_mb==1&&commiss_mb_money>0">
          <div class="con">会员分销预估佣金:${{commiss_mb_money}}</div>
        </div>
        <div class="comiss" v-if="is_goods_head_mb==1&&goods_head_money>0">
          <div class="con">团长预估佣金：${{goods_head_money}}</div>
        </div>
        <i-vip-price :price="goods.card_price" v-if="is_open_vipcard_buy==1&&goods.is_take_vipcard==1"></i-vip-price>
        <i-vip-price :price="goods.levelprice" type="1" v-if="is_member_level_buy==1&&goods.is_mb_level_buy==1"></i-vip-price>
        <div class="remind" v-if="is_show_ziti_time==1&&goods.is_show_arrive==1">
          <img class="remindImg" src="@/assets/images/icon-give.png"/>
          <div>现在下单，预计({{goods.pick_up_modify}})可自提</div>
        </div>
        <div class="remind" v-if="goods.diy_arrive_switch==1&&goods.diy_arrive_details">
          <img class="remindImg" src="@/assets/images/icon-give.png"/>
          <div>{{goods.diy_arrive_details}}</div>
        </div>
        <div class="preferential" v-if="goods.is_take_fullreduction==1">
          <div>
            <div class="tit">{{$t('common.manjian')}}</div>
            <div class="con">满{{goods.full_money}}元减{{goods.full_reducemoney}}元</div>
          </div>
        </div>
        <div class="purchasing pb10" v-if="goods.one_limit_count>0||goods.total_limit_count>0">
          <div class="purTit">{{$t('common.xiangou')}}</div>
          <div v-if="goods.total_limit_count>0">每人限购{{goods.total_limit_count}}份</div>
          <div v-if="goods.one_limit_count>0"> 每单限购{{goods.one_limit_count}}份</div>
        </div>
        <div class="saleNum" v-if="is_hide_details_count!=1">
          <span class="purTit">{{$t('detail.xiaoliang')}}</span>
          <span class="stock">{{$t('detail.yishou')}}
            <span class="remaining"> {{goods.seller_count}} </span>件，{{$t('detail.jinsheng')}}
            <span class="remaining"> {{goods.total}} </span>件</span>
        </div>
        <div @click="goLink" class="vip i-flex i-flex-spb" data-link="/lionfish_comshop/moduleA/vip/upgrade" v-if="goods.is_take_vipcard==1&&is_vip_card_member==1&&is_open_vipcard_buy==1">
          <div class="i-flex vip-name">
            <img class="vip-logo" :src="modify_vipcard_logo" v-if="modify_vipcard_logo"/>
            <div class="iconfont icon-huiyuan" style="font-size:15px;" v-else></div> “{{modify_vipcard_name}}”
            <div v-if="goods.is_take_vipcard==1">会员立省{{goods.feePrice}}元</div>
          </div>
        </div>
        <div @click="goLink" class="vip i-flex i-flex-spb" data-link="/lionfish_comshop/moduleA/vip/upgrade" v-if="is_open_vipcard_buy==1&&is_vip_card_member!=1">
          <div class="i-flex vip-name">
            <img class="vip-logo" :src="modify_vipcard_logo" v-if="modify_vipcard_logo"/>
            <div class="iconfont icon-huiyuan" style="font-size:15px;" v-else></div>
            <div v-if="goods.is_take_vipcard==1">开通“{{modify_vipcard_name}}”立省{{goods.feePrice}}元</div>
            <div v-else>“{{modify_vipcard_name}}” 尊享特权·会员专享价</div>
          </div>
          <div v-if="is_vip_card_member==0">立即开通
            <div class="iconfont icon-youjiantou goright"></div>
          </div>
          <div v-if="is_vip_card_member==2">
            <div style="color:#fd7f02;">已到期,</div>立即开通
            <div class="iconfont icon-youjiantou goright"></div>
          </div>
        </div>
      </div>
      <div @click="changeCommunity" class="group" v-if="is_show_goodsdetails_communityinfo==1&&community&&community.communityName">
        <div class="group-avatar">
          <img :src="community.headImg||community.disUserHeadImg"/>
        </div>
        <div class="group-m">
          <div class="group-title">{{community.communityName}}</div>
          <div class="group-desc">
            <div style="color:#333;">{{$t('detail.quhuodizhi')}}:</div>{{community.fullAddress}}</div>
        </div>
        <div class="group-r" v-if="hide_community_change_btn==0">
          <img class="group-r-icon" src="@/assets/images/community-right-arrow.png"/>
        </div>
      </div>
      <div @click="showGroupCode" class="group" v-if="isopen_community_group_share==1&&group_share_info&&group_share_info.share_wxcode">
        <div class="group-avatar">
          <img :src="group_share_info.share_avatar"/>
        </div>
        <div class="group-m">
          <div class="group-title">{{group_share_info.share_title}}</div>
          <div class="group-desc">{{group_share_info.share_desc}}</div>
        </div>
        <div class="group-r">
          <div class="group-btn" :style="{color:skin.color,background:skin.light}">{{$t('detail.mashangjiaqun')}}</div>
        </div>
      </div>
      <div v-if="order_comment_count>0&&is_show_comment_list==1">
        <div class="straightInLive">
          <div class="title">
            {{$t(detail.shangpinpingjia)}}
            <div class="commentsNum">（{{order_comment_count}}）</div>
          </div>
          <div class="comments" v-for="(item,index) in comment_list" :key="item.comment_id" >
            <div class="comment-user">
              <img :src="item.avatar"/>
              <div>{{item.user_name}}</div>
            </div>
            <!--<div @click="bindOpen" :class="{'commentsCon', item.isOpen&&item.showOpen?'doubleHidden':''}" :data-idx="index">{{item.content}}</div>-->
            <div @click="bindOpen" class="'commentsCon', 'doubleHidden'" :data-idx="index">{{item.content}}</div>
            <div class="commentsOpen" v-if="item.showOpen">
              <div @click="bindOpen" :data-idx="index">{{item.isOpen?'展开':'收起'}}</div>
              <img class="commentsOpenImg down" src="@/assets/images/commentsOpen.png"/>
            </div>
            <div class="allImg" v-if="item.images.length>0">
              <!--<div class="commentsImg" wx:for="{{item.images}}" wx:for-index="idx" wx:for-item="imgItem" wx:key="id">-->
              <div class="commentsImg" v-for="(imgItem,idx) in item.images" :key="imgItem.id">
                <img class="goodsImg img-class" :src="imgItem" style="width:75px;height:75px;"/>
              </div>
            </div>
            <div class="checkComments" @click="goLink2" hoverClass="none" data-link="/lionfish_comshop/pages/goods/comment?id=" :data-id="item.goods_id">{{$t('detail.quanbupinglun')}}</div>
          </div>
        </div>
      </div>
      <div v-if="buy_record_arr.count>0&&is_show_buy_record==1">
        <div class="buyRecords">
          <div class="moreBuyer" @click="goLink2" hoverClass="none" data-link="/lionfish_comshop/pages/goods/buyRecords?id=" :data-id="goods_id">
            <div class="title">
              {{$t('detail.goumaijilu')}}
              <div class="buyNum">
                
                <div>{{buy_record_arr.count}}</div> {{$t('detail.rengoumai')}},{{$t('detail.gongxiaoshou')}}
                <div>{{goods.seller_count}}</div> 份
                <img class="goBuyRecords" src="@/assets/images/community-right-arrow.png"/>
              </div>
            </div>
          </div>
          <div class="buyerList">
            <img class="buyerImg img-class" :src="item.avatar" style="height:45px;height:45px;"  v-for="(item,index) in buy_record_arr.list" :key="item.id" />
            <div class="moreBuyer" @click="goLink2" hoverClass="none" data-link="/lionfish_comshop/pages/goods/buyRecords?id=" :data-id="goods_id">
              <img class="buyerImg" src="@/assets/images/moreBuyer.png"/>
            </div>
          </div>
        </div>
      </div>
      <!--<i-relative-goods-list bind:authModal="authModal" bind:openSku="openSku" :list="relative_goods_list" :needAuth="needAuth"></i-relative-goods-list>-->
      <div class="spuDetail">
        <img class="goodsDetailTitleImg" src="@/assets/images/goodsDetailTitle.png"/>
        <div class="warmPrompt">
          <div class="wxParse">
            <!--<parser html="{{goods.description}}"></parser>-->
            <p v-html="goods.description"></p>
          </div>
        </div>
      </div>
      <div class="service">
        <div class="detailLogo">
          <div></div>
          <img class="detailLogoImg" mode="widthFix" :src="goods_details_middle_image" v-if="goods_details_middle_image"/>
          <div></div>
        </div>
        <div class="instructions" v-show="!noIns">
        <!--<div class="instructions" >-->
          <div class="wxParse">
            <!--<parser html="{{instructions}}"></parser>-->
            <p v-html="instructions"></p>
          </div>
        </div>
      </div>
      <div class="cell" @click="goLink2" data-link="/lionfish_comshop/pages/goods/industrial?id=" :data-id="goods_id" v-if="goods_industrial_switch==1&&goods_industrial">
        <div class="cell-left">
          <img class="cell-icon" mode="widthFix" src="data:image/jpeg;base64,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"></img>
          <div>{{$t('detail.gongshangzizhi')}}</div>
        </div>
        <img class="icon-right" src="@/assets/images/rightArrowImg.png"/>
      </div>
      <!--<guess-like bind:changeCartNum="changeCartNum" bind:openSku="openSku" bind:vipModal="vipModal" controller="goods.goods_guess_like" :gid="goods_id" iClass="guessLike" likeTitle="猜你喜欢" v-if="goods_id"></guess-like>-->
      <!--<img class="sloganImg" :src="(index_bottom_image && index_bottom_image != '')?index_bottom_image:'@/assets/images/icon-index-slogan.png'"/>-->
      <img class="sloganImg" src="@/assets/images/icon-index-slogan.png" width="125px" height="28px"/>
    </div>

    <div class="i-fixed-bottom">
      <div class="goods-bottom-bar">
        <div class="leftBtn">
          <a hoverClass="none" openType="switchTab" href="#/lionfish_comshop/pages/index/index">
            <div class="bar-item back-to-index">
              <!--<img class="icon" :src="iconArr.home"/>-->
              <img class="icon" src="@/assets/images/icon-tab-index.png"  height="27px" width="27px"/>
              {{$t('detail.huishouye')}}
            </div>
          </a>
          <a hoverClass="none" openType="switchTab" href="#/lionfish_comshop/pages/order/shopCart">
            <div class="bar-item shop-cart">
              <div class="icon">
                <!--<img :src="iconArr.car"/>-->
                <img src="@/assets/images/icon-tab-shop.png" height="27px" width="27px"/>
                <div class="cart-num" v-if="cartNum">{{cartNum}}</div>
              </div>
              {{$t('detail.gouwuche')}}
            </div>
          </a>
        </div>
        <div class="goodsStatus" v-if="goods.over_type==0">{{$t('detail.jijiangkaiqiang')}}</div>
        <div class="goodsStatus" v-else-if="goods.total<=0">{{$t('detail.yiqiangguang')}}</div>
        <div class="goodsStatus" v-else-if="goods.total>0&&goods.over_type==2">{{$t('detail.tuangouyijieshu')}}</div>
        <div class="goodsStatus" v-else-if="goods.grounding!=1">{{$t('detail.yixiajia')}}</div>
        <div class="goodsStatus" v-else-if="is_comunity_rest==1">{{$t('detail.tuanzhangxiuxi')}}</div>
        <div class="gobuy" v-else-if="buy_type=='integral'">
          <form bindsubmit="submit" reportSubmit="true">
            <button hidden formType="submit" id="formId_"></button>
          </form>
          <label class="balanceBtn" for="formId">
            <div @click="balance" class="bar-item balance" :style="{background: goodsdetails_buy_bg_color}">{{$t('detail.tuanzhangxiuxi')}}{{$t('detail.lijiduihuan')}}</div>
          </label>
        </div>
        <div class="gobuy" v-else>
          <form @click="addToCart" reportSubmit="true">
            <div class="bar-item add-to-cart" :style="{background: goodsdetails_addcart_bg_color}">{{$t('detail.jiarugouwuche')}}</div>
            <button class="btn" formType="submit"></button>
          </form>
          <form click="submit" reportSubmit="true">
            <button hidden formType="submit" id="formId"></button>
          </form>
          <label class="balanceBtn" for="formId">
            <div @click="balance" class="bar-item balance" :style="{background: goodsdetails_buy_bg_color}">
              {{goods.is_seckill==1?$t('detail.mashangqianggou'):$t('detail.lijigoumai')}}
            </div>
          </label>
        </div>
      </div>
    </div>


    <!--<div @click="closeSku" class="mask" :hidden="!visible"></div>-->
    <div @click="closeSku" class="mask" v-show="visible"></div>
    <!--<div bind:cancel="close" class="sku-content" :hidden="!visible" scrollUp="true">-->
    <div @click="close" class="sku-content" v-show="visible" scrollUp="true">
      <div class="sku-card">
        <div @click="closeSku" class="close">
          <img src="@/assets/images/icon-sku-close.png"/>
        </div>

        <div class="sku-header">
          <img class="sku-img" :src="cur_sku_arr.skuImage" style="width:80px;height:80px;"/>
          <div class="sku-desc">
            <div class="sku-title">
              <span>{{cur_sku_arr.spuName}}</span>
            </div>
            <div class="sku-price">
              <div class="sale-price" v-if="buy_type=='integral'">
                <span>{{cur_sku_arr.actPrice[0]}}</span>.{{cur_sku_arr.actPrice[1]}} {{$t('common.jifen')}}
              </div>
              <div class="sale-price" v-else>
                $ <span>{{cur_sku_arr.actPrice[0]}}</span>.{{cur_sku_arr.actPrice[1]}}
              </div>
              <div class="market-price">
                <span v-if="buy_type!='integral'">$</span>{{cur_sku_arr.marketPrice[0]}}.{{cur_sku_arr.marketPrice[1]}}<span v-if="buy_type=='integral'">{{$t('common.jifen')}}</span>
              </div>
              <i-vip-price :price="cur_sku_arr.card_price" v-if="is_open_vipcard_buy==1&&is_vip_card_member==1&&goods.is_take_vipcard==1"></i-vip-price>
              <div v-else-if="is_member_level_buy==1&&goods.is_mb_level_buy==1">
                <i-vip-price :price="cur_sku_arr.levelprice" type="1" v-if="is_open_vipcard_buy==1&&is_vip_card_member!=1"></i-vip-price>
                <i-vip-price :price="cur_sku_arr.levelprice" type="1" v-if="is_open_vipcard_buy!=1"></i-vip-price>
              </div>
            </div>
            <div class="sku-switch-on" v-if="cur_sku_arr.spec">已选择：{{cur_sku_arr.spec}}</div>
          </div>
        </div>

        <!--<div class="sku-spec" wx:for="{{skuList.list}}" wx:key="id">-->
        <div class="sku-spec" v-for="(item,index) in skuList.list" :key="item.id">
          <div class="title">{{item.name}}</div>
          <div class="spec-list">
            <!--<span @click="selectSku" class="{{idx==sku[index]['idx']?'on':''}}" data-disabled="{{item.canBuyNum-value<0}}" data-idx="{{idx}}" data-type="{{index}}_{{idx}}_{{value.option_value_id}}_{{value.name}}" wx:for="{{item.option_value}}" wx:for-index="idx" wx:for-item="value" wx:key="idx">{{value.name}}</span>-->
            <span @click="selectSku" :class="idx==sku[index]['idx']?'on':''" :data-disabled="item.canBuyNum-value<0" :data-idx="idx" :data-type="index_idx_value.option_value_id_value.name"  v-for="(value,idx) in item.option_value" :key="item.idx">{{value.name}}</span>
          </div>
        </div>
        <div class="sku-num-content">
          <div class="title">{{$t(common.shuliang)}}</div>
          <div :class="['i-class', 'i-input-number', 'i-input-number-size-'+size]">
            <div @click="setNum" class="i-input-number-minus" data-type="decrease">
              <img src="@/assets/images/icon-input-reduce.png"/>
            </div>
            <input bindblur="handleBlur" bindfocus="handleFocus" bindinput="changeNumber" class="i-input-number-text" type="number" :value="sku_val"></input>
            <div @click="setNum" class="i-input-number-plus" data-type="add">
              <img src="@/assets/images/icon-input-add.png"/>
            </div>
          </div>
          <!--<div class="msg" v-if="skuList[current].isLimit">-->
            <!--<span v-if="skuList[current].limitMemberNum>-1">每人限{{skuList[current].limitMemberNum}}单</span>-->
            <!--<span v-if="skuList[current].limitOrderNum>-1">每单限{{skuList[current].limitOrderNum}}份</span>-->
            <!--<span></span>-->
          <!--</div>-->
          <!--<div class="even-num" v-else-if="!skuList[current].isLimit&&skuList[current].canBuyNum-value<=10&&skuList[current].canBuyNum-value>-1">还可以购买 {{skuList[current].canBuyNum-value}} 件</div>-->
        </div>
        <form @click="gocarfrom" reportSubmit="true">
          <button class="sku-confirm" :disabled="cur_sku_arr.stock==0?true:false" formType="submit">
            <div>{{cur_sku_arr.stock==0?'已抢光':'确定'}}</div>
          </button>
        </form>
      </div>
    </div>
    </div>


    <!--<button @click="share_handler" class="fixed-share">-->
      <!--<div class="iconfont icon-fenxiang"></div>-->
      <!--<div>分享</div>-->
    <!--</button>-->
    <!--<button class="fixed-service" openType="contact" v-if="isShowContactBtn==1">-->
      <!--<div class="iconfont icon-kefu"></div>-->
      <!--<div>客服</div>-->
    <!--</button>-->
    <!--<i-order-notify iClass="order-notify" :stopNotify="stopNotify" v-if="order_notify_switch==1"></i-order-notify>-->
    <!--<i-new-auth bind:authSuccess="authSuccess" bind:cancel="authModal" :needAuth="needAuth&&showAuthModal" :needPosition="needPosition"></i-new-auth>-->
    <!--<div @click="closeShareModal" class="share-modal" :hidden="hideModal">-->
      <!--<div class="share-modal-content">-->
        <!--<div class="share-modal-img">-->
          <!--<img mode="widthFix" :src="shareImgUrl"/>-->
        <!--</div>-->
        <!--<div class="share-modal-btn-list">-->
          <!--<div class="share-modal-btn-item">-->
            <!--<button class="none_btn" openType="share" plain="true">-->
              <!--<div class="iconfont icon-weixin1 btn-icon"></div>-->
              <!--<div class="btn-text">-->
                <!--<div>分享好友</div>-->
              <!--</div>-->
            <!--</button>-->
          <!--</div>-->
          <!--<div @click="saveThumb" class="share-modal-btn-item">-->
            <!--<div class="iconfont icon-zhaopian btn-icon"></div>-->
            <!--<div class="btn-text">-->
              <!--<div>保存相册</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
    <!--<i-change-community bind:changeComunity="confrimChangeCommunity" bind:noChange="cancelChangeCommunity" :canChange="hide_community_change_btn==0" cancelFn="true" :changeCommunity="changeCommunity" :community="community" :groupInfo="groupInfo" :visible="showChangeCommunity"></i-change-community>-->
    <!--<canvas canvasId="myCanvas" class="canvas-img" :style="width: (canvasWidth)px;height: (canvasHeight)px;"></canvas>-->
    <canvas canvasId="myCanvas" class="canvas-img" :style="{width:canvasWidth + 'px',height: canvasHeight + 'px'}"></canvas>
    <!--<i-sub-notice :templateId="need_subscript_template" :visible="is_need_subscript==1"></i-sub-notice>-->
    <!--<i-vip-modal :imgUrl="pop_vipmember_buyimage" :visible="showVipModal"></i-vip-modal>-->
    <!--<i-modal bind:cancel="handleHexiaoModal" scrollUp="true" :visible="showHexiaoModal">-->
      <!--<div class="sku-card">-->
        <!--<div class="title text-gray mb10 fsz-26 i-flex i-alc">-->
          <!--<div class="i-flex-item">共 <div class="red bold">{{hx_len}}</div> 个自提点</div>-->
          <!--<div @click="handleHexiaoModal" class="iconfont icon-guanbi fsz-34 text-3"></div>-->
        <!--</div>-->
        <!--<scroll-div scrollY style="height: 60vh;">-->
          <!--<div class="border-bottom py10"  v-for="(item,index) in hexiao_arr" :key="item.index" >-->
            <!--<div class="fsz-28 weight mb5">{{item.room_name}}</div>-->
            <!--<div class="fsz-22">{{item.detail_address}}</div>-->
          <!--</div>-->
        <!--</scroll-div>-->
      <!--</div>-->
    <!--</i-modal>-->
    <!--<scroll-div class="coverVideo" scrollY="false" style="height:100vh;" v-if="showCoverVideo">-->
      <!--<div class="main">-->
        <!--<div class="section">-->
          <!--<video autoplay loop autoPauseIfOpenNative="true" bindended="coverVideoEnd" controls="false" direction="0" id="coverVideo" :objectFit="is_heng==0?'fill':'contain'" showFullscreenBtn="false" :src="goods.video"></video>-->
        <!--</div>-->
        <!--<cover-div @click="closeCoverVideo" class="goods" :data-id="goods.id" v-if="goods">-->
          <!--<cover-div class="good-img">-->
            <!--<cover-image :src="goods.image_thumb?goods.image_thumb:'@/assets/images/placeholder-refund.png'"></cover-image>-->
          <!--</cover-div>-->
          <!--<cover-div style="display: flex;flex-direction: column;justify-content: space-between;margin-right:5px;flex:1;">-->
            <!--<cover-div class="good-title .text-overflow2">{{goods.goodsname}}</cover-div>-->
            <!--<cover-div class="xqbottom">-->
              <!--<cover-div class="good-price">${{goods.price_front}}.{{goods.price_after}}</cover-div>-->
            <!--</cover-div>-->
          <!--</cover-div>-->
        <!--</cover-div>-->
      <!--</div>-->
    <!--</scroll-div>-->

  </div>

</template>

<script>

  import { swiper, swiperSlide } from "vue-awesome-swiper";
  //  require("swiper/dist/css/swiper.css");

  import GlobalMixin from '../../mixin/globalMixin.js';
  import status from '../../utils/index.js'
  import util from '../../utils/index.js'

  var _extends = Object.assign || function(t) {
      for (var a = 1; a < arguments.length; a++) {
        var e = arguments[a];
        for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
      }
      return t;
    };
  var detailClearTime = null;

  function count_down(t, a) {

    var e = Math.floor(a / 1000), o = e / 3600 / 24, i = Math.floor(o), s = e / 3600 - 24 * i, n = Math.floor(s), d = e / 60 - 1440 * i - 60 * n, r = Math.floor(d), c = e - 86400 * i - 3600 * n - 60 * r;

    t.endtime= {
      days: fill_zero_prefix(i),
      hours: fill_zero_prefix(n),
      minutes: fill_zero_prefix(r),
      seconds: fill_zero_prefix(c),
      show_detail: 1
    };
    if( a <= 0 ){
      clearTimeout(detailClearTime);
      t.endtime= {
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00"
      }
      return;
    }
    t.$forceUpdate();
    detailClearTime = setTimeout(function() {
      count_down(t, a -= 1000);
    }, 1000);
  }

  function fill_zero_prefix(t) {
    return t < 10 ? "0" + t : t;
  }


  export default {
    mixins: [GlobalMixin],
    swiper: [swiper],
    swiperSlide: [swiperSlide],
    name:'goods-goodsDetail',
    data() {
      return {
        endtime: {
          days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00"
        },
        goods_id:0,
        size:1,
        showHexiaoModal:false,
        indexcomminggoodsbitmap:'/lionfish_comshop/images/index-comming-goods-bitmap.png',
        needAuth: false,
        goodsIndex: 1,
        goods_id: 0,
        endtime: {
          days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00"
        },
        is_share_html: true,
        stickyFlag: false,
        showSkeleton: true,
        imageSize: {
          imageWidth: "100%",
          imageHeight: 300
        },
        cartNum: 0,
        noIns: false,
        index_bottom_image: "",
        hideModal: true,
        shareImgUrl: "",
        goods_details_middle_image: "",
        is_show_buy_record: 0,
        stopNotify: true,
        iconArr: {
          home: "@/assets/images/icon-tab-index.png",
          car: "@/assets/images/icon-tab-shop.png"
        },
        canvasWidth: 375,
        canvasHeight: 300,
        fmShow: true,
        relative_goods_list: [],
        needPosition: false,
        groupInfo: {
          group_name: "社区",
          owner_name: "团长"
        },
        showCoverVideo: false,

        stickyFlag: false,


        imageUrl: "",
        goodsImg: "",
        currentOptions: [],
        focusFlag: false,
        buy_type: "",
        $data:{
          id: "",
          scene: "",
          community_id: 0,
        },
        canvasWidth: 500,
        canvasHeight: .8 * 600,
        buy_type: 'dan',
        goods_id: '',
        windowWidth: document.body.clientWidth,     // 屏幕宽
        windowHeight: document.body.clientHeight,    // 屏幕高

        showCoverVideo: false,
        order_comment_count: 0,
        comment_list: [],
        goods: {
          label_info:{}
        },
        options: {},
        order: {
          goods_id: '',
          pin_id: ''
        },
        share_title: '',
        buy_record_arr: [],
        goods_image: [],
        goods_image_length: 0,
        service: '',
        showSkeleton: false,
        is_comunity_rest: 0,
        prevImgArr: [],
        open_man_orderbuy: false,
        man_orderbuy_money: 0,
        goodsdetails_addcart_bg_color: "linear-gradient(270deg, #f9c706 0%, #feb600 100%)",
        goodsdetails_buy_bg_color: "linear-gradient(90deg, #ff5041 0%, #ff695c 100%)",
        isopen_community_group_share: 0,
        group_share_info: {},
        relative_goods_list: [],
        needPosition: !!A,
        is_close_details_time:  0,
        is_open_vipcard_buy:  0,
        modify_vipcard_name:'',
        is_vip_card_member:  0,
        modify_vipcard_logo: '',
        is_commiss_mb: false,
        commiss_mb_money: 0,
        is_goods_head_mb: false,
        goods_head_money: 0,
        is_member_level_buy: false,
        is_need_subscript: false,
        need_subscript_template: false,
        is_can_headsales: false,
        is_only_hexiao: false,
        hexiao_arr: [],
        hx_len: 0,
        is_hide_details_count: 0,


        instructions: '',
        goods_details_middle_image: '',
        order_notify_switch: false,
        is_show_comment_list: 1,
        goods_details_price_bg: '',
        isShowContactBtn:  0,
        goods_industrial_switch:  0,
        goods_industrial:  "",
        is_show_ziti_time:  0,
        hide_community_change_btn:  0,
        is_show_goodsdetails_communityinfo:  0,

        sku: [],
        sku_val: 1,
        skuList: {
          list:[],
//          isLimit:false,
//          canBuyNum:0,
//          limitMemberNum:0,
//          limitOrderNum:0

        },
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
        is_just_addcar: 0,
        showVipModal : false,
        showSku:false
      }
    },
    created: function() {
      this.$store.dispatch('app/showToolbarBack')
      this.onLoad();
      this.onShow();
    },
    methods: {
      onLoad: function() {
        var e = this.$route.query;
        this.$app.globalData.navBackUrl = "";
        var o = this;
        status.setNavBgColor(); status.setGroupInfo().then(function(t) {
            console.log(t,"setGroupInfo");
          o.groupInfo= t;
        });

//        status.setIcon().then(function(t) {
//          console.log(t,"setIcon");
//          o.iconArr= t;
//        });
        var t = decodeURIComponent(e.scene);
        if ("undefined" !== t) {
          var a = t.split("_");
          e.id = a[0], e.share_id = a[1], e.community_id = a[2];
        }
        "undefined" != e.share_id && 0 < e.share_id && this.$wx.setStorage({
          key: "share_id",
          data: e.share_id
        });
        var s = e.type || "";
        this.buy_type = s, this.$data.id = e.id, this.$data.community_id = e.community_id,
          this.$data.scene = e.scene;
        var i = {
          canvasWidth: o.windowWidth,
          canvasHeight: .8 * o.windowWidth,
          buy_type: s,
          goods_id: e.id
        }, n = this.$wx.getStorageSync("community"), d = n && n.communityId || "";
        if (
//            this.$wx.showLoading(),
          "undefined" != e.community_id && 0 < e.community_id && "integral" != s) if (d) console.log("step3 本地社区存在"),
          this.paramHandle(e, n); else {
          e.community_id, util.getCommunityInfo().then(function(t) {
            console.log("step1 分享来的社区", t), o.paramHandle(e, t);
          }).catch(function(t) {
            console.log("step4 新人"), "" != Object.keys(t) && util.addhistory(t, true);
          });
        } else util.getCommunityById(0).then(function(t) {
          if (console.log("没有分享社区直接访问", t), 1 == t.open_danhead_model) {
            var a = t.default_head_info;
            console.log("default_head_info", a), this.$app.globalData.community = a, n && n.communityId != a.communityId && (this.$app.globalData.changedCommunity = true),
              util.addhistory(a), this.$wx.setStorage({
              key: "community",
              data: a
            }), o.community= a, o.get_goods_details(e.id, a, "");
          } else util.getCommunityInfo().then(function(t) {
            t ? (o.community= t, o.get_goods_details(e.id, "", t.communityId)) : (o.community= n, o.get_goods_details(e.id, "", d));
          });
        });
//        o.setData(i);
          o.canvasWidth= i.canvasWidth,
          o.canvasHeight= i.canvasHeight,
          o.buy_type= i.buy_type
          o.goods_id= i.goods_id;
          this.get_instructions();
      },
      paramHandle: function(s) {
        var i = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "";
        console.log("step2");
        var n = this, d = s.id, r = s.community_id;
        n.$http({
            controller: "index.get_community_info",
            community_id: r
          }).then(t=> {
              console.log(t,'get_community_info')
            if (0 == t.data.code) {
              var a = t.data.data;
              console.log(a);
              var e = i.communityId;
              if (1 == t.data.open_danhead_model) {
                var o = t.data.default_head_info;
                this.$app.globalData.community = o, i && i.communityId != o.communityId && (this.$app.globalData.changedCommunity = true),
                  util.addhistory(o), this.$wx.setStorage({
                  key: "community",
                  data: o
                }), n.community= o, n.get_goods_details(d, o, "");
              } else {
                  if(e == r || "" == a){
                    console.log("step5 分享与本地相同"),
                      this.$wx.setStorageSync("community", a),
                      n.community= a,
                      n.get_goods_details(s.id, "", r)
                  }else {
                      if (e){
                        n.showChangeCommunity= true,
                          n.changeCommunity= a,
                          n.community= i, n.get_goods_details(s.id, "", e)
                      }else {
                        n.changeCommunity= a, n.confrimChangeCommunity()
                      }
                  }
              }

            }
        });
      },
      get_goods_details: function(t,a,A) {

//        var a = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "", A = arguments[2],
        var L = this;
        if (!t) {
          //        this.$wx.hideLoading(),
          this.$wx.showModal({
            title: "提示",
            content: "参数错误",
            showCancel: false,
            confirmColor: "#F75451",
            success: function(ret) {
              ret.confirm && this.$wx.redirectTo({
                url: "/lionfish_comshop/pages/index/index"
              });
            }
          })
          return false;
        }

        var e = this.$wx.getStorageSync("token");
        var currentCommunity_id = 0;
        if (a) currentCommunity_id = a.communityId;
        this.$http({
            controller: "goods.get_goods_detail",
            token: e,
            id: t,
            community_id: 1022
          }).then(t=> {
              console.log(t,"get_goods_detail");
//            setTimeout(function() {
//              this.$wx.hideLoading();
//            }, 1e3);
            var a = t.data, e = a.goods, o = a.is_can_headsales;
            if (e && 0 != e.length && "" != Object.keys(e) || this.$wx.showModal({
                title: "提示",
                content: "该商品不存在，回首页",
                showCancel: false,
                confirmColor: "#F75451",
                success: function(t) {
                  t.confirm && this.$wx.switchTab({
                    url: "/lionfish_comshop/pages/index/index"
                  });
                }
              }), 0 == o && "integral" != L.buy_type) {
              var s = L.data.groupInfo;
              this.$app.util.message("此商品在您所属" + s.group_name + "不可参与", "switchTo:/lionfish_comshop/pages/index/index", "error");
            }

            var i = t.comment_list;
            i.map(function(t) {
              3 < 14 * t.content.length / L.windowWidth && (t.showOpen = true),
                t.isOpen = true;
            });
            var n = t.data.goods_image, d = [];
            n.forEach(function(t) {
              d.push(t.image);
            });
            var r = t.isopen_community_group_share || 0, c = t.group_share_info, u = t.data.relative_goods_list || [], l = [];
            "[object Object]" == Object.prototype.toString.call(u) && 0 < Object.keys(u).length ? Object.keys(u).forEach(function(t) {
              l.push(u[t]);
            }) : l = u;
            var _ = t.data, m = _.is_need_subscript, g = _.need_subscript_template, h = _.is_open_vipcard_buy, f = _.modify_vipcard_name, p = _.is_vip_card_member, y = _.modify_vipcard_logo, v = _.is_member_level_buy, x = _.is_only_hexiao, w = _.hexiao_arr, b = _.is_hide_details_count, k = e.price || 0, I = e.card_price || 0;
            e.feePrice = (k - I).toFixed(2);
            var P = t.data, C = P.is_commiss_mb, D = P.commiss_mb_money, T = P.is_goods_head_mb, S = P.goods_head_money,
              M = w ? Object.keys(w).length : 0;
            L.currentOptions = t.data.options;
            var N = false;

            e.video && 1 == t.is_open_goods_full_video && (N = true);

            L.showCoverVideo= N,
            L.order_comment_count= t.order_comment_count,
            L.comment_list= i,
            L.goods= e,
            L.options= t.data.options;

           L.order = {
                     goods_id: t.data.goods.goods_id,
                     pin_id: t.data.pin_id
                   };
            L.share_title= e.share_title,
            L.buy_record_arr= t.data.buy_record_arr,
            L.goods_image= t.data.goods_image,
            L.goods_image_length= t.data.goods_image.length,
            L.service= e.tag,
            L.showSkeleton= false,
            L.is_comunity_rest= t.is_comunity_rest,
            L.prevImgArr= d,
            L.open_man_orderbuy= t.open_man_orderbuy,
            L.man_orderbuy_money= t.man_orderbuy_money,
            L.goodsdetails_addcart_bg_color= t.goodsdetails_addcart_bg_color || "linear-gradient(270deg, #f9c706 0%, #feb600 100%)",
            L.goodsdetails_buy_bg_color= t.goodsdetails_buy_bg_color || "linear-gradient(90deg, #ff5041 0%, #ff695c 100%)",
            L.isopen_community_group_share= r,
            L.group_share_info= c,
            L.relative_goods_list= l,
            L.needPosition= !!A,
            L.is_close_details_time= t.is_close_details_time || 0,
            L.is_open_vipcard_buy= h || 0,
            L.modify_vipcard_name= f,
            L.is_vip_card_member= p || 0,
            L.modify_vipcard_logo= y,
            L.is_commiss_mb= C,
            L.commiss_mb_money= D,
            L.is_goods_head_mb= T,
            L.goods_head_money= S,
            L.is_member_level_buy= v,
            L.is_need_subscript= m,
            L.need_subscript_template= g,
            L.is_can_headsales= o,
            L.is_only_hexiao= x,
            L.hexiao_arr= w,
            L.hx_len= M,
            L.is_hide_details_count= b;

          L.skuList= {
              list:[
//                  {
//                isLimit:false,
//                canBuyNum:0,
//                limitMemberNum:0,
//                limitOrderNum:0
//              }
              ],
          };
          L.cur_sku_arr = {
            skuImage: '',
            spuName: '',
            actPrice:[],
            marketPrice:[],
            card_price:0,
            levelprice:0,
            spec:'',
            stock:0
          };
          L.visible = false;
          L.noIns = false;
          L.cartNum = L.cartNum ? L.cartNum : 0;
          L.showVipModal = false;
          L.showHexiaoModal = false;
          L.sku_val= 1;
          L.size = 1;

          L.endtime= {
            days: "00",
            hours: "00",
            minutes: "00",
            seconds: "00"
          };

          L.$forceUpdate();
          var goods_share_image = e.goods_share_image;
          if (goods_share_image) console.log("draw分享图")
//            status.download(goods_share_image + "?imagediv2/1/w/500/h/400").then(function(t) {
//            L.goodsImg = t.tempFilePath, L.drawImgNoPrice();
//          });
          else {
            console.log("draw价格");
            var a = e.image_thumb;
//            status.download(a + "?imagediv2/1/w/500/h/400").then(function(t) {
//              L.goodsImg = t.tempFilePath, L.drawImg();
//            });
          }

             1 == t.is_comunity_rest && this.$wx.showModal({
              title: "温馨提示",
              content: L.groupInfo.owner_name + "休息中，欢迎下次光临!",
              showCancel: false,
              confirmColor: "#F75451",
              confirmText: "好的",
              success: function(t) {}
            });
//            var j = 0;
//            0 < (j = 0 == e.over_type ? 1000 * (e.begin_time - t.cur_time) : 1000 * (e.end_time - t.cur_time)) && count_down(L, j);

          let over_type = e.over_type;
          var seconds = 0;
          if (over_type == 0) {
            seconds = (e.begin_time - t.data.cur_time) * 1000;
          } else {
            seconds = (e.end_time - t.data.cur_time) * 1000;
          }
          if (seconds > 0) {
            count_down(L, seconds);
          }

        });
      },
      confrimChangeCommunity: function() {
        var t = this.changeCommunity, a = this.$wx.getStorageSync("token");
        this.$app.globalData.community = t, this.$app.globalData.changedCommunity = true, this.$wx.setStorage({
          key: "community",
          data: t
        }), a && util.addhistory(t), this.setData({
          community: t,
          showChangeCommunity: false
        }), this.get_goods_details(this.goods_id, t, t.communityId), console.log("用户点击确定");
      },
      cancelChangeCommunity: function() {
        var t = this.data, a = t.is_can_headsales, e = t.groupInfo;
        0 == a && this.$app.util.message("此商品在您所属" + e.group_name + "不可参与", "switchTo:/lionfish_comshop/pages/index/index", "error"),
          console.log("取消切换");
      },
      authSuccess: function() {
        var t = this.$data.id, a = this.$data.scene, e = "/lionfish_comshop/pages/goods/goodsDetail?id=" + t + "&community_id=" + this.$data.community_id + "&scene=" + a;
        this.$app.globalData.navBackUrl = e;
        var o = this.$wx.getStorageSync("community"), s = this.needPosition;
        this.needAuth= false, o && (s = false), s || this.$wx.redirectTo({
          url: e
        });
      },
      authModal: function() {

        if (this.needAuth) {
          this.showAuthModal= !this.showAuthModal
//          return false;
        }
        if(this.showAuthModal){
          this.$wx.redirectTo({
            url: "/login"
          })
        }
        return true;

      },
      imageLoad: function(t) {
//        var a = util.imageUtil(t);
//        this.imageSize= a;
      },
      get_instructions: function() {
        var e = this, t = this.$data.id;
        this.$http({
            controller: "goods.get_instructions",
            goods_id: t
          }).then(t=> {
              console.log(t,"get_instructions")
            if (0 == t.code) {
              var a = t.data.value;
              if("" == a) e.noIns= true;

                e.instructions= a,
                e.index_bottom_image= t.data.index_bottom_image,
                e.goods_details_middle_image= t.data.goods_details_middle_image,
                e.is_show_buy_record= t.data.is_show_buy_record,
                e.order_notify_switch= t.data.order_notify_switch,
                e.is_show_comment_list= t.data.is_show_comment_list,
                //e.is_show_comment_list= 1,
                e.goods_details_price_bg= t.data.goods_details_price_bg,
                e.isShowContactBtn= t.data.index_service_switch || 0,
                e.goods_industrial_switch= t.data.goods_industrial_switch || 0,
                e.goods_industrial= t.data.goods_industrial || "",
                e.is_show_ziti_time= parseInt(t.data.is_show_ziti_time) || 0,
                e.hide_community_change_btn= t.data.hide_community_change_btn || 0,
                e.is_show_goodsdetails_communityinfo= t.data.is_show_goodsdetails_communityinfo || 0;
            }
        });
      },
      returnTop: function() {
        this.stickyFlag = false, this.setData({
          stickyFlag: false
        }), this.$wx.pageScrollTo({
          scrollTop: 0,
          duration: 500
        });
      },
      addToCart: function(t) {

        if (this.authModal()) {

          var a = t.detail.formId;
          var e = this.$wx.getStorageSync("token");
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

        var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : null;
        if (this.authModal()) {

          var a = this, e = this.is_just_addcar;
          if (t) {
            var o = t.detail, s = o.actId, i = o.skuList;
            e = 1;
          } else s = this.goods_id, i = this.currentOptions;
          a.addCar_goodsid= s;
          var n = i.list || [], d = [];
          if (0 < n.length) {
            for (var r = 0; r < n.length; r++) {
              var c = n[r].option_value[0], u = {
                name: c.name,
                id: c.option_value_id,
                index: r,
                idx: 0
              };
              d.push(u);
            }
            for (var l = "", _ = 0; _ < d.length; _++) _ == d.length - 1 ? l += d[_].id : l = l + d[_].id + "_";
            var m = i.sku_mu_list[l];

              a.sku= d,
              a.sku_val= 1,
              a.cur_sku_arr= m,
              a.skuList= i,
              a.visible= true,
              a.showSku= true,
              a.is_just_addcar= e
            ;
          } else if (t) {
            var g = o.allData;

              a.sku= [],
              a.sku_val= 1,
              a.skuList= [],
              a.cur_sku_arr= g,
              a.is_just_addcar= e;
            var h = {
              detail: {
                formId: ""
              }
            };
            h.detail.formId = "the formId is a mock one", a.gocarfrom(h);
          } else {
            var f = this.goods, p = f.card_price || "0.00", y = f.levelprice || "0.00", v = {
              canBuyNum: f.total,
              spuName: f.goodsname,
              actPrice: f.actPrice,
              marketPrice: f.marketPrice,
              stock: f.total,
              skuImage: f.image_thumb,
              card_price: p,
              levelprice: y
            };

              a.sku= [],
              a.sku_val= 1,
              a.cur_sku_arr= v,
              a.skuList= [],
              a.visible= true,
              a.showSku= true;
              a.$forceUpdate();
          }
        }
      },
      gocarfrom: function(t) {
//        this.is_just_addcar;
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
          this.visible= false,
          this.stopClick= false;
          this.$forceUpdate();
      },
      goOrder: function() {
        var i = this;
        if (i.can_car && (i.can_car = false), 1 == this.open_man_orderbuy && 0 == this.is_just_addcar) {
          var t = 1 * this.man_orderbuy_money, a = this.sku_val, e = this.cur_sku_arr, o = e.actPrice[0] + "." + e.actPrice[1];
          if (console.log(1 * o * a), 1 * o * a < t) return this.$wx.showToast({
            title: "满" + t + "元可下单！",
            icon: "none"
          }), false;
        }
        this.$wx.getStorageSync("token");
        var s = this.$wx.getStorageSync("community"), n = i.addCar_goodsid, d = s.communityId, r = i.sku_val, c = i.cur_sku_arr, u = "", l = i.is_just_addcar;
        c && c.option_item_ids && (u = c.option_item_ids);
        var _ = this.buy_type ? this.buy_type : "dan", m = {
          goods_id: n,
          community_id: d,
          quantity: r,
          sku_str: u,
          buy_type: _,
          pin_id: 0,
          is_just_addcar: l
        };
        util.addCart(m).then(function(t) {
            console.log(m,"addCart")

          if (1 == t.showVipModal) {
            var a = t.data.pop_vipmember_buyimage;
//            this.$wx.hideLoading(),
              i.pop_vipmember_buyimage= a,
              i.showVipModal= true,
              i.visible= false;

          } else if (3 == t.code || 7 == t.code) i.$wx.showToast({
            title: t.msg,
            icon: "none",
            duration: 2e3
          }); else if ("integral" == _) if (6 == t.code) {
            var e = t.msg;
            i.$wx.showToast({
              title: e,
              icon: "none",
              duration: 2e3
            });
          } else i.$wx.navigateTo({
            url: "/lionfish_comshop/pages/order/placeOrder?type=integral"
          }); else if (4 == t.code)
//              this.$wx.hideLoading(),

            i.needAuth= true,
            i.showAuthModal= true,
            i.visible= false
          ; else if (6 == t.code) {
            e = t.msg;
            var o = t.max_quantity || "";
            if(0 < o){
                i.sku_val= o;
                this.$wx.showToast({
                title: e,
                icon: "none",
                duration: 2e3
              });
            }
          } else if (1 == l) {

              i.closeSku();
              i.$wx.showToast({
                title: "已加入购物车",
                image: "@/assets/images/addShopCart.png"
              });
            i.$app.globalData.cartNum = t.total;
            i.cartNum= t.total;
              status.indexListCarCount(n);
          } else {
            var s = t.is_limit_distance_buy;
//            3 < getCurrentPages().length ? this.$wx.redirectTo({
//              url: "/lionfish_comshop/pages/order/placeOrder?type=dan&is_limit=" + s
//            }) : this.$wx.navigateTo({
//              url: "/lionfish_comshop/pages/order/placeOrder?type=dan&is_limit=" + s
//            });
            i.$wx.redirectTo({
              url: "/lionfish_comshop/pages/order/placeOrder?type=dan&is_limit=" + s
            });
          }
        }).catch(function(t) {
          this.$wx.showToast({
            title: t || "请求失败",
            icon: "none",
            duration: 2000
          })
        });
      },
      vipModal: function(t) {
        this.setData(t.detail);
      },
      selectSku: function(t) {
        var a = t.currentTarget.dataset.type.split("_"), e = this, o = e.sku, s = e.skuList, i = e.sku_val, n = {
          name: a[3],
          id: a[2],
          index: a[0],
          idx: a[1]
        };
        o.splice(a[0], 1, n);
        for (var d = "", r = 0; r < o.length; r++) r == o.length - 1 ? d += o[r].id : d = d + o[r].id + "_";
        var c = s.sku_mu_list[d], u = {};
        (i = i || 1) > c.canBuyNum && (u.sku_val = c.canBuyNum, this.$wx.showToast({
          title: "最多只能购买" + c.canBuyNum + "件",
          icon: "none"
        }));
        var ext = _extends({
          cur_sku_arr: c,
          sku: o
        }, u)
        console.log(d);
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
        if(this.authModal()){
          this.is_just_addcar= 0;
          this.openSku()
        }
      },
      setNum: function(t) {

        var a = t.currentTarget.dataset.type, e = 1, o = 1 * this.sku_val;
        "add" == a ? e = o + 1 : "decrease" == a && 1 < o && (e = o - 1);
        var s = this.sku, i = this.skuList;
        if (0 < s.length) for (var n = "", d = 0; d < s.length; d++) d == s.length - 1 ? n += s[d].id : n = n + s[d].id + "_";
        0 < i.length ? e > i.sku_mu_list[n].canBuyNum && (e -= 1) : e > this.cur_sku_arr.canBuyNum && (e -= 1);
        this.sku_val= e;
        this.visible = true;
        this.$forceUpdate();
      },
      scrollImagesChange: function(t) {
        this.videoContext.pause(), this.fmShow= true,
          this.goodsIndex= t.detail.current + 1;
      },
      share_handler: function() {
        this.is_share_html= false;
      },
      hide_share_handler: function() {
        this.is_share_html= true;
      },
      share_quan: function() {
        if (this.authModal()) {
          this.$wx.showLoading({
            title: "获取中"
          });
          var t = this.$wx.getStorageSync("token"), a = this.$wx.getStorageSync("community"), e = this.order.goods_id, o = a.communityId, s = this;
          this.$http({

              controller: "goods.get_user_goods_qrcode",
              token: t,
              community_id: o,
              goods_id: e
            }).then(t=> {
                console.log(t,"get_user_goods_qrcode");
              if (0 == t.code) {
//                setTimeout(function() {
//                  this.$wx.hideLoading();
//                }, 2e3);
                var a = t.image_path;
                this.$wx.getImageInfo({
                  src: a,
                  success: function(t) {
                    var a = t.path;
//                    this.$wx.saveImageToPhotosAlbum({
//                      filePath: a,
//                      success: function(t) {
//                        this.$wx.showToast({
//                          title: "图片保存成功，可以分享了",
//                          icon: "none",
//                          duration: 2e3
//                        }), s.is_share_html= true;
//                      }
//                    });
                  }
                });
              } else s.needAuth= true;
          });
        }
      },
      onShow: function() {
//        var a = this;
//        util.check_login_new().then(function(t) {
//            console.log(t,"check_login_new");
//          t ? (0, status.cartNum)("", true).then(function(t) {
//            if (0 == t.code) a.cartNum= t.data;
//          }) : a.needAuth= true;
//        });
        var a = this;
        util.check_login_new().then(function(t) {

          if(!t){
            a.needAuth= !0;
          } else {
            status.cartNum().then(function(e) {

              if(0 == e.code) {
                a.cartNum = e.data;
                a.$forceUpdate();
              }
            })
          }
        });
        this.stopNotify= false;
      },
      onReady: function(t) {
        this.videoContext = this.$wx.createVideoContext("myVideo"), this.coverVideoContext = this.$wx.createVideoContext("coverVideo");
      },
      onHide: function() {
        this.stopNotify= true, console.log("详情页hide", this.stopNotify);
      },
      onUnload: function() {
        console.log("onUnload"), this.stopNotify= true, console.log("详情页unload", this.stopNotify), detailClearTime = null, clearTimeout(detailClearTime);
      },
      get_share_img: function() {
        if (this.authModal()) if (this.$wx.showLoading(), "" != this.shareImgUrl) this.$wx.hideLoading(),
          this.hideModal= false,
          this.is_share_html= true; else {
          var t = this.$wx.getStorageSync("token"), a = this.$wx.getStorageSync("community"), e = this.goods_id, o = a.communityId, s = this;
          this.$http({

              controller: "goods.get_user_goods_qrcode",
              token: t,
              community_id: o,
              goods_id: e
            }).then(t=> {
              if (0 == t.code) {
                this.$wx.hideLoading();
                var a = t.image_path;
//                this.$wx.predivImage({
//                  current: a,
//                  urls: [ a ]
//                });
              } else s.needAuth= true;
          });
        }
      },
      closeShareModal: function() {
        this.hideModal= true;
      },
      bindOpen: function(t) {
        var a = t.currentTarget.dataset.idx;
        if (console.log(a), this.comment_list[a].isOpen) {
          this.comment_list[a].isOpen = false;
          var e = this.comment_list;
          this.comment_list= e;
        } else {
          this.comment_list[a].isOpen = true;
          e = this.comment_list;
          this.comment_list= e;
        }
      },
      saveThumb: function(t) {
        this.$wx.showLoading();
        var e = this, a = this.shareImgUrl;
//        this.$wx.getImageInfo({
//          src: a,
//          success: function(t) {
//            var a = t.path;
//            a && this.$wx.saveImageToPhotosAlbum({
//              filePath: a,
//              success: function(t) {
//                console.log(t), this.$wx.hideLoading(), this.$wx.showToast({
//                  title: "已保存相册",
//                  icon: "none",
//                  duration: 2e3
//                }), e.hideModal= true;
//              },
//              fail: function(t) {
//                this.$wx.hideLoading(), console.log(t), "saveImageToPhotosAlbum:fail:auth denied" === t.errMsg && this.$wx.openSetting({
//                  success: function(t) {
//                    t.authSetting["scope.writePhotosAlbum"] ? console.log("获取权限成功，再次点击图片保存到相册") : console.log("获取权限失败");
//                  }
//                });
//              }
//            });
//          }
//        });
      },
      drawImgNoPrice: function() {
        var a = this;
//        this.$wx.createSelectorQuery().select(".canvas-img").boundingClientRect(function() {
//          var t = this.$wx.createCanvasContext("myCanvas");
//          t.drawImage(a.goodsImg, 0, 0, status.getPx(375), status.getPx(300)), a.data.goods.video && t.drawImage("@/assets/images/play.png", status.getPx(127.5), status.getPx(90), status.getPx(120), status.getPx(120)),
//            t.save(), t.restore(), t.draw(false, a.checkCanvasNoPrice());
//        }).exec();
      },
      checkCanvasNoPrice: function() {
        var a = this;
//        setTimeout(function() {
//          this.$wx.canvasToTempFilePath({
//            canvasId: "myCanvas",
//            success: function(t) {
//              t.tempFilePath ? a.imageUrl = t.tempFilePath : a.drawImgNoPrice(), console.log("我画完了");
//            },
//            fail: function(t) {
//              a.drawImgNoPrice();
//            }
//          });
//        }, 500);
      },
      drawImg: function() {
        var t = this.data.endtime, c = (0 < t.days ? t.days + "天" : "") + t.hours + ":" + t.minutes + ":" + t.seconds, u = this;
        this.$wx.createSelectorQuery().select(".canvas-img").boundingClientRect(function() {
          var t = this.$wx.createCanvasContext("myCanvas");
          t.font = "28px Arial";
          var a = t.measureText("$").width + 2, e = t.measureText(u.data.goods.price_front + "." + u.data.goods.price_after).width;
          t.font = "17px Arial";
          var o = t.measureText("$" + u.data.goods.productprice).width + 3, s = t.measureText("累计销售 " + u.data.goods.seller_count).width, i = t.measureText("· 剩余" + u.data.goods.total + " ").width + 10;
          t.font = "18px Arial";
          var n = 0 == u.data.goods.over_type ? "距开始" : "距结束", d = t.measureText(n).width, r = t.measureText(c).width + 10;
          t.drawImage(u.goodsImg, 0, 0, status.getPx(375), status.getPx(300)), t.drawImage("@/assets/images/shareBottomBg.png", status.getPx(0), status.getPx(225), status.getPx(375), status.getPx(75)),
          u.data.goods.video && t.drawImage("@/assets/images/play.png", status.getPx(127.5), status.getPx(70), status.getPx(120), status.getPx(120)),
            t.save(), status.drawText(t, {
            color: "#ffffff",
            size: 28,
            textAlign: "left"
          }, "$", status.getPx(6), status.getPx(267), status.getPx(a)), status.drawText(t, {
            color: "#ffffff",
            size: 28,
            textAlign: "left"
          }, u.data.goods.price_front + "." + u.data.goods.price_after, status.getPx(a), status.getPx(267), status.getPx(e)),
            t.restore(), t.save(), t.restore(), t.save(), (0, status.drawText)(t, {
            color: "#ffffff",
            size: 15,
            textAlign: "left"
          }, "$" + u.data.goods.productprice, (0, status.getPx)(a + e + 10), (0, status.getPx)(267), (0,
            status.getPx)(o)), t.restore(), t.save(), (0, status.drawText)(t, {
            color: "#ffffff",
            size: 17,
            textAlign: "left"
          }, "累计销售" + u.data.goods.seller_count, (0, status.getPx)(10), (0, status.getPx)(290), (0,
            status.getPx)(s)), t.restore(), t.save(), (0, status.drawText)(t, {
            color: "#ffffff",
            size: 17,
            textAlign: "left"
          }, "· 剩余" + u.data.goods.total, (0, status.getPx)(s + 10), (0, status.getPx)(290), (0,
            status.getPx)(i)), t.restore(), t.save(), t.beginPath(), t.setStrokeStyle("white"),
            t.moveTo((0, status.getPx)(a + e + 10), (0, status.getPx)(261)), t.lineTo((0, status.getPx)(a + e + o + 15), (0,
            status.getPx)(261)), t.stroke(), t.restore(), t.save(), (0, status.drawText)(t, {
            color: "#F8E71C",
            size: 18,
            textAlign: "center"
          }, n, (0, status.getPx)(318), (0, status.getPx)(260), (0, status.getPx)(d)), t.restore(),
            t.save(), (0, status.drawText)(t, {
            color: "#F8E71C",
            size: 18,
            textAlign: "center"
          }, c, (0, status.getPx)(315), (0, status.getPx)(288), (0, status.getPx)(r)), t.restore(),
            t.draw(false, u.checkCanvas());
        }).exec();
      },
      checkCanvas: function() {
        var a = this;
//        setTimeout(function() {
//          this.$wx.canvasToTempFilePath({
//            canvasId: "myCanvas",
//            success: function(t) {
//              t.tempFilePath ? a.imageUrl = t.tempFilePath : a.drawImg(), console.log("我画完了");
//            },
//            fail: function(t) {
//              a.drawImg();
//            }
//          });
//        }, 500);
      },
      predivImg: function(t) {
        var a = t.currentTarget.dataset.idx || 0, e = this.prevImgArr;
//        this.$wx.predivImage({
//          current: e[a],
//          urls: e
//        });
      },
      btnPlay: function() {
        this.fmShow= false, this.videoContext.play();
      },
      videEnd: function() {
        this.fmShow= true;
      },
      endPlay: function() {
        this.videoContext.pause(), this.fmShow= true;
      },
      showGroupCode: function() {
        var t = this.group_share_info.share_wxcode || "";
//        t && this.$wx.predivImage({
//          current: t,
//          urls: [ t ]
//        });
      },
      changeCommunity: function() {
        if (0 == this.hide_community_change_btn) {
          var t = this.$data.id, a = this.$data.scene, e = "/lionfish_comshop/pages/goods/goodsDetail?id=" + t + "&community_id=" + this.$data.community_id + "&scene=" + a;
//          this.$app.globalData.navBackUrl = e,
            this.$wx.redirectTo({
            url: "/lionfish_comshop/pages/position/community"
          });
        }
      },
      changeCartNum: function(t) {
        var a = t.detail;
//        (0, status.cartNum)(this.cartNum= a);

        status.cartNum().then(function(e) {
          if(0 == e.code) {
            this.cartNum = e.data
          }
        })
      },
      goLink: function(t) {
        if (this.authModal()) {
          var a = t.currentTarget.dataset.link;
//          3 < getCurrentPages().length ? this.$wx.redirectTo({
//            url: a
//          }) : this.$wx.navigateTo({
//            url: a
//          });

          this.$wx.navigateTo({
            url: a
          });
        }
      },
      handleFocus: function() {
        this.focusFlag = true;
      },
      handleBlur: function(t) {
        var a = t.detail, e = parseInt(a.value);
        if("" == e || isNaN(e))  this.sku_val= 1;
      },
      changeNumber: function(t) {
        var a = this, e = a.cur_sku_arr, o = a.sku_val, s = 1 * e.stock, i = t.detail;
        if (this.focusFlag = false, i) {
          var n = parseInt(i.value);
          s < (n = n < 1 ? 1 : n) ? (this.$wx.showToast({
            title: "最多只能购买" + s + "件",
            icon: "none"
          }), o = s) : o = n;
        }
        this.sku_val= o;
      },
      handleHexiaoModal: function() {
        this.showHexiaoModal= !this.showHexiaoModal;
      },
      coverVideoEnd: function() {
        this.showCoverVideo= false;
      },
      closeCoverVideo: function() {
        this.coverVideoContext.pause(), this.setData({
          showCoverVideo: false
        });
      },
      onShareAppMessage: function() {
//        var t = this.$wx.getStorageSync("community"), a = (this.goods_id, t.communityId), e = this.share_title, o = this.$wx.getStorageSync("member_id"), s = "lionfish_comshop/pages/goods/goodsDetail?id=" + this.goods_id + "&share_id=" + o + "&community_id=" + a, i = this.data.goods.goods_share_image;
//        console.log("商品分享地址："), console.log(s);
//        return this.is_share_html= true,
//          this.hideModal= true, {
//          title: e,
//          path: s,
//          imageUrl: i || this.imageUrl,
//          success: function(t) {},
//          fail: function(t) {}
//        };
      },
      goLink2: function(event) {
        let link = event.currentTarget.dataset.link;
        let id = event.currentTarget.dataset.id;
        this.$wx.redirectTo({
          url: link + id
        })
      },
      close: function() {
        this.visible = false;
      },
    }
  }
</script>
<style>
  @import "goodsDetail.less";
</style>
