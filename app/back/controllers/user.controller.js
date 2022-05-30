const UserModel = require("../models/user.model");

async function viewMyProfile(req, res) {
  try {
    if (res.locals.user.role !== "user") {
      const user = await UserModel.findById(res.locals.user.id).select(
        "-__v -thefts -password"
      );
      return res.status(200).json(user);
    }
    const user = await UserModel.findById(res.locals.user.id)
      .select("-__v -password -caseAssigned -department")
      .populate({ path: "thefts" });

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error getting user profile: ${err}`);
  }
}

module.exports = { viewMyProfile };
