const console = require("node:console");
const process = require("node:process");
const {
  Superhero,
  Villain,
  Person,
  Game,
  Superpower,
} = require("../../classes");
const {
  START_GAME_KEY,
  HELP_KEY,
  QUIT_KEY,
  SUPERPOWER_1_KEY,
  POWER_MOVE_1_KEY,
} = require("../../constants/keys");
const {
  MAIN_MENU_UI_PATH,
  CREATE_PERSON_UI_PATH,
  HELP_UI_PATH,
  QUIT_UI_PATH,
  CREATE_HERO_UI_PATH,
  SELECT_SUPERPOWER_UI_PATH,
  START_TURN_UI_PATH,
  NEXT_TURN_UI_PATH,
  END_GAME_UI_PATH,
} = require("../../constants/path");
const {
  SUPERPOWER_ROCK,
  SUPERPOWER_SCISSORS,
} = require("../../constants/superpower");
const {
  initGame,
  startGame,
  mainMenuInputCallback,
  displayMainMenu,
  displayQuitGame,
  displayHelpInstructions,
  helpInstructionsInputCallback,
  displayCreatePerson,
  createPersonCallback,
  createSuperheroCallback,
  displayCreateSuperhero,
  selectSuperpowerCallback,
  displaySelectSuperpower,
  gameTurnCallback,
  displayStartTurn,
  endGameCallback,
} = require("./");
const {
  createSuperheroObject,
  createDefaultVillain,
} = require("../../helpers/character");
const { getTurnResult, getTurnHasCriticalHit } = require("../../helpers/game");
const {
  getSuperpowerFromKeySelection,
  getPowerFromKeySelection,
} = require("../../helpers/superpower");
const { setReadlinePrompt, promptUserInput } = require("../readline");
const { randomise } = require("../../utils/number/randomise");
const {
  getUserInterfaceFromSource,
  displayUserInterface,
} = require("../../utils/ui");

jest.mock("node:console", () => ({
  log: jest.fn(),
  clear: jest.fn(),
}));
jest.mock("node:process", () => ({
  exit: jest.fn(),
}));
jest.mock("../../helpers/character", () => ({
  createSuperheroObject: jest.fn(),
  createDefaultVillain: jest.fn(),
}));
jest.mock("../../helpers/superpower", () => ({
  getSuperpowerFromKeySelection: jest.fn(),
  getPowerFromKeySelection: jest.fn(),
}));
jest.mock("../../utils/number/randomise", () => ({
  randomise: jest.fn(),
}));
jest.mock("../../utils/ui", () => ({
  getUserInterfaceFromSource: jest.fn(),
  displayUserInterface: jest.fn(),
}));
jest.mock("../readline", () => ({
  setReadlinePrompt: jest.fn(),
  promptUserInput: jest.fn(),
}));

