<template>
  <div v-if="list.length">
    <div class="list-item" @click="goLink2" data-link="/lionfish_comshop/pages/user/articleProtocol?id=" :data-id="item.id" v-for="(item,idx) in list" :key="item.id">
      <span>{{item.title}}</span>
      <img class="icon-right right-arrow" src="@/assets/images/rightArrowImg.png"/>
    </div>
  </div>

  <div class="none-rush-list" v-else-if="noData">
    <img class="img-block" src="@/assets/images/icon-index-empty.png"></img>
    <div class="h1">{{$t('common.zanruneirong')}}</div>
  </div>
</template>

<script>
  import GlobalMixin from '../../mixin/globalMixin.js';
  //  import util from '../../utils/util.js';
  import status from '../../utils/index.js';

  export default {
    mixins: [GlobalMixin],
    name:'protocol',
    data() {
      return {
        list: [],
        noMore: false,
        pageNum: 1,
        token: "",
        noData:false,
        page:1
      }
    },
    created: function() {
      this.$wx.setNavigationBarTitle({
        title: this.$t('me.changjianbangzhu'),
        showLogo:false,
        showMore:false,
        showBack:true
      })
      this.onLoad();
    },
    methods: {
      onLoad: function() {

        this.setNavBgColor();
        this.get_list()
      },
      setNavBgColor() {
        this.$http({
          controller: 'index.get_nav_bg_color'
        }).then(response => {
          console.log(response);
          var t = response.data || '#8ED9D1', e = response.nav_font_color || '#ffffff'
          this.$store.dispatch('app/setNavBgColor', t)
          this.$store.dispatch('app/setNavFontColor', e)
        })
      },
      get_list: function() {
         this.token = this.$wx.getStorageSync('token');
         var that = this;
         this.$http({
             controller: 'article.get_article_list',
             token: this.token,
             page: this.pageNum
           }).then(res=> {
               console.log(res)
//             wx.hideLoading();
             if (res.code == 0) {
               let oldList = that.list;
               let list = res.data;
               let h = {};
               if(list.length < 30) h.noMore = true;
               list = list.concat(oldList);
               h.list = list;
               that.pageNum++;
               that.list = list;
             } else {
               let h = {};
               h.noMore = true;
               if(that.page == 1) h.noData = true;
               that.noMore = h.noMore;
               that.noData = h.noData;
             }
         })
      },
      onReachBottom: function() {
        this.noMore || this.get_list();
      },
      goLink2: function(event) {
        let link = event.currentTarget.dataset.link;
        let id = event.currentTarget.dataset.id;

        link = link + id
        this.$wx.redirectTo({
          url: link
        })
      },
    }
  }
</script>
<style>
  @import "protocol.less";
</style>
