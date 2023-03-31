<template>
  <el-select
    :popper-class="'tps-select-popper_' + unique"
    :style="{ width: width }"
    v-model="selectValue"
    :placeholder="placeholder"
    filterable
    :allow-create="allowCreate"
    :filter-method="filterMethod"
    @change="selectChange"
  >
    <el-option
      v-for="item in getOptions"
      :key="field ? item[field.valueField] : item"
      :label="field ? item[field.labelField] : item"
      :value="field ? item[field.valueField] : item"
    ></el-option>
  </el-select>
</template>

<script>
import { isNotEmpty, getUnique } from '@/utils/util';
export default {
  model: {
    prop: 'inputData',
    event: 'change',
  },
  props: {
    loadCount: {
      type: Number,
      default: 20,
    },
    allowCreate: {
      type: Boolean,
      default: false,
    },
    field: {
      type: Object,
      default: () => {},
    },
    inputData: {
      default: null,
    },
    options: {
      type: Array,
      default: () => [],
    },
    placeholder: {
      type: String,
      default: '请选择',
    },
    width: {
      type: String,
      default: '160px',
    },
  },
  watch: {
    inputData: {
      handler(value) {
        this.selectValue = value;
      },
      deep: true,
      immediate: true, // watch不会监听props第一次传值，需要使用immediate: true才能监听到
    },
  },
  data() {
    let unique = getUnique();
    return {
      loadOptions: [],
      filterOptions: [],
      selectValue: null,
      loadIndex: 0,
      unique: unique,
      mode: '',
    };
  },
  computed: {
    getOptions() {
      if (this.mode === 'filter') {
        return this.filterOptions;
      } else {
        return this.loadOptions;
      }
    },
  },
  mounted() {
    this.loadOptions = this.options.slice(this.loadIndex, this.loadCount);
    this.$nextTick(() => {
      let ele = document.querySelector(`.tps-select-popper_${this.unique} .el-select-dropdown__wrap`);
      ele.addEventListener('scroll', (e) => {
        this.scrollToLoad(e);
      });
    });
  },
  methods: {
    scrollToLoad(e) {
      if (this.mode === 'filter') {
        return;
      }
      let temp = e.target;
      if (temp.scrollHeight - temp.scrollTop - temp.clientHeight < 20) {
        this.loadIndex++;
        let res = this.options.slice(this.loadIndex * this.loadCount, this.loadIndex * this.loadCount + this.loadCount);
        this.loadOptions.push(...res);
      }
    },
    filterMethod(str) {
      if (isNotEmpty(str)) {
        this.mode = 'filter';
        const filterOptions = this.options.filter((v) => {
          let label;
          if (this.field) {
            label = v[this.field.labelField];
          } else {
            label = v;
          }
          return label.toLowerCase().includes(str.toLowerCase());
        });
        if (filterOptions.length > 0) {
          this.filterOptions = filterOptions;
        }
      } else {
        this.mode = '';
      }
    },
    selectChange() {
      this.$emit('change', this.selectValue);
    },
  },
};
</script>
