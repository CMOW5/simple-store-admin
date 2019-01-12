/* urls */
import AuthUrls from '../urls/auth-urls';

/* services */
import HttpRequester from '../http-requester';

/* utils */
import TokenHandler from './utils/token-handler';
import Logger from 'utils/logger/logger';

/**
 * helper class that contains the api methods related
 * to the user authentication
 */
export default class Auth {
  /**
   * the class name
   * @return {string}
   */
  static className() {
    return 'Auth';
  }

  /**
   * Login the user with the given credentials
   *
   * @param {Object} data the data to be sent in the request body
   * @return {Promise} response with the user signed in
   */
  static signIn(data) {
    // save the user cookie
    const methodName = ' signIn() ';
    const url = AuthUrls.signIn();
    Logger.log(this.className() + methodName);
    return new Promise((resolve, reject) => {
      HttpRequester.post(url, data)
        .then((response) => {
          const methodName = ' then(..) ';
          Logger.log(this.className() + methodName + 'response = ', response);
          /* get the user data */
          const userData = {};
          userData.token = response.data.data.token;
          userData.name = response.data.data.user.name;
          userData.email = response.data.data.user.email;
          userData.id = response.data.data.user.id;
          userData.logged = true;

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
  static signUp(data) {
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

  /**
   * @param {Object} data the data to be sent in the request body
   * @return {Promise} the authenticated user
   */
  static async getAuthenticatedUser(data = {}) {
    const methodName = ' getAuthenticatedUser() ';
    const url = AuthUrls.getAuthenticatedUser();
    Logger.log(this.className() + methodName);

    // try to get the current authenticated user
    try {
      const response = await HttpRequester.post(url, data);
      const user = response.data.data;
      return user;
    } catch (error) {
      throw error;
    }
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
