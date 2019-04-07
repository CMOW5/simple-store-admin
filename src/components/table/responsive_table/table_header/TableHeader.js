import React, {Component} from 'react';
import {Thead, Tr, Th} from '../core/SuperResponsiveTable';

import cloneDeep from 'lodash/cloneDeep';

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
  }

  /**
   * @param {object} template
   * @return {ReactNode}
   */
  mapColumnsToNodes = (template) => {
    let columns = cloneDeep(template.columns);
    this.appendActionsHeader(columns, template);

    return columns.map((column) => {
      return (<Th key={column.label}>{column.label}</Th>);
    });
  }

  /**
   * @param {*} columns
   * @param {*} template
   */
  appendActionsHeader = (columns, template) => {
    if (!template.config.actions) {
      return;
    }

    const label = template.config.labels.actions;
    columns.push({
      'label': label,
      'name': 'actions',
      'meta': {},
    });
  }

  /**
   * @return {ReactNode}
   */
  render() {
    const template = this.props.template;
    const columnsNodes = this.mapColumnsToNodes(template);

    return (
      <Thead className="has-background-light">
        <Tr>
          {columnsNodes}
        </Tr>
      </Thead>
    );
  }
}
