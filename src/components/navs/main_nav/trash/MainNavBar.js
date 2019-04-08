import React, {Component} from 'react';
import withStyles from 'react-jss';

import styles from './mainnav-styles';

/* redux */
import {connect} from 'react-redux';
import {logoutAction} from 'store/actions/user-actions';

import {withRouter} from 'react-router-dom';

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
    this.onLogoutButtonClicked = this.onLogoutButtonClicked.bind(this);
  }

  /** */
  onLogoutButtonClicked() {
    this.props.logoutAction();
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

  toggleSideNav = () => {
    this.props.toggleSideNav();
  }


  /**
   * @return {ReactNode}
   */
  render() {
    const {classes} = this.props;

    return (
      <nav
        className={`navbar is-info ${classes.mainNav}`}
        aria-label="main navigation" >

        <div className="navbar-brand">
          <a 
            onClick = {this.toggleSideNav}
            className="navbar-item">
            <img
              src="https://bulma.io/images/bulma-logo.png"
              width="112" height="28"
              alt = "bulma logo"
            />
          </a>

          <a
            role="button" className="navbar-burger burger"
            aria-label="menu" aria-expanded="false"
            data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <a className="navbar-item">
            Home
            </a>

            <a className="navbar-item">
            Documentation
            </a>

            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">
              More
              </a>

              <div className="navbar-dropdown">
                <a className="navbar-item">
                About
                </a>
                <a className="navbar-item">
                Jobs
                </a>
                <a className="navbar-item">
                Contact
                </a>
                <hr className="navbar-divider" />
                <a className="navbar-item">
                Report an issue
                </a>
              </div>
            </div>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <a onClick = {this.onLogoutButtonClicked}
                  className="button is-primary">
                  <strong>Log out</strong>
                </a>
              </div>
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
      return dispatch(logoutAction());
    },
  };
};

export default
withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MainNavBar))
);

