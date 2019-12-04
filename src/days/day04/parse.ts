export const parse = (input: string) => {
  const [start, end] = input.split("-").map(p => parseInt(p));
  const passwords = [];
  for (let i = start; i <= end; i++) {
    passwords.push(i.toString());
  }
  return passwords;
};
