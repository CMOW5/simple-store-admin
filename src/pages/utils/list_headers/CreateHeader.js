import React from 'react';

import './create-header.css';

/**
 *
 * @param {*} props
 * @return {ReactNode}
 */
function CreateHeader(props) {
  const title = props.title;
  const icon = props.icon;

  return (
    <div className="create-header">

      <span>
        <i className={icon}></i>
      </span>

      <span className="create-title">{title}</span>

    </div>
  );
}

export default CreateHeader;
