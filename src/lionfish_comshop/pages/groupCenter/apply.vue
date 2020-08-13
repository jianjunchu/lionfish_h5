<template>
  <!--<div>-->
    <div>
      <div class="container" v-if="member_info.is_head==0&&!apply_complete">
        <div class="header">{{$t('host.shuruxinxi')}}</div>
        <form>
          <div class="form-group">
            <!--<div :class="['form-item', (errors[3]===2?'error':'')]">-->
            <div class="form-item">
              <label class="form-item-control">{{$t('host.xingming')}}</label>
              <!--<input @input="inputRealName" class="form-item-input" data-key="3" placeholder="{{$t(host.shuruxingming)}}" type="text"/>-->
              <input v-model="head_name" class="form-item-input" placeholder="" type="text"/>
            </div>
            <!--<div class="['form-item', (errors[2]===2?'error':'')]">-->
            <div class="form-item">
              <label class="form-item-control">Mobile</label>
              <!--<input @input="inputMobile" class="form-item-input" data-key="2" :focus="focus_mobile" maxlength="11" placeholder="请输入手机号码" type="text" :value="mobile"/>-->
              <input v-model="mobile_detail" class="form-item-input"  maxlength="11" placeholder="" type="text" />
            </div>

            <div class="form-item">
              <label class="form-item-control">{{$t('order.youbian')}}</label>
              <!--<input bindinput="inputZipCode" class="form-item-input" focus="{{focus_zip_code}}" placeholder="请输入邮编" type="text" value="{{zip_code}}"></input>-->
              <input v-model="zip_code" class="form-item-input"  placeholder="" type="text" />
            </div>

            <div class="form-item">
              <label class="form-item-control">{{$t('order.dapaihao')}}</label>
              <!--<input bindinput="inputBlkNo"   class="form-item-input" focus="{{focus_blk_no}}" placeholder="请输入大牌号" type="text" value="{{blk_no}}"></input>-->
              <input v-model="blk_no"   class="form-item-input"  placeholder="" type="text" />
            </div>

            <div class="form-item">
              <label class="form-item-control">{{$t('order.daoluming')}}</label>
              <!--<input bindinput="inputRoadName"   class="form-item-input" focus="{{focus_road_name}}" placeholder="请输入路名" type="text" value="{{road_name}}"></input>-->
              <input v-model="road_name"   class="form-item-input"  placeholder="" type="text" />
            </div>

            <div class="form-item">
              <label class="form-item-control">{{$t('order.menpaihao')}}</label>
              <!--<input bindinput="inputLouMengHao"   class="form-item-input" focus="{{focus_lou_meng_hao}}" placeholder="请输入门牌号" type="text" value="{{lou_meng_hao}}"></input>-->
              <input v-model="lou_meng_hao"   class="form-item-input"  placeholder="" type="text" />
            </div>

            <!--<div class="form-item">-->
              <!--<div class="form-item">-->
              <!-- <label class="form-item-control">微信号</label>-->
              <!--<input @input="inputWechat" class="form-item-input" :focus="focus_wechat" placeholder="请输入微信号" type="text" :value="wechat"/>-->
              <!-- <input v-model="wechat"  class="form-item-input" placeholder="" type="text" />-->
              <!--</div>-->
            <!--</div>-->

            <!--<div class="['form-item', (errors[5]===2?'error':'')]" style="display:none;">-->
              <!--<label class="form-item-control">验证码</label>-->
              <!--&lt;!&ndash;<input @input="inputCaptcha" class="form-item-input" data-key="5" maxlength="6" placeholder="请输入验证码" type="text"/>&ndash;&gt;-->
              <!--<input @input="inputCaptcha"  maxlength="6" placeholder="请输入验证码" type="text"/>-->
              <!--&lt;!&ndash;<div @click="getCaptcha" class="captcha" :hidden="!showCountDown">获取验证码</div>&ndash;&gt;-->
              <!--<div class="captcha" :hidden="showCountDown">-->
                <!--{{timeStamp}}s后重试-->
              <!--</div>-->
            <!--</div>-->
            <!--<div class="['form-item', (errors[1]===2?'error':'')]">-->
            <!--
            <div class="form-item">
              <label class="form-item-control">{{groupInfo.group_name}}名称</label>
              <input @input="inputCommunity" class="form-item-input" data-key="1" placeholder="请输入社区名称" type="text"/>
              <input v-model="community_name" class="form-item-input"  placeholder="" type="text"/>
              </div>
            -->
            <!--<div @click="chose_location" class="['form-item', (errors[0]===2?'error':'')]">-->
            <!--<label class="form-item-control">所在位置</label>-->
            <!--<div class="class='form-item-input'">{{region[0]||'选择地址'}}{{region[1]}}{{region[2]}}</div>-->
            <!--<img class="icon-right" src="@/assets/images/rightArrowImg.png"/>-->
            <!--</div>-->
            <!--<div class="['form-item', (errors[6]===2?'error':'')]">-->
            <!--<div class="form-item">-->
              <!--<label class="form-item-control">Address</label>-->
              <!--&lt;!&ndash;<input @input="inputAddress" class="form-item-input" data-key="1" placeholder="请输入详细地址" type="text" :value="addr_detail"/>&ndash;&gt;-->
              <!--<input v-model="addr_detail" class="form-item-input" placeholder="" type="text" />-->
            <!--</div>-->
            <div class="form-item">
              <label class="submit">
                Send
                <button hidden @click="submit"></button>
              </label>
            </div>
          </div>
      </form>
    </div>
    <div class="apply-pass" v-if="member_info.is_head==1">
      <img src="@/assets/images/auditSuccess.png" width="78px" height="72px" />
      <div class="h1">Application Approved</div>
      <div class="p">Congrats! Your application to be a Host is now approved</div>
    </div>
    <div class="apply-pass" v-if="member_info.is_head==3">
      <img src="@/assets/images/auditFail.png" width="78px" height="72px" />
      <div class="h1">Application Rejected</div>
      <div class="p">Sorry, your application to be a Host is rejected</div>
      <div @click="applyAgain" class="link-btn">Register Again</div>
    </div>
    <div class="apply-pass" v-if="member_info.is_head==2||apply_complete">
      <img src="@/assets/images/auditing.png" width="78px" height="72px" />
      <div class="h1">{{$t('host.shenqingshenhezhong')}}</div>
      <div class="p">{{$t('host.dengdaijieguo')}}</div>
      <a class="link-btn" openType="switchTab" href="#/lionfish_comshop/pages/index/index">{{$t('common.fanhuishouye')}}</a>
    </div>
    <!--</div>-->
    <!--<i-new-auth bind:authSuccess="authSuccess" bind:cancel="authModal" :needAuth="needAuth&&showAuthModal" needPosition="false"></i-new-auth>-->

  </div>

