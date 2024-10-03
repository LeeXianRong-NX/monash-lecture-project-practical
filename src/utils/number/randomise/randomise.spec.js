const { randomise } = require(".");

describe("Randomise number utility function", () => {
  test("return randome number within provided min and max range", () => {
    let min = 0;
    let max = 3;
    let random = randomise(min, max);
    expect(random).toBeGreaterThanOrEqual(min);
    expect(random).toBeLessThanOrEqual(max);

    min = 1;
    max = 5;
    random = randomise(min, max);
    expect(random).toBeGreaterThanOrEqual(min);
    expect(random).toBeLessThanOrEqual(max);
  });
});
