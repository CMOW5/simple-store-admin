import React, {Component} from 'react';

// router
import {Switch, Route} from 'react-router-dom';
import {withRouter} from 'react-router-dom';

// redux
import {connect} from 'react-redux';
import {getCurrentUserAction, saveUser} from 'store/actions/user-actions';

/* styles */
import './App.css';

/* components */
import PrivateRoute from 'components/utils/private_route/PrivateRoute';
import LoginPage from 'pages/login/LoginPage';
import Main from 'pages/main/Main';

// import TestPage from 'pages/test/TestPage';

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
  }

  /** */
  componentDidMount() {
    this.loadCurrentlyLoggedInUser();
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
    if (this.state.loading) {
      return <div> loading </div>;
    }

    return (
      <div className="App">
        <Switch>
          <Route
            path='/login'
            render={(props) => (
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
  };
};


export default(withRouter(connect(mapStateToProps, mapDispatchToProps)(App)));

