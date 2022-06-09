const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("../models/user.model");
const DepartmentModel = require("../models/department.model");

async function createUser(
  name,
  surname,
  email,
  password,
  role,
  department,
  loggedUser
) {
  try {
    if (
      (!loggedUser ||
        (loggedUser.role !== "admin" && loggedUser.role !== "director")) &&
      role
    )
      throw new Error("User not authorized");

    hashPassword(password);

    if (role === "officer") {
      const department = await DepartmentModel.findById(
        department || loggedUser.department._id.toString()
      );

      if (department) {
        const newUser = await UserModel.create({
          name,
          surname,
          email,
          password,
          role,
          department,
        });

        department.officers.push(newUser);
        newUser.department = department.id;

        await department.save();
        await newUser.save();

        return newUser;
      }

      throw new Error("Invalid department");
    }

    const newUser = await UserModel.create({
      name,
      surname,
      email,
      password,
      role,
    });

    return newUser;
  } catch (err) {
    throw err;
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
};
