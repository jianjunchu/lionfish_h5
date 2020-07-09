<template>
  <div class="phoneregist">
	   <el-form >
        <slot name="header">
          <!--  <h2 style="text-align: center;">Hzmart Register</h2>-->
           
        </slot><br>
		
		 <div style="width: 100px;height: 100px;margin: 0 auto;margin-top: 30px;margin-bottom: 30px;">
        <img src="../../../assets/images/logo.png" style="width: 100%;height: 100%;" />
        </div>
       <!-- <div class="input_wrapper">
            <div class="inputItem" :class="{'focus':isFocus.phoneNum,'phone_empty':errorFlag.phone_empty}">
                <span class="chooseArea" @click="chooseArea()">
                    <select v-model="cityCode" style="width:60px;border: solid 0px #fff">
                      <option v-for="(city,index) in options" :key="index" :value="city.value">{{city.name}}</option>
                    </select>
                </span>
                <div class="inputContent">
                    <input type="text" @focus="focus('phoneNum')" @blur="blur('phoneNum')" ref="phoneNum" placeholder="Phone" v-model="input_info.phone" @keyup="inputPhone" maxlength="13" autofocus>
                </div>
            </div>
            <div class="inputItem codeInput" :class="{'focus':isFocus.code,'code_empty':errorFlag.code_empty,'code_error':errorFlag.code_err}">
                <div class="inputContent ">
                    <input id="input_code" @focus="focus('code')" @blur="blur('code')" @keyup="activeregist()" ref="code" placeholder="Code" v-model="input_info.code" :maxlength="4">
                </div>
                <div class="getCodeBtn">
                    <button @click="getVerifyCode()" ref="getCode" :disabled="getCodeDisabled">{{getCodeBtnText}}</button>
                </div>
            </div>
        </div> -->
		
		
		
		
		<div style="height: 50px;">
		<div style="width: 100%;height:25px;border-bottom:1px solid #ccc;font-size: 16px;color: #939393;float: left;" @click="click_btn()" v-show="this.isShow">Phone</div>
		<div style="width: 100%;height:41px;border-bottom:1px solid #3D7BD0;font-size: 16px;color: #3D7BD0;float: left;" v-show="this.isShow2">
				 <span> 
		 <el-select v-model="cityCode" placeholder="请选择" style="width:70px;height:30px;float: left;color: #0076FF;border:none">
				<el-option label="65" value="65">+65 Singapore</el-option>
		        <el-option label="60" value="60">+60 Malaysia </el-option>
				<el-option label="62" value="62">+62 Indonesia</el-option>
				<el-option label="86" value="86">+86 China</el-option>
		  </el-select>
		<span style="margin-top: 12220px;">|</span>
		</span>
		<input style="width: 60%;height: 100%;border:none;outline: none;height: 40px;background: none;"    v-model="input_info.phone"  @focus="focus('phoneNum')" @blur="blur('phoneNum')" ref="phoneNum" @keyup="inputPhone" maxlength="13" autofocus/>
		</div>
		</div>
		
		
		<div style="height: 50px;">
		 <div style="width: 100%;height:28px;border-bottom:1px solid #ccc;font-size: 16px;color: #3D7BD0;" >
		 <input style="width: 70%;height: 100%;border:none;outline: none;background: none;" v-model="input_info.code" id="input_code" @focus="focus('code')" @blur="blur('code')" @keyup="activeregist()" ref="code" placeholder="Code"/>
		 <div style="float: right;background: #FDEACA;border-radius: 20px;color: #FDB56D;font-size: 13px;padding:5px;margin-bottom: 10px;" @click="getVerifyCode()" ref="getCode" :disabled="getCodeDisabled">{{getCodeBtnText}}</div>
		 </div>
		 </div>
	
		
		
        <div>
<!--
   <el-button v-show="isShowLogin"  :loading="loading" type="primary" style="height: 40px;width:100%;margin-bottom:30px;border-radius: 20px;background: #FDEACA;border:none;color: #F7AC39;font-weight: 600;margin-top: 50px;" @click.native.prevent="regist">Register</el-button>
-->
            <button class="registBtn" :disabled="!registFlag" @click="regist()" style="background: #F3F8FE;color: #387BFE;border-radius: 5px;font-weight: 600;margin-top: 30px;">
                Register
            </button>


        </div>
        <div class="gotoLogin">
           <span style="color: #959595;"> Already have an account? </span> <a href="javascript:void()" @click="gotoLogin" style="color: blue">Login</a>
        </div>
		<!-- <div class="gotoLogin">
		 <span style="color: #959595;">Don't have an account?</span>  <a href="javascript:void()" @click="gotoRegist" style="color: #568CE2;">Register</a>
		</div> -->
		</el-form>
    </div>
