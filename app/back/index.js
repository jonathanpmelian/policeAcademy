process.stdout.write("\x1B[2J\x1B[0f");
require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const { NODE_ENV } = process.env;
const mongoose = require("mongoose");
// const corsOptions = {
//   origin: "http://localhost:3000",
//   credentials: true,
//   optionSuccessStatus: 200,
// };

module.exports = (async function () {
  try {
    await mongoose.connect(
      NODE_ENV === "test"
        ? "mongodb://localhost:27017/"
        : process.env.MONGO_URL,
      {
        dbName: process.env.MONGO_DB || "policeAcademy",
      }
    );
    console.log("💾 Connected to DB");
  } catch (err) {
    throw new Error(`Error connecting to DB: ${err}`);
  }

  try {
    const app = express()
      .use(cors())
      .use(morgan("dev"))
      .use(express.json())
      .use("/api", require("./routes/index"));

    const PORT = process.env.PORT || 8080;
    const server = app.listen(PORT, (err) => {
      if (err) {
        console.log(err);
      }
      console.info(">".repeat(40));
      console.info("🚲   PoliceAcademy Server Live");
      console.info(`📡  PORT: http://localhost:${PORT}`);
      console.info(">".repeat(40) + "\n");
    });
    return { app, server };
  } catch (err) {
    console.log(err);
  }
})();
