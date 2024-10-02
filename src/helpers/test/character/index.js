const { Person, Superhero, Villain } = require("../../../classes");
const { MockSuperpowerHelper } = require("../superpower");
const { createMockSuperpower } = MockSuperpowerHelper;

// Helper function to mock Person object
const mockPersonName = "Mocky";
function createMockPerson(name = mockPersonName) {
  return new Person(name);
}

// Helper function to mock Superhero object
const mockHeroName = "Super Mocky";
function createMockSuperhero(
  person = createMockPerson(),
  name = mockHeroName,
  superpower = createMockSuperpower()
) {
  return new Superhero(person, name, superpower);
}

// Helper function to mock Villain object
const mockVillainName = "Evil Mocky";
function createMockVillain(
  person = createMockPerson(),
  name = mockVillainName,
  superpower = createMockSuperpower()
) {
  return new Villain(person, name, superpower);
}

exports.MockPersonHelper = { mockPersonName, createMockPerson };
exports.MockSuperheroHelper = { mockHeroName, createMockSuperhero };
exports.MockVillainHelper = { mockVillainName, createMockVillain };
