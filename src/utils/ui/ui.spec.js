const console = require("node:console");
const fs = require("node:fs");
const {
  getUserInterfaceFromSource,
  displayHeaderUserInterface,
  displayUserInterface,
} = require("./");
const { HEADER_UI_PATH } = require("../../constants/path");
const { promptUserInput } = require("../../services/readline");

jest.mock("node:console", () => ({
  log: jest.fn(),
  clear: jest.fn(),
}));
jest.mock("../../services/readline", () => ({
  promptUserInput: jest.fn(),
}));

describe("UI utility functions", () => {
  const uiString = "this is test string";
  /** @type {jest.SpyInstance<typeof fs, "readFileSync">} */
  let fsReadFileSyncMock;

  beforeEach(() => {
    fsReadFileSyncMock = jest
      .spyOn(fs, "readFileSync")
      .mockReturnValue(uiString);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("should get UI string from source file based on string path provided", () => {
    const path = "test path";
    const ui = getUserInterfaceFromSource(path);
    expect(fsReadFileSyncMock).toHaveBeenCalledWith(path, "utf-8");
    expect(ui).toEqual(uiString);
  });

  test("should display header UI string", () => {
    displayHeaderUserInterface();
    expect(fsReadFileSyncMock).toHaveBeenCalledWith(HEADER_UI_PATH, "utf-8");
    expect(console.log).toHaveBeenCalledWith(uiString);
  });

  test("should display user interface and prompt user input if callback function provided", () => {
    /** @type {import("../../services/readline/types").promptInputCallback} */
    const callback = (input) => {};
    displayUserInterface(uiString, callback);
    expect(console.clear).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith(uiString);
    expect(promptUserInput).toHaveBeenCalledWith(callback);
  });

  test("should display user interface without callback function provided", () => {
    displayUserInterface(uiString);
    expect(console.clear).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith(uiString);
    expect(promptUserInput).not.toHaveBeenCalled();
  });
});
