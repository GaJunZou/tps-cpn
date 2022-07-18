<template>
  <div>
    <p class="txt-blue" v-copy:dark="data"></p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: { prepend: '点击复制：', value: '3.1415926535' },
    };
  },
};
</script>
