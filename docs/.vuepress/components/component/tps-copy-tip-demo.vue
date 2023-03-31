<template>
  <div>
    <tps-copy-tip :copyValue="copyvalue * 10" :tip="'点击复制：' + copyvalue" question @copy="afterValue = $event">
      <h2>这是内容</h2>
    </tps-copy-tip>
    <h2>复制后的值： {{ afterValue }}</h2>
  </div>
</template>
<script>
export default {
  data() {
    return {
      copyvalue: 3.14159,
      afterValue: null,
    };
  },
};
</script>
