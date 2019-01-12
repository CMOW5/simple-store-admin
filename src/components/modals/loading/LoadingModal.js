import React, {Component} from 'react';

import './loading-modal.css';

/**
 * this component shows a loading icon
 */
export default class Loading extends Component {
  /**
   *
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
    this.confirmationClicked = this.confirmationClicked.bind(this);
  }

  /**
   * notify the parent that the confirmation button was clicked
   */
  confirmationClicked() {
    this.props.onConfirmationButtonClicked();
  }

  /**
   * notify the parent that the confirmation button was clicked
   */
  closeModal() {
    this.props.onCancelButtonClicked();
  }
  /**
   * @return {ReactNode}
   */
  render() {
    const showModal = this.props.show ? 'modal is-active' : 'modal';
    const message = this.props.message;
    const size = 'fa-2x';

    return (
      <div className={showModal}>

        <div className="modal-background"></div>

        <div className="modal-card">

          <header className = "modal-card-head has-background-info">

            <p className="modal-card-title loading-modal-title">
              {message}
            </p>

          </header>

          <footer className="modal-card-foot loading-modal-footer">
            <i className={`fa fa-cog ${size} fa-spin`}></i>
          </footer>
        </div>
      </div>
    );
  }
}
