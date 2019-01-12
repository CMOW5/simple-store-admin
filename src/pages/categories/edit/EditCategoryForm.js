import React, {Component} from 'react';

/* router */
import {withRouter} from 'react-router-dom';
import RouterHandler from 'router/router-handler';

/* api */
import categoriesRequest from 'services/api/categories/categories-request';
import categoriesRoutes from 'router/routes/categories-routes';

/* utils */
import Form from 'utils/form/form';
import Logger from 'utils/logger/logger';

/* components */
import EditHeader from 'pages/utils/list_headers/EditHeader';
import ImageEditor from 'components/images/image_editor/ImageEditor';
import SimpleNotification
  from 'components/modals/simple_notification/SimpleNotification';
import Loading from 'components/utils/loading/Loading';
import LoadingModal from 'components/modals/loading/LoadingModal';

/* styles */
import './edit-category-form.css';

/**
 * this component handles the category creation
 */
class EditCategoryForm extends Component {
  /**
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      name: '',
      parent_id: '',
      image: [],
      categories: [],
      imageIdToDelete: null,
      newImage: [],
      showEditedModal: false,
      showEditingModal: false,
      isFetching: true,
      form: new Form({
        name: '',
        parent_id: '',
      }),
    };
    this.fetchAllCategories = this.fetchAllCategories.bind(this);
    this.saveImage = this.saveImage.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sendForm = this.sendForm.bind(this);
    this.onCancelButtonClicked = this.onCancelButtonClicked.bind(this);
    this.showCategoryEditedModal = this.showCategoryEditedModal.bind(this);
    this.goToShowCategory = this.goToShowCategory.bind(this);
    this.goToCategoriesList = this.goToCategoriesList.bind(this);

    /* helpers to calculate the form styles */
    this.inputClass = this.inputClass.bind(this);
    this.textAreaClass = this.textAreaClass.bind(this);

    /* render methods */
    this.renderCategoriesOptions = this.renderCategoriesOptions.bind(this);
    this.renderError = this.renderError.bind(this);
    this.renderCategoryForm = this.renderCategoryForm.bind(this);
    this.renderCategoryInfo = this.renderCategoryInfo.bind(this);
  }

  /**
   * initialize the needed data for this component
   */
  componentDidMount() {
    Promise.all([
      this.fetchCategory(this.state.id),
      this.fetchAllCategories(),
    ])
      .then(([category, categories]) => {
        this.setState({
          categories: categories.filter((category) => {
            return category.id !== parseInt(this.state.id, 10);
          }),
          ...category,
          image: category.image ? [category.image] : [],
          isFetching: false,
        });
      });
  }

  /**
   * fetch the cateogory with the given id
   * @param {*} id
   * @return {Object}
   */
  async fetchCategory(id) {
    const category = await categoriesRequest.fetchCategory(id);
    return category;
  }

  /**
   * fetch the categories from the db
   * @return {Object}
   */
  async fetchAllCategories() {
    const {categories} = await categoriesRequest.fetchAllCategories();
    return categories;
  }

  /**
   * get the images loaded from the imagePicker component
   * @param {array} newImage
   * @param {array} imageIdToDelete
   */
  saveImage(newImage, imageIdToDelete) {
    this.setState({
      newImage: newImage.length > 0 ? newImage[0] : null,
      imageIdToDelete: imageIdToDelete.length > 0 ? imageIdToDelete[0] : null,
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
      imageIdToDelete: this.state.imageIdToDelete,
    });
    form.appendFiles('image', this.state.newImage);
    form.setPutMethod();
    this.setState({
      form: form,
      showEditingModal: true,
    }, this.sendForm);
  }

  /**
   * send the form to the api
   */
  sendForm() {
    const formData = this.state.form.getFormData();
    const id = this.state.id;

    categoriesRequest.updateCategory(id, formData)
      .then((category) => {
        Logger.log('category updated = ', category);
        this.showCategoryEditedModal();
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
   * shows the created category modal
   */
  showCategoryEditedModal() {
    this.setState({
      showEditedModal: true,
      showEditingModal: false,
    });
  }

  /**
   * redirect the user to the categories list
   * if the cancel button is clicked
   *
   * @param {object} event
   */
  onCancelButtonClicked(event) {
    event.preventDefault();
    this.goToCategoriesList();
  }

  /**
   * redirect the user to the see category page
   */
  goToShowCategory() {
    const route = categoriesRoutes.show(this.state.id);
    RouterHandler.goTo(this.props.history, route);
  }

  /**
   * redirect the user to the categories list page
   */
  goToCategoriesList() {
    const route = categoriesRoutes.base();
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
   * show the form with the product info
   * or a loading icon if the product is not fetched
   * yet
   *
   * @return {ReactNode}
   */
  renderCategoryInfo() {
    if (this.state.isFetching) {
      return <Loading show="true" title="category" />;
    } else {
      return this.renderCategoryForm();
    }
  }

  /**
   * @return {ReactNode} a form with the category data
   */
  renderCategoryForm() {
    return (
      <form onSubmit={this.handleSubmit}>

        <div className="field">
          <label className="label">Name</label>
          <div className="control">
            <input
              className={this.inputClass('name')}
              name="name"
              type="text"
              placeholder="name"
              value={this.state.name}
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
                name="parent_id"
                onChange={this.handleInputChange}
                value={this.state.parent_id || ''}
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
          <label className="label">Images</label>
          <div className="control">
            <ImageEditor
              initImages={this.state.image}
              onImagesLoaded={this.saveImage}
              singleImage={true}
            />
          </div>
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button
              className="button is-link"
              onClick={this.handleSubmit}
            >Submit
            </button>
          </div>
          <div className="control">
            <button
              className="button is-text"
              onClick={this.onCancelButtonClicked}
            >Cancel
            </button>
          </div>
        </div>

      </form>
    );
  }

  /**
   * @return {ReactNode}
   */
  render() {
    return (
      <div>

        {/* header */}
        <EditHeader
          title='Edit Category'
          icon='fa fa-shopping-bag fa-2x'
          onReturnButtonClicked = {this.goToCategoriesList}
        />

        {this.renderCategoryInfo()}

        <SimpleNotification
          show = {this.state.showEditedModal}
          message = "category edited!!"
          type = 'info'
          onConfirmationButtonClicked = {this.goToShowCategory}
          onCancelButtonClicked = {this.goToShowCategory}
        />

        <LoadingModal
          show = {this.state.showEditingModal}
          message = "editing the category...please wait"
        />

      </div>
    );
  }
}

export default withRouter(EditCategoryForm);
