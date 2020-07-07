<template>
  <div :class="[{theme_type}, 'pb100']">
    <div class="personal">
      <div class="basicInform">
        <img class="back-img" :src="(common_header_backgroundimage?common_header_backgroundimage:'@/assets/images/TOP_background@2x.png')"/>
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
                  <div class="userLeveldiscount" v-if="member_info.member_level_info.discount<10">享受{{member_info.member_level_info.discount}}折</div>
                </div>
              </div>
            </div>
            <div @click="authModal" class="userInfo" :style="{color:user_top_font_color}" v-else>
              <img class="userAvatarUrl" src="@/assets/images/head-bitmap.png"/>
              <div class="user-name">{{$t('me.dianjidengluzhanghu')}}</div>
            </div>
            <div @click="goLink2" :class="['fetch-coder', ( fetch_coder_type == 1 || needAuth?'signIn':'')]"  :style="{color:user_top_font_color}" data-link="/lionfish_comshop/moduleA/score/signin" v-if="isopen_signinreward==1&&show_signinreward_icon==1">
              <span class="iconfont icon-qiandao"></span>
              <div class="fetch-coder-text">积分签到</div>
            </div>
            <div @click="toggleFetchCoder" class="fetch-coder" :style="{color:user_top_font_color}" v-if="fetch_coder_type == 1||needAuth">
              <span class="iconfont icon-erweima1"></span>
              <div class="fetch-coder-text">{{$t('me.tihuoma')}}</div>
            </div>
          </div>
          <div @click="goLink2" class="vip i-flex i-flex-spb"  v-if="is_open_vipcard_buy==1" data-link="/lionfish_comshop/moduleA/vip/upgrade">
            <div class="i-flex vip-name">
              <img class="vip-logo" :src="modify_vipcard_logo" v-if="modify_vipcard_logo"/>
              <span class="iconfont icon-huiyuan" style="font-size:15px;" v-else></span>
              “{{modify_vipcard_name}}” 尊享特权·会员专享价</div>
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

      <!--<div class="['order', (is_open_vipcard_buy==1?'hasVip':'')]">-->
      <div class="order">
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
            <span class="num" :style="{background:skin.color}" v-show="member_info.wait_pay_count!=0">{{member_info.wait_pay_count}}</span>
            <!--<img class="icon-img" :src="user_order_menu_icons.i1?user_order_menu_icons.i1:'@/assets/images/needPayIcon.png'"/>-->
            <img class="icon-img" src="@/assets/images/needPayIcon.png"/>
            <span style="color: #444;">{{$t('common.daifukuan')}}</span>
          </div>
          <div @click="goLink2" class="order_status" data-link="/lionfish_comshop/pages/order/index?order_status=1">
            <span class="num" :style="{background:skin.color}" v-show="member_info.wait_send_count!=0">{{member_info.wait_send_count}}</span>
            <!--<img class="icon-img" :src="user_order_menu_icons.i2?user_order_menu_icons.i2:'@/assets/images/undeli.png'"/>-->
            <img class="icon-img" src="@/assets/images/undeli.png"/>
            <span style="color: #444;">{{$t('common.daipeisong')}}</span>
          </div>
          <div @click="goLink2" class="order_status" data-link="/lionfish_comshop/pages/order/index?order_status=4">
            <span class="num" :style="{background:skin.color}" v-show="member_info.wait_get_count!=0">{{member_info.wait_get_count}}</span>
            <!--<img class="icon-img" :src="user_order_menu_icons.i3?user_order_menu_icons.i3:'@/assets/images/distributionIcon.png'"/>-->
            <img class="icon-img" src="@/assets/images/distributionIcon.png"/>
            <span style="color: #444;">{{$t('common.daitihuo')}}</span>
          </div>
          <div @click="goLink2" class="order_status" data-link="/lionfish_comshop/pages/order/index?order_status=6">
            <!--<img class="icon-img" :src="user_order_menu_icons.i4?user_order_menu_icons.i4:'@/assets/images/completeIcon.png'"/>-->
            <img class="icon-img" src="@/assets/images/completeIcon.png"/>
            <span style="color: #444;">{{$t('common.yitihuo')}}</span>
          </div>
          <div @click="goLink2" class="order_status" data-link="/lionfish_comshop/pages/refund/refundList">
            <!--<img class="icon-img" :src="user_order_menu_icons.i5?user_order_menu_icons.i5:'@/assets/images/refundIcon.png'"/>-->
            <img class="icon-img" src="@/assets/images/refundIcon.png"/>
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
            <div>
              <span class="iconfont icon-ziyuan fsz-30"></span> {{$t('common.phone')}}：
            </div>
            <div v-on:click="callTelphone" :data-phone="(community.disUserMobile||community.head_mobile)" style="color:#ee884a;">{{community.disUserMobile||community.head_mobile}}</div>
            <!--<div v-on:click="callTelphone" style="color:#ee884a;">{{community.disUserMobile||community.head_mobile}}</div>-->
            <div @click="goLink" class="goods-sign-btn" :data-link="community.whatsapplink" v-show="community.whatsapplink != '' && community.whatsapplink != undefined && community.whatsapplink != null ">
              <img src="@/assets/images/join-group.png" height="26px" width="26px"/> <span style="font-size:larger;float:right">Join Group</span>
            </div>
          </div>

        </div>
      </div>

      <div class="tool distribution" v-if="show_user_pin==1">
        <div v-on:click="goLink2" data-link="/lionfish_comshop/moduleA/pin/me">
          <div class="item-main">
            <div class="item-title">
              <span>我的拼团</span>
            </div>
            <div class="tool-right">
              <img class="icon-right " src="@/assets/images/rightArrowImg.png"/>
            </div>
          </div>
        </div>
        <div v-on:click="goLink2" data-link="/lionfish_comshop/moduleA/pin/income">
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
            <div v-on:click="goLink2" class="to-distribution" data-link="/lionfish_comshop/distributionCenter/pages/fans">
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
            <div v-on:click="goNext" class="modal-foot-r btn" data-type="share" :style="{background:skin.color}" v-if="need_num_update>0">立即分享</div>
            <div v-on:click="goNext" class="modal-foot-r btn" data-type="commiss" :style="{background:skin.color}" v-if="need_num_update<=0&&commiss_biaodan_need<=0&&formStatus==2">进入{{commiss_diy_name}}</div>
            <div v-on:click="goNext" class="modal-foot-r btn" data-type="form" v-if="need_num_update<=0&&formStatus==0">
              立即升级
            </div>
            <div v-on:click="goNext" class="modal-foot-r btn" data-type="commiss" :style="{background:skin.color}" v-if="commiss_biaodan_need==1&&need_num_update<=0&&formStatus==2">
              进入{{commiss_diy_name}}
            </div>
          </div>
        </div>
        <div class="toolList">
          <div v-on:click="goDistribution">
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
          <div v-on:click="goLink2" class="yuenav" data-link="/lionfish_comshop/pages/user/charge" v-if="is_open_yue_pay==1">
            <div class="item-main">
              <div class="item-title">
                <!--<img class="toolIcon" mode="widthFix" :src="user_tool_icons.i1?user_tool_icons.i1:'@/assets/images/wallet.png'"/>-->
                <img class="toolIcon" mode="widthFix" src="@/assets/images/wallet.png"/>
                <span>余额<div v-if="!needAuth">: ${{member_info.account_money||0}}</div>
                </span>
              </div>
              <div class="tool-right">
                <span style="margin-right:5px;">{{excharge_nav_name}}</span>
                <img class="icon-right " src="@/assets/images/rightArrowImg.png"/>
              </div>
            </div>
          </div>
          <div v-on:click="goLink2" data-link="/lionfish_comshop/moduleA/solitaire/me" v-if="is_open_solitaire==1">
            <div class="item-main">
              <div class="item-title">
                <!--<img class="toolIcon" mode="widthFix" :src="user_tool_icons.i10?user_tool_icons.i10:'@/assets/images/soli.png'"/>-->
                <img class="toolIcon" mode="widthFix" src="@/assets/images/soli.png"/>
                <span>我的接龙</span>
              </div>
              <div class="tool-right">
                <img class="icon-right " src="@/assets/images/rightArrowImg.png"/>
              </div>
            </div>
          </div>
          <div v-if="is_show_score==1">
            <div v-on:click="goLink2" class="score" data-link="/lionfish_comshop/moduleA/score/signin" v-if="isopen_signinreward==1">
              <div class="item-main">
                <div class="item-title">
                  <!--<img class="toolIcon" mode="widthFix" :src="user_tool_icons.i2?user_tool_icons.i2:'@/assets/images/icon-score.png'"/>-->
                  <img class="toolIcon" mode="widthFix" src="@/assets/images/icon-score.png"/>
                  <span>积分</span>
                </div>
                <div class="tool-right">
                  <span style="margin-right:5px;">立即签到</span>
                  <img class="icon-right " src="@/assets/images/rightArrowImg.png"/>
                </div>
              </div>
            </div>
            <div v-on:click="goLink2" class="score" data-link="/lionfish_comshop/moduleA/score/scoreDetails" v-else>
              <div class="item-main">
                <div class="item-title">
                  <!--<img class="toolIcon" mode="widthFix" :src="user_tool_icons.i2?user_tool_icons.i2:'@/assets/images/icon-score.png'"/>-->
                  <img class="toolIcon" mode="widthFix" src="@/assets/images/icon-score.png"/>
                  <span>积分</span>
                </div>
                <div class="tool-right">
                  <img class="icon-right " src="@/assets/images/rightArrowImg.png"/>
                </div>
              </div>
            </div>
          </div>
          <!--<div v-on:click="goLink2" data-link="/lionfish_comshop/pages/user/coupon">-->
            <!--<div class="item-main">-->
              <!--<div class="item-title">-->
                <!--&lt;!&ndash;<img class="toolIcon" mode="widthFix" :src="user_tool_icons.i3?user_tool_icons.i3:'@/assets/images/coupon.png'"/>&ndash;&gt;-->
                <!--<img class="toolIcon" mode="widthFix" src="@/assets/images/coupon.png"/>-->
                <!--<span>{{$t('common.youhuiquan')}}</span>-->
              <!--</div>-->
              <!--<div class="tool-right">-->
                <!--<img class="icon-right " src="@/assets/images/rightArrowImg.png"/>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
          <a hoverClass="none" href="#/lionfish_comshop/pages/groupCenter/communityMembers" v-if="member_info.pickup_id>0">
            <div class="item-main">
              <div class="item-title">
                <!--<img class="toolIcon" mode="widthFix" :src="user_tool_icons.i4?user_tool_icons.i4:'@/assets/images/groupCenterIcon.png'"/>-->
                <img class="toolIcon" mode="widthFix" src="@/assets/images/groupCenterIcon.png"/>
                <span>核销管理</span>
              </div>
              <div class="tool-right">
                <img class="icon-right " src="@/assets/images/rightArrowImg.png"/>
              </div>
            </div>
          </a>
          <div v-on:click="goToGroup" v-if="member_info.is_head==1">
            <div class="item-main">
              <div class="item-title">
                <!--<img class="toolIcon" mode="widthFix" :src="(user_tool_icons.i5?user_tool_icons.i5:'@/assets/images/groupCenterIcon.png')"/>-->
                <img class="toolIcon" mode="widthFix" src="@/assets/images/groupCenterIcon.png"/>
                <span>{{groupInfo.owner_name}}&nbsp; {{$t('common.zhongxin')}}</span>
              </div>
              <div class="tool-right">
                <img class="icon-right " src="@/assets/images/rightArrowImg.png"/>
              </div>
            </div>
          </div>
          <a hoverClass="none" href="#/lionfish_comshop/pages/groupCenter/apply" v-else-if="member_info.is_head==2||member_info.is_head==3">
            <div class="item-main">
              <div class="item-title">
                <!--<img class="toolIcon" mode="widthFix" :src="user_tool_icons.i5?user_tool_icons.i5:'@/assets/images/groupCenterIcon.png'"/>-->
                <img class="toolIcon" mode="widthFix" src="@/assets/images/groupCenterIcon.png"/>
                <span>{{groupInfo.owner_name}}审核中</span>
              </div>
              <div class="tool-right">
                <img class="icon-right " src="@/assets/images/rightArrowImg.png"/>
              </div>
            </div>
          </a>
          <div v-else>
            <a hoverClass="none" href="#/lionfish_comshop/pages/groupCenter/recruit" v-if="close_community_apply_enter==0">
              <div class="item-main">
                <div class="item-title">
                  <!--<img class="toolIcon" mode="widthFix" :src="user_tool_icons.i5?user_tool_icons.i5:'@/assets/images/groupCenterIcon.png'"/>-->
                  <img class="toolIcon" mode="widthFix" src="@/assets/images/groupCenterIcon.png"/>
                  <span>申请成为{{groupInfo.owner_name}}</span>
                </div>
                <div class="tool-right">
                  <img class="icon-right " src="@/assets/images/rightArrowImg.png"/>
                </div>
              </div>
            </a>
          </div>
          <div v-if="enabled_front_supply==1">
            <a hoverClass="none" href="#/lionfish_comshop/pages/supply/recruit" v-if="is_supply==0||needAuth">
              <div class="item-main">
                <div class="item-title">
                  <!--<img aspectFit class="toolIcon supplier" mode="widthFix" :src="user_tool_icons.i6?user_tool_icons.i6:'@/assets/images/icon-supplier.png'"/>-->
                  <img aspectFit class="toolIcon supplier" mode="widthFix" src="@/assets/images/icon-supplier.png"/>
                  <span>申请成为{{supply_diy_name}}</span>
                </div>
                <div class="tool-right">
                  <img class="icon-right " src="@/assets/images/rightArrowImg.png"/>
                </div>
              </div>
            </a>
            <div v-else-if="is_supply==1">
              <div class="item-main">
                <div class="item-title">
                  <!--<img aspectFit class="toolIcon supplier" mode="widthFix" :src="user_tool_icons.i6?user_tool_icons.i6:'@/assets/images/icon-supplier.png'"/>-->
                  <img aspectFit class="toolIcon supplier" mode="widthFix" src="@/assets/images/icon-supplier.png"/>
                  <span>{{supply_diy_name}}审核中</span>
                </div>
              </div>
            </div>
            <div v-else-if="is_supply==2">
              <div v-on:click="goLink2" class="item-main" data-link="/lionfish_comshop/moduleB/supply/index" v-if="is_open_supplymobile==1">
                <div class="item-title">
                  <!--<img aspectFit class="toolIcon supplier" mode="widthFix" :src="user_tool_icons.i6?user_tool_icons.i6:'@/assets/images/icon-supplier.png'"/>-->
                  <img aspectFit class="toolIcon supplier" mode="widthFix" src="@/assets/images/icon-supplier.png"/>
                  <span>{{supply_diy_name}}</span>
                </div>
              </div>
              <div class="item-main" v-else>
                <div class="item-title">
                  <!--<img aspectFit class="toolIcon supplier" mode="widthFix" :src="user_tool_icons.i6?user_tool_icons.i6:'@/assets/images/icon-supplier.png'"/>-->
                  <img aspectFit class="toolIcon supplier" mode="widthFix" src="@/assets/images/icon-supplier.png"/>
                  <span>您已是{{supply_diy_name}}</span>
                </div>
              </div>
            </div>
          </div>
          <div @click="goLink2" data-link="/lionfish_comshop/pages/user/protocol">
            <div class="item-main">
              <div class="item-title">
                <!--<img class="toolIcon" mode="widthFix" :src="user_tool_icons.i7?user_tool_icons.i7:'@/assets/images/protocolIcon.png'"/>-->
                <img class="toolIcon" mode="widthFix" src="@/assets/images/protocolIcon.png"/>
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
                <!--<img class="toolIcon" mode="widthFix" :src="user_tool_icons.i8?user_tool_icons.i8:'@/assets/images/serviceIcon.png'"/>-->
                <img class="toolIcon" mode="widthFix" src="@/assets/images/serviceIcon.png"/>
                <span>联系客服</span>
              </div>
              <div class="tool-right">
                <img class="icon-right " src="@/assets/images/rightArrowImg.png"/>
              </div>
            </div>
          </a>
          <!--</button>-->
          <a hoverClass="none" href="#/lionfish_comshop/pages/user/articleProtocol?about=1" v-if="is_show_about_us==1">
            <div class="item-main">
              <div class="item-title">
                <!--<img class="toolIcon" mode="widthFix" :src="(user_tool_icons && user_tool_icons.i9)?user_tool_icons.i9:'@/assets/images/aboutUsIcon.png'"/>-->
                <img class="toolIcon" mode="widthFix" src="@/assets/images/aboutUsIcon.png"/>
                <span>关于我们</span>
              </div>
              <div class="tool-right">
                <img class="icon-right " src="@/assets/images/rightArrowImg.png"/>
              </div>
            </div>
          </a>
          <div @click="loginOut" v-if="!needAuth&&ishow_user_loginout_btn==1">
            <div class="item-main">
              <div class="item-title">
                <img class="toolIcon" mode="widthFix" src="@/assets/images/loginOut.png"/>
                <span>退出登录</span>
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
          <!--<img v-on:click="previewImage" class="canvas" data-src="{{member_info.hexiao_qrcod}}" :src="member_info.hexiao_qrcod" v-if="member_info.hexiao_qrcod"/>-->
          <img v-on:click="previewImage" class="canvas"  :src="member_info.hexiao_qrcod" v-if="member_info.hexiao_qrcod"/>
          <div v-on:click="goLink2" class="nocode" v-else>登录后显示</div>
        </div>
        <div class="right">
          <div class="title1" :style="{color:skin.color}">向{{groupInfo.owner_name}}出示二维码提货</div>
          <div class="title2" style="display:none;">或出示提货码</div>
          <!--<div v-on:click="showCoder" class="btn" style="display:none;">使用提货码</div>-->
          <div class="btn" style="display:none;">使用提货码</div>
        </div>
      </div>
      <div class="version">
        <span>{{copyright}}</span>
      </div>

    </div>
    <i-tabbar @authModal="authModal" :cartNum="cartNum" currentIdx="4" :needAuth="needAuth" :tabbarRefresh="tabbarRefresh"></i-tabbar>
  </div>




  <!--<i-tabbar bind:authModal="authModal" :cartNum="cartNum" currentIdx="4" :needAuth="needAuth" :tabbarRefresh="tabbarRefresh"></i-tabbar>-->
  <!--<i-get-phone bind:cancel="close" bind:confirm="getReceiveMobile" bind:needAuth="authModal" visible="{{showGetPhone&&!needAuth}}"></i-get-phone>-->
  <!--<i-fetch-coder bind:cancel="toggleFetchCoder" codeImg="{{member_info.hexiao_qrcod}}" coderList="{{myCoderList}}" visible="{{isShowCoder}}"></i-fetch-coder>-->
  <!--<i-new-auth bind:authSuccess="authSuccess" bind:cancel="authModal" :needAuth="needAuth&&showAuthModal"></i-new-auth>-->
