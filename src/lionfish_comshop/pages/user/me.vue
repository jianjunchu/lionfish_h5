<template>
  <div :class="[{theme_type}, 'pb100']">
    <div class="personal">
      <div class="basicInform">
        <img class="back-img"
             :src="common_header_backgroundimage?common_header_backgroundimage:require('@/assets/images/TOP_background@2x.png')"/>
        <div class="personalCon">
          <div class="userInfo">
            <div v-if="!needAuth">
              <img class="userAvatarUrl" :src="member_info.avatar" v-if="member_info.avatar"/>
              <img class="userAvatarUrl" src="@/assets/images/head-bitmap.png" v-else/>
              <div class="user-name" :style="{color:user_top_font_color}">
                <div class="user-name-top">
                  <div>{{member_info.username}}</div>
                  <!--<button @click="bindGetUserInfo" class="modify" openType="getUserInfo" v-if="canIUse">-->
                  <!--<button @click="bindGetUserInfo" class="modify" openType="getUserInfo" >-->
                  <!--<span class="iconfont icon-shuaxin"></span>-->
                  <!--</button>-->
                </div>
                <div class="userLevel" v-if="member_info.is_show_member_level==1">
                  <div class="userLevelName">
                    <span class="iconfont icon-huangguan"></span> {{member_info.member_level_info.level_name}}
                  </div>
                  <div class="userLeveldiscount" v-if="member_info.member_level_info.discount<10">
                    享受{{member_info.member_level_info.discount}}折
                  </div>
                </div>
              </div>
            </div>
            <div @click="authModal" class="userInfo" :style="{color:user_top_font_color}" v-else>
              <img class="userAvatarUrl" src="@/assets/images/head-bitmap.png"/>
              <div class="user-name">{{$t('me.dianjidengluzhanghu')}}</div>
            </div>
            <div @click="goLink2" :class="['fetch-coder', ( fetch_coder_type == 1 || needAuth?'signIn':'')]"
                 :style="{color:user_top_font_color}" data-link="/lionfish_comshop/moduleA/score/signin"
                 v-if="isopen_signinreward==1&&show_signinreward_icon==1">
              <span class="iconfont icon-qiandao"></span>
              <div class="fetch-coder-text">积分签到</div>
            </div>
            <div @click="toggleFetchCoder" class="fetch-coder" :style="{color:user_top_font_color}"
                 v-if="fetch_coder_type == 1||needAuth">
              <span class="iconfont icon-erweima1"></span>
              <div class="fetch-coder-text">{{$t('me.tihuoma')}}</div>
            </div>
          </div>
          <div @click="goLink2" class="vip i-flex i-flex-spb" v-if="is_open_vipcard_buy==1"
               data-link="/lionfish_comshop/moduleA/vip/upgrade">
            <div class="i-flex vip-name">
              <img class="vip-logo" :src="modify_vipcard_logo" v-if="modify_vipcard_logo"/>
              <span class="iconfont icon-huiyuan" style="font-size:15px;" v-else></span>
              “{{modify_vipcard_name}}” 尊享特权·会员专享价
            </div>
            <div v-if="is_vip_card_member==0">立即开通<span class="iconfont icon-youjiantou goright"></span>
            </div>
            <div v-else-if="is_vip_card_member==1">立即查看<span class="iconfont icon-youjiantou goright"></span>
            </div>
            <div v-else-if="is_vip_card_member==2">
              <span style="color:#fd7f02;">已到期,</span>立即开通<span class="iconfont icon-youjiantou goright"></span>
            </div>
          </div>
        </div>
      </div>

      <div :class="['order', (is_open_vipcard_buy==1?'hasVip':'')]">
        <div class="my-order">
          <div class="my-order-title">
            <span>{{$t('me.wodedingdan')}}</span>
          </div>
          <div @click="goLink2" class="to-order" data-link="/lionfish_comshop/pages/order/index">
            <span>{{$t('me.quanbudingdan')}}</span>
          </div>
          <div class="order-right">
            <img class="icon-right" src="@/assets/images/rightArrowImg.png"/>
          </div>
        </div>
        <div class="orderTab">
          <div @click="goLink2" class="order_status" data-link="/lionfish_comshop/pages/order/index?order_status=3">
             <span class="num" :style="{background:skin.color}" v-if="member_info.wait_pay_count && member_info.wait_pay_count!=0">{{member_info.wait_pay_count}}</span>
            <img class="icon-img"
                 :src="user_order_menu_icons.i1?user_order_menu_icons.i1:require('@/assets/images/needPayIcon.png')"/>
            <span style="color: #444;">{{$t('common.daifukuan')}}</span>
          </div>
          <div @click="goLink2" class="order_status" data-link="/lionfish_comshop/pages/order/index?order_status=1">
             <span class="num" :style="{background:skin.color}" v-if="member_info.wait_send_count && member_info.wait_send_count!=0">{{member_info.wait_send_count}}</span>
            <img class="icon-img"
                 :src="user_order_menu_icons.i2?user_order_menu_icons.i2:require('@/assets/images/undeli.png')"/>
            <span style="color: #444;">{{$t('common.daipeisong')}}</span>
          </div>
          <div @click="goLink2" class="order_status" data-link="/lionfish_comshop/pages/order/index?order_status=4">
           <span class="num" :style="{background:skin.color}" v-if="member_info.wait_get_count && member_info.wait_get_count!=0">{{member_info.wait_get_count}}</span>
            <img class="icon-img"
                 :src="user_order_menu_icons.i3?user_order_menu_icons.i3:require('@/assets/images/distributionIcon.png')"/>
            <span style="color: #444;">{{$t('common.daitihuo')}}</span>
          </div>
          <div @click="goLink2" class="order_status" data-link="/lionfish_comshop/pages/order/index?order_status=6">
            <img class="icon-img"
                 :src="user_order_menu_icons.i4?user_order_menu_icons.i4:require('@/assets/images/completeIcon.png')"/>
            <span style="color: #444;">{{$t('common.yitihuo')}}</span>
          </div>
          <div @click="goLink2" class="order_status" data-link="/lionfish_comshop/pages/refund/refundList">
            <img class="icon-img"
                 :src="user_order_menu_icons.i5?user_order_menu_icons.i5:require('@/assets/images/refundIcon.png')"/>
            <span style="color: #444;">{{$t('common.shouhoufuwu')}}</span>
          </div>
        </div>
      </div>

      <div class="tool distribution" v-if="community&&show_user_change_comunity==1">
        <div class="my-distribution modal-head">
          <div class="my-distribution-title">
            <span>{{$t('common.wodezitidian')}}</span>
          </div>
          <div v-if="open_danhead_model==1"></div>
          <div v-else>
            <div class="distribution-right">
              <a class="to-distribution" hoverClass="none" href="#/lionfish_comshop/pages/position/community">
                <span>{{$t('common.qiehuan')}}</span>
              </a>
              <img class="icon-right" src="@/assets/images/rightArrowImg.png"/>
            </div>
          </div>
        </div>
        <div class="modal-body community fsz-30">
          <div class="weight red mb5">{{community.communityName}}</div>
          <div class="fsz-30 text-gray mb5">{{community.fullAddress}}</div>
          <div class="i-flex" style="vertical-align:middle;" v-if="community.disUserMobile||community.head_mobile">
