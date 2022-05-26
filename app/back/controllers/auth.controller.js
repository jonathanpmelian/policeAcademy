const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
const DepartmentModel = require("../models/department.model");

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

    req.body.password = bcrypt.hashSync(
      req.body.password,
      parseInt(process.env.SALTROUNDS)
    );

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

      const token = jwt.sign({ email: user.email }, process.env.SECRET);

      res.status(200).json({ token });
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

    bcrypt.compare(req.body.password, user.password, (err) => {
      if (err) return res.status(500).send(`Email or password not valid`);

      const token = jwt.sign({ email: user.email }, process.env.SECRET);

      res.status(200).json({ token });
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error login user: ${err}`);
  }
}

module.exports = {
  signup,
  login,
};
