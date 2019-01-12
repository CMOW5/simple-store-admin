import React, {Component} from 'react';

/* redux */
import {connect} from 'react-redux';
import {getAuthenticatedUserAction, saveUser} from 'store/actions/user-actions';

/* router */
import {withRouter} from 'react-router-dom';

/* api */
import Auth from 'services/api/auth/auth';

/* utils */
import Logger from 'utils/logger/logger';

/**
 * Higher-Order Component to wrap the components that require auth,
 *
 * @param {*} ComposedComponent
 * @return {ReactComponent}
 */
export default function(ComposedComponent) {
  /**
   * auth class
   */
  class Authentication extends Component {
    /**
     * This component handles the auth logic
     * @param {*} props
     */
    constructor(props) {
      super(props);
      this.state = {
        // this flag is used to avoid the child components
        // render before the auth request is finished
        authenticated: false,
      };
      this.componentName = 'RequireAuth ';
      Logger.log(this.componentName + 'constructor');
    }

    /**
     * this method is fired on every render, regardless of the cause.
     * this method is called before the render method is called
     * @param {object} props
     * @param {object} state
     * @return {object}
     */
    static getDerivedStateFromProps(props, state) {
      // we set the authenticated flag to false so
      // the children components doesn't render before
      // the login request is sent to the api
      state = {
        ...state,
        authenticated: false,
      };
      return state;
    }

    /**
     * after the component is mounted (right after the render method
     * is called), we sent an ajax request to login the user with
     * the current stored token
     */
    componentDidMount() {
      Logger.log(this.componentName + 'componentDidMount');
      // this.props.getAuthenticatedUser();
      this.attemptLogin();
    }

    /**
     * sent an http request with the token to login the user
     */
    async attemptLogin() {
      try {
        const user = await Auth.getAuthenticatedUser();
        this.props.saveUser(user);
        this.setState({
          authenticated: true,
        });
      } catch (error) {
        this.setState({
          authenticated: false,
        });
        // redirect to login
        this.props.history.push('/signin');
      }
    }

    /**
     * Anything that doesn't affect the state can be put in componentDidUpdate
     *
     * @param {*} prevProps
     * @param {*} prevState
     * @param {*} snapshot
     */
    componentDidUpdate(prevProps, prevState, snapshot) {
      Logger.log(this.componentName + 'componentDidUpdate');
      if (prevProps.user !== this.props.user) {
        Logger.log(this.componentName + 'prevPros diff from new props',
          prevProps, this.props);
        // ##TODO: this line is not necessary
        if (!this.props.user.authenticated) {
          // redirect to login
          Logger.log(this.componentName + 'redirection to login');
          this.props.history.push('/signin');
        }
      }
    }

    /**
     * @return {ReactNode}
     */
    render() {
      Logger.log(this.componentName + 'render');
      return this.state.authenticated ?
        <ComposedComponent {...this.props} /> : null;
    }
  }

  // which properties of the global store do i wanna use in this component
  const mapStateToProps = (state) => {
    return {
      user: state.userReducer,
    };
  };


  // map the actions i can execute (send) to the reducers
  const mapDispatchToProps = (dispatch) => {
    return {
      getAuthenticatedUserAction: () => {
        dispatch(getAuthenticatedUserAction({}));
      }, // key = prop name created by redux , value = method
      saveUser: (user) => {
        dispatch(saveUser(user));
      }, // key = prop name created by redux , value = method
    };
  };

  return withRouter(
    connect(mapStateToProps, mapDispatchToProps)(Authentication)
  );
}
