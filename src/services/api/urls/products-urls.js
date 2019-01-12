import BaseUrls from './base-urls';

/* utils */
import isString from 'lodash/isString';

/**
 * this helper class provides methods to get the
 * urls related to the products admin
 */
export default class ProductsUrls extends BaseUrls {
  /**
   * total products count url
   * @return {string}
   */
  static count() {
    return this.base() + '/admin/products/count';
  }

  /**
   * url to fetch products from db
   *
   * @param {number} params
   * @param {number} url
   * @return {string}
   */
  static fetchProducts(params={}, url) {
    if (isString(url)) {
      // just append the query params to the given url
      return url + '&' + this.buildQueryParameters(params);
    } else {
      return this.base() +
        '/admin/products?' + this.buildQueryParameters(params);
    }
  }

  /**
   * url to fetch products from db
   *
   * @param {number} id
   * @return {string}
   */
  static fetchProduct(id) {
    return this.base() + `/admin/products/${id}`;
  }

  /**
   * url to fetch products from db
   * @return {string}
   */
  static create() {
    return this.base() + '/admin/products';
  }

  /**
   * url to fetch products from db
   *
   * @param {number} id resource id
   * @return {string}
   */
  static update(id) {
    return this.base() + `/admin/products/${id}`;
  }

  /**
   * url to fetch products from db
   * @param {number} id product id
   * @return {string}
   */
  static delete(id) {
    return this.base() + `/admin/products/${id}`;
  }
}
