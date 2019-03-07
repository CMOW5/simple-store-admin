import React, {Component} from 'react';

import {TableContext} from '../table-context';

/* styles */
import './top-controls.css';

/* utils */
import _ from 'lodash';

/**
 *
 */
export default class TopControls extends Component {
  /**
   * default constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      searchInputText: '',
    };

    const DEBOUNCE_TIME = props.template.config.debounce || 500;

    this.handleInputChange = this.handleInputChange.bind(this);
    this.search = this.search.bind(this);
    this.debouncedSearch =
      _.debounce(this.search, DEBOUNCE_TIME);
    this.debouncedSearch = this.debouncedSearch.bind(this);
    this.renderSearchBar = this.renderSearchBar.bind(this);
    this.renderLeftButtons = this.renderLeftButtons.bind(this);
  }

  // the context is used to create a connection between
  // the actions buttons event in this component
  // and the prop event from the parent Table component
  static contextType = TableContext;

  /** */
  search() {
    this.props.onSearch(this.state.searchInputText);
  }

  /**
   * handle the changes in the form fields
   * @param {*} event
   */
  handleInputChange(event) {
    const inputText = event.target.value;
    this.setState({
      searchInputText: inputText,
    }, this.debouncedSearch);
  }

  /**
   * @param {*} buttonClicked
   * @param {*} rowData
   */
  onButtonClicked(buttonClicked) {
    const eventName = buttonClicked.event;
    this.context[eventName](buttonClicked);
  }

  /**
   * @param {object} template
   * @return {ReactNode}
   */
  renderLeftButtons(template) {
    const buttons = template.topcontrols.buttons.left;

    const buttonsNodes = buttons.map((button) => {
      return (
        <a
          className = {'button ' + button.class}
          onClick = {() => this.onButtonClicked(button)}
          key = {button.label} >
          <span>{button.label}</span>
          <span className="icon is-small">
            <i className = {button.icon}></i>
          </span>
        </a>
      );
    });

    return (
      <p className="buttons">
        {buttonsNodes}
      </p>
    );
  }

  /**
   * @param {object} template
   * @return {ReactNode}
   */
  renderSearchBar(template) {
    if (!template.config.searchable) {
      return null;
    }

    return (
      <div className="column">
        <div className="field search-bar">
          <p className="control has-icons-left">
            <input
              className="input has-text-centered is-rounded"
              type="text"
              placeholder="Buscar"
              value={this.state.searchInputText}
              onChange={this.handleInputChange}
            />
            <span className="icon is-small is-left">
              <i className="fa fa-search"></i>
            </span>
          </p>
        </div>
      </div>
    );
  }

  /**
   * @return {ReactNode}
   */
  render() {
    const template = this.props.template;

    return (
      <div className="top-controls has-background-light">

        <div className="columns is-desktop is-centered">

          <div className="column">
            {this.renderLeftButtons(template)}
          </div>

          {this.renderSearchBar(template)}

          {/* right side buttons */}
          <div className="column"></div>

        </div>

      </div>
    );
  }
}

