<template>
  <div>
    <div class="edit-info">
      <form @submit.prevent="formSubmit">
        <div class="main">
          <div class="li">
            <span class="left">提现金额</span>
            <div class="right">
              <input @click="bindTixianMoneyInput" :max="commission_info.money" min="0" name="tixian_money" placeholder="请输入提现金额" placeholderStyle="color:#999999" type="digit" :value="tixian_money"></input>
            </div>
          </div>
          <div class="li-tip">
            <div class="left">最多可提现{{commission_info.money}}新币，最小提现{{community_min_money}}新币</div>
            <div @click="getAll" class="get-all">全部提现</div>
          </div>
          <div class="li">
            <span class="left" style="width:200px;">提现手续费为：{{community_tixian_fee}}% ({{sxfee}}新币)</span>
          </div>
          <div class="li">
            <span class="left" style="width:200px;">最终到账金额：{{final_money}}新币</span>
          </div>
          <div class="type-wrap">
            <!--<radio-group bindchange="radioChange" class="radio-group">-->
              <!--<label class="radio" wx:if="{{item.show}}" wx:for="{{items}}" wx:key="id">-->
                <!--<radio checked="{{item.checked}}" value="{{item.name}}"></radio>-->
                <!--<span>{{item.value}}</span>-->
              <!--</label>-->
            <!--</radio-group>-->
            <van-radio-group v-model="payType" direction="horizontal">
              <van-radio :name="item.name" v-if="item.show" v-for="(item,index) in items" :key="item.id">{{item.value}}</van-radio>
            </van-radio-group>
            <div class="form-box" v-if="payType==2">
              <div class="form-group">
                <label>微信真实姓名：<input class="form-ipt" name="bankusername" type="text" :value="community_info.last_weixin_realname"></input>
                </label>
              </div>
            </div>
            <div class="form-box" v-if="payType==3">
              <div class="form-group" v-if="payType!=2">
                <label>Paynow账号：<input class="form-ipt" name="bankaccount" type="text" :value="community_info.last_alipay_account"></input>
                </label>
              </div>
              <div class="form-group">
                <label>姓名：<input class="form-ipt" name="bankusername" type="text" :value="community_info.last_alipay_name"></input>
                </label>
              </div>
            </div>
            <div class="form-box" v-if="payType==4">
              <div class="form-group">
                <label>开户银行：<input class="form-ipt" name="bankname" type="text" :value="community_info.last_bank_bankname"></input>
                </label>
              </div>
              <div class="form-group">
                <label>开户名：<input class="form-ipt" name="bankusername" type="text" :value="community_info.last_bank_name"></input>
                </label>
              </div>
              <div class="form-group" v-if="payType!=2">
                <label>账号：<input class="form-ipt" name="bankaccount" type="text" :value="community_info.last_bank_account"></input>
                </label>
              </div>
            </div>
          </div>
        </div>
        <button class="btn-submit" formType="submit" >确认提现</button>
      </form>
      <div class="desc" v-if="hasTixianPublish">
        <div class="h2">提现规则：</div>
        <div class="wxParse">
          <!--<parser html="{{head_commiss_tixian_publish}}"></parser>-->
          <p v-html="head_commiss_tixian_publish"></p>
        </div>
      </div>
    </div>
    <!--<i-sub-notice :templateId="need_subscript_template" :visible="is_need_subscript==1"></i-sub-notice>-->

  </div>

</template>

