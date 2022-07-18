<template>
  <div>
    <el-popover placement="bottom" trigger="click">
      <div>
        <div class="sel-header">
          <el-input
            clearable
            class="head-input"
            v-model="searchValue"
            placeholder="请输入搜索内容"
            @input="debounceSearch"
          ></el-input>
          <el-button
            class="head-btn"
            type="primary"
            plain
            @click="
              allSelect(false);
              clearSelect();
            "
          >
            清除
          </el-button>
          <el-button class="head-btn" type="primary" @click="allSelect(true)">全选</el-button>
        </div>
        <div class="sel-content zz-scroller">
          <div v-for="(value, index) in options_" :key="index">
            <div
              v-show="value[fieldConfig.children].length !== 0 && !value.hidden"
              class="father-box"
              :class="{ unexpand: !value.expand }"
            >
              <div class="father-label" @click="value.expand = !value.expand">
                <el-checkbox
                  :indeterminate="value.indeterminate"
                  v-model="value.checked"
                  @change="groupChange($event, index)"
                >
                  <span class="label-text">{{ value[fieldConfig.label] }}</span>
                </el-checkbox>
                <span style="width: 100%"><el-divider></el-divider></span>
                <i
                  :class="{
                    'label-icon': true,
                    'el-icon-arrow-up': value.expand,
                    'el-icon-arrow-down': !value.expand,
                  }"
                ></i>
              </div>
              <zz-checkbox-panel
                ref="checkboxPanel"
                :options="value[fieldConfig.children]"
                :rowsWidth="rowsWidth"
                :rowsCount="rowsCount"
                v-model="value[fieldConfig.children]"
                @change="checkboxChange($event, index)"
              ></zz-checkbox-panel>
            </div>
          </div>
        </div>
      </div>
      <div slot="reference" class="com-input zz-cpn" :style="{ width: width }" @click="$refs.input.blur()">
        <el-input clearable ref="input" :placeholder="placeholder" :size="size" v-model="checkedListString">
          <template v-if="label" slot="prepend">{{ label }}</template>
          <template slot="append">{{ checkedList.length }}项</template>
        </el-input>
      </div>
    </el-popover>
  </div>
</template>
<script>
// 如果父组件在created时给v-model赋值而在mounted时才传入options，最终会没有绑定上该选中项。
// v-model 再父组件上发生改变时，组件状态不会实时更新。
import { debounce } from '../../util';
export default {
  name: 'zz-group-list',
  data() {
    return {
      debounceSearch: null,
      options_: [],
      checkedList: [],
      checkedListString: '',
      searchValue: '',
      gridConfig: {},
    };
  },
  model: {
    // 表单属性的props
    prop: 'inputData',
    event: 'change',
  },
  props: {
    // 原本的props
    options: {
      type: Array,
      required: true,
    },
    fieldConfig: {
      type: Object,
      default: () => {
        return {
          value: 'value',
          label: 'label',
          children: 'children',
        };
      },
    },
    placeholder: {
      /* 选择器的placeholder */
      type: String,
      default: '请选择...',
    },
    size: {
      /* 选择器的size */
      type: String,
      default: 'small',
    },
    label: {
      /* 选择器头部的说明文字 */
      type: String,
      default: '',
    },
    width: {
      /* 选择器整体的宽 */
      type: String,
      default: '200px',
    },
    rowsCount: {
      /* 一行允许item数 */
      type: Number,
      default: 4,
    },
    rowsWidth: {
      /* 每一个item的宽，默认跟随item宽度 */
      type: String,
      default: 'auto',
    },
    inputData: {
      type: Array,
      default: () => [],
    },
    expand: {
      type: Boolean,
      default: false,
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
      handler(value) {
        this.options_.forEach((v) => {
          v[this.fieldConfig.children].forEach((vv) => {
            vv.checked = value.includes(vv[this.fieldConfig.value]);
          });
          this.setIndeterminated(v);
        });
        this.checkedList = this.getCheckedFormOptions();
        this.checkedListString = this.checkedList.map((v) => v[this.fieldConfig.label]).join(',');
      },
    },
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.debounceSearch = debounce(this.search, 500);
      const options = JSON.parse(JSON.stringify(this.options || []));
      options.forEach((v) => {
        v.expand = this.expand;
        v.hidden = false;
        v[this.fieldConfig.children].forEach((vv) => {
          vv.hidden = false;
          vv.checked = this.inputData.includes(vv[this.fieldConfig.value]);
        });
        this.setIndeterminated(v);
      });
      this.options_ = options;
      this.checkboxChange(null, 0);
    },
    setIndeterminated(father) {
      // 设置父节点的选中状态
      if (father) {
        const checkedLen = father[this.fieldConfig.children].filter((v) => v.checked).length;
        father.checked = father[this.fieldConfig.children].length === checkedLen;
        father.indeterminate = checkedLen === 0 || father.checked ? false : true;
      }
    },

    checkboxChange(_, index) {
      // 选中或取消子节点的项时
      this.checkedList = this.getCheckedFormOptions();
      this.setIndeterminated(this.options_[index]);
      const valueString = [];
      const valueList = [];
      this.checkedList.forEach((v) => {
        valueString.push(v[this.fieldConfig.label]);
        valueList.push(v[this.fieldConfig.value]);
      });
      this.checkedListString = valueString.join(',');
      this.$emit('change', valueList);
    },

    groupChange(event, index) {
      // 选中或取消选中父节点时
      this.options_[index][this.fieldConfig.children].forEach((v) => {
        if (!v.hidden) {
          v.checked = event;
        }
      });
      this.checkboxChange(null, index);
    },

    getCheckedFormOptions() {
      // 获取所有选中的项
      const options = [];
      this.options_.forEach((v) => {
        options.push(v[this.fieldConfig.children].filter((vv) => vv.checked));
      });
      return options.flat();
    },

    search() {
      // 搜索
      const text = this.searchValue.trim().toUpperCase();
      const checkboxPanelList = this.$refs.checkboxPanel;
      checkboxPanelList.forEach((v, i) => {
        const result = v.search(text);
        this.options_[i].hidden = !result.length;
      });
    },
    clearSelect() {
      // 清除所有选中项
      this.searchValue = '';
      this.search();
    },

    allSelect(checked) {
      // 选中全部显示出来的选项
      this.options_.forEach((_, i) => {
        this.groupChange(checked, i);
      });
    },
  },
};
</script>

<style scoped lang="less">
@import url('./zz-group-list.less');
@import url('../../common.less');
</style>
