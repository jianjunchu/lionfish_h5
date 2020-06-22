<template>
  <div class="btn i-class" :style="{'background':' linear-gradient(to top, '+skin.color+','+ skin.light+')'}">
    <text class="iconfont icon-gouwuche" :style="{'color':'#fff','font-size':fontsize+'px'}"></text>
  </div>

</template>

<script>
  export default {
    name: '',
    props:{
      fontsize: {
        type: Number,
        default: 24
      }
    },
    data(){
      return{
        skin: this.$getApp().globalData.skin
      }
    },
    mounted(){
      this.skin= this.$getApp().globalData.skin
    }
  }
</script>

<style scoped>
  @import "../../../@feiying/1.less";

  .btn {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: linear-gradient(to top,#ff5345,#ff8379);
    display: flex!important;
    align-items: center;
    justify-content: center;
  }
</style>
