/* eslint-disable no-shadow */
import Vue from 'vue';
import MobileDetect from 'mobile-detect';

const SET_USER_LOCALE = 'COMMON/SET_USER_LOCALE';
const SET_USER_DEVICE = 'COMMON/SET_USER_DEVICE';
const SET_USER_THEME = 'COMMON/SET_USER_THEME';
const SET_USER_MENU_SIZE = 'COMMON/SET_USER_MENU_SIZE';
const SET_USER_CURRENCY = 'COMMON/SET_USER_CURRENCY';
const SET_USER_DATA_VIEW = 'COMMON/SET_USER_DATA_VIEW';
const SET_COIN_VISIBILITY = 'COMMON/SET_COIN_VISIBILITY';
const UNSET_COIN_VISIBILITY = 'COMMON/UNSET_COIN_VISIBILITY';
const SET_LOADER_STATUS = 'COMMON/SET_LOADER_STATUS';
const RESET_COINS_VISIBILITY = 'COMMON/RESET_COINS_VISIBILITY';

const state = () => ({
  version: process.env.GIT_HASH,
  currency: 'usd',
  isMobile: false,
  locale: 'en',
  menu: 'min',
  theme: 'light',
  showLoader: true,
  data: {
    view: 'wild',
  },
  // in milliseconds
  // TODO: move ticks into glossary
  ticks: {
    minute: 60000,
    five_minutes: 300000,
    hour: 3600000,
    day: 86400000,
    week: 604800000,
    month: 2678400000,
  },
  /**
   * IMPORTANT NOTE: ALL VALUES IN GLOSSARY ARE STATIC
   * AND MUST NOT BE MUTATED
   */
  glossary: {
    currency: {
      aud: {
        sign: '$',
        name: 'Australia Dollar',
      },
      brl: {
        sign: 'R$',
        name: 'Brazil Real',
      },
      cad: {
        sign: '$',
        name: 'Canada Dollar',
      },
      chf: {
        sign: 'CHF',
        name: 'Switzerland Franc',
      },
      clp: {
        sign: '$',
        name: 'Chile Peso',
      },
      cny: {
        sign: '元',
        name: 'China Yuan Renminbi',
      },
      czk: {
        sign: 'Kč',
        name: 'Czech Republic Koruna',
      },
      dkk: {
        sign: 'kr',
        name: 'Denmark Krone',
      },
      eur: {
        sign: '€',
        name: 'Euro Member Countries',
      },
      gbp: {
        sign: '£',
        name: 'United Kingdom Pound',
      },
      hkd: {
        sign: '$',
        name: 'Hong Kong Dollar',
      },
      huf: {
        sign: 'Ft',
        name: 'Hungary Forint',
      },
      idr: {
        sign: 'Rp',
        name: 'Indonesia Rupiah',
      },
      ils: {
        sign: '₪',
        name: 'Israel Shekel',
      },
      inr: {
        sign: 'INR',
        name: 'India Rupee',
      },
      jpy: {
        sign: '¥',
        name: 'Japan Yen',
      },
      krw: {
        sign: '₩',
        name: 'Korea (South) Won',
      },
      mxn: {
        sign: '$',
        name: 'Mexico Peso',
      },
      myr: {
        sign: 'RM',
        name: 'Malaysia Ringgit',
      },
      nok: {
        sign: 'kr',
        name: 'Norway Krone',
      },
      nzd: {
        sign: '$',
        name: 'New Zealand Dollar',
      },
      php: {
        sign: '₱',
        name: 'Philippines Peso',
      },
      pkr: {
        sign: '₨',
        name: 'Pakistan Rupee',
      },
      pln: {
        sign: 'zł',
        name: 'Poland Zloty',
      },
      rub: {
        sign: '₽',
        name: 'Russia Ruble',
      },
      sek: {
        sign: 'kr',
        name: 'Sweden Krona',
      },
      sgd: {
        sign: '$',
        name: 'Singapore Dollar',
      },
      thb: {
        sign: '฿',
        name: 'Thailand Baht',
      },
      try: {
        sign: 'TRy',
        name: 'Turkey Lira',
      },
      twd: {
        sign: 'NT$',
        name: 'Taiwan New Dollar',
      },
      usd: {
        sign: '$',
        name: 'United States Dollar',
      },
      zar: {
        sign: 'R',
        name: 'South Africa Rand',
      },
    },
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
  },
});



