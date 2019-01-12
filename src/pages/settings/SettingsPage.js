import React, {Component} from 'react';

/* utils */
import Form from 'utils/form/form';
import Logger from 'utils/logger/logger';

/* router */
import {withRouter} from 'react-router-dom';
import RouterHandler from 'router/router-handler';

/* routes */
import SettingsRoutes from 'router/routes/settings-routes';
import BaseRoutes from 'router/routes/base-routes';

/* api request */
import SiteInfoRequest from 'services/api/site_info/site-info-request';

/* components */
import CreateHeader from 'pages/utils/list_headers/CreateHeader';
import ImageEditor from 'components/images/image_editor/ImageEditor';
import Loading from 'components/utils/loading/Loading';
import LoadingModal from 'components/modals/loading/LoadingModal';
import SimpleNotification
  from 'components/modals/simple_notification/SimpleNotification';

/**
 * this component render the settings page
 */
class SettingsPage extends Component {
  /**
   * initialize the state
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      name: '',
      description: '',
      schedule: '',
      address: '',
      latitude: '',
      longitude: '',
      facebook_link: '',
      twitter_link: '',
      instagram_link: '',
      youtube_link: '',
      logo: [],
      newLogo: null,
      logoIdToDelete: null,
      isFetching: true,
      showEditedModal: false,
      showEditingModal: false,
      form: new Form({}),
    };

    /* method bindings */
    this.renderSiteInfo = this.renderSiteInfo.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.renderError = this.renderError.bind(this);
    this.inputClass = this.inputClass.bind(this);
    this.textAreaClass = this.textAreaClass.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.saveLogo = this.saveLogo.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sendForm = this.sendForm.bind(this);
    this.showInfoEditedModal = this.showInfoEditedModal.bind(this);
    this.reloadSettingsPage = this.reloadSettingsPage.bind(this);
    this.onCancelButtonClicked = this.onCancelButtonClicked.bind(this);
  }

  /**
   * fetch the site data
   */
  async componentDidMount() {
    const siteInfo = await SiteInfoRequest.getInfo();
    this.setState({
      ...siteInfo,
      logo: siteInfo.logo ? [siteInfo.logo] : [],
      isFetching: false,
    });
  }

  /**
   * handle the changes in the form fields
   * @param {*} event
   */
  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  }

  /**
   * get the images loaded from the imagePicker component
   * @param {array} newImage
   * @param {array} imageIdToDelete
   */
  saveLogo(newImage, imageIdToDelete) {
    this.setState({
      newLogo: newImage.length > 0 ? newImage[0] : null,
      logoIdToDelete: imageIdToDelete.length > 0 ? imageIdToDelete[0] : null,
    });
  }

  /**
   * submit the form
   * @param {*} event
   */
  handleSubmit(event) {
    event.preventDefault();
    let form = new Form({
      name: this.state.name,
      description: this.state.description,
      schedule: this.state.schedule,
      address: this.state.address,
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      facebook_link: this.state.facebook_link,
      twitter_link: this.state.twitter_link,
      instagram_link: this.state.instagram_link,
      youtube_link: this.state.youtube_link,
      logoIdToDelete: this.state.logoIdToDelete,
    });
    form.appendFiles('logo', this.state.newLogo);
    form.setPutMethod();
    this.setState((prevState) => ({
      form: form,
      showEditingModal: true,
    }), this.sendForm);
  }

  /**
   * send the form to the api
   */
  sendForm() {
    const formData = this.state.form.getFormData();
    const id = this.state.id;

    SiteInfoRequest.updateInfo(id, formData)
      .then((info) => {
        Logger.log('info updated = ', info);
        this.showInfoEditedModal();
      })
      .catch((error) => {
        Logger.log('error = ', error);
        const form = this.state.form;
        form.saveErrors(error);
        this.setState({
          form: form,
          showEditingModal: false,
        });
      });
  }

  /**
   * shows the created product
   * @param {object} product the created product
   */
  showInfoEditedModal() {
    this.setState({
      showEditedModal: true,
      showEditingModal: false,
    });
  }

  /**
   * redirect the user to the see product page
   */
  reloadSettingsPage() {
    const route = SettingsRoutes.base();
    RouterHandler.goTo(this.props.history, route);
  }

  /**
   * shows the created product
   * @param {object} product the created product
   */
  closeInfoEditedModal() {
    this.setState({
      showEditedModal: false,
      showEditingModal: false,
    });
  }

  /**
   * cancel the form submission
   * @param {*} event
   */
  onCancelButtonClicked(event) {
    event.preventDefault();
    const route = BaseRoutes.base();
    RouterHandler.goTo(this.props.history, route);
  }

  /**
   * render the info form or a loading icon if its still
   * fetching the init data
   * @return {ReactNode}
   */
  renderSiteInfo() {
    if (this.state.isFetching) {
      return <Loading show="true" title="" />;
    } else {
      return this.renderForm();
    }
  }

  /**
   * render the info form
   *
   * @return {ReactNode}
   */
  renderForm() {
    return (
      <form onSubmit={this.handleSubmit}>

        <div className="field">
          <label className="label">Store Name</label>
          <div className="control">
            <input
              className={this.inputClass('name')}
              name="name"
              value={this.state.name || ''}
              type="text"
              placeholder="name"
              onChange={this.handleInputChange}
            />
          </div>

          {this.renderError('name')}

        </div>


        <div className="field">
          <label className="label">Store Description</label>
          <div className="control">
            <textarea
              name="description"
              value={this.state.description || ''}
              className={this.textAreaClass('description')}
              placeholder="Textarea"
              onChange={this.handleInputChange}
            >
            </textarea>
          </div>

          {this.renderError('description')}

        </div>

        <div className="field">
          <label className="label">Store Schedule</label>
          <div className="control">
            <textarea
              name="schedule"
              value={this.state.schedule || ''}
              className={this.textAreaClass('schedule')}
              placeholder="Textarea"
              onChange={this.handleInputChange}
            >
            </textarea>
          </div>

          {this.renderError('schedule')}

        </div>

        <div className="field">
          <label className="label">Store Address</label>
          <div className="control">
            <textarea
              name="address"
              value={this.state.address || ''}
              className={this.textAreaClass('address')}
              placeholder="Textarea"
              onChange={this.handleInputChange}
            >
            </textarea>
          </div>

          {this.renderError('address')}

        </div>

        <div className="field">
          <label className="label">Store Facebook Link</label>
          <div className="control">
            <textarea
              name="facebook_link"
              value={this.state.facebook_link || ''}
              className={this.textAreaClass('facebook_link')}
              placeholder="Textarea"
              onChange={this.handleInputChange}
            >
            </textarea>
          </div>

          {this.renderError('facebook_link')}

        </div>

        <div className="field">
          <label className="label">Store Twitter Link</label>
          <div className="control">
            <textarea
              name="twitter_link"
              value={this.state.twitter_link || ''}
              className={this.textAreaClass('twitter_link')}
              placeholder="Textarea"
              onChange={this.handleInputChange}
            >
            </textarea>
          </div>

          {this.renderError('twitter_link')}

        </div>

        <div className="field">
          <label className="label">Store Instagram Link</label>
          <div className="control">
            <textarea
              name="instagram_link"
              value={this.state.instagram_link || ''}
              className={this.textAreaClass('instagram_link')}
              placeholder="Textarea"
              onChange={this.handleInputChange}
            >
            </textarea>
          </div>

          {this.renderError('instagram_link')}

        </div>


        <div className="field">
          <label className="label">Store Youtube Link</label>
          <div className="control">
            <textarea
              name="youtube_link"
              value={this.state.youtube_link || ''}
              className={this.textAreaClass('youtube_link')}
              placeholder="Textarea"
              onChange={this.handleInputChange}
            >
            </textarea>
          </div>

          {this.renderError('youtube_link')}

        </div>

        <div
          className="field">
          <label className="label">Site Logo</label>
          <div className="control">
            <ImageEditor
              initImages={this.state.logo}
              onImagesLoaded={this.saveLogo}
              singleImage={true}
            />
          </div>
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button
              onClick={this.handleSubmit}
              className="button is-link">
                Submit
            </button>
          </div>
          <div className="control">
            <button
              onClick={this.onCancelButtonClicked}
              className="button is-text">
                Cancel
            </button>
          </div>
        </div>

      </form>
    );
  }

  /**
   * render a <p> tag with the given field error message
   * @param {string} field the error field
   * @return {ReactNode}
   */
  renderError(field) {
    if (this.state.form.hasError(field)) {
      const errorMessage = this.state.form.getErrorMessage(field);
      return (
        <p
          className="help is-danger">
          {errorMessage}
        </p>
      );
    } else {
      return null;
    }
  }

  /**
   * calculate the form input class
   * @param {string} field the field name
   * @return {string} the field className
   */
  inputClass(field) {
    if (this.state.form.hasError(field)) {
      return 'input is-danger';
    } else {
      return 'input';
    }
  }

  /**
   * calculate the form textarea class
   * @param {string} field the field name
   * @return {string} the field className
   */
  textAreaClass(field) {
    if (this.state.form.hasError(field)) {
      return 'textarea is-danger';
    } else {
      return 'textarea';
    }
  }

  /**
   * @return {ReactNode}
   */
  render() {
    return (
      <div>

        <CreateHeader title='Edit Site Data' icon='fa fa-cog fa-2x' />

        {this.renderSiteInfo()}

        <SimpleNotification
          show = {this.state.showEditedModal}
          message = "site edited!!"
          type = 'info'
          onConfirmationButtonClicked = {this.reloadSettingsPage}
          onCancelButtonClicked = {this.reloadSettingsPage}
        />

        <LoadingModal
          show = {this.state.showEditingModal}
          message = "editing the site data...please wait"
        />

      </div>
    );
  }
}

export default withRouter(SettingsPage);


