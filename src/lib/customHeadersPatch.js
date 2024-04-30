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
    return typeof headers === "object" && headers !== null;
  }

  updateHeaders(headersObject) {
    if (this._isValidHeadersObject(headersObject)) {
      this.headers = headersObject;
    } else {
      throw new Error("Invalid headers object");
    }
  }
}
