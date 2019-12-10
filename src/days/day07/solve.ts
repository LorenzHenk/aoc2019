import { parse } from "./parse";
import { preparePartOne, preparePartTwo } from "./phase";

export const solvePartOne = (input: string) => {
  const intcodes = parse(input);

  const allResults = preparePartOne(intcodes);
  return Math.max(...allResults.map(r => r.result));
};

export const solvePartTwo = (input: string) => {
  const intcodes = parse(input);

  const allResults = preparePartTwo(intcodes);
  return Math.max(...allResults.map(r => r.result));
};
