const UserModel = require("../models/user.model");

//Create
async function createUser(args) {
  try {
    const newUser = await UserModel.create(args);

    return newUser;
  } catch (err) {
    throw new Error(`Error creating user: ${err}`);
  }
}

//Read
async function findOneUser(args) {
  try {
    const user = await UserModel.findOne(args);

    return user;
  } catch (err) {
    throw new Error(`Error finding user: ${err}`);
  }
}

//Update

//Delete

module.exports = { createUser, findOneUser };
