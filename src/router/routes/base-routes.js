
/**
 * the router routes related to the product
 */
export default class BaseRoutes {
  /**
   * @return {string}
   */
  static base() {
    // return '/';
    return '/simple-store/';
  }

  /**
   * @return {string}
   */
  static dashboard() {
    return this.base();
  }
}


