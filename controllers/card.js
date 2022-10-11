const Card = require('../models/card');
const CardCreationError = require('../errors/CardCreationError');
const CardNotFoundError = require('../errors/CardNotFoundError');
const LikeIncorrectDataError = require('../errors/LikeIncorrectDataError');
const IncorrectDataError = require('../errors/IncorrectDataError');

const getCards = (req, res, next) => {
  const limit = 10;
  Card.find({})
    .populate(['owner', 'likes'])
    .select('_id name link owner likes createdAt')
    .sort({ createdAt: -1 })
    .limit(limit)
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch((error) => next(error));
};
const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(200).send({
        name: card.name,
        link: card.link,
        owner: card.owner,
        likes: card.likes,
        _id: card._id,
        createdAt: card.createdAt,
      });
    })
    .catch(() => next(new CardCreationError()));
};
const deleteCard = (req, res, next) => {
  const _id = req.params.cardId;
  Card.findByIdAndRemove(_id)
    .then((card) => {
      if (!card) {
        next(new CardNotFoundError());
      }
      res.status(200).send({});
    })
    .catch(() => next(new IncorrectDataError()));
};
const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).then((card) => {
    if (!card) {
      return next(new CardNotFoundError());
    }
    return res.status(200).send(card);
  })
    .catch(() => next(new LikeIncorrectDataError()));
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).then((card) => {
    if (!card) {
      return next(new CardNotFoundError());
    }
    return res.status(200).send({});
  })
    .catch(() => next(new LikeIncorrectDataError()));
};
module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
