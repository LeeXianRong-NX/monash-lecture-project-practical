const {
  MockSuperheroHelper,
  MockVillainHelper,
} = require("../../helpers/test");
const Game = require("./");

describe("Game class", () => {
  /** @type {Game} */
  let game;

  beforeEach(() => {
    game = new Game();
  });

  test("should create Game instance", () => {
    expect(game).toBeDefined();
    expect(game.getTurnNumber()).toEqual(0);
    expect(game.getPlayerSuperhero()).toBeNull();
    expect(game.getBotVillain()).toBeNull();
  });

  test("should update turn number", () => {
    expect(game.getTurnNumber()).toEqual(0);
    game.updateTurn();
    expect(game.getTurnNumber()).toEqual(1);
  });

  test("should set player Superhero object", () => {
    const superhero = MockSuperheroHelper.createMockSuperhero();
    game.setPlayerSuperhero(superhero);
    expect(game.getPlayerSuperhero()).toEqual(superhero);
  });

  test("should set bot Villain object", () => {
    const villain = MockVillainHelper.createMockVillain();
    game.setBotVillain(villain);
    expect(game.getBotVillain()).toEqual(villain);
  });
});
