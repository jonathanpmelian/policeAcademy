const router = require("express").Router();

const { checkAuth } = require("../utils/auth");
const { viewMyProfile } = require("../controllers/user.controller");

router.get("/", checkAuth, viewMyProfile);

module.exports = router;
