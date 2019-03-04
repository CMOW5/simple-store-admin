import React, {Component} from 'react';

/* router */
import {withRouter} from 'react-router-dom';
import RouterHandler from 'router/router-handler';

/* api */
import categoriesRequest from 'services/api/categories/categories-request';
import categoriesRoutes from 'router/routes/categories-routes';

/* models */
import Category from 'models/category';

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
      category: new Category(),
      categories: [],

      imageIdToDelete: null,
      newImage: null,

      showEditedModal: false,
      showEditingModal: false,
      showLoadingIcon: true,

      /*
        this form instance is used to send the data to the api
        with the given structure
      */
      form: new Form({
        name: '',
        parentCategory: null,
      }),
    };

    // TODO: replace the bindings with the new () => arrow function
    // method bindings

    /* UI events */
    this.onCancelButtonClicked = this.onCancelButtonClicked.bind(this);
    this.goToShowCategory = this.goToShowCategory.bind(this);
    this.goToCategoriesList = this.goToCategoriesList.bind(this);
    this.saveImage = this.saveImage.bind(this);

    /* UI form handlers */
    this.handleParentCategoryChange
      = this.handleParentCategoryChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sendForm = this.sendForm.bind(this);

    /* helpers to calculate the form styles */
    this.inputClass = this.inputClass.bind(this);
    this.textAreaClass = this.textAreaClass.bind(this);

    /* render methods */
    this.renderCategoriesOptions = this.renderCategoriesOptions.bind(this);
    this.renderError = this.renderError.bind(this);
    this.renderCategoryForm = this.renderCategoryForm.bind(this);
    this.renderCategoryInfo = this.renderCategoryInfo.bind(this);

    /* update state helpers */
    this.saveFormToState = this.saveFormToState.bind(this);
    this.showEditedModal = this.showEditedModal.bind(this);
    this.closeEditedModal = this.closeEditedModal.bind(this);
    this.showEditingModal = this.showEditingModal.bind(this);
    this.closeEditingModal = this.closeEditingModal.bind(this);

    /* helpers */
    this.isTheCurrentEditedCategory
      = this.isTheCurrentEditedCategory.bind(this);
    this.filterCategories = this.filterCategories.bind(this);
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
          categories: this.filterCategories(categories),
          category: category,

          // image: category.image ? [category.image] : [],
          showLoadingIcon: false,
        });
      });
  }

  /**
   * remove the current category from the list of categories
   * @param {array} categories
   * @return {array} array of filtered categories
   */
  filterCategories(categories) {
    return categories.filter((category) => {
      return !this.isTheCurrentEditedCategory(category);
    });
  }

  /**
   * validate if the given category id is equal
   * to the current category id being edited
   *
   * @param {*} category
   * @return {boolean}
   */
  isTheCurrentEditedCategory(category) {
    if (!category) {
      return false;
    }
    return category.id == this.state.id;
  }

  /**
   * fetch the cateogory with the given id
   * @param {*} id
   * @return {Category}
   */
  async fetchCategory(id) {
    const category = await categoriesRequest.fetchCategory(id);
    return category;
  }

  /**
   * fetch the categories from the db
   * @return {array} an array containing the categories
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
      newImage: newImage ? newImage[0] : null,
      imageIdToDelete: imageIdToDelete ? imageIdToDelete[0] : null,
    });
  }

  /**
   * handle the changes in the name form field
   * @param {*} event
   */
  handleNameChange(event) {
    const newName = event.target.value;
    let category = this.state.category;
    category.name = newName;
    this.setState({
      category: category,
    });
  }

  /**
   * handle the changes in the parent category form field
   * @param {*} event
   */
  handleParentCategoryChange(event) {
    let newParentCategory = event.target.value;
    let category = this.state.category;
    category.parentCategory.id = newParentCategory;
    this.setState({
      category: category,
    });
  }

  /**
   * prepare the data that is going to be sent to the api
   * @param {*} event
   */
  handleSubmit(event) {
    event.preventDefault();
    let form = new Form({
      name: this.state.category.name,
      parentCategory: this.state.category.parentCategory.id,
      imageIdToDelete: this.state.imageIdToDelete,
    });
    form.appendFiles('newImage', this.state.newImage);
    this.showEditingModal();
    this.setState({
      form: form,
    }, this.sendForm);
  }

  /**
   * send the form to the api
   */
  sendForm() {
    const formData = this.state.form.getDataAsFormData();
    const id = this.state.id;
    categoriesRequest.updateCategory(id, formData)
      .then((category) => {
        Logger.log('category updated = ', category);
        this.closeEditingModal();
        this.showEditedModal();
      })
      .catch((error) => {
        Logger.log('error = ', error);
        const form = this.state.form;
        form.saveErrors(error);
        this.saveFormToState(form);
        this.closeEditingModal();
      });
  }

  /**
   * update the form's state
   * @param {Form} form
   */
  saveFormToState(form) {
    this.setState({
      form: form,
    });
  }

  /**
   * updates the state to show a editing modal
   */
  showEditingModal() {
    this.setState({
      showEditingModal: true,
    });
  }

  /**
   * updates the state to close the editing modal
   */
  closeEditingModal() {
    this.setState({
      showEditingModal: false,
    });
  }

  /**
   * updates the state to show a modal
   * with a message that the category was successfully updated
   */
  showEditedModal() {
    this.setState({
      showEditedModal: true,
    });
  }

  /**
   * updates the state to close the modal
   * with a message that the category was successfully updated
   */
  closeEditedModal() {
    this.setState({
      showEditedModal: false,
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
   * render the options in the category dropdown
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
    if (this.state.showLoadingIcon) {
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
              value={this.state.category.name}
              onChange={this.handleNameChange}
            />
          </div>

          {this.renderError('name')}

        </div>

        <div className="field">
          <label className="label">Category</label>
          <div className="control">
            <div className="select">
              <select
                name="parentCategory"
                onChange={this.handleParentCategoryChange}
                value={this.state.category.parentCategory.id || ''}
              >
                {/* default option */}
                <option value=''>Main Menu</option>
                {this.renderCategoriesOptions()}
              </select>
            </div>
          </div>

          {this.renderError('parentCategory')}

        </div>

        <div
          className="field">
          <label className="label">Images</label>
          <div className="control">
            <ImageEditor
              initImages={this.state.category.image}
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

        {/* modals */}
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


/* axios({
  method: 'put',
  url: 'http://localhost:8000/api/admin/categories/348',

  headers: {
    'Accept': 'application/json',
    'Content-type': 'application/json',
    // "Authorization": "Bearer " + sessionStorage.getItem('jwt')
  },

  // responseType:'stream'
  data: {
    name: 'some name',
    parentCategory: 345,
  },
})
  .then(function(response) {
    console.log(response);
  })
  .catch(function(error) {
    console.log(error);
  }); */
