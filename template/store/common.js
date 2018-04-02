/* eslint-disable no-shadow */
import Vue from 'vue';
import MobileDetect from 'mobile-detect';
import ls from '~/helpers/localStorage'

const SET_USER_LOCALE = 'COMMON/SET_USER_LOCALE';
const SET_USER_DEVICE = 'COMMON/SET_USER_DEVICE';
const SET_USER_MENU_STATUS = 'COMMON/SET_USER_MENU_STATUS';
const SET_LOADER_STATUS = 'COMMON/SET_LOADER_STATUS';
const SET_SCROLL_STATUS = 'COMMON/SET_SCROLL_STATUS';

const state = () => ({
  version: process.env.GIT_HASH,
  isMobile: false,
  locale: 'en',
  menuIsOpen: false,
  showLoader: true,
  locales: {
    en: {
      full: 'English',
      short: 'Eng',
      desc: 'eng',
    },
    ru: {
      full: 'Русский',
      short: 'Rus',
      desc: 'rus',
    },
    ko: {
      full: '한국어',
      short: '한',
      desc: 'kor',
    },
  },
});


const actions = {
  setUserLocale({ commit }, locale) {
    commit(SET_USER_LOCALE, locale);
  },
  setUserDevice({ commit }, flag) {
    commit(SET_USER_DEVICE, flag);
  },
  setUserMenuStatus({ commit, dispatch }, status) {
    commit(SET_USER_MENU_STATUS, status);
    commit(SET_SCROLL_STATUS, status);
  },

  setUserDefaultParams({ commit, state }) {
    const md = new MobileDetect(window.navigator.userAgent);
    const initialUserParams = {
      menuIsOpen: ls.getItem('menuIsOpen').data || state.menuIsOpen,
      isMobile: (!!md.phone() || !!md.tablet()),
      locale: state.locale || ls.getItem('locale')
      || window.navigator.language.split('-')[0]
      || window.navigator.userLanguage.split('-')[0],
    };

    commit(SET_USER_LOCALE, initialUserParams.locale);
    commit(SET_USER_DEVICE, initialUserParams.isMobile);
    commit(SET_USER_MENU_STATUS, initialUserParams.menuIsOpen);
  },

  setLoaderStatus({ commit }, status) {
    commit(SET_LOADER_STATUS, status);
  },
  setScrollStatus({ commit }, status) {
    commit(SET_SCROLL_STATUS, status);
  },

};

const getters = {
  locale: (state) => ({
    list: state.locales,
    active: state.locale,
  })
}

const mutations = {
  [SET_USER_LOCALE](state, locale) {
    state.locale = locale;
    ls.setItem('locale', locale);
  },
  [SET_USER_DEVICE](state, flag) {
    state.isMobile = flag;
  },
  [SET_USER_MENU_STATUS](state, status) {
    state.menuIsOpen = status;
    ls.setItem('menuIsOpen', status);
  },
  [SET_LOADER_STATUS](state, status) {
    state.showLoader = status;
  },
  [SET_SCROLL_STATUS](state, status) {
    state.scrollDisabled = status;
  },
};

export default {
  state,
  actions,
  getters,
  mutations,
};

