
/**
 *
 */
export default class Product {
  /**
   * @param {object} initialProductData
   */
  constructor(initialProductData = {}) {
    this.id = initialProductData.id || '';
    this.name = initialProductData.name || '';
    this.description = initialProductData.description || '';
    this.price = initialProductData.price || '';
    this.active = initialProductData.active || '';
    this.inSale = initialProductData.inSale || '';
    this.images = initialProductData.images || [];
    this.image = initialProductData.image || '';
  }
}
