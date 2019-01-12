import React, {Component} from 'react';

/* router */
import {withRouter} from 'react-router-dom';
import RouterHandler from 'router/router-handler';

/* api */
import CategoriesRequest from 'services/api/categories/categories-request';
import ProductsRequest from 'services/api/products/products-request';
import ProductsRoutes from 'router/routes/products-routes';

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
import './edit-product-form.css';

/**
 * this component handles the product creation
 */
class EditProductForm extends Component {
  /**
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      name: '',
      description: '',
      price: '',
      price_sale: '',
      in_sale: false,
      active: false,
      category_id: '',
      weight: 0,
      units: 0,

      images: [],
      // TODO: refactor idsToDelete
      idsToDelete: [],
      newImages: [],
      showEditedModal: false,
      showEditingModal: false,
      isFetching: true,

      categories: [],
      form: new Form({
        name: '',
        description: '',
        price: '',
        price_sale: '',
        in_sale: false,
        active: false,
        category_id: '',
        weight: 0,
        units: 1,
      }),
    };
    this.fetchAllCategories = this.fetchAllCategories.bind(this);
    this.saveImages = this.saveImages.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sendForm = this.sendForm.bind(this);
    this.showProductEditedModal = this.showProductEditedModal.bind(this);
    this.goToShowProduct = this.goToShowProduct.bind(this);
    this.goToProductsList = this.goToProductsList.bind(this);
    this.onCancelButtonClicked = this.onCancelButtonClicked.bind(this);

    /* helpers to calculate the form styles */
    this.inputClass = this.inputClass.bind(this);
    this.textAreaClass = this.textAreaClass.bind(this);

    /* render methods */
    this.renderProductInfo = this.renderProductInfo.bind(this);
    this.renderCategoriesOptions = this.renderCategoriesOptions.bind(this);
    this.renderError = this.renderError.bind(this);
  }

  /**
   * initialize the needed data for this component
   */
  componentDidMount() {
    Promise.all([
      this.getProduct(this.state.id),
      this.fetchAllCategories(),
    ])
      .then(([product, categoriesResponse]) => {
        this.setState({
          categories: categoriesResponse.categories,
          ...product,
          isFetching: false,
        });
      })
      .catch((err) => {

      });
  }

  /**
   * fetch the product with the given id
   * @param {*} id
   * @return {Object}
   */
  async getProduct(id) {
    const product = await ProductsRequest.getProduct(id);
    return product;
  }

  /**
   * fetch the categories from the db
   * @return {Object}
   */
  async fetchAllCategories() {
    const categories = await CategoriesRequest.fetchAllCategories();
    return categories;
  }

  /**
   * get the images loaded from the imagePicker component
   * @param {*} newImages
   * @param {*} idsToDelete
   */
  saveImages(newImages, idsToDelete) {
    this.setState({
      newImages: newImages,
      idsToDelete: idsToDelete,
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
      idsToDelete: this.state.idsToDelete,
      newArray: [1, 2, 3],
    });
    form.appendFiles('images', this.state.newImages);
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
    // Logger.log('form = ', this.state.form);
    const formData = this.state.form.getFormData();
    const id = this.state.id;

    ProductsRequest.updateProduct(id, formData)
      .then((product) => {
        Logger.log('product updated = ', product);
        this.showProductEditedModal();
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
  showProductEditedModal() {
    this.setState({
      showEditedModal: true,
      showEditingModal: false,
    });
  }

  /**
   * redirect the user to the see product page
   */
  goToShowProduct() {
    const route = ProductsRoutes.show(this.state.id);
    RouterHandler.goTo(this.props.history, route);
  }

  /**
   * redirect the user to the product list page
   * @param {number} id product id
   */
  goToProductsList() {
    const route = ProductsRoutes.base();
    RouterHandler.goTo(this.props.history, route);
  }

  /**
   * redirect the user to the product list if the cancel button is
   * clicked
   * @param {*} event
   */
  onCancelButtonClicked(event) {
    event.preventDefault();
    this.goToProductsList();
  }

  /**
   * show the form with the product info
   * or a loading icon if the product is not fetched
   * yet
   *
   * @return {ReactNode}
   * TODO: refactor this code
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
                value={this.state.name}
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
                value={this.state.description || ''}
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
                value={this.state.price}
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
                value={this.state.price_sale || ''}
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
                value={this.state.weight || ''}
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
                value={this.state.units || ''}
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
              <ImageEditor
                initImages={this.state.images}
                onImagesLoaded={this.saveImages}
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
        <EditHeader
          title='Edit Product'
          icon='fa fa-shopping-bag fa-2x'
          onReturnButtonClicked = {this.goToProductsList}
        />

        {this.renderProductInfo()}

        <SimpleNotification
          show = {this.state.showEditedModal}
          message = "product edited!!"
          type = 'info'
          onConfirmationButtonClicked = {this.goToShowProduct}
          onCancelButtonClicked = {this.goToShowProduct}
        />

        <LoadingModal
          show = {this.state.showEditingModal}
          message = "editing the product...please wait"
        />

      </div>
    );
  }
}

export default withRouter(EditProductForm);
