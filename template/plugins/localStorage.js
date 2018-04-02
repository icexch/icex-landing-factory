/* eslint-disable no-shadow */
import Vue from 'vue';
import ls from '~/helpers/localStorage';

const plugin = {
  install(Vue) {
    Vue.prototype.$localStorage = ls;

    return Vue.prototype.$localStorage;
  },
};

Vue.use(plugin);

export default ({ app }) => {
  app.localStorage = ls;
};
