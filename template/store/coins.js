/* eslint-disable no-shadow */
import Vue from 'vue'; // eslint-disable-line
import get from 'lodash.get';
import locStor from '~/helpers/locStor';
import { coins, coin } from '../api';

const localStorageKeys = {
  fav: 'icex-fav-coins',
};

function checkActiveCoins() {
  const coinsExist = locStor.get('selectedCoins');
  return coinsExist ? coinsExist.split(',') : [];
}

const state = () => ({
  active: [],
  data: {},
  fav: [],
  filters: [],
  exchange: {},
  history: {},
  list: {
    all: [],
    top: [],
  },
  sorting: 'name',
  selectedCoins: [],
});

const SET_COINS_LIST = 'COINS/SET_COINS_LIST';
const SET_TOP_COINS_LIST = 'COINS/SET_TOP_COINS_LIST';
const SET_COIN_HISTORY = 'COINS/SET_COIN_HISTORY';
const SET_COIN_DATA = 'COINS/SET_COIN_DATA';
const SET_COIN_EXCHANGE = 'COINS/SET_COIN_EXCHANGE';
const ADD_COIN_TO_HISTORY = 'COINS/ADD_COIN_TO_HISTORY';
const ADD_COIN_TO_EXCHANGE = 'COINS/ADD_COIN_TO_EXCHANGE';
const SET_SORTING = 'COINS/SET_SORTING';
const ADD_FAV_COIN = 'COINS/ADD_FAV_COIN';
const REMOVE_FAV_COIN = 'COINS/REMOVE_FAV_COIN';
const ADD_ACTIVE_COIN = 'COINS/ADD_ACTIVE_COIN';
const REMOVE_ACTIVE_COIN = 'COINS/REMOVE_ACTIVE_COIN';
const RESET_ACTIVE_COIN = 'COINS/RESET_ACTIVE_COIN';
const ADD_FILTER = 'COINS/ADD_FILTER';
const REMOVE_FILTER = 'COINS/REMOVE_FILTER';

const getters = {
  sortCriteria: state => locStor.get('sortCriteria') || state.sorting,
};

