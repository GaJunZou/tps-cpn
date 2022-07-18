<template>
  <div class="zz-tree-selector">
    <div v-if="showSearch">
      <el-input
        clearable
        class="head-input"
        size="mini"
        v-model="searchValue"
        placeholder="请输入搜索内容,按回车搜索"
        suffix-icon="el-icon-search"
        @clear="showSearchPanel = false"
        @keyup.enter.native="search"
      ></el-input>
      <el-button size="mini" type="primary" @click="search">搜索</el-button>
      <el-button size="mini" @click="clearSelect">清空</el-button>
    </div>
    <div class="zz-tree-wrapper zz-scroller" v-show="!showSearchPanel" ref="treeWrapper">
      <ul
        v-for="pageNo in pageCount"
        :key="pageNo"
        class="zz-tree-content zz-scroller"
        :style="{
          height: styleConfig.bodyHeight,
          width: styleConfig.pageWidth,
        }"
      >
        <li class="zz-tree-list" v-for="(vv, ii) in pageOptions[pageNo - 1]" :key="ii">
          <div class="zz-item" :style="{ backgroundColor: vv.active ? '#e7effc' : '' }">
            <el-checkbox v-model="vv.checked" :indeterminate="vv.indeterminate" @change="check($event, vv, pageNo)">
              {{ vv[fieldConfig.name] }}
            </el-checkbox>
            <i v-if="vv[fieldConfig.childrens].length > 0" class="el-icon-caret-right" @click="expand(ii, pageNo)"></i>
          </div>
        </li>
      </ul>
    </div>
    <div v-show="showSearchPanel" class="zz-tree-wrapper zz-scroller">
      <div v-show="searchResultList.length === 0">
        <el-empty description="没有啦~"></el-empty>
      </div>
      <div v-show="searchResultList.length !== 0">
        <el-checkbox class="check-all" v-model="checkAll" :indeterminate="checkStatus" @change="checkAllSearch">
          全选
        </el-checkbox>
        <ul class="zz-list-content zz-scroller">
          <li class="zz-tree-list" v-for="(val, index) in searchResultList" :key="index">
            <div class="zz-item" :style="{ backgroundColor: val.active ? '#e7effc' : '' }">
              <el-checkbox
                v-model="val.checked"
                :indeterminae="val.indeterminate"
                @change="
                  check($event, val);
                  changeStatus();
                "
              >
                {{ val.path }}
              </el-checkbox>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div
      v-if="showFooter && checkedList.length"
      :style="{ maxHeight: styleConfig.footerHeight, width: footerWidth }"
      class="show-checked zz-scroller"
    >
      <div class="show-checked-title">已选{{ checkedList.length }}项：</div>
      <el-tag v-for="(tag, index) in checkedList" :key="index" closable @close="handleClose(index)">
        {{ tag[fieldConfig.name] }}
      </el-tag>
    </div>
  </div>
</template>

<script>
/**
 * indeterminate = true -》一部分
 * indeterminate = false -》不选或全选
 *    v-model = true -》 全选
 *    v-model = false -》不选
 */

/**
 * 1. 尚未限制单选
 * 2. checkbox状态样式显示有问题
 * 3. 不展开，直接选择根节点，footer的width会是100%
 */
