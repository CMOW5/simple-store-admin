import React, {Component} from 'react';

/* styles */
import './pagination.css';
/**
 * pagination component
 * TODO: this component needs a refactor, its too complex to understand
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
    this.shouldRender = this.shouldRender.bind(this);
    this.MAXIMUM_PAGES = 10;
    this.MIN_PAGE_BREAKPOINT = 6;
    this.LAST_PAGE_BREAKPOINT = 4;
    this.MIDDLE_PAGE_BREAKPOINT = 3;
  }

  /**
   * go to the next pagination item
   */
  goToNext() {
    const url = this.props.paginator.getNextPageUrl();
    this.props.onPageSelected(url);
  }

  /**
   * go to the previous pagination item
   */
  goToPrev() {
    const url = this.props.paginator.getPreviousPageUrl();
    this.props.onPageSelected(url);
  }

  /**
   * go to the given page number
   * @param {Number} page
   */
  goToPage(page) {
    const url = this.props.paginator.buildUrl(page);
    this.props.onPageSelected(url);
  }

  /**
   * render the pagination items
   *
   * @param {Paginator} paginator
   * @return {*}
   */
  renderPaginationItems(paginator) {
    const currentPage = paginator.getCurrentPage();
    const lastPage = paginator.getLastPage();

    // render all pages
    if (lastPage <= this.MAXIMUM_PAGES) {
      return this.renderAllpages(paginator);
    }

    // middle pagination
    if ((currentPage - this.MIDDLE_PAGE_BREAKPOINT > 1) &&
      (lastPage - currentPage > this.MIDDLE_PAGE_BREAKPOINT)) {
      return this.renderMiddlePages(paginator);
    }

    // first pagination
    if (currentPage - 5 <= 1 && lastPage - currentPage > 4) {
      return this.renderFirstPages(paginator);
    }

    // last pagination
    if (lastPage - currentPage <= 4) {
      return this.renderLastPages(paginator);
    }

    return [];
  }

  /**
   * render the pages from current to last page
   * @param {Number} paginator
   * @return {*}
   */
  renderAllpages(paginator) {
    const currentPage = paginator.getCurrentPage();
    const lastPage = paginator.getTotalPages();
    let pages = [];

    for (let pageLabel = 1, pageNumber = paginator.getFirstPage();
      pageLabel <= lastPage; pageLabel++, pageNumber++) {
      const page = pageNumber === currentPage ?
        this.getPageItem(pageNumber, pageLabel, true) :
        this.getPageItem(pageNumber, pageLabel);
      pages.push(page);
    }
    return pages;
  }

  /**
   * get a styled page item
   *
   * @param {*} pageNumber
   * @param {*} pageLabel
   * @param {*} isCurrentPage
   * @return {*}
   */
  getPageItem(pageNumber, pageLabel = pageNumber, isCurrentPage = false) {
    const clazz =
      isCurrentPage ? 'pagination-link is-current' : 'pagination-link';
    const ariaLabel =
      isCurrentPage ? 'page' + pageNumber : 'go to page' + pageNumber;
    return (
      <a
        onClick = {this.goToPage.bind(this, pageNumber)}
        className = {clazz}
        aria-label = {ariaLabel}
        aria-current = "page"
      >
        {pageLabel}
      </a>);
  }

  /**
   * render the first pages like this
   * last page = 20
   * current page <= 5
   *
   * 1 2 3 4 5 6 ... 20
   *
   * @param {Number} paginator
   * @return {*}
   */
  renderFirstPages(paginator) {
    const currentPage = paginator.getCurrentPage();
    const totalPages = paginator.getTotalPages();
    let pages = [];

    for (let pageLabel = 1, pageNumber = paginator.getFirstPage();
      pageLabel <= this.MIN_PAGE_BREAKPOINT; pageLabel++, pageNumber++) {
      const page =
        pageNumber === currentPage ?
          this.getPageItem(pageNumber, pageLabel, true) :
          this.getPageItem(pageNumber, pageLabel);
      pages.push(page);
    }
    pages.push(this.getSeparator());
    pages.push(this.getPageItem(paginator.getLastPage(), totalPages));

    return pages;
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
   * render the last pages like this
   * last page = 20
   *
   * 1 ... 16 17 18 19 20
   *
   * @param {Number} paginator
   * @return {*}
   */
  renderLastPages(paginator) {
    const currentPage = paginator.getCurrentPage();
    const totalPages = paginator.getTotalPages();
    let pages = [];
    pages.push(this.getPageItem(0, 1));
    pages.push(this.getSeparator());

    for (let pageLabel = totalPages - this.LAST_PAGE_BREAKPOINT,
      pageNumber = paginator.getLastPage() - this.LAST_PAGE_BREAKPOINT;
      pageLabel <= totalPages; pageLabel++, pageNumber++) {
      const page =
        pageNumber === currentPage ?
          this.getPageItem(pageNumber, pageLabel, true) :
          this.getPageItem(pageNumber, pageLabel);
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
   * @param {Number} paginator
   * @param {Number} lastPage
   * @return {*}
   */
  renderMiddlePages(paginator) {
    const currentPage = paginator.getCurrentPage();
    const totalPages = paginator.getTotalPages();
    const firstPageItem = this.getPageItem(paginator.getFirstPage(), 1);
    const beforeCurrentPageItem =
      this.getPageItem(currentPage - 1, currentPage);
    const currentPageItem =
      this.getPageItem(currentPage, currentPage + 1, true);
    const afterCurrentPageItem =
      this.getPageItem(currentPage + 1, currentPage + 2);
    const lastPageItem =
      this.getPageItem(paginator.getLastPage(), totalPages);
    let pages = [];
    pages.push(firstPageItem);
    pages.push(this.getSeparator());
    pages.push(beforeCurrentPageItem);
    pages.push(currentPageItem);
    pages.push(afterCurrentPageItem);
    pages.push(this.getSeparator());
    pages.push(lastPageItem);
    return pages;
  }

  /**
   * determine if the pagination should render or not
   * @return {boolean}
   */
  shouldRender() {
    return (this.props.paginator.hasMorePages ||
      this.props.paginator.hasPrevious);
  }

  /**
   * @return {ReactNode}
   */
  render() {
    const paginator = this.props.paginator;
    const pages = this.renderPaginationItems(paginator).map((page, index) => {
      return <li key={index}>{page}</li>;
    });

    if (!this.shouldRender()) return null;

    return (
      <div className="pagination-container has-background-light">

        <nav
          className = "pagination is-centered is-rounded"
          aria-label="pagination" >

          <a
            onClick = {this.goToPrev}
            className = "pagination-previous"
            disabled = {!paginator.hasPrevious}>
            Previous
          </a>

          <a
            onClick = {this.goToNext}
            className = "pagination-next"
            disabled = {!paginator.hasMorePages}>
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
