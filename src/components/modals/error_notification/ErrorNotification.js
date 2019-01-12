import React, {Component} from 'react';

/* components */
import SimpleNotification from '../simple_notification/SimpleNotification';

/**
 * this component show a simple notification message using a modal
 */
export default class ErrorNotification extends Component {
  /**
   *
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
  }

  /**
   * notify the parent that the confirmation button was clicked
   */
  closeModal() {
    this.props.onConfirmationButtonClicked();
  }

  /**
   * @return {ReactNode}
   */
  render() {
    const message = 'some error ocurred, please contact the page maintainer';
    const show = this.props.show;

    return (
      <SimpleNotification
        show = {show}
        message = {message}
        type = 'danger'
        /* modalStyle = 'error' */
        onConfirmationButtonClicked = {this.closeModal}
        onCancelButtonClicked = {this.closeModal}
      />
    );
  }
}
