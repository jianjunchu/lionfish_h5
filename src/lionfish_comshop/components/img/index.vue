<template>
  <!--<div class="i-class img-content">-->
    <!--<el-image class="i-class img-def" :src="defaultImage"/>-->
    <!--<el-image :error="bindError" :load="imageLoad" @click="preview" :class="['i-class', 'img-def', 'opacity' ,isLoad?'show-img':'']" :lazy="isLazy_" mode="aspectFill" :src="img"/>-->
  <!--</div>-->
  <div class="i-class img-content">
    <el-image
      :style="{'width': width+'px', 'height': height+'px'}"
      :src="loadImage">

      <div slot="placeholder" class="image-slot">
          <img :src="require(defaultImage)" :style="{'width': width+'px', 'height': height+'px'}"/>
      </div>
    </el-image>

  </div>

</template>

<script>
  export default {
    name: 'i-img',
    props: {
      defaultImage:{
        default:''
      },
      img:{
          type:String,
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
