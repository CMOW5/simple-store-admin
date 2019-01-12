import React, {Component} from 'react';

/* api */
import CategoriesRequest from 'services/api/categories/categories-request';

/* components */
import SimpleNotification from
  'components/modals/simple_notification/SimpleNotification';

import ErrorNotification from
  'components/modals/error_notification/ErrorNotification';

/**
 * this component show a simple notification message using a modal
 */
export default class DeleteCategoryModal extends Component {
  /**
   *
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      showError: false,
    };
    this.closeModal = this.closeModal.bind(this);
    this.closeErrorModal = this.closeErrorModal.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);
  }

  /**
   * notify the parent that the confirmation button was clicked
   */
  deleteCategory() {
    // do the http request
    const id = this.props.category.id;
    CategoriesRequest
      .deleteCategory(id)
      .then((response) => {
        this.props.onDeleteSucess();
      })
      .catch((error) => {
        // show an error notification
        this.setState({
          showError: true,
        });
      });
  }

  /**
   * notify the parent that the confirmation button was clicked
   */
  closeModal() {
    this.props.onDeleteCancel();
  }

  /**
   * notify the parent that the confirmation button was clicked
   */
  closeErrorModal() {
    this.setState({
      showError: false,
    }, this.closeModal);
  }

  /**
   * @return {ReactNode}
   */
  render() {
    const category = this.props.category;
    const show = this.props.show;
    const showError = this.state.showError;
    return (
      <div>
        <SimpleNotification
          show = {show}
          message =
            {`estas seguro que quieres borrar la categoria 
            ${category.name}?`}
          type = 'danger'
          onConfirmationButtonClicked = {this.deleteCategory}
          onCancelButtonClicked = {this.closeModal}
        />

        <ErrorNotification
          show = {showError}
          onConfirmationButtonClicked = {this.closeErrorModal}
        />

      </div>
    );
  }
}
