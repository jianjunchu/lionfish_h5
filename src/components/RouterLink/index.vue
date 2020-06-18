<template>
  <div @click="routerLink" class="i-router-class router-class" hoverClass="i-router-hover">
    <slot></slot>
  </div>

</template>

<script>
  export default {
    name: 'router-link',

    methods: {
      routerLink(t){
        console.log(t);
      }
    },
  }

</script>

<style scoped>

  .i-router-hover {
    opacity: 1;
  }
</style>
