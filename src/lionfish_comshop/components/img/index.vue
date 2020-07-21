<template>
  <!--<div class="i-class img-content">-->
    <!--<el-image class="i-class img-def" :src="defaultImage"/>-->
    <!--<el-image :error="bindError" :load="imageLoad" @click="preview" :class="['i-class', 'img-def', 'opacity' ,isLoad?'show-img':'']" :lazy="isLazy_" mode="aspectFill" :src="img"/>-->
  <!--</div>-->

  <van-image
    :class="[iClass, 'img-content']"
    :style="{'width': width, 'height': height}"
    fit="cover"
    :src="loadImage">
    <template v-slot:loading>
      <van-loading type="spinner" size="20" />
    </template>
  </van-image>

</template>

<script>
  import { Lazyload } from 'vant';
  export default {
    name: 'i-img',
    props: {
      iClass:{
        default:''
      },
      defaultImage:{
        default:''
      },

      isLoad:{
        type: Boolean
      },
      isLazy: {
        type: String
      },
      loadImage: {
        type: String
      },
      width: String,
      height: String,
      canPreview: {
        type: Boolean,
        value: !1
      },

    },
    watch:{
      isLazy: {
        handler: function(isLazy) {
          console.log(isLazy,'isLazy');
          if(isLazy == "true"){
              this.isLazy_ = true;
          }else {
              this.isLazy_ = false;
          }
        },
        immediate: true
      },
      loadImage: {
        handler: function(loadImage) {
          console.log(loadImage,'loadImage');
//
          if (loadImage) {
//            var pixelRatio = (this.$getApp().globalData.systemInfo && this.$getApp().globalData.systemInfo.pixelRatio) ? this.$getApp().globalData.systemInfo.pixelRatio :2;
//            var t = Math.ceil(pixelRatio), a = loadImage + "?imageView2/" + this.imgType + "/w/" + this.getPx(this.width) * t + "/h/" + this.getPx(this.height) * t + "/ignore-error/1";
//            this.img= a;
            this.img= loadImage;
          }
        },
        immediate: true
      }
    },
    data(){
      return{
        isLazy_: false,
//        img:''
//        isLoad:true
      }
    },
    methods:{
      imageLoad: function() {
        this.isLoad= !0;
      },
      bindError: function(e) {
        console.log(e);
      },
      getPx: function(e) {
//        var t = this.$wx.getSystemInfoSync();
//        var windowWidth = (t && t.windowWidth )? t.windowWidth : 375;
        var windowWidth = 375;
        return console.log(), Math.round(windowWidth / 375 * e);
      },
      preview: function() {
//        this.canPreview && wx.previewImage({
//          urls: [ this.data.loadImage ],
//          fail: function(e) {
//            wx.showToast({
//              title: "预览图片失败，请重试",
//              icon: "none"
//            }), console.log(e);
//          }
//        });
      }
    }
  }
</script>

<style>
  .img-content {
    position: relative;
  }

  .img-def {
    position: absolute!important;
    transition: opacity 0.1s;
  }

  .opacity {
    opacity: 0;
  }

  .show-img {
    opacity: 1;
  }
</style>
