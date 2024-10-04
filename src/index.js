const { Game } = require("./classes");
const { initGame, startGame } = require("./services/game");

function init() {
  const game = new Game();
  initGame(game);
  startGame();
}

init();
