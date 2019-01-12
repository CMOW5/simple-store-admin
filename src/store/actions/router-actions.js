/**
 * set the user name
 * @param {*} route
 * @return {Object} the new state
 */
export function goToRoute(route) {
  return {
    type: 'SET_ROUTE',
    payload: route,
  };
}

/**
 * set the user name
 * @param {*} name
 * @return {Object} the new state
 */
export function setName(name) {
  /*
  return dispatch => {
      setTimeout(() => {
          //callback function called after 2 seconds
          dispatch({
              type : "SET_NAME",
              payload : name
          })
      },2000);//simulate a server request
  }
  */
  return {
    type: 'SET_NAME',
    payload: new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(name);
      }, 2000);
    }),
  };
}
