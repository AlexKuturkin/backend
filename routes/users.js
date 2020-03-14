const path = require("path");
const router = require("express").Router();
const fsp = require("fs").promises;

async function getUsers() {
  const pathToFile = path.join(__dirname, "../data/users.json");

  return fsp
    .readFile(pathToFile, "utf8")
    .then(data => [JSON.parse(data), null])
    .catch(err => [null, err]);
}

router.get("/", async (req, res) => {
  const [users, error] = await getUsers();

  if (error) {
    return res.status(500).json({ message: "Ошибка" });
  }
  return res.json(users);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const [users, error] = await getUsers();

  if (error) {
    return res.status(500).json({ message: "Ошибка" });
  }
  for (let i = 0; i < users.length; i += 1) {
    if (users[i]._id === id) {
      return res.json(users[i]);
    }
  }
  return res.status(404).json({ message: "Нет пользователя с таким id" });
});

module.exports = router;
