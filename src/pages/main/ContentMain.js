import React, {Component} from 'react';

/* router */
import {Switch, Route} from 'react-router-dom';

/* routes */
import baseRoutes from 'router/routes/base-routes';
import settingsRoutes from 'router/routes/settings-routes';

/* page components */
import DashBoard from 'pages/dashboard/DashBoard';
import SettingsPage from 'pages/settings/SettingsPage';
// import ProductsContent from 'pages/products/content/ProductsContent';
// import CategoriesContent from 'pages/categories/content/CategoriesContent';

import categoriesRoutes from 'router/routes/categories-routes';
import productsRoutes from 'router/routes/products-routes';

import CategoriesTable from 'pages/categories/CategoriesTable';
import ShowCategory from 'pages/categories/show/ShowCategory';
import CreateCategoryForm from 'pages/categories/create/CreateCategoryForm';
import EditCategoryForm from 'pages/categories/edit/EditCategoryForm';

// products
import ProductsTable from 'pages/products/ProductsTable';
import ShowProduct from 'pages/products/show/ShowProduct';
import CreateProductForm from 'pages/products/create/CreateProductForm';
import EditProductForm from 'pages/products/edit/EditProductForm';

/**
 * main page
 */
export default class ContentMain extends Component {
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
    const dashboardRoute = baseRoutes.dashboard();
    const settingsRoute = settingsRoutes.base();

    // routes
    const categoriesListRoute = categoriesRoutes.base();
    const categoryShowRoute = categoriesRoutes.show();
    const categoriesCreateRoute = categoriesRoutes.create();
    const categoriesEditRoute = categoriesRoutes.edit();

    const productsListRoute = productsRoutes.base();
    const productsShowRoute = productsRoutes.show();
    const productsCreateRoute = productsRoutes.create();
    const productsEditRoute = productsRoutes.edit();

    const {classes} = this.props;

    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div className='content-main'>
          <Switch className="content-main">

            <Route exact path = '/'
              component={DashBoard}/>

            <Route exact path = {dashboardRoute}
              component={DashBoard}/>

            {/* products */}
            <Route exact path = {productsListRoute}
              component = {ProductsTable} />
            <Route exact path ={productsCreateRoute}
              component = {CreateProductForm} />
            <Route exact path ={productsShowRoute}
              component = {ShowProduct} />
            <Route exact path = {productsEditRoute}
              component = {EditProductForm}/>

            {/* categories */}
            <Route exact path = {categoriesListRoute}
              component = {CategoriesTable} />
            <Route exact path ={categoriesCreateRoute}
              component = {CreateCategoryForm} />
            <Route exact path = {categoryShowRoute}
              component = {ShowCategory} />
            <Route exact path = {categoriesEditRoute}
              component = {EditCategoryForm}/>

            {/* settings */}
            <Route exact path = {settingsRoute}
              component = {SettingsPage}/>

          </Switch>
        </div>
      </main>
    );
  }
}
