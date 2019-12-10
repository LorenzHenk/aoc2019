export const parse = (input: string) =>
  input.split(",").map(e => parseInt(e, 10));
