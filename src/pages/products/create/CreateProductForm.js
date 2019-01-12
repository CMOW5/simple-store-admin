import React, {Component} from 'react';

/* api */
import CategoriesRequest from 'services/api/categories/categories-request';
import ProductsRequest from 'services/api/products/products-request';

/* router */
import {withRouter} from 'react-router-dom';
import RouterHandler from 'router/router-handler';
import ProductsRoutes from 'router/routes/products-routes';

/* utils */
import Form from 'utils/form/form';
import Logger from 'utils/logger/logger';

/* components */
import CreateHeader from 'pages/utils/list_headers/CreateHeader';
import ImagePicker from 'components/images/image_picker/ImagePicker';
import SimpleNotification
  from 'components/modals/simple_notification/SimpleNotification';
import Loading from 'components/utils/loading/Loading';
import LoadingModal from 'components/modals/loading/LoadingModal';

/* styles */
import './create-product-form.css';

/**
 * this component handles the product creation
 */
class CreateProductForm extends Component {
  /**
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      price: '',
      price_sale: '',
      in_sale: false,
      active: true,
      category_id: '',
      weight: 0,
      units: 1,
      images: [],
      categories: [],
      isFetching: true,
      showCreatingModal: false,
      form: new Form({
        name: '',
        description: '',
        price: '',
        price_sale: '',
        in_sale: false,
        active: true,
        category_id: '',
        weight: 0,
        units: 1,
      }),
      showCreatedModal: false,
    };
    this.fetchAllCategories = this.fetchAllCategories.bind(this);
    this.saveImages = this.saveImages.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onCancelButtonClicked = this.onCancelButtonClicked.bind(this);
    this.sendForm = this.sendForm.bind(this);
    this.showProductCreatedModal = this.showProductCreatedModal.bind(this);
    this.goToShowProduct = this.goToShowProduct.bind(this);

    /* helpers to calculate the form styles */
    this.inputClass = this.inputClass.bind(this);
    this.textAreaClass = this.textAreaClass.bind(this);

    /* render methods */
    this.renderCategoriesOptions = this.renderCategoriesOptions.bind(this);
    this.renderProductInfo = this.renderProductInfo.bind(this);
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
      isFetching: false,
    });
  }

  /**
   * get the images loaded from the imagePicker component
   * @param {*} images
   */
  saveImages(images) {
    this.setState({
      images: images,
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
      description: this.state.description,
      price: this.state.price,
      price_sale: this.state.price_sale,
      in_sale: this.state.in_sale,
      active: this.state.active,
      category_id: this.state.category_id,
      weight: this.state.weight,
      units: this.state.units,
    });
    form.appendFiles('images', this.state.images);
    this.setState({
      form: form,
      showCreatingModal: true,
    }, this.sendForm);
  }

  /**
   * send the form to the api
   */
  sendForm() {
    // Logger.log('form = ', this.state.form);
    const formData = this.state.form.getFormData();
    Logger.log('form data = ', this.state.form.toString());
    ProductsRequest.createProduct(formData)
      .then((product) => {
        Logger.log('product created = ', product);
        this.showProductCreatedModal(product);
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
   * shows the created product
   * @param {object} product the created product
   */
  showProductCreatedModal(product) {
    this.setState({
      showCreatedModal: true,
      showCreatingModal: false,
      createdProduct: product,
    });
  }

  /**
   * redirect the user to the see product page
   */
  goToShowProduct() {
    const route = ProductsRoutes.show(this.state.createdProduct.id);
    RouterHandler.goTo(this.props.history, route);
  }

  /**
   * redirect the user to the product list
   * if the cancel button is clicked
   *
   * @param {object} event
   */
  onCancelButtonClicked(event) {
    event.preventDefault();
    const route = ProductsRoutes.base();
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
   * render the product form if the needed data to create
   * the product is already fetched
   *
   * @return {ReactNode}
   */
  renderProductInfo() {
    if (this.state.isFetching) {
      return <Loading show="true" title="product" />;
    } else {
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
                onChange={this.handleInputChange}
              />
            </div>

            {this.renderError('name')}

          </div>


          <div className="field">
            <label className="label">Description</label>
            <div className="control">
              <textarea
                name="description"
                className={this.textAreaClass('description')}
                placeholder="Textarea"
                onChange={this.handleInputChange}
              >
              </textarea>
            </div>

            {this.renderError('description')}

          </div>

          <div className="field">
            <label className="label">Price</label>
            <div className="control">
              <input
                className={this.inputClass('price')}
                name="price"
                type="text"
                placeholder="Text input"
                onChange={this.handleInputChange}
              />
            </div>

            {this.renderError('price')}

          </div>

          <div className="field">
            <label className="label">Price Sale</label>
            <div className="control">
              <input
                className={this.inputClass('price_sale')}
                name="price_sale"
                type="text"
                placeholder="Text input"
                onChange={this.handleInputChange}
              />
            </div>

            {this.renderError('price_sale')}

          </div>

          <div className="field">
            <label className="checkbox">
              <input
                type="checkbox"
                name="in_sale"
                checked={this.state.in_sale}
                onChange={this.handleInputChange}
              />
              &nbsp;&nbsp; In Sale?
            </label>
          </div>

          <div className="field">
            <label className="label">Category</label>
            <div className="control">
              <div className="select">
                <select
                  name="category_id" onChange={this.handleInputChange}
                  value={this.state.category_id}
                >
                  {/* default option */}
                  <option disabled value=''> -- select an option -- </option>
                  {this.renderCategoriesOptions()}
                </select>
              </div>
            </div>

            {this.renderError('category_id')}

          </div>

          <div className="field">
            <label className="label">Weight</label>
            <div className="control">
              <input
                className={this.inputClass('weight')}
                name="weight"
                type="text"
                placeholder="Text input"
                onChange={this.handleInputChange}
              />
            </div>

            {this.renderError('weight')}

          </div>

          <div className="field">
            <label className="label">Units</label>
            <div className="control">
              <input
                className={this.inputClass('units')}
                name="units"
                type="text"
                placeholder="Text input"
                onChange={this.handleInputChange}
              />
            </div>

            {this.renderError('units')}

          </div>

          <div className="field">
            <label className="checkbox">
              <input
                type="checkbox"
                name="active"
                checked={this.state.active}
                onChange={this.handleInputChange}
              />
              &nbsp;&nbsp; Active ?
            </label>
          </div>

          <div
            className="field">
            <label className="label">Images</label>
            <div className="control">
              <ImagePicker onImagesLoaded={this.saveImages}/>
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
  }

  /**
   * @return {ReactNode}
   */
  render() {
    return (
      <div>

        {/* header */}
        <CreateHeader title='Add Product' icon='fa fa-shopping-bag fa-2x' />

        {/* form */}
        {this.renderProductInfo()}

        <SimpleNotification
          show = {this.state.showCreatedModal}
          message = "product created!!"
          type = 'info'
          onConfirmationButtonClicked = {this.goToShowProduct}
          onCancelButtonClicked = {this.goToShowProduct}
        />

        <LoadingModal
          show = {this.state.showCreatingModal}
          message = "creating the product...please wait"
        />

      </div>
    );
  }
}

export default withRouter(CreateProductForm);
