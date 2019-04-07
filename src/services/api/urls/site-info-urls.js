import BaseUrls from './base-urls';

/**
 * this helper class provides methods to get the
 * urls related to the products admin
 */
export default {
  /**
   * get the base api url
   * @return {string} the base url
   */
  base() {
    return BaseUrls.base() + '/admin/siteinfo';
  },

  /**
   * url to fetch products from db
   *
   * @param {number} params
   * @param {number} url
   * @return {string}
   */
  fetchInfo() {
    return this.base();
  },

  /**
   * url to update the site with the given id
   *
   * @param {number} id resource id
   * @return {string}
   */
  update(id) {
    return this.base() + `/${id}`;
  },
};
