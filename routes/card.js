const express = require('express');
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/card');

const cardsRoute = express.Router();
cardsRoute.get('/', getCards);
cardsRoute.post('/', createCard);
cardsRoute.delete('/:cardId', deleteCard);
cardsRoute.put('/:cardId/likes', likeCard);
cardsRoute.delete('/:cardId/likes', dislikeCard);
module.exports = cardsRoute;
