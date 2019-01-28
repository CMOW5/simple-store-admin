
/**
 * this model defines an interface to handle image data
 */
export default class Image {
  /**
   * initialize the Image props
   * @param {*} intialData
   */
  constructor(intialData = {}) {
    if (intialData === null) {
      intialData = {};
    }
    this.id = intialData.id || null;
    this.name = intialData.name || '';
    this.url = intialData.url || '';
  }
}
