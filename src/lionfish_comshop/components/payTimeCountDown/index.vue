<template>
  <div class="count-down">{{showTimeCount}}</div>
</template>

<script>
  export default {
    name: '',
    props:{
      maxPayTime: {
        type: Number
      },
      createTime: {
        type: String
      }
    },
    data(){
      return{
        showTimeCount: "",
        timer:null
      }
    },
    watch:{
      createTime: (newValue, oldValue) => {
        var a = this, r = 60 * this.maxPayTime, i = void 0, n = void 0, s = void 0, e = function() {
          var e = Date.parse(new Date()) / 1e3;
          0 <= (s = parseInt(r - (e - t))) && (i = parseInt(s / 60), n = parseFloat(s % 60),
            i = 10 <= i ? i : "0" + i, n = 10 <= n ? n : "0" + n), a.setData({
            showTimeCount: (i || "00") + ":" + (n || "00")
          });
        };
        e(), this.timer = setInterval(function() {
          s <= 0 ? (a.timer && clearInterval(a.timer), a.$emit("timeOut")) : e();
        }, 1e3);
      }
    },
    destroyed:function(){
      clearInterval(this.timer);
    }

  }
</script>

<style scoped>

</style>
