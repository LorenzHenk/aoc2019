import { parse } from "./parse";
import { createObjectMap } from "./spaceObjects";
import { calculateTotalDistance } from "./calc";

export const solvePartOne = (input: string) => {
  const parsed = parse(input);
  const map = createObjectMap(parsed);
  const result = calculateTotalDistance(map);
  return result;
};
