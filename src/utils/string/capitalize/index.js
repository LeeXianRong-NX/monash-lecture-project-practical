/**
 * Capitalizes the first character of text.
 * @param {string} text - The string to capitalize.
 * @returns {string} Returns capitalized text string.
 */
function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Capitalize the first character for all words in text.
 * @param {string} text - The string to capitalize all word.
 * @returns {string} Returns text string with all words capitalized.
 */
function capitalizeAllWords(text) {
  return text
    .split(" ")
    .map((word) => capitalize(word))
    .join(" ");
}

module.exports = {
  capitalize,
  capitalizeAllWords,
};
