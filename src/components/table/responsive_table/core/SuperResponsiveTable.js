import React from 'react';
import {Provider, Consumer} from './tableContext';

/* styles */
import './SuperResponsiveTableStyle.css';

const omit = (obj, omitProps) =>
  Object.keys(obj)
    .filter((key) => omitProps.indexOf(key) === -1)
    .reduce((returnObj, key) => ({...returnObj, [key]: obj[key]}), {});

const allowed = (props) => omit(props, ['inHeader', 'columnKey', 'headers']);

/**
 * a resposive table
 */
export class Table extends React.Component {
  /**
   *
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      headers: {},
    };
  }

  /**
   * @return {ReactNode}
   */
  render() {
    const {headers} = this.state;
    const classes = (this.props.className || '') + ' responsiveTable';
    return (
      <Provider value={headers}>
        <table {...allowed(this.props)} className={classes} />
      </Provider>
    );
  }
}

export const Thead = (props) => (
  <thead {...allowed(props)}>
    {React.cloneElement(props.children, {inHeader: true})}
  </thead>
);

/**
 *
 */
class TrInner extends React.Component {
  /**
   *
   * @param {*} props
   */
  constructor(props) {
    super(props);
    const {headers} = props;
    if (headers && props.inHeader) {
      React.Children.map(props.children, (child, i) => {
        if (child) {
          headers[i] = child.props.children;
        }
      });
    }
  }

  /**
   * @return {ReactNode}
   */
  render() {
    const {children} = this.props;
    return (
      <tr {...allowed(this.props)}>
        {children &&
          React.Children.map(
            children,
            (child, i) =>
              child &&
              React.cloneElement(child, {
                key: i,
                columnKey: i,
              })
          )}
      </tr>
    );
  }
}

export const Tr = (props) => (
  <Consumer>{(headers) => <TrInner {...props} headers={headers} />}</Consumer>
);

export const Th = (props) => <th {...allowed(props)} />;
export const Tbody = (props) => <tbody {...allowed(props)} />;
export const TFooter = (props) => <tfoot {...allowed(props)} />;

/**
 *
 */
class TdInner extends React.Component {
  /**
   * @return {ReactNode}
   */
  render() {
    if (this.props.colSpan) {
      return <td {...allowed(this.props)} />;
    }
    const {headers, children, columnKey} = this.props;
    const classes = (this.props.className || '') + ' pivoted';
    return (
      <td className={classes}>
        <div className="tdBefore">{headers[columnKey]}</div>
        {children !== undefined ? children : <div>&nbsp;</div>}
      </td>
    );
  }
}

export const Td = (props) => (
  <Consumer>{(headers) => <TdInner {...props} headers={headers} />}</Consumer>
);
