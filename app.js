const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cards = require("./routes/cards");
const users = require("./routes/users");


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

app.use((req, res, next) => {
  req.user = {
    _id: "5e7afd59ce80c634d4af21dd",
  };
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/cards", cards);
app.use("/users", users);
app.use("/", (req, res) => {
  res.status(404).send({ message: "Запрашиваемый ресурс не найден" });
});

app.listen(PORT, () => {
  console.log("Server is listening on port:", PORT);
});
