import React, {Component} from 'react';

/* router */
import {Route, Switch} from 'react-router-dom';

/* routes */
import productsRoutes from 'router/routes/products-routes';

// products
import ProductsTable from 'pages/products/ProductsTable';
import ShowProduct from 'pages/products/show/ShowProduct';
import CreateProductForm from 'pages/products/create/CreateProductForm';
import EditProductForm from 'pages/products/edit/EditProductForm';

/**
 * main page
 */
export default class ProductsContent extends Component {
  /**
   *
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   * @return {ReactNode}
   */
  render() {
    // routes
    const productsListRoute = productsRoutes.base();
    const productsShowRoute = productsRoutes.show();
    const productsCreateRoute = productsRoutes.create();
    const productsEditRoute = productsRoutes.edit();

    return (
      <Switch>
        <Route exact path = {productsListRoute}
          component = {ProductsTable} />
        <Route exact path ={productsCreateRoute}
          component = {CreateProductForm} />
        <Route exact path ={productsShowRoute}
          component = {ShowProduct} />
        <Route exact path = {productsEditRoute}
          component = {EditProductForm}/>
      </Switch>
    );
  }
}
