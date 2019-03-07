import React, {Component} from 'react';
import ResponsiveTable from 'components/table/ResponsiveTable';

import template from '../../components/table/table-template-example';

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
    return (
      <div>
        <ResponsiveTable template={template}></ResponsiveTable>
      </div>
    );
  }
}
