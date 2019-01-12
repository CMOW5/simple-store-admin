
/**
 * this class handles the router redirections
 */
export default class RouterHandler {
  /**
   * @param {*} history
   * @param {*} path
   */
  static goTo(history, path) {
    const currentPath = history.location.pathname;

    const newLocation = {
      pathname: path,
      // state: { fromPro: true }
    };

    if (currentPath !== path) {
      history.push(newLocation);
    } else {
      history.replace(newLocation);
    }
  }
}
