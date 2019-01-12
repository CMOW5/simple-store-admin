import axios from 'axios';
/**
 *
 */
export default class BlobConverter {
  /**
   * convert an array of urls to blop objects
   * @param {array} urls
   * @return {array}
   */
  async convert(urls) {
    let blobs = [];
    for (let url of urls) {
      let encodedData = await this.request(url);
      let blob = await this.getImageSource(encodedData);
      blobs.push(blob);
    }
    return blobs;
  }

  /**
   * get image src from the file object
   *
   * @param {File} file file associated with the image
   * @return {Promise} the promise with the string source
   */
  async getImageSource(file) {
    try {
      const imageSource = await this.readUploadedFileAsDataUrl(file);
      return imageSource;
    } catch (e) {
      console.warn('error reading file = ', e.message);
    }
  }

  /**
   * read the url from the file
   *
   * @param {File} inputFile
   * @return {string} the image source url
   */
  readUploadedFileAsDataUrl(inputFile) {
    const fileReader = new FileReader();

    return new Promise((resolve, reject) => {
      /* register the onLoad callback */
      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      /* register the onError callback */
      fileReader.onerror = () => {
        fileReader.abort();
        reject(new DOMException('Problem parsing input file.'));
      };

      fileReader.readAsDataURL(inputFile);
    });
  }

  /**
   * get the image data from the url
   * @param {string} url
   * @return {promise}
   */
  request(url) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: url,
        responseType: 'blob',
      })
        .then(function(response) {
          let blob = response.data;
          blob.lastModifiedDate = new Date();
          blob.name = 'imagename';
          resolve(blob);
        })
        .catch(function(error) {
          console.log(error);
        });
    });
  }
}
