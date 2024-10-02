const fs = require("node:fs");
const console = require("node:console");
const { HEADER_UI_PATH } = require("../../constants/path");
const { promptUserInput } = require("../../service/readline");

/**
 * Get UI string data from file source
 * @param {string} path - String path for file containing UI string
 * @returns {string}
 */
function getUserInterfaceFromSource(path) {
  const ui = fs.readFileSync(path, "utf-8");
  return ui;
}

/**
 * Display game header UI in command line output
 */
function displayHeaderUserInterface() {
  const headerUi = getUserInterfaceFromSource(HEADER_UI_PATH);
  console.log(headerUi);
}

/**
 * Display UI string in command line output and run callback function on user input prompt
 * @param {string} ui - Game UI string to display
 * @param {import("../../service/readline/types").promptInputCallback | undefined} callback - Optional callback function to run on user input
 */
function displayUserInterface(ui, callback) {
  console.clear();
  displayHeaderUserInterface();
  console.log(ui);
  if (callback !== undefined) promptUserInput(callback);
}

module.exports = {
  getUserInterfaceFromSource,
  displayHeaderUserInterface,
  displayUserInterface,
};
