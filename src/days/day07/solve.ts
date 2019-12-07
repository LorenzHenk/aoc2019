import { parse } from "./parse";
import { runAllPhases } from "./phase";

export const solvePartOne = (input: string) => {
  const intcodes = parse(input);

  const allResults = runAllPhases(intcodes);
  return Math.max(...allResults.map(r => r.result));
};
