const readline = require("node:readline");
const { stdin, stdout } = require("node:process");
const {
  getReadlineInterface,
  setReadlinePrompt,
  promptUserInput,
} = require(".");

jest.mock("node:readline", () => ({
  createInterface: jest.fn().mockReturnValue({
    question: jest
      .fn()
      .mockImplementation((input, callback) => callback(input)),
    setPrompt: jest.fn(),
    getPrompt: jest.fn(),
  }),
}));

describe("Readline service methods", () => {
  /** @type {readline.Interface} */
  let rl = null;

  beforeEach(() => {
    jest.resetModules();
    rl = getReadlineInterface();
  });

  afterEach(() => {
    rl = null;
  });

  test("should create new readline interface and return the new interface", () => {
    expect(readline.createInterface).toHaveBeenCalledWith({
      input: stdin,
      output: stdout,
    });
    expect(rl).not.toBeNull();
  });

  test("should get existing readline interface", () => {
    rl = getReadlineInterface();
    expect(readline.createInterface).toHaveBeenCalledTimes(1);
    expect(rl).not.toBeNull();
  });

  test("should set readline prompt with prompt string provided", () => {
    const prompt = "This is prompt";
    setReadlinePrompt(prompt);
    expect(rl.setPrompt).toHaveBeenCalledWith(`${prompt} > `);
  });

  test("should prompt for user input and execute callback function provided", () => {
    /** @type {import("./types").promptInputCallback} */
    const callback = (input) => {};
    const prompt = rl.getPrompt();

    promptUserInput(callback);
    expect(rl.getPrompt).toHaveBeenCalled();
    expect(rl.question).toHaveBeenCalledWith(prompt, callback);
  });
});
