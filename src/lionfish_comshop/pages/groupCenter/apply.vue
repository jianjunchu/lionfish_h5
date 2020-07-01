<template>
  <!--<div>-->
    <div>
      <div class="container" v-if="member_info.is_head==0&&!apply_complete">
        <div class="header">{{$t(host.shuruxinxi)}}</div>
        <form>
          <div class="form-group">
            <!--<div :class="['form-item', (errors[3]===2?'error':'')]">-->
            <div class="form-item">
              <label class="form-item-control">{{$t(host.xingming)}}</label>
              <!--<input bindinput="inputRealName" class="form-item-input" data-key="3" placeholder="{{$t(host.shuruxingming)}}" type="text"/>-->
              <input v-model="head_name" class="form-item-input" placeholder="请输入姓名" type="text"/>
            </div>
            <!--<div class="['form-item', (errors[2]===2?'error':'')]">-->
            <div class="form-item">
              <label class="form-item-control">手机号</label>
              <!--<input bindinput="inputMobile" class="form-item-input" data-key="2" :focus="focus_mobile" maxlength="11" placeholder="请输入手机号码" type="text" :value="mobile"/>-->
              <input v-model="mobile_detail" class="form-item-input"  maxlength="11" placeholder="请输入手机号码" type="text" />
            </div>
            <div class="form-item">
              <div class="form-item">
              <label class="form-item-control">微信号</label>
              <!--<input bindinput="inputWechat" class="form-item-input" :focus="focus_wechat" placeholder="请输入微信号" type="text" :value="wechat"/>-->
              <input v-model="wechat"  class="form-item-input" placeholder="请输入微信号" type="text" />
              </div>
            </div>
            <!--<div class="['form-item', (errors[5]===2?'error':'')]" style="display:none;">-->
              <!--<label class="form-item-control">验证码</label>-->
              <!--&lt;!&ndash;<input bindinput="inputCaptcha" class="form-item-input" data-key="5" maxlength="6" placeholder="请输入验证码" type="text"/>&ndash;&gt;-->
              <!--<input bindinput="inputCaptcha"  maxlength="6" placeholder="请输入验证码" type="text"/>-->
              <!--&lt;!&ndash;<div @click="getCaptcha" class="captcha" :hidden="!showCountDown">获取验证码</div>&ndash;&gt;-->
              <!--<div class="captcha" :hidden="showCountDown">-->
                <!--{{timeStamp}}s后重试-->
              <!--</div>-->
            <!--</div>-->
            <!--<div class="['form-item', (errors[1]===2?'error':'')]">-->
            <div class="form-item">
              <label class="form-item-control">{{groupInfo.group_name}}名称</label>
              <!--<input bindinput="inputCommunity" class="form-item-input" data-key="1" placeholder="请输入社区名称" type="text"/>-->
              <input v-model="community_name" class="form-item-input"  placeholder="请输入社区名称" type="text"/>
              </div>
            <!--<div @click="chose_location" class="['form-item', (errors[0]===2?'error':'')]">-->
            <!--<label class="form-item-control">所在位置</label>-->
            <!--<div class="class='form-item-input'">{{region[0]||'选择地址'}}{{region[1]}}{{region[2]}}</div>-->
            <!--<img class="icon-right" src="@/assets/images/rightArrowImg.png"/>-->
            <!--</div>-->
            <!--<div class="['form-item', (errors[6]===2?'error':'')]">-->
            <div class="form-item">
              <label class="form-item-control">详细地址</label>
              <!--<input bindinput="inputAddress" class="form-item-input" data-key="1" placeholder="请输入详细地址" type="text" :value="addr_detail"/>-->
              <input v-model="addr_detail" class="form-item-input" placeholder="请输入详细地址" type="text" />
            </div>
            <div class="form-item">
              <label class="submit">
                提交申请
                <button hidden @click="submit"></button>
              </label>
            </div>
          </div>
      </form>
    </div>
    <div class="apply-pass" v-if="member_info.is_head==1">
      <img src="@/assets/images/auditSuccess.png"/>
      <div class="h1">申请通过</div>
      <div class="p">恭喜您，您的申请已通过</div>
    </div>
    <div class="apply-pass" v-if="member_info.is_head==3">
      <img src="@/assets/images/auditFail.png"/>
      <div class="h1">申请未通过</div>
      <div class="p">很抱歉，您的申请未通过</div>
      <div @click="applyAgain" class="link-btn">再次申请</div>
    </div>
    <div class="apply-pass" v-if="member_info.is_head==2||apply_complete">
      <img src="@/assets/images/auditing.png"/>
      <div class="h1">申请审核中</div>
      <div class="p">您的申请在处理中，请等待结果…</div>
      <a class="link-btn" openType="switchTab" href="#/lionfish_comshop/pages/index/index">返回首页</a>
    </div>
    <!--</div>-->
    <!--<i-new-auth bind:authSuccess="authSuccess" bind:cancel="authModal" :needAuth="needAuth&&showAuthModal" needPosition="false"></i-new-auth>-->

  </div>

