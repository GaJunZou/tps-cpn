<template>
  <div class="tps-cascader">
    <el-popover
      placement="top-start"
      trigger="click"
      @after-enter="focusInput"
      :visible-arrow="false"
      :disabled="!options.length"
    >
      <div class="cascader-bar">
        <el-input ref="searchInput" clearable v-model="searchText" @keydown.enter="search"></el-input>
        <el-button v-if="lazy" type="primary" @click="search">搜索</el-button>
        <el-button type="primary" @click="clean">清空</el-button>
      </div>
      <div v-show="searchText">
        <div v-if="filterFlatOptions.length === 0">
          <el-empty description="没有啦~"></el-empty>
        </div>
        <div v-else>
          <el-checkbox
            v-if="multiple"
            class="check-all"
            v-model="checkAll"
            :indeterminate="checkStatus"
            @change="checkAllEvent"
          >
            全选
          </el-checkbox>
          <ul class="tps-list-content tps-scroller">
            <li class="tps-list" v-for="(val, index) in filterFlatOptions" :key="index">
              <div class="tps-item">
                <el-checkbox v-model="val.checked" @change="checkEvent($event, val)">
                  {{ val[fieldConfig.label] }}
                </el-checkbox>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div v-show="!searchText" class="tps-cascader-wrapper">
        <div>
          <el-cascader-panel
            lazy
            ref="tpsCascader"
            v-model="inputValue"
            :options="options"
            :props="props"
            :lazyLoad="lazyLoad"
            @expand-change="setFooterWidth"
          ></el-cascader-panel>
        </div>
        <!-- <div v-show="options.length === 0">
          <el-empty description="暂无数据"></el-empty>
        </div> -->
      </div>
      <div
        class="cascader-footer tps-scroller"
        :style="{ width: width === 0 ? '400px' : width + 'px' }"
        v-if="checkedList.length > 0"
      >
        <div>已选择 {{ checkedList.length }} 项</div>
        <el-tag v-for="(value, index) in checkedList" :key="index" closable @close="closeTag(value[fieldConfig.value])">
          {{ value[fieldConfig.label] }}
        </el-tag>
      </div>
      <div slot="reference" class="tps-cpn" @click="$refs.input.blur()">
        <el-input ref="input" :placeholder="placeholder" v-model="checkedStr" clearable @change="clean">
          <template v-if="append" slot="append">{{ append }}</template>
        </el-input>
      </div>
    </el-popover>
  </div>
</template>

