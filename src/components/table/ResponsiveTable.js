import React, {Component} from 'react';
import {Table} from './responsive_table/core/SuperResponsiveTable';
import TopControls from './responsive_table/top_controls/TopControls';
import TableHeader from './responsive_table/table_header/TableHeader';
import TableBody from './responsive_table/table_body/TableBody';
import Pagination from 'components/pagination/Pagination';

import {TableContext} from './responsive_table/context/table-context';

// styles
import './responsive-table.css';

/**
 * a responsive table configurable from template a json object
 * @see table-template-example.js
 */
export default class ResponsiveTable extends Component {
  /**
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {};
    this.onPageSelected = this.onPageSelected.bind(this);
  }

  /**
   * @param {*} url
   */
  onPageSelected(url) {
    this.props.onPageSelected(url);
  }

  /**
   * @return {ReactNode}
   */
  render() {
    const template = this.props.template;

    return (
      <TableContext.Provider value={this.props}>

        <TopControls
          template = {template}
          onSearch = {this.props.onSearch}
        />

        <Table className = "table">
          <TableHeader template = {template} />
          <TableBody template = {template} />
        </Table>

        <Pagination
          paginator = {this.props.paginator}
          onPageSelected = {this.props.onPageSelected}
        />

      </TableContext.Provider>
    );
  }
}
