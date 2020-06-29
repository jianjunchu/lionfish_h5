<template>
  <div class="i-class i-card">
    <div class="i-card-header">
      <slot name="header"></slot>
    </div>
    <div class="i-card-body">
      <slot name="content"></slot>
    </div>
    <div class="i-card-footer">
      <slot name="footer"></slot>
    </div>
  </div>

</template>

<script>
  export default {
    name: ''
  }
</script>

<style scoped>
  .i-card {
    width: 95vw;
    border-radius: 3vw;
    background: #fff;
    box-shadow: 0 0 4vw 0 rgba(0,0,0,0.05);
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
</style>
