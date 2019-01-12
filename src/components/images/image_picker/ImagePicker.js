import React, {Component} from 'react';

import SingleImageView from './utils/SingleImageView';

import './image-picker.css';

/**
 * component to select images from local disk
 */
export default class ImagePicker extends Component {
  /**
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      files: [],
    };
    /* methods bindings */
    this.removeFile = this.removeFile.bind(this);
    this.handleFilesUpload = this.handleFilesUpload.bind(this);
    this.notifyChangeToParent = this.notifyChangeToParent.bind(this);
  }

  /**
   *
   */
  componentDidMount() {
    if (!this.props.singleImage) {
      this.$files.setAttribute('multiple', '');
    }
  }

  /**
   * remove the selected file
   * @param {File} file
   */
  removeFile(file) {
    const newFiles = this.state.files;
    const index = newFiles.indexOf(file);
    newFiles.splice(index, 1);
    this.setState((prevState) => ({
      files: newFiles,
    }), this.notifyChangeToParent);
  }

  /**
   * notify to the parent the changes in the selected images
   */
  notifyChangeToParent() {
    this.props.onImagesLoaded(this.state.files);
  }

  /**
   * this event is triggered once the user has selected
   * the images
   */
  handleFilesUpload() {
    // concatenate the current files with the files from the input.
    let newImages = [];
    if (this.props.single) {
      newImages[0] = this.$files.files[0];
    } else {
      newImages = [...this.state.files, ...this.$files.files];
    }

    this.setState((prevState) => ({
      files: newImages,
    }), this.notifyChangeToParent);
  }

  /**
   *  @return {ReactNode}
   */
  render() {
    // jsx
    const images = this.state.files.map((file, index) => {
      return (
        // Card to show each image
        <div className="column is-2" key={index}>
          <SingleImageView
            file={file}
            onImageRemoved={this.removeFile}>
          </SingleImageView>
        </div>
      );
    });

    return (
      <div className="image-picker">

        {/* Input element that is hidden for styles purposes */}
        <div className="file">
          <label className="file-label">
            <input
              className="file-input"
              type="file"
              name="resume"
              ref={(input) => {
                this.$files = input;
              }}
              accept="image/*"
              onChange={this.handleFilesUpload}
            />
            <span className="file-cta">
              <span className="file-icon">
                <i className="fa fa-upload"></i>
              </span>
              <span className="file-label">
                Choose a file…
              </span>
            </span>
          </label>
        </div>

        {/* Preview the images loaded */}
        <div className="columns is-multiline image-cards">
          {images}
        </div>

      </div>
    );
  }
}
