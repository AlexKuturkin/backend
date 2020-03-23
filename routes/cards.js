const router = require("express").Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeToggle
} = require("../controllers/cards");
const { doesCardExist } = require("../middlewares/doesCardExist");
const {
  noRigtsUsersDeleteCard
} = require("../middlewares/noRightsUsersDeleteCard");

router.get("/", getCards);
router.post("/", createCard);
router.delete("/:cardId", doesCardExist, noRigtsUsersDeleteCard, deleteCard);
router.put("/:cardId/likes", doesCardExist, likeToggle);
router.delete("/:cardId/likes", doesCardExist, likeToggle);
module.exports = router;
