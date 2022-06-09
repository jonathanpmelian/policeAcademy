const supertest = require("supertest");
const UserModel = require("../models/user.model");
const { createUser } = require("../utils/auth");
const db = require("./db");
let api = null;
let serverTest = null;

beforeAll(async () => {
  await db.connect();
  const { app, server } = await require("../index");
  serverTest = server;
  api = supertest(app);
});
afterEach(async () => await db.clearDatabase());
afterAll(async () => {
  await db.closeDatabase();
  await serverTest.close();
});

describe("User signup when", () => {
  test("includes all the required params", async () => {
    await api
      .post("/api/auth/signup")
      .send({
        name: "Leo",
        surname: "Messi",
        email: "leomessi@policeacademy.com",
        password: "1234",
      })
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
});

describe("Errors thrown when", () => {
  test("an unregistered user tries to assign a role", async () => {
    await api
      .post("/api/auth/signup")
      .send({
        name: "Leo",
        surname: "Messi",
        email: "leomessi@policeacademy.com",
        password: "1234",
        role: "director",
      })
      .expect(403);
  });
});
