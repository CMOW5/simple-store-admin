import React, {Component} from 'react';

/* api */
import CategoriesRequest from 'services/api/categories/categories-request';

/* router */
import {withRouter} from 'react-router-dom';
import RouterHandler from 'router/router-handler';
import CategoriesRoutes from 'router/routes/categories-routes';

/* utils */
import Form from 'utils/form/form';
import Logger from 'utils/logger/logger';

/* components */
import CreateHeader from 'pages/utils/list_headers/CreateHeader';
import ImagePicker from 'components/images/image_picker/ImagePicker';
import SimpleNotification
  from 'components/modals/simple_notification/SimpleNotification';
import LoadingModal from 'components/modals/loading/LoadingModal';

/* styles */
import './create-category-form.css';

/**
 * this component handles the category creation
 */
class CreateCategoryForm extends Component {
  /**
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      parent_id: '',
      image: [],
      categories: [],
      createdCategoryId: null,
      showCreatingModal: false,
      form: new Form({
        name: '',
        parent_id: null,
      }),
      showCreatedModal: false,
    };
    this.fetchAllCategories = this.fetchAllCategories.bind(this);
    this.saveImage = this.saveImage.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onCancelButtonClicked = this.onCancelButtonClicked.bind(this);
    this.sendForm = this.sendForm.bind(this);
    this.showCategoryCreatedModal = this.showCategoryCreatedModal.bind(this);
    this.goToShowCategory = this.goToShowCategory.bind(this);

    /* helpers to calculate the form styles */
    this.inputClass = this.inputClass.bind(this);
    this.textAreaClass = this.textAreaClass.bind(this);

    /* render methods */
    this.renderCategoriesOptions = this.renderCategoriesOptions.bind(this);
    this.renderError = this.renderError.bind(this);
  }

  /**
   * initialize the needed data for this component
   */
  componentDidMount() {
    this.fetchAllCategories();
  }

  /**
   * fetch the categories from the db
   */
  async fetchAllCategories() {
    const {categories} = await CategoriesRequest.fetchAllCategories();
    this.setState({
      categories: categories,
    });
  }

  /**
   * get the images loaded from the imagePicker component
   * @param {*} newImage
   */
  saveImage(newImage) {
    this.setState({
      image: newImage.length > 0 ? newImage[0] : null,
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
   * submit the form
   * @param {*} event
   */
  handleSubmit(event) {
    event.preventDefault();
    let form = new Form({
      name: this.state.name,
      parent_id: this.state.parent_id,
    });
    form.appendFiles('image', this.state.image);
    this.setState((prevState) => ({
      form: form,
      showCreatingModal: true,
    }), this.sendForm);
  }

  /**
   * send the form to the api
   */
  sendForm() {
    const formData = this.state.form.getFormData();
    Logger.log(this.state.form.toString());
    CategoriesRequest.createCategory(formData)
      .then((category) => {
        Logger.log('category created = ', category);
        this.showCategoryCreatedModal(category.id);
      })
      .catch((error) => {
        Logger.log('error = ', error);
        const form = this.state.form;
        form.saveErrors(error);
        this.setState({
          form: form,
          showCreatingModal: false,
        });
      });
  }

  /**
   * shows the created category
   * @param {object} categoryId the created category' id
   */
  showCategoryCreatedModal(categoryId) {
    this.setState({
      showCreatedModal: true,
      showCreatingModal: false,
      createdCategoryId: categoryId,
    });
  }

  /**
   * redirect the user to the see category page
   */
  goToShowCategory() {
    const route = CategoriesRoutes.show(this.state.createdCategoryId);
    RouterHandler.goTo(this.props.history, route);
  }

  /**
   * redirect the user to the categories list
   * if the cancel button is clicked
   *
   * @param {object} event
   */
  onCancelButtonClicked(event) {
    event.preventDefault();
    const route = CategoriesRoutes.base();
    RouterHandler.goTo(this.props.history, route);
  }

  /**
   * render the options in th category dropdown
   * @return {ReactNode}
   */
  renderCategoriesOptions() {
    const categoriesOptions = this.state.categories.map((category) => {
      return (
        <option
          key={category.id} value={category.id}>
          {category.name}
        </option>
      );
    });
    return categoriesOptions;
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

        {/* header */}
        <CreateHeader title='Add Category' icon='fa fa-shopping-bag fa-2x' />

        <form onSubmit={this.handleSubmit}>

          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input
                className={this.inputClass('name')}
                name="name"
                type="text"
                placeholder="name"
                onChange={this.handleInputChange}
              />
            </div>

            {this.renderError('name')}

          </div>

          <div className="field">
            <label className="label">Category</label>
            <div className="control">
              <div className="select">
                <select
                  name="parent_id" onChange={this.handleInputChange}
                  value={this.state.parent_id}
                >
                  {/* default option */}
                  <option value=''>Main Menu</option>
                  {this.renderCategoriesOptions()}
                </select>
              </div>
            </div>

            {this.renderError('parent_id')}

          </div>

          <div
            className="field">
            <label className="label">Image</label>
            <div className="control">
              <ImagePicker singleImage={true} onImagesLoaded={this.saveImage}/>
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

        <SimpleNotification
          show = {this.state.showCreatedModal}
          message = "category created!!"
          type = 'info'
          onConfirmationButtonClicked = {this.goToShowCategory}
          onCancelButtonClicked = {this.goToShowCategory}
        />

        <LoadingModal
          show = {this.state.showCreatingModal}
          message = "creating the category...please wait"
        />

      </div>
    );
  }
}

export default withRouter(CreateCategoryForm);
