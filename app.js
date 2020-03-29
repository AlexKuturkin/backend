const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const { login, createUser } = require("./controllers/users");
const cards = require("./routes/cards");
const users = require("./routes/users");

const auth = require("./middlewares/auth");

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

app.post("/signin", login);
app.post("/signup", createUser);

app.use(cookieParser());
app.use(auth);

app.use("/cards", cards);
app.use("/users", users);

app.use("/", (req, res) => {
  res.status(404).send({ message: "Запрашиваемый ресурс не найден" });
});

app.listen(PORT, () => {
  console.log("Server is listening on port:", PORT);
});
