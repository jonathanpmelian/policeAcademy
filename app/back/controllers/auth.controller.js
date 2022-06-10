const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
const DepartmentModel = require("../models/department.model");
const { hashPassword, comparePassword } = require("../services/password");
const { tokenSign } = require("../services/token");
const { createUser, findOneUser } = require("../services/crud");
const {
  assignTheft,
  assignDepartmentToOfficer,
  assignOfficerToDepartment,
} = require("../services/assignment");

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

    const newUser = await createUser({
      name,
      surname,
      email,
      password,
      role,
      department,
    });

    if (newUser.role === "officer") {
      await assignOfficerToDepartment(newUser);
      await assignTheft(newUser);
    }

    if (newUser.role === "user") {
      const token = tokenSign({ email });

      return res.status(200).json({ token });
    }

    res.status(200).json(newUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
}

async function login(req, res) {
  const email = req.body.email;
  const bodyPassword = req.body.password;
  try {
    const user = await findOneUser({ email });
    if (!user) return res.status(400).send(`Email or password not valid`);

    const comparePass = await comparePassword(bodyPassword, user.password);
    if (!comparePass)
      return res.status(400).send(`Email or password not valid`);

    const token = tokenSign({ email });

    res.status(200).json({ token });
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error login user: ${err}`);
  }
}

module.exports = {
  signup,
  login,
};
