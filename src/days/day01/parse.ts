export const parsePartOne = (input: string): number[] =>
  input
    .split("\n")
    .map(s => s.trim())
    .filter(Boolean)
    .map(s => parseInt(s, 10));
