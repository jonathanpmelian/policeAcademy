const router = require("express").Router();

const { checkAuth, checkOfficer } = require("../utils/auth");
const {
  addTheft,
  getAllThefts,
  getOneTheft,
  theftResolved,
} = require("../controllers/theft.controller");
const { assignOfficer, assignTheft } = require("../utils/assignment");

router.post("/", checkAuth, addTheft, assignOfficer);
router.get("/", checkAuth, getAllThefts);
router.get("/:theftId", checkAuth, getOneTheft);
router.put("/:theftId", checkAuth, checkOfficer, theftResolved, assignTheft);

module.exports = router;
