import React, {Component} from 'react';

/* router */
import {withRouter} from 'react-router-dom';

/* routes */
import RouterHandler from 'router/router-handler';
import ProductRoutes from 'router/routes/products-routes';

/* api */
import ProductsRequest from 'services/api/products/products-request';

/* models */
import Product from 'models/product';

/* utils */
// import Logger from 'utils/logger/logger';

/* styles */
import './show-product.css';

/* components */
import ShowHeader from 'pages/utils/list_headers/ShowHeader';
import Loading from 'components/utils/loading/Loading';

/**
 * component to display the product details
 */
class ShowProduct extends Component {
  /**
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      product: new Product(),
      isFetching: true,
    };
    this.hiddenFields = [
      'id', 'images',
    ];
    this.getProduct = this.getProduct.bind(this);
    this.goToProductsList = this.goToProductsList.bind(this);
    this.goToEditProduct = this.goToEditProduct.bind(this);
    this.renderProductInfo = this.renderProductInfo.bind(this);
  }

  /**
   * load the resource
   */
  componentDidMount() {
    this.getProduct(this.state.id);
  }

  /**
   * fetch the product with the given id
   * @param {*} id
   */
  async getProduct(id) {
    const productData = await ProductsRequest.getProduct(id);
    this.setState({
      product: new Product(productData),
      isFetching: false,
    });
  }

  /**
   * notify the parent that the see edit button was clicked
   * @param {number} id product id
   */
  goToEditProduct() {
    const id = this.props.match.params.id;
    const route = ProductRoutes.edit(id);
    RouterHandler.goTo(this.props.history, route);
  }

  /**
   * notify the parent that the see edit button was clicked
   * @param {number} id product id
   */
  goToProductsList() {
    const route = ProductRoutes.base();
    RouterHandler.goTo(this.props.history, route);
  }

  /**
   *
   * @param {*} product
   * @return {ReactNode}
   */
  renderProductInfo(product) {
    if (this.state.isFetching) {
      return <Loading show={true} title="product" />;
    } else {
      const productSections =
        Object.keys(product).filter((key) => {
          return !this.hiddenFields.includes(key);
        }).map((key, index) => {
          return (
            <Section key={index} title={key} text={product[key]} />
          );
        });

      return (
        <div>
          {productSections}
          <ImagesSection title="images" images={product.images} />
        </div>
      );
    }
  }


  /**
   * @return {ReactNode}
   */
  render() {
    const product = this.state.product;

    return (
      <div>
        <ShowHeader
          onEditButtonClicked = {this.goToEditProduct}
          onReturnButtonClicked = {this.goToProductsList}
          title='products'
          icon='fa fa-shopping-bag fa-2x'
        />
        {this.renderProductInfo(product)}
      </div>
    );
  }
}

export default
withRouter(ShowProduct);

/**
 * a simple section component
 * @param {object} props
 * @return {ReactNode}
 */
function Section(props) {
  const title = props.title;
  const text = props.text;
  return (
    <section className="show-product-section">
      <h1 className="title">{title}</h1>
      <h2 className="subtitle">
        {text}
      </h2>
    </section>
  );
}

/**
 * a simple image section component
 * @param {object} props
 * @return {ReactNode}
 */
function ImagesSection(props) {
  const title = props.title;
  const images = props.images.map((image, index) => {
    return (
      <div className="column is-2" key={index} >
        <img className="show-product-image" src={image.url} alt="product" />
      </div>
    );
  });

  return (
    <section className="show-product-section">
      <h1 className="title">{title}</h1>
      <div className="columns is-multiline">
        {images}
      </div>
    </section>
  );
}

