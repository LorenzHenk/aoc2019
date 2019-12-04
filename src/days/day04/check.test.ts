import {
  checkPassword,
  checkPasswords,
  checkPassword2,
  isValueAscending,
} from "./check";

const input = ["111111", "122345", "111123", "223450", "134679"];
test("checkPassword works fine", () => {
  expect(checkPassword(input[0])).toBeTruthy();
  expect(checkPassword(input[1])).toBeTruthy();
  expect(checkPassword(input[2])).toBeTruthy();
  expect(checkPassword(input[3])).toBeFalsy();
  expect(checkPassword(input[4])).toBeFalsy();
  expect(isValueAscending(input[4])).toBeTruthy();
});

test("checkPassword2 works fine", () => {
  expect(checkPassword2("112233")).toBeTruthy();
  expect(checkPassword2("123444")).toBeFalsy();
  expect(checkPassword2("111122")).toBeTruthy();
});

test("checkPasswords works fine", () => {
  expect(checkPasswords(input, checkPassword).length).toEqual(4);
});
