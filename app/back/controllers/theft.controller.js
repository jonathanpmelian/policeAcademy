const TheftModel = require("../models/theft.model");
const UserModel = require("../models/user.model");
const axios = require("axios");
const cors = require("cors");

async function addTheft(req, res, next) {
  try {
    const mapsData = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${req.body.address}&key=${process.env.MAPS_KEY}`
    );

    req.body.address = mapsData.data.results[0].formatted_address;
    req.body.geoPoints = [
      mapsData.data.results[0].geometry.location.lat,
      mapsData.data.results[0].geometry.location.lng,
    ];

    req.body.owner = res.locals.user.id;
    const stolenProduct = await TheftModel.create(req.body);

    const user = await UserModel.findById(res.locals.user.id);
    user.thefts.push(stolenProduct);

    res.locals.stolenProduct = stolenProduct;

    const data = await user.save();

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

    const thefts = await TheftModel.find(req.query)
      .populate({
        path: "owner",
        select: "name surname",
      })
      .populate({
        path: "assignation",
        select: "department",
        populate: { path: "department", select: "name" },
      })
      .select("-__v");

    res.status(200).json(thefts);
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error getting all my thefts: ${err}`);
  }
}

async function getOneTheft(req, res) {
  try {
    if (res.locals.user.role === "user") {
      const theft = await TheftModel.findById(req.params.theftId)
        .select("-__v")
        .populate({
          path: "owner",
          select: "name surname",
        })
        .populate({
          path: "assignation",
          select: "department",
          populate: { path: "department", select: "name" },
        });

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

async function theftResolved(req, res, next) {
  try {
    const theft = await TheftModel.findById(req.params.theftId);
    theft.status = "solved";
    res.locals.user.caseAssigned = null;

    await theft.save();
    await res.locals.user.save();

    next();
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error marking theft as resolved: ${err}`);
  }
}

module.exports = { addTheft, getAllThefts, getOneTheft, theftResolved };
