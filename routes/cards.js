const path = require("path");
const router = require("express").Router();
const fsp = require("fs").promises;

async function getCards() {
  const pathToFile = path.join(__dirname, "../data/cards.json");

  return fsp
    .readFile(pathToFile, "utf8")
    .then(data => [JSON.parse(data), null])
    .catch(err => [null, err]);
}

router.get("/", async (req, res) => {
  const [cards, error] = await getCards();

  if (error) {
    return res.status(500).json({ message: "Ошибка" });
  }
  return res.json(cards);
});

module.exports = router;
