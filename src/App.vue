<template>
  <div id="app" style="overflow-x: hidden;">
    <i-toolbar :showBack ="showBack" :title="toolbarTitle"></i-toolbar>
    <router-view style="margin-top:50px"/>

    <i-tabbar :currentIdx="0" :tabbarRefresh="tabbarRefresh" :cartNum="3"></i-tabbar>

  </div>
</template>

<style lang="less">


</style>
<script>

  export default {
    name: 'App',
    data() {
      return {
        tabbarRefresh: false,
        toolbarTitle:'HzMart',
        showBack:false
      }
    }
  }
</script>
