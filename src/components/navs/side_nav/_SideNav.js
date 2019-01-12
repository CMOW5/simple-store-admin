import React, {Component} from 'react';

/* redux */
import {connect} from 'react-redux';
import {goToRoute} from 'store/actions/router-actions';

/* routes */
import {withRouter} from 'react-router-dom';
import RouterHandler from 'router/router-handler';
import BaseRoutes from 'router/routes/base-routes';
import ProductRoutes from 'router/routes/products-routes';

/* styles */
import './side-nav.css';

/**
 * main navbar component
 */
class SideNav extends Component {
  /**
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
    };
    this.goToProducts = this.goToProducts.bind(this);
    this.goToDahsBoard = this.goToDahsBoard.bind(this);
    this.sideNavRef = React.createRef();
  }

  /**
     * Anything that doesn't affect the state can be put in componentDidUpdate
     *
     * @param {*} prevProps
     * @param {*} prevState
     * @param {*} snapshot
     */
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(prevProps, this.props);
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
   *
   */
  toggleNav = () => {
    console.log('toggle nav');
    console.log(this.sideNavRef.current.style.display);
    if (this.sideNavRef.current.style.display === 'block') {
      this.sideNavRef.current.style.display = 'none';
    } else {
      this.sideNavRef.current.style.display = 'block';
    }
  }

  closeNav = () => {
    console.log(this.sideNavRef.current.style.display);
    this.sideNavRef.current.style.display = 'none';
  }


  /**
   * @return {ReactNode}
   */
  render() {
    return (
      <aside className="menu sidenav">

        <ul className="menu-list">
          <li>
            <a><i className="fa fa-clipboard">Dashboard</i></a>
          </li>
          <li>
            <a><i className="fa fa-shopping-bag">Products</i></a>
          </li>
          <li>
            <a><i className="fa fa-sitemap">Categories</i></a>
          </li>
          <li>
            <a><i className="fa fa-users">Users</i></a>
          </li>
        </ul>
        <ul className="menu-list">
          <li>
            <a className="is-active"><i className="fa fa-users">Settings</i></a>
            <ul>
              <li><a>Members</a></li>
              <li><a>Plugins</a></li>
            </ul>
          </li>
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
withRouter(connect(mapStateToProps, mapDispatchToProps)(SideNav));
