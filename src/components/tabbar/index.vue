<template>
  <div :class="['tabbar_box', isIpx?'pb20':'']" :style="{'background-color':tabbar.backgroundColor}">
    <div v-for="(item ,index ) in tabbar.list" :key="item.id">
      <router-link class="tabbar_nav"  hoverClass="none" openType="switchTab" :style="{color:item.selected?tabbar.selectedColor:tabbar.color}" :to="item.pagePath" v-if="index!=2">
        <div class="tabbar_icon" :data-num="getCartNum">
          <img class="img" :src="item.selected?item.selectedIconPath:item.iconPath"/>
          <div class="cart-num" v-if="getCartNum&&index==3">{{getCartNum}}</div>
        </div>
        <span>{{item.text}}</span>
      </router-link>
      <div bindtap="goWeapp" class="tabbar_nav" v-show="open_tabbar_out_weapp==0&&index==2" :style="{color:item.selected?tabbar.selectedColor:tabbar.color}" v-else>
        <div class="tabbar_icon">
          <img class="img" :src="item.selected?item.selectedIconPath:item.iconPath"></img>
        </div>
        <span>{{item.text}}</span>
      </div>
    </div>
  </div>

</template>

<script>
  import {http} from '@/api/index'

  export default {

    computed: {
      getCartNum(){
        return this.$store.getters.cartNum
      }
    },
    mounted() {
        this.getTabbar();
    },
    data() {
      return{
        isIpx: !1,
        tabbar: {
          backgroundColor: "#fff",
          color: "#707070",
          selectedColor: "#ff5344",
          list: [ {
            pagePath: "/index",
            text: "我的",
            iconPath: "",
            selectedIconPath: "",
            selected: !0
          }, {
            pagePath: "/type",
            text: "我的",
            iconPath: "",
            selectedIconPath: "",
            selected: !1
          }, {
            pagePath: "",
            text: "我的",
            iconPath: "",
            selectedIconPath: "",
            selected: !1
          }, {
            pagePath: "/order",
            text: "我的",
            iconPath: "",
            selectedIconPath: "",
            selected: !1
          }, {
            pagePath: "/me",
            text: "我的",
            iconPath: "",
            selectedIconPath: "",
            selected: !1
          } ]
        },
        open_tabbar_type: 0,
        open_tabbar_out_weapp: 0,
        tabbar_out_appid: "",
        tabbar_out_link: "",
        tabbar_out_type: 0
      }
    },

    methods: {

      getTabbar(){

        const p = this;

        http({
          controller : 'index.get_tabbar'
        }).then(response => {

          if (0 == response.code) {

            const t =  response.data, a = p.tabbar;

            a.list[0].text = t.t1 || "首页", a.list[0].iconPath = t.i1 || "/lionfish_comshop/images/icon-tab-index.png",
              a.list[0].selectedIconPath = t.s1 || "/lionfish_comshop/images/icon-tab-index-active.png",
              a.list[1].text = t.t4 || "分类", a.list[1].iconPath = t.i4 || "/lionfish_comshop/images/icon-tab-type.png",
              a.list[1].selectedIconPath = t.s4 || "/lionfish_comshop/images/icon-tab-type-active.png",
              a.list[2].text = t.t5, a.list[2].iconPath = t.i5, a.list[2].selectedIconPath = t.s5,
              a.list[3].text = t.t2 || "购物车", a.list[3].iconPath = t.i2 || "/lionfish_comshop/images/icon-tab-shop.png",
              a.list[3].selectedIconPath = t.s2 || "/lionfish_comshop/images/icon-tab-shop-active.png",
              a.list[4].text = t.t3 || "我的", a.list[4].iconPath = t.i3 || "/lionfish_comshop/images/icon-tab-me.png",
              a.list[4].selectedIconPath = t.s3 || "/lionfish_comshop/images/icon-tab-me-active.png";
            const o = response.open_tabbar_type || 0, i = response.open_tabbar_out_weapp || 0, s = response.tabbar_out_appid, n = response.tabbar_out_link, l = response.tabbar_out_type;
            a.selectedColor = response.wepro_tabbar_selectedColor || "#F75451", a.backgroundColor = response.wepro_tabbar_bgColor || "#ffffff",

              p.tabbar= a,
              p.open_tabbar_type= o,
              p.open_tabbar_out_weapp= i,
              p.tabbar_out_appid= s,
              p.tabbar_out_link= n,
              p.tabbar_out_type= l

          }
        })

      }

    }
  }
</script>

<style scoped>
  .tabbar_box {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 899;
    width: 100%;
    height: 48px;
    box-shadow: 0 0 2px rgba(0,0,0,0.1);
  }

  .tabbar_box.iphoneX-height {
    padding-bottom: 24px;
  }

  .tabbar_box.pb20 {
    padding-bottom: 20px;
  }

  .tabbar_nav {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 8px;
    height: 100%;
    position: relative;
  }
  .tabbar_nav span{
    margin-top: 5px;
    margin-left: 5px;
  }

  .tabbar_icon {
    position: relative;
    width: 24px;
    height: 24px;
  }

  .tabbar_icon .cart-num {
    position: absolute;
    right: -16px;
    top: -4px;
    width: 18px;
    height: 18px;
    background: #f43530;
    border-radius: 18px;
    color: #fff;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .tabbar_icon .img {
    width: 28px;
    height: 28px;
  }
</style>
