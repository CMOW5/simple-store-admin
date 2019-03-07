import React, {Component} from 'react';
import {Thead, Tr, Th} from '../tags/SuperResponsiveTable';

/**
 *
 */
export default class TableHeader extends Component {
  /**
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {};

    this.renderHeader = this.renderHeader.bind(this);
    this.appendActionsHeader = this.appendActionsHeader.bind(this);
  }

  /**
   * @param {object} template
   * @return {ReactNode}
   */
  renderHeader(template) {
    let columns = template.columns;

    if (template.config.actions) {
      columns =
        this.appendActionsHeader(columns, template.config.labels.actions);
    }

    const columnsNodes = columns.map((column) => {
      return (<Th key={column.label}>{column.label}</Th>);
    });

    return (
      <Thead className="has-background-light">
        <Tr>
          {columnsNodes}
        </Tr>
      </Thead>
    );
  }

  /**
   * @param {*} columns
   * @param {*} label
   * @return {*}
   */
  appendActionsHeader(columns, label) {
    columns.push({
      'label': label,
      'name': 'actions',
      'meta': {},
    });

    return columns;
  }

  /**
   * @return {ReactNode}
   */
  render() {
    const template = this.props.template;
    return (
      <React.Fragment>
        {this.renderHeader(template)}
      </React.Fragment>
    );
  }
}
