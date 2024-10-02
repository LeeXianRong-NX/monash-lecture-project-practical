const { PERSON_SELF_INTRO_MSG } = require("../../constants/character");
const { capitalizeAllWords, interpolate } = require("../../utils/string");

/**
 * Class to represent a Person object
 */
class Person {
  #name;
  #hp;

  /**
   * Create Person object instance
   * @param {string} name - Name of person
   */
  constructor(name) {
    this.#name = capitalizeAllWords(name);
    this.#hp = 3;
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

  /**
   * Get current HP value
   * @returns {number} Current HP number
   */
  getHp() {
    return this.#hp;
  }

  /**
   * Reduce HP value
   * @param {boolean} [crit=false] - Condition if person was attacked with critical hit
   */
  reduceHp(crit = false) {
    this.#hp = this.#hp - (crit ? 2 : 1);
  }
}

module.exports = Person;
