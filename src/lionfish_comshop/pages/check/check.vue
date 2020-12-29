<template>

  <div class="goods-wrapper">
  </div>

</template>
<script>

  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import GlobalMixin from '../../mixin/globalMixin.js'
  import util from '../../utils'
  import status from '../../utils'
  //  require("swiper/dist/css/swiper.css");

  export default {
    mixins: [GlobalMixin],
    swiper: [swiper],
    swiperSlide: [swiperSlide],
    name: 'template2-button',
    data() {
      return {

        showWord: false,
        swiperOption:{
            //显示分页
            pagination: {
              el: '.swiper-pagination',
              clickable:true
            },
            //设置点击箭头
            // navigation: {
            //   nextEl: '.swiper-button-next',
            //   prevEl: '.swiper-button-prev'
            // },
            //自动轮播
            autoplay: true,
            //手动滑动后，自动轮播停止
            autoplayDisableOnInteraction: true,
            //开启循环模式
            loop: false
        }
      }
    },
    created: function() {
      this.$wx.setNavigationBarTitle({
        title: 'check',
        showTitle: false,
        showLogo: false,
        showMore: false,
        showBack: false
      });
      //this.getIp();
      // var app = this.$getApp(), wx = this.$wx;
      // var e = wx.getStorageSync("token");
      // console.log(e,"token");
      this.getDate();
      // this.getCirculate();
      //this.onShow();
      //this.getDistributor();
      //this.isAndroid();
    },
    methods: {
       onShow: function() {
        const wx = this.$wx, app = this.$getApp()
        const s = this
        util.check_login_new().then(function(t) {
          console.log(t)
          if (t) {//登录状态
            console.log("已登录");
            s.getIp();
          } else {//未登录
            console.log("22222");
            wx.navigateTo({
              url: "/login"
            })
          }
        })

      },
      isAndroid: function(){
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);//ios终端
        // alert('是否是Android：'+isAndroid);
        // alert('是否是iOS：'+isiOS);
      },
      turnShow: function(){
        var that = this;
        if(that.showWord){
          that.showWord = false;
        }else{
          that.showWord = true;
        }
      },
      getIp: function(){
        var that = this;
        var app = this.$getApp(), wx = this.$wx;
        this.$http({
            controller: "index.get_client_ip"
          }).then(e=> {
            console.log(e,"liuwantao");
            that.nowIp = e.data;
            that.getDate();
        });
      },
      getDistributor: function(){
        var app = this.$getApp(), wx = this.$wx;
        var that = this;
        // that.checkCode = this.$route.query.chk;
        // that.code = that.checkCode.substr(0,14);
        wx.request({
          // 请求地址
          url: 'http://aofeiwulian.nfc315.com/wxapp.php?i=3&t=0&v=12.4.0&from=wxapp&c=entry&a=wxapp&do=index&m=lionfish_comshop&sign=60dcd9b5925c119972907bbf22255441&controller=nfcServer.get_verify_result&ip=113.45.55.23&a0=2&chk=53D61D33002DC02866E523F5C7D30AD9B8',
          // 请求方式
          method: "get",
          dataType: 'json',
          responseType: 'text',
          // 方法
          success: function(data) {
            console.log(data.data,"123456789111");
            // if(data.data == ""){
            //   that.showCheckLogin = 0;//是否验证登录
            //   that.showLottery = 0;//抽奖
            //   that.showEcommerceUrl = 0;//再次购买
            //   that.ecommerceUrlFlag = 0;//0不是第三方链接,1是
            //   that.ecommerceUrl = 'https://boruolai.xx315.net/wap/#/';//电商url
            //   if(that.showCheckLogin == 1){
            //     that.onShow();
            //   }else{
            //     that.getIp();
            //   }
            // }else{
            //   that.showCheckLogin = data.data.body.showCheckLogin;//是否验证登录
            //   //that.showCheckLogin = 0;
            //   that.showLottery = data.data.body.showLottery;//抽奖
            //   that.showEcommerceUrl = data.data.body.showEcommerceUrl;//再次购买
            //   that.ecommerceUrl = data.data.body.ecommerceUrl;//电商url
            //   that.organizationTel = data.data.body.organizationTel;//经销商手机号
            //   that.ecommerceUrlFlag = data.data.body.ecommerceUrlFlag;//0不是第三方链接,1是
            //   if(that.showCheckLogin == 1){
            //     that.onShow();
            //   }else{
            //     that.getIp();
            //   }
            //   //
            // }
          }
        })

      },
      getDate: function(){
        var app = this.$getApp(), wx = this.$wx;
        var that = this; 
        //that.checkCode = this.$route.query.chk;
        const goodsId = this.$route.query.a0
        const checkCode = this.$route.query.chk;
        //that.code = that.checkCode.substr(0,14);
        wx.request({
          // 请求地址
          url: 'https://aofeiwulian.nfc315.com/wxapp.php?i=3&t=0&v=12.4.0&from=wxapp&c=entry&a=wxapp&do=index&m=lionfish_comshop&sign=60dcd9b5925c119972907bbf22255441&controller=goods.get_goods_verify_template&id='+goodsId,
          // 请求方式
          method: "get",
          dataType: 'json',
          responseType: 'text',
          // 方法
          success: function(data) {
            console.log(data,"12345678");
            // var gd_info = data.data.gd_info;
            // var goodsId = gd_info.id;
            if(data.data.code == 1){
              wx.navigateTo({
                url: "/nt3?a0="+goodsId+"&chk="+checkCode
              })
            }
            if(data.data.data[0].template_name.indexOf("模板一") != -1){
              wx.navigateTo({
                url: "/nt1?a0="+goodsId+"&chk="+checkCode
              })
            }else{
              wx.navigateTo({
                url: "/nt3?a0="+goodsId+"&chk="+checkCode
              })
            }
          }
        })  
        
      },
      replaceIp: function(url){
        var index = url.indexOf("/userfiles");
        //console.log(url.substring(26,url.length),"位置");
        var ipName = "https://wms.nfc315.com";
        return ipName + url.substring(index,url.length);
      },
      getBuyUrl: function(){
        var that = this;
        console.log("123");
        this.$http({
          controller : 'index.get_goods_detail_url',
          phone: this.organizationTel,
          codes: this.productTypeNr
        }).then(response => {
          console.log(response,"url123456");
          that.ecommerceUrl = response.url;
        });
      },
      // getCirculate: function(){
      //   var app = this.$getApp(), wx = this.$wx;
      //   var that = this;
      //   wx.request({
      //     // 请求地址
      //     url: 'https://wms.nfc315.com:8068/pmp/api/v1/product/circulate/'+that.uid,
      //     // 请求方式
      //     method: "get",
      //     dataType: 'json',
      //     responseType: 'text',
      //     // 方法
      //     success: function(data) {
      //       that.goods_circulate = data.data.body;
      //     }
      //   })
      // },
      turnOne: function(){
        var that = this;
        that.showOne = true;
        that.showTwo = false;
        that.showThree = false;
        that.showFour = false;
        that.showFive = false;
      },
      turnTwo: function(){
        var that = this;
        that.showOne = false;
        that.showTwo = true;
        that.showThree = false;
        that.showFour = false;
        that.showFive = false;
      },
      turnThree: function(){
        var that = this;
        that.showOne = false;
        that.showTwo = false;
        that.showThree = true;
        that.showFour = false;
        that.showFive = false;
      },
      turnFour: function(){
        var that = this;
        that.showOne = false;
        that.showTwo = false;
        that.showThree = false;
        that.showFour = true;
        that.showFive = false;
      },
      turnFive: function(){
        var that = this;
        that.showOne = false;
        that.showTwo = false;
        that.showThree = false;
        that.showFour = false;
        that.showFive = true;
      },
      turnToReport: function(){

      },
      //获取电商团长信息
      getLionfishHeadInfo: function(){
        var that =this;
        var distributorId = this.$wx.getStorageSync('distributorId');
        if (distributorId != ''){
          that.updateHeadMemberRel();
        }else {
          if(this.organizationTel != ''){
            this.$http({
              controller : 'index.get_community_head',
              phone: this.organizationTel
            }).then(response => {
              console.log(response,"get_community_head");
              if (response && response.id){
                that.distributorId = response.id;
                that.$wx.setStorageSync('distributorId',that.distributorId);
                that.updateHeadMemberRel();
              }

            });
          }
        }

      },
      //设置团长与会员关系
      updateHeadMemberRel: function(){
        var that =this;
        var token = this.$wx.getStorageSync('token');
        var distributorId = this.$wx.getStorageSync('distributorId');
        if(distributorId != ''){
          this.$http({
            controller : 'index.update_member_community',
            token:token,
            head_id: distributorId
          }).then(response => {
            console.log(response,"update_member_community");
          });
        }

      },
    }
  }
