import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

import withStyles from 'react-jss';
import styles from './login-page-styles';

// redux
import {connect} from 'react-redux';
import {saveUser} from 'store/actions/user-actions';

import AuthApi from 'services/api/auth/auth-api';

import Form from 'utils/form/form';

/** */
class LoginPage extends Component {
  /**
   * @return {ReactNode}
   */
  render() {
    const {classes} = this.props;

    if (this.props.authenticated) {
      return <Redirect
        to={{
          pathname: '/',
          state: {from: this.props.location},
        }}/>;
    }

    return (
      <section
        className={`hero is-success is-fullheight ${classes.heroIsSuccess}`}>
        <div className={`hero-body`}>
          <div className="container has-text-centered">
            <div className="column is-4 is-offset-4">

              <h3 className="title has-text-grey">Login</h3>

              <p className="subtitle has-text-grey">Please login to proceed.</p>

              <div className={`box ${classes.box}`}>

                <figure className={`avatar ${classes.avatar}`}>
                  <img className={classes.avatarImg} src="https://placehold.it/128x128" alt="avatar" />
                </figure>

                <LoginForm {...this.props} />

              </div>
              <p className="has-text-grey">
                <a href="../">Sign Up</a> &nbsp;·&nbsp;
                <a href="../">Forgot Password</a> &nbsp;·&nbsp;
                <a href="../">Need Help?</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

/** */
class LoginForm extends Component {
  /** @param {object} props */
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      form: new Form(),
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /** @param {*} event */
  handleInputChange(event) {
    const target = event.target;
    const inputName = target.name;
    const inputValue = target.value;

    this.setState({
      [inputName]: inputValue,
    });
  }

  /** @param {*} event */
  handleSubmit(event) {
    event.preventDefault();

    const form = new Form({
      email: this.state.email,
      password: this.state.password,
    });

    AuthApi.login(form.getDataAsJson())
      .then((user) => {
        this.props.saveUser(user);
      }).catch((error) => {
        console.log('error loging user = ', error);
      });
  }

  /** @return {ReactNode} */
  render() {
    return (
      <form onSubmit={this.handleSubmit}>

        <div className="field">
          <div className="control">
            <input
              className="input is-large"
              type="email"
              name="email"
              placeholder="Email"
              autoFocus=""
              value={this.state.email} onChange={this.handleInputChange}
              required
            />
          </div>
        </div>

        <div className="field">
          <div className="control">
            <input
              className="input is-large"
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleInputChange}
              required
            />
          </div>
        </div>

        <div className="field">
          <label className="checkbox">
            <input type="checkbox" />
            Remember me
          </label>
        </div>

        <button
          type="submit"
          className="button is-block is-info is-large is-fullwidth">
          Login
        </button>

      </form>
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
    saveUser: (user) => {
      dispatch(saveUser(user));
    }, // key = prop name created by redux , value = method
  };
};

export default(
  connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LoginPage))
);


