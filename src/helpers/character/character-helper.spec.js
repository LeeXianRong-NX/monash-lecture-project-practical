const {
  createPersonObject,
  createSuperheroObject,
  createVillainObject,
  createDefaultVillain,
} = require("./");
const { PRESET_SUPERPOWERS } = require("../superpower");
const { randomise } = require("../../utils/number/randomise");
const {
  DEFAULT_VILLAIN__NAME,
  DEFAULT_VILLAIN_PERSON_NAME,
} = require("../../constants/character");

jest.mock("../../utils/number/randomise", () => ({
  randomise: jest.fn().mockReturnValue(0),
}));

describe("Character helper functions", () => {
  const name = "Mocky";
  const superpower = PRESET_SUPERPOWERS.FLIGHT;

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should create Person object", () => {
    const person = createPersonObject(name);
    expect(person).toBeDefined();
    expect(person.getName()).toEqual(name);
  });

  test("should create Superhero object", () => {
    const heroName = `Super ${name}`;
    const superhero = createSuperheroObject(name, heroName, superpower);
    expect(superhero).toBeDefined();
    expect(superhero.getSecretIdentity().getName()).toEqual(name);
    expect(superhero.getName()).toEqual(heroName);
    expect(superhero.getSuperpower()).toEqual(superpower);
  });

  test("should create Villain object", () => {
    const villainName = `Evil ${name}`;
    const villain = createVillainObject(name, villainName, superpower);
    expect(villain).toBeDefined();
    expect(villain.getSecretIdentity().getName()).toEqual(name);
    expect(villain.getName()).toEqual(villainName);
    expect(villain.getSuperpower()).toEqual(superpower);
  });

  test("should create default Villain object with randome superpower", () => {
    const superpowers = Object.values(PRESET_SUPERPOWERS);
    const villain = createDefaultVillain();
    expect(randomise).toHaveBeenCalledWith(0, superpowers.length - 1);
    expect(villain).toBeDefined();
    expect(villain.getSecretIdentity().getName()).toEqual(
      DEFAULT_VILLAIN_PERSON_NAME
    );
    expect(villain.getName()).toEqual(DEFAULT_VILLAIN__NAME);
    expect(villain.getSuperpower()).toEqual(superpowers[0]);
  });
});
