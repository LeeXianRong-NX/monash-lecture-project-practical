const process = require("node:process");
const { Superhero, Villain } = require("../../classes/");
const {
  MAIN_MENU_UI_PATH,
  QUIT_UI_PATH,
  HELP_UI_PATH,
  CREATE_PERSON_UI_PATH,
  CREATE_HERO_UI_PATH,
  SELECT_SUPERPOWER_UI_PATH,
  START_TURN_UI_PATH,
  NEXT_TURN_UI_PATH,
  END_GAME_UI_PATH,
} = require("../../constants/path");
const { START_GAME_KEY, HELP_KEY, QUIT_KEY } = require("../../constants/keys");
const {
  GAME_TURN_WIN_RESULT,
  GAME_TURN_LOSE_RESULT,
} = require("../../constants/game");
const { SUPERPOWER_POWER_LIST } = require("../../constants/superpower");
const {
  createSuperheroObject,
  createDefaultVillain,
} = require("../../helpers/character");
const {
  getTurnResult,
  getTurnHasCriticalHit,
  isCriticalHit,
  checkIsPlayerWinner,
  getTurnEndUIStringParams,
} = require("../../helpers/game");
const {
  getSuperpowerFromKeySelection,
  getPowerFromKeySelection,
} = require("../../helpers/superpower");
const { randomise } = require("../../utils/number/randomise");
const { capitalize, interpolate } = require("../../utils/string");
const {
  getUserInterfaceFromSource,
  displayUserInterface,
} = require("../../utils/ui");
const { setReadlinePrompt, promptUserInput } = require("../readline");

/** @type {number} */
let turnNum = 0;
/** @type {string} */
let personName;
/** @type {string} */
let heroName;
/** @type {Superhero} */
let superhero;
/** @type {Villain} */
let villain;

// Update game context

/**
 *
 * @returns {number}
 */
function getTurnNum() {
  return turnNum;
}

function setNextTurn() {
  turnNum++;
}

/**
 *
 * @returns {string}
 */
function getPersonName() {
  return personName;
}

/**
 *
 * @param {string} name
 */
function setPersonName(name) {
  personName = name;
}

/**
 *
 * @returns {string}
 */
function getHeroName() {
  return heroName;
}

/**
 *
 * @param {string} name
 */
function setHeroName(name) {
  heroName = name;
}

/**
 *
 * @returns {Superhero}
 */
function getSuperhero() {
  return superhero;
}

/**
 *
 * @param {Superhero} superheroObj
 */
function setSuperhero(superheroObj) {
  superhero = superheroObj;
}

/**
 *
 * @returns {Villain}
 */
function getVillain() {
  return villain;
}

/**
 *
 * @param {Villain} villainObj
 */
function setVillain(villainObj) {
  villain = villainObj;
}

// UI Display

/** Display main menu UI */
function displayMainMenu() {
  setReadlinePrompt("Press key");
  const mainMenuUi = getUserInterfaceFromSource(MAIN_MENU_UI_PATH);
  displayUserInterface(mainMenuUi, mainMenuInputCallback);
}

/** Display quit game UI */
function displayQuitGame() {
  const quitGameUi = getUserInterfaceFromSource(QUIT_UI_PATH);
  displayUserInterface(quitGameUi);
  process.exit(0);
}

/** Display help instructions UI */
function displayHelpInstructions() {
  setReadlinePrompt("Press key");
  const helpUi = getUserInterfaceFromSource(HELP_UI_PATH);
  displayUserInterface(helpUi, helpInstructionsInputCallback);
}

/** Display create person UI */
function displayCreatePerson() {
  setReadlinePrompt("Enter name");
  const createPersonUi = getUserInterfaceFromSource(CREATE_PERSON_UI_PATH);
  displayUserInterface(createPersonUi, createPersonCallback);
}

/** Display create superhero UI */
function displayCreateSuperhero() {
  setReadlinePrompt("Enter superhero name");
  const createSuperheroUi = getUserInterfaceFromSource(CREATE_HERO_UI_PATH);
  displayUserInterface(createSuperheroUi, createSuperheroCallback);
}

/** Display select superpower UI */
function displaySelectSuperpower() {
  setReadlinePrompt("Choose a superpower");
  const selectSuperpowerUi = getUserInterfaceFromSource(
    SELECT_SUPERPOWER_UI_PATH
  );
  displayUserInterface(selectSuperpowerUi, selectSuperpowerCallback);
}

