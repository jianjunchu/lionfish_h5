<template>
  <div class="tabs i-class">
    <div scrollWithAnimation class="tabs__navs" scrollX="true" scrollY="false" :scrollLeft="scrollLeft" style="overflow-y:scroll">
      <div class="tabs__navs__wrap">
        <div @click="handleTabItemTap" :class="['tabs__nav tav__nav__'+index, index == activeIndex_?'active':'']"   :style="{color: index===activeIndex_ ? fontColor:''}" v-for="(tabItem ,index) in tabs" :data-index="index" :data-key="tabItem.id">{{tabItem.name}}</div>
        <div :animation="indicatorAnamationData" class="activeIndicator" :style="lineBgColor"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'i-tabs',
    props: {
      scrollLeft:{
        default: 0
      },
      index:{
        default: 0
      },
      activeIndex:{
        default: 0
      },
      lineBgColor: {
        default: ''
      },
      indicatorAnamationData: {
        default: ()=>{}
      },
      fontColor: {
        default: '#000'
      },
      tabs: {
        default: []
      }
    },
    data() {
      return{
        activeIndex_:this.activeIndex
      }
    },

    methods: {
      handleTabItemTap(t){
        const e = t.target.dataset.index, a = t.target.dataset.key;

        if(e !== this.activeIndex_){
            this.activeIndex_ = e
        }

      }
    },
    watch: {
      activeIndex_: (newValue, oldValue) => {
      },
    }
  }
</script>

<style scoped>

  .tabs {
    position: relative;
    padding-right: 10px;
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
