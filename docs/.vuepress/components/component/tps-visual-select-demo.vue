<template>
  <div>
    <tps-visual-select
      :options="options"
      v-model="value"
      :field="{ valueField: 'value', labelField: 'label' }"
    ></tps-visual-select>
    选择的值：{{ value }}
  </div>
</template>
<script>
export default {
  data() {
    return {
      options: [],
      value: null,
    };
  },
  created() {
    this.options = Array(1000)
      .fill()
      .map((_, i) => {
        return {
          label: `选项${i}`,
          value: i,
        };
      });
  },
  methods: {},
};
</script>
