const Superhero = require("../superhero");
const Villain = require("../villain");

/**
 * Class to represent a Game object
 */
class Game {
  /** @type {number} */
  #turn;
  /** @type {Superhero | null} */
  #playerSuperhero;
  /** @type {Villain | null} */
  #botVillain;

  /**
   * Create a Game object instance
   */
  constructor() {
    this.#turn = 0;
    this.#playerSuperhero = null;
    this.#botVillain = null;
  }

  /**
   * Get current turn number
   * @returns {number}
   */
  getTurnNumber() {
    return this.#turn;
  }

  /**
   * Update turn number
   */
  updateTurn() {
    this.#turn = this.#turn + 1;
  }

  /**
   * Get player Superhero object
   * @returns {Superhero | null}
   */
  getPlayerSuperhero() {
    return this.#playerSuperhero;
  }

  /**
   * Set player Superhero object
   * @param {Superhero} superheroObj
   */
  setPlayerSuperhero(superheroObj) {
    this.#playerSuperhero = superheroObj;
  }

  /**
   * Get bot Villain object
   * @returns {Villain | null}
   */
  getBotVillain() {
    return this.#botVillain;
  }

  /**
   * Set bot Villain object
   * @param {Villain} villainObj
   */
  setBotVillain(villainObj) {
    this.#botVillain = villainObj;
  }
}

module.exports = Game;
