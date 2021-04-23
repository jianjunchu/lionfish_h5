<template>
  <div class="i-index-item i-class">
    <div class="i-index-item-header">{{name}}</div>
    <div class="i-index-item-content">
      <slot></slot>
    </div>
  </div>

</template>

<script>
  export default {
    name: '',
    data() {
      return {
        top: 0,
        height: 0,
        currentName: ''
      }
    },
    props: {
      name: {
        type: String,
        default: ''
      }
    },
    methods: {
      updateDataChange: function() {
        var t = this;
       /* wx.createSelectorQuery().in(this).select(".i-index-item").boundingClientRect(function(e) {
          t.setData({
            top: e.top,
            height: e.height,
            currentName: t.data.name
          });
        }).exec();*/
      }
    }
  }
</script>

<style scoped>

  .i-index-item-header {
    height: 35px;
    line-height: 35px;
    font-size: 13px;
    padding-left: 20px;
    color: #999;
    background: #f6f6f6;
  }

  .i-index-item-content {
    background: #fff;
  }
</style>
