import React, {Component} from 'react';

/* redux */
import {connect} from 'react-redux';
import {goToRoute} from 'store/actions/router-actions';

/* routes */
import {withRouter} from 'react-router-dom';
import RouterHandler from 'router/router-handler';
import BaseRoutes from 'router/routes/base-routes';
import ProductRoutes from 'router/routes/products-routes';
import CategoriesRoutes from 'router/routes/categories-routes';
import SettingsRoutes from 'router/routes/settings-routes';


/* styles */
import './side-nav.css';

/**
 * main navbar component
 * TODO: improve the side nav show/hide behavior
 */
class SideNav extends Component {
  /**
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
    };
    /* create a sidenav ref to attach new styles in order
      to hide/show the sidenav */
    this.sideNavRef = React.createRef();
    /* methods bindings */
    this.goToDahsBoard = this.goToDahsBoard.bind(this);
    this.goToProducts = this.goToProducts.bind(this);
    this.goToCategories = this.goToCategories.bind(this);
    this.goToSettings = this.goToSettings.bind(this);
    this.toggleNav = this.toggleNav.bind(this);
    this.closeNav = this.closeNav.bind(this);
  }

  /**
   * Anything that doesn't affect the state can be put in componentDidUpdate
   *
   * @param {object} prevProps
   * @param {object} prevState
   */
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.openSideNav !== this.props.openSideNav) {
      this.toggleNav();
    }
  }

  /**
   * go to the dashboard route
   */
  goToDahsBoard() {
    const route = BaseRoutes.base();
    RouterHandler.goTo(this.props.history, route);
  }

  /**
   * go to the products list
   */
  goToProducts() {
    const route = ProductRoutes.base();
    RouterHandler.goTo(this.props.history, route);
  }

  /**
   * go to the products list
   */
  goToCategories() {
    const route = CategoriesRoutes.base();
    RouterHandler.goTo(this.props.history, route);
  }

  /**
   * go to the products list
   */
  goToSettings() {
    const route = SettingsRoutes.base();
    RouterHandler.goTo(this.props.history, route);
  }

  /**
   * toggle the side nav visibility
   */
  toggleNav() {
    if (this.sideNavRef.current.style.display === 'block') {
      this.sideNavRef.current.style.display = 'none';
    } else {
      this.sideNavRef.current.style.display = 'block';
    }
  }

  /**
   * close the side nav
   */
  closeNav() {
    this.sideNavRef.current.style.display = 'none';
  }

  /**
   * @return {ReactNode}
   */
  render() {
    return (
      <aside className="sidenav" ref={this.sideNavRef}>

        <a className="closebtn" onClick = {this.closeNav}>
          &times;
        </a>

        <a className="nav-item">
          <i className="fa fa-adn"></i>
        </a>

        <a
          onClick = {this.goToDahsBoard}
          className="nav-item">
          <i className="fa fa-clipboard">
            <span>Dashboard</span>
          </i>
        </a>
        <a
          onClick = {this.goToProducts}
          className="nav-item">
          <i className="fa fa-shopping-bag">
            <span>Products</span>
          </i>
        </a>
        <a
          onClick = {this.goToCategories}
          className="nav-item">
          <i className="fa fa-sitemap">
            <span>Categories</span>
          </i>
        </a>
        <a className="nav-item">
          <i className="fa fa-users">
            <span>Users</span>
          </i>
        </a>
        <a
          onClick = {this.goToSettings}
          className="nav-item">
          <i className="fa fa-cog">
            <span>Settings</span>
          </i>
        </a>
      </aside>
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

export default
withRouter(connect(mapStateToProps, mapDispatchToProps)(SideNav));
