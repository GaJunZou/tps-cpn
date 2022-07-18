<template>
  <div>
    <div>
      <tps-checkbox-panel 
        :options="options" 
        :rowsCount="4" 
        :rowsWidth="'200px'"
        v-model="value">
    </tps-checkbox-panel>
    </div>
    <div>已选中：{{getChecked}}</div>
  </div>
</template>

<script>
export default {
    data() {
      return {
        value: [],
        options: [],
      };
    },
    computed: {
      getChecked() {
        return this.value.filter(v => v.checked);
      }
    },
    created() {
      let i = 40;
      while (i > 0) {
        this.options.push({
          value: (Math.random() * 10).toFixed(5),
          label: (Math.random() * 10).toFixed(5),
        });
        i--;
      }
    },
};
</script>
