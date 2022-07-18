<template>
  <div class="zz-search-bar" ref="searchBar">
    <div class="selecter-btn" ref="searchBtn">
      <el-button size="small" type="primary" @click="$emit('searchEvent')">搜索</el-button>
      <el-button size="small" @click="$emit('resetEvent')">重置</el-button>
      <el-button v-if="isExpand" class="expand-btn-group" type="text" @click="expand">
        <i v-if="!isShow" class="el-icon-arrow-down">展开</i>
        <i v-if="isShow" class="el-icon-arrow-up">收起</i>
      </el-button>
    </div>
    <div class="selecter-item-group" ref="searchList">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { debounce } from '../../util.js';
export default {
  name: 'zz-search-bar',
  data() {
    return {
      isShow: false,
      isExpand: false,
    };
  },
  mounted() {
    this.debounce = debounce(this.handlerSearchBarWidth, 100);
    window.addEventListener('resize', this.debounce);
    this.handlerSearchBarWidth();
  },
  methods: {
    handlerSearchBarWidth() {
      this.isExpand = true;
      const searchList = this.$refs.searchList;
      const btnWidth = this.$refs.searchBtn.clientWidth;
      const maxWidth = this.$refs.searchBar.clientWidth;
      if (!searchList) {
        return;
      }
      this.$nextTick(() => {
        let cumWidth = 0; // 累计width
        let index = 0; // 第一行最后一个的索引 + 1
        const searchItemList = searchList.querySelectorAll('.selecter-item');
        for (index = 0; index < searchItemList.length; index++) {
          const child = searchItemList[index];
          if (cumWidth + child.clientWidth + btnWidth > maxWidth) {
            // 这个要放到下一行，此时插入 btn
            searchList.insertBefore(this.$refs.searchBtn, child);
            break;
          } else {
            cumWidth = cumWidth + child.clientWidth;
          }
        }
        if (index === searchItemList.length) {
          // search-item 能在第一行全部显示
          this.isExpand = false;
          searchList.appendChild(this.$refs.searchBtn);
        }
      });
    },
    expand() {
      const div = this.$refs.searchList;
      if (!this.isShow) {
        div.style.height = 'auto';
        div.style.overflow = 'none';
      } else {
        div.style.height = '44px';
        div.style.overflow = 'hidden';
      }
      this.isShow = !this.isShow;
    },
  },
};
</script>

<style lang="less">
.search-bar {
  padding-bottom: 10px;
}
.search-item {
  padding: 0 10px;
  padding-top: 10px;
  .expand-btn-group {
    height: 32px;
    vertical-align: bottom;
    padding: 0;
  }
}
.selecter-item-group {
  height: 44px;
  overflow: hidden;
  text-align: left;
  margin-bottom: 10px;
}
.selecter-item,
.selecter-btn {
  display: inline-block;
  padding-left: 10px;
  margin-top: 10px;
  .el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  .input-with-select .el-input-group__append {
    background-color: #fff;
  }
}
.mix-border {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  .el-select .el-input__inner:focus {
    border-color: #dcdfe6;
  }
  .el-input__inner {
    border: none;
    border-right: 2px solid #dcdfe6;
    border-radius: 0;
  }
  .el-date-editor {
    border: none;
  }
}
</style>
