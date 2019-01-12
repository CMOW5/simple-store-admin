// import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createStore, combineReducers, applyMiddleware} from 'redux';

/* middlewares */
import reduxThunk from 'redux-thunk';
import logger from 'redux-logger';
// import promise from 'redux-promise-middleware';

// reducers
import userReducer from './reducers/user-reducer';
import routerReducer from './reducers/router-reducer';

const createStoreWithMiddleware
  = applyMiddleware(
    reduxThunk, // async state calls
    logger, // log the state changes
  )(createStore);

const rootReducer = combineReducers(
  {
    userReducer,
    routerReducer,
  });

export default createStoreWithMiddleware(
  rootReducer,
  {},
  // applyMiddleware(logger, thunk, promise())
  // redux dev tools
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


