const { SUPERHERO_SELF_INTRO_MSG } = require("../../constants/character");
const { interpolate, capitalizeAllWords } = require("../../utils/string");
const Person = require("../person");
const Superpower = require("../superpower");

/**
 * Class to represent a Superhero object
 */
class Superhero extends Person {
  #heroName;
  #person;
  #superpower;

  /**
   * Create Superhero object instance
   * @param {Person} person
   * @param {string} heroName
   * @param {Superpower} superpower
   */
  constructor(person, heroName, superpower) {
    super(person.getName());
    this.#person = person;
    this.#heroName = capitalizeAllWords(heroName);
    this.#superpower = superpower;
  }

  /**
   * Get superhero name
   * @returns {string} Name of superhero
   */
  getName() {
    return this.#heroName;
  }

  /**
   * Get self introduction message
   * @returns {string} Self introduction message
   */
  getSelfIntroduction() {
    const params = { name: this.#heroName };
    return interpolate(SUPERHERO_SELF_INTRO_MSG, params);
  }

  /**
   * Get superhero's secret identity
   * @returns {Person} Superhero's secret identity
   */
  getSecretIdentity() {
    return this.#person;
  }

  /**
   * Get superhero's superpower
   * @returns {Superpower} Superpower of superhero
   */
  getSuperpower() {
    return this.#superpower;
  }
}

module.exports = Superhero;
