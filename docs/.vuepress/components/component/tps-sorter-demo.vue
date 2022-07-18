<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="age" label="年龄">
        <template slot-scope="scope">
          <span>{{ scope.row.age }}</span>
          <tps-sorter @asc="sorter" @desc="sorter"></tps-sorter>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          age: '12',
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          age: '16',
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          age: '14',
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          age: '21',
        },
      ],
    };
  },
  methods: {
    sorter(event) {
      if (event === 'asc') {
        this.tableData = this.tableData.sort((a, b) => a.age - b.age);
      } else if (event === 'desc') {
        this.tableData = this.tableData.sort((a, b) => b.age - a.age);
      }
    },
  },
};
</script>
