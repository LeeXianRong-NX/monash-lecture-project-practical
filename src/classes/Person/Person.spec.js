const { PERSON_SELF_INTRO_MSG } = require("../../constants/character");
const { MockPersonHelper } = require("../../helper/test");
const { interpolate } = require("../../utils/string");
const Person = require("./Person");

const { mockPersonName, createMockPerson } = MockPersonHelper;

describe("Person class", () => {
  /** @type {Person} */
  let person;

  beforeEach(() => {
    person = createMockPerson();
  });

  test("should create Person instance", () => {
    expect(person).toBeDefined();
  });

  test("should get person name", () => {
    const name = person.getName();
    expect(name).toEqual(mockPersonName);
  });

  test("should get self introduction message", () => {
    const selfIntro = person.getSelfIntroduction();
    expect(selfIntro).toEqual(
      interpolate(PERSON_SELF_INTRO_MSG, {
        name: mockPersonName,
      })
    );
  });
});