</template>

<script>
  import GlobalMixin from '../../mixin/globalMixin.js';
  import status from '../../utils/index.js'
  import util from '../../utils/index.js'
  export default {
    mixins: [GlobalMixin],
    name:'groupcenter-spply',
    data() {
      return {
        pass: -2,
        canSubmit: !1,
        region: [ "选择地址", "", "" ],
        addr_detail: "",
        lon_lat: "",
        focus_mobile: !1,
        showCountDown: !0,
        timeStamp: 60,
        apply_complete: !1,
        wechat: "",
        needAuth: !1,
        member_info: {
          is_head: 0
        },
        groupInfo: {
          group_name: "社区",
          owner_name: "团长"
        },
        community_id: "",
        errors:[],
        province_name: '',
        city_name: '',
        area_name: '',
        lon_lat: '',
        addr_detail: '',
        community_name: '',
        mobile: '',
        head_name: '',
        mobile_detail:'',
        wechat: '',
        token: '',
        community_id: '',
        is_need_subscript:false,
        need_subscript_template:false
      }
    },
    created: function() {
      this.onLoad();
    },
    methods: {
      bindRegionChange: function(t) {
        this.region= t.detail.value.replace(/^\s*|\s*$/g, "");
      },
      inputAddress: function(t) {
        this.addr_detail= t.detail.value.replace(/^\s*|\s*$/g, "");
      },
      inputCommunity: function(t) {
        this.community_name= t.detail.value.replace(/^\s*|\s*$/g, "");
      },
      inputMobile: function(t) {
        this.mobile_detail= t.detail.value.replace(/^\s*|\s*$/g, "");
      },
      inputRealName: function(t) {
        this.head_name= t.detail.value.replace(/^\s*|\s*$/g, "");
      },
      inputWechat: function(t) {
        this.wechat= t.detail.value.replace(/^\s*|\s*$/g, "");
      },
      chose_location: function() {
        var d = this;
//        this.$wx.chooseLocation({
//          success: function(t) {
//            var e = t.longitude + "," + t.latitude, a = t.address, n = d.region, i = "", o = a, s = new RegExp("(.*?省)(.*?市)(.*?区)", "g"), c = s.exec(o);
//            null == c && null == (c = (s = new RegExp("(.*?省)(.*?市)(.*?市)", "g")).exec(o)) ? null != (c = (s = new RegExp("(.*?省)(.*?市)(.*县)", "g")).exec(o)) && (n[0] = c[1],
//              n[1] = c[2], n[2] = c[3], i = a.replace(c[0], "")) : (n[0] = c[1], n[1] = c[2],
//              n[2] = c[3], i = a.replace(c[0], ""));
//            var u = i + t.name, r = u, l = "";
//            locat.getGpsLocation(t.latitude, t.longitude).then(function(t) {
//              (l = t) && (n[0] = l.province, n[1] = l.city, n[2] = l.district, r = u || l.street),
//                d.region= n,
//                d.lon_lat= e,
//                d.addr_detail= r;
//            }), "省" == n[0] && this.$wx.showToast({
//              title: "请重新选择省市区",
//              icon: "none"
//            });
//          },
//          fail: function(t) {
//            console.log("地址获取失败", t);
//          }
//        });
      },
      subscriptionNotice: function() {
        console.log("subscriptionNotice");
        var o = this;
        return new Promise(function(t, e) {
          var i = o.need_subscript_template, a = Object.keys(i).map(function(t) {
            return i[t];
          });
//          this.$wx.requestSubscribeMessage ? a.length && this.$wx.requestSubscribeMessage({
//            tmplIds: a,
//            success: function(e) {
//              var a = 1, n = [];
//              Object.keys(i).forEach(function(t) {
//                "accept" == e[i[t]] ? n.push(t) : a = 0;
//              }), n.length && o.addAccept(n), o.is_need_subscript= a, t();
//            },
//            fail: function() {
//              e();
//            }
//          }) : e();
        });
      },
      addAccept: function(t) {
        var e = this.$wx.getStorageSync("token"), a = t.join(",");
        this.$http_post({
            controller: "user.collect_subscriptmsg",
            token: e,
            type: a
          }).then( {
        });
      },
      submit: function() {

        if (this.authModal()) {
          var t = this, e = this.$wx.getStorageSync("token"), a = this.region[0], n = this.region[1], i = this.region[2],
            o = this.addr_detail, s = this.community_name, c = this.mobile_detail, u = this.lon_lat,
            r = this.head_name, l = this.wechat;
          if ("" == r || void 0 === r) return this.$wx.showToast({
            title: "请填写姓名",
            icon: "none"
          }), !1;

          if ("" == c) return this.focus_mobile=!0, this.$wx.showToast({
            title: "手机号码有误",
            icon: "none"
          }), !1;

          if (!/^\d{8}$/.test(c) && !/^1(3|4|5|6|7|8|9)\d{9}$/.test(c)) return this.focus_mobile= !0, this.$wx.showToast({
            title: "手机号码有误",
            icon: "none"
          }), !1;
          if ("" == l || void 0 === l) return this.$wx.showToast({
            title: "请填写微信号",
            icon: "none"
          }), !1;
          if ("" == s || void 0 === s) return this.$wx.showToast({
            title: "请填写小区名称",
            icon: "none"
          }), !1;
//          if ("省" == a && "市" == n && "区" == i) return this.$wx.showToast({
//            title: "请选择地区",
//            icon: "none"
//          }), !1;
//          if ("" == u || void 0 === u) return this.$wx.showToast({
//            title: "请选择地图位置",
//            icon: "none"
//          }), !1;
          if ("" == o || void 0 === o) return this.$wx.showToast({
            title: "请填写详细地址",
            icon: "none"
          }), !1;
          var d = {
            province_name: a,
            city_name: n,
            area_name: i,
            lon_lat: u,
            addr_detail: o,
            community_name: s,
            mobile: c,
            head_name: r,
            wechat: l,
            controller: "community.sub_community_head",
            token: e,
            community_id: this.community_id
          };
//          1 == this.is_need_subscript ? this.subscriptionNotice().then(function() {
//            t.preSubmit(d);
//          }).catch(function() {
//            t.preSubmit(d);
//          }) : t.preSubmit(d);

          t.preSubmit(d);
        }
      },
      preSubmit: function(t) {
        var e = this;

        this.$http_post({
           t}).then(t=> {
               console.log(t);
            0 == t.code ? (this.$wx.showToast({
              title: "提交成功，等待审核",
              icon: "none",
              duration: 2e3
            }), e.apply_complete= !0) : e.needAuth= !0;

        });
      },
      onLoad: function() {
        var a = this;
        var query = this.$route.query;
        status.setNavBgColor(), status.setGroupInfo().then(function(t) {
          var e = t && t.owner_name || "团长";
          a.groupInfo= t;
//            this.$wx.setNavigationBarTitle({
//            title: e + "申请"
//          });
//          this.$store.state.app.toolbarTitle =e + "申请";
          a.$wx.setNavigationBarTitle({
            title: e + "申请"
          })
        });
        var e = decodeURIComponent(query.scene);
        "undefined" != e && (this.community_id = e), this.getUserInfo(), this.checkSubscript();
      },
      onShow: function() {
        var e = this;
        util.check_login_new().then(function(t) {
          t ? e.needAuth= !1: e.needAuth= !0;
        });
      },
      authModal: function() {
        return !this.needAuth || (this.showAuthModal= !this.showAuthModal, !1);
      },
      authSuccess: function() {
        var t = this;
//        this.needAuth= !1, function() {
//          t.getUserInfo();
//        });
        this.needAuth= !1;
        t.getUserInfo();
      },
      getUserInfo: function() {
        var a = this, t = this.$wx.getStorageSync("token");
        this.$http({

            controller: "user.get_user_info",
            token: t
          }).then(t=> {
            if (0 == t.code) {
              var e = t.data || {
                  is_head: 0
                };
              1 == e.is_head && app.util.message("您已通过审核", "/lionfish_comshop/pages/groupCenter/index", "error"),
                a.member_info= e;
            } else a.needAuth= !0;

        });
      },
      applyAgain: function() {
        var t = this.member_info;
        t.is_head = 0, this.member_info= t;
      },
      countDown: function() {
        var a = this;
        clearInterval(clearTime), clearTime = setInterval(function() {
          var t = a.data.timeStamp, e = a.showCountDown;
          0 < t ? t-- : (e = !0, clearInterval(clearTime), t = 60), a.showCountDown= e,
            a.timeStamp= t;
        }, 1e3);
      },
      checkSubscript: function() {
        var i = this, t = this.$wx.getStorageSync("token");
        t && this.$http({
            controller: "community.check_head_subscriptapply",
            token: t
          }).then(t=> {
            if (0 == t.code) {
              var e = t.data;
//                a = e.is_need_subscript,
//                n = e.need_subscript_template;
//              i.is_need_subscript= a,
//                i.need_subscript_template= n
                ;
            }
        });
      }
    }
  }
</script>
<style>
  @import "apply.less";
</style>
