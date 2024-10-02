const readline = require("node:readline");
const { stdin, stdout } = require("node:process");
const {
  initReadlineInterface,
  pauseReadline,
  resumeReadline,
  setReadlinePrompt,
  getReadlinePrompt,
  promptNewReadline,
  closeReadline,
  askQuestionReadline,
} = require("./readline");

describe("readline service", () => {
  /** @type {readline.Interface} */
  let mockRlInterface = {
    pause: jest.fn(),
    resume: jest.fn(),
    setPrompt: jest.fn(),
    getPrompt: jest.fn().mockReturnValue("test>"),
    prompt: jest.fn(),
    question: jest.fn((question, callback) => {}),
    close: jest.fn(),
  };
  let mockRlCreateInterface;

  beforeEach(() => {
    mockRlCreateInterface = jest
      .spyOn(readline, "createInterface")
      .mockReturnValue(mockRlInterface);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should initialize new readline interface instance", () => {
    initReadlineInterface();
    expect(mockRlCreateInterface).toHaveBeenCalledWith({
      input: stdin,
      output: stdout,
    });
  });

  test("should not initialize new readline interface instance if existing one found", () => {
    initReadlineInterface();
    initReadlineInterface();
    expect(mockRlCreateInterface).toHaveBeenCalledTimes(0);
  });

  test("should pause readline interface", () => {
    pauseReadline();
    expect(mockRlInterface.pause).toHaveBeenCalled();
  });

  test("should resume readline interface", () => {
    resumeReadline();
    expect(mockRlInterface.resume).toHaveBeenCalled();
  });

  test("should set readline interface prompt", () => {
    const prompt = "test>";
    setReadlinePrompt(prompt);
    expect(mockRlInterface.setPrompt).toHaveBeenCalledWith(prompt);
  });

  test("should get readline interface prompt", () => {
    const prompt = "test>";
    setReadlinePrompt(prompt);
    const result = getReadlinePrompt();
    expect(mockRlInterface.getPrompt).toHaveBeenCalled();
    expect(result).toEqual(prompt);
  });

  test("should prompt new readline for user input", () => {
    promptNewReadline();
    expect(mockRlInterface.prompt).toHaveBeenCalled();
  });

  test("should display question and prompt for user input", () => {
    const prompt = "test>";
    const question = "What is your question?";
    const callback = (answer) => {};
    askQuestionReadline(question, callback);
    expect(mockRlInterface.question).toHaveBeenCalledWith(
      `${prompt} ${question}`,
      callback
    );
  });

  test("should close readline interface", () => {
    closeReadline();
    expect(mockRlInterface.close).toHaveBeenCalled();
  });

  test("should throw error if no readline interface instance found", () => {
    expect(() => pauseReadline()).toThrow();
  });
});
