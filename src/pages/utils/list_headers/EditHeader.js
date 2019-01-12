import React from 'react';

import './edit-header.css';

/**
 *
 * @param {*} props
 * @return {ReactNode}
 */
function EditHeader(props) {
  const title = props.title;
  const icon = props.icon;

  const onReturnButtonClicked = function(e) {
    e.preventDefault();
    props.onReturnButtonClicked();
  };

  return (
    <div className="edit-header">

      <span>
        <i className={icon}></i>
      </span>

      <span className="edit-title">{title}</span>

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

export default EditHeader;
