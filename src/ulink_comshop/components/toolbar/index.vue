<template>
  <div class="vux-header" :style="{background:navBgColor}">
    <div class="vux-header-left" v-if="getShowToolbarBack" @click.stop="back"><a class="vux-header-back"></a>
      <div class="left-arrow"></div>
    </div>
    <div class="vux-header-left-logo" v-if="getShowToolbarLogo"><a class="vux-header-back"></a>
      <img class="mart-logo" :src="getToolbarLogo"/>
    </div>
    <h2 class="vux-header-title"><span>{{getToolbarTitle}}</span></h2>
    <div class="vux-header-right" v-if="getShowToSolbarMore"><a class="vux-header-more"></a></div>
  </div>
</template>

<script>
  import { mapGetters,mapState } from 'vuex'
  export default {
    name: '',
    computed: {
      getShowToolbarLogo(){
        return this.$store.getters.showToolbarLogo
      },
      getShowToolbarBack(){
        return this.$store.getters.showToolbarBack
      },
      getToolbarTitle(){
        return this.$store.getters.toolbarTitle
      },
      getShowToSolbarMore(){
        return this.$store.getters.showToolbarMore
      },
      navBgColor(){
        return this.$store.getters.navBgColor
      },
      navFontColor(){
        return this.$store.getters.navFontColor
      },
      getToolbarLogo(){
        return this.$store.getters.toolbarLogo
      }
    },
    methods:{
      back:function() {
          console.log(this.$router)
         // this.$router.push({path: url});
          if(this.$router.history.current.name=='/ulink_comshop/pages/order/index'){
              this.$router.push({path: '/ulink_comshop/pages/user/me'});
          }else if('/ulink_comshop/pages/order/order' == this.$router.history.current.name){
              this.$router.push({path: '/ulink_comshop/pages/order/index'});
          }else{
              this.$router.go(-1)
          }
      }
    }

  }
</script>

<style lang="less">

  .vux-header {
    position: fixed;
    width: 100%;
    box-sizing: border-box;
    background-color: #3dc14a;
    left: 0px;
    top: 0px;
    z-index: 9999
  }
  .vux-header .vux-header-title {
    line-height: 48px;
    text-align: center;
    font-size: 18px;
    font-weight: 400;
    color: #fff;
  }
  .vux-header-title-area, .vux-header .vux-header-title {
    margin: 0 88px;
    height: 48px;
    width: auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .vux-header .vux-header-title > span {
    display: inline-block;
  }

  .vux-header .vux-header-left-logo {
    position: absolute;
    display: block;
    font-size: 14px;
    color: #fff;
    left: 18px;
  }

  .vux-header .vux-header-left,.vux-header .vux-header-right {
    position: absolute;
    top: 14px;

    display: block;
    font-size: 14px;
    line-height: 21px;
    color: #fff;
  }
  .vux-header .vux-header-left a,.vux-header .vux-header-left button,.vux-header .vux-header-right a,.vux-header .vux-header-right button {
    float: left;
    margin-right: 8px;
    color: #fff;
  }
  .vux-header .vux-header-left a:active,.vux-header .vux-header-left button:active,.vux-header .vux-header-right a:active,.vux-header .vux-header-right button:active {
    opacity: .5
  }
  .vux-header .vux-header-left {
    left: 18px;
    width: 30px;
  }
  .vux-header .vux-header-left .vux-header-back {
    padding-left: 16px
  }
  .vux-header .vux-header-left .left-arrow {
    position: absolute;
    width: 30px;
    height: 30px;
    top: -5px;
    left: -5px;
  &:before {
     content: "";
     position: absolute;
     width: 12px;
     height: 12px;
     border: 1px solid #fff;
     border-width: 1px 0 0 1px;
     transform: rotate(315deg);
     top: 8px;
     left: 7px;
   }
  }
  .vux-header .vux-header-right {
    right: 15px
  }
  .vux-header .vux-header-right a,.vux-header .vux-header-right button {
    margin-left: 8px;
    margin-right: 0
  }
  .vux-header .vux-header-right .vux-header-more:after {
    content: "\2022\0020\2022\0020\2022\0020";
    font-size: 16px;
  }
  .vux-header-fade-in-right-enter-active {
    animation: fadeinR .5s;
  }
  .vux-header-fade-in-left-enter-active {
    animation: fadeinL .5s;
  }
  @keyframes fadeinR {
    0% {
      opacity: 0;
      transform: translateX(150px);
    }
    100% {
      opacity:1;
      transform:translateX(0);
    }
  }
  @keyframes fadeinL{
    0% {
      opacity: 0;
      transform: translateX(-150px);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .mart-logo {
    height: 50px;
  }
</style>
