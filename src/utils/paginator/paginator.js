
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
      this.current_page = '';
      this.current_page_url = '';
      this.next_page_url = '';
      this.prev_page_url = '';
      this.path = '';
      this.per_page = 0;
      this.last_page = 0;
      this.has_more_pages = false;
      this.count = 0;
      this.total = 0;
    }
  }

  /**
     * get the current page number.
     *
     * @return {Number}
     */
  currentPage() {
    return this.current_page;
  }

  /**
     * get the current page url.
     *
     * @return {String}
     */
  currentPageUrl() {
    return this.current_page_url;
  }

  /**
     * get the next page url.
     *
     * @return {String}
     */
  nextPageUrl() {
    return this.next_page_url;
  }

  /**
     * get the previous page url.
     *
     * @return {String}
     */
  previousPageUrl() {
    return this.prev_page_url;
  }

  /**
     * get the number of items per page
     *
     * @return {String}
     */
  perPage() {
    return this.per_page;
  }

  /**
     * get the last page number
     *
     * @return {String}
     */
  lastPage() {
    return this.last_page;
  }

  /**
     * check if the paginator has more pages
     *
     * @return {Bool}
     */
  hasMorePages() {
    return this.has_more_pages;
  }

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
  totalPages() {
    return this.total;
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
    return `${this.path}?page=${page}`;
  }

  /**
     * determine if a paginator is needed
     * @return {Bool}
     */
  shouldRender() {
    return this.nextPageUrl() || this.previousPageUrl();
  }
}
