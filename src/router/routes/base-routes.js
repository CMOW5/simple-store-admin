
/**
 * the router routes related to the product
 */
export default class BaseRoutes {
  /**
   * @return {string}
   */
  static base() {
    // return '/';
    return '/inspiration-admin/';
  }

  /**
   * @return {string}
   */
  static dashboard() {
    return this.base();
  }
}


