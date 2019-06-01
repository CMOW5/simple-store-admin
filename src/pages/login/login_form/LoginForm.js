import React, {Component} from 'react';
import Form from 'utils/form/form';
import AuthApi from 'services/api/auth/auth-api';

import styles from './login-form-styles';
import withStyles from 'react-jss';

// redux
import {connect} from 'react-redux';
import {saveUser} from 'store/actions/user-actions';

/** */
class LoginForm extends Component {
  /** @param {object} props */
  constructor(props) {
    super(props);
    this.state = {
      email: 'admin@example.com',
      password: 'password',
      form: new Form(),
      loading: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.loginButtonClass = this.loginButtonClass.bind(this);
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

    this.setState({
      loading: true,
    });

    AuthApi.login(form.getDataAsJson())
      .then((user) => {
        this.props.saveUser(user);
      }).catch((error) => {
        this.setState({
          loading: false,
        });
      });
  }

  /**
   * @return {string}
   */
  loginButtonClass() {
    if (this.state.loading) {
      return 'button is-block is-info is-large is-fullwidth is-loading';
    } else {
      return 'button is-block is-info is-large is-fullwidth';
    }
  }

  /** @return {ReactNode} */
  render() {
    const {classes} = this.props;

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

                <form onSubmit={this.handleSubmit}>

                  <div className="field">
                    <div className="control">
                      <input
                        className="input is-large"
                        type="email"
                        name="email"
                        placeholder="Email"
                        autoFocus=""
                        value={this.state.email}
                        onChange={this.handleInputChange}
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

                  <button
                    type="submit"
                    className = {this.loginButtonClass()}>
                      Login
                  </button>

                </form>

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

// which properties of the global store do i wanna use in this component
const mapStateToProps = (state) => {
  return {
    user: state.userReducer,
  };
};


// map the actions i can execute (send) to the reducers
const mapDispatchToProps = (dispatch) => {
  return {
    saveUser: (user) => {
      dispatch(saveUser(user));
    },
  };
};

export default(
  connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LoginForm))
);
