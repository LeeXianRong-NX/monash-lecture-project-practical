const { VILLAIN_SELF_INTRO_MSG } = require("../../constants/character");
const {
  MockVillainHelper,
  MockPersonHelper,
  MockSuperpowerHelper,
} = require("../../helper/test");
const { interpolate } = require("../../utils/string");
const Villain = require("./");

const { mockVillainName, createMockVillain } = MockVillainHelper;
const mockPerson = MockPersonHelper.createMockPerson();
const mockSuperpower = MockSuperpowerHelper.createMockSuperpower();

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
