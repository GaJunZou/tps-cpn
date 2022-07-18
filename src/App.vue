<script>
import treeData from './fake-data/treeData';
import list from './fake-data/listData';
// import groupData from "./fake-data/groupData";
export default {
  data() {
    return {
      tableData: [],
      drawer: false,
      options: list,
      key: 0,
      data: [2105],
      treeData: treeData,
      field: {
        children: 'childrens',
        label: 'categoryname',
        id: 'categoryid',
      },
    };
  },
  methods: {
    changeData() {
      this.treeData = treeData;
    },
    clean() {
      this.data = [2105, 4382, 6839];
      // this.data = []
    },
  },
};
</script>

<template>
  <div id="app">
    <button @click="changeData">init</button>
    <button @click="clean">clean</button>
    <tps-checkbox-list :options="options" v-model="data"></tps-checkbox-list>
    <!-- <tps-group-list :options="options" v-model="data"></tps-group-list> -->
    <el-popover trigger="click">
      <!-- <tps-tree :fieldConfig="field" :options="treeData" v-model="data"> </tps-tree> -->
      <el-button type="primary" slot="reference">点击打开树选择器</el-button>
    </el-popover>
    <p v-copy:light="'qweqweq'"></p>
    {{ data }}
  </div>
</template>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
  border-radius: 0px;
  background-color: #f0f2f5;
}
.icon {
  width: 1.5em;
  height: 1.5em;
  vertical-align: middle;
  fill: currentColor;
  overflow: hidden;
}
.text-btn {
  display: inline-block;
  height: 32px;
  font-size: 16px;
  line-height: 32px;
  vertical-align: middle;
  cursor: pointer;
  color: #409eff;
}
</style>
