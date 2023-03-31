<template>
  <div class="tps-checkbox-list tps-cpn">
    <el-popover placement="bottom" trigger="click" @after-leave="afterLeave">
      <div class="sales-select">
        <div class="sales-select-label">
          <el-input
            style="width: 200px"
            clearable
            v-model="searchValue"
            placeholder="请输入搜索内容"
            @input="debounceSearch"
            @keyup.enter.native="search"
          ></el-input>
          <el-button type="primary" plain @click="clearSelect()">清除</el-button>
          <el-button v-if="multiple" type="primary" @click="selectAll(true)">全选</el-button>
        </div>
        <tps-checkbox-panel
          ref="checkboxPanel"
          :key="key"
          :multiple="multiple"
          :options="pageOptions"
          :rowsWidth="rowsWidth"
          :rowsCount="rowsCount"
          v-model="pageOptions"
          @change="checkboxPanelChange"
        ></tps-checkbox-panel>
        <div class="sales-select-pagination">
          <el-pagination
            ref="pagination"
            @current-change="handleCurrentChange"
            :page-size="pageSize"
            :current-page="currentPage"
            layout="prev, pager, next, jumper"
            :total="total"
            hide-on-single-page
          ></el-pagination>
        </div>
      </div>
      <div slot="reference" class="tps-cpn" :style="{ width: width }" @click="$refs.input.blur()">
        <el-input
          ref="input"
          clearable
          class="select-content"
          :placeholder="placeholder"
          suffix-icon="el-icon-arrow-down"
          v-model="checkedString"
          @clear="clearSelect()"
        >
          <template v-if="label" slot="prepend">{{ label }}</template>
          <template slot="prepend" v-else>
            <slot name="prepend"></slot>
          </template>
          <template v-if="multiple" slot="append">{{ checkedList.length }}项</template>
        </el-input>
      </div>
    </el-popover>
  </div>
</template>

<script>
import { debounce } from '@/utils/util';
export default {
  data() {
    return {
      debounceSearch: null,
      pageOptions: [],
      searchOptions: [],
      currentPage: 1,
      checkedList: [],
      checkedString: '',
      key: 0,
      searchValue: '',
      total: 0,
    };
  },
  model: {
    // v-model 的 props
    event: 'change',
    prop: 'inputData',
  },
  props: {
    // 原本的props
    options: {
      // options 数组必须带有value和label属性
      type: Array,
      required: true,
    },
    placeholder: {
      type: String,
      default: '请选择...',
    },
    rowsCount: {
      type: Number,
      default: 4,
    },
    rowsWidth: {
      type: String,
      default: 'auto',
    },
    width: {
      type: String,
      default: null,
    },
    label: {
      type: String,
      default: null,
    },
    pageSize: {
      type: Number,
      default: 60,
    },
    multiple: {
      type: Boolean,
      default: true,
    },
    inputData: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    options: {
      handler() {
        this.init();
      },
      deep: true,
    },
    inputData: {
      handler(inputData) {
        const checkedList = [];
        const options = this.options || [];
        options.forEach((v) => {
          if (inputData.includes(v.value)) {
            v.checked = true;
            checkedList.push(v);
          } else {
            v.checked = false;
          }
        });
        this.checkedList = checkedList;
        this.checkedString = this.checkedList.map((v) => v.label).join(',');
        this.$refs.checkboxPanel.updateView();
      },
      deep: true,
    },
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.debounceSearch = debounce(this.search, 500);
      const options = this.options || [];
      const checkedList = [];
      options.forEach((v) => {
        if (this.inputData.includes(v.value)) {
          v.checked = true;
          checkedList.push(v);
        } else {
          v.checked = false;
        }
      });
      this.checkedList = checkedList;
      this.handleCurrentChange(1);
      this.emit();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      let options = [];
      if (this.searchValue.trim()) {
        // 搜索模式下 仅显示搜索结果
        options = this.searchOptions;
      } else {
        // 否则显示全部结果
        options = this.options;
      }
      this.getCurrentOptions(options);
      this.key++;
    },

    getCurrentOptions(options) {
      this.total = options.length;
      const pageOptions = options.filter((_, i) => {
        const start = (this.currentPage - 1) * this.pageSize - 1;
        const end = this.currentPage * this.pageSize;
        if (start < i && i < end) {
          return true;
        } else {
          return false;
        }
      });
      this.pageOptions = pageOptions;
    },

    checkboxPanelChange(e) {
      // checkbox选中时
      if (this.multiple) {
        const options = this.options || [];
        const checkedList = options.filter((v) => v.checked);
        this.checkedList = checkedList;
        this.emit();
      } else {
        this.checkedList = e.filter((v) => v.checked);
        this.emit();
      }
    },

    search() {
      this.currentPage = 1;
      const text = this.searchValue.trim().toUpperCase();
      this.searchOptions = this.options.filter((v) => v.label.trim().toUpperCase().includes(text));
      this.getCurrentOptions(this.searchOptions);
      this.key++;
    },

    selectAll(checked) {
      // 当前页全选或清空
      this.pageOptions.forEach((v) => (v.checked = checked));
      this.checkboxPanelChange();
      this.key++;
    },

    clearSelect() {
      // 全部清空
      this.searchValue = '';
      this.currentPage = 1;
      this.getCurrentOptions(this.options);
      this.checkedList.forEach((v) => (v.checked = false));
      this.checkedList = [];
      this.key++;
      this.emit();
      this.chearHandle();
    },
    emit() {
      this.checkedString = this.checkedList.map((v) => v.label).join(',');
      this.$emit(
        'change',
        this.checkedList.map((v) => v.value)
      );
    },
    afterLeave() {
      this.$emit(
        'after-leave',
        this.checkedList.map((v) => v.value)
      );
    },
    chearHandle() {
      this.$emit('clear', []);
    },
  },
};
</script>

<style scoped lang="less">
@import url('./tps-checkbox-list.less');
</style>
