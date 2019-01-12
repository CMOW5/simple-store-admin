import CategoriesRequest from 'services/api/categories/categories-request';
import Form from 'utils/form/form';

const faker = require('faker');

test('it gets the categories', async () => {
  expect.assertions(1);

  return CategoriesRequest.fetchAllCategories()
    .then(({categories}) => {
      expect(categories).toBeInstanceOf(Array);
    });
});

test('it gets a single category', async () => {
  expect.assertions(1);

  const {categories} = await CategoriesRequest.fetchAllCategories();

  return CategoriesRequest.fetchCategory(categories[0].id)
    .then((category) => {
      expect(category).toEqual(categories[0]);
    });
});

test('it gets the categories count', async () => {
  expect.assertions(1);
  return CategoriesRequest.count()
    .then((count) => {
      expect(typeof count).toBe('number');
    });
});

// TODO: add images to the form data
test('it creates a category', async () => {
  expect.assertions(1);

  const form = new Form({
    name: faker.name.findName(),
    parent_id: null,
  });

  return CategoriesRequest.createCategory(form.getFormData())
    .then((category) => {
      expect(category).toMatchObject(form.data());
    });
});

test('it updates a category', async () => {
  expect.assertions(1);

  const category = await getRandomCategory();
  // const newParentCategory = await getRandomCategory();

  const form = new Form({
    name: faker.name.findName(),
    parent_id: null,
  });

  form.setPutMethod();

  return CategoriesRequest.updateCategory(category.id, form.getFormData())
    .then((updatedCategory) => {
      expect(updatedCategory).toMatchObject(form.data());
    });
});

test('it deletes a category', async () => {
  expect.assertions(1);

  const category = await getRandomCategory();

  return CategoriesRequest.deleteCategory(category.id)
    .then((response) => {
      expect(response).toMatchObject({
        message: 'category deleted',
      });
    });
});

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
