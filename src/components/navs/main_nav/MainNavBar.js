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
    let currentPath = this.props.history.location.pathname.substring(1);
    this.state = {
      selectedItem: currentPath,
      navItems: ['home', 'products', 'catalog'],
      showDropdown: false,
    };
    /* methods bindings */
    this.goTo = this.goTo.bind(this);
    this.setSelectedItem = this.setSelectedItem.bind(this);
    this.setNavItemClass = this.setNavItemClass.bind(this);
    this.logout = this.logout.bind(this);
    this.dropDownCliked = this.dropDownCliked.bind(this);
    this.dropDownClass = this.dropDownClass.bind(this);
    this.toggleSideNav = this.toggleSideNav.bind(this);
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
   * update the component state
   * @param {*} selectedItem
   */
  setSelectedItem(selectedItem) {
    this.setState({
      selectedItem: selectedItem,
    });
  }

  /**
   * set the proper class to the selected nav link
   *
   * @param {*} itemName
   * @return {string} the item class
   */
  setNavItemClass(itemName) {
    return 'navbar-item '
      + (this.state.selectedItem === itemName ? 'is-active' : '');
  }

  /**
   * logout the user
   */
  logout() {
    this.props.logoutAction();
  }

  /**
   * toggle the dropdown visibility
   */
  dropDownCliked() {
    this.setState((prevState) => ({
      showDropdown: !prevState.showDropdown,
    }));
  }

  /**
   * set the proper dropdown class
   * eg => is-active to display the dropdown
   * @return {string}
   */
  dropDownClass() {
    return this.state.showDropdown ? 'dropdown is-right is-active'
      : 'dropdown is-right';
  }

  /**
   * toggle the sidenav visibility
   */
  toggleSideNav() {
    this.props.onToggleSideNav();
  }

  /**
   * @return {ReactNode}
   */
  render() {
    return (

      <nav className="navbar is-light">

        <div className="navbar-brand">

          <a
            onClick = {this.toggleSideNav}
            className="navbar-item side-nav-toggler">
            <i className="fa fa-bars"></i>
          </a>

          <a className="navbar-item" href="https://bulma.io">
            <img src="https://bulma.io/images/bulma-logo.png" alt="bulma" width="112" height="28" />
          </a>

          <div
            className="navbar-burger burger"
            data-target="navbarExampleTransparentExample">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div id="navbarExampleTransparentExample" className="navbar-menu">

          <div className="navbar-start">
            <a className="navbar-item" >
              Home
            </a>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">

              <div className={this.dropDownClass()}>

                <div className="dropdown-trigger">
                  <button
                    onClick = {this.dropDownCliked}
                    className="button"
                    aria-haspopup="true"
                    aria-controls="dropdown-menu6">
                    <span>Admin</span>
                    <span className="icon is-small">
                      <i className="fa fa-angle-down" aria-hidden="true"></i>
                    </span>
                  </button>
                </div>

                <div className="dropdown-menu" id="dropdown-menu" role="menu">
                  <div className="dropdown-content">
                    <div className="dropdown-item">
                      <p>You can insert <strong>any type of content</strong>
                      within the dropdown menu..
                      </p>
                    </div>
                    <hr className="dropdown-divider" />
                    <a className="dropdown-item">
                      Perfil
                    </a>
                    <a className="dropdown-item">
                      Go to app
                    </a>
                    <hr className="dropdown-divider" />
                    <a
                      onClick = {this.logout}
                      className="dropdown-item">
                      log out
                    </a>
                  </div>
                </div>

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
      dispatch(logoutAction({}));
    }, // key = prop name created by redux , value = method
    saveUser: (user) => {
      dispatch(saveUser(user));
    }, // key = prop name created by redux , value = method
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainNavBar);
