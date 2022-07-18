<template>
  <div class="root">
    <div class="sales-select-option">
      <div class="select-group" :key="key" :style="gridConfig">
        <div v-for="(item, index) in panelOptions" :key="index" v-show="!item.hidden">
          <el-checkbox v-model="item.checked" :checked="item.checked" @change="valueChange">
            {{ item[fieldConfig.label] }}
          </el-checkbox>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'zz-checkbox-panel',
  model: {
    // v-model 的 props
    event: 'change',
    prop: 'inputData',
  },
  data() {
    return {
      panelOptions: [],
      gridConfig: {},
      key: 0,
    };
  },
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    rowsCount: {
      type: Number,
      default: 4,
    },
    rowsWidth: {
      type: String,
      default: 'auto ',
    },
    inputData: {
      type: Array,
      default: () => [],
    },
    deep: {
      type: Boolean,
      default: true,
    },
    fieldConfig: {
      type: Object,
      default: () => {
        return {
          value: 'value',
          label: 'label',
        };
      },
    },
  },
  mounted() {
    if (this.deep) {
      this.panelOptions = this.options;
    } else {
      this.panelOptions = JSON.parse(JSON.stringify(this.options));
    }
    this.valueChange();
    this.gridConfig = {
      gridTemplateColumns: (this.rowsWidth + ' ').repeat(this.rowsCount),
    };
  },
  methods: {
    valueChange() {
      this.updateView();
      this.$emit('change', this.panelOptions);
    },
    search(text) {
      const result = [];
      this.panelOptions.forEach((v) => {
        if (v[this.fieldConfig.label].trim().toUpperCase().includes(text)) {
          v.hidden = false;
          result.push(v);
        } else {
          v.hidden = true;
        }
      });
      return result;
    },
    updateView() {
      this.key++;
    },
    clear() {
      this.search('');
    },
  },
};
</script>

<style lang="less" scoped>
@import url('./zz-checkbox-panel.less');
</style>
