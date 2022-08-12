<template>
  <div>
    <div>
      <tps-checkbox-list
        :options="options"
        :placeholder="'这是placeholder'"
        :size="'small'"
        :label="'多选选择器'"
        :width="'450px'"
        :rowsCount="4"
        :pageSize="60"
        v-model="value"
      ></tps-checkbox-list>
    </div>
    <div>{{ value }}</div>
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
  mounted() {
    let i = 200;
    const options = [];
    while (i > 0) {
      options.push({
        value: (Math.random() * 10).toFixed(5),
        label: (Math.random() * 10).toFixed(5),
      });
      i--;
    }
    this.value = [options[0].value];
    this.options = options;
  },
};
</script>
