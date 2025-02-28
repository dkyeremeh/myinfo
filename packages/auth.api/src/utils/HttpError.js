const getStatus = require('statuses');
class HttpError extends Error {
    constructor(status, message) {
        const msg = message !== null && message !== void 0 ? message : getStatus(status);
        const err = super(msg);
        this.name = 'HttpError';
        this.status = status;
        Object.setPrototypeOf(this, HttpError.prototype);
    }
}
export default HttpError;
