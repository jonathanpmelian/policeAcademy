const router = require("express").Router();

const { checkAuth, checkDirector } = require("../utils/index");
const { addDepartment } = require("../controllers/department.controller");

router.post("/", checkAuth, checkDirector, addDepartment);

module.exports = router;