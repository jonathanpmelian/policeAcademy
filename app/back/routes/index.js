const router = require("express").Router();

const authRouter = require("./auth.router");
const userRouter = require("./user.router");
const theftRouter = require("./theft.router");
const departmentRouter = require("./department.router");

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/thefts", theftRouter);
router.use("/department", departmentRouter);

module.exports = router;
