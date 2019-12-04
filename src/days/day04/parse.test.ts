import { parse } from "./parse";

test("Parses correctly", () => {
  const input = `111111-111120`;
  expect(parse(input).length).toEqual(10);
});
