import HttpRequester from 'services/api/http-requester';
import SiteInfoUrls from '../urls/site-info-urls';

/* utils */
import Logger from 'utils/logger/logger';

/**
 * class to make http request related to the products admin
 */
export default class SiteInfoRequest {
  /**
   * @return {string}
   */
  static className() {
    return 'SiteInfoRequest';
  }

  /**
   * Get the products with the given page
   *
   * @param {object} queryParams query parameters
   * @param {string} optionalUrl (optional) use this optional url instead
   *  of the default url
   * @return {*}
   */
  static getInfo() {
    let url = SiteInfoUrls.fetchInfo();

    return new Promise((resolve, reject) => {
      HttpRequester.get(url)
        .then((response) => {
          const info = response.data.data;
          resolve(info);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * update the product with the given id
   *
   * @param {number} id
   * @param {Object} data
   * @return {*}
   */
  static updateInfo(id, data) {
    const methodName = ' updateProduct() ';
    Logger.log(this.className() + methodName);

    let url = SiteInfoUrls.update(id);

    return new Promise((resolve, reject) => {
      HttpRequester.post(url, data)
        .then((response) => {
          const methodName = ' then(..) ';
          Logger.log(this.className() + methodName + 'data = ' + response);

          /* get the updated info data */
          const info = response.data.data.siteinfo;
          resolve(info);
        })
        .catch((error) => {
          const methodName = ' catch(..) ';
          Logger.log(this.className() + methodName + 'data = ' + error);
          reject(error);
        });
    });
  }
}
