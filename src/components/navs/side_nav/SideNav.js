import React, {Component} from 'react';
import withStyles from 'react-jss';

import styles from './sidenav-styles';

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


/** */
class SideNav extends Component {
  /**
   *
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: '',
    };
    this.goToDahsBoard = this.goToDahsBoard.bind(this);
    this.goToProducts = this.goToProducts.bind(this);
    this.goToCategories = this.goToCategories.bind(this);
    this.goToSettings = this.goToSettings.bind(this);
  }

  /**
   * go to the dashboard route
   */
  goToDahsBoard() {
    this.setState({selectedItem: 'dashboard'});
    const route = BaseRoutes.base();
    RouterHandler.goTo(this.props.history, route);
  }

  /**
   * go to the products list
   */
  goToProducts() {
    this.setState({selectedItem: 'products'});
    const route = ProductRoutes.base();
    RouterHandler.goTo(this.props.history, route);
  }

  /**
   * go to the products list
   */
  goToCategories() {
    this.setState({selectedItem: 'categories'});
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
   * @param {String} itemName
   * @return {String}
   */
  setMenuActive = (itemName) => {
    return (this.state.selectedItem === itemName ? 'is-active' : '');
  }

  /**
   * @return {ReactNode}
   */
  render() {
    const {classes, children} = this.props;

    return (
      <aside className="menu is-hidden-mobile">
        <p className={`menu-label ${classes.menuLabel}`}>
          General
        </p>
        <ul className="menu-list">
          <li onClick = {this.goToDahsBoard}>
            <a className = {`${this.setMenuActive('dashboard')} ${classes.menuList_a}`}>
              Dashboard
            </a>
          </li>
          <li onClick = {this.goToProducts}>
            <a className = {`${this.setMenuActive('products')} ${classes.menuList_a}`}>
              Products
            </a>
          </li>
          <li onClick = {this.goToCategories}>
            <a className = {`${this.setMenuActive('categories')} ${classes.menuList_a}`}>
              Categories
            </a>
          </li>
          <li>
            <a className = {`${this.setMenuActive('users')} ${classes.menuList_a}`}>
              Users
            </a>
          </li>
        </ul>
        <p className="menu-label">
          Administration
        </p>
        <ul className="menu-list">
          <li><a>Team Settings</a></li>
          <li>
            <a>Manage Your Team</a>
            <ul>
              <li><a>Members</a></li>
              <li><a>Plugins</a></li>
              <li><a>Add a member</a></li>
            </ul>
          </li>
          <li><a>Invitations</a></li>
          <li><a>Cloud Storage Environment Settings</a></li>
          <li><a>Authentication</a></li>
        </ul>
        <p className="menu-label">
                Transactions
        </p>
        <ul className="menu-list">
          <li><a>Payments</a></li>
          <li><a>Transfers</a></li>
          <li><a>Balance</a></li>
        </ul>
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
withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SideNav))
);


// The following code is based off a toggle menu by @Bradcomp
// source: https://gist.github.com/Bradcomp/a9ef2ef322a8e8017443b626208999c1
/* (function() {
  var burger = document.querySelector('.burger');
  var menu = document.querySelector('#'+burger.dataset.target);
  burger.addEventListener('click', function() {
      burger.classList.toggle('is-active');
      menu.classList.toggle('is-active');
  });
})(); */
