const { SUPERPOWER_PAPER } = require("../../../constants/superpower");
const { MockSuperpowerHelper } = require("./");
const { createMockSuperpower, mockSuperpowerInfo } = MockSuperpowerHelper;

describe("Superpower test helper functions", () => {
  test("should create mock superpower with mock superpower info by default", () => {
    const mockSuperpower = createMockSuperpower();
    expect(mockSuperpower.getInfo()).toEqual(mockSuperpowerInfo);
  });

  test("should create mock superpower with provided superpower info", () => {
    const name = "X-Ray Vision";
    const description = "Incredible sight that penetrates all walls";
    const power = SUPERPOWER_PAPER;
    const mockSuperpower = createMockSuperpower(name, description, power);
    expect(mockSuperpower.getName()).toEqual(name);
    expect(mockSuperpower.getDescription()).toEqual(description);
    expect(mockSuperpower.getPower()).toEqual(power);
  });
});
