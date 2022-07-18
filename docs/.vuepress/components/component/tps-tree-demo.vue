<template>
  <div>
    <el-popover trigger="click">
      <tps-tree :fieldConfig="field" :options="treeData" v-model="data"> </tps-tree>
      <el-button type="primary" slot="reference">点击打开树选择器</el-button>
    </el-popover>
    <div style="height: 200px; overflow: scroll">
      {{ data }}
    </div>
  </div>
</template>
<script>
import treeData from "../../../../src/fake-data/treeData";
export default {
  data() {
    return {
      data: [],
      treeData: treeData,
      field: {
        children: "childrens",
        label: "categoryname",
        id: "categoryid",
      },
    };
  },
};
</script>
