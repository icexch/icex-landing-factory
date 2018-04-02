/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import https from 'https';
import get from 'lodash.get';
import qs from 'qs';
import Raven from 'raven-js';
import common from '~/store/common';
import notifications from '~/store/notifications';

const instance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

function _request(method, baseURL, endpoint, parameters) {
  const { state } = common;

  common.mutations['COMMON/SET_LOADER_STATUS'](state, true);

  const opt = {
    method,
    baseURL,
    url: endpoint,
    crossDomain: true,
    timeout: 10000,
    params: parameters,
    responseType: 'json',
    paramsSerializer: params => qs.stringify(params, { arrayFormat: 'indices' }),
  };

  return instance(opt)
    .catch((e) => {
      Raven.captureException(e);
      const errors = get(e, 'response.data.error', {});
      /* eslint-disable no-console */
      if (e.response) {
        console.log(`
          Status code: ${e.response.status}
          Status text: ${e.response.statusText}
          Error message: ${e.response.data.message}
          Requested URL: ${e.request.path}
        `);

        const stateNotif = notifications.state;

        Object.values(errors).forEach((el) => {
          notifications.mutations.ADD(stateNotif, {
            type: 'warn',
            text: el[0],
          });
          console.log(`Data error: ${el[0]}`);
          return el[0];
        });
      }
      /* eslint-enable no-console */
      return { data: { result: false, data: null, msg: errors } };
    });
}

export function _get(baseURL, endpoint, parameters) {
  return _request('GET', baseURL, endpoint, parameters);
}

export function _post(baseURL, endpoint, parameters) {
  return _request('POST', baseURL, endpoint, parameters);
}

export function _put(baseURL, endpoint, parameters) {
  return _request('PUT', baseURL, endpoint, parameters);
}

export function _delete(baseURL, endpoint, parameters) {
  return _request('DELETE', baseURL, endpoint, parameters);
}
