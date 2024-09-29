const readline = require("node:readline");
const { stdin, stdout } = require("node:process");

/** @type {readline.Interface} */
let rlInterface = null;

/**
 * Initialize new readline interface instance if no instance
 */
function initReadlineInterface() {
  if (rlInterface === null)
    rlInterface = readline.createInterface({ input: stdin, output: stdout });
}

/**
 * Checks if readline interface is available
 * @throws {Error} Generic error if readline interface is null
 * @returns {void}
 */
function checkIsReadlineAvailable() {
  if (rlInterface === null)
    throw new Error("Readline interface has not been initialised.");
  return;
}

/**
 * Pause readline interface
 */
function pauseReadline() {
  checkIsReadlineAvailable();
  rlInterface.pause();
}

/**
 * Resume readline interface
 */
function resumeReadline() {
  checkIsReadlineAvailable();
  rlInterface.resume();
}

/**
 * Set input string as latest readline interface prompt
 * @param {string} prompt - String to set as readline prompt
 */
function setReadlinePrompt(prompt) {
  checkIsReadlineAvailable();
  rlInterface.setPrompt(prompt);
}

/**
 * Get current readline interface prompt
 * @returns {string} Current readline prompt string
 */
function getReadlinePrompt() {
  checkIsReadlineAvailable();
  return rlInterface.getPrompt();
}

/**
 * Prompt for user input in new line
 */
function promptNewReadline() {
  checkIsReadlineAvailable();
  rlInterface.prompt();
}

/**
 * @callback rlQuestionCallback
 * @param {string} answer - User input string answer
 * @returns {void}
 */
/**
 * Display string as question and prompt for user input
 * @param {string} question
 * @param {rlQuestionCallback} callback
 */
function askQuestionReadline(question, callback) {
  checkIsReadlineAvailable();
  rlInterface.question(`${getReadlinePrompt()} ${question}`, callback);
}

/**
 * Close readline interface and remove instance
 */
function closeReadline() {
  checkIsReadlineAvailable();
  rlInterface.close();
  rlInterface = null;
}

module.exports = {
  initReadlineInterface,
  pauseReadline,
  resumeReadline,
  setReadlinePrompt,
  getReadlinePrompt,
  promptNewReadline,
  askQuestionReadline,
  closeReadline,
};
