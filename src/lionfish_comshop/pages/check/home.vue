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
    <!-- 音乐名 -->
    <div style="width: 60vw;height: 8vw;margin: 35vw auto 0vw;text-align: center;">
        <span style="line-height: 8vw;color: #BBB">《{{nowmusic.imgDesc}}》</span>
    </div>
    <!-- 转动唱片 -->
    <div style="width: 55vw;height: 55vw;margin: 6vw auto;">
      <img src="@/assets/check-image/Group4@2x.png" class="play" id="xuanzhuan" style="width: 55vw;height: 55vw;border-radius: 50%;" v-on:click="playMusic">
      <audio id="audio1" autoplay="autoplay" loop="loop">
          <source :src="nowmusic.imgUrl" type="audio/mpeg">
          <source :src="nowmusic.imgUrl" type="audio/ogg" />
      </audio>
    </div>

    <!-- 查看商品详情 -->
    <div style="width: 60vw;height: 10vw;margin: 10vw auto 0vw;background: #F3CE30;text-align: center" v-on:click="goback">
        <!-- <a href="javascript:window.history.back()"><span style="line-height: 10vw;color: #fff">查看商品详情</span></a> -->
        <span style="line-height: 10vw;color: #fff">查看商品详情</span>
    </div>
  </div>
  

</template>
<script>

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
          margin: '8vw auto',
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
        nowIndex2: 0 //随机音乐
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
      this.getDate();
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
      getIp: function(){
        var that = this;
        var app = this.$getApp(), wx = this.$wx;
        this.$http({
            controller: "index.get_client_ip"
          }).then(e=> {
            //console.log(e,"liuwantao");
            that.nowIp = e.data;
            that.getDate();
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
            console.log(data.data.body.productType,"123456789");
            var productType = data.data.body.productType;
            that.productBrandLogoImg = that.replaceIp(productType.productBrandLogoImg);
            that.newWineIntroduce = productType.newWineIntroduce;
            that.productParameterImg = that.replaceIp(productType.productParameterImg);
            that.productNameImg = that.replaceIp(productType.productNameImg);
            var gallerys = productType.productTypeGalleryList;
            for(var i=0;i < gallerys.length; i ++){
              //修改替换url中ip为域名
              var url = gallerys[i].imgUrl;
              //console.log(url,"123");
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
          that.nowIndex2 --;
        }
        that.nowmusic = that.music_list[that.nowIndex2];
        var audio = document.getElementById("audio1");
        audio.load();
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
 

</style>
