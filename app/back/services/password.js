const bcrypt = require("bcrypt");

function hashPassword(password) {
  return bcrypt.hashSync(password, parseInt(process.env.SALTROUNDS));
}

async function comparePassword(bodyPassword, userPassword) {
  return await bcrypt.compare(bodyPassword, userPassword);
}

module.exports = { hashPassword, comparePassword };
