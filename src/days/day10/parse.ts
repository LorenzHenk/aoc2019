export interface Asteroid {
  x: number;
  y: number;
}

export interface Map {
  asteroids: Asteroid[];
  size: {
    width: number;
    height: number;
  };
}

export function parse(input: string): Map {
  const lines = input.split("\n").map((line) => line.trim());
  const asteroids: Asteroid[] = [];
  lines.forEach((line, y) => {
    const characters = line.split("");
    characters.forEach((character, x) => {
      if (character === "#") {
        asteroids.push({ x, y });
      }
    });
  });
  return { asteroids, size: { width: lines[0].length, height: lines.length } };
}
