const User = require('../models/user');
const UserCreationError = require('../errors/UserCreationError');
const UserNotFoundError = require('../errors/UserNotFoundError');
const UserUpdateDataError = require('../errors/UserUpdateDataError');
const UserUpdateAvatarError = require('../errors/UserUpdateAvatarError');
const UserDataError = require('../errors/IncorrectDataError');

const getUsers = (req, res, next) => {
  User.find({})
    .select('_id name about avatar')
    .then((users) => {
      res.status(200).send(users);
    }).catch((error) => next(error));
};
const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate(_id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        next(new UserNotFoundError());
      }
      res.status(200).send({
        _id: user._id, name: user.name, about: user.about, avatar: user.avatar,
      });
    })
    .catch(() => next(new UserUpdateDataError()));
};
const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate(_id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        next(new UserNotFoundError());
      }
      res.status(200).send({
        _id: user._id, name: user.name, about: user.about, avatar: user.avatar,
      });
    })
    .catch(() => next(new UserUpdateAvatarError()));
};
const getUsersById = (req, res, next) => {
  const _id = req.params.userId;
  User.findById(_id)
    .select('_id name about avatar')
    .then((user) => {
      if (!user) {
        next(new UserNotFoundError());
      }
      res.status(200).send(user);
    }).catch(() => next(new UserDataError()));
};
const createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar }).then((user) => {
    res.status(200).send(user);
  }).catch((error) => {
    next(new UserCreationError(error));
  });
};
module.exports = {
  getUsers, getUsersById, createUser, updateUser, updateUserAvatar,
};
