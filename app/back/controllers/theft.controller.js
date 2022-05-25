const TheftModel = require("../models/theft.model");
const UserModel = require("../models/user.model");

async function addTheft(req, res, next) {
  try {
    req.body.owner = res.locals.user.id;
    const stolenProduct = await TheftModel.create(req.body);

    const user = await UserModel.findById(res.locals.user.id);
    user.thefts.push(stolenProduct);
    await user.save();

    res.locals.stolenProduct = stolenProduct;
    next();
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error adding new theft: ${err}`);
  }
}

async function getAllThefts(req, res) {
  try {
    if (res.locals.user.role === "user") {
      const user = await UserModel.findById(res.locals.user.id).populate({
        path: "thefts",
        select: ["-owner", "-__v"],
      });

      return res.status(200).json(user.thefts);
    }

    const thefts = await TheftModel.find();

    res.status(200).json(thefts);
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error getting all my thefts: ${err}`);
  }
}

async function getOneTheft(req, res) {
  try {
    if (res.locals.user.role === "user") {
      const theft = await TheftModel.findById(req.params.theftId).select(
        "-__v -owner"
      );

      return res.status(200).json(theft);
    }

    const theft = await TheftModel.findById(req.params.theftId).populate({
      path: "owner",
      select: "name surname",
    });

    res.status(200).json(theft);
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error getting theft: ${err}`);
  }
}

module.exports = { addTheft, getAllThefts, getOneTheft };
