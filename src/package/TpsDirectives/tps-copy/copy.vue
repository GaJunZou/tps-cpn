<template>
  <div>
    <el-tooltip class="item" :content="prepend + value" :effect="theme" placement="top">
      <span @click="copy">{{ value }}</span>
    </el-tooltip>
  </div>
</template>
<script>
export default {
  props: {
    value: [String, Number],
    prepend: [String],
    theme: {
      type: String,
      default: 'light',
    },
  },
  methods: {
    copy() {
      const ele = document.createElement('input');
      document.body.append(ele);
      ele.value = this.value;
      ele.select();
      // lib.dom.d.ts(4605, 8): 该声明曾在此处标记为已弃用。
      document.execCommand('Copy');
      document.body.removeChild(ele);
      this.$message({
        message: '复制成功！',
        type: 'success',
        duration: 1000,
      });
    },
  },
};
</script>
