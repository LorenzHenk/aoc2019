import { Asteroid, parse } from "./parse";

function isPositive(n: number): boolean {
  return n > 0;
}

/**
 * get the amount of detectable asteroids for a specific asteroid
 * @param asteroids all asteroids
 * @param asteroid the asteroid where the detectable asteroids should be checked from
 */
export function getDetectableAsteroids(
  asteroids: Asteroid[],
  asteroid: Asteroid,
): number {
  // exclude current asteroid
  const asteroidsWithoutCurrent = asteroids.filter(
    (a) => a.x !== asteroid.x || a.y !== asteroid.y,
  );

  const relativePositions = asteroidsWithoutCurrent.map((a) => ({
    x: a.x - asteroid.x,
    y: a.y - asteroid.y,
  }));

  let detectableAsteroidCount = 0;
  relativePositions.forEach((a, i) => {
    if (a.x !== 0 && a.y !== 0) {
      if (
        relativePositions
          .slice(0, i)
          // the idea is to check if the ratio between X coordinates is the same as between Y coordinates
          .every(
            (other) =>
              !(
                other.x / a.x === other.y / a.y &&
                isPositive(a.x) === isPositive(other.x) &&
                isPositive(a.y) === isPositive(other.y)
              ),
          )
      ) {
        detectableAsteroidCount += 1;
      } else {
      }
    } else {
      // do some special checks to fix null division
      if (
        relativePositions
          .slice(0, i)
          .every(
            (other) =>
              (a.x === 0 &&
                !(other.x === 0 && isPositive(a.y) === isPositive(other.y))) ||
              (a.y === 0 &&
                !(other.y === 0 && isPositive(a.x) === isPositive(other.x))),
          )
      ) {
        detectableAsteroidCount += 1;
      } else {
      }
    }
  });

  return detectableAsteroidCount;
}

export function runPartOne(input: string): number {
  const { asteroids } = parse(input);
  const detectableAsteroids = asteroids.map((asteroid) =>
    getDetectableAsteroids(asteroids, asteroid),
  );
  print(asteroids);
  print(asteroids, detectableAsteroids);
  return Math.max(...detectableAsteroids);
}

function print(asteroids: Asteroid[], values?: number[]) {
  const maxX = Math.max(...asteroids.map(({ x }) => x));
  const maxY = Math.max(...asteroids.map(({ y }) => y));

  const maxLength = values ? Math.max(...values).toString().length : 1;

  const lines = [];
  for (let y = 0; y <= maxY; y++) {
    const line = [];
    for (let x = 0; x <= maxX; x++) {
      const index = asteroids.findIndex((a) => a.x === x && a.y === y);
      line.push(index === -1 ? "." : values?.[index] ?? "#");
    }
    lines.push(line.map((l) => l.toString().padStart(maxLength)).join(" "));
  }
  console.log(lines.join("\n"));
}
