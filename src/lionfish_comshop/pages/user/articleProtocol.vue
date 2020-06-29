<template>
  <div class="article">
    <div class="wxParse">
      <!--<parser html="{{article}}"></parser>-->
      <p v-html="article"></p>
    </div>
  </div>
</template>

<script>
  import GlobalMixin from '../../mixin/globalMixin.js';

  export default {
    mixins: [GlobalMixin],
    name:'article',
    data() {
      return {
        list: '',
        token: "",
        articleId: 0,
        article:'',
        title:'',
      }
    },
    created: function() {
      this.onLoad();
    },
    methods: {
      onLoad: function() {
        var id = this.$route.query.id;

        var a = id || 0;
        this.articleId = a;
        var about = this.$route.query.about;
        var e = about || 0, i = this.$wx.getStorageSync("token");
        this.token = i;
          if(about && about > 0) {
            this.get_about_us()
          }else {
            this.get_article();
          }

      },
      get_article: function() {
        var e = this;
        this.$http({
            controller: "article.get_article",
            token: e.token,
            id: e.articleId
          }).then(t=> {
              console.log(t);
            if ( 0 == t.code) {
              var a = t.data;

              e.article = a.content;
//              this.$store.state.app.toolbarTitle =a.title;
              e.$wx.setNavigationBarTitle({
                title: a.title
              })
            }
        });
      },
      get_about_us: function() {
        var e = this;
        this.$http({
            controller: "user.get_about_us"
          }).then(t=> {
              console.log(t);
            if ( 0 == t.code) {
              var a = t.data;
              this.article = a;
              this.$store.state.app.toolbarTitle = "关于我们";
            }
        });
      }
    }
  }
</script>
<style>
  @import "articleProtocol.less";
</style>
