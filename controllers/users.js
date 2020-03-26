const user = require("../models/user");

module.exports.getUsers = (req, res) => {
  user
    .find({})
    .then((users) => res.send({ data: users }))
    .catch((error) => res
      .status(500)
      .send({ message: "Ошибка при выводе всех пользователей", err: error }));
};

module.exports.getUserById = (req, res) => {
  user
    .findById(req.params.userId)
    .then((user) => {
      if (user) {
        res.send({ data: user });
      }
      res.send({ message: "Пользователя с данным ID не существует" });
    })
    .catch((error) => res
      .status(500)
      .send({ message: "Ошибка при выводе одного пользователя", err: error }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  user
    .create({ name, about, avatar })
    .then((newUser) => res.send({ data: newUser }))
    .catch((error) => res
      .status(500)
      .send({ message: "Ошибка при создании пользователя", err: error }));
};
