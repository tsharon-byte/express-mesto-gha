const { CARD_CREATION_ERROR } = require('./errors');

class CardCreationError extends Error {
  constructor() {
    super(CARD_CREATION_ERROR);
    this.code = 400;
  }
}
module.exports = CardCreationError;
