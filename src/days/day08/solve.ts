import { parseOne } from "./parse";

export const solvePartOne = (input: string) => {
  const parsed = parseOne(input);
  let found = { count: Infinity, ix: 0 };

  Object.keys(parsed).forEach(ix => {
    const layer = parsed[parseInt(ix)];
    const count = layer.reduce((p, c) => (c === 0 ? p + 1 : p), 0);
    if (count < found.count) {
      found = { count, ix: parseInt(ix) };
    }
  });

  let layer = parsed[found.ix];
  return (res => res[1] * res[2])(
    layer.reduce(
      (p, c) => ({ ...p, [c]: (p[c] || 0) + 1 }),
      {} as Record<number, number>,
    ),
  );
};

export const solvePartTwo = (input: string) => {
  const parsed = parseOne(input);
  const keys = Object.keys(parsed);
  const width = 25;
  const height = 6;
  const size = width * height;
  const res = [];
  for (let ix = 0; ix < size; ix++) {
    for (let kix = 0; kix < keys.length; kix++) {
      let layer = parsed[keys[kix]];

      if (layer[ix] !== 2) {
        res.push(layer[ix]);
        break;
      }
    }
  }

  for (let row = 0; row < height; row++) {
    const buffer = [];
    for (let column = 0; column < width; column++) {
      let r = res[row * width + column];
      buffer.push(r === 0 ? "█" : " ");
    }
    console.log(buffer.join(""));
  }
};
