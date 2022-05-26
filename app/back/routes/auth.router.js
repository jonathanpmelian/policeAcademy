const router = require("express").Router();

const { check } = require("../utils/index");
const { signup, login } = require("../controllers/auth.controller");
const { assignTheft } = require("../utils/assignment");

router.post("/signup", check, signup, assignTheft);
router.post("/login", login);

module.exports = router;
