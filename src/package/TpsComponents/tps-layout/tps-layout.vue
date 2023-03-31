<template>
  <div class="tps-container" ref="zzcontainer" :style="{ height: height }">
    <slot name="search-bar"></slot>
    <slot name="table"></slot>
    <div class="tps-pagination" v-if="showPagination">
      <el-pagination
        :key="key"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        :layout="layout"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
/**
 * 引用该组件可以构建响应式的搜索页面，即search-bar固定，pagination固定后table bady高度响应式变化
 * 请务必传入slot:search-bar和slot:table
 */
import { debounce } from '@/utils/util';
export default {
  name: 'tps-layout',
  data() {
    return {
      key: 0,
      searchBar: null,
      debounce: null,
    };
  },
  props: {
    height: {
      type: String,
      default: 'auto',
    },
    showPagination: {
      type: Boolean,
      default: true,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 50,
    },
    total: {
      type: Number,
      default: 500,
    },
    pageSizes: {
      type: Array,
      default: () => {
        return [50, 100, 300, 500];
      },
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper',
    },
  },
  mounted() {
    this.debounce = debounce(this.handlerWindowSize, 100);
    this.$nextTick(() => {
      this.handlerWindowSize();
      window.addEventListener('resize', this.debounce);
      const group = this.$refs.zzcontainer.children[0].querySelector('.selecter-item-group');
      let observer = new MutationObserver(() => {
        this.handlerWindowSize();
      });
      observer.observe(group, {
        attributes: true,
        attributeFilter: ['style'],
        attributeOldValue: true,
      });
      this.handlerWindowSize();
    });
  },
  methods: {
    handlerWindowSize() {
      try {
        const zzcontainer = this.$refs.zzcontainer;
        const searchBar = zzcontainer.children[0];
        const table = zzcontainer.children[1];
        const pagination = zzcontainer.children[2];
        const tableBody = table.querySelector('.el-table__body-wrapper');
        tableBody.className += tableBody.className.includes('tps-scroller') ? '' : ' tps-scroller';
        const searchBarHeight = searchBar.clientHeight;
        const paginationHeight = pagination ? pagination.clientHeight : 0;
        const tableHeaderHeight = table.querySelector('.el-table__header-wrapper')?.clientHeight;
        const height = zzcontainer.parentElement.clientHeight - searchBarHeight - paginationHeight - tableHeaderHeight;
        tableBody.style.height = height + 'px';
      } catch (error) {}
    },
    handleSizeChange($event) {
      this.$emit('size-change', $event);
    },
    handleCurrentChange($event) {
      this.$emit('current-change', $event);
    },
  },
};
</script>

<style lang="less" scoped>
@import url('../common.less');
@import url('./tps-layout.less');
</style>
