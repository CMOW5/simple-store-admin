import React, {Component} from 'react';

/* api */
import ProductsRequest from 'services/api/products/products-request';

/* components */
import SingleCard from '../utils/SingleCard';
import Loading from 'components/utils/loading/Loading';

/**
 * products card component
 */
export default class UsersCard extends Component {
  /**
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      tag: 'user',
      isFetching: true,
    };
    this.getCount = this.getCount.bind(this);
  }


  /**
   * get the products info
   */
  componentDidMount() {
    this.getCount();
  }

  /**
   *
   */
  async getCount() {
    // const request = new ProductsRequest();
    const count = await ProductsRequest.count();
    this.setState({
      count: count,
      isFetching: false,
    });
  }

  /**
   * @return {ReactNode}
   */
  render() {
    return (
      this.state.isFetching ? <Loading show={true} title="users" /> :
        <SingleCard
          icon = 'fa fa-users fa-5x'
          tag = {this.state.tag}
          count = {this.state.count}
          image = "https://picsum.photos/200/400"
        />
    );
  }
}