<script>
export default {
  name: 'tps-cascader',
  data() {
    return {
      inputValue: [],
      searchText: '',
      data: null,
      checkedStr: '',
      checkedList: [],
      width: 250,
      // -----------------------
      flatOptions: [],
      checkAll: false,
      checkStatus: false,
      props: {
        emitPath: false,
        checkStrictly: false,
        value: 'value',
        leaf: 'leaf',
      },
    };
  },
  props: {
    value: {
      type: [Array, String, Number],
      default: null,
    },
    placeholder: {
      type: String,
      default: '请输入内容',
    },
    options: {
      type: Array,
      default: () => [],
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    expandTrigger: {
      type: String,
      default: 'click',
    },
    fieldConfig: {
      type: Object,
      default: () => {
        return {
          value: 'value',
          label: 'label',
          children: 'children',
          disabled: 'disabled',
          leaf: 'leaf',
        };
      },
    },
    currentLabel: {
      type: String,
      default: '',
    },
    lazy: {
      type: Boolean,
      default: false,
    },
    lazyLoad: {
      type: Function,
      default: () => {},
    },
    lazySearch: {
      type: Function,
      default: () => {},
    },
    append: {
      type: String,
      default: '',
    },
  },
  watch: {
    options: {
      handler() {
        this.flatOptions = this.flatMapOptions(this.options || []);
        const value = this.value;
        if (this.multiple) {
          this.inputValue = value || [];
        } else {
          if (Array.isArray(value)) {
            this.inputValue = value[0];
          } else {
            this.inputValue = value;
          }
        }
        this.$nextTick(() => this.init());
      },
      deep: true,
      immediate: true,
    },
    inputValue: {
      handler() {
        this.$nextTick(() => this.init());
      },
      immediate: true,
      deep: true,
    },
    searchText: {
      handler(val) {
        if (val && !this.lazy) {
          this.search();
        }
      },
    },
  },
  computed: {
    filterFlatOptions() {
      return this.flatOptions.filter((v) => v.show);
    },
  },
  created() {
    this.initProps();
  },
  methods: {
    init() {
      this.setFooterWidth();
      this.updateCheckboxList();
      this.getCheckedNode();
    },
    focusInput() {
      this.$nextTick(() => {
        if (!this.lazy) {
          this.$refs.searchInput.focus();
        }
      });
    },
    initProps() {
      const obj = {
        multiple: this.multiple,
        expandTrigger: this.expandTrigger,
        lazy: this.lazy,
        lazyLoad: this.lazyLoad,
        value: this.fieldConfig.value || 'value',
        label: this.fieldConfig.label || 'label',
        children: this.fieldConfig.children || 'children',
        disabled: this.fieldConfig.disabled || 'disabled',
      };
      Object.assign(this.props, obj);
    },
    flatMapOptions(list) {
      let result = [];
      const recursiveList = (list, fatherLabel) => {
        const str = fatherLabel ? fatherLabel + ' > ' : '';
        for (let i = 0; i < list.length; i++) {
          const element = list[i];
          const label = str + element[this.fieldConfig.label];
          element.checked = this.inputValue ? this.inputValue.includes(element[this.fieldConfig.value]) : false;
          if (!element[this.fieldConfig.children]) {
            result.push({
              [this.fieldConfig.value]: element[this.fieldConfig.value],
              [this.fieldConfig.label]: label,
              checked: element.checked,
              show: true,
            });
          }
          if (element[this.fieldConfig.children] && element[this.fieldConfig.children].length > 0) {
            recursiveList(element[this.fieldConfig.children], label);
          }
        }
      };
      recursiveList(list, '');
      return result;
    },
    setFooterWidth() {
      this.$nextTick(() => {
        let width = 0;
        const children = this.$refs.tpsCascader.$el.childNodes;
        for (let i = 0; i < children.length; i++) {
          width = width + children[i].clientWidth;
        }
        this.width = width;
      });
    },
    setIndeterminate() {
      /*
       if (indeterminate === true) {
          显示 - 杠
        } else {
          if (v-model === true) {
            显示 - 勾
          } else {
            显示 - 空
          }
        }
       */
      const showList = this.flatOptions.filter((v) => v.show);
      const showAndCheckList = showList.filter((v) => v.checked);
      if (showList.length > showAndCheckList.length) {
        // 没有全部选中，两种情况
        // 1，一个都不选中 - 空。
        // 2，选中部分但不是全部 - 杠。
        this.checkStatus = showAndCheckList.length !== 0;
        this.checkAll = showAndCheckList.length !== 0;
      } else if (showList.length === showAndCheckList.length) {
        // 两种情况：
        // 1，都为0 - 空。
        // 2，或都不为0且相等 - 勾。
        this.checkStatus = false;
        this.checkAll = showAndCheckList.length !== 0;
      }
    },
    updateCheckboxList() {
      if (this.multiple) {
        this.flatOptions.forEach((v) => {
          v.checked = this.inputValue.includes(v[this.fieldConfig.value]);
        });
        this.setIndeterminate();
      } else {
        this.flatOptions.forEach((v) => {
          v.checked = this.inputValue === v[this.fieldConfig.value];
        });
      }
    },
    getCheckedNode() {
      if (this.lazy && this.searchText) {
        // 懒加载且搜索
        const checkedlist = this.flatOptions.filter((v) => v.checked);
        this.emitForLazy(checkedlist.filter(Boolean));
      } else {
        const checkedList = this.$refs.tpsCascader.getCheckedNodes(true);
        this.emit(checkedList.filter(Boolean));
      }
    },
    search() {
      if (this.lazy) {
        this.lazySearch(this.searchText, (result) => {
          this.flatOptions = result;
        });
      } else {
        const text = this.searchText.trim().toUpperCase();
        this.flatOptions.forEach((v) => {
          if (v[this.fieldConfig.label].toUpperCase().includes(text)) {
            v.show = true;
          } else {
            v.show = false;
          }
        });
      }
      this.setIndeterminate();
    },
    clean() {
      this.searchText = '';
      this.inputValue = [];
    },
    closeTag(value) {
      if (this.multiple) {
        const ids = [];
        this.checkedList.forEach((v) => {
          if (v[this.fieldConfig.value] !== value) {
            ids.push(v[this.fieldConfig.value]);
          }
        });
        this.inputValue = ids;
      } else {
        this.inputValue = null;
      }
    },
    checkEvent($event, option) {
      if (this.multiple) {
        if ($event) {
          this.inputValue = [...this.inputValue, option[this.fieldConfig.value]];
        } else {
          const ids = this.flatOptions.filter((v) => v.checked).map((v) => v[this.fieldConfig.value]);
          this.inputValue = ids;
        }
      } else {
        this.inputValue = $event ? option[this.fieldConfig.value] : null;
      }
    },
    checkAllEvent($event) {
      const ids = [];
      this.flatOptions.forEach((v) => {
        if (v.show) {
          ids.push(v[this.fieldConfig.value]);
        }
      });
      if ($event) {
        this.inputValue = [...this.inputValue, ...ids];
      } else {
        const needList = [];
        this.inputValue.forEach((v) => {
          if (!ids.includes(v)) {
            needList.push(v);
          }
        });
        this.inputValue = needList;
      }
    },
    emitForLazy(list) {
      let checkedList = [];
      let checkedListStr = '';
      this.checkedList = list;
      if (this.multiple) {
        list.forEach((v) => {
          checkedList.push(v[this.fieldConfig.value]);
          checkedListStr = checkedListStr + ',' + v[this.fieldConfig.label];
        });
      } else {
        checkedList = list[0][this.fieldConfig.value] || this.inputValue;
        checkedListStr = list[0][this.fieldConfig.label];
      }
      // 如果是懒加载模式且 v-model 绑定了值，组件是无法找到对应的树节点的，所以组件显示选中只能是外部传进来的currentLabel
      this.checkedStr = checkedListStr ? checkedListStr : this.currentLabel;
      this.$emit('input', checkedList);
      this.$emit('getCheckedNode', this.checkedList);
    },
    emit(list) {
      let result;
      const checkedList = [];
      if (list.length) {
        list.forEach((v) => {
          checkedList.push({
            [this.fieldConfig.value]: v.value,
            [this.fieldConfig.label]: v.pathLabels.join(' > '),
          });
        });
      }
      if (this.multiple) {
        result = checkedList.map((v) => v[this.fieldConfig.value]);
      } else {
        result = checkedList[0] ? checkedList[0][this.fieldConfig.value] : this.inputValue;
      }
      this.checkedList = checkedList;
      const checkedStr = this.checkedList.map((v) => v[this.fieldConfig.label]).join(',');
      // 如果是懒加载模式且 v-model 绑定了值，组件是无法找到对应的树节点的，所以组件显示选中只能是外部传进来的currentLabel
      this.checkedStr = checkedStr ? checkedStr : this.currentLabel;
      this.$emit('input', result);
      this.$emit('getCheckedNode', this.checkedList);
    },
  },
};
</script>

<style lang="less">
@import url('../common.less');
@import url('./tps-cascader.less');
</style>
