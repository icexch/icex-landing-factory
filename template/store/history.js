/* eslint-disable no-shadow */
import Vue from 'vue';
import { coin, namedIndex } from '../api';

const state = () => ({});

const ADD_KEY = 'ADD_KEY';
const SET_HISTORY = 'SET_HISTORY';

const getters = {};

const actions = {
  /**
   * Fetch coin or index history
   * @param commit
   * @param payload
   * @param payload.entity
   * @param payload.name - coin or index name
   * @param payload.params - xhr params
   * @returns {Promise<{interval: string, name, data}>}
   */
  async fetch({ commit, state, dispatch }, payload) {
    try {
      let response = {};

      if (payload.entity === 'coin') {
        const { data } = await coin(payload.name).fetchHistory(payload.params);
        response = data;
      } else if (payload.entity === 'index') {
        const { data } = await namedIndex(payload.name).fetchHistory(payload.params);
        response = data;
      }

      if (typeof state[response.name] === 'undefined') {
        commit(ADD_KEY, response.name);
      }

      const obj = {
        interval: response.interval || 'hour',
        name: response.name,
        data: response.data.reduce((acc, el) => {
          acc[el.timestamp] = {
            x: (el.timestamp * 1000),
            y: el.price.value,
            open: el.price.candle.open,
            high: el.price.candle.max,
            low: el.price.candle.min,
            close: el.price.candle.close,
          };

          return acc;
        }, {}),
      };

      commit(SET_HISTORY, obj);

      return obj;
    } catch (err) {
      return dispatch('notifications/addNotification', {
        type: 'error',
        text: err.message,
      }, {
        root: true,
      });
    }
  },
};

const mutations = {
  [ADD_KEY](state, key) {
    Vue.set(state, key, {});
  },
  [SET_HISTORY](state, payload) {
    Vue.set(state[payload.name], payload.interval, Object.assign(
      {},
      state[payload.name][payload.interval],
      payload.data,
    ));
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
