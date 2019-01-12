import React, {Component} from 'react';

/**
 * product list component
 */
export default class SingleProductRow extends Component {
  /**
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.onSeeButtonClicked = this.onSeeButtonClicked.bind(this);
    this.onEditButtonClicked = this.onEditButtonClicked.bind(this);
    this.onDeleteButtonClicked = this.onDeleteButtonClicked.bind(this);
  }

  /**
   * notify the parent that the see see button was clicked
   */
  onSeeButtonClicked() {
    this.props.onSeeButtonClicked(this.props.product.id);
  }

  /**
   * notify the parent that the see edit button was clicked
   */
  onEditButtonClicked() {
    this.props.onEditButtonClicked(this.props.product.id);
  }

  /**
   * notify the parent that the see delete button was clicked
   */
  onDeleteButtonClicked() {
    this.props.onDeleteButtonClicked(this.props.product);
  }

  /**
   * @return {ReactNode}
   */
  render() {
    const name = this.props.product.name;
    const description = this.props.product.description;
    const price = this.props.product.price;
    const status = this.props.product.active ? 'active' : 'inactive';
    const inSale = this.props.product.in_sale ? 'insale' : '';

    const images = [...this.props.product.images];
    const image = images.length ? images[0].url : '';

    return (

      <tr>
        <td>{name}</td>
        <td>{description}</td>
        <td>{price}</td>
        <td>
          <h1>{status}</h1>
          <h1>{inSale}</h1>
        </td>
        <td>
          <img
            src={image}
            className="image is-96x96" alt="product" />
        </td>
        <td>
          <div className="field is-grouped">

            <p className="control">
              <button
                onClick={this.onSeeButtonClicked}
                className="button is-small is-warning">
                <span className="icon is-small">
                  <i className="fa fa-eye"></i>
                </span>
                <span>details</span>
              </button>
            </p>

            <p className="control">
              <button
                onClick={this.onEditButtonClicked}
                className="button is-small is-info">
                <span className="icon is-small">
                  <i className="fa fa-edit"></i>
                </span>
                <span>edit</span>
              </button>
            </p>

            <p className="control">
              <button
                onClick={this.onDeleteButtonClicked}
                className="button is-small is-danger">
                <span className="icon is-small">
                  <i className="fa fa-trash"></i>
                </span>
                <span>delete</span>
              </button>
            </p>

          </div>
        </td>
      </tr>

    );
  }
}