const actions = {
  async fetchCoinsList({ commit }, params) {
    const { data } = await coins().fetchAll(params);

    commit(SET_COINS_LIST, data.data);

    return data;
  },

  async fetchAllCoinsData({ commit }, params) {
    const { data } = await coins().fetchAll(params);

    data.data.forEach((coin) => {
      console.log(coin);
      commit(SET_COIN_DATA, { name: coin.name, data: coin });
    });

    return data;
  },

  async fetchTopCoinsList({ commit }, params) {
    const { data } = await coins().fetchTop(params);

    commit(SET_TOP_COINS_LIST, Object.values(data.data).map(el => el.name));

    return data;
  },

  async fetchCoinHistory({ commit, state }, payload) {
    const { data } = await coin(payload.name).fetchHistory(payload.params);
    if (typeof state.history[data.name] === 'undefined') {
      commit(ADD_COIN_TO_HISTORY, data.name);
    }

    const points = data.data.reduce((acc, el) => {
      acc[el.timestamp] = {
        x: (el.timestamp * 1000),
        y: el.price.value,
        open: el.price.candle.open,
        high: el.price.candle.max,
        low: el.price.candle.min,
        close: el.price.candle.close,
        volume: get(el.volume, '24h.value', 0),
        capitalization: el.capitalization && el.capitalization.value,
      };

      return acc;
    }, {});

    commit(SET_COIN_HISTORY, {
      interval: data.interval || 'all',
      name: data.name,
      data: points,
    });

    return data;
  },

  async fetchCoinData({ commit, dispatch }, payload) {
    const response = await coin(payload.name).fetchData(payload.params);

    if (!response.data.result) {
      dispatch('notifications/addNotification', {
        type: 'error',
        text: `Cannot obtain ${payload.name} data from server`,
      }, {
        root: true,
      });

      return response.data;
    }

    commit(SET_COIN_DATA, { name: response.data.name, data: response.data.data });

    return response.data;
  },

  setCoinData({ commit, state }, { data, name }) {
    if (!name || !data) {
      return false;
    }

    commit(SET_COIN_DATA, { name, data });

    return state.data[name];
  },

  async fetchCoinExchange({ commit, state }, payload) {
    const { data } = await coin(payload.name).fetchExchange(payload.params);

    if (typeof state.exchange[payload.name] === 'undefined') {
      commit(ADD_COIN_TO_EXCHANGE, payload.name);
    }

    Object.keys(data.data).forEach((el) => {
      commit(SET_COIN_EXCHANGE, {
        name: payload.name,
        exchanger: el,
        data: data.data[el],
      });
    });

    return data;
  },

  setCoinsSorting({ commit }, str) {
    locStor.set('sortCriteria', str);
    commit(SET_SORTING, str);
  },

  initFavCoins({ commit }) {
    const coins = JSON.parse(localStorage.getItem(localStorageKeys.fav)) || [];

    coins.forEach(coin => commit(ADD_FAV_COIN, coin));

    return coins;
  },

  toggleFavCoin({ commit, state }, name) {
    const index = state.fav.findIndex(el => el === name);

    if (index === -1) {
      commit(ADD_FAV_COIN, name);
      return { result: 'added', name, index };
    }

    commit(REMOVE_FAV_COIN, index);
    return { result: 'removed', name, index };
  },

  fetchActiveCoins({ commit }) {
    const coins = checkActiveCoins();

    coins.forEach(coin => commit(ADD_ACTIVE_COIN, coin));

    return coins;
  },

  resetActiveCoins({ commit }) {
    commit(RESET_ACTIVE_COIN);
    locStor.set('selectedCoins', '');
  },

  toggleActiveCoin({ commit }, name) {
    const coins = checkActiveCoins();
    const index = coins.indexOf(name);

    if (index === -1) {
      coins.push(name);
      locStor.set('selectedCoins', coins.toString());

      commit(ADD_ACTIVE_COIN, name);
      return { result: 'added', name, index };
    }

    coins.splice(index, 1);
    locStor.set('selectedCoins', coins.toString());

    commit(REMOVE_ACTIVE_COIN, index);
    return { result: 'removed', name, index };
  },

  setActiveCoin({ commit }, name) {
    const coins = checkActiveCoins();
    const index = coins.indexOf(name);

    if (index === -1) {
      coins.push(name);
      locStor.set('selectedCoins', coins.toString());

      commit(ADD_ACTIVE_COIN, name);
      return { result: 'added', name, index };
    }

    return { result: 'skipped', name, index };
  },

  toggleFilter({ commit, state }, name) {
    const index = state.filters.findIndex(el => el === name);

    if (index === -1) {
      commit(ADD_FILTER, name);
      return { result: 'added', name, index };
    }

    commit(REMOVE_FILTER, index);
    return { result: 'removed', name, index };
  },
};

const mutations = {
  [SET_COINS_LIST](state, arr) {
    state.list.all = [...arr];
  },

  [SET_TOP_COINS_LIST](state, arr) {
    state.list.top = [...arr];
  },

  [SET_COIN_HISTORY](state, payload) {
    Vue.set(state.history[payload.name], payload.interval, Object.assign(
      {},
      state.history[payload.name][payload.interval],
      payload.data,
    ));
  },

  [ADD_COIN_TO_HISTORY](state, name) {
    Vue.set(state.history, name, {});
  },

  [SET_COIN_DATA](state, payload) {
    Vue.set(state.data, payload.name, payload.data);
  },

  [SET_COIN_EXCHANGE](state, payload) {
    Vue.set(state.exchange[payload.name], payload.exchanger, payload.data);
  },

  [ADD_COIN_TO_EXCHANGE](state, name) {
    Vue.set(state.exchange, name, {});
  },

  [SET_SORTING](state, str) {
    state.sorting = str;
  },

  [ADD_FAV_COIN](state, name) {
    Vue.set(state.fav, state.fav.length, name);
    localStorage.setItem(localStorageKeys.fav, JSON.stringify(state.fav));
  },
  [REMOVE_FAV_COIN](state, index) {
    Vue.delete(state.fav, index);
    localStorage.setItem(localStorageKeys.fav, JSON.stringify(state.fav));
  },

  [ADD_ACTIVE_COIN](state, name) {
    Vue.set(state.active, state.active.length, name);
  },

  [REMOVE_ACTIVE_COIN](state, index) {
    Vue.delete(state.active, index);
  },

  [RESET_ACTIVE_COIN](state) {
    state.active = [];
  },

  [ADD_FILTER](state, name) {
    Vue.set(state.filters, state.filters.length, name);
  },

  [REMOVE_FILTER](state, index) {
    Vue.delete(state.filters, index);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
