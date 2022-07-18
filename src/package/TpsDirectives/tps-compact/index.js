export default (Vue) => {
  /**
   *
   * @param {*} element 元素
   * @param {*} position 元素是复合型输入框时，获取位置
   * @returns element
   */
  const getFromComponent = (element, position) => {
    /**
     * 表单组件
     * input.el-input__inner
     * el-input-group__prepend
     * el-input-group__append
     * el-color-picker__trigger
     */
    let ele;
    const zzcpn = element.querySelector('.zz-cpn');
    if (zzcpn) {
      if (position === 'L') {
        ele = element.querySelector('.el-input-group__prepend');
      } else if (position === 'R') {
        ele = element.querySelector('.el-input-group__append');
      }
      ele = zzcpn.querySelector('.el-input__inner');
    } else {
      if (position === 'L') {
        ele = element.querySelector('.el-input-group__prepend');
      } else if (position === 'R') {
        ele = element.querySelector('.el-input-group__append');
      }
      ele = element.querySelector('.el-input__inner');
    }
    if (ele) {
      return ele;
    } else {
      return element;
    }
  };
  Vue.directive('compact', {
    inserted(el) {
      el.style = 'display: inline-flex';
      let index = 0;
      for (const element of el.children) {
        if (index === 0) {
          // the first
          const ele = getFromComponent(element, 'R');
          ele.style = 'border-top-right-radius: 0; border-bottom-right-radius: 0;';
        } else if (index === el.childElementCount - 1) {
          // the last
          const ele = getFromComponent(element, 'L');
          ele.style = 'border-top-left-radius: 0; border-bottom-left-radius: 0;vertical-align: bottom;';
        } else {
          // between
          const ele = getFromComponent(element);
          ele.style = 'border-radius: 0px;';
        }
        index++;
      }
    },
  });
};
