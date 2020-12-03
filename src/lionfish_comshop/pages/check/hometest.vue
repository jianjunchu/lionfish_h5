<template>

  <div :style="note">
    <!-- <div style="width: 100vw;height: 12vw;margin: 0vw auto 0vw;"></div> -->
    <div style="width: 40vw;height: 18vw;margin: 0vw auto 0vw;">
      <img :src="productBrandLogoImg" style="width: 40vw;height: 15vw">
    </div>

    <div style="width: 85vw;height: 35vw;margin: 8vw auto;">
      <img :src="productNameImg" style="width: 85vw;height: 32vw;">
    </div>

    <!-- 产品介绍 -->
    <div :style="goodImg">
      <img src="@/assets/check-image/caidai.png" style="width: 12vw;height: 13vw;z-index: 3;position:absolute;left: 5vw;bottom: 4vw">
      <img :src="productParameterImg" style="width: 70vw;height: 100vw;z-index: 2;position:absolute;left: 10vw;top: 5vw">
      <img src="@/assets/check-image/16@2x.png" style="width: 84vw;height: 108vw;z-index: 1;position:absolute;left: 1vw;top: 1vw">
    </div>

    <!-- 新酒节文字介绍 -->
    <div :style="wineDay"></div>
    <div style="width: 85vw;height: auto;min-height: 15vw;margin: 10vw auto;text-align: left">
      <span style="color: #fff;font-size: 3vw;line-height: 4.3vw;letter-spacing:0.1vw;">
        {{newWineIntroduce}}
      </span>
    </div>

    <!-- 视频 -->
    <div :style="video_word"></div>
    <div :style="video_content">
        <!-- <img :src="productParameterImg" style="width: 60vw;height: 90vw;z-index: 1;position:absolute;left: 15vw;top: 10vw"> -->
        <video id="myPlayer" :poster="nowvideo.videoMainImgUrl" v-on:click="pauseVideo" playsInline webkit-playsinline style="width: 85vw;height: 50vw;z-index: 2;position:absolute;">
          <source :src="nowvideo.imgUrl" type="video/mp4" />
          <source :src="nowvideo.imgUrl" type="application/x-mpegURL" />
        </video>
        <img src="@/assets/check-image/play-ico.png" id="play-ico" style="width: 12vw;height: 12vw;z-index: 4;position:absolute;left: 36vw;top: 19vw" v-on:click="playVideo">
        <img src="@/assets/check-image/heng.png" id="play-ico" style="width: 85vw;height: 50vw;z-index: 3;position:absolute;" v-on:click="pauseVideo">
    </div>

    <!-- 音乐 -->
    <div :style="music_word"></div>
    <div :style="music_word2" v-on:click="turnMusic">Another one</div>

    <!-- 跑马灯 -->
     <div style="width: 90vw;height: 14vw;margin: 22vw auto 0vw;text-align: center;">
        <span style="font-size: 3.5vw;font-weight: 400; float: left;color: #fff">{{nowMessage.status}}&nbsp;&nbsp;</span><span style="font-size: 3.5vw;float: left;font-style:italic;padding-top: 5vw;color: #fff">"{{nowMessage.message}}"</span>
          <!-- 无缝滚动效果 -->
          <!-- <div class="marquee-wrap">
            <ul class="marquee-list" :class="{'animate-up': animateUp}">
              <li v-for="(item, index) in messageArray" :key="index"><span style="font-size: 3.5vw;font-weight: 400; float: left">{{item.status}}&nbsp;&nbsp;</span><span style="font-size: 3.5vw;float: left;font-style:italic;padding-top: 5vw">"{{item.message}}"</span></li>
            </ul>
          </div> -->
    </div>
    <!-- 音乐名 -->
    <div style="width: 80vw;height: 8vw;margin: 3vw auto 0vw;text-align: center;">
        <span style="width: 30vw;line-height: 8vw;color: #BBB;">《{{nowmusic.imgDesc}}》</span>
    </div>
    <!-- 转动唱片 -->
    <div style="width: 55vw;height: 55vw;margin: 6vw auto 3vw;">
      <img src="@/assets/check-image/Group4@2x.png" class="play" id="xuanzhuan" style="width: 55vw;height: 55vw;border-radius: 50%;" v-on:click="playMusic">
      <audio id="audio1" loop="loop">
          <source :src="nowmusic.imgUrl" type="audio/mpeg">
          <source :src="nowmusic.imgUrl" type="audio/ogg" />
      </audio>
    </div>
    <!-- 留言 -->
    <div style="width: 85vw;height: 10vw;margin: 0 auto">
      <input type="text" cols="15" 
       rows="2"  style="width: 65vw;height: 8vw;position: relative;left: 0;top: 1vw;background: #000;border: 1px solid #c0c0c0;color: #fff;font-size: 14px;" maxlength="20" v-model="messages" placeholder="请输入留言，将所有人可见，限20字内">
      <!-- <textarea rows="2" cols="13" style="width: 54vw;height: 16vw;position: relative;left: 0;top: 1vw;background: #000;border: 1px solid #c0c0c0;color: #fff;resize:none" placeholder="请输入留言，将所有人可见，限30字内"></textarea> -->
      <button type="button" style="width: 15vw;height: 6vw;position: relative;left: 2vw;top: 1.2vw;font-size: 16px;background: #000;color: #fff;border: 1px solid #c0c0c0;" v-on:click="leavMessage">饮用评价</button>
    </div>

    <!-- 查看商品详情 -->
    <div style="width: 85vw;height: 10vw;margin: 7vw auto 0vw;background: #F3CE30;text-align: center" v-on:click="goback">
        <!-- <a href="javascript:window.history.back()"><span style="line-height: 10vw;color: #fff">查看商品详情</span></a> -->
        <span style="line-height: 10vw;color: #fff">查看商品详情</span>
    </div>
  </div>
  

