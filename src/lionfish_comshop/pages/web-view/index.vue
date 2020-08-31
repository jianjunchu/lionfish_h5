<template>
  <div style="width: 100vw">
    <iframe id="iframe" @load="load" ref="iframe" class="iframe" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen=""    :src="url"></iframe>
  </div>
</template>

<script>
  var app, wx
  import GlobalMixin from '../../mixin/globalMixin.js'
  export default {
    mixins: [GlobalMixin],
    name: 'web-view',
    data() {
      return {
          url:''
      }
    },
    created:function(){
      const t = this.$route.query
      app = this.$getApp()
      wx = this.$wx
      wx.setNavigationBarTitle({
        title: 'Web-View',
        showLogo: false,
        showMore: false,
        showBack: true
      })
      this.onLoad(t);
    },
    mounted (){
      console.log(this.$refs.iframe.contentWindow)
    },
    methods: {
      onLoad: function(e) {
        var a = decodeURIComponent(e.url);

        this.url = a;
      },
      load:function(e) {

      }
    }


  }
</script>

<style scoped>
  .iframe{
      width: 100vw;
      height: 100vh;
      border-width:0vw;
  }
</style>
