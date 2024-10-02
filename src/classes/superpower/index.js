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
   * @param {import("./types").PowerValue} power
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
   * @returns {import("./types").PowerValue} Power value of superpower
   */
  getPower() {
    return this.#power;
  }

  /**
   * Get superpower info
   * @returns {import("./types").SuperpowerInfo} Information on superpower
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
