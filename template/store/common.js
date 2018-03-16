/* eslint-disable no-shadow */
import Vue from 'vue';
import Raven from 'raven-js';
import MobileDetect from 'mobile-detect';
import locStor from '~/helpers/locStor';

const SET_USER_LOCALE = 'COMMON/SET_USER_LOCALE';
const SET_USER_DEVICE = 'COMMON/SET_USER_DEVICE';
const SET_USER_THEME = 'COMMON/SET_USER_THEME';
const SET_USER_MENU_SIZE = 'COMMON/SET_USER_MENU_SIZE';
const SET_USER_CURRENCY = 'COMMON/SET_USER_CURRENCY';
const SET_USER_DATA_VIEW = 'COMMON/SET_USER_DATA_VIEW';
const SET_CHART_INTERVAL = 'COMMON/SET_CHART_INTERVAL';
const SET_CHART_TIME_RANGE = 'COMMON/SET_CHART_TIME_RANGE';
const SET_CHART_TYPE = 'COMMON/SET_CHART_TYPE';
const SET_CHART_COIN = 'COMMON/SET_CHART_COIN';
const REMOVE_CHART_COIN = 'COMMON/REMOVE_CHART_COIN';
const CLEAR_CHART_COINS = 'COMMON/CLEAR_CHART_COINS';
const SET_CHART_START = 'COMMON/SET_CHART_START';
const SET_CHART_END = 'COMMON/SET_CHART_END';
const SET_CHART_SUB = 'COMMON/SET_CHART_SUB';
const SET_COIN_VISIBILITY = 'COMMON/SET_COIN_VISIBILITY';
const UNSET_COIN_VISIBILITY = 'COMMON/UNSET_COIN_VISIBILITY';
const SET_LOADER_STATUS = 'COMMON/SET_LOADER_STATUS';
const RESET_COINS_VISIBILITY = 'COMMON/RESET_COINS_VISIBILITY';

const state = () => ({
  version: process.env.GIT_HASH,
  chart: {
    interval: 'day',
    type: 'spline',
    sub: 'cap',
    coins: [],
    visible: [],
    start: null,
    end: null,
  },
  currency: 'usd',
  currencies: {
    usd: 'United States Dollar',
    eur: 'Euro Member Countries',
    rub: 'Russia Ruble',
    krw: 'Korea (South) Won',
    aud: 'Australia Dollar',
    brl: 'Brazil Real',
    cad: 'Canada Dollar',
    chf: 'Switzerland Franc ',
    clp: 'Chile Peso',
    cny: 'China Yuan Renminbi',
    czk: 'Czech Republic Koruna',
    dkk: 'Denmark Krone',
    gbp: 'United Kingdom Pound',
    hkd: 'Hong Kong Dollar',
    huf: 'Hungary Forint',
    idr: 'Indonesia Rupiah',
    ils: 'Israel Shekel',
    inr: 'India Rupee',
    jpy: 'Japan Yen',
    mxn: 'Mexico Peso',
    myr: 'Malaysia Ringgit',
    nok: 'Norway Krone',
    nzd: 'New Zealand Dollar',
    php: 'Philippines Peso',
    pkr: 'Pakistan Rupee',
    pln: 'Poland Zloty',
    sek: 'Sweden Krona',
    sgd: 'Singapore Dollar',
    thb: 'Thailand Baht',
    try: 'Turkey Lira',
    twd: 'Taiwan New Dollar',
    zar: 'South Africa Rand',
  },
  isMobile: false,
  // TODO: move locales into glossary
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
    colors: [
      '#01cf26',
      '#ff168e',
      '#6de95a',
      '#ff6da5',
      '#2ae9ad',
      '#b76da0',
      '#f0cd17',
      '#ff8a81',
      '#9cae8a',
      '#bf732c',
      '#d9cfa4',
    ],
  },
});

