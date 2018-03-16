/* eslint-disable no-shadow */
import locStor from '~/helpers/locStor';
import Vue from 'vue'; // eslint-disable-line
import { auth, user } from '../api';

const state = () => ({
  auth: false,
  data: {
    token: '',
    user_email: '',
    user_name: '',
    user_id: null,
    status: '',
  },
});

const USERDATA = 'AUTH/USERDATA';

const getters = {
  isUserLoggedIn: state => state.data.token.length > 0,
  sortCriteria: state => locStor.get('sortCriteria') || state.sorting,
};

const actions = {
  async signup({ commit }, params) {
    const { data } = await auth().signup(params);
    commit(USERDATA, { data: data.data, auth: true });
    return data;
  },

  async signin({ commit }, params) {
    const { data } = await auth().signin(params);
    commit(USERDATA, { data: data.data, auth: true });
    return data;
  },

  async getUserData({ commit, state, getters }, token) {
    if (!getters.isUserLoggedIn) {
      const { data } = await user().data(token);
      commit(USERDATA, { data: data.data, auth: true });

      return data;
    }
    return state.data;
  },

  async logout({ commit }, token) {
    const { data } = await auth().logout(token);
    commit(USERDATA, { data: data.data, auth: false });
    return data;
  },
};

const mutations = {
  [USERDATA](state, payload) {
    state.data = payload.data;
    state.auth = payload.auth;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
