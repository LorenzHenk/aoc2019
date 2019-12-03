import { solvePartOne } from "./solve";

describe("Solve Part One", () => {
  test("First example", () => {
    const paths = [`R8,U5,L5,D3`, `U7,R6,D4,L4`].join("\n");
    expect(solvePartOne(paths)).toEqual(6);
  });
  test("Second example", () => {
    const paths = `R75,D30,R83,U83,L12,D49,R71,U7,L72
    U62,R66,U55,R34,D71,R55,D58,R83`;
    expect(solvePartOne(paths)).toEqual(159);
  });
  test("Third example", () => {
    const paths = `R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51
    U98,R91,D20,R16,D67,R40,U7,R15,U6,R7`;
    expect(solvePartOne(paths)).toEqual(135);
  });
});
