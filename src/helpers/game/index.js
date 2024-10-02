const {
  GAME_TURN_DRAW_RESULT,
  GAME_TURN_LOSE_RESULT,
  GAME_TURN_WIN_RESULT,
} = require("../../constants/game");
const {
  SUPERPOWER_ROCK,
  SUPERPOWER_SCISSORS,
  SUPERPOWER_PAPER,
} = require("../../constants/superpower");

/**
 * Check if character has landed critical hit by comparing selected move and own superpower value
 * @param {import("../../classes/superpower/types").PowerValue} move - Power value of character's selected move
 * @param {import("../../classes/superpower/types").PowerValue} power - Power value of character's superpower
 * @returns {boolean}
 */
function isCriticalHit(move, power) {
  return move === power;
}

/**
 * Check if turn has any critical hits from either superhero or villain
 * @param {boolean} isHeroCrit - Boolean value if superhero has landed critical hit
 * @param {boolean} isVillainCrit - Boolean value if villain has landed critical hit
 * @returns {boolean}
 */
function getTurnHasCriticalHit(isHeroCrit, isVillainCrit) {
  return isHeroCrit || isVillainCrit;
}

/**
 * Check if player has won the game by comparing superhero and villain HP
 * @param {number} heroHp - Superhero HP number value
 * @param {number} villainHp - Villain HP number value
 * @returns {boolean | null}
 */
function checkIsPlayerWinner(heroHp, villainHp) {
  if (heroHp > 0 && villainHp <= 0) return true;
  if (heroHp <= 0 && villainHp > 0) return false;
  return null;
}

/**
 * Calculate result for game turn by comparing moves by superhero and villain
 * @param {import("../../classes/superpower/types").PowerValue} heroMove - Superhero move power value
 * @param {import("../../classes/superpower/types").PowerValue} villainMove - Villain move power value
 * @returns {import("./types").gameTurnResult}
 */
function getTurnResult(heroMove, villainMove) {
  if (heroMove === villainMove) return GAME_TURN_DRAW_RESULT;

  if (
    (heroMove === SUPERPOWER_ROCK && villainMove === SUPERPOWER_SCISSORS) ||
    (heroMove === SUPERPOWER_SCISSORS && villainMove === SUPERPOWER_PAPER) ||
    (heroMove === SUPERPOWER_PAPER && villainMove === SUPERPOWER_ROCK)
  )
    return GAME_TURN_WIN_RESULT;

  return GAME_TURN_LOSE_RESULT;
}

/**
 * Get string params to interpolate into turn end UI string
 * @param {import("./types").turnEndUIInterpolatePayload} payload - Payload to build string params
 * @returns {import("./types").turnEndUIStringParams}
 */
function getTurnEndUIStringParams(payload) {
  return {
    turnNum: payload.turnNum,
    heroMove: payload.heroMove,
    villainMove: payload.villainMove,
    turnResult: payload.turnResult,
    critMsg: payload.hasCriticalHit ? "CRITICAL HIT" : "",
    heroName: payload.superhero.getName(),
    villainName: payload.villain.getName(),
    heroHp: getHpDisplay(payload.superhero.getHp()),
    villainHp: getHpDisplay(payload.villain.getHp()),
    winnerName: payload.winnerName,
  };
}

/**
 * Get number to display for HP
 * @param {number} hp
 * @returns {number}
 */
function getHpDisplay(hp) {
  return hp <= 0 ? 0 : hp;
}

module.exports = {
  isCriticalHit,
  getTurnHasCriticalHit,
  checkIsPlayerWinner,
  getTurnResult,
  getTurnEndUIStringParams,
};
