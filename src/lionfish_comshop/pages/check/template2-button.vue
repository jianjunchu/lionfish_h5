<template>

  <div class="goods-wrapper">
    <div class="logo">
        <img class="logo-img" src="@/assets/images/logo 1.png"/>
    </div>
    
    <div class="wrapper" style="width: 80vw;height: 70vw;margin: 0 auto;">
      <swiper :options="swiperOption">
        <swiper-slide v-for="(item,index) in goods_image2" :key="index">
          <div v-if="item.urlType == 1">
            <img style="height: 60vw; width: 80vw; margin: 0 auto;" :data-idx="index" lazyLoad="true" 
                  :src="item.image" v-if="index!=0"/>
            <div class="video-wrap" v-else>
              <div v-if="fmShow">
                <div class="btn_div centerboth" v-if="item.video==''"></div>
                <div @click="btnPlay" class="btn_div centerboth" v-else>
                  <img src="@/assets/images/play.png"/>
                </div>
                <img :data-idx="index" lazyLoad="true" style="height: 60vw; width: 80vw;margin: 0 auto;"
                      :src="item.image"/>
              </div>
              <video bindended="videEnd" class="swiper-video" v-show="fmShow" id="myVideo" objectFit="contain"
                      :src="goods.video"></video>

            </div>
          </div>
          <img style="height: 70vw; width: 80vw; margin: 0 auto;"
                :src="item.imgUrl" v-else/>
        </swiper-slide>
        <div class="swiper-pagination"  slot="pagination" style="padding-bottom: 0vw;"></div>
      </swiper>
    </div>

    <div v-if="verifyResult" :class="[showWord ? 'check-word-block': 'check-word-none']" id="clickDiv1" @click="turnShow">
        <div style="width: 100%;height: 5vw;">
            <img src="@/assets/images/12template right@3X.png" style="vertical-align:middle;height: 3vw;position: relative;top: 0.4rem"/>&nbsp;
            <lable style="font-size: 3.5vw; font-weight: 1000;vertical-align:middle;font-family: PingFangSC-Semibold;position: relative;top: 0.4rem">成功验证 3 次</lable>&nbsp;&nbsp;&nbsp;
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

    <div v-if="verifyResult" style="margin: 0.64rem auto;height: 15vw;text-align: center;width: 80vw;background: #000000;" >
			<table style="width: 80vw; height: 10vw; font-family: PingFangSC-Semibold;font-size: 3vw;color: #717379;letter-spacing: 0;line-height: 10vw;margin: 0 auto;">
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
			<div v-for="(item,index) in goods_attribute" :key="index" style="width: 100%;height: 10vw;margin-top: 10px;border-bottom: 1px solid white;">
				<div style="height: 100%;width: 40%;float: left;color: #ffffff;font-weight: 600;text-align: left;">
					<span style="line-height: 10vw;font-size: 0.25rem；letter-spacing: 0;">{{item.attributeName}}</span>
				</div>
				<div style="height: 100%;width: 60%;float: right;color: #ffffff;font-weight: 600;text-align: right;">
					<span style="line-height: 10vw;font-size: 0.25rem；letter-spacing: 0;">{{item.attributeValue1}}</span>
				</div>
			</div>
    </div>

    <!-- 溯源信息 -->
    <div v-if="verifyResult" id="twoDivView" :class="[showTwo? 'two-div-block':'two-div-none']">
			<table style="width: 100%;table-layout:fixed;color: #000" 
        <tr v-for="(item,index) in goods_circulate" :key="index">
          <td style="width: 30%;font-family: PingFangSC-Semibold;font-size: 2vw;color: #ffffff;letter-spacing: 0;" valign="top" align="center">
              <label style="word-wrap:break-word;">{{item.time}}</label>
          </td>
          <td style="width: 2.5%;font-family: PingFangSC-Semibold;font-size: 20px;color: #ffffff;letter-spacing: 0;border-left: 2px solid #fff;" valign="top">
          </td>
          <td style="width: 60%;font-family: PingFangSC-Semibold;font-size: 2vw;color: #ffffff;letter-spacing: 0;word-wrap:break-word;" valign="top">
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
      <div v-for="(item,index) in goods_image2" :key="index">
        <div v-if="item.urlType == 3" style="width: 80vw;height: 40vw;background: #F8F9F8;margin: 5vw auto 0rem;background-size: 50% 50%;border-radius: 0.16rem 0.16rem 0 0;">
          <video id="myPlayer" poster="" controls playsInline webkit-playsinline style="width: 80vw;height: 40vw;" class="content2">
            <source :src="item.imgUrl" type="video/mp4">
            <source :src="item.imgUrl" type="application/x-mpegURL" />
          </video>
        </div>
        <div v-if="item.urlType == 3" style="width:  80vw;height: 10vw;background: #FFFFFF;border-radius: 0 0 2vw 2vw;margin: 0 auto 1vw">
          <span style="font-family: PingFangSC-Semibold;font-size: 3vw;color: #252525;letter-spacing: 0;margin-left: 0.6rem;line-height: 10vw">{{item.imgDesc}}</span>
        </div>
      </div>
		</div>

    <!-- 新品推荐 -->
		<div v-if="verifyResult" id="fourDivView" :class="[showFour? 'four-div-block':'four-div-none']" >
      <div v-for="(item,index) in goods_image2" :key="index">
        <div v-if="item.urlType == 2" style="width: 80vw;height: 60vw;background: #F8F9F8 url() no-repeat 0rem 0rem;margin: 0.4667rem auto 0rem;background-size: 100% 100%;border-radius: 0.2rem 0.2rem 0 0;">
          <img style="height: 60vw; width: 80vw; margin: 0 auto;" :src="item.imgUrl"/>
        </div>
        <div v-if="item.urlType == 2" style="width: 80vw;height: 10vw;background: #FFFFFF;border-radius: 0 0 2vw 2vw;margin: 0 auto 5vw">
          <span style="font-family: PingFangSC-Semibold;font-size: 3vw;color: #252525;letter-spacing: 0;margin-left: 0.6rem;line-height: 10vw">{{item.imgDesc}}</span>
        </div>
      </div>
		</div>

    <!-- 公司资质 -->
		<div v-if="verifyResult" id="fiveDivView" :class="[showFive? 'five-div-block':'five-div-none']" >
      <div v-for="(item,index) in goods_image2" :key="index">
        <div v-if="item.urlType == 4" style="width: 80vw;height: 10vw;background: #FFFFFF;border-radius: 0 0 0vw 0vw;margin: 0 auto">
          <span style="font-family: PingFangSC-Semibold;font-size: 3vw;color: #252525;letter-spacing: 0;margin-left: 0.6rem;line-height: 10vw">{{item.imgDesc}}</span>
        </div>
        <div v-if="item.urlType == 4" style="width: 80vw;height: 60vw;background: #F8F9F8 url() no-repeat 0rem 0rem;margin: 0 auto;background-size: 100% 100%;border-radius: 0.2rem 0.2rem 0 0;">
          <img style="height: 60vw; width: 80vw; margin: 0 auto;" :src="item.imgUrl"/>
        </div>
      </div>
		</div>

    <div v-if="verifyResult" style="width: 80vw;height: 15vw;background: #FFFFFF;box-shadow: 0 -0.053333rem 0.213333rem 0 rgba(222,223,223,0.50);margin: 2vw auto 5vw">
        <div style="width: 30vw; height: 9vw;position: relative;background: #292929;box-shadow: 0 0.266667rem 0.533333rem 0 #CBCCCD;border-radius: 4vw;left: 25vw;top: 3vw;text-align: center">
            <a style="font-size:3vw;color: #FFFFFF;letter-spacing: 0;width: 100%;line-height: 9vw;" href="javascript:void(0)" @click="turnToReport">查看详情</a>
        </div>
    </div>

    <div v-if="!verifyResult" style="width: 80vw;height: 80vw;margin: 0 auto;background: #fff">
      <div>
        <img id="img1" src="@/assets/check-image/fail@3X.png" style="width: 80vw;height: 80vw;margin: 0 auto"/>
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
            // autoplay: {
            //   delay: 2000,
            //   //当用户滑动图片后继续自动轮播
            //   disableOnInteraction: false,
            // },
            //开启循环模式
            // loop: true
        },
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
        verifyResult: true
      }
    },
    created: function() {
      this.$wx.setNavigationBarTitle({
        title: 'check',
        showLogo: false,
        showMore: false,
        showBack: false
      })
      this.getDate();
      this.getCirculate();
    },
    methods: {
      turnShow: function(){
        var that = this;
        if(that.showWord){
          that.showWord = false;
        }else{
          that.showWord = true;
        }
      },
      getDate: function(){
        var app = this.$getApp(), wx = this.$wx;
        var that = this;
        that.b0 = this.$route.query.b0;
        that.checkCode = this.$route.query.chk;
        that.code = that.checkCode.slice(14);
        wx.request({
          // 请求地址
          url: 'http://123.206.27.155:8068/pmp/api/v2/nfc315/verify/'+that.b0+'/'+that.checkCode+'/113.45.91.173',
          // 请求方式
          method: "get",
          dataType: 'json',
          responseType: 'text',
          // 方法
          success: function(data) {
            console.log(data.data.body,"liuwantao");
            that.goods = data.data.body;
            that.goods_image2 =data.data.body.product.productType.productTypeGalleryList;
            that.goods_attribute = that.goods.product.attributes;
            that.tabList = that.goods.product.tabs;
            that.monitorFlag = data.data.body.product.productType.monitorFlag;
            that.companyFlag = data.data.body.product.productType.companyFlag;
            that.newRecFlag = data.data.body.product.productType.newRecFlag;
            that.rtpFlag = data.data.body.product.productType.rtpFlag;
            that.queryCount = data.data.body.queryCount;
            that.verifyResult = data.data.body.verifyResult;
          }
        })
      },
      getCirculate: function(){
        var app = this.$getApp(), wx = this.$wx;
        var that = this;
        wx.request({
          // 请求地址
          url: 'http://123.206.27.155:8068/pmp/api/v1/product/circulate/8bd19997019200',
          // 请求方式
          method: "get",
          dataType: 'json',
          responseType: 'text',
          // 方法
          success: function(data) {
            console.log(data.data.body,"liuwantao2");
            that.goods_circulate = data.data.body;
          }
        })
      },
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
        
      }
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
    background: #000;
  }

  .logo{
    background: #000;
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
    width: 80vw;
    margin: 0vw auto 2vw;
    background: #fff;
    height: 14vw;
    text-align:center;
    border-radius: 0 0 3vw 3vw;
  }

  .check-word-block{
    width: 80vw;
    margin: 0vw auto 2vw;
    background: #fff;
    height: 38vw;
    text-align:center;
    border-radius: 0 0 3vw 3vw;
  }

  .check-content-block{
    background-color: #F8F8F9;
    border-radius: 6px;
    border-radius: 6px;
    width: 80vw;
    height: 20vw;
    float: left;
    margin: 5vw auto;
    display: block
  }

  .check-content-none{
    background-color: #F8F8F9;
    border-radius: 6px;
    border-radius: 6px;
    width: 80vw;
    height: 25vw;
    float: left;
    margin: 5vw auto;
    display: none
  }

  .tab-style-block{
    border-bottom: 2px solid #fff;
    padding-bottom: 0.08rem;
    width:fit-content;
    margin: 0 auto;
    color: #ffffff;
  }

  .tab-style-none{
    padding-bottom: 0.08rem;
    width:fit-content;
    margin: 0 auto;
  }

  .one-div-block{
    width: 80vw;
    height: auto;
    margin: 0vw auto;
    font-size: 0.25rem;
    background-color: black;
    padding-bottom: 5vw;
    display: block
  }

  .one-div-none{
    width: 80vw;
    height: auto;
    margin: 0vw auto;
    font-size: 0.25rem;
    background-color: black;
    padding-bottom: 5vw;
    display: none
  }

  .two-div-block{
    width:80vw;
    height: auto; 
    margin: 0 auto;
    display: block;
    background: #000;
    min-height: 40vw
  }

  .two-div-none{
    width:80vw;
    height: auto; 
    margin: 0 auto;
    display: none;
    background: #000;
    min-height: 40vw
  }

  .three-div-block{
    width:  80vw;height: auto;
    display: block; 
    background: #000000; 
    margin: 0 auto;
  }

  .three-div-none{
    width:  80vw;height: auto;
    display: none; 
    background: #000000; 
    margin: 0 auto;
  }

  .four-div-block{
    width:  80vw;
    height: auto;
    display: block;
    background: #000000;
    margin: 0 auto;
  }

  .four-div-none{
    width:  80vw;
    height: auto;
    display: none;
    background: #000000;
    margin: 0 auto;
  }

  .five-div-block{
    width:  80vw;
    height: auto;
    display: block;
    background: #000000;
    margin: 0 auto;
  }

  .five-div-none{
    width:  80vw;
    height: auto;
    display: none;
    background: #000000;
    margin: 0 auto;
  }

</style>
