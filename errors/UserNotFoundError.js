const { USER_NOT_FOUND_ERROR } = require('./errors');

class UserNotFoundError extends Error {
  constructor() {
    super(USER_NOT_FOUND_ERROR);
    this.code = 404;
  }
}
module.exports = UserNotFoundError;
