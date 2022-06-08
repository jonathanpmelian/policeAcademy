const UserModel = require("../models/user.model");
const { createUser } = require("../utils/auth");
const db = require("./db");
let mongod = null;

beforeAll(async () => await db.connect());
afterEach(async () => await db.clearDatabase());
afterAll(async () => await db.closeDatabase());

describe("Users created when", () => {
  test("All required params are included", async () => {
    const newUser = await createUser(
      "Jonathan",
      "Pulido",
      "jonatan@policeacademy.com",
      "1234"
    );

    const user = await UserModel.findById(newUser._id);

    expect(user.name).toEqual("Jonathan");
    expect(user.surname).toEqual("Pulido");
    expect(user.email).toEqual("jonatan@policeacademy.com");
  });
});