</template>
<script>

  import util from '../../utils'
  export default {
    name: 'template2-button',
    data() {
      return {
        // productBrandLogoImg: require('@/assets/check-image/LOGO @2x.png'),
        // productNameImg: require('@/assets/check-image/title.png'),
        // productParameterImg: require('@/assets/check-image/product.png'),
        // newWineIntroduce: '11月的第三个星期四，里昂的传统是，博若莱的酿酒师们来到富尔沃尔大教堂的圣殿脚下，发现了博若莱--新酒。酒商们带来了带着乐队的桶，这是1951年以来的传统。为世界上发现这一独特节日传统的许多游客带来幸福。',
        productBrandLogoImg: '',
        productNameImg: '',
        productParameterImg: '',
        newWineIntroduce: '',
        b0: '',
        code: '',
        checkCode: '',
        nowIp: '',
        messages: '',
        productTypeId: '',
        note: {
          backgroundImage: "url(" + require("@/assets/check-image/back_home.jpg") + ")",
          backgroundRepeat:'no-repeat',
          backgroundSize:'100% 100%',
          width: '100vw',
          height: '500vw',
          margin: '0',
          padding: '0'
        },
        goodImg: {
          width: '86vw',
          height: '110vw',
          margin: '8vw auto',
          backgroundImage: "url(" + require("@/assets/check-image/1@2x.png") + ")",
          backgroundRepeat:'no-repeat',
          backgroundSize:'100% 100%',
          position:'relative'
        },
        wineDay: {
          width: '83vw',
          height: '15vw',
          margin: '22vw auto 0vw',
          backgroundImage: "url(" + require("@/assets/check-image/5@2x.png") + ")",
          backgroundRepeat:'no-repeat',
          backgroundSize:'100% 100%'
        },
        video_word: {
          width: '50vw',
          height: '4.5vw',
          'margin-top': '30vw',
          'margin-left': '7.5vw',
          background: "url(" + require("@/assets/check-image/DayRelatedVideo@2x.png") + ")",
          backgroundRepeat:'no-repeat',
          backgroundSize:'100% 100%'         
        },
        video_content: {
          width: '85vw',
          height: '50vw',
          margin: '8vw auto 0',
          // background: "url(" + require("@/assets/check-image/heng.png") + ")",
          // backgroundRepeat:'no-repeat',
          // backgroundSize:'100% 100%',
          position:'relative'  
        },
        music_word: {
          width: '50vw',
          height: '4.5vw',
          'margin-top': '12vw',
          'margin-left': '7.5vw',
          background: "url(" + require("@/assets/check-image/MusicforDrinking@2x.png") + ")",
          backgroundRepeat:'no-repeat',
          backgroundSize:'100% 100%',
          float: 'left'         
        },
        music_word2: {
          width: '20vw',
          height: '6vw',
          'margin-top': '11vw',
          'margin-right': '7.5vw',
          float: 'right',
          border: '2px solid #F3CE30',
          color: '#F3CE30' ,
          'font-size': '3vw',
          'text-align': 'center',
          'line-height': '5vw'         
        },
        music_flag: 1,
        video_list: [],
        music_list: [],
        nowmusic: {},
        nowvideo: {},
        nowIndex1: 0,//随机视频
        nowIndex2: 0, //随机音乐
        timer:null,
        nowMessage: '尾号6688：新酒果然不错，还有动听的音乐，点个赞！',
        messageList: [],
        messageArray:[],
        animateUp: false
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
      //this.getDate2();
      this.getIp();
    },
    methods: {
      //  onShow: function() {
      //   const wx = this.$wx, app = this.$getApp()
      //   var s = this
      //   util.check_login_new().then(function(t) {
      //     console.log(t)
      //     if (t) {//登录状态
      //       console.log("11111");
      //     } else {//未登录
      //       console.log("22222");
      //       wx.navigateTo({
      //         url: "/login"
      //       })
      //     }
      //   })
      // },
      startSwip: function(){
          if(this.timer != null) return;
          this.timer = setInterval(() => {
              //获取到头的第一个字符
              let start = this.nowmusic.imgDesc.substring(0,1);
              //获取到后面的所有字符
              let end = this.nowmusic.imgDesc.substring(1);
              //重新拼接得到新的字符串，并赋值给this.message
              this.nowmusic.imgDesc = end + start;
          },10000)
      },
      getIp: function(){
        var that = this;
        var app = this.$getApp(), wx = this.$wx;
        this.$http({
            controller: "index.get_client_ip"
          }).then(e=> {
            //console.log(e,"liuwantao");
            that.nowIp = e.data;
            that.getDate2();
            //that.getDate();
        });
      },
      getMessage: function(){
        var app = this.$getApp(), wx = this.$wx;
        const that = this;
        wx.request({
          // 请求地址
          url: 'https://wms.nfc315.com/pmp/api/v2/check/index/message/get/'+that.productTypeId,
          // 请求方式
          method: "get",
          dataType: 'json',
          responseType: 'text',
          // 方法
          success: function(data) {
            console.log(data,"000000");
            if(data.data.body.length > 10){
              that.messageList = data.data.body.splice(9);
            }else{
              that.messageList = data.data.body;
            }
            that.getMessageList2();
            that.getNowMessage();
            that.timer = setInterval(that.getNowMessage,5000);
            // that.getMessageList2();
            // that.timer = setInterval(that.scrollAnimate,10000);

          }
        })
      },
      scrollAnimate() {
        this.animateUp = true
        setTimeout(() => {
          this.messageArray.push(this.messageArray[0])
          this.messageArray.shift()
          this.animateUp = false
        }, 1000);
      },
      getNowMessage(){
        var that = this;
        var nowIndex = that.getRandomInt(0,that.messageArray.length);
        //var tel = that.messageList[nowIndex].tel;
        // that.nowMessage = "尾号"+tel.substring(tel.length-4)+":"+that.messageList[nowIndex].message;
        that.nowMessage = that.messageArray[nowIndex];
        //console.log(that.nowMessage);
      },
      getMessageList2(){
        var that = this;
        
        for(var i = 0;i < that.messageList.length; i++){
          var tel = that.messageList[i].tel;
          var date1 = new Date(that.messageList[i].createTime);
          var date2 = new Date();
          var times = date2 - date1;
          var hours = Math.floor(times / 1000 / 60 / 60);
          var days = Math.floor(times / 1000 / 60 / 60 / 24);
          if(hours >= 24){
            var obj = {};
            obj.status = days + "天前," + "尾号"+tel.substring(tel.length-4)+":";
            obj.message = that.messageList[i].message;
            that.messageArray.push(obj);
          }else{
            var obj = {};
            obj.status = hours + "小时前," + "尾号"+tel.substring(tel.length-4)+":";
            obj.message = that.messageList[i].message;
            that.messageArray.push(obj);
          }
          console.log(that.messageArray);
          //that.messageList[i] = "尾号"+tel.substring(tel.length-4)+":"+that.messageList[i].message;
        }
        // var tel = that.messageList[nowIndex].tel;
        // that.nowMessage = "尾号"+tel.substring(tel.length-4)+":"+that.messageList[nowIndex].message;
        // console.log(that.nowMessage);
      },
      leavMessage: function(){
        const wx = this.$wx, app = this.$getApp();
        const message = this.messages;
        if(message == ''){
          alert("留言不能为空！");
          return;
        }
        const productTypeId = this.productTypeId;
        var userInfo = wx.getStorageSync('userInfo');
        const telephone = userInfo.telephone;
        const that = this;
        util.check_login_new().then(function(t) {
          console.log(t)
          if (t) {//登录状态
            console.log("已登录");
            wx.request({
              // 请求地址
              url: 'https://wms.nfc315.com/pmp/api/v2/check/index/message/add/'+message+'/'+telephone+'/'+productTypeId,
              // 请求方式
              method: "get",
              dataType: 'json',
              responseType: 'text',
              // 方法
              success: function(data) {
                console.log(data);
                that.nowMessage="尾号"+telephone.substring(telephone.length-4)+":"+message;
                that.messages = "";
              }
           });
          } else {//未登录
            console.log("未登录");
            wx.navigateTo({
              url: "/login"
            })
          }
        });
      },
      getDate: function(){
        var app = this.$getApp(), wx = this.$wx;
        var that = this;
        that.checkCode = this.$route.query.chk;
        that.code = that.checkCode.substr(0,14);
        wx.request({
          // 请求地址
          url: 'https://wms.nfc315.com/pmp/api/v2/product/type/getByUid/'+that.code,
          // 请求方式
          method: "get",
          dataType: 'json',
          responseType: 'text',
          // 方法
          success: function(data) {
            var productType = data.data.body.productType;
            that.productBrandLogoImg = that.replaceIp(productType.productBrandLogoImg);
            that.newWineIntroduce = productType.newWineIntroduce;
            that.productParameterImg = that.replaceIp(productType.productParameterImg);
            that.productNameImg = that.replaceIp(productType.productNameImg);
            var gallerys = productType.productTypeGalleryList;
            for(var i=0;i < gallerys.length; i ++){
              //修改替换url中ip为域名
              var url = gallerys[i].imgUrl;
              gallerys[i].imgUrl = that.replaceIp(url);
              //console.log(that.goods_image[i].imgUrl,"修改后的url");
              if(gallerys[i].urlType == 5){
                that.video_list.push(gallerys[i]);
              }else if(gallerys[i].urlType == 6){
                that.music_list.push(gallerys[i]);
              }
            }
            //获取随机视频
            var nowIndex1 = that.getRandomInt(0,that.video_list.length);
            that.nowIndex1 = nowIndex1;
            that.nowvideo = that.video_list[nowIndex1];

            var nowIndex2 = that.getRandomInt(0,that.music_list.length);
            that.nowIndex2 = nowIndex2;
            that.nowmusic = that.music_list[nowIndex2];
            that.startSwip();
            var audio = document.getElementById("audio1");
            var vid = document.getElementById("myPlayer");
            audio.load();
            vid.load();
          }
        })
      },
      getDate2: function(){
        var app = this.$getApp(), wx = this.$wx;
        var that = this;
        that.b0 = this.$route.query.b0;
        that.checkCode = this.$route.query.chk;
        that.code = that.checkCode.slice(14);
        var url = "";
        if(that.nowIp == ""){
          url = 'https://wms.nfc315.com/pmp/api/v3/nfc315/verify/'+that.b0+'/'+that.checkCode+'/113.45.91.173';
        }else{
          url = 'https://wms.nfc315.com/pmp/api/v3/nfc315/verify/'+that.b0+'/'+that.checkCode+'/'+ that.nowIp;
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
            console.log(data.data.body.verifyResult,"1234");
            if(!data.data.body.verifyResult){
              var productType = data.data.body.product.productType;
              that.productTypeId = productType.id;
              that.getMessage();
              that.productBrandLogoImg = that.replaceIp(productType.productBrandLogoImg);
              that.newWineIntroduce = productType.newWineIntroduce;
              that.productParameterImg = that.replaceIp(productType.productParameterImg);
              that.productNameImg = that.replaceIp(productType.productNameImg);
              var gallerys = productType.productTypeGalleryList;
              for(var i=0;i < gallerys.length; i ++){
                //修改替换url中ip为域名
                var url = gallerys[i].imgUrl;
                gallerys[i].imgUrl = that.replaceIp(url);
                //console.log(that.goods_image[i].imgUrl,"修改后的url");
                if(gallerys[i].urlType == 5){
                  that.video_list.push(gallerys[i]);
                }else if(gallerys[i].urlType == 6){
                  that.music_list.push(gallerys[i]);
                }
              }
              //获取随机视频
              var nowIndex1 = that.getRandomInt(0,that.video_list.length);
              that.nowIndex1 = nowIndex1;
              that.nowvideo = that.video_list[nowIndex1];

              var nowIndex2 = that.getRandomInt(0,that.music_list.length);
              that.nowIndex2 = nowIndex2;
              that.nowmusic = that.music_list[nowIndex2];

              var audio = document.getElementById("audio1");
              var vid = document.getElementById("myPlayer");
              audio.load();
              vid.load();
              //判断是否是iOS
              var u = navigator.userAgent;
              //var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
              var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);//ios终端
              // if(isiOS){
              //   that.playMusic();
              // }    
              that.playMusic();
            }else{
              var flag = that.$route.query.flag;
              
              if(flag == 't3'){
                wx.navigateTo({
                  url: "/t3?chk="+that.checkCode+"&b0="+that.b0+"&flag=1"
                })
              }else{
                wx.navigateTo({
                  url: "/t2?chk="+that.checkCode+"&b0="+that.b0+"&flag=1"
                })
              }
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
      playMusic: function(){
        //点击暂停播放时，音乐暂停，图片停止旋转
        var xuanzhuan = document.getElementById("xuanzhuan");
        var audio = document.getElementById("audio1");
        if(this.music_flag == 1){
          xuanzhuan.style.animationPlayState = "paused";
          audio.pause();
          this.music_flag = 2;
        }else{
          xuanzhuan.style.animationPlayState = "running";
          audio.play();
          this.music_flag = 1;
        }     
      },
      playVideo: function(){
        //点击开始播放视频
        var vid = document.getElementById("myPlayer");
        vid.play(); 
        document.getElementById('play-ico').style.display = "none";    
      },
      pauseVideo: function(){
        //点击暂停播放视频
        var vid = document.getElementById("myPlayer");
        vid.pause(); 
        document.getElementById('play-ico').style.display = "block";      
      },
      turnMusic: function(){
        var that = this;
        var length = that.music_list.length-1;
        if(that.nowIndex2 < length){
          that.nowIndex2 ++;
        }else{
          that.nowIndex2=0;
        }
        that.nowmusic = that.music_list[that.nowIndex2];
        var audio = document.getElementById("audio1");
        audio.load();
        var xuanzhuan = document.getElementById("xuanzhuan");
        xuanzhuan.style.animationPlayState = "running";
        audio.play();
      },
      //随机取值
      getRandomInt: function(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //不含最大值，含最小值
      },
      goback: function(){
        var that = this;
        var wx = this.$wx;
        that.b0 = this.$route.query.b0;
        that.checkCode = this.$route.query.chk;
        var flag = this.$route.query.flag;
        that.code = that.checkCode.slice(14);
        if(flag == 't3'){
          wx.navigateTo({
            url: "/t3?chk="+that.checkCode+"&b0="+that.b0+"&flag=1"
          })
        }else{
          wx.navigateTo({
            url: "/t2?chk="+that.checkCode+"&b0="+that.b0+"&flag=1"
          })
        }
          
      }
    }
  }
</script>
<style scoped>

#xuanzhuan{
    -webkit-animation: play 10s linear infinite;
       -moz-animation: play 10s linear infinite;
            animation: play 10s linear infinite;

}
@-webkit-keyframes play{
    0%{-webkit-transform: rotate(0deg);}
    100%{transform: rotate(360deg);}
}
@-moz-keyframes play {
    0%{-moz-transform: rotate(0deg);}
    100%{transform: rotate(360deg);}
}
@keyframes play{
    0%{transform: rotate(0deg);}
    100%{transform: rotate(360deg);}
}

.marquee-wrap  {
  width: 100%;
  height: 14vw;
  border-radius: 20px;
  margin: 0 auto 0;
  overflow: hidden;
}

.marquee-list li {
      width: 100%;
      height: 14vw;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      padding: 0 20px;
      list-style: none;
      line-height: 5vw;
      text-align: center;
      color: #fff;
      font-weight: 600;
  }
  .animate-up {
    transition: all 0.5s ease-in-out;
    transform: translateY(-40px);
  }
 

</style>
