<template>
  <div>
    <div v-compact>
      <el-select clearable placeholder="创建人">
        <el-option label="餐厅名" value="1"></el-option>
      </el-select>
      <tps-checkbox-list
        :options="[]"
        :placeholder="'来源渠道'"
        :width="'200px'"
        :rowsCount="4"
        :pageSize="60"
        :returnType="'Array'"
      ></tps-checkbox-list>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: "",
    };
  },
};
</script>
