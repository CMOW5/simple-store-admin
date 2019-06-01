import AuthApi from 'services/api/auth/auth-api';

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
 * save the user data
 * @param {*} user
 * @return {Object} the new state
 */
export function clearUser() {
  return {
    type: UNAUTHENTICATED,
  };
}

/**
 * signin action
 * @param {object} credentials
 * @return {Promise}
 */
export function loginAction(credentials) {
  return async (dispatch) => {
    try {
      const user = await AuthApi.login(credentials);
      dispatch({
        type: AUTHENTICATED,
        payload: user,
      });
      return Promise.resolve(user);
    } catch (error) {
      dispatch({
        type: AUTHENTICATION_ERROR,
        payload: 'logout error',
      });
      return Promise.reject(error);
    }
  };
}

/**
 * @return {Promise}
 */
export function getCurrentUserAction() {
  return async (dispatch) => {
    try {
      const user = await AuthApi.getCurrentUser();
      dispatch({
        type: AUTHENTICATED,
        payload: user,
      });
      return Promise.resolve(user);
    } catch (error) {
      dispatch({
        type: AUTHENTICATION_ERROR,
        payload: 'logout error',
      });
      return Promise.reject(error);
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
  return (dispatch) => {
    return AuthApi.logout()
      .then(() => {
        dispatch({type: UNAUTHENTICATED});
        return Promise.resolve();
      })
      .catch((error) => {
        dispatch({type: AUTHENTICATION_ERROR});
        return Promise.reject();
      });
  };
}

/**
 * set the user name
 * @param {*} name
 * @return {Object} the new state
 */
export function test(name) {
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
