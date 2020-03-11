const router = require("express").Router();
const users = require("../data/users.json");

router.get("/users", (req, res) => {
  res.send(users);
});

router.get("/users/:id", (req, res) => {
  let userAvailable = false;

  for (let i = 0; i < users.length; i++) {
    if (req.params.id === users[i]._id) {
      res.send(users[i]);
      userAvailable = true;
      return;
    }
  }

  if (!userAvailable) {
    res.status(404).send({ message: "Нет пользователя с таким id" });
  }
});

module.exports = router;
