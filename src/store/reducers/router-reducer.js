const initialState = {
  route: '/',
};

const routerReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_ROUTE':
    state = {
      ...state, // copy all the state members
      route: action.payload,
    };
    break;
  case 'OTHER_ACTION':
    state = {
      ...state, // copy all the state members
      route: action.payload,
    };
    break;
  default:
    break;
  }
  return state;
};

export default routerReducer;
