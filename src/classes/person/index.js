const { PERSON_SELF_INTRO_MSG } = require("../../constants/character");
const { capitalizeAllWords, interpolate } = require("../../utils/string");

/**
 * Class to represent a Person object
 */
class Person {
  #name;

  /**
   * Create Person object instance
   * @param {string} name - Name of person
   */
  constructor(name) {
    this.#name = capitalizeAllWords(name);
  }

  /**
   * Gets person name
   * @returns {string} Name of person
   */
  getName() {
    return this.#name;
  }

  /**
   * Get self introduction message
   * @returns {string} Self introduction message
   */
  getSelfIntroduction() {
    const params = { name: this.#name };
    return interpolate(PERSON_SELF_INTRO_MSG, params);
  }
}

module.exports = Person;
