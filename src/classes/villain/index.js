const { VILLAIN_SELF_INTRO_MSG } = require("../../constants/character");
const { interpolate } = require("../../utils/string");
const Person = require("../person");
const Superpower = require("../superpower");

/**
 * Class to represent a Villain object
 */
class Villain extends Person {
  #villainName;
  #person;
  #superpower;

  /**
   * Create Villain object instance
   * @param {Person} person
   * @param {string} villainName
   * @param {Superpower} superpower
   */
  constructor(person, villainName, superpower) {
    super(person.getName());
    this.#person = person;
    this.#villainName = villainName;
    this.#superpower = superpower;
  }

  /**
   * Get villain name
   * @returns {string} Name of villain
   */
  getName() {
    return this.#villainName;
  }

  /**
   * Get self introduction message
   * @returns {string} Self introduction message
   */
  getSelfIntroduction() {
    const params = { name: this.#villainName };
    return interpolate(VILLAIN_SELF_INTRO_MSG, params);
  }

  /**
   * Get villain's secret identity
   * @returns {Person} villain's secret identity
   */
  getSecretIdentity() {
    return this.#person;
  }

  /**
   * Get villain's superpower
   * @returns {Superpower} Superpower of villain
   */
  getSuperpower() {
    return this.#superpower;
  }
}

module.exports = Villain;
