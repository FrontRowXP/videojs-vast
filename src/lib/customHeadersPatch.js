/**
 * This is a patch based approach to allowing us to
 * set custom headers on the XHR request that this lib
 * and the @dailymotion/vast-client lib makes.
 *
 * This is a workaround for the fact that the vast-client
 * lib does not allow us to set custom headers.
 *
 * There should only be one instance of this class created,
 * and it is setup to allow the headers to be updated at any
 * time since they are only read when the XHR request is made.
 */
export class CustomHeadersPatch {
  headers = {};

  constructor() {
    this._polyfillCustomHeaders();
  }

  _polyfillCustomHeaders() {
    (function (originalSend, customHeadersPatch) {
      const headers = customHeadersPatch.headers;

      XMLHttpRequest.prototype.send = function (body) {
        Object.keys(headers).forEach((key) => {
          // This is the XMLHttpRequest object instance this
          this.setRequestHeader(key, headers[key]);
        });

        // This is the XMLHttpRequest object instance this
        originalSend.call(this, body);
      };
    })(XMLHttpRequest.prototype.send, this);
  }

  _isValidHeadersObject(headers) {
    return typeof headers === 'object' && headers !== null;
  }

  updateHeaders(headersObject) {
    if (this._isValidHeadersObject(headersObject)) {
      this.headers = headersObject;
    } else {
      throw new Error('Invalid headers object');
    }
  }
}
