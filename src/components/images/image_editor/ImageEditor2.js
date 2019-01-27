import React, {Component} from 'react';
import SingleImageView from './utils/SingleImageView';
import isArray from 'lodash/isArray';

import './image-editor.css';

/**
 * component to select images from local disk
 */
export default class ImageEditor extends Component {
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
    console.log('ge dreived state');
    if (props.initImages !== state.initImages) {
      console.log('props are different', props, state);
      if (isArray(props.initImages)) {
        console.log('1');
        return {
          initImages: props.initImages,
          originalImages: [...props.initImages],
        };
      } else if (props.initImages) {
        console.log('2');
        return {
          initImages: props.initImages,
          originalImages: state.originalImages.concat([props.initImages]),
        };
      } else {
        console.log('3');
        return {
          initImages: props.initImages,
          originalImages: [],
        };
      }
    } else {
      console.log('props are equal');
      return null;
    }
  }

  /**
   * init some component data
   */
  componentDidMount() {
    if (this.props.singleImage) {
      this.$files.setAttribute('multiple', '');
    }
  }

  /**
   * determines if the component should update after the
   * props have changed
   *
   * @param {*} prevProps
   * @param {*} prevState
   */
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.initImages !== this.props.initImages) {
      // this.appendImages(this.props.initImages);
    }
  }

  /**
   * load the images urls passed from the parent
   * in the images view
   * @param {array} images
   */
  /*
  appendImages(images) {
    if (!files) return;

    this.setState((prevState) => ({
      files: [...prevState.files, ...files],
    }));
  } */

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
   */
  handleImagesUpload() {
    let newImages;

    /* if (this.props.singleImage) {
      // choose only the selected file
      newImages = [...this.$uploadedImages.files];
    } else {
      // concatenate the current files with the files from the input.
      newImages = [...this.state.images, ...this.$uploadedImages.files];
    } */
    newImages = [...this.state.uploadedImages, ...this.$files.files];


    this.setState({
      uploadedImages: newImages,
    }, this.notifyChangeToParent);
  }

  /**
   * notify to the parent the changes in the selected images
   */
  notifyChangeToParent() {
    // filter the new images from the original images
    // passed from the parent component
    /* const newImages = this.state.images.filter((image) => {
      return image.constructor === File;
    }); */
    console.log('parent changed = ', this.state.uploadedImages, this.state.idsToDelete);
    // this.props.onImagesLoaded(newImages, this.state.idsToDelete);
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
