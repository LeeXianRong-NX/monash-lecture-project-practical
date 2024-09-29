const path = require("node:path");

// Root directory path
exports.ROOT_PATH = path.resolve(require.main.path, "../");
// Public directory path
exports.PUBLIC_DIR_PATH = path.resolve(this.ROOT_PATH, "public");
// UI text file path
exports.MAIN_MENU_UI_PATH = path.resolve(this.PUBLIC_DIR_PATH, "main-menu.txt");
