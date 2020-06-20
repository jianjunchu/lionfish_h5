<template>
  <div :class="['i-class', 'i-input-number', 'i-input-number-size-'+size]">
    <div
      :class="['i-input-number-minus', 'i-input-number-div', 'i-number-div', (value <= min?'i-input-number-disabled':'')]"
      v-if="value==0">
      <img class="img i-number-img" src="@assets/images/icon-spu-reduce-disabled.png"></img>
    </div>
    <div catchtap="handleMinus"
         :class="['i-input-number-minus', 'i-input-number-div', 'i-number-div', (value<=min?'i-input-number-disabled':'')]"
         v-else>
      <span class="iconfont icon-jian img i-number-img" :style="{color:getSkin.color}"></span>
    </div>
    <input disabled bindblur="handleBlur" bindfocus="handleFocus" catchtap="returnTap"
           :class="['i-class-number-text', 'i-input-number-text', (min>=max?'i-input-number-disabled':'')]" type="number"
           value="{{value}}"/>
    <div :class="['i-input-number-plus', 'i-input-number-div', 'i-number-div', (value>=max?'i-input-number-disabled':'')]"
         v-if="max==0">
      <img class="img i-number-img" src="@assets/images/icon-spu-add-disabled.png"/>
    </div>
    <div catchtap="handlePlus"
         :class="['i-input-number-plus', 'i-input-number-div', 'i-number-div', (value>=max?'i-input-number-disabled':'')]" v-else>
      <span class="iconfont icon-jia img i-number-img" :style="{color:getSkin.color}"></span>
    </div>
  </div>

</template>

<script>
  export default {
    name: '',
    data(){
      return{
        canChange: !0,
      }
    },
    computed: {
      getSkin() {
        return this.$store.getters.globalData.skin
      }
    },
    props:{
      size: String,
      value: {
        type: Number,
        default: 1
      },
      min: {
        type: Number,
        default: -1 / 0
      },
      max: {
        type: Number,
        default: 1 / 0
      },
      step: {
        type: Number,
        default: 1
      },
      reduceImage: {
        type: String,
        default: "@/assets/images/icon-input-reduce.png"
      },
      addImage: {
        type: String,
        default: "@/assets/images/icon-input-add.png"
      },
      idx: {
        type: Number,
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
        this.canChange = !1, this.triggerEvent("focus");
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
        t < this.min && this.triggerEvent("outOfMin", t), t > this.max && this.triggerEvent("outOfMax", t);
        var e = this, i = e.min, n = e.max;
        n < t ? t = n : t < i ? t = i : t || (t = i);
        var s = t !== this.value, u = {
          value: t,
          type: a,
          idx: this.idx
        };
        a && (u.type = a), s ? this.triggerEvent("change", u) : (this.setData({
          value: t
        }), this.triggerEvent("change"));
      },
      returnTap: function() {}
    }
  }
</script>

<style scoped>

  .i-input-number {
    color: #495060;
    display: flex;
    align-items: center;
    position: relative;
  }

  .i-input-number .i-input-number-div {
    width: 24px;
    height: 24px;
    display: inline-block;
    vertical-align: middle;
  }

  .i-input-number .i-input-number-div .img {
    width: 24px;
    height: 24px;
    font-size: 24px;
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
    height: 24px;
    width: 33px;
    font-size: 12px;
    line-height: 24px;
    z-index: 0;
  }
</style>
