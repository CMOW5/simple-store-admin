import React, {Component} from 'react';

// import './test-page.css';
/**
 *
 */
export default class TestPage extends Component {
  /**
   *
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   * @return {ReactNode}
   */
  render() {
    console.log('Testpaged');
    return (
      <div>TEST PAGE</div>
    );
  }
}
