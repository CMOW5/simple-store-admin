import React, {Component} from 'react';
import withStyles from 'react-jss';

import styles from './sidenav-styles';

import quickView from
  'bulma-extensions/bulma-quickview/dist/js/bulma-quickview.min.js';
/* quick view */
import 'bulma-extensions/bulma-quickview/dist/css/bulma-quickview.min.css';

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
      isOpen: false,
    };
    this.goToDahsBoard = this.goToDahsBoard.bind(this);
    this.goToProducts = this.goToProducts.bind(this);
    this.goToCategories = this.goToCategories.bind(this);
    this.goToSettings = this.goToSettings.bind(this);
  }

  /** */
  componentDidMount() {
    // let quickviews = quickView.attach();
    this.$el = quickView;
    this.$el.attach();
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

  /** @param {*} prevProps */
  componentDidUpdate(prevProps) {
    if (this.props.show !== prevProps.show) {
      this.toggleSideNav(this.props.show);
    }
  }

  toggleSideNav = (show) => {
    if (show) {
      this.openSideNav();
    } else {
      this.closeSideNav();
    }
  }

  openSideNav = () => {
    this.openSideNavRef.click();
    this.setState({
      open: true,
    });
  }

  closeSideNav = () => {
    this.closeSideNavRef.click();
    this.setState({
      open: false,
    });
  }

  /**
   * @return {ReactNode}
   */
  render() {
    const {classes} = this.props;

    return (
      <div>
        <div ref={(el) => this.el = el}>


          <div id="quickviewDefault" className="quickview">
            <header className="quickview-header">
              <p className="title">Quickview title</p>
              <span
                onClick = {this.closeSideNav}
                ref={(span) => this.closeSideNavRef = span}
                className="delete"
                data-dismiss="quickview">
              </span>
            </header>

            <div className="quickview-body">
              <div className="quickview-block">
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
              </div>
            </div>
          </div>
          <button
            ref={(button) => this.openSideNavRef = button}
            data-show="quickview"
            data-target="quickviewDefault"
            className = "is-invisible"
          >
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter((withStyles(styles)(SideNav)));
