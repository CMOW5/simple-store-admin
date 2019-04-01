import React, {Component} from 'react';

import _ from 'lodash';

/**
 *
 */
export default class SearchBar extends Component {
  /**
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.onSearch = this.onSearch.bind(this);
  }

  /**
   * this event is triggered when the a search text
   * is entered in the search field
   * @param {string} inputText
   */
  onSearch(inputText) {
    this.props.onSearch(inputText);
  }

  /**
   * @return {ReactNode}
   */
  render() {
    const template = this.props.template;

    if (template.config.searchable) {
      return <SearchField template = {template} onSearch = {this.onSearch} />;
    } else {
      return null;
    }
  }
}

/**
 *
 */
class SearchField extends React.Component {
  /**
   *
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      searchInputText: '',
    };

    // const DEBOUNCE_TIME = props.template.config.debounce || 500;
    const DEBOUNCE_TIME = 500;

    this.handleInputChange = this.handleInputChange.bind(this);
    this.search = this.search.bind(this);
    this.debouncedSearch =
      _.debounce(this.search, DEBOUNCE_TIME);
    this.debouncedSearch = this.debouncedSearch.bind(this);
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

  /** */
  search() {
    this.props.onSearch(this.state.searchInputText);
  }

  /**
   * @return {ReactNode}
   */
  render() {
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
}
