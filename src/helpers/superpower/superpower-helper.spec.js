const {
  PRESET_SUPERPOWERS,
  getSuperpowerFromKeySelection,
  getPowerFromKeySelection,
} = require(".");
const {
  SUPERPOWER_1_KEY,
  SUPERPOWER_2_KEY,
  SUPERPOWER_3_KEY,
  POWER_MOVE_1_KEY,
  POWER_MOVE_2_KEY,
  POWER_MOVE_3_KEY,
} = require("../../constants/keys");
const {
  SUPERPOWER_ROCK,
  SUPERPOWER_SCISSORS,
  SUPERPOWER_PAPER,
} = require("../../constants/superpower");

const KEY_SELECT_SUPERPOWER_TABLE = [
  [SUPERPOWER_1_KEY, PRESET_SUPERPOWERS.SUPER_STRENGTH],
  [SUPERPOWER_2_KEY, PRESET_SUPERPOWERS.FLIGHT],
  [SUPERPOWER_3_KEY, PRESET_SUPERPOWERS.LASER_VISION],
  ["!", null],
];

const KEY_SELECT_POWER_TABLE = [
  [POWER_MOVE_1_KEY, SUPERPOWER_ROCK],
  [POWER_MOVE_2_KEY, SUPERPOWER_SCISSORS],
  [POWER_MOVE_3_KEY, SUPERPOWER_PAPER],
  ["!", null],
];

describe("Superpower helper functions", () => {
  test.concurrent.each(KEY_SELECT_SUPERPOWER_TABLE)(
    "should select %s key to get %s superpower",
    async (key, expected) => {
      const superpower = getSuperpowerFromKeySelection(key);
      expect(superpower).toEqual(expected);
    }
  );

  test.concurrent.each(KEY_SELECT_POWER_TABLE)(
    "should select %s key to get %s power value",
    async (key, expected) => {
      const power = getPowerFromKeySelection(key);
      expect(power).toEqual(expected);
    }
  );
});
