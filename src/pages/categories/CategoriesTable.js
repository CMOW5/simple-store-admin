import React, {Component} from 'react';

/* routes */
import {withRouter} from 'react-router-dom';
import RouterHandler from 'router/router-handler';
import categoriesRoutes from 'router/routes/categories-routes';

/* api */
import categoriesRequest
  from 'services/api/categories/categories-request';

/* utils */
import Paginator from 'utils/paginator/paginator';
import template from './categories-table-template';

/* components */
import ResponsiveTable from 'components/table/ResponsiveTable';
import Loading from 'components/utils/loading/Loading';
import DeleteCategoryModal from './delete/DeleteCategoryModal';

import Pagination from 'components/pagination/Pagination';

/** */
class CategoriesTable extends Component {
  /**
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      tableTemplate: template,
      paginator: new Paginator(),
      selectedCategoryToDelete: {},
      showDeleteModal: false,
      searchKeyword: '',
      isFetching: true,
    };
    this.fetchCategories = this.fetchCategories.bind(this);

    this.goToCategoryCreate = this.goToCategoryCreate.bind(this);
    this.goToCategoryEdit = this.goToCategoryEdit.bind(this);
    this.goToCategoryShow = this.goToCategoryShow.bind(this);
    this.onActionButtonClicked = this.onActionButtonClicked.bind(this);
    this.onDeleteSucess = this.onDeleteSucess.bind(this);
    this.onDeleteCancel = this.onDeleteCancel.bind(this);
  }

  /**
   *
   */
  componentDidMount() {
    // check if the user is logged
    this.fetchCategories();
  }

  /**
   * @param {object} params
   * @param {string} url
   * TODO: improve the setState calls
   */
  async fetchCategories(params={}, url) {
    params.keyword = this.state.searchKeyword;
    this.setState({
      isFetching: true,
    });
    const response = await categoriesRequest.fetchAllCategories(params, url);
    const categories = response.categories;
    const tableTemplate = this.state.tableTemplate;
    tableTemplate.body.data = categories;

    this.setState({
      categories: categories,
      paginator: new Paginator(response.paginator),
      tableTemplate: tableTemplate,
      isFetching: false,
    });
  }

  /**
   * @param {*} searchText
   */
  onSearch(searchText) {
    console.log('on search', searchText);
  }

  /**
   * @param {*} button
   * @param {*} rowData
   */
  onActionButtonClicked(button, rowData) {
    const action = button.action;
    const selectedCategory = rowData;

    if (action === 'show') {
      this.goToCategoryShow(selectedCategory.id);
    } else if (action === 'edit') {
      this.goToCategoryEdit(selectedCategory.id);
    } else if (action === 'delete') {
      this.showDeleteModal(selectedCategory);
    }
  }

  /** */
  goToCategoryCreate() {
    const route = categoriesRoutes.create();
    RouterHandler.goTo(this.props.history, route);
  }

  /**
   * notify the parent that the see edit button was clicked
   * @param {number} categoryId
   */
  goToCategoryEdit(categoryId) {
    const route = categoriesRoutes.edit(categoryId);
    RouterHandler.goTo(this.props.history, route);
  }

  /**
   * notify the parent that the see edit button was clicked
   * @param {number} categoryId
   */
  goToCategoryShow(categoryId) {
    const route = categoriesRoutes.show(categoryId);
    RouterHandler.goTo(this.props.history, route);
  }

  /**
   * @param {object} category
   */
  showDeleteModal(category) {
    this.setState({
      selectedCategoryToDelete: category,
      showDeleteModal: true,
    });
  }

  /**
   *
   */
  onDeleteSucess() {
    this.setState({
      selectedCategoryToDelete: {},
      showDeleteModal: false,
    }, this.fetchCategories);
  }

  /** */
  onDeleteCancel() {
    this.setState({
      selectedCategoryToDelete: {},
      showDeleteModal: false,
    });
  }

  onPageSelected = (url) => {
    console.log(url);
  }

  /**
   * @return {ReactNode}
   */
  render() {
    return this.state.isFetching ? <Loading show={true} title="categories" /> :
      (
        <React.Fragment>
          <ResponsiveTable
            template = {this.state.tableTemplate}
            paginator = {this.state.paginator}
            onSearch = {this.onSearch}
            onActionButtonClicked = {this.onActionButtonClicked}
            onCreateButtonClicked = {this.goToCategoryCreate}
          />

          <Pagination
            paginator = {this.state.paginator}
            onPageSelected = {this.onPageSelected}
          />

          <DeleteCategoryModal
            show = {this.state.showDeleteModal}
            category = {this.state.selectedCategoryToDelete}
            onDeleteSucess = {this.onDeleteSucess}
            onDeleteCancel = {this.onDeleteCancel}
          />
        </React.Fragment>
      );
  }
}

export default withRouter((CategoriesTable));

/*
return (
      <div>
        {this.renderMainTable()}

        <DeleteCategoryModal
          show = {this.state.showDeleteModal}
          category = {this.state.selectedCategoryToDelete}
          onDeleteSucess = {this.onDeleteSucess}
          onDeleteCancel = {this.onDeleteCancel}
        />
      </div>
    );
    */
