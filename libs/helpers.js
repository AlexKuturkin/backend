const { userMessage } = require("./user-message");

module.exports.getResponse = (res, data) => res.send({ data });

module.exports.sendCustomErrMessage = (res, err, data) => res.status(data.status).send({ message: `${data.message} ${err}` });

module.exports.sendOnlyMessage = (res, data) => res.status(data.status).send({ message: data.message });

module.exports.indentifyError = (res, err) => {
  if (err.name === "ValidationError") {
    return this.sendCustomErrMessage(res, err, userMessage.validError);
  }
  if (err.name === "CastError") {
    return this.sendOnlyMessage(res, userMessage.validIdError);
  }
  return this.sendCustomErrMessage(res, err, userMessage.serverError);
};

module.exports.cardLike = (req, res, module) => {
  if (res.req.method === "PUT") {
    return module.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );
  }
  return module.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  );
};
