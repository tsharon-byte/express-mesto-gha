const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { isEmail } = require('validator');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { UNAUTHORIZED_ERROR } = require('../errors/errors');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minLength: 2,
    maxLength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(v) {
        return /^https?:\/\/(www\.)?[a-z0-9-._~:/?#[\]@!$&'()*+,;=]{3,}#?/.test(v);
      },
      message: 'Неправильный формат URL',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: 'Неправильный формат почты',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError(UNAUTHORIZED_ERROR));
      }
      return bcrypt.compare(password, user.password)
        .then((result) => {
          if (!result) {
            return Promise.reject(new UnauthorizedError(UNAUTHORIZED_ERROR));
          }
          return user;
        });
    })
    .catch((err) => Promise.reject(err));
};
module.exports = mongoose.model('user', userSchema);
