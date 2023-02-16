import { checkValidId } from "../util/objectid";

describe("Check whether given string is a valid mongoose ObjectId", () => {
  test("Valid id 1", () => {
    expect(checkValidId("594ced02ed345b2b049222c5")).toBe(true);
  });

  test("Invalid id 1", () => {
    expect(checkValidId("geeks")).toBe(false);
  });

  test("Invalid id 2", () => {
    expect(checkValidId("toptoptoptop")).toBe(false);
  });

  test("Invalid id 3", () => {
    expect(checkValidId("geeksfogeeks")).toBe(false);
  });
});
