import React, {Component} from 'react';
import withStyles from 'react-jss';

import styles from './sidenav-styles';

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
    const {classes} = this.props;

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

export default withRouter((withStyles(styles)(SideNav)));
