const UserModel = require("../models/user.model");
const { createUser } = require("../utils/auth");
const db = require("./db");

beforeAll(async () => await db.connect());
afterEach(async () => await db.clearDatabase());
afterAll(async () => await db.closeDatabase());

describe("Users created when", () => {
  test("all required params are included", async () => {
    const newUser = await createUser(
      "Jonathan",
      "Pulido",
      "jonathan@policeacademy.com",
      "1234"
    );

    expect(newUser.name).toEqual("Jonathan");
    expect(newUser.surname).toEqual("Pulido");
    expect(newUser.email).toEqual("jonathan@policeacademy.com");
  });
});

describe("Errors thrown when", () => {
  test("email repeated", async () => {
    await createUser(
      "Jonathan",
      "Pulido",
      "jonathan@policeacademy.com",
      "1234"
    );

    await expect(
      createUser("Leo", "Messi", "jonathan@policeacademy.com", "1234")
    ).rejects.toThrow();
  });
});
