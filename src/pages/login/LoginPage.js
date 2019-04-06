import React, {Component} from 'react';
import withStyles from 'react-jss';

import styles from './login-page-styles';

/** */
class LoginPage extends Component {
  /**
   * @return {ReactNode}
   */
  render() {
    const {classes, children} = this.props;

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

                <form>
                  <div className="field">
                    <div className="control">
                      <input
                        className="input is-large"
                        type="email"
                        placeholder="Your Email"
                        autofocus="" />
                    </div>
                  </div>

                  <div className="field">
                    <div className="control">
                      <input
                        className="input is-large"
                        type="password"
                        placeholder="Your Password"
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
                    className="button is-block is-info is-large is-fullwidth">
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

export default withStyles(styles)(LoginPage);

