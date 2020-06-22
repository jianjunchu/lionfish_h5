<template>
  <span :class="['bold',status==0||status==1?'red':'gray']">{{showStatus}}</span>

</template>

<script>
  export default {
    name: '',
    props: {
      status: {
        type: String,
        default: ''
      }
    },
    watch: {
      status: (e) => {
        const a = this.statusChange(t)
        this.showStatus = a
      }
    },
    data(){
      return{
        showStatus: ""
      }
    },
    methods: {
      statusChange: function(t) {
        switch (t) {
          case "0":
            return "待付款";

          case "1":
            return "待提货";

          case "2":
            return "已完成";

          case "3":
            return "已取消";

          case "4":
            return "待配送";

          default:
            return "";
        }
      }
    }
  }
</script>

<style scoped>

</style>
