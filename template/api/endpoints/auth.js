import { _post, _get } from '../Utils/requests';

const baseURL = 'https://api.icex.ch/api';

export function auth() {
  return {
    signup(params) {
      return _post(baseURL, '/auth/register', params);
    },
    signin(params) {
      return _post(baseURL, '/auth/login', params);
    },
    logout(token) {
      return _post(baseURL, '/auth/logout', { token });
    },
  };
}

export function user() {
  return {
    data(token) {
      return _get(baseURL, '/user', { token });
    },
  };
}
