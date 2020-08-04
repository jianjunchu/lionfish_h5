<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <!--<h3 class="title">Hzmart Login</h3>-->
        <div style="width: 100px;height: 100px;margin: 0 auto;margin-bottom: 30px;">
        <img src="../../../assets/images/logo.png" style="width: 100%;height: 100%;" />
        </div>
      </div>


<!--密码登陆-->
   <div v-show="isShowLogin">
	  <div style="height: 50px;">
	  <div style="width: 100%;height:25px;border-bottom:1px solid #ccc;font-size: 16px;color: #939393;float: left;" @click="click_btn()" v-show="this.isShow">Phone</div>
	  <div style="width: 100%;height:41px;border-bottom:1px solid #3D7BD0;font-size: 16px;color: #3D7BD0;float: left;" v-show="this.isShow2">
		 <span>
	   <el-select v-model="aa" placeholder="请选择" style="width:80px;height:30px;float: left;color: #0076FF;float: left;">
		   <el-option label="65" value="65">+65 Singapore</el-option>
	          <el-option label="60" value="60">+60 Malaysia </el-option>
			   <el-option label="62" value="62">+62 Indonesia</el-option>
			    <el-option label="86" value="86">+86 China</el-option>
	    </el-select>
	  <span style="margin-top: 12220px;">|</span>
	  </span>
	  <input style="width: 60%;height: 100%;border:none;outline: none;height: 40px;" v-model="loginForm.username"/>
	  </div>
	  </div>

	  <div style="height: 50px;">
       <div style="width: 100%;height:25px;border-bottom:1px solid #ccc;font-size: 16px;color: #939393;margin-top: 5px;" @click="click_btn2()" v-show="this.isShow3">Password</div>
	   <div style="width: 100%;height:28px;border-bottom:1px solid #3D7BD0;font-size: 16px;color: #3D7BD0;margin-top: 10px;" v-show="this.isShow4">
	   <input type="password" style="width: 90%;height: 100%;border:none;outline: none;" v-model="loginForm.password"/>
	   </div>
	   </div>
    </div>


	   <!--验证码登陆-->
   <div v-show="isShowCode">
   	<div style="height: 50px;">
	  <div style="width: 100%;height:25px;border-bottom:1px solid #ccc;font-size: 16px;color: #939393;float: left;" @click="click_btn3()" v-show="this.isShow5">Phone</div>
	  <div style="width: 100%;height:41px;border-bottom:1px solid #3D7BD0;font-size: 16px;color: #3D7BD0;float: left;" v-show="this.isShow6">
		 <span>
	   <el-select v-model="country" placeholder="请选择" style="width:80px;height:30px;float: left;color: #0076FF;float: left;">
		   <el-option label="65" value="65">+65 Singapore</el-option>
	       <el-option label="60" value="60">+60 Malaysia </el-option>
			   <el-option label="62" value="62">+62 Indonesia</el-option>
			   <el-option label="86" value="86">+86 China</el-option>
	    </el-select>
	  <span style="margin-top: 12220px;">|</span>
	  </span>
	  <input style="width: 60%;height: 100%;border:none;outline: none;height: 40px;" v-model="input_phone"/>
	  </div>
	  </div>


	 	<div style="height: 50px;">
		 <div style="width: 100%;height:28px;border-bottom:1px solid #ccc;font-size: 12px;color: #3D7BD0;" >
		 <input style="width: 70%;height: 100%;border:none;outline: none;background: none;" v-model="logoCode" id="input_code"  @blur="blur('code')" @keyup="activeregist()" ref="code" placeholder="Code"/>
		 <div style="float: right;background: #FDEACA;border-radius: 20px;color: #FDB56D;font-size: 13px;padding:5px;margin-bottom: 10px;" @click="getVerifyCode()" ref="getCode" :disabled="getCodeDisabled">{{getCodeBtnText}}</div>
		 </div>
		 </div>



   </div>

   <p style="color: #0076FF;font-size: 16px;" v-show="isShowLogin" @click="yanzhengma">Login with OTP</p>
   <p style="color: #0076FF;font-size: 16px;" v-show="isShowCode" @click="mima">Login with password</p>


	<!--密码登录按钮-->
   <el-button v-show="isShowLogin"  :loading="loading" type="primary" style="height: 40px;width:100%;margin-bottom:30px;border-radius: 20px;background: #FDEACA;border:none;color: #F7AC39;font-weight: 600;margin-top: 50px;" @click.native.prevent="handleLogin">Login</el-button>


