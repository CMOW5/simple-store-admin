import BaseUrls from './base-urls';

/**
 * this helper class provides methods to get the
 * urls related to the products admin
 */
export default class SiteInfoUrls extends BaseUrls {
  /**
   * get the base api url
   * @return {string} the base url
   */
  static base() {
    return super.base() + '/admin/siteinfo';
  }

  /**
   * url to fetch products from db
   *
   * @param {number} params
   * @param {number} url
   * @return {string}
   */
  static fetchInfo() {
    return this.base();
  }

  /**
   * url to update the site with the given id
   *
   * @param {number} id resource id
   * @return {string}
   */
  static update(id) {
    return this.base() + `/${id}`;
  }
}
