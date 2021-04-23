<template>
  <span :class="IClass">${{showMoney}}</span>
</template>

<script>
  export default {
    name: '',
    date(){
      return{
        showMoney: 0
      }
    },
    props:{
      money: {
        type: Number
      },
      IClass:{
        type: String
      }
    },
    watch: {
      money(newV,oldV){
        const s = (newV / 100).toFixed(2);
        this.showMoney = s;

      }
    }
  }
</script>

<style scoped>

</style>
