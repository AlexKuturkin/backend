const express = require("express");
const path = require("path");
const routerUsers = require("./routes/users");
const routerCards = require("./routes/cards");

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use("/", routerUsers);
app.use("/", routerCards);

app.get("*", (req, res) => {
  res.status(404).send({ message: "Запрашиваемый ресурс не найден" });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
