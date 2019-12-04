export const isValueAscending = (pw: string) =>
  pw
    .split("")
    .map(s => parseInt(s, 10))
    .reduce(
      (p, c) => (p !== false && c >= p ? c : false),
      0 as number | false,
    ) !== false;

export const checkPassword = (pw: string) =>
  /(\w)\1/.test(pw) && isValueAscending(pw);

export const checkPassword2 = (pw: string) =>
  !!pw.match(/(\d)\1+/g)?.some(l => l.length === 2) && isValueAscending(pw);

export const checkPasswords = (
  input: string[],
  checkPw: (pw: string) => boolean,
) => input.filter(p => checkPw(p));
