import React, {Component} from 'react';

/* components */
import CardSection from './cards_section/CardSection';

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
      <div>
        <div className="container">
          <CardSection />
        </div>
      </div>
    );
  }
}

