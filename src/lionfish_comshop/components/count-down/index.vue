<template>
   <div :class="[countdownClass, 'i-count-down']">
    <slot></slot>
    <span class="em" v-if="showDay&&time.day>0">{{time.day}}天</span>
    <span :class="itemClass">{{time.hour}}</span>
    :
    <span :class="itemClass">{{time.minute}}</span>
    :
    <span :class="itemClass">{{time.second}}</span>
   </div>
</template>

<script>
  import t from "../../utils/timeFormat"
  export default {
    name: '',

    props: {
      itemClass:'',
      countdownClass:'',
      target: 0,
      showDay: true,
      beginTime: '',
      callback: '',
      format: [],
      clearTimer:false
    },
    data(){
      return{
        time: {
          day: "0",
          second: "00",
          minute: "00",
          hour: "00"
        },
        resultFormat: [],
        changeFormat: !1,
        timeStamp: 0,
        timer: null
      }
    },
    created:function() {
      this.init();
    },
    methods: {

      init: function() {
        const t = this.target
        if (t - new Date().getTime() <= 0) return (
          this.time = {
            day: "0",
            second: "00",
            minute: "00",
            hour: "00"
          }
        ), void this.$emit("callback");
        this.interval(t);
      },
      interval: function(e) {
        var i = this, a = e - new Date().getTime();
        if (a <= 0) return clearTimeout(this.timer), this.$emit("callback"),
          (
            this.time = {
              day: "0",
              second: "00",
              minute: "00",
              hour: "00"
            }
          );
        var r = Math.ceil(a / 1e3), n = parseInt(r / 86400), o = r % 86400, s = (0, t.formatNumber)(parseInt(o / 3600));
        o %= 3600;
        var m = {
          day: n,
          hour: s,
          minute: (0, t.formatNumber)(parseInt(o / 60)),
          second: (0, t.formatNumber)(o % 60)
        };
        i.$set(i.time,'day',m.day);
        i.$set(i.time,'hour',m.hour);
        i.$set(i.time,'minute',m.minute);
        i.$set(i.time,'second',m.second);

        i.timer = setTimeout(function() {

          i.interval(e);}, 1e3);
      }
    },
    destroyed(){
      clearTimeout(this.timer);
    }
  }
</script>

<style scoped>
  .i-count-down {
    white-space: nowrap;
  }

  .em {
    margin-right: 6px;
  }

  .item-class {
    display: inline-block;
    margin: 0 2px;
  }
</style>
