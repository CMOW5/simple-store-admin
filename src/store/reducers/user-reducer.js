import {SAVE_USER, AUTHENTICATED, UNAUTHENTICATED, AUTHENTICATION_ERROR}
  from '../actions/user-actions';

const initialState = {
  id: '',
  name: '',
  email: '',
  activated: false,
  authenticated: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
  case SAVE_USER:
    state = {
      ...state,
      ...action.payload,
      authenticated: true,
    };
    break;

  case AUTHENTICATED:
    state = {
      ...state,
      ...action.payload,
      authenticated: true,
    };
    break;

  case UNAUTHENTICATED:
    state = {...initialState, authenticated: false};
    break;

  case AUTHENTICATION_ERROR:
    state = {...initialState, authenticated: false, error: action.payload};
    break;

  default:
    break;
  }
  return state;
};

export default userReducer;
