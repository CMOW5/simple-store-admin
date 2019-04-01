import React, {Component} from 'react';

/**
 *
 */
export default class LeftButtons extends Component {
  /**
   * default constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);

    this.renderLeftButtons = this.renderLeftButtons.bind(this);
    this.onButtonClicked = this.onButtonClicked.bind(this);
  }

  /**
   * @param {object} buttonClicked
   */
  onButtonClicked(buttonClicked) {
    this.props.onButtonClicked(buttonClicked);
  }

  /**
   * @param {object} template
   * @return {ReactNode}
   */
  renderLeftButtons(template) {
    const buttons = template.topcontrols.buttons.left;

    const buttonsNodes = buttons.map((button) => {
      return (
        <a
          className = {'button ' + button.class}
          onClick = {() => this.onButtonClicked(button)}
          key = {button.label} >
          <span>{button.label}</span>
          <span className="icon is-small">
            <i className = {button.icon}></i>
          </span>
        </a>
      );
    });

    return (
      <p className="buttons">
        {buttonsNodes}
      </p>
    );
  }

  /**
   * @return {ReactNode}
   */
  render() {
    const template = this.props.template;

    return (
      <div className="column">
        {this.renderLeftButtons(template)}
      </div>
    );
  }
}

