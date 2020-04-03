// eslint-disable-next-line no-unused-vars
const errorMiddleware = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  // res.status(err.statusCode).send({ message: err.message });
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? "На сервере произошла ошибка"
        : message,
    });
};

module.exports = errorMiddleware;
