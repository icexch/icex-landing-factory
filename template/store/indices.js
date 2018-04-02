/* eslint-disable no-shadow */
import Vue from 'vue';
import ls from '~/helpers/localStorage';
import { index, namedIndex, userIndex } from '../api';

const localStorageKeys = {
  fav: 'icex-fav-indices',
};

function checkActiveIndices() {
  const existIndices = ls.getItem('selectedIndices');
  return existIndices ? existIndices.split(',') : [];
}

// TODO: maybe add current user index fetching
const state = () => ({
  active: [],
  data: {},
  userIndices: {},
  fav: [],
  filters: [],
  history: {},
  list: [],
  userList: [],
  userIndexCoins: {},
  chosen: '',
});

const ADD_INDEX_IN_DATA = 'INDICES/ADD_INDEX_IN_DATA';
const ADD_INDEX_IN_HISTORY = 'INDICES/ADD_INDEX_IN_HISTORY';

const SET_INDICES_LIST = 'INDICES/SET_INDICES_LIST';
const ADD_INDICES_LIST_ITEM = 'INDICES/ADD_INDICES_LIST_ITEM';
const REMOVE_INDICES_LIST_ITEM = 'INDICES/REMOVE_INDICES_LIST_ITEM';

const SET_USER_INDICES_LIST = 'INDICES/SET_USER_INDICES_LIST';
const ADD_USER_INDICES_LIST_ITEM = 'INDICES/ADD_USER_INDICES_LIST_ITEM';
const REMOVE_USER_INDICES_LIST_ITEM = 'INDICES/REMOVE_USER_INDICES_LIST_ITEM';

const SET_INDEX_DATA = 'INDICES/SET_INDEX_DATA';
const SET_INDEX_VALUE = 'INDICES/SET_INDEX_VALUE';
const SET_INDEX_HISTORY = 'INDICES/SET_INDEX_HISTORY';
const SET_INDEX_COINS = 'INDICES/SET_INDEX_COINS';
const REPLACE_INDEX_COINS = 'INDICES/REPLACE_INDEX_COINS';
const SET_INDEX_CHANGE = 'INDICES/SET_INDEX_CHANGE';
const SET_INDEX_CHOOSE = 'INDICES/SET_INDEX_CHOOSE';

const ADD_FAV_INDEX = 'INDICES/SET_INDEX_CHANGE';
const REMOVE_FAV_INDEX = 'INDICES/SET_INDEX_CHANGE';

const ADD_ACTIVE_INDEX = 'INDICES/ADD_ACTIVE_INDEX';
const REMOVE_ACTIVE_INDEX = 'INDICES/REMOVE_ACTIVE_INDEX';
const RESET_ACTIVE_INDICES = 'INDICES/RESET_ACTIVE_INDICES';

const SET_USER_INDEX_COINS = 'INDICES/SET_USER_INDEX_COINS';
const DELETE_USER_INDEX_COINS = 'INDICES/DELETE_USER_INDEX_COINS';
const RESET_USER_INDEX_COINS = 'INDICES/RESET_USER_INDEX_COINS';

const getters = {};

