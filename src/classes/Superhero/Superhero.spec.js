const { SUPERHERO_SELF_INTRO_MSG } = require("../../constants/character");
const {
  MockSuperheroHelper,
  MockPersonHelper,
  MockSuperpowerHelper,
} = require("../../helper/test");
const { interpolate } = require("../../utils/string");
const Superhero = require("./Superhero");

const { mockHeroName, createMockSuperhero } = MockSuperheroHelper;
const mockPerson = MockPersonHelper.createMockPerson();
const mockSuperpower = MockSuperpowerHelper.createMockSuperpower();

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
      interpolate(SUPERHERO_SELF_INTRO_MSG, {
        name: mockHeroName,
      })
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
