<template>
  <div>
    <button :appParameter="appParameter" @contact="bindcontact" @error="binderror"
            @getphonenumber="bindgetphonenumber" @getuserinfo="bindgetuserinfo" @click.stop.prevent="handleTap"
            :class="[ iClass, 'i-btn',(long?'i-btn-long':''), 'i-btn-'+size, 'i-btn-'+type, 'i-btn-'+shape, (loading?'i-btn-loading':''), (disabled?'i-btn-disabled':''), (inline?'i-btn-inline':'')]"
            hoverClass="i-btn-hover" :hoverStartTime="hoverStartTime" :hoverStayTime="hoverStayTime"
            :hoverStopPropagation="hoverStopPropagation" :openType="openType" plain="true"
            :endMessageImg="sendMessageImg" :sendMessagePath="sendMessagePath"
            :sendMessageTitle="sendMessageTitle" :sessionFrom="sessionFrom" :showMessageCard="showMessageCard"
            :style="styleStr">
      <div class="i-btn-loading-inner" v-if="loading"></div>
      <slot></slot>
    </button>

  </div>
</template>

<script>
  export default {
    name: 'i-button',
    props: {
      iClass:{
        type: String,
      },
      type: {
        type: String,
        default: ''
      },
      inline: {
        type: Boolean,
        value: !1
      },
      size: {
        type: String,
        value: ''
      },
      shape: {
        type: String,
        value: 'square'
      },
      disabled: {
        type: Boolean,
        value: !1
      },
      loading: {
        type: Boolean,
        value: !1
      },
      long: {
        type: Boolean,
        value: !1
      },
      openType: String,
      appParameter: String,
      hoverStopPropagation: Boolean,
      hoverStartTime: {
        type: Number,
        value: 20
      },
      hoverStayTime: {
        type: Number,
        value: 140
      },
      lang: {
        type: String,
        value: 'en'
      },
      sessionFrom: {
        type: String,
        value: ''
      },
      sendMessageTitle: String,
      sendMessagePath: String,
      sendMessageImg: String,
      showMessageCard: Boolean,
      styleStr: {
        type: String,
        value: ''
      }
    },
    methods: {
      handleTap: function() {
        return !this.disabled && !this.loading && void this.$emit('handleTap')
      },
      bindgetuserinfo: function() {
        var e = (0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}).detail, t = void 0 === e ? {} : e
        this.$emit('getuserinfo', t)
      },
      bindcontact: function() {
        var e = (0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}).detail, t = void 0 === e ? {} : e
        this.$emit('contact', t)
      },
      bindgetphonenumber: function() {
        var e = (0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}).detail, t = void 0 === e ? {} : e
        this.$emit('getphonenumber', t)
      },
      binderror: function() {
        var e = (0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}).detail, t = void 0 === e ? {} : e
        this.$emit('error', t)
      }
    }
  }
</script>

<style scoped>
  .i-btn {
    text-align: center;
    vertical-align: middle;
    touch-action: manipulation;
    cursor: pointer;
    background-image: none;
    white-space: nowrap;
    user-select: none;
    font-size: 4vw;
    border-radius: 4vw;
    border: 0 !important;
    position: relative;
    text-decoration: none;
    height: 10vw;
    line-height: 10vw;
    background: #f7f7f7;
    color: #495060;
    margin: 4vw;
    border: none;
    outline: none;

  }

  .i-btn-hover {
    opacity: 0.7;
  }

  .i-btn-long {
    border-radius: 0;
    margin: 0;
    box-shadow: none;
  }

  .i-btn-large {
    height: 96px;
    line-height: 96px;
  }

  .i-btn-small {
    height: 80px;
    line-height: 80px;
  }

  .i-btn-primary {
    color: #fff;
    background: #2d8cf0;
  }

  .i-btn-ghost {
    background: #fff;
    color: #495060;
  }

  .i-btn-success {
    color: #fff;
    background: #19be6b;
  }

  .i-btn-warning {
    color: #fff;
    background: #f90;
  }

  .i-btn-error {
    color: #fff;
    background: #ed3f14;
  }

  .i-btn-info {
    color: #fff;
    background: #2db7f5;
  }

  .i-btn-circle {
    border-radius: 88px;
  }

  .i-btn-large.i-btn-circle {
    border-radius: 96px;
  }

  .i-btn-small.i-btn-circle {
    border-radius: 80px;
  }

  .i-btn-loading {
    opacity: 0.6;
  }

  .i-btn-loading-inner {
    display: inline-block;
    margin-right: 24px;
    vertical-align: middle;
    width: 28px;
    height: 28px;
    background: 0 0;
    border: 4px solid #e9eaec;
    border-color: #e9eaec #e9eaec #e9eaec #2d8cf0;
    border-radius: 50%;
    animation: btn-spin 0.6s linear;
    animation-iteration-count: infinite;
  }

  .i-btn-disabled {
    opacity: 0.9;
  }

  .i-btn-inline {
    display: inline-block;
  }

  @-webkit-keyframes btn-spin {
    0% {
      transform: rotate(0);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes btn-spin {
    0% {
      transform: rotate(0);
    }

    100% {
      transform: rotate(360deg);
    }
  }
</style>
