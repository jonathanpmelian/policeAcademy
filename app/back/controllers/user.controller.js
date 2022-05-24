const UserModel = require("../models/user.model");

async function viewMyProfile(req, res) {
  try {
    const user = await UserModel.findById(res.locals.user.id).select(
      "-__v -bikes -password"
    );

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error getting user profile: ${err}`);
  }
}

module.exports = { viewMyProfile };
