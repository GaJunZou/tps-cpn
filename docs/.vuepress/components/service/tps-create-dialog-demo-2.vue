<template>
  <div>
    <ul>
      <li>名字: {{ params.name }}</li>
      <li>身高: {{ params.height }}</li>
      <li>体重: {{ params.weight }}</li>
    </ul>
    <div class="btn-container">
      <el-button @click="ok" class="cu-btn" type="primary">确定</el-button>
      <el-button @click="cancel" class="cu-btn" type="plain">关闭</el-button>
    </div>
  </div>
</template>
<script>
export default {
  props: ['params', 'dialog'],
  methods: {
    cancel() {
      this.dialog.methods.close();
    },
  },
};
</script>