const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("../models/user.model");
const DepartmentModel = require("../models/department.model");
const res = require("express/lib/response");

async function createUser(name, surname, email, password, role) {
  try {
    const newUser = await UserModel.create({
      name,
      surname,
      email,
      password,
      role,
    });

    return newUser;
  } catch (err) {
    throw new Error(`Error creating user: ${err}`);
  }
}

async function assignDepartment(newUser, department, loggedUser) {
  try {
    const departmentFinded = await DepartmentModel.findById(
      department || loggedUser.department._id.toString()
    );

    departmentFinded.officers.push(newUser);
    newUser.department = departmentFinded.id;

    await departmentFinded.save();
    await newUser.save();
  } catch (err) {
    throw new Error(`Error assigning departmet: ${err}`);
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
  password = bcrypt.hashSync(password, parseInt(process.env.SALTROUNDS));
  return password;
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
  assignDepartment,
  tokenVerification,
};
