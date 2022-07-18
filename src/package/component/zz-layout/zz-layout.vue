<template>
  <div class="zz-container" ref="zzcontainer" :style="{ height: height }">
    <slot name="search-bar"></slot>
    <slot name="table"></slot>
    <div class="zz-pagination" v-if="showPagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="initPaginationConfig.currentPage"
        :page-sizes="initPaginationConfig.pageSizes"
        :page-size="initPaginationConfig.pageSize"
        :layout="initPaginationConfig.layout"
        :total="initPaginationConfig.total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
/**
 * 引用该组件可以构建响应式的搜索页面，即search-bar固定，pagination固定后table bady高度响应式变化
 * 因为暂未做好适配，请务必传入slot:search-bar和slot:table
 */
import { debounce } from '../../util.js';
export default {
  name: 'zz-layout',
  data() {
    return {
      searchBar: null,
      debounce: null,
      initPaginationConfig: {
        currentPage: 1,
        pageSizes: [50, 100, 300, 500],
        pageSize: 50,
        total: 500,
        layout: 'total, sizes, prev, pager, next, jumper',
      },
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
    paginationConfig: {
      type: Object,
    },
  },
  mounted() {
    for (const [key, value] of Object.entries(this.paginationConfig)) {
      this.initPaginationConfig[key] = value;
    }
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
        tableBody.className += tableBody.className.includes('zz-scroller') ? '' : ' zz-scroller';
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

<style lang="less">
@import url('../../common.less');
.zz-container {
  display: flex;
  flex-direction: column;
}
.zz-multiple-table {
  width: 100%;
  .el-table__body-wrapper {
    // height: 760px;
    overflow-y: scroll;
  }
}
.zz-pagination {
  .el-pagination {
    margin: 10px;
    float: right;
    white-space: nowrap;
    padding: 2px 10px;
    color: #303133;
    font-weight: 700;
  }
}
</style>
