import { parse } from "./parse";
import { SpaceObject } from "./spaceObjects";

test("Parser works fine", () => {
  const input = `A)B
B)C
B)D`;
  const output: SpaceObject[] = [
    { identifier: "B", orbitsAroundIdentifier: "A" },
    { identifier: "C", orbitsAroundIdentifier: "B" },
    { identifier: "D", orbitsAroundIdentifier: "B" },
  ];
  expect(parse(input)).toEqual(output);
});
