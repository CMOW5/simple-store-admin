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

    const buttonText = `view all ${this.props.tag}`;


    const sectionStyle = {
      'width': '100%',
      'height': '20rem',
      'backgroundImage':
        `linear-gradient(
          rgba(0, 0, 0, 0.5),
          rgba(0, 0, 0, 0.5)
        ),
        url(${backgroundImage})`,
      'color': 'rgb(228,225,225)',
    };

    return (
      <section style = {sectionStyle}>

        <div className="icon-container">
          <i className={icon}></i>
        </div>

        <div className="card-title">
          <p>{title}</p>
        </div>

        <div className="card-text">
          <p>{text}</p>
        </div>

        <footer>
          <a className="button is-link" onClick={this.onButtonClicked}>
            {buttonText}
          </a>
        </footer>

      </section>
    );
  }
}
