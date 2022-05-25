const router = require("express").Router();

const { checkAuth } = require("../utils/index");
const {
  addTheft,
  getAllThefts,
  getOneTheft,
} = require("../controllers/theft.controller");
const { assignTheft, assignOfficer } = require("../utils/assignment");

router.post("/", checkAuth, addTheft, assignOfficer);
router.get("/", checkAuth, getAllThefts);
router.get("/:theftId", checkAuth, getOneTheft);

module.exports = router;
