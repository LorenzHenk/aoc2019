import { parse } from "./parse";
import { runPartOne, runPartTwo } from "./run";

export const solvePartOne = (input: string) => {
  const intcode = parse(input);
  const result = runPartOne(intcode, 1);

  return result.output[result.output.length - 1];
};

export const solvePartTwo = (input: string) => {
  const intcode = parse(input);
  const result = runPartTwo(intcode, 2);

  return result.output[result.output.length - 1];
};
