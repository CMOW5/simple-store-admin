import React, {Component} from 'react';

import withStyles from 'react-jss';
import styles from './show-category-styles';
import './show-category.css';

/* redux */
import {connect} from 'react-redux';
import {goToRoute} from 'store/actions/router-actions';

/* router */
import {withRouter} from 'react-router-dom';

/* routes */
import RouterHandler from 'router/router-handler';
import CategoriesRoutes from 'router/routes/categories-routes';

/* api */
import categoriesRequest from 'services/api/categories/categories-request';

/* models */
import Category from 'models/category';

/* utils */
// import Logger from 'utils/logger/logger';

/* components */
import ShowHeader from 'pages/utils/list_headers/ShowHeader';
import Loading from 'components/utils/loading/Loading';

/**
 * component to display the category details
 */
class ShowCategory extends Component {
  /**
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      category: new Category(),
      isFetching: true,
    };

    this.getCategory = this.getCategory.bind(this);
    this.goToCategoriesList = this.goToCategoriesList.bind(this);
    this.goToEditCategory = this.goToEditCategory.bind(this);
    this.renderCategoryInfo = this.renderCategoryInfo.bind(this);
  }

  /**
   * load the resource
   */
  componentDidMount() {
    this.getCategory(this.state.id);
  }

  /**
   * fetch the category with the given id
   * @param {*} id
   */
  async getCategory(id) {
    const category = await categoriesRequest.fetchCategory(id);
    this.setState({
      category: category,
      isFetching: false,
    });
  }

  /**
   * notify the parent that the see edit button was clicked
   */
  goToEditCategory() {
    const id = this.props.match.params.id;
    const route = CategoriesRoutes.edit(id);
    RouterHandler.goTo(this.props.history, route);
  }

  /**
   * notify the parent that the see edit button was clicked
   */
  goToCategoriesList() {
    const route = CategoriesRoutes.base();
    RouterHandler.goTo(this.props.history, route);
  }

  /**
   *
   * @param {object} category
   * @return {ReactNode}
   */
  renderCategoryInfo(category) {
    if (this.state.isFetching) {
      return <Loading show={true} title="category" />;
    } else {
      const name = category.name;
      const parentCategoryName = category.parentCategory.name;
      const image = [category.image];

      return (
        <div>
          <Section title="name" text={name} />
          <Section title="parent" text={parentCategoryName} />
          <ImagesSection title="image" images={image} />
        </div>
      );
    }
  }

  /**
   * @return {ReactNode}
   * TODO: shows the subcategories
   */
  render() {
    const category = this.state.category;
    return (
      <div>
        <ShowHeader
          onEditButtonClicked = {this.goToEditCategory}
          onReturnButtonClicked = {this.goToCategoriesList}
          title='category'
          icon='fa fa-shopping-bag fa-2x'
        />
        {this.renderCategoryInfo(category)}
      </div>
    );
  }
}

// which properties of the global store do i wanna use in this component
const mapStateToProps = (state) => {
  return {
    router: state.routerReducer,
  };
};

// map the actions i can execute (send) to the reducers
const mapDispatchToProps = (dispatch) => {
  return {
    goToRoute: (route) => {
      dispatch(goToRoute(route));
    }, // key = prop name created by redux , value = method
  };
};

export default
withRouter(
  connect(
    mapStateToProps, mapDispatchToProps
  )(withStyles(styles)(ShowCategory)));

/**
 * a simple section component
 * @param {object} props
 * @return {ReactNode}
 */
function Section(props) {
  const title = props.title;
  const text = props.text;
  return (
    <section className="show-category-section">
      <h1 className="title">{title}</h1>
      <h2 className="subtitle">
        {text}
      </h2>
    </section>
  );
}

/**
 * a simple image section component
 * @param {object} props
 * @return {ReactNode}
 */
function ImagesSection(props) {
  const title = props.title;
  const images = props.images.map((image, index) => {
    if (image == null) return null;

    return (
      <div className="column is-2" key={index} >
        <img className="show-category-product-image" src={image.url} alt="product" />
      </div>
    );
  });

  return (
    <section className="show-category-section">
      <h1 className="title">{title}</h1>
      <div className="columns is-multiline">
        {images}
      </div>
    </section>
  );
}