<!--
            <div>
              <span class="iconfont icon-ziyuan fsz-30"></span> {{$t('common.phone')}}：
            </div>

            <div @click="callTelphone" :data-phone="(community.disUserMobile||community.head_mobile)"
                 style="color:#ee884a;">{{community.disUserMobile||community.head_mobile}}
            </div>
-->
            <div @click="goLink" class="goods-sign-btn" :data-link="community.whatsapplink"
                 v-show="community.whatsapplink != '' && community.whatsapplink != undefined && community.whatsapplink != null ">
              <img src="@/assets/images/join-group.png" height="20vw" width="20vw"/> <span
              style="font-size:larger;float:right">Join Group</span>
            </div>
          </div>

        </div>
      </div>

      <div class="tool distribution" v-if="show_user_pin==1">
        <div @click="goLink2" data-link="/lionfish_comshop/moduleA/pin/me">
          <div class="item-main">
            <div class="item-title">
              <span>我的拼团</span>
            </div>
            <div class="tool-right">
              <img class="icon-right " src="@/assets/images/rightArrowImg.png"/>
            </div>
          </div>
        </div>
        <div @click="goLink2" data-link="/lionfish_comshop/moduleA/pin/income">
          <div class="item-main">
            <div class="item-title">
              <span>拼团收益</span>
            </div>
            <div class="tool-right">
              <img class="icon-right " src="@/assets/images/rightArrowImg.png"/>
            </div>
          </div>
        </div>
      </div>
      <div class="tool distribution" v-if="commiss_level>0">
        <div v-if="commiss_sharemember_need==1">
          <div class="my-distribution modal-head">
            <div class="my-distribution-title">
              <span>我的粉丝</span>
            </div>
            <div @click="goLink2" class="to-distribution" data-link="/lionfish_comshop/distributionCenter/pages/fans">
              <span>查看</span>
            </div>
            <div class="distribution-right">
              <img class="icon-right" src="@/assets/images/rightArrowImg.png"/>
            </div>
          </div>
          <div class="modal-body i-flex i-flex-alc">
            <div class="distribut-tot i-flex-item">{{share_member_count}}</div>
            <div class="distribut-new bor-r">
              <div class="distribut-num">{{today_share_member_count}}</div>
              <div class="distribut-desc">今日新增</div>
            </div>
            <div class="distribut-new">
              <div class="distribut-num">{{yestoday_share_member_count}}</div>
              <div class="distribut-desc">昨日新增</div>
            </div>
          </div>
          <div class="modal-foot i-flex i-flex-spb" v-if="!(member_info.comsiss_flag==1&&member_info.comsiss_state==1)">
            <div class="modal-foot-l" v-if="need_num_update>0">
              <span v-if="share_member_count!=0">再</span>分享<span class="tot">{{need_num_update}}</span>位新粉丝可升级为{{commiss_diy_name}}
            </div>
            <div class="modal-foot-l" v-if="commiss_biaodan_need==0&&need_num_update<=0">
              <div v-if="formStatus==0">差一步就成为{{commiss_diy_name}}人员啦！</div>
              <div v-if="formStatus==1">恭喜你填写成功，等待审核！</div>
              <div v-if="formStatus==2">恭喜你成为{{commiss_diy_name}}人员！</div>
            </div>
            <div class="modal-foot-l" v-if="commiss_biaodan_need==1&&need_num_update<=0">
              <div v-if="formStatus==0">差一步就成为{{commiss_diy_name}}人员啦！</div>
              <div v-if="formStatus==1">恭喜你填写成功，等待审核！</div>
              <div v-if="formStatus==2">恭喜你成为{{commiss_diy_name}}人员！</div>
            </div>
            <div @click="goNext" class="modal-foot-r btn" data-type="share" :style="{background:skin.color}"
                 v-if="need_num_update>0">立即分享
            </div>
            <div @click="goNext" class="modal-foot-r btn" data-type="commiss" :style="{background:skin.color}"
                 v-if="need_num_update<=0&&commiss_biaodan_need<=0&&formStatus==2">进入{{commiss_diy_name}}
            </div>
            <div @click="goNext" class="modal-foot-r btn" data-type="form" v-if="need_num_update<=0&&formStatus==0">
              立即升级
            </div>
            <div @click="goNext" class="modal-foot-r btn" data-type="commiss" :style="{background:skin.color}"
                 v-if="commiss_biaodan_need==1&&need_num_update<=0&&formStatus==2">
              进入{{commiss_diy_name}}
            </div>
          </div>
        </div>
        <div class="toolList">
          <div @click="goDistribution">
            <div class="item-main">
              <div class="item-title">
                <span>{{commiss_diy_name}}{{$t('common.zhongxin')}}</span>
              </div>
              <div class="tool-right">
                <img class="icon-right " src="@/assets/images/rightArrowImg.png"/>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div class="tool">
        <div class="toolList">
          <div @click="goLink2" class="yuenav" data-link="/lionfish_comshop/pages/user/charge"
               v-if="is_open_yue_pay==1">
            <div class="item-main">
              <div class="item-title">
                <img class="toolIcon" mode="widthFix"
                     :src="user_tool_icons.i1?user_tool_icons.i1:require('@/assets/images/wallet.png')"/>
                <span>余额<div v-if="!needAuth">: ${{member_info.account_money||0}}</div>
                </span>
              </div>
              <div class="tool-right">
                <span style="margin-right:5px;">{{excharge_nav_name}}</span>
                <img class="icon-right " src="@/assets/images/rightArrowImg.png"/>
              </div>
            </div>
          </div>
          <div @click="goLink2" data-link="/lionfish_comshop/moduleA/solitaire/me" v-if="is_open_solitaire==1">
            <div class="item-main">
              <div class="item-title">
                <img class="toolIcon" mode="widthFix"
                     :src="user_tool_icons.i10?user_tool_icons.i10:require('@/assets/images/soli.png')"/>
                <span>我的接龙</span>
              </div>
              <div class="tool-right">
                <img class="icon-right " src="@/assets/images/rightArrowImg.png"/>
              </div>
            </div>
          </div>
          <div v-if="is_show_score==1">
            <div @click="goLink2" class="score" data-link="/lionfish_comshop/moduleA/score/signin"
                 v-if="isopen_signinreward==1">
              <div class="item-main">
                <div class="item-title">
                  <img class="toolIcon" mode="widthFix"
                       :src="user_tool_icons.i2?user_tool_icons.i2:require('@/assets/images/icon-score.png')"/>-->
                  <span>积分</span>
                </div>
                <div class="tool-right">
                  <span style="margin-right:5px;">立即签到</span>
                  <img class="icon-right " src="@/assets/images/rightArrowImg.png"/>
                </div>
              </div>
            </div>
            <div @click="goLink2" class="score" data-link="/lionfish_comshop/moduleA/score/scoreDetails" v-else>
              <div class="item-main">
                <div class="item-title">
                  <img class="toolIcon" mode="widthFix"
                       :src="user_tool_icons.i2?user_tool_icons.i2:require('@/assets/images/icon-score.png')"/>
                  <span>积分</span>
                </div>
                <div class="tool-right">
                  <img class="icon-right " src="@/assets/images/rightArrowImg.png"/>
                </div>
              </div>
            </div>
          </div>

          <div @click="goLink2" data-link="/lionfish_comshop/pages/user/coupon" v-if="false">
            <div class="item-main">
              <div class="item-title">
                <img class="toolIcon" mode="widthFix"
                     :src="user_tool_icons.i3?user_tool_icons.i3:require('@/assets/images/coupon.png')"/>
                <span>{{$t('common.youhuiquan')}}</span>
              </div>
              <div class="tool-right">
                <img class="icon-right " src="@/assets/images/rightArrowImg.png"/>
              </div>
            </div>
          </div>
