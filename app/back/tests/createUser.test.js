const UserModel = require("../models/user.model");
const { createUser } = require("../services/crud");
const db = require("./db");

beforeAll(async () => await db.connect());
afterEach(async () => await db.clearDatabase());
afterAll(async () => await db.closeDatabase());

describe("Data is created when", () => {
  test("all required params are included", async () => {
    const newUser = await createUser({
      name: "Jonathan",
      surname: "Pulido",
      email: "jonathan@policeacademy.com",
      password: "1234",
    });

    expect(newUser.name).toEqual("Jonathan");
    expect(newUser.surname).toEqual("Pulido");
    expect(newUser.email).toEqual("jonathan@policeacademy.com");
    expect(newUser.role).toEqual("user");
  });
});

describe("Errors thrown when", () => {
  test("email repeated", async () => {
    await createUser({
      name: "Leo",
      surname: "Messi",
      email: "messi@policeacademy.com",
      password: "1234",
    });

    await expect(
      createUser({
        name: "Jonathan",
        surname: "Pulido",
        email: "messi@policeacademy.com",
        password: "1234",
      })
    ).rejects.toThrow();
  });

  test("missed required params", async () => {
    await expect(
      createUser({
        name: "Jonathan",
        email: "jonathan@policeacademy.com",
        password: "1234",
      })
    ).rejects.toThrow("Surname is required");
  });
});
