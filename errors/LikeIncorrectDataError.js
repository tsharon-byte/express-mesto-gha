const { CARD_INCORRECT_LIKE_DATA_ERROR } = require('./errors');

class LikeIncorrectDataError extends Error {
  constructor() {
    super(CARD_INCORRECT_LIKE_DATA_ERROR);
    this.code = 400;
  }
}
module.exports = LikeIncorrectDataError;
