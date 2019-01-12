import BaseUrls from './base-urls';

/* utils */
import isString from 'lodash/isString';

/**
 * this helper class provides methods to get the
 * urls related to the categories admin
 */
export default class CategoriesUrls extends BaseUrls {
  /**
   * url to get the total count of categories
   * @return {string}
   */
  static count() {
    return this.base() + '/admin/categories/count';
  }

  /**
   * url to fetch all the categories in the db
   *
   * @param {number} params
   * @param {number} url
   * @return {string}
   */
  static fetchAllCategories(params={}, url) {
    if (isString(url)) {
      // just append the query params to the given url
      return url + '&' + this.buildQueryParameters(params);
    } else {
      return this.base() +
        '/admin/categories?' + this.buildQueryParameters(params);
    }
  }

  /**
   * url to fetch all the categories in the db
   *
   * @param {number} page
   * @return {string}
   */
  /*
  static fetchAllCategories() {
    return this.base() + `/admin/categories`;
  }
  */

  /**
   * url to fetch a category from the db
   *
   * @param {number} id
   * @return {string}
   */
  static fetchCategory(id) {
    return this.base() + `/admin/categories/${id}`;
  }

  /**
   * url to create a new category
   * @return {string}
   */
  static create() {
    return this.base() + '/admin/categories';
  }

  /**
   * url to update a category in the db
   * @param {number} id the category id
   * @return {string}
   */
  static update(id) {
    return this.base() + `/admin/categories/${id}`;
  }

  /**
   * url to delete a category in the db
   * @param {number} id the category id
   * @return {string}
   */
  static delete(id) {
    return this.base() + `/admin/categories/${id}`;
  }
}
