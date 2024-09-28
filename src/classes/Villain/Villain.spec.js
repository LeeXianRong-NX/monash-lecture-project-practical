const { VILLAIN_SELF_INTRO_MSG } = require("../../constants/character");
const { SUPERPOWER_SCISSORS } = require("../../constants/superpower");
const { interpolate } = require("../../utils/string");
const Person = require("../Person/Person");
const Superpower = require("../Superpower/Superpower");
const Villain = require("./Villain");

/** @type {import("../Superpower/Superpower").SuperpowerInfo} */
const mockSuperpowerInfo = {
  name: "Flight",
  description: "Can hover and fly in the air",
  power: SUPERPOWER_SCISSORS,
};
const mockPerson = new Person("Mocky");
const mockVillainName = "Evil Mocky";
const mockSuperpower = new Superpower(
  mockSuperpowerInfo.name,
  mockSuperpowerInfo.description,
  mockSuperpowerInfo.power
);
function createMockVillain() {
  return new Villain(mockPerson, mockVillainName, mockSuperpower);
}

describe("Villain class", () => {
  /** @type {Villain} */
  let villain;

  beforeEach(() => {
    villain = createMockVillain();
  });

  test("should create Villain instance", () => {
    expect(villain).toBeDefined();
  });

  test("should get Villain name", () => {
    const villainName = villain.getName();
    expect(villainName).toEqual(mockVillainName);
  });

  test("should get self introduction message", () => {
    const selfIntro = villain.getSelfIntroduction();
    expect(selfIntro).toEqual(
      interpolate(VILLAIN_SELF_INTRO_MSG, { name: mockVillainName })
    );
  });

  test("should get Villain secret identity", () => {
    const secretIdentity = villain.getSecretIdentity();
    expect(secretIdentity).toEqual(mockPerson);
  });

  test("should get Villain superpower", () => {
    const superpower = villain.getSuperpower();
    expect(superpower).toEqual(mockSuperpower);
  });
});
