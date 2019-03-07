import React, {Component} from 'react';
import {Tbody, Tr, Td} from '../tags/SuperResponsiveTable';

import {TableContext} from '../table-context';

/**
 *
 */
export default class TableBody extends Component {
  /**
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {};

    // function bindings
    this.renderBodyRows = this.renderBodyRows.bind(this);
    this.appendActions = this.appendActions.bind(this);
    this.actionButtonClicked = this.actionButtonClicked.bind(this);
  }

  // the context is used to create a connection between
  // the actions buttons event in this component
  // and the prop event from the parent Table component
  static contextType = TableContext;

  /**
   * @param {object} template
   * @return {ReactNode}
   */
  renderBodyRows(template) {
    let bodyData = template.body.data;

    if (template.config.actions) {
      bodyData = bodyData.map((element) => {
        element.actions =
          this.appendActions(template.config.actionsButtons, element);
        return element;
      });
    }

    const rows = bodyData.map((row) => {
      const columns = template.columns.map((column) => {
        return (<Td key={column.name}>{row[column.name]}</Td>);
      });

      return (<Tr key={row.id}>{columns}</Tr>);
    });

    return rows;
  }

  /**
   * @param {*} buttons
   * @param {*} element
   * @return {*}
   */
  appendActions(buttons, element) {
    const actionButtons =
      buttons.map((button, index) => {
        return (
          <a
            onClick={() => this.actionButtonClicked(button, element)}
            key={index} >
            <span className="icon is-small">
              <i className = {button.icon}></i>
            </span>
          </a>
        );
      });

    return actionButtons;
  }

  /**
   * @param {*} buttonClicked
   * @param {*} rowData
   */
  actionButtonClicked(buttonClicked, rowData) {
    const eventName = buttonClicked.event;
    this.context[eventName](buttonClicked, rowData);
  }

  /**
   * @return {ReactNode}
   */
  render() {
    const template = this.props.template;
    return (
      <Tbody>
        {this.renderBodyRows(template)}
      </Tbody>
    );
  }
}
