<template>
  <div id="app" style="overflow-x: hidden;">
    <i-toolbar ref="toolbar"></i-toolbar>
    <router-view style="margin-top:50px" :v-loading="true"/>

    <i-tabbar v-show="getShowTabbar" ref="tabbar" :currentIdx="0" :tabbarRefresh="tabbarRefresh"
              :cartNum="3"></i-tabbar>

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
    },
    created:function(){
      this.$vux.loading.show({
        text: 'Loading'
      })
    },
    computed: {

      getShowTabbar() {

        return this.$store.getters.showTabbar
      }

    }
  }
</script>
