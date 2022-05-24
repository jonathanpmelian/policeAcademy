const router = require("express").Router();

const { checkAuth } = require("../utils/index");
const { viewMyProfile } = require("../controllers/user.controller");

router.get("/", checkAuth, viewMyProfile);

module.exports = router;
