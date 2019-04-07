import React, {Component} from 'react';
import withStyles from 'react-jss';

import styles from './footer-styles';

/**
 * footer component
 */
class Footer extends Component {
  /**
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      value: true,
    };
  }

  /**
   * @return {ReactNode}
   */
  render() {
    const {classes} = this.props;

    return (

      <footer className="footer">

        <div className="columns">

          <div className="column is-4">

            <div className="content">

              <section className = {classes.footerTitle}>
                INFORMACIÓN
              </section>

              <section className="has-text-left-desktop">
                <ul className = {classes.footerUl} >
                  <li className = {classes.footerLi} >CONTÁCTENOS</li>
                  <li className = {classes.footerLi} >AVISO DE PRIVACIDAD</li>
                </ul>
              </section>

            </div>

          </div>

          <div className="column is-4">
            <div className="content">
              <section className = {classes.footerTitle}>
                NUESTRAS REDES SOCIALES
              </section>

              <a href = "https://www.facebook.com/"
                target = "_blank"
                rel = "noopener noreferrer" >
                <img className={classes.footerImg}
                  src = {require('resources/images/social_networks/facebook.png')}
                  alt = "" />
              </a>

              <a href = "https://www.twitter.com/"
                target = "_blank"
                rel = "noopener noreferrer" >
                <img className={classes.footerImg}
                  src = {require('resources/images/social_networks/twitter.png')}
                  alt = "" />
              </a>

              <a href = "https://www.instagram.com/"
                target = "_blank"
                rel = "noopener noreferrer">
                <img className={classes.footerImg}
                  src = {require('resources/images/social_networks/instagram.png')}
                  alt="" />
              </a>

              <a href = "https://www.youtube.com/"
                target = "_blank"
                rel = "noopener noreferrer">
                <img className={classes.footerImg}
                  src = {require('resources/images/social_networks/youtube.png')}
                  alt = "" />
              </a>

            </div>

          </div>

          <div className="column is-4">

            <div className="content">

              <section className = {classes.footerTitle}>
                INFORMACIÓN DE LA TIENDA
              </section>

              <section className="has-text-left-desktop">
                <ul className = {classes.footerUl}>
                  <li className = {classes.footerLi}>DIRECCIÓN</li>
                  <li className = {classes.footerLi}>HORARIO</li>
                </ul>
              </section>

            </div>

          </div>


        </div>
      </footer>

    );
  }
}

export default withStyles(styles)(Footer);
