import React, {Component} from 'react';

/* api */
import CategoriesRequest from 'services/api/categories/categories-request';

/* routes */
import {withRouter} from 'react-router-dom';
import routerHandler from 'router/router-handler';
import categoriesRoutes from 'router/routes/categories-routes';

/* components */
import SingleCard from '../utils/SingleCard';
import Loading from 'components/utils/loading/Loading';

/**
 * products card component
 */
class CategoriesCard extends Component {
  /**
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      tag: 'category',
      isFetching: true,
    };
    this.getCount = this.getCount.bind(this);
    this.showCategories = this.showCategories.bind(this);
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
  showCategories() {
    const route = categoriesRoutes.base();
    routerHandler.goTo(this.props.history, route);
  }

  /**
   *
   */
  async getCount() {
    const count = await CategoriesRequest.count();
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
      this.state.isFetching ? <Loading show={true} title="categories" /> :
        <SingleCard
          icon = 'fa fa-sitemap fa-5x'
          tag = {this.state.tag}
          count = {this.state.count}
          image = "https://picsum.photos/200/600"
          onButtonClicked = {this.showCategories}
        />
    );
  }
}

export default withRouter((CategoriesCard));
