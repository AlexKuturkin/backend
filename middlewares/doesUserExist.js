const user = require("../models/user");
const { userMessage } = require("../libs/user-message");
const {
  sendOnlyMessage,
  indentifyError,
} = require("../libs/helpers");

module.exports.doesUserExist = (req, res, next) => {
  user.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        sendOnlyMessage(res, userMessage.userNotFoundError);
        return;
      }

      next();
    })
    .catch((err) => {
      indentifyError(res, err);
    });
};
