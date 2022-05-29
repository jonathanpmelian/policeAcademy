const mongoose = require("mongoose");
const supertest = require("supertest");
let api = "";
let serv = "";

beforeAll(async () => {
  const { app, server } = await require("../index");
  api = supertest(app);
  serv = server;
});

describe("user is", () => {
  test("returned as JSON", async () => {
    await api
      .get("/api/user")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
});

afterAll(() => {
  mongoose.connection.close();
  serv.close();
});
