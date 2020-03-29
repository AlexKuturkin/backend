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
    .findOne({ _id: req.params.cardId })
    .then((cardInfo) => {
      if (cardInfo.owner.toString() === req.user._id.toString()) {
        return card.findByIdAndRemove(req.params.cardId)
          .then(() => res.send({ message: "Карточка удалена", data: cardInfo }));
      } else {
        res.send({ message: "Нет прав для удаления" });
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(400).send({ message: "Ошибка при удалении карточки", error: err });
      } else {
        res.status(500).send({ message: "Ошибка при удалении карточки", error: err });
      }
    });
};
