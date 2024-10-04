const {
  isCriticalHit,
  getTurnHasCriticalHit,
  checkIsPlayerWinner,
  getTurnResult,
  getTurnEndUIStringParams,
} = require("./");
const {
  MockSuperheroHelper,
  MockVillainHelper,
  MockPersonHelper,
} = require("../test/character");
const {
  SUPERPOWER_ROCK,
  SUPERPOWER_SCISSORS,
  SUPERPOWER_PAPER,
} = require("../../constants/superpower");
const {
  GAME_TURN_DRAW_RESULT,
  GAME_TURN_WIN_RESULT,
  GAME_TURN_LOSE_RESULT,
} = require("../../constants/game");

const IS_CRIT_TABLE = [
  [true, SUPERPOWER_ROCK, SUPERPOWER_ROCK],
  [false, SUPERPOWER_ROCK, SUPERPOWER_SCISSORS],
];

const TURN_HAS_CRIT_TABLE = [
  [true, true, true],
  [false, false, false],
];

const IS_PLAYER_WINNER_TABLE = [
  [true, 2, 0],
  [false, 0, 2],
  [null, 2, 2],
];

const TURN_RESULT_TABLE = [
  [GAME_TURN_DRAW_RESULT, SUPERPOWER_ROCK, SUPERPOWER_ROCK],
  [GAME_TURN_WIN_RESULT, SUPERPOWER_ROCK, SUPERPOWER_SCISSORS],
  [GAME_TURN_WIN_RESULT, SUPERPOWER_SCISSORS, SUPERPOWER_PAPER],
  [GAME_TURN_WIN_RESULT, SUPERPOWER_PAPER, SUPERPOWER_ROCK],
  [GAME_TURN_LOSE_RESULT, SUPERPOWER_ROCK, SUPERPOWER_PAPER],
];

describe("Game helper functions", () => {
  test.concurrent.each(IS_CRIT_TABLE)(
    "should return critical hit is %s by comparing move %s and power %s",
    async (expected, move, power) => {
      const result = isCriticalHit(move, power);
      expect(result).toEqual(expected);
    }
  );

  test.concurrent.each(TURN_HAS_CRIT_TABLE)(
    "should return turn has critical hit is %s by comparing hero has critical hit %s and villain has critical hit %s",
    async (expected, isHeroCrit, isVillainCrit) => {
      const result = getTurnHasCriticalHit(isHeroCrit, isVillainCrit);
      expect(result).toEqual(expected);
    }
  );

  test.concurrent.each(IS_PLAYER_WINNER_TABLE)(
    "should return is player winner as %s if hero HP is %i and villain HP is %i",
    async (expected, heroHp, villainHp) => {
      const result = checkIsPlayerWinner(heroHp, villainHp);
      expect(result).toEqual(expected);
    }
  );

  test.concurrent.each(TURN_RESULT_TABLE)(
    "should return turn result %s if hero move is %s and villain move is %s",
    async (expected, heroMove, villainMove) => {
      const result = getTurnResult(heroMove, villainMove);
      expect(result).toEqual(expected);
    }
  );

  describe("get string params to interpolate into turn end UI", () => {
    const turnNum = 3;
    const heroMove = SUPERPOWER_ROCK;
    const villainMove = SUPERPOWER_SCISSORS;
    const turnResult = GAME_TURN_WIN_RESULT;
    const hasCriticalHit = true;
    const superhero = MockSuperheroHelper.createMockSuperhero();
    const villain = MockVillainHelper.createMockVillain();
    const winnerName = null;

    /** @type {import("./types").turnEndUIInterpolatePayload} */
    const payload = {
      turnNum,
      heroMove,
      villainMove,
      turnResult,
      hasCriticalHit,
      superhero,
      villain,
      winnerName,
    };

    /** @type {import("./types").turnEndUIStringParams} */
    const params = {
      turnNum,
      heroMove,
      villainMove,
      turnResult,
      critMsg: "CRITICAL HIT",
      heroName: superhero.getName(),
      villainName: villain.getName(),
      heroHp: superhero.getHp(),
      villainHp: villain.getHp(),
      winnerName,
    };

    test("should get correct string params based on function args", () => {
      let result = getTurnEndUIStringParams(payload);
      expect(result).toEqual(params);

      villain.reduceHp(true);
      villain.reduceHp(true);
      result = getTurnEndUIStringParams({ ...payload, hasCriticalHit: false });
      expect(result).toEqual({ ...params, critMsg: "", villainHp: 0 });
    });
  });
});
