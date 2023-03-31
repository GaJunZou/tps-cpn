<template>
  <div>
    <div v-if="showSearch" class="head-input">
      <el-input
        clearable
        size="mini"
        v-model="filterText"
        placeholder="请输入搜索内容,按回车搜索"
        suffix-icon="el-icon-search"
        @keyup.enter.native="debounce"
        @input="debounce"
      ></el-input>
    </div>
    <el-tree
      ref="tpsTree"
      class="tps-tree tps-scroller"
      highlight-current
      show-checkbox
      empty-text="暂无数据"
      :style="{ 'max-height': bodyMaxHeight }"
      :data="options"
      :node-key="fieldConfig.id"
      :props="fieldConfig"
      :filter-node-method="filterNode"
      @check="getCheckedNodesById"
    ></el-tree>
    <div
      v-if="showFooter && checkedLeafNode.length"
      class="show-checked tps-scroller"
      :style="{ width: footerWidth, height: footerHeight }"
    >
      <div class="show-checked-title">
        <span>已选{{ checkedLeafNode.length }}项：</span>
        <el-button type="text" style="float: right; margin: auto 10px" @click="handleClose(null)">清空已选</el-button>
      </div>
      <el-tag v-for="(tag, index) in checkedLeafNode" :key="index" closable @close="handleClose(tag)">
        {{ tag[fieldConfig.label] }}
      </el-tag>
    </div>
  </div>
</template>

<script>
import { debounce } from '@/utils/util';

export default {
  name: 'tps-tree',
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    inputData: {
      type: Array,
      default: () => [],
    },
    multiple: {
      type: Boolean,
      default: true,
    },
    showSearch: {
      type: Boolean,
      default: true,
    },
    bodyMaxHeight: {
      type: String,
      default: '600px',
    },
    showFooter: {
      type: Boolean,
      default: true,
    },
    footerHeight: {
      type: String,
      default: '100px',
    },
    fieldConfig: {
      type: Object,
      dafault: () => {
        return {
          children: 'children',
          label: 'label',
          id: 'id',
        };
      },
    },
  },
  data() {
    return {
      filterText: '',
      checkedLeafNode: [],
      footerWidth: '0px',
      debounce: null,
    };
  },
  model: {
    // 表单属性的props
    prop: 'inputData',
    event: 'change',
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
        this.$refs.tpsTree.setCheckedKeys(inputData);
      },
      deep: true,
    },
  },
  created() {
    this.appendPath(this.options, {});
    this.debounce = debounce(this.searchChange, 300);
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.$refs.tpsTree.setCheckedKeys(this.inputData);
      this.footerWidth = this.$refs.tpsTree.$el.clientWidth + 'px';
      this.getCheckedNodesById();
    },
    searchChange() {
      this.$refs.tpsTree.filter(this.filterText);
    },
    // 搜索
    filterNode(value, data) {
      if (!value) {
        return true;
      }
      value = value.trim().toUpperCase();
      return data[this.fieldConfig.label].trim().toUpperCase().indexOf(value) !== -1;
    },
    getCheckedNodesById() {
      const checkedNode = this.getCheckedNodes();
      this.checkedLeafNode = checkedNode;
      this.$emit(
        'change',
        this.checkedLeafNode.map((v) => v[this.fieldConfig.id])
      );
    },
    // 获取选中的节点
    getCheckedNodes() {
      return this.$refs.tpsTree.getCheckedNodes();
    },
    // 取消已选中
    handleClose(node) {
      if (node) {
        this.$refs.tpsTree.setChecked(node[this.fieldConfig.id], false, true);
      } else {
        this.checkedLeafNode.forEach((v) => {
          this.$refs.tpsTree.setChecked(v[this.fieldConfig.id], false, true);
        });
      }
      this.getCheckedNodesById();
    },
    // 添加 path 属性
    appendPath(list, father) {
      for (let index = 0; index < list.length; index++) {
        this.count++;
        const element = list[index];
        element['path'] = `${father.path ? father.path + '>' : ''}${element[this.fieldConfig.label]}`;
        element['disabled'] = false;
        const subList = element[this.fieldConfig.children] ? element[this.fieldConfig.children] : [];
        if (subList.length > 0) {
          this.appendPath(subList, element);
        }
      }
    },
  },
};
</script>
<style lang="less">
@import url('./tps-tree.less');
@import url('../common.less');
</style>
