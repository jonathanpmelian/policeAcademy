const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("../models/user.model");

async function tokenVerification(req, res, next) {
  jwt.verify(req.headers.token, process.env.SECRET, async (err, decoded) => {
    if (err) return res.status(500).send("Token not valid");

    const user = await UserModel.findOne({ email: decoded.email });

    if (!user) return res.status(500).send("Token not valid");
    else {
      res.locals.user = user;
      next();
    }
  });
}

function hashPassword(req) {
  req.body.password = bcrypt.hashSync(
    req.body.password,
    parseInt(process.env.SALTROUNDS)
  );

  return req.body.password;
}

function comparePassword(req, res, user) {
  bcrypt.compare(req.body.password, user.password, (err, result) => {
    if (err) return res.status(500).send(`Error checking password: ${err}`);
    if (!result) return res.status(500).send(`Email or password not valid`);

    const token = jwt.sign({ email: user.email }, process.env.SECRET);

    return res.status(200).json({ token });
  });
}

async function check(req, res, next) {
  try {
    if (req.headers.token) {
      tokenVerification(req, res, next);
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error checking user: ${err}`);
  }
}

async function checkAuth(req, res, next) {
  try {
    if (!req.headers.token) return res.status(500).send("User not logged in");
    tokenVerification(req, res, next);
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error authorizing user: ${err}`);
  }
}

async function checkAdmin(req, res, next) {
  if (res.locals.user.role !== "admin")
    return res.status(500).send(`User not Authorized`);
  else {
    next();
  }
}

async function checkDirector(req, res, next) {
  if (res.locals.user.role !== "director")
    return res.status(500).send(`User not Authorized`);
  else {
    next();
  }
}

async function checkOfficer(req, res, next) {
  if (res.locals.user.role !== "officer")
    return res.status(500).send(`User not Authorized`);
  else {
    next();
  }
}

module.exports = {
  hashPassword,
  comparePassword,
  check,
  checkAuth,
  checkAdmin,
  checkDirector,
  checkOfficer,
};
