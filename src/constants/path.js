const path = require("node:path");

// Root directory path
exports.ROOT_PATH = path.resolve(require.main.path, "../");
// Public directory path
exports.PUBLIC_DIR_PATH = path.resolve(this.ROOT_PATH, "public");
// UI text file path
exports.HEADER_UI_PATH = path.resolve(this.PUBLIC_DIR_PATH, "header.txt");
exports.MAIN_MENU_UI_PATH = path.resolve(this.PUBLIC_DIR_PATH, "main-menu.txt");
exports.HELP_UI_PATH = path.resolve(this.PUBLIC_DIR_PATH, "help.txt");
exports.CREATE_PERSON_UI_PATH = path.resolve(
  this.PUBLIC_DIR_PATH,
  "create-person.txt"
);
exports.CREATE_HERO_UI_PATH = path.resolve(
  this.PUBLIC_DIR_PATH,
  "create-hero.txt"
);
exports.SELECT_SUPERPOWER_UI_PATH = path.resolve(
  this.PUBLIC_DIR_PATH,
  "select-superpower.txt"
);
exports.GAME_IN_PROGRESS_UI_PATH = path.resolve(
  this.PUBLIC_DIR_PATH,
  "game-in-progress.txt"
);
exports.QUIT_UI_PATH = path.resolve(this.PUBLIC_DIR_PATH, "quit.txt");
