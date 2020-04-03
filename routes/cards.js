const router = require("express").Router();
const {
  getCards,
  createCard,
  removeCard,
} = require("../controllers/cards");
const {
  cardPostValidation,
  cardIdValidation,
} = require("../middlewares/validation");


router.get("/", getCards);
router.post("/", cardPostValidation, createCard);
router.delete("/:cardId", cardIdValidation, removeCard);
module.exports = router;
