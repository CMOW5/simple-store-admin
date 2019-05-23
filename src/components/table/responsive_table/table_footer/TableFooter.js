import React, {Component} from 'react';
import {TFooter, Tr, Td} from '../core/SuperResponsiveTable';
import {TableContext} from '../context/table-context';

// styles
import './table-footer.css';

/** */
export default class TableFooter extends Component {
  /**
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {};
  }

  // the context is used to create a connection between
  // the actions buttons event in this component
  // and the prop event from the parent Table component
  static contextType = TableContext;

  /**
   * @return {ReactNode}
   */
  render() {
    return (
      <TFooter>
        <Tr>
          <Td>
            
          </Td>
        </Tr>
      </TFooter>
    );
  }
}