const actions = {
  setUserLocale({ commit }, locale) {
    commit(SET_USER_LOCALE, locale);
    Raven.setTagsContext({
      locale,
    });
  },
  setUserDevice({ commit }, flag) {
    commit(SET_USER_DEVICE, flag);
  },
  setUserTheme({ commit }, theme) {
    commit(SET_USER_THEME, theme);
    Raven.setTagsContext({
      theme,
    });
  },
  setUserMenuSize({ commit }, size) {
    // min || max
    commit(SET_USER_MENU_SIZE, size);
  },
  setUserCurrency({ commit }, currency) {
    commit(SET_USER_CURRENCY, currency);
    Raven.setTagsContext({
      currency,
    });
  },
  setUserDataView({ commit }, params) {
    commit(SET_USER_DATA_VIEW, params);
  },

  setUserDefaultParams({ commit, state }) {
    const md = new MobileDetect(window.navigator.userAgent);
    const initialUserParams = {
      theme: locStor.get('theme') || state.theme,
      menu: locStor.get('menu') || state.menu,
      currency: locStor.get('currency') || state.currency,
      view: locStor.get('view') || state.data.view,
      isMobile: (!!md.phone() || !!md.tablet()),
      locale: state.locale || locStor.get('locale')
      || window.navigator.language.split('-')[0]
      || window.navigator.userLanguage.split('-')[0],
    };

    // TODO: consider to save all params to one JSON
    commit(SET_USER_LOCALE, initialUserParams.locale);
    commit(SET_USER_DEVICE, initialUserParams.isMobile);
    commit(SET_USER_THEME, initialUserParams.theme);
    commit(SET_USER_MENU_SIZE, initialUserParams.menu);
    commit(SET_USER_CURRENCY, initialUserParams.currency);
    commit(SET_USER_DATA_VIEW, [initialUserParams.view, false]);
  },

  setCoinVisibility({ commit, state }, coin) {

    if (index === -1) {
      commit(SET_COIN_VISIBILITY, coin);
      return { visible: true, coin };
    }

    commit(UNSET_COIN_VISIBILITY, index);
    return { visible: false, coin };
  },

  setLoaderStatus({ commit }, status) {
    commit(SET_LOADER_STATUS, status);
  },

  resetCoinsVisibility({ commit }) {
    commit(RESET_COINS_VISIBILITY);
  },
};

const getters = {
  locale: (state) => ({
    list: state.glossary.locales,
    active: state.locale,
  })
}

const mutations = {
  [SET_USER_LOCALE](state, locale) {
    state.locale = locale;
    locStor.set('locale', locale);
  },
  [SET_USER_DEVICE](state, flag) {
    state.isMobile = flag;
  },
  [SET_USER_THEME](state, theme) {
    state.theme = theme;
    locStor.set('theme', theme);
  },
  [SET_USER_MENU_SIZE](state, size) {
    state.menu = size;
    locStor.set('menu', size);
  },
  [SET_USER_CURRENCY](state, currency) {
    state.currency = currency;
    locStor.set('currency', currency);
  },
  [SET_USER_DATA_VIEW](state, params) {
    const userView = locStor.get('view');
    const view = params[0];
    const withSave = params[1];
    if (withSave) {
      locStor.set('view', view);
    }
    if (userView !== null) {
      // eslint-disable-next-line
      withSave
        ? Vue.set(state.data, 'view', view)
        : Vue.set(state.data, 'view', userView);
    } else {
      Vue.set(state.data, 'view', view);
    }
  },

  [SET_LOADER_STATUS](state, status) {
    state.showLoader = status;
  },
};

export default {
  state,
  actions,
  getters,
  mutations,
};

