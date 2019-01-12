import React from 'react';

import './show-header.css';

/**
 *
 * @param {*} props
 * @return {ReactNode}
 */
function ShowHeader(props) {
  const title = props.title;
  const icon = props.icon;

  const onEditButtonClicked = function(e) {
    e.preventDefault();
    props.onEditButtonClicked();
  };

  const onReturnButtonClicked = function(e) {
    e.preventDefault();
    props.onReturnButtonClicked();
  };

  return (
    <div className="show-header">

      <span>
        <i className={icon}></i>
      </span>

      <span className="show-title">{title}</span>

      <a
        onClick = {onEditButtonClicked}
        className="button is-link">
        <span className="icon is-small">
          <i className="fa fa-edit"></i>
        </span>
        <span>Edit</span>
      </a>

      <a
        onClick = {onReturnButtonClicked}
        className="button is-warning">
        <span className="icon is-small">
          <i className="fa fa-list-ul"></i>
        </span>
        <span>Return to list</span>
      </a>

    </div>
  );
}

export default ShowHeader;
