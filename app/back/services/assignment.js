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

      await theft.save();
      await officer.save();
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

async function assignDepartmentToOfficer(department, loggedUser) {
  try {
    const departmentFinded = await DepartmentModel.findById(
      department || loggedUser.department._id.toString()
    );

    department = departmentFinded.id;

    return department;
  } catch (err) {
    throw new Error(`Error assigning departmet: ${err}`);
  }
}

async function assignOfficerToDepartment(newUser) {
  try {
    const department = await DepartmentModel.findById(newUser.department);
    department.officers.push(newUser);

    await department.save();
  } catch (err) {
    throw new Error(`Error assigning officer to department: ${err}`);
  }
}

module.exports = {
  assignTheft,
  assignOfficer,
  assignDepartmentToOfficer,
  assignOfficerToDepartment,
};
