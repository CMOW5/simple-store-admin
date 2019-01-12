import React, {Component} from 'react';

/* styles */
import './single-image-view.css';

/**
 * component to select images from local disk
 */
export default class SingleImageView extends Component {
  /**
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      imageSource: '',
    };
    this.removeFile = this.removeFile.bind(this);
    this.loadImage = this.loadImage.bind(this);
  }

  /**
   * load the file in the <img> tag
   */
  componentDidMount() {
    this.loadImage();
  }

  /**
   * @param {Object} prevProps
   */
  componentDidUpdate(prevProps) {
    if (prevProps.file !== this.props.file) {
      this.loadImage();
    }
  }

  /**
   * load the image in the <img> tag
   */
  loadImage() {
    if (!this.isFile(this.props.file)) {
      this.setState({
        imageSource: this.props.file,
      });
    } else if (this.isImageSupported(this.props.file.name)) {
      this.getImageSource(this.props.file)
        .then((source) => {
          this.setState({
            imageSource: source,
          });
        });
    }
  }

  /**
   * get image src from the file object
   *
   * @param {File} file file associated with the image
   * @return {Promise} the promise with the string source
   */
  async getImageSource(file) {
    try {
      const imageSource = await this.readUploadedFileAsDataUrl(file);
      return imageSource;
    } catch (e) {
      console.warn('error reading file = ', e.message);
    }
  }

  /**
   * read the url from the file
   *
   * @param {File} inputFile
   * @return {string} the image source url
   */
  readUploadedFileAsDataUrl(inputFile) {
    const fileReader = new FileReader();

    return new Promise((resolve, reject) => {
      /* register the onLoad callback */
      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      /* register the onError callback */
      fileReader.onerror = () => {
        fileReader.abort();
        reject(new DOMException('Problem parsing input file.'));
      };

      fileReader.readAsDataURL(inputFile);
    });
  }

  /**
   * @param {Object|string} file
   * @return {boolean}
   */
  isFile = (file) => {
    return file.constructor === File;
  }

  /**
   * check if the image has a valid extension
   *
   * @param {string} imageName
   * @return {boolean}
   */
  isImageSupported(imageName) {
    return /\.(jpe?g|png|gif)$/i.test(imageName);
  }

  /**
   * notify the parent to remove the selected file
   */
  removeFile() {
    this.props.onImageRemoved(this.props.file);
  }

  /**
   *  @return {ReactNode}
   */
  render() {
    // jsx
    return (
      <div className="image-view-container">
        <img className="background-image" src={this.state.imageSource} alt="product"/>
        <a className="tag is-delete is-danger" onClick={this.removeFile}> </a>
      </div>

    );
  }
}
