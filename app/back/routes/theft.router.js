const router = require("express").Router();

const { checkAuth, checkOfficer, checkUser } = require("../middlewares/auth");
const {
  addTheft,
  getAllThefts,
  getOneTheft,
  theftResolved,
} = require("../controllers/theft.controller");
const { assignOfficer, assignTheft } = require("../services/assignment");

router.post("/", checkAuth, checkUser, addTheft, assignOfficer);
router.get("/", checkAuth, getAllThefts);
router.get("/:theftId", checkAuth, getOneTheft);
router.put("/:theftId", checkAuth, checkOfficer, theftResolved, assignTheft);

module.exports = router;
