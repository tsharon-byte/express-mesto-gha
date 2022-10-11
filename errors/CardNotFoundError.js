const { CARD_INCORRECT_ID_ERROR } = require('./errors');

class CardNotFoundError extends Error {
  constructor() {
    super(CARD_INCORRECT_ID_ERROR);
    this.code = 404;
  }
}
module.exports = CardNotFoundError;
