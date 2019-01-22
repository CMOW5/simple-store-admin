
/**
 *
 */
export default class Category {
  /**
   *
   * @param {object} initialCategoryData
   */
  constructor(initialCategoryData = {}) {
    this.id = initialCategoryData.id || '';
    this.name = initialCategoryData.name || '';
    /*
      TODO: this {id: null} 'hack' was created to avoid
      errors when the parentCategory = null, so null.id
      throws a TypeError
    */
    this.parentCategory = initialCategoryData.parentCategory || {id: null};
    this.products = initialCategoryData.products || [];
    this.subcategories = initialCategoryData.subcategories || [];
    this.image = initialCategoryData.image || '';
  }
}
