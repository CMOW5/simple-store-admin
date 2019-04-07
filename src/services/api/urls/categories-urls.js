import BaseUrls from './base-urls';

/* utils */
import isString from 'lodash/isString';


/**
 * this helper class provides methods to get the
 * urls related to the categories admin
 */
export default {
  base() {
    return BaseUrls.base();
  },
  /**
   * url to get the total count of categories
   * @return {string}
   */
  count() {
    return this.base() + '/admin/categories/count';
  },

  /**
   * url to fetch all the categories in the db
   *
   * @param {number} params
   * @param {number} url
   * @return {string}
   */
  fetchAllCategories(params={}, url) {
    if (isString(url)) {
      // just append the query params to the given url
      return url + '&' + this.buildQueryParameters(params);
    } else {
      return this.base() +
        '/admin/categories?' + this.buildQueryParameters(params);
    }
  },

  /**
   * url to fetch a category from the db
   *
   * @param {number} id
   * @return {string}
   */
  fetchCategory(id) {
    return this.base() + `/admin/categories/${id}`;
  },

  /**
   * url to create a new category
   * @return {string}
   */
  create() {
    return this.base() + '/admin/categories';
  },

  /**
   * url to update a category in the db
   * @param {number} id the category id
   * @return {string}
   */
  update(id) {
    return this.base() + `/admin/categories/${id}`;
  },

  /**
   * url to delete a category in the db
   * @param {number} id the category id
   * @return {string}
   */
  delete(id) {
    return this.base() + `/admin/categories/${id}`;
  },

  // TODO: this should be inherited from BaseUrls class
  buildQueryParameters: BaseUrls.buildQueryParameters,
  isEmpty: BaseUrls.isEmpty,
};
