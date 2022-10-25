const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports.register = (req, res, next) => {
  const { email, password } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({ email, password: hash }))
    .then((user) => res.status(201).send({ _id: user._id }))
    .catch((err) => next(err));
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        process.env.JWT_KEY,
        { expiresIn: '7d' },
      );
      return res
        .cookie('jwt', token, {
          httpOnly: true,
        }).send({
          token,
        });
    })
    .catch((err) => next(err));
};
