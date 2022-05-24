const DepartmentModel = require("../models/department.model");
const UserModel = require("../models/user.model");

async function addDepartment(req, res) {
  try {
    req.body.director = res.locals.user.id;
    const department = await DepartmentModel.create(req.body);

    const user = await UserModel.findById(res.locals.user.id);
    user.department = department;
    await user.save();

    res.status(200).json(department);
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error adding department: ${err}`);
  }
}

module.exports = { addDepartment };
