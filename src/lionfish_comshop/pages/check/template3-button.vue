<template>

  <div class="goods-wrapper">
    <div class="logo">
        <img class="logo-img" :src="logo"/>
    </div>

    <div class="wrapper" style="width: 88vw;height: 70vw;margin: 0 auto;text-align: center">
      <swiper :options="swiperOption" class="swiper-container">
        <swiper-slide v-for="(item,index) in goods_image2" :key="index">
          <div v-if="item.urlType == 1">
              <video id="myPlayer" :poster="item.videoMainImgUrl" controls playsInline webkit-playsinline style="width: 88vw;max-height: 70vw" class="content2">
                <source :src="item.imgUrl" type="video/mp4">
                <source :src="item.imgUrl" type="application/x-mpegURL" />
              </video>
          </div>
          <img v-if="item.urlType == 0" style="height: 70vw;max-width: 88vw"
                :src="item.imgUrl"/>
        </swiper-slide>
        <div class="swiper-pagination"  slot="pagination" style="padding-bottom: 0vw;"></div>
      </swiper>
    </div>

    <div v-if="verifyResult" :class="[showWord ? 'check-word-block': 'check-word-none']" id="clickDiv1" @click="turnShow">
        <div style="width: 100%;height: 5vw;">
            <img src="@/assets/images/12template right@3X.png" style="vertical-align:middle;height: 3vw;position: relative;top: 0.4rem"/>&nbsp;
            <lable style="font-size: 3.5vw; font-weight: 1000;vertical-align:middle;font-family: PingFangSC-Semibold;position: relative;top: 0.4rem">成功验证 {{queryCount}} 次</lable>&nbsp;&nbsp;&nbsp;
            <img id="img1" src="@/assets/images/xiala.png" style="vertical-align:middle;height: 2vw;position: relative;top: 0.4rem"/>
        </div>
        <div style="height: 3vw;width: 100%;position: relative;top: 0.6rem">
            <span style="font-size: 3vw;color: #000000;font-family: PingFangSC-Semibold;">动态验证码 / {{code}}</span>
        </div>
        <div style="height: 2vw;width: 100%;margin-top: 0.02rem;position: relative;top: 0.6rem">
            <!--<span style="font-size: 0.25rem;color: #B8BBBE;letter-spacing: 0;font-family: PingFangSC-Semibold;">查询者所在地${address}</span>-->
        </div>
        <div id="clickDiv2" :class="[showWord ? 'check-content-block': 'check-content-none']">
            <div style="width: 75vw;height: 20vw;margin: 0.35rem auto;padding-top: 0.5rem;">
                    <span style="opacity: 0.99;font-family: PingFangSC-Regular;font-size: 2vw;color: #72727F;letter-spacing: 0.0rem;text-align: justify;line-height: 0.4533rem;">
                        以上动态码由NFC标签芯片对内部产生的随机数、计数器值签名运算产生，用于验证标签的真实性。该码每次读取变化，30秒内验证使用有效，超过30秒再次查询会验证失败。请认准NFC315.com域名。
                    </span>
            </div>
        </div>
    </div>

    <div v-if="verifyResult" style="margin: 0.64rem auto;height: 15vw;text-align: center;width: 88vw;background: #fff;box-shadow: 0 2vw 3vw -1vw rgba(222,223,223,0.50);" >
			<table style="width: 88vw; height: 10vw; font-family: PingFangSC-Semibold;font-size: 15px;color: #717379;letter-spacing: 0;line-height: 10vw;margin: 0 auto;">
				<tr>
					<td id="oneDiv1"><div id="oneDiv" :class="[showOne? 'tab-style-block':'tab-style-none']" @click="turnOne">{{tabList[0].name}}</div></td>
					<td id="oneDiv2" v-if="rtpFlag == 0"><div id="twoDiv" :class="[showTwo? 'tab-style-block':'tab-style-none']" @click="turnTwo">{{tabList[1].name}}</div></td>
					<td id="oneDiv3" v-if="monitorFlag == 0"><div id="threeDiv" :class="[showThree? 'tab-style-block':'tab-style-none']" @click="turnThree">{{tabList[2].name}}</div></td>
					<td id="oneDiv4" v-if="newRecFlag == 0"><div id="fourDiv" :class="[showFour? 'tab-style-block':'tab-style-none']" @click="turnFour">{{tabList[3].name}}</div></td>
          <td id="oneDiv5" v-if="companyFlag == 0"><div id="fourDiv" :class="[showFive? 'tab-style-block':'tab-style-none']" @click="turnFive">{{tabList[4].name}}</div></td>
				</tr>
			</table>
		</div>

    <!-- 基础信息 -->
    <div v-if="verifyResult" id="oneDivView" :class="[showOne? 'one-div-block':'one-div-none']">
			<div v-for="(item,index) in goods_attribute" :key="index" style="width: 100%;height: 10vw;margin-top: 10px;border-bottom: 1px solid #000;">
				<div style="height: 100%;width: 40%;float: left;color: #000;font-weight: 600;text-align: left;">
					<span style="line-height: 8vw;font-size: 13px; letter-spacing: 0;">{{item.attributeName}}</span>
				</div>
				<div style="height: 4vw;width: 60%;float: right;color: #000;font-weight: 600;text-align: right;display: table-cell;vertical-align:middle;margin-top: 1.6vw">
					<span style="font-size: 13px;letter-spacing: 0;vertical-align:middle;" v-html="item.attributeValue1"></span>
				</div>
			</div>
      <div style="width: 100%;height: 10vw;margin-top: 10px;border-bottom: 1px solid #000;" v-if="showEcommerceUrl == 1">
				<div style="height: 100%;width: 40%;float: left;color: #000;font-weight: 600;text-align: left;">
					<span style="line-height: 8vw;font-size: 13px; letter-spacing: 0;">再次购买</span>
				</div>
				<div style="height: 4vw;width: 60%;float: right;color: #000;font-weight: 600;text-align: right;display: table-cell;vertical-align:middle;margin-top: 1.5vw">
					<span style="font-size: 13px;letter-spacing: 0;vertical-align:middle;"><a :href="ecommerceUrl" style="color: #66ffff;text-decoration:underline;">点击查看</a></span>
				</div>
			</div>
    </div>

    <!-- 溯源信息 -->
    <div v-if="verifyResult" id="twoDivView" :class="[showTwo? 'two-div-block':'two-div-none']">
			<table style="width: 100%;table-layout:fixed;color: #000">
        <tr v-for="(item,index) in goods_circulate" :key="index">
          <td style="width: 30%;font-family: PingFangSC-Semibold;font-size: 13px;color: #000;letter-spacing: 0;" valign="top" align="center">
              <label style="word-wrap:break-word;">{{item.time}}</label>
          </td>
          <td style="width: 2.5%;font-family: PingFangSC-Semibold;font-size: 20px;color: #000;letter-spacing: 0;border-left: 2px solid #000;" valign="top">
          </td>
          <td style="width: 60%;font-family: PingFangSC-Semibold;font-size: 13px;color: #000;letter-spacing: 0;word-wrap:break-word;" valign="top">
                  {{item.location}}
              <span v-if="item.action == 0"> / 装箱, </span>
              <span v-if="item.action == 1"> / 出库 ,</span>
              <span v-if="item.action == 2"> / 入库 ,</span>
              操作员:  {{item.operator}}
          </td>
        </tr>
      </table>
		</div>


    <!-- 视频监控 -->
    <div v-if="verifyResult" id="threeDivView" :class="[showThree? 'three-div-block':'three-div-none']">
      <div v-for="(item,index) in goods_image" :key="index">
        <div v-if="item.urlType == 3" style="width: 88vw;height: 50vw;background: #F8F9F8;margin: 5vw auto 0rem;background-size: 50% 50%;border-radius: 0.16rem 0.16rem 0 0;">
          <video id="myPlayer" poster="" controls playsInline webkit-playsinline style="width: 88vw;height: 50vw;" class="content2">
            <source :src="item.imgUrl" type="video/mp4">
            <source :src="item.imgUrl" type="application/x-mpegURL" />
          </video>
        </div>
        <div v-if="item.urlType == 3" style="width:  88vw;height: 13vw;background: #FFFFFF;border-radius: 0 0 2vw 2vw;margin: 0 auto 1vw">
          <span style="font-family: PingFangSC-Semibold;font-size: 3vw;color: #252525;letter-spacing: 0;margin-left: 0.6rem;line-height: 13vw;font-weight: 600">{{item.imgDesc}}</span>
        </div>
      </div>
		</div>

    <!-- 新品推荐 -->
		<div v-if="verifyResult" id="fourDivView" :class="[showFour? 'four-div-block':'four-div-none']" >
      <div v-for="(item,index) in goods_image" :key="index">
        <div v-if="item.urlType == 2" style="width: 88vw;height: 60vw;background: #F8F9F8 url() no-repeat 0rem 0rem;margin: 0.4667rem auto 0rem;background-size: 100% 100%;border-radius: 0.2rem 0.2rem 0 0;">
          <img style="height: 60vw; width: 88vw; margin: 0 auto;" :src="item.imgUrl"/>
        </div>
        <div v-if="item.urlType == 2" style="width: 88vw;height: 10vw;background: #FFFFFF;border-radius: 0 0 2vw 2vw;margin: 0 auto 5vw">
          <span style="font-family: PingFangSC-Semibold;font-size: 3vw;color: #252525;letter-spacing: 0;margin-left: 0.6rem;line-height: 10vw">{{item.imgDesc}}</span>
        </div>
      </div>
		</div>

    <!-- 公司资质 -->
		<div v-if="verifyResult" id="fiveDivView" :class="[showFive? 'five-div-block':'five-div-none']" >
      <div v-for="(item,index) in goods_image" :key="index" style="margin-top: 5vw">
        <div v-if="item.urlType == 4" style="width: 88vw;height: 13vw;background: #FFFFFF;border-radius: 0 0 0vw 0vw;margin: 0 auto">
          <span style="font-family: PingFangSC-Semibold;font-size: 3vw;color: #252525;letter-spacing: 0;margin-left: 0.6rem;line-height: 13vw;font-weight: 600">{{item.imgDesc}}</span>
        </div>
        <div v-if="item.urlType == 4" style="width: 88vw;height: auto;background: #F8F9F8 url() no-repeat 0rem 0rem;margin: 0 auto;background-size: 100% 100%;border-radius: 0.2rem 0.2rem 0 0;">
          <img style="height: auto; width: 88vw; margin: 0 auto;" :src="item.imgUrl"/>
        </div>
      </div>
		</div>

    <div v-if="verifyResult" style="width: 88vw;height: 15vw;background: #FFFFFF;box-shadow: 0 -0.053333rem 0.213333rem 0 rgba(222,223,223,0.50);margin: 2vw auto 5vw">
        <!-- <div :class="[showLottery==1 ? 'detail_button_left' : 'detail_button_center']">
            <a style="font-size:3vw;color: #FFFFFF;letter-spacing: 0;width: 100%;line-height: 9vw;" :href="imgLinkUrl">查看详情</a>
        </div> -->
        <div class="detail_button_center">
            <a style="font-size:3vw;color: #FFFFFF;letter-spacing: 0;width: 100%;line-height: 9vw;" :href="imgLinkUrl">查看详情</a>
        </div>
        <!-- <div style="width: 30vw; height: 9vw;box-shadow: 0 0.266667rem 0.533333rem 0 #CBCCCD;border-radius: 4vw;text-align: center;float: left;margin-left: 10vw;margin-top: 3vw;" v-if="showLottery==1">
            <a href="https://beaujolais.nfc315.com/wap/#/lottery"><img src="@/assets/images/choujiang.png" style="height: 100%;"/></a>
        </div> -->
    </div>

    <div v-if="!verifyResult" style="width: 88vw;height: 88vw;margin: 0 auto;background: #fff">
      <div>
        <img id="img1" src="@/assets/check-image/fail@3X.png" style="width: 88vw;height: 88vw;margin: 0 auto"/>
      </div>
    </div>
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
        },
        goods_image: [],
        goods_image2: [],
        goods_attribute: [],
        goods_circulate: [],
        tabList: [],
        showOne: true,
        showTwo: false,
        showThree: false,
        showFour: false,
        showFive: false,
        b0: '',
        checkCode: '',
        companyFlag: 1,
        monitorFlag: 1,
        newRecFlag: 1,
        rtpFlag: 1,
        queryCount: 0,
        verifyResult: true,
        logo: '',
        uid: '',
        nowIp: '',
        needAuth: !1,
        imgLinkUrl: '',
        showLottery: 1, //抽奖0 不显示，1 显示
        showCheckLogin: 0, //验证登录0 不需要，1 需要
        showEcommerceUrl: 0,//再次购买 0不显示，1显示
        ecommerceUrl: '',//电商url
        organizationTel: '',//经销商手机号
        distributorId:'',//经销商id即电商中的团长id
        ecommerceUrlFlag: 0,//0不是第三方链接，1是
        productTypeNr: '',
        openHome: 0, //0否 1是
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
      //this.getDate();
      // this.getCirculate();
      //this.onShow();
      this.getDistributor();
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
        that.checkCode = this.$route.query.chk;
        that.code = that.checkCode.substr(0,14);
        wx.request({
          // 请求地址
          url: 'https://wms.nfc315.com/pmp/api/v1/distributorExtend/getByUid/'+that.code,
          // 请求方式
          method: "get",
          dataType: 'json',
          responseType: 'text',
          // 方法
          success: function(data) {
            console.log(data.data,"123456789111");
            if(data.data == ""){
              that.showCheckLogin = 0;//是否验证登录
              that.showLottery = 0;//抽奖
              that.showEcommerceUrl = 0;//再次购买
              that.ecommerceUrlFlag = 0;//0不是第三方链接,1是
              that.ecommerceUrl = 'https://boruolai.xx315.net/wap/#/';//电商url
              if(that.showCheckLogin == 1){
                that.onShow();
              }else{
                that.getIp();
              }
            }else{
              that.showCheckLogin = data.data.body.showCheckLogin;//是否验证登录
              //that.showCheckLogin = 0;
              that.showLottery = data.data.body.showLottery;//抽奖
              that.showEcommerceUrl = data.data.body.showEcommerceUrl;//再次购买
              that.ecommerceUrl = data.data.body.ecommerceUrl;//电商url
              that.organizationTel = data.data.body.organizationTel;//经销商手机号
              that.ecommerceUrlFlag = data.data.body.ecommerceUrlFlag;//0不是第三方链接,1是
              if(that.showCheckLogin == 1){
                that.onShow();
              }else{
                that.getIp();
              }
              //
            }
          }
        })

      },
      getDate: function(){
        var app = this.$getApp(), wx = this.$wx;
        var that = this;
        that.b0 = this.$route.query.b0;
        that.checkCode = this.$route.query.chk;
        that.code = that.checkCode.slice(14);
        var flag = this.$route.query.flag;
        var url = "";
        if(that.nowIp == ""){
          url = 'https://wms.nfc315.com/pmp/api/v2/nfc315/verify/'+that.b0+'/'+that.checkCode+'/113.45.91.173';
        }else{
          url = 'https://wms.nfc315.com/pmp/api/v2/nfc315/verify/'+that.b0+'/'+that.checkCode+'/'+ that.nowIp;
        }
        wx.request({
          // 请求地址
          url: url,
          // 请求方式
          method: "get",
          dataType: 'json',
          responseType: 'text',
          // 方法
          success: function(data) {
            console.log(data,"123456");
            that.goods = data.data.body;
            that.goods_image =data.data.body.product.productType.productTypeGalleryList;
            for(var i=0;i < that.goods_image.length; i ++){
              //修改替换url中ip为域名
              var url = that.goods_image[i].imgUrl;
              //console.log(url,"123");
              that.goods_image[i].imgUrl = that.replaceIp(url);
              //console.log(that.goods_image[i].imgUrl,"修改后的url");
              if(that.goods_image[i].urlType == 0 || that.goods_image[i].urlType == 1){
                that.goods_image2.push(that.goods_image[i]);
              }
            }
            that.goods_attribute = that.goods.product.attributes;
            that.tabList = that.goods.product.tabs;
            that.openHome = data.data.body.product.productType.openHome;
            that.monitorFlag = data.data.body.product.productType.monitorFlag;
            that.companyFlag = data.data.body.product.productType.companyFlag;
            that.newRecFlag = data.data.body.product.productType.newRecFlag;
            that.rtpFlag = data.data.body.product.productType.rtpFlag;
            that.queryCount = data.data.body.queryCount;
            if(flag == 1){
              that.verifyResult = true;
            }else{
              that.verifyResult = data.data.body.verifyResult;
            }
            //that.verifyResult = true;          
            if(that.openHome == 1 && that.verifyResult && flag != 1){
              wx.navigateTo({
                url: "/home?chk="+that.checkCode+"&b0="+that.b0+"&flag=t3"
              })
            }
            that.logo = that.replaceIp(data.data.body.product.logoImage);
            that.uid = data.data.body.product.uid;
            that.productTypeNr = data.data.body.product.productType.productTypeNr;
            wx.request({
              // 请求地址
              url: 'https://wms.nfc315.com/pmp/api/v1/product/circulate/'+that.uid,
              // 请求方式
              method: "get",
              dataType: 'json',
              responseType: 'text',
              // 方法
              success: function(data) {
                that.goods_circulate = data.data.body;
              }
            })
            that.getLionfishHeadInfo();
            if(that.ecommerceUrlFlag == 0){
              that.getBuyUrl();
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
    text-align: center;
  }

  .logo-img{
    height: 8vw;
    margin-top: 5vw;
  }

  swiper {
    height: 300px;
  }

  swiper img {
    width: 100%;
    height: auto;
  }

  .check-word-none{
    width: 88vw;
    margin: 0vw auto 2vw;
    background: #fff;
    height: 14vw;
    text-align:center;
    box-shadow: 0 2vw 3vw 0 rgba(213,215,216,0.50);
  }

  .check-word-block{
    width: 88vw;
    margin: 0vw auto 2vw;
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
