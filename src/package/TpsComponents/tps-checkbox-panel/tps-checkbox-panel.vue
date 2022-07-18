<template>
  <div class="root">
    <div class="sales-select-option">
      <div v-if="multiple" class="select-group" :key="key" :style="gridConfig">
        <div v-for="(item, index) in panelOptions" :key="index" v-show="!item.hidden">
          <el-checkbox v-model="item.checked" :checked="item.checked" @change="valueChange">
            {{ item[fieldConfig.label] }}
          </el-checkbox>
        </div>
      </div>
      <div v-if="!multiple" :key="key">
        <el-radio-group v-model="singleModel" class="radio-group" :style="gridConfig" @change="valueChange">
          <el-radio v-for="(item, index) in panelOptions" :key="index" :label="item.value" v-show="!item.hidden">
            {{ item[fieldConfig.label] }}
          </el-radio>
        </el-radio-group>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tps-checkbox-panel',
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
      singleModel: null,
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
    multiple: {
      type: Boolean,
      default: true,
    },
  },
  mounted() {
    if (this.deep) {
      this.panelOptions = this.options;
    } else {
      this.panelOptions = JSON.parse(JSON.stringify(this.options));
    }
    if (!this.multiple) {
      const firstChecked = this.panelOptions.find((v) => v.checked);
      this.valueChange(firstChecked ? firstChecked.value : null, false);
    }
    this.gridConfig = {
      gridTemplateColumns: (this.rowsWidth + ' ').repeat(this.rowsCount),
    };
  },
  methods: {
    valueChange(value, emit = true) {
      if (!this.multiple) {
        this.panelOptions.forEach((v) => {
          if (v[this.fieldConfig.value] === value) {
            v.checked = true;
            this.singleModel = value;
          } else {
            v.checked = false;
          }
        });
      }
      this.updateView();
      if (emit) {
        this.$emit('change', this.panelOptions);
      }
    },
    clearChecked() {
      this.singleModel = null;
      this.panelOptions.forEach((v) => {
        v.checked = false;
      });
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
@import url('./tps-checkbox-panel.less');
</style>
