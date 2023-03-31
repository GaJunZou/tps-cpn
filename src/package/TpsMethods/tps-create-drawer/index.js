import Vue from 'vue';
import drawer from './drawer.vue';
import { isNotEmpty } from '@/utils/util';
export default function (config) {
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
  Vue.component('drawer-name', config.content);
  const props = {
    appendToBody: false,
    beforeClose: null, // 如果传入该值，需要手动实现关闭
    closeOnPressEscape: true,
    customClass: '',
    destroyOnClose: false,
    modal: true,
    modalAppendToBody: true,
    direction: 'rtl',
    showClose: true,
    size: '30%',
    title: '',
    visible: true,
    wrapperClosable: true,
    withHeader: true,
    /* 新增props */
    params: null, // 参数
    content: null, // dialog里面显示的内容，可以是 String，number | Object（组件） | function （render）
    customEvent: {},
  };
  const originEvent = {
    open: config.open,
    opened: config.opened,
    close: config.close,
    closed: config.closed,
  };

  for (const [key, value] of Object.entries(config)) {
    if (Object.prototype.hasOwnProperty.call(props, key)) {
      if (isNotEmpty(value)) {
        props[key] = value;
      }
    }
  }
  const ComponentConstructor = Vue.extend(drawer);
  const instance = new ComponentConstructor({
    propsData: {
      props: { ...props },
    },
  });
  for (const [key, value] of Object.entries(originEvent)) {
    if (Object.prototype.hasOwnProperty.call(config, key)) {
      instance.$on(key, value);
    }
  }
  instance.$mount();
  this.$el.appendChild(instance.$el);
  // document.body.appendChild(instance.$el);
  let { close, closed, open, opened, hidden, show } = { ...instance };
  return {
    close,
    closed,
    open,
    opened,
    hidden,
    show,
    params: instance.props.params,
  };
}
