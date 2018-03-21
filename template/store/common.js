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

  sliderData: {
    "bitcoin": {
        "name": "bitcoin",
        "short": "BTC",
        "type": "icextop10",
        "description": "Bitcoin is an innovative network of payments and a new type of money. Bitcoin has an open-source, it\u2019s architecture is known to the whole world, but in the meantime no one controls it, nor owns it. Because of it\u2019s unique features Bitcoin opens up new horizons of possibilities, like no other currency before it.",
        "last_updated": 1521198481,
        "price": {
            "value": 8114.14,
            "currency": "USD"
        },
        "capitalization": 137298483646,
        "volume": {
            "day": 2029390000,
            "24h": 5489950000
        },
        "change": {
            "day": "-1.67%",
            "week": "-14.85%",
            "month": "-25.76%",
            "all": "16388784.01%"
        },
        "exchanges": 16,
        "day": {
            "min": 7920.9,
            "max": 8317.48,
            "avg": 8148.67
        },
        "purchase_amount": "100",
        "amount": "0.023185771",
        "assets": {
            "name": "bitcoin",
            "now": {
                "unit": 8114.14,
                "full": 188.133,
                "change": "-0.7%",
                "timestamp": 1521198531
            },
            "origin": {
                "price": 4312.99,
                "timestamp": 1506826800
            },
            "2018-03-16": {
                "unit": 8114.14,
                "full": 188.133,
                "change": "88.13%",
                "timestamp": 1521198531
            },
            "percent": "9.99%"
        }
    },
    "bitcoin-cash": {
        "name": "bitcoin-cash",
        "short": "BCH",
        "type": "icextop10",
        "description": "Bitcoin Cash has brought new currency to the world, fulfilling the original promise of Bitcoin as \"Peer-to-Peer Electronic Cash\". Merchants and users are granted with low fees and reliable confirmations. It has got great potential due to unrestricted growth, global adoption, non-conflicting innovation, and decentralized development.",
        "last_updated": 1521198481,
        "price": {
            "value": 919.524,
            "currency": "USD"
        },
        "capitalization": 15643478572,
        "volume": {
            "day": 110128000,
            "24h": 323339000
        },
        "change": {
            "day": "1.88%",
            "week": "19.21%",
            "month": "28.44%",
            "all": "109.33%"
        },
        "exchanges": 11,
        "day": {
            "min": 896.079,
            "max": 944.382,
            "avg": 915.56
        },
        "purchase_amount": "100",
        "amount": "0.231953980",
        "assets": {
            "name": "bitcoin-cash",
            "now": {
                "unit": 919.524,
                "full": 213.287,
                "change": "-1.62%",
                "timestamp": 1521198531
            },
            "origin": {
                "price": 431.12,
                "timestamp": 1506826800
            },
            "2018-03-16": {
                "unit": 919.524,
                "full": 213.287,
                "change": "113.29%",
                "timestamp": 1521198531
            },
            "percent": "11.33%"
        }
    },
    "ethereum": {
        "name": "ethereum",
        "short": "ETH",
        "type": "icextop10",
        "description": "Ethereum is a decentralized platform that runs smart contracts: applications that run exactly as programmed without a downtime, censorship, fraud or third party interference.",
        "last_updated": 1521198481,
        "price": {
            "value": 598.501,
            "currency": "USD"
        },
        "capitalization": 58623932841,
        "volume": {
            "day": 476010000,
            "24h": 1424090000
        },
        "change": {
            "day": "-1.86%",
            "week": "-16.87%",
            "month": "-31.2%",
            "all": "19850.04%"
        },
        "exchanges": 12,
        "day": {
            "min": 584.943,
            "max": 614.174,
            "avg": 602.66
        },
        "purchase_amount": "100",
        "amount": "0.334246942",
        "assets": {
            "name": "ethereum",
            "now": {
                "unit": 598.501,
                "full": 200.047,
                "change": "-2.15%",
                "timestamp": 1521198531
            },
            "origin": {
                "price": 299.18,
                "timestamp": 1506826800
            },
            "2018-03-16": {
                "unit": 598.501,
                "full": 200.047,
                "change": "100.05%",
                "timestamp": 1521198531
            },
            "percent": "10.63%"
        }
    },
    "dash": {
        "name": "dash",
        "short": "DASH",
        "type": "icextop10",
        "description": "Dash (formerly known as Darkcoin and XCoin) is an open source peer-to-peer cryptocurrency that aims to be the most user-friendly and most on-chain-scalable cryptocurrency in the world.",
        "last_updated": 1521198481,
        "price": {
            "value": 408.551,
            "currency": "USD"
        },
        "capitalization": 3245660201,
        "volume": {
            "day": 29120700,
            "24h": 83837900
        },
        "change": {
            "day": "-1.94%",
            "week": "-22.45%",
            "month": "-34.22%",
            "all": "583543.77%"
        },
        "exchanges": 7,
        "day": {
            "min": 402.897,
            "max": 420.283,
            "avg": 410.16
        },
        "purchase_amount": "100",
        "amount": "0.305885232",
        "assets": {
            "name": "dash",
            "now": {
                "unit": 408.551,
                "full": 124.97,
                "change": "-3.78%",
                "timestamp": 1521198531
            },
            "origin": {
                "price": 326.92,
                "timestamp": 1506826800
            },
            "2018-03-16": {
                "unit": 408.551,
                "full": 124.97,
                "change": "24.97%",
                "timestamp": 1521198531
            },
            "percent": "6.64%"
        }
    },
    "litecoin": {
        "name": "litecoin",
        "short": "LTC",
        "type": "icextop10",
        "description": "Litecoin \u2013 global decentralized currency based on blockchain technology.",
        "last_updated": 1521198481,
        "price": {
            "value": 159.757,
            "currency": "USD"
        },
        "capitalization": 8887402525,
        "volume": {
            "day": 168768000,
            "24h": 439379000
        },
        "change": {
            "day": "-2.62%",
            "week": "-15.14%",
            "month": "-23.68%",
            "all": "5225.24%"
        },
        "exchanges": 9,
        "day": {
            "min": 158.584,
            "max": 165.784,
            "avg": 161.65
        },
        "purchase_amount": "100",
        "amount": "1.833180568",
        "assets": {
            "name": "litecoin",
            "now": {
                "unit": 159.757,
                "full": 292.864,
                "change": "-3.15%",
                "timestamp": 1521198531
            },
            "origin": {
                "price": 54.55,
                "timestamp": 1506826800
            },
            "2018-03-16": {
                "unit": 159.757,
                "full": 292.864,
                "change": "192.86%",
                "timestamp": 1521198531
            },
            "percent": "15.56%"
        }
    },
    "ripple": {
        "name": "ripple",
        "short": "XRP",
        "type": "icextop10",
        "description": "Ripple connects banks, payment systems , digital asset exchange markets and componies operating via RippleNet to provide safe and a fast dispatch of money worldwide.",
        "last_updated": 1521198481,
        "price": {
            "value": 0.6699,
            "currency": "USD"
        },
        "capitalization": 20984300123,
        "volume": {
            "day": 521503000,
            "24h": 603138000
        },
        "change": {
            "day": "-1.79%",
            "week": "-17.79%",
            "month": "-26.83%",
            "all": "3732.37%"
        },
        "exchanges": 11,
        "day": {
            "min": 0.53563,
            "max": 0.70325,
            "avg": 0.68
        },
        "purchase_amount": "100",
        "amount": "501.504513541",
        "assets": {
            "name": "ripple",
            "now": {
                "unit": 0.6699,
                "full": 335.957,
                "change": "-3.34%",
                "timestamp": 1521198531
            },
            "origin": {
                "price": 0.1994,
                "timestamp": 1506826800
            },
            "2018-03-16": {
                "unit": 0.6699,
                "full": 335.957,
                "change": "235.96%",
                "timestamp": 1521198531
            },
            "percent": "17.85%"
        }
    },
    "monero": {
        "name": "monero",
        "short": "XMR",
        "type": "icextop10",
        "description": "Monero is a secure, private, and untraceable cryptocurrency. It is open-source and accessible to everybody. With Monero, you are your own bank. Only you control and responsible for your funds. Your accounts and transactions are private from outside eyes.",
        "last_updated": 1521198481,
        "price": {
            "value": 203.084,
            "currency": "USD"
        },
        "capitalization": 3239165760,
        "volume": {
            "day": 32790700,
            "24h": 54002900
        },
        "change": {
            "day": "-3.95%",
            "week": "-27.23%",
            "month": "-35.21%",
            "all": "65263.26%"
        },
        "exchanges": 6,
        "day": {
            "min": 202.011,
            "max": 211.991,
            "avg": 206.1
        },
        "purchase_amount": "100",
        "amount": "1.059209829",
        "assets": {
            "name": "monero",
            "now": {
                "unit": 203.084,
                "full": 215.108,
                "change": "-7.98%",
                "timestamp": 1521198531
            },
            "origin": {
                "price": 94.41,
                "timestamp": 1506826800
            },
            "2018-03-16": {
                "unit": 203.084,
                "full": 215.108,
                "change": "115.11%",
                "timestamp": 1521198531
            },
            "percent": "11.43%"
        }
    },
    "neo": {
        "name": "neo",
        "short": "NEO",
        "type": "icextop10",
        "description": "NEO is a non-profit community-based blockchain project that utilizes blockchain technology and digital identity to digitize assets, to automate the management of digital assets using smart contracts, and to realize a \"smart economy\" with a distributed network.",
        "last_updated": 1521198481,
        "price": {
            "value": 66.5468,
            "currency": "USD"
        },
        "capitalization": 4322563516,
        "volume": {
            "day": 63203000,
            "24h": 123543000
        },
        "change": {
            "day": "-3.93%",
            "week": "-26.34%",
            "month": "-48.31%",
            "all": "533.78%"
        },
        "exchanges": 7,
        "day": {
            "min": 65.5482,
            "max": 70.2433,
            "avg": 67.66
        },
        "purchase_amount": "100",
        "amount": "3.085467448",
        "assets": {
            "name": "neo",
            "now": {
                "unit": 66.5468,
                "full": 205.328,
                "change": "-5.85%",
                "timestamp": 1521198531
            },
            "origin": {
                "price": 32.41,
                "timestamp": 1506826800
            },
            "2018-03-16": {
                "unit": 66.5468,
                "full": 205.328,
                "change": "105.33%",
                "timestamp": 1521198531
            },
            "percent": "10.91%"
        }
    },
    "iota": {
        "name": "iota",
        "short": "IOT",
        "type": "icextop10",
        "description": "IOTA enables companies to explore new B2B models by making every technological resource a potential service to be traded on an open market in real time, with no fees.",
        "last_updated": 1521198481,
        "price": {
            "value": 1.06544,
            "currency": "USD"
        },
        "capitalization": 2956793214,
        "volume": {
            "day": 21596100,
            "24h": 33536900
        },
        "change": {
            "day": "-1.81%",
            "week": "-22.64%",
            "month": "-45.92%",
            "all": "81.51%"
        },
        "exchanges": 4,
        "day": {
            "min": 1.02513,
            "max": 1.12279,
            "avg": 1.07
        },
        "purchase_amount": "88.11842",
        "amount": "25.347827066",
        "assets": {
            "name": "iota",
            "now": {
                "unit": 1.06544,
                "full": 27.0066,
                "change": "-4.54%",
                "timestamp": 1521198531
            },
            "origin": {
                "price": 3.47637,
                "timestamp": 1514470061
            },
            "2018-03-16": {
                "unit": 1.06544,
                "full": 27.0066,
                "change": "-69.35%",
                "timestamp": 1521198531
            },
            "percent": "1.43%"
        }
    },
    "nem": {
        "name": "nem",
        "short": "XEM",
        "type": "icextop10",
        "description": "The NEM Smart Asset System allows you to totally customize how you use the NEM blockchain. First, your Namespace defines your home on the blockchain where you can name your own Mosaics, provide easy-to-remember names to user addresses, and more.",
        "last_updated": 1521198481,
        "price": {
            "value": 0.33877,
            "currency": "USD"
        },
        "capitalization": 3046675589,
        "volume": {
            "day": 52081000,
            "24h": 51275700
        },
        "change": {
            "day": "-9%",
            "week": "-4.05%",
            "month": "-16.82%",
            "all": "88.21%"
        },
        "exchanges": 6,
        "day": {
            "min": 0.3379,
            "max": 0.38401,
            "avg": 0.355
        },
        "purchase_amount": "100",
        "amount": "430.107526882",
        "assets": {
            "name": "nem",
            "now": {
                "unit": 0.33877,
                "full": 145.709,
                "change": "-6.05%",
                "timestamp": 1521198531
            },
            "origin": {
                "price": 0.2325,
                "timestamp": 1506826800
            },
            "2018-03-16": {
                "unit": 0.33877,
                "full": 145.709,
                "change": "45.71%",
                "timestamp": 1521198531
            },
            "percent": "7.74%"
        }
    }
  },
});



const actions = {
  setUserLocale({ commit }, locale) {
    commit(SET_USER_LOCALE, locale);
    
  },
  setUserDevice({ commit }, flag) {
    commit(SET_USER_DEVICE, flag);
  },
  setUserTheme({ commit }, theme) {
    commit(SET_USER_THEME, theme);
    
  },
  setUserMenuSize({ commit }, size) {
    // min || max
    commit(SET_USER_MENU_SIZE, size);
  },
  setUserCurrency({ commit }, currency) {
    commit(SET_USER_CURRENCY, currency);
    
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

