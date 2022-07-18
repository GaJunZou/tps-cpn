import copyCpn from './copy.vue';
export default (Vue) => {
  Vue.directive('copy', {
    bind(el, binding) {
      /* 用于初始化 */
      let copyValue = '';
      let prependText = '';
      if (typeof binding.value === 'string' || typeof binding.value === 'number') {
        copyValue = binding.value;
      } else {
        copyValue = binding.value.value;
        prependText = binding.value.prepend;
      }
      const CopyConstructor = Vue.extend(copyCpn);
      const copy = new CopyConstructor({
        propsData: {
          value: copyValue,
          prepend: prependText,
          theme: binding.arg,
        },
      }).$mount();
      el.innerHTML = null;
      copy.$el.style.cursor = 'pointer';
      el.appendChild(copy.$el);
    },
    update(el, binding) {
      /* 用于初始化 */
      let copyValue = '';
      let prependText = '';
      if (typeof binding.value === 'string' || typeof binding.value === 'number') {
        copyValue = binding.value;
      } else {
        copyValue = binding.value.value;
        prependText = binding.value.prepend;
      }
      const CopyConstructor = Vue.extend(copyCpn);
      const copy = new CopyConstructor({
        propsData: {
          value: copyValue,
          prepend: prependText,
          theme: binding.arg,
        },
      }).$mount();
      el.innerHTML = null;
      copy.$el.style.cursor = 'pointer';
      el.appendChild(copy.$el);
    },
  });
};
