import { _get, _post, _put, _delete } from '../Utils/requests';

const baseURL = 'https://api.icex.ch/api';

export function namedIndex(name = null) {
  if (!name) {
    throw Error('Index name must be specified');
  }

  return {
    fetch(params) {
      return _get(baseURL, `/index/${name}`, params);
    },
    fetchCurrentValue(params) {
      return _get(baseURL, `/index/${name}/now`, params);
    },
    fetchHistory(params) {
      return _get(baseURL, `/index/${name}/hist`, params);
    },
    fetchCoins(params) {
      return _get(baseURL, `/index/${name}/coins`, params);
    },
    fetchPriceChange(params) {
      return _get(baseURL, `/index/${name}/change`, params);
    },
  };
}

export function userIndex(name) {
  return {
    fetch(id) {
      return _get(baseURL, `/index/users/${id}`);
    },
    create() {
      return _post(baseURL, '/index/create', name);
    },

    update(params) {
      return _put(baseURL, `/index/${name}/update`, params);
    },

    delete(params) {
      return _delete(baseURL, `/index/${name}/delete`, params);
    },

    replace(coins) {
      return _post(baseURL, `/index/${name}/coins/replace`, coins);
    },

  };
}

export function index() {
  return {
    fetchAll(params) {
      return _get(baseURL, '/index', params);
    },

    custom: {
      fetchAll(params) {
        return _get(baseURL, '/index/users', params);
      },

      fetchByName(user, params) {
        if (!user) {
          throw Error('Username must be specified');
        }
        return _get(baseURL, `/index/users/${user}`, params);
      },

      fetchCurrent(params) {
        return _get(baseURL, '/index/my', params);
      },
    },
  };
}
