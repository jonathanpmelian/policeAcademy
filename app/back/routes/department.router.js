const router = require("express").Router();

const { checkAuth, checkDirector } = require("../utils/auth");
const { addDepartment } = require("../controllers/department.controller");

router.post("/", checkAuth, checkDirector, addDepartment);

module.exports = router;
