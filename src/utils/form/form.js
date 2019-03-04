import isArray from 'lodash/isArray';
import isNull from 'lodash/isNull';
import isObject from 'lodash/isObject';
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

    /** @private */
    this._errors = new Errors();
    /**
     * @private {String} the formData method
     * (only to sent PUT and PATCH requests)
     */
    this._method = '';

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
    this._method = 'put';
  }

  /**
   * set the form's method to patch
   */
  setPatchMethod() {
    this._method = 'patch';
  }

  /**
   * @return {boolean}
   */
  hasFiles() {
    return Object.keys(this.files).length !== 0 &&
      this.files.constructor === Object;
  }

  /**
   * get all relevant data from the form as a json object.
   * @return {Object}
   */
  getDataAsJson() {
    let data = {};

    Object.keys(this.originalData).forEach((key) => {
      data[key] = this[key];
    });

    // TODO: append the files
    return data;
  }

  /**
   * return a formData object containing the relevant data
   * for the form
   * @return {FormData}
   */
  getDataAsFormData() {
    let formData = new FormData();

    Object.keys(this.originalData).forEach((key) => {
      if (isNull(this[key])) {
        // do not append the null data
      } else if (isArray(this[key])) {
        this[key].forEach((value) => {
          formData.append(key, value);
        });
      } else if (isObject(this[key])) {
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
    if (this._method !== '') {
      formData.set('_method', this._method);
    }

    return formData;
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
   * @deprecated
   */
  getFormData() {
    let formData = new FormData();

    Object.keys(this.originalData).forEach((key) => {
      if (isNull(this[key])) {
        // do nothing
        /* TODO: this is a hack
           here we dont set the key because the FormData class
           serializes null as "null" (String), with the abscence
           of the key we implicitly set it as null without
           creating conflicts in the backend
        */
      } else if (typeof this[key] === 'object') {
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
    if (this._method !== '') {
      formData.set('_method', this._method);
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
    this._method = '';
    this.files = {};
    this.clearErrors();
  }

  /**
   * save the errors from the request
   *
   * @param {Error} error
   */
  saveErrors(error) {
    this._errors.record(error.response.data.errors);
  }

  /**
   * Determine if an error exists for the given field.
   *
   * @param {string} errorName
   * @return {boolean}
   */
  hasError(errorName) {
    return this._errors.has(errorName);
  }

  /**
   * Retrieve the error message
   *
   * @param {string} errorName
   * @return {string} the error message
   */
  getErrorMessage(errorName) {
    return this._errors.get(errorName);
  }

  /**
   * Clear the errors
   *
   */
  clearErrors() {
    this._errors.clear();
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
    this.errors = [];
  }

  /**
   * Determine if an errors exists for the given field.
   *
   * @param {string} field
   * @return {boolean}
   */
  has(field) {
    const error = this.getError(field);
    return Boolean(error);
  }

  /**
   * Determine if we have any errors.
   * @return {boolean}
   */
  any() {
    return this.errors.length > 0;
  }

  /**
   * Retrieve the error message for a field.
   *
   * @param {string} field
   * @return {string} the error message
   */
  get(field) {
    const error = this.getError(field);
    return error ? error.defaultMessage : '';
  }

  /**
   * the error object for a field.
   *
   * @param {string} field
   * @return {object} the error message
   */
  getError(field) {
    return this.errors.find(function(error) {
      return error.field === field;
    });
  }

  /**
   * Record the new errors.
   *
   * @param {object} errors
   */
  record(errors) {
    if (isArray(errors)) {
      this.errors = errors;
    }
  }

  /**
   * Clear one or all errors.
   *
   * @param {string|null} field
   */
  clear() {
    this.errors = [];
  }
}