<!--
          <router-link hoverClass="none" to="/lionfish_comshop/pages/groupCenter/communityMembers" v-if="member_info.pickup_id>0">
            <div class="item-main">
              <div class="item-title">
                <img class="toolIcon" mode="widthFix"
                     :src="user_tool_icons.i4?user_tool_icons.i4:require('@/assets/images/groupCenterIcon.png')"/>
                <span>核销管理</span>
              </div>
              <div class="tool-right">
                <img class="icon-right " src="@/assets/images/rightArrowImg.png"/>
              </div>
            </div>
          </router-link>
-->
          <div @click="goToGroup" v-if="member_info.is_head==1">
            <div class="item-main">
              <div class="item-title">
                <img class="toolIcon" mode="widthFix"
                     :src="user_tool_icons.i5?user_tool_icons.i5:require('@/assets/images/groupCenterIcon.png')"/>

                <span>{{groupInfo.owner_name}}&nbsp; {{$t('common.zhongxin')}}</span>
              </div>
              <div class="tool-right">
                <img class="icon-right " src="@/assets/images/rightArrowImg.png"/>
              </div>
            </div>
          </div>
          <router-link hoverClass="none" to="/lionfish_comshop/pages/groupCenter/apply" v-else-if="member_info.is_head==2||member_info.is_head==3">
            <div class="item-main">
              <div class="item-title">
                <img class="toolIcon" mode="widthFix" :src="user_tool_icons.i5?user_tool_icons.i5:require('@/assets/images/groupCenterIcon.png')"/>
                <span>{{groupInfo.owner_name}}审核中</span>
              </div>
              <div class="tool-right">
                <img class="icon-right " src="@/assets/images/rightArrowImg.png"/>
              </div>
            </div>
          </router-link>

          <div v-else>
            <router-link  hoverClass="none" to="/lionfish_comshop/pages/groupCenter/recruit" v-if="close_community_apply_enter==0">
              <div class="item-main">
                <div class="item-title">
                  <img class="toolIcon" mode="widthFix" :src="user_tool_icons.i5?user_tool_icons.i5:require('@/assets//images/groupCenterIcon.png')"/>
                  <sapn>{{$t('me.shenqingchengwei')}}{{groupInfo.owner_name}}</sapn>
                </div>
                <div class="tool-right">
                  <img class="icon-right " src="@/assets/images/rightArrowImg.png"></img>
                </div>
              </div>
            </router-link>
          </div>


          <div v-if="enabled_front_supply==1">
            <router-link hoverClass="none" href="#/lionfish_comshop/pages/supply/recruit" v-if="is_supply==0||needAuth">
              <div class="item-main">
                <div class="item-title">
                  <img aspectFit class="toolIcon supplier" mode="widthFix"
                       :src="user_tool_icons.i6?user_tool_icons.i6:require('@/assets/images/icon-supplier.png')"/>
                  <span>{{$t('me.shengqingchengwei')}}{{supply_diy_name}}</span>
                </div>
                <div class="tool-right">
                  <img class="icon-right " src="@/assets/images/rightArrowImg.png"/>
                </div>
              </div>
            </router-link>
            <div v-else-if="is_supply==1">
              <div class="item-main">
                <div class="item-title">
                  <img aspectFit class="toolIcon supplier" mode="widthFix"
                       :src="user_tool_icons.i6?user_tool_icons.i6:require('@/assets/images/icon-supplier.png')"/>
                  <span>{{supply_diy_name}}审核中</span>
                </div>
              </div>
            </div>
            <div v-else-if="is_supply==2">
              <div @click="goLink2" class="item-main" data-link="/lionfish_comshop/moduleB/supply/index"
                   v-if="is_open_supplymobile==1">
                <div class="item-title">
                  <img aspectFit class="toolIcon supplier" mode="widthFix"
                       :src="user_tool_icons.i6?user_tool_icons.i6:require('@/assets/images/icon-supplier.png')"/>
                  <span>{{supply_diy_name}}</span>
                </div>
              </div>
              <div class="item-main" v-else>
                <div class="item-title">
                  <img aspectFit class="toolIcon supplier" mode="widthFix"
                       :src="user_tool_icons.i6?user_tool_icons.i6:require('@/assets/images/icon-supplier.png')"/>
                  <span>您已是{{supply_diy_name}}</span>
                </div>
              </div>
            </div>
          </div>
          <div @click="goLink2" data-link="/lionfish_comshop/pages/user/protocol">
            <div class="item-main">
              <div class="item-title">
                <img class="toolIcon" mode="widthFix"
                     :src="user_tool_icons.i7?user_tool_icons.i7:require('@/assets/images/protocolIcon.png')"/>
                <span>{{$t('me.changjianbangzhu')}}</span>
              </div>
              <div class="tool-right">
                <img class="icon-right " src="@/assets/images/rightArrowImg.png"/>
              </div>
            </div>
          </div>
          <!--<button class="item-fav" openType="contact" sessionFrom="sobot|{{userInfo.nickName}}|{{userInfo.avatarUrl}}" v-if="user_service_switch!=0">-->
          <!--<button class="item-fav" openType="contact"  v-if="user_service_switch!=0">-->

          <a hoverClass="none" :href="user_service_url" v-if="user_service_url != '' && user_service_switch!=0">
            <div class="item-main">
              <div class="item-title">
                <img class="toolIcon" mode="widthFix"
                     :src="user_tool_icons.i8?user_tool_icons.i8:require('@/assets/images/serviceIcon.png')"/>
                <span>{{$t('me.lianxikefu')}}</span>
              </div>
              <div class="tool-right">
                <img class="icon-right " src="@/assets/images/rightArrowImg.png"/>
              </div>
            </div>
          </a>
          <!--</button>-->
          <router-link hoverClass="none" href="#/lionfish_comshop/pages/user/articleProtocol?about=1"
                       v-if="is_show_about_us==1">
            <div class="item-main">
              <div class="item-title">
                <img class="toolIcon" mode="widthFix"
                     :src="(user_tool_icons && user_tool_icons.i9)?user_tool_icons.i9:require('@/assets/images/aboutUsIcon.png')"/>
                <span>{{$t('me.guanyuwomen')}}</span>
              </div>
              <div class="tool-right">
                <img class="icon-right " src="@/assets/images/rightArrowImg.png"/>
              </div>
            </div>
          </router-link>
          <div @click="loginOut" v-if="!needAuth&&ishow_user_loginout_btn==1">
            <div class="item-main">
              <div class="item-title">
                <img class="toolIcon" mode="widthFix" src="@/assets/images/loginOut.png"/>
                <span>{{$t('me.tuichudenglu')}}</span>
              </div>
              <div class="tool-right">
                <img class="icon-right " src="@/assets/images/rightArrowImg.png"/>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div class="canvas-content" v-if="fetch_coder_type==0">
        <div class="left">
          <img @click="previewImage" class="canvas" data-src="member_info.hexiao_qrcod" :src="member_info.hexiao_qrcod"
               v-if="member_info.hexiao_qrcod"/>
          <div @click="goLink2" class="nocode" v-else>登录后显示</div>
        </div>
        <div class="right">
          <div class="title1" :style="{color:skin.color}">向{{groupInfo.owner_name}}出示二维码提货</div>
          <div class="title2" style="display:none;">或出示提货码</div>
          <!--<div @click="showCoder" class="btn" style="display:none;">使用提货码</div>-->
          <div class="btn" style="display:none;">使用提货码</div>
        </div>
      </div>
      <div class="version">
        <span>{{copyright}}</span>
      </div>

    </div>
    <i-tabbar @authModal="authModal" :cartNum="cartNum" currentIdx="4" :needAuth="needAuth"
              :tabbarRefresh="tabbarRefresh"></i-tabbar>
  </div>


  <!--<i-tabbar bind:authModal="authModal" :cartNum="cartNum" currentIdx="4" :needAuth="needAuth" :tabbarRefresh="tabbarRefresh"></i-tabbar>-->
  <!--<i-get-phone bind:cancel="close" bind:confirm="getReceiveMobile" bind:needAuth="authModal" visible="{{showGetPhone&&!needAuth}}"></i-get-phone>-->
  <!--<i-fetch-coder bind:cancel="toggleFetchCoder" codeImg="{{member_info.hexiao_qrcod}}" coderList="{{myCoderList}}" visible="{{isShowCoder}}"></i-fetch-coder>-->
  <!--<i-new-auth bind:authSuccess="authSuccess" bind:cancel="authModal" :needAuth="needAuth&&showAuthModal"></i-new-auth>-->
