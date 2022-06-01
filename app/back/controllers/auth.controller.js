const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
const DepartmentModel = require("../models/department.model");
const { hashPassword, comparePassword } = require("../utils/auth");

async function signup(req, res, next) {
  try {
    if (
      (!res.locals.user ||
        (res.locals.user.role !== "admin" &&
          res.locals.user.role !== "director")) &&
      req.body.role
    ) {
      return res.status(400).send(`User not authorized`);
    }

    hashPassword(req);

    if (req.body.role === "officer") {
      const department = await DepartmentModel.findById(
        req.body.department || res.locals.user.department._id.toString()
      );

      if (department) {
        const officer = await UserModel.create(req.body);
        department.officers.push(officer);
        officer.department = department.id;

        await department.save();
        await officer.save();
        res.locals.officer = officer;

        next();
      } else {
        return res.status(500).send("Invalid department");
      }
    } else {
      const user = await UserModel.create(req.body);

      if (user.role === "user") {
        const token = jwt.sign({ email: user.email }, process.env.SECRET);

        return res.status(200).json({ token });
      }
      res.status(200).json(user);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error creating user: ${err}`);
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
