const { SUPERHERO_SELF_INTRO_MSG } = require("../../constants/character");
const { SUPERPOWER_SCISSORS } = require("../../constants/superpower");
const { interpolate } = require("../../utils/string");
const Person = require("../Person/Person");
const Superpower = require("../Superpower/Superpower");
const Superhero = require("./Superhero");

/** @type {import("../Superpower/Superpower").SuperpowerInfo} */
const mockSuperpowerInfo = {
  name: "Flight",
  description: "Can hover and fly in the air",
  power: SUPERPOWER_SCISSORS,
};
const mockPerson = new Person("Mocky");
const mockHeroName = "Super Mocky";
const mockSuperpower = new Superpower(
  mockSuperpowerInfo.name,
  mockSuperpowerInfo.description,
  mockSuperpowerInfo.power
);
function createMockSuperhero() {
  return new Superhero(mockPerson, mockHeroName, mockSuperpower);
}

describe("Superhero class", () => {
  /** @type {Superhero} */
  let superhero;

  beforeEach(() => {
    superhero = createMockSuperhero();
  });

  test("should create Superhero instance", () => {
    expect(superhero).toBeDefined();
  });

  test("should get Superhero name", () => {
    const heroName = superhero.getName();
    expect(heroName).toEqual(mockHeroName);
  });

  test("should get self introduction message", () => {
    const selfIntro = superhero.getSelfIntroduction();
    expect(selfIntro).toEqual(
      interpolate(SUPERHERO_SELF_INTRO_MSG, { name: mockHeroName })
    );
  });

  test("should get Superhero secret identity", () => {
    const secretIdentity = superhero.getSecretIdentity();
    expect(secretIdentity).toEqual(mockPerson);
  });

  test("should get Superhero superpower", () => {
    const superpower = superhero.getSuperpower();
    expect(superpower).toEqual(mockSuperpower);
  });
});
