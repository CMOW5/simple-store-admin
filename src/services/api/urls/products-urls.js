import BaseUrls from './base-urls';

/* utils */
import isString from 'lodash/isString';

/**
 * this helper class provides methods to get the
 * urls related to the products admin
 */
export default {
  base() {
    return BaseUrls.base();
  },
  /**
   * total products count url
   * @return {string}
   */
  count() {
    return this.base() + '/admin/products/count';
  },

  /**
   * url to fetch products from db
   *
   * @param {number} params
   * @param {number} url
   * @return {string}
   */
  fetchProducts(params={}, url) {
    if (isString(url)) {
      // just append the query params to the given url
      return url + '&' + this.buildQueryParameters(params);
    } else {
      return this.base() +
        '/admin/products?' + this.buildQueryParameters(params);
    }
  },

  /**
   * url to fetch products from db
   *
   * @param {number} id
   * @return {string}
   */
  fetchProduct(id) {
    return this.base() + `/admin/products/${id}`;
  },

  /**
   * url to fetch products from db
   * @return {string}
   */
  create() {
    return this.base() + '/admin/products';
  },

  /**
   * url to fetch products from db
   *
   * @param {number} id resource id
   * @return {string}
   */
  update(id) {
    return this.base() + `/admin/products/${id}`;
  },

  /**
   * url to fetch products from db
   * @param {number} id product id
   * @return {string}
   */
  delete(id) {
    return this.base() + `/admin/products/${id}`;
  },

  // TODO: this should be inherited from BaseUrls class
  buildQueryParameters: BaseUrls.buildQueryParameters,
  isEmpty: BaseUrls.isEmpty,
};