const ranges = {
  month: {
    range: state().ticks.month * 3,
    maxRange: undefined,
    minRange: state().ticks.month * 2,
  },
  week: {
    range: state().ticks.week * 12,
    maxRange: undefined,
    minRange: state().ticks.week * 2,
  },
  day: {
    range: state().ticks.day * 14,
    maxRange: state().ticks.day * 180,
    minRange: state().ticks.day * 5,
  },
  hour: {
    range: state().ticks.hour * 24,
    maxRange: state().ticks.hour * 24 * 14,
    minRange: state().ticks.hour * 5,
  },
  five_minutes: {
    range: state().ticks.five_minutes * 24,
    maxRange: state().ticks.five_minutes * 48 * 2,
    minRange: state().ticks.five_minutes * 5,
  },
  minute: {
    range: state().ticks.minute * 60,
    maxRange: state().ticks.minute * 360,
    minRange: state().ticks.minute * 20,
  },
};

const getters = {
  maxRange: state => ranges[state.chart.interval].maxRange,
  minRange: state => ranges[state.chart.interval].minRange,
  range: state => ranges[state.chart.interval].range,
  ranges: () => ranges,
  mainCoin: state => state.chart.coins[0],
  additionalCoins: state => (state.chart.coins.length > 0
    ? state.chart.coins.slice(1)
    : []),
};

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
  setChartInterval({ commit }, interval) {
    commit(SET_CHART_INTERVAL, interval);
  },
  setChartTimeRange({ commit }, range) {
    commit(SET_CHART_TIME_RANGE, range);
  },
  setChartType({ commit }, type) {
    commit(SET_CHART_TYPE, type);
  },
  setChartCoin({ commit }, coin) {
    commit(SET_CHART_COIN, coin);
  },
  removeChartCoin({ commit }, coin) {
    commit(REMOVE_CHART_COIN, coin);
  },
  clearChartCoins({ commit }) {
    commit(CLEAR_CHART_COINS);
  },
  setUserDefaultParams({ commit, state }) {
    const md = new MobileDetect(window.navigator.userAgent);
    const initialUserParams = {
      theme: locStor.get('theme') || state.theme,
      menu: locStor.get('menu') || state.menu,
      currency: locStor.get('currency') || state.currency,
      chartType: locStor.get('chartType') || state.chart.type,
      view: locStor.get('view') || state.data.view,
      isMobile: (!!md.phone() || !!md.tablet()),
      sub: locStor.get('sub') || state.chart.sub,
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
    commit(SET_CHART_TYPE, initialUserParams.chartType);
    commit(SET_USER_DATA_VIEW, [initialUserParams.view, false]);
    commit(SET_CHART_SUB, initialUserParams.sub);
  },
  setChartRange({ commit }, payload) {
    commit(SET_CHART_START, payload.start);
    commit(SET_CHART_END, payload.end);
  },
  setChartSub({ commit }, sub) {
    commit(SET_CHART_SUB, sub);
  },
  setCoinVisibility({ commit, state }, coin) {
    const index = state.chart.visible.findIndex(el => el === coin);

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
  [SET_CHART_INTERVAL](state, interval) {
    Vue.set(state.chart, 'interval', interval);
  },
  [SET_CHART_TIME_RANGE](state, range) {
    Vue.set(state.chart, 'timeRange', range);
  },
  [SET_CHART_TYPE](state, type) {
    Vue.set(state.chart, 'type', type);
    locStor.set('chartType', type);
  },
  [SET_CHART_COIN](state, coin) {
    state.chart.coins = [...state.chart.coins, coin];
  },
  [REMOVE_CHART_COIN](state, coin) {
    state.chart.coins = state.chart.coins.filter(el => el !== coin);
  },
  [CLEAR_CHART_COINS](state) {
    Vue.set(state.chart, 'coins', []);
  },
  [SET_CHART_START](state, timestamp) {
    Vue.set(state.chart, 'start', timestamp);
  },
  [SET_CHART_END](state, timestamp) {
    Vue.set(state.chart, 'end', timestamp);
  },
  [SET_CHART_SUB](state, sub) {
    Vue.set(state.chart, 'sub', sub);
    locStor.set('sub', sub);
  },
  [SET_COIN_VISIBILITY](state, coin) {
    Vue.set(state.chart.visible, state.chart.visible.length, coin);
  },

  [UNSET_COIN_VISIBILITY](state, index) {
    Vue.delete(state.chart.visible, index);
  },

  [RESET_COINS_VISIBILITY](state) {
    Vue.set(state.chart, 'visible', []);
  },

  [SET_LOADER_STATUS](state, status) {
    state.showLoader = status;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
