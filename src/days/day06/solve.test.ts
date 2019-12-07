import { solvePartOne, solvePartTwo } from "./solve";

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

test("SolvePartTwo works fine", () => {
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
K)L
K)YOU
I)SAN`;

  const output = 4;
  expect(solvePartTwo(input)).toBe(output);
});
