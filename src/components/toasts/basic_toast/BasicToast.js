import React, {Component} from 'react';

/* styles */
import './basic-toast.css';

const TOAST_SHOW_CLASS = 'toast show';
const TOAST_HIDE_CLASS = 'toast';

/**
 * a simple toast
 */
export default class BasicToast extends Component {
  /**
   * default constructor
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      showToast: TOAST_HIDE_CLASS,
    };
    this.hideToast = this.hideToast.bind(this);
  }

  /**
     * this method is fired on every render, regardless of the cause.
     * this method is called before the render method is called
     * @param {object} props
     * @param {object} state
     * @return {object}
     */
  static getDerivedStateFromProps(props, state) {
    if (props.show) {
      state.showToast = TOAST_SHOW_CLASS;
    } else {
      state.showToast = TOAST_HIDE_CLASS;
    }
    return state;
  }

  /**
   * @param {object} prevProps
   * @param {object} prevState
   */
  componentDidUpdate(prevProps, prevState) {
    if (this.state.showToast === TOAST_SHOW_CLASS) {
      this.hideToast();
    }
  }

  /**
   * hide the toast after the given time
   */
  hideToast() {
    setTimeout(() => {
      this.setState({
        showToast: TOAST_HIDE_CLASS,
      });
    }, 3000);
  }

  /**
   * @return {ReactNode}
   */
  render() {
    const message = this.props.message;
    return (
      <div className={this.state.showToast}>{message}</div>
    );
  }
}
