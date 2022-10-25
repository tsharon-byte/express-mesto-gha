const express = require('express');
const { celebrate, Joi } = require('celebrate');
const { login } = require('../controllers/auth');
const { createUser } = require('../controllers/user');

const route = express.Router();
route.use('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/^https?:\/\/(www\.)?[a-z0-9-._~:/?#[\]@!$&'()*+,;=]{3,}#?/),
    about: Joi.string().min(2).max(30),
  }),
}), createUser);
route.use('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);
module.exports = route;
