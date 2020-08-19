  <template>
  <div>
    <div @click.stop="handleClickMask" catchtouchmove="stopMove"
         :class="['i-as-mask', 'i-class-mask', (isShow ? 'i-as-mask-show':'')]"></div>
    <div  :class="[iClass,(isIpx?'ipx':''), (scrollUp?'i-as':'i-modal-content') ,(isShow?scrollUp?'i-as-show':'i-modal-show':'')]">
      <slot></slot>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'i-modal',
    props: {
      iClass:'',
      isIpx: {
        default: !1
      },
      isShow: false,
      maskClosable:{
        default: true
      },
      scrollUp:false

    },
    mounted: function() {
      this.isIpx = this.$app.globalData.isIpx
    },
    methods: {
      stopMove: function() {
      },
      handleClickMask: function() {

        this.maskClosable && this.handleClickCancel()
      },
      handleClickCancel: function() {
        this.$emit('cancel')
      }
    }

  }
</script>

<style scoped>
  .i-as {
    position: fixed;
    width: 100%;
    box-sizing: border-box;
    left: 0;
    right: 0;
    bottom: 0;
    background: #fff;
    transform: translate3d(0, 100%, 0);
    transform-origin: center;
    transition: all 0.2s ease-in-out;
    z-index: 900;
    visibility: hidden;
    border-radius: 15px 15px 0 0;
  }

  .i-as-mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    z-index: 17;
    transition: all 0.2s ease-in-out;
    opacity: 0;
    visibility: hidden;
  }

  .i-as-mask-show {
    opacity: 1;
    visibility: visible;
  }

  .i-as-show {
    transform: translate3d(0, 0, 0);
    visibility: visible;
  }

  .i-modal-content {
    position: fixed;
    overflow: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    display: flex;
    width: auto;
    height: auto;
    outline: 0;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    transform: translateZ(1px);
    opacity: 0;
    visibility: hidden;
    -webkit-overflow-scrolling: touch;
  }

  .i-modal-show {
    visibility: visible;
    opacity: 1;
  }

  .ipx {
    padding-bottom: 20px;
  }
</style>
