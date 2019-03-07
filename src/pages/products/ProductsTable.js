import React, {Component} from 'react';

/* redux */
import {connect} from 'react-redux';
import {goToRoute} from 'store/actions/router-actions';

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
      selectedProduct: {},
      searchKeyword: '',
      isFetching: true,
    };
    this.componentName = 'ProductsTable';
    this.fetchProducts = this.fetchProducts.bind(this);
    this.renderMainTable = this.renderMainTable.bind(this);

    this.onCreateProductButonClicked =
      this.onCreateProductButonClicked.bind(this);
    this.onCreateButtonClicked =
      this.onCreateButtonClicked.bind(this);
  }

  /**
   *
   */
  componentDidMount() {
    // check if the user is logged
    this.fetchProducts();
  }

  /**
   */
  onCreateProductButonClicked() {
    const route = productRoutes.create();
    RouterHandler.goTo(this.props.history, route);
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
          onCreateButtonClicked = {this.onCreateButtonClicked}
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
    console.log('action button clicked', button, rowData);
  }

  /**
   * @param {*} button
   */
  onCreateButtonClicked(button) {
    console.log('create button clicked', button);
  }

  /**
   * @return {ReactNode}
   */
  render() {
    return (
      <div>
        {this.renderMainTable()}
      </div>
    );
  }
}

// which properties of the global store do i wanna use in this component
const mapStateToProps = (state) => {
  return {
    // router: state.routerReducer,
    user: state.userReducer,
  };
};

// map the actions i can execute (send) to the reducers
const mapDispatchToProps = (dispatch) => {
  return {
    goToRoute: (route) => {
      dispatch(goToRoute(route));
    },
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductsTable)
);
