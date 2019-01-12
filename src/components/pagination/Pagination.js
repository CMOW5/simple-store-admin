import React, {Component} from 'react';

/* styles */
import './pagination.css';
/**
 * pagination component
 */
class Pagination extends Component {
  /**
   * @param {object} props {paginator, onPageSelected}
   */
  constructor(props) {
    super(props);
    this.goToNext = this.goToNext.bind(this);
    this.goToPrev = this.goToPrev.bind(this);
    this.goToPage = this.goToPage.bind(this);
    this.renderPaginationItems = this.renderPaginationItems.bind(this);
    this.renderAllpages = this.renderAllpages.bind(this);
    this.renderFirstPages = this.renderFirstPages.bind(this);
    this.renderLastPages = this.renderLastPages.bind(this);
    this.renderMiddlePages = this.renderMiddlePages.bind(this);
    this.MAXIMUM_PAGES = 10;
  }

  /**
   * go to the next pagination item
   */
  goToNext() {
    const url = this.props.paginator.nextPageUrl();
    this.props.onPageSelected(url);
  }

  /**
   * go to the previous pagination item
   */
  goToPrev() {
    const url = this.props.paginator.previousPageUrl();
    this.props.onPageSelected(url);
  }

  /**
   * go to the given page number
   * @param {Number} page
   */
  goToPage(page) {
    this.props.onPageSelected(page);
  }

  /**
   * get a styled unselected page item
   * @param {*} index
   * @return {*}
   */
  getPageItem(index) {
    return (
      <a
        onClick = {this.goToPage.bind(this, index)}
        className="pagination-link" aria-label="Goto page"
      >
        {index}
      </a>);
  }

  /**
   * get a styled current page item
   * @param {*} index
   * @return {*}
   */
  getCurrentPageItem(index) {
    return (
      <a
        onClick = {this.goToPage.bind(this, index)}
        className = "pagination-link is-current"
        aria-label="Page 46"
        aria-current="page">
        {index}
      </a>);
  }

  /**
   * render a 3 dots separator between pages item
   * @param {*} index
   * @return {*}
   */
  getSeparator() {
    return <span className="pagination-ellipsis">&hellip;</span>;
  }

  /**
   * render the pages from current to last page
   * @param {Number} currentPage
   * @param {Number} lastPage
   * @return {*}
   */
  renderAllpages(currentPage, lastPage) {
    let pages = [];

    for (let i = 1; i <= lastPage; i ++ ) {
      const page =
        i === currentPage ? this.getCurrentPageItem(i) : this.getPageItem(i);
      pages.push(page);
    }
    return pages;
  }

  /**
   * render the first pages like this
   * last page = 20
   * current page <= 5
   *
   * 1 2 3 4 5 6 ... 20
   *
   * @param {Number} currentPage
   * @param {Number} lastPage
   * @return {*}
   */
  renderFirstPages(currentPage, lastPage) {
    let pages = [];

    for (let i = 1; i <= 6; i ++ ) {
      const page =
        i === currentPage ? this.getCurrentPageItem(i) : this.getPageItem(i);
      pages.push(page);
    }
    pages.push(this.getSeparator());
    pages.push(this.getPageItem(lastPage));

    return pages;
  }

  /**
   * render the last pages like this
   * last page = 20
   *
   * 1 ... 16 17 18 19 20
   *
   * @param {Number} currentPage
   * @param {Number} lastPage
   * @return {*}
   */
  renderLastPages(currentPage, lastPage) {
    let pages = [];

    pages.push(this.getPageItem(1));
    pages.push(this.getSeparator());
    for (let i = lastPage - 4; i <= lastPage; i ++ ) {
      const page =
        i === currentPage ? this.getCurrentPageItem(i) : this.getPageItem(i);
      pages.push(page);
    }
    return pages;
  }

  /**
   * render the middle pages like this
   * last page = 20
   * current page = 7
   *
   * 1 ... 6 7 8 .. 20
   *
   * @param {Number} currentPage
   * @param {Number} lastPage
   * @return {*}
   */
  renderMiddlePages(currentPage, lastPage) {
    let pages = [];
    const firstPageItem = this.getPageItem(1);
    const lastPageItem = this.getPageItem(lastPage);

    pages.push(firstPageItem);
    pages.push(this.getSeparator());

    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
      const page =
        i === currentPage ? this.getCurrentPageItem(i) : this.getPageItem(i);
      pages.push(page);
    }

    pages.push(this.getSeparator());
    pages.push(lastPageItem);

    return pages;
  }

  /**
   * render the pagination items
   *
   * @param {Paginator} paginator
   * @return {*}
   */
  renderPaginationItems(paginator) {
    const currentPage = paginator.currentPage();
    const lastPage = paginator.lastPage();

    // render all pages
    if (lastPage <= this.MAXIMUM_PAGES) {
      return this.renderAllpages(currentPage, lastPage);
    }

    // middle pagination
    if (currentPage - 4 > 1 && lastPage - currentPage > 4) {
      return this.renderMiddlePages(currentPage, lastPage);
    }

    // first pagination
    if (currentPage - 5 <= 1 && lastPage - currentPage > 4) {
      return this.renderFirstPages(currentPage, lastPage);
    }

    // last pagination
    if (lastPage - currentPage <= 4) {
      return this.renderLastPages(currentPage, lastPage);
    }

    return [];
  }

  /**
   * @return {ReactNode}
   */
  render() {
    const paginator = this.props.paginator;
    const currentPage = paginator.currentPage();
    const hasMorePages = paginator.hasMorePages();
    const pages = this.renderPaginationItems(paginator).map((page, index) => {
      return <li key={index}>{page}</li>;
    });

    if (!paginator.shouldRender()) return null;

    return (
      <div className="pagination-container">

        <nav
          className = "pagination is-centered is-rounded"
          aria-label="pagination" >

          <a
            onClick = {this.goToPrev}
            className = "pagination-previous"
            disabled = {currentPage === 1}>
            Previous
          </a>

          <a
            onClick = {this.goToNext}
            className = "pagination-next"
            disabled = {!hasMorePages}>
            Next page
          </a>

          <ul className="pagination-list">
            {pages}
          </ul>

        </nav>

      </div>
    );
  }
}

export default Pagination;