</template>

<script>
  import GlobalMixin from '../../mixin/globalMixin.js';
  import util from '../../utils/index.js';
  import status from '../../utils/index.js'
  import wcache from '../../utils/wcache.js';
  import auth from '../../utils/auth';
  import wx from '../../utils/wx';
  import request from '../../utils/request';

  var _extends = Object.assign || function(e) {
      for (var t = 1; t < arguments.length; t++) {
        var o = arguments[t];
        for (var a in o) Object.prototype.hasOwnProperty.call(o, a) && (e[a] = o[a]);
      }
      return e;
    };

  export default {
    mixins: [GlobalMixin],
//    util:[util],
    status:[status],
    wcache:[wcache],
    auth:[auth],
    name:'me',
//    components: {
//      'i-type-item' : require('./type-item.vue').default,
//      'i-img': require('../../components/img/me.vue').default,
//      'i-router-link': require('../../components/RouterLink/me.vue').default
//    },
    data() {
      return {
        tablebar: 4,
//        canIUse: wx.canIUse("button.open-type.getUserInfo"),
        theme_type: "",
        add_mo: 0,
        is_show_on: 0,
        level_name: "",
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
        qrcodebase64: "",
        setInter: null,
        copyright: "",
        common_header_backgroundimage: "",
        enabled_front_supply: 0,
        cartNum: 0,
        is_show_about_us: 0,
        groupInfo: {
          group_name: "社区",
          owner_name: "团长"
        },
        is_show_score: 0,
        showGetPhone: false,
        user_tool_icons: {},
        community: "",
        isCalling: false,
        member_info:{},
        is_supply : 0,
        showGetPhone : '',
        is_open_vipcard_buy : 0,
        modify_vipcard_name : "会员",
        is_vip_card_member : 0,
        modify_vipcard_logo :'',
        show_signinreward_icon :'',
        isopen_signinreward : 0,


        copyright : '',
        common_header_backgroundimage: '',
        is_show_about_us: 0,
        enabled_front_supply :'',
        is_open_yue_pay :0,
        is_show_score :0,
        user_order_menu_icons : {},
        commiss_diy_name :'',
        close_community_apply_enter : 0,
        user_tool_icons : {},
        ishow_user_loginout_btn :0,
        supply_diy_name :'',
        user_service_switch :0,
        fetch_coder_type : 0,
        show_user_pin : 0,
        show_user_change_comunity :0,
        open_danhead_model :0,
        is_open_solitaire :0,
        community :{},

        user_top_font_color:'',
        commiss_level:'',
        showAuthModal:false,
        tabbarRefresh:false,
        whatsapplink:'',
        user_service_url:''
      }
    },
    created: function() {
//      this.$store.state.app.toolbarTitle ="我的";
      this.$wx.setNavigationBarTitle({
        title: "Me",
        showLogo:false,
        showMore:false,
        showBack:false
      })
      this.onLoad();
      this.onShow();
    },
    mounted:function(){

    },
    methods: {
      onLoad: function (options) {
         this.$wx.hideTabBar();
        let that = this;
        this.setNavBgColor();
        this.setGroupInfo();
//        this.load_community_data();
        this.$wx.showLoading();
      },
      setNavBgColor() {
        this.$http({
          controller: 'index.get_nav_bg_color'
        }).then(response => {
          console.log(response);
          var t = response.data || '#8ED9D1', e = response.nav_font_color || '#ffffff'
          this.$store.dispatch('app/setNavBgColor', t)
          this.$store.dispatch('app/setNavFontColor', e)
        })
      },
      setGroupInfo() {
//        var groupInfo = this.$wcache.get('groupInfo', 1);
//        if (groupInfo == 1) {
          this.$http({
              controller: 'index.get_group_info'
            }).then(res=> {
              console.log(res);
              if (res.code == 0) {

                let obj = res.data;
                console.log(obj);
                obj.commiss_diy_name = obj.commiss_diy_name || '分销';
                obj.group_name = obj.group_name || '社区';
                obj.owner_name = obj.owner_name || '团长';
                obj.delivery_ziti_name = obj.delivery_ziti_name || '到点自提';
                obj.delivery_tuanzshipping_name = obj.delivery_tuanzshipping_name || '团长配送';
                obj.delivery_express_name = obj.delivery_express_name || '快递配送';
                obj.placeorder_tuan_name = obj.placeorder_tuan_name;
                obj.placeorder_trans_name = obj.placeorder_trans_name;
                this.groupInfo = obj;
              }
            })
//        }
      },
      getMemberInfo: function () {
        var token = this.$wx.getStorageSync('token');
        this.getCommunityInfo();
        var that = this;
        this.$http({
            controller: 'user.get_user_info',
            token:token
          }).then(res=> {
            console.log(res);

              this.$wx.hideLoading();
//            setTimeout(function(){  this.$wx.hideLoading(); },1000);
            if (res.code == 0) {
              let showGetPhone = false;
              if (res.is_show_auth_mobile == 1 && !res.data.telephone) showGetPhone = true;
              let member_info = res.data || '';
              let params = {};

              if (member_info){
                let userInfo = {
                  avatar: member_info.avatar,
                  username: member_info.username
                };
                this.$wx.setStorage({
                  key: "userInfo",
                  data: userInfo
                });

                member_info.member_level_info && (member_info.member_level_info.discount = (member_info.member_level_info.discount/10).toFixed(1));
                //开启分销
                if (res.commiss_level > 0) {
                  //还差多少人升级
                  let commiss_share_member_update = res.commiss_share_member_update * 1;
                  let share_member_count = res.share_member_count * 1;
                  let need_num_update = res.commiss_share_member_update * 1 - res.share_member_count * 1;

                  //判断表单状态状态
                  let formStatus = 0; //未填写 1 已填写未审核 2 已审核
                  if (member_info.is_writecommiss_form == 1) {
                    formStatus = 1;
                    //已填写
                    if (member_info.comsiss_flag == 1) {
                      member_info.comsiss_state == 0 ? formStatus = 1 : formStatus = 2;
                    }
                  }


                    this.formStatus = formStatus;
                    this.commiss_level= res.commiss_level;
                    this.commiss_sharemember_need = res.commiss_sharemember_need;
                    this.commiss_share_member_update = commiss_share_member_update;
                    this.commiss_biaodan_need = res.commiss_biaodan_need;
                    this.share_member_count = share_member_count;
                    this.today_share_member_count = res.today_share_member_count;
                    this.yestoday_share_member_count = res.yestoday_share_member_count;
                    this.need_num_update = need_num_update;

                }
              } else {
                this.needAuth = true;
              }

              let { is_supply, is_open_vipcard_buy, modify_vipcard_name, is_vip_card_member, modify_vipcard_logo, isopen_signinreward, show_signinreward_icon } = res;

                this.member_info = member_info;
                this.is_supply = is_supply || 0;
                this.showGetPhone = showGetPhone;
                this.is_open_vipcard_buy = is_open_vipcard_buy || 0;
                this.modify_vipcard_name = modify_vipcard_name || "会员";
                this.is_vip_card_member = is_vip_card_member || 0;
                this.modify_vipcard_logo = modify_vipcard_logo;
                this.show_signinreward_icon = show_signinreward_icon;
                this.isopen_signinreward =isopen_signinreward;

            } else {
              //needAuth
              that.needAuth = true;
//               this.$wx.hideTabBar();
               this.$wx.setStorage({
                key: "member_id",
                data: null
              })
            }
            that.$forceUpdate();
        })
      },
      getCommunityInfo: function () {
        let that = this;
        let community =  this.$wx.getStorageSync('community');
        if (community) {
          if(!community.head_mobile) {
            status.getCommunityById(community.communityId).then(res=>{
              this.community = res.data;
//              this.community.whatsapplink = "http://www.baidu.com";
            })
          } else {
            this.community =community;
          }
        } else {
          var token =  this.$wx.getStorageSync('token');
          token && status.getCommunityInfo().then(res => {
            this.community =res.data;
          })
        }
        this.$forceUpdate();
      },
      getCopyright: function () {
        var that = this;
        var token = this.$wx.getStorageSync('token')
        this.$http({
            controller: 'user.get_copyright',
            token:token
          }).then(res=> {
            console.log(res,"get_copyright");
            if (res.code == 0) {
              let rdata = res;
              let {
                enabled_front_supply,
                is_open_yue_pay,
                is_show_score,
                user_order_menu_icons,
                close_community_apply_enter,
                user_tool_icons,
                ishow_user_loginout_btn,
                commiss_diy_name,
                supply_diy_name,
                user_service_switch,
                fetch_coder_type,
                show_user_pin,
                common_header_backgroundimage,
                is_show_about_us,
                show_user_change_comunity,
                open_danhead_model,
                default_head_info,
                is_open_solitaire,
                user_top_font_color,
                user_service_url
              } = rdata;

              let h = {};
              if (open_danhead_model==1) {
                h.community = default_head_info;
              }

              commiss_diy_name = commiss_diy_name || '分销';
              supply_diy_name = supply_diy_name || '供应商';
//              this.$wcache.put('commiss_diy_name', commiss_diy_name);
//              this.$wcache.put('supply_diy_name', supply_diy_name);


                this.copyright = rdata.data || '';
                this.common_header_backgroundimage= common_header_backgroundimage || '';
                this.is_show_about_us= is_show_about_us || 0;
                this.enabled_front_supply = enabled_front_supply;
                this.is_open_yue_pay = is_open_yue_pay;
                this.is_show_score =is_show_score;
                this.user_order_menu_icons = user_order_menu_icons || {};
                this.commiss_diy_name = commiss_diy_name;
                this.close_community_apply_enter= close_community_apply_enter || 0;
                this.user_tool_icons = user_tool_icons || {};
                this.ishow_user_loginout_btn = ishow_user_loginout_btn || 0;
//                this.ishow_user_loginout_btn = 1;
                this.supply_diy_name = supply_diy_name;
                this.user_service_switch = user_service_switch;
//                this.user_service_switch = 1;
                this.fetch_coder_type = fetch_coder_type || 0;
                this.show_user_pin = show_user_pin;
                this.show_user_change_comunity = show_user_change_comunity;
                this.open_danhead_model = open_danhead_model;
                this.is_open_solitaire = is_open_solitaire;
                that.user_top_font_color = user_top_font_color;
                that.user_service_url = user_service_url;
                this.community = h.community;

            }
          })
      },
      authSuccess: function () {
        var that = this;
         this.$wx.showLoading();
         this.needAuth = false, this.showAuthModal= false, this.tabbarRefresh = true ;
        status.cartNum().then(function(t) {
          s.cartNum = t.data
        })

        that.getMemberInfo();
      },
      authModal: function () {

        if(this.needAuth) {
            this.showAuthModal = !this.showAuthModal;
//            return false;
        }
        if(this.showAuthModal){
          this.$wx.redirectTo({
            url: "/login"
          })
        }
        return true;
      },
      goToGroup: function () {

        5 === this.auditStatus ?  this.$wx.redirectTo({
          url: "/lionfish_comshop/pages/groupCenter/index"
        }) :  this.$wx.redirectTo({
          url: "/lionfish_comshop/pages/groupCenter/apply"
        });
      },
      bindGetUserInfo: function (e) {

        var that = this;
//        if ("getUserInfo:ok" === e.detail.errMsg) {
          var userInfo = this.$wx.getStorageSync("userInfo");
//          let { nickName, avatarUrl } = e.detail.userInfo;
          this.$getApp().globalData.userInfo = userInfo;
          this.$wx.setStorage({
            key: "userInfo",
            data: userInfo
          }); this.userInfo = userInfo;
          this.$wx.showToast({
            title: "资料已更新",
            icon: "none",
            duration: 2000
          });
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
      previewImage: function (e) {
        var current = e.target.dataset.src;
        current &&  this.$wx.previewImage({
          current: current,
          urls: [current]
        })
      },
      goLink2: function(event) {

        if(!this.authModal()) return;

        let link = event.currentTarget.dataset.link;
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

        this.$wx.redirectTo({
          url: link
        })
      },
      onShow: function () {
        var that = this;
        util.check_login_new().then((res)=>{
          if (res) {
            that.needAuth = false
            that.tabbarRefresh = true
            status.cartNum().then(function(t) {
              that.cartNum = t.data
            })
          } else {
            that.needAuth =  true
            that.$wx.hideLoading();
          }
        })
        that.getCopyright();
        that.getMemberInfo();
        that.$wx.hideLoading()
      },
      onHide: function () {
        this.tabbarRefresh= false
      },
      getReceiveMobile: function (e) {
         this.$wx.showToast({
          icon: 'none',
          title: '授权成功',
        })
        this.showGetPhone= false;
      },
      close: function () {
        this.showGetPhone= false;
      },
      closeDistribution: function () {
        this.showDistribution= false
      },
      goDistribution: function () {
        let member_info = this.member_info;
        //判断是不是分销商
        if (member_info.comsiss_flag == 0) {
          this.distributionNext();
        } else {
          if (member_info.comsiss_state == 0) {
            //分销商未审核
            this.distributionNext();
          } else {
            //分销商已审核
             this.$wx.navigateTo({
              url: '/lionfish_comshop/distributionCenter/pages/me',
            })
          }
        }
      },
      distributionNext: function () {
        if (this.commiss_sharemember_need == 1) {
          console.log('需要分享');
          let url = '/lionfish_comshop/distributionCenter/pages/recruit';
           this.$wx.navigateTo({
            url
          })
        } else if (this.commiss_biaodan_need == 1) {
          console.log('需要表单');
          // let url = '/lionfish_comshop/pages/distribution/apply';
           this.$wx.navigateTo({
            url: '/lionfish_comshop/distributionCenter/pages/recruit',
          })
        } else {
          // 跳转表单自动审核
          let status = 0;
          let member_info = this.member_info;
          if (member_info.comsiss_flag == 1) {
            member_info.comsiss_state == 0 ? status = 1 : status = 2;
          }
          let url = '/lionfish_comshop/distributionCenter/pages/recruit';
          if (status == 2) {
            url = '/lionfish_comshop/distributionCenter/pages/me';
          }
           this.$wx.navigateTo({
            url
          })
        }
      },
      goNext: function (e) {
        console.log(e)
        let status = 0;
        let member_info = this.data.member_info;
        if (member_info.comsiss_flag == 1) {
          member_info.comsiss_state == 0 ? status = 1 : status = 2;
        }
        let type = e.currentTarget.dataset.type;
        if (type == 'share') {
           this.$wx.navigateTo({
            url: '/lionfish_comshop/distributionCenter/pages/share',
          })
        } else if (type == 'commiss') {
          if (status == 2) {
             this.$wx.navigateTo({
              url: '/lionfish_comshop/distributionCenter/pages/me',
            })
          } else {
             this.$wx.navigateTo({
              url: '/lionfish_comshop/distributionCenter/pages/recruit',
            })
          }
        } else if (type == 'form') {
          if (status == 2) {
             this.$wx.navigateTo({
              url: '/lionfish_comshop/distributionCenter/pages/me',
            })
          } else {
            // let url = '/lionfish_comshop/pages/distribution/apply';
             this.$wx.navigateTo({
              url: '/lionfish_comshop/distributionCenter/pages/recruit',
            })
          }
        }
      },
      loginOut: function () {

         this.$wx.removeStorageSync('community');
         this.$wx.removeStorageSync('token');
        this.onLoad();
        this.onShow();
//         this.$wx.redirectTo({
//           url: '/lionfish_comshop/pages/user/me',
//         });
      },
      toggleFetchCoder: function () {
        if (!this.authModal()) return;
        this.isShowCoder= !this.isShowCoder;
      },
      callTelphone: function (e) {
        var that = this;
        var phoneNumber = e.currentTarget.dataset.phone;
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
        var token = this.$wx.getStorageSync("token");
        var c = this;
        this.$http({
          controller: "community.get_community_info",
          token: token
        }).then(t=> {
          console.log(t);
          if (0 == t.code && t.commission_info) {
//            c.whatsapplink = "http://www.baidu.com";
              if(t.commission_info.whatsapplink != null && t.commission_info.whatsapplink != 'null') {
                  c.whatsapplink = t.commission_info.whatsapplink;
              }
          }

        });
      },
      goLink: function(event) {
        let link = event.currentTarget.dataset.link;
//        this.$wx.redirectTo({
//          url: link
//        })
        window.location.href=link;
      },
    }
  }
</script>
<style>
  @import "me.less";
</style>