<script>
  var _extends = Object.assign || function(e) {
      for (var i = 1; i < arguments.length; i++) {
        var n = arguments[i];
        for (var t in n) Object.prototype.hasOwnProperty.call(n, t) && (e[t] = n[t]);
      }
      return e;
    };
  /**
   * 获取表单内容
   * @param {*} form
   */
  export const getFormData = form => {
    const res = {}; //存放结果的对象

    for(let i=0; i<form.elements.length; i++){

      let current = form.elements[i];

      //disabled表示字段禁用，需要区分与readonly的区别
      if(current.disabled) continue;

      switch(current.type){

        //可忽略控件处理
        case "file":    //文件输入类型
        case "submit":  //提交按钮
        case "button":  //一般按钮
        case "image":   //图像形式的提交按钮
        case "reset":   //重置按钮
        case undefined: //未定义
          break;

        //select控件
        case "select-one":
        case "select-multiple":
          if(current.name && current.name.length){
            console.log(current)
            for(let k=0; k<current.options.length; k++){
              let option = current.options[k];
              let optionValue = "";
              if(option.selected){
                if(option.hasAttribute){
                  optionValue = option.hasAttribute('value') ? option.value : option.text
                }else{
                  //低版本IE需要使用特性 的specified属性，检测是否已规定某个属性
                  optionValue = option.attributes('value').specified ? option.value : option.text;
                }
                // res[encodeURIComponent(current.name)] = encodeURIComponent(optionValue);
                res[encodeURIComponent(current.name)] = optionValue;
              }
            }
          }
          break;

        //单选，复选框
        case "radio":
        case "checkbox":
          //这里有个取巧 的写法，这里的判断是跟下面的default相互对应。
          //如果放在其他地方，则需要额外的判断取值
          if(!current.checked) break;

        default:
          //一般表单控件处理
          if(current.name && current.name.length){
            // res[encodeURIComponent(current.name)] = encodeURIComponent(current.value);
            res[encodeURIComponent(current.name)] = current.value;
          }
          break;
      }
    }
    return res;
  }
  import GlobalMixin from '../../mixin/globalMixin.js';
  import status from '../../utils/index.js'
  import util from '../../utils/index.js'
  export default {
    mixins: [GlobalMixin],
    name:'groupcenter-editInfo',
    data() {
      return {
        tixian_money: "",
        final_money: 0,
        sxfee: 0,
        payType: 1,
        items: [ {
          name: "1",
          value: "余额",
          show: !0,
          checked: !1
        }, {
          name: "2",
          value: "微信零钱",
          show: !0,
          checked: !1
        }, {
          name: "3",
          value: "Paynow",
          show: !0,
          checked: !1
        }, {
          name: "4",
          value: "银行卡",
          show: !0,
          checked: !1
        } ],
        canTixian: !0,
        commission_info:{},
        head_commiss_tixian_publish: '',
        member_info: {},
        community_info: {},
        commission_info: {},
        community_tixian_fee: 0,
        community_min_money: 0,
        hasTixianPublish: 0,
        is_need_subscript: 0,
        need_subscript_template: 0

      }
    },
    created: function() {
      this.onLoad();
    },
    methods: {
      onLoad: function() {
        var i = this.$wx.getStorageSync("token"), _ = this;
        this.$http({
            controller: "community.get_community_info",
            token: i
          }).then(e=> {
              console.log(e,"get_community_info");

            if (0 == e.code) {
              var i = e, n = _.items, t = i.community_info;
              0 == t.head_commiss_tixianway_yuer && (n[0].show = !1), 0 == t.head_commiss_tixianway_weixin && (n[1].show = !1),
              0 == t.head_commiss_tixianway_alipay && (n[2].show = !1), 0 == t.head_commiss_tixianway_bank && (n[3].show = !1);
              for (var a = _.payType, o = 0; o < n.length; o++) if (n[o].show) {
                n[o].checked = !0, a = n[o].name;
                break;
              }
              var s = i.head_commiss_tixian_publish, m = "" != s, c = e, r = c.is_need_subscript, u = c.need_subscript_template;

                _.head_commiss_tixian_publish= s;
                _.member_info= i.member_info;
                _.community_info= i.community_info;
                _.commission_info= i.commission_info;
                _.community_tixian_fee= i.community_tixian_fee;
                _.community_min_money= i.community_min_money;
                _.items= n;
                _.payType= a;
                _.hasTixianPublish= m;
                _.is_need_subscript= r;
                _.need_subscript_template= u;
                _.$forceUpdate();
            } else {
              this.$wx.redirectTo({
                url: "/lionfish_comshop/pages/user/me"
              });
            }
        });
      },
      bindTixianMoneyInput: function() {
        var i = this.commission_info.money;
//        var n = e.detail.value;
        var n = this.tixian_money;
        i < n && this.$wx.showToast({
          title: "本次最大可提现" + i + "元",
          icon: "none"
        });
        var t = (n * (100 - this.community_tixian_fee) / 100).toFixed(2), a = (n - t).toFixed(2);

          this.tixian_money= n,
          this.final_money= t,
          this.sxfee= a;
      },
      getAll: function() {
        var e = this.commission_info.money, i = (e * (100 - this.community_tixian_fee) / 100).toFixed(2), n = (e - i).toFixed(2);

          this.tixian_money= e,
          this.final_money= i,
          this.sxfee=n;
      },
      formSubmit: function(e) {

//        var i = e.detail.value;
        var i = getFormData(e.target);
        var n = 0, t = this.payType, a = [ {}, {}, {
          bankusername: "微信真实姓名"
        }, {
          bankusername: "Paynow真实姓名",
          bankaccount: "Paynow账户"
        }, {
          bankname: "银行卡名称",
          bankusername: "持卡人姓名",
          bankaccount: "银行卡账户"
        } ];

        for (var o in i) {
          if (i[o] = i[o].replace(/(^\s*)|(\s*$)/g, ""), !i[o]) {
            var s = a[t][o];
            this.$wx.showToast({
              title: "请输入" + (s || "正确的表单内容"),
              icon: "none"
            }), n = 1;
            break;
          }
          if ("money" == o && 1 * i[o] <= 0) {
            this.$wx.showToast({
              title: "请输入正确的金额",
              icon: "none"
            });
            return ;
          }
        }
        console.log(n);
        if ( 1 == n)  return;

          i.payType = t;
          console.log(i);
          var m = this, c = parseFloat(m.tixian_money), r = m.commission_info.money, u = parseFloat(m.community_min_money);
          if ("" == c || c < u) {
            this.$wx.showToast({
              title: "最小提现" + u + "元",
              icon: "none"
            });
            return false;
          }

          if (r < c) {
            this.$wx.showToast({
              title: "本次最大可提现" + r + "元",
              icon: "none"
            });
            var _ = (r * (100 - m.community_tixian_fee) / 100).toFixed(2), h = (r - _).toFixed(2);

            this.tixian_money= r,
            this.final_money= _,
            this.sxfee= h;

            return  !1;
          }
          if (!this.canTixian) return;

            this.canTixian = !1;
            var d = this.$wx.getStorageSync("token"), l = this;
            this.$wx.showLoading();
            var data = _extends({
              controller: "community.tixian_community_info",
              token: d
            });
            debugger
            this.$http({
                controller: "community.tixian_community_info",
                token: d
            }).then(e=> {
                console.log(e,"tixian_community_info");
                if(0 == e.code){
                  this.$wx.showToast({
                    title: "提现成功，等待审核",
                    icon: "none",
                    duration: 2e3,
                    mask: !0,
                    success: function() {
                      this.$wx.redirectTo({
                        url: "/lionfish_comshop/pages/groupCenter/cashList"
                      });
                    }
                  })
                }else{
                  this.$wx.showToast({
                    title: "提现失败",
                    icon: "none",
                    duration: 2e3,
                    mask: !0
                  })
                }
                setTimeout(function() {
                  l.canTixian = !0;
                }, 500);

            });
      },
      radioChange: function(e) {

          this.payType= e.detail.value;
      }
    }
  }
</script>
<style>
  @import "editInfo.less";
</style>
