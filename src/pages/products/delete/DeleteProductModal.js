import React, {Component} from 'react';

/* api */
import ProductsRequest from 'services/api/products/products-request';

/* components */
import SimpleNotification from
  'components/modals/simple_notification/SimpleNotification';

import ErrorNotification from
  'components/modals/error_notification/ErrorNotification';

/**
 * this component show a simple notification message using a modal
 */
export default class DeleteProductModal extends Component {
  /**
   *
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      showError: false,
      isDeleting: false,
    };
    this.closeModal = this.closeModal.bind(this);
    this.closeErrorModal = this.closeErrorModal.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
  }

  /**
   * notify the parent that the confirmation button was clicked
   * TODO: improve the setState isDeleting prop
   */
  deleteProduct() {
    // do the http request
    this.setState({
      isDeleting: true,
    });

    const id = this.props.product.id;
    ProductsRequest
      .deleteProduct(id)
      .then((response) => {
        // show some error notification
        this.setState({
          isDeleting: false,
        });
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
    const product = this.props.product;
    const show = this.props.show;
    const showError = this.state.showError;
    return (
      <div>
        <SimpleNotification
          show = {show}
          message =
            {`estas seguro que quieres borrar el producto 
            ${product.name}?`}
          type = 'danger'
          onConfirmationButtonClicked = {this.deleteProduct}
          onCancelButtonClicked = {this.closeModal}
          loading = {this.state.isDeleting}
        />

        <ErrorNotification
          show = {showError}
          onConfirmationButtonClicked = {this.closeErrorModal}
        />

      </div>
    );
  }
}
