<script>
// cpn
export default {
  props: {
    params: {},
    close: null,
  },
  methods: {
    ok() {
      console.log('点击确定');
      this.close();
    },
    cancel() {
      this.close();
    },
  },
};
</script>
<template>
  <div>
    <ul>
      <li>名字: {{ params.name }}</li>
      <li>身高: {{ params.height }}</li>
      <li>体重: {{ params.weight }}</li>
    </ul>
    <div class="btn-container">
      <el-button @click="ok" class="cu-btn" type="primary">确定</el-button>
      <el-button @click="cancel" class="cu-btn" type="plain">取消</el-button>
    </div>
  </div>
</template>

<style scoped>
.btn-container {
  height: 33px;
}
.cu-btn {
  float: right;
  margin: auto 10px;
}
</style>
