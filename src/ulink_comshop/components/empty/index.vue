<template>
  <div class="none-rush-list">
    <img class="img-block" src="@/assets/images/icon-index-empty.png"></img>
    <div class="h1"><slot></slot></div>
  </div>
</template>

<script>
    export default {
        name: ""
    }
</script>

<style scoped>
  .none-rush-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-bottom: 14vw;
    padding-top: 14vw;
  }

  .none-rush-list .img-block {
    width: 24vw;
    height: 24vw;
    margin-bottom: 3vw;
  }

  .none-rush-list .h1 {
    font-size: 3.2vw;
    line-height: 3.2vw;
    color: #444;
    margin-bottom: 2vw;
  }
</style>
