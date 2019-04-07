import BaseUrls from './base-urls';
import UserUrls from './user-urls';
/**
 * this class defines the api urls related to the auth
 */

export default {
  /**
   * @return {string} the auth api base url
   */
  base() {
    return BaseUrls.base() + '/auth';
  },

  /**
   * @return {string} the signup api url
   */
  signup() {
    return this.base() + '/register';
  },

  /**
   * @return {string} the login api url
   */
  signin() {
    return this.base() + '/login';
  },

  /**
   * @return {string} the logout api url
   */
  logout() {
    return this.base() + '/logout';
  },

  /**
   * @return {string} the authenticated user api url
   */
  getAuthenticatedUser() {
    return UserUrls.getAuthenticatedUser();
  },

  /**
   * @return {string} the refresh token api url
   */
  refreshToken() {
    return this.base() + '/refresh';
  },
}
;
