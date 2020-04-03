const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const { login, createUser } = require("./controllers/users");
const cards = require("./routes/cards");
const users = require("./routes/users");

const auth = require("./middlewares/auth");
const errorMiddleware = require("./middlewares/error");
const NotFoundError = require("./errors/notFoundError");
const {
  signUpValidation,
  signInValidation,
  authValidation,
} = require("./middlewares/validation");

const { PORT = 3000 } = process.env;

const app = express();

mongoose
  .connect("mongodb://localhost:27017/mestodb", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Подключение к Mongo прошло успешно");
  })
  .catch(() => {
    console.log("Ошибка подключения к Mongo");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Сервер сейчас рухнет");
  }, 0);
});

app.post("/signin", signInValidation, login);
app.post("/signup", signUpValidation, createUser);

app.use(cookieParser());
app.use(authValidation, auth);

app.use("/cards", cards);
app.use("/users", users);

app.use("/", (req, res, next) => {
  next(new NotFoundError("Запрашиваемый ресурс не найден"));
  // res.status(404).send({ message: "Запрашиваемый ресурс не найден" });
});

app.use(errorLogger);
app.use(errors());
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log("Server is listening on port:", PORT);
});
