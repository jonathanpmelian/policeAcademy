const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
let mongod = null;

module.exports.connect = async () => {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  await mongoose.connect(uri);
};

module.exports.clearDatabase = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
};

module.exports.closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
  mongod.stop();
};
