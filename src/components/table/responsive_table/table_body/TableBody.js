import React, {Component} from 'react';
import {Tbody, Tr, Td} from '../core/SuperResponsiveTable';

import {TableContext} from '../context/table-context';

// styles
import './table-body.css';

import cloneDeep from 'lodash/cloneDeep';

/** */
export default class TableBody extends Component {
  /**
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {};

    // function bindings
    this.onActionButtonClicked = this.onActionButtonClicked.bind(this);
    this.mapRowsToNodes = this.mapRowsToNodes.bind(this);
    this.appendActionsToColumns = this.appendActionsToColumns.bind(this);
    this.appendActionsToRows = this.appendActionsToRows.bind(this);
    this.appendActionsButtonsToSingleRow =
      this.appendActionsButtonsToSingleRow.bind(this);
  }

  // the context is used to create a connection between
  // the actions buttons event in this component
  // and the prop event from the parent Table component
  static contextType = TableContext;

  /**
   * @param {object} template
   * @return {ReactNode}
   */
  mapRowsToNodes(template) {
    let columns = cloneDeep(template.columns);
    let rows = cloneDeep(template.body.data);

    this.appendActionsToColumns(columns, template);
    this.appendActionsToRows(rows, template);

    const rowsNodes = rows.map((row) => {
      const columnsNodes = columns.map((column) => {
        return (
          <Td key={column.name}>{this.getValueFromData(row, column)}</Td>
        );
      });
      return (<Tr key={row.id}>{columnsNodes}</Tr>);
    });
    return rowsNodes;
  }

  /**
   * @param {*} columns
   * @param {*} template
   */
  appendActionsToColumns(columns, template) {
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
   * @param {array} rows
   * @param {object} template
   * @return {array}
   */
  appendActionsToRows(rows, template) {
    if (!template.config.actions) {
      return;
    }

    const rowsWithActions = rows.map((row) => {
      row.actions =
        this.appendActionsButtonsToSingleRow(template.config.actionsButtons,
          row);
      return row;
    });

    return rowsWithActions;
  }

  /**
   * @param {*} buttons
   * @param {*} row
   * @return {*}
   */
  appendActionsButtonsToSingleRow(buttons, row) {
    const actionButtons =
      buttons.map((button, index) => {
        return (
          <a
            onClick={() => this.onActionButtonClicked(button, row)}
            key={index}
            className = "button is-small is-text table-actions" >
            <span className="icon is-small">
              <i className = {button.icon}></i>
            </span>
          </a>
        );
      });

    return actionButtons;
  }

  /**
   * this function deserializes an string representation
   * to an object
   *
   * example: given the row =>
   * row: {
   *  parentCategory: {
   *    name: 'some name'
   *  }
   * }
   *
   * and the column name => parentCategory.name
   * the function returns the value of the object
   * row.parentCategory.name
   *
   * @param {object} row
   * @param {object} column
   * @return {objct}
   */
  getValueFromData = (row, column) => {
    const data = column.name;
    return data.split('.').reduce((o, i) => {
      if (o) return o[i];
      else return undefined;
    }, row);
  }

  /**
   * @param {*} buttonClicked
   * @param {*} rowData
   */
  onActionButtonClicked(buttonClicked, rowData) {
    const eventName = buttonClicked.event;
    this.context[eventName](buttonClicked, rowData);
  }

  /**
   * @return {ReactNode}
   */
  render() {
    const template = this.props.template;
    const rowsNodes = this.mapRowsToNodes(template);

    return (
      <Tbody>
        {rowsNodes}
      </Tbody>
    );
  }
}
