import { parsePartOne } from "./parse";
import { calculateFuel, calculateFuelWithFuel } from "./calc";

export const solvePartOne = (input: string) =>
  parsePartOne(input)
    .map(n => calculateFuel(n))
    .reduce((p, c) => p + c, 0);

export const solvePartTwo = (input: string) =>
  parsePartOne(input)
    .map(n => calculateFuelWithFuel(n))
    .reduce((p, c) => p + c, 0);
