<template>
  <div id="app" style="overflow-x: hidden;">
    <i-toolbar :title="标题"></i-toolbar>
    <router-view style="margin-top:50px"/>

    <i-tabbar :currentIdx="0" :tabbarRefresh="tabbarRefresh"></i-tabbar>

  </div>
</template>

<style lang="less">


</style>
<script>

  export default {
    name: 'App',
    data() {
      return {
        tabbarRefresh: false
      }
    }
  }
</script>
