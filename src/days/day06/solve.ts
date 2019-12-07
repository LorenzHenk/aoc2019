import { parse } from "./parse";
import { createObjectMap } from "./spaceObjects";
import { calculateTotalDistance, calculateDistanceBetween } from "./calc";

export const solvePartOne = (input: string) => {
  const parsed = parse(input);
  const map = createObjectMap(parsed);
  const result = calculateTotalDistance(map);
  return result;
};

export const solvePartTwo = (input: string) => {
  const parsed = parse(input);
  const map = createObjectMap(parsed);
  const result = calculateDistanceBetween(
    map,
    map["YOU"].orbitsAroundIdentifier!,
    map["SAN"].orbitsAroundIdentifier!,
  );
  return result;
};
