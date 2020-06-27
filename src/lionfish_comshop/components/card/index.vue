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
    width: 100%;
    border-radius: 10px;
    background: #fff;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
</style>
