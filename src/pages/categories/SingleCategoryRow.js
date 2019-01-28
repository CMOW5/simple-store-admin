import React, {Component} from 'react';

/**
 * a single row contanint the category data
 */
export default class SingleCategoryRow extends Component {
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
    this.props.onSeeButtonClicked(this.props.category);
  }

  /**
   * notify the parent that the see edit button was clicked
   */
  onEditButtonClicked() {
    this.props.onEditButtonClicked(this.props.category);
  }

  /**
   * notify the parent that the see delete button was clicked
   */
  onDeleteButtonClicked() {
    this.props.onDeleteButtonClicked(this.props.category);
  }

  /**
   * @return {ReactNode}
   */
  render() {
    const name = this.props.category.name;
    // TODO: render something instead of null when the parent category is null
    const parentCategoryName = this.props.category.parentCategory.name;
    const imageUrl
      = this.props.category.image ? this.props.category.image.url : '';

    return (

      <tr>
        <td>{name}</td>
        <td>{parentCategoryName}</td>
        <td>
          <img
            src={imageUrl}
            className="image is-96x96" alt="category" />
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
                <span>view</span>
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
