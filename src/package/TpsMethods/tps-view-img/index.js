import Vue from 'vue';
import ViewImg from './view-img.vue';
export default function (config) {
  const ImageViewConstructor = Vue.extend(ViewImg);

  let instance = new ImageViewConstructor({
    propsData: {
      imageList: config,
    },
  });
  instance.visiable = true;
  instance = instance.$mount();
  document.body.appendChild(instance.$el);
}
