import React, {Component} from 'react';

/* components */
import CardSection from './cards_section/CardSection';

import './dashboard.css';

/**
 * dashboard component
 */
export default class DashBoard extends Component {
  /**
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  /**
   * @return {ReactNode}
   */
  render() {
    return (
      <React.Fragment>

        <section className="hero is-info welcome is-small dashboard-title">
          <div className="hero-body">
            <h1 className="title">
            Hello, Admin.
            </h1>
            <h2 className="subtitle">
            I hope you are having a great day!
            </h2>
          </div>
        </section>

        <CardSection />

      </React.Fragment>
    );
  }
}

