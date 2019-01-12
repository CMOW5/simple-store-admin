import httpRequester from 'services/api/http-requester';
import categoriesUrls from '../urls/categories-urls';

/* utils */
import logger from 'utils/logger/logger';

/**
 * class to make http request related to the categories admin
 */
export default class CategoriesRequest {
  /**
   * @return {string}
   */
  static className() {
    return 'CategoriesRequest';
  }

  /**
   * get the total categories count
   * @return {Promise}
   */
  static count() {
    const url = categoriesUrls.count();

    return new Promise((resolve, reject) => {
      httpRequester.get(url)
        .then((response) => {
          const count = response.data.content || 0;
          resolve(count);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * Get the category info
   *
   * @param {string} id the category id
   * @return {Promise} the category info
   */
  static fetchCategory(id) {
    let url = categoriesUrls.fetchCategory(id);

    return new Promise((resolve, reject) => {
      httpRequester.get(url)
        .then((response) => {
          const category = response.data.data;
          resolve(category);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * fetch all the categories
   *
   * @param {object} queryParams
   * @param {string} optionalUrl
   * @return {Promise}
   */
  static fetchAllCategories(queryParams={}, optionalUrl) {
    let url = categoriesUrls.fetchAllCategories(queryParams, optionalUrl);

    return new Promise((resolve, reject) => {
      httpRequester.get(url)
        .then((response) => {
          const categories = response.data.content || [];
          const paginator = response.data.paginator;
          const orderedCategories = this.orderByName(categories);
          resolve({categories: orderedCategories, paginator: paginator});
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * create a new category
   *
   * @param {Object} data
   * @return {Promise} Promise
   */
  static createCategory(data) {
    const methodName = ' createCategory() ';
    logger.log(this.className() + methodName);

    let url = categoriesUrls.create();

    return new Promise((resolve, reject) => {
      httpRequester.post(url, data)
        .then((response) => {
          const methodName = ' then(..) ';
          logger.log(this.className() + methodName + 'data = ', response);

          /* get the updated category data */
          const category = response.data.data.category;
          resolve(category);
        })
        .catch((error) => {
          const methodName = ' catch(..) ';
          logger.log(this.className() + methodName + 'data = ' + error);
          reject(error);
        });
    });
  }

  /**
   * update the category with the given id
   *
   * @param {Object} id
   * @param {Object} data
   * @return {Promise}
   */
  static updateCategory(id, data) {
    const methodName = ' updateProduct() ';
    logger.log(this.className() + methodName);

    let url = categoriesUrls.update(id);

    return new Promise((resolve, reject) => {
      httpRequester.post(url, data)
        .then((response) => {
          const methodName = ' then(..) ';
          logger.log(this.className() + methodName + 'data = ' + response);

          /* get the updated category data */
          const category = response.data.data.category;
          resolve(category);
        })
        .catch((error) => {
          const methodName = ' catch(..) ';
          logger.log(this.className() + methodName + 'data = ' + error);
          reject(error);
        });
    });
  }

  /**
   * delete the category with the given id
   *
   * @param {Object} id
   * @return {Promise}
   */
  static deleteCategory(id) {
    const methodName = ' deleteProduct() ';
    let url = categoriesUrls.delete(id);
    logger.log(this.className() + methodName);

    return new Promise((resolve, reject) => {
      httpRequester.delete(url)
        .then((response) => {
          const methodName = ' then(..) ';
          logger.log(this.className() + methodName + 'data = ' + response);
          resolve(response.data.data);
        })
        .catch((error) => {
          const methodName = ' catch(..) ';
          logger.log(this.className() + methodName + 'data = ' + error);
          reject(error);
        });
    });
  }

  /**
   * order the given categories by name
   * @param {array} categories
   * @return {array}
   */
  static orderByName(categories) {
    let orderedCategories = categories.slice();
    orderedCategories.sort(this.compareCategories);
    return orderedCategories;
  }

  /**
   * a comparator function to compare 2 categories names
   * @param {*} cat1
   * @param {*} cat2
   * @return {number}
   */
  static compareCategories(cat1, cat2) {
    if (cat1.name < cat2.name) {
      return -1;
    }

    if (cat1.name > cat2.name) {
      return 1;
    }

    return 0;
  }
}
