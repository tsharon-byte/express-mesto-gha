const User = require('../models/user');
const {
  INCORRECT_DATA_ERROR,
  USER_CREATION_DATA_ERROR,
  USER_PATCH_INCORRECT_AVATAR_ERROR,
  USER_PATCH_INCORRECT_ERROR, USER_NOT_FOUND_ERROR,
} = require('../errors/errors');
const NotFoundError = require('../errors/NotFoundError');
const checkError = require('../utils/checkError');

const getUsers = (req, res, next) => {
  User.find({})
    .select('_id name about avatar')
    .then((users) => {
      res.status(200).send(users);
    }).catch((err) => checkError(err, INCORRECT_DATA_ERROR, next));
};
const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate(_id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return next(new NotFoundError(USER_NOT_FOUND_ERROR));
      }
      return res.status(200).send({
        _id: user._id, name: user.name, about: user.about, avatar: user.avatar,
      });
    })
    .catch((err) => checkError(err, USER_PATCH_INCORRECT_ERROR, next));
};
const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate(_id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return next(new NotFoundError(USER_NOT_FOUND_ERROR));
      }
      return res.status(200).send({
        _id: user._id, name: user.name, about: user.about, avatar: user.avatar,
      });
    })
    .catch((err) => checkError(err, USER_PATCH_INCORRECT_AVATAR_ERROR, next));
};
const getUsersById = (req, res, next) => {
  const _id = req.params.userId;
  User.findById(_id)
    .select('_id name about avatar')
    .then((user) => {
      if (!user) {
        return next(new NotFoundError(USER_NOT_FOUND_ERROR));
      }
      return res.status(200).send(user);
    }).catch((err) => checkError(err, INCORRECT_DATA_ERROR, next));
};
const createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar }).then((user) => {
    res.status(200).send(user);
  }).catch((err) => checkError(err, USER_CREATION_DATA_ERROR, next));
};
module.exports = {
  getUsers, getUsersById, createUser, updateUser, updateUserAvatar,
};
