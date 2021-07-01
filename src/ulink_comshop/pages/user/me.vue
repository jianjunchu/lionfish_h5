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
                 :style="{color:user_top_font_color}" data-link="/ulink_comshop/moduleA/score/signin"
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
               data-link="/ulink_comshop/moduleA/vip/upgrade">
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
          <div @click="goLink2" class="to-order" data-link="/ulink_comshop/pages/order/index">
            <span>{{$t('me.quanbudingdan')}}</span>
          </div>
          <div class="order-right">
            <img class="icon-right" src="@/assets/images/rightArrowImg.png"/>
          </div>
        </div>
        <div class="orderTab">
          <div @click="goLink2" class="order_status" data-link="/ulink_comshop/pages/order/index?order_status=3">
            <span class="num" :style="{background:skin.color}" v-if="member_info.wait_pay_count && member_info.wait_pay_count!=0">{{member_info.wait_pay_count}}</span>
            <img class="icon-img"
                 :src="user_order_menu_icons.i1?user_order_menu_icons.i1:require('@/assets/images/needPayIcon.png')"/>
            <span style="color: #444;">{{$t('common.daifukuan')}}</span>
          </div>
          <div @click="goLink2" class="order_status" data-link="/ulink_comshop/pages/order/index?order_status=1">
            <span class="num" :style="{background:skin.color}" v-if="member_info.wait_send_count && member_info.wait_send_count!=0">{{member_info.wait_send_count}}</span>
            <img class="icon-img"
                 :src="user_order_menu_icons.i2?user_order_menu_icons.i2:require('@/assets/images/undeli.png')"/>
            <span style="color: #444;">{{$t('common.daipeisong')}}</span>
          </div>
          <div @click="goLink2" class="order_status" data-link="/ulink_comshop/pages/order/index?order_status=4">
            <span class="num" :style="{background:skin.color}" v-if="member_info.wait_get_count && member_info.wait_get_count!=0">{{member_info.wait_get_count}}</span>
            <img class="icon-img"
                 :src="user_order_menu_icons.i3?user_order_menu_icons.i3:require('@/assets/images/distributionIcon.png')"/>
            <span style="color: #444;">{{$t('common.daitihuo')}}</span>
          </div>
          <div @click="goLink2" class="order_status" data-link="/ulink_comshop/pages/order/index?order_status=6">
            <img class="icon-img"
                 :src="user_order_menu_icons.i4?user_order_menu_icons.i4:require('@/assets/images/completeIcon.png')"/>
            <span style="color: #444;">{{$t('common.yitihuo')}}</span>
          </div>
          <div @click="goLink2" class="order_status" data-link="/ulink_comshop/pages/refund/refundList">
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
              <a class="to-distribution" hoverClass="none" href="#/ulink_comshop/pages/position/community">
                <span>{{$t('common.qiehuan')}}</span>
              </a>
              <img class="icon-right" src="@/assets/images/rightArrowImg.png"/>
            </div>
          </div>
        </div>
        <div class="modal-body community fsz-30" style="height: 19vw">
          <div class="weight red mb5">{{community.communityName}}</div>
          <div class="fsz-30 text-gray mb5" style="float: left;width: 60%">{{community.fullAddress}}</div>
          <div class="i-flex" style="justify-content: center;vertical-align:middle;float:right;width: 40%" v-if="community.disUserMobile||community.head_mobile">
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
              <img src="@/assets/images/join-group.png" style="float: left;width:4vw;height: 4vw;margin-top: 0.7vw"/>
              <span style="font-size:3vw;float:right;color:#9b9b9b;line-height: 6vw">&nbsp;Join our chat</span>
            </div>
          </div>

        </div>
      </div>

      <!-- <div class="tool distribution" v-if="show_user_pin==1">
        <div @click="goLink2" data-link="/ulink_comshop/moduleA/pin/me">
          <div class="item-main">
            <div class="item-title">
              <span>我的拼团</span>
            </div>
            <div class="tool-right">
              <img class="icon-right " src="@/assets/images/rightArrowImg.png"/>
            </div>
          </div>
        </div>
        <div @click="goLink2" data-link="/ulink_comshop/moduleA/pin/income">
          <div class="item-main">
            <div class="item-title">
              <span>拼团收益</span>
            </div>
            <div class="tool-right">
              <img class="icon-right " src="@/assets/images/rightArrowImg.png"/>
            </div>
          </div>
        </div>
      </div> -->
      <div class="tool distribution" v-if="commiss_level>0">
        <div v-if="commiss_sharemember_need==1">
          <div class="my-distribution modal-head">
            <div class="my-distribution-title">
              <span>{{$t('me.wodefensi')}}</span>
            </div>
            <div @click="goLink2" class="to-distribution" data-link="/ulink_comshop/distributionCenter/pages/fans">
              <span>{{$t('me.chakan')}}</span>
            </div>
            <div class="distribution-right">
              <img class="icon-right" src="@/assets/images/rightArrowImg.png"/>
            </div>
          </div>
          <div class="modal-body i-flex i-flex-alc">
            <div class="distribut-tot i-flex-item">{{share_member_count}}</div>
            <div class="distribut-new bor-r">
              <div class="distribut-num">{{today_share_member_count}}</div>
              <div class="distribut-desc">{{$t('me.jinrixinzeng')}}</div>
            </div>
            <div class="distribut-new">
              <div class="distribut-num">{{yestoday_share_member_count}}</div>
              <div class="distribut-desc">{{$t('me.zuorixinzeng')}}</div>
            </div>
          </div>
          <div class="modal-foot i-flex i-flex-spb" v-if="!(member_info.comsiss_flag==1&&member_info.comsiss_state==1)">
            <div class="modal-foot-l" v-if="need_num_update>0">
              <span v-if="share_member_count!=0">{{$t('me.zai')}}</span>{{$t('me.fenxiang')}}<span class="tot">{{need_num_update}}</span>{{$t('me.weixinfensi')}}{{commiss_diy_name}}
            </div>
            <div class="modal-foot-l" v-if="commiss_biaodan_need==0&&need_num_update<=0">
              <div v-if="formStatus==0">{{$t('me.chayibujiuchengwei')}}{{commiss_diy_name}}{{$t('me.renyuanla')}}</div>
              <div v-if="formStatus==1">{{$t('me.gongxinitianxiechenggong')}}</div>
              <div v-if="formStatus==2">{{$t('me.gongxinichengwei')}}{{commiss_diy_name}}{{$t('me.renyuan')}}</div>
            </div>
            <div class="modal-foot-l" v-if="commiss_biaodan_need==1&&need_num_update<=0">
              <div v-if="formStatus==0">{{$t('me.chayibujiuchengwei')}}{{commiss_diy_name}}{{$t('me.renyuanla')}}</div>
              <div v-if="formStatus==1">{{$t('me.gongxinitianxiechenggong')}}</div>
              <div v-if="formStatus==2">{{$t('me.gongxinichengwei')}}{{commiss_diy_name}}{{$t('me.renyuan')}}</div>
            </div>
            <div @click="goNext" class="modal-foot-r btn" data-type="share" :style="{background:skin.color}"
                 v-if="need_num_update>0">{{$t('me.lijifenxiang')}}
            </div>
            <div @click="goNext" class="modal-foot-r btn" data-type="commiss" :style="{background:skin.color}"
                 v-if="need_num_update<=0&&commiss_biaodan_need<=0&&formStatus==2">{{$t('me.jinru')}}{{commiss_diy_name}}
            </div>
            <div @click="goNext" class="modal-foot-r btn" data-type="form" v-if="need_num_update<=0&&formStatus==0">
              {{$t('me.lijishengji')}}
            </div>
            <div @click="goNext" class="modal-foot-r btn" data-type="commiss" :style="{background:skin.color}"
                 v-if="commiss_biaodan_need==1&&need_num_update<=0&&formStatus==2">
              {{$t('me.jinru')}}{{commiss_diy_name}}
            </div>
          </div>
        </div>
        <div class="toolList">
          <div @click="goDistribution">
            <div class="item-main">
              <div class="item-title">
                <span>{{commiss_diy_name}}</span>
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
          <div @click="goLink2" class="yuenav" data-link="/ulink_comshop/pages/user/charge"
               v-if="is_open_yue_pay==1">
            <div class="item-main">
              <div class="item-title">
                <img class="toolIcon" mode="widthFix"
                     :src="user_tool_icons.i1?user_tool_icons.i1:require('@/assets/images/wallet.png')"/>
                <span>{{$t('wallet.yue')}}<span v-if="!needAuth">: ${{member_info.account_money||0}}</span>
                </span>
              </div>
              <div class="tool-right">
                <span style="margin-right:5px;">{{excharge_nav_name}}</span>
                <img class="icon-right " src="@/assets/images/rightArrowImg.png"/>
              </div>
            </div>
          </div>
          <!-- <div @click="goLink2" data-link="/ulink_comshop/moduleA/solitaire/me" v-if="is_open_solitaire==1">
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
          </div> -->
          <div v-if="is_show_score==1">
            <div @click="goLink2" class="score" data-link="/ulink_comshop/moduleA/score/signin"
                 v-if="isopen_signinreward==1">
              <div class="item-main">
                <div class="item-title">
                  <img class="toolIcon" mode="widthFix"
                       :src="user_tool_icons.i2?user_tool_icons.i2:require('@/assets/images/icon-score.png')"/>
                  <span>{{$t('common.jifen')}}</span>
                </div>
                <div class="tool-right">
                  <span style="margin-right:5px;">{{$t('me.lijiqiandao')}}</span>
                  <img class="icon-right " src="@/assets/images/rightArrowImg.png"/>
                </div>
              </div>
            </div>
            <div @click="goLink2" class="score" data-link="/ulink_comshop/moduleA/score/signin" v-else>
              <div class="item-main">
                <div class="item-title">
                  <img class="toolIcon" mode="widthFix"
                       :src="user_tool_icons.i2?user_tool_icons.i2:require('@/assets/images/icon-score.png')"/>
                  <span>{{$t('common.jifen')}}</span>
                </div>
                <div class="tool-right">
                  <img class="icon-right " src="@/assets/images/rightArrowImg.png"/>
                </div>
              </div>
            </div>
          </div>

          <div @click="goLink2" data-link="/ulink_comshop/pages/user/coupon" >
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
                    <router-link hoverClass="none" to="/ulink_comshop/pages/groupCenter/communityMembers" v-if="member_info.pickup_id>0">
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

                <span>{{$t('me.tuanzhang')}}&nbsp; {{$t('common.zhongxin')}}</span>
              </div>
              <div class="tool-right">
                <img class="icon-right " src="@/assets/images/rightArrowImg.png"/>
              </div>
            </div>
          </div>
          <router-link hoverClass="none" to="/ulink_comshop/pages/groupCenter/apply" v-else-if="member_info.is_head==2||member_info.is_head==3">
            <div class="item-main">
              <div class="item-title">
                <img class="toolIcon" mode="widthFix" :src="user_tool_icons.i5?user_tool_icons.i5:require('@/assets/images/groupCenterIcon.png')"/>
                <span>{{$t('me.tuanzhang')}}{{$t('me.shenhezhong')}}</span>
              </div>
              <div class="tool-right">
                <img class="icon-right " src="@/assets/images/rightArrowImg.png"/>
              </div>
            </div>
          </router-link>

          <div v-else>
            <router-link  hoverClass="none" to="/ulink_comshop/pages/groupCenter/recruit" v-if="close_community_apply_enter==0">
              <div class="item-main">
                <div class="item-title">
                  <img class="toolIcon" mode="widthFix" :src="user_tool_icons.i5?user_tool_icons.i5:require('@/assets/images/groupCenterIcon.png')"/>
                  <span>{{$t('me.shenqingchengwei1')}}{{$t('me.tuanzhang')}}</span>
                </div>
                <div class="tool-right">
                  <img class="icon-right " src="@/assets/images/rightArrowImg.png"></img>
                </div>
              </div>
            </router-link>
          </div>


          <div v-if="enabled_front_supply==1">
            <router-link hoverClass="none" to="/ulink_comshop/pages/supply/recruit" v-if="is_supply==0||needAuth">
              <div class="item-main">
                <div class="item-title">
                  <img aspectFit class="toolIcon supplier" mode="widthFix"
                       :src="user_tool_icons.i6?user_tool_icons.i6:require('@/assets/images/icon-supplier.png')"/>
                  <span>{{$t('me.shenqingchengwei')}}{{supply_diy_name}}</span>
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
                  <span>{{supply_diy_name}}{{$t('me.shenhezhong')}}</span>
                </div>
              </div>
            </div>
            <div v-else-if="is_supply==2">
              <router-link hoverClass="none" to="/ulink_comshop/moduleB/supply/index" v-if="is_open_supplymobile==1">
                <div class="item-main">
                  <div class="item-title">
                    <img aspectFit class="toolIcon supplier" mode="widthFix"
                        :src="user_tool_icons.i6?user_tool_icons.i6:require('@/assets/images/icon-supplier.png')"/>
                    <span>{{supply_diy_name}}</span>
                  </div>
                  <div class="tool-right">
                    <img class="icon-right" src="@/assets/images/rightArrowImg.png"/>
                  </div>
                </div>
              </router-link>
              <div class="item-main" v-else>
                <div class="item-title">
                  <img aspectFit class="toolIcon supplier" mode="widthFix"
                       :src="user_tool_icons.i6?user_tool_icons.i6:require('@/assets/images/icon-supplier.png')"/>
                  <span>{{$t('me.ninyishi')}}{{supply_diy_name}}</span>
                </div>
              </div>
            </div>
          </div>
          <div @click="goLink2" data-link="/ulink_comshop/pages/user/protocol">
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
          <router-link hoverClass="none" href="#/ulink_comshop/pages/user/articleProtocol?about=1"
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


      <!-- <div class="canvas-content" v-if="fetch_coder_type==0">
        <div class="left">
          <img @click="previewImage" class="canvas" data-src="member_info.hexiao_qrcod" :src="member_info.hexiao_qrcod"
               v-if="member_info.hexiao_qrcod"/>
          <div @click="goLink2" class="nocode" v-else>登录后显示</div>
        </div>
        <div class="right">
          <div class="title1" :style="{color:skin.color}">向{{groupInfo.owner_name}}出示二维码提货</div>
          <div class="title2" style="display:none;">或出示提货码</div>
          <div @click="showCoder" class="btn" style="display:none;">使用提货码</div>
          <div class="btn" style="display:none;">使用提货码</div>
        </div>
      </div> -->
      <div class="version">
        <span>{{copyright}}</span>
      </div>

    </div>
    <i-tabbar ref="tabbar" @authModal="authModal" :cartNum="cartNum" currentIdx="4" :needAuth="needAuth"
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
      activated:function(){
          var i = this;
          if(i.$refs.tabbar){
              i.$refs.tabbar.switchTab();
          }
          wx.setNavigationBarTitle({
              title: 'Me',
              showLogo: false,
              showMore: false,
              showBack: false
          })
          this.onShow()
          this.getMemberInfo();
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
                  f.needAuth = false;
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
              } else {
                  a.needAuth = !0;
              }
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
              1 == f && (x.community = w), _ = _ || C.$t('distributionCenter.fenxiao'), c = c || "供应商", wcache.put("commiss_diy_name", _),
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
                C.excharge_nav_name = v || "",
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
            wx.navigateTo({
              url: "/login"
            })
          }
        })

        return !i.needAuth
      },
      goToGroup: function() {

        5 === this.auditStatus ? this.$wx.navigateTo({
          url: '/ulink_comshop/pages/groupCenter/index'
        }) : this.$wx.navigateTo({
          url: '/ulink_comshop/pages/groupCenter/apply'
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
          t.getCopyright()
          util.check_login_new().then(function(e) {
              if(e){
                  t.needAuth = !1
                  t.needAuth = false;
                  status.cartNum().then(function (e) {
                      t.cartNum = e.data
                  })
                  t.getMemberInfo();
              }
          })

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
              url: '/ulink_comshop/distributionCenter/pages/me'
            })
          }
        }
      },
      distributionNext: function() {
        if (this.commiss_sharemember_need == 1) {
          console.log('需要分享')
          let url = '/ulink_comshop/distributionCenter/pages/recruit'
          this.$wx.navigateTo({
            url
          })
        } else if (this.commiss_biaodan_need == 1) {
          console.log('需要表单')
          // let url = '/ulink_comshop/pages/distribution/apply';
          this.$wx.navigateTo({
            url: '/ulink_comshop/distributionCenter/pages/recruit'
          })
        } else {
          // 跳转表单自动审核
          let status = 0
          let member_info = this.member_info
          if (member_info.comsiss_flag == 1) {
            member_info.comsiss_state == 0 ? status = 1 : status = 2
          }
          let url = '/ulink_comshop/distributionCenter/pages/recruit'
          if (status == 2) {
            url = '/ulink_comshop/distributionCenter/pages/me'
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
            url: '/ulink_comshop/distributionCenter/pages/share'
          })
        } else if (type == 'commiss') {
          if (status == 2) {
            this.$wx.navigateTo({
              url: '/ulink_comshop/distributionCenter/pages/me'
            })
          } else {
            this.$wx.navigateTo({
              url: '/ulink_comshop/distributionCenter/pages/recruit'
            })
          }
        } else if (type == 'form') {
          if (status == 2) {
            this.$wx.navigateTo({
              url: '/ulink_comshop/distributionCenter/pages/me'
            })
          } else {
            // let url = '/ulink_comshop/pages/distribution/apply';
            this.$wx.navigateTo({
              url: '/ulink_comshop/distributionCenter/pages/recruit'
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
//           url: '/ulink_comshop/pages/user/me',
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
<style   scoped>
  @import "../../../@feiying/8.less";

  @import "../../../@feiying/8.less";

  .personal {
    width: 100%;
    background: #f5f5f5;
    position: relative;
    overflow: hidden;
  }

  .personal .basicInform {
    width: 100%;
    height: 170px;
  }

  .personal .basicInform .back-img {
    width: 100%;
    height: 170px;
  }

  .personal .basicInform .modify {
    width: 17px;
    height: 15px;
    line-height: 15px;
    margin-left: 5px;
    font-size: 11px;
    border: none;
    background: transparent;
    padding: 0;
  }

  .personal .basicInform .modify::after {
    border: none;
  }

  .personal .order {
    position: relative;
    height: 130px;
    width: 95vw;
    border-radius: 10px;
    margin: -90px 10px 0 10px;
    background: #fff;
    z-index: 5;
    box-shadow: 0 0 20px rgba(0,0,0,0.1);
  }

  .personal .order .my-order {
    padding: 11px 15px;
    display: flex;
    align-items: center;
  }

  .personal .order .my-order .my-order-title {
    flex: 1;
    font-size:12px;
    font-weight: 500;
    color: #444;
  }

  .personal .order .my-order .to-order {
    font-size: 12px;
    color: #aaa;
    margin-right: 10px;
  }

  .personal .order .orderTab {
    border-top: 0.05px solid #efefef;
    padding: 16px 21px 0;
    background-color: #fff;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .personal .order .orderTab .order_status {
    position: relative;
    color: #58595b;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .personal .order .orderTab .order_status .num {
    width: 5vw;
    height: 5vw;
    background: #fff;
    font-size: 2vw;
    color: #fff;
    border: 0.5vw solid #fff;
    background: #ff6557;
    border-radius: 50%;
    position: absolute;
    right: 0;
    top: -1.5vw;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
  }

  .personal .order .orderTab .order_status .icon-img {
    height: 28px;
    width: 28px;
    margin-bottom: 10px;
  }

  .personal .icon-right {
    width: 6px;
    height: 11px;
  }

  .personal .tool {
    width: 95vw;
    border-radius: 10px;
    margin: 10px 0 0 10px;
    background: #fff;
    box-shadow: 0 0 20px rgba(0,0,0,0.1);
  }

  .personal .tool .border-top-bottom {
    border-top: 0.5px solid #efefef;
    border-bottom: 0.5px solid #efefef;
  }

  .personal .tool .item-main {
    padding: 16px 20px;
    border-bottom: 0.5px solid #efefef;
  }

  .personal .tool .item-main .item-title {
    height: 20px;
    width: 200px;
    color: #444;
    font-size: 14px;
    display: flex;
    align-items: center;
  }

  .personal .tool .item-main .tool-right {
    float: right;
    display: flex;
    align-items: center;
    margin-top: -15px;
  }

  .personal .tool .item-fav {
    background: #fff;
    margin: 0;
    padding: 0;
    height: 54px;
  }

  .personal .tool button::after {
    border: none;
  }

  .personal .canvas-content {
    width: 95vw;
    height: 158px;
    border-radius: 10px;
    margin: 10px 0 0 10px;
    background: #fff;
    text-align: center;
    box-shadow: 0 0 20px rgba(0,0,0,0.1);
    overflow: hidden;
    display: flex;
    font-family: PingFangSC-Regular;
    font-weight: 400;
  }

  .personal .canvas-content .left {
    position: relative;
  }

  .personal .canvas-content .right {
    flex: 1;
  }

  .personal .canvas-content .icon-sm-logo {
    position: absolute;
    height: 28px;
    width: 28px;
    top: 61px;
    left: 61px;
  }

  .personal .canvas-content .canvas {
    height: 110px;
    width: 110px;
    margin: 24px 0 0 22px;
  }

  .personal .canvas-content .title1 {
    text-align: center;
    margin-top: 78px;
    font-size: 14px;
    line-height: 14px;
    color: #8ED9D1;
    margin-left: -10px;
  }

  .personal .canvas-content .title2 {
    text-align: center;
    margin-top: 10px;
    font-size: 12px;
    line-height: 12px;
    color: #949494;
  }

  .personal .canvas-content .btn {
    text-align: center;
    box-sizing: border-box;
    border-radius: 13px;
    border: 1px solid #ff695c;
    padding: 7px 0;
    margin: 10px auto 0;
    width: 92px;
    font-size: 12px;
    line-height: 12px;
    color: #ff5344;
  }

  .version {
    width: 100%;
    font-size: 12px;
    color: #aaa;
    text-align: center;
    margin: 40px auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .personal .basicInform .personalCon {
    width: 100%;
    height: 105px;
    padding-top: 15px;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 3;
  }

  .personal .basicInform .personalCon .userInfo {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .personal .basicInform .personalCon .userInfo .userAvatarUrl {
    border-radius: 50%;
    width: 50px;
    height: 50px;
    margin-left: 20px;
    margin-right: 10px;
  }

  .personal .basicInform .personalCon .userInfo .user-name {
    color: #fff;
    font-size: 15px;
    font-weight: bold;
  }

  .personal .basicInform .personalCon .userInfo .user-name .user-name-top {
    font-size: 15px;
    font-weight: bold;
    display: flex;
    align-items: center;
    margin-left: 70px;
    margin-top: -40px;
  }

  .personal .basicInform .personalCon .userInfo .user-name .user-name-top view:first-of-type {
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .personal .basicInform .personalCon .userInfo .user-name .user-name-top .refresh {
    position: relative;
  }

  .personal .basicInform .personalCon .userInfo .user-name .user-name-top .refresh .modify {
    width: 12px;
    height: 12px;
    background: #ea544c;
    opacity: 0;
    border: none;
    position: absolute;
    left: 0;
    top: 0;
    padding: 10px 20px;
  }

  .personal .basicInform .personalCon .userInfo .user-name .user-name-top .refresh .modify::after {
    border: none;
  }

  .personal .basicInform .personalCon .userInfo .user-name .user-name-top .refresh .updateWx {
    color: #fff;
    margin-left: 85px;
  }

  .personal .basicInform .personalCon .userInfo .user-name .user-name-top .refreshImg {
    width: 12px;
    height: 12px;
    margin-left: 10px;
  }

  .personal .basicInform .personalCon .userInfo .user-name .member {
    font-size: 12px;
    color: #fff;
    margin-top: 2px;
  }

  .personal .basicInform .personalCon .pineCones {
    padding: 0 25px;
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
  }

  .personal .basicInform .personalCon .pineCones .myPineCones {
    color: #e9cc95;
    font-size: 14px;
    font-weight: bold;
    display: flex;
    align-items: center;
  }

  .personal .basicInform .personalCon .pineCones .myPineCones .pineConesImg {
    width: 14px;
    height: 15px;
    margin-right: 5px;
  }

  .personal .basicInform .personalCon .pineCones .myPineCones .pineConeRules {
    font-size: 10px;
    margin-left: 14px;
    text-decoration: underline;
  }

  .personal .basicInform .personalCon .pineCones .myPineCones navigator {
    margin-top: -4px;
  }

  .personal .basicInform .personalCon .pineCones .pineconeDetail {
    color: #e9cc95;
    font-size: 12px;
    padding: 1px 10px;
    border: 0.05px solid #e9cc95;
    border-radius: 11px;
  }

  .personal .order.close-yue {
    position: relative;
    margin-top: -50px;
    z-index: 2;
  }

  .yuenav .tool-right {
    margin-top: -19px!important;
  }

  .disModal {
    width: 90%;
  }

  .modal-content {
    position: relative;
    background-color: #fff;
    box-sizing: border-box;
    border-radius: 5px;
    font-size: 14px;
  }

  .modal-head {
    position: relative;
    padding: 10px 15px;
  }

  .modal-foot {
    position: relative;
    padding: 10px 15px;
  }

  .modal-head::after,.modal-foot::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    height: 1px;
    transform: scaleY(.5);
  }

  .modal-head::after {
    border-bottom: 1px solid #c8c7cc;
    bottom: 0;
  }

  .modal-foot::before {
    border-top: 1px solid #c8c7cc;
    top: 0;
  }

  .modal-foot .tot,.modal-head-r {
    color: #ff5344;
  }

  .modal-head-l {
    color: #333;
    font-size: 15px;
    font-weight: bold;
  }

  .modal-body {
    padding: 25px 15px;
    color: #333;
  }

  .modal-foot-r.btn {
    color: #fff;
    background-color: #ff5344;
    padding: 3px 15px;
    border-radius: 4px;
  }

  .distribut-new {
    text-align: center;
  }

  .bor-r {
    position: relative;
    padding-right: 10px;
    margin-right: 10px;
  }

  .bor-r::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width: 1px;
    transform: scaleX(.5);
    border-right: 1px solid #c8c7cc;
  }

  .distribut-tot {
    font-size: 29px;
    font-weight: bold;
    padding-left: 15px;
  }

  .model-close {
    text-align: center;
    margin: 15px 0;
  }

  .model-close .close {
    width: 30px;
    height: 30px;
  }

  .personal .distribution .my-distribution {
    padding: 11px 15px;
    display: flex;
    align-items: center;
  }

  .personal .distribution .my-distribution .my-distribution-title {
    flex: 1;
    font-size: 12px;
    font-weight: 500;
    color: #444;
  }

  .personal .distribution .my-distribution .to-distribution {
    font-size: 12px;
    color: #aaa;
    margin-right: 10px;
  }

  .personal .distribution .item-main {
    padding: 10px 15px;
  }

  .toolList {
    border-top: 0.5px solid #efefef;
  }

  .nocode {
    border: 0.5px solid #e5e5e5;
    height: 110px;
    line-height: 110px;
    width: 110px;
    margin: 24px 0 0 22px;
    background: rgba(0,0,0,0.1);
    text-align: center;
    color: #fff;
  }

  .toolIcon {
    width: 20px;
    max-height: 25px;
    margin-right: 9px;
  }

  .userLevel {
    display: flex;
    align-items: center;
    margin-top: 5px;
    color: #fff;
  }

  .userLevelName {
    background: #372d35;
    border-radius: 10px;
    padding: 0 7.5px;
    height:19px;
    line-height: 19px;
    text-align: center;
    font-size: 11px;
  }

  .userLevelName .iconfont {
    color: #fae9bb;
    font-size: 12px;
  }

  .userLevel .userLeveldiscount {
    font-size: 12px;
    margin-left: 5px;
  }

  .fetch-coder {
    position: absolute;
    right: 10px;
    text-align: center;
    color: #fff;
  }

  .fetch-coder .iconfont {
    color: #fff;
    background: rgba(0,0,0,0.1);
    width: 36px;
    height: 36px;
    text-align: center;
    line-height: 36px;
    border-radius: 50%;
    display: inline-block;
  }

  .fetch-coder-text {
    font-size: 11px;
    margin-top: 2px;
  }

  .personal .order.hasVip {
    margin-top: -47.5px;
  }

  .vip {
    margin: 10px;
  }

  .signIn {
    right: 56px;
  }

  .community.modal-body {
    padding: 15px;
  }

  .goods-sign-btn {
    display: inline-block;
    height: 6vw;
    padding: 0 2vw;
    border: 1px solid #9bd9d3;
    border-radius: 3vw;
    text-align: center;
    font-size: 3vw;
    line-height: 5.5vw;
    color: #2ebc45;
    margin-left: 1vw;
    vertical-align:middle;
  }


</style>
