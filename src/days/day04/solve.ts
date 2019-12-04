import { parse } from "./parse";
import { checkPasswords, checkPassword, checkPassword2 } from "./check";

export const solvePartOne = (input: string) => {
  const possiblePasswords = parse(input);
  const results = checkPasswords(possiblePasswords, checkPassword);
  return new Set(results).size;
};

export const solvePartTwo = (input: string) => {
  const possiblePasswords = parse(input);
  const results = checkPasswords(possiblePasswords, checkPassword2);
  return new Set(results).size;
};
