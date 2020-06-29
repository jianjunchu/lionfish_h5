<template>
  <div class="fixed-bar">
    <slot></slot>
  </div>

</template>

<script>
  export default {
    name: ''
  }
</script>

<style scoped>
  .fixed-bar {
    left: 0;
    bottom: 0;
    position: fixed;
    background: #fff;
    width: 100%;
    z-index: 2;
  }

  .pb20 {
    padding-bottom: 10vw;
  }
</style>
