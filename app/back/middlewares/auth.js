const { findOneUser } = require("../services/crud");
const { tokenVerification } = require("../services/token");

async function check(req, res, next) {
  try {
    if (req.headers.token) {
      const { email } = tokenVerification(req.headers.token);
      const user = await findOneUser({ email });
      if (!user) return res.status(400).send("Token not valid");

      res.locals.user = user;
      next();
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
    if (!req.headers.token) return res.status(401).send("User not logged in");
    const { email } = tokenVerification(req.headers.token);
    const user = await findOneUser({ email });
    if (!user) return res.status(400).send("Token not valid");

    res.locals.user = user;
    next();
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error authorizing user: ${err}`);
  }
}

async function checkAdmin(req, res, next) {
  if (res.locals.user.role !== "admin")
    return res.status(403).send(`User not Authorized`);
  else {
    next();
  }
}

async function checkDirector(req, res, next) {
  if (res.locals.user.role !== "director")
    return res.status(403).send(`User not Authorized`);
  else {
    next();
  }
}

async function checkOfficer(req, res, next) {
  if (res.locals.user.role !== "officer")
    return res.status(403).send(`User not Authorized`);
  else {
    next();
  }
}

async function checkUser(req, res, next) {
  if (res.locals.user.role !== "user")
    return res.status(403).send(`User not Authorized`);
  else {
    next();
  }
}

module.exports = {
  check,
  checkAuth,
  checkAdmin,
  checkDirector,
  checkOfficer,
  checkUser,
};
