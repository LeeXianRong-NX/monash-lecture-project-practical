const Superpower = require("../../classes/superpower");
const {
  SUPERPOWER_1_KEY,
  SUPERPOWER_2_KEY,
  POWER_MOVE_1_KEY,
  POWER_MOVE_2_KEY,
} = require("../../constants/keys");
const {
  SUPER_STRENGTH_NAME,
  SUPER_STRENGTH_DESCRIPTION,
  SUPER_STRENGTH_POWER,
  FLIGHT_NAME,
  FLIGHT_DESCRIPTION,
  FLIGHT_POWER,
  LASER_VISION_NAME,
  SUPER_STRENGTH_DESCRIPTION,
  SUPER_STRENGTH_POWER,
  SUPERPOWER_ROCK,
  SUPERPOWER_SCISSORS,
  SUPERPOWER_PAPER,
} = require("../../constants/superpower");

// Preset Superpower objects
const SUPER_STRENGTH_SUPERPOWER = new Superpower(
  SUPER_STRENGTH_NAME,
  SUPER_STRENGTH_DESCRIPTION,
  SUPER_STRENGTH_POWER
);
const FLIGHT_SUPERPOWER = new Superpower(
  FLIGHT_NAME,
  FLIGHT_DESCRIPTION,
  FLIGHT_POWER
);
const LASER_VISION_SUPERPOWER = new Superpower(
  LASER_VISION_NAME,
  SUPER_STRENGTH_DESCRIPTION,
  SUPER_STRENGTH_POWER
);

/**
 * Get corresponding Superpower object from selected key when user chooses superpower
 * @param {import("./types").superpowerKeySelection} key
 * @returns {Superpower}
 */
function getSuperpowerFromKeySelection(key) {
  return key === SUPERPOWER_1_KEY
    ? SUPER_STRENGTH_SUPERPOWER
    : key === SUPERPOWER_2_KEY
    ? FLIGHT_SUPERPOWER
    : LASER_VISION_SUPERPOWER;
}

/**
 * Get corresponding Superpower power value from selected key when user chooses move
 * @param {import("./types").superpowerMoveKeySelection} key
 * @returns {import("../../classes/superpower/types").PowerValue}
 */
function getPowerFromKeySelection(key) {
  return key === POWER_MOVE_1_KEY
    ? SUPERPOWER_ROCK
    : key === POWER_MOVE_2_KEY
    ? SUPERPOWER_SCISSORS
    : SUPERPOWER_PAPER;
}

module.exports = {
  getSuperpowerFromKeySelection,
  getPowerFromKeySelection,
};
