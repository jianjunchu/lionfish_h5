<template>
  <div class="phoneregist">
        <slot name="header">
            <h2>Hzmart Register</h2>
        </slot><br>
        <div class="input_wrapper">
            <div class="inputItem" :class="{'focus':isFocus.phoneNum,'phone_empty':errorFlag.phone_empty,'phone_error':errorFlag.phone_err}">
                <span class="chooseArea" @click="chooseArea()">
                    <!-- <slot name="country_tel">+86</slot> -->
                    <select v-model="cityCode" style="width:60px">
                      <option v-for="(city,index) in options" :key="index" :value="city.value">{{city.name}}</option>
                    </select>
                    <!-- <span>
                      <svg t="1566640213388" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2787" width="18" height="18">
                        <path d="M512 721.5c-4.6 0-9.2-1.8-12.7-5.3l-383.1-383c-7-7-7-18.4 0-25.5s18.4-7 25.5 0L512 678.1l370.3-370.3c7-7 18.4-7 25.5 0 7 7 7 18.4 0 25.5l-383.1 383c-3.5 3.5-8.1 5.2-12.7 5.2z" p-id="2788">
                        </path>
                      </svg>
                    </span> -->
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
        </div>
        <div>
            <button class="registBtn" :disabled="!registFlag" @click="regist()">
                Register
            </button>
        </div>
        <div class="gotoLogin">
            Already hava an account? <a href="javascript:void()" @click="gotoLogin" style="color: blue">Login</a>
        </div>
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
                getCodeBtnText: "获取验证码",
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
            inputPhone(){
                //输入手机号时，keyup事件
                let value = this.input_info.phone.replace(/\D/g, '').substr(0, 11); // 不允许输入非数字字符，超过11位数字截取前11位
                let len = value.length;
                //判空
                let phone_num = this.input_info.phone;
                this.errorFlag.phone_empty = phone_num === "" || phone_num === null || phone_num === undefined;
                //判断手机号格式是否正确
                this.errorFlag.phone_err = !(/^1[3456789]\d\s\d{4}\s\d{4}$/.test(phone_num)) && !this.errorFlag.phone_empty;
                if (len > 3 && len < 8) {
                    value = value.replace(/^(\d{3})/g, '$1 ')
                } else if (len >= 8) {
                    value = value.replace(/^(\d{3})(\d{4})/g, '$1 $2 ')
                    if (len === 11) {
                        if (!(this.errorFlag.phone_empty || this.errorFlag.phone_err) && this.timeOut) {
                            //激活获取验证码按钮
                            this.getCodeDisabled = false;
                        } else {
                            this.getCodeDisabled = true;
                        }
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
                  console.log(response)
                });
                this.registFlag = true;
                this.timeOut = false;
                //倒计时
                if (!this.errorFlag.phone_err && !this.errorFlag.phone_empty){
                    Toast({
                        message: '验证码已发送',
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
                            that.getCodeBtnText = "获取验证码";
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
                if(result.code == 0){
                  this.$router.push({path: '/userInfo?memberId='+result.member_id});
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
  $mainColor: #007cdc;
    .gradient{
        background-image: linear-gradient(to right,$mainColor,lighten($mainColor,18%));
    }
    .error{
        background: red;
        transform: scaleY(1);
        font-size: .72rem;
        color: red;
        text-align: right;
        line-height: 1.6rem;
    }
    .gotoLogin{
        width: 100%;
        height: 50px;
        text-align: center;
        position: absolute;
        bottom: 0;
        left: 0;
        line-height: 50px;
    }
    .phoneregist{
        width: 80%;
        height: 400px;
        margin: 33% auto;
        text-align: center;
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
            .inputItem{
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                position: relative;
                margin-top: 1.42rem;
                &::after{
                    content: "";
                    position: absolute;
                    height: 1px;
                    width: 100%;
                    bottom: 0;
                    transform: scaleY(.5);
                    background: #bfbfbf;
                }
                .chooseArea{
                    display: flex;
                    align-items: center;
                    span{
                        margin-left: .2rem;
                        margin-top: 7.2%;
                    }
                }
                .inputContent{
                    padding: .4rem;
                    input{
                        font-size: 1.11rem;
                        border: none;
                        outline: none;
                        width: 90%;
                        letter-spacing: .1rem;
                        &::placeholder{
                            color: #aaaaaa;
                        }
                    }
                    #input_code{
                        text-align: center;
                        letter-spacing: .6rem;
                        &::placeholder{
                            letter-spacing: .1rem;
                        }
                    }
                }
                .getCodeBtn{
                    button {
                        letter-spacing: 0;
                        font-size: .72rem;
                        background: white;
                        color: $mainColor;
                        border: .5px $mainColor solid;
                        border-radius: 6px;
                        margin-bottom: .4rem;
                        text-indent: 0;
                        &:active{
                            background: #f1f1f1;
                        }
                        &:disabled{
                            background: tint($mainColor,90%);
                            color: fade($mainColor,40%);
                            border: #f2f2f2;
                        }
                    }
                }
            }
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
