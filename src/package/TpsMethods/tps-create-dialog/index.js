import Vue from 'vue';
import dialog from './dialog.vue';
import { isNotEmpty } from '../../../utils/util';
export default (config) => {
  if (typeof config.content === 'object') {
    // no handler
  } else if (typeof config.content === 'function') {
    const content = config.content;
    config.content = {
      render(h) {
        return h('div', [content(h)]);
      },
    };
  } else {
    const content = config.content.toString();
    config.content = {
      render(h) {
        return h('div', content);
      },
    };
  }
  Vue.component('dialog-name', config.content);
  const props = {
    title: null,
    width: '50%',
    fullscreen: false,
    top: '15vh',
    modal: true,
    modalAppendToBody: true,
    appendToBody: false,
    lockScroll: true,
    customClass: null,
    closeOnClickModal: true,
    closeOnPressEscape: true,
    showClose: true,
    beforeClose: null,
    center: false,
    destroyOnClose: false,
    /* 新增props */
    params: null, // 参数
    content: null, // dialog里面显示的内容，可以是 String，number | Object（组件） | function （render）
    okText: '确定', // 确定按钮文案
    cancelText: '取消', // 取消按钮文案
    footer: true, // 是否显示 footer , 若不显示，可在 component 内自定义。此时:组件注入close方法，可用于关闭弹窗;向组件注入parmas
  };
  const originEvent = {
    open: config.open,
    opened: config.opened,
    close: config.close,
    closed: config.closed,
    onConfirm: config.onConfirm, // 点击确定时触发，回调参数为该 dialog 实例 （即this）
    onCancel: config.onCancel // 点击取消时触发，回调参数为该 dialog 实例 （即this），若不配置该函数则默认调用 close
      ? config.onCancel
      : (inst) => {
          inst.close();
        },
  };

  for (const [key, value] of Object.entries(config)) {
    if (Object.prototype.hasOwnProperty.call(props, key)) {
      if (isNotEmpty(value)) {
        props[key] = value;
      }
    }
  }
  const ComponentConstructor = Vue.extend(dialog);
  const instance = new ComponentConstructor({
    propsData: {
      props: { ...props },
    },
  });
  instance.$on('onCancel', originEvent.onCancel);
  for (const [key, value] of Object.entries(originEvent)) {
    if (Object.prototype.hasOwnProperty.call(config, key)) {
      instance.$on(key, value);
    }
  }
  instance.$mount();
  document.body.appendChild(instance.$el);
  return {
    methods: {
      close: instance.close,
      closed: instance.closed,
      open: instance.open,
      opened: instance.opened,
      confirm: instance.confirm,
      cancel: instance.cancel,
    },
    props: instance.$options.propsData.props,
  };
};
