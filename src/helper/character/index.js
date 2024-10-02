const { Person, Superpower, Superhero, Villain } = require("../../classes");
const {
  DEFAULT_VILLAIN_PERSON_NAME,
  DEFAULT_VILLAIN__NAME,
} = require("../../constants/character");
const {
  SUPERPOWER_1_KEY,
  SUPERPOWER_2_KEY,
  SUPERPOWER_3_KEY,
} = require("../../constants/keys");
const { randomise } = require("../../utils/number/randomise");
const { getSuperpowerFromKeySelection } = require("../superpower");

/**
 * Helper to create Person object
 * @param {string} name - String person name
 * @returns {Person}
 */
function createPersonObject(name) {
  return new Person(name);
}

/**
 * Helper to create Superhero object
 * @param {string} personName - String person name
 * @param {string} heroName - String hero name
 * @param {Superpower} superpower - Superpower object
 * @returns {Superhero}
 */
function createSuperheroObject(personName, heroName, superpower) {
  const person = createPersonObject(personName);
  return new Superhero(person, heroName, superpower);
}

/**
 * Helper to create Villain object
 * @param {string} personName - String person name
 * @param {string} villainName - String villain name
 * @param {Superpower} superpower - Superpower object
 * @returns {Villain}
 */
function createVillainObject(personName, villainName, superpower) {
  const person = createPersonObject(personName);
  return new Villain(person, villainName, superpower);
}

/** Helper to create default Villain object
 * @returns {Villain}
 */
function createDefaultVillain() {
  const superpowers = [SUPERPOWER_1_KEY, SUPERPOWER_2_KEY, SUPERPOWER_3_KEY];
  const randomIndex = randomise(0, superpowers.length - 1);
  const randomSuperpower = getSuperpowerFromKeySelection(
    superpowers[randomIndex]
  );
  return createVillainObject(
    DEFAULT_VILLAIN_PERSON_NAME,
    DEFAULT_VILLAIN__NAME,
    randomSuperpower
  );
}

module.exports = {
  createPersonObject,
  createSuperheroObject,
  createVillainObject,
  createDefaultVillain,
};
