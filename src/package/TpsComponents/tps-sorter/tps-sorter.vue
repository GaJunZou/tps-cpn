<template>
  <div class="tps-sorter">
    <i class="el-icon-caret-top" :class="{ 'sorter-active': active === 'asc' }" @click="sort('asc')"></i>
    <i class="el-icon-caret-bottom" :class="{ 'sorter-active': active === 'desc' }" @click="sort('desc')"></i>
  </div>
</template>

<script>
export default {
  name: 'tps-sorter',
  props: {
    id: [Number, String],
  },
  data() {
    return {
      group: [],
      active: '',
      isClickSort: false,
    };
  },
  // updated() {
  //   console.log(this.active);
  //   if (!this.isClickSort) {
  //     this.active = '';
  //   }
  // },
  methods: {
    sort(value) {
      this.isClickSort = true;
      this.$emit(value, value);
      this.findSorterGroup(this.$root.$children);
      this.group.forEach((v) => (v.active = v.id === this.id ? value : ''));
      this.group = [];
      // this.$nextTick(() => {
      //   this.group.forEach((v) => (v.isClickSort = false));
      // });
    },

    findSorterGroup(children) {
      for (let index = 0; index < children.length; index++) {
        const child = children[index];
        if (child.$options.name === 'tps-sorter') {
          this.group.push(child);
        } else {
          this.findSorterGroup(child.$children);
        }
      }
    },
  },
};
</script>

<style scoped lang="less">
@import url('./tps-sorter.less');
.tps-sorter {
  display: inline-flex;
  flex-direction: column;
  vertical-align: middle;
  i {
    color: #909399;
    line-height: 8px;
    font-size: 14px;
  }
  i:hover {
    color: #66b1ff;
  }
  .sorter-active {
    color: #66b1ff;
  }
}
</style>