<!--7验证码登陆按钮-->
   <el-button v-show="isShowCode" :loading="loading" type="primary" style="height: 40px;width:100%;margin-bottom:30px;border-radius: 20px;background: #FDEACA;border:none;color: #F7AC39;font-weight: 600;margin-top: 50px;" @click.native.prevent="handleLogin2">Login</el-button>






    </el-form>
    <div class="gotoRegist">
     <span style="color: #959595;">Don't have an account? Click </span>  <a href="javascript:void()" @click="gotoRegist" style="color: #568CE2;">here</a> <span style="color: #959595;"> to Register</span>
    </div>
  </div>
</template>

<script>import { validUsername } from '../../utils/validate'
import GlobalMixin from '../../mixin/globalMixin.js'
import { setToken } from '../../utils/auth.js'

import util from "../../utils"
import	status  from "../../utils"

var	wcache = require("../../utils/wcache.js")
export default {
	name: 'Login',
	data() {
		const validatePassword = (rule, value, callback) => {
			if(value.length < 6) {
				callback(new Error('The password can not be less than 6 digits'))
			} else {
				callback()
			}
		}
		return {
			country:'65',
			input_phone:'',
			logoCode:'',
			isShowLogin: true,
			isShowCode: false,
			loginForm: {
				username: '',
				password: '',
        code:'',
        phone:''
			},
			loginRules: {
				password: [{
					required: true,
					trigger: 'blur',
					validator: validatePassword
				}]
			},
			loading: false,
			passwordType: 'password',
			redirect: undefined,
			isShow: true,
			isShow2: false,
			isShow3: true,
			isShow4: false,
			isShow5: true,
			isShow6: false,
			isShow7: true,
			isShow8: true,
			aa: '65',
			   //错误信息
                errorFlag:{
                    phone_empty:false,
                    phone_err:false,
                    code_empty:false,
                    code_err:false
                },
			  visible: true,
                //倒计时
                countDownTime:60,
                timeOut:true,
                timer:null,
                 // 获取验证码按钮禁用
                getCodeDisabled: true,
                registFlag: true,
                // 获取验证码按钮文字
                getCodeBtnText: "Get OTP",
                //解决安卓输入框将fixed布局顶上的问题
                hideFooter:true,
                docmHeight: document.documentElement.clientHeight || document.body.clientHeight,
                showHeight: document.documentElement.clientHeight || document.body.clientHeight,
                options: [
                    {value: "86", name: "+86 China"},
                    {value: "60", name: "+60 Malaysia"},
                    {value: "62", name: "+62 Indonesia"},
                    {value: "65", name: "+65 Singapore"}
              ],
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
	methods: {
		   /**************************************************************获取验证码**************************************************************/
            getVerifyCode(){
                let that = this;
                let input_phone = this.loginForm.phone.replace(/\s*/g,"");      //去除空格
                if(input_phone == '' || input_phone == undefined || input_phone == null){
                    return false;
                }
                var phone = this.country + input_phone;
                this.$http({
                  controller : 'index.send_sms_login',
                  country: this.country,
                  phone: this.input_phone,
                  i: 3
                }).then(response => {
                  console.log(response,",,,,,")
							  if(response.code ==-1){
								  alert(response.message)
							  }
                });
                this.registFlag = true;
                this.timeOut = false;
                //倒计时
                if (!this.errorFlag.phone_empty){
//                  Toast({
//                      message: 'OTP Send',
//                      position: 'middle',
//                  });
                    this.timer = setInterval(()=>{
                        that.countDownTime--;
                        // that.getCodeBtnText = this.countDownTime + "s后重新获取";
                        that.getCodeBtnText = this.countDownTime + "秒";
                        that.getCodeDisabled = true;
                        if(that.countDownTime <= 0){
                            clearInterval(this.timer);
                            that.countDownTime = 60;
                            that.timeOut = true;
                            that.getCodeDisabled = false;
                            // that.$refs.getCode.removeAttribute("disabled");
                            // that.$refs.getCode.value = "获取验证码";
                            that.getCodeBtnText = "Get OTP";
                        }
                    },1000)
                } else {
                    that.errorFlag.phone_empty = true;
                }
            },
		//验证码
		yanzhengma(){
			this.isShowLogin = false,
			this.isShowCode = true
		},
		//密码登陆
		mima(){
			this.isShowLogin = true,
			this.isShowCode = false
		},
		click_btn() {
			this.isShow = false,
				this.isShow2 = true
		},
		click_btn2() {
			this.isShow3 = false,
				this.isShow4 = true
		},
			click_btn3() {
			this.isShow5 = false,
				this.isShow6 = true
		},
//		click_btn4() {
//			this.isShow7 = false,
//				this.isShow8 = true
//		},
		showPwd() {
			if(this.passwordType === 'password') {
				this.passwordType = ''
			} else {
				this.passwordType = 'password'
			}
//			this.$nextTick(() => {
//				this.$refs.password.focus()
//			})
		},
		//密码登陆
		handleLogin() {
       var i = this;
			if(this.loginForm.username == '') {
				alert("请填写登陆账号")
				return
			} else if(this.loginForm.password == '') {
				alert("请填写密码")
				return
			}
			this.$http({
				controller: 'user.weblogin_do',
				i: 3,
				user: this.loginForm.username,
				passwd: this.loginForm.password
			}).then(response => {
				console.log(response)
				var result = response;
				if(result != null && result.member_id != -1) {
					alert('Login Successful');
					this.$wx.setStorageSync('token', response.token)

          util.getMemberInfo({success:function(e) {
              i.$wx.setStorageSync('userInfo',e.data)
              if(e.data.community){
                  i.$wx.setStorageSync('community',e.data.community)
              }
              i.$router.go(-1)
            },
            error:function() {

            }
          });


				} else {
					alert("Login failed, please try again");
				}
			})
		},
			//验证码登陆
		handleLogin2() {
      var i = this;
			this.$http({
				controller: 'user.otplogin_do',
				i: 3,
//				user: this.loginForm.username,
//				passwd: this.loginForm.password
        country:this.country,
        user:this.input_phone,
        code:this.logoCode
			}).then(response => {
				console.log(response)
				var result = response;
				if(result != null && result.member_id != -1) {
					alert('Login Successful');
          i.$wx.setStorageSync('token', response.token)
          util.getMemberInfo({success:function(e) {
              i.$wx.setStorageSync('userInfo',e.data)
              if(e.data.community){
                i.$wx.setStorageSync('community',e.data.community)
              }
              i.$router.go(-1)
            },
            error:function() {

            }
          });


				} else {
					alert("Login Failed");
				}
			})
		},
		gotoRegist: function() {
			this.$router.push({
				path: '/regist'
			});
		},
		hideTopAndFooter: function() {
			this.$wx.setNavigationBarTitle({
				title: 'Login',
				showLogo: false,
				showMore: false,
				showBack: true
			})
		}
	},
	created: function() {
		this.hideTopAndFooter();
	}
}</script>

<style lang="scss">

	       //弹窗
        .toast {
            position: fixed;
            z-index: 2000;
            left: 50%;
            top:45%;
            transition:all .5s;
            transform: translateX(-50%) translateY(-50%);
            text-align: center;
            border-radius: 5px;
            color:#FFF;
            background: rgba(17, 17, 17, 0.7);
            height: 45px;
            line-height: 45px;
            padding: 0 15px;
            max-width: 150px;
        }
	input::-webkit-input-placeholder {
	font-size: 15px;
}


/* 修复input 背景不协调 和光标变色 */


/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#000;
$cursor: rgba(122, 116, 116, 0.548);
@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
	.login-container .el-input input {
		color: $cursor;
	}
}


/* reset element-ui css */

.login-container {

	.el-input {
		display: inline-block;
		height: 47px;
		width: 85%;
		input {
			background: transparent;
			border: 0px;
			-webkit-appearance: none;
			border-radius: 0px;
			padding: 12px 5px 12px 15px;
			color: $light_gray;
			height: 47px;
			caret-color: $cursor;
			&:-webkit-autofill {
				box-shadow: 0 0 0px 1000px $bg inset !important;
				-webkit-text-fill-color: $cursor !important;
			}
		}
	}
	.gotoRegist {
		width: 100%;
		// height: 50px;
		text-align: center;
		// position: absolute;
		bottom: 0px;
		left: 0;
		margin-top: 70px;
		font-size: 16px;
		// line-height: 50px;
	}
	.el-form-item {
		border: 1px solid rgba(255, 255, 255, 0.1);
		background: rgba(0, 0, 0, 0.1);
		border-radius: 5px;
		color: #454545;
	}
}</style>

<style lang="scss" scoped>$bg:#fff;
$dark_gray:#889aa4;
$light_gray:rgb(17, 123, 245);
.login-container {
	min-height: 94%;
	width: 100%;
	background-color: $bg;
	overflow: hidden;
	.login-form {
		position: relative;
		width: 520px;
		max-width: 100%;
		padding: 100px 35px 0;
		margin: 0 auto;
		overflow: hidden;
	}
	.tips {
		font-size: 14px;
		color: #fff;
		margin-bottom: 10px;
		span {
			&:first-of-type {
				margin-right: 16px;
			}
		}
	}

	.svg-container {
		padding: 6px 5px 6px 15px;
		color: $dark_gray;
		vertical-align: middle;
		width: 30px;
		display: inline-block;
	}
	.title-container {
		position: relative;
		.title {
			font-size: 26px;
			color: $light_gray;
			margin: 0px auto 40px auto;
			text-align: center;
			font-weight: bold;
		}
	}
	.show-pwd {
		position: absolute;
		right: 10px;
		top: 7px;
		font-size: 16px;
		color: $dark_gray;
		cursor: pointer;
		user-select: none;
	}
}</style>
