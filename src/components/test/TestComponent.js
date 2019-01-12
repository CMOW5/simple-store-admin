import React, {Component} from 'react';

// import axios from 'axios';

/* styles */
import './test-component.css';

import BasicToast from 'components/toasts/basic_toast/BasicToast';

/**
 *
 */
class TestComponent extends Component {
  /**
   *
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      imageSource: '',
      showToast: false,
    };
    this.click = this.click.bind(this);
  }

  /**
   *
   */
  click() {
    this.setState({
      showToast: true,
    });
  }

  /**
   * @return {ReactNode}
   */
  render() {
    return (
      <div>
        <button onClick={this.click}>send</button>

        <BasicToast show={this.state.showToast} message="hola" />
      </div>
    );
  }
}

export default TestComponent;
