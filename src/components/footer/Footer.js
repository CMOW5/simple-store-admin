import React, {Component} from 'react';

import './footer.css';
/**
 * footer component
 */
export default class Footer extends Component {
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
    return (

      <footer className="footer">

        <div className="columns">

          <div className="column is-4">

            <div className="content">

              <section className="footer-title">
                                INFORMACIÓN
              </section>

              <section className="has-text-left-desktop">
                <ul >
                  <li>CONTÁCTENOS</li>
                  <li>AVISO DE PRIVACIDAD</li>
                </ul>
              </section>

            </div>

          </div>

          <div className="column is-4">

            <div className="content">

              <section className="footer-title">
                                        NUESTRAS REDES SOCIALES
              </section>

              <a
                href = "https://www.facebook.com/"
                target = "_blank"
                rel = "noopener noreferrer" >
                <img
                  src = {require('resources/images/social_networks/facebook.png')}
                  alt = "" />
              </a>

              <a
                href = "https://www.twitter.com/"
                target = "_blank"
                rel = "noopener noreferrer" >
                <img
                  src = {require('resources/images/social_networks/twitter.png')}
                  alt = "" />
              </a>

              <a
                href = "https://www.instagram.com/"
                target = "_blank"
                rel = "noopener noreferrer">
                <img
                  src = {require('resources/images/social_networks/instagram.png')}
                  alt="" />
              </a>

              <a
                href = "https://www.youtube.com/"
                target = "_blank"
                rel = "noopener noreferrer">
                <img
                  src = {require('resources/images/social_networks/youtube.png')}
                  alt = "" />
              </a>

            </div>

          </div>

          <div className="column is-4">

            <div className="content">

              <section className="footer-title">
                                INFORMACIÓN DE LA TIENDA
              </section>

              <section className="has-text-left-desktop">
                <ul>
                  <li>DIRECCIÓN</li>
                  <li>HORARIO</li>
                </ul>
              </section>

            </div>

          </div>


        </div>
      </footer>

    );
  }
}
