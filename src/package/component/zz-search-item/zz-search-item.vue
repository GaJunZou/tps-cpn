<template>
  <div class="selecter-item" :style="{ width: width }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'zz-search-item',
  props: {
    width: {
      type: String,
      default: 'auto',
    },
  },
  mounted() {
    console.log(this.width);
  },
};
</script>
