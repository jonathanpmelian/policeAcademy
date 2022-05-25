const UserModel = require("../models/user.model");

async function assignTheft(req, res) {
  try {
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error assigning officer: ${err}`);
  }
}

async function assignOfficer(req, res) {
  try {
    const officer = await UserModel.findOne({
      role: "officer",
      caseAssigned: null,
    });

    if (officer) {
      officer.caseAssigned = res.locals.stolenProduct.id;
      res.locals.stolenProduct.status = "assigned";
      await officer.save();
      await res.locals.stolenProduct.save();
    }

    res.status(200).json(res.locals.stolenProduct);
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error assigning case: ${err}`);
  }
}

module.exports = { assignTheft, assignOfficer };
