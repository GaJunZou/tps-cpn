import Vue from 'vue';
import App from './App.vue';
import ZzCpn from '@/package';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false;
Vue.use(ZzCpn);
Vue.use(ElementUI, { size: 'small' });
new Vue({
  render: (h) => h(App),
}).$mount('#app');
