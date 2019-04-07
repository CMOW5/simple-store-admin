/* urls */
import AuthUrls from '../urls/auth-urls';

/* services */
import HttpRequester from '../http-requester';

/* utils */
import TokenHandler from './utils/token-handler';
import Logger from 'utils/logger/logger';

const responseContentKey = 'content';

/**
 * helper class that contains the api methods related
 * to the user authentication
 */
export default class AuthApi {
  /**
   * the class name
   * @return {string}
   */
  static className() {
    return 'AuthApi';
  }

  /**
   * Login the user with the given credentials
   *
   * @param {Object} credentials the data to be sent in the request body
   * @return {Promise} response with the user signed in
   */
  static login(credentials) {
    const url = AuthUrls.signin();
    return new Promise((resolve, reject) => {
      HttpRequester.post(url, credentials)
        .then((response) => {
          let userData = response.data[responseContentKey].user;
          userData.token = response.data[responseContentKey].token;
          TokenHandler.saveToken(userData.token);
          resolve(userData);
        })
        .catch((error) => {
          const methodName = ' catch(..) ';
          Logger.log(this.className() + methodName + 'error = ', error);
          reject(error);
        });
    });
  }

  /**
   * SignUp the user with the given credentials
   *
   * @param {Object} data
   * @return {Promise}
   */
  static signup(data) {
    // save the user cookie
    const methodName = ' signUp() ';
    const url = AuthUrls.signUp();
    Logger.log(this.className() + methodName);

    return new Promise((resolve, reject) => {
      HttpRequester.post(url, data)
        .then((response) => {
          const methodName = ' then(..) ';
          Logger.log(this.className() + methodName + 'response = ', response);
          resolve(response);
        })
        .catch((error) => {
          const methodName = ' catch(..) ';
          Logger.log(this.className() + methodName + 'error = ', error);
          reject(error);
        });
    });
  }

  /** @return {object} */
  static getCurrentUser() {
    if (!TokenHandler.getToken()) {
      return Promise.reject('No access token set.');
    }

    const url = AuthUrls.getAuthenticatedUser();

    return HttpRequester.get(url)
      .then((response) => {
        let userData = response.data[responseContentKey];
        return Promise.resolve(userData);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  /**
   * Logout the current logged user
   * @return {Promise}
   */
  static logout() {
    const methodName = ' logout() ';
    const url = AuthUrls.logout();

    Logger.log(this.className() + methodName);

    return new Promise((resolve, reject) => {
      HttpRequester.post(url)
        .then((response) => {
          const methodName = ' then(..) ';
          Logger.log(this.className() + methodName + 'response = ', response);
          TokenHandler.clearToken();
          resolve(response);
        })
        .catch((error) => {
          const methodName = ' catch(..) ';
          Logger.log(this.className() + methodName + 'error = ', error);
          reject(error);
        });
    });
  }

  /**
   * refresh the token saved in local storage
   *
   * @param {Object} data
   * @return {Promise} response with the new token
   */
  static refreshToken(data = {}) {
    const methodName = ' refreshToken() ';
    const url = AuthUrls.refreshToken();
    Logger.log(this.className() + methodName);

    return new Promise((resolve, reject) => {
      HttpRequester.post(url, data)
        .then((response) => {
          const methodName = ' then(..) ';
          Logger.log(this.className() + methodName + 'response = ', response);
          const newToken = response.data.data.token;
          const user = response.data.data.user;
          TokenHandler.saveToken(newToken);
          resolve(user);
        })
        .catch((error) => {
          const methodName = ' catch(..) ';
          Logger.log(this.className() + methodName + 'error = ', error);
          reject(error);
        });
    });
  }
}
