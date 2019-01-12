import React, {Component} from 'react';

/* router */
import {withRouter} from 'react-router-dom';

/* utils */
import Form from 'utils/form/form';
import Logger from 'utils/logger/logger';

/* api */
import Auth from 'services/api/auth/auth';

/* styles */
import './signin-page.css';

/**
 * this component renders the SignIn page
 */
class SignInPage extends Component {
  /**
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      form: new Form({
        email: '',
        password: '',
      }),
    };
    this.componentName = 'SignInPage ';
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.attemptLogin = this.attemptLogin.bind(this);
    this.handleSuccessLogin = this.handleSuccessLogin.bind(this);
    this.handleFailedLogin = this.handleFailedLogin.bind(this);
    /* errors rendering */
    this.renderEmailErrors = this.renderEmailErrors.bind(this);
    this.renderPasswordErrors = this.renderPasswordErrors.bind(this);
    this.renderGeneralErrors = this.renderGeneralErrors.bind(this);
    console.log(this.componentName + 'constructor');
  }

  /**
   * attempt to login the user
   * @param {string} email
   * @param {string} password
   */
  loginUser(email, password) {
    console.log(this.componentName + 'login User');
    this.setState({
      form: new Form({
        email: email,
        password: password,
      }),
    }, this.attemptLogin);
  }

  /**
   * attemp a login with the user credentials
   */
  attemptLogin() {
    const formData = this.state.form.getFormData();
    const methodName = ' attemptLogin() ';
    Auth.signIn(formData)
      .then((userData) => {
        const methodName = ' then(..) ';
        Logger.log(this.componentName + methodName + 'response = ', userData);
        this.handleSuccessLogin(userData);
        // this.attemptingSignIn = false;
        // this.form.reset();
      })
      .catch((error) => {
        Logger.log(this.componentName + methodName + 'error = ', error);
        // this.attemptingSignIn = false;
        this.handleFailedLogin(error);
      });
  }

  /**
   * update the email form attribute
   * @param {*} event
   */
  handleEmailChange(event) {
    const newValue = event.target.value;
    this.setState({
      email: newValue,
    });
  }

  /**
   * update the password form attribute
   * @param {*} event
   */
  handlePasswordChange(event) {
    const newValue = event.target.value;
    this.setState({
      password: newValue,
    });
  }

  /**
   * @param {Object} userData
   */
  handleSuccessLogin(userData) {
    this.props.history.push('/');
  }

  /**
   * @param {Error} error
   */
  handleFailedLogin(error) {
    let form = this.state.form;
    form.saveErrors(error);
    this.setState({
      form: form,
    });
  }

  /**
   * render the email errors from the request if any
   *
   * @return {ReactNode}
   */
  renderEmailErrors() {
    if (this.state.form.hasError('email')) {
      const errorMessage = this.state.form.getErrorMessage('email');
      return this.renderError(errorMessage);
    } else {
      return null;
    }
  }

  /**
   * render the password errors from the request if any
   *
   * @return {ReactNode}
   */
  renderPasswordErrors() {
    if (this.state.form.hasError('password')) {
      const errorMessage = this.state.form.getErrorMessage('password');
      return this.renderError(errorMessage);
    } else {
      return null;
    }
  }

  /**
   * render the general errors from the request if any
   *
   * @return {ReactNode}
   */
  renderGeneralErrors() {
    if (this.state.form.hasError('general')) {
      const errorMessage = this.state.form.getErrorMessage('general');
      return this.renderError(errorMessage);
    } else {
      return null;
    }
  }

  /**
   * render a <p> tag with the given error message
   * @param {string} message the error message
   * @return {ReactNode}
   */
  renderError = (message) => {
    return (
      <p
        className="help is-danger">
        {message}
      </p>
    );
  }

  /**
   * @return {ReactNode}
   */
  render() {
    console.log(this.componentName + 'render');
    return (
      <nav className="panel container">

        <p className="panel-heading has-text-left">
          <span className="is-size-6">Login</span>
        </p>

        <div className="panel-block">

          <div className="control has-icons-left">

            <div className="columns">

              <div className="column is-half is-offset-one-quarter">
                <div className="field">

                  <label className="label">E-Mail</label>

                  <div className="control has-icons-left">

                    <input
                      className="input is-info"
                      type="email"
                      value={this.state.email}
                      onChange={this.handleEmailChange}
                    />

                    <span className="icon is-small is-left">
                      <i className="fa fa-envelope"></i>
                    </span>

                    {this.renderEmailErrors()}

                  </div>

                </div>

              </div>

            </div>

            <div className="columns">

              <div className="column is-half is-offset-one-quarter">

                <div className="field">

                  <label className="label">Password</label>

                  <div className="control has-icons-left">

                    <input
                      className="input is-info"
                      type="password"
                      value={this.state.password}
                      onChange={this.handlePasswordChange}
                    />

                    <span className="icon is-small is-left">
                      <i className="fa fa-lock"></i>
                    </span>

                    {this.renderPasswordErrors()}


                    {this.renderGeneralErrors()}

                  </div>

                </div>
              </div>

            </div>

          </div>

        </div>

        <div className="panel-block">

          <div className="column is-half is-offset-one-quarter">
            <button className="button is-info"
              onClick = {
                (e) => this.loginUser(this.state.email, this.state.password)
              }
            >
            Login
            </button>
          </div>

        </div>

      </nav>

    );
  }
}

export default withRouter(SignInPage);
