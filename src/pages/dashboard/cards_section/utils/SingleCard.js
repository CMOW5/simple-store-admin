import React, {Component} from 'react';

/* styles */
import './single-card.css';

/**
 * single card component
 */
export default class SingleCard extends Component {
  /**
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.onButtonClicked = this.onButtonClicked.bind(this);
  }

  /**
   *
   */
  onButtonClicked() {
    this.props.onButtonClicked();
  }

  /**
   * @return {ReactNode}
   */
  render() {
    const icon =
      this.props.icon ? this.props.icon : 'fa fa-adn fa-5x';

    const backgroundImage = this.props.image;

    const tag = this.props.tag ? this.props.tag : 'tag';

    const count = this.props.count ? this.props.count : 0;

    const title = `${count} ${tag}`;

    const text =
      `you have ${count} ${this.props.tag} `;

    const buttonText = `manage ${this.props.tag}`;

    return (
      <div className="tile is-parent">
        <article className="tile is-child box">
          <p className="title">{count}</p>
          <p className="subtitle">{tag}</p>
          <button
            className="button is-link"
            onClick={this.onButtonClicked}>
            {buttonText}
          </button>
        </article>
      </div>
    );
  }
}
