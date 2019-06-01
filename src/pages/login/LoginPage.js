import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

import LoginForm from './login_form/LoginForm';

/** */
export default class LoginPage extends Component {
  /**
   * @return {ReactNode}
   */
  redirectToHome() {
    return (<Redirect
      to={{
        pathname: '/',
        state: {from: this.props.location},
      }}/>);
  }

  /**
   * @return {ReactNode}
   */
  render() {
    return this.props.authenticated ? this.redirectToHome() : (
      <LoginForm {...this.props} />
    );
  }
}
