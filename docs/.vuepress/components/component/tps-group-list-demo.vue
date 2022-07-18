<template>
  <div>
    <div>已选中：{{value}}</div>
    <tps-group-list
      v-model="value"
      :options="treeData"
      :placeholder="'这是placeholder'"
      :size="'small'"
      :label="'选择器'"
      :width="'450px'"
      :rowsCount="4"
      :rowsWidth="'auto'"
      :expand="false"
    >
    </tps-group-list>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: [],
        treeData: [
          {
            value: 1,
            label: "A",
            children: [],
          },
          {
            value: 2,
            label: "B",
            children: [],
          },
          {
            value: 3,
            label: "C",
            children: [],
          },
        ],
      };
    },
    created() {
      this.treeData.forEach(v => {
        let i = 200;
        while (i > 0) {
          v.children.push({
            value: (Math.random() * 10).toFixed(8),
            label: (Math.random() * 10).toFixed(8),
            children: [],
          });
          i--;
        }
      });
    },
  };
</script>