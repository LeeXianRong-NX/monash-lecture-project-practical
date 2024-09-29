/**
 * Superpower symbol values
 * @typedef {"✊" | "✌️" | "✋"} PowerValue
 */

/**
 * Superpower info
 * @typedef {Object} SuperpowerInfo
 * @property {string} name - Name of superpower
 * @property {string} description - Description of superpower
 * @property {PowerValue} power - Power value of superpower
 */

/**
 * Class to represent Superpower object
 */
class Superpower {
  #name;
  #description;
  #power;

  /**
   *
   * @param {string} name
   * @param {string} description
   * @param {PowerValue} power
   */
  constructor(name, description, power) {
    this.#name = name;
    this.#description = description;
    this.#power = power;
  }

  /**
   * Get superpower name
   * @returns {string} Name of superpower
   */
  getName() {
    return this.#name;
  }

  /**
   * Get superpower description
   * @returns {string} Description of superpower
   */
  getDescription() {
    return this.#description;
  }

  /**
   * Get superpower power value
   * @returns {PowerValue} Power value of superpower
   */
  getPower() {
    return this.#power;
  }

  /**
   * Get superpower info
   * @returns {SuperpowerInfo} Information on superpower
   */
  getInfo() {
    return {
      name: this.getName(),
      description: this.getDescription(),
      power: this.getPower(),
    };
  }
}

module.exports = Superpower;
