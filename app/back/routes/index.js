const router = require("express").Router();

const authRouter = require("./auth.router");
const userRouter = require("./user.router");
const theftRouter = require("./theft.router");

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/thefts", theftRouter);

module.exports = router;
