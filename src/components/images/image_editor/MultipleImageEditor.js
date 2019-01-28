import React, {Component} from 'react';
import SingleImageView from './utils/SingleImageView';
import isArray from 'lodash/isArray';

import './image-editor.css';

/**
 * component to select images from local disk
 */
export default class MultipleImageEditor extends Component {
  /**
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      initImages: null,
      /**
       * original images are the images
       * that the parent component passed
       * through props to this component,
       * this are ment to be mutable by the
       * user (deleting)
       */
      originalImages: [],
      /**
       * uploaded images are the images
       * that the user uploads, these are
       * of type File
       */
      uploadedImages: [],
      idsToDelete: [],
    };
    this.removeImage = this.removeImage.bind(this);
    this.notifyChangeToParent = this.notifyChangeToParent.bind(this);
    this.handleImagesUpload = this.handleImagesUpload.bind(this);
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
    if (props.initImages !== state.initImages) {
      if (isArray(props.initImages)) {
        return {
          initImages: props.initImages,
          originalImages: [...props.initImages],
        };
      } else if (props.initImages) {
        return {
          initImages: props.initImages,
          originalImages: state.originalImages.concat([props.initImages]),
        };
      } else {
        return {
          initImages: props.initImages,
          originalImages: [],
        };
      }
    } else {
      return null;
    }
  }

  /**
   * remove the selected file
   * @param {File} fileToRemove
   */
  removeImage(fileToRemove) {
    console.log('file removed');
    if (fileToRemove.constructor === File) {
      const remainingImages = this.state.uploadedImages.filter((image) => {
        return fileToRemove !== image;
      });
      this.setState({
        uploadedImages: remainingImages,
      }, this.notifyChangeToParent);
    } else {
      const newIdToDelete = fileToRemove.id;
      const idsToDelete = this.state.idsToDelete;
      idsToDelete.push(newIdToDelete);

      const remainningOriginalImages
        = this.state.originalImages.filter((image) => {
          return image.id !== fileToRemove.id;
        });

      this.setState({
        idsToDelete: idsToDelete,
        originalImages: remainningOriginalImages,
      }, this.notifyChangeToParent);
    }
  }

  /**
   * this event is triggered once the user has selected
   * the images
   * @param {*} event
   * @return {boolean}
   */
  handleImagesUpload(event) {
    // concatente the just uploaded images with the existing ones
    const newImages = [...this.state.uploadedImages, ...this.$files.files];
    this.setState({
      uploadedImages: newImages,
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
      this.state.uploadedImages, this.state.idsToDelete
    );
  }

  /**
   * this hack is used to allow the user select the same file because
   * onChage is only called if the current uploaded file is different from
   * the last one.
   * @param {*} event
   */
  handleClick(event) {
    event.target.value = null;
  }

  /**
   *  @return {ReactNode}
   */
  render() {
    const images = this.state.originalImages
      .concat(this.state.uploadedImages)
      .map((file, index) => {
        const image = file;
        return (
          // Card to show each image
          <div className="column is-2" key={index}>
            <SingleImageView
              file={image}
              onImageRemoved={this.removeImage}>
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
              onChange={this.handleImagesUpload}
              onClick={this.handleClick}
              multiple
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
