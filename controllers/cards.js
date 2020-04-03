const card = require("../models/card");
const NotRightsError = require("../errors/notRightsError");

module.exports.getCards = (req, res, next) => {
  card
    .find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
  /* .catch((error) => res
    .status(500)
    .send({ message: "Ошибка при выводе всех карточек", err: error })); */
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  card
    .create({ name, link, owner: req.user._id })
    .then((newCard) => res.send({ data: newCard }))
    .catch(next);
  /* .catch((error) => res
    .status(500)
    .send({ message: "Ошибка при создании карточки", err: error })); */
};

module.exports.removeCard = (req, res, next) => {
  card
    .findOne({ _id: req.params.cardId })
    .then((cardInfo) => {
      if (cardInfo.owner.toString() === req.user._id.toString()) {
        return card.findByIdAndRemove(req.params.cardId)
          .then(() => res.send({ message: "Карточка удалена", data: cardInfo }));
      } else {
        // res.send({ message: "Нет прав для удаления" });
        throw new NotRightsError("Нет прав для удаления");
      }
    })
    .catch(next);
  /* .catch((err) => {
    if (err.name === "CastError") {
      res.status(400).send({ message: "Ошибка при удалении карточки", error: err });
    } else {
      res.status(500).send({ message: "Ошибка при удалении карточки", error: err });
    }
  }); */
};
