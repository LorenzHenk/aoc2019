import { checkPassword, checkPasswords } from "./check";

const input = ["111111", "122345", "111123", "223450", "134679"];
test("checkPassword works fine", () => {
  expect(checkPassword(input[0])).toBeTruthy();
  expect(checkPassword(input[1])).toBeTruthy();
  expect(checkPassword(input[2])).toBeTruthy();
  expect(checkPassword(input[3])).toBeFalsy();
  expect(checkPassword(input[4])).toBeTruthy();
});

test("checkPasswords works fine", () => {
  expect(checkPasswords(input).length).toEqual(4);
});
