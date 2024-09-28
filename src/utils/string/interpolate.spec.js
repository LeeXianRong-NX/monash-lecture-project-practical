const { interpolate } = require("./interpolate");

describe("Interpolate string utility function", () => {
  test("should replace placeholder key in string", () => {
    const text = "My name is {{name}}";
    const params = {
      name: "Mocky",
    };

    const result = interpolate(text, params);
    expect(result).toEqual("My name is Mocky");
  });

  test("should replace all same placeholder keys in string", () => {
    const text = "My name is {{name}}. My friends call me {{name}}";
    const params = {
      name: "Mocky",
    };

    const result = interpolate(text, params);
    expect(result).toEqual("My name is Mocky. My friends call me Mocky");
  });

  test("should return same string if no placeholder keys found", () => {
    const text = "My name is Mocky";
    const params = {};

    const result = interpolate(text, params);
    expect(result).toEqual("My name is Mocky");
  });
});
