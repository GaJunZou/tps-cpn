组合式表单组件,使内部组件紧凑排列，仅适用于 Element - Form 组件 以及 该库中的表单组件

```html
<template>
  <div>
    <div v-compact>
      <el-select clearable placeholder="创建人" v-model="value">
        <el-option label="餐厅名" value="1"></el-option>
      </el-select>
      <tps-checkbox-list :options="[]" v-model="ids"></tps-checkbox-list>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        value: '',
        ids: [],
      };
    },
  };
</script>
```
