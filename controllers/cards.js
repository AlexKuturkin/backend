const card = require("../models/card");

module.exports.getCards = (req, res) => {
  card
    .find({})
    .then((cards) => res.send({ data: cards }))
    .catch((error) => res
      .status(500)
      .send({ message: "Ошибка при выводе всех карточек", err: error }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  card
    .create({ name, link, owner: req.user._id })
    .then((newCard) => res.send({ data: newCard }))
    .catch((error) => res
      .status(500)
      .send({ message: "Ошибка при создании карточки", err: error }));
};

module.exports.removeCard = (req, res) => {
  card
    .findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (card) {
        res.send({ data: card });
      }
      res.send({ message: "Карточки с данным ID не существует, либо она была уже удалена" });
    })
    .catch((err) => {
      res.status(500).send({ message: "Ошибка при удалении карточки", error: err });
    });
};
