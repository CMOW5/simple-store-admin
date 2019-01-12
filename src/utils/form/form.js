import isArray from 'lodash/isArray';

/**
 * this class provides the methods to create a new form object
 * to be sent with an http request an also provides a way
 * of extracting the errors for a given form field
 */
export default class Form {
  /**
   * Create a new Form instance.
   *
   * @param {object} data
   */
  constructor(data) {
    this.originalData = data;
    this.files = {};
    this.errors = new Errors();
    /**
     * @private {String} the formData method
     * (only to sent PUT and PATCH requests)
     */
    this.method_ = '';

    /* create the form attributes */
    Object.keys(data).forEach((key) => {
      this[key] = data[key];
    });
  }

  /**
   *
   * @param {*} filesKey
   * @param {*} files
   */
  appendFiles(filesKey, files) {
    if (!files) return;
    this.files[filesKey] = files;
  }

  /**
   * set the form's method to put
   */
  setPutMethod() {
    this.method_ = 'put';
  }

  /**
   * set the form's method to patch
   */
  setPatchMethod() {
    this.method_ = 'patch';
  }

  /**
   * @return {boolean}
   */
  hasFiles() {
    return Object.keys(this.files).length !== 0 &&
      this.files.constructor === Object;
  }

  /**
   * Fetch all relevant data for the form.
   * @return {Object} the form data
   * @deprecated
   */
  data() {
    let data = {};

    Object.keys(this.originalData).forEach((key) => {
      data[key] = this[key];
    });

    return data;
  }

  /**
   * return a formData object containing the relevant data
   * for the form
   * @return {FormData}
   */
  getFormData() {
    let formData = new FormData();

    Object.keys(this.originalData).forEach((key) => {
      if (typeof this[key] === 'object') {
        formData.set(key, JSON.stringify(this[key]));
      } else {
        formData.set(key, this[key]);
      }
    });

    /* append the files to the form data */
    if (this.hasFiles()) {
      Object.keys(this.files)
        .forEach((fileKey) => {
          if (!isArray(this.files[fileKey])) {
            formData.append(`${fileKey}`, this.files[fileKey]);
          } else {
            this.files[fileKey]
              .forEach((file, index) => {
                formData.append(`${fileKey}[${index}]`, file);
              });
          }
        });
    }

    /**
     * add the method attribute to the form data to sent a
     * put or a patch request via POST.
     */
    if (this.method_ !== '') {
      formData.set('_method', this.method_);
    }

    return formData;
  }


  /**
   * Reset the form fields.
   */
  reset() {
    Object.keys(this.originalData).forEach((key) => {
      this[key] = '';
    });
    this.method_ = '';
    this.files = {};
    this.clearErrors();
  }

  /**
   * save the errors from the request
   *
   * @param {Error} error
   */
  saveErrors(error) {
    this.errors.record(error.response.data.errors);
  }

  /**
   * Determine if an error exists for the given field.
   *
   * @param {string} errorName
   * @return {boolean}
   */
  hasError(errorName) {
    return this.errors.has(errorName);
  }

  /**
   * Retrieve the error message
   *
   * @param {string} errorName
   * @return {string} the error message
   */
  getErrorMessage(errorName) {
    return this.errors.get(errorName);
  }

  /**
   * Clear the errors
   *
   */
  clearErrors() {
    this.errors.clear();
  }

  /**
   * returns a string with the form data values
   *
   * @return {string}
   */
  toString() {
    let str = '';
    const formData = this.getFormData();
    for (let pair of formData.entries()) {
      str += JSON.stringify(pair[0]) + JSON.stringify(pair[1]) + '\n';
    }
    return str;
  }
}

/**
 * this class is used to store the form's errors
 */
class Errors {
  /**
   * Create a new Errors instance.
   */
  constructor() {
    this.errors = {};
  }

  /**
   * Determine if an errors exists for the given field.
   *
   * @param {string} field
   * @return {boolean}
   */
  has(field) {
    return this.errors.hasOwnProperty(field);
  }

  /**
   * Determine if we have any errors.
   * @return {boolean}
   */
  any() {
    return Object.keys(this.errors).length > 0;
  }

  /**
   * Retrieve the error message for a field.
   *
   * @param {string} field
   * @return {string} the error message
   */
  get(field) {
    if (this.errors[field]) {
      return this.errors[field][0];
    }
  }

  /**
   * Record the new errors.
   *
   * @param {object} errors
   */
  record(errors) {
    if (errors) {
      this.errors = errors;
    }
  }

  /**
   * Clear one or all error fields.
   *
   * @param {string|null} field
   */
  clear(field) {
    if (field) {
      delete this.errors[field];
      return;
    }
    this.errors = {};
  }
}
