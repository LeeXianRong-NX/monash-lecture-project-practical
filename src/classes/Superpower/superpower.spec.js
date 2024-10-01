const { MockSuperpowerHelper } = require("../../helper/test");
const Superpower = require("./");

const { mockSuperpowerInfo, createMockSuperpower } = MockSuperpowerHelper;

describe("Superpower class", () => {
  /** @type {Superpower} */
  let superpower;

  beforeEach(() => {
    superpower = createMockSuperpower();
  });

  test("should create Superpower instance", () => {
    expect(superpower).toBeDefined();
  });

  test("should get superpower name", () => {
    const name = superpower.getName();
    expect(name).toEqual(mockSuperpowerInfo.name);
  });

  test("should get superpower description", () => {
    const description = superpower.getDescription();
    expect(description).toEqual(mockSuperpowerInfo.description);
  });

  test("should get superpower power value", () => {
    const power = superpower.getPower();
    expect(power).toEqual(mockSuperpowerInfo.power);
  });

  test("should get superpower info", () => {
    const info = superpower.getInfo();
    expect(info).toEqual(mockSuperpowerInfo);
  });
});
