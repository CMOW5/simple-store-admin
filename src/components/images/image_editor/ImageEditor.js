import React, {Component, Fragment} from 'react';

// styles
import './image-editor.css';

// components
import MultipleImageEditor from './MultipleImageEditor';
import SingleImageEditor from './SingleImageEditor';

/**
 * this component is used to select images from local disk
 */
export default class ImageEditor extends Component {
  /**
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.renderEditor = this.renderEditor.bind(this);
    this.handleImagesLoadedMultiple
      = this.handleImagesLoadedMultiple.bind(this);
    this.handleImagesLoadedSingle
      = this.handleImagesLoadedSingle.bind(this);
  }

  /**
   *
   * @param {*} uploadedImages
   * @param {*} idsToDelete
   */
  handleImagesLoadedMultiple(uploadedImages, idsToDelete) {
    this.props.onImagesLoaded(uploadedImages, idsToDelete);
  }

  /**
   * convert the SingleImageEditor event values
   * to arrays to make the event values consistent
   * with MultipleImageEditor
   * @param {object} uploadedImages
   * @param {number} idsToDelete
   */
  handleImagesLoadedSingle(uploadedImages, idsToDelete) {
    const uploadedImagesArray = uploadedImages ? [uploadedImages] : null;
    const idsToDeleteArray = idsToDelete ? [idsToDelete] : null;
    this.props.onImagesLoaded(uploadedImagesArray, idsToDeleteArray);
  }

  /**
   * @return {ReactNode}
   */
  renderEditor() {
    if (this.props.singleImage) {
      return (
        <SingleImageEditor
          initImage={this.props.initImages}
          onImagesLoaded={this.handleImagesLoadedSingle}
        />
      );
    } else {
      return (
        <MultipleImageEditor
          initImages={this.props.initImages}
          onImagesLoaded={this.handleImagesLoadedMultiple}
        />
      );
    }
  }

  /**
   *  @return {ReactNode}
   */
  render() {
    return (
      <Fragment>
        {this.renderEditor()}
      </Fragment>
    );
  }
}
