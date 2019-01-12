import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// router
import {BrowserRouter} from 'react-router-dom';

// redux
import {Provider} from 'react-redux';
import store from './store/store';

/* styles */
import 'bulma/css/bulma.css';
import './index.css';

ReactDOM.render(
  // provide the store to the whole application
  <Provider store={store}>
    <BrowserRouter
      // the forceRefresh config is set to stop firefox to prompt
      // the save password dialog
      forceRefresh = {true}
    >
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
