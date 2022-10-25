const express = require('express');
const { celebrate, Joi } = require('celebrate');
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/card');

const cardsRoute = express.Router();
cardsRoute.get('/', getCards);
cardsRoute.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(/^https?:\/\/(www\.)?[a-z0-9-._~:/?#[\]@!$&'()*+,;=]{3,}#?/),
  }),
}), createCard);
cardsRoute.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().min(24),
  }),
}), deleteCard);
cardsRoute.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().min(24),
  }),
}), likeCard);
cardsRoute.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().min(24),
  }),
}), dislikeCard);
module.exports = cardsRoute;
