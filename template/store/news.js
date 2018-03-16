/* eslint-disable no-shadow */
import Vue from 'vue';
import { news } from '../api';

const state = () => ({
  posts: {},
  categories: [],
  tags: [],
  pagination: null,
});

const ADD_POST = 'ADD_POST';
const SET_CATEGORIES = 'SET_CATEGORIES';
const SET_TAGS = 'SET_TAGS';
const SET_PAGINATION = 'SET_PAGINATION';
const CLEAR_CATEGORIES = 'CLEAR_CATEGORIES';
const CLEAR_TAGS = 'CLEAR_TAGS';
const CLEAR_POSTS = 'CLEAR_POSTS';
const CLEAR_PAGINATION = 'CLEAR_SET_PAGINATION';

const getters = {};

const actions = {
  async fetchAll({ commit, dispatch }, params) {
    try {
      const { data } = await news().fetchAll(params);

      data.data.forEach(el => commit(ADD_POST, el));

      commit(SET_PAGINATION, data.pagination);

      return data;
    } catch (err) {
      return dispatch('notifications/addNotification', {
        type: 'error',
        text: err.message,
      }, {
        root: true,
      });
    }
  },
  async fetchByID({ commit, dispatch }, payload) {
    try {
      const { data } = await news().fetchByID(payload.id, payload.params);

      const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/ig;
      const content = data.data.content.replace(urlRegex, url => `<a href="${url}" rel="nofollow">${url}</a>`);
      // or use https://github.com/phanan/vue-linkify if regexp works bag
      data.data.content = content;

      commit(ADD_POST, data.data);

      return data;
    } catch (err) {
      return dispatch('notifications/addNotification', {
        type: 'error',
        text: err.message,
      }, {
        root: true,
      });
    }
  },
  async fetchCategories({ commit, dispatch }, params) {
    try {
      const { data } = await news().fetchCategories(params);

      commit(SET_CATEGORIES, data.data);

      return data;
    } catch (err) {
      return dispatch('notifications/addNotification', {
        type: 'error',
        text: err.message,
      }, {
        root: true,
      });
    }
  },
  async fetchTags({ commit, dispatch }, params) {
    try {
      const { data } = await news().fetchTags(params);

      commit(SET_TAGS, data.data);

      return data;
    } catch (err) {
      return dispatch('notifications/addNotification', {
        type: 'error',
        text: err.message,
      }, {
        root: true,
      });
    }
  },

  setPagination({ commit }, payload) {
    commit(SET_PAGINATION, payload);
  },

  clearState({ commit }) {
    commit(CLEAR_CATEGORIES);
    commit(CLEAR_POSTS);
    commit(CLEAR_TAGS);
    commit(CLEAR_PAGINATION);
  },

  clearTags({ commit }) {
    commit(CLEAR_TAGS);
  },

  clearPosts({ commit }) {
    commit(CLEAR_POSTS);
  },

  clearCategories({ commit }) {
    commit(CLEAR_CATEGORIES);
  },

  clearPagination({ commit }) {
    commit(CLEAR_PAGINATION);
  },
};

const mutations = {
  [ADD_POST](state, post) {
    Vue.set(state.posts, post.id, post);
  },
  [SET_CATEGORIES](state, categories) {
    Vue.set(state, 'categories', categories);
  },
  [SET_TAGS](state, tags) {
    Vue.set(state, 'tags', tags);
  },
  [SET_PAGINATION](state, payload) {
    Vue.set(state, 'pagination', payload);
  },
  [CLEAR_CATEGORIES](state) {
    Vue.set(state, 'categories', []);
  },
  [CLEAR_TAGS](state) {
    Vue.set(state, 'tags', []);
  },
  [CLEAR_POSTS](state) {
    Vue.set(state, 'posts', null);
  },
  [CLEAR_PAGINATION](state) {
    Vue.set(state, 'pagination', null);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
