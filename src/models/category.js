
/**
 *
 */
export default class Category {
  /**
   *
   * @param {object} initialCategoryData
   */
  constructor(initialCategoryData) {
    this.id = initialCategoryData.id || '';
    this.name = initialCategoryData.name || '';
    this.parentCategory = initialCategoryData.parentCategory || '';
    this.products = initialCategoryData.products || [];
    this.subcategories = initialCategoryData.subcategories || [];
  }
}
