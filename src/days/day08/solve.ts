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
};
