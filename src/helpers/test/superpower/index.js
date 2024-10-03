const { Superpower } = require("../../../classes");
const { SUPERPOWER_SCISSORS } = require("../../../constants/superpower");

// Helper function to mock Superpower object
/** @type {import("../../../classes/superpower/types").SuperpowerInfo} */
const mockSuperpowerInfo = {
  name: "Flight",
  description: "Can hover and fly in the air",
  power: SUPERPOWER_SCISSORS,
};
function createMockSuperpower(
  name = mockSuperpowerInfo.name,
  description = mockSuperpowerInfo.description,
  power = mockSuperpowerInfo.power
) {
  return new Superpower(name, description, power);
}

exports.MockSuperpowerHelper = { mockSuperpowerInfo, createMockSuperpower };
