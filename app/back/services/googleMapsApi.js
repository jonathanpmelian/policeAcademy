const axios = require("axios");
const res = require("express/lib/response");

async function setAddress(req) {
  try {
    const mapsData = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${req.body.address}&key=${process.env.MAPS_KEY}`
    );

    req.body.address = mapsData.data.results[0].formatted_address;
    req.body.geoPoints = [
      mapsData.data.results[0].geometry.location.lat,
      mapsData.data.results[0].geometry.location.lng,
    ];

    return req.body;
  } catch (err) {
    res.status(500).send(`Error getting address from google api: ${err}`);
  }
}

module.exports = {
  setAddress,
};