</script>
<style scoped>
  @import "../../../@feiying/8.less";

  page {
    background: #f6f6f6;
  }

  .wrapper >>> .swiper-pagination-bullet-active{
    background: #e95d2e
  }


  .goods-wrapper {
    position: relative;
    background: #fff;
  }

 .logo{
    background: #fff;
    width: 100%;
    height: 20vw;
    text-align: left;

  }

  .logo-img{
    height: 10vw;
    margin-top: 0vw;
    margin-left: 7vw;
  }

  swiper {
    height: 300px;
  }

  swiper img {
    width: 100%;
    height: auto;
  }

  .check-word-none{
    width: 80vw;
    margin: 2vw auto 2vw;
    background: #fff;
    height: 14vw;
    text-align:center;
    box-shadow: 0 2vw 3vw 0 rgba(213,215,216,0.50);
  }

  .check-word-block{
    width: 80vw;
    margin: 2vw auto 2vw;
    background: #fff;
    height: 38vw;
    text-align:center;
    box-shadow: 0 2vw 3vw 0 rgba(213,215,216,0.50);
  }

  .check-content-block{
    background-color: #F8F8F9;
    border-radius: 6px;
    border-radius: 6px;
    width: 88vw;
    height: 20vw;
    float: left;
    margin: 5vw auto;
    display: block
  }

  .check-content-none{
    background-color: #F8F8F9;
    border-radius: 6px;
    border-radius: 6px;
    width: 88vw;
    height: 25vw;
    float: left;
    margin: 5vw auto;
    display: none
  }

  .tab-style-block{
    border-bottom: 2px solid #000;
    padding-bottom: 0.08rem;
    width:fit-content;
    margin: 0 auto;
    color: #000;
    font-weight: 600;
  }

  .tab-style-none{
    padding-bottom: 0.08rem;
    width:fit-content;
    margin: 0 auto;
  }

  .one-div-block{
    width: 88vw;
    height: auto;
    margin: 0vw auto;
    font-size: 0.25rem;
    background-color: white;
    padding-bottom: 5vw;
    display: block
  }

  .one-div-none{
    width: 88vw;
    height: auto;
    margin: 0vw auto;
    font-size: 0.25rem;
    background-color: white;
    padding-bottom: 5vw;
    display: none
  }

  .two-div-block{
    width:88vw;
    height: auto;
    margin: 0 auto;
    display: block;
    background: #fff;
    min-height: 40vw
  }

  .two-div-none{
    width:88vw;
    height: auto;
    margin: 0 auto;
    display: none;
    background: #fff;
    min-height: 40vw
  }

  .three-div-block{
    width:  88vw;height: auto;
    display: block;
    background: #F5F5F5;
    margin: 0 auto;
  }

  .three-div-none{
    width:  88vw;height: auto;
    display: none;
    background: #F5F5F5;
    margin: 0 auto;
  }

  .four-div-block{
    width:  88vw;
    height: auto;
    display: block;
    background: #F5F5F5;
    margin: 0 auto;
  }

  .four-div-none{
    width:  88vw;
    height: auto;
    display: none;
    background: #F5F5F5;
    margin: 0 auto;
  }

  .five-div-block{
    width:  88vw;
    height: auto;
    display: block;
    background: #F5F5F5;
    margin: 0 auto;
  }

  .five-div-none{
    width:  88vw;
    height: auto;
    display: none;
    background: #F5F5F5;
    margin: 0 auto;
  }

  .detail_button_center{
    width: 30vw;
    height: 9vw;
    background: #292929;
    box-shadow: 0 0.266667rem 0.533333rem 0 #CBCCCD;
    border-radius: 4vw;
    text-align: center;
    float: left;
    margin-left: 29vw;
    margin-top: 3vw
  }

  .detail_button_left{
    width: 30vw;
    height: 9vw;
    background: #292929;
    box-shadow: 0 0.266667rem 0.533333rem 0 #CBCCCD;
    border-radius: 4vw;
    text-align: center;
    float: left;
    margin-left: 9vw;
    margin-top: 3vw
  }

</style>
