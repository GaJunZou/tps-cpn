<template>
  <div>
    <el-button @click="openByRender" size="small" type="primary"> 使用渲染函数 </el-button>
  </div>
</template>
<script>
export default {
  methods: {
    openByRender() {
      this.tpsCreateDialog({
        title: "使用render",
        content: h => {
          return h("h1", {
            style: {
              color: "#f56c6c",
            },
            domProps: {
              innerHTML: "这是使用渲染函数打开的dialog",
            },
          });
        },
      });
    },
  },
};
</script>
