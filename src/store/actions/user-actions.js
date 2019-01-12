import Auth from 'services/api/auth/auth';

export const SAVE_USER = 'save_user';
export const AUTHENTICATED = 'authenticated_user';
export const UNAUTHENTICATED = 'unauthenticated_user';
export const AUTHENTICATION_ERROR = 'authentication_error';

/**
 * save the user data
 * @param {*} user
 * @return {Object} the new state
 */
export function saveUser(user) {
  return {
    type: SAVE_USER,
    payload: user,
  };
}

/**
 * signin action
 * @param {*} param
 * @param {*} history
 * @return {*}
 */
export function signInAction() {
  return async (dispatch) => {
    try {
      const user = await Auth.getAuthenticatedUser();
      console.log('authenticated = ', user);
      dispatch({type: AUTHENTICATED});
    } catch (error) {
      dispatch({
        type: AUTHENTICATION_ERROR,
        payload: 'Invalid email or password',
      });
    }
  };
}

/**
 * signin action
 * @param {*} param
 * @param {*} history
 * @return {*}
 */
export function getAuthenticatedUserAction() {
  return async (dispatch) => {
    try {
      const user = await Auth.getAuthenticatedUser();
      dispatch({
        type: AUTHENTICATED,
        payload: user,
      });
    } catch (error) {
      dispatch({
        type: AUTHENTICATION_ERROR,
        payload: 'logout error',
      });
    }
  };
}

/**
 * signin action
 * @param {*} param
 * @param {*} history
 * @return {*}
 */
export function logoutAction() {
  return async (dispatch) => {
    Auth.logout()
      .then((response) => {
        dispatch({type: UNAUTHENTICATED});
      })
      .catch((error) => {
        dispatch({type: AUTHENTICATION_ERROR});
      });
  };
}

/**
 * set the user name
 * @param {*} name
 * @return {Object} the new state
 */
export function setName2(name) {
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