const actions = {
  async fetchAllIndices({ commit }, params) {
    const { data } = await index().fetchAll(params);
    const list = Object.keys(data.data);
    const indexIndex = list.indexOf('ICEI10');
    if (indexIndex !== -1) {
      list.splice(indexIndex, 1);
      list.unshift('ICEI10');
    }
    commit(SET_INDICES_LIST, list);
    return data;
  },

  async fetchAllUserIndices({ commit }, params) {
    const { data } = await userIndex().fetch(params.id);
    const indices = Object.keys(data.data);
    commit(SET_USER_INDICES_LIST, indices);
    return data;
  },

  fetchActiveIndices({ commit, state }) {
    const indices = checkActiveIndices();

    indices.forEach((index) => {
      if (state.active.findIndex(item => item === index) === -1) {
        commit(ADD_ACTIVE_INDEX, index);
      }
    });
    return indices;
  },

  setChosenIndex({ commit }, name) {
    commit(SET_INDEX_CHOOSE, name);
    return name;
  },

  resetActiveIndices({ commit }) {
    commit(RESET_ACTIVE_INDICES);
    ls.setItem('selectedIndices', '');
  },

  toggleActiveIndex({ commit, state }, name) {
    const index = state.active.findIndex(el => el === name);
    const indices = checkActiveIndices();

    if (index === -1) {
      indices.push(name);
      ls.setItem('selectedIndices', indices.toString());

      commit(ADD_ACTIVE_INDEX, name);
      return { result: 'added', name, index };
    }

    indices.splice(index, 1);
    ls.setItem('selectedIndices', indices.toString());

    commit(REMOVE_ACTIVE_INDEX, index);
    return { result: 'removed', name, index };
  },

  setActiveIndex({ commit, state }, name) {
    const index = state.active.findIndex(el => el === name);
    const indices = checkActiveIndices();

    if (index === -1) {
      indices.push(name);
      ls.setItem('selectedIndices', indices.toString());

      commit(ADD_ACTIVE_INDEX, name);
      return { result: 'added', name, index };
    }

    return { result: 'skipped', name, index };
  },

  async fetchIndexData({ commit, dispatch }, { name, params }) {
    const response = await namedIndex(name).fetch(params);

    if (!response.data.result) {
      dispatch('notifications/addNotification', {
        type: 'error',
        text: `Cannot obtain ${name.toUpperCase()} data from server`,
      }, {
        root: true,
      });

      return response.data;
    }

    commit(SET_INDEX_DATA, { name: response.data.name, data: response.data.data });

    return response.data;
  },

  async fetchIndicesData({ commit }, payload) {
    const res = await index().fetchAll(payload.params);

    if (res === undefined) {
      return {};
    }

    const { data } = res;
    const indices = data.data;

    Object.keys(indices).forEach((index) => {
      commit(SET_INDEX_DATA, { name: index, data: indices[index] });
    });

    return data;
  },

  async fetchIndexCurrentValue({ commit, state }, payload) {
    const { data } = await namedIndex(payload.name).fetchCurrentValue(payload.params);

    if (typeof state.data[payload.name] === 'undefined') {
      commit(ADD_INDEX_IN_DATA, data.name);
    }

    commit(SET_INDEX_VALUE, { name: data.name, data: data.data });

    return data;
  },

  async fetchIndexHistory({ commit, state }, payload) {
    const { data } = await namedIndex(payload.name).fetchHistory(payload.params);

    if (typeof state.history[payload.name] === 'undefined') {
      commit(ADD_INDEX_IN_HISTORY, data.name);
    }

    const points = data.data.reduce((acc, el) => {
      acc[el.timestamp] = {
        x: (el.timestamp * 1000),
        y: el.price.value,
        open: el.price.candle.open,
        high: el.price.candle.max,
        low: el.price.candle.min,
        close: el.price.candle.close,
      };

      return acc;
    }, {});

    commit(SET_INDEX_HISTORY, {
      interval: data.interval || 'all',
      name: data.name,
      data: points,
    });

    return data;
  },

  async fetchIndexCoins({ commit, state }, payload) {
    const res = await namedIndex(payload.name).fetchCoins(payload.params);

    if (res === undefined) {
      return {};
    }
    const { data } = res;

    if (typeof state.data[payload.name] === 'undefined') {
      commit(ADD_INDEX_IN_DATA, data.name);
    }
    commit(SET_INDEX_COINS, { name: data.name, data: data.data });

    return data;
  },

  async fetchIndexPriceChange({ commit, state }, payload) {
    const { data } = await namedIndex(payload.name).fetchPriceChange(payload.params);

    if (typeof state.data[payload.name] === 'undefined') {
      commit(ADD_INDEX_IN_DATA, data.name);
    }

    commit(SET_INDEX_CHANGE, { name: data.name, data: data.data });

    return data;
  },

  initFavIndices({ commit }) {
    const index = JSON.parse(localStorage.getItem(localStorageKeys.fav)) || [];

    index.forEach(index => commit(ADD_ACTIVE_INDEX, index));

    return index;
  },

  toggleFavIndex({ commit }, name) {
    const index = state.fav.findIndex(el => el === name);

    if (index === -1) {
      commit(ADD_FAV_INDEX, name);
      return { result: 'added', name, index };
    }

    commit(REMOVE_FAV_INDEX, index);
    return { result: 'removed', name, index };
  },

  async createUserIndex({ commit }, name) {
    const { data } = await userIndex(name).create();

    commit(SET_INDEX_DATA, { name: data.name, data: data.data });
    commit(ADD_USER_INDICES_LIST_ITEM, data.name);

    return data;
  },

  async changeUserIndexCoin({ commit, dispatch, rootState }, payload) {
    const { data } = await userIndex(payload.index).replace(payload.params);
    const coins = payload.params.coins[0];

    dispatch(
      'coins/fetchCoinData',
      {
        name: coins.new,
        params: {
          detail: true,
          convert: rootState.common.currency,
        },
      },

      { root: true },
    )
      .then((res) => {
        commit(REPLACE_INDEX_COINS, {
          index: payload.index,
          old: coins.old,
          new: {
            name: res.data.name,
            data: {
              name: res.data.name,
              short: res.data.short,
            },
          },
        });
      });

    return data;
  },

  async updateUserIndex({ commit, state }, payload) {
    const { data } = await userIndex(payload.name).update(payload.params);

    commit(SET_INDEX_DATA, { name: data.name, data: data.data });

    const type = data.status === 'pending' ? 'remove' : 'add';
    const { name } = data;

    if (type === 'add') {
      commit(ADD_INDICES_LIST_ITEM, name);
    } else {
      const index = state.list.indexOf(name);

      if (index !== -1) {
        commit(REMOVE_INDICES_LIST_ITEM, index);
      }
    }

    return data;
  },

  async deleteUserIndex({ commit, state }, payload) {
    const { data } = await userIndex(payload.name).delete(payload.params);

    const index = state.list.indexOf(payload.name);
    const userIndexIndex = state.userList.indexOf(payload.name);

    commit(REMOVE_INDICES_LIST_ITEM, index);
    commit(REMOVE_USER_INDICES_LIST_ITEM, userIndexIndex);

    return data;
  },

  setUserIndexCoin({ commit }, payload) {
    commit(SET_USER_INDEX_COINS, payload);
    return true;
  },

  deleteUserIndexCoin({ commit }, coin) {
    commit(DELETE_USER_INDEX_COINS, coin);
    return true;
  },

  resetUserIndexCoins({ commit }) {
    commit(RESET_USER_INDEX_COINS);
    return true;
  },
};

