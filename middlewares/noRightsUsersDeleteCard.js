const сard = require("../models/card");
const { userMessage } = require("../libs/user-message");
const {
  sendOnlyMessage,
  indentifyError,
} = require("../libs/helpers");

module.exports.noRigtsUsersDeleteCard = (req, res, next) => {
  сard.findById(req.params.cardId)
    .then((card) => {
      if (req.user._id !== String(card.owner._id)) {
        sendOnlyMessage(res, userMessage.noRights);
        return;
      }
      next();
    })
    .catch((err) => {
      indentifyError(res, err);
    });
};
