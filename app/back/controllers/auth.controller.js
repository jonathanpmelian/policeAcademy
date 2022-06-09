const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
const DepartmentModel = require("../models/department.model");
const { hashPassword, comparePassword, createUser } = require("../utils/auth");

async function signup(req, res, next) {
  const { name, surname, email, password, role, department } = req.body;
  const loggedUser = res.locals.user;

  try {
    const newUser = await createUser(
      name,
      surname,
      email,
      password,
      role,
      department,
      loggedUser
    );

    if (newUser.role === "officer") {
      res.locals.newUser = newUser;
      next();
    }

    if (newUser.role === "user") {
      const token = jwt.sign({ email: newUser.email }, process.env.SECRET);

      return res.status(200).json({ token });
    }

    res.status(200).json(newUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `Error creating user: ${err.message}` });
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
