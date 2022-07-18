<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
}
</script>

<style>
.container {
  border: 1px solid #eee;
  padding: 10px;
  margin: 20px 10px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  min-height: 100px;
}
</style>