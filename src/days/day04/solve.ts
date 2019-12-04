import { parse } from "./parse";
import { checkPasswords } from "./check";

export const solvePartOne = (input: string) => {
  const possiblePasswords = parse(input);
  const results = checkPasswords(possiblePasswords);

  return new Set(results).size;
};
