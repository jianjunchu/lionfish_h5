<template>
  <div id="app">
    <router-view />

    <i-tabbar  :currentIdx="0"  :tabbarRefresh="tabbarRefresh"></i-tabbar>

  </div>
</template>

<style lang="less">
  @import '~vux/src/styles/reset.less';
</style>
<script>
export default {
  name: 'App',
  data() {
    return {
      tabbarRefresh:false
    }
  },
}
</script>
