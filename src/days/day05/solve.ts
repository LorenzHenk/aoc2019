import { parse } from "./parse";
import { runPartOne, runPartTwo } from "./run";

export const solvePartOne = (input: string) => {
  const intcode = parse(input);
  const result = runPartOne(intcode);

  return result.output[result.output.length - 1];
};

export const solvePartTwo = (input: string) => {
  const intcode = parse(input);
  const result = runPartTwo(intcode);

  return result.output[result.output.length - 1];
};
