import { SpaceObject, createObjectMap } from "./spaceObjects";
import { parse } from "./parse";

test("createObjectMap works fine", () => {
  const input: ReturnType<typeof parse> = [
    { identifier: "B", orbitsAroundIdentifier: "A" },
    { identifier: "C", orbitsAroundIdentifier: "B" },
    { identifier: "D", orbitsAroundIdentifier: "C" },
  ];

  const output: ReturnType<typeof createObjectMap> = {
    A: { identifier: "A" },
    B: { identifier: "B", orbitsAroundIdentifier: "A" },
    C: { identifier: "C", orbitsAroundIdentifier: "B" },
    D: { identifier: "D", orbitsAroundIdentifier: "C" },
  };

  expect(createObjectMap(input)).toEqual(output);
});
