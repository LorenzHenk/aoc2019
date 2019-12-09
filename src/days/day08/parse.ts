type Layer = number[];

export const parseOne = (input: string) => {
  return input
    .split("")
    .map(n => parseInt(n, 10))
    .reduce((p, c, ix) => {
      const i = Math.floor(ix / (25 * 6));
      return { ...p, [i]: [...(p[i] || []), c] };
    }, {} as Record<string, Layer>);
};