describe("Game service methods", () => {
  const TEST_UI_STRING = "test ui string";
  const INVALID_KEY = "!";
  const PERSON_NAME = "Mocky";
  const HERO_NAME = "Super Mocky";
  const VILLAIN_NAME = "Evil Mocky";
  /** @type {Game | null} */
  let gameInstance = null;

  beforeEach(() => {
    jest.resetModules();
    const person = new Person(PERSON_NAME);
    createSuperheroObject.mockReturnValue(
      new Superhero(
        person,
        HERO_NAME,
        new Superpower("powerName", "desc", SUPERPOWER_ROCK)
      )
    );
    createDefaultVillain.mockReturnValue(
      new Villain(
        person,
        VILLAIN_NAME,
        new Superpower("powerName", "desc", SUPERPOWER_SCISSORS)
      )
    );
    gameInstance = new Game();
    gameInstance.setPlayerSuperhero(createSuperheroObject());
    gameInstance.setBotVillain(createDefaultVillain());
    initGame(gameInstance);
    getUserInterfaceFromSource.mockReturnValue(TEST_UI_STRING);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("should initialise game instance for service", () => {
    expect(gameInstance).not.toBeNull();
  });

  test("should start game service if game instance initialised", () => {
    startGame();
    expect(getUserInterfaceFromSource).toHaveBeenCalledWith(MAIN_MENU_UI_PATH);
  });

  describe("handle main menu UI display and user input prompt", () => {
    test("should display main menu UI", () => {
      displayMainMenu();
      expect(setReadlinePrompt).toHaveBeenCalledWith("Press key");
      expect(getUserInterfaceFromSource).toHaveBeenCalledWith(
        MAIN_MENU_UI_PATH
      );
      expect(displayUserInterface).toHaveBeenCalledWith(
        TEST_UI_STRING,
        mainMenuInputCallback
      );
    });

    test("should handle main menu user input prompt", () => {
      mainMenuInputCallback(START_GAME_KEY);
      expect(getUserInterfaceFromSource).toHaveBeenCalledWith(
        CREATE_PERSON_UI_PATH
      );
      mainMenuInputCallback(HELP_KEY);
      expect(getUserInterfaceFromSource).toHaveBeenCalledWith(HELP_UI_PATH);
      mainMenuInputCallback(QUIT_KEY);
      expect(getUserInterfaceFromSource).toHaveBeenCalledWith(QUIT_UI_PATH);
      mainMenuInputCallback(INVALID_KEY);
      expect(promptUserInput).toHaveBeenCalledWith(mainMenuInputCallback);
    });
  });

  test("should display quit game UI display and terminate game process", () => {
    displayQuitGame();
    expect(getUserInterfaceFromSource).toHaveBeenCalledWith(QUIT_UI_PATH);
    expect(displayUserInterface).toHaveBeenCalledWith(TEST_UI_STRING);
    expect(process.exit).toHaveBeenCalledWith(0);
  });

  describe("handle help instructions UI display and user input prompt", () => {
    test("should display help instructions UI", () => {
      displayHelpInstructions();
      expect(setReadlinePrompt).toHaveBeenCalledWith("Press key");
      expect(getUserInterfaceFromSource).toHaveBeenCalledWith(HELP_UI_PATH);
      expect(displayUserInterface).toHaveBeenCalledWith(
        TEST_UI_STRING,
        helpInstructionsInputCallback
      );
    });

    test("should handle help instructions user input prompt", () => {
      helpInstructionsInputCallback(START_GAME_KEY);
      expect(getUserInterfaceFromSource).toHaveBeenCalledWith(
        CREATE_PERSON_UI_PATH
      );
      helpInstructionsInputCallback(QUIT_KEY);
      expect(getUserInterfaceFromSource).toHaveBeenCalledWith(QUIT_UI_PATH);
      helpInstructionsInputCallback(INVALID_KEY);
      expect(promptUserInput).toHaveBeenCalledWith(
        helpInstructionsInputCallback
      );
    });
  });

  test("should display create person UI and handle create person user input prompt", () => {
    displayCreatePerson();
    expect(setReadlinePrompt).toHaveBeenCalledWith("Enter name");
    expect(getUserInterfaceFromSource).toHaveBeenCalledWith(
      CREATE_PERSON_UI_PATH
    );
    expect(displayUserInterface).toHaveBeenCalledWith(
      TEST_UI_STRING,
      createPersonCallback
    );
  });

  test("should display create superhero UI and handle create superhero user input prompt", () => {
    displayCreateSuperhero();
    expect(setReadlinePrompt).toHaveBeenCalledWith("Enter superhero name");
    expect(getUserInterfaceFromSource).toHaveBeenCalledWith(
      CREATE_HERO_UI_PATH
    );
    expect(displayUserInterface).toHaveBeenCalledWith(
      TEST_UI_STRING,
      createSuperheroCallback
    );
  });

  describe("handle select superpower UI display and user input prompt", () => {
    test("should display select superpower UI", () => {
      displaySelectSuperpower();
      expect(setReadlinePrompt).toHaveBeenCalledWith("Choose a superpower");
      expect(getUserInterfaceFromSource).toHaveBeenCalledWith(
        SELECT_SUPERPOWER_UI_PATH
      );
      expect(displayUserInterface).toHaveBeenCalledWith(
        TEST_UI_STRING,
        selectSuperpowerCallback
      );
    });

    test("should handle select superpower user input prompt", () => {
      getSuperpowerFromKeySelection.mockReturnValue(null);
      selectSuperpowerCallback(INVALID_KEY);
      expect(promptUserInput).toHaveBeenCalledWith(selectSuperpowerCallback);

      getSuperpowerFromKeySelection.mockReturnValue(SUPERPOWER_ROCK);
      createPersonCallback(PERSON_NAME);
      createSuperheroCallback(HERO_NAME);
      selectSuperpowerCallback(SUPERPOWER_1_KEY);
      expect(createSuperheroObject).toHaveBeenCalledWith(
        PERSON_NAME,
        HERO_NAME,
        SUPERPOWER_ROCK
      );
    });
  });

  describe("handle start turn UI display and user input prompt", () => {
    test("should display start turn UI", () => {
      displayStartTurn();
      expect(setReadlinePrompt).toHaveBeenCalledWith("Choose a move");
      expect(getUserInterfaceFromSource).toHaveBeenCalledWith(
        START_TURN_UI_PATH
      );
      expect(displayUserInterface).toHaveBeenCalledWith(TEST_UI_STRING);
      expect(console.log.mock.calls).toEqual([
        [
          `${gameInstance.getBotVillain().getName()}: ${gameInstance
            .getBotVillain()
            .getSelfIntroduction()}\r\n`,
        ],
        [
          `${gameInstance.getPlayerSuperhero().getName()}: ${gameInstance
            .getPlayerSuperhero()
            .getSelfIntroduction()}\r\n`,
        ],
      ]);
      expect(promptUserInput).toHaveBeenCalledWith(gameTurnCallback);
    });

    test("should handle game turn user input prompt", () => {
      getPowerFromKeySelection.mockReturnValue(null);
      gameTurnCallback(INVALID_KEY);
      expect(promptUserInput).toHaveBeenCalledWith(gameTurnCallback);

      getPowerFromKeySelection.mockReturnValue(SUPERPOWER_ROCK);
      randomise.mockReturnValue(0);
      // continue game
      gameTurnCallback(SUPERPOWER_ROCK);
      expect(getUserInterfaceFromSource).toHaveBeenCalledWith(
        NEXT_TURN_UI_PATH
      );
      expect(displayUserInterface).toHaveBeenCalledWith(
        TEST_UI_STRING,
        gameTurnCallback
      );

      // end game
      gameInstance.getBotVillain().reduceHp(true);
      gameInstance.getBotVillain().reduceHp(true);
      gameTurnCallback(SUPERPOWER_ROCK);
      expect(getUserInterfaceFromSource).toHaveBeenCalledWith(END_GAME_UI_PATH);
      expect(displayUserInterface).toHaveBeenCalledWith(
        TEST_UI_STRING,
        endGameCallback
      );
    });
  });

  test("should display quit game UI on game end", () => {
    endGameCallback();
    expect(getUserInterfaceFromSource).toHaveBeenCalledWith(QUIT_UI_PATH);
    expect(displayUserInterface).toHaveBeenCalledWith(TEST_UI_STRING);
    expect(process.exit).toHaveBeenCalledWith(0);
  });
});
