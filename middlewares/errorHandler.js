const { DEFAULT_MESSAGE_ERROR } = require('../errors/errors');

const errorHandler = (error, req, res, next) => {
  const { code, message } = error;
  const status = code || 500;
  const mes = code && message ? message : DEFAULT_MESSAGE_ERROR;
  res.status(status).send({ message: mes });
  next();
};
module.exports = errorHandler;
