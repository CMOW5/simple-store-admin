import React, {Component} from 'react';

/* router */
import {Switch, Route} from 'react-router-dom';

/* styles */
import './main.css';

/* utils */
import Logger from 'utils/logger/logger';

/* routes */
import baseRoutes from 'router/routes/base-routes';
import productsRoutes from 'router/routes/products-routes';
import categoriesRoutes from 'router/routes/categories-routes';
import settingsRoutes from 'router/routes/settings-routes';

/* components */
import MainNavBar from 'components/navs/main_nav/MainNavBar';
import SideNav from 'components/navs/side_nav/SideNav';
import DashBoard from 'pages/dashboard/DashBoard';

// products
import ProductsList from 'pages/products/ProductsList';
import ShowProduct from 'pages/products/show/ShowProduct';
import CreateProductForm from 'pages/products/create/CreateProductForm';
import EditProductForm from 'pages/products/edit/EditProductForm';

// categories
import CategoriesList from 'pages/categories/CategoriesList';
import ShowCategory from 'pages/categories/show/ShowCategory';
import CreateCategoryForm from 'pages/categories/create/CreateCategoryForm';
import EditCategoryForm from 'pages/categories/edit/EditCategoryForm';

// settings
import SettingsPage from 'pages/settings/SettingsPage';

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
    this.state = {
      openSideNav: false,
    };
    this.componentName = 'Main ';
    Logger.log(this.componentName + 'constructor');

    /* methods bindings */
    this.toggleSideNav = this.toggleSideNav.bind(this);
  }

  /**
   * toogle the sine navbar visibility
   */
  toggleSideNav() {
    this.setState((prevState) => ({
      openSideNav: !prevState.openSideNav,
    }));
  }

  /**
   * @return {ReactNode}
   */
  render() {
    Logger.log(this.componentName + 'render');

    /* routes */
    const dashboardRoute = baseRoutes.dashboard();
    /* products routes */
    const productsListRoute = productsRoutes.base();
    const productsShowRoute = productsRoutes.show();
    const productsCreateRoute = productsRoutes.create();
    const productsEditRoute = productsRoutes.edit();
    /* categories routes */
    const categoriesListRoute = categoriesRoutes.base();
    const categoryShowRoute = categoriesRoutes.show();
    const categoriesCreateRoute = categoriesRoutes.create();
    const categoriesEditRoute = categoriesRoutes.edit();
    /* settings route */
    const settingsRoute = settingsRoutes.base();

    return (

      <div>

        <SideNav openSideNav = {this.state.openSideNav} />

        <div className="right-panel">

          <MainNavBar
            onToggleSideNav = {this.toggleSideNav}
            history={this.props.history} />

          <div className="container">

            <Switch>

              <Route exact path = '/'
                component={DashBoard}/>

              <Route exact path = {dashboardRoute}
                component={DashBoard}/>

              {/* products */}
              <Route exact path = {productsListRoute}
                component = {ProductsList} />
              <Route exact path ={productsCreateRoute}
                component = {CreateProductForm} />
              <Route exact path ={productsShowRoute}
                component = {ShowProduct} />
              <Route exact path = {productsEditRoute}
                component = {EditProductForm}/>

              {/* categories */}
              <Route exact path = {categoriesListRoute}
                component = {CategoriesList} />
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

          <Footer />

        </div>

      </div>

    );
  }
}
