<template>
  <div>
    <el-button @click="openByJSX" size="small" type="primary"> 使用JSX </el-button>
  </div>
</template>
<script lang="jsx">
export default {
  methods: {
    openByJSX() {
      this.tpsCreateDialog({
        title: "使用JSX",
        content: h => {
          return (
            <ul>
              <li>1</li>
              <li>2</li>
              <li>3</li>
            </ul>
          );
        },
      });
    },
  },
};
</script>
