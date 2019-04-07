import {createStore, applyMiddleware} from 'redux';

/* middlewares */
import thunk from 'redux-thunk';
import logger from 'redux-logger';
// import promise from 'redux-promise-middleware';

// reducers
import rootReducer from './reducers/root-reducer';

const createStoreWithMiddleware = applyMiddleware(
  thunk, // async state calls
  logger, // log the state changes
)(createStore);

export default createStoreWithMiddleware(
  rootReducer,
  {},

  // enable redux dev tools
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);


/*
export default createStore(
  combineReducers(
    {
      userReducer,
      routerReducer,
      // productReducer,
    }),
  {},
  // applyMiddleware(logger, thunk, promise())
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
*/


