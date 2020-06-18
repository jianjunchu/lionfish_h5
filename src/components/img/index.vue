<template>
  <div class="i-class img-content">
    <img class="i-class img-def" :src="defaultImage"></img>
    <img binderror="bindError"  bindtap="preview" class="i-class img-def opacity "  mode="aspectFill" :src="img"></img>
  </div>

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
      }

    }
  }
</script>

<style scoped>
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
