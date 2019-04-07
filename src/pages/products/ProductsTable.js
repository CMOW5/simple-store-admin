import React, {Component} from 'react';

/* routes */
import {withRouter} from 'react-router-dom';
import RouterHandler from 'router/router-handler';
import productRoutes from 'router/routes/products-routes';

/* api */
import ProductsRequest from 'services/api/products/products-request';

/* utils */
import Paginator from 'utils/paginator/paginator';
import template from './products-table-template';

/* components */
import ResponsiveTable from 'components/table/ResponsiveTable';
import Loading from 'components/utils/loading/Loading';
import DeleteProductModal from './delete/DeleteProductModal';

/**
 * product list component
 */
class ProductsTable extends Component {
  /**
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      tableTemplate: template,
      paginator: new Paginator(),
      selectedProductToDelete: {},
      showDeleteModal: false,
      searchKeyword: '',
      isFetching: true,
    };
    this.fetchProducts = this.fetchProducts.bind(this);
    this.renderMainTable = this.renderMainTable.bind(this);

    this.goToProductCreate = this.goToProductCreate.bind(this);
    this.goToProductEdit = this.goToProductEdit.bind(this);
    this.goToProductShow = this.goToProductShow.bind(this);
    this.onActionButtonClicked = this.onActionButtonClicked.bind(this);
    this.onDeleteSucess = this.onDeleteSucess.bind(this);
    this.onDeleteCancel = this.onDeleteCancel.bind(this);
  }

  /**
   *
   */
  componentDidMount() {
    // check if the user is logged
    this.fetchProducts();
  }

  /**
   * fetch the products from the db
   * @param {object} params
   * @param {string} url
   * TODO: improve the setState calls
   */
  async fetchProducts(params={}, url) {
    params.keyword = this.state.searchKeyword;
    this.setState({
      isFetching: true,
    });
    const response = await ProductsRequest.getProducts(params, url);
    const products = response.products;
    const tableTemplate = this.state.tableTemplate;
    tableTemplate.body.data = products;

    this.setState({
      products: products,
      paginator: new Paginator(response.paginator),
      tableTemplate: tableTemplate,
      isFetching: false,
    });
  }

  /**
   * render the products table or a loading icon
   * while the fetching is still in progress
   *
   * @param {array} productsRows
   * @return {ReactNode}
   * TODO: improve this function readability creating a new table component
   * and making the function pure (state.isFetching)
   */
  renderMainTable() {
    if (this.state.isFetching) {
      return <Loading show={true} title="products" />;
    } else {
      return (
        <ResponsiveTable
          template = {this.state.tableTemplate}
          onSearch = {this.onSearch}
          onActionButtonClicked = {this.onActionButtonClicked}
          onCreateButtonClicked = {this.goToProductCreate}
        />
      );
    }
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
    const selectedProduct = rowData;

    if (action === 'show') {
      this.goToProductShow(selectedProduct.id);
    } else if (action === 'edit') {
      this.goToProductEdit(selectedProduct.id);
    } else if (action === 'delete') {
      this.showDeleteModal(selectedProduct);
    }
  }

  /**
   * @param {object} button
   */
  goToProductCreate(button) {
    const route = productRoutes.create();
    RouterHandler.goTo(this.props.history, route);
  }

  /**
   * notify the parent that the see edit button was clicked
   * @param {number} id product id
   */
  goToProductEdit(id) {
    const route = productRoutes.edit(id);
    RouterHandler.goTo(this.props.history, route);
  }

  /**
   * notify the parent that the see edit button was clicked
   * @param {number} id product id
   */
  goToProductShow(id) {
    const route = productRoutes.show(id);
    RouterHandler.goTo(this.props.history, route);
  }

  /**
   * notify the parent that the see delete button was clicked
   * @param {object} product product id
   */
  showDeleteModal(product) {
    this.setState({
      selectedProductToDelete: product,
      showDeleteModal: true,
    });
  }

  /**
   *
   */
  onDeleteSucess() {
    // refresh the products list
    this.setState({
      selectedProductToDelete: {},
      showDeleteModal: false,
    }, this.fetchProducts);
  }

  /**
   * close the delete modal
   * @param {object} product product id
   */
  onDeleteCancel() {
    this.setState({
      selectedProductToDelete: {},
      showDeleteModal: false,
    });
  }

  /**
   * @return {ReactNode}
   */
  render() {
    return (
      <div>
        {this.renderMainTable()}

        <DeleteProductModal
          show = {this.state.showDeleteModal}
          product = {this.state.selectedProductToDelete}
          onDeleteSucess = {this.onDeleteSucess}
          onDeleteCancel = {this.onDeleteCancel}
        />
      </div>
    );
  }
}

export default withRouter((ProductsTable));
