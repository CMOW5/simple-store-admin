import React, {Component} from 'react';

// router
import {Switch, Route} from 'react-router-dom';
import {withRouter} from 'react-router-dom';

// redux
import {connect} from 'react-redux';
import {getCurrentUserAction, saveUser, clearUser} from
  'store/actions/user-actions';

/* styles */
import './App.css';

/* components */
import PrivateRoute from 'components/utils/private_route/PrivateRoute';
import LoginPage from 'pages/login/LoginPage';
import Main from 'pages/main/Main';

// import TestPage from 'pages/test/TestPage';
import {httpEvents} from 'services/api/http-requester';

/**
 * the root app component
 */
class App extends Component {
  /**
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };

    this.loadCurrentlyLoggedInUser = this.loadCurrentlyLoggedInUser.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.subcribeAuthEvents = this.subcribeAuthEvents.bind(this);
    this.redirectToLogin = this.redirectToLogin.bind(this);
  }

  /** */
  componentDidMount() {
    this.loadCurrentlyLoggedInUser();
    this.subcribeAuthEvents();
  }

  /** */
  subcribeAuthEvents() {
    this.subcription = httpEvents.subscribe({
      next: (status) => {
        switch (status) {
        case 401:
          this.redirectToLogin();
          break;
        default:
          break;
        }
      },
    });
  }

  /**
   */
  redirectToLogin() {
    this.props.clearUser();
  }

  /** */
  componentWillUnmount() {
    this.subcription.unsubscribe();
  }

  /** */
  loadCurrentlyLoggedInUser() {
    this.setState({
      loading: true,
    });

    this.props.getCurrentUserAction().finally(() => {
      this.setState({
        loading: false,
      });
    });
  }

  /** */
  handleLogout() {
    /* localStorage.removeItem(ACCESS_TOKEN);
    this.setState({
      authenticated: false,
      currentUser: null,
    });
    Alert.success('You\'re safely logged out!'); */
  }

  /**
   * @return {ReactNode}
   */
  render() {
    return this.state.loading ? <div> loading </div> : (
      <div className="App">
        <Switch>
          <Route
            path='/login'
            render={() => (
              <LoginPage authenticated = {this.props.user.authenticated} />
            )}>
          </Route>

          <PrivateRoute
            path="/"
            authenticated = {this.props.user.authenticated}
            currentUser = {this.props.user.authenticated}
            component={Main}>
          </PrivateRoute>

          {/* <Route path='/' component={requireAuth(Main)}/> */}
        </Switch>
      </div>
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
    getCurrentUserAction: () => {
      return dispatch(getCurrentUserAction());
    }, // key = prop name created by redux , value = method
    saveUser: (user) => {
      dispatch(saveUser(user));
    }, // key = prop name created by redux , value = method
    clearUser: () => {
      dispatch(clearUser());
    }, // key = prop name created by redux , value = method
  };
};


export default(withRouter(connect(mapStateToProps, mapDispatchToProps)(App)));

