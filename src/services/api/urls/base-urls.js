/**
 * helper class to get the api urls
 */
export default class BaseUrls {
  /**
   * get the base api url
   * @return {string} the base url
   */
  static base() {
    return 'http://localhost:8000/api';
    // return 'https://inspirationbe.herokuapp.com/api';
  }

  /**
   * build the query param string from the params object
   * @param {object} params
   * @return {string}
   */
  static buildQueryParameters(params) {
    if (this.isEmpty(params)) return '';
    let queryParams = '';
    Object.keys(params).forEach((key) => {
      queryParams += `${key}=${params[key]}&`;
    });
    return `${queryParams}`.replace(new RegExp(' ', 'g'), '%20');
  }

  /**
   * check if the given object is empty
   *
   * @param {*} object
   * @return {boolean}
   */
  static isEmpty(object) {
    if (!object) return true;
    if (Object.keys(object).length > 0) return false;
    return true;
  }
}
