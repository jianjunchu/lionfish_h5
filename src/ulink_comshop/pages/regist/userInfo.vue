<template>
  <div class="login-container">
    <div class="top">
        <div style="width: 70%;float:left;line-height: 50px;font-size: 18px;font-weight: 600">&nbsp;&nbsp;&nbsp;Complete your profile</div>
        <!-- <div style="width: 20%;float:right;line-height: 50px;text-align: center;color: blue;font-weight: 400" @click="turnToLogin">Skip</div> -->
    </div>
    <el-form ref="loginForm" :model="loginForm" :rules="rules" class="login-form" auto-complete="on" label-position="left">
      <div class="title-container">
        <img :src="this.logoImg" style="width: 100px;height: 100px">
      </div><br><br>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="User Name"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>
      <el-form-item prop="email">
        <span class="svg-container">
          <svg-icon icon-class="email" style="color: red" />
        </span>
        <el-input
          ref="password"
          v-model="loginForm.email"
          placeholder="E-Mail"
          name="email"
          type="email"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>



      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          ref="password"
          v-model="loginForm.password"
          placeholder="Password"
          name="password"
          type="password"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item style="background: transparent">
        <el-checkbox v-model="checked" > Yes, I would like to receive newsletters <br>and special offers by email.</el-checkbox>
      </el-form-item>



      <el-button :loading="loading" type="primary" round style="width:100%;margin-bottom:40px;" @click.native.prevent="handleSave">Save</el-button>

      <!-- <div class="tips">
        <span style="margin-right:20px;">username: admin</span>
        <span> password: any</span>
      </div> -->

    </el-form>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    const isEmail = (rule, value, callback) => {
      if (!value) {
        callback();
      } else {
        const reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
        const email = reg.test(value);
        if (!email) {
          callback(new Error("Input error! For example:admin@163.com"));
        } else {
          callback();
        }
      }
    };
    return {
      loginForm: {
        username: '',
        password: '',
        email:''
      },
      checked:true,
      rules: {
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: isEmail, trigger: "blur" }
        ]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      memberId: '',
      phone:'',
      country:'',

	  logoImg:'',
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
	mounted(){
		this.Logo()
	},
  methods: {
	  // 头像
	  Logo(){
		 this.$http({
		   controller : 'index.get_avatar',
		   i: 3,
		   member_id: this.memberId,
		 }).then(response => {
		   console.log(response)
		   this.logoImg = response.url;
		   var result = response;
		   // if(result.code == -2){
		   //   this.$router.push({path: '/login'});
		   // }
		 })
	  },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    turnToLogin: function(){
      this.$router.push({path: '/login'});
    },
    handleSave() {

	    var accept_email = this.checked ? 1:0;

      this.$http({
        controller : 'index.reg_save_user',
        i: 3,
        member_id: this.memberId,
        user: this.loginForm.username,
        email: this.loginForm.email,
        passwd: this.loginForm.password,
        accept_email: accept_email,
        country:this.country,
        phone:this.phone,
        avatar:this.logoImg,
      }).then(response => {
        console.log(response)
        this.$wx.setStorageSync('token', response.token)
//      setToken(response.token);
        var result = response;
			if(response.token!=''){
				 this.$router.push({path: '/ulink_comshop/pages/index/index'});
			}else if(response.token ==''){
				alert("异常，请联系管理员")
			}
        // if(result.code == -2){
        //   this.$router.push({path: '/login'});
        // }
      })
      // console.log(this.loginForm.username+":"+this.memberId);
      // this.$router.push({path: '/login'});
    },
    hideTopAndFooter: function(){
      this.$wx.setNavigationBarTitle({
        title: 'Register',
        showLogo: false,
        showMore: false,
        showBack: true
      })
    }
  },
  created: function(){
      this.hideTopAndFooter();
      this.memberId = this.$route.query.memberId;
      this.country = this.$route.query.country;
      this.phone = this.$route.query.phone;
  }
}
</script>

<style lang="scss">
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

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
.top{
    margin: 0;
    padding: 0;
    height: 50px;
    width: 100%;
}
</style>

<style lang="scss" scoped>
$bg:#fff;
$dark_gray:#889aa4;
$light_gray:rgb(17, 123, 245);

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    max-width: 100%;
    padding: 25px 35px 0;
    min-height: 100%;
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
    text-align: center;
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
}
>>>.el-checkbox__inner{
  margin-bottom: 20px;
}
</style>