export default {
  name: 'zz-tree-selector',
  data() {
    return {
      searchValue: '',
      options_: [],
      checkedList: [],
      pageCount: 1,
      pageOptions: [],
      visiable: false,
      searchResultList: [],
      showSearchPanel: false,
      checkAll: false,
      checkStatus: false,
      count: 0,
      footerWidth: '',
    };
  },
  model: {
    // 表单属性的props
    prop: 'inputData',
    event: 'change',
  },
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
    showFooter: {
      type: Boolean,
      default: true,
    },
    fieldConfig: {
      type: Object,
      dafault: () => {
        return {
          id: 'id',
          name: 'name',
          childrens: 'childrens',
        };
      },
    },
    styleConfig: {
      type: Object,
      default: () => {
        return {
          bodyHeight: '520px',
          pageWidth: '250px',
          footerHeight: '100px',
        };
      },
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.calcFooterWidth();
    });
  },
  created() {
    this.initStyleConfig();
    this.options_ = JSON.parse(JSON.stringify(this.options));
    this.init(this.options_, this.inputData);
    this.pageOptions = [this.options_];
  },
  methods: {
    calcFooterWidth() {
      const treeWrapper = this.$refs.treeWrapper;
      this.footerWidth = treeWrapper.clientWidth + 'px';
    },
    initStyleConfig() {
      const obj = {
        bodyHeight: '520px',
        pageWidth: '250px',
        footerHeight: '100px',
      };
      let numb;
      if (this.styleConfig.pageWidth) {
        numb = this.styleConfig.pageWidth.split('px')[0];
        numb = numb >= 200 ? numb : 200;
      }
      this.styleConfig.pageWidth = numb + 'px';
      this.styleConfig.bodyHeight = this.styleConfig.bodyHeight ? this.styleConfig.bodyHeight : obj.bodyHeight;
      this.styleConfig.footerHeight = this.styleConfig.footerHeight ? this.styleConfig.footerHeight : obj.footerHeight;
    },
    init(data, idList) {
      let list;
      let father;
      if (Array.isArray(data)) {
        list = data;
        father = {
          // [this.fieldConfig.childrens]: []
        };
      } else {
        list = data[this.fieldConfig.childrens];
        father = data;
      }
      for (let index = 0; index < list.length; index++) {
        this.count++;
        const element = list[index];
        element['expand'] = false;
        element['hidden'] = false;
        element['active'] = false;
        element[this.fieldConfig.childrens] = element[this.fieldConfig.childrens]
          ? element[this.fieldConfig.childrens]
          : [];
        element['isLeaf'] = element[this.fieldConfig.childrens].length === 0;
        element['path'] = `${father.path ? father.path + '>' : ''}${element[this.fieldConfig.name]}`;
        element['level'] = father['level'] === undefined ? 1 : father['level'] + 1;
        if (idList.includes(element[this.fieldConfig.id])) {
          element.checked = true;
          this.checkedList.push(element);
          const checkedNum = father[this.fieldConfig.childrens].filter((v) => v.checked).length;
          if (checkedNum === father[this.fieldConfig.childrens].length) {
            // 全选
            father.indeterminate = false;
          } else if (checkedNum === 0) {
            // 全不选
            father.checked = false;
            father.indeterminate = false;
          } else {
            // 选一部分
            father.indeterminate = true;
          }
        } else {
          element['checked'] = false;
        }
        const subList = element[this.fieldConfig.childrens];
        if (subList.length > 0) {
          this.init(element, idList);
        }
      }
    },
    check(status, current, pageNo) {
      // current 当前点击项
      let father;
      const obj = { [this.fieldConfig.childrens]: [], root: true };
      if (pageNo - 2 >= 0) {
        const item = this.pageOptions[pageNo - 2].find((v) => v.active);
        father = item ? item : obj;
      } else {
        father = obj;
      }
      const checkAllChildren = (list, status) => {
        const checkedNum = father[this.fieldConfig.childrens].filter((v) => v.checked).length;
        if (checkedNum === father[this.fieldConfig.childrens].length) {
          // 全选
          father.checked = true;
          father.indeterminate = false;
        } else if (checkedNum === 0) {
          // 全不选
          father.checked = false;
          father.indeterminate = false;
        } else {
          // 选一部分
          father.indeterminate = true;
        }
        for (let i = 0; i < list.length; i++) {
          const element = list[i];
          element.checked = status;
          if (element[this.fieldConfig.childrens].length > 0) {
            checkAllChildren(element[this.fieldConfig.childrens], status);
          }
        }
      };
      checkAllChildren(current[this.fieldConfig.childrens], status);
      this.updateCheckedList();
      this.pageOptions = [...this.pageOptions]; // 要重新赋值才能刷新页面
    },
    clearSelect() {
      this.init(this.options_, []);
      this.updateCheckedList();
    },
    expand(index, pageNo) {
      const options = this.pageOptions[pageNo - 1]; // 点击项所在的option数组
      const currentOption = options[index]; // 点击项
      const subList = currentOption[this.fieldConfig.childrens]; // 点击项的子数组
      if (pageNo === this.pageCount) {
        this.pageCount++;
        this.pageOptions.push(subList);
      } else {
        this.pageCount = pageNo;
        this.pageOptions.splice(pageNo, this.pageOptions.length - pageNo);
        if (!currentOption.active) {
          this.pageCount++;
          this.pageOptions.push(subList);
        }
      }
      options.forEach((v) => (v.active = false));
      currentOption.active = true;
      this.$nextTick(() => {
        this.calcFooterWidth();
      });
    },
    search() {
      const keyworld = this.searchValue.trim().toLowerCase();
      if (!keyworld) {
        this.showSearchPanel = false;
        return;
      } else {
        this.showSearchPanel = true;
      }
      const fn = (ele, keyworld) => {
        if (ele.path.trim().toLowerCase().includes(keyworld)) {
          if (ele.isLeaf) {
            ele.hidden = false;
          } else {
            ele.hidden = true;
          }
          return true;
        } else {
          return false;
        }
      };
      this.searchResultList = this.getChildrens(this.options_, null, fn, keyworld).filter((v) => !v.hidden);
      this.changeStatus();
    },
    checkAllSearch(status) {
      let idList = this.searchResultList.map((v) => {
        return v[this.fieldConfig.id];
      });
      if (status) {
        idList.push(...this.checkedList.map((v) => v[this.fieldConfig.id]));
      } else {
        idList = this.checkedList.map((v) => {
          if (!idList.includes(v[this.fieldConfig.id])) {
            return v[this.fieldConfig.id];
          }
        });
      }
      this.init(this.options_, idList);
      this.updateCheckedList();
      this.searchResultList = [...this.searchResultList];
    },
    changeStatus() {
      const searchResultList = this.searchResultList.filter((v) => v.checked);
      this.checkStatus = searchResultList.length > 0 && searchResultList.length < this.searchResultList.length;
      this.checkAll = searchResultList.length === this.searchResultList.length;
    },
    emit(data) {
      this.$emit(
        'change',
        data.map((v) => v[this.fieldConfig.id])
      );
    },
    /**
     * list: 数组，用于递归的源数据
     * field: return的字段，null时返回整个对象
     * fn: 自定义的处理函数，可用于递归时一些自定义操作例如设hidden为true；
     *     ele: 递归项的对象；
     *     arg: 额外的参数，值为getChildrens的第四个参数。
     *     return: boolean，用于判断是否选择该项作为递归结果。
     * arg: 额外的参数
     */
    getChildrens(
      list,
      field,
      fn = (ele) => {
        return ele.checked;
      },
      arg
    ) {
      let result = [];
      const recursiveList = (list) => {
        for (let i = 0; i < list.length; i++) {
          const element = list[i];
          const flag = fn(element, arg);
          if (flag) {
            result.push(field ? element[field] : element);
          }
          if (element[this.fieldConfig.childrens].length > 0) {
            recursiveList(element[this.fieldConfig.childrens]);
          }
        }
      };
      recursiveList(list);
      return result;
    },
    handleClose(index) {
      const item = this.checkedList[index];
      item.checked = false;
      this.updateCheckedList();
    },
    updateCheckedList() {
      const fn = (ele) => {
        return ele.isLeaf && ele.checked;
      };
      this.checkedList = this.getChildrens(this.options_, null, fn);
      this.emit(this.checkedList);
    },
  },
};
</script>
<style lang="less">
@import url('./zz-tree-selector.less');
</style>
