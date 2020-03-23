const user = require("../models/user");
const { getResponse, indentifyError } = require("../libs/helpers");

const updateOptions = {
  new: true,
  runValidators: true,
  upsert: true,
};

module.exports.getUsers = (req, res) => {
  user.find({})
    .then((user) => getResponse(res, user))
    .catch((err) => indentifyError(res, err));
};
module.exports.getUserById = (req, res) => {
  user.findById(req.params.userId)
    .then((user) => getResponse(res, user))
    .catch((err) => indentifyError(res, err));
};
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  user.create({ name, about, avatar })
    .then((user) => getResponse(res, user))
    .catch((err) => indentifyError(res, err));
};
module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  user.findByIdAndUpdate(req.user._id, { name, about }, updateOptions)
    .then((user) => getResponse(res, user))
    .catch((err) => indentifyError(res, err));
};
module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  user.findByIdAndUpdate(req.user._id, { avatar }, updateOptions)
    .then((user) => getResponse(res, user))
    .catch((err) => indentifyError(res, err));
};
