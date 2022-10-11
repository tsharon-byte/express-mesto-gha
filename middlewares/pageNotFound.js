const NotFoundError = require('../errors/NotFoundError');

const pageNotFound = (req, res, next) => {
  next(new NotFoundError());
};
module.exports = pageNotFound;
