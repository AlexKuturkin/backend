const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const YouNeedToLogin = require("../errors/loginError");

module.exports = (req, res, next) => {
  if (!req.headers) {
    throw new YouNeedToLogin("Необходима авторизация");
    // return res.status(401).send({ message: "Необходима авторизация" });
  }
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new YouNeedToLogin("Необходима авторизация");
    // return res.status(401).send({ message: "Необходима авторизация" });
  }
  req.user = payload;
  next();
};
