const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { UNAUTHORIZED_ERROR } = require('../errors/errors');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError(UNAUTHORIZED_ERROR));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_KEY);
  } catch (err) {
    return next(new UnauthorizedError(UNAUTHORIZED_ERROR));
  }
  req.user = payload;
  return next();
};
module.exports = auth;
