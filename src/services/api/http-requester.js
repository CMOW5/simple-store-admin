import axios from 'axios';

/* utils */
import Logger from 'utils/logger/logger';
import TokenHandler from './auth/utils/token-handler';

export default {
  submit: submit,
  get: getRequest,
  post: postRequest,
  put: putRequest,
  patch: patchRequest,
  delete: deleteRequest,
};

/**
 *  @param {string} requestType 'GET, PUT, POST or PATCH'
 *  @param {string} url
 *  @param {object} data
 *  @return {Promise}
 */
export function submit(requestType, url, data = {}) {
  Logger.log('HttpRequest submit requestType= ' + requestType +
      ' url= ' + url + ' data= ', data);

  let headers = {
    // 'Accept': 'application/json',
    'Content-type': 'application/json',
  };

    // get the token first
  const token = TokenHandler.getToken();

  if (token) {
    headers['Authorization'] = 'Bearer ' + token;
  }

  const config = {
    method: requestType,
    url: url,
    data: data,
    headers: headers,
  };

  return new Promise((resolve, reject) => {
    axios(config)
      .then((response) => {
        Logger.log('HttpRequest response requestType = ' + requestType +
        ' url   = ' + url + ' data = ', response);

        // get token from response
        // this.onSuccess(response.data);
        resolve(response);
      })
      .catch((error) => {
        Logger.log('Http error = ', error);
        // this.onFail(error);
        // TODO: this line is throwing an exception when response is undefined
        // const status = error.response.status;
        /* if (status === 401) {
            // EventProvider.fire("unauthorized");
          } */
        if (isUnauthenticatedResponse(error.response)) {
          redirectToLogin();
        }

        reject(error);
      });
  });
}

/**
 * Send a GET request to the given URL.
 *
 * @param {string} url
 * @return {Promise}
 */
function getRequest(url) {
  return submit('get', url);
}

/**
 * Send a POST request to the given URL.
 *
 * @param {string} url the request url
 * @param {Object} data the data attached to the request
 * @return {Promise}
 */
function postRequest(url, data={}) {
  return submit('post', url, data);
}

/**
 * Send a PUT request to the given URL.
 *
 * @param {string} url the request url
 * @param {Object} data the data attached to the request
 * @return {Promise}
 */
function putRequest(url, data={}) {
  return submit('put', url, data);
}

/**
 * Send a PATCH request to the given URL.
 *
 * @param {string} url the request url
 * @param {Object} data the data attached to the request
 * @return {Promise}
 */
function patchRequest(url, data={}) {
  return submit('patch', url, data);
}

/**
 * Send a DELETE request to the given URL.
 *
 * @param {string} url the request url
 * @return {Promise}
 */
function deleteRequest(url) {
  return submit('delete', url);
};

/**
 *
 * @param {*} response
 * @return {boolean}
 */
function isUnauthenticatedResponse(response) {
  if (response && response.status) {
    return response.status === 401;
  } else {
    return false;
  }
}

/** */
function redirectToLogin() {
  TokenHandler.clearToken();
  window.location.replace('http://localhost:3000/login');
}
