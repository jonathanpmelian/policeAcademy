const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("../models/user.model");
const DepartmentModel = require("../models/department.model");
const res = require("express/lib/response");

async function createUser(name, surname, email, password, role, department) {
  try {
    const newUser = await UserModel.create({
      name,
      surname,
      email,
      password,
      role,
      department,
    });

    return newUser;
  } catch (err) {
    throw new Error(`Error creating user: ${err}`);
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

function hashPassword(password) {
  return bcrypt.hashSync(password, parseInt(process.env.SALTROUNDS));
}

function comparePassword(req, res, user) {
  bcrypt.compare(req.body.password, user.password, (err, result) => {
    if (err) return res.status(500).send(`Error checking password: ${err}`);
    if (!result) return res.status(500).send(`Email or password not valid`);

    const token = jwt.sign({ email: user.email }, process.env.SECRET);

    return res.status(200).json({ token });
  });
}

module.exports = {
  createUser,
  hashPassword,
  comparePassword,
  assignDepartmentToOfficer,
  assignOfficerToDepartment,
  tokenVerification,
};
