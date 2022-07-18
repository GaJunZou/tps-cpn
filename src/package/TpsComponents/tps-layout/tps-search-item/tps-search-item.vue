<template>
  <div class="selecter-item" :style="{ width: width }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'tps-search-item',
  props: {
    width: {
      type: String,
      default: 'auto',
    },
  },
};
</script>