</template>

<script >
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
        need_subscript_template:false,

        lou_meng_hao:'',
        road_name:'',
        blk_no:'',
        zip_code:'',
        building:'',
        lon:'',
        lat:''
      }
    },
    watch:{
      zip_code: {
        handler: function(zip_code) {
          console.log(zip_code,'zip_code');

          if("" != zip_code && /^\d{6}$/.test(zip_code)) {
            this.load_address(zip_code);
          }
        },
        immediate: true
      }
    },
    created: function() {
      this.onLoad();
    },
    methods: {
      load_address:function(zipCode){
        var tk = this.$wx.getStorageSync("token");
        var that = this;

        this.$http({
            controller: "index.load_address",
            token: tk,
            zipCode: zipCode
          }).then(e=> {
            console.log(e);
            var data = e;
            console.log(data.results[0]);

            if (data.found >0 ) {
              var result =  data.results[0];

              that.building = result.BUILDING;
              that.blk_no = result.BLK_NO;
              that.road_name = result.ROAD_NAME;
              that.lon = result.LONGITUDE;
              that.lat = result.LATITUDE;

            }

        });
      },
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

          if ("" == r || void 0 === r) {
              this.$wx.showToast({
              title: "Name is not correct",
              icon: "none"
            })
            return false;
          }

          if ("" == c)  {
            this.$wx.showToast({
              title: "Mobile is not correct",
              icon: "none"
            });
              return false;
          }

          if (!/^\d{8}$/.test(c) && !/\d{8}/.test(c))  {
            this.$wx.showToast({
              title: "Mobile is not correct",
              icon: "none"
            });
            return false;
          }

          if ("" == this.zip_code) {
            this.$wx.showToast({
              title: "请输入邮编",
              icon: "none"
            });
            return false;
          }

          if ("" == this.blk_no) {
            this.$wx.showToast({
              title: "请输入大牌号",
              icon: "none"
            });
            return false;
          }


          if ("" == this.road_name) {
            this.$wx.showToast({
              title: "请输入路名",
              icon: "none"
            });
            return false;
          }

          if ("" == this.lou_meng_hao) {
            this.$wx.showToast({
              title: "请输入单元门牌",
              icon: "none"
            });
            return false;
          }


//          if ("" == l || void 0 === l) return this.$wx.showToast({
//            title: "请填写微信号",
//            icon: "none"
//          }), !1;
//          if ("" == s || void 0 === s) return this.$wx.showToast({
//            title: "请填写小区名称",
//            icon: "none"
//          }), !1;
//          if ("省" == a && "市" == n && "区" == i) return this.$wx.showToast({
//            title: "请选择地区",
//            icon: "none"
//          }), !1;
//          if ("" == u || void 0 === u) return this.$wx.showToast({
//            title: "请选择地图位置",
//            icon: "none"
//          }), !1;
//          if ("" == o || void 0 === o) return this.$wx.showToast({
//            title: "address is not correct",
//            icon: "none"
//          }), !1;
          var d = {
            province_name: a,
            city_name: n,
            area_name: i,
            lon_lat: u,
            addr_detail: o,
            community_name: s,
            mobile: c,
            head_name: r,
            zip_code:this.zip_code,
            blk_no:this.blk_no,
            road_name:this.road_name,
            lou_meng_hao:this.lou_meng_hao,
            lon:this.lon,
            lat:this.lat,
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
        e.apply_complete= !0 ;
        e.needAuth= !0;
//        this.$http_post({
//          ...t}).then(t=> {
//               console.log(t);
//            if(0 == t.code ){
//              this.$wx.showToast({
//                title: "提交成功，等待审核",
//                icon: "none",
//                duration: 2000
//              });
//              e.apply_complete= !0 ;
//               e.needAuth= !0;
//            }
//        });

        this.$app.util.request({
          url: "entry/wxapp/user",
          data: t,
          method: "post",
          dataType: "json",
          success: function(t) {
            if(0 == t.code ){
              e.$wx.showToast({
                title: "提交成功，等待审核",
                icon: "none"
              });

              e.apply_complete= !0 ;
              e.needAuth= !0;
            }
          }
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
            title: e + " Application",
            showLogo: false,
            showMore: false,
            showBack: true
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
              console.log(t,"get_user_info");
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

<style scoped>
  .header {
    background: #f75451;
    height: 80px;
    color: #fff;
    font-size: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .form-group {
    padding: 6px 28px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .form-group .form-item {
    width: 320px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #e4e4e4;
    font-size: 15px;
    transition: all 0.3s;
    position: relative;
  }

  .form-group .form-item:last-child {
    border: none;
  }

  .form-group .form-item.error {
    border-color: #f75451;
  }

  .form-group .form-item .form-item-control {
    width: 80px;
    height: 50px;
    display: flex;
    align-items: center;
  }

  .form-group .form-item .form-item-input {
    flex: 1;
    height: 50px;
    line-height: 50px;
  }

  .weui-cell__hd {
    position: relative;
    font-size: 14px;
    text-align: left;
  }

  .weui-pos {
    width: 20px;
    height: 25px;
    background: url(https://mall.shiziyu888.com/dan/Common/image/order_checkout_icon.png) no-repeat;
    background-position: 0px 0;
    background-size: 66px 71px;
  }

  .form-group .form-item .form-item-input .picker {
    height: 50px;
    line-height: 50px;
  }

  .form-group .form-item .captcha {
    color: #666;
    border-left: 2px solid #ddd;
    padding-left: 10px;
    width: 80px;
    height: 100%;
    text-align: center;
  }

  .form-group .form-item .placeholder {
    color: #ccc;
  }

  .form-group .form-item .input-placeholder {
    color: #ccc;
  }

  .form-group .form-item .submit {
    width: 320px;
    height: 47px;
    margin-top: 23px;
    border-radius: 47px;
    font-size: 18px;
    background: #f75451;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .form-group .form-item .submit.disabled {
    background: #dcdcdc;
  }

  .apply-pass {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #fff;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 9;
    margin-top: 50px;
  }

  .apply-pass image {
    width: 78px;
    height: 72px;
    padding-top: 75px;
    margin-bottom: 14px;
  }

  .apply-pass .applyPassImg {
    width: 93px;
    height: 93px;
    font-size: 115px;
    color: #ef994c;
    margin-bottom: 20px;
    margin-top: 53px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .apply-pass .h1 {
    font-size: 16px;
    margin-bottom: 10px;
    color: #555;
  }

  .apply-pass .p {
    font-size: 14px;
    color: #999;
    margin-bottom: 15px;
  }

  .apply-pass .link-btn {
    width: 155px;
    height: 49px;
    border-radius: 10px;
    background: #fb5a50;
    color: #fff;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
  }

  .icon-right {
    position: absolute;
    right: 5px;
    top: 50%;
    width: 9px;
    height: 14px;
    margin-top: -6px;
  }

</style>
