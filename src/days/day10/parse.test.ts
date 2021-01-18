import { parse } from "./parse";

describe("parse", () => {
  test("parsing example one works fine", () => {
    const input = `.#..#
.....
#####
....#
...##`;
    expect(parse(input).asteroids).toEqual([
      { x: 1, y: 0 },
      { x: 4, y: 0 },
      { x: 0, y: 2 },
      { x: 1, y: 2 },
      { x: 2, y: 2 },
      { x: 3, y: 2 },
      { x: 4, y: 2 },
      { x: 4, y: 3 },
      { x: 3, y: 4 },
      { x: 4, y: 4 },
    ]);
  });
});
