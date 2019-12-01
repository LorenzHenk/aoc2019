import { solvePartOne, solvePartTwo } from "./solve";

describe("solvePartOne", () => {
  test("Works fine with README input", () => {
    const input = ["12", "14", "1969", "100756"].join("\n");
    expect(solvePartOne(input)).toBe(2 + 2 + 654 + 33583);
  });
});

describe("solvePartTwo", () => {
  test("Works fine with README input", () => {
    const input = ["14", "1969", "100756"].join("\n");
    expect(solvePartTwo(input)).toBe(2 + 966 + 50346);
  });
});
