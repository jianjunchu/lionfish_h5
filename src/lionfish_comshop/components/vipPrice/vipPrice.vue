<template>
  <span class="vipprice" v-if="type==0">会员价:￥{{prePrice}}</span>
  <span class="vipprice level" v-else-if="type==1">等级折扣价:￥{{prePrice}}</span>
</template>

<script>
  export default {
    name: '',
    props: {
      price: {
        type: null,
        value: '0'
      },
      type: {
        type: String,
        value: '0'
      }
    },
    watch: {
      price: (e) => {
        var t = e
        '[object Array]' === Object.prototype.toString.call(e) && (t = e.join('.'))
        this.prePrice = t
      }
    },
    data() {
      return {
        prePrice: 0
      }
    }
  }
</script>

<style scoped>

</style>
