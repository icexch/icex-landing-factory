import { _get } from '../Utils/requests';

const baseURL = 'https://api.icex.ch/api';

export function coins() {
  return {
    /**
     * Get all available coins
     * @param [params]
     * @param [cb]
     * @returns {Json}
     */
    fetchAll(params) {
      return _get(baseURL, '/coins', params);
    },
    fetchTop(params) {
      return _get(baseURL, '/coins/top', params);
    },
  };
}

/**
 * Get all coin info via name
 * @param name
 * @returns {*}
 */
export function coin(name = null) {
  if (!name) {
    throw Error('Coin name must be specified');
  }

  return {
    fetchHistory(params) {
      return _get(baseURL, `/coins/${name}/hist`, params);
    },
    fetchData(params) {
      return _get(baseURL, `/coins/${name}`, params);
    },
    fetchPriceChange(params) {
      return _get(baseURL, `/coins/${name}/change`, params);
    },
    fetchExchange(params) {
      return _get(baseURL, `/coins/${name}/exchanges`, params);
    },
  };
}
