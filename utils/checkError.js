const BadRequestError = require('../errors/BadRequestError');

const checkError = (err, message, next) => {
  if (err.name === 'CastError' || err.name === 'ValidationError') {
    next(new BadRequestError(message));
  } else {
    next(err);
  }
};
module.exports = checkError;
