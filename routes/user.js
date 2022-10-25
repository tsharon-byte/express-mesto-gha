const express = require('express');
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getUsersById, updateUser, updateUserAvatar, getUser,
} = require('../controllers/user');

const usersRoute = express.Router();
usersRoute.get('/', getUsers);
usersRoute.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/^https?:\/\/(www\.)?[a-z0-9-._~:/?#[\]@!$&'()*+,;=]{3,}#?/),
    about: Joi.string().min(2).max(30),
  }),
}), updateUser);
usersRoute.get('/me', getUser);
usersRoute.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(/^https?:\/\/(www\.)?[a-z0-9-._~:/?#[\]@!$&'()*+,;=]{3,}#?/),
  }),
}), updateUserAvatar);
usersRoute.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().min(24),
  }),
}), getUsersById);
module.exports = usersRoute;
