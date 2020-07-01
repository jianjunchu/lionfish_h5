<template>
  <div class="tabs i-class">
    <div scrollWithAnimation class="tabs__navs" scrollX="true" scrollY="false" :scrollLeft="scrollLeft">
      <div class="tabs__navs__wrap">
        <div @click.stop="handleTabItemTap" :class="['tabs__nav tav__nav__'+index, index==activeIndex?'active':'']" :data-id="tabItem.id" :data-index="index" :style="{'color': index===activeIndex?fontColor:''}" v-for="(tabItem ,index ) in tabs" :key="tabItem.id">{{tabItem.name}}</div>
      </div>
    </div>
  </div>

</template>

<script>
  var app,wx;
  export default {
    name: 'i-tabs',
    props: {
      lineBgColor: {
        type: String
      },
      fontColor: {
        type: String
      },
      tabs: {
        type: Array,
        default: []
      },

    },

    data() {
      return{
        indicatorAnamationData: {},
        scrollLeft: 0,
        activeIndex:0,
        screenWidth:0
      }
    },
    created:function(){

      app = this.$getApp(),wx = this.$wx;
      this.ready()
    },
    methods: {
      ready: function() {
        this.tabsWidth = [], this.tabsLeft = [], this.screenWidth = wx.getSystemInfoSync().screenWidth,
          (this.fontColor = this.fontColor ? this.fontColor : "#000"), this.lineColor && (
          this.lineBgColor = this.lineBgColor
        );
      },
      handleTabItemTap: function(t) {

        var e = t.currentTarget.dataset.index, a = t.currentTarget.dataset.id;

        if(e !== this.activeIndex){
          this.activeIndex = e
          this.$emit("activeIndexChange", { a: a, e: e });
        }
      },
      executeAnimcation: function(a) {
        var i = this;
        this.getLeftAndWidth(a).then(function(t) {
          var e = i.generateAnimationData(t.left, t.width, t.firstTabLeft);
          i.centerTheTab(a, t), (
            i.indicatorAnamationData = e
          );
        });
      },
      centerTheTab: function(t, e) {
        var a = e.width, i = (e.left, this.tabsWidth.slice(0, t).reduce(function(t, e) {
          return t + e + 25;
        }, 15));
        this.scrollLeft = i - (this.screenWidth - a) / 2
      },
      getLeftAndWidth: function(a) {
        var i = this;
        return new Promise(function(e) {
          (0, t.getRect)(i, ".tabs__nav", !0).then(function(t) {
            i.tabsWidth = t.map(function(t) {
              return t.width;
            }), i.tabsLeft = t.map(function(t) {
              return t.left;
            }), e({
              width: i.tabsWidth[a],
              left: i.tabsLeft[a],
              firstTabLeft: i.tabsLeft[0]
            });
          });
        });
      },
      generateAnimationData: function(t, e) {
        var a = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 0, i = wx.createAnimation({
          duration: 200,
          timingFunction: "ease"
        });
        return [ {
          width: e,
          left: t - a
        } ].forEach(function(t) {
          var e = t.width, a = t.left;
          i.translateX(a).width(e).step();
        }), i.export();
      },
      resetIndicator: function() {
        var t = this.tabs || [], e = 28;
        t.length && (e = t[0].name && 14 * t[0].name.length);
        var a = wx.createAnimation({
          duration: 200,
          timingFunction: "ease"
        });
        a.translateX(0).width(e).step(), (
          this.scrollLeft = 0,
          this.indicatorAnamationData = a.export()
        );
      }
    }

  }
</script>

<style scoped>

  .tabs {
    width: 100vw;
    position: relative;
    padding-right: 2vw;
  }

  .tabs__nav {
    position: relative;
    padding-bottom: 2px;
    margin: 0px 10px;
    font-size: 12px;
    font-weight: bold;
    line-height: 26px;
    flex-shrink: 0;
    transition: all 0.6s ease;
    color: #666;
    padding-top: 2px;
  }

  .tabs__nav.active {
    font-weight: bold;
    font-size: 16px;
    border-bottom:2px solid #F00
  }

  .tabs__nav:first-child {
    margin-left: 10px;
  }

  .tabs__navs__wrap {
    position: relative;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
  }

  .tabs__navs__wrap .activeIndicator {
    width: 30px;
    height: 2px;
    position: absolute;
    bottom: 0;
    left: 8px;
    border-radius: 6px;
    background: linear-gradient(to right,#fe655c,#fa875b);
    box-shadow: 0px 4px 4px 0px rgba(255,89,0,0.25);
    transition: all 1s ease-in-out;
  }

</style>
