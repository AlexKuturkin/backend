const card = require("../models/card");
const NotRightsError = require("../errors/notRightsError");
const NotFoundError = require("../errors/notFoundError");

module.exports.getCards = (req, res, next) => {
  card
    .find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  card
    .create({ name, link, owner: req.user._id })
    .then((newCard) => res.send({ data: newCard }))
    .catch(next);
};

module.exports.removeCard = (req, res, next) => {
  card
    .findOne({ _id: req.params.cardId })
    .then((cardInfo) => {
      if (cardInfo !== null) {
        if (cardInfo.owner.toString() === req.user._id.toString()) {
          return card.findByIdAndRemove(req.params.cardId)
            .then(() => res.send({ message: "Карточка удалена", data: cardInfo }));
        } else {
          throw new NotRightsError("Нет прав для удаления");
        }
      } else {
        throw new NotFoundError("Карточка не была найдена");
      }
    })
    .catch(next);
};