const mutations = {
  [SET_INDICES_LIST](state, arr) {
    state.list = [...arr];
  },

  [ADD_INDICES_LIST_ITEM](state, item) {
    state.list.push(item);
  },

  [REMOVE_INDICES_LIST_ITEM](state, index) {
    state.list.splice(index, 1);
  },

  [SET_USER_INDICES_LIST](state, arr) {
    state.userList = [...arr];
  },

  [ADD_USER_INDICES_LIST_ITEM](state, index) {
    state.userList.push(index);
  },

  [REMOVE_USER_INDICES_LIST_ITEM](state, index) {
    state.userList.splice(index, 1);
  },

  [ADD_INDEX_IN_DATA](state, name) {
    Vue.set(state.data, name, {});
  },

  [SET_INDEX_DATA](state, payload) {
    const { data } = payload;
    data.name = payload.name;
    Vue.set(state.data, payload.name, data);
  },

  [SET_INDEX_VALUE](state, payload) {
    Vue.set(state.data[payload.name], 'value', payload.data.value);
    Vue.set(state.data[payload.name], 'last_updated', payload.data.timestamp);
  },

  [SET_INDEX_HISTORY](state, payload) {
    Vue.set(state.history[payload.name], payload.interval, payload.data);
  },

  [ADD_INDEX_IN_HISTORY](state, name) {
    Vue.set(state.history, name, {});
  },

  [SET_INDEX_COINS](state, payload) {
    Vue.set(state.data[payload.name], 'coins', payload.data);
  },

  [REPLACE_INDEX_COINS](state, payload) {
    const indexCoins = state.data[payload.index].coins;
    Vue.delete(indexCoins, payload.old);
    Vue.set(indexCoins, payload.new.name, payload.new.data);
  },

  [SET_INDEX_CHANGE](state, payload) {
    Vue.set(state.data[payload.name], 'changes_custom', payload.data);
  },

  [SET_INDEX_CHOOSE](state, name) {
    state.chosen = name;
  },

  [ADD_FAV_INDEX](state, name) {
    Vue.set(state.fav, state.fav.length, name);
  },
  [REMOVE_FAV_INDEX](state, index) {
    Vue.delete(state.fav, index);
  },

  [ADD_ACTIVE_INDEX](state, name) {
    Vue.set(state.active, state.active.length, name);
  },

  [REMOVE_ACTIVE_INDEX](state, index) {
    Vue.delete(state.active, index);
  },

  [RESET_ACTIVE_INDICES](state) {
    Vue.set(state, 'active', []);
  },

  [SET_USER_INDEX_COINS](state, payload) {
    const index = Object.keys(state.userIndexCoins).length;

    if (state.userIndexCoins[payload.name] === undefined) {
      Vue.set(state.userIndexCoins, payload.name, { index });
    }

    if (payload.percent !== undefined) {
      Vue.set(state.userIndexCoins[payload.name], 'percent', payload.percent);
      Vue.set(state.userIndexCoins[payload.name], 'index', index);
    }
    if (payload.cost !== undefined) {
      Vue.set(state.userIndexCoins[payload.name], 'cost', payload.cost);
      Vue.set(state.userIndexCoins[payload.name], 'index', index);
    }
  },

  [DELETE_USER_INDEX_COINS](state, coin) {
    Vue.delete(state.userIndexCoins, coin);
  },

  [RESET_USER_INDEX_COINS](state) {
    state.userIndexCoins = {};
  },

};

export default {
  state,
  getters,
  actions,
  mutations,
};
