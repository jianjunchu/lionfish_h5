<template>
  <view class="i-class img-content">
    <el-image class="i-class img-def" :src="defaultImage"/>
    <el-image :error="bindError" :load="imageLoad" bindtap="preview" :class="['i-class', 'img-def', 'opacity' ,isLoad?'show-img':'']" :lazy="isLazy" mode="aspectFill" :src="img"/>
  </view>


</template>

<script>
  export default {
    name: 'iImg',
    props: {
      defaultImage:{
        default:''
      },
      img:{
        default:''
      },
      isLoad:{
        type: Boolean
      },
      isLazy: {
        type: Boolean,
        value: !1
      }

    },
    methods:{
      bindError: function(e) {
        console.log(e);
      },
      imageLoad:function(e) {
          this.isLoad = false;
      }

    }
  }
</script>

<style lang="less">
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
