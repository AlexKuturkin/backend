const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const user = require("../models/user");
const JWT_SECRET = require("../config");

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
      } else {
        res.send({ message: "Пользователя с данным ID не существует" });
      }
    })
    .catch((error) => res
      .status(500)
      .send({ message: "Ошибка при выводе одного пользователя", err: error }));
};

module.exports.createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  if (password.length > 9) {
    bcrypt.hash(password, 10)
      .then((hash) => user.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      }))
      .then((newUser) => res.send({
        name: newUser.name, about: newUser.about, avatar: newUser.avatar, email: newUser.email,
      }))
      .catch((error) => res
        .status(500)
        .send({ message: "Ошибка при создании пользователя", err: error }));
  } else {
    res.status(400).send({ message: "Ошибка при создании пользователя. Длина пароля должна быть от 10 символов" });
  }
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  return user.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET.JWT_SECRET,
        { expiresIn: "7d" },
      );
      res
        .cookie("jwt", token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        })
        .send({ token });
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: `Ошибка аутентификации. ${err.message}` });
    });
};
