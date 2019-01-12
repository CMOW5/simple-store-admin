import React, {Component} from 'react';

import {connect} from 'react-redux';

import {goToRoute} from 'store/actions/router-actions';

/* api */
import ProductsRequest from 'services/api/products/products-request';

/* routes */
import {withRouter} from 'react-router-dom';
import RouterHandler from 'router/router-handler';
import ProductRoutes from 'router/routes/products-routes';

/* components */
import SingleCard from '../utils/SingleCard';
import Loading from 'components/utils/loading/Loading';

/**
 * products card component
 */
class ProductsCard extends Component {
  /**
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      tag: 'product',
      isFetching: true,
    };
    this.getCount = this.getCount.bind(this);
    this.showProducts = this.showProducts.bind(this);
  }

  /**
   *
   */
  showProducts() {
    const route = ProductRoutes.base();
    RouterHandler.goTo(this.props.history, route);
  }

  /**
   * get the products info
   */
  componentDidMount() {
    this.getCount();
  }

  /**
   *
   */
  async getCount() {
    // const request = new ProductsRequest();
    const count = await ProductsRequest.count();
    this.setState({
      count: count,
      isFetching: false,
    });
  }

  /**
   * @return {ReactNode}
   */
  render() {
    return (
      this.state.isFetching ? <Loading show={true} title="products" /> :
        <SingleCard
          icon = 'fa fa-shopping-bag fa-5x'
          tag = {this.state.tag}
          count = {this.state.count}
          image = "https://picsum.photos/200/700"
          onButtonClicked = {this.showProducts}
        />
    );
  }
}

// which properties of the global store do i wanna use in this component
const mapStateToProps = (state) => {
  return {
    router: state.routerReducer,
  };
};

// map the actions i can execute (send) to the reducers
const mapDispatchToProps = (dispatch) => {
  return {
    goToRoute: (route) => {
      dispatch(goToRoute(route));
    }, // key = prop name created by redux , value = method
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductsCard)
);
