<template>
  <div :class="['btn',iClass]" :style="{'background': 'linear-gradient(to top, ' + skin.color + ', '+skin.light+')'}">
    <span class="iconfont icon-gouwuche" style="color:#fff;font-size:14px"></span>
  </div>


</template>

<script>
  export default {
    name: '',
    props:{
      iClass:{
        default:''
      }
    },
    data() {
      return {
        skin: this.$getApp().globalData.skin
      }
    },
    mounted() {
      this.skin = this.$getApp().globalData.skin
    }
  }
</script>

<style scoped>
  @import "../../../@feiying/1.less";

  .btn {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: linear-gradient(to top, #ff5345, #ff8379);
    display: flex !important;
    align-items: center;
    justify-content: center;
  }
</style>
