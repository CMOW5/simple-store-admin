/**
 * helper class to create logs
 */
export default class Logger {
  /**
   *
   * @param {string} message
   * @param {object} objs
   */
  static log(message, ...objs) {
    // check if the app is in production
    // if (true) return;
    if (objs.length >= 1) {
      console.log(message, ...objs);
    } else {
      console.log(message);
    }
  }
}
