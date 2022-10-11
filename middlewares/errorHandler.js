const { DEFAULT_MESSAGE_ERROR } = require('../errors/errors');

const errorHandler = (error, req, res, next) => {
  const { code, message } = error;
  res.status(code || 500).send({
    message: message || DEFAULT_MESSAGE_ERROR,
  });
  next();
};
module.exports = errorHandler;
