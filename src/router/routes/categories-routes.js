import BaseRoutes from './base-routes';
/**
 * the front end routes related to the categories (react router)
 */
export default class CategoriesRoutes extends BaseRoutes {
  /**
   * @return {string}
   */
  static base() {
    return super.base() + 'categories';
  }

  /**
   * @param {number} id
   * @return {string}
   */
  static show(id=':id') {
    return `${this.base()}/show/${id}`;
  }

  /**
   * @return {string}
   */
  static create() {
    return `${this.base()}/create`;
  }


  /**
   * @param {number} id
   * @return {string}
   */
  static edit(id=':id') {
    return `${this.base()}/edit/${id}`;
  }
}


