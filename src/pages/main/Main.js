import React, {Component} from 'react';

/* router */
import {Switch, Route} from 'react-router-dom';

/* styles */
import './main.css';

/* components */
import MainNavBar from 'components/navs/main_nav/MainNavBar';
import SideNav from 'components/navs/side_nav/SideNav';

import baseRoutes from 'router/routes/base-routes';
import categoriesRoutes from 'router/routes/categories-routes';
import productsRoutes from 'router/routes/products-routes';

import DashBoard from 'pages/dashboard/DashBoard';

// categories
import CategoriesTable from 'pages/categories/CategoriesTable';
import ShowCategory from 'pages/categories/show/ShowCategory';
import CreateCategoryForm from 'pages/categories/create/CreateCategoryForm';
import EditCategoryForm from 'pages/categories/edit/EditCategoryForm';

// products
import ProductsTable from 'pages/products/ProductsTable';
import ShowProduct from 'pages/products/show/ShowProduct';
import CreateProductForm from 'pages/products/create/CreateProductForm';
import EditProductForm from 'pages/products/edit/EditProductForm';

import Footer from 'components/footer/Footer';

/**
 * main page
 */
export default class Main extends Component {
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
    const dashboardRoute = baseRoutes.dashboard();

    // routes
    const categoriesListRoute = categoriesRoutes.base();
    const categoryShowRoute = categoriesRoutes.show();
    const categoriesCreateRoute = categoriesRoutes.create();
    const categoriesEditRoute = categoriesRoutes.edit();

    const productsListRoute = productsRoutes.base();
    const productsShowRoute = productsRoutes.show();
    const productsCreateRoute = productsRoutes.create();
    const productsEditRoute = productsRoutes.edit();

    return (
      <React.Fragment>
        <MainNavBar />
        <div className = "container">
          <div className="columns">

            <aside className="column is-3">
              <SideNav />
            </aside>

            <section className="column">

              <Switch>

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

              </Switch>

              <Footer />
            </section>

          </div>
        </div>
      </React.Fragment>
    );
  }
}
