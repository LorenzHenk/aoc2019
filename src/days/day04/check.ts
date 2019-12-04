export const checkPassword = (pw: string) =>
  /(\w)\1/.test(pw) &&
  pw
    .split("")
    .map(s => parseInt(s, 10))
    .reduce(
      (p, c) => (p !== false && c >= p ? c : false),
      0 as number | false,
    ) !== false;

export const checkPasswords = (input: string[]) =>
  input.filter(p => checkPassword(p));
