import Form from '../form';

test('form data is valid', () => {
  const startState = new Form({
    'email': 'user@example.com',
    'password': '123456',
  });

  /* testing the form data */
  let data = startState.data();

  expect(data)
    .toEqual({'email': 'user@example.com', 'password': '123456'});

  /* testing formData is cleared correctly */
  startState.reset();
  const resetData = startState.data();

  expect(resetData)
    .toEqual({'email': '', 'password': ''});
});

test('formData object is valid', () => {
  const startState = new Form({
    email: 'user@example.com',
    password: '123456',
    metadata: {
      links: 'some-link',
    },
  });

  /* testing FormData object */
  let formData = new FormData();
  formData.set('email', 'user@example.com');
  formData.set('password', '123456');
  formData.set('metadata', JSON.stringify({links: 'some-link'}));

  expect(formData.get('email'))
    .toEqual(startState.getFormData().get('email'));
  expect(formData.get('password'))
    .toEqual(startState.getFormData().get('password'));
  expect(formData.get('metadata'))
    .toEqual(startState.getFormData().get('metadata'));

  /* testing formData is cleared correctly */
  startState.reset();
  const resetData = startState.getFormData();

  expect(resetData.get('email'))
    .toEqual('');
  expect(resetData.get('password'))
    .toEqual('');
  expect(resetData.get('metadata'))
    .toEqual('');
});

test('form errors are saved correctly', () => {
  const form = new Form({});

  const errors = {
    'response': {
      'data': {
        'errors': {
          'general': [
            'general error message.',
          ],
          'email': [
            'email error message.',
          ],
          'password': [
            'password error message.',
          ],
        },
      },
    },
  };

  form.saveErrors(errors);

  expect(form.hasError('email'))
    .toBe(true);
  expect(form.hasError('password'))
    .toBe(true);
  expect(form.hasError('general'))
    .toBe(true);

  /* is error message correct ? */
  expect(form.getErrorMessage('email'))
    .toBe('email error message.');
  expect(form.getErrorMessage('password'))
    .toBe('password error message.');
  expect(form.getErrorMessage('general'))
    .toBe('general error message.');

  /* are errors cleared correctly ? */
  form.clearErrors();

  expect(form.hasError('email'))
    .toBe(false);
  expect(form.hasError('password'))
    .toBe(false);
  expect(form.hasError('general'))
    .toBe(false);
});

test('a single file form is saved correctly in the form', () => {
  const form = new Form({});

  expect(form.hasFiles())
    .toBe(false);

  const file = new File([''], 'myFile');

  form.appendFiles('file', file);

  const formData = new FormData();
  formData.append('file', file);

  expect(form.hasFiles())
    .toBe(true);

  expect(form.getFormData().get('file'))
    .toEqual(formData.get('file'));
});


test('an array of files are saved correctly in the form', () => {
  const form = new Form({});

  expect(form.hasFiles())
    .toBe(false);

  const files = [new File([''], 'myFile1'), new File([''], 'myFile2')];

  form.appendFiles('files', files);

  const formData = new FormData();
  formData.append('files[0]', files[0]);
  formData.append('files[1]', files[1]);

  expect(form.hasFiles())
    .toBe(true);

  expect(form.getFormData().get('files'))
    .toEqual(formData.get('files'));
});

test('the put/patch are correctly set in the form ', () => {
  const form = new Form({});

  form.setPutMethod();

  expect(form.getFormData().get('_method'))
    .toEqual('put');

  form.setPatchMethod();

  expect(form.getFormData().get('_method'))
    .toEqual('patch');
});

