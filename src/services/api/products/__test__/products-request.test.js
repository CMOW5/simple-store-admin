import ProductsRequest from '../products-request';
import CategoriesRequest from 'services/api/categories/categories-request';

import Form from 'utils/form/form';

const faker = require('faker');

test('it gets the products', async () => {
  expect.assertions(1);

  return ProductsRequest.getProducts()
    .then(({products}) => {
      expect(products).toBeInstanceOf(Array);
    });
});

test('it gets a single product', async () => {
  expect.assertions(1);

  const {products} = await ProductsRequest.getProducts();

  return ProductsRequest.getProduct(products[0].id)
    .then((product) => {
      expect(product).toEqual(products[0]);
    });
});

test('it gets the products count', async () => {
  expect.assertions(1);
  return ProductsRequest.count()
    .then((count) => {
      expect(typeof count).toBe('number');
    });
});

// TODO: add images to the form data
test('it creates a product', async () => {
  expect.assertions(1);

  const category = await getRandomCategory();

  const form = new Form({
    name: faker.commerce.productName(),
    description: faker.lorem.sentence(),
    price: Number(faker.commerce.price()),
    price_sale: Number(faker.commerce.price()),
    in_sale: faker.random.boolean(),
    active: faker.random.boolean(),
    category_id: category.id,
    weight: faker.random.number(),
    units: faker.random.number(),
  });

  return ProductsRequest.createProduct(form.getFormData())
    .then((product) => {
      expect(product).toMatchObject(form.data());
    });
});

test('it updates a product', async () => {
  expect.assertions(1);

  const product = await getRandomProduct();
  const newParentCategory = await getRandomCategory();

  const form = new Form({
    name: faker.name.findName(),
    description: faker.lorem.sentence(),
    price: Number(faker.commerce.price()),
    price_sale: Number(faker.commerce.price()),
    in_sale: Number(faker.random.boolean()),
    active: Number(faker.random.boolean()),
    category_id: newParentCategory.id,
    weight: faker.random.number(),
    units: faker.random.number(),
  });
  form.setPutMethod();

  return ProductsRequest.updateProduct(product.id, form.getFormData())
    .then((updatedProduct) => {
      expect(updatedProduct).toMatchObject(form.data());
    });
});

test('it deletes a product', async () => {
  expect.assertions(1);

  const product = await getRandomProduct();

  return ProductsRequest.deleteProduct(product.id)
    .then((response) => {
      expect(response).toMatchObject({
        message: 'product deleted',
      });
    });
});


/**
 * get a random product from the api
 * @return {number}
 */
async function getRandomProduct() {
  const {products} = await ProductsRequest.getProducts();
  return products[getRandomInt(products.length)];
}

/**
 * get a random category from the api
 * @return {number}
 */
async function getRandomCategory() {
  const {categories} = await CategoriesRequest.fetchAllCategories();
  return categories[getRandomInt(categories.length)];
}

/**
 * get a random number between 0 and max (not incluided)
 * @param {number} max
 * @return {number}
 */
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

let localStorageMock = (function() {
  let store = {};
  return {
    getItem: function(key) {
      return store[key];
    },
    setItem: function(key, value) {
      store[key] = value.toString();
    },
    clear: function() {
      store = {};
    },
    removeItem: function(key) {
      delete store[key];
    },
  };
})();
Object.defineProperty(window, 'localStorage', {value: localStorageMock});
