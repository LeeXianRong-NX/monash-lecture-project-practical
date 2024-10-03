const {
  MockPersonHelper,
  MockSuperheroHelper,
  MockVillainHelper,
} = require("./");
const { MockSuperpowerHelper } = require("../superpower");
const { SUPERPOWER_PAPER } = require("../../../constants/superpower");
const { Person } = require("../../../classes");
const { mockPersonName, createMockPerson } = MockPersonHelper;
const { mockHeroName, createMockSuperhero } = MockSuperheroHelper;
const { mockVillainName, createMockVillain } = MockVillainHelper;
const { createMockSuperpower } = MockSuperpowerHelper;

describe("Character test helper functions", () => {
  describe("Person test helper functions", () => {
    test("should create mock person with mock name by default", () => {
      const mockPerson = createMockPerson();
      expect(mockPerson.getName()).toEqual(mockPersonName);
    });

    test("should create mock person with provided name", () => {
      const name = "Testy";
      const mockPerson = createMockPerson(name);
      expect(mockPerson.getName()).toEqual(name);
    });
  });

  describe("Superhero test helper functions", () => {
    test("should create mock superhero with mock person, name, & superpower by default", () => {
      const mockSuperhero = createMockSuperhero();
      expect(mockSuperhero.getSecretIdentity()).toEqual(createMockPerson());
      expect(mockSuperhero.getName()).toEqual(mockHeroName);
      expect(mockSuperhero.getSuperpower()).toEqual(createMockSuperpower());
    });

    test("should create mock superhero with provided superhero info", () => {
      const person = new Person("Bazinga");
      const name = "Super Testy";
      const superpower = createMockSuperpower(SUPERPOWER_PAPER);
      const mockSuperhero = createMockSuperhero(person, name, superpower);
      expect(mockSuperhero.getSecretIdentity()).toEqual(person);
      expect(mockSuperhero.getName()).toEqual(name);
      expect(mockSuperhero.getSuperpower()).toEqual(superpower);
    });
  });

  describe("Villain test helper functions", () => {
    test("should create mock villain with mock person, name, & superpower by default", () => {
      const mockVillain = createMockVillain();
      expect(mockVillain.getSecretIdentity()).toEqual(createMockPerson());
      expect(mockVillain.getName()).toEqual(mockVillainName);
      expect(mockVillain.getSuperpower()).toEqual(createMockSuperpower());
    });

    test("should create mock villain with provided superhero info", () => {
      const person = new Person("Bazinga");
      const name = "Evil Testy";
      const superpower = createMockSuperpower(SUPERPOWER_PAPER);
      const mockVillain = createMockVillain(person, name, superpower);
      expect(mockVillain.getSecretIdentity()).toEqual(person);
      expect(mockVillain.getName()).toEqual(name);
      expect(mockVillain.getSuperpower()).toEqual(superpower);
    });
  });
});
