const readline = require("node:readline");
const { stdin, stdout } = require("node:process");

/** @type {readline.Interface} */
let rlInterface = null;

/**
 * Get readline interface
 * @returns {readline.Interface}
 */
function getReadlineInterface() {
  if (rlInterface === null)
    rlInterface = readline.createInterface({ input: stdin, output: stdout });
  return rlInterface;
}

/**
 * Set prompt string for readline
 * @param {string} prompt - String for readline prompt
 */
function setReadlinePrompt(prompt) {
  const rl = getReadlineInterface();
  rl.setPrompt(`${prompt} > `);
}

/**
 * Prompt for user response and run callback function
 * @param {import("./types").promptInputCallback} callback
 */
function promptUserInput(callback) {
  const rl = getReadlineInterface();
  rl.question(rl.getPrompt(), callback);
}

module.exports = {
  getReadlineInterface,
  setReadlinePrompt,
  promptUserInput,
};
