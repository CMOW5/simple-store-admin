import React, {Component} from 'react';

/* redux */
import {connect} from 'react-redux';
import {logoutAction, saveUser} from 'store/actions/user-actions';

// import { withRouter } from 'react-router-dom'

/* styles */
import './navbar.css';

/**
 * main navbar component
 */
class MainNavBar extends Component {
  /**
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {};

    /* methods bindings */
    this.goTo = this.goTo.bind(this);
  }

  /**
   * go to the selected nav link route
   * @param {*} route
   * @param {*} event
   */
  goTo(route, event) {
    event.preventDefault();
    this.props.history.push(route);
    this.setSelectedItem(route);
  }

  /**
   * @return {ReactNode}
   */
  render() {
    return (
      <nav className="navbar is-white">
        <div className="container">
          <div className="navbar-brand">
            <a className="navbar-item brand-text" href="../">
              Bulma Admin
            </a>
            <div className="navbar-burger burger" data-target="navMenu">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <div id="navMenu" className="navbar-menu">
            <div className="navbar-start">
              <a className="navbar-item" href="admin.html">
                Home
              </a>
              <a className="navbar-item" href="admin.html">
                Orders
              </a>
              <a className="navbar-item" href="admin.html">
                Payments
              </a>
              <a className="navbar-item" href="admin.html">
                Exceptions
              </a>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

// which properties of the global store do i wanna use in this component
const mapStateToProps = (state) => {
  return {
    user: state.userReducer,
    /* router: state.routerReducer, */
  };
};


// map the actions i can execute (send) to the reducers
const mapDispatchToProps = (dispatch) => {
  return {
    logoutAction: () => {
      dispatch(logoutAction({}));
    }, // key = prop name created by redux , value = method
    saveUser: (user) => {
      dispatch(saveUser(user));
    }, // key = prop name created by redux , value = method
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainNavBar);
