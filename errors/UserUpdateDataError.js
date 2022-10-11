const { USER_PATCH_INCORRECT_ERROR } = require('./errors');

class UserUpdateDataError extends Error {
  constructor() {
    super(USER_PATCH_INCORRECT_ERROR);
    this.code = 400;
  }
}
module.exports = UserUpdateDataError;
