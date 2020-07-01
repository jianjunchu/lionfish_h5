<template>
  <div @click="routerLink" :class="[routerClass, 'router-class']" hoverClass="i-router-hover">
    <slot></slot>
  </div>

</template>

<script>
  export default {
    name: 'router-link',

    data() {
      return {
        canClick: !0
      }
    },
    props: {
      url: String,
      type: String,
      disabled: {
        type: Boolean,
        default: !1
      },
      delta: {
        type: Number,
        default: 1
      },
      routerClass: {
        default: ''
      }
    },

    methods: {
      routerLink(t) {
        var t = this
        if (!this.disabled && this.canClick) {
          if (this.url) {

            this.canClick = !1
            this.$router.push(this.url)

          } else {
            console.warn('url 不能为空')
          }
        }
      }
    }
  }

</script>

<style scoped>

  .i-router-hover {
    opacity: 1;
  }
</style>
