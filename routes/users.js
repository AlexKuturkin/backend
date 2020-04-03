const router = require("express").Router();
const {
  getUsers,
  getUserById,
} = require("../controllers/users");
const {
  getUserValidation,
} = require("../middlewares/validation");

router.get("/", getUsers);
router.get("/:userId", getUserValidation, getUserById);

module.exports = router;
