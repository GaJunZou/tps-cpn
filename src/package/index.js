import { COMPONENTS } from './TpsComponents';
import { METHODS } from './TpsMethods';
import { DIRECTIVES } from './TpsDirectives';
import { FILTER } from './TpsFilters';

export default (Vue) => {
  for (const [key, value] of Object.entries(COMPONENTS)) {
    Vue.component(key, value);
  }
  for (const [key, value] of Object.entries(METHODS)) {
    Vue.prototype[key] = value;
  }
  for (const [, value] of Object.entries(DIRECTIVES)) {
    Vue.use(value);
  }
  for (const [key, value] of Object.entries(FILTER)) {
    Vue.filter(key, value);
  }
};