</template>

<script>
  import GlobalMixin from '../../mixin/globalMixin.js'
  import util from '../../utils'
  import status from '../../utils'
  var wcache = require('../../utils/wcache.js')
  import auth from '../../utils/auth'
  var app,wx

  var _extends = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var o = arguments[t]
      for (var a in o) Object.prototype.hasOwnProperty.call(o, a) && (e[a] = o[a])
    }
    return e
  }

  export default {
    mixins: [GlobalMixin],
    name: 'me',
    data() {
      return {
        tablebar: 4,
//        canIUse: wx.canIUse("button.open-type.getUserInfo"),
        theme_type: '',
        add_mo: 0,
        is_show_on: 0,
        level_name: '',
        member_level_is_open: 0,
        is_yue_open: 0,
        needAuth: false,
        opencommiss: 0,
        inputValue: 0,
        getfocus: false,
        showguess: true,
        items: [],
        auditStatus: 5,
        isShowCoder: false,
        myCoderList: [],
        qrcodebase64: '',
        setInter: null,
        copyright: '',
        common_header_backgroundimage: '',
        enabled_front_supply: 0,
        cartNum: 0,
        is_show_about_us: 0,
        groupInfo: {
          group_name: '社区',
          owner_name: '团长'
        },
        is_show_score: 0,
        showGetPhone: false,
        user_tool_icons: {},
        community: '',
        isCalling: false,
        member_info: {},
        is_supply: 0,
        showGetPhone: '',
        is_open_vipcard_buy: 0,
        modify_vipcard_name: '会员',
        is_vip_card_member: 0,
        modify_vipcard_logo: '',
        show_signinreward_icon: '',
        isopen_signinreward: 0,

        copyright: '',

        is_show_about_us: 0,
        enabled_front_supply: '',
        is_open_yue_pay: 0,
        is_show_score: 0,
        user_order_menu_icons: {},
        commiss_diy_name: '',
        close_community_apply_enter: 0,
        user_tool_icons: {},
        ishow_user_loginout_btn: 0,
        supply_diy_name: '',
        user_service_switch: 0,
        fetch_coder_type: 0,
        show_user_pin: 0,
        show_user_change_comunity: 0,
        open_danhead_model: 0,
        is_open_solitaire: 0,
        community: {},

        user_top_font_color: '',
        commiss_level: '',
        showAuthModal: false,
        tabbarRefresh: false,
        whatsapplink: '',
        user_service_url: ''
      }
    },
    created: function() {
      app = this.$getApp()
      wx = this.$wx
      wx.setNavigationBarTitle({
        title: 'Me',
        showLogo: false,
        showMore: false,
        showBack: false
      })
      this.onLoad()

    },
    mounted: function() {
      this.onShow()
    },
    methods: {
      onLoad: function(options) {
        wx.hideTabBar();
        var t = this;
        status.setNavBgColor(), status.setGroupInfo().then(function(e) {
          t.groupInfo = e
        })
        wx.showLoading();
      },

      getMemberInfo: function() {
        var e = wx.getStorageSync("token");
        this.getCommunityInfo();
        var f = this;
        app.util.request({
          url: "entry/wxapp/user",
          data: {
            controller: "user.get_user_info",
            token: e
          },
          dataType: "json",
          success: function(e) {
            if (setTimeout(function() {
              wx.hideLoading();
            }, 1e3), 0 == e.code) {
              var t = !1;
              1 != e.is_show_auth_mobile || e.data.telephone || (t = !0);
              var o = e.data || "", a = {};
              if (o) {
                if (o.member_level_info && (o.member_level_info.discount = (o.member_level_info.discount / 10).toFixed(1)),
                0 < e.commiss_level) {
                  var s = 1 * e.commiss_share_member_update, i = 1 * e.share_member_count, n = 1 * e.commiss_share_member_update - 1 * e.share_member_count, r = 0;
                  1 == o.is_writecommiss_form && (r = 1) == o.comsiss_flag && (r = 0 == o.comsiss_state ? 1 : 2),
                    f.formStatus = r,
                    f.commiss_level =  e.commiss_level,
                    f.commiss_sharemember_need =  e.commiss_sharemember_need,
                    f.commiss_share_member_update = s,
                    f.commiss_biaodan_need = e.commiss_biaodan_need,
                    f.share_member_count = i,
                    f.today_share_member_count = e.today_share_member_count,
                    f.yestoday_share_member_count = e.yestoday_share_member_count,
                    f.need_num_update = n
                }
              } else a.needAuth = !0;
              var u = e, _ = u.is_supply, c = u.is_open_vipcard_buy, m = u.modify_vipcard_name, d = u.is_vip_card_member, l = u.modify_vipcard_logo, h = u.isopen_signinreward, p = u.show_signinreward_icon, g = u.is_open_supplymobile;
              f.member_info =  o,
                f.is_supply = _ || 0,
                f.showGetPhone = t,
                f.is_open_vipcard_buy = c || 0,
                f.modify_vipcard_name = m || "会员",
                f.is_vip_card_member = d || 0,
                f.modify_vipcard_logo = l,
                f.show_signinreward_icon = p,
                f.isopen_signinreward = h,
                f.is_open_supplymobile = g
            } else (
              f.needAuth = !0
            ), wx.hideTabBar(), wx.setStorage({
              key: "member_id",
              data: null
            });
          }
        });
      },
      getCommunityInfo: function() {
        let that = this
        let community = this.$wx.getStorageSync('community')
        if (community) {
          if (!community.head_mobile) {
            status.getCommunityById(community.communityId).then(res => {
              this.community = res.data
//              this.community.whatsapplink = "http://www.baidu.com";
            })
          } else {
            this.community = community
          }
        } else {
          var token = this.$wx.getStorageSync('token')
          token && status.getCommunityInfo().then(res => {
            this.community = res.data
          })
        }
        this.$forceUpdate()
      },
      getCopyright: function() {
        var C = this;
        C.$app.util.request({
          url: "entry/wxapp/user",
          data: {
            controller: "user.get_copyright"
          },
          dataType: "json",
          success: function(e) {
            if (0 == e.code) {
              var t = e, o = t.enabled_front_supply, a = t.is_open_yue_pay, s = t.is_show_score, i = t.user_order_menu_icons, n = t.close_community_apply_enter, r = t.user_tool_icons, u = t.ishow_user_loginout_btn, _ = t.commiss_diy_name, c = t.supply_diy_name, m = t.user_service_switch, d = t.fetch_coder_type, l = t.show_user_pin, h = t.common_header_backgroundimage, p = t.is_show_about_us, g = t.show_user_change_comunity, f = t.open_danhead_model, w = t.default_head_info, b = t.is_open_solitaire, y = t.user_top_font_color, v = t.excharge_nav_name, x = {};
              1 == f && (x.community = w), _ = _ || "分销", c = c || "供应商", wcache.put("commiss_diy_name", _),
                wcache.put("supply_diy_name", c),
                C.copyright = t.data || "",
                C.common_header_backgroundimage = h || require('@/assets/images/TOP_background@2x.png'),
                C.is_show_about_us = p || 0,
                C.enabled_front_supply = o,
                C.is_open_yue_pay = a,
                C.is_show_score = s,
                C.user_order_menu_icons = i || {},
                C.commiss_diy_name = _,
                C.close_community_apply_enter = n || 0,
                C.user_tool_icons = r || {},
                C.ishow_user_loginout_btn = u || 0,
                C.supply_diy_name = c,
                C.user_service_switch = m,
                C.fetch_coder_type = d || 0,
                C.show_user_pin = l,
                C.show_user_change_comunity = g,
                C.open_danhead_model = f,
                C.is_open_solitaire = b,
                C.user_top_font_color = y,
                C.excharge_nav_name = v || "查看",
                C.user_service_url = t.user_service_url
            }
          }
        });
      },
      authSuccess: function() {
        var that = this
        this.$wx.showLoading()
        this.needAuth = false, this.showAuthModal = false, this.tabbarRefresh = true
        status.cartNum().then(function(t) {
          s.cartNum = t.data
        })

        that.getMemberInfo()
      },
      authModal: function() {

        var i = this;

        util.check_login_new().then(function(e) {
          if(e){
            i.needAuth = !1
          }else{
            wx.redirectTo({
              url: "/login"
            })
          }
        })

        return !i.needAuth
      },
      goToGroup: function() {

        5 === this.auditStatus ? this.$wx.navigateTo({
          url: '/lionfish_comshop/pages/groupCenter/index'
        }) : this.$wx.navigateTo({
          url: '/lionfish_comshop/pages/groupCenter/apply'
        })
      },
      bindGetUserInfo: function(e) {

        var that = this
//        if ("getUserInfo:ok" === e.detail.errMsg) {
        var userInfo = this.$wx.getStorageSync('userInfo')
//          let { nickName, avatarUrl } = e.detail.userInfo;
        this.$getApp().globalData.userInfo = userInfo
        this.$wx.setStorage({
          key: 'userInfo',
          data: userInfo
        })
        this.userInfo = userInfo
        this.$wx.showToast({
          title: '资料已更新',
          icon: 'none',
          duration: 2000
        })
//          nickName && this.$http({
//              controller: 'user.update_user_info',
//              token:  this.$wx.getStorageSync("token"),
//              nickName,
//              avatarUrl
//            }).then(res=> {
//              if(res.code==0) {
//                let member_info = that.member_info;
//                let user_info = Object.assign({}, member_info, {
//                  avatar: e.detail.userInfo.avatarUrl,
//                  username: e.detail.userInfo.nickName
//                });
//
//                that.member_info = user_info;
//              }
//          })
//        } else {
//           this.$wx.showToast({
//            title: "资料更新失败。",
//            icon: "none"
//          });
//        }
      },
      previewImage: function(e) {
        var current = e.target.dataset.src
        current && this.$wx.previewImage({
          current: current,
          urls: [current]
        })
      },
      goLink2: function(event) {

        if (!this.authModal()) return

        let link = event.currentTarget.dataset.link
//        var pages_all = getCurrentPages();
//        if (pages_all.length > 3) {
//          this.$wx.redirectTo({
//            url: link
//          })
//        } else {
//          this.$wx.navigateTo({
//            url: link
//          })
//        }

        this.$wx.navigateTo({
          url: link
        })
      },
      onShow: function() {
        var t = this;
        util.check_login_new().then(function(e) {
          console.log(e), e ? ((
            t.tabbarRefresh = !0
          ), (0, status.cartNum)("", !0).then(function(e) {
            0 == e.code && (
              t.cartNum = e.data
            );
          })) : ((
            t.needAuth = true
          ), wx.hideLoading());
        }), t.getCopyright(), t.getMemberInfo();
      },
      onHide: function() {
        this.tabbarRefresh = false
      },
      getReceiveMobile: function(e) {
        this.$wx.showToast({
          icon: 'none',
          title: '授权成功'
        })
        this.showGetPhone = false
      },
      close: function() {
        this.showGetPhone = false
      },
      closeDistribution: function() {
        this.showDistribution = false
      },
      goDistribution: function() {
        let member_info = this.member_info
        //判断是不是分销商
        if (member_info.comsiss_flag == 0) {
          this.distributionNext()
        } else {
          if (member_info.comsiss_state == 0) {
            //分销商未审核
            this.distributionNext()
          } else {
            //分销商已审核
            this.$wx.navigateTo({
              url: '/lionfish_comshop/distributionCenter/pages/me'
            })
          }
        }
      },
      distributionNext: function() {
        if (this.commiss_sharemember_need == 1) {
          console.log('需要分享')
          let url = '/lionfish_comshop/distributionCenter/pages/recruit'
          this.$wx.navigateTo({
            url
          })
        } else if (this.commiss_biaodan_need == 1) {
          console.log('需要表单')
          // let url = '/lionfish_comshop/pages/distribution/apply';
          this.$wx.navigateTo({
            url: '/lionfish_comshop/distributionCenter/pages/recruit'
          })
        } else {
          // 跳转表单自动审核
          let status = 0
          let member_info = this.member_info
          if (member_info.comsiss_flag == 1) {
            member_info.comsiss_state == 0 ? status = 1 : status = 2
          }
          let url = '/lionfish_comshop/distributionCenter/pages/recruit'
          if (status == 2) {
            url = '/lionfish_comshop/distributionCenter/pages/me'
          }
          this.$wx.navigateTo({
            url
          })
        }
      },
      goNext: function(e) {
        console.log(e)
        let status = 0
        let member_info = this.data.member_info
        if (member_info.comsiss_flag == 1) {
          member_info.comsiss_state == 0 ? status = 1 : status = 2
        }
        let type = e.currentTarget.dataset.type
        if (type == 'share') {
          this.$wx.navigateTo({
            url: '/lionfish_comshop/distributionCenter/pages/share'
          })
        } else if (type == 'commiss') {
          if (status == 2) {
            this.$wx.navigateTo({
              url: '/lionfish_comshop/distributionCenter/pages/me'
            })
          } else {
            this.$wx.navigateTo({
              url: '/lionfish_comshop/distributionCenter/pages/recruit'
            })
          }
        } else if (type == 'form') {
          if (status == 2) {
            this.$wx.navigateTo({
              url: '/lionfish_comshop/distributionCenter/pages/me'
            })
          } else {
            // let url = '/lionfish_comshop/pages/distribution/apply';
            this.$wx.navigateTo({
              url: '/lionfish_comshop/distributionCenter/pages/recruit'
            })
          }
        }
      },
      loginOut: function() {

        this.$wx.removeStorageSync('community')
        this.$wx.removeStorageSync('token')
        this.onLoad()
        this.onShow()
//         this.$wx.redirectTo({
//           url: '/lionfish_comshop/pages/user/me',
//         });
      },
      toggleFetchCoder: function() {
        if (!this.authModal()) return
        this.isShowCoder = !this.isShowCoder
      },
      callTelphone: function(e) {
        var that = this
        var phoneNumber = e.currentTarget.dataset.phone
        if (phoneNumber) {
//          this.isCalling || (this.isCalling = true,
//            this.$wx.makePhoneCall({
//              phoneNumber: phoneNumber,
//              complete: function () {
//                that.isCalling = false;
//              }
//            })
//          );
        }
      },
      load_community_data: function() {
        var token = this.$wx.getStorageSync('token')
        var c = this
        this.$http({
          controller: 'community.get_community_info',
          token: token
        }).then(t => {
          console.log(t)
          if (0 == t.code && t.commission_info) {
//            c.whatsapplink = "http://www.baidu.com";
            if (t.commission_info.whatsapplink != null && t.commission_info.whatsapplink != 'null') {
              c.whatsapplink = t.commission_info.whatsapplink
            }
          }

        })
      },
      goLink: function(event) {
        let link = event.currentTarget.dataset.link
//        this.$wx.redirectTo({
//          url: link
//        })
        window.location.href = link
      }
    }
  }
</script>
<style>
  @import "me.less";
</style>
