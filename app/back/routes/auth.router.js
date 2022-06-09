const router = require("express").Router();

const { check } = require("../middlewares/auth");
const { signup, login } = require("../controllers/auth.controller");

router.post("/signup", check, signup);
router.post("/login", login);

module.exports = router;
