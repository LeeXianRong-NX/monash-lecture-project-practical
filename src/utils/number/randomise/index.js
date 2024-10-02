/**
 * Get random number between min and max range
 * @param {number} min
 * @param {number} max
 */
function randomise(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = {
  randomise,
};
