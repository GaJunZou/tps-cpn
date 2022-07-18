<template>
  <div>
    <tps-layout :height="'98vh'" :paginationConfig="{ total: 1000, pageSizes: [500] }">
      <tps-search-bar slot="search-bar" class="tps-search-bar" @searchEvent="search()" @resetEvent="reset()">
        <tps-search-item>
          <el-button type="primary">主要按钮</el-button>
        </tps-search-item>
        <tps-search-item>
          <el-input placeholder="请输入" clearable></el-input>
        </tps-search-item>
        <tps-search-item>
          <el-select clearable placeholder="请选择">
            <el-option label="餐厅名" value="1"></el-option>
          </el-select>
        </tps-search-item>
        <tps-search-item>
          <el-select clearable placeholder="请选择">
            <el-option label="餐厅名" value="1"></el-option>
          </el-select>
        </tps-search-item>
        <tps-search-item>
          <el-select clearable placeholder="是否异常">
            <el-option label="餐厅名" value="1"></el-option>
          </el-select>
        </tps-search-item>
      </tps-search-bar>

      <el-table slot="table" border :data="tableData" tooltip-effect="dark" @selection-change="handleSelectionChange()">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="order" label="单号"></el-table-column>
        <el-table-column prop="platform" label="平台号"></el-table-column>
        <el-table-column prop="price" label="价格"></el-table-column>>
        <el-table-column prop="cause" label="原因"></el-table-column>
      </el-table>
    </tps-layout>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      tableData: [],
    };
  },
  created() {
    let i = 421;
    while (i > 0) {
      this.tableData.push({
        value: (Math.random() * 10).toFixed(15),
        label: (Math.random() * 10).toFixed(15),
        price: (Math.random() * 10).toFixed(2),
        cause: (Math.random() * 10).toFixed(15),
      });
      i--;
    }
  },
  methods: {
    handleSelectionChange() {
      console.log("checked the checkedbox");
    },
    search() {
      console.log("search");
    },
    reset() {
      console.log("reset");
    },
  },
};
</script>
