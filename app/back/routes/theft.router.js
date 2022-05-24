const router = require("express").Router();

const { checkAuth } = require("../utils/index");
const {
  addTheft,
  getAllThefts,
  getOneTheft,
} = require("../controllers/theft.controller");

router.post("/", checkAuth, addTheft);
router.get("/", checkAuth, getAllThefts);
router.get("/:theftId", checkAuth, getOneTheft);

module.exports = router;
