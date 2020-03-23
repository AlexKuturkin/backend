const { sendOnlyMessage } = require("../libs/helpers");
const { userMessage } = require("../libs/user-message");

module.exports.resourceIsNotFound = (req, res) => {
  sendOnlyMessage(res, userMessage.resourceIsNotFoundError);
};
