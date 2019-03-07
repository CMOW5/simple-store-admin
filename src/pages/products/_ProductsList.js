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

/* models */
import Product from 'models/product';

/* utils */
import Paginator from 'utils/paginator/paginator';
import Logger from 'utils/logger/logger';

/* components */
import ListHeader from 'pages/utils/list_headers/ListHeader';
import SingleProductRow from './SingleProductRow';
import Pagination from 'components/pagination/Pagination';
import DeleteProductModal from './delete/DeleteProductModal';
import Loading from 'components/utils/loading/Loading';

/**
 * product list component
 */
class ProductList extends Component {
  /**
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      paginator: new Paginator(),
      selectedProduct: {},
      showDeleteModal: false,
      searchKeyword: '',
      isFetching: true,
    };
    this.componentName = 'ProductsList ';
    this.fetchProducts = this.fetchProducts.bind(this);
    this.pageSelected = this.pageSelected.bind(this);
    this.renderMainTable = this.renderMainTable.bind(this);

    /* action buttons */
    this.createProduct = this.createProduct.bind(this);
    this.showProduct = this.showProduct.bind(this);
    this.editProduct = this.editProduct.bind(this);
    this.showDeleteModal = this.showDeleteModal.bind(this);

    this.onDeleteSucess = this.onDeleteSucess.bind(this);
    this.onDeleteCancel = this.onDeleteCancel.bind(this);
    this.searchProducts = this.searchProducts.bind(this);
  }

  /**
   *
   */
  componentDidMount() {
    Logger.log(this.componentName + 'componentDidMount');
    // check if the user is logged
    this.fetchProducts();
  }

  /**
   * notify the parent that the see see button was clicked
   * @param {number} id product id
   */
  createProduct() {
    const route = productRoutes.create();
    RouterHandler.goTo(this.props.history, route);
  }

  /**
   * notify the parent that the see see button was clicked
   * @param {number} id product id
   */
  showProduct(id) {
    const route = productRoutes.show(id);
    RouterHandler.goTo(this.props.history, route);
  }

  /**
   * notify the parent that the see edit button was clicked
   * @param {number} id product id
   */
  editProduct(id) {
    const route = productRoutes.edit(id);
    RouterHandler.goTo(this.props.history, route);
  }

  /**
   * notify the parent that the see delete button was clicked
   * @param {object} product product id
   */
  showDeleteModal(product) {
    Logger.log('selected = ', product);
    this.setState({
      selectedProduct: product,
      showDeleteModal: true,
    });
  }

  /**
   *
   */
  onDeleteSucess() {
    // refresh the products list
    this.setState({
      selectedProduct: {},
      showDeleteModal: false,
    }, this.fetchProducts);
  }

  /**
   * close the delete modal
   * @param {object} product product id
   */
  onDeleteCancel() {
    this.setState({
      selectedProduct: {},
      showDeleteModal: false,
    });
  }

  /**
   * @param {string|number} page
   * TODO: improve the fetch products call
   */
  pageSelected(page) {
    if (Number.isInteger(page)) {
      const params = {page: page};
      this.fetchProducts(params);
    } else {
      // the page is a url
      const url = page;
      this.fetchProducts({}, url);
    }
  }

  /**
   * search the products with the given keyword
   * @param {*} keyword
   */
  searchProducts(keyword) {
    this.setState(({
      searchKeyword: keyword,
    }), this.fetchProducts);
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
    this.setState({
      products: response.products,
      paginator: new Paginator(response.paginator),
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
  renderMainTable(productsRows) {
    if (this.state.isFetching) {
      return <Loading show={true} title="products" />;
    } else {
      return (
        <div>
          <table className="table is-fullwidth">
            <thead>
              <tr>
                <th>name</th>
                <th>description</th>
                <th>price</th>
                <th>status</th>
                <th><abbr title="image">image</abbr></th>
                <th>actions</th>
              </tr>
            </thead>
            <tfoot>
            </tfoot>
            <tbody>
              {productsRows}
            </tbody>
          </table>

          <Pagination
            paginator = {this.state.paginator}
            onPageSelected = {this.pageSelected}
          />

          <DeleteProductModal
            show = {this.state.showDeleteModal}
            product = {this.state.selectedProduct}
            onDeleteSucess = {this.onDeleteSucess}
            onDeleteCancel = {this.onDeleteCancel}
          />
        </div>
      );
    }
  }

  /**
   * @return {ReactNode}
   */
  render() {
    Logger.log(this.componentName + 'render');
    const productsRows = this.state.products.map((product) => {
      return <SingleProductRow
        product = {new Product(product)}
        key = {product.id}
        onSeeButtonClicked = {this.showProduct}
        onEditButtonClicked = {this.editProduct}
        onDeleteButtonClicked = {this.showDeleteModal}
      />;
    });

    return (
      <div>
        <ListHeader
          title = 'products'
          icon = 'fa fa-shopping-bag fa-2x'
          onClick = {this.createProduct}
          onSearch = {this.searchProducts}
        />

        {this.renderMainTable(productsRows)}

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
  connect(mapStateToProps, mapDispatchToProps)(ProductList)
);
