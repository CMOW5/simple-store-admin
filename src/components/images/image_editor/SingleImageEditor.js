import React, {Component} from 'react';
import SingleImageView from './utils/SingleImageView';
import isObject from 'lodash/isObject';
import isNull from 'lodash/isNull';

import './image-editor.css';

/**
 * component to select a single image from local disk
 */
export default class SingleImageEditor extends Component {
  /**
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    // TODO: improve the init image pattern
    this.state = {
      initImage: {},
      /**
       * original images are the images
       * that the parent component passed
       * through props to this component,
       * this are ment to be mutable by the
       * user (deleting)
       */
      originalImage: {},
      /**
       * uploaded images are the images
       * that the user uploads, these are
       * of type File
       */
      uploadedImage: null,
      idToDelete: null,
    };
    this.removeImage = this.removeImage.bind(this);
    this.notifyChangeToParent = this.notifyChangeToParent.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.renderImage = this.renderImage.bind(this);
  }

  /**
   * is invoked right before calling the render method, both on the initial
   * mount and on subsequent updates
   * It should return an object to update the state, or null to update nothing.
   * @param {*} props
   * @param {*} state
   * @return {object}
   */
  static getDerivedStateFromProps(props, state) {
    if (props.initImage !== state.initImage && isObject(props.initImage)) {
      return {
        initImage: props.initImage,
        originalImage: props.initImage,
      };
    } else {
      return null;
    }
  }

  /**
   * remove the selected file
   * @param {File} fileToRemove
   */
  removeImage(fileToRemove) {
    if (fileToRemove.constructor === File) {
      this.setState({
        uploadedImage: null,
      }, this.notifyChangeToParent);
    } else {
      const idToDelete = fileToRemove.id;
      this.setState({
        idToDelete: idToDelete,
        originalImage: {},
      }, this.notifyChangeToParent);
    }
  }

  /**
   * this event is triggered once the user has selected
   * the images
   * @param {*} event
   * @return {boolean}
   */
  handleImageUpload(event) {
    const newImage = this.$files.files[0];
    const idToDelete = this.state.initImage.id;
    this.setState({
      uploadedImage: newImage,
      idToDelete: idToDelete,
      originalImage: {},
    }, this.notifyChangeToParent);
    /**
     * this hack is used to allow the user select the same file because
     * onChage is only called if the current uploaded file is different from
     * the last one.
     */
    event.target.value = null; // chrome
    return false; // firefox
  }

  /**
   * notify to the parent the changes in the selected images
   */
  notifyChangeToParent() {
    this.props.onImagesLoaded(
      this.state.uploadedImage, this.state.idToDelete
    );
  }

  /**
   * @return {ReactNode}
   */
  renderImage() {
    const uploadedImage = this.state.uploadedImage;
    const fileType
      = !isNull(uploadedImage) && uploadedImage.constructor === File ?
        uploadedImage : this.state.originalImage;

    return (
      <div className="column is-2">
        <SingleImageView
          file={fileType}
          onImageRemoved={this.removeImage}>
        </SingleImageView>
      </div>
    );
  }

  /**
   *  @return {ReactNode}
   */
  render() {
    const image = this.renderImage();

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
              onChange={this.handleImageUpload}
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

        {/* TODO: improve this to only show 1 image */}
        {/* Preview the image loaded */}
        <div className="columns is-multiline image-cards">
          {image}
        </div>

      </div>
    );
  }
}
