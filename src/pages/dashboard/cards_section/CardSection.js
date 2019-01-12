import React, {Component} from 'react';

/* components */
import ProductsCard from './products_card/ProductsCard';
import CategoriesCard from './categories_card/CategoriesCard';
import UsersCard from './users_card/UsersCard';
// import SingleCard from './utils/SingleCard';

/**
 * cardsection component
 */
export default class CardSection extends Component {
  /**
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  /**
   * @return {ReactNode}
   */
  render() {
    return (
      <div className="columns is-desktop">
        <div className="column">
          <ProductsCard />
        </div>
        <div className="column">
          <CategoriesCard />
        </div>
        <div className="column">
          <UsersCard />
        </div>
      </div>
    );
  }
}
