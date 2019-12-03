import { parse } from "./parse";
import { run } from "./run";

export const solvePartOne = (input: string) => {
  const intcode = parse(input);
  intcode[1] = 12;
  intcode[2] = 2;
  const result = run(intcode);

  return result[0];
};
