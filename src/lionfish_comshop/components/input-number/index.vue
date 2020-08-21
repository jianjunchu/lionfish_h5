<template>
  <div :class="[iClass, 'i-input-number', 'i-input-number-size-'+size]">
    <div
      :class="['i-input-number-minus', 'i-input-number-div', 'i-number-div', (value <= min?'i-input-number-disabled':'')]"
      v-if="value==0">
      <img class="img i-number-img" src="@/assets/images/icon-spu-reduce-disabled.png"/>
    </div>
    <div @click.stop.prevent="handleMinus"
         :class="['i-input-number-minus', 'i-input-number-div', 'i-number-div', (value<=min?'i-input-number-disabled':'')]"
         v-else>
      <span class="iconfont icon-jian img i-number-img" :style="{color:getSkin.color}"></span>
    </div>
    <input readonly bindblur="handleBlur" bindfocus="handleFocus" catchtap="returnTap"
           :class="['i-class-number-text', 'i-input-number-text', (min>=max?'i-input-number-disabled':'')]"
           :value="value"/>
    <div :class="['i-input-number-plus', 'i-input-number-div', 'i-number-div', (value>=max?'i-input-number-disabled':'')]"
         v-if="max==0">
      <img class="img i-number-img" src="@/assets/images/icon-spu-add-disabled.png"/>
    </div>
    <div @click.stop.prevent="handlePlus"
         :class="['i-input-number-plus', 'i-input-number-div', 'i-number-div', (value>=max?'i-input-number-disabled':'')]" v-else>
      <span class="iconfont icon-jia img i-number-img" :style="{color:getSkin.color}"></span>
    </div>
  </div>

</template>

<script>
  function t(t, a) {
    var e, i = void 0, n = void 0;
    try {
      i = t.toString().split(".")[1].length;
    } catch (t) {
      i = 0;
    }
    try {
      n = a.toString().split(".")[1].length;
    } catch (t) {
      n = 0;
    }
    return e = Math.pow(10, Math.max(i, n)), (Math.round(t * e) + Math.round(a * e)) / e;
  }

  export default {
    name: '',
    data(){
      return{
        canChange: !0,
      }
    },
    computed: {
      getSkin() {
        return this.$app.globalData.skin
      }
    },
    props:{
      iClass:'',
      size: String,
      value: {
        default: 1
      },
      min: {
        default: -1 / 0
      },
      max: {
        default: 1 / 0
      },
      step: {
        default: 1
      },
      reduceImage: {
        default: "@/assets/images/icon-input-reduce.png"
      },
      addImage: {
        default: "@/assets/images/icon-input-add.png"
      },
      idx: {
        default: 0
      }
    },
    methods: {
      handleChangeStep: function(a, e, i) {
        var n = this.value, s = a.currentTarget.dataset, u = (void 0 === s ? {} : s).disabled, h = this.step;
        if (u) return null;
        "minus" === e ? n = t(n, -h) : "plus" === e && (n = t(n, h)), this.handleEmit(n, e, i);
      },
      handleMinus: function(t) {
        this.canChange && this.handleChangeStep(t, "minus", !0);
      },
      handlePlus: function(t) {
        this.canChange && this.handleChangeStep(t, "plus", !0);
      },
      handleFocus: function() {
        this.canChange = !1, this.$emit("focus");
      },
      getType: function(t) {
        return t > this.value ? "plus" : t < this.value ? "minus" : "";
      },
      handleBlur: function(t) {
        this.canChange = !0;
        var a = this.value, e = t.detail.value, i = "";
        "" === e && (e = 1), (e -= a) <= 0 && (e = 1);
        var n = this.min;
        if (!(e *= 1)) return e = 0 === e ? n : 1, i = "plus", void this.handleEmit(e, i, this.value !== e);
        e = +e, i = this.getType(e);
        var s = this.value !== e;
        this.handleEmit(e, i, s);
      },
      handleEmit: function(t, a) {
        t < this.min && this.$emit("outOfMin", t), t > this.max && this.$emit("outOfMax", t);
        var e = this, i = e.min, n = e.max;
        n < t ? t = n : t < i ? t = i : t || (t = i);
        var s = t !== this.value, u = {
          value: t,
          type: a,
          idx: this.idx
        };
        a && (u.type = a), s ? this.$emit("change", u) : ((this.value = t), this.$emit("change"));
      },
      returnTap: function() {}
    }
  }
</script>

<style scoped>
  @import "../../../@feiying/1.less";

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button{
      -webkit-appearance: none !important;
      margin: 0;
  }


  .i-input-number {
    color: #495060;
    display: flex;
    align-items: center;
    position: relative;
  }

  .i-input-number .i-input-number-div {
    width: 6vw;
    height: 6vw;
    display: inline-block;
    vertical-align: middle;
  }

  .i-input-number .i-input-number-div .img {
    width: 6vw;
    height: 6vw;
    font-size: 6vw;
  }

  .i-input-number-minus {
    border-right: none;
    border-radius: 4px 0 0 4px;
  }

  .i-input-number-plus {
    border-left: none;
    border-radius: 0 4px 4px 0;
  }

  .i-input-number .i-input-number-text {
    position: relative;
    text-align: center;
    height: 5vw;
    width: 6vw;
    font-size: 3.5vw;
    line-height: 5vw;
    z-index: 0;
  }
</style>
