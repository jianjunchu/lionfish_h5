<template>
  <i-modal @click.stop="close" class="dialog" scrollUp="false" v-show="visible">
    <div class="dialog-content">
      <div class="text i-class">{{text}}</div>
      <div class="button-group">
        <div v-if="showCancel">
          <i-button catchtap="cancel" iClass="left-btn">
            <div>取消</div>
          </i-button>
          <div class="split-line"></div>
          <i-button catchtap="confirm" iClass="right-btn">
            <div>{{confirmText}}</div>
          </i-button>
        </div>
        <div catchtap="confirm" class="r-btn i-btn" v-else>{{confirmText}}</div>
      </div>
    </div>
  </i-modal>

</template>

<script>
  export default {
    name: '',
    props: {
      visible: {
        type: Boolean,
        default: !1
      },
      text: String,
      confirmText: {
        type: String,
        default: '确定'
      },
      showCancel: {
        type: Boolean,
        default: !0
      }
    },
    methods:{
      confirm: function() {
        this.$emit("confirm");
      },
      cancel: function() {
        this.$emit("cancel");
      },
      close: function() {
        this.visible = false
      }
    }
  }
</script>

<style scoped>

  .dialog-content {
    width: 75%;
    height: 104px;
    border-radius: 15px;
    background: #fff;
  }

  .dialog-content .text {
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #d2d2d2;
  }

  .dialog-content .button-group {
    display: flex;
  }

  .dialog-content .left-btn,.dialog-content .right-btn {
    width: 35px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    font-size: 18px;
    color: #0076ff;
    margin: 0;
    padding: 0;
  }

  .dialog-content .split-line {
    width: 0;
    height: 44px;
    border-right: 1px solid #d2d2d2;
  }

  .dialog-content .r-btn {
    width: 75%;
    height: 44px;
    text-align: center;
    line-height: 44px;
    font-size: 18px;
    color: #0076ff;
    margin: 0;
    padding: 0;
  }

</style>
