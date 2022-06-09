const TheftModel = require("../models/theft.model");
const UserModel = require("../models/user.model");

async function assignTheft(user) {
  try {
    const theft = await TheftModel.findOne({ status: "pending" });
    const officer = user;

    if (theft) {
      theft.status = "assigned";
      theft.assignation = officer.id;
      officer.caseAssigned = theft.id;

      await officer.save();
      await theft.save();
    }
  } catch (err) {
    throw new Error(`Error assigning Theft: ${err}`);
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
      res.locals.stolenProduct.assignation = officer.id;
      await officer.save();
      await res.locals.stolenProduct.save();
    }

    res.status(200).json(res.locals.stolenProduct);
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error assigning Officer: ${err}`);
  }
}

module.exports = { assignTheft, assignOfficer };
