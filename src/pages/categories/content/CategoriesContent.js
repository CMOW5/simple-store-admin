import React, {Component} from 'react';

/* router */
import {Route, Switch} from 'react-router-dom';

/* routes */
import categoriesRoutes from 'router/routes/categories-routes';

// categories
import CategoriesTable from 'pages/categories/CategoriesTable';
import ShowCategory from 'pages/categories/show/ShowCategory';
import CreateCategoryForm from 'pages/categories/create/CreateCategoryForm';
import EditCategoryForm from 'pages/categories/edit/EditCategoryForm';

/**
 * main page
 */
export default class CategoriesContent extends Component {
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
    const categoriesListRoute = categoriesRoutes.base();
    const categoryShowRoute = categoriesRoutes.show();
    const categoriesCreateRoute = categoriesRoutes.create();
    const categoriesEditRoute = categoriesRoutes.edit();

    return (
      <Switch>
        <Route exact path = {categoriesListRoute}
          component = {CategoriesTable} />
        <Route exact path ={categoriesCreateRoute}
          component = {CreateCategoryForm} />
        <Route exact path = {categoryShowRoute}
          component = {ShowCategory} />
        <Route exact path = {categoriesEditRoute}
          component = {EditCategoryForm}/>
      </Switch>
    );
  }
}
