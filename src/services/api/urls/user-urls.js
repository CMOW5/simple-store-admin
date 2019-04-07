import BaseUrls from './base-urls';
/**
 * this class defines the api urls related to the auth
 */
export default class UserUrls extends BaseUrls {
  /**
   * @return {string} the base url
   */
  static base() {
    return super.base() + '/user';
  }

  /**
   * @return {string} the sigup api url
   */
  static getAuthenticatedUser() {
    return this.base() + '/me';
  }
}
