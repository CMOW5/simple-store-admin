import BaseUrls from './base-urls';

/**
 * this class defines the api urls related to the auth
 */
export default {
  base() {
    return BaseUrls.base() + '/user';
  },

  /**
   * @return {string} the sigup api url
   */
  getAuthenticatedUser() {
    return this.base() + '/me';
  },
};
