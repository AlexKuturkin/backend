const card = require("../models/card");
const {
  getResponse,
  sendOnlyMessage,
  indentifyError,
  cardLike,
} = require("../libs/helpers");
const { userMessage } = require("../libs/user-message");

module.exports.getCards = (req, res) => {
  card.find({})
    .then((card) => getResponse(res, card))
    .catch((err) => indentifyError(res, err));
};
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  card.create({ name, link, owner: req.user._id })
    .then((card) => getResponse(res, card))
    .catch((err) => indentifyError(res, err));
};
module.exports.deleteCard = (req, res) => {
  card.findByIdAndRemove(req.params.cardId)
    .then(() => res.send(sendOnlyMessage(res, userMessage.successDelete)))
    .catch((err) => indentifyError(res, err));
};
module.exports.likeToggle = (req, res) => {
  cardLike(req, res, card)
    .then((card) => getResponse(res, card))
    .catch((err) => indentifyError(res, err));
};
