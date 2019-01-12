import React, {Component} from 'react';

/* styles */
import './list-header.css';

/* utils */
// import Logger from 'utils/logger/logger';
import _ from 'lodash';

const DEBOUNCE_TIME = 500;

/**
 *
 */
export default class ListHeader extends Component {
  /**
   * default constructor
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
    };
    this.addNewButtonClicked = this.addNewButtonClicked.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.searchProducts = this.searchProducts.bind(this);
    this.debouncedSearchProducts =
      _.debounce(this.searchProducts, DEBOUNCE_TIME);
    this.debouncedSearchProducts = this.debouncedSearchProducts.bind(this);
  }

  /**
   * notify to the parent component that the add button was clicked
   * @param {*} event
   */
  addNewButtonClicked(event) {
    event.preventDefault();
    this.props.onClick();
  };

  /**
   * handle the changes in the form fields
   * @param {*} event
   */
  handleInputChange(event) {
    const target = event.target;
    let value = target.value;
    this.setState({
      keyword: value,
    }, this.debouncedSearchProducts);
  }

  /**
   * this function is called after the user has enter
   * a keyword to search a product, the function is
   * called only if the user hasn't entered a new value
   * in the next DEBOUNCE_TIME ms
   */
  searchProducts() {
    this.props.onSearch(this.state.keyword);
  }

  /**
   * @return {ReactNode}
   */
  render() {
    const title = this.props.title;
    const icon = this.props.icon;

    return (
      <div className="">

        <div className="columns is-desktop is-centered">

          {/* title and buttons */}
          <div className="column header-info">
            <span>
              <i className={icon}></i>
            </span>

            <span className="header-title">{title}</span>

            <a
              onClick = {this.addNewButtonClicked}
              className="button is-success">
              <span className="icon is-small">
                <i className="fa fa-plus-square"></i>
              </span>
              <span>Add new</span>
            </a>
          </div>

          {/* search bar */}
          <div className="column">
            <div className="field search-bar">
              <p className="control has-icons-left">
                <input
                  className="input is-info"
                  type="text"
                  placeholder="Buscar"
                  value={this.state.keyword}
                  onChange={this.handleInputChange}
                />
                <span className="icon is-small is-left">
                  <i className="fa fa-search"></i>
                </span>
              </p>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

