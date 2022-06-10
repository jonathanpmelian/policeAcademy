const jwt = require("jsonwebtoken");

function tokenSign(email) {
  return jwt.sign(email, process.env.SECRET);
}

function tokenVerification(token) {
  return jwt.verify(token, process.env.SECRET);
}

module.exports = {
  tokenSign,
  tokenVerification,
};