</template>

<script>
 // 按需引入部分组件
    import { Toast } from 'mint-ui';
    import 'mint-ui/lib/style.css'
    export default {
        name: "bm_phone_regist",
        data(){
            return{
				isShow:true,
				isShow2:false,
				isShow3:true,
				isShow4:false,
				aa:'65',
                //用户输入信息
                input_info:{
                    phone:"",
                    code:"",
                },
                visible: true,
                //倒计时
                countDownTime:60,
                timeOut:true,
                timer:null,
                //聚焦（切换样式）
                isFocus:{
                    phoneNum:false,
                    code:false
                },
                //错误信息
                errorFlag:{
                    phone_empty:false,
                    phone_err:false,
                    code_empty:false,
                    code_err:false
                },
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
              cityCode: 65
            }
        },
        watch: {
            //监听显示高度
            showHeight:function() {
                this.hideFooter = this.docmHeight <= this.showHeight;
            }
        },
        props:['baseConfig'],
        mounted() {
            //监听事件
            window.onresize = ()=>{
                return(()=>{
                    this.showHeight = document.documentElement.clientHeight || document.body.clientHeight;
                })()
            },
            this.hideFooter
        },
        methods:{
			click_btn(){
					this.isShow=false,
					this.isShow2=true
			},
			click_btn2(){
					  this.isShow3=false,
					  this.isShow4=true
			},
            inputPhone(){
                //输入手机号时，keyup事件
                let value = this.input_info.phone.replace(/\D/g, '').substr(0, 11); // 不允许输入非数字字符，超过11位数字截取前11位
                let len = value.length;
                //判空
                let phone_num = this.input_info.phone;
                this.errorFlag.phone_empty = phone_num === "" || phone_num === null || phone_num === undefined;
                //判断手机号格式是否正确
                // this.errorFlag.phone_err = !(/^1[3456789]\d\s\d{4}\s\d{4}$/.test(phone_num)) && !this.errorFlag.phone_empty;
                if (len > 3 && len < 8) {
                    value = value.replace(/^(\d{3})/g, '$1 ');
                    if (!this.errorFlag.phone_empty && this.timeOut) {
                        //激活获取验证码按钮
                        this.getCodeDisabled = false;
                    } else {
                        this.getCodeDisabled = true;
                    }
                } else if (len >= 8) {
                    value = value.replace(/^(\d{3})(\d{4})/g, '$1 $2 ')  
                    if (!this.errorFlag.phone_empty && this.timeOut) {
                        //激活获取验证码按钮
                        this.getCodeDisabled = false;
                    } else {
                        this.getCodeDisabled = true;
                    }
                }
                this.input_info.phone = value;
            },
            hideTopAndFooter: function(){
            this.$store.dispatch('app/hideTabbar');
            this.$store.dispatch('app/hideToolbarMore'); 
            this.$store.dispatch('app/hideToolbarBack'); 
            },
            chooseArea(){
                
            },
            gotoLogin: function(){
                this.$router.push({path: '/login'});
            },
            focus(type){
                if (type === "phoneNum"){
                    this.isFocus.phoneNum = true;
                    this.errorFlag.phone_empty = false;
                } if (type === "code"){
                    this.isFocus.code = true;
                    this.errorFlag.code_empty = false;
                }
            },
            blur(type) {
                if (type === "phoneNum") {
                    this.isFocus.phoneNum = false;
                }
                if (type === "code") {
                    this.isFocus.code = false;
                }
            },
            /**************************************************************获取验证码**************************************************************/
            getVerifyCode(){
                let that = this;
                let input_phone = this.input_info.phone.replace(/\s*/g,"");      //去除空格
                var phone = this.cityCode + input_phone;
                this.$http({
                  controller : 'index.send_sms',
                  country: this.cityCode,
                  phone: input_phone,
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
                    Toast({
                        message: 'OTP Send',
                        position: 'middle',
                    });
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
            activeregist(){
                //判空
                let code = this.input_info.code;
                this.errorFlag.code_empty = code === "" || code === null || code === undefined;
            },
            /***************************************************注册****************************************************/

            regist(){
              var code = this.input_info.code;
              var phone = this.input_info.phone;
              if(phone == ""){
                alert("Please Input Phone!");
                return;
              }else if(code == ""){
                alert("Please Input Code!");
                return;
              }
              this.$http({
                controller : 'index.reg_check_sms',
                i: 3,
                code: code
              }).then(response => {
                console.log(response)
                var result = response;
                	var a = this.input_info.phone;
           	      var str   =   a.replace(/\s+/g,""); 
                 	console.log(str);
                if(result.code == 0){
                  this.$router.push({path: '/userInfo?memberId='+result.member_id+'&country='+this.cityCode+'&phone='+str});
                } else if(result.code == -1){
									alert(" code parameter not")
								}else if(result.code == -2){
									alert("timeout")
								}else if(result.code == -3){
									alert("code verify fails")
								}
              })
            }
        },
        beforeDestroy(){
            clearInterval(this.timer);
            this.timer = null;
        },
    }
</script>

<style lang="scss">
	input::-webkit-input-placeholder{
	       font-size: 20px;
	}
  $mainColor: #007cdc;
  
  body{
  	background: #fff;
  }
    
    .gotoLogin{
		font-size: 18px;
		text-align: center;
        // width: 100%;
        // height: 50px;
        // text-align: center;
        position: absolute;
		margin-top: 200px;
		margin-left: 17px;
        // bottom: 0;
        // left: 0;
        // line-height: 50px;
    }
    .phoneregist{
        width: 80%;
        height: 400px;
        // margin: 33% auto;
		margin-left: 10%;
        // text-align: center;
        h2{
            color: #2370e2;
            font-size: 1.8rem;
            margin-top: 150px;
            font-weight: 800;
        }
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
        //用户名、密码输入框
        .input_wrapper{
          
            /*.codeInput{*/
            /*    display: inline;*/
            /*}*/
            .focus::after{
                background: $mainColor;
            }
            .phone_empty::after{
                content: '手机号不能为空';
            }
            .phone_error::after{
                content: '请填入正确的手机号';
            }
            .code_empty::after{
                content: '验证码不能为空';
            }
            .code_error::after{
                content: '验证码错误';
            }
        }
        //注册按钮
        button{
            // .gradient;
            border: none;
            outline: none;
            position: relative;
            color: #2370e2;
            border-radius: 1.2rem;
            padding-top: .42rem;
            padding-bottom: .42rem;
            margin-top: 10%;
            font-size: 1.111rem;
            overflow: hidden;
            letter-spacing: .2rem;
            text-indent: .6rem;
            text-align: center;
        }
        .registBtn {
            width: 100%;
            height: 50px;
            background: #f2f2f2;
        }
        .opt_button{
            cursor: pointer;
            &::after{
                content: "";
                background: #fff;
                display: block;
                position: absolute;
                width: 200%;
                height: 200%;
                top: -5%;
                border-radius: 50px;
                margin-left: -80%;
                opacity: 0;
                transition: all 0.75s ease-in-out;
            }
            &:active::after {
                width: 0;
                opacity: 0.6;
                transition: 0s;
            }
        }
        .forbidden{
            background: tint($mainColor,70%);
            color: fade(white,80%);
        }
        .tips{
            font-size: .8rem;
            margin-top: .4rem;
            text-align: right;
            .changedPhone{
                margin-right: .2rem;
                color: #2986de;
            }
        }
        /*********************第三方注册******************/
        .otherregistWays{
            width: 80%;
            position: fixed;
            bottom: 8.2%;
            left: 10%;
            right: 10%;
            text-align: center;
            .otherWayTextWrapper{
                line-height: 0;
                &:before,&:after{
                    position: absolute;
                    background: #ddd;
                    content: "";
                    height: 1px;
                    width: 30%;
                }
                &:before{
                    left: 0;
                }
                &:after{
                    right: 0;
                }
                .otherWayText{
                    font-size: .8rem;
                    color: #bbbbbb;
                }
            }
            .icons{
                display: flex;
                flex-direction: row;
                justify-content: space-around;
                margin-top: 1.4em;
                img{
                    width: 2rem;
                    height: 2em;
                }
            }
        }
        .protocol{
            position: fixed;
            bottom: 4%;
            left: 2%;
            right: 2%;
            font-size: .72em;
            margin-top: 8%;
            color: #333333;
            span{
                color: #2986de;
            }
        }
    }
    
</style>
