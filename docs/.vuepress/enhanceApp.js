import 'element-ui/lib/theme-chalk/index.css';
import TpsComponent from '../../src/package';
// import 'tps-cpn/lib/tps-cpn.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
export default ({ Vue }) => {
  Vue.use(TpsComponent);
  Vue.use(ElementUI, { size: 'small' });
};
