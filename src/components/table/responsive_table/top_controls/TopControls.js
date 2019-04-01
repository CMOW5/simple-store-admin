import React, {Component} from 'react';
import {TableContext} from '../context/table-context';

/* styles */
import './top-controls.css';

/* components */
import SearchBar from './search_bar/SearchBar';
import LeftButtons from './buttons/LeftButtons';

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
  }

  // the context is used to create a connection between
  // the actions buttons event in this component
  // and the prop event from the parent Table component
  static contextType = TableContext;

  /** */
  onSearch = (searchText) => {
    this.props.onSearch(searchText);
  }

  /**
   * @param {*} buttonClicked
   * @param {*} rowData
   */
  onButtonClicked = (buttonClicked) => {
    const eventName = buttonClicked.event;
    this.context[eventName](buttonClicked);
  }

  /**
   * @return {ReactNode}
   */
  render() {
    const template = this.props.template;

    return (
      <div className="top-controls has-background-light">

        <div className="columns is-desktop is-centered">

          <LeftButtons 
            template = {template} 
            onButtonClicked = {this.onButtonClicked}
            />

          <SearchBar 
            onSearch = {this.onSearch}
            template = {template} 
          />

          {/* right side buttons */}
          <div className="column"></div>

        </div>

      </div>
    );
  }
}

