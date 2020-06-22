<template>
  <div class="i-class i-load-more {{loading?'':'i-load-more-line'}}">
    <div class="i-load-more-loading" v-if="loading"></div>
    <div class="i-load-more-tip">
      <div v-if="tip!==''">{{tip}}</div>
      <div v-else-if="tip===''&&loading">正在加载</div>
      <div class="i-load-more-empty" v-else></div>
    </div>
  </div>

</template>

<script>
  export default {
    name: '',
    props:{
      loading: {
        type: Boolean,
        default: !0
      },
      tip: {
        type: String,
        default: ""
      }
    }
  }
</script>

<style less>
  .i-load-more {
    width: 65%;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 30px 0;
    margin: 0 auto;
  }

  .i-load-more-loading {
    display: inline-block;
    margin-right: 12px;
    vertical-align: middle;
    width: 14px;
    height: 14px;
    background: 0 0;
    border-radius: 50%;
    border: 2px solid #e9eaec;
    border-color: #e9eaec #e9eaec #e9eaec #2d8cf0;
    animation: btn-spin 0.6s linear;
    animation-iteration-count: infinite;
  }

  .i-load-more-tip {
    display: inline-block;
    vertical-align: middle;
    color: #999;
  }

  .i-load-more-line {
    display: flex;
    border-top: 0;
  }

  .i-load-more-line .i-load-more-tip {
    position: relative;
    top: -.1em;
    padding: 0 0.55em;
  }

  .i-load-more-empty {
    border-radius: 50%;
    background-color: #e5e5e5;
    display: inline-block;
    position: relative;
    vertical-align: 0;
    top: -.16em;
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
