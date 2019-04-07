import BaseUrls from './base-urls';
/**
 * this class defines the api urls related to the auth
 */
export default class AuthUrls extends BaseUrls {
  /**
   * @return {string} the base url
   */
  static base() {
    return super.base() + '/auth';
  }

  /**
   * @return {string} the sigup api url
   */
  static signup() {
    return this.base() + '/register';
  }

  /**
   * @return {string} the sigin api url
   */
  static signin() {
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
