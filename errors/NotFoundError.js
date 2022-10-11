const { PAGE_NOT_FOUND_ERROR } = require('./errors');

class NotFoundError extends Error {
  constructor() {
    super(PAGE_NOT_FOUND_ERROR);
    this.code = 404;
  }
}
module.exports = NotFoundError;