/** Display start turn UI */
function displayStartTurn() {
  setReadlinePrompt("Choose a move");
  const startTurnUi = getUserInterfaceFromSource(START_TURN_UI_PATH);
  displayUserInterface(startTurnUi);
  console.log(
    `${getVillain().getName()}: ${getVillain().getSelfIntroduction()}\r\n`
  );
  console.log(
    `${getSuperhero().getName()}: ${getSuperhero().getSelfIntroduction()}\r\n`
  );
  promptUserInput(gameTurnCallback);
}

// UI User Input Prompt Callback Functions

/** @type {import("../readline/types").promptInputCallback} */
function mainMenuInputCallback(input) {
  switch (capitalize(input)) {
    case START_GAME_KEY:
      displayCreatePerson();
      break;
    case HELP_KEY:
      displayHelpInstructions();
      break;
    case QUIT_KEY:
      displayQuitGame();
    default:
      promptUserInput(mainMenuInputCallback);
  }
}

/** @type {import("../readline/types").promptInputCallback} */
function helpInstructionsInputCallback(input) {
  switch (capitalize(input)) {
    case START_GAME_KEY:
      displayCreatePerson();
      break;
    case QUIT_KEY:
      displayQuitGame();
    default:
      promptUserInput(helpInstructionsInputCallback);
  }
}

/** @type {import("../readline/types").promptInputCallback} */
function createPersonCallback(input) {
  setPersonName(input);
  displayCreateSuperhero();
}

/** @type {import("../readline/types").promptInputCallback} */
function createSuperheroCallback(input) {
  setHeroName(input);
  displaySelectSuperpower();
}

/** @type {import("../readline/types").promptInputCallback} */
function selectSuperpowerCallback(input) {
  const superpower = getSuperpowerFromKeySelection(capitalize(input));
  if (superpower === null) promptUserInput(selectSuperpowerCallback);
  else {
    setSuperhero(
      createSuperheroObject(getPersonName(), getHeroName(), superpower)
    );
    setVillain(createDefaultVillain());
    displayStartTurn();
  }
}

/** @type {import("../readline/types").promptInputCallback} */
function gameTurnCallback(input) {
  setNextTurn();
  const heroMove = getPowerFromKeySelection(capitalize(input));
  if (heroMove === null) promptUserInput(gameTurnCallback);
  else {
    // get random move for villain and calculate turn result
    const randomIndex = randomise(0, SUPERPOWER_POWER_LIST.length - 1);
    const villainMove = SUPERPOWER_POWER_LIST[randomIndex];
    const turnResult = getTurnResult(heroMove, villainMove);

    // check if superhero or villain has critical hit
    const isHeroCrit = isCriticalHit(
      heroMove,
      getSuperhero().getSuperpower().getPower()
    );
    const isVillainCrit = isCriticalHit(
      villainMove,
      getVillain().getSuperpower().getPower()
    );
    const turnHasCriticalHit = getTurnHasCriticalHit(isHeroCrit, isVillainCrit);

    // reduce HP for either superhero or villain
    if (turnResult === GAME_TURN_WIN_RESULT)
      getVillain().reduceHp(turnHasCriticalHit);
    if (turnResult === GAME_TURN_LOSE_RESULT)
      getSuperhero().reduceHp(turnHasCriticalHit);

    // check if player meets winning condition
    const isPlayerWinner = checkIsPlayerWinner(
      getSuperhero().getHp(),
      getVillain().getHp()
    );

    let nextUi = getUserInterfaceFromSource(
      isPlayerWinner === null ? NEXT_TURN_UI_PATH : END_GAME_UI_PATH
    );
    /** @type {import("../../helper/game/types").turnEndUIInterpolatePayload} */
    const payload = {
      turnNum: getTurnNum(),
      heroMove: heroMove,
      villainMove: villainMove,
      turnResult: turnResult,
      hasCriticalHit: turnHasCriticalHit,
      superhero: getSuperhero(),
      villain: getVillain(),
      winnerName:
        isPlayerWinner === null
          ? null
          : isPlayerWinner
          ? getSuperhero().getName()
          : getVillain().getName(),
    };
    nextUi = interpolate(nextUi, getTurnEndUIStringParams(payload));

    let callback = gameTurnCallback;
    if (isPlayerWinner !== null) {
      setReadlinePrompt("Press any key to quit");
      callback = endGameCallback;
    }
    displayUserInterface(nextUi, callback);
  }
}

/** @type {import("../readline/types").promptInputCallback} */
function endGameCallback() {
  displayQuitGame();
}

module.exports = {
  displayMainMenu,
  displayHelpInstructions,
  displayQuitGame,
  displayCreatePerson,
  displayCreateSuperhero,
  displaySelectSuperpower,
  displayStartTurn,
};
