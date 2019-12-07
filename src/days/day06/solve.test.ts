import { solvePartOne } from "./solve";

test("SolvePartOne works fine", () => {
  const input = `COM)B
B)C
C)D
D)E
E)F
B)G
G)H
D)I
E)J
J)K
K)L`;

  const output = 42;
  expect(solvePartOne(input)).toBe(output);
});
