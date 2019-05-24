
/**
 * this class provides an interface to
 * handle the paginator data from the api responses
 */
export default class Paginator {
  /**
     * Create a new paginator instance
     *
     * @param {object} data
     */
  constructor(data) {
    if (data) {
      Object.keys(data).forEach((field) => {
        this[field] = data[field];
      });
    } else {
      this.currentPage = '';
      this.currentPageUrl = '';
      this.hasMorePages = false;
      this.nextPage = '';
      this.nextPageUrl = '';
      this.hasPrevious = false;
      this.previousPage = false;
      this.previousPageUrl = '';
      this.pageSize = 0;
      this.totalPages = 0;
      this.lastPage = 0;
      this.count = 0; // TODO: refactor this
      this.path = '';
    }
  }

  /**
     * get the current page number.
     *
     * @return {Number}
     */
  getCurrentPage() {
    return this.currentPage;
  }

  /**
     * get the current page url.
     *
     * @return {String}
     */
  getCurrentPageUrl() {
    return this.currentPageUrl;
  }

  /**
     * get the next page url.
     *
     * @return {String}
     */
  getNextPageUrl() {
    return this.nextPageUrl;
  }

  /**
     * get the previous page url.
     *
     * @return {String}
     */
  getPreviousPageUrl() {
    return this.previousPageUrl;
  }

  /**
     * get the number of items per page
     *
     * @return {String}
     */
  getPerPage() {
    return this.pageSize;
  }

  /**
     * get the current page number.
     *
     * @return {Number}
     */
  getFirstPage() {
    return 0;
  }

  /**
     * get the last page number
     *
     * @return {String}
     */
  getLastPage() {
    return this.lastPage;
  }

  /**
     * check if the paginator has more pages
     *
     * @return {Bool}
     */
  //  hasMorePages() {
  //    return this.hasMorePages;
  //  }

  /**
     * get the total of items fetched
     *
     * @return {Number}
     */
  getCount() {
    return this.count;
  }

  /**
     * get the total of items stored the db (not fetched incluided)
     *
     * @return {Number}
     */
  getTotalPages() {
    return this.totalPages;
  }

  /**
     * get the base path
     *
     * @return {String}
     */
  getPath() {
    return this.path;
  }

  /**
     * build the url with the given page
     *
     * @param {Number} page
     * @return {String}
     */
  buildUrl(page=1) {
    return `${this.path}?page=${page}&size=${this.pageSize}`;
  }

  /**
     * determine if a paginator is needed
     * @return {Bool}
     */
  shouldRender() {
    return this.hasMorePages || this.hasPrevious;
  }
}
