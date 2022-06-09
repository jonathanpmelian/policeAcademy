const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
const DepartmentModel = require("../models/department.model");
const {
  hashPassword,
  comparePassword,
  createUser,
  assignDepartmentToOfficer,
  assignOfficerToDepartment,
} = require("../utils/auth");
const { assignTheft } = require("../utils/assignment");

async function signup(req, res) {
  let { name, surname, email, password, role, department } = req.body;
  const loggedUser = res.locals.user;

  try {
    if (
      (!loggedUser ||
        (loggedUser.role !== "admin" && loggedUser.role !== "director")) &&
      role
    )
      return res.status(403).send("User not authorized");

    password = hashPassword(password);

    if (role === "officer")
      department = await assignDepartmentToOfficer(department, loggedUser);

    const newUser = await createUser(
      name,
      surname,
      email,
      password,
      role,
      department
    );

    if (newUser.role === "officer") {
      await assignOfficerToDepartment(newUser);
      await assignTheft(newUser);
    }

    if (newUser.role === "user") {
      const token = jwt.sign({ email: newUser.email }, process.env.SECRET);

      return res.status(200).json({ token });
    }

    res.status(200).json(newUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
}

async function login(req, res) {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) return res.status(500).send(`Email or password not valid`);

    return comparePassword(req, res, user);
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error login user: ${err}`);
  }
}

module.exports = {
  signup,
  login,
};
