const { capitalize, capitalizeAllWords } = require("./");

describe("Capitalize string utility function", () => {
  test("should capitalize first character of string", () => {
    const text = "mocky was here.";
    const result = capitalize(text);
    expect(result).toEqual("Mocky was here.");
  });

  test("should return empty string if empty string provided", () => {
    const result = capitalize("");
    expect(result).toEqual("");
  });

  test("should return original string if first character is non-alphabet", () => {
    const text1 = "? mocky was here.";
    const result1 = capitalize(text1);
    expect(result1).toEqual(text1);

    const text2 = "1 mocky was here.";
    const result2 = capitalize(text2);
    expect(result2).toEqual(text2);
  });
});

describe("Capitalize all words string utility function", () => {
  test("should capitalize first character of all words in string", () => {
    const text = "mocky was here.";
    const result = capitalizeAllWords(text);
    expect(result).toEqual("Mocky Was Here.");
  });
});
