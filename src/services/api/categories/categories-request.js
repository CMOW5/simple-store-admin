import httpRequester from 'services/api/http-requester';
import categoriesUrls from '../urls/categories-urls';

/* utils */
import logger from 'utils/logger/logger';

/* models */
import Category from 'models/category';

const responseContentKey = 'content';

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
          const count = response.data[responseContentKey] || 0;
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
          const categoryData = response.data[responseContentKey];
          const category = new Category(categoryData);
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
   * @return {Promise} a promise containig an array of Categories
   */
  static fetchAllCategories(queryParams={}, optionalUrl) {
    let url = categoriesUrls.fetchAllCategories(queryParams, optionalUrl);

    return new Promise((resolve, reject) => {
      httpRequester.get(url)
        .then((response) => {
          // TODO: think about what is going to happen when
          // the response.data.content is not an array (something wrong)
          // with the api, provide some info about the error
          const categoriesData = response.data[responseContentKey] || [];
          const paginator = response.data.paginator;

          const orderedCategories = this._orderByName(categoriesData);

          const categories = orderedCategories.map((categoryData) => {
            return new Category(categoryData);
          });

          resolve({categories: categories, paginator: paginator});
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * create a new category
   *
   * @param {Object} categoryData
   * @return {Promise} Promise
   */
  static createCategory(categoryData) {
    const methodName = ' createCategory() ';
    logger.log(this.className() + methodName);

    let url = categoriesUrls.create();

    return new Promise((resolve, reject) => {
      httpRequester.post(url, categoryData)
        .then((response) => {
          const methodName = ' then(..) ';
          logger.log(this.className() + methodName + 'data = ', response);

          /* get the created category data */
          const createdCategoryData = response.data[responseContentKey];
          const createdCategory = new Category(createdCategoryData);
          resolve(createdCategory);
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
   * @param {Object} categoryData
   * @return {Promise}
   */
  static updateCategory(id, categoryData) {
    const methodName = ' updateProduct() ';
    logger.log(this.className() + methodName);

    let url = categoriesUrls.update(id);

    return new Promise((resolve, reject) => {
      httpRequester.put(url, categoryData)
        .then((response) => {
          const methodName = ' then(..) ';
          logger.log(this.className() + methodName + 'data = ' + response);

          /* get the updated category data */
          const updatedCategoryData = response.data[responseContentKey];
          const updatedCategory = new Category(updatedCategoryData);
          resolve(updatedCategory);
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
          resolve(response.data);
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
  static _orderByName(categories = []) {
    let orderedCategories = categories.slice();
    orderedCategories.sort(this._compareCategories);
    return orderedCategories;
  }

  /**
   * a comparator function to compare 2 categories names
   * @param {*} cat1
   * @param {*} cat2
   * @return {number}
   */
  static _compareCategories(cat1, cat2) {
    if (cat1.name < cat2.name) {
      return -1;
    }

    if (cat1.name > cat2.name) {
      return 1;
    }

    return 0;
  }
}
