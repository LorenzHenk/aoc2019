import { Asteroid } from "./parse";
import { getDetectableAsteroids, runPartOne, runPartTwo } from "./run";

describe("test implementation", () => {
  test("getDetectableAsteroids recognizes all 8 asteroids directly around it", () => {
    const asteroids: Asteroid[] = Array.from({ length: 9 }).map((_, index) => ({
      x: index % 3,
      y: Math.floor(index / 3),
    }));
    expect(
      getDetectableAsteroids(asteroids, asteroids[4]).detectedAsteroidsRelative
        .length,
    ).toEqual(8);
  });
});

describe("test examples", () => {
  test("example 1", () => {
    const input = `.#..#
.....
#####
....#
...##`;

    expect(runPartOne(input)).toEqual(8);
  });

  test("example 2", () => {
    const input = `    ......#.#.
#..#.#....
..#######.
.#.#.###..
.#..#.....
..#....#.#
#..#....#.
.##.#..###
##...#..#.
.#....####`;

    expect(runPartOne(input)).toEqual(33);
  });

  test("example 3", () => {
    const input = `    #.#...#.#.
    .###....#.
    .#....#...
    ##.#.#.#.#
    ....#.#.#.
    .##..###.#
    ..#...##..
    ..##....##
    ......#...
    .####.###.`;

    expect(runPartOne(input)).toEqual(35);
  });

  test("example 4", () => {
    const input = `.#..#..###
    ####.###.#
    ....###.#.
    ..###.##.#
    ##.##.#.#.
    ....###..#
    ..#.#..#.#
    #..#.#.###
    .##...##.#
    .....#.#..`;

    expect(runPartOne(input)).toEqual(41);
  });

  test("example 5", () => {
    const input = `.#..##.###...#######
    ##.############..##.
    .#.######.########.#
    .###.#######.####.#.
    #####.##.#.##.###.##
    ..#####..#.#########
    ####################
    #.####....###.#.#.##
    ##.#################
    #####.##.###..####..
    ..######..##.#######
    ####.##.####...##..#
    .#####..#.######.###
    ##...#.##########...
    #.##########.#######
    .####.#.###.###.#.##
    ....##.##.###..#####
    .#.#.###########.###
    #.#.#.#####.####.###
    ###.##.####.##.#..###`;

    expect(runPartOne(input)).toEqual(210);
    expect(runPartTwo(input)).toEqual(802);
  });
});
