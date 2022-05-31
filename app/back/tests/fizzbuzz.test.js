const fizzBuzz = require("../utils/fizzbuzz");

describe("Fizzbuzz should", () => {
  test("return the same number as passed", () => {
    expect(fizzBuzz(2)).toBe(2);
    expect(fizzBuzz(1)).toBe(1);
  });

  test("return Fizz if divisible by 3", () => {
    expect(fizzBuzz(3)).toBe("Fizz");
  });

  test("return Buzz if divisible by 5", () => {
    expect(fizzBuzz(5)).toBe("Buzz");
  });

  test("return FizzBuzz if divisible by 5 and 3", () => {
    expect(fizzBuzz(15)).toBe("FizzBuzz");
  });
});
