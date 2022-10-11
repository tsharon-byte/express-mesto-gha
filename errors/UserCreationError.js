const { USER_CREATION_DATA_ERROR } = require('./errors');

class UserCreationError extends Error {
  constructor() {
    super(USER_CREATION_DATA_ERROR);
    this.code = 400;
  }
}
module.exports = UserCreationError;
