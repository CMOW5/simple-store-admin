// import decode from 'jwt-decode';

/* constants */
const ID_TOKEN_KEY = '015246789';

/**
 * this class defines the helper methods
 * to manopulate the jwt token
 */
export default class TokenHandler {
  /**
   *  Store the token in local storage
   *
   * @param {String} token
   */
  static saveToken(token) {
    localStorage.setItem(ID_TOKEN_KEY, token);
  }

  /**
   * Get the token from local storage
   *
   * @return {String} token
   */
  static getToken() {
    return localStorage.getItem(ID_TOKEN_KEY);
  }

  /**
   * Clear the token in local storage
   */
  static clearToken() {
    localStorage.removeItem(ID_TOKEN_KEY);
  }

  /**
   * Decode the token
   *
   * @param {String} encodedToken
   * @return {String} the decoded token
   */
  static decodeToken(encodedToken) {
    /* token public data */
    /*
    const base64Url = token.split(".")[1]; //payload
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    console.log(JSON.parse(window.atob(base64))); //unpacked token
    */
    const decodedToken = '0'; // decode(encodedToken);
    return decodedToken;
  }

  /**
   * Get the token expiration Date
   *
   * @param {String} encodedToken
   * @return {Date} the token expiration date
   */
  static getTokenExpirationDate(encodedToken) {
    const token = this.decodeToken(encodedToken);
    if (!token.exp) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(token.exp);
    return date;
  }

  /**
   * Check if the token ttl has expired
   *
   * @param {*} token
   * @return {Boolean}
   */
  static isTokenExpired(token) {
    const expirationDate = this.getTokenExpirationDate(token);
    return expirationDate < new Date();
  }
}
