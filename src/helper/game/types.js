const Superhero = require("../../classes/superhero");
const Villain = require("../../classes/villain");

/**
 * String values for game turn result
 * @typedef {"WIN" | "LOSE" | "DRAW"} gameTurnResult
 */

/**
 * Object as function arg to build string interpolation payload for turn end UI string
 * @typedef {Object} turnEndUIInterpolatePayload
 * @property {number} turnNum
 * @property {string} heroMove
 * @property {string} villainMove
 * @property {string} turnResult
 * @property {boolean} hasCriticalHit
 * @property {Superhero} superhero
 * @property {Villain} villain
 * @property {string | null} winnerName
 */

/**
 * Parameter object arg for interpolate string function
 * @typedef {Object} turnEndUIStringParams
 * @property {number} turnNum
 * @property {string} heroMove
 * @property {string} villainMove
 * @property {string} turnResult
 * @property {string} critMsg
 * @property {string} heroName
 * @property {string} villainName
 * @property {number} heroHp
 * @property {number} villainHp
 * @property {string | null} winnerName
 */

module.exports = {};
