import { Asteroid, parse } from "./parse";

function printMap(asteroids: Asteroid[], values?: number[]) {
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

function isPositive(n: number): boolean {
  return n > 0;
}

interface DetectedAsteroidsResult {
  allAsteroids: { absolute: Asteroid; relative: Asteroid }[];
  detectedAsteroidsRelative: Asteroid[];
  currentAsteroid: Asteroid;
}

/**
 * get the amount of detectable asteroids for a specific asteroid
 * @param asteroids all asteroids
 * @param asteroid the asteroid where the detectable asteroids should be checked from
 */
export function getDetectableAsteroids(
  asteroids: Asteroid[],
  asteroid: Asteroid,
): DetectedAsteroidsResult {
  // exclude current asteroid
  const asteroidsWithoutCurrent = asteroids.filter(
    (a) => a.x !== asteroid.x || a.y !== asteroid.y,
  );

  const relativePositions = asteroidsWithoutCurrent.map((a) => ({
    x: a.x - asteroid.x,
    y: a.y - asteroid.y,
  }));

  let detectableAsteroids: Asteroid[] = [];
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
        detectableAsteroids.push(a);
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
        detectableAsteroids.push(a);
      } else {
      }
    }
  });

  return {
    detectedAsteroidsRelative: detectableAsteroids,
    allAsteroids: relativePositions.map((a, index) => ({
      relative: a,
      absolute: asteroidsWithoutCurrent[index],
    })),
    currentAsteroid: asteroid,
  };
}

export function runPartOne(input: string): number {
  const { asteroids } = parse(input);
  const asteroidResults = asteroids.map((asteroid) =>
    getDetectableAsteroids(asteroids, asteroid),
  );
  const detectedAsteroidCounts = asteroidResults.map(
    (r) => r.detectedAsteroidsRelative.length,
  );
  printMap(asteroids);
  printMap(asteroids, detectedAsteroidCounts);
  return Math.max(...detectedAsteroidCounts);
}

export function runPartTwo(input: string): number {
  const { asteroids } = parse(input);
  const asteroidResults = asteroids.map((asteroid) =>
    getDetectableAsteroids(asteroids, asteroid),
  );
  const detectedAsteroidCounts = asteroidResults.map(
    (r) => r.detectedAsteroidsRelative.length,
  );

  const max = Math.max(...detectedAsteroidCounts);

  const monitoringStationIndex = asteroidResults.findIndex(
    (r) => r.detectedAsteroidsRelative.length === max,
  );

  // our monitoring station
  const monitoringStation = asteroidResults[monitoringStationIndex];

  const asteroidsWithPositionalInformation = monitoringStation.allAsteroids
    .map((a) => ({
      ...a,
      distance: Math.sqrt(
        Math.pow(a.relative.x, 2) + Math.pow(a.relative.y, 2),
      ),
      // use the degree for ordering
      // y must be inverted
      // use atan2 to get the correct angle (I learned this at a CCC some years ago)
      // convert from rad to deg
      degree: (Math.atan2(-1 * a.relative.y, a.relative.x) * 180) / Math.PI,
    }))
    // the degree when starting at the top and going clockwise
    .map((a) => ({ ...a, shiftedDegree: (360 - a.degree + 90) % 360 }));

  const asteroidsGroupedByDegree = asteroidsWithPositionalInformation.reduce(
    (acc, next) => ({
      ...acc,
      [next.shiftedDegree]: [...(acc[next.shiftedDegree] ?? []), next].sort(
        // lower distance first
        (a, b) => a.distance - b.distance,
      ),
    }),
    {} as Record<number, typeof asteroidsWithPositionalInformation>,
  );

  // use this list to determine the next asteroid
  const possibleDegreeValues = Object.keys(asteroidsGroupedByDegree)
    .map((v) => Number(v))
    .sort((a, b) => a - b);

  let asteroidWithPositionalInformation:
    | typeof asteroidsWithPositionalInformation[number]
    | null = null;
  let i = 0;
  for (; i < 200 && possibleDegreeValues.length; i++) {
    // get the next degree value to look at
    const [shiftedDegree] = possibleDegreeValues.splice(0, 1);
    const group = asteroidsGroupedByDegree[shiftedDegree];

    // get the nearest asteroid
    asteroidWithPositionalInformation = group.splice(0, 1)[0];

    if (group.length) {
      // put the degree at the end of the list if it should be visited again
      possibleDegreeValues.push(shiftedDegree);
    }
  }

  if (!asteroidWithPositionalInformation) {
    throw Error("invalid value!");
  }

  console.log(`${i}th asteroid destroyed:`, asteroidWithPositionalInformation);

  return (
    asteroidWithPositionalInformation.absolute.x * 100 +
    asteroidWithPositionalInformation.absolute.y
  );
}
