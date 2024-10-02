const Superpower = require("../../classes/superpower");
const {
  SUPERPOWER_1_KEY,
  SUPERPOWER_2_KEY,
  POWER_MOVE_1_KEY,
  POWER_MOVE_2_KEY,
  SUPERPOWER_3_KEY,
  POWER_MOVE_3_KEY,
} = require("../../constants/keys");
const {
  SUPER_STRENGTH_NAME,
  SUPER_STRENGTH_DESCRIPTION,
  SUPER_STRENGTH_POWER,
  FLIGHT_NAME,
  FLIGHT_DESCRIPTION,
  FLIGHT_POWER,
  LASER_VISION_NAME,
  SUPERPOWER_ROCK,
  SUPERPOWER_SCISSORS,
  SUPERPOWER_PAPER,
  LASER_VISIONS_DESCRIPTION,
  LASER_VISIONS_POWER,
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
  LASER_VISIONS_DESCRIPTION,
  LASER_VISIONS_POWER
);

const PRESET_SUPERPOWERS = {
  SUPER_STRENGTH: SUPER_STRENGTH_SUPERPOWER,
  FLIGHT: FLIGHT_SUPERPOWER,
  LASER_VISION: LASER_VISION_SUPERPOWER,
};

/**
 * Get corresponding Superpower object from selected key when user chooses superpower
 * @param {import("./types").superpowerKeySelection} key
 * @returns {Superpower | null}
 */
function getSuperpowerFromKeySelection(key) {
  switch (key) {
    case SUPERPOWER_1_KEY:
      return PRESET_SUPERPOWERS.SUPER_STRENGTH;
    case SUPERPOWER_2_KEY:
      return PRESET_SUPERPOWERS.FLIGHT;
    case SUPERPOWER_3_KEY:
      return PRESET_SUPERPOWERS.LASER_VISION;
    default:
      return null;
  }
}

/**
 * Get corresponding Superpower power value from selected key when user chooses move
 * @param {import("./types").superpowerMoveKeySelection} key
 * @returns {import("../../classes/superpower/types").PowerValue | null}
 */
function getPowerFromKeySelection(key) {
  switch (key) {
    case POWER_MOVE_1_KEY:
      return SUPERPOWER_ROCK;
    case POWER_MOVE_2_KEY:
      return SUPERPOWER_SCISSORS;
    case POWER_MOVE_3_KEY:
      return SUPERPOWER_PAPER;
    default:
      return null;
  }
}

module.exports = {
  PRESET_SUPERPOWERS,
  getSuperpowerFromKeySelection,
  getPowerFromKeySelection,
};
