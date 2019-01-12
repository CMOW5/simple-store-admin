import BaseUrls from './base-urls';
/**
 * this class defines the api urls related to the auth
 */
export default class AuthUrls extends BaseUrls {
  /**
   * @return {string} the sigup api url
   */
  static signUp() {
    return this.base() + '/register';
  }

  /**
   * @return {string} the sigin api url
   */
  static signIn() {
    return this.base() + '/login';
  }

  /**
   * @return {string} the logout api url
   */
  static logout() {
    return this.base() + '/logout';
  }

  /**
   * @return {string} the authenticated user api url
   */
  static getAuthenticatedUser() {
    return this.base() + '/user';
  }

  /**
   * @return {string} the refresh token api url
   */
  static refreshToken() {
    return this.base() + '/refresh';
  }
}
