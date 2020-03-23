const card = require("../models/card");
const { userMessage } = require("../libs/user-message");
const {
  sendOnlyMessage,
  indentifyError,
} = require("../libs/helpers");

module.exports.doesCardExist = (req, res, next) => {
  card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        sendOnlyMessage(res, userMessage.cardNotFoundError);
        return;
      }
      next();
    })
    .catch((err) => {
      indentifyError(res, err);
    });
};
