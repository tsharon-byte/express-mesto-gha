const { USER_DATA_ERROR } = require('./errors');

class IncorrectDataError extends Error {
  constructor() {
    super(USER_DATA_ERROR);
    this.code = 400;
  }
}
module.exports = IncorrectDataError;
